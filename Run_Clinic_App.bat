@echo off
title Clinic Finance Manager Web App
echo ========================================================
echo   CLINIC FINANCE ^& EXPENSE MANAGER
echo ========================================================
echo.
echo Starting local web server...
start "" http://127.0.0.1:3456
node server.js
pause
