/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./decorators.ts":
/*!***********************!*\
  !*** ./decorators.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BindMethod: () => (/* binding */ BindMethod),
/* harmony export */   validate: () => (/* binding */ validate)
/* harmony export */ });
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


/***/ }),

/***/ "./project-class.ts":
/*!**************************!*\
  !*** ./project-class.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractProject: () => (/* binding */ AbstractProject),
/* harmony export */   ProjectInput: () => (/* binding */ ProjectInput),
/* harmony export */   ProjectList: () => (/* binding */ ProjectList),
/* harmony export */   singleProject: () => (/* binding */ singleProject)
/* harmony export */ });
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorators */ "./decorators.ts");
/* harmony import */ var _project_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-state */ "./project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class AbstractProject {
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
class singleProject extends AbstractProject {
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
    _decorators__WEBPACK_IMPORTED_MODULE_0__.BindMethod
], singleProject.prototype, "configure", null);
__decorate([
    _decorators__WEBPACK_IMPORTED_MODULE_0__.BindMethod
], singleProject.prototype, "onDragStart", null);
__decorate([
    _decorators__WEBPACK_IMPORTED_MODULE_0__.BindMethod
], singleProject.prototype, "onDragStop", null);
class ProjectInput extends AbstractProject {
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
            if (!(0,_decorators__WEBPACK_IMPORTED_MODULE_0__.validate)(validateTitle) ||
                !(0,_decorators__WEBPACK_IMPORTED_MODULE_0__.validate)(validateDescription) ||
                !(0,_decorators__WEBPACK_IMPORTED_MODULE_0__.validate)(validatePeople)) {
                alert("Invalid Input");
                return;
            }
            _project_state__WEBPACK_IMPORTED_MODULE_1__.projectState.addProject(title, description, people);
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
    _decorators__WEBPACK_IMPORTED_MODULE_0__.BindMethod
], ProjectInput.prototype, "submitHandler", null);
class ProjectList extends AbstractProject {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjcts = [];
        this.renderContent();
        this.configure();
    }
    configure() {
        _project_state__WEBPACK_IMPORTED_MODULE_1__.projectState.addListeners((projects) => {
            this.assignedProjcts = projects.filter(prj => {
                if (this.type === "active") {
                    return prj.status === _project_state__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.active;
                }
                else {
                    return prj.status === _project_state__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.finished;
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
            _project_state__WEBPACK_IMPORTED_MODULE_1__.projectState.moveProject(id, this.type === 'active' ? _project_state__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.active : _project_state__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.finished);
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
    _decorators__WEBPACK_IMPORTED_MODULE_0__.BindMethod
], ProjectList.prototype, "onDragDrop", null);
__decorate([
    _decorators__WEBPACK_IMPORTED_MODULE_0__.BindMethod
], ProjectList.prototype, "onDragLeave", null);
__decorate([
    _decorators__WEBPACK_IMPORTED_MODULE_0__.BindMethod
], ProjectList.prototype, "onDragover", null);


/***/ }),

/***/ "./project-state.ts":
/*!**************************!*\
  !*** ./project-state.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   ProjectState: () => (/* binding */ ProjectState),
/* harmony export */   ProjectStatus: () => (/* binding */ ProjectStatus),
/* harmony export */   projectState: () => (/* binding */ projectState)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["active"] = 0] = "active";
    ProjectStatus[ProjectStatus["finished"] = 1] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class ProjectState {
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
const projectState = ProjectState.getInstance();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _project_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-class */ "./project-class.ts");

