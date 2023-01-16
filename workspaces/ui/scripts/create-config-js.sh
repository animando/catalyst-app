#!/bin/bash

REGION=eu-west-2
REST_API_ID=`aws apigateway get-rest-apis --query "items[?contains(name, '$STAGE-backend')].id" --output text`
USER_POOL_CLIENT_SECRET=`aws secretsmanager get-secret-value --secret-id userpool_client_secret --query "SecretString" --output text`
USER_POOL_CLIENT_ID=`aws ssm get-parameter --name user-pool-client-id  --query "Parameter.Value" --output text`
USER_POOL_UI_ENDPOINT=`aws ssm get-parameter --name cognito-ui-endpoint --query "Parameter.Value" --output text`
CF_DISTRIBUTION_DOMAIN=`aws ssm get-parameter --name catalyst-ui-distribution-domain --query "Parameter.Value" --output text`

APP_HOST=https://${CF_DISTRIBUTION_DOMAIN}
API_ENDPOINT_BASE=https://$REST_API_ID.execute-api.${REGION}.amazonaws.com/$STAGE

export API_ENDPOINT_BASE
export USER_POOL_CLIENT_SECRET
export USER_POOL_CLIENT_ID
export USER_POOL_UI_ENDPOINT
export APP_HOST

envsubst < dist/config-env.js > dist/config.js
rm dist/config-env.js
