'use strict';

angular.module('calendarApp')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/calendarData', {
            templateUrl: 'src/templates/calendarData.html',
            controller: 'CalendarDataCtrl'
        });
    }])


    .controller('CalendarDataCtrl', ['$scope', '$googleService', '$localStorage', function ($scope, $googleService, $localStorage) {


        var __ret = init();
        var startDate = __ret.startDate;
        var endDate = __ret.endDate;

        // $scope.dataIn;
        $scope.fillChart = function (data) {
            // console.log(JSON.stringify(data));
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

            return JSON.stringify(chartInput); //this is just for unit test
        };

        var getCalendarEvents = function () {
            $googleService.makeApiCall().then(function (data) {
                $scope.fillChart(data)
            }, function (err) {
                alert('Failed: ' + err);
            });
        };

        $scope.handleAuthClick = function () {
                $googleService.authorizeGoogle($localStorage.isLoggedIn).then(function () {
                    $localStorage.isLoggedIn = true;
                    getCalendarEvents();
                }, function (err) {
                    alert('Failed: ' + err);
                });
            return false;
        }


        $scope.formatDate = function (inputDateString) {
            return moment(inputDateString).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }


        function init() {
            var startDate = moment('2017-03-06T04:26:52.000Z'); //using static dates for this app to get calendar events between
            var endDate = moment('2017-03-13T04:26:52.000Z');

            //handling refresh behaviour to aviod having to login again
            if ($localStorage.isLoggedIn == null){
                $localStorage.isLoggedIn = false;
            }

            else {
                $localStorage.isLoggedIn = true;
            }
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
                yAxis: {
                    title: {
                        enabled: true,
                        text: 'Time spent in meetings',
                        style: {
                            fontWeight: 'normal'
                        }
                    }
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
            return {startDate: startDate, endDate: endDate};
        }

    }]);