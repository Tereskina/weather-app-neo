function search(event) {
  event.preventDefault();

  let searchInputElement = document.getElementById("search-input");
  let cityElement = document.getElementById("current-city");
  cityElement.innerHTML = searchInputElement.value;
  console.log(searchInputElement.value);
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

let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.getElementById("date");
let currentTimeElement = document.getElementById("time");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
currentTimeElement.innerHTML = formatTime(currentDate);
