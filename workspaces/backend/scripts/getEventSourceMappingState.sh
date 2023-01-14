#!/bin/bash

if [[ $? != 0 ]];
then
  echo "Need ESM uuid as argument"
  exit -1
fi

UUID=$1

aws lambda get-event-source-mapping --uuid $UUID  --query "State" --output text
