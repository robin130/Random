define([], function() {
  function View1Ctrl($scope) {
    $scope.ideaName = 'Todo List';   
     
  } 
  View1Ctrl.$inject=['$scope'];
 
  return View1Ctrl;
});