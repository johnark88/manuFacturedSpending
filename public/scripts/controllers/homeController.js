routerApp.controller('homeController', ['$scope', '$http', function($scope, $http) {
  console.log('Home controller');

  //Get user inputs & send to server
  $scope.formSubmit = function() {
    //get input from users - in object to send to server
    var formDataToSend = {
      date: $scope.newDate,
      location: $scope.locationSelect,
      typeSelect: $scope.typeSelect,
      credCardUsed: $scope.creditCardUsed, // company(citi/chase/Amex) - personal or business - program(air/cash/gas)
      totalSpent: $scope.totalSpent,
      fee: $scope.fee,
      pointsEarned: $scope.pointsEarned
      // last four digits of gift card Opt
      // Serialnumber Opt
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
        //check value of check box selected = true / else its not selected = false
        //if true change page to moneyOrder.html to add in money order details
      if ($scope.checkBoxValue === true) {
        console.log('true - it is selected');
        window.location = "/views/moneyOrder.html";
      }else{
        console.log('false - it is not selected');
        // window.location = list of all giftcards
      }
        //call clearFirstForm
      clearFirstForm();
      }; //end formSubmit

      //ng show ???
        //function to clear first form in home.html
      function clearFirstForm(){
        $scope.date = '';
        $scope.locationSelect = '';
        $scope.typeSelect = '';
        $scope.creditCardUsed = '';
        $scope.totalSpent = '';
        $scope.fee = '';
        $scope.pointsEarned = '';
      }
}]); //end home controller
