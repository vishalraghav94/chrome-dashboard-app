dashboard.directive('cloud', [ function () {
    return {
        restrict: 'EA',
        scope: {
            width: '=',
            height: '='
        },
        templateUrl: 'HTMLComponents/cloudy.html',
        link: function (scope, element, attr) {
            var thisElement = element[0].getElementsByClassName('cloud');
            thisElement[0].style.width = scope.width + 'px';
            thisElement[0].style.height = scope.height + 'px';
        }
    }
}]);