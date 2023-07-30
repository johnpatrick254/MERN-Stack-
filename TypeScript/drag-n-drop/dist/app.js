"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const validate = (config) => {
    let isValid = true;
    if (config.required) {
        isValid = isValid && config.value.toString().trim().length !== 0;
    }
    if (config.minLength && typeof config.value === 'string') {
        isValid = isValid && config.value.trim().length >= config.minLength;
    }
    if (config.maxLength && typeof config.value === 'string') {
        isValid = isValid && config.value.trim().length <= config.maxLength;
    }
    if (config.minVal && typeof config.value === 'number') {
        isValid = isValid && config.value >= config.minVal;
    }
    if (config.maxVal && typeof config.value === 'number') {
        isValid = isValid && config.value <= config.maxVal;
    }
    if ((config.maxVal || config.minVal) && typeof config.value !== 'number') {
        isValid = false;
    }
    return isValid;
};
const BindMethod = (_target, _name, descriptor) => {
    const targetMethod = descriptor.value;
    const newMethodConfig = {
        enumerable: false,
        configurable: true,
        get() {
            const boundMethod = targetMethod.bind(this);
            return boundMethod;
        }
    };
    return newMethodConfig;
};
class ProjectInput {
    constructor() {
        this.fetchUserInput = () => {
            const title = this.titleInput.value;
            const description = this.dscInput.value;
            const people = +this.pplInput.value;
            const validateTitle = {
                value: title,
                required: true,
                minLength: 1,
                maxLength: 20
            };
            const validateDescription = {
                value: description,
                required: true,
                minLength: 1,
                maxLength: 200
            };
            const validatePeople = {
                value: people,
                required: true,
                minVal: 1,
                maxVal: 5
            };
            if (!validate(validateTitle) ||
                !validate(validateDescription) ||
                !validate(validatePeople)) {
                alert("Invalid Input");
                return;
            }
            return [title, description, people];
        };
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInput = this.element.querySelector('#title');
        this.dscInput = this.element.querySelector('#description');
        this.pplInput = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    submitHandler(e) {
        e.preventDefault();
        const input = this.fetchUserInput();
        console.log(input);
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    BindMethod
], ProjectInput.prototype, "submitHandler", null);
class ProjectList {
    constructor(type) {
        this.type = type;
        this.template = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.template.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toLocaleUpperCase() + 'PROJECTS';
    }
}
const prjInput = new ProjectInput();
const actPrj = new ProjectList('active');
const finPrj = new ProjectList('finished');
