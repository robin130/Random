define(["application-configuration"],function(app) {  
    console.log('controller loaded');
    
    
    function homeController($rootScope, $scope,$location,$timeout,socket){
       
        $scope.gender = 'male';
        $rootScope.pageClass = 'toggle';  
        
        
        $rootScope.chatmode = "text";                
        $scope.videochat = function(){
            $rootScope.chatmode = $scope.video != false ? $scope.video : 'text';            
        }
        $scope.findRandom = function(){ 
            $rootScope.loading = true;
            
            socket.emit('randomFetch',{mode : $scope.chatmode,sex : $scope.gender, interests : $scope.tags})
            
            socket.on('matchFound',function(res){
                console.log(res);
                socket.randomMatch = res;
                $timeout(function(){$location.path('/chat/');},1000);
            });
            
            
            
        };
 
    
    }    
    app.register.controller("homeController", ['$rootScope', '$scope','$location','$timeout','socket',homeController]);
    
});