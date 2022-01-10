/* const authoriazation = 'mWCeMNBFJx_nnzEUBqxiO6gU_0gqtUGKUwiAIvrkD54'
const url = `https://api.unsplash.com/photos/?client_id=${authoriazation}`;
fetch(url)
    .then(resp => resp.json())
    .then(photolink => console.log(photolink)); */



//get current locatiion and api
const apikey = `dfd2f17ddf980011d1127ca85a3603d6`

function getCurrentWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        //console.log(success);
        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apikey}`)
            .then(resp => resp.json())
            .then(data => deafultWeatherlog(data));
    })
}

getCurrentWeatherData()

const deafultWeatherlog = (data) => {
    //console.log(data)
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