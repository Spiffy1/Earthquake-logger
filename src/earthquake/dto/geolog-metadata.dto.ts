import { IsNumber, IsString } from 'class-validator'

export class Metadata {
  @IsNumber()
  generated: number

  @IsString()
  url: string

  @IsString()
  title: string

  @IsNumber()
  status: number

  @IsString()
  api: string

  @IsNumber()
  count: number
}
