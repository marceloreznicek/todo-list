export {printToConsole, clearProjects, addElementsToDom, returnToDoId, returnProjectId}

function clearProjects () {

    const divMainContainer = getMainDiv()
    while (divMainContainer.firstChild) divMainContainer.removeChild(divMainContainer.firstChild)
} 

// Main function for changing DOM
function addElementsToDom(projectList, todoListOriginal, ghostProject) {
    const divMainContainer = getMainDiv()

    const todoList = cloneTodoList(todoListOriginal)

    projectList.forEach(project => {

        const divProject = createProjectElement(project)
        addProjectColor(project, divProject)
        divMainContainer.appendChild(divProject)

        const projectTodos = todoList.filter(todo =>
            todo.getValue("projectAssigned") === project.getValue("id")
        ) 

        let blnDottedLineDoneToDos = true

        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].getValue("projectAssigned") == project.getValue("id")) {
                let todoElement = createTodoElement(todoList[i])

                if (blnDottedLineDoneToDos && todoList[i].getValue("status") === "Done") {

                    divProject.appendChild(createEle("div", "dotted-line"))

                    blnDottedLineDoneToDos = false
                }
                
                divProject.appendChild(todoElement)
                todoList.splice(i, 1)
                i--


            }
        }
    });

    // Look at unassigned projects
    
    const divGhostProject = createProjectElement(ghostProject, true)
    divMainContainer.appendChild(divGhostProject)

    let blnDottedLineDoneToDos = true

    for (let i = 0; i < todoList.length; i++) {

        if (blnDottedLineDoneToDos && todoList[i].getValue("status") === "Done") {

            divGhostProject.appendChild(createEle("div", "dotted-line"))

            blnDottedLineDoneToDos = false
        }

        divGhostProject.appendChild(createTodoElement(todoList[i]))
    }
}


function createProjectElement(project, ghost = false) {
    const divProjectContainer = createEle("div", "project-container")
    const divProjectHeader = createEle("div", "project-header")
    const divProjectName = createEle("div", "project-name", project.getValue("name"))
    const divProjectId = createEle("div", "project-id", project.getValue("id"))
    const btnProjectTodoEdit = createEle("button", "project-todo-add", "ADD")
    const btnProjectEdit = createEle("button", "project-edit", "EDIT")

    divProjectContainer.appendChild(divProjectHeader)

    if (!ghost) {
        divProjectHeader.append(divProjectName, divProjectId, btnProjectTodoEdit, btnProjectEdit)  
    } else {
        divProjectHeader.append(divProjectName, divProjectId, btnProjectTodoEdit)  
    }

    return divProjectContainer
}

function addProjectColor(project, projectDiv) {
    const color = project.getValue("color")
    projectDiv.style.backgroundColor = color
    // Add a white overlay to lighten it
    projectDiv.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))"
}

function createTodoElement(todo) {
    const divContainer = createEle("div", "todo-container")

    const divHeader = createEle("div", "todo-header")
    const divName = createEle("div", "todo-name", todo.getValue("title"))
    const divID = createEle("div", "todo-id", todo.getValue("id"))

    const divButtons = createEle("div", "todo-buttons")
    const divBody = createEle("div", "todo-body")
    const btnDone = createEle("button", "todo-done", "DONE")
    const btnEdit = createEle("button", "todo-edit", "EDIT")
    
    divHeader.append(divName, divID)
    divContainer.append(divHeader, divBody, divButtons)
    divButtons.append(btnDone, btnEdit) 

    // Add arguments as body
    const ignoredProperties = ["id", "title", "projectAssigned", "status"]

    const todoProperties = todo.getProperties()
    todoProperties.forEach((property) => {
        if (!ignoredProperties.includes(property)) {

            const bodyPropertyItem = createEle("div", "todo-body-item")
            const bodyPropertyName = createEle("span", "todo-body-item-name", property + ": ")
            const bodyPropertyValue = createEle("span", "todo-body-item-value", todo.getValue(property))

            bodyPropertyItem.append(bodyPropertyName, bodyPropertyValue)
            divBody.appendChild(bodyPropertyItem)
        }
    })

    // Formating DONE to-dos
    if (todo.getValue("status") === "Done") {
        divName.classList.add("todo-done-deco")
    }
    
    return divContainer
}


// Auxiliary functions---------------
//DOM Changing elements
function getMainDiv() {
    return document.querySelector("#main")
}

function createEle(eleType, eleClass = undefined, EleContent = undefined) {
    const element = document.createElement(eleType)
    if (eleClass !== undefined) element.classList.add(eleClass)
    if (EleContent !== undefined) element.textContent = EleContent

    return element
}



function printToConsole(projectList, todoList) {

    projectList.forEach(project => {
        console.log("projectID: " + project.getValue("id"))

        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].getValue("projectAssigned") == project.getValue("id")) {
                console.log("toDoID: " + todoList[i].getValue("id") + " | Status: " + todoList[i].getValue("status"))
                todoList.splice(i, 1)
                i--
            }
        }
    });

    // Look at unassigned projects
    console.log("No project ID")
    for (let i = 0; i < todoList.length; i++) {
        console.log("toDoID: " + todoList[i].getValue("id") + " | Status: " + todoList[i].getValue("status"))
    }
}

function cloneTodoList(todoListOriginal) {
    return todoListOriginal.map(todo => ({
        ...todo,
        getValue: todo.getValue,  // preserve the method
        // preserve any other methods you need
    }))
}

function returnToDoId(targetEle) {
    const todoEle = targetEle.closest(".todo-container")
    const idEle = todoEle.querySelector(".todo-id")
    return idEle.textContent
}

function returnProjectId(targetEle) {
    const projectEle = targetEle.closest(".project-container")
    const idEle = projectEle.querySelector(".project-id")
    return idEle.textContent
}