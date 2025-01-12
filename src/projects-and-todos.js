// Then export them
export { createProject, createToDo};

let projectCounter = 0
let toDoCounter = 0


// First define the functions
const createProject = ({name, color, orderValue, presetId = undefined}) => {

    let id = -1
    if (presetId === undefined) {
        id = projectCounter;
    } else {
        id = Number(presetId);
    } 

    let properties = {
        id,
        name,
        color,
        orderValue
    };

    projectCounter++;
    
    return {
        getValue: (property) => properties[property],
        setValue: (property, propertyValue) => {
            if (property in properties) {
                properties[property] = propertyValue;
            } else {
                console.log("No such property in project item")
            }
        },
        getProperties: () => Object.keys(properties)
    }
};

const createToDo = ({title, description, dueDate, priority, projectAssigned, status, presetId = undefined}) => {

    toDoCounter++;
    let id = -1
    if (presetId === undefined) {
        id = toDoCounter;
    } else {
        id = Number(presetId);
    } 

    let properties = {
        id,
        title,

        dueDate,
        priority,
        projectAssigned,
        status,
        description,
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
        markAsDone: () => {
            if(properties.status != "Done") {
                properties.status = "Done"
            } else {properties.status = "notDone"}
        },
        getProperties: () => Object.keys(properties)
        
    }
};

