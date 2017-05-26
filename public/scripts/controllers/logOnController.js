routerApp.controller('logOnController', ['$scope', '$http','$state', function($scope, $http, $state) {
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
  var database = firebase.database();

  $scope.logOn = function() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
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
               writeUserData(displayName, email, photoURL, uid);
               console.log($scope.acountDetails, 'acountDetails');
               //store google profile info in session storage
              //  sessionStorage.userAuth = accessToken;
              //  sessionStorage.userGoogleId = user.uid;
              //  sessionStorage.userDisplayName = user.displayName;
              //  sessionStorage.userPhotoUrl = user.photoURL;
             });
           } else {
             // User is signed out.
             console.log('signed out -- in logon');
           }

         }, function(error) {
           console.log(error);
         });

  //sign user out from app
  $scope.signOut = function() {
    firebase.auth().signOut().then(function() {
      console.log('You logged out');
      emptySessionStorage();
    }).catch(function(error) {
      // An error happened.
      console.log(error, 'error');
    }); //end catch
  }; //end signOut


  // //if user profile is present show certain things
  //   //else hide them
  // $scope.ifFirebaseUser = function(user) {
  //   if (user) {
  //             $scope.loggedIn = true;
  //             $scope.loggedOut = false;
  //
  //         } else {
  //             $scope.loggedIn = false;
  //             $scope.loggedOut = true;
  //             $state.go('logOn', {}, { reload: 'logOn' });
  //         }
  //     };//end if firebase user

//clear session storage on log out
var emptySessionStorage = function() {
  sessionStorage.removeItem('userProfile');
  sessionStorage.removeItem('idToken');
}; // end emptyLocalStorage

function writeUserData(displayName, email, photoURL, uid) {
  console.log(displayName);
 firebase.database().ref('users/' + uid).set({
   displayName: displayName,
   email: email,
   profile_picture : photoURL
 });
}
}]); //end controller
