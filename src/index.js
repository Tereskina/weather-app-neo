function refreshWeather(response) {
  let currentTemperature = Math.round(response.data.temperature.current);
  let currentCondition = response.data.condition.description;
  let currentIcon = `<img src="${response.data.condition.icon_url}" class="emoji" />`;
  let currentHumidity = response.data.temperature.humidity;
  let currentWindSpeed = response.data.wind.speed;

  let currentTemperatureElement = document.getElementById(
    "current-temperature"
  );
  let currentConditionElement = document.getElementById("current-condition");
  let currentIconElement = document.getElementById("current-icon");
  let currentHumidityElement = document.getElementById("current-humidity");
  let currentWindSpeedElement = document.getElementById("current-wind-speed");
  let cityElement = document.getElementById("current-city");

  currentTemperatureElement.innerHTML = `${currentTemperature}°C`;
  currentConditionElement.innerHTML = currentCondition;
  currentIconElement.innerHTML = currentIcon;
  currentHumidityElement.innerHTML = `${currentHumidity}%`;
  currentWindSpeedElement.innerHTML = `${currentWindSpeed} km/h`;
  cityElement.innerHTML = response.data.city;
  console.log(response.data);
}

function formatDate(date) {
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayNumber = date.getDate();
  let month = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let year = date.getFullYear();

  let formattedDay = days[day];
  let formattedMonth = months[month];
  return `${formattedDay}, ${dayNumber} ${formattedMonth} ${year}`;
}

function formatTime(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}

let currentDateElement = document.getElementById("date");
let currentTimeElement = document.getElementById("time");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
currentTimeElement.innerHTML = formatTime(currentDate);

function searchCity(city) {
  let apiKey = "af452f84910t3od515bb3246f723ee9b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.getElementById("search-input");

  searchCity(searchInputElement.value);
}

let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Yakutsk");
