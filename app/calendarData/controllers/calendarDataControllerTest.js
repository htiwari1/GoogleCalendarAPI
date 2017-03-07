'use strict';

describe('myApp.calendarData module', function() {

  beforeEach(module('myApp.calendarData'));

  describe('calendarData controller', function(){
    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var retirementCtrl = $controller('RetirementCtrl' , {
          $scope: $rootScope
      });
      // expect(retirementCtrl).toBeDefined();
        expect(retirementCtrl).toBeDefined();
    }));

  });
});

