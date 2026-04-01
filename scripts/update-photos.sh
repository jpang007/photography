#!/bin/bash

# Script to update photos from S3
# This fetches the latest photos and regenerates the data file

echo "Fetching photos from S3..."

aws s3 ls s3://jeremyjpangphotos/ --recursive > /tmp/s3-files.txt

if [ $? -ne 0 ]; then
  echo "Error: Failed to fetch S3 file list"
  exit 1
fi

node scripts/parse-s3-list.js /tmp/s3-files.txt

echo "✓ Photos updated!"
