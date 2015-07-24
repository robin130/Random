'use strict';

require.config({
    baseUrl: 'js/',   
    paths: {
        // Aliases and paths of modules        
        'angular': 'lib/angular',
        'angularAMD' : 'lib/angularAMD',
        'ngload'    : 'lib/ngload',
        'angularRoute': 'lib/angular-route',
        'ngDialog'      : 'lib/ngDialog',
        'angularResource': 'lib/angular-resource',
        'angularAnimate': 'lib/angular-animate',
        'angularStorage': 'lib/ngStorage',
        'app': '../app',
        'application-configuration' : '../app/application-configuration',
        'header'    : '../app/modules/header/headerController',
         text: 'lib/text',
         socketio : 'lib/socket.io',
         underscore : 'lib/underscore-min',
         ngTag      : 'lib/ng-tags-input',
         radioBtn : 'lib/radiobtn',
         scrollglue : 'lib/scrollglue'
    },
    shim: {
        // Modules and their dependent modules        
        'angularAMD' : ['angular'],
        'ngload'    : ['angular'],
        'angularRoute': ['angular'],
        'ngDialog': ['angular'],       
        'angularResource': ['angular'],
        'angularStorage': ['angular'],
        'angularAnimate': ['angular'],
        'ngTag': ['angular'],
        'radioBtn' : ['angular'],
        'scrollglue' : ['angular']
         
    },    
    deps : ['application-configuration'],
    urlArgs: "bust=" + (new Date()).getTime()
});

