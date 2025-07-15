# 🔧 Repository Setup Guide for mooncakeSG/Coursera-Project

This guide will help you fix the current issues with your live Weather Dashboard.

## 🌐 Your Live Site
**URL**: https://mooncakesg.github.io/Coursera-Project/

## 🔍 Current Issues to Fix

### 1. GitHub Actions Workflow Failure

**Problem**: Workflow failing due to missing dependency files
**Solution**: Updated workflow to handle projects without Node.js dependencies

### 2. API Key Configuration

**Problem**: Site showing "API key error"
**Solution**: Choose one of the options below

## 🚀 Quick Fix Options

### Option A: Add API Key (Recommended for Live Data)

1. **Go to your repository**: https://github.com/mooncakeSG/Coursera-Project
2. **Click Settings** tab
3. **Click "Secrets and variables"** → **"Actions"**
4. **Click "New repository secret"**
5. **Name**: `OPENWEATHER_API_KEY`
6. **Value**: Your OpenWeatherMap API key
7. **Click "Add secret"**

### Option B: Keep Demo Mode (Simplest)

**No action needed** - the updated workflow will automatically use demo mode.

## 📋 Steps to Deploy the Fix

### Step 1: Update Your Repository

1. **Go to your repository**: https://github.com/mooncakeSG/Coursera-Project
2. **Click "Add file"** → **"Upload files"**
3. **Upload the updated files**:
   - `.github/workflows/deploy.yml` (updated workflow)
   - Any other files you want to update
4. **Commit message**: "Fix GitHub Actions workflow and API key handling"
5. **Click "Commit changes"**

### Step 2: Check GitHub Pages Settings

1. **Go to Settings** → **Pages**
2. **Source**: Should be "Deploy from a branch"
3. **Branch**: Should be `gh-pages`
4. **If not set correctly**:
   - **Source**: "Deploy from a branch"
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
   - **Click "Save"**

### Step 3: Monitor Deployment

1. **Go to Actions tab**
2. **Watch the workflow run**
3. **Look for green checkmarks**
4. **Wait 2-5 minutes** for deployment

## 🔑 API Key Setup (If Using Option A)

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

## 📊 Expected Results

### After Fix (Demo Mode)
- ✅ **No more workflow errors**
- ✅ **Site loads without API errors**
- ✅ **Demo weather data displays**
- ✅ **Search functionality works with sample data**

### After Fix + API Key
- ✅ **Live weather data**
- ✅ **Real-time city search**
- ✅ **Current weather and forecast**
- ✅ **Professional functionality**

## 🔍 Troubleshooting

### If Workflow Still Fails
1. **Check Actions tab** for specific error messages
2. **Verify all files** are uploaded correctly
3. **Check repository settings**

### If Site Still Shows API Errors
1. **Clear browser cache**
2. **Wait 5-10 minutes** for deployment
3. **Check if config.js** is being generated

### If API Key Not Working
1. **Verify API key** in GitHub Secrets
2. **Check API key format** (should be 32 characters)
3. **Test API key** manually

## 🎯 Success Checklist

- [ ] GitHub Actions workflow runs successfully
- [ ] Site loads without errors
- [ ] Weather dashboard displays properly
- [ ] Search functionality works
- [ ] No console errors
- [ ] Live data (if API key configured) or demo data (if not)

## 📞 Getting Help

If you encounter issues:
1. **Check the Actions tab** for workflow errors
2. **Review browser console** for JavaScript errors
3. **Verify repository settings**
4. **Test with different browsers**

---

**🎉 Your Weather Dashboard will be fully functional after these fixes!** 