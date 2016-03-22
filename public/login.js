(function(){
    'use strict'; 
    angular.module('app').directive('myLogin',function(){
        return {
            restrict:'AEC',
            templateUrl: 'login.html'
        }
    });
})();
