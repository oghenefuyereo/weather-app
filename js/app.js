import { getWeatherData, getForecastData } from './api.js';
import { displayCurrentWeather, displayForecast } from './ui.js';

document.getElementById('search-button').addEventListener('click', async () => {
    const location = document.getElementById('location-input').value || 'London';  // Default location
    console.log(`Fetching weather data for location: ${location}`);

    try {
        // Step 1: Fetch current weather data
        const weatherData = await getWeatherData(location);
        console.log('Current weather data:', weatherData);

        // Display current weather data
        displayCurrentWeather(weatherData);

        // Step 2: Extract coordinates for forecast data
        const { lat, lon } = weatherData.coord;
        console.log(`Coordinates for forecast data - Latitude: ${lat}, Longitude: ${lon}`);

        // Step 3: Fetch forecast data using coordinates
        const forecastData = await getForecastData(lat, lon);
        console.log('Forecast data:', forecastData);

        // Step 4: Display forecast data
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error in app:', error);
        alert(`Error: ${error.message}`);
    }
});
