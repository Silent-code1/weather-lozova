let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let changeDate = document.querySelector("#date-change");
changeDate.innerHTML = `Today is ${day} ${hours}:${minutes}`;

currentTemp.innerHTML = celsiusTemperature;

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#currentTemp");
  let fahrenheitLink = document.querySelector("#fahrenheitLink");
  let celsiusLink = document.querySelector("#celsiusLink");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  fahrenheit.innerHTML = Math.round(fahrenheitTemperature);
}

function changeCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#currentTemp");
  let celsiusLink = document.querySelector("#celsiusLink");
  let fahrenheitLink = document.querySelector("#fahrenheitLink");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsius.innerHTML = Math.round(celsiusTemperature);
}

function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function retrieveCityInfo(event) {
  event.preventDefault();
  let apiKey = "c664d12fba35f3eac42867976a8ddf54";
  let city = document.querySelector("#city-input").value;
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", retrieveCityInfo);

function showLocation(position) {
  let apiKey = "c664d12fba35f3eac42867976a8ddf54";
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

let fahrenheit = document.querySelector("#fahrenheitLink");
let celsius = document.querySelector("#celsiusLink");
fahrenheit.addEventListener("click", changeFahrenheit);
celsius.addEventListener("click", changeCelsius);

let currentCity = document.querySelector("#currentLocation");
currentCity.addEventListener("click", currentLocation);

let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", getWeatherFromSearchForm);

let defaultCity = "Lozova";
getWeatherByCity(defaultCity);

let celsiusTemperature = null;

let units = "imperial";

searchCity("Lozova");
