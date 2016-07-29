#!/bin/bash

OPTIONAL_PARAMS=""

if [ "$1" = "dev" ]; then
  OPTIONAL_PARAMS="-m 1"

  # Run development scripts in the background

  # Watch for js changes and pipe them through Browserify
  # Exorcist is for extracting the map file out of the js
  watchify ./static/example2.js -o 'exorcist ./static/bundle.js.map > ./static/bundle.js' -vd &

  # Watch for sass changes
  sass --watch sass:static/gen/css &
fi

if [ "$1" != "dev" ]; then
  echo "Updating npm packages..."
  npm update && npm prune
  echo "Done updating npm packages."
fi

# Kill all child processes when the script exits
# See: http://stackoverflow.com/questions/360201/how-do-i-kill-background-processes-jobs-when-my-shell-script-exits
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

./node_modules/forever/bin/forever --minUptime 2000 $OPTIONAL_PARAMS $MAX_RUN_TIMES server.js

