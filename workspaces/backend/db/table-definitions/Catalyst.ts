export const CatalystTableName = "Catalyst";

export const CatalystTable = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: CatalystTableName,
    AttributeDefinitions: [
      {
        AttributeName: "PK",
        AttributeType: "S",
      },
      {
        AttributeName: "SK",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "PK",
        KeyType: "HASH",
      },
      {
        AttributeName: "SK",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
};
