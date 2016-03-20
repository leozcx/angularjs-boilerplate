
This is a full stack boilerplate web project using AngularJS, it contains: 
- "browerify" to enable "require" capability in browser
- "gulp" as task runner
- "LESS" as css preprocessor
- "jslint" for js validation
- js uglifying
- css minifying
- html minifying 
- js sourcemaps
- "Karma" + "Jasmine" for unit test
- "Protractor" + "Jasmine" for e2e test

### Prerequisite
```
npm install -g gulp 
npm install -g karma
npm install
```

### for development
gulp watch

### run unit test
gulp test

### run e2e test 
- make sure the "seleniumServerJar" in "e2e-test/protractor.conf.js" matches the one under "node_modules/protractor/selenium/"
- open 1st terminal, run `.\node_modules\.bin\webdriver-manager start`
  + webdriver-manager is a helper tool to easily get a Selenium server running
  + you may need to run `.\node_modules\.bin\webdriver-manager update` to install Selenium binary at the first time
- open 2nd terminal, run `gulp`
- open 3rd terminal, run `gulp e2e`

### for production
gulp build

