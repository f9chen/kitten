#!/bin/bash

OPTIONAL_PARAMS=""
PIDS=()

if [ "$1" = "dev" ]; then
  OPTIONAL_PARAMS="-m 1"

  # Run development scripts in the background

  # Watch for js changes and pipe them through Browserify
  # Exorcist is for extracting the map file out of the js
  watchify -t [ babelify --presets [ es2015 react ] ] ./static/main.js --outfile 'exorcist ./static/bundle.js.map > ./static/bundle.js' --debug --verbose &
  PIDS+=($!)

  # Watch for sass changes
  sass --watch sass:static/gen/css &
  PIDS+=($!)
fi

if [ "$1" != "dev" ]; then
  echo "Updating npm packages..."
  npm update && npm prune
  echo "Done updating npm packages."
fi

# Kill all child script processes when the script exits
for pid in ${PIDS[@]}; do
  trap "kill ${pid}" SIGINT SIGTERM EXIT
done

if [ "$1" == "clean" ]; then
  exit 0
fi

./node_modules/forever/bin/forever --minUptime 2000 $OPTIONAL_PARAMS $MAX_RUN_TIMES server.js

