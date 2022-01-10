const apiKey = 'dfd2f17ddf980011d1127ca85a3603d6'

const runWeatherMap = async () => {
    const getSearchInfo = document.getElementById('searchbox')
    const getCityname = getSearchInfo.value
    getSearchInfo.value = '';

    const url = (`https://api.openweathermap.org/data/2.5/weather?q=${getCityname}&appid=${apiKey}`);
    const resp = await fetch(url)
    const tempdata = await resp.json();
    if (tempdata.cod == 200) {
        getTmepData(tempdata, getCityname);
    }
    else {
        const getWeatherlogContainer = document.getElementById('weatherResultContainer')
        getWeatherlogContainer.textContent = ''
        const errroMsg = document.createElement('h1')
        errroMsg.classList = "p-5"
        errroMsg.innerText = `We didn't find any city with in this "${getCityname}" name`
        console.log('error aise')
        getWeatherlogContainer.appendChild(errroMsg)
    }
}

const getTmepData = (tempdata, getCityname) => {
    //console.log(tempdata)

    const getWeatherlogContainer = document.getElementById('weatherResultContainer')
    getWeatherlogContainer.textContent = ''
    //console.log(tempdata)

    const tempInCelsius = tempdata.main.temp - 273.15
    const maxTemp = tempdata.main.temp_max - 273.15
    const minTemp = tempdata.main.temp_min - 273.15
    const feelsLike = tempdata.main.feels_like - 273.15

    // show data in the display box
    const displayCurrentWeatherlog = document.createElement('div')
    displayCurrentWeatherlog.classList = 'card-body'
    displayCurrentWeatherlog.innerHTML = `
            <h5 id="currentLoc"class="card-title fs-3">${tempdata.name}, ${tempdata.sys.country}</h5>

            <p class="card-text fs-4">Current Temperature <span class ="fw-bold">${parseInt(tempInCelsius)}&#8451</span></p>

            <p class="card-text fs-4">Maximum Temperature <span class ="fw-bold">${parseInt(maxTemp)}&#8451</span></p>

            <p class="card-text fs-4">Minimum Temperature <span class ="fw-bold">${parseInt(minTemp)}&#8451</span></p>

            <p class="card-text fs-4">Sky is like <span class ="fw-bold">${tempdata.weather[0].description}&#8451</span></p>

            <p class="card-text fs-4">Feels like
                <span class="fw-bold">${parseInt(feelsLike)}&#8451 </span>
                <span class="text-info fs-3">|</span> Humidity ${tempdata.main.humidity}
            </p> 
            `
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + getCityname + "')"
    getWeatherlogContainer.appendChild(displayCurrentWeatherlog)
}

/* const authoriazation = 'mWCeMNBFJx_nnzEUBqxiO6gU_0gqtUGKUwiAIvrkD54'
const url = `https://api.unsplash.com/search/photos?query=khulna&client_id=mWCeMNBFJx_nnzEUBqxiO6gU_0gqtUGKUwiAIvrkD54`;
fetch(url)
    .then(resp => resp.json())
    .then(photolink => getPhotos(photolink));
console.log(url)
const getPhotos = (photosData) => {
    console.log(photosData)
    const imgContainer = document.getElementById('bg-img')
    const img = photosData.results[2].urls.full
    const createImg = document.createElement('img')
    createImg.classList = 'img'
    createImg.src = `${img}`
    imgContainer.appendChild(createImg)
}

`https://api.unsplash.com/photos/?client_id=${authoriazation}`  */
