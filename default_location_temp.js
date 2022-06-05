const searchBtn = document.getElementById('searchBtn');
const input = document.getElementById('searchbox');

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
function getCurrentWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${weather}`)
            .then(resp => resp.json())
            .then(data => deafultWeatherlog(data));
    })
}

getCurrentWeatherData()

const deafultWeatherlog = (data) => {
    const getWeatherlogContainer = document.getElementById('weatherResultContainer')
    const tempInKelving = data.current.temp
    const tempInCelsius = tempInKelving - 273.15
    const feelsLikeInKelv = data.current.feels_like
    const feelsLikeInCelsius = parseInt(feelsLikeInKelv - 273.15)

    const displayCurrentWeatherlog = document.createElement('div')
    displayCurrentWeatherlog.classList = 'card-body'
    displayCurrentWeatherlog.innerHTML = `
            <h5 id="currentLoc"class="card-title fs-3">${data.timezone}, ${data.current.weather[0].main}</h5>
            <p class="card-text fs-4">Current Temperature <span class ="fw-bold">${parseInt(tempInCelsius)}&#8451</span></p>

            <p class="card-text fs-4">Feels like
                <span class="fw-bold">${feelsLikeInCelsius}&#8451 </span>
                <span class="text-info">|</span> Humidity ${data.current.humidity}
            </p>
    
    `
    getWeatherlogContainer.appendChild(displayCurrentWeatherlog)
}