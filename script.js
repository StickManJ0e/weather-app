async function getData() {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&APPID=834d982d871559ff2a0d66421c2599fc`, { mode: 'cors' })
        let weatherData = await response.json();
        console.log(weatherData.main.temp);
    } catch (error) {
        console.log(error);
    }
}

function getDataPromise() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&APPID=834d982d871559ff2a0d66421c2599fc`, { mode: 'cors' })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response.main.temp);
    })
    .catch(e => {
        console.log(e)
    });  
}
getData();
getDataPromise();


