(function() {
    'use strict';

    angular.module('app', [])
        .factory('login', function($http) {
            var loginInfo = {};
            var changes = [];// function arra, will cause memory leak
            var change = function(data){
                changes.forEach(function(fn){
                    fn(data);
                });
                loginInfo.info = data;
                return loginInfo;
            }
            return {
                login: function(user) {
                    return $http.post('/api/login', user).then(change);
                },
                logout: function() {
                    return $http.delete('/api/login').then(change);
                },
                isLogin: function() {
                    return $http.get('/api/login').then(change);
                },
                loginInfo: loginInfo,
                onchange: function(fn){
                    changes.push(fn);
                }
            };
        })
        .controller('MainCtrl', function($scope, login) {
            login.isLogin();
            $scope.logout = function() {
                login.logout();
            };
            login.onchange(function(data){
                $scope.loginInfo = data.data;
            });

        })
        .controller('LoginCtrl', ['$scope', 'login',
            function($scope,login) {
                var self = this;
                self.login = function(user){
                    login.login(user);
                };
                //self.login = login.login.bind(login);
                login.onchange(function(data){
                   self.loginInfo = data.data;
                }) 
            }
        ]);
})();
