
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
    $scope.pushTask = function (task, time) {
        task = task.toLowerCase();
        task = task.split('');
        task[0] = task[0].toUpperCase();
        task = task.join('');
        var date = new Date(time + '');
        if(($scope.tasks.indexOfObj(task) === -1) && (task !== '')) {
            taskObj.task = task;
            taskObj.status = false;
            if(date) {
                console.log(date);
                taskObj.date = JSON.stringify(date);
                //console.log(taskObj.getTaskDate());
            }
            $scope.tasks.push(taskObj);
            localStorage.setItem('tasks', JSON.stringify($scope.tasks));
            taskObj = {};
        }
        $scope.taskString = '';
        $scope.taskTime = '';
    };
    $scope.popTask = function (index) {
        $scope.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    };
    $scope.add = function (event, task, time) {
        if (event.key === 'Enter') {
            $scope.pushTask(task, time);
        }
    };
    $scope.taskDone = function (event, index) {
        var ele = event.srcElement;
        if($scope.tasks[index].status === false) {
            ele.style.backgroundColor = '#1DE9B6';
            ele.style.left = '0px';
            $scope.tasks[index].status = true;
            localStorage.setItem('tasks', JSON.stringify($scope.tasks));
        }
        else {
            ele.style.backgroundColor = '#FF9800';
            ele.style.left = '';
            $scope.tasks[index].status = false;
            localStorage.setItem('tasks', JSON.stringify($scope.tasks));
        }
    };

    /**
     *
     * self made function to check the presence of a string inside one of the objects present in array
     * @param obj - string to be found inside the objects present in the array
     * @returns {number} - index of the object which contains the 'obj' string
     */
    Array.prototype.indexOfObj = function (obj) {
        var i;
        for(i = 0; i < this.length; i++) {
            if(this[i].task === obj) {
                return i;
            }
        }
        return -1;
    }
    var i = 0, j =0;
    $scope.alertTask = "Current task";
    function greetTask() {
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        var currentDate = new Date();
        if(tasks && tasks.length) {
            if (i >= tasks.length) {
                i = 0;
            }
            var tempDate1 = tasks[i].date.substr(0, tasks[i].date.lastIndexOf('.'));
            var tempDate2 = JSON.stringify(currentDate).substr(0, JSON.stringify(currentDate).lastIndexOf('.'));
            if(j >= 60) {
                console.log(tempDate1, tempDate2);
                j = 0;
            }

            if (tempDate1 === tempDate2) {
                $scope.alertTask = tasks[i].task;
                console.log("hello this is my time: ", tasks[i].task);
                document.getElementsByClassName('alert-task')[0].style.top = '0px';
                $scope.popTask(i);
                window.setTimeout(function() {
                    document.getElementsByClassName('alert-task')[0].style.top = '-59px';
                }, 3000, true);
            }
            i++;
            j++;
        }
        window.requestAnimationFrame(greetTask);

    }
    window.requestAnimationFrame(greetTask);
}]);
