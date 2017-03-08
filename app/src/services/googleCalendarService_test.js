'use strict';

describe('Google Service ', function() {
    var $googleService;

    beforeEach(module('myApp.src'));
    beforeEach(inject(function(_$googleService_) {
        //spec body
        $googleService = _$googleService_;

    }));


    it('google service test', function() {
        expect($googleService.makeApiCall()).toBeDefined();
    });
});



