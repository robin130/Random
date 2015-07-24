define(["application-configuration"],function(app) {  
     
   
    function loginCtrl($rootScope, $scope, $location, $localStorage, api){
        $rootScope.pageClass = 'slide-right';
        
        $scope.initializeController = function(){   
            
            console.log($scope);
        };       
        $scope.signin = function() { 
           var formData = {
               email: $scope.email,
               password: $scope.password
           }
        console.log(formData);
        
           api.signin(formData, function(res) {
               if (res.error) {
                   $scope.error = res.error;                     
               } else {                   
                   $localStorage.token = res.success.token;
                   $rootScope.usertoken = res.success.token;
                   $location.path('/');
                   console.log($location);
               }
           }, function() {
               $scope.error = 'Failed to signin';
           });
        }; 
        $scope.me = function() {
            api.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };
 
        $scope.logout = function() {
            api.logout(function() {
                
                window.location = "/";
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
       
    }
  
    app.register.controller("loginController", ['$rootScope', '$scope', '$location', '$localStorage', 'api',loginCtrl]);
    
});