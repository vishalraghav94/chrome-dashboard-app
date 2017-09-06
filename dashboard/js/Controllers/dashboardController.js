
dashboard.controller('dashboardController', ['$scope', '$interval', 'weather', '$http', function ($scope, $interval, weather, $http) {
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
        $scope.forecastArray = weatherObject.data.list.slice(2,7);
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
        };
        var newDayIndex = dayIndex;
        console.log(dayIndex, newDayIndex);
        var i;
        for(i = 0; i < $scope.forecastArray.length; i++) {
            var timeString = $scope.forecastArray[i].dt_txt.split(' ')[1].slice(0,5);
            if(timeString === '00:00') {
                console.log(timeString)
                if(newDayIndex === 6) {
                    newDayIndex = 0;
                }
                else {
                    newDayIndex++;
                }
            }
            $scope.forecastArray[i].currentDay = days[newDayIndex];
            $scope.forecastArray[i].timeString = timeString;
        }
    }

    /**
     * to-do section of app starts here
     */
    $scope.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskObj= {};
    $scope.pushTask = function (task) {
        task = task.toLowerCase();
        task = task.split('');
        task[0] = task[0].toUpperCase();
        task = task.join('');
        if(($scope.tasks.indexOfObj(task) === -1) && (task !== '')) {
            taskObj.task = task;
            taskObj.status = false;
            $scope.tasks.push(taskObj);
            localStorage.setItem('tasks', JSON.stringify($scope.tasks));
            taskObj = {};
        }
        $scope.taskString = '';
    };
    $scope.popTask = function (index) {
        $scope.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    };
    $scope.add = function (event, task) {
        if (event.key === 'Enter') {
            $scope.pushTask(task);
        }
    };
    $scope.taskDone = function (event, index) {
        var ele = event.srcElement;
        ele.style.backgroundColor = '#1DE9B6';
        ele.style.left = '0px';
        $scope.tasks[index].status = true;
        localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    };

    /**
     *
     * self made function to check the presence of a string inside one of the objects present in array
     * @param obj - string to be found inside the objects present in the array
     * @returns {number} - index of the object which contains the 'obj' string
     */
    Array.prototype.indexOfObj = function (obj) {
        var i;
        console.log("my func : " ,this);
        for(i = 0; i < this.length; i++) {
            if(this[i].task === obj) {
                return i;
            }
        }
        return -1;
    }
}]);
