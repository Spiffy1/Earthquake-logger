export const constants = {
  API: 'api',
  API_VERSION_1: '1',
  GENERIC_ERROR: 'An error occurred',
  APPS_TABLE: 'USGSTremor',
  REQUEST_TABLE: 'RequestLog',
  PARTITION_KEY: 'Earth2022',
  PRIMARY_INDEX: 'century',
  SORTKEY: 'occurredAt',
  LOCAL_SECONDARY_INDEX: 'magnitude',
  REQUEST_LOG_PARTITION_KEY: 'request_log',
  HTTP_200: 200, // ok
  HTTP_201: 201, // created
  HTTP_400: 400, // bad req
  HTTP_401: 401, // Unauthorized
  HTTP_404: 404,
  HTTP_500: 500,
  USGS_GEOLOG_URL: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
} as const
