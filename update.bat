@echo off
setlocal enabledelayedexpansion

echo Restoring all current changes in git...
git restore . 
git clean -fd

echo Pulling latest changes from origin/main...
git pull origin main

echo Removing package-lock.json and node_modules...
if exist frontend\package-lock.json del frontend\package-lock.json
if exist frontend\node_modules rmdir /s /q frontend\node_modules

echo Compiling ...
wails build

echo Process completed.
pause
