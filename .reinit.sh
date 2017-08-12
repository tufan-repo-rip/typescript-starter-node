#!/usr/bin/env bash

set -e

# For *nix systems, this should work

# get the current directory without path
app=${PWD##*/}
read -p "Name the project: ($app): " appname
appname=${appname:-$app}

sed -i "s/typescript-starter-node/$appname/" package.json
sed -i "s/typescript-starter-node/$appname/" README.md

# reset git repo
rm -rf .git # remove reference to old repo
git init # initialize a new git repo
echo "git repo has been reset - please configure git username/email, like so"
echo ""
echo "git config user.name \"John Doe\""
echo "git config user.email john@doe.com"
echo ""

# git commit -m "Big Bang"

echo "Reinitialization of this repo is complete. Destroy .reinit.sh?"
select result in y n
do
  case $result in
    "y")
      rm .reinit.sh
      break
      ;;
    "n")
      break
      ;;
    *)
      ;;
  esac
done

# Now add all remaining files into new repo.
git add . --all

# install dependencies and build the bare project.
npm install
npm run build

# go forth and make a brave new package...

