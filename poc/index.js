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

function joinRoom() {
  var roomCode = document.getElementById('joinRoom').value;
  if (roomCode != "") {
    firebase.database().ref('webBuzzer/' + roomCode).once('value', function(data) {
      if (data.val()) {
        window.open('room.html?id=' + roomCode, '_self')
      } else {
        alert('The room code you entered isn\'t valid.')
      }
    })
  } else {
    alert('A 5 digit room code is required.')
  }
}

function createRoom() {
  var roomName = document.getElementById('createRoom').value
  if (roomName != "") {
    var roomCode = generate5digitCode()
    firebase.database().ref('webBuzzer/' + roomCode).set({'name': roomName,mostRecentBuzz:0}, function(err) {
      if (err) {
        alert('An error occured. Try again later.')
      } else {
        window.open('manage.html?id=' + roomCode, '_self')
      }
    })
  } else {
    alert('A valid room name is required.')
  }
}

function generate5digitCode() {
  var roomCode = ""
  while (roomCode.length != 5) {
    roomCode = "" + Math.floor(Math.random()*100000)
  }
  return roomCode;
}
