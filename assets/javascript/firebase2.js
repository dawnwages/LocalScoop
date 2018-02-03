    //Initialize Firebase
    const config = {
    apiKey: "AIzaSyBjLJpg39qNGQ3BZjJ17DmAejavYWGKtpc",
    authDomain: "geoloc-1516755897361.firebaseapp.com",
    databaseURL: "https://geoloc-1516755897361.firebaseio.com",
    projectId: "geoloc-1516755897361",
    storageBucket: "geoloc-1516755897361.appspot.com",
    messagingSenderId: "262816324086"
  };
  
  firebase.initializeApp(config);



// variables
var userId;
var currentFirebaseUser;
var postKey;
var editActive = false;
var accountEditActive = false;
var testValue = "Oh my";
var dbRef;



firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        userId = firebaseUser.uid;
        testValue = "Yes";
        console.log(userId);
        console.log(firebaseUser);
        $('#btnLogin').addClass('hide');
        $('#btnLogout').removeClass('hide');
        //window.location = "index.html";
      // window.location.replace("index.html");

     dbRef = firebase.database().ref('users/'+ userId);

    // Firebase watcher .on("child_added")
        dbRef.on("child_added", function(snapshot) {
            // Log everything that's coming out of snapshot
            console.log(snapshot.val());
            console.log(snapshot.key)
            postKey = snapshot.key
            $("#dropdown1").append(createUserDiv(snapshot.val(), postKey));
        }, function(err) {
            // Handle errors
            console.log("Error: ", err.code);
        });

        dbRef.on("child_removed", function(snapshot) {
            // Log everything that's coming out of snapshot
            console.log(snapshot.val());
            console.log(snapshot.key)
            postKey = snapshot.key
            $("#dropdown1").empty()
            location.reload();
          }, function(err) {
            // Handle errors
            console.log("Error: ", err.code);
          });


    } else {
        $('#btnLogin').removeClass('hide');
        $('#btnLogout').addClass('hide');
        console.log('not logged in');
        testValue = "No";
    }
});

console.log(userId);
console.log(testValue);
 //create a variable to reference the database
 

function createUserDiv(user){
    delButton = $('<button>').addClass('btn').attr('id', 'delete-button').attr('value', postKey).text("x");
    var listItem = $('<li>').text(user.locationName + "  ").addClass("location-item").attr('loc-name', user.locationName).attr('lat-value', user.latitude).attr('long-value', user.longitude).append(delButton);
   $('#dropdown1').append(listItem);
    
}  


// $(document).on("click", ".location-item", function() {
//     console.log("yes");
//     var savedLat = $(this).attr("lat-value");
//     console.log(savedLat);
// })
  //$("#submitEmployee").on("click", submitEmployee);

  // Firebase watcher .on("child_added")
  function getUserInput(){
    //get Login Elements
    const txtEmail = $("#txtEmail").val();
    console.log(txtEmail);
    const txtPassword = $("#txtPassword").val();

  
    
    const btnLogin = $("#btnLogin").val().trim();
    const btnSignUp = $("#btnSignUp").val().trim();
    const btnLogout =$("#btnLogout").val().trim();
}


//add signup event
$("#btnSignUp").on("click", e => {
    event.preventDefault();
    //Get email and pass
    getUserInput();
    console.log(txtEmail);
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    console.log("You have successfully signed up.");
    // this logs any errors and logs them to the console
    promise.catch(e => console.log(e.message));
    
});
//add logout event if logged in
$("#btnLogout").on("click", e =>{
    firebase.auth().signOut();
    $("#dropdown1, #dropdown2").empty();
});

// add login event
$("#btnLogin").on("click",e => {
    event.preventDefault();
    //console.log("testing login");
    getUserInput();
//Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //location.reload();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    console.log("You have submitted a user.");

    // this logs any errors and logs them to the console
    promise.catch(e => console.log(e.message));
    
});

$(document).on("click", "#delete-button", function(){
    
      var postNum = $(this).val().trim();
    
      //console.log(postNum);
    //console.log(dbRef.child(postNum));
        //var test = dbRef.child(postNum);
        //console.log(test);
  dbRef.child(postNum).remove();
      console.log('deleted');
    }
    
    );

