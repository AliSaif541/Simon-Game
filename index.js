var buttonColors = ["red", "blue", "green", "yellow"]

userClickedPattern = [];
var gamePattern = [];

var gameStart = false;
var level = 0;

$(document).keypress(function() {
    if (!gameStart) {  
      $("#level-title").text("Level " + level);
      nextSequence();
      gameStart = true;
    }
  });

Clicked();

function calRandom() {
    var Rand = Math.random();
    Rand = Rand * 4;
    Rand = Math.floor(Rand);
    return Rand;
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomChosenColor = buttonColors[calRandom()];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function Clicked() {
    $(".btn").click(function() {
        var userChosenColour = $(this).attr("id");
        
        $("#" + userChosenColour).addClass("pressed");
        setTimeout( function Fade() {
                $("#" + userChosenColour).removeClass("pressed");
            }, 100);
        
        userClickedPattern.push(userChosenColour);
        
        playSound(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    });
}

function checkAnswer(currLevel) {
    if (gamePattern[currLevel] === userClickedPattern[currLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } 
      else 
      {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}

function playSound(id) {
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}
