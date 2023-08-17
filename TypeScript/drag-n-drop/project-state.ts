
    export enum ProjectStatus {
        active,
        finished
    }
    export class Project {
        constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {

        }

    }
    export type Listerner = (project: Project[]) => void

    export class ProjectState {
        private projects: Project[] = [];
        private listeners: Listerner[] = [];
        private static instance: ProjectState

        public static getInstance() {
            if (this.instance) {
                return this.instance
            }
            this.instance = new ProjectState();
            return this.instance
        }

        public addProject(title: string, description: string, people: number) {
            const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.active)
            this.projects.push(newProject)
            for (const listner of this.listeners) {
                listner(this.projects.slice())
            }

        }

        public addListeners(Listerner: Listerner) {
            this.listeners.push(Listerner);
        }

        public moveProject(id: string, status: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === id);
            if (project) {
                project.status = status;
                for (const listner of this.listeners) {
                    listner(this.projects.slice())
                }
            }
        }
    }
    export const projectState = ProjectState.getInstance();

