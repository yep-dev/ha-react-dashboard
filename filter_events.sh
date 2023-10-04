#!/bin/bash

INPUT=$1
IFS=':' read -ra EVENT_DATA <<< "$INPUT"
EVENT_TYPE=${EVENT_DATA[0]}
if [ "$EVENT_TYPE" == "add" ] || [ "$EVENT_TYPE" == "unlink" ] || [ "$EVENT_TYPE" == "move" ]; then
  barrelsby -DS -c barrels.json && eslint "src/**/index.ts" --fix
fi