const apiKey = 'f9273d20c395f8af5fa67d733595fbb6';
const form = document.querySelector('form');
const input = document.querySelector('#city');
const weatherDiv = document.querySelector('#weather');
const mapDiv = document.querySelector('#map');
const body = document.querySelector('body');
const temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span');

const nameClass = document.querySelector('.name');
const descriptionClass = document.querySelector('.description');
const tempClass = document.querySelector('.temperature-degree');
const humidityClass = document.querySelector('.humidity');
const windSpeedSection = document.querySelector('.wind');
const windSpeedClass = document.querySelector('.wind-speed');
const windSpeedSpan = document.querySelector('.wind span');
const sunriseClass = document.querySelector('.sunrise');
const sunsetClass = document.querySelector('.sunset');
const weatherImageClass = document.querySelector('.weather-img');


window.addEventListener('load', () => {
    // get user's location
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

            // get weather data from API
            fetch(weatherUrl)
                .then(response => response.json())
                .then(data => {
                    const { main, name, weather } = data;
                    const description = weather[0].description;
                    const icon = weather[0].icon;
                    
                    const humidity = main.humidity;
                    const sunrise = data.sys.sunrise;
                    const sunset = data.sys.sunset;

                    const tempF = main.temp.toFixed(1);
                    const tempC = ((tempF - 32) * (5 / 9)).toFixed(1);

                    const windSpeedMph = data.wind.speed.toFixed(0);
                    const windSpeedKph = (windSpeedMph * 1.609).toFixed(0);

                    // change background color based on temperature
                    if (tempF < 70) {
                        body.classList.remove("hot");
                        body.classList.add("cold");
                    } else {
                        body.classList.add("hot");
                        body.classList.remove("cold");
                    }

                    // format and display weather data
                    nameClass.textContent = name;
                    weatherImageClass.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">`;
                    descriptionClass.textContent = description;
                    tempClass.textContent = tempF;
                    humidityClass.textContent = humidity;
                    windSpeedClass.textContent = windSpeedMph;
                    sunriseClass.textContent = new Date(sunrise * 1000).toLocaleTimeString();
                    sunsetClass.textContent = new Date(sunset * 1000).toLocaleTimeString();

                    // change temperature to Celsius/Fahrenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            tempClass.textContent = tempC;
                        }else {
                            temperatureSpan.textContent = "F";
                            tempClass.textContent = tempF;
                        }
                    });

                    // change wind speed to KPH/MPH
                    windSpeedSection.addEventListener('click', () => {
                        if(windSpeedSpan.textContent === "mph") {
                            windSpeedSpan.textContent = "kph";
                            windSpeedClass.textContent = windSpeedKph;
                        }else {
                            windSpeedSpan.textContent = "mph";
                            windSpeedClass.textContent = windSpeedMph;
                        }
                    });
                    

                })
                // display error message if API call fails
                .catch(error => {
                    console.error(error);
                    weatherDiv.innerHTML = `<p>Something went wrong! Please try again.</p>`;
                });
        });
    } else {
        // display error message if geolocation is not supported
        console.log('Geolocation is not supported by this browser.');
    }
});