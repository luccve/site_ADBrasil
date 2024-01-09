#!/usr/bin/env sh

set -e

git -C ./dist/adbrasil_site pull

sudo npm run build

sudo cp ./dist/adbrasil_site/index.html ./dist/adbrasil_site/404.html

cd ./dist/adbrasil_site

git add .
git commit -m "Update"
git push -u origin main

cd ..

echo "Realizado o deploy da aplicaçao"
