define(["application-configuration","underscore"],function(app,_und) {     
    var getIndexBy = function (list,condition) {
        for (var i = 0; i < list.length; i++) {
            if (condition(list[i])) {
                return i;
            }
            return undefined;
        }
    };  
    function chatController($rootScope, $scope,$compile, $routeParams, $location, $localStorage,socket){            
        $rootScope.loading = false;
        $scope.chats = [
            
        ];
        angular.element('#btn-input').focus();
        $scope.sendChat = function(){
            var message = {
                message : $scope.textBoxContent,
                from    : 'self'
            };
            $scope.chats.push(message);
            $scope.textBoxContent = '';            
            angular.element('#btn-input').focus();
            socket.emit('chat',{message : message.message, from : socket.me});
        };
        $scope.keyPress = function(e){
            if(e.keyCode == '13'){
                $scope.sendChat();
            }
        };
        if(socket.randomMatch){
            $scope.toUserID = socket.randomMatch.userid;
        }
              
        socket.on('chat',function(res){  console.log(res);         
                  
        });
         
        

         
          
        $rootScope.classname = 'slide-right';                    
    }    
    app.register.controller("chatController", ['$rootScope', '$scope','$compile','$routeParams', '$location', '$localStorage','socket',chatController]);
    
    app.register.directive('chatresize', function ($window) {
        return function (scope, element) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {               
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {                   
                scope.chatStyle = function(){
                    return {
                        'height': (newValue.h/1.5) + 'px'       
                    };
                };

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        };
    });
    
     
});