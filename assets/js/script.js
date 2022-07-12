const youtubeApiKey = 'AIzaSyCIUQaNxPpz2CasUbE2-KC2S_ci06GhnRw'
const videoContainer = document.querySelector('#videoContainer');
const embedVideoOne = document.querySelector("#embedVideoOne");
const youtubeContainerTitle = document.querySelector('#youtubeContainerTitle');

let weather = {
    "apiKey": "6f40762a28c1523c38437dda26897715",
    fetchWeather: function (city,state) {
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
    )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon,description} = data.weather[0];
        const {temp,humidity} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = " Weather in " + name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C" ;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%" ;
        document.querySelector(".wind").innerText = "Wind Speed " + speed + "km/h" ;
        document.querySelector(".weather").classList.remove("loading") ;

    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Richmond");

function callYoutubeApi() {
    let youtubeApiUrl = 'https://youtube.googleapis.com/youtube/v3/search?q=' + '&videoEmbeddable=true&type=video&part=snippet&regionCode=US&maxResults=1&key=AIzaSyCIUQaNxPpz2CasUbE2-KC2S_ci06GhnRw';
    console.log(youtubeApiUrl);
    fetch(youtubeApiUrl)
    .then(function (response) {
    response.json().then(function (data) {
        console.log(data);
        let videoId = data.items[0].id.videoId;
        let embedUrl = 'https://www.youtube.com/embed/' + videoId;
        console.log(embedUrl);
        embedVideoOne.setAttribute('src', '');
        embedVideoOne.setAttribute('src', embedUrl);
    })
        .catch((error) => {
            console.error('Error:', error);
            videoInstructions.textContent = 'Video Quota reached for the day. Please check back tomorrow!';
            videoInstructions.classList.add('is-italic');
            videoInstructions.classList.add('has-text-weight-bold');
            videoContainer.innerHTML = '<img src="https://cdn.shopify.com/s/files/1/1061/1924/products/13_1024x1024.png?v=1571606116" alt="Sorry for the inconvenience!" height="200" width="200" />';
        });
});
}

callYoutubeApi();