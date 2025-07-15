#!/bin/bash

# GitHub Pages Deployment Script for Weather Dashboard
# This script handles deployment with optional API key configuration

echo "🚀 Weather Dashboard - GitHub Pages Deployment"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install Git first.${NC}"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${BLUE}📁 Initializing Git repository...${NC}"
    git init
fi

# Check for API key configuration
echo -e "${BLUE}🔍 Checking API key configuration...${NC}"

if [ -f "config.js" ]; then
    if grep -q "your_actual_api_key_here" config.js; then
        echo -e "${YELLOW}⚠️  API key not configured in config.js${NC}"
        echo -e "${BLUE}💡 You can:${NC}"
        echo -e "   1. Edit config.js with your API key"
        echo -e "   2. Use GitHub Secrets for secure deployment"
        echo -e "   3. Deploy in demo mode (current setup)"
    else
        echo -e "${GREEN}✅ API key found in config.js${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  config.js not found${NC}"
    echo -e "${BLUE}💡 The deployment will use demo mode${NC}"
fi

# Add all files
echo -e "${BLUE}📝 Adding files to Git...${NC}"
git add .

# Commit changes
echo -e "${BLUE}💾 Committing changes...${NC}"
git commit -m "Deploy Weather Dashboard to GitHub Pages"

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    echo -e "${YELLOW}⚠️  No remote repository configured.${NC}"
    echo -e "${BLUE}📋 Please run these commands manually:${NC}"
    echo -e "   1. Create a repository on GitHub"
    echo -e "   2. Run: git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git"
    echo -e "   3. Run: git push -u origin main"
    echo -e ""
    echo -e "${BLUE}🔑 For API key setup:${NC}"
    echo -e "   1. Go to repository Settings → Secrets and variables → Actions"
    echo -e "   2. Add secret: OPENWEATHER_API_KEY"
    echo -e "   3. Value: Your OpenWeatherMap API key"
    exit 1
fi

# Push to GitHub
echo -e "${BLUE}🌐 Pushing to GitHub...${NC}"
git push origin main

echo -e ""
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "   1. Go to your GitHub repository"
echo -e "   2. Click Settings → Pages"
echo -e "   3. Source: 'Deploy from a branch'"
echo -e "   4. Branch: 'gh-pages' (created by workflow)"
echo -e "   5. Click Save"
echo -e ""
echo -e "${BLUE}🌍 Your site will be available at:${NC}"
echo -e "   https://YOUR_USERNAME.github.io/weather-dashboard"
echo -e ""
echo -e "${BLUE}⏰ Wait 2-5 minutes for the site to go live.${NC}"
echo -e ""
echo -e "${BLUE}🔑 API Key Status:${NC}"
if [ -f "config.js" ] && ! grep -q "your_actual_api_key_here" config.js; then
    echo -e "   ${GREEN}✅ API key configured - live weather data enabled${NC}"
else
    echo -e "   ${YELLOW}⚠️  Demo mode - configure API key for live data${NC}"
    echo -e "   ${BLUE}   Use GitHub Secrets for secure deployment${NC}"
fi 