routerApp.controller('logOnController', ['$scope', '$http', function($scope, $http) {
  console.log('Log On controller');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCm_yeHJa4tHtiINvTeq5FHBOynBIZFfYc",
    authDomain: "mstrackingapp.firebaseapp.com",
    databaseURL: "https://mstrackingapp.firebaseio.com",
    projectId: "mstrackingapp",
    storageBucket: "mstrackingapp.appspot.com",
    messagingSenderId: "955367157195"
  };
  firebase.initializeApp(config);

  $scope.logOn = function() {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    }); //end catch
  }; //end log on function


  //sign user out from app
  $scope.signOut = function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('You logged out');
    }).catch(function(error) {
      // An error happened.
      console.log(error, 'error');
    }); //end catch
  }; //end signOut
}]); //end controller
