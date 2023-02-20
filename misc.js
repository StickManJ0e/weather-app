

getData().then(function (data) {
    console.log(data);
    //Get date and format
    const dt = data.dt;
    var day = new Date(dt * 1000);
    console.log(day.toUTCString()) // 'Fri, 15 Jan 2021 04:32:29 GMT'
    console.log(day.toDateString()) // 'Fri Jan 15 2021'
    console.log(day.toISOString()) // '2021-01-15T04:32:29.000Z'
    console.log(day.toString()) // 'Fri Jan 15 2021 07:32:29 GMT+0300 (GMT+03:00)'
});

//5 day forecast
'https://api.openweathermap.org/data/2.5/forecast?q=London&appid=834d982d871559ff2a0d66421c2599fc'

//Get data with promise
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