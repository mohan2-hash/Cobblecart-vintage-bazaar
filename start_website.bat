@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting CobbleCart Victorian Promenade Website...
echo ========================================================
echo.
set PATH=C:\Program Files\nodejs;%PATH%
start "" "http://localhost:3000"
npm run dev
