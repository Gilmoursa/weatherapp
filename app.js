const apiKey = 'f9273d20c395f8af5fa67d733595fbb6';

const form = document.querySelector('form');
const input = document.querySelector('#city');
const weatherDiv = document.querySelector('#weather');
const mapDiv = document.querySelector('#map');
const body = document.querySelector('body');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = input.value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    // get weather data from API
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const { main, name, weather } = data;
            const description = weather[0].description;
            const temp = main.temp.toFixed(1);
            const feelsLike = main.feels_like.toFixed(1);
            const humidity = main.humidity;
            const windSpeed = data.wind.speed.toFixed(0);
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;
            if (temp < 70) {
                body.classList.remove("hot");
                body.classList.add("cold");
            } else {
                body.classList.add("hot");
                body.classList.remove("cold");
            }
            weatherDiv.innerHTML = `
            <div class="weather-container">
                <div class="weather-col-one">
                    <p>Current weather in </p>
                    <h2>${name}</h2> 
                    <img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${description}">
                    <p>${description}</p>
                    <h2>Temperature:</h2>
                    <p> ${temp}<sup>&deg;F</sup></p>
                    <h2>Feels Like:</h2>
                    <p> ${feelsLike}<sup>&deg;F</sup></p>
                </div>
                <div class="weather-col-two">
                    <h2>Humidity:</h2><p> ${humidity}%</p>
                    <h2>Wind Speed:</h2><p> ${windSpeed} mph</p>
                    <h2>Sunrise:</h2><p> ${new Date(sunrise * 1000).toLocaleTimeString()}</p>
                    <h2>Sunset:</h2><p> ${new Date(sunset * 1000).toLocaleTimeString()}</p>
                </div>
            </div>
      `;
        })
        .catch(error => {
            console.error(error);
            weatherDiv.innerHTML = `<p>Something went wrong! Please try again.</p>`;
        });

});