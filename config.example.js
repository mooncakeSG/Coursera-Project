/**
 * Weather Dashboard Configuration
 * 
 * Copy this file to 'config.js' and add your actual API key
 * The 'config.js' file is ignored by Git for security
 */

// API Configuration
window.WEATHER_CONFIG = {
    // Get your API key from: https://openweathermap.org/api
    API_KEY: 'your_actual_api_key_here',
    
    // Optional: Customize API settings
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    UNITS: 'metric', // 'metric', 'imperial', or 'kelvin'
    LANG: 'en'       // Language code for weather descriptions
};

// Environment variables (alternative method)
window.ENV = {
    OPENWEATHER_API_KEY: 'your_actual_api_key_here'
};

console.log('🔧 Configuration loaded. Remember to update with your real API key!'); 