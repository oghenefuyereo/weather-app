// Function to fetch current weather data
function getCurrentWeather(latitude, longitude, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current weather data');
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
            // Once current weather is fetched, fetch the 3-day forecast
            fetchThreeDayForecast(latitude, longitude, apiKey);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch current weather data. Please try again later.');
        });
}

// Function to display current weather
function displayCurrentWeather(data) {
    const cityElement = document.getElementById('city');
    const currentTempElement = document.getElementById('current-temp');
    const weatherDescriptionElement = document.getElementById('weather-description');

    if (cityElement && currentTempElement && weatherDescriptionElement) {
        cityElement.textContent = `${data.name}`;
        currentTempElement.textContent = `${data.main.temp}°C`;

        // Conditionally set weather description label based on weather conditions
        const weatherDescription = data.weather[0].description.toLowerCase();
        if (weatherDescription.includes('rain')) {
            weatherDescriptionElement.textContent = 'Rainy';
        } else if (weatherDescription.includes('cloud')) {
            weatherDescriptionElement.textContent = 'Cloudy';
        } else if (weatherDescription.includes('clear')) {
            weatherDescriptionElement.textContent = 'Clear';
        } else {
            weatherDescriptionElement.textContent = data.weather[0].description;
        }
    } else {
        console.error('DOM elements not found for current weather display.');
    }
}

// Function to fetch 3-day forecast
function fetchThreeDayForecast(latitude, longitude, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch forecast data');
            }
            return response.json();
        })
        .then(data => {
            displayThreeDayForecast(data.list);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch forecast data. Please try again later.');
        });
}

// Function to display 3-day forecast
function displayThreeDayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    if (forecastContainer) {
        forecastContainer.innerHTML = ''; // Clear previous forecast data

        // Filter data for forecast at noon for the next 3 days
        const filteredData = data.filter(item => {
            // Extract date and time from item.dt_txt
            const date = new Date(item.dt_txt);
            return date.getHours() === 12; // Assuming we want the forecast at noon
        });

        // Display forecast for each day
        filteredData.slice(0, 3).forEach(item => {
            const date = new Date(item.dt_txt);
            const temp = item.main.temp;
            const weatherDescription = item.weather[0].description;

            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <div>${date.toLocaleDateString()}</div>
                <div>${temp}°C</div>
                <div>${weatherDescription}</div>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    } else {
        console.error('Forecast container not found.');
    }
}

// Function to get user's location and fetch weather data
function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiKey = '8c69e35966006ee4625d59e5f1bed11f'; // Replace with your actual OpenWeatherMap API key
            getCurrentWeather(latitude, longitude, apiKey);
        }, error => {
            console.error('Error getting location:', error);
            alert('Failed to get your location. Please allow location access.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Call getLocationAndWeather() when the page loads to fetch weather for the user's location
window.onload = getLocationAndWeather;
