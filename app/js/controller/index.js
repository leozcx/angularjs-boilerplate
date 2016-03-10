
require('angular');

var mainController = require('./main-controller');

var app = angular.module('SampleApp');

app.controller('MainController', ['$scope', mainController]);