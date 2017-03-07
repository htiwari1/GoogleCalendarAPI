//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/highcharts/highcharts.js',
            'calendarData/utils/google_client_api.js',
            'app.js',
            'components/**/*.js',
            'calendarData/services/googleCalendarService.js',
            'calendarData/directives/highChartDirective.js',
            'calendarData/utils/constants.js',
            'calendarData/controllers/calendarDataController.js',
            'calendarData/controllers/calendarDataControllerTest.js',
            'calendarData/services/googleCalendarService_test.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
