let searchForm = document.querySelector('.search-form');
let currentNameElement = document.querySelector('.current-name');
let currentDtElement = document.querySelector('.current-dt');
let currentMainElement = document.querySelector('.current-main');
let currentTempElement = document.querySelector('.current-temp');
let currentMinElement = document.querySelector('.current-min');
let currentMaxElement = document.querySelector('.current-max');
let units = 'metric';
let unitsToggle = document.querySelector('.units-toggle');
let currentLocation = 'Melbourne, AU';

//Get data with async function
async function getDataWithInput(input) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&APPID=834d982d871559ff2a0d66421c2599fc`, { mode: 'cors' })
        weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log(error);
    }
}

//Converts date data
function convertDate(dt) {
    let date = new Date(dt * 1000);
    return (date.toDateString());
}

//Converts kelvin to celcius
function roundTempreture(temp) {
    return (temp.toFixed(0));
}

//Fetch current weather data with location input
function getCurrentWeatherData(input) {
    getDataWithInput(input.toString()).then(function (data) {
        console.log(data);
        currentNameElement.textContent = `${data.name}, ${data.sys.country}`;
        currentDtElement.textContent = `${convertDate(data.dt)}`;
        currentMainElement.textContent = data.weather[0].main;
        currentTempElement.textContent = `${roundTempreture(data.main.temp)}˚`;
        currentMinElement.textContent = `L: ${roundTempreture(data.main.temp_min)}˚`;
        currentMaxElement.textContent = `H: ${roundTempreture(data.main.temp_max)}˚`;
    });
}

//Upon searching, retrive input location data and fetch data
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchInput = document.querySelector('#search-input').value;
    currentLocation = searchInput;
    getCurrentWeatherData(currentLocation);
});

unitsToggle.addEventListener('click', () => {
    unitsToggle.classList.remove(units);
    units = (units === 'metric') ? 'imperial' : 'metric';
    unitsToggle.classList.add(units);
    getCurrentWeatherData(currentLocation);
})

//Retrive and append data for 'Melbourne, AU' upon page load
window.onload = function () {
    getCurrentWeatherData(currentLocation);
};
