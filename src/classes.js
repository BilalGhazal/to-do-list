class ToDoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
    }
}

class Project {
    constructor(title, description) {
        this.itemsList = [];
        this.title = title;
        this.description = description;
        this.id = crypto.randomUUID();
    }

    addItem(title, description, dueDate, priority) {
        this.itemsList.push(new ToDoItem(title, description, dueDate, priority));
    }
}


class Note {
    constructor(title, description) {
        this.title = title;
        this.description = description
        this.date = new Date().getTime();
        this.id = crypto.randomUUID();
    }
}


window.Note = Note;
window.ToDoItem = ToDoItem;
window.Project = Project;

export { Note, ToDoItem, Project}