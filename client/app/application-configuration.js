define([
    'angularAMD',
    'header',
    'app/config',
    'socketio',
    'ngDialog',
    'angularRoute',
    'angularAnimate',
    'angularStorage',
    'ngTag',
    'radioBtn',
    'scrollglue'
], function (angularAMD,headerController,config,io) {       
        window.io = window.io? window.io : io;
        var app = angular.module('myApp', ['ngTagsInput','ngRoute','ngAnimate','ngStorage','ngDialog','ui.checkbox','luegg.directives'])
            .config(['$routeProvider', '$httpProvider','$locationProvider', function ($routeProvider,$httpProvider,$locationProvider) {
                    //$locationProvider.html5Mode(true).hashPrefix('!');
            
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
                    // use the HTML5 History API
                   // $locationProvider.html5Mode(true);  
                    
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
            ]).config(["$provide", function($provide) {
                return $provide.decorator("$http", ["$delegate", function($delegate) {
                    var get = $delegate.get;
                    $delegate.get = function(url, config) { 
                        // Check is to avoid breaking AngularUI ui-bootstrap-tpls.js: "template/accordion/accordion-group.html"
                        if (url.indexOf('modules/') != -1) {
                            // Append ?v=[cacheBustVersion] to url
                            url += (url.indexOf("?") === -1 ? "?" : "&");
                            url += "v=" + (new Date()).getTime();
                        }
                        return get(url, config);
                    };
                    return $delegate;
                }]);
            }])
            .controller('headerController',['$rootScope', '$scope', 'api','$location','socket', '$localStorage',headerController]);
            
      app.factory('socket', function ($rootScope) {
        var socket = '';
        return {
            connect : function(){
                socket = io.connect(config.chatServer);
            },
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    });
         
    app.factory('api', ['$http', '$localStorage', function ($http, $localStorage) {
            var baseUrl = config.baseUrl;
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
                signup: function (data, success, error) {  
                    $http.post(baseUrl + '/user', data).success(success).error(error)
                },
                me: function (success, error) {
                    $http.get(baseUrl + '/me').success(success).error(error)
                },
                current_user : function(){  
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