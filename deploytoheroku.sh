#!/usr/bin/env bash
# Because I'm lazy...

if [ -n "$@" ]; then
  git subtree push --prefix ${@} heroku master
  exit
fi

echo "Plz provide the folder..."
