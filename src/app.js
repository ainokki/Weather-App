let apiKey = "e9e91b2ff3ef4ee9f513c835d919042a";
let temperatureElement = document.querySelector("#temperature");
let heading = document.querySelector("#city");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let weatherdescriptionElement = document.querySelector("#description");
let weathericonElement = document.querySelector("#weather-icon");
let temperatureFahrenheit;
let weatherAppLoading = document.querySelector(".weather-app-loading");
let weatherAppLoaded = document.querySelector(".weather-app-loaded");
let temperatureFahrenheitElement = document.querySelector("#fahrenheit");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let formatDate = function (timezoneOffset) {
  let now = new Date();
  now = new Date(now.getTime() + timezoneOffset);
  let day = days[now.getDay()];
  let number = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  let minutes = now.getMinutes();
  let hour = now.getHours();
  return `${day} ${number}/${month}/${year} `;
};

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  temperatureFahrenheit = (Math.round(response.data.main.temp) / 5) * 9 + 32;
  let position = input.value || response.data.name;
  temperatureElement.innerHTML = `${temperature}`;
  temperatureFahrenheitElement.innerHTML = `${temperatureFahrenheit.toFixed(
    0
  )}`;
  heading.innerHTML = input.value || response.data.name;
  humidityElement.innerHTML = `${response.data.main.humidity}`;
  windElement.innerHTML = `${response.data.wind.speed}`;
  weatherdescriptionElement.innerHTML = `${response.data.weather[0].main}`;
  weathericonElement.src =
    "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";
  weatherAppLoading.style.display = "none";
  weatherAppLoaded.style.display = "block";
  time.innerHTML = formatDate(response.data.timezone);

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
            <div class="weather-forecast-date">
                ${formatDay(forecastDay.dt)}<img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="48"
                />
            </div>
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-max"> ${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperatures-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
            </div>
        </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e9e91b2ff3ef4ee9f513c835d919042a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showPosition(position) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    position +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(showTemperature);
  weatherAppLoading.style.display = "block";
  weatherAppLoaded.style.display = "none";
}
function showCurrentPosition(position) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    position.coords.latitude +
    "&lon=" +
    position.coords.longitude +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(showTemperature);
}
let button = document.querySelector("#searchCityButton");
let currentLocationButton = document.querySelector("#currentLocationButton");
let time = document.querySelector(".time");
let input = document.querySelector("#city-input");

let updateCity = function () {
  temperatureElement.innerHTML = "We're working on your request";
  showPosition(input.value);
};

let updateCurrentCity = function () {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
};
navigator.geolocation.getCurrentPosition(showCurrentPosition);
button.addEventListener("click", updateCity);
currentLocationButton.addEventListener("click", updateCurrentCity);

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    showPosition(input.value);
  }
});
