define(["application-configuration","app/modules/chat/chatController","app/modules/home/leftmenuController","app/modules/user/userController"],function(app) {       
     
    function postsController($rootScope, $scope, $routeParams, $location, $localStorage,api){
        console.log($routeParams);
        if($routeParams.id){
            api.get({url: '/user', data: {_id : $routParams.id}},
                                function(response){
                                    $scope.user=response.success;
                                });
        }else{
            $scope.user = api.current_user();
        }
         
        $rootScope.pageClass = 'toggle';                   
    }    
    app.register.controller("postsController", ['$rootScope', '$scope','$routeParams', '$location', '$localStorage','api',postsController]);
    
});