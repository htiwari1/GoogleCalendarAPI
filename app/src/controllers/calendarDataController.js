'use strict';

angular.module('calendarApp')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/calendarData', {
            templateUrl: 'src/templates/calendarData.html',
            controller: 'CalendarDataCtrl'
        });
    }])


    .controller('CalendarDataCtrl', ['$scope', '$googleService', function ($scope, $googleService) {
        var startDate = moment('2017-03-06T04:26:52.000Z'); //using static dates for this app to get calendar events between
        var endDate = moment('2017-03-13T04:26:52.000Z');
        $scope.areChartsHidden = true;
        $scope.isHeaderHidden = false;
        var chartInput = [];
        $scope.chartOptions = {
            title: {
                text: 'Meeting Data'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%e. %b',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                },
                tickInterval: 24 * 3600 * 1000
            },
            legend: {
                enabled: false
            },

            series: [{
                name: 'Time spend in meetings',
                data: chartInput,
                type: 'areaspline',
                pointStart: Date.UTC(2017, 2, 5), //the months go from 0-11, !@#$$#, dont ask me why
                pointInterval: 24 * 3600 * 1000
            }]
        };

        // $scope.dataIn;
        var fillChart = function (data) {
            var daterange = {};
            var chartInput = [];


            for (var m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
               daterange[m.format('MMMM Do YYYY')] = 0; //make a dict with dates as keys for the chart

            }

            $scope.dataIn = data;//this is fed into the ng-repeat for the list

            angular.forEach(data.items, function (key, value) {
                var start = moment(data.items[value].start.dateTime);
                var end = moment(data.items[value].end.dateTime);
                daterange[start.format('MMMM Do YYYY')] += (end-start)/60000; //add up time spent in meetings for each date

            });

            for (var key in daterange){
                 chartInput.push(daterange[key]); //arrange the times in format needed for highcharts
            }

            $scope.chartOptions.series[0].data = chartInput; //update highchart view

            $scope.areChartsHidden = false;
            $scope.isHeaderHidden = true;
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


        $scope.formatDate = function (inputDateString) {
            return moment(inputDateString).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }

    }]);