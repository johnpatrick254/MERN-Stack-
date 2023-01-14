

//var myname =("John Patrick");
//alert(myname);
//var yourname = prompt("What is your name");
//yourname
//alert("My name is " + myname + ", welcome to my course " + yourname);

//var a = 3;
//var b = 8;

//var myNAME = "John";
//var yourNAME = prompt("what is your name");
//alert("Hi " + yourNAME+ ", my name is "+ myNAME +", Good Morning !" )

//alert(" You have typed "+ yourNAME.length + " characters, you have " + (140 - yourNAME.length) + " characters left." );

//var tweet = prompt("Enter Your tweet");
//var tweetLength = tweet.length;
//var validTweet = tweet.slice(0,151);
//alert( validTweet + ". You have entered " + (150 - tweetLength) + " characters,"+ " Warning: only the First 150 characters displayed");

//var name = prompt("What is your name?");
//var upperCaseLetter = name.slice(0,1);
//var lowerCaseLetters =name.slice(1,10);
// var yourname = upperCaseLetter.toUpperCase() + lowerCaseLetters.toLowerCase();

// alert("Hello "+ yourname )

// var dogAge = prompt("Enter Dog age");
// var humanAge= (dogAge - 2 ) * 4 + 21;
// alert("Your dog is " + humanAge + " human years old!")

// function buyMilk(dollars) {
//     var cost = Math.floor ( dollars / 1.5);
//     console.log ('That will be enough for ' + cost + " bottles")
    
// }

// buyMilk(5);
function daysLeft(currentAge) {
var yourFirstName = prompt('Enter first name')    
var ageInDays = Math.floor (32850 - (currentAge * 365) ) ;
var ageInWeeks = 4680-  (currentAge * 52) ;
var ageInMonths = 1080- (currentAge * 12) ;

console.log("Hi, "+ yourFirstName + '. You have ' + ageInDays  + " days left, " + ageInWeeks + " weeks left, and " + ageInMonths + ' months left. Good Luck');

}
daysLeft(90);