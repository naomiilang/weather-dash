var todaysCity = document.querySelector("#todaysCity");
var tempEl = document.querySelector("#tempEl");
var humidtyEl = document.querySelector("#humidityEl");
var windEl = document.querySelector("#windEl");
var uvEl = document.querySelector("#UVI");
var card1Date = document.querySelector("#card1date");
var card1Temp = document.querySelector("#card1temp");
var card1Humidity = document.querySelector("#card1humidity");
var card2Date = document.querySelector("#card2date");
var card2Temp = document.querySelector("#card2temp");
var card2Humidity = document.querySelector("#card2humidity");
var card3Date = document.querySelector("#card3date");
var card3Temp = document.querySelector("#card3temp");
var card3Humidity = document.querySelector("#card3humidity");
var card4Date = document.querySelector("#card4date");
var card4Temp = document.querySelector("#card4temp");
var card4Humidity = document.querySelector("#card4humidity");
var card5Date = document.querySelector("#card5date");
var card5Temp = document.querySelector("#card5temp");
var card5Humidity = document.querySelector("#card5humidity");
var citySearched = document.querySelector("#searchedCity");


var searchCity = function () {
    var searchInput = document.querySelector("#citySearch").value;
    var apiKey = 'd3e29d46f8280648904d2685c931979c'
    localStorage.setItem('searchedCity', searchInput);
    citySearched.append(searchInput);

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchInput +
        '&units=imperial' +
        '&appid=' +
        apiKey
    )
        .then(function (Wresponse) {
            return Wresponse.json();
        })
        .then(function (Wresponse) {
            console.log(Wresponse);
            var temp = Wresponse.main.temp;
            tempEl.append(temp + "°");
            var humidity = Wresponse.main.humidity;
            humidityEl.append(humidity + "%");
            var city = Wresponse.name;
            todaysCity.append(city);
            var wind = Wresponse.wind.speed;
            windEl.append(wind + " mph");
            var lat = Wresponse.coord.lat;
            var lon = Wresponse.coord.lon;

            return fetch(
                'http://api.openweathermap.org/data/2.5/uvi?lat=' +
                lat +
                '&lon=' +
                lon +
                '&appid=' +
                apiKey
            )
        })
        .then(function(response){ 
            return response.json();
        })
        .then(function(response){
            console.log(response);
            var lat = response.lat;
            var lon = response.lon;
            var UV = response.value;
            uvEl.append(UV);
            console.log(lat,lon);
            if (response.value >= 0 && response.value <= 3){
                uvEl.style.color = "green"; 
            } else if (response.value >= 3 && response.value <= 6){
                uvEl.style.color = "orange"; 
            } else if (response.value >= 6 && response.value <= 10) {
                uvEl.style.color = "red"; 
            };
            return fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' +
                lat +
                '&lon='+
                lon +
                '&exclude=current,minutely,hourly,alerts' +
                '&units=imperial' +
                '&appid=' +
                apiKey
            )
        })
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log(response);
            var card1temp = response.daily[0].temp.day;
            card1Temp.append(card1temp + "°");
            var card1humidity = response.daily[0].humidity;
            card1Humidity.append(card1humidity + "%");
            var card2temp = response.daily[1].temp.day;
            card2Temp.append(card2temp + "°");
            var card2humidity = response.daily[1].humidity;
            card2Humidity.append(card2humidity + "%");
            var card3temp = response.daily[2].temp.day;
            card3Temp.append(card3temp + "°");
            var card3humidity = response.daily[2].humidity;
            card3Humidity.append(card3humidity + "%");
            var card4temp = response.daily[3].temp.day;
            card4Temp.append(card4temp + "°");
            var card4humidity = response.daily[3].humidity;
            card4Humidity.append(card4humidity + "%");
            var card5temp = response.daily[4].temp.day;
            card5Temp.append(card2temp + "°");
            var card5humidity = response.daily[4].humidity;
            card5Humidity.append(card5humidity + "%");
        })
    
};
