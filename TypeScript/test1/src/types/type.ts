//objects
const person: {
    name: string,
    age: number
} = {
    name: "JOhn",
    age: 20
}

let people: object[]; //tells ts that people is an array of objects

people=[
    {
        name: "JOhn",
        age: 20
    },
    {
        name: "James",
        age: 20
    }
]

//arrays

let list:string[]; //tells ts that list is an array of strings

//functions

const addNum= (num1:number,num2:number,num3:number=3):number => num1 +num2; //tells ts to return num
addNum(2,1);

//function types
let addition:Function;
addition =addNum;

let subtraction:(a:number,b:number)=> void; //function definition