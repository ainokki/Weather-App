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
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let minutes = now.getMinutes();
let hour = now.getHours();
let formatDate = function (now) {
  return `${day} ${hour} ${minutes} `;
};
let updateCity = function () {
  temperatureElement.innerHTML = "We're working on your request";
  time.innerHTML = formatDate(now);
  showPosition(input.value);
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
