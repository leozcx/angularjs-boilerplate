require("angular");
require('angular-mocks');
require('../app/js/main');

describe("MainController Unit Tests", function() {
  var ctrl, scope;
  
  beforeEach(function() {
	  angular.mock.module('SampleApp');
  });

  beforeEach(inject(function ($controller, $rootScope) {
	  scope = $rootScope.$new();
	  ctrl = $controller('MainController', {
			$scope: scope
		});
  }));

  it('should have MainController be defined', function () {
    expect(ctrl).toBeDefined();
  });


});