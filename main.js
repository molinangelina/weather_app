document.querySelector("#city_name").addEventListener("input", searchForWeather);

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
    return string.toLowerCase();
}

function searchForWeather(e) {
    const name = document.querySelector("#city_name").value;
    const city_name = lowerCaseName(name);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=da731f456393cac80bf2c4c120c3a5a0&units=imperial&lang={en}`)
        .then(response => response.json())
        .then(data => {
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data['weather'][0]["icon"]}.svg`
            document.querySelector(".weatherBox").innerHTML = `
                <div class="card text-white text-center border-0">
                <img class="card-img" src='https://play-lh.googleusercontent.com/_wFZJYU23xaf4Nh-NCFtp9grLrmMpgpqR6fmsFbjDq3cU5xVmghssgh5Ox41gemIu8Q'>
                <div class="card-img-overlay">
                    <img class="city-icon" src="${icon}">
                    <h2>${capitalizeFirstLetter(data.name)}</h2>
                    <h1>${data['main']['temp'] + '°'}</h1>
                    <h5>${capitalizeFirstLetter(data['weather'][0]['description'])}</h5>
                    <small>High ${data['main']['temp_max'] + '°'}</small>
                    <small>Low ${data['main']['temp_min'] + '°'}</small>
                    <br>
                    <small>Feels like ${data['main']['feels_like'] + '°'}</small>
                </div>
                </div>`;
        })
    }