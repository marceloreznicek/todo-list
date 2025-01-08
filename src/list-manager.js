export {projects, toDos}

const projects = {
    projectList: [],
    addProject: (project) => projects.projectList.push(project),
    removeProject: (project) => projects.projectList.splice(projects.projectList.indexOf(project), 1),
    sortProjects: () => projects.projectList.sort((a, b) => a.getValue("orderValue") - b.getValue("orderValue")),
    getProjects: () => projects.projectList,
};

const toDos = {
    todoList: [],
    addToDo: (todo) => toDos.todoList.push(todo),
    removeToDo: (todo) => toDos.todoList.splice(toDos.todoList.indexOf(todo), 1),
    sortToDo: () => toDos.todoList.sort((a,b) => a.getValue("dueDate") < b.getValue("dueDate") ? -1 : 1),
    getToDos: () => toDos.todoList
}