# Weather App

A simple weather app built with vanilla JavaScript using the [OpenWeatherMap API](https://openweathermap.org/api).

**Live demo:** https://gilmoursa.github.io/weatherapp/

## Features

- **Geolocation** — automatically loads weather for your current location on page load (requires browser permission)
- **City search** — search any city by name using the form in the top-right corner
- **Weather data displayed:**
  - City name, weather description, and condition icon
  - Temperature with Feels Like
  - Humidity
  - Wind speed and compass direction (N, NNE, SW, etc.)
  - Visibility
  - Sunrise and sunset times
- **Unit toggles** — click Temperature to switch between °F and °C; click Wind Speed to switch between mph and kph. Both preferences are saved to `localStorage` and persist across page reloads.
- **Dynamic background** — the page background gradient updates based on the current weather condition and temperature:

  | Condition | Temperature | Background |
  |---|---|---|
  | Thunderstorm | any | Deep indigo → near black |
  | Rain | < 40°F | Dark navy → steel blue |
  | Rain | ≥ 40°F | Slate blue → blue-grey |
  | Snow | any | Pale sky blue → soft white |
  | Fog / Mist / Haze | any | Medium grey → silver |
  | Clear | ≥ 95°F | Burnt orange → gold |
  | Clear | 80–95°F | Deep orange → warm gold |
  | Clear | 65–80°F | Dodger blue → sky blue |
  | Clear | 50–65°F | Bright blue → pale blue |
  | Clear | 32–50°F | Cool blue → icy blue |
  | Clear | < 32°F | Slate blue → periwinkle |
  | Cloudy | ≥ 70°F | Grey-blue → light grey |
  | Cloudy | 50–70°F | Steel grey → blue-grey |
  | Cloudy | < 50°F | Dark slate → cool grey |

## Tech stack

- Vanilla HTML, CSS, JavaScript (no frameworks or build step)
- [OpenWeatherMap Current Weather API](https://openweathermap.org/current)
- Hosted on GitHub Pages

## Running locally

Just open `index.html` in a browser — no install or build step required. You'll need to allow location access or use the city search.
