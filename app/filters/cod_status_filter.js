/* global angular */
angular.module('myAppFilters', []).filter('cod_status', function() {
  return function(input) {
    var statusString;
    
    if (input == 1) {
        statusString = 'SOLICITADO';
    } else if (input == 2) {
        statusString = 'EXECUTANDO';
    } else if (input == 5) {
        statusString = 'CONCLUÍDO';
    } else if (input == 7) {
        statusString = 'CANCELADO';
    } else if (input == 7) {
        statusString = 'CONCLUÍDO NÃO CONFORME';
    }
    
    return statusString;
  };
});
