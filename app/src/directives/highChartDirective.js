/**
 * Created by htiwari on 07/03/2017.
 */

angular.module('calendarApp')
// Directive for generic chart, pass in chart options
    .directive('hcChart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                options: '='
            },
            replace: true,
            link: function (scope, element) {

                scope.$watch("options", function (newValue) {
                    // console.log("was here");
                    Highcharts.chart(element[0], newValue);
                    // chart.series[0].setData(newValue, true);
                }, true);

            }

            // link: function (scope, element, attrs) {
            //     console.log(3);
            //     var chart = new Highcharts.Chart(options);
            //     scope.$watch("items", function (newValue) {
            //         chart.series[0].setData(newValue, true);
            //     }, true);
            //
            // }
        };
    })