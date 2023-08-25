#!/usr/bin/env sh

set -e
sudo npm run build

sudo cd dist/adbrasil_site

sudo cp dist/adbrasil_site/index.html dist/adbrasil_site/404.html

#!/bin/bash

pasta_origem="dist/adbrasil_site"
pasta_destino="/Users/lucasi/Projetos/adbrasil_site"

# Remover o conteúdo da pasta de destino
sudo rm -r "$pasta_destino"/*

# Copiar os arquivos da pasta de origem para a pasta de destino
sudo cp -r "$pasta_origem"/* "$pasta_destino"

echo "Conteúdo movido com sucesso de $pasta_origem para $pasta_destino"
