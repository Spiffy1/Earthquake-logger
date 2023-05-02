import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { NodeHttpHandler } from '@aws-sdk/node-http-handler'
import { Agent } from 'http'

class DbClients {
  private static instance: DbClients
  public dbClient: DynamoDBClient
  public dbDocumentClient: DynamoDBDocumentClient

  private constructor() {
    // console.log('DbClients init')
    if (DbClients.instance) {
      throw new Error('Error - already initialized')
    }
  }

  init() {
    const marshallOptions = {
      // Whether to automatically convert empty strings, blobs, and sets to `null`.
      convertEmptyValues: false, // false, by default.
      // Whether to remove undefined values while marshalling.
      removeUndefinedValues: false, // false, by default.
      // Whether to convert typeof object to map attribute.
      convertClassInstanceToMap: false, // false, by default.
    }
    const unmarshallOptions = {
      // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
      wrapNumbers: false, // false, by default.
    }
    const translateConfig = { marshallOptions, unmarshallOptions }
    this.dbClient = process.env.IS_OFFLINE
      ? new DynamoDBClient({
          region: process.env.DYNAMO_DB_REGION,
          endpoint: process.env.DYNAMO_DB_ENDPOINT,
          requestHandler: new NodeHttpHandler({
            httpAgent: new Agent({ keepAlive: false }),
          }),
        })
      : new DynamoDBClient({
          region: process.env.DYNAMO_DB_REGION,
          endpoint: process.env.DYNAMO_DB_ENDPOINT,
          credentials: {
            accessKeyId: process.env.DB_ACCESS_KEY_ID,
            secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
          },
          requestHandler: new NodeHttpHandler({
            httpAgent: new Agent({ keepAlive: false }),
          }),
        })

    this.dbDocumentClient = DynamoDBDocumentClient.from(this.dbClient, translateConfig)
  }

  /**
   * Destroys the Dbclients
   */
  destroy() {
    this.dbDocumentClient.destroy()
    this.dbClient.destroy()
  }

  static getInstance(): DbClients {
    DbClients.instance = DbClients.instance || new DbClients()
    return DbClients.instance
  }
}

export const DbClientsInstance = DbClients.getInstance()
