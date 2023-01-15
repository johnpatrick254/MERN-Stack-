var numberOfDrums = document.querySelectorAll(".drum").length;

for (let i = 0; i < numberOfDrums; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){

var key = this.innerHTML;
buttonAnimation(key);

switch (key) {
    case 'w':
        var audio = new Audio('sounds/tom-1.mp3'); audio.play();
    case 'a':
        var audio = new Audio('sounds/tom-2.mp3'); audio.play();    
    case 's':
        var audio =new Audio('sounds/tom-3.mp3'); audio.play();
    case 'd':
        var audio =new Audio('sounds/tom-4.mp3'); audio.play(); 
    case 'j':
        var audio =new Audio('sounds/kick-bass.mp3'); audio.play();
    case 'l':
        var audio =new Audio('sounds/snare.mp3'); audio.play();
    case 'j':
        var audio =new Audio('sounds/crash.mp3'); audio.play();
    case 'k':
        var audio =new Audio('sounds/tom-1.mp3'); audio.play();
    break;
    default:
        console.log(key)
        break;
}
    })
    
}
//KeyBoard

document.addEventListener('keypress', function (teat) {
    var keypress = teat;
    var pressedK = keypress.key;
    buttonAnimation(pressedK);

switch (pressedK) {
    case 'w':
        var audio = new Audio('sounds/tom-1.mp3'); audio.play();
    case 'a':
        var audio = new Audio('sounds/tom-2.mp3'); audio.play();    
    case 's':
        var audio =new Audio('sounds/tom-3.mp3'); audio.play();
    case 'd':
        var audio =new Audio('sounds/tom-4.mp3'); audio.play(); 
    case 'j':
        var audio =new Audio('sounds/kick-bass.mp3'); audio.play();
    case 'l':
        var audio =new Audio('sounds/snare.mp3'); audio.play();
    case 'j':
        var audio =new Audio('sounds/crash.mp3'); audio.play();
    case 'k':
        var audio =new Audio('sounds/tom-1.mp3'); audio.play();
    break;
    default:
        console.log(key)
        break;
}
    })
    


function buttonAnimation(pressedKey){
    document.querySelector('.'+ pressedKey ).classList.add('pressed');
  setTimeout(function(){document.querySelector('.'+ pressedKey ).classList.remove('pressed')}, 100)
    
}
