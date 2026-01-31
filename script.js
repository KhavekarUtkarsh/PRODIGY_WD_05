const apiKey = "4ac6490761ff365657dbefb0146447e6"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector('#search input')
const searchButton = document.querySelector('#search_button button')
const locationButton = document.querySelector('#location_icon')



async function checkWeather(city, lat, lon) {

    let url;

    if (city) {

        url = apiUrl + city + `&appid=${apiKey}`;

    } else if (lat && lon) {

        url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;

    } else {

        return;

    }

    const response = await fetch(url)

    if (response.status == 404) {

        document.querySelector('#error').style.display = "block"

        document.querySelector('#second_section').style.display = "none"

        document.querySelector('#weather_box').style.background = "none"

        document.querySelector('#loading').style.display = "none";

    } else {

        var data = await response.json()

        console.log('City from API:', data.name);
        document.querySelector('#city_name').innerHTML = data.name

        document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + " °C"

        document.querySelector('#humidity').innerHTML = data.main.humidity + " %"

        document.querySelector('#feels_like').innerHTML = Math.round(data.main.feels_like) + " °C"

        document.querySelector('#sunrise').innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString()

        document.querySelector('#sunset').innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString()

        document.querySelector('#wind').innerHTML = data.wind.speed + " km/h"

        document.querySelector('#weather').innerHTML = data.weather[0].main

        const icon_Code = data.weather[0].icon

        const iconUrl = `https://openweathermap.org/img/wn/${icon_Code}@2x.png`

        document.querySelector('#weather_icon').src = iconUrl

        document.querySelector('#second_section').style.display = "flex"

        document.querySelector('#error').style.display = "none"

        document.querySelector('#loading').style.display = "none";

        const weather_name = data.weather[0].main.toLowerCase()

        if (weather_name === "clear") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/clear.png')"

            document.querySelector('body').style.background = "#31b6db"

        } else if (weather_name === "clouds") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/clouds.png')"

            document.querySelector('body').style.background = "rgb(99 125 140)"

        } else if (weather_name === "drizzle") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/drizzle.png')"

            document.querySelector('body').style.background = "#577577"

        } else if (weather_name === "rain") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/rain.png')"

            document.querySelector('body').style.background = "#496c7f"

        } else if (weather_name === "snow") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/snow.png')"

            document.querySelector('body').style.background = "#a5dbe9"

        } else if (weather_name === "thunderstorm") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/thunderstorm.png')"

            document.querySelector('body').style.background = "#486671"

        } else if (weather_name === "haze") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/haze.png')"

            document.querySelector('body').style.background = "#b1aea9"

        } else if (weather_name === "fog") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/fog.png')"

            document.querySelector('body').style.background = "#a4b7c5"

        } else if (weather_name === "dust") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/dust.png')"

            document.querySelector('body').style.background = "#d1b08d"

        } else if (weather_name === "tornado") {

            document.querySelector('#weather_box').style.background = "url('Assets/Images/tornado.png')"

            document.querySelector('body').style.background = "#394c50"

        }

        console.log(data)

    }

}

searchButton.addEventListener('click', () => {
    document.querySelector('#loading').style.display = "block";
    document.querySelector('#second_section').style.display = "none";
    document.querySelector('#error').style.display = "none";
    if (searchBox.value === "") {
        document.querySelector('#error').style.display = "block"
        document.querySelector('#error p').innerHTML = "Please Enter City Name!"
        document.querySelector('#loading').style.display = "none";
    } else {
        checkWeather(searchBox.value)
    }
})

locationButton.addEventListener('click', () => {
    document.querySelector('#loading').style.display = "block";
    document.querySelector('#second_section').style.display = "none";
    document.querySelector('#error').style.display = "none";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log('Latitude:', lat, 'Longitude:', lon);
                checkWeather(null, lat, lon);
            },
            (error) => {
                document.querySelector('#error').style.display = "block";
                document.querySelector('#error p').innerHTML = "Unable to retrieve your location.";
                document.querySelector('#loading').style.display = "none";
            }
        );
    } else {
        document.querySelector('#error').style.display = "block";
        document.querySelector('#error p').innerHTML = "Geolocation is not supported by this browser.";
        document.querySelector('#loading').style.display = "none";
    }
});