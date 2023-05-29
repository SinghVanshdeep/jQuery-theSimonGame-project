
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []; // this contains randomly chosen colours
let userClickPattern = [];
var level = 0; // level that will increment

// function to play sounds
function playSound(name){
    var buttonAudio = new Audio('./sounds/'+name+'.mp3');
    buttonAudio.play();
    
}

// animating the press
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100)
}

// checking the answer 
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
        console.log("GC "+gamePattern);
        console.log("UC "+userClickPattern);
        console.log(currentLevel);
        // return true;
    }
    else{
        gameOver();
    }
}

// checking the sequence in orer to progress to next level
function checkSequence(){
    var i = 0; 
    while((gamePattern[i] === userClickPattern[i]) && i < level){
        i++;
    }
    if (i == level){
        userClickPattern = []; // so if sequence was successfully matched start nextSequence() new level and user choice to empty array
        setTimeout(function(){
            nextSequence();
        },1000)
    }

}

// function that handles when game is over
function gameOver(){
    // upon game over this should happen
    userClickPattern = []; // user choice reset
    gamePattern = []; // game pattern reset
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        level = 0;
        startGame();
    },200)

}

// the main function
function nextSequence(){
    // Changing the title of the page everytime this function is called
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4); // random numbers between 0 and 3
    var randomChosenColour = buttonColours[randomNumber]; // choosing a random colour

    // using jQuery to select the button with same ID as randomColourChosen
    // randomly chosen colour
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);

    // detecting and storing the id of the button that gets clicked (color that gets clicked)
    // colour chosen by user
    $(".btn").unbind("click").bind("click", function(event){ // had to use this rather than on("click") as event was being triggered twice upon one click
        var userChosenButton = $(event.target).attr("id"); // could've used 'this' keyword here 
        animatePress(userChosenButton);
        playSound(userChosenButton);
        userClickPattern.push(userChosenButton);
        checkAnswer(userClickPattern.lastIndexOf(userChosenButton));
        if(userClickPattern.length == level){
            checkSequence();
        }
    })

}

// function that starts the game
function startGame(){
    $(document).on("keypress", function(event){
        if (level == 0){
            nextSequence(); // so the game should only be started by a keypress at the start (when level is 0)
        }
    
    })
}

startGame();
