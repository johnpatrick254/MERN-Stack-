"use strict";
// // //create decorator function
const registeredValidators = {};
const Required = (target, name) => {
    registeredValidators[target.constructor.name] = {
        [name]: ['required']
    };
};
const PositiveNumber = (target, name) => {
    registeredValidators[target.constructor.name] = {
        [name]: ['positive']
    };
};
const validator = (obj) => {
    const config = registeredValidators[obj.constructor.name];
    if (!config) {
        return true;
    }
    for (const prop in config) {
        for (const validator of config[prop]) {
            switch (validator) {
                case 'required':
                    return !!obj[prop];
                case 'positve':
                    return obj[prop] > 0;
            }
            return true;
        }
    }
};
class Courses {
    constructor(p, n) {
        this.title = n;
        this._price = p;
    }
}