new _project_class__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _project_class__WEBPACK_IMPORTED_MODULE_0__.ProjectList('active');
new _project_class__WEBPACK_IMPORTED_MODULE_0__.ProjectList('finished');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjJEO0FBRTFELElBQUksd0RBQVksRUFBRSxDQUFDO0FBQ25CLElBQUksdURBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixJQUFJLHVEQUFXLENBQUMsVUFBVSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZWNvcmF0b3JzLnRzIiwid2VicGFjazovLy8uL3Byb2plY3QtY2xhc3MudHMiLCJ3ZWJwYWNrOi8vLy4vcHJvamVjdC1zdGF0ZS50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGVDb25maWcge1xyXG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlcixcclxuICAgIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuICAgIG1pbkxlbmd0aD86IG51bWJlcjtcclxuICAgIG1heExlbmd0aD86IG51bWJlcjtcclxuICAgIG1pblZhbD86IG51bWJlcjtcclxuICAgIG1heFZhbD86IG51bWJlcjtcclxufVxyXG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSAoY29uZmlnOiBWYWxpZGF0ZUNvbmZpZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgIGlmIChjb25maWcucmVxdWlyZWQpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBjb25maWcudmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoICE9PSAwXHJcbiAgICB9XHJcbiAgICBpZiAoY29uZmlnLm1pbkxlbmd0aCAmJiB0eXBlb2YgY29uZmlnLnZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIGNvbmZpZy52YWx1ZS50cmltKCkubGVuZ3RoID49IGNvbmZpZy5taW5MZW5ndGhcclxuICAgIH1cclxuICAgIGlmIChjb25maWcubWF4TGVuZ3RoICYmIHR5cGVvZiBjb25maWcudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgY29uZmlnLnZhbHVlLnRyaW0oKS5sZW5ndGggPD0gY29uZmlnLm1heExlbmd0aFxyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5taW5WYWwgJiYgdHlwZW9mIGNvbmZpZy52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBjb25maWcudmFsdWUgPj0gY29uZmlnLm1pblZhbFxyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5tYXhWYWwgJiYgdHlwZW9mIGNvbmZpZy52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBjb25maWcudmFsdWUgPD0gY29uZmlnLm1heFZhbFxyXG4gICAgfVxyXG4gICAgaWYgKChjb25maWcubWF4VmFsIHx8IGNvbmZpZy5taW5WYWwpICYmIHR5cGVvZiBjb25maWcudmFsdWUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbn1cclxuLy8vLy8vLy8vLy8vLy9cclxuLy9ERUNPUkFUT1JTLy9cclxuLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBCaW5kTWV0aG9kID0gKF90YXJnZXQ6IGFueSwgX25hbWU6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXRNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gICAgY29uc3QgbmV3TWV0aG9kQ29uZmlnOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgY29uc3QgYm91bmRNZXRob2QgPSB0YXJnZXRNZXRob2QuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJvdW5kTWV0aG9kXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXdNZXRob2RDb25maWc7XHJcbn1cclxuIiwiaW1wb3J0IHtCaW5kTWV0aG9kLHZhbGlkYXRlLFZhbGlkYXRlQ29uZmlnfSBmcm9tIFwiLi9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IGRyYWdnVGFyZ2V0LGRyYWdnYWJsZSB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHtwcm9qZWN0U3RhdGUsUHJvamVjdCxQcm9qZWN0U3RhdHVzfSBmcm9tIFwiLi9wcm9qZWN0LXN0YXRlXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RQcm9qZWN0PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCwgVSBleHRlbmRzIEhUTUxFbGVtZW50PntcclxuICAgIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIGhvc3RFbGVtZW50OiBUO1xyXG4gICAgZWxlbWVudDogVTtcclxuICAgIGluc2VydEF0U3RhcnQ6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZUlEOiBzdHJpbmcsIGhvc3RFbGVtZW50SUQ6IHN0cmluZywgaW5zdGVydEF0U3RhcnQ6IGJvb2xlYW4sIG5ld0VsZW1lbnRJRD86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaW5zZXJ0QXRTdGFydCA9IGluc3RlcnRBdFN0YXJ0XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSA8SFRNTFRlbXBsYXRlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlEKTtcclxuICAgICAgICB0aGlzLmhvc3RFbGVtZW50ID0gPFQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG9zdEVsZW1lbnRJRCk7XHJcbiAgICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LCB0cnVlKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSA8VT5pbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgaWYgKG5ld0VsZW1lbnRJRCkgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElEO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGF0dGFjaCgpIHtcclxuICAgICAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudCh0aGlzLmluc2VydEF0U3RhcnQgPyAnYWZ0ZXJiZWdpbicgOiAnYmVmb3JlZW5kJywgdGhpcy5lbGVtZW50KVxyXG4gICAgfVxyXG4gICAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XHJcbiAgICBhYnN0cmFjdCByZW5kZXJDb250ZW50KGNvbnRlbnQ/OiBhbnkpOiB2b2lkO1xyXG5cclxuXHJcbn1cclxuXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy9zaW5nbGVQcm9qZWN0IENsYXNzLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5leHBvcnQgY2xhc3Mgc2luZ2xlUHJvamVjdCBleHRlbmRzIEFic3RyYWN0UHJvamVjdDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PiBpbXBsZW1lbnRzIGRyYWdnYWJsZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpZDogc3RyaW5nLCBob3N0SWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCdzaW5nbGUtbGlzdCcsIGhvc3RJZCwgZmFsc2UsIGlkKTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpXHJcbiAgICB9XHJcbiAgICBAQmluZE1ldGhvZFxyXG4gICAgY29uZmlndXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLm9uRHJhZ1N0YXJ0KVxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5vbkRyYWdTdG9wKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyQ29udGVudChjb250ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250ZW50LmlkKSEucXVlcnlTZWxlY3RvcignaDInKSEuaW5uZXJIVE1MID0gY29udGVudC50aXRsZVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRlbnQuaWQpIS5xdWVyeVNlbGVjdG9yKCdoMycpIS5pbm5lckhUTUwgPSBjb250ZW50LnBlb3BsZVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRlbnQuaWQpIS5xdWVyeVNlbGVjdG9yKCdwJykhLmlubmVySFRNTCA9IGNvbnRlbnQuZGVzY3JpcHRpb25cclxuICAgIH1cclxuICAgIEBCaW5kTWV0aG9kXHJcbiAgICBvbkRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5pZCk7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG4gICAgfVxyXG4gICAgQEJpbmRNZXRob2RcclxuICAgIG9uRHJhZ1N0b3AoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZHJhZyBzdG9wcGVkXCIpO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vL0NMQVNTIFBST0pFQ1QgSU5QVVQvL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQWJzdHJhY3RQcm9qZWN0PEhUTUxEaXZFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnQ+e1xyXG4gICAgdGl0bGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuICAgIGRzY0lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHBsSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigncHJvamVjdC1pbnB1dCcsICdhcHAnLCB0cnVlKVxyXG4gICAgICAgIHRoaXMudGl0bGVJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKTtcclxuICAgICAgICB0aGlzLmRzY0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xyXG4gICAgICAgIHRoaXMucHBsSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Blb3BsZScpO1xyXG4gICAgICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmZXRjaFVzZXJJbnB1dCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMudGl0bGVJbnB1dC52YWx1ZTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRoaXMuZHNjSW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGVvcGxlID0gK3RoaXMucHBsSW5wdXQudmFsdWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlVGl0bGU6IFZhbGlkYXRlQ29uZmlnID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGl0bGUsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDEsXHJcbiAgICAgICAgICAgIG1heExlbmd0aDogMjBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGVEZXNjcmlwdGlvbjogVmFsaWRhdGVDb25maWcgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMSxcclxuICAgICAgICAgICAgbWF4TGVuZ3RoOiAyMDBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGVQZW9wbGU6IFZhbGlkYXRlQ29uZmlnID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogcGVvcGxlLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgbWluVmFsOiAxLFxyXG4gICAgICAgICAgICBtYXhWYWw6IDVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICF2YWxpZGF0ZSh2YWxpZGF0ZVRpdGxlKSB8fFxyXG4gICAgICAgICAgICAhdmFsaWRhdGUodmFsaWRhdGVEZXNjcmlwdGlvbikgfHxcclxuICAgICAgICAgICAgIXZhbGlkYXRlKHZhbGlkYXRlUGVvcGxlKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBhbGVydChcIkludmFsaWQgSW5wdXRcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZSlcclxuICAgICAgICB0aGlzLmNsZWFySW5wdXRzKClcclxuICAgIH1cclxuXHJcbiAgICBAQmluZE1ldGhvZFxyXG4gICAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5mZXRjaFVzZXJJbnB1dCgpXHJcbiAgICAgICAgY29uc29sZS5sb2coaW5wdXQpXHJcbiAgICB9XHJcbiAgICBjb25maWd1cmUoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRIYW5kbGVyKTtcclxuICAgIH1cclxuICAgIHJlbmRlckNvbnRlbnQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJJbnB1dHMoKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy5kc2NJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIHRoaXMucHBsSW5wdXQudmFsdWUgPSAnJztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vL0NMQVNTIFBST0pFQ1QgTElTVC8vL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3QgZXh0ZW5kcyBBYnN0cmFjdFByb2plY3Q8SFRNTERpdkVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+IGltcGxlbWVudHMgZHJhZ2dUYXJnZXQge1xyXG4gICAgYXNzaWduZWRQcm9qY3RzOiBQcm9qZWN0W10gPSBbXVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogJ2FjdGl2ZScgfCAnZmluaXNoZWQnKSB7XHJcbiAgICAgICAgc3VwZXIoJ3Byb2plY3QtbGlzdCcsICdhcHAnLCBmYWxzZSwgYCR7dHlwZX0tcHJvamVjdHNgKTtcclxuICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKVxyXG4gICAgICAgIHRoaXMuY29uZmlndXJlKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uZmlndXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcnMoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFByb2pjdHMgPSBwcm9qZWN0cy5maWx0ZXIocHJqID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwiYWN0aXZlXCIpIHsgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuYWN0aXZlIH0gZWxzZSB7IHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLmZpbmlzaGVkIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IExpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJylcclxuICAgICAgICBmb3IgKGNvbnN0IExpc3RJdGVtIG9mIExpc3RJdGVtcykge1xyXG4gICAgICAgICAgICBMaXN0SXRlbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMub25EcmFnb3Zlcik7XHJcbiAgICAgICAgICAgIExpc3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMub25EcmFnTGVhdmUpO1xyXG4gICAgICAgICAgICBMaXN0SXRlbS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5vbkRyYWdEcm9wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3QtbGlzdGA7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkID0gbGlzdElkXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gdGhpcy50eXBlLnRvTG9jYWxlVXBwZXJDYXNlKCkgKyAnUFJPSkVDVFMnXHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcclxuXHJcbiAgICAgICAgY29uc3QgdWxFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMudHlwZX0tcHJvamVjdC1saXN0YCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdWxFbGVtZW50IS5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamN0cykge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IHNpbmdsZVByb2plY3QoaXRlbS5pZCwgYCR7dGhpcy50eXBlfS1wcm9qZWN0LWxpc3RgKVxyXG4gICAgICAgICAgICBwcm9qZWN0LnJlbmRlckNvbnRlbnQoaXRlbSlcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgQEJpbmRNZXRob2RcclxuICAgIG9uRHJhZ0Ryb3AoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlkID0gZXZlbnQuZGF0YVRyYW5zZmVyPy5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XHJcbiAgICAgICAgY29uc3QgZWwgPSA8SFRNTFVMaXN0RWxlbWVudD5ldmVudC50YXJnZXRcclxuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgxMiwgODAsIDgwLCAwLjA5MyknXHJcbiAgICAgICAgaWYgKGlkKSB7XHJcblxyXG4gICAgICAgICAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QoaWQsIHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLmFjdGl2ZSA6IFByb2plY3RTdGF0dXMuZmluaXNoZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBAQmluZE1ldGhvZFxyXG4gICAgb25EcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGVsID0gPEhUTUxVTGlzdEVsZW1lbnQ+ZXZlbnQudGFyZ2V0XHJcbiAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMTIsIDgwLCA4MCwgMC4wOTMpJ1xyXG4gICAgfVxyXG4gICAgQEJpbmRNZXRob2RcclxuICAgIG9uRHJhZ292ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgZWwgPSA8SFRNTFVMaXN0RWxlbWVudD5ldmVudC50YXJnZXRcclxuICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbiAgICBleHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcclxuICAgICAgICBhY3RpdmUsXHJcbiAgICAgICAgZmluaXNoZWRcclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHRpdGxlOiBzdHJpbmcsIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLCBwdWJsaWMgcGVvcGxlOiBudW1iZXIsIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGV4cG9ydCB0eXBlIExpc3Rlcm5lciA9IChwcm9qZWN0OiBQcm9qZWN0W10pID0+IHZvaWRcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIHtcclxuICAgICAgICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcclxuICAgICAgICBwcml2YXRlIGxpc3RlbmVyczogTGlzdGVybmVyW10gPSBbXTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvamVjdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBwZW9wbGU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoTWF0aC5yYW5kb20oKS50b1N0cmluZygpLCB0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZSwgUHJvamVjdFN0YXR1cy5hY3RpdmUpXHJcbiAgICAgICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RuZXIgb2YgdGhpcy5saXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RuZXIodGhpcy5wcm9qZWN0cy5zbGljZSgpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZExpc3RlbmVycyhMaXN0ZXJuZXI6IExpc3Rlcm5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKExpc3Rlcm5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgbW92ZVByb2plY3QoaWQ6IHN0cmluZywgc3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQocHJqID0+IHByai5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdC5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RuZXIgb2YgdGhpcy5saXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0bmVyKHRoaXMucHJvamVjdHMuc2xpY2UoKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjb25zdCBwcm9qZWN0U3RhdGUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUHJvamVjdElucHV0LFByb2plY3RMaXN0IH0gZnJvbSBcIi4vcHJvamVjdC1jbGFzc1wiO1xyXG4gICBcclxuIG5ldyBQcm9qZWN0SW5wdXQoKTtcclxuIG5ldyBQcm9qZWN0TGlzdCgnYWN0aXZlJyk7XHJcbiBuZXcgUHJvamVjdExpc3QoJ2ZpbmlzaGVkJyk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==