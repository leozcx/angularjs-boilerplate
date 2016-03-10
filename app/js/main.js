(function () {

'use strict';

require('angular');
require('angular-route');
require('angular-animate');


var app = angular.module('SampleApp', ['ngRoute', 'ngAnimate']);
require('./controller');

app.config([
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
  ]);

}());
