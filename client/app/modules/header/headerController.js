define(function(require) {  
         
    function headerController($rootScope,$scope,user,$location,socket) {
        socket.connect();
        socket.on('connected',function(res){    console.log(res);    
            $scope.totalOnlineUsers = res.totalOnlineUsers;
            socket.me = res.me;
        });
        /* Chat controller */  
        $rootScope.loading = false;
        $scope.signout = function(){
            user.logout(function(){
                $rootScope.usertoken = undefined;
                $location.path('login/signin');
                
            });
            
        };
        
    }   
  
    return headerController;
    
});