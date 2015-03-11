define(["application-configuration"],function(app) {  
     
   
    function loginCtrl($rootScope, $scope, $location, $localStorage, User){
        $scope.classname = 'slide-right';        
        console.log($scope);
        $scope.signin = function() { 
           var formData = {
               email: $scope.email,
               password: $scope.password
           }
        console.log(formData);
        
           User.signin(formData, function(res) {
               if (res.error) {
                   $scope.error = res.error;                     
               } else {                   
                   $localStorage.token = res.success.token;
                   $rootScope.usertoken = res.success.token;
                   $location.path('/');
                   console.log($location);
               }
           }, function() {
               $rootScope.error = 'Failed to signin';
           })
        }; 
        $scope.me = function() {
            User.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };
 
        $scope.logout = function() {
            User.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
       
    }
  
    app.register.controller("loginController", ['$rootScope', '$scope', '$location', '$localStorage', 'User',loginCtrl]);
    
});