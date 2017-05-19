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
      location: $scope.location, // create drop down and let user add to it
      typeSelect: $scope.typeSelect,  //
      credCardUsed: $scope.credCardUsed, // company(citi/chase/Amex) - personal or business - program(air/cash/gas)
      totalSpent: $scope.totalSpent,
      fee: $scope.fee,
      pointsEarned: $scope.pointsEarned
      // last four digits of gift card
      // vin # below barcode
    }; //end object to send
    console.log(formDataToSend, 'form obj');

      //http POST route to homeRoutes
      $http({
        method: 'POST',
        url: '/newGiftCard',
        data: formDataToSend
      }).then(function(results){
        console.log(results, 'results');
      });//end http.then
      }; //end formSubmit
}]); //end home controller
