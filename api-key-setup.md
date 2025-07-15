# 🔑 API Key Setup Guide: Live Weather Data

This guide shows you how to safely add your real OpenWeatherMap API key to get live weather data on your deployed site.

## ⚠️ **Important Security Warning**

**Never commit API keys to public repositories!** This guide shows you secure methods to add your API key without exposing it publicly.

## 🎯 **Option 1: Environment Variables (Most Secure)**

### Step 1: Create Environment File

Create a `.env` file in your project root:

```bash
# .env file
OPENWEATHER_API_KEY=your_actual_api_key_here
```

### Step 2: Update JavaScript Configuration

Modify your `script.js` to use environment variables:

```javascript
// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    API_KEY: process.env.OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE',
    UNITS: 'metric',
    LANG: 'en'
};
```

### Step 3: Add to .gitignore

Ensure `.env` is in your `.gitignore` file (already done):

```gitignore
# Environment variables
.env
.env.local
```

## 🎯 **Option 2: GitHub Secrets (Recommended for GitHub Pages)**

### Step 1: Add Secret to GitHub Repository

1. **Go to your GitHub repository**
2. **Click Settings** → **Secrets and variables** → **Actions**
3. **Click "New repository secret"**
4. **Name**: `OPENWEATHER_API_KEY`
5. **Value**: Your actual API key
6. **Click "Add secret"**

### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build with API key
      env:
        OPENWEATHER_API_KEY: ${{ secrets.OPENWEATHER_API_KEY }}
      run: |
        # Replace placeholder with actual API key
        sed -i "s/YOUR_API_KEY_HERE/$OPENWEATHER_API_KEY/g" script.js
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: .
```

### Step 3: Update Repository Settings

1. **Go to Settings** → **Pages**
2. **Source**: "Deploy from a branch"
3. **Branch**: `gh-pages` (created by the workflow)
4. **Save**

## 🎯 **Option 3: Client-Side Configuration (Simplest)**

### Step 1: Create Configuration File

Create `config.js`:

```javascript
// config.js - Add this file to .gitignore
window.WEATHER_CONFIG = {
    API_KEY: 'your_actual_api_key_here'
};
```

### Step 2: Update HTML

Add to your `index.html` before the main script:

```html
<!-- Add this before script.js -->
<script src="config.js"></script>
<script src="script.js"></script>
```

### Step 3: Update JavaScript

Modify `script.js`:

```javascript
// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    API_KEY: window.WEATHER_CONFIG?.API_KEY || 'YOUR_API_KEY_HERE',
    UNITS: 'metric',
    LANG: 'en'
};
```

### Step 4: Add to .gitignore

```gitignore
# Configuration files
config.js
```

## 🎯 **Option 4: Netlify/Vercel Environment Variables**

If you deploy to Netlify or Vercel:

### Netlify Setup

1. **Go to Site Settings** → **Environment variables**
2. **Add variable**:
   - Key: `OPENWEATHER_API_KEY`
   - Value: Your API key
3. **Deploy automatically**

### Vercel Setup

1. **Go to Project Settings** → **Environment Variables**
2. **Add variable**:
   - Name: `OPENWEATHER_API_KEY`
   - Value: Your API key
   - Environment: Production
3. **Redeploy**

## 🔧 **Testing Your API Key**

### Step 1: Get Your API Key

1. **Go to [OpenWeatherMap](https://openweathermap.org/api)**
2. **Sign up/Login**
3. **Go to API Keys section**
4. **Copy your API key**

### Step 2: Test Locally

1. **Update your `script.js`** with your API key
2. **Open browser console** (F12)
3. **Search for a city**
4. **Check console for**: "✅ API key is valid and working!"

### Step 3: Test Deployed Site

1. **Deploy with your chosen method**
2. **Visit your live site**
3. **Test weather search functionality**
4. **Verify real data is displayed**

## 🚨 **Security Best Practices**

### ✅ **Do This**
- Use environment variables
- Add config files to `.gitignore`
- Use GitHub Secrets for automated deployment
- Test API key locally first
- Monitor API usage

### ❌ **Don't Do This**
- Commit API keys to public repositories
- Share API keys in public forums
- Use API keys in client-side code without protection
- Forget to add files to `.gitignore`

## 📊 **API Usage Monitoring**

### Check Your Usage

1. **Go to OpenWeatherMap dashboard**
2. **View API usage statistics**
3. **Monitor for unusual activity**
4. **Set up usage alerts if available**

### Rate Limits

- **Free tier**: 1,000 calls/day
- **Paid tiers**: Higher limits available
- **Monitor usage** to avoid hitting limits

## 🔄 **Updating API Keys**

### If You Need to Change Your Key

1. **Generate new key** on OpenWeatherMap
2. **Update your configuration** (using chosen method)
3. **Test locally** first
4. **Deploy changes**
5. **Verify functionality**

## 🎉 **Success Checklist**

- [ ] API key obtained from OpenWeatherMap
- [ ] Configuration method chosen and implemented
- [ ] API key tested locally
- [ ] Security measures in place (`.gitignore`, etc.)
- [ ] Deployed with live API key
- [ ] Live site tested and working
- [ ] Usage monitoring set up

## 🆘 **Troubleshooting**

### Common Issues

1. **API key not working**:
   - Check if key is activated (takes a few hours)
   - Verify key format is correct
   - Test with simple API call

2. **CORS errors**:
   - Ensure you're using HTTPS
   - Check domain restrictions
   - Verify API endpoint

3. **Rate limit exceeded**:
   - Check usage in OpenWeatherMap dashboard
   - Consider upgrading plan
   - Implement caching

### Debug Steps

1. **Check browser console** for errors
2. **Verify API key** in OpenWeatherMap dashboard
3. **Test API endpoint** directly
4. **Check network tab** for failed requests

---

**🎯 Ready to go live with real weather data!** Choose the method that best fits your deployment setup and security requirements. 