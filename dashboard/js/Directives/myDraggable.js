dashboard.directive('myDraggable', ['$document', function($document) {
    return {
        link: function (scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0, obj = JSON.parse(localStorage.getItem(element[0].className)) ||  {};
            console.log(element);
            if(obj !== {}) {
                x = obj.x;
                y = obj.y;
            }
            element.css({
                position: 'relative',
                cursor: '-webkit-grab',
                top: y + 'px',
                left: x + 'px'
            });
            element.on('mousedown', function(event) {
                //event.preventDefault();
                element.css({
                    cursor: '-webkit-grabbing'
                });
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });
            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                obj.x = x;
                obj.y = y;
                localStorage.setItem(element[0].className, JSON.stringify(obj));
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }
            function mouseup(event) {
                element.css({
                    cursor: '-webkit-grab'
                });
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }
    }
}]);