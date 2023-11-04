const locationInput = document.getElementById('location');

const fetchBtn = document.getElementById('fetch-btn');
fetchBtn.addEventListener('click', loadForecast);

const currentLocation = document.querySelector('.current-location');
const currentTemp = document.querySelector('.current-temp');
const currentCondition = document.querySelector('.current-condition');

function loadForecast(e) {
    const forecastContainer = document.getElementById('forecast');
    const locationVal = locationInput.value;
    e.preventDefault();

    fetch('http://api.weatherapi.com/v1/forecast.json?key=d63a7fa2b26b421f8f7115448233010&days=3&q='+locationVal, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // Current
        currentLocation.textContent = response.location.name;
        currentTemp.textContent = response.current.temp_c + '°C';
        currentCondition.textContent = response.current.condition.text;

        // Forecast
        const forecastDayElements = forecastContainer.querySelectorAll('.forecast-day');

        for(let i = 0; i < forecastDayElements.length; i++) {
            const forecastDayElement = forecastDayElements[i];
            const forecastDay = response.forecast.forecastday[i];

            forecastDayElement.querySelector('.forecast-date').textContent = forecastDay.date;
            forecastDayElement.querySelector('.forecast-condition').textContent = forecastDay.day.condition.text;
            forecastDayElement.querySelector('.forecast-temp-min').textContent = 'Min: ' + forecastDay.day.mintemp_c + '°C';
            forecastDayElement.querySelector('.forecast-temp-max').textContent = 'Max: ' + forecastDay.day.maxtemp_c + '°C';
        }
    });
}
