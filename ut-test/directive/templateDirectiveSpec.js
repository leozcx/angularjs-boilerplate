require('angular');
require('angular-mocks');
require('../../app/js/main');

describe('template-directive Unit Test', function() {
	var $compile, $rootScope;
	
	beforeEach(angular.mock.module('SampleApp'));
	
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));
	
	it('Replace the tag with appropriate content', function() {
		var element = $compile("<template-directive></template-directive>")($rootScope);
		$rootScope.$digest();
		expect(element.html()).toContain("template directive, 2 times");
	});
});