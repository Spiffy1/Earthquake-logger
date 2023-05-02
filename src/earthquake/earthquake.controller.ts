import { Controller, Get, Post, Query, Req, UseInterceptors } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { GetGeoLogWithFilterDto } from './dto/get-geolog-with-filter.dto'

import { EarthquakeService } from './earthquake.service'
import { GetGeoLogInterceptor } from './interceptor'

@Controller('earthquake')
export class EarthquakeController {
  constructor(private readonly earthquakeService: EarthquakeService) {}

  @ApiOperation({
    description: 'Pull earth quake data from USGS',
  })
  @Post('pull-origin')
  @UseInterceptors(GetGeoLogInterceptor)
  async pullDataFromUsgs(@Query('recordCount') recordCount: number, @Req() req): Promise<any> {
    const result = await this.earthquakeService.getLatestDataFromUsgs(recordCount)
    return {
      result,
      ...req.body,
      ...req.query,
    }
  }

  @Get('get-geolog')
  @UseInterceptors(GetGeoLogInterceptor)
  async getGeoLog(@Query() query: GetGeoLogWithFilterDto, @Req() req): Promise<any> {
    const result = await this.earthquakeService.getGeoLogWithFilters(query)
    return {
      result,
      ...req.body,
      ...req.query,
    }
  }

  @Get('average-mag')
  async getAverageMag(@Query() query: GetGeoLogWithFilterDto): Promise<any> {
    return this.earthquakeService.getAverageMag(query)
  }
}
