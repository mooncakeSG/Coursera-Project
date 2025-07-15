@echo off
echo 🚀 Weather Dashboard Deployment Script
echo ======================================

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
    echo Please run these commands manually:
    echo 1. Create a repository on GitHub
    echo 2. Run: git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
    echo 3. Run: git push -u origin main
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
echo 1. Go to your GitHub repository
echo 2. Click Settings → Pages
echo 3. Select 'Deploy from a branch'
echo 4. Choose 'main' branch and '/ (root)' folder
echo 5. Click Save
echo.
echo 🌍 Your site will be available at:
echo    https://YOUR_USERNAME.github.io/weather-dashboard
echo.
echo ⏰ Wait 2-5 minutes for the site to go live.
pause 