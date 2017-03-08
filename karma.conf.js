//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/highcharts/highcharts.js',
            'src/utils/google_client_api.js',
            'app.js',
            'components/**/*.js',
            'src/services/googleCalendarService.js',
            'src/directives/highChartDirective.js',
            'src/utils/constants.js',
            'src/controllers/calendarDataController.js',
            'src/controllers/calendarDataControllerTest.js',
            'src/services/googleCalendarService_test.js'
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
