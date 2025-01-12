export {projects, toDos}

const projects = {
    projectList: [],
    addProject: (project) => projects.projectList.push(project),
    // removeProject: (project) => projects.projectList.splice(projects.projectList.indexOf(project), 1),
    removeProject: (project) => {
        let i = 0
        for (i = 0; i < projects.projectList.length; i++) {
            if (projects.projectList[i].getValue("id") == project.getValue("id")) break
        }
        if (i < projects.projectList.length) projects.projectList.splice(i, 1)
    },
    getProjectByID: (id) => {
        let i = 0
        for (i = 0; i < projects.projectList.length; i++) {
            if (projects.projectList[i].getValue("id") == id) return projects.projectList[i]
        }
    },

    sortProjects: () => projects.projectList.sort((a, b) => a.getValue("orderValue") - b.getValue("orderValue")),
    getProjects: () => projects.projectList,
    clearAll: () => projects.projectList = [],

};

const toDos = {
    todoList: [],
    addToDo: (todo) => toDos.todoList.push(todo),
    getToDobyID: (id) => {
        let i = 0
        for (i = 0; i < toDos.todoList.length; i++) {
            if (toDos.todoList[i].getValue("id") == id) return toDos.todoList[i]
        }
    },
    removeToDoByID: (id) => {
        let i = 0
        for (i = 0; i < toDos.todoList.length; i++) {
            if (toDos.todoList[i].getValue("id") == id) break
        }
        if (i < toDos.todoList.length) toDos.todoList.splice(i, 1)
    },

    sortToDo: () => toDos.todoList.sort((a,b) => {

        let valA = a.getValue("status") === "Done" ? 10 : 0
        let valB = b.getValue("status") === "Done" ? 10 : 0

        valA = valA + (a.getValue("dueDate") < b.getValue("dueDate") ? -1 : 1)

        return valA < valB ? -1 : 1

    }),
        // a.getValue("dueDate") < b.getValue("dueDate") ? -1 : 1),
    getToDos: () => toDos.todoList,
    clearAll: () => toDos.todoList = [],
    deleteAllTodosFromProject: (projectId) => {
        const todoDeleteList = toDos.todoList.filter((todo) => todo.getValue("projectAssigned") == projectId)
        todoDeleteList.forEach ((todo)=> {
            toDos.removeToDoByID(todo.getValue("id"))
        }) 
    }
    
}