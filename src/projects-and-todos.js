// Then export them
export { createProject, createToDo};

// First define the functions
const createProject = ({name, color, orderValue}) => {
    let properties = {
        name,
        color,
        orderValue
    };
    
    return {
        getValue: (property) => properties[property],
        setValue: (property, propertyValue) => {
            if (property in properties) {
                properties[property] = propertyValue;
            } else {
                console.log("No such property in project item")
            }
        },
    }
};

const createToDo = ({title, description, dueDate, priority, projectAssigned, status}) => {
    let properties = {
        title,
        description,
        dueDate,
        priority,
        projectAssigned,
        status
    };
    
    return {
        getValue: (property) => properties[property],
        setValue: (property, propertyValue) => {
            if (property in properties) {
                properties[property] = propertyValue;
            } else {
                console.log("No such property in ToDo item")
            }
        },
        markAsDone: () => properties.status = "Done"
    }
};

