import { createProject, createToDo} from "./projects-and-todos.js";
import { projects, toDos } from "./manage-Lists.js";

export {exportDataToLocalStorage, importDataFromLocalStorage, clearLocalStorage}


function clearLocalStorage() {
    console.log("Cleared Local Storage")
    localStorage.clear()
} 

// EXPORT -----------------------------------------------

function exportDataToLocalStorage() {
    exportLocalStorageProjects()
    exportLocalStorageTodos()
}

function exportLocalStorageProjects() {
    localStorage.setItem("projects", 
        generateProjectString())

    console.log(generateProjectString())
}


function exportLocalStorageTodos() {
    localStorage.setItem("todos", 
        generateTodoString())
}


function generateProjectString() {

    let projectListToStringify = []
    if (projects.projectList.length === 0) return
    const projectProp = projects.projectList[0].getProperties()

    // get projectsList
    projects.projectList.forEach((project) => {
        // turn each project into a string
        let projectToStringify = {}
        projectProp.forEach((prop) => {
            projectToStringify[prop] = project.getValue(prop)
        })

        projectListToStringify.push(projectToStringify)
        
    })

    // console.log(JSON.stringify(projectListToStringify))
    return JSON.stringify(projectListToStringify)

}


function generateTodoString() {

    let todoListToStringify = []
    if (toDos.todoList.length === 0) return
    const todoProp = toDos.todoList[0].getProperties()

    // get todoList
    toDos.todoList.forEach((todo) => {
        // turn each todo into a string
        let todoToStringify = {}
        todoProp.forEach((prop) => {
            todoToStringify[prop] = todo.getValue(prop)
        })

        todoListToStringify.push(todoToStringify)
        
    })

    // console.log(JSON.stringify(todoListToStringify))
    return JSON.stringify(todoListToStringify)

}

// IMPORT -----------------------------------------------

function importDataFromLocalStorage() {
    const blnProjectExists = importLocalStorageProjects()
    const blnTodoExists = importLocalStorageTodos()

    if(blnProjectExists && blnTodoExists) {
        return true
    } else return false
}

function importLocalStorageProjects() {
    projects.clearAll()

    const projectString = localStorage.getItem("projects")
    if (projectString === "undefined") {return false}

    // de-stringify the object
    const parsedProjectList = JSON.parse(projectString);
    // console.log(parsedProjectList)

    parsedProjectList.forEach((project) => {
        const newProject = createProject({
            name: project.name,
            color: project.color,
            orderValue: project.orderValue,
            presetId: project.id
        })

        projects.addProject(newProject)
    })
    
    return true
}

function importLocalStorageTodos() {
    toDos.clearAll()

    const todoString = localStorage.getItem("todos")
    if (todoString === "undefined") {return false}

    // de-stringify the object
    const parsedTodoList = JSON.parse(todoString);

    parsedTodoList.forEach((todo) => {
        const newTodo = createToDo({
            title: todo.status, 
            description: todo.description, 
            dueDate: todo.dueDate, 
            priority: todo.priority, 
            projectAssigned: todo.projectAssigned, 
            status: todo.status,
            presetId: todo.id
        })

        toDos.addToDo(newTodo)
    })

    console.log(toDos.getToDos())

    return true
    
}