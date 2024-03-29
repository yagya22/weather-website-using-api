const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', fetchWeather);
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    const cityName = searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},in&appid=ab08e396921f98e8456f33bfb8339cde&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                showError(data.message);
            } else {
                showWeather(data);
            }
        })
        .catch(error => {
            showError('An error occurred. Please try again later.');
        });
}

function showWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} &#8451;</p>
        <p>Weather: ${data.weather[0].main}</p>
      `;

    // Determine weather conditions and set the background image
    const body = document.body;
    if (data.weather[0].main === 'Clouds') {
        body.style.backgroundImage = "url('./assets/cloudy.jpg')";
    } else if (data.weather[0].main === "Haze") {
        body.style.backgroundImage = "url('./assets/Haze.jpg')";
    } else if (data.weather[0].main === 'Clear') {
        body.style.backgroundImage = "url('./assets/Clearsky.jpg')";
    } else if (data.weather[0].main === 'Rain') {
        body.style.backgroundImage = "url('./assets/Raining.jpg')";
    } else if (data.weather[0].main === 'Thunderstorm') {
        body.style.backgroundImage = "url('./assets/Thunderstorm.jpg')";
    } else if (data.weather[0].main === 'Snow') {
        body.style.backgroundImage = "url('./assets/Snowy.jpg')";
    } else {
        // For any other weather condition, set a default background
        body.style.backgroundImage = "url('./assets/default.jpg')";
    }

    clearError();
}

function showError(message) {
    const error = document.getElementById('error');
    error.textContent = message;
}

function clearError() {
    const error = document.getElementById('error');
    error.textContent = '';
}