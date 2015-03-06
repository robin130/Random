define(function(require) {  
    console.log('controller loaded');
    var login = require("./module");

    function signupCtrl($scope) {
        /* Chat controller */           
        $scope.username = 'robin'; 
        $scope.classname = 'signup-view';
        
    }
    function loginCtrl($scope){
        $scope.classname = 'login-view';
        angular.element(document).ready(function () {
            console.log('Hello World');
            $('.shape').shape('flip up');
        });
    }
    function Router($routeProvider) {
        $routeProvider.when('/signup', {
                template: require('text!./signup.html'),
                controller: 'signupCtrl'
        });
         $routeProvider.when('/login', {
                template: require('text!./login.html'),
                controller: 'loginCtrl'
        });
    }
    
    login.config(['$routeProvider', Router]);
    login.controller("signupCtrl", ['$scope',signupCtrl]);
    login.controller("loginCtrl", ['$scope',loginCtrl]);
    return login;
});