
weatherSection.controller('weatherController', ['$scope', '$interval', 'weather', function ($scope, $interval, weather) {
    $scope.weather = weather;
    navigator.geolocation.getCurrentPosition(function (success) {
        var promise = weather.getWeather(success.coords.latitude, success.coords.longitude);
        promise.then(weatherSuccess).catch(function (err) {
            console.log('Error encountered: ', err);
        })
    });
    var celciusFlag = 1;
    var farFlag = 0;
    function weatherSuccess(weatherObject) {
        console.log(weatherObject);
        var days = ["Sunday", 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.location = weatherObject.data.city;
        $scope.currentWeather = weatherObject.data.list[1];
        var date = new Date();
        var dayIndex = date.getDay();
        $scope.day = days[dayIndex];
        $scope.time = $scope.currentWeather.dt_txt.split(' ')[1].split(':')[0] + ':00';
        $scope.temp = parseInt($scope.currentWeather.main.temp - 273);
        $scope.converter = function (unit) {
            if ((unit === 'C') && celciusFlag) {
                $scope.temp = weather.tempUnitConverter($scope.temp, 'C');
                celciusFlag = false;
                farFlag = true;
            }
            else  if ((unit === 'F') && farFlag){
                $scope.temp = weather.tempUnitConverter($scope.temp, 'F');
                farFlag = false;
                celciusFlag = true;
            }
        }
    }
}]);