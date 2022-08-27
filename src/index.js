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
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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

let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
  if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="day-forecast">${formatDay(forecastDay.dt)}</div>
        <div class = "forecas-icon"> 
        <img src= "./img/${
          forecastDay.weather[0].icon
        }.png" alt="sun-rain-cloud" width="45"/>
        </div>
        <div class = "forecast-temperature">
        <span class = "forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span> 
        <span class = "forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </div>
        <div class="max-min">max &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min</div>
    </div>
  `;
  }
});
