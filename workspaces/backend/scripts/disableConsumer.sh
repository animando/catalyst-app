#!/bin/bash

DIR=`dirname $_`
UUID=`$DIR/getTopicUuid.sh $*`

if [[ $? != 0 ]];
then
  echo "Topic event source mapping not found"
  exit -1
fi

aws lambda update-event-source-mapping --uuid $UUID --no-enabled

# getstate() {
#   state=`${DIR}/getTopicConsumerState.sh $*`
# }

# getstate
# while [[ "$state" == "Disabling" ]]; do
#   sleep 10
# done

# echo "$state"