import { GetGeoLogWithFilterDto } from './get-geolog-with-filter.dto'

export class RequestDto {
  now: number
  query: GetGeoLogWithFilterDto
  method: string
  url: string
  status: number
}
