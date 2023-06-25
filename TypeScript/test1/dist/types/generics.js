"use strict";
const uses = (Array); // same as string[]
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("User is john");
    }, 4000);
});
promise.then(data => console.log(data));
console.log("Hi");
//custom generic tasks
//use extend to set constraints to your generic types
function merge(objA, objB) {
    return Object.assign(objB, objA);
}
const countAndDescribe = (input) => {
    let desc = "HI";
    if (input.length > 0)
        desc = "no";
    return { input, desc };
};
