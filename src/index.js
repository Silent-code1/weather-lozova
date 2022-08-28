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

function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
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

function displayCelsius(event) {
  event.preventDefault();
  let celsiusLink = document.querySelector("#celsiusLink");
  celsiusLink.classList.add("active-temp");
  let fahrenheitink = document.querySelector("#fahrenheitLink");
  fahrenheitink.classList.remove("active-temp");
  let todayTemp = document.querySelector("#temperature");
  console.log(fahrenheitTemperature);
  todayTemp.innerHTML = Math.round((fahrenheitTemperature - 32) / 1.8);
}
function displayFahrenheit(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#temperature");
  let celsiusLink = document.querySelector("#celsiusLink");
  celsiusLink.classList.remove("active-temp");
  todayTemp.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsius);
let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let fahrenheitTemperature = null;

let units = "imperial";

searchCity("Lozova");
