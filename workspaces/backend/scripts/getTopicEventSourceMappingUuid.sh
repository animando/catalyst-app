#!/bin/bash

if [[ "$#" == 0 ]]
then
  echo "need topic as argument"
  exit -1
fi

TOPIC=$1

UUID=`aws lambda list-event-source-mappings --query "EventSourceMappings[?contains(Topics[0],'$TOPIC')].UUID" --output text`

if [[ "" == "$UUID" ]]
then
  echo "Topic ${TOPIC} not known"
  exit -1
fi

echo $UUID
