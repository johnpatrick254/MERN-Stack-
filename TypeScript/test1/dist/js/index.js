"use strict";
let dig1 = document.getElementById('dig1');
let dig2 = document.getElementById('dig2');
let button = document.getElementById('button');
let ans = document.getElementById('answer');
button.addEventListener('click', () => {
    const answer = Number(dig1.value) + Number(dig2.value);
    ans.innerHTML = `${answer}`;
});
setInterval(() => { console.log(button.offsetLeft); }, 1000);
button.addEventListener('animationstart', (e) => {
    console.log(e);
});
let object;
var Name;
(function (Name) {
    Name[Name["JOHN"] = 0] = "JOHN";
    Name[Name["PATRICK"] = 1] = "PATRICK";
    Name[Name["ONYANGO"] = 2] = "ONYANGO";
})(Name || (Name = {}));
;
console.log(Name.JOHN); // logs 0
