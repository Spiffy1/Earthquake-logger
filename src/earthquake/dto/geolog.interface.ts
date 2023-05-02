import { GeoLogFeature } from './geolog-feature.dto'
import { Geometry } from './geolog-geometry.dto'
import { Metadata } from './geolog-metadata.dto'
import { GeoLogProperties } from './geolog-properties.dto'
import { RootObject } from './geolog-root-object.dto'

export interface GeoLogInterface {
  metadata: Metadata

  properties: GeoLogProperties

  geometry: Geometry

  features: GeoLogFeature[]

  rootObject: RootObject
}
