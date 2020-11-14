var tempEl = document.querySelector("#tempEl");
var humidtyEl = document.querySelector("#humidityEl");

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
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            var temp = response.main.temp;
            tempEl.append(temp);
            var humidity = response.main.humidity;
            humidityEl.append(humidity);
        })

};