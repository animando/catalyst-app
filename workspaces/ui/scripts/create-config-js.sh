#!/bin/bash

REGION=eu-west-2
REST_API_ID=`aws apigateway get-rest-apis --query "items[?contains(name, '$STAGE-webApi')].id" --output text`
WS_API_ID=`aws apigatewayv2 get-apis --query "Items[?contains(Name, '${STAGE}-wsApi')].ApiId" --output text`
USER_POOL_CLIENT_ID=`aws ssm get-parameter --name user-pool-client-id  --query "Parameter.Value" --output text`
CF_DISTRIBUTION_DOMAIN=`aws ssm get-parameter --name catalyst-ui-distribution-domain --query "Parameter.Value" --output text`
API_KEY=l83v1ZXe92au2ECvsIePQ7yq9HmQeu262oSakC5T

APP_HOST=https://${CF_DISTRIBUTION_DOMAIN}
API_ENDPOINT_BASE=https://$REST_API_ID.execute-api.${REGION}.amazonaws.com/$STAGE
WS_ENDPOINT_BASE=wss://$WS_API_ID.execute-api.${REGION}.amazonaws.com/$STAGE

export API_ENDPOINT_BASE
export WS_ENDPOINT_BASE
export USER_POOL_CLIENT_ID
export APP_HOST
export API_KEY

envsubst < dist/config-env.js > dist/config.js
rm dist/config-env.js
