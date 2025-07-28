/**
 * Weather Dashboard Configuration
 * 
 * This file contains your API key for live weather data
 * This file is ignored by Git for security
 */

// API Configuration
window.WEATHER_CONFIG = {
    // Your OpenWeatherMap API key
    API_KEY: 'API key here',
    
    // API settings
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    UNITS: 'metric',
    LANG: 'en'
};

// Alternative environment variable method
window.ENV = {
    OPENWEATHER_API_KEY: 'aac82a69dc1be2f5a2a50738a80c87c7'
};

console.log('🔧 Configuration loaded with API key!'); 
