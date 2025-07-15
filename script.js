/**
 * Weather Dashboard - JavaScript Implementation
 * 
 * This file demonstrates proficiency in:
 * - DOM manipulation and event handling
 * - API integration with HTTP requests
 * - JSON data processing
 * - Asynchronous programming
 * - Error handling and user feedback
 * - Clean, well-commented code structure
 */

// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    API_KEY: getApiKey(), // Get API key from environment or fallback
    UNITS: 'metric',
    LANG: 'en'
};

/**
 * Get API key from environment variables or fallback to placeholder
 * @returns {string} API key
 */
function getApiKey() {
    // Check for global config object (from config.js)
    if (typeof window !== 'undefined' && window.WEATHER_CONFIG && window.WEATHER_CONFIG.API_KEY && window.WEATHER_CONFIG.API_KEY !== 'your_actual_api_key_here') {
        console.log('🔑 API key found in WEATHER_CONFIG');
        return window.WEATHER_CONFIG.API_KEY;
    }
    
    // Check for window environment variable (for client-side)
    if (typeof window !== 'undefined' && window.ENV && window.ENV.OPENWEATHER_API_KEY && window.ENV.OPENWEATHER_API_KEY !== 'your_actual_api_key_here') {
        console.log('🔑 API key found in ENV');
        return window.ENV.OPENWEATHER_API_KEY;
    }
    
    // Check for environment variable (for server-side deployment)
    if (typeof process !== 'undefined' && process.env && process.env.OPENWEATHER_API_KEY) {
        console.log('🔑 API key found in process.env');
        return process.env.OPENWEATHER_API_KEY;
    }
    
    // Check for GitHub Pages environment variable (for deployment)
    if (typeof window !== 'undefined' && window.GITHUB_PAGES_API_KEY) {
        console.log('🔑 API key found in GitHub Pages environment');
        return window.GITHUB_PAGES_API_KEY;
    }
    
    // Fallback to placeholder
    console.log('⚠️  No valid API key found, using demo mode');
    return 'YOUR_API_KEY_HERE';
}

// DOM Elements - Cached for performance
const DOM_ELEMENTS = {
    // Search elements
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    errorMessage: document.getElementById('errorMessage'),
    
    // Loading elements
    loadingSection: document.getElementById('loadingSection'),
    
    // Weather display elements
    weatherSection: document.getElementById('weatherSection'),
    locationName: document.getElementById('locationName'),
    locationCountry: document.getElementById('locationCountry'),
    temperature: document.getElementById('temperature'),
    weatherDescription: document.getElementById('weatherDescription'),
    weatherIcon: document.getElementById('weatherIcon'),
    feelsLike: document.getElementById('feelsLike'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    pressure: document.getElementById('pressure'),
    
    // Forecast elements
    forecastContainer: document.getElementById('forecastContainer')
};

// Application State
const APP_STATE = {
    currentCity: '',
    isLoading: false,
    lastSearch: ''
};

/**
 * Utility Functions
 */

/**
 * Formats a date string to a readable format
 * @param {string} dateString - ISO date string
 * @param {boolean} includeTime - Whether to include time in the output
 * @returns {string} Formatted date string
 */
function formatDate(dateString, includeTime = false) {
    const date = new Date(dateString);
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    };
    
    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
    
    return date.toLocaleDateString('en-US', options);
}

/**
 * Converts temperature from Kelvin to Celsius
 * @param {number} kelvin - Temperature in Kelvin
 * @returns {number} Temperature in Celsius
 */
function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

/**
 * Capitalizes the first letter of each word
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
function capitalizeWords(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Shows or hides the loading state
 * @param {boolean} show - Whether to show the loading state
 */
function toggleLoadingState(show) {
    APP_STATE.isLoading = show;
    
    if (show) {
        DOM_ELEMENTS.loadingSection.classList.add('show');
        DOM_ELEMENTS.weatherSection.classList.remove('show');
        hideErrorMessage();
    } else {
        DOM_ELEMENTS.loadingSection.classList.remove('show');
    }
}

