const apiKey = 'f9273d20c395f8af5fa67d733595fbb6';
const body = document.querySelector('body');
const weatherDiv = document.querySelector('#weather');
const cityForm = document.querySelector('#city-form');
const cityInput = document.querySelector('#city');

const nameClass = document.querySelector('.name');
const descriptionClass = document.querySelector('.description');
const weatherImageClass = document.querySelector('.weather-img');

const temperatureSection = document.querySelector('.temperature');
const tempClass = document.querySelector('.temperature-degree');
const temperatureSpan = document.querySelector('.temperature-unit');

const feelsLikeSection = document.querySelector('.feels-like');
const feelsLikeClass = document.querySelector('.feels-like-degree');
const feelsLikeSpan = document.querySelector('.feels-like-unit');

const humidityClass = document.querySelector('.humidity');

const windSpeedSection = document.querySelector('.wind');
const windSpeedClass = document.querySelector('.wind-speed');
const windSpeedSpan = document.querySelector('.wind-unit');
const windDirectionClass = document.querySelector('.wind-direction');

const visibilityClass = document.querySelector('.visibility');
const sunriseClass = document.querySelector('.sunrise');
const sunsetClass = document.querySelector('.sunset');

function degToCompass(deg) {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return dirs[Math.round(deg / 22.5) % 16];
}

function displayWeather(data) {
    const { main, name, weather, wind, visibility } = data;
    const description = weather[0].description;
    const icon = weather[0].icon;

    const humidity = main.humidity;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    const tempF = main.temp.toFixed(1);
    const tempC = ((tempF - 32) * (5 / 9)).toFixed(1);
    const feelsF = main.feels_like.toFixed(1);
    const feelsC = ((feelsF - 32) * (5 / 9)).toFixed(1);

    const windSpeedMph = wind.speed.toFixed(0);
    const windSpeedKph = (windSpeedMph * 1.609).toFixed(0);
    const windDir = degToCompass(wind.deg);

    const visibilityMi = (visibility / 1609).toFixed(1);
    const visibilityKm = (visibility / 1000).toFixed(1);

    // persist unit preference
    const savedTempUnit = localStorage.getItem('tempUnit') || 'F';
    const savedWindUnit = localStorage.getItem('windUnit') || 'mph';

    if (tempF < 70) {
        body.classList.remove('hot');
        body.classList.add('cold');
    } else {
        body.classList.add('hot');
        body.classList.remove('cold');
    }

    nameClass.textContent = name;
    weatherImageClass.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">`;
    descriptionClass.textContent = description;
    humidityClass.textContent = humidity;
    windDirectionClass.textContent = windDir;
    sunriseClass.textContent = new Date(sunrise * 1000).toLocaleTimeString();
    sunsetClass.textContent = new Date(sunset * 1000).toLocaleTimeString();

    // apply saved temperature unit
    if (savedTempUnit === 'C') {
        tempClass.textContent = tempC;
        temperatureSpan.textContent = 'C';
        feelsLikeClass.textContent = feelsC;
        feelsLikeSpan.textContent = 'C';
    } else {
        tempClass.textContent = tempF;
        temperatureSpan.textContent = 'F';
        feelsLikeClass.textContent = feelsF;
        feelsLikeSpan.textContent = 'F';
    }

    // apply saved wind unit
    if (savedWindUnit === 'kph') {
        windSpeedClass.textContent = windSpeedKph;
        windSpeedSpan.textContent = 'kph';
        visibilityClass.textContent = `${visibilityKm} km`;
    } else {
        windSpeedClass.textContent = windSpeedMph;
        windSpeedSpan.textContent = 'mph';
        visibilityClass.textContent = `${visibilityMi} mi`;
    }

    temperatureSection.addEventListener('click', () => {
        if (temperatureSpan.textContent === 'F') {
            temperatureSpan.textContent = 'C';
            tempClass.textContent = tempC;
            feelsLikeSpan.textContent = 'C';
            feelsLikeClass.textContent = feelsC;
            localStorage.setItem('tempUnit', 'C');
        } else {
            temperatureSpan.textContent = 'F';
            tempClass.textContent = tempF;
            feelsLikeSpan.textContent = 'F';
            feelsLikeClass.textContent = feelsF;
            localStorage.setItem('tempUnit', 'F');
        }
    });

    windSpeedSection.addEventListener('click', () => {
        if (windSpeedSpan.textContent === 'mph') {
            windSpeedSpan.textContent = 'kph';
            windSpeedClass.textContent = windSpeedKph;
            visibilityClass.textContent = `${visibilityKm} km`;
            localStorage.setItem('windUnit', 'kph');
        } else {
            windSpeedSpan.textContent = 'mph';
            windSpeedClass.textContent = windSpeedMph;
            visibilityClass.textContent = `${visibilityMi} mi`;
            localStorage.setItem('windUnit', 'mph');
        }
    });
}

function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(url)
        .then(r => r.json())
        .then(displayWeather)
        .catch(err => {
            console.error(err);
            weatherDiv.innerHTML = `<p>Something went wrong! Please try again.</p>`;
        });
}

function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;
    fetch(url)
        .then(r => r.json())
        .then(data => {
            if (data.cod !== 200) {
                weatherDiv.innerHTML = `<p>City not found. Please try again.</p>`;
                return;
            }
            displayWeather(data);
        })
        .catch(err => {
            console.error(err);
            weatherDiv.innerHTML = `<p>Something went wrong! Please try again.</p>`;
        });
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) fetchWeatherByCity(city);
});

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
            () => console.log('Geolocation denied.')
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
});
