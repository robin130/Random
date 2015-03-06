define(function (require) {   console.log('module loaded');
    var angular = require("angular");
    var angularRoute = require("angularRoute");
    
    return angular.module("myApp.login", ['ngRoute']);
});