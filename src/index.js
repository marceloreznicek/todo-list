// CSS import should have the correct path relative to this file
// import "./styles.css";

// JS import should have the correct path and .js extension
import { createProject, createToDo} from "./projects-and-todos.js";
import { projects, toDos } from "./list-manager.js";

// Mockdata for the time being

const project1 = createProject({
    name: "p1",
    color: "blue",
    orderValue: 1
});

const project2 = createProject({
    name: "p2",
    color: "red",
    orderValue: -1
});

const todo1 = createToDo({
    title: "title",
    description: "desc1",
    dueDate: "Hellow",
    priority: "Hellow",
    projectAssigned: "project1",
    status: "Hellow"
});


// console.log("start")

projects.addProject(project1)
projects.addProject(project2)

projects.sortProjects()

const projectList = projects.getProjects();
const todoList = toDos.getToDos();

// projectList.forEach((project) =d> console.log(project.getValue("name")))


function preparePrintingObject(projectList, todoList, aggregatingArg){
    let printableObject = {}

    projectList.forEach((project) => 
        printableObject[project.getValue("name")] = project
    )

}

console.table(preparePrintingObject(projectList, todoList, "agg"))