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
async function getCurrentDataWithInput(input) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&APPID=834d982d871559ff2a0d66421c2599fc`, { mode: 'cors' })
        weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log(error);
    }
}

async function getForecastDataWithInput(input) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=${units}&appid=834d982d871559ff2a0d66421c2599fc`, { mode: 'cors' })
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

function removeElementChildren(parent) {
    let child = parent.lastElementChild;
        while (child) {
            parent.removeChild(child);
            child = parent.lastElementChild;
        };
}

//Append the weather date, tempreture and main to an element
function appendDateTempMain(data, appendLocation, indexNum, date) {
    //Append Date
    let weatherDt = document.createElement('div');
    weatherDt.classList.add('weather-dt');
    weatherDt.textContent = (date);
    appendLocation.appendChild(weatherDt);

    //Append Tempreture
    let weatherTemp = document.createElement('div');
    weatherTemp.classList.add('weather-temp');
    weatherTemp.textContent = `${roundTempreture((data.list[indexNum]).main.temp)}˚`;
    appendLocation.appendChild(weatherTemp);

    //Append Tempreture
    let weatherMain = document.createElement('div');
    weatherMain.classList.add('weather-main');
    weatherMain.textContent = (data.list[indexNum]).weather[0].main;
    appendLocation.appendChild(weatherMain);
}

//Fetch current weather data with location input
function getCurrentWeatherData(input) {
    getCurrentDataWithInput(input.toString()).then(function (data) {
        // console.log(data);
        currentNameElement.textContent = `${data.name}, ${data.sys.country}`;
        currentDtElement.textContent = `${convertDate(data.dt)}`;
        currentMainElement.textContent = data.weather[0].main;
        currentTempElement.textContent = `${roundTempreture(data.main.temp)}˚`;
        currentMinElement.textContent = `L: ${roundTempreture(data.main.temp_min)}˚`;
        currentMaxElement.textContent = `H: ${roundTempreture(data.main.temp_max)}˚`;
    });
}

//Get the next 24 hours of weather data
function getNext24HourForecast(data) {
    let next24HourForecastDiv = document.querySelector('.next-day-weather-forecast');
    removeElementChildren(next24HourForecastDiv);
    console.log(data);

    for (let i = 0; i <= 8; i++) {
        //Create all DOM elements for each div
        let triHourlyWeather = document.createElement('div');
        triHourlyWeather.classList.add('trihourly-weather-div');
        next24HourForecastDiv.appendChild(triHourlyWeather);

        let date = new Date((data.list[i]).dt * 1000);
        date = (date.toLocaleTimeString()).slice(0, -3);
        appendDateTempMain(data, triHourlyWeather, i,date);
    };
}

//Get the following day's weather
function getFollowingDaysWeather(data) {
    let currentDate = new Date((data.list[0]).dt * 1000);
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < 5; i++) {
        let nextDay = currentDate.setDate(currentDate.getDate() + 1);
        nextDay = (new Date(nextDay)).getDay();
        console.log(weekdays[nextDay]);
    }
}

function getForecastWeatherData(input) {
    getForecastDataWithInput(input.toString()).then(function (data) {
        getNext24HourForecast(data);
        getFollowingDaysWeather(data);
    });
}

//Upon searching, retrive input location data and fetch data
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchInput = document.querySelector('#search-input').value;
    currentLocation = searchInput;
    getCurrentWeatherData(currentLocation);
    getForecastWeatherData(currentLocation);
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
    getForecastWeatherData(currentLocation);
};
