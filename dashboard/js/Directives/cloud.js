dashboard.directive('cloud', [ function () {
    return {
        restrict: 'EA',
        scope: {
            width: '=',
            height: '=',
            colored: '='
        },
        templateUrl: 'HTMLComponents/cloudy.html',
        link: function (scope, element, attr) {
            console.log(scope.colored);
            var thisElement = element[0].getElementsByClassName('cloud');
            thisElement[0].style.width = scope.width + 'px';
            thisElement[0].style.height = scope.height + 'px';
            var colorElement = element[0].getElementsByClassName('cloud-color');
            var i;
            for(i = 0; i < colorElement.length; i++) {
                colorElement[i].style.backgroundColor = scope.colored;
            }
        }
    }
}]);