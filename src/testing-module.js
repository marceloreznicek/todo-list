export {generateTestingElements}
import { createProject, createToDo} from "./projects-and-todos.js";
import { projects, toDos } from "./manage-Lists.js";


function generateTestingElements() {

        // Create 3 projects
    const project1 = createProject({
        name: "Personal Tasks",
        color: "blue",
        orderValue: 1
    });

    const project2 = createProject({
        name: "Work Project",
        color: "red",
        orderValue: 2
    });

    const project3 = createProject({
        name: "Home Renovation",
        color: "green",
        orderValue: 3
    });


    const todo2 = createToDo({
        title: "Quarterly Report",
        description: "Prepare Q4 financial report",
        dueDate: "2025-01-15",
        priority: 1,
        projectAssigned: 2,  // Assigned to Work Project
        status: "In progress"
    });

    // Create 5 todos
    const todo1 = createToDo({
        title: "Grocery Shopping",
        description: "Buy vegetables, fruits, and milk",
        dueDate: "2025-01-10",
        priority: 2,
        projectAssigned: 1,  // Assigned to Personal Tasks
        status: "Not started"
    });


    const todo3 = createToDo({
        title: "Paint Living Room",
        description: "Buy paint and paint living room walls",
        dueDate: "2025-01-20",
        priority: 3,
        projectAssigned: 3,  // Assigned to Home Renovation
        status: "Not started"
    });

    const todo4 = createToDo({
        title: "Team Meeting",
        description: "Weekly team sync",
        dueDate: "2025-01-09",
        priority: 1,
        projectAssigned: 2,  // Assigned to Work Project
        status: "Not started"
    });

    const todo5 = createToDo({
        title: "Fix Bathroom Sink",
        description: "Call plumber and get sink fixed",
        dueDate: "2025-01-12",
        priority: 2,
        projectAssigned: 3,  // Assigned to Home Renovation
        status: "Not started"
    });

    const todo6 = createToDo({
        title: "Read Book",
        description: "Finish reading 'The Great Gatsby'",
        dueDate: "2025-01-20",
        priority: 3,
        projectAssigned: undefined,  // No project assigned
        status: "Not started"
    });

    const todo7 = createToDo({
        title: "Buy New Laptop",
        description: "Research and purchase new work laptop",
        dueDate: "2025-01-25",
        priority: 2,
        projectAssigned: 999,  // Non-existent project ID
        status: "Not started"
    });

    projects.addProject(project1)
    projects.addProject(project2)
    projects.addProject(project3)

    toDos.addToDo(todo1)
    toDos.addToDo(todo2)
    toDos.addToDo(todo3)
    toDos.addToDo(todo4)
    toDos.addToDo(todo5)
    toDos.addToDo(todo6)
    toDos.addToDo(todo7)
} 