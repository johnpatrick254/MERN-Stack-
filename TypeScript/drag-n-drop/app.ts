//////////////
//VALIDATORS//
//////////////

interface ValidateConfig {
    value: string | number,
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minVal?: number;
    maxVal?: number;
}


const validate = (config: ValidateConfig): boolean => {
    let isValid = true;

    if (config.required) {
        isValid = isValid && config.value.toString().trim().length !== 0
    }
    if (config.minLength && typeof config.value === 'string') {
        isValid = isValid && config.value.trim().length >= config.minLength
    }
    if (config.maxLength && typeof config.value === 'string') {
        isValid = isValid && config.value.trim().length <= config.maxLength
    }
    if (config.minVal && typeof config.value === 'number') {
        isValid = isValid && config.value >= config.minVal
    }
    if (config.maxVal && typeof config.value === 'number') {
        isValid = isValid && config.value <= config.maxVal
    }
    if ((config.maxVal || config.minVal) && typeof config.value !== 'number') {
        isValid = false
    }

    return isValid;
}
//////////////
//DECORATORS//
//////////////

const BindMethod = (_target: any, _name: string, descriptor: PropertyDescriptor) => {
    const targetMethod = descriptor.value;
    const newMethodConfig: PropertyDescriptor = {
        enumerable: false,
        configurable: true,
        get() {
            const boundMethod = targetMethod.bind(this);
            return boundMethod
        }
    }

    return newMethodConfig;
}

////////////////////////
//CLASS PROJECT INPUT//
//////////////////////

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInput: HTMLInputElement;
    dscInput: HTMLInputElement;
    pplInput: HTMLInputElement;
    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input');
        this.hostElement = <HTMLDivElement>document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLFormElement>importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInput = <HTMLInputElement>this.element.querySelector('#title');
        this.dscInput = <HTMLInputElement>this.element.querySelector('#description');
        this.pplInput = <HTMLInputElement>this.element.querySelector('#people');
        this.configure();
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }

    private fetchUserInput = (): [string, string, number] | void => {
        const title = this.titleInput.value;
        const description = this.dscInput.value;
        const people = +this.pplInput.value;
      
        const validateTitle: ValidateConfig ={
            value:title,
            required:true,
            minLength:1,
            maxLength:20
        } 
        const validateDescription: ValidateConfig ={
            value:description,
            required:true,
            minLength:1,
            maxLength:200
        } 
        const validatePeople: ValidateConfig ={
            value:people,
            required:true,
            minVal:1,
            maxVal:5
        } 

        if(

            !validate(validateTitle) ||
            !validate(validateDescription)||
            !validate(validatePeople)
        ){
            alert("Invalid Input")
            return;
        }
        return [title,description,people]

    }

    @BindMethod
    private submitHandler(e: Event) {
        e.preventDefault()

        const input = this.fetchUserInput()
        console.log(input)
    }
    private configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
}


////////////////////////
//CLASS PROJECT LIST///
//////////////////////

class ProjectList{
    template:HTMLTemplateElement;
    hostElement:HTMLDivElement;
    element:HTMLLIElement;
    
    
    constructor(private type:'active'| 'finished'){
        
        this.template =<HTMLTemplateElement> document.getElementById('project-list');
        this.hostElement =<HTMLDivElement> document.getElementById('app');
        const importedNode = document.importNode(this.template.content,true);
        this.element =<HTMLLIElement>importedNode.firstElementChild;
        this.element.id =`${this.type}-projects`;
        this.attach();
        this.renderContent()
    }
    
    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element)
    }
    
    private renderContent(){
    const listId =`${this.type}-project-list`;
    this.element.querySelector('ul')!.id =listId
    this.element.querySelector('h2')!.textContent = this.type.toLocaleUpperCase() + 'PROJECTS'
    
}
}
const prjInput = new ProjectInput();
const actPrj = new ProjectList('active');
const finPrj = new ProjectList('finished');