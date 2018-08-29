#!/usr/bin/env bash

if [ -n "$@" ]; then
  git subtree push --prefix ${@} heroku master
  # git push heroku `git subtree split --prefix ${@} master`:master --force

  exit
fi

echo "Plz provide the folder..."
