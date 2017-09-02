dashboard.directive('myBackground', ['$http', '$interval', function ($http, $interval) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.index = Math.floor(Math.random() * (701 - 0 + 1));
            $http({
                method: 'GET',
                url: 'backgrounds.json'
            }).then(function(success) {
                scope.backgrounds = success.data;
                scope.background = scope.backgrounds[scope.index];
                scope.backgroundUrl = scope.background.url;
                console.log(scope.backgroundUrl);
                element[0].style.background = "url(" + scope.backgroundUrl + ")";
                element[0].style.backgroundSize = 'cover';
                $interval (function () {
                    scope.index = Math.floor(Math.random() * (701 - 0 + 1));
                    scope.background = scope.backgrounds[scope.index];
                    scope.backgroundUrl = scope.background.url;
                    element[0].style.background = "url(" + scope.backgroundUrl + ")";
                    element[0].style.backgroundSize = 'cover';
                }, 5000);
            }, function (error) {
                console.log('Error', error);
            });

        }
    }
}]);