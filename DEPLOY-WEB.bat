@echo off
title DEPLOY SAM MIX WEB TO GITHUB PAGES
color 0A
echo ============================================================
echo 🚀 DANG BUILD VA DAY WEB SAM MIX MOI NHAT LEN GITHUB PAGES...
echo ============================================================
echo.

cd /d "%~dp0"

echo [1/3] Dang build du an Vite (React)...
call npm run build

echo.
echo [2/3] Dang push va publish len GitHub Pages (gh-pages)...
call npx gh-pages -d dist

echo.
echo ============================================================
echo ✅ DA PUBLISH WEB MOI NHAT LEN GITHUB PAGES THANH CONG!
echo 🌐 Link web: https://123okmen.github.io/sam-mix-planner/#/recipes
echo ============================================================
echo.
pause
