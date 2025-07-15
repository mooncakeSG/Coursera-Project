# 🔧 Weather Dashboard Setup Guide

This guide will help you set up your Weather Dashboard with live weather data using the OpenWeatherMap API.

## 📋 Prerequisites

- A modern web browser
- An OpenWeatherMap API key (free)
- Basic knowledge of file editing

## 🎯 Quick Setup (Recommended)

### Step 1: Get Your API Key

1. **Go to [OpenWeatherMap](https://openweathermap.org/api)**
2. **Sign up** for a free account
3. **Navigate to API Keys** section
4. **Copy your API key** (it looks like: `a1b2c3d4e5f6g7h8i9j0`)

### Step 2: Configure Your API Key

1. **Copy the example config file**:
   ```bash
   cp config.example.js config.js
   ```

2. **Edit `config.js`** and replace `your_actual_api_key_here` with your real API key:
   ```javascript
   window.WEATHER_CONFIG = {
       API_KEY: 'your_real_api_key_here', // Replace this
       BASE_URL: 'https://api.openweathermap.org/data/2.5',
       UNITS: 'metric',
       LANG: 'en'
   };
   ```

3. **Save the file**

### Step 3: Test Your Setup

1. **Open your browser console** (F12 → Console tab)
2. **Refresh the page**
3. **Look for these messages**:
   - ✅ "API key found in config.js"
   - ✅ "API key is valid and working!"
   - ✅ "Setup complete! Your weather dashboard will use live data."

## 🔒 Security Features

- **`config.js` is ignored by Git** - Your API key won't be uploaded to public repositories
- **Multiple fallback methods** - Works with different configuration approaches
- **Demo mode** - Falls back to sample data if API key is missing or invalid

## 🛠️ Advanced Configuration

### Option 1: Environment Variables

Create a `.env` file (for server-side deployment):

```bash
# .env file
OPENWEATHER_API_KEY=your_real_api_key_here
API_BASE_URL=https://api.openweathermap.org/data/2.5
API_UNITS=metric
API_LANG=en
```

### Option 2: Global Environment

Add to your HTML before the main script:

```html
<script>
window.ENV = {
    OPENWEATHER_API_KEY: 'your_real_api_key_here'
};
</script>
```

### Option 3: GitHub Secrets (For Deployment)

1. **Go to your GitHub repository**
2. **Settings** → **Secrets and variables** → **Actions**
3. **Add repository secret**:
   - Name: `OPENWEATHER_API_KEY`
   - Value: Your API key
4. **Use the provided GitHub Actions workflow**

## 🧪 Testing Your Configuration

### Manual Testing

Open browser console and run:

```javascript
// Test if config is loaded
console.log('Config:', window.WEATHER_CONFIG);

// Test API key
WeatherSetup.testApiKey(window.WEATHER_CONFIG.API_KEY);
```

### Automated Testing

The setup script automatically tests your configuration:

1. **Checks for API key** in config files
2. **Tests API connectivity** with a sample request
3. **Shows setup status** in console
4. **Provides helpful error messages**

## 🔍 Troubleshooting

### Common Issues

#### "No API key configured"
- **Solution**: Copy `config.example.js` to `config.js` and add your API key

#### "API key test failed"
- **Solution**: Check your API key format and ensure it's activated (takes a few hours)

#### "API connection failed"
- **Solution**: Check your internet connection and try again

#### "City not found"
- **Solution**: Try different city names or check spelling

### Debug Steps

1. **Check browser console** for error messages
2. **Verify API key format** (should be 32 characters)
3. **Test API key manually** in browser console
4. **Check network tab** for failed requests

## 📊 API Usage

### Free Tier Limits
- **1,000 calls per day**
- **Current weather data**
- **5-day forecast**
- **Weather icons**

### Monitoring Usage
1. **Go to OpenWeatherMap dashboard**
2. **Check API usage statistics**
3. **Monitor for unusual activity**

## 🚀 Deployment with API Key

### For GitHub Pages

1. **Use GitHub Secrets** (most secure)
2. **Follow the deployment guide**
3. **API key is automatically injected** during deployment

### For Other Platforms

- **Netlify**: Add environment variable in site settings
- **Vercel**: Add environment variable in project settings
- **Local**: Use `config.js` file

## ✅ Success Checklist

- [ ] API key obtained from OpenWeatherMap
- [ ] `config.js` file created with real API key
- [ ] Browser console shows "API key is valid and working!"
- [ ] Weather search returns real data
- [ ] No console errors
- [ ] Demo mode disabled (real data showing)

## 🆘 Getting Help

### If You're Stuck

1. **Check the console** for error messages
2. **Verify your API key** is correct
3. **Test with a simple city** like "London"
4. **Check the troubleshooting section** above

### Support Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [GitHub Issues](https://github.com/your-repo/issues)
- [Browser Developer Tools Guide](https://developer.mozilla.org/en-US/docs/Tools)

---

**🎉 You're all set!** Your Weather Dashboard is now configured for live weather data. 