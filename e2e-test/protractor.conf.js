exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },
  
  //The file path to the selenium server jar () 
  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',
  
  seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: 'http://localhost:8888',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};