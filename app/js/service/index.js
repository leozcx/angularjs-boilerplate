require('angular');

var mainService = require('./main-service');
var app = angular.module('SampleApp');

app.factory('MainService', ['$http', '$q', mainService]);