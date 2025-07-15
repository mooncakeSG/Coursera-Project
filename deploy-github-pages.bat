@echo off
echo 🚀 Weather Dashboard - GitHub Pages Deployment
echo ==============================================

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

REM Check if we're in a git repository
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
)

REM Check for API key configuration
echo 🔍 Checking API key configuration...

if exist "config.js" (
    findstr "your_actual_api_key_here" config.js >nul
    if errorlevel 1 (
        echo ✅ API key found in config.js
    ) else (
        echo ⚠️  API key not configured in config.js
        echo 💡 You can:
        echo    1. Edit config.js with your API key
        echo    2. Use GitHub Secrets for secure deployment
        echo    3. Deploy in demo mode (current setup)
    )
) else (
    echo ⚠️  config.js not found
    echo 💡 The deployment will use demo mode
)

REM Add all files
echo 📝 Adding files to Git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Deploy Weather Dashboard to GitHub Pages"

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ⚠️  No remote repository configured.
    echo 📋 Please run these commands manually:
    echo    1. Create a repository on GitHub
    echo    2. Run: git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
    echo    3. Run: git push -u origin main
    echo.
    echo 🔑 For API key setup:
    echo    1. Go to repository Settings → Secrets and variables → Actions
    echo    2. Add secret: OPENWEATHER_API_KEY
    echo    3. Value: Your OpenWeatherMap API key
    pause
    exit /b 1
)

REM Push to GitHub
echo 🌐 Pushing to GitHub...
git push origin main

echo.
echo ✅ Deployment completed!
echo.
echo 📋 Next steps:
echo    1. Go to your GitHub repository
echo    2. Click Settings → Pages
echo    3. Source: 'Deploy from a branch'
echo    4. Branch: 'gh-pages' (created by workflow)
echo    5. Click Save
echo.
echo 🌍 Your site will be available at:
echo    https://YOUR_USERNAME.github.io/weather-dashboard
echo.
echo ⏰ Wait 2-5 minutes for the site to go live.
echo.
echo 🔑 API Key Status:
if exist "config.js" (
    findstr "your_actual_api_key_here" config.js >nul
    if errorlevel 1 (
        echo    ✅ API key configured - live weather data enabled
    ) else (
        echo    ⚠️  Demo mode - configure API key for live data
        echo       Use GitHub Secrets for secure deployment
    )
) else (
    echo    ⚠️  Demo mode - configure API key for live data
    echo       Use GitHub Secrets for secure deployment
)
pause 