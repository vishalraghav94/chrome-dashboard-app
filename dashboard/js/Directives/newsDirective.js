dashboard.directive('myNews', ['$http', '$interval','$timeout', 'news', function ($http, $interval, $timeout, news) {
    return {
        restrict: 'E',
        scope: {
            country: '=',
            category: '='
        },
        templateUrl: 'HTMLComponents/news.html',
        link: function (scope, element, attr) {
            console.log(scope);
           var promise = news.getNews(scope.country, scope.category);
           promise.then(newsSuccess).catch(function (err) {
               console.log('Error encountered: ', err);
           });

           function newsSuccess(newsData) {
               scope.weatherData = newsData.data.articles;

           }
           scope.showDesc = function (event) {
               if (event.target.classList.contains('news-list-item')) {
                   event.target.getElementsByClassName('pop-up')[0].classList.toggle('pop-up-show');
               }
               else if (event.target.parentElement.classList.contains('news-list-item')) {
                   event.target.parentElement.getElementsByClassName('pop-up')[0].classList.toggle('pop-up-show');
               }
           }
        }
    }
}]);