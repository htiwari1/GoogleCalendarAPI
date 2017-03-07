/**
 * Created by htiwari on 05/03/2017.
 */
angular.module('calendarApp', ['ngRoute']).service('$googleService', ['constants', '$q', function (constants, $q) {

    var clientId = constants.clientId;
    var scopes = constants.scopes;
    var deferred = $q.defer();
    var deferred2 = $q.defer();

    this.handleAuthResult = function (authResult) {


        if (authResult && !authResult.error) {
            deferred.resolve("Success");
        } else {
            deferred.reject('error');
        }
    }

    this.authorizeGoogle = function () {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, this.handleAuthResult);
        return deferred.promise;
    }

    this.makeApiCall = function () {
        gapi.client.load('calendar', 'v3', function () {
            var request1 = gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': '2017-03-06T04:26:52.000Z',
                'timeMax': '2017-03-13T04:26:52.000Z',
                'singleEvents': 'true'
            });
            request1.execute(function (resp) {
                deferred2.resolve(resp);
            });
        });

        return deferred2.promise;
    }

}]);