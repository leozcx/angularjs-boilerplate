require('angular');
require('angular-mocks');
require('../../app/js/main');

describe('MainService Unit Test', function() {
	var service, $httpBackend;
	var user = {
		name : "testUser",
		email : "testUser@fake.com"
	};
	var httpHandler;

	beforeEach(function() {
		angular.mock.module('SampleApp');
	});

	beforeEach(inject(function(_MainService_, _$httpBackend_) {
		service = _MainService_;
		$httpBackend = _$httpBackend_;
		httpHandler = $httpBackend.when('POST',
				'http://someurl.dev/api/v1/login').respond(
				function(method, url, data, headers, params) {
					var data = JSON.parse(data);
					if (data.name === user.name && data.email === user.email) {
						return [ 200, {
							success : true
						} ];
					} else {
						return [ 200, {
							success : false
						} ];
					}
				});
	}));

	it('user "' + user.name + '" should be saved to localStore', function() {
		service.saveUser({
			name : user.name
		});
		expect(service.currentUser().name).toBe(user.name);
	});

	it('login should fail with incorrect username/password', inject(function() {
		service.loginWithEmail(user.name, "a@b").then(function(data) {
		}, function(reason) {
			expect(reason.success).toBe(false);
		});
		$httpBackend.flush();
	}));

	it('login should succeed with correct username/password',
			inject(function() {
				service.loginWithEmail(user.name, user.email).then(
						function(data) {
						}, function(reason) {
							expect(reason.success).toBe(true);
						});
				$httpBackend.flush();
			}));
});