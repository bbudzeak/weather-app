function formatDate(date) {
  let dayList = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[dayList];

  return `Today, ${day} ${hours}:${minutes}`;
}

let dateElement = document.getElementById("date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

const apiKey = "34b734b8fe98139b171f0fae0dc3bc5c";

function searchCity(event) {
  event.preventDefault();
  let input = document.getElementById("city-search");
  let city = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
  input.value = "";
}

function displayTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let searchingCity = document.getElementById("searching-city");
  let currentTemp = document.getElementById("current-temp");
  currentTemp.innerHTML = `${temperature} °C`;
  searchingCity.innerHTML = `Current data for ${response.data.name}`;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

let form = document.querySelector("form");
let button = document.querySelector("#currentCity");
form.addEventListener("submit", searchCity);
button.addEventListener("click", getLocation);
