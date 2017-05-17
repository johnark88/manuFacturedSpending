routerApp.controller('logOnController', [ '$scope', '$http', function($scope, $http){
  console.log('Log On controller');

  $scope.logOn = function(){
    console.log('LogOn');
  };

}]);
