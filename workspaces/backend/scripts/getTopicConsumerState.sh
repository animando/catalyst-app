#!/bin/bash

DIR=`dirname $_`
UUID=`$DIR/getTopicUuid.sh $*`

if [[ $? != 0 ]];
then
  echo "Topic event source mapping not found"
  exit -1
fi

aws lambda get-event-source-mapping --uuid $UUID  --query "State" --output text
