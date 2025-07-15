/**
 * Weather Dashboard API Setup Script
 * 
 * This script helps you set up your API key for live weather data
 * Run this in your browser console or include it in your HTML
 */

(function() {
    'use strict';
    
    console.log('🔧 Weather Dashboard API Setup');
    console.log('================================');
    
    // Check if config file exists
    function checkConfig() {
        if (typeof window.WEATHER_CONFIG !== 'undefined' && 
            window.WEATHER_CONFIG.API_KEY && 
            window.WEATHER_CONFIG.API_KEY !== 'your_actual_api_key_here') {
            console.log('✅ API key found in config.js');
            return true;
        }
        
        if (typeof window.ENV !== 'undefined' && 
            window.ENV.OPENWEATHER_API_KEY && 
            window.ENV.OPENWEATHER_API_KEY !== 'your_actual_api_key_here') {
            console.log('✅ API key found in environment variables');
            return true;
        }
        
        console.log('❌ No API key configured');
        return false;
    }
    
    // Test API key
    async function testApiKey(apiKey) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
            
            if (response.ok) {
                console.log('✅ API key is valid and working!');
                return true;
            } else {
                const error = await response.text();
                console.log('❌ API key test failed:', error);
                return false;
            }
        } catch (error) {
            console.log('❌ API connection failed:', error.message);
            return false;
        }
    }
    
    // Setup instructions
    function showSetupInstructions() {
        console.log('');
        console.log('📋 Setup Instructions:');
        console.log('1. Get your API key from: https://openweathermap.org/api');
        console.log('2. Copy config.example.js to config.js');
        console.log('3. Replace "your_actual_api_key_here" with your real API key');
        console.log('4. Refresh this page');
        console.log('');
        console.log('🔒 Security Note: config.js is ignored by Git for security');
        console.log('');
    }
    
    // Main setup function
    async function setupApi() {
        const hasConfig = checkConfig();
        
        if (!hasConfig) {
            showSetupInstructions();
            return;
        }
        
        // Get API key from config
        const apiKey = window.WEATHER_CONFIG?.API_KEY || window.ENV?.OPENWEATHER_API_KEY;
        
        if (apiKey && apiKey !== 'your_actual_api_key_here') {
            console.log('🧪 Testing API key...');
            const isValid = await testApiKey(apiKey);
            
            if (isValid) {
                console.log('🎉 Setup complete! Your weather dashboard will use live data.');
            } else {
                console.log('⚠️  API key test failed. Check your key and try again.');
            }
        } else {
            showSetupInstructions();
        }
    }
    
    // Run setup when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupApi);
    } else {
        setupApi();
    }
    
    // Make functions available globally for manual testing
    window.WeatherSetup = {
        checkConfig,
        testApiKey,
        setupApi
    };
    
})(); 