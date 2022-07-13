const youtubeApiKey = 'AIzaSyCIUQaNxPpz2CasUbE2-KC2S_ci06GhnRw'
const videoContainer = document.querySelector('#videoContainer');
const embedVideoOne = document.querySelector("#embedVideoOne");
const youtubeContainerTitle = document.querySelector('#youtubeContainerTitle');
var cTemp;
var f;
var realTemp;

function cToF (celciusValue) {
    var cTemp = celciusValue;
    var f = cTemp * 9 / 5 + 32;
    let realTemp = f.toFixed(2);
    console.log("this is " + realTemp);
    return f;
}

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
        cTemp = temp;
        moodyTunes(cTemp);
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = " Weather in " + name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = cToF(temp) + "°F" ;
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

var callYoutubeApi = function (videoId) {
    let youtubeApiUrl = 'https://youtube.googleapis.com/youtube/v3/search?q=' + '&videoEmbeddable=true&type=video&part=snippet&regionCode=US&maxResults=1&key=AIzaSyCIUQaNxPpz2CasUbE2-KC2S_ci06GhnRw';
    console.log(youtubeApiUrl);
    fetch(youtubeApiUrl)
    .then(function (response) {
    response.json().then(function (data) {
        console.log(data);
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

displayWeather();

function moodyTunes(temp) {
    console.log("im in moodytunes " + temp);
    if (temp > 0 && temp < 5) {
        console.log("between 32 and 41 " + temp);
        callYoutubeApi('ySb1f9zWJkQ');
    }
    else if (temp > 5 && temp < 10) {
        console.log("between 41 and 50 " + temp);
        callYoutubeApi('oouFE51HcqM');
    }
    else if (temp > 10 && temp < 15) {
        console.log("between 50 and 59 " + temp);
        callYoutubeApi('GCdwKhTtNNw');
    }
    else if (temp > 15 && temp < 20) {
        console.log("between 59 and 68 " + temp);
        callYoutubeApi('K-a8s8OLBSE');
    }
    else if (temp > 20 && temp < 25) {
        console.log("between 68 and 77 " + temp);
        callYoutubeApi('HyHNuVaZJ-k');
    }
    else if (temp > 25 && temp < 30) {
    console.log("between 77 and 86 " + temp);
    callYoutubeApi('jNStfcyNrOI');
    }
    else if (temp > 30 && temp < 35) {
        console.log("between 86 and 95 " + temp);
        callYoutubeApi('GeZZr_p6vB8');
    }
    else if (temp > 35 && temp < 40) {
        console.log("between 95 and 104 " + temp);
        callYoutubeApi('etAIpkdhU9Q');
    }
} 

