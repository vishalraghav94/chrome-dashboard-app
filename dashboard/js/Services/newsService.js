dashboard.factory('news', ['$http', function ($http) {
    return {
        getNews: function (country, category) {
            var apiKey = '9a0f84a7cbea4f0d9772142b3d4a9b62';
            var url = 'https://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&apiKey=' + apiKey;
            return $http({
                method: 'GET',
                url: url
            });
        }
    }
}]);