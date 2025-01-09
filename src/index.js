// CSS import should have the correct path relative to this file
import './styles.css';

// JS import should have the correct path and .js extension
import { createProject, createToDo} from "./projects-and-todos.js";
import { projects, toDos } from "./manage-Lists.js";
import { printToConsole, clearProjects, addElementsToDom, returnToDoId, returnProjectId} from "./manage-DOM.js";
import {generateTestingElements} from "./testing-module.js"
import {openAddProjectForm, getFormProjectData, openEditProjectForm, openAddTodoForm, openEditTodoForm, getFormTodoData} from "./form-manager.js"

// Create ghost project
const ghostProject = createProject({
    name: "Other",
    color: "gray",
    orderValue: 99
});

generateTestingElements()

projects.sortProjects()
const projectList = projects.getProjects();
const todoList = toDos.getToDos();
clearProjects();
refreshUI();
setupUIButtons();

function setupUIButtons () {
    const btnAddProject = document.querySelector("#btn-add-project");
    btnAddProject.addEventListener("click", openAddProjectForm);

    const btnSaveProject = document.querySelector("#form-project-save");
    btnSaveProject.addEventListener("click", saveProjectFromForm);

    const btnDeleteProject = document.querySelector("#form-project-delete");
    btnDeleteProject.addEventListener("click", deleteProjectFromForm);

    const btnSaveTodo = document.querySelector("#form-todo-save");
    btnSaveTodo.addEventListener("click", saveToDoFromForm);

    const btnDeleteTodo = document.querySelector("#form-todo-delete");
    btnDeleteTodo.addEventListener("click", deleteTodoFromForm);


}

function setupToDoButtons () {
    const todoDoneButtons = document.querySelectorAll(".todo-done");
    todoDoneButtons.forEach((button) => button.addEventListener("click", (e) => clickedDoneButton(e.currentTarget)))

    const todoEditButtons = document.querySelectorAll(".todo-edit");
    todoEditButtons.forEach((button) => button.addEventListener("click", (e) => clickEditTodo(e.currentTarget)))

}



function setupAddTodoButtons () {
    const todoAddButtons = document.querySelectorAll(".project-todo-add");
    todoAddButtons.forEach((button) => button.addEventListener("click", (e) => openAddTodoForm(e.currentTarget)))
}

function setupEditProjectButtons () {
    const todoEditButtons = document.querySelectorAll(".project-edit");
    todoEditButtons.forEach((button) => button.addEventListener("click", (e) => clickEditProject(e.currentTarget)))
}




function refreshUI () {
    projects.sortProjects()
    toDos.sortToDo()

    clearProjects()
    addElementsToDom(projectList, todoList, ghostProject);
    setupToDoButtons();
    setupAddTodoButtons();
    setupEditProjectButtons();
}

function clickedDoneButton(target) {
    markSelectedToDoAsDone(target)
    toDos.sortToDo()
    refreshUI()
}


function saveProjectFromForm () {
    const projectData = getFormProjectData();
    if (!projectData) return 

    if (projectData.id === "New Project") {
        const newProject = createProject({
            name: projectData.name, 
            color: projectData.color, 
            orderIndex: projectData.orderIndex});
        console.log(newProject.getValue("name"))
        projects.addProject(newProject)

    } else { //Edit existing project

        const currentProject = projects.getProjectByID(projectData.id)
        currentProject.setValue("name", projectData.name)
        currentProject.setValue("color", projectData.color)
        currentProject.setValue("orderValue", projectData.orderValue)
    }

    refreshUI();
}

function deleteProjectFromForm() {
    const projectData = getFormProjectData("delete");
    if (projectData.id === "New Project") return
    projects.removeProject(projects.getProjectByID(projectData.id))

    refreshUI();
}

function clickEditProject(target) {
    const projectID = returnProjectId(target)
    const projectEle = projects.getProjectByID(projectID)
    openEditProjectForm(projectEle)
}

function clickEditTodo(target) {
    const todoID = returnToDoId(target)
    const todoEle = toDos.getToDobyID(todoID)
    let projectEle = projects.getProjectByID(todoEle.getValue("projectAssigned"))
    if (projectEle === undefined) projectEle = ghostProject
    openEditTodoForm(todoEle, projectEle)
}

function saveToDoFromForm () {
    const todoData = getFormTodoData();
    if (!todoData) return 
    
    if (todoData.id === "New ToDo") {
        const newTodo = createToDo(todoData);
        toDos.addToDo(newTodo)    
    } else { //Edit existing project
        const currentTodo = toDos.getToDobyID(todoData.id)
        currentTodo.setValue("title", todoData.title)
        currentTodo.setValue("dueDate", todoData.dueDate)
        currentTodo.setValue("priority", todoData.priority)
        currentTodo.setValue("description", todoData.description)
    }

    refreshUI();
}

function deleteTodoFromForm() {
    const todoData = getFormTodoData("delete");
    if (todoData.id === "New ToDo") return
    toDos.removeToDoByID(todoData.id)

    refreshUI();
}

function markSelectedToDoAsDone(targetEle) {
    const todoId = returnToDoId(targetEle)
    toDos.getToDobyID(todoId).markAsDone()  
}
