import { Injectable, Logger } from '@nestjs/common'
import { PutCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb'
import { DbDataOpsInstance } from '../../database/dynamoDataOps'
import { constants } from '../../core/constant'
import { GeoLogProperties, LastEvaluateKeyDto, RequestDto } from '../dto'
import { DEFAULT_LIMIT, DEFAULT_MAX_MAG, DEFAULT_MIN_MAG } from '../constant'

@Injectable()
export class EarthQuakeRepository {
  async insertOne(item: GeoLogProperties): Promise<any> {
    try {
      const params: PutCommandInput = {
        TableName: constants.APPS_TABLE,
        Item: {
          // TODO: This could use some work
          century: constants.PRIMARY_INDEX, // PK
          magnitude: item.mag, // LSI
          occurredAt: item.time, // SK
          place: item.place,
          updated: item.place,
          tz: item?.tz,
          url: item.url,
          detail: item.detail,
          felt: item?.felt,
          cdi: item?.cdi,
          mmi: item?.mmi,
          alert: item.alert,
          status: item.status,
          tsunami: item.tsunami,
          sig: item.sig,
          net: item.net,
          code: item.code,
          ids: item.ids,
          sources: item.sources,
          types: item.type,
          nst: item?.nst,
          dmin: item?.dmin,
          rms: item.rms,
          gap: item?.gap,
          magType: item.magType,
          type: item.type,
          title: item.title,
        },
      }

      const data = await DbDataOpsInstance.put(params)
      return data.Item
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async getGeoLogWithFilters(
    startTime: number,
    endTime: number,
    maxMag = DEFAULT_MAX_MAG,
    minMag = DEFAULT_MIN_MAG,
    limit = DEFAULT_LIMIT,
  ): Promise<any> {
    try {
      const params: QueryCommandInput = {
        TableName: constants.APPS_TABLE,
        KeyConditionExpression: '#pk = :pi and #sk between :start and :end',
        FilterExpression: '#lsi between :minMag and :maxMag',
        ExpressionAttributeNames: {
          '#pk': constants.PRIMARY_INDEX,
          '#sk': constants.SORTKEY,
          '#lsi': constants.LOCAL_SECONDARY_INDEX,
        },
        ExpressionAttributeValues: {
          ':pi': constants.PARTITION_KEY,
          ':start': startTime,
          ':end': endTime,
          ':minMag': minMag,
          ':maxMag': maxMag,
        },
        Limit: limit,
      }
      return await DbDataOpsInstance.query(params)
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async getPaginatedGeoLogWithFilters(
    startTime: number,
    endTime: number,
    lastEvaluatedKey: LastEvaluateKeyDto,
    maxMag = DEFAULT_MAX_MAG,
    minMag = DEFAULT_MIN_MAG,
    limit = DEFAULT_LIMIT,
  ): Promise<any> {
    try {
      const params: QueryCommandInput = {
        TableName: constants.APPS_TABLE,
        KeyConditionExpression: '#pk = :pi and #sk between :start and :end',
        FilterExpression: '#lsi between :minMag and :maxMag',
        ExpressionAttributeNames: {
          '#pk': constants.PRIMARY_INDEX,
          '#sk': constants.SORTKEY,
          '#lsi': constants.LOCAL_SECONDARY_INDEX,
        },
        ExpressionAttributeValues: {
          ':pi': constants.PARTITION_KEY,
          ':start': startTime,
          ':end': endTime,
          ':minMag': minMag,
          ':maxMag': maxMag,
        },
        Limit: limit,
        ExclusiveStartKey: lastEvaluatedKey,
      }
      return await DbDataOpsInstance.query(params)
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async getGeoLogWithTimeStamp(startTime: number, endTime: number): Promise<any> {
    try {
      const params: QueryCommandInput = {
        TableName: constants.APPS_TABLE,
        KeyConditionExpression: '#pk = :pi and #sk between :start and :end',
        ExpressionAttributeNames: {
          '#pk': constants.PRIMARY_INDEX,
          '#sk': constants.SORTKEY,
        },
        ExpressionAttributeValues: {
          ':pi': constants.PARTITION_KEY,
          ':start': startTime,
          ':end': endTime,
        },
      }
      return await DbDataOpsInstance.query(params)
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async insertRequest(request: RequestDto): Promise<void> {
    const { now, query, method, url, status } = request

    try {
      const params: PutCommandInput = {
        TableName: constants.REQUEST_TABLE,
        Item: {
          pk: constants.REQUEST_LOG_PARTITION_KEY, // PK
          time: now, // SK
          query: query,
          method: method,
          url: url,
          status: status,
        },
      }

      const data = await DbDataOpsInstance.put(params)
      return data.Item
    } catch (e) {
      Logger.error(e)
      return null
    }
  }
}
