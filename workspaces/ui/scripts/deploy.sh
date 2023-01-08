#!/bin/bash

pwd
ls dist
aws s3 sync dist s3://catalyst-ui-bucket
