function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = 0${hours};
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = 0${minutes};
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return ${day} ${hours}:${minutes};
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#currentTemp");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date-change");


  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "c664d12fba35f3eac42867976a8ddf54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//Temperature
function showTemeratureFar(event) {
  event.preventDefault();
  let bodyTemperature = document.querySelector("temperature");
  bodyTemperature.innerHTML = formulaForeight;
}

let fareight = document.querySelector("#fahrenhiit-link");
fareight.addEventListener("click", showTemeratureFar);

let formulaForeight = (17 * 9) / 5 + 32;

function showTemeratureCel(event) {
  event.preventDefault();
  let bodyTemperature = document.querySelector("temperature");
  let formulaCelcius = ((formulaForeight - 32) * 5) / 9;
  bodyTemperature.innerHTML = formulaCelcius;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showTemeratureCel);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Lozova");