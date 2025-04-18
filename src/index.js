import './styles.css';
import { addItem, retrieveItem, changeProperty, removeItem } from "./functions.js"
import { Note, ToDoItem, Project} from "./classes.js"
import { generateMainbody, generateDialog, collectData, generateContent, generateToDoListForm, generateNotesForm } from './to-do-list.js';

const toDoList = document.querySelector("#to-do-list");
const notes = document.querySelector("#notes");
const mainbody = document.querySelector("#mainbody");
const toDoListKey = "to-do-list";
const notesKey = "notes";
const projectsKey = "projects";

document.addEventListener("DOMContentLoaded", function() {
    toDoList.click();
  });

toDoList.addEventListener("click", () => {
    mainbody.innerHTML = "";
    let [contentContainer, buttonContainer, dialogButton] = generateMainbody();

    let [dialog, form] = generateDialog();
    
    dialogButton.addEventListener("click", () => {
        generateToDoListForm(form);
        document.body.appendChild(dialog);
        dialog.showModal();
    })

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let [title, description, dueDate, priority] = collectData(form, ["title", "description", "dueDate", "priority"])

        const toDoItem = new ToDoItem(title, description, dueDate, priority);

        addItem(toDoListKey, toDoItem);
    
        generateContent(contentContainer, toDoListKey, ["title", "description", "dueDate", "priority"], "No Tasks", generateToDoListForm);
        

        dialog.close();
        dialog.remove();
    })

    generateContent(contentContainer, toDoListKey, ["title", "description", "dueDate", "priority"], "No Tasks", generateToDoListForm);

    mainbody.appendChild(contentContainer);
    mainbody.appendChild(buttonContainer);

})

notes.addEventListener("click", () => {
    mainbody.innerHTML = "";
    let [contentContainer, buttonContainer, dialogButton] = generateMainbody();

    let [dialog, form] = generateDialog();
    
    dialogButton.addEventListener("click", () => {
        generateNotesForm(form);
        document.body.appendChild(dialog);
        dialog.showModal();
    })

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let [title, description] = collectData(form, ["title", "description"])

        const note = new Note(title, description);

        addItem(notesKey, note);
    
        generateContent(contentContainer, notesKey, ["title", "description"], "No Notes", generateNotesForm);
        
        dialog.close();
        dialog.remove();
    })


    mainbody.appendChild(contentContainer);
    mainbody.appendChild(buttonContainer);

    generateContent(contentContainer, notesKey, ["title", "description"], "No Notes", generateNotesForm);
})