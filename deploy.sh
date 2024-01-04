#!/usr/bin/env sh
#!/bin/bash

pasta_origem="dist/adbrasil_site"

cd pasta_origem

sudo git pull

cd ..

set -e

sudo npm run build

sudo cp dist/adbrasil_site/index.html dist/adbrasil_site/404.html

cd pasta_origem

sudo git add .
sudo git commit -m "Update""
sudo git push -u origin main


echo "Conteúdo movido com sucesso de $pasta_origem para $pasta_destino"
