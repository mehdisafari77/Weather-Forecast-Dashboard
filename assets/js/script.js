
moment().format("L")

$("#search-button").on("click", function() {
    var searchValue = $("#search-value").val()

    console.log(searchValue)
    getCurrentCityWeather(searchValue)
})


function getCurrentCityWeather(searchValue) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=d91f911bcf2c0f925fb6535547a5ddc9"
    var apiURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&units=imperial&appid=d91f911bcf2c0f925fb6535547a5ddc9"

    fetch(apiUrl).then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response)
        $("current").empty()
        var todayDate = moment().format("L")

        var cityName = $("<h2>").text(response.name);
        var todayDateDisplay = cityName.append(" " + todayDate);
        var temp = $("<h3>").text("Temperature: " + response.main.temp);
        var humidity = $("<h3>").text("Humidity: " + response.main.humidity);
        var wind = $("<h3>").text("wind Speed: " + response.wind.speed);
        var weather = response.weather[0].main;
        

        //var card creation appending to the card for better styling

        //append to card then append card to current
        var appendDiv = $("div");
        appendDiv.append(todayDateDisplay, temp, humidity, wind)
        getForecast(response.coord.lat, response.coord.lon)
    })

}


function getForecast(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+ lon + "&exclude={part}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial"

    fetch(apiUrl).then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response)

        for (var i = 0; i < response.daily.length - 3; i++) {
            var temperture = $("<h3>").text(response.daily[i].temp.day)

            $("#fiveday").append(temperture)
        }

    })
}


