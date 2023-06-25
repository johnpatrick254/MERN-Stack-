"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//create decorator function
const Logger = (constructor) => {
    console.log(constructor);
};
//call decorator using @ before defining class
let persons = class persons {
    constructor(input) {
        this.names = input;
    }
    get showName() { return this.names; }
};
persons = __decorate([
    Logger
], persons);
//using constractor factory used for logging custom params in decorator
//initiate function to be used as decorator param
const customDec = (custStr) => (constructor) => console.log(custStr);
let persons2 = class persons2 {
    constructor(input) {
        this.names = input;
    }
    get showName() { return this.names; }
};
persons2 = __decorate([
    Logger //RUNS LAST
    ,
    customDec("Custom message") //RUNS FIRST
], persons2);
// adding decorators to props
function Log(target, prop) {
    console.log(target, prop);
}
class Product {
    constructor(name, val) {
        this.title = name;
        this.price = val;
    }
}
__decorate([
    Log //call decorator before prop    
], Product.prototype, "title", void 0);
