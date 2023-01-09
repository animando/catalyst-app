#!/bin/bash

REST_API_ID=`apigateway get-rest-apis --query "items[?contains(name, 'dev-backend')].id" --output text`

API_ENDPOINT_BASE=https://$REST_API_ID.execute-api.eu-west-2.amazonaws.com/dev

export API_ENDPOINT_BASE

envsubst < dist/config-env.js > dist/config.js
rm dist/config-env.js

aws s3 sync dist s3://catalyst-ui-bucket
