'use strict';

require.config({
    baseUrl: 'js/',   
    paths: {
        // Aliases and paths of modules        
        'angular': 'lib/angular',
        'angularAMD' : 'lib/angularAMD',
        'ngload'    : 'lib/ngload',
        'angularRoute': 'lib/angular-route',
        'angularResource': 'lib/angular-resource',
        'angularAnimate': 'lib/angular-animate',
        'angularStorage': 'lib/ngStorage',
        'app': '../app',
        'application-configuration' : '../app/application-configuration',
        'header'    : '../app/modules/header/headerController',
         text: 'lib/text',
    },
    shim: {
        // Modules and their dependent modules        
        'angularAMD' : ['angular'],
        'ngload'    : ['angular'],
        'angularRoute': ['angular'],
        'angularResource': ['angular'],
        'angularStorage': ['angular'],
        'angularAnimate': ['angular']
    },    
    deps : ['application-configuration'],
    urlArgs: "bust=" + (new Date()).getTime()
});

