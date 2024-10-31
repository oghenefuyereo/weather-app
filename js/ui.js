export function displayCurrentWeather(data) {
    // Log current weather data for debugging
    console.log('Displaying current weather data:', data);

    // Check if the expected fields are available in data
    if (data && data.name && data.main && data.weather && data.weather[0]) {
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temp').textContent = `${data.main.temp} °C`;
        document.getElementById('condition').textContent = data.weather[0].description;
    } else {
        console.error('Incomplete current weather data:', data);
    }
}

export function displayForecast(forecastData) {
    // Log forecast data for debugging
    console.log('Displaying forecast data:', forecastData);

    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear any existing forecast

    // Check if daily data is available
    if (!forecastData.daily || forecastData.daily.length === 0) {
        console.error('No daily forecast data available:', forecastData);
        return;
    }

    // Loop through the first 7 days of forecast data
    forecastData.daily.slice(0, 7).forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('forecast-day');

        // Format the date
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        console.log(`Forecast for ${date}:`, day);

        // Check if day.temp and day.weather[0] are available
        if (day.temp && day.weather && day.weather[0]) {
            dayDiv.innerHTML = `
                <p><strong>${date}</strong></p>
                <p>Temp: ${day.temp.day}°C</p>
                <p>${day.weather[0].description}</p>
            `;
            forecastContainer.appendChild(dayDiv);
        } else {
            console.error('Incomplete forecast data for day:', day);
        }
    });
}
