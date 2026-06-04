@echo off
REM Job Search Setup Script for Windows

echo ================================
echo Job Search Installation Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed. Please install it from https://nodejs.org
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i

echo + Node.js is installed: %NODE_VERSION%
echo + npm is installed: %NPM_VERSION%
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

echo.
echo + Installation complete!
echo.
echo To start development:
echo   - Backend only:      npm run server
echo   - Frontend only:     npm run dev
echo   - Both (recommended): npm run dev:full
echo.
echo Open http://localhost:5173 in your browser
pause
