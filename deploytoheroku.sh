#!/usr/bin/env bash

if [ -n "$@" ]; then
  git subtree push --prefix ${@} heroku master
  exit
fi

echo "Plz provide the folder..."
