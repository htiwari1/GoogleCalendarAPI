'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /calendarData when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/calendarData");
  });


  describe('calendarData', function() {

    beforeEach(function() {
      browser.get('index.html#!/calendarData');
    });


    it('should render calendarData when user navigates to /calendarData', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/Google Calendar Data/);
    });

  });


  describe('src', function() {

    beforeEach(function() {
      browser.get('index.html#!/src');
    });


    it('should render src when user navigates to /src', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Coming Soon, keep your day job!/);
    });

  });
});
