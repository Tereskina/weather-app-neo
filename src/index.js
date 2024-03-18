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

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "af452f84910t3od515bb3246f723ee9b";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
      <div class="row">
            <div class="forecast-day">${formatDay(day.time)}</div>
            <div class="forecast-emoji">
              <img src="${day.condition.icon_url}" class="forecast-emoji-icon"/>
            </div>
            <div class="forecast-temperature">
                <span class="forecast-min-temperature">${Math.round(
                  day.temperature.minimum
                )}°</span>
                <span class="forecast-max-temperature">${Math.round(
                  day.temperature.maximum
                )}°</span>
            </div>
        </div>
      `;
    }
  });
  let forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Oymyakon");
