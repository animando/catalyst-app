#!/bin/bash

SCRIPTS_DIR=`dirname $0`

$SCRIPTS_DIR/create-config-js.sh

aws s3 sync dist s3://catalyst-ui-bucket --delete
