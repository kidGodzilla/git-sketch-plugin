#!/bin/bash
set -e -o pipefail

DIR_PATH="$1"
EXPORT_FOLDER="$2"
FILE_FOLDER="$3"
BUNDLE_PATH="$4"
FILENAME="$5"
FORMAT="$6"
SCALE="$7"
INCLUDE_OVERVIEW="$8"


cd "$DIR_PATH"

function upsearch {
  slashes=${PWD//[^\/]/}
  directory="$PWD"
  for (( n=${#slashes}; n>0; --n ))
  do
    test -e "$directory/$1" && echo "$directory/$1" && return
    directory="$directory/.."
  done
}

# Explode sketch file to .FILENAME
  # Copy .sketch to .zip
  cp "$FILENAME" "$FILENAME.zip"

  # Unzip the file and delete
  unzip -o "$FILENAME.zip" -d ".$FILENAME/"
  rm -Rf "$FILENAME.zip"

  # Remove the preview file
  rm -Rf ".$FILENAME/previews/"

  # test
  python -m json.tool ".$FILENAME/document.json" > ".$FILENAME/document.json.pretty"


SKETCH_IGNORE=$(upsearch ".sketchignore")

# get list of artboards regex to ignore
IGNORE=$([ -e "$SKETCH_IGNORE" ] && (cat "$SKETCH_IGNORE" | sed '/^$/d' | sed 's/^/^/' | sed 's/$/$/' | tr '\n' ',') || echo "")

# get list of artboard names to export
ARTBOARDS=$("$BUNDLE_PATH"/Contents/Resources/sketchtool/bin/sketchtool list artboards "$FILENAME" --include-symbols=YES | python "$(dirname "$0")"/getArtboardNames.py "$IGNORE" | tr '\n' ',')

mkdir -p "$EXPORT_FOLDER" || true

# move old artboards to temp directory to compare them with the new ones
rm -rf .oldArtboards || true
mv "$FILE_FOLDER" .oldArtboards || true

# generate new artboards
mkdir -p "$FILE_FOLDER"
"$BUNDLE_PATH"/Contents/Resources/sketchtool/bin/sketchtool export artboards "$FILENAME" --formats="$FORMAT" --scales="$SCALE" --output="$FILE_FOLDER" --overwriting=YES --items="$ARTBOARDS" --include-symbols=YES

# Construct a ${FILENAME}-boards.md file which shows all the artboards in the sketch directory
if [[ ${INCLUDE_OVERVIEW} == "true" ]]
then
  readmeFile="./${FILENAME%.*}-boards.md" # Exclude the file extension
  echo "# Artboards" > "${readmeFile}"
  echo "" >> "${readmeFile}"
  echo "This is an autogenerated file showing all the artboards. Do not edit it directly." >> "${readmeFile}"
fi

# compare new artboards with the old ones
for artboardPath in "$FILE_FOLDER"/*
do
  artboard=$(basename "$artboardPath")
  if [[ -f .oldArtboards/"$artboard" ]]; then
    # Get base64 encoded artboard
    newArtboard="$(cat "$FILE_FOLDER"/"$artboard" | base64)"
    oldArtboard="$(cat .oldArtboards/"$artboard" | base64)"

    # See if the artboards are the same
    if [ "$newArtboard" == "$oldArtboard" ]; then
      # keep the old artboard
      rm "$artboardPath"
    	mv .oldArtboards/"$artboard" "$artboardPath"
    fi
  fi

  if [[ ${INCLUDE_OVERVIEW} == "true" ]]
  then
    artboardName="${artboard%.*}" # Exclude the file extension
    # artboardPathUrlEncoded=$(python -c raw_input() <<< "$artboardPath")
    # str.replace(old, new[, max])
    # artboardPathUrlEncoded=$(python -c raw_input().replace(' ', '%20') <<< "$artboardPath")
    replace="%20"
    artboardPathUrlEncoded=${artboardPath// /%20}
    echo "" >> "${readmeFile}"
    echo "## ${artboardName}" >> "${readmeFile}"
    echo "" >> "${readmeFile}"
    echo "![${artboardName}](./${artboardPathUrlEncoded})" >> "${readmeFile}"
    echo "" >> "${readmeFile}"
  fi
done


git add "$EXPORT_FOLDER"

if [[ ${INCLUDE_OVERVIEW} == "true" ]]
then
  git add "${readmeFile}"
fi

rm -rf .oldArtboards
