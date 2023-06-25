"use strict";
//objects
const person = {
    name: "JOhn",
    age: 20
};
let people; //tells ts that people is an array of objects
people = [
    {
        name: "JOhn",
        age: 20
    },
    {
        name: "James",
        age: 20
    }
];
//arrays
let list; //tells ts that list is an array of strings
//functions
const addNum = (num1, num2, num3 = 3) => num1 + num2; //tells ts to return num
addNum(2, 1);
//function types
let addition;
addition = addNum;
let subtraction; //function definition
