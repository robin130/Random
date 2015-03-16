define(["application-configuration","app/modules/chat/chatController","app/modules/home/leftmenuController"],function(app) {  
    console.log('controller loaded');
    
    
    function homeController($rootScope, $scope, $location, $localStorage,api){
        
        $scope.user = api.current_user();       
        $rootScope.pageClass = 'toggle';                  
    }    
    app.register.controller("homeController", ['$rootScope', '$scope', '$location', '$localStorage','api',homeController]);
    
});