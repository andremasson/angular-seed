'use strict';

/* global myApp */
myApp.controller('MainMenuController', ['$scope', '$state', 'sharedProperties', 'loginService', function($scope, $state, sharedProperties, loginService) {
  sharedProperties.setNextState('index');
  
  $scope.showLogout = loginService.isAtivo();
  $scope.message = sharedProperties.getMessage();
  
  $scope.btnLogin = function() {
    $state.go('login');
  };
  
  $scope.btnLogout = function() {
    $('#quitModal').openModal();
  };
  
  $scope.btnConfirmaSair = function() {
    loginService.logout();
    $state.go($state.current, {}, {reload: true});
    $('#quitModal').closeModal();
  };
  h
}]);
