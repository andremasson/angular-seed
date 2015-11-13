'use strict';

/* global iwApp */
iwApp.controller('HeaderController', ["$scope", "sharedProperties", "$state", "menuService", function($scope, sharedProperties, $state, menuService) {

    $scope.selectedItem = "Tarefa";
    $scope.menuVisivel = menuService.isVisible();
    $scope.buttonAction = sharedProperties.getMenuButton();

    $scope.init_dropdown = function() {
        $(".dropdown-button").dropdown();
        console.log("DROPDOWN");
    };

    $scope.back = function() {
        menuService.setVisible(false);
        if ($scope.buttonAction == "mdi-navigation-close") {
          sharedProperties.setMenuButton("mdi-navigation-arrow-back");
          $state.go("index");
        } else if($scope.buttonAction == "mdi-navigation-arrow-back") {
          sharedProperties.setMenuButton("mdi-navigation-close");
          $state.go("workflow");
        }
    };

    $scope.btnTarefa = function() {
        $scope.selectedItem = "Tarefa";
        menuService.setTabAtiva('tarefa');
    };

    $scope.btnDetalhes = function() {
        $scope.selectedItem = "Detalhes";
        menuService.setTabAtiva('detalhes');
    };

    $scope.btnHistorico = function() {
        $scope.selectedItem = "Histórico";
        menuService.setTabAtiva('historico');
    };

    $scope.btnAcoes = function() {
        $scope.selectedItem = "Ações";
        menuService.setTabAtiva('acoes');
    };

    $scope.btnAnexos = function() {
        $scope.selectedItem = "Anexos";
        menuService.setTabAtiva('anexos');
    };
}]);
