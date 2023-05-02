import { IsNumber, IsString } from 'class-validator'

export class GetGeoLogWithFilterDto {
  @IsNumber()
  minMag?: number

  @IsNumber()
  maxMag?: number

  @IsNumber()
  startTime?: number

  @IsNumber()
  endTime?: number

  @IsNumber()
  limit?: number

  @IsString()
  lastEvaluatedPKey?: string

  @IsNumber()
  lastEvaluatedSKey?: number
}

export class LastEvaluateKeyDto {
  @IsString()
  century: string

  @IsNumber()
  occurredAt: number
}
