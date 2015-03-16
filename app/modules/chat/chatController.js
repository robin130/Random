define(["application-configuration"],function(app) {       
      
    function chatController($rootScope, $scope,$compile, $routeParams, $location, $localStorage,api){    
       
        $scope.user = api.current_user();
        $scope.userActions = [1,2,3,4,5,6,7,8,9,10]; 
        $scope.onlineUsers = [1,2,3,4,5,6,7,8,9,10]; 
        $scope.activeChats = [];
        
        $scope.openChat     = function(userId){            
            if(!($scope.activeChats.indexOf(userId)>-1 && userId)){               
                $scope.activeChats.push(userId);
                $scope.register_popup('user'+userId,'name'+userId)
                
            }
        };
        //this function can remove a array element.
         Array.remove = function(array, from, to) {
             var rest = array.slice((to || from) + 1 || array.length);
             array.length = from < 0 ? array.length + from : from;
             return array.push.apply(array, rest);
         };

         //this variable represents the total number of popups can be displayed according to the viewport width
         var total_popups = 0;

         //arrays of popups ids
         var popups = [];

         //this is used to close a popup
         $scope.close_popup = function(id)
         {
             for(var iii = 0; iii < popups.length; iii++)
             {
                 if(id == popups[iii])
                 {
                     Array.remove(popups, iii);

                     document.getElementById(id).style.display = "none";

                     calculate_popups();

                     return;
                 }
             }   
         }

         //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
         function display_popups()
         {
             var right = 320;
             var iii = 0;
             for(iii; iii < total_popups; iii++)
             {
                 if(popups[iii] != undefined)
                 {
                     var element = angular.element('#'+popups[iii]);
                     element.css("right", right + "px");
                     right = right + 320;
                     element.css("display","block");
                 }
             }

             for(var jjj = iii; jjj < popups.length; jjj++)
             {
                 var element = angular.element('#'+popups[jjj]);
                 element.css('display',"none");
             }
         }

         //creates markup for a new popup. Adds the id to popups array.
         $scope.register_popup = function(id, name)
         {

             for(var iii = 0; iii < popups.length; iii++)
             {   
                 //already registered. Bring it to front.
                 if(id == popups[iii])
                 {
                     Array.remove(popups, iii);

                     popups.unshift(id);

                     calculate_popups();


                     return;
                 }
             }               

             var element = '';
             
            angular.element('body').append($compile(element)($scope));
             

             popups.unshift(id);

             calculate_popups();

         };

         //calculate the total number of popups suitable and then populate the toatal_popups variable.
         function calculate_popups()
         {
             var width = window.innerWidth;
             if(width < 540)
             {
                 total_popups = 0;
             }
             else
             {
                 width = width - 320;
                 //320 is width of a single popup box
                 total_popups = parseInt(width/320);
             }

             display_popups();

         }         
         console.log($scope);
        $scope.classname = 'slide-right';                    
    }    
    app.register.controller("chatController", ['$rootScope', '$scope','$compile','$routeParams', '$location', '$localStorage','api',chatController]);
    
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

                scope.lastfeedStyle = function () {
                    return {
                        'height': (newValue.h/3.5) + 'px',   
                        'overflow-y' : 'scroll'
                    };
                };
                scope.chatStyle = function(){
                    return {
                        'height': (newValue.h/1.6) + 'px',                        
                        'overflow-y' : 'scroll'
                    };
                };

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
    });
    
      
    
});