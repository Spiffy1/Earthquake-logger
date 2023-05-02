import { IsString } from 'class-validator'
import { Geometry } from './geolog-geometry.dto'
import { GeoLogProperties } from './geolog-properties.dto'

export class GeoLogFeature {
  @IsString()
  type: string

  properties: GeoLogProperties

  geometry: Geometry

  @IsString()
  id: string
}
