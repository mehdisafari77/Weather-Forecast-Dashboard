
moment().format("L")


function searchForCity(cityname) {
    var lat;
    var lon;  
    getCurrentCityWeather(cityname)
    getUV(lat, lon)
    getFiveDayForecast(cityname)
}
renderPage();

function renderPage() {
    var finalSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchedCityDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(finalSearch);
    var search = $("<div>");
    search.append(searchedCityDiv)
    $("#search-history").prepend(search)
}

$("#search-button").on("click", function(event) {
    event.preventDefault();
    var searchValue = $("#search-value").val().trim()

    var textContent = $(this).siblings("input").val();
    var arraySpot = [];
    arraySpot.push(textContent);
    localStorage.setItem('cityName', JSON.stringify(arraySpot));
  
    searchForCity(searchValue);
    renderPage()

    console.log(searchValue)
})

$("#search-history").on("click", ".btn", function(event) {
    event.preventDefault();
    console.log($(this).text())
    searchForCity($(this).text())

})

function getCurrentCityWeather(searchValue) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=d91f911bcf2c0f925fb6535547a5ddc9"


    fetch(apiUrl).then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(apiUrl)
        console.log(response)
        $("current").empty()
        var todayDate = moment().format("L")

        var cityNameEL = $("<h2>").text(response.name);
        var todayDateDisplay = cityNameEL.append(" " + todayDate);
        var temp = $("<p>").text("Temperature: " + response.main.temp);
        var humidity = $("<p>").text("Humidity: " + response.main.humidity);
        var wind = $("<p>").text("wind Speed: " + response.wind.speed);
        var weather = response.weather[0].main;
        
        // Conditionals for weather icons
        if (weather === "Rain") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            weatherIcon.attr("style", "height:l60px; width: 60px");
        } else if (weather=== "Clouds") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        } else if (weather === "Clear") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        }
         else if (weather === "Drizzle") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        }
         else if (weather === "Snow") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        }
        console.log(todayDateDisplay, temp, humidity, wind, weather)

        var appendDiv = $("<div>");
        appendDiv.append(todayDateDisplay, temp, humidity, wind, weather)
        $("#current").html(appendDiv);  
    })
}

function getFiveDayForecast(searchValue) {

    var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&units=imperial&appid=d91f911bcf2c0f925fb6535547a5ddc9"

    fetch(apiUrlForecast).then(function(response) {
        console.log(apiUrlForecast)
        console.log(response)
        return response.json() 
    })
    .then(function(response) {
        console.log(response)
        var results = response.list;
        $("#fiveday").empty();
        for (var i = 0; i < results.length; i += 8) {
            var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
            
            var date = results[i].dt_txt;
            var setDate = date.substr(0,10)
            var temperature = results[i].main.temp;
            var humidity = results[i].main.humidity;
   
            var h5date = $("<h5 class='card-title'>").text(setDate);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temperature);
            var pHum = $("<p class='card-text'>").text("Humidity " + humidity);

            var weather = results[i].weather[0].main

            if (weather === "Rain") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                weatherIcon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Clouds") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                weatherIcon.attr("style", "height: 40px; width: 40px");
            } 
             else if (weather === "Clear") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                weatherIcon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Drizzle") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                weatherIcon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Snow") {
                var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                weatherIcon.attr("style", "height: 40px; width: 40px");
            }

            fiveDayDiv.append(h5date);
            fiveDayDiv.append(weatherIcon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#fiveday").append(fiveDayDiv);

            console.log(h5date, pTemp, pHum)

        }
    })
}

function getUV(lat, lon) {
    var lat;
    var lon;  
    var apiUrlUvi = "https://api.openweathermap.org/data/2.5/uvi?&appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=" + lat  + "&lon=" + lon;

    fetch(apiUrlUvi).then(function(response) {
        console.log(response)
        return response.json()
    })
    .then(function (response) {
    $("#uvi-display").empty();
    var uvResults = response.value;

    var uvIndex = $("<button class='btn bg-success'>").text("UV Index: " + response.value);
    $("#uvi-display").html(uvIndex);
    console.log(uvIndex)

    });
}


