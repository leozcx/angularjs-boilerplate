require('angular');

var mainService = require('./main-service');
var app = angular.module('SampleApp');

app.factory('Auth', ['$http', '$q', mainService]);