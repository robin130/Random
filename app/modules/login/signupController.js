define(["application-configuration"],function(app) {  
     
    
    function signupCtrl($rootScope,$scope) {
        /* Chat controller */           
        $scope.username = 'robin'; 
        $scope.classname = 'slide-right';
        console.log($scope);
        
    }  
    app.register.controller("signupController", ['$rootScope', '$scope', '$location', '$localStorage', 'User',signupCtrl]);
    
});