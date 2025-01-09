export {openAddProjectForm, getFormProjectData, openEditProjectForm, openAddTodoForm, openEditTodoForm, getFormTodoData}

function openAddProjectForm() {
    document.querySelector('#form-project-id').textContent = "New Project"
    document.querySelector('#form-input-project-name').value = "New Project"
    document.querySelector('#form-input-project-index').value = 0


    const dialogBox = document.querySelector("#form-add-project")
    dialogBox.showModal()
}

function openEditProjectForm(project) {

    const dialogBox = document.querySelector("#form-add-project")
    dialogBox.querySelector('#form-project-id').textContent = project.getValue("id")
    
    dialogBox.querySelector('#form-input-project-name').value = project.getValue("name")
    dialogBox.querySelector('#form-input-project-color').value = project.getValue("color")
    dialogBox.querySelector('#form-input-project-index').value = project.getValue("orderValue")

    dialogBox.showModal()
}

function validateProjectForm(name, color, orderIndex) {

    // Object to store validation errors
    const errors = [];

    // Validate Name
    if (!name) {
        errors.push('Project name is required');
    } else if (name.length < 2) {
        errors.push('Project name must be at least 2 characters long');
    } else if (name.length > 50) {
        errors.push('Project name cannot exceed 50 characters');
    }

    // Validate Color
    const validColors = ['red', 'blue', 'green', 'yellow', 'purple', 
                        'orange', 'pink', 'brown', 'gray', 'black'];
    if (!color) {
        errors.push('Please select a color');
    } else if (!validColors.includes(color)) {
        errors.push('Invalid color selection');
    }

    // Validate Order Index
    if (orderIndex === '') {
        errors.push('Order index is required');
    } else {
        const indexNum = Number(orderIndex);
        if (isNaN(indexNum)) {
            errors.push('Order index must be a number');
        } else if (!Number.isInteger(indexNum)) {
            errors.push('Order index must be a whole number');
        } else if (indexNum < 0) {
            errors.push('Order index cannot be negative');
        }
    }

    // Return validation result
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function getFormProjectData(btnType = "Save")  {

    const projectFormerID = document.querySelector('#form-project-id').textContent
    const projectName = document.querySelector('#form-input-project-name').value.trim()
    const projectColor = document.querySelector('#form-input-project-color').value
    const projectOrderValue = document.querySelector('#form-input-project-index').value


    
    const formValidation = validateProjectForm(projectName, projectColor, projectOrderValue)
    if (!formValidation.isValid && btnType === "Save") return alert(formValidation.errors)
    const dialogBox = document.querySelector("#form-add-project")
  
    dialogBox.close()

    return {
        id: projectFormerID,
        name: projectName,
        color: projectColor,
        orderValue: projectOrderValue,        
    }


}

// THIS IS FOR TODOs
function openAddTodoForm(target) {
    const dialogBox = document.querySelector("#form-add-todo");

    const projectInfo = getCurrentProject(target);
    document.querySelector("#form-input-todo-project").textContent = projectInfo.name;
    document.querySelector("#form-input-todo-project-id").textContent = projectInfo.id;

    dialogBox.querySelector('#form-todo-id').textContent = "New ToDo"
    
    dialogBox.querySelector('#form-input-todo-title').value = "To Do"
    dialogBox.querySelector('#form-input-todo-date').value = ""
    dialogBox.querySelector('#form-input-todo-priority').value = ""
    dialogBox.querySelector('#form-input-todo-desc').value = ""    

    dialogBox.showModal()
}

function openEditTodoForm(todo, project) { 

    const dialogBox = document.querySelector("#form-add-todo")
    dialogBox.querySelector('#form-todo-id').textContent = todo.getValue("id")
    
    dialogBox.querySelector('#form-input-todo-title').value = todo.getValue("title")
    dialogBox.querySelector('#form-input-todo-date').value = todo.getValue("dueDate")
    dialogBox.querySelector('#form-input-todo-priority').value = todo.getValue("priority")
    dialogBox.querySelector('#form-input-todo-desc').value = todo.getValue("description")
    
    
    dialogBox.querySelector("#form-input-todo-project").textContent = project.getValue("name");
    dialogBox.querySelector("#form-input-todo-project-id").textContent = project.getValue("id");

    dialogBox.showModal()
}

function getCurrentProject(target) {
    const parentContainer = target.closest(".project-container")
    return {
        id: parentContainer.querySelector(".project-id").textContent,
        name: parentContainer.querySelector(".project-name").textContent,
    }
}

function validateTodoForm(title, dueDate, priority, projectId, description) {
    const errors = [];
    
    // Validate Title
    if (!title) {
        errors.push('Title is required');
    } else if (title.trim().length < 3) {
        errors.push('Title must be at least 3 characters long');
    } else if (title.trim().length > 50) {
        errors.push('Title must not exceed 50 characters');
    }

    // Validate Due Date
    if (!dueDate) {
        errors.push('Due date is required');
    } else {
        const selectedDate = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day

        if (isNaN(selectedDate.getTime())) {
            errors.push('Invalid date format');
        } else if (selectedDate < today) {
            errors.push('Due date cannot be in the past');
        }
    }

    // Validate Priority
    if (priority === '' || priority === null) {
        errors.push('Priority is required');
    } else {
        const priorityNum = Number(priority);
        if (isNaN(priorityNum)) {
            errors.push('Priority must be a number');
        } else if (!Number.isInteger(priorityNum)) {
            errors.push('Priority must be a whole number');
        } else if (priorityNum < 1 || priorityNum > 5) {
            errors.push('Priority must be between 1 and 5');
        }
    }

    // Validate Project ID
    if (!projectId) {
        errors.push('Project ID is required');
    } else if (!Number.isInteger(Number(projectId))) {
        errors.push('Invalid project ID');
    }

    // Validate Description
    if (description) {  // Optional but if provided has constraints
        if (description.trim().length > 500) {
            errors.push('Description must not exceed 500 characters');
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function getFormTodoData (btnType = "Save") {
    const dialogBox = document.querySelector("#form-add-todo")

    const todoItem = {
        id: dialogBox.querySelector('#form-todo-id').textContent
        ,title: dialogBox.querySelector('#form-input-todo-title').value
        ,dueDate: dialogBox.querySelector("#form-input-todo-date").value    
        ,priority: dialogBox.querySelector("#form-input-todo-priority").value 
        ,projectAssigned: dialogBox.querySelector("#form-input-todo-project-id").textContent 
        ,description:  dialogBox.querySelector("#form-input-todo-desc").value
    } 

    const formValidation = validateTodoForm(todoItem.title, todoItem.dueDate, todoItem.priority, todoItem.projectAssigned, todoItem.description)
    if (!formValidation.isValid && btnType === "Save") {
        alert(formValidation.errors)
        return false
    }
  
    dialogBox.close()
    return todoItem

}



