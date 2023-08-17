export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["active"] = 0] = "active";
    ProjectStatus[ProjectStatus["finished"] = 1] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
export class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
export class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.active);
        this.projects.push(newProject);
        for (const listner of this.listeners) {
            listner(this.projects.slice());
        }
    }
    addListeners(Listerner) {
        this.listeners.push(Listerner);
    }
    moveProject(id, status) {
        const project = this.projects.find(prj => prj.id === id);
        if (project) {
            project.status = status;
            for (const listner of this.listeners) {
                listner(this.projects.slice());
            }
        }
    }
}
export const projectState = ProjectState.getInstance();
