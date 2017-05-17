routerApp.controller('homeController', ['$scope', '$http', function($scope, $http) {
  console.log('Home controller');
  //jquery datepicker
  $(function() {
    $("#datepicker").datepicker();
  });

  //Get user inputs & send to server
  $scope.formSubmit = function() {
    //get input from users - in object to send to server
    var formDataToSend = {
      date: moment($('#datepicker').val()).format('MM-DD-YYYY'),
      location: $scope.location,
      typeSelect: $scope.typeSelect,
      credCardUsed: $scope.credCardUsed,
      totalSpent: $scope.totalSpent,
      fee: $scope.fee,
      pointsEarned: $scope.pointsEarned
    }; //end object to send
    console.log(formDataToSend, 'form obj');

      //http POST route to homeRoutes
      $http({
        method: 'POST',
        url: '/newUsr',
        data: formDataToSend
      }).then(function(results){
        console.log(results, 'results');
      });//end http.then
      }; //end formSubmit
}]); //end home controller
