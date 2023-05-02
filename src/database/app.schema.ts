import { CreateTableInput } from '@aws-sdk/client-dynamodb'
import { constants } from '../core'
import { DbControlOpsInstance } from './dynamoControlOps'

const appTableParams: CreateTableInput = {
  TableName: constants.APPS_TABLE,
  KeySchema: [
    {
      AttributeName: 'century',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'occurredAt',
      KeyType: 'RANGE', //ATTRIBUTE_TYPE
    },
  ],

  LocalSecondaryIndexes: [
    {
      IndexName: 'Magnitude',
      KeySchema: [
        {
          AttributeName: 'century',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'magnitude',
          KeyType: 'RANGE', //ATTRIBUTE_TYPE
        },
      ],
      Projection: { ProjectionType: 'KEYS_ONLY' },
    },
  ],

  AttributeDefinitions: [
    { AttributeName: 'century', AttributeType: 'S' },
    { AttributeName: 'occurredAt', AttributeType: 'N' },
    { AttributeName: 'magnitude', AttributeType: 'N' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
}

const requestTableParams: CreateTableInput = {
  TableName: constants.REQUEST_TABLE,
  KeySchema: [
    {
      AttributeName: 'pk',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'time',
      KeyType: 'RANGE', //ATTRIBUTE_TYPE
    },
  ],
  AttributeDefinitions: [
    { AttributeName: 'pk', AttributeType: 'S' },
    { AttributeName: 'time', AttributeType: 'N' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
}

export function initAppTable() {
  // console.log('initAppTable')
  DbControlOpsInstance.create(appTableParams)
  DbControlOpsInstance.create(requestTableParams)
  DbControlOpsInstance.list()
}
