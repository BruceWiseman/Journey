// a key map of required keys
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

// the konami code Sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right',
                  'left', 'right', 'b', 'a'];

// a variable to remember the 'position' the user has reached in the sequence.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  var requiredKey = konamiCode[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {

    // move to the next position(key) in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate konamiCode
    if (konamiCodePosition == konamiCode.length) {
      activateKonami();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});


function activateKonami() {

  //Sets the backgroundImage to be whatever is specified
  document.body.style.backgroundImage = "url('images/code.png')";

  //creates an audio variable and tells the code the location and filetype of the audio to be used
  var audio = new Audio('audio/konamiCode.mp3');
  audio.play();   //this just tells the audio variable to play

  alert("Destroyer of Code has Arrived");
}
