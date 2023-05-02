import { BadRequestException, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom, map } from 'rxjs'

import { ERROR_MESSAGE, constants } from '../core'
import { GeoLogFeature, GeoLogProperties, GetGeoLogWithFilterDto, LastEvaluateKeyDto } from './dto'
import { GeoLogInterface } from './dto/geolog.interface'
import { EarthQuakeRepository } from './repository/earthquake.repository'

@Injectable()
export class EarthquakeService {
  constructor(private httpService: HttpService, private readonly earthQuakeRepository: EarthQuakeRepository) {}

  async getLatestDataFromUsgs(recordCount: number): Promise<void> {
    const url = constants.USGS_GEOLOG_URL

    const sourceData: GeoLogInterface = await lastValueFrom(
      this.httpService.get(url).pipe(
        map((response) => response.data),
        map((data) => data),
      ),
    )
    await this.insertNonBatchToDB(sourceData.features.slice(0, recordCount))
  }

  async insertNonBatchToDB(data: GeoLogFeature[]): Promise<any> {
    const promises = data.map(async (feature): Promise<any> => {
      this.insertOne(feature.properties)
    })
    return Promise.all([promises])
  }

  async insertOne(dto: GeoLogProperties): Promise<void> {
    return this.earthQuakeRepository.insertOne(dto)
  }

  async getGeoLogWithFilters(query: GetGeoLogWithFilterDto): Promise<any> {
    const { startTime, minMag, maxMag, limit, lastEvaluatedPKey, lastEvaluatedSKey } = query

    const lastEvaluatedKey: LastEvaluateKeyDto = {
      century: lastEvaluatedPKey,
      occurredAt: Number(lastEvaluatedSKey),
    }
    if (!startTime) {
      throw new BadRequestException(ERROR_MESSAGE.REQUIRED.START_TIME)
    }
    let endTime = query?.endTime
    if (!query.endTime) {
      endTime = Date.now()
    }

    if (endTime < startTime) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_PUT.TIMESCALE)
    }

    if (!lastEvaluatedPKey || !lastEvaluatedSKey) {
      return this.earthQuakeRepository.getGeoLogWithFilters(
        Number(startTime),
        Number(endTime),
        Number(maxMag),
        Number(minMag),
        Number(limit),
      )
    }
    return this.earthQuakeRepository.getPaginatedGeoLogWithFilters(
      Number(startTime),
      Number(endTime),
      lastEvaluatedKey,
      Number(maxMag),
      Number(minMag),
      Number(limit),
    )
  }

  async getAverageMag(query: GetGeoLogWithFilterDto): Promise<any> {
    let { startTime, endTime } = query
    if (!startTime) {
      const now = new Date()
      const lastyear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      startTime = lastyear.getTime()

      if (!endTime) {
        endTime = Date.now()
      }

      if (endTime < startTime) {
        throw new BadRequestException(ERROR_MESSAGE.INVALID_PUT.TIMESCALE)
      }

      // I should use projectionexpression to cut the unnecessary attribute here. This would lower the memory consumption
      const geologData = await this.earthQuakeRepository.getGeoLogWithTimeStamp(startTime, endTime)

      const moths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      function toMonthString(timeStamp) {
        const date = new Date(timeStamp)
        return `${moths[date.getMonth()]} ${date.getFullYear()}`
      }
      let monthDatas = []
      geologData.Items.reduce((res, { magnitude, occurredAt }) => {
        const month = toMonthString(occurredAt)

        if (!res[month]) {
          res[month] = { month: month, avg: 0, count: 0, sum: 0 }
          monthDatas.push(res[month])
        }
        res[month].sum += magnitude
        res[month].count += 1
        res[month].avg = res[month].sum / res[month].count
        return res
      }, {})

      return monthDatas.map((data) => {
        const { month, avg } = data
        const obj = {}
        obj[month] = avg
        return obj
      })
    }
  }
}
