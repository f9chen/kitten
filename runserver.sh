#!/bin/bash

OPTIONAL_PARAMS=""

if [ "$1" = "dev" ]; then
  OPTIONAL_PARAMS="-m 1"
fi

if [ "$1" != "dev" ]; then
  echo "Updating npm packages..."
  npm update && npm prune
  echo "Done updating npm packages."
fi

./node_modules/forever/bin/forever --minUptime 2000 $OPTIONAL_PARAMS $MAX_RUN_TIMES server.js

