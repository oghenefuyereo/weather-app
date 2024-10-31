const API_KEY = '8c69e35966006ee4625d59e5f1bed11f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export async function getWeatherData(location) {
    try {
        const response = await fetch(`${BASE_URL}weather?q=${location}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error(`Location not found: ${location}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw error;
    }
}

export async function getForecastData(lat, lon) {
    try {
        // Use the 'onecall' endpoint with latitude and longitude to get a 7-day forecast
        const response = await fetch(`${BASE_URL}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('Failed to fetch forecast data');
        return await response.json();
    } catch (error) {
        console.error('Error fetching forecast data:', error.message);
        throw error;
    }
}


