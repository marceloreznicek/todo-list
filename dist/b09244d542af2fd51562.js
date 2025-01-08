import "./styles.css"

console.log("heeee")

import {createProject, createToDo} from "./projects-and-todos.js"

const project1 = createProject({
    name: "p1",
    color: "blue",
    orderValue: 1})

const todo1 = createToDo({
    title: "Hellow",
    description: "Hellow",
    dueDate: "Hellow",
    priority: "Hellow",
    projectAssigned: "Hellow",
    status: "Hellow"
})
     