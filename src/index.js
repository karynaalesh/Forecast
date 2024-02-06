function updateInfo(responce){
   
    let temperatureElement = document.querySelector("#temperature");
    let temperature = responce.data.temperature.current;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = responce.data.city;
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date (responce.data.time * 1000);

let iconElement = document.querySelector("#icon")

iconElement.innerHTML = `<img src="${responce.data.condition.icon_url}" class="icon" />`

getForecast(responce.data.city);



descriptionElement.innerHTML = responce.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    humidityElement.innerHTML = `${responce.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${responce.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
let apiKey = "d08fodtb894540abf5faf86b23ef312e";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(updateInfo);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
 
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function getForecast(city){
let apiKey = "d08fodtb894540abf5faf86b23ef312e";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Manchester");

function displayForecast(responce) {
    console.log(responce.data);
    let forecastElement = document.querySelector("#forecast");

  
    let forecastHtml = "";


    responce.data.daily.forEach(function(day, index){
        if (index < 5) {
        forecastHtml = forecastHtml + `<div class="forecast-day">
        <div class="date">${formatDay(day.time)}</div>
         <img src="${day.condition.icon_url}" class="forecast-icon" /> 
        <div class="forecast-temperatures">
            <div class="forecast-temp">
                <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="forecast-temp">${Math.round(day.temperature.minimum)}º</div>
        </div>
        </div>`;
        }
    });

   forecastElement.innerHTML = forecastHtml;
}

getForecast("Manchester");