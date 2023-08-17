var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BindMethod, validate } from "./decorators.js";
import { projectState, ProjectStatus } from "./project-state.js";
export class AbstractProject {
    constructor(templateID, hostElementID, instertAtStart, newElementID) {
        this.insertAtStart = instertAtStart;
        this.templateElement = document.getElementById(templateID);
        this.hostElement = document.getElementById(hostElementID);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementID)
            this.element.id = newElementID;
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement(this.insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }
}
export class singleProject extends AbstractProject {
    constructor(id, hostId) {
        super('single-list', hostId, false, id);
        this.id = id;
        this.configure();
    }
    configure() {
        this.element.addEventListener('dragstart', this.onDragStart);
        this.element.addEventListener('dragend', this.onDragStop);
    }
    renderContent(content) {
        document.getElementById(content.id).querySelector('h2').innerHTML = content.title;
        document.getElementById(content.id).querySelector('h3').innerHTML = content.people;
        document.getElementById(content.id).querySelector('p').innerHTML = content.description;
    }
    onDragStart(event) {
        event.dataTransfer.setData('text/plain', this.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    onDragStop(event) {
        console.log("drag stopped");
    }
}
__decorate([
    BindMethod
], singleProject.prototype, "configure", null);
__decorate([
    BindMethod
], singleProject.prototype, "onDragStart", null);
__decorate([
    BindMethod
], singleProject.prototype, "onDragStop", null);
export class ProjectInput extends AbstractProject {
    constructor() {
        super('project-input', 'app', true);
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
            projectState.addProject(title, description, people);
            this.clearInputs();
        };
        this.titleInput = this.element.querySelector('#title');
        this.dscInput = this.element.querySelector('#description');
        this.pplInput = this.element.querySelector('#people');
        this.configure();
    }
    submitHandler(e) {
        e.preventDefault();
        const input = this.fetchUserInput();
        console.log(input);
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() {
    }
    clearInputs() {
        this.titleInput.value = '';
        this.dscInput.value = '';
        this.pplInput.value = '';
    }
}
__decorate([
    BindMethod
], ProjectInput.prototype, "submitHandler", null);
export class ProjectList extends AbstractProject {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjcts = [];
        this.renderContent();
        this.configure();
    }
    configure() {
        projectState.addListeners((projects) => {
            this.assignedProjcts = projects.filter(prj => {
                if (this.type === "active") {
                    return prj.status === ProjectStatus.active;
                }
                else {
                    return prj.status === ProjectStatus.finished;
                }
            });
            this.renderProjects();
        });
        const ListItems = document.querySelectorAll('ul');
        for (const ListItem of ListItems) {
            ListItem.addEventListener('dragover', this.onDragover);
            ListItem.addEventListener('dragleave', this.onDragLeave);
            ListItem.addEventListener('drop', this.onDragDrop);
        }
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toLocaleUpperCase() + 'PROJECTS';
    }
    renderProjects() {
        const ulElement = this.element.querySelector(`#${this.type}-project-list`);
        ulElement.innerHTML = '';
        for (const item of this.assignedProjcts) {
            const project = new singleProject(item.id, `${this.type}-project-list`);
            project.renderContent(item);
        }
    }
    onDragDrop(event) {
        var _a;
        const id = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text/plain');
        const el = event.target;
        el.style.backgroundColor = 'rgba(12, 80, 80, 0.093)';
        if (id) {
            projectState.moveProject(id, this.type === 'active' ? ProjectStatus.active : ProjectStatus.finished);
        }
    }
    onDragLeave(event) {
        const el = event.target;
        el.style.backgroundColor = 'rgba(12, 80, 80, 0.093)';
    }
    onDragover(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const el = event.target;
            el.style.backgroundColor = 'white';
        }
    }
}
__decorate([
    BindMethod
], ProjectList.prototype, "onDragDrop", null);
__decorate([
    BindMethod
], ProjectList.prototype, "onDragLeave", null);
__decorate([
    BindMethod
], ProjectList.prototype, "onDragover", null);
