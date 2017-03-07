'use strict';

angular.module('calendarApp')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/calendarData', {
            templateUrl: 'calendarData/templates/calendarData.html',
            controller: 'RetirementCtrl'
        });
    }])


    .controller('RetirementCtrl', ['$scope', '$googleService', function ($scope, $googleService) {

        $scope.chartOptions = {
            title: {
                text: 'Temperature data'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }]
        };

        // $scope.dataIn;
        var fillChart = function (data) {
            console.log(data);
            $scope.dataIn = data;
            angular.forEach(data.items, function (key, value) {
                var start = moment(data.items[value].start.dateTime);
                var end = moment(data.items[value].end.dateTime);
                // summaries.push() = data.items[value].summary;
                console.log(start.toDate());
                console.log(end-start);
            });
        };

        var getCalendarEvents = function () {
            $googleService.makeApiCall().then(function (data) {
                fillChart(data)
            }, function (err) {
                alert('Failed: ' + err);
            });
        };

        $scope.handleAuthClick = function () {
            $googleService.authorizeGoogle().then(function (data) {
                getCalendarEvents(data)
            }, function (err) {
                alert('Failed: ' + err);
            });
            return false;
        }

        $scope.logOut = function () {
            gapi.auth.setToken(null);
            gapi.auth.signOut();
        }

    }]);