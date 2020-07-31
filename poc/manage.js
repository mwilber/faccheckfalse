// Initialize Firebase
  var config = {
	apiKey: "AIzaSyDXWbWh--EJ4c43qMQ8z8ezfA8E6Vck32I",
	authDomain: "staging.greenzeta.com",
	databaseURL: "https://faccheckfalse.firebaseio.com/",
	projectId: "faccheckfalse",
	storageBucket: "faccheckfalse.appspot.com",
	messagingSenderId: "832096966179",
	appId: "1:832096966179:web:ca461c5c2218baa3f28396",
	measurementId: "G-HXLECNHEQT"
  };
  firebase.initializeApp(config);

if (QueryString().id != "") {
  var room = firebase.database().ref('webBuzzer/' + QueryString().id)
  room.child('name').once('value', function(name) {
	document.getElementById('title').innerHTML = "<u>Manage Web Buzzer</u><br> " + name.val()
	document.getElementById('instructions').innerHTML = "Give your players this code: " + QueryString().id
  })
  room.child('mostRecentBuzz').on('value', function(data) {
	let response = data.val();
	if (response == 0) {
	  document.getElementById('mostRecentBuzz').innerHTML = "Waiting for Buzz"
	} else if(typeof response == 'object') {
		// Find the earliest time stamp here
		let result = Object.keys(response).reduce((previous, key)=>{
			if(!previous || response[key] < response[previous]) return key;
			else return previous;
		}, 0);
		room.child('people').child(result).once('value', function(name) {
			document.getElementById('mostRecentBuzz').innerHTML = name.val()
		})
	}
  })
} else {
  window.open('index.html', '_self')
}

function resetBuzz() {
  firebase.database().ref('webBuzzer/' + QueryString().id + '/mostRecentBuzz').set(0)
}

function QueryString() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
	var pair = vars[i].split("=");
		// If first entry with this name
	if (typeof query_string[pair[0]] === "undefined") {
	  query_string[pair[0]] = decodeURIComponent(pair[1]);
		// If second entry with this name
	} else if (typeof query_string[pair[0]] === "string") {
	  var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	  query_string[pair[0]] = arr;
		// If third or later entry with this name
	} else {
	  query_string[pair[0]].push(decodeURIComponent(pair[1]));
	}
  }
  return query_string;
}
