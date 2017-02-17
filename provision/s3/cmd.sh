#!/bin/bash

TODAY=$(date +%Y%m%d)
LOGDIR=/vagrant/provision/s3/logs/
LOGFILE=${LOGDIR}sync_${TODAY}.log

DEV=dev
STG=stg
PROD=prod

DEVBUCKET=dev-sportsbull-jp
STGBUCKET=stg-sportsbull-jp
PRODBUCKET=sportsbull-jp

if [ $# -ne 1 ]; then
  echo "invalid argument" 1>&2
  exit 1
fi

if [ $1 = $DEV ]; then
  BUCKET=$DEVBUCKET
elif [ $1 = $STG ]; then
  BUCKET=$STGBUCKET
elif [ $1 = $PROD ]; then
  BUCKET=$PRODBUCKET
else
  echo "invalid bucket:$1" 1>&2
  exit 1
fi


echo "s3 transfer start. bucket is $BUCKET." | tee -a $LOGFILE

s3cmd sync --no-mime-magic --guess-mime-type --delete-removed -r /vagrant/public/assets/ s3://${BUCKET}/assets/ | tee -a $LOGFILE

echo "s3 transfer finished." | tee -a $LOGFILE
