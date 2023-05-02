export interface GeoLogDynamoInterface {
  magnitude: number

  place: string

  occurredAt: number

  updated: any

  tz?: number

  url: string

  detail: string

  felt?: number

  cdi?: number

  mmi?: number

  alert: string

  status: string

  tsunami: number

  sig: number

  net: string

  code: string

  ids: string

  sources: string

  types: string

  nst?: number

  dmin?: number

  rms: number

  gap?: number

  magType: string

  type: string

  title: string
}
