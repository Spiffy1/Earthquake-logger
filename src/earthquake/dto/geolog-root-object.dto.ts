import { IsArray, IsString } from 'class-validator'
import { GeoLogFeature } from './geolog-feature.dto'
import { Metadata } from './geolog-metadata.dto'

export class RootObject {
  @IsString()
  type: string

  metadata: Metadata

  features: GeoLogFeature[]

  @IsArray()
  bbox: number[]
}
