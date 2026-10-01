@echo off
title Push Updates to GitHub
echo ========================================================
echo   SYNCING CLINIC EXPENSE BOOK TO GITHUB
echo ========================================================
echo.

git status --short

echo.
echo Staging and committing all changes...
git add .
set msg=Update clinic expenses and records: %date% %time%
git commit -m "%msg%"

echo.
echo Pushing to https://github.com/ammaradan/clinicexpbook.git...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! All updates have been pushed to GitHub.
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   ERROR: Push failed. Check your internet connection.
    echo ========================================================
)

echo.
pause
