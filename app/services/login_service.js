
/* global myApp */
/* global apiRoot */
myApp.service('loginService', ['$resource', '$state', 'sharedProperties', function ($resource, $state, sharedProperties) {
        
        var token = '';
        var sessionId = '';
        var active = false;
        
        var appApi = $resource(apiRoot + ":action", {action:'@action'}, {
    	    'info':{
    		    method:'GET',
    		    params:{
                  action:'info',
                },
    	    },
    	    'login':{
    		    method:'POST',
    				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    				transformRequest: function(data){
    
    		        if (data === undefined) {
    		            return data;
    		        }
    
    				var objReq = {login:'', setActiveTab:''};
    				objReq.login = data.login;
    				objReq.setActiveTab = data.setActiveTab;
    		        return $.param(objReq);
    
    		    },
    		    params:{
                  action:'login',
                },
    	    },
    	    'logout':{
    	        method:'GET',
    		    params:{
                  action:'logout',
                },
    	    }
        });

        var login = function(callback_func) {
            var loginObj = new appApi();
    		loginObj.login = login;
    		loginObj.password = password;
    
            loginObj.$login(
                
                function(retLogin) {
                    console.log(retLogin);
                    console.log("STATUS: " + retLogin.status);
                    if (retLogin.status == 0) {
                        console.log("Logged in.");
                        active = true;
                        sharedProperties.setMessage('');
                        sessionId = retLogin.sessionid;
                    } else {
                        console.log("Authentication error.");
                        sharedProperties.setMessage(retLogin.message);
                        active = false;
                        sessionId = '';
                    }
                    if (callback_func != null) {
                        callback_func(retLogin);
                    }
                    if (active) {
                        $state.go(sharedProperties.getNextState());
                    } else {
                        $state.go($state.current, {}, {reload: true});
                    }
                },
                function() {
                    sharedProperties.setMessage("Connection Error.");
                    $state.go($state.current, {}, {reload: true});
                });
           
        };
        
        var logout = function() {
            active = false;
            console.log('Leaving...');
            var loginObj = new appApi();
            loginObj.$logout();
        };
        
        var info = function(callback_func) {
            var loginObj = new wkfApi();
            
            loginObj.$info(function(ret) {
                console.log(ret);
                if (ret == null) {
                    sharedProperties.setMensagem("Not logged in.");
		            $state.go('login');
                }
                if (callback_func != null) {
                    callback_func(ret);
                }
            },
            function() {
                console.log("Erro de conexão");
                sharedProperties.setMensagem("Connection error.");
                $state.go('index', {}, {reload: true});
            });
        };

        return {
            getLogin: function () {
                return login;
            },
            setLogin: function(value) {
                login = value;
            },
            getSenha: function() {
                return senha;
            },
            setSenha: function(value) {
                senha = value;
            },
            getToken: function () {
                return token;
            },
            setToken: function(value) {
                token = value;
            },
            getSessionId: function () {
                return sessionId;
            },
            isAtivo: function() {
                return ativo;
            },
            setAtivo: function(value) {
                ativo = value;
            },
            info:info,
            autenticar:autenticar,
            autenticarAsync:autenticarAsync,
            sair:sair
        };
}]);
