#!/bin/sh
cd -- "$(dirname "$BASH_SOURCE")"

# npm i -g json-minify # RM dependency on Node / NPM

# Iterate through all "exploded" Sketch files and put them back together again

for j in .*.sketch
do
  cp -R "$j" .temp"$j"
  cd .temp"$j"

  for k in *.json
  do
    jq -c . "$k" > out.json
    mv out.json "$k"
  done

  for k in  **/*.json
  do
    jq -c . "$k" > out.json
    mv out.json "$k"
  done

  zip ../"$j".zip -r .
  cd ..
  mv "$j".zip "${j#.}"
  rm -rf .temp"$j"
done
