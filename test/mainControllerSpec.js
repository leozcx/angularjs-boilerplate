require("angular");
require('angular-mocks');
require('../app/js/main');

describe("MainController Unit Tests", function() {
	var $controller;

	beforeEach(function() {
		angular.mock.module('SampleApp');
	});

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	it('should have MainController be defined', function() {
		var $scope = {};
		var ctrl = $controller('MainController', {
			$scope : $scope
		});
		expect(ctrl).toBeDefined();
	});

});