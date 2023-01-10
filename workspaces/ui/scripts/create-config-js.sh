#!/bin/bash

STAGE=dev
REGION=eu-west-2
REST_API_ID=`aws apigateway get-rest-apis --query "items[?contains(name, '$STAGE-backend')].id" --output text`

API_ENDPOINT_BASE=https://$REST_API_ID.execute-api.${REGION}.amazonaws.com

export API_ENDPOINT_BASE

envsubst < dist/config-env.js > dist/config.js
rm dist/config-env.js
