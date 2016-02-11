#!/bin/bash

parse() {
  cat $1 | sed -e 's/<\/TD>//g' | sed -e 's/^[^>]*>//g' | while read x; do
    if [[ "$x" == "<TR>" ]]; then
      read y
      echo $y

      read y
      echo $y

      read y
      echo $y
    fi
  done
}

mkdir -p vocab

parse "pages/1.html" > vocab/1.txt
parse "pages/2.html" > vocab/2.txt
parse "pages/3.html" > vocab/3.txt
parse "pages/4.html" > vocab/4.txt
parse "pages/5.html" > vocab/5.txt
parse "pages/6.html" > vocab/6.txt
parse "pages/7.html" > vocab/7.txt
parse "pages/8.html" > vocab/8.txt
parse "pages/9.html" > vocab/9.txt
parse "pages/10.html" > vocab/10.txt
parse "pages/11.html" > vocab/11.txt
parse "pages/12.html" > vocab/12.txt
parse "pages/13.html" > vocab/13.txt
parse "pages/14.html" > vocab/14.txt
parse "pages/15.html" > vocab/15.txt
parse "pages/16.html" > vocab/16.txt
parse "pages/17.html" > vocab/17.txt
parse "pages/18.html" > vocab/18.txt
parse "pages/19.html" > vocab/19.txt
parse "pages/20.html" > vocab/20.txt
parse "pages/21.html" > vocab/21.txt
parse "pages/22.html" > vocab/22.txt
parse "pages/23.html" > vocab/23.txt
