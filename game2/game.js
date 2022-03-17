var buttonBox = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var arr = [];

$(document).keypress(function() {
    if(!started) {
        $("h1").text("Lets Go!")
        nextSequence();
        started = true;
    }
})

$(".bnt").click(function() {
    var userClickedBox = $(this).attr("id");
    userClickedPattern.push(userClickedBox);

    playSound("s1");

    animatePress(userClickedBox);

    checkAnswer(userClickedBox);
});



function nextSequence() {
    
    while (arr.length < 8) {
        var randNumber = Math.floor(Math.random()*16);
        if(arr.indexOf(randNumber) === -1) arr.push(randNumber);
    }
    for (var i=0;i<7;i++) {
        var randomBox = buttonBox[arr[i]];
        gamePattern.push(randomBox);
        animatePress(randomBox);
    }

}



// need to add func to check ans.

function checkAnswer(inp1) {
    if(gamePattern.includes(inp1) === true) {
        console.log("success");

        if(gamePattern.length === userClickedPattern.length) {
            $("body").addClass("good-job");
            $("h1").addClass("changetext");
            setTimeout(function () {
                $("body").removeClass("good-job");
              }, 1000);
            setTimeout(function () {
                $("h1").removeClass("changetext");
            }, 1000);

             setTimeout(function() {
                    $("h1").text("press any key to restart");
                }, 2000);
            startOver();
        }
    }
    else if(gamePattern.includes(inp1) === false) 
    {
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
              }, 500);
            $("h1").text("Game Over, press any key to restart");
            startOver();
    }
}

// function checkArray(gamePattern, userClickedPattern) {
//     if(gamePattern.length === userClickedPattern.length) {

//     }
// }


function animatePress(currentBox) {
    
    $("#" + currentBox).addClass("pressed");
    setTimeout(function () {
        $("#"+currentBox).removeClass("pressed");
    }, 1000);

};

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    arr = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}