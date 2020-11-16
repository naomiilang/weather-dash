var todaysCity = document.querySelector("#todaysCity");
var tempEl = document.querySelector("#tempEl");
var humidtyEl = document.querySelector("#humidityEl");
var windEl = document.querySelector("#windEl");
var uvEl = document.querySelector("#UVI");
var cardDate = document.querySelector("#card1date");
var cardTemp = document.querySelector("cardTemp");
var cardHumidity = document.querySelector("#card1Humidity");

var searchCity = function () {
    var searchInput = document.querySelector("#citySearch").value;
    var apiKey = 'd3e29d46f8280648904d2685c931979c'
    console.log(searchInput);

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
        })

    // fetch(
    //     'https://api.openweathermap.org/data/2.5/forecast?q=' +
    //     searchInput +
    //     '&units=imperial' +
    //     '&cnt=5' +
    //     '&appid=' +
    //     apiKey
    // )
    //     .then(function (Fresponse) {
    //         return Fresponse.json();
    //     })
    //     .then(function (Fresponse) {
    //         console.log(Fresponse);
    //         var carddate = Fresponse.list[0].dt_txt;
    //         cardDate.append(carddate);
    //     })
};