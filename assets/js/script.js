
moment().format("L")

$("#search-button").on("click", function(event) {
    event.preventDefault();
    var searchValue = $("#search-value").val().trim()

    var textContent = $(this).siblings("input").val();
    var arraySpot = [];
    arraySpot.push(textContent);
    localStorage.setItem('cityName', JSON.stringify(arraySpot));
  
    getCurrentCityWeather(searchValue);
    // pageLoad();

    console.log(searchValue)
})


function getCurrentCityWeather(searchValue) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=d91f911bcf2c0f925fb6535547a5ddc9"


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
        
        // Conditionals for weather icons
        if (weather === "Rain") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
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

        var appendDiv = $("div");
        appendDiv.append(todayDateDisplay, temp, humidity, wind, weather)
        getForecast(response.coord.lat, response.coord.lon)
        $("#current").html(appendDiv);
    })

}


function getForecast(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+ lon + "&exclude={part}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial"

    fetch(apiUrl).then(function(response) {
        return response.json()
    })
    .then(function(response) {
        $("#fiveday").empty();
        for (var i = 0; i < response.daily.length; i - 3) {
            var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
            
            var date = response[i].dt_txt;
            var setDate = date.substr(0,10)
            var temperature = response[i].main.temp;
            var humidity = response[i].main.humidity;
   
            var h5date = $("<h5 class='card-title'>").text(setDate);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temperature);
            var pHum = $("<p class='card-text'>").text("Humidity " + humidity);

            var weather = response[i].weather[0].main

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

            //append items to.......
            fiveDayDiv.append(h5date);
            fiveDayDiv.append(weatherIcon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#fiveday").append(fiveDayDiv);

        }

    })
}


function getUV(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/uvi?&appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=" + lat  + "&lon=" + lon;

    fetch(apiUrl).then(function(response) {
        return response.json()
    })
    .then(function (response) {
    $('#uvl-display').empty();
    var uvResults = response.value;

    var uv = $("<button class='btn bg-success'>").text("UV Index: " + uvResults);
    $('#uvl-display').html(uv);
    console.log(uv)

    });
}



