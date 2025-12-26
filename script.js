// Global Constants
const API_KEY = "b505538c59cf4185bf365905252612";
const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";

console.log("Connected");

const searchForm = document.querySelector("form"); 
const searchBox = document.querySelector("input");

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("Search value:", searchBox.value);
});