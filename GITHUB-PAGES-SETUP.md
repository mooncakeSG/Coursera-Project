# 🌐 GitHub Pages Deployment Guide

Complete guide for deploying your Weather Dashboard to GitHub Pages with live weather data.

## 🚀 Quick Start (3 Options)

### Option 1: Automated Deployment (Recommended)

**For Windows:**
```bash
deploy-github-pages.bat
```

**For Mac/Linux:**
```bash
chmod +x deploy-github-pages.sh
./deploy-github-pages.sh
```

### Option 2: Manual Deployment

1. **Create GitHub Repository**
2. **Upload Files**
3. **Enable GitHub Pages**
4. **Configure API Key** (optional)

### Option 3: GitHub Actions (Most Professional)

1. **Add API Key to Secrets**
2. **Push Code**
3. **Automatic Deployment**

## 📋 Detailed Steps

### Step 1: Create GitHub Repository

1. **Go to [GitHub.com](https://github.com)**
2. **Click "+" → "New repository"**
3. **Repository name**: `weather-dashboard`
4. **Description**: `A modern weather dashboard with API integration`
5. **Visibility**: Public (required for free GitHub Pages)
6. **Initialize with**: Check "Add a README file"
7. **Click "Create repository"**

### Step 2: Upload Your Files

#### Method A: Web Interface (Easiest)

1. **In your repository**, click "Add file" → "Upload files"
2. **Drag and drop** all project files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `deployment-guide.md`
   - `SETUP.md`
   - `.github/workflows/deploy.yml`
3. **Commit message**: "Initial commit: Weather Dashboard"
4. **Click "Commit changes"**

#### Method B: Git Command Line

```bash
# Navigate to your project folder
cd /path/to/your/weather-dashboard

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Weather Dashboard"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. **Go to repository Settings** → **Pages**
2. **Source**: "Deploy from a branch"
3. **Branch**: `gh-pages` (created by workflow)
4. **Folder**: `/ (root)`
5. **Click "Save"**

### Step 4: API Key Configuration

#### Option A: GitHub Secrets (Most Secure)

1. **Go to repository Settings** → **Secrets and variables** → **Actions**
2. **Click "New repository secret"**
3. **Name**: `OPENWEATHER_API_KEY`
4. **Value**: Your OpenWeatherMap API key
5. **Click "Add secret"**

**Benefits:**
- ✅ API key never exposed in code
- ✅ Automatic deployment with live data
- ✅ Secure and professional

#### Option B: Demo Mode (Simplest)

**Skip API key setup** - your site will work with sample data.

#### Option C: Manual Config (Not Recommended)

1. **Create `config.js`** with your API key
2. **Upload manually** after each deployment
3. **Note**: Exposes API key publicly

## 🔧 GitHub Actions Workflow

The included workflow (`.github/workflows/deploy.yml`) automatically:

1. **Checks for API key** in GitHub Secrets
2. **Creates secure config.js** with your API key
3. **Deploys to GitHub Pages**
4. **Handles demo mode** if no API key is provided

### Workflow Features

- ✅ **Automatic deployment** on every push
- ✅ **API key injection** from GitHub Secrets
- ✅ **Demo mode fallback** if no API key
- ✅ **Secure handling** of sensitive data
- ✅ **Error handling** and logging

## 🌍 Your Live Site

After deployment, your site will be available at:
```
https://YOUR_USERNAME.github.io/weather-dashboard
```

### What You'll See

- ✅ **Fully functional weather dashboard**
- ✅ **Real weather data** (if API key configured)
- ✅ **Demo data** (if no API key)
- ✅ **Responsive design** on all devices
- ✅ **Professional appearance**

## 🔑 API Key Setup

### Getting Your API Key

1. **Go to [OpenWeatherMap](https://openweathermap.org/api)**
2. **Sign up** for free account
3. **Navigate to API Keys**
4. **Copy your API key**

### Adding to GitHub Secrets

1. **Repository Settings** → **Secrets and variables** → **Actions**
2. **"New repository secret"**
3. **Name**: `OPENWEATHER_API_KEY`
4. **Value**: Your API key
5. **"Add secret"**

## 📊 Deployment Status

### Check Deployment

1. **Go to repository** → **Actions tab**
2. **View workflow runs**
3. **Check for green checkmarks**
4. **Look for deployment URL**

### Common Status Messages

- ✅ **"Deploy to GitHub Pages"** - Success
- ⚠️ **"API key not found"** - Using demo mode
- ❌ **"Workflow failed"** - Check logs

## 🔍 Troubleshooting

### Site Not Loading

1. **Check GitHub Pages settings**
2. **Verify repository is public**
3. **Wait 5-10 minutes** for initial deployment
4. **Check Actions tab** for errors

### API Not Working

1. **Verify API key** in GitHub Secrets
2. **Check browser console** for errors
3. **Test API key** manually
4. **Check rate limits**

### Styling Issues

1. **Clear browser cache**
2. **Check file paths** in HTML
3. **Verify all files** uploaded
4. **Check for CSS errors**

## 🎯 Success Checklist

- [ ] Repository created on GitHub
- [ ] All files uploaded successfully
- [ ] GitHub Pages enabled
- [ ] Site accessible at `https://YOUR_USERNAME.github.io/weather-dashboard`
- [ ] Weather search functionality works
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] API integration functioning (if configured)

## 📈 Next Steps

After successful deployment:

1. **Share your live URL** with others
2. **Add to your portfolio** or resume
3. **Consider adding more features**:
   - User location detection
   - Weather alerts
   - Historical weather data
   - Multiple language support

## 🆘 Getting Help

### If You're Stuck

1. **Check the Actions tab** for workflow errors
2. **Review browser console** for JavaScript errors
3. **Verify all files** are uploaded correctly
4. **Test with different browsers**

### Support Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)

---

**🎉 Congratulations!** Your Weather Dashboard is now live on GitHub Pages and accessible to anyone worldwide! 