define(["application-configuration"],function(app) {  
    console.log('controller loaded');
    
    
    function profileCtrl($rootScope, $scope, $location, $localStorage){
        $scope.classname = 'slide-right';                    
    }    
    app.register.controller("profileController", ['$rootScope', '$scope', '$location', '$localStorage',profileCtrl]);
    
});