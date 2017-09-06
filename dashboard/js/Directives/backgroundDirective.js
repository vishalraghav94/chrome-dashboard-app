dashboard.directive('myBackground', ['$http', '$interval','$timeout', function ($http, $interval, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.index = Math.floor(Math.random() * (701 - 0 + 1));
            var img;
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
                    img = scope.preload(scope.backgroundUrl);
                    console.log(img.src);
                    $timeout( function () {
                        element[0].style.background = "url(" + img.src + ")";
                        element[0].style.backgroundSize = 'cover';
                    }, 2000);
                }, 20000);
            }, function (error) {
                console.log('Error', error);
            });
            scope.preload = function (url) {
                var img = new Image();
                img.src = url;
                return img;
            }
        }
    }
}]);