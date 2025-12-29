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

// Stats card
const feelsLikeVal = document.querySelector(".data-card:nth-child(1) .data-value");
const humidityVal = document.querySelector(".data-card:nth-child(2) .data-value");
const windVal = document.querySelector(".data-card:nth-child(3) .data-value");
const precipVal = document.querySelector(".data-card:nth-child(4) .data-value");

// Daily forecast
const dailyContainer = document.querySelector(".forecast-grid");

// Hourly forecast
const hourlyContainer = document.querySelector(".hourly-forecast__list");

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

        if (!response.ok) {
            alert("Please enter correct city!");
            throw new Error("City not found!");
        }

        const data = await response.json();

        updateUI(data);

        console.log(data);

    } catch (error) {
        console.log("Failed to fetch API.", error);        
    }
}

function updateUI(data) {
    // Widget card update
    cityLabel.innerText = `${data.location.name}, ${data.location.country}`;

    const date = new Date(data.location.localtime);
    
    dateLabel.innerText = date.toDateString();
    tempLabel.innerText = `${Math.round(data.current.temp_f)}°`;
    iconImage.src = `https.${data.current.condition.icon}`;
    iconImage.alt = data.current.condition.text;

    // Stats card update
    feelsLikeVal.innerText = `${Math.round(data.current.feelslike_f)}`;
    humidityVal.innerText = `${data.current.humidity}%`;
    windVal.innerText = `${data.current.wind_mph} mph`;
    precipVal.innerText = `${data.current.precip_in} in`;

    // Daily forecast update
    dailyContainer.innerHTML = "";

    const dailyData = data.forecast.forecastday;

    dailyData.forEach((dayData) => {
        const date = new Date(dayData.date);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        const html = `
        <li class="forecast-card">
            <h3 class="forecast-card__day">${dayName}</h3>
        
            <div class="forecast-card__icon">
                <img src="https:${dayData.day.condition.icon}" alt="weather icon">
            </div>

            <div class="forecast-card__temp-range">
                <span class="forecast-card__temp--high">${Math.round(dayData.day.maxtemp_f)}°</span>
                <span class="forecast-card__temp--low">${Math.round(dayData.day.mintemp_f)}°</span>
            </div>
        </li>
        `;

        dailyContainer.innerHTML += html;
    });

    // Hourly forecast update
    const currentHour = new Date().getHours(); // Get current hour

    hourlyContainer.innerHTML = ""; // Clear old data

    const hourlyData = data.forecast.forecastday[0].hour;

    hourlyData.forEach((hourObj) => {
        const time = new Date(hourObj.time);
        const hourNumber = time.getHours();

        if (hourNumber > currentHour) {
            const html = `
                <li class="forecast-row">
                    <div class="forecast-row__icon">
                        <img src="https:${hourObj.condition.icon}" alt="weather icon">
                    </div>
                    <div class="forecast-row__time">
                        ${time.toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}
                    </div>
                    <div class="forecast-row__temp">
                        ${Math.round(hourObj.temp_f)}°
                    </div>
                </li>
            `;

            hourlyContainer.innerHTML += html;
        }
    })
}