import { IsArray, IsString } from 'class-validator'

export class Geometry {
  @IsString()
  type: string

  @IsArray()
  coordinates: number[]
}
