'use strict';

describe('myApp.src module', function() {

  beforeEach(module('myApp.src'));

  describe('src controller', function(){
    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var retirementCtrl = $controller('CalendarDataCtrl' , {
          $scope: $rootScope
      });
      // expect(retirementCtrl).toBeDefined();
        expect(retirementCtrl).toBeDefined();
    }));

  });
});

