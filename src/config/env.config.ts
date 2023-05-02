import * as dotenv from 'dotenv'
import { constants } from 'src/core'
dotenv.config()

export const env = {
  PORT: process.env.PORT,
  USGS_GEOLOG_URL: constants.USGS_GEOLOG_URL,
  IS_OFFLINE: process.env.IS_OFFLINE,
  DYNAMO_DB_ENDPOINT: process.env.DYNAMO_DB_ENDPOINT,
  DYNAMO_DB_CONFIG: {
    region: 'localhost',
    endpoint: process.env.DYNAMO_DB_ENDPOINT,
  },
  // SENTRY_DSN=https://e5a8c269h54h45h45hc4f541bcfacc44@o1334683.ingest.sentry.io/6601467
}
