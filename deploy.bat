@echo off
setlocal enabledelayedexpansion

cd .\dist\adbrasil_site\

git pull

cd ..

cd ..

call npm run build
copy dist\adbrasil_site\index.html dist\adbrasil_site\404.html

set pasta_origem="dist\adbrasil_site"

REM Navegar até a pasta de origem
cd "!pasta_origem!"

REM Executar git add .
git add .

REM Executar git commit -m "update"
git commit -m "update"

REM Executar git push
git push

echo Deploy Realizado!
