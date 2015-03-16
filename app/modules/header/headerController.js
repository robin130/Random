define(function(require) {  
         
    function headerController($rootScope,$scope,user,$location) {
        /* Chat controller */                                    
        $scope.signout = function(){
            user.logout(function(){
                $rootScope.usertoken = undefined;
                $location.path('login/signin');
                
            });
            
        };
        
    }   
  
    return headerController;
    
});