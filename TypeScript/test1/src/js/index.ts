let dig1 = document.getElementById('dig1') as HTMLInputElement;
let dig2 = document.getElementById('dig2') as HTMLInputElement;
let button = document.getElementById('button') as HTMLButtonElement
let ans = document.getElementById('answer')!


button.addEventListener('click',() => {
    const answer = Number(dig1.value) + Number(dig2.value)
    ans.innerHTML = `${answer}`

})

setInterval(()=>{console.log(button.offsetLeft)},1000)
button.addEventListener('animationstart', (e) => {
    console.log(e)
})

let object: string | number | boolean;

enum Name {JOHN,PATRICK,ONYANGO};

console.log(Name.JOHN) // logs 0