/**
 * Shows an error message to the user
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    DOM_ELEMENTS.errorMessage.textContent = message;
    DOM_ELEMENTS.errorMessage.classList.add('show');
}

/**
 * Hides the error message
 */
function hideErrorMessage() {
    DOM_ELEMENTS.errorMessage.classList.remove('show');
}

/**
 * Validates user input
 * @param {string} cityName - City name to validate
 * @returns {boolean} Whether the input is valid
 */
function validateInput(cityName) {
    if (!cityName || cityName.trim().length === 0) {
        showErrorMessage('Please enter a city name');
        return false;
    }
    
    if (cityName.trim().length < 2) {
        showErrorMessage('City name must be at least 2 characters long');
        return false;
    }
    
    return true;
}

/**
 * API Functions
 */

/**
 * Makes an HTTP request to the weather API
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} API response data
 */
async function fetchWeatherData(endpoint, params = {}) {
    const url = new URL(`${API_CONFIG.BASE_URL}/${endpoint}`);
    
    // Add default parameters
    const defaultParams = {
        appid: API_CONFIG.API_KEY,
        units: API_CONFIG.UNITS,
        lang: API_CONFIG.LANG,
        ...params
    };
    
    // Add parameters to URL
    Object.keys(defaultParams).forEach(key => {
        url.searchParams.append(key, defaultParams[key]);
    });
    
    console.log('Making API request to:', url.toString());
    
    try {
        const response = await fetch(url.toString());
        
        console.log('API Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('API Response data:', data);
        
        // Check for API-specific errors
        if (data.cod && data.cod !== 200 && data.cod !== '200') {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

/**
 * Fetches current weather data for a city
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} Current weather data
 */
async function getCurrentWeather(cityName) {
    return await fetchWeatherData('weather', { q: cityName });
}

/**
 * Fetches 5-day forecast data for a city
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} Forecast data
 */
async function getForecast(cityName) {
    return await fetchWeatherData('forecast', { q: cityName });
}

/**
 * UI Update Functions
 */

/**
 * Updates the current weather display
 * @param {Object} weatherData - Weather data from API
 */
function updateCurrentWeather(weatherData) {
    // Update location information
    DOM_ELEMENTS.locationName.textContent = weatherData.name;
    DOM_ELEMENTS.locationCountry.textContent = weatherData.sys.country;
    
    // Update temperature and description
    DOM_ELEMENTS.temperature.textContent = Math.round(weatherData.main.temp);
    DOM_ELEMENTS.weatherDescription.textContent = capitalizeWords(weatherData.weather[0].description);
    
    // Update weather icon
    const iconCode = weatherData.weather[0].icon;
    DOM_ELEMENTS.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    DOM_ELEMENTS.weatherIcon.alt = weatherData.weather[0].description;
    
    // Update additional weather details
    DOM_ELEMENTS.feelsLike.textContent = `${Math.round(weatherData.main.feels_like)}°C`;
    DOM_ELEMENTS.humidity.textContent = `${weatherData.main.humidity}%`;
    DOM_ELEMENTS.windSpeed.textContent = `${weatherData.wind.speed} m/s`;
    DOM_ELEMENTS.pressure.textContent = `${weatherData.main.pressure} hPa`;
}

/**
 * Updates the forecast display
 * @param {Object} forecastData - Forecast data from API
 */
function updateForecast(forecastData) {
    // Clear existing forecast items
    DOM_ELEMENTS.forecastContainer.innerHTML = '';
    
    // Group forecast data by day (every 24 hours)
    const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0);
    
    // Create forecast items for each day
    dailyForecasts.forEach(forecast => {
        const forecastItem = createForecastItem(forecast);
        DOM_ELEMENTS.forecastContainer.appendChild(forecastItem);
    });
}

/**
 * Creates a forecast item element
 * @param {Object} forecast - Forecast data for a specific time
 * @returns {HTMLElement} Forecast item element
 */
function createForecastItem(forecast) {
    const forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';
    
    const date = formatDate(forecast.dt_txt);
    const temperature = Math.round(forecast.main.temp);
    const description = capitalizeWords(forecast.weather[0].description);
    const iconCode = forecast.weather[0].icon;
    
    forecastItem.innerHTML = `
        <div class="forecast-date">${date}</div>
        <img 
            class="forecast-icon" 
            src="https://openweathermap.org/img/wn/${iconCode}.png" 
            alt="${description}"
        >
        <div class="forecast-description">${description}</div>
        <div class="forecast-temp">${temperature}°C</div>
    `;
    
    return forecastItem;
}

/**
 * Shows the weather section
 */
function showWeatherSection() {
    DOM_ELEMENTS.weatherSection.classList.add('show');
}

/**
 * Main Application Functions
 */

/**
 * Handles the search functionality
 * @param {string} cityName - City name to search for
 */
async function handleSearch(cityName) {
    // Prevent duplicate searches
    if (APP_STATE.isLoading || cityName === APP_STATE.lastSearch) {
        return;
    }
    
    // Validate input
    if (!validateInput(cityName)) {
        return;
    }
    
    // Update state
    APP_STATE.currentCity = cityName.trim();
    APP_STATE.lastSearch = cityName.trim();
    
    try {
        // Show loading state
        toggleLoadingState(true);
        
        // Fetch weather data
        const [currentWeather, forecast] = await Promise.all([
            getCurrentWeather(cityName),
            getForecast(cityName)
        ]);
        
        // Update UI with weather data
        updateCurrentWeather(currentWeather);
        updateForecast(forecast);
        
        // Show weather section
        showWeatherSection();
        
        // Clear any previous errors
        hideErrorMessage();
        
    } catch (error) {
        console.error('Weather search failed:', error);
        
        // Handle different types of errors
        if (error.message.includes('404')) {
            showErrorMessage('City not found. Please check the spelling and try again.');
        } else if (error.message.includes('401')) {
            showErrorMessage('API key error. Please check the configuration.');
        } else if (error.message.includes('429')) {
            showErrorMessage('Too many requests. Please try again later.');
        } else {
            showErrorMessage('Failed to fetch weather data. Please try again.');
        }
    } finally {
        // Hide loading state
        toggleLoadingState(false);
    }
}

/**
 * Event Handlers
 */

/**
 * Handles the search button click
 */
function handleSearchButtonClick() {
    const cityName = DOM_ELEMENTS.cityInput.value;
    handleSearch(cityName);
}

/**
 * Handles the Enter key press in the search input
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleSearchInputKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearchButtonClick();
    }
}

/**
 * Handles input changes to clear errors
 */
function handleInputChange() {
    if (DOM_ELEMENTS.errorMessage.classList.contains('show')) {
        hideErrorMessage();
    }
}

/**
 * Initialization Functions
 */

/**
 * Sets up event listeners
 */
function setupEventListeners() {
    // Search button click
    DOM_ELEMENTS.searchBtn.addEventListener('click', handleSearchButtonClick);
    
    // Search input events
    DOM_ELEMENTS.cityInput.addEventListener('keypress', handleSearchInputKeyPress);
    DOM_ELEMENTS.cityInput.addEventListener('input', handleInputChange);
    
    // Focus management for accessibility
    DOM_ELEMENTS.cityInput.addEventListener('focus', () => {
        DOM_ELEMENTS.cityInput.select();
    });
}

/**
 * Initializes the application
 */
function initializeApp() {
    console.log('Weather Dashboard initialized');
    
    // Setup event listeners
    setupEventListeners();
    
    // Set focus to search input for better UX
    DOM_ELEMENTS.cityInput.focus();
    
    // Show initial state
    hideErrorMessage();
    toggleLoadingState(false);
}

/**
 * Demo function to show API functionality without requiring an API key
 * This function simulates API responses for demonstration purposes
 */
function showDemoData() {
    const demoCurrentWeather = {
        name: "New York",
        sys: { country: "US" },
        main: {
            temp: 22,
            feels_like: 24,
            humidity: 65,
            pressure: 1013
        },
        weather: [{
            description: "partly cloudy",
            icon: "02d"
        }],
        wind: { speed: 3.5 }
    };
    
    const demoForecast = {
        list: [
            {
                dt_txt: "2024-01-15 12:00:00",
                main: { temp: 22 },
                weather: [{ description: "partly cloudy", icon: "02d" }]
            },
            {
                dt_txt: "2024-01-16 12:00:00",
                main: { temp: 18 },
                weather: [{ description: "light rain", icon: "10d" }]
            },
            {
                dt_txt: "2024-01-17 12:00:00",
                main: { temp: 25 },
                weather: [{ description: "clear sky", icon: "01d" }]
            },
            {
                dt_txt: "2024-01-18 12:00:00",
                main: { temp: 20 },
                weather: [{ description: "scattered clouds", icon: "03d" }]
            },
            {
                dt_txt: "2024-01-19 12:00:00",
                main: { temp: 23 },
                weather: [{ description: "sunny", icon: "01d" }]
            }
        ]
    };
    
    // Update UI with demo data
    updateCurrentWeather(demoCurrentWeather);
    updateForecast(demoForecast);
    showWeatherSection();
    
    // Update search input
    DOM_ELEMENTS.cityInput.value = "New York";
    APP_STATE.currentCity = "New York";
    APP_STATE.lastSearch = "New York";
}

/**
 * Check if API key is configured and show appropriate message
 */
async function checkApiConfiguration() {
    if (API_CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('API key not configured. Using demo data.');
        
        // Show demo data after a short delay
        setTimeout(() => {
            showDemoData();
        }, 1000);
        
        // Update info section to show demo mode
        const infoCard = document.querySelector('.info-card');
        if (infoCard) {
            const demoNote = document.createElement('div');
            demoNote.className = 'api-note';
            demoNote.style.marginTop = '1rem';
            demoNote.innerHTML = '<strong>Demo Mode:</strong> Using sample data. Configure API key for real weather data.';
            infoCard.querySelector('.info-content').appendChild(demoNote);
        }
    } else {
        console.log('API key configured. Testing API connection...');
        
        // Test the API key with a simple request
        try {
            const testResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_CONFIG.API_KEY}&units=metric`);
            console.log('API Test Response Status:', testResponse.status);
            
            if (testResponse.ok) {
                console.log('✅ API key is valid and working!');
            } else {
                const errorText = await testResponse.text();
                console.error('❌ API key test failed:', errorText);
                
                // Show demo data if API key is invalid
                setTimeout(() => {
                    showDemoData();
                }, 1000);
                
                // Update info section to show API key issue
                const infoCard = document.querySelector('.info-card');
                if (infoCard) {
                    const demoNote = document.createElement('div');
                    demoNote.className = 'api-note';
                    demoNote.style.marginTop = '1rem';
                    demoNote.style.backgroundColor = 'rgb(239 68 68 / 0.1)';
                    demoNote.style.borderColor = 'var(--error-color)';
                    demoNote.style.color = 'var(--error-color)';
                    demoNote.innerHTML = '<strong>API Key Error:</strong> Invalid or expired API key. Using demo data.';
                    infoCard.querySelector('.info-content').appendChild(demoNote);
                }
            }
        } catch (error) {
            console.error('❌ API connection test failed:', error);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    initializeApp();
    await checkApiConfiguration();
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleSearch,
        validateInput,
        formatDate,
        kelvinToCelsius,
        capitalizeWords
    };
} 