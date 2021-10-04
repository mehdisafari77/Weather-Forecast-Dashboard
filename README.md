# Weather-Forecast-Dashboard
A weather forecasting website

## Site Picture


## Deployed Link

* [See Live Site](https://mehdisafari77.github.io/Weather-Forecast-Dashboard/)

## Technologies Used
- HTML - used to create elements on the DOM
- CSS - styles html elements on page
- Moment.js - For time calculation
- Bootstrap - For easier design 
- Jquery - For logic
- WebApi - Open weather api used to gather weather info

## Summary 
A Website that is meant for users to type in a desired city name in a search bar, and after clicking the search button, being displayed with that city's weather data of 5 days, and current weather plus the current date. The weather data includes, UV Index, Humidity Levels, Weather Status, and Tempertaure plus Wind Speed.

## Javascript Code Snippet For Getting The Weather
```javascript
 function getCurrentCityWeather(searchValue) {

    var apiUrl = weatherApiUrl + searchValue + "&units=imperial&appid=" + myApiKey;

    fetch(apiUrl).then(function (response) {
        return response.json()
    })
        .then(function (response) {
            console.log(apiUrl)
            console.log(response)
            $("current").empty()
            var todayDate = moment().format("L")
```

## Author Links
[LinkedIn](https://www.linkedin.com/in/mehdi-safari-992799142/)
[GitHub](https://github.com/mehdisafari77)

## Acknowledgements
- W3 Schools
