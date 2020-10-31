#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add .
git commit -m 'v.1 web version'
git push -f git@github.com:jmmmsantos/memory-game.git master:gh-pages
cd -