(function () {

'use strict';

require('angular');
require('angular-route');
require('angular-animate');
var mainController = require('./controller/main-controller');

  angular.module('SampleApp', ['ngRoute', 'ngAnimate'])

  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./partials/partial1.html",
          controller: "MainController"
        })
        .otherwise({
           redirectTo: '/'
        });
    }
  ])
  .controller('MainController', [
    '$scope',
    mainController
  ]);

}());