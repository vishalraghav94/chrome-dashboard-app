
weatherSection.controller('weatherController', ['$scope', '$interval', 'weather', function ($scope, $interval, weather) {
    navigator.geolocation.getCurrentPosition(function (success) {
        var promise = weather.getWeather(success.coords.latitude, success.coords.longitude);
        promise.then(weatherSuccess).catch(function (err) {
            console.log('Error encountered: ', err);
        })
    });


    function weatherSuccess(weatherObject) {
        console.log(weatherObject);
    }
}]);