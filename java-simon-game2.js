buttonColors = ['red', 'blue', 'green', 'yellow'];
started = false;
level = 0;
gamePattern = [];
userClickedPattern = []

alert("Hello it's me Rahul, thank you for visiting my page! enjoy..");
alert("Rule: just watch carefully and remember the blink pattterns and then try to enter that patterns to progress throught levels.");

function nextSequence() {
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
}



function playseQuence(r) {
  $("#"+r).addClass("pressed");
  var song = new Audio("sounds/"+r+".mp3");
  song.play();
  setTimeout(function () {
    $("#"+r).removeClass("pressed");
}, 200);
}

function animatePress(currentColor) {
  $('#'+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 200);
}

$(document).on("click", function() {
  if (!started) {
  nextSequence();
  $('h1').text("level "+level);
  started = true;
}
});

$('.btn').on("click", function() {
  userChosenColor = this.id;
  animatePress(userChosenColor);
  var playsound = new Audio("sounds/"+userChosenColor+".mp3")
  playsound.play()
  userClickedPattern.push(userChosenColor);
  if (userClickedPattern.length===gamePattern.length) {
    if (chekAnswer(userClickedPattern)===true) {
      console.log("true");
      setTimeout(nextSequence, 1000);
    } else {
      console.log('wrong');
      wrong()
      startOver()
    }
  }
  // if (level===8 && !started) {
    // alert("your memory is so good 😱")
  // }


});

function nextSequence() {
  level++
  $('h1').text("level "+level);
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  // console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  GamePlaySequence(gamePattern);
}



function wrong() {
  $('h1').text("Game 🤪ver! you pressed wrong button. Press any key to play again..")
  $("body").addClass("gameOver");
  var songs = new Audio("sounds/wrong.mp3");
  songs.play();
  setTimeout(function () {
    $("body").removeClass("gameOver");
  }, 200);
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function GamePlaySequence(gamePattern)    {
for (var i=0; i<gamePattern.length; i++) {
  item = gamePattern[i];
  Analyser(item);
}
function Analyser(item) {
  setTimeout(function() {
      playseQuence(item);
  }, 400 * i);
  userClickedPattern.length = [];
}
}


function chekAnswer() {
    if ((JSON.stringify(userClickedPattern))===(JSON.stringify(gamePattern))) {
      return true;
    } else {
      return false;
    }
}
