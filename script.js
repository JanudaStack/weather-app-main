// Global Constants
const API_KEY = "b505538c59cf4185bf365905252612";
const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";

console.log("Connected");

const searchForm = document.querySelector("form"); 
const searchBox = document.querySelector("input");

const cityLabel = document.querySelector(".weather-widget__card h2");
const dateLabel = document.querySelector(".weather-widget__card p");
const tempLabel = document.querySelector(".main-display span");
const iconImage = document.querySelector(".main-display .icon img");

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // console.log("Search value:", searchBox.value);

    const city = searchBox.value;

    fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);

        const data = await response.json();

        updateUI(data);

        console.log(data);

    } catch (error) {
        console.log("Failed to fetch API. Error: ", error);        
    }
}

function updateUI(data) {
    cityLabel.innerText = `${data.location.name}, ${data.location.country}`;

    const date = new Date(data.location.localtime);
    dateLabel.innerText = `${Math.round(data.current.temp_f)}°`;

    iconImage.src = `https.${data.current.condition.icon}`;

    iconImage.alt = data.current.condition.text;
}