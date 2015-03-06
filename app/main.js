'use strict';

require.config({
    baseUrl: 'js/',
    map: {
        // Maps
    },   
    packages: [{name: "login", location: "../app/modules/login/"}],
    paths: {
        // Aliases and paths of modules        
        'angular': 'lib/angular',
        'angularRoute': 'lib/angular-route',
        'angularResource' : 'lib/angular-resource',
        'angularAnimate'  : 'lib/angular-animate',
        'app': '../app',
         text : 'lib/text',
    },
    shim: {
        // Modules and their dependent modules
        'angular': {'exports': 'angular'},
        'angularRoute': ['angular'],
        'angularResource' : ['angular'],
        'angularAnimate' : ['angular']
    },
    priority: ["angular"]
});

require([
    'angular',
    'angularRoute', 
    'angularAnimate',
    'login'
], function (angular,angularRoute,angularAnimate) {
    angular.module('myApp', ['ngRoute','myApp.login','ngAnimate'])
            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.otherwise({redirectTo: '/home'});
                }
            ])
            .run(function ($rootScope, $location) {
                // register listener to watch route changes
                $rootScope.$on("$routeChangeStart", function (event, next, current) {                   
                    if ((!$rootScope.loggedUser || $rootScope.loggedUser == null) && $location.$$path != '/login') {   
                        //code to show the home page always when user redirects through the page                           
                            $location.path("/signup");    
                            next.redirectTo ='/signup';
                    }
                });
            });
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function () {
        // bootstrap the app manually
        angular.bootstrap($html, ['myApp']);
    });
}
);