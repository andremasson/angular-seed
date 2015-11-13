'use strict';
/* global angular */

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
	'ui.router',
	'ngResource',
	'myAppFilters'
]);

myApp.config(['$httpProvider', '$locationProvider', function($httpProvider, $locationProvider) {
	$httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
}]);

var apiRoot = 'https://localhost/api/'; 

myApp.run(function($rootScope) {
    console.log('Application started!');
});

// For debugging
function getAngularElement(name, element) {
    element = element || '*[ng-app]';
    return angular.element(element).injector().get(name);
}