'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ui.router',
	'myApp.view1',
	'myApp.view2',
	'myApp.user',
	'myApp.version'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/view1', {templateUrl: '/view1/view1.html'})
		.when('/view2', {templateUrl: '/view2/view2.html'})
		.when('/sys/user', {templateUrl: '/sys/user/user.html'})
		.otherwise({redirectTo: '/view1'});
}]);
