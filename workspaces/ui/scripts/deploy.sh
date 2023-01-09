#!/bin/bash

STAGE=dev
REGION=eu-west-2
REST_API_ID=`aws apigateway get-rest-apis --query "items[?contains(name, '$STAGE-backend')].id" --output text`

API_ENDPOINT_BASE=https://$REST_API_ID.execute-api.${REGION}.amazonaws.com/$STAGE

echo $REST_API_ID
echo $API_ENDPOINT_BASE

export API_ENDPOINT_BASE

envsubst < dist/config-env.js > dist/config.js
rm dist/config-env.js

aws s3 sync dist s3://catalyst-ui-bucket --delete
