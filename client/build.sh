#!/bin/bash

trap killgroup SIGINT

killgroup(){
  echo "killing..."
  kill 0
}




watchman app.js "browserify app.js -t reactify -o ../dist/app.js" &
watchman app.css "myth app.css ../dist/app.css" &
wait
