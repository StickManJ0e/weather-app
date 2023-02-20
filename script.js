let searchForm = document.querySelector('.search-form');

//Get data with async function
async function getDataWithInput(input) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=834d982d871559ff2a0d66421c2599fc`, { mode: 'cors' })
        weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log(error);
    }
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchInput = document.querySelector('#search-input').value;
    getDataWithInput(searchInput.toString()).then(function (data) {
        console.log(data);
    });
});
