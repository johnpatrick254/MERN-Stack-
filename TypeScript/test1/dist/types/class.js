"use strict";
class User {
    constructor(f_name, l_name, id) {
        //functions in classes are called methods 
        this.printName = () => this.f_name + " " + this.l_name;
        this.setName = (f_name, l_name) => { this.f_name = f_name, this.l_name = l_name; };
        this.f_name = f_name;
        this.l_name = l_name;
        this.id = id;
    }
    set setFirstName(name) {
        this.f_name = name;
    }
}
;
class Course extends User {
    constructor(name, f_name, l_name, id) {
        super(f_name, l_name, id); // initiate parent class constructor
        this.name = name;
        this.students = [`${this.printName()}`];
    }
    ;
    get displayDetails() { return { c_name: this.name, student: this.students }; }
}
;
const John = new Course("js intro", "John", "patrick", 10);
John.setFirstName = "Onyango"; //setter
console.log(John.printName(), John.displayDetails); //getter
