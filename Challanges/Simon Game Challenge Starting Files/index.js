//Arrays

var randomPattern = [];
var playerInput = [];


           //game start


//Level 1


$('body').on("keypress", function(){
    
    var randomNumber = Math.floor((Math.random() * 4) + 1);
    $('#level-title').text('Level 1');
    
    switch (randomNumber){
        case 1:
            randomPattern.push(randomNumber);
            $(' #green').addClass('pressed');
            var audio = new Audio('sounds/green.mp3');
            audio.play();    
            setTimeout(function(){ $(' #green').removeClass('pressed')}, 100);
            break;
            
        case 2:
                randomPattern.push(randomNumber);
                $(' #red').addClass('pressed');
                var audio = new Audio('sounds/red.mp3');
                audio.play();      
                setTimeout(function(){ $(' #red').removeClass('pressed')}, 100);
                break;

        case 3:
            randomPattern.push(randomNumber);
            $('#yellow').addClass('pressed');
            var audio = new Audio('sounds/yellow.mp3');
            audio.play();       
            setTimeout(function(){ $(' #yellow').removeClass('pressed')}, 100);
            break;  

        case 4:
            randomPattern.push(randomNumber);
            $(' #blue').addClass('pressed');
            var audio = new Audio('sounds/blue.mp3');
            audio.play();     
            setTimeout(function(){ $('#blue').removeClass('pressed')}, 100);

        break;
        default:
            alert(randomNumber);
        break

    }
})
// End of Level 1//

//Start of Level 2//

//color Values

var redButton = 1;
var redButton = 1;
var redButton = 1;
var blueButton = 4;

$('body').on("click", function(){
    
    var clickedKey = this.innerHTML;
    $('#level-title').text('Level 1');
    
    switch (randomNumber){
        case 1:
            randomPattern.push(randomNumber);
            $(' #green').addClass('pressed');
            var audio = new Audio('sounds/green.mp3');
            audio.play();    
            setTimeout(function(){ $(' #green').removeClass('pressed')}, 100);
            break;
            
        case 2:
                randomPattern.push(randomNumber);
                $(' #red').addClass('pressed');
                var audio = new Audio('sounds/red.mp3');
                audio.play();      
                setTimeout(function(){ $(' #red').removeClass('pressed')}, 100);
                break;

        case 3:
            randomPattern.push(randomNumber);
            $('#yellow').addClass('pressed');
            var audio = new Audio('sounds/yellow.mp3');
            audio.play();       
            setTimeout(function(){ $(' #yellow').removeClass('pressed')}, 100);
            break;  

        case 4:
            randomPattern.push(randomNumber);
            $(' #blue').addClass('pressed');
            var audio = new Audio('sounds/blue.mp3');
            audio.play();     
            setTimeout(function(){ $('#blue').removeClass('pressed')}, 100);

        break;
        default:
            alert(randomNumber);
        break

    }
})

