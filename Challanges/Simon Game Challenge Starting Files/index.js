//Arrays

var randomPattern = [];
var playerInput = [];

var rpLength = randomPattern.length;


//game start
//Animation functions

function displayRestart(){
    $(' #green').addClass('pressed');
    var audio = new Audio('sounds/blue.mp3');
    audio.play();     
    setTimeout(function(){ $('#green').removeClass('pressed')}, 100);

}
function displayGreen(){
    $(' #green').addClass('pressed');
    var audio = new Audio('sounds/blue.mp3');
    audio.play();     
    setTimeout(function(){ $('#green').removeClass('pressed')}, 100);

}
function displayRed(){
    $(' #red').addClass('pressed');
    var audio = new Audio('sounds/blue.mp3');
    audio.play();     
    setTimeout(function(){ $('#red').removeClass('pressed')}, 100);

}
function displayYellow(){
    $(' #yellow').addClass('pressed');
    var audio = new Audio('sounds/blue.mp3');
    audio.play();     
    setTimeout(function(){ $('#yellow').removeClass('pressed')}, 100);

}
function displayBlue(){
    $(' #blue').addClass('pressed');
    var audio = new Audio('sounds/blue.mp3');
    audio.play();     
    setTimeout(function(){ $('#blue').removeClass('pressed')}, 100);

}
function displayGameOver(){
    $('body').addClass('game-over');
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();     
    $('#level-title').text('Level 1');

}

//End of Animation functions


//Level 1
$('body').on("keypress", function(){
    
    var randomNumber = Math.floor((Math.random() * 4) + 1);
    $('#level-title').text('Level 1');
    
    switch (randomNumber){
        case 1:
            randomPattern.push(randomNumber);
            displayGreen();
            
            break;

        case 2:
            randomPattern.push(randomNumber);
            displayRed();

            break;

        case 3:
            randomPattern.push(randomNumber);
            displayYellow();
            break;  

        case 4:
            randomPattern.push(randomNumber);
            displayBlue();

        break;
        default:
            alert(randomNumber);
        break

    }
})

// End of Level 1//

//Start of Level 2//

//color Values

var greenButton = 1;
var redButton = 2;
var yellowButton = 3;
var blueButton = 4;


//Click Inputs

$('.btn').on("click", function(){
    var clickedButton = this.id;

    
    switch (clickedButton){

        case 'green':
            displayGreen();
            playerInput.push(1);
            randomPattern.push(1);
            addToRandomPattern();
            readCurrentPattern();
            break;
            
        case 'red':
            displayRed();
            playerInput.push(2)
            randomPattern.push(2);
            addToRandomPattern();
            readCurrentPattern();
                
            break;
                
        case 'yellow':
            displayYellow();
            playerInput.push(3);
            randomPattern.push(3);
            addToRandomPattern();
            readCurrentPattern();
            
            break;  
            
        case 'blue':
            displayBlue();
            playerInput.push(4);
            addToRandomPattern();
            readCurrentPattern();
                
                
            break;
        default:
            alert(5);
            break
        }

    }

)

//Game Engine
//var randomPattern = [];
//var playerInput = [];


function addToRandomPattern(){
    var randomAddition = Math.floor((Math.random() * 4) + 1);
    randomPattern.push(randomAddition);

}

function readCurrentPattern(){
    
    for (i=0; i < rpLength; i++){
    var light = randomPattern[i];
        if (light === 1){
            displayGreen();
           // 
        }
        else if(light === 2){
            displayRed();
           // 
        }
        else if(light === 3){
            displayYellow();
            //
        }
        else if(light === 4){
            displayBlue();
           // randomPattern.push(2);
        }
        
    }
}