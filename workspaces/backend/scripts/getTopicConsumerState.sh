#!/bin/bash

DIR=`dirname $_`
UUID=`$DIR/getTopicEventSourceMappingUuid.sh $*`

if [[ $? != 0 ]];
then
  echo "Topic event source mapping not found"
  exit -1
fi

$DIR/getEventSourceMappingState.sh $UUID
