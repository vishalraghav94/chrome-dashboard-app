var weatherSection = angular.module('weatherSection',[]);
weatherSection.factory('weather', ['$http', function ($http) {
    return {
        getWeather: function (lat, lon) {
            var apiKey = 'e2b42e6173ae7f50e33e50d460e2656e';
            var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
            return $http({
                method: 'GET',
                url: url
            });
        },
        tempUnitConverter: function (temp, currentUnit) {
            if (currentUnit === 'C') {
                var farTemp = (9 / 5) * temp + 32;
                return farTemp;
            }
            else {
                var celTemp = (temp - 32) * (5 / 9);
                return celTemp;
            }

        }
    }
}]);