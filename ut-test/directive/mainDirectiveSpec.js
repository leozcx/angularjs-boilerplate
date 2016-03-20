require('angular');
require('angular-mocks');
require('../../app/js/main');

describe('main-directive Unit Test', function() {
	var $compile, $rootScope;
	
	beforeEach(angular.mock.module('SampleApp'));
	
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));
	
	it('Replace the tag with appropriate content', function() {
		var element = $compile("<main-directive></main-directive>")($rootScope);
		$rootScope.$digest();
		expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
	});
});