#!/bin/bash

DISTRIBUTION_ID=`aws ssm get-parameter --name catalyst-ui-distribution-id --query "Parameter.Value" --output text`

INVALIDATION_ID=`aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*" --query "Invalidation.Id" --output text`

state="InProgress"

getstate() {
  state=`aws cloudfront get-invalidation --distribution-id ${DISTRIBUTION_ID} --id ${INVALIDATION_ID} --query "Invalidation.Status" --output text`
}

while [[ "$state" == "InProgress" ]]; do
  sleep 10
  getstate
done

echo $state