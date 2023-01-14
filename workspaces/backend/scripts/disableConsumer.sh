#!/bin/bash

DIR=`dirname $_`
UUID=`$DIR/getTopicEventSourceMappingUuid.sh $*`

if [[ $? != 0 ]];
then
  echo "Topic event source mapping not found"
  exit -1
fi

state=`aws lambda update-event-source-mapping --uuid $UUID --no-enabled --query "State" --output text`

getstate() {
  state=`${DIR}/getEventSourceMappingState.sh $UUID`
}

while [[ "$state" == "Disabling" ]]; do
  sleep 10
    getstate
done
