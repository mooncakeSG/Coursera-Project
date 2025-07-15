#!/bin/bash

# Weather Dashboard Deployment Script
# This script automates the deployment process to GitHub Pages

echo "🚀 Weather Dashboard Deployment Script"
echo "======================================"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy Weather Dashboard to GitHub Pages"

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    echo "⚠️  No remote repository configured."
    echo "Please run these commands manually:"
    echo "1. Create a repository on GitHub"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git"
    echo "3. Run: git push -u origin main"
    exit 1
fi

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click Settings → Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/ (root)' folder"
echo "5. Click Save"
echo ""
echo "🌍 Your site will be available at:"
echo "   https://YOUR_USERNAME.github.io/weather-dashboard"
echo ""
echo "⏰ Wait 2-5 minutes for the site to go live." 