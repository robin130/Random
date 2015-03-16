define([
    'angularAMD',
    'header',
    'angularRoute',
    'angularAnimate',
    'angularStorage',       
], function (angularAMD,headerController) {
    
        var app = angular.module('myApp', ['ngRoute','ngAnimate','ngStorage'])
            .config(['$routeProvider', '$httpProvider', function ($routeProvider,$httpProvider) {
                    $routeProvider                  

                     
                    .when("/:section/:tree?/:id?", angularAMD.route({

                        templateUrl: function (rp) { 
                                     return 'app/modules/' + rp.section + '/' + (rp.tree?rp.tree : rp.section) + '.html'; },

                        resolve: {
                        load: ['$q', '$rootScope', '$location', 
                            function ($q, $rootScope, $location) {

                                 var path = $location.path();
                                 var parsePath = path.split("/");
                                 var parentPath = parsePath[1];
                                 var controllerName = parsePath[2];
                                 var loadController = "app/modules/" + parentPath + "/"+
                                                       (controllerName ?controllerName : parentPath) + "Controller";

                                 var deferred = $q.defer();
                                 require([loadController], function (ctrl) {
                                     deferred.resolve(ctrl);   
                                     $rootScope.$apply();
                                 });
                            return deferred.promise;
                            }]
                        }
                    }))

                    .otherwise({ redirectTo: '/home' }); 
                        
                     $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
                        return {
                            'request': function (config) {
                                config.headers = config.headers || {};
                                if ($localStorage.token) {
                                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                                }
                                return config;
                            },
                            'responseError': function(response) {
                                if(response.status === 401 || response.status === 403) {
                                    $location.path('/login/signin');
                                }
                                return $q.reject(response);
                            }
                        };
                    }]);
                }
            ])
            .run(function ($rootScope, $location,$localStorage) {
                // register listener to watch route changes
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    if ((!$rootScope.usertoken || $rootScope.usertoken == null) && $location.$$path != '/login/signin' && !$localStorage.token) {
                        //code to show the home page always when user redirects through the page                           
                        $location.path("/login/signup");
                        next.redirectTo = '/login/signup';
                    }else{
                        if($localStorage.token || $rootScope.usertoken){
                            if(!$rootScope.usertoken)
                                $rootScope.usertoken = $localStorage.token;                              
                        }
                    }
                });
                 
            }).controller('headerController',['$rootScope', '$scope', 'api','$location', '$localStorage',headerController]);
            
            
    app.factory('api', ['$http', '$localStorage', function ($http, $localStorage) {
            var baseUrl = "http://localhost:3010/api";
            function changeUser(user) {
                angular.extend(currentUser, user);
            }

            function urlBase64Decode(str) {
                var output = str.replace('-', '+').replace('_', '/');
                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base64url string!';
                }
                return window.atob(output);
            }

            function getUserFromToken() {
                var token = $localStorage.token;
                var user = {};
                if (typeof token !== 'undefined') {
                    var encoded = token.split('.')[1];
                    user = JSON.parse(urlBase64Decode(encoded));
                }
                return user;
            }

            var currentUser = getUserFromToken(); 

            return {
                get: function (options, success, error) {
                    $http.get(baseUrl + options.url, options.data).success(success).error(error);
                },
                post: function (options, success, error) {  
                    $http.post(baseUrl + options.url, options.data).success(success).error(error);
                },
                save: function (data, success, error) {
                    $http.get(baseUrl + '/user', data).success(success).error(error)
                },
                signin: function (data, success, error) {  
                    $http.post(baseUrl + '/authenticate', data).success(success).error(error)
                },
                me: function (success, error) {
                    $http.get(baseUrl + '/me').success(success).error(error)
                },
                current_user : function(){ console.log('im here');
                    return getUserFromToken();
                },
                logout: function (success) {
                    changeUser({});
                    delete $localStorage.token;
                    success();
                }
            };
        }
    ]); 
      
    
    // Bootstrap Angular when DOM is ready
    angularAMD.bootstrap(app);
    
    return app;
    
});