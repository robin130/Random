define(["application-configuration","app/modules/chat/chatController"],function(app) {  
    console.log('controller loaded');
    
    
    function leftmenuController($rootScope, $scope, $location, $localStorage,api){
        
        $scope.user = api.current_user();
        
        $scope.leftmenuwidth = '';
        $scope.leftmenuheight = '';         
        $scope.classname = 'slide-right';                    
    }    
    app.register.controller("leftmenuController", ['$rootScope', '$scope', '$location', '$localStorage','api',leftmenuController]);
    
    app.register.directive('lmenuresize', function ($window) {
        return function (scope, element) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                var  $affix = $("#affix-lmenu"), 
                $parent = $affix.parent(); 
                return {
                    'h': w.height(),
                    'w': $parent.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.leftmenuheight = newValue.h;
                scope.leftmenuwidth = newValue.w;

                scope.style = function () {
                    return {
                        'height': (newValue.h) + 'px',
                        'width': (newValue.w) + 'px'
                    };
                };

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
    });
});