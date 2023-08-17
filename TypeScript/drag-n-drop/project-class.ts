import {BindMethod,validate,ValidateConfig} from "./decorators";
import { draggTarget,draggable } from "./interfaces";
import {projectState,Project,ProjectStatus} from "./project-state";

export abstract class AbstractProject<T extends HTMLElement, U extends HTMLElement>{
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    insertAtStart: boolean;
    constructor(templateID: string, hostElementID: string, instertAtStart: boolean, newElementID?: string) {
        this.insertAtStart = instertAtStart
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateID);
        this.hostElement = <T>document.getElementById(hostElementID);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <U>importedNode.firstElementChild;
        if (newElementID) this.element.id = newElementID;
        this.attach();
    }
    private attach() {
        this.hostElement.insertAdjacentElement(this.insertAtStart ? 'afterbegin' : 'beforeend', this.element)
    }
    abstract configure(): void;
    abstract renderContent(content?: any): void;


}


////////////////////////
//singleProject Class//
//////////////////////
export class singleProject extends AbstractProject<HTMLUListElement, HTMLLIElement> implements draggable {

    constructor(private id: string, hostId: string) {
        super('single-list', hostId, false, id);
        this.configure()
    }
    @BindMethod
    configure(): void {
        this.element.addEventListener('dragstart', this.onDragStart)
        this.element.addEventListener('dragend', this.onDragStop)
    }
    renderContent(content: any): void {
        document.getElementById(content.id)!.querySelector('h2')!.innerHTML = content.title
        document.getElementById(content.id)!.querySelector('h3')!.innerHTML = content.people
        document.getElementById(content.id)!.querySelector('p')!.innerHTML = content.description
    }
    @BindMethod
    onDragStart(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
    @BindMethod
    onDragStop(event: DragEvent): void {
        console.log("drag stopped");

    }
}


////////////////////////
//CLASS PROJECT INPUT//
//////////////////////

export class ProjectInput extends AbstractProject<HTMLDivElement, HTMLFormElement>{
    titleInput: HTMLInputElement;
    dscInput: HTMLInputElement;
    pplInput: HTMLInputElement;
    constructor() {
        super('project-input', 'app', true)
        this.titleInput = <HTMLInputElement>this.element.querySelector('#title');
        this.dscInput = <HTMLInputElement>this.element.querySelector('#description');
        this.pplInput = <HTMLInputElement>this.element.querySelector('#people');
        this.configure();
    }

    private fetchUserInput = (): void => {
        const title = this.titleInput.value;
        const description = this.dscInput.value;
        const people = +this.pplInput.value;

        const validateTitle: ValidateConfig = {
            value: title,
            required: true,
            minLength: 1,
            maxLength: 20
        }
        const validateDescription: ValidateConfig = {
            value: description,
            required: true,
            minLength: 1,
            maxLength: 200
        }
        const validatePeople: ValidateConfig = {
            value: people,
            required: true,
            minVal: 1,
            maxVal: 5
        }

        if (

            !validate(validateTitle) ||
            !validate(validateDescription) ||
            !validate(validatePeople)
        ) {
            alert("Invalid Input")
            return;
        }
        projectState.addProject(title, description, people)
        this.clearInputs()
    }

    @BindMethod
    private submitHandler(e: Event) {
        e.preventDefault()

        const input = this.fetchUserInput()
        console.log(input)
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent(): void {

    }

    private clearInputs() {
        this.titleInput.value = '';
        this.dscInput.value = '';
        this.pplInput.value = '';
    }
}


////////////////////////
//CLASS PROJECT LIST///
//////////////////////

export class ProjectList extends AbstractProject<HTMLDivElement, HTMLLIElement> implements draggTarget {
    assignedProjcts: Project[] = []

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.renderContent()
        this.configure()
    }


    configure(): void {
        projectState.addListeners((projects: Project[]) => {
            this.assignedProjcts = projects.filter(prj => {
                if (this.type === "active") { return prj.status === ProjectStatus.active } else { return prj.status === ProjectStatus.finished }
            });
            this.renderProjects()
        });
        const ListItems = document.querySelectorAll('ul')
        for (const ListItem of ListItems) {
            ListItem.addEventListener('dragover', this.onDragover);
            ListItem.addEventListener('dragleave', this.onDragLeave);
            ListItem.addEventListener('drop', this.onDragDrop);
        }

    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = this.type.toLocaleUpperCase() + 'PROJECTS'

    }
    private renderProjects() {

        const ulElement = this.element.querySelector(`#${this.type}-project-list`);
        
        ulElement!.innerHTML = ''
        for (const item of this.assignedProjcts) {
            const project = new singleProject(item.id, `${this.type}-project-list`)
            project.renderContent(item)


        }


    }
    @BindMethod
    onDragDrop(event: DragEvent): void {
        const id = event.dataTransfer?.getData('text/plain');
        const el = <HTMLUListElement>event.target
        el.style.backgroundColor = 'rgba(12, 80, 80, 0.093)'
        if (id) {

            projectState.moveProject(id, this.type === 'active' ? ProjectStatus.active : ProjectStatus.finished);
        }

    }
    @BindMethod
    onDragLeave(event: DragEvent): void {
        const el = <HTMLUListElement>event.target
        el.style.backgroundColor = 'rgba(12, 80, 80, 0.093)'
    }
    @BindMethod
    onDragover(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const el = <HTMLUListElement>event.target
            el.style.backgroundColor = 'white'
        }

    }
}
