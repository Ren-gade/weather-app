// link to weather API
let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

// show weather for user based on geolocation
function showLocation(location) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let geoLocationShow = `https://api.openweathermap.org/data/2.5/weather?q=lat=${lat}&lon=${long}&units=metric`;
  let geoAdvancedForecast = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
}
navigator.geolocation.getCurrentPosition(showLocation);
// use api to call 16 day forecast based on geolocation
// else
// have input from user in form #city-input = city
// use user input to update a h1 to show the City Name
// have the current temperature showing under said h1
// use descriptor from current weather
// let description = document.querySelector("#temperature-description");
//temperatureElement.innerHTML = `${temperature}`;
//description.innerHTML = response.data.weather[0].description;
// show icons based on description

// use api call to show 16 day forecast
//let advancedForcast = `https://api.openweathermap.org/data/2.5/forecast/daily?${city&appid=${apiKey}&units=metric`;
// on each card, show: ${day}, ${temp}, ${feelsLike} ${description}, ${icon based on description},
// option to change to F

let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let dayOfWeek = days[new Date().getDay()];

function formatDate(date) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let dayOfWeek = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  let pm = false;
  if (hour >= 12) {
    hour -= 12;
    pm = true;
  }

  let timeString = `${hour}:${minute.toString().padStart(2, "0")}`;
  if (pm) {
    timeString += "pm";
  } else {
    timeString += "am";
  }

  return `${dayOfWeek}, ${timeString}`;
}
//show the h1 as today's date and time
let h1 = document.querySelector("h1");
h1.innerHTML = `${formatDate(new Date())}`;

// Add a Search engine. When searching for a city, display the city name
// on the page after the user submits the form.
function city(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  let citySearch = document.querySelector("#city-search");

  if (cityName.value !== "") {
    citySearch.innerHTML = `Searching for ${cityName.value}...`;
  } else {
    alert("Please enter a city to begin searching.");
  }
}

let challengeTwo = document.querySelector("#city-form");
challengeTwo.addEventListener("submit", city);

// Display a temperature in Celcius and add a link to convert it to Farenheit.
// WHen clicking on F, it should convert the displayed temperature in Fahrenheit.
// When clicking on C, it should convert the displayed temperature in Celcius

var temperatureCelsius = 18;

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

function displayTemperature(unit) {
  var temperature = document.getElementById("temperature");
  var fahrenheitButton = document.getElementById("fahrenheit");
  var celsiusButton = document.getElementById("celsius");
  if (unit == "C") {
    temperature.innerHTML = "<h2>" + Math.round(temperatureCelsius) + "°C</h2>";
    fahrenheitButton.style.display = "inline-block";
    celsiusButton.style.display = "none";
  } else if (unit == "F") {
    temperature.innerHTML =
      "<h2>" + Math.round(celsiusToFahrenheit(temperatureCelsius)) + "°F</h2>";
    fahrenheitButton.style.display = "none";
    celsiusButton.style.display = "inline-block";
  }
}

function challengeFive(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `It is ${temperature}°C in Sydney, Australia.`;
}
function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  challengeFive(response);
}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
