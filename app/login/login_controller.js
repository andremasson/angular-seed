'use strict';

/* global iwApp */
iwApp.controller('LoginController', ['$scope', '$state', 'sharedProperties', 'loginService', function($scope, $state, sharedProperties, loginService) {
  
  
    $scope.usuario = '';
    $scope.senha = '';
    $scope.mensagem = sharedProperties.getMensagem();
    //$scope.mensagem = "Mensagem de teste de autenticação";
    
    // console.log($state.current.name);
    
    // Init
    if ($scope.acao == 'logout') {
        logout();
    }
    
    var logout = function() {
        loginService.sair();
    };
    
    $scope.btnLogin = function() {
        loginService.setLogin($scope.usuario);
        loginService.setSenha($scope.senha);
        loginService.autenticar();
    };
    
    $scope.btnCancelar = function() {
        console.log("Cancelcar");
        sharedProperties.setMensagem('');
        $state.go("index");
    };
    
    
}]);
