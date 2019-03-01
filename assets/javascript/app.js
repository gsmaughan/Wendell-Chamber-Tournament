window.onload = function loaded(){

  var revenue = 0;
  var teams = 0;
  

	var config = {
    apiKey: "AIzaSyCzem0RLdguK90Mux-Qym60w_SaSUkZYak",
    authDomain: "wendell-chamber-tournament.firebaseapp.com",
    databaseURL: "https://wendell-chamber-tournament.firebaseio.com",
    projectId: "wendell-chamber-tournament",
    storageBucket: "",
    messagingSenderId: "20507928648"
  	};

  	firebase.initializeApp(config);

  	var dataRef = firebase.database();



  	$("#submit").on("click", function(event) {
      event.preventDefault();

      //logic for storing add team input
      player1 = $("#player1").val().trim();
      player2 = $("#player2").val().trim();
      player3 = $("#player3").val().trim();
      sponsorship = $("#package").val();
      console.log("sponsorship", sponsorship);


      //find a way to get value of dropdown!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
      
      // create JSON object for team
      var team = {
      	player1: player1,
        player2: player2,
        player3: player3,
        // player4: player4,
        sponsorship: sponsorship,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      }

      //code for the push to firebase
      dataRef.ref().push(team);

      //log new team to console
      // console.log(team.player1);
      // console.log(team.player2);
      // console.log(team.player3);
    
      // console.log(team.sponsorship);
      // console.log("-------------------");

      //clears input text boxes
      $("#player1").val("");
      $("#player2").val("");
      $("#player3").val("");
    
      $("#sponsorship").val("");
   }); //end #add-team





  	dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {
      // console.log(childSnapshot.val() + " childSnapshot.val()");

      //store everything into a variable
      var p1 = childSnapshot.val().player1;
  		var p2 = childSnapshot.val().player2;
  		var p3 = childSnapshot.val().player3;
  	
  		var sp = childSnapshot.val().sponsorship;

      

  	   if(sp == "Moe"){
        revenue += 550;
        teams++;
       }
       else if(sp == "Curly"){
        revenue += 400;
        teams++;
       }
       else{
        revenue += 300;
        teams++;
       }

       console.log("teams", teams, "revenue", revenue, "WCC revenue");

  	$("table > tbody").append("<tr><td>" + p1 + "</td><td>" + p2 + "</td><td>" +
  		p3 + "</td><td style='color:red'>" + sp + "</td></tr>");



  	});//end child added

    

}//window.onload