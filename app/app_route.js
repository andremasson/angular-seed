/* global myApp */
myApp.config(function($stateProvider) {
        $stateProvider.
            state('index', {
                url: '/',
                views: {
                    'top': { templateUrl: 'components/header/header_big_view.html', controller: 'HeaderController'},
                    'content': { templateUrl: 'main_menu/main_menu_view.html', controller: 'MainMenuController' },
                },
                onEnter: function(){
                  console.log('entrando main');
                },
                onExit: function(){
                  console.log('saindo main');
                }
            }).
            state('login', {
                url: '/login',
                views: {
                    'top': { templateUrl: 'components/header/header_big_view.html', controller: 'HeaderController'},
                    'content': { templateUrl: 'login/login_view.html', controller: 'LoginController' },
                },
                onEnter: function(){
                  console.log('entrando login');
                  $stateProvider.acao = "NOVA ACAO";
                },
                onExit: function(){
                  console.log('saindo login');
                }
            }).
            state('logout', {
                url: '/logout',
                views: {
                    'top': { templateUrl: 'components/header/header_big_view.html', controller: 'HeaderController'},
                    'content': { templateUrl: 'login/logout_view.html', controller: 'LoginController' },
                },
                onEnter: function(){
                  console.log('entrando login');
                },
                onExit: function(){
                  console.log('saindo login');
                }
            });
});
