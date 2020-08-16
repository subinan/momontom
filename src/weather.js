const weatherSpan = document.querySelector(".weather"),
  weatherIcon = document.querySelector(".weatherIcon");

const API_KEY = "1c6d957a844df25e9baa215d1e2e303a";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const temp = data.main.temp;
        const weathers = data.weather[data.weather.length -1];
        weatherIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
        weatherSpan.innerHTML = `${temp}&#176;C ${weathers.main}`;
    })
}

function handleGeoSucc(position) {
    console.log(position);
    const latitude = position.coords.latitude;  // 경도  
    const longitude = position.coords.longitude;  // 위도
    getWeather(latitude, longitude);
}

function handleGeoErr(err) {
    console.log("geo err! " + err);
}

function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
}

function init() {
  requestCoords();
}

init();
