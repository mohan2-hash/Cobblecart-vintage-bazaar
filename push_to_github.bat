@echo off
cd /d "%~dp0"
echo ========================================================
echo   CobbleCart - Exporting to GitHub (mohan2-hash)
echo ========================================================
echo.
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" remote set-url origin https://github.com/mohan2-hash/cobblecart-vintage-bazaar.git
echo Pushing code to https://github.com/mohan2-hash/cobblecart-vintage-bazaar ...
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  [SUCCESS] Project exported to your GitHub!
    echo  https://github.com/mohan2-hash/cobblecart-vintage-bazaar
    echo ========================================================
) else (
    echo ========================================================
    echo  [NOTE] If you saw a 404 or authentication prompt,
    echo  make sure you created the repo at https://github.com/new
    echo  with the name: cobblecart-vintage-bazaar
    echo ========================================================
)
echo.
pause
