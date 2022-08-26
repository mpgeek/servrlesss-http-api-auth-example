#!/usr/bin/env bash

REGION="us-east-1"
STAGE="sbx"

npm install
serverless deploy --region $REGION --stage $STAGE
