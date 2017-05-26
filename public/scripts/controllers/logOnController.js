routerApp.controller('logOnController', ['$scope', '$http', function($scope, $http) {
  console.log('Log On controller');
  $scope.acountDetails = {};
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
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // console.log(results,results);
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // console.log(token, 'Token');
      // The signed-in user info.
      var user = result.user;
      // console.log(user, 'User');
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    }); //end catch
  }; //end log on function

  firebase.auth().onAuthStateChanged(function(user) {
           if (user) {
             // User is signed in.
             var displayName = user.displayName;
             var email = user.email;
             var emailVerified = user.emailVerified;
             var photoURL = user.photoURL;
             var uid = user.uid;
             var phoneNumber = user.phoneNumber;
             var providerData = user.providerData;
             user.getIdToken().then(function(accessToken) {
               $scope.signInStatus = 'Signed in';
               $scope.signIn = 'Sign out';
               $scope.acountDetails = JSON.stringify({
                 displayName: displayName,
                 email: email,
                 emailVerified: emailVerified,
                 phoneNumber: phoneNumber,
                 photoURL: photoURL,
                 uid: uid,
                 accessToken: accessToken,
                 providerData: providerData
               }, null, '  ');
               console.log($scope.acountDetails, 'acountDetails');
               sessionStorage.userAuth = accessToken;
               console.log(user, 'firebaseUser User');
               //store google profile info in session storage
               sessionStorage.userGoogleId = user.uid;
               sessionStorage.userDisplayName = user.displayName;
               sessionStorage.userPhotoUrl = user.photoURL;
               $scope.ifFirebaseUser(user);
             });
           } else {
             // User is signed out.
             console.log('signed out -- in logon');
           }

         }, function(error) {
           console.log(error);
         });
         console.log($scope.acountDetails, 'at the end');

  //sign user out from app
  $scope.signOut = function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('You logged out');
      emptySessionStorage();
      $scope.ifFirebaseUser();
    }).catch(function(error) {
      // An error happened.
      console.log(error, 'error');
    }); //end catch
  }; //end signOut
  $scope.ifFirebaseUser = function(user) {
    if (user) {
              $scope.loggedIn = true;
              $scope.loggedOut = false;
          } else {
              $scope.loggedIn = false;
              $scope.loggedOut = true;
              // $location.reload();
          }
      };
//clear session storage on log out
var emptySessionStorage = function() {
  sessionStorage.removeItem('userProfile');
  sessionStorage.removeItem('idToken');
}; // end emptyLocalStorage

$scope.tb = "asasdasdasdasdasda";

$scope.testBatman = function(){
  console.log('Test button on homepage');
};
}]); //end controller
