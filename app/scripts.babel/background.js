'use strict';

var app = angular.module('myApp', []);

app.controller('MainCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
	    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }
    // Start the timer
    $timeout(tick, $scope.tickInterval);
    alert();
}])

