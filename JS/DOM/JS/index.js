//img 1

var randomNumber_1 =Math.floor(Math.random() * 6) + 1;

var diceImg_1 = document.querySelectorAll('img')[0];

var randomDice_1 = '/Dicee Challenge - Starting Files/images/dice' + randomNumber_1 + '.png';

diceImg_1.setAttribute('src', randomDice_1);

//img2

var randomNumber_2 = Math.floor(Math.random() * 6) + 1;

var diceImg_2 = document.querySelectorAll('img')[1];

var randomDice_2 = '/Dicee Challenge - Starting Files/images/dice' + randomNumber_2 + '.png';

diceImg_2.setAttribute('src', randomDice_2);

//winner selection

if (randomNumber_1 > randomNumber_2) {
    document.querySelector('h1').innerHTML = "🚩Player 1 Won"
}
else if (randomNumber_2 > randomNumber_1){
    document.querySelector('h1').innerHTML = "🚩Player 2 Won"
}
else {
    document.querySelector('h1').innerHTML = "Draw!"
}