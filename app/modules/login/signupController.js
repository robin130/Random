define(["application-configuration"],function(app) {  
     
    
    function signupCtrl($rootScope,$scope) {
        /* Chat controller */     
         $scope.username = 'robin'; 
            $rootScope.pageClass = 'slide-right';
            
        $scope.initializeController = function(){
           
        }
        
        
    }  
    app.register.controller("signupController", ['$rootScope', '$scope', '$location', '$localStorage', 'api',signupCtrl]);
    
});