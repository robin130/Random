define(["application-configuration"],function(app) {  
     
    
    function signupCtrl($rootScope,$scope,api, $location, $localStorage) {
        /* Chat controller */     
        $rootScope.pageClass = 'slide-right';
        $scope.user = {};     
        
        $scope.signup = function(){
            if($scope.myForm.$valid){
                var formData = $scope.user;
                api.signup(formData, function(res) {
                    if (res.error) {
                        $scope.error = res.error;                     
                    } else {                   
                        $localStorage.token = res.success.token;
                        $rootScope.usertoken = res.success.token;
                        $location.path('/');                        
                    }
                }, function() {
                    $scope.error = 'Failed to signUp';
                });
            }else{
                $scope.error = 'Please make sure all details are entered!';
            }
        };
        $scope.fullName = function(){
            $scope.user.name = ($scope.user.firstname?$scope.user.firstname:'')+($scope.user.middlename? ' '+$scope.user.middlename:'')+($scope.user.lastname?' '+$scope.user.lastname:'');
            return $scope.user.name;
        };    
        $scope.initializeController = function(){
           
        }
        
        
    }  
    app.register.controller("signupController", ['$rootScope', '$scope','api', '$location', '$localStorage', signupCtrl]);
    app.register.directive('equals', function () {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, elem, attrs, ngModel) {
                if (!ngModel)
                    return; // do nothing if no ng-model

                // watch own value and re-validate on change
                scope.$watch(attrs.ngModel, function () {
                    validate();
                });

                // observe the other value and re-validate on change
                attrs.$observe('equals', function (val) {
                    validate();
                });

                var validate = function () {
                    // values
                    var val1 = ngModel.$viewValue;
                    var val2 = attrs.equals;

                    // set validity
                    ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
                    console.log(ngModel);
                };
            }
        }
    });
});