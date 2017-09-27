#!/usr/bin/env bash

set -e

# For *nix systems, this should work

# get the current directory without path
app=${PWD##*/}
read -p "Name the project: ($app): " appname
appname=${appname:-$app}

read -p "Email address for code-of-conduct violations? " conduct_email

sed -i.bak "s/typescript-starter-node/$appname/g" package.json && rm package.json.bak
echo "updated package.json:name"
sed -i.bak "s/typescript-starter-node/$appname/g" README.md && rm README.md.bak
echo "updated package name in README.md - please modify the state the purpose of your project"
if [ -z "$conduct_email" ]
then
  sed -i.bak "s/\[REPLACE EMAIL\]/$conduct_email/g" code-of-conduct.md && rm code-of-conduct.md.bak
  echo "email updated in code-of-conduct.md - $conduct_email"
else
  echo "Please update contact email in code-of-conduct.md"
fi

# reset git repo
rm -rf .git # remove reference to old repo
git init # initialize a new git repo
echo "git repo has been reset - please configure git username/email, like so"
echo ""
echo "git config user.name \"John Doe\""
echo "git config user.email john@doe.com"
echo ""

# git commit -m "Big Bang"

read -p "Reinitialization of this repo is complete. Destroy .reinit.sh? (Y/n): " response
response=${response:-y}
case $response in
  [yY])
    rm ./.reinit.sh
    echo "Deleted ./.reinit.sh"
    ;;
  *)
    echo "Preserving ./.reinit.sh"
    ;;
esac

# Now add all remaining files into new repo.
git add . --all

# install dependencies and build the bare project.
npm install
npm run build

echo "The repo has been properly reinitialized. It's your turn now."
echo "Go forth and make a brave new package..."

