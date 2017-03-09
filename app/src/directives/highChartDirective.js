/**
 * Created by htiwari on 07/03/2017.
 */

angular.module('calendarApp')
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
                    Highcharts.chart(element[0], newValue);
                }, true);

            }
        };
    })