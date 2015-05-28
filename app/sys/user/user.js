'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/sys/user', {
			templateUrl: 'user.html',
			controller: 'UserController'
		});
}])

.controller('UserController', [function() {

}]);
