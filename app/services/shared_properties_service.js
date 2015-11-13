/* global iwApp */
iwApp.service('sharedProperties', function () {
        var menuButton = 'mdi-navigation-close';
        var message = '';
        var nextState = 'index';

        return {
            getMenuButton: function () {
                return menuButton;
            },
            setMenuButton: function(value) {
                menuButton = value;
            },
            getMensagem: function () {
                return message;
            },
            setMensagem: function(value) {
                message = value;
            },
            getNextState: function () {
                return nextState;
            },
            setNextState: function(value) {
                nextState = value;
            }
        };
});
