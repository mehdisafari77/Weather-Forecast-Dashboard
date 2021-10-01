$("#search-button").on("click", function() {
    var searchValue = $("#search-value").val()

    console.log(searchValue)
    getCurrentWeather(searchValue)
})



function getCurrentWeather(searchValue) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=d91f911bcf2c0f925fb6535547a5ddc9"

    fetch(apiUrl).then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response)
    })

}
