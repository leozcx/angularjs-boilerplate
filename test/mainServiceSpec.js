//Interesting things to test the Auth service for

// Logging in with Facebook
// Handling callback to server for checkuser
// Saving user to localstorage after login
// Logging out (removing user object as well as localstorage)

describe("Auth Service Unit Tests", function() {

  beforeEach(function() {
    module('SampleApp');
  });

  beforeEach(inject(function (_Auth_) {
    Auth = _Auth_;
  }));

  it('should have Auth service be defined', function () {
    expect(Auth).toBeDefined();
  });


});