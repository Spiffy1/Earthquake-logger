import { IsNumber, IsString } from 'class-validator'

export class GeoLogProperties {
  @IsNumber()
  mag: number

  @IsString()
  place: string

  @IsNumber()
  time: number

  updated: any

  @IsNumber()
  tz?: number

  @IsString()
  url: string

  @IsString()
  detail: string

  @IsNumber()
  felt?: number

  @IsNumber()
  cdi?: number

  @IsNumber()
  mmi?: number

  @IsString()
  alert: string

  @IsString()
  status: string

  @IsNumber()
  tsunami: number

  sig: number

  @IsString()
  net: string

  @IsString()
  code: string

  @IsString()
  ids: string

  @IsString()
  sources: string

  @IsString()
  types: string

  @IsNumber()
  nst?: number

  @IsNumber()
  dmin?: number

  @IsNumber()
  rms: number

  @IsNumber()
  gap?: number

  @IsString()
  magType: string

  @IsString()
  type: string

  @IsString()
  title: string
}
