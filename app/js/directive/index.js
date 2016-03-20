require('angular');
var mainDirective = require('./main-directive');
var templateDirective = require('./template-directive');

var app = angular.module('SampleApp');

app.directive('mainDirective', mainDirective)
.directive('templateDirective', templateDirective);