const mainbody = document.querySelector("#mainbody");
const toDoList = document.querySelector("#to-do-list");
const toDoListKey = "to-do-items";
const notesKey = "notes";
const projectsKey = "projects"

toDoList.addEventListener("click", () => {
    mainbody.innerHTML = "";
    mainbody.classList = "";

    mainbody.classList.add("mainbody-to-do-list");

    const toDoListDiv = document.createElement("div");
    toDoListDiv.classList.add("to-do-list-div");

    const itemsArray = retrieveItem("to-do-items");

    if (!itemsArray || itemsArray.length < 1) {
        const noTasksMessage = document.createElement("p");
        noTasksMessage.classList.add("no-items");
        noTasksMessage.textContent = "No tasks";
        toDoListDiv.appendChild(noTasksMessage);
    }

    else {
        populateScreen(itemsArray, toDoListDiv);
    }
    mainbody.appendChild(toDoListDiv);

    const toDoListButtonDiv = document.createElement("div");
    toDoListButtonDiv.classList.add("to-do-list-button-div");
    const addButton = document.createElement("button");
    addButton.classList.add("to-do-list-add-button");
    addButton.textContent = "+";
    toDoListButtonDiv.appendChild(addButton);
    mainbody.appendChild(toDoListButtonDiv);

    addButton.addEventListener("click", () => {
        createDialog(toDoListDiv, "add");
    
})
})



function populateScreen(itemsArray, toDoListDiv) {
    toDoListDiv.innerHTML = "";
    
    for (let item of itemsArray) {
        const container = document.createElement("div");
        container.classList.add("to-do-list-container");
        container.dataset.id = item["id"];

        let firstDivision = document.createElement("div");
        firstDivision.classList.add("to-do-list-first-division");
        
        let title = document.createElement("p");
        title.textContent = item["title"];
        
        let description = document.createElement("p");
        description.textContent = item["description"];

        let dueDate = document.createElement("p");
        dueDate.textContent = item["dueDate"];

        let priority = document.createElement("p");
        priority.textContent = item["priority"];

        firstDivision.appendChild(title);
        firstDivision.appendChild(description);
        firstDivision.appendChild(dueDate);
        firstDivision.appendChild(priority);

        let secondDivision = document.createElement("div");
        secondDivision.classList.add("to-do-list-second-division");
        const finished = document.createElement("p");
        finished.textContent = "Finished";
        secondDivision.appendChild(finished);

        finished.addEventListener("click", () => {
            removeItem(toDoListKey, itemsArray, container.dataset.id);
            populateScreen(itemsArray, toDoListDiv);
        })

        let thirdDivision = document.createElement("div");
        thirdDivision.classList.add("to-do-list-third-division");
        const edit = document.createElement("p");
        edit.textContent = "Edit";
        thirdDivision.appendChild(edit);

        edit.addEventListener("click", () => {
            createDialog(toDoListDiv, "edit");

        })


        container.appendChild(firstDivision);
        container.appendChild(secondDivision);
        container.appendChild(thirdDivision);

        toDoListDiv.appendChild(container);
    }
}


function createDialog(toDoListDiv, choice) {
    const dialog = document.createElement("dialog");
        document.body.appendChild(dialog);
        dialog.showModal();

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.classList.add("to-do-list-close-button");
        closeButton.textContent = "X";
        closeButton.addEventListener("click", () => {
            dialog.close();
            dialog.remove();
        })
        dialog.appendChild(closeButton);



        const form = document.createElement("form");
        form.classList.add("to-do-list-form");


        const titleDiv = document.createElement("div");
        const titleLabel = document.createElement("label");
        titleLabel.for = "title";
        titleLabel.textContent = "Title";
        const titleInput = document.createElement("input");
        titleInput.id = "title";
        titleInput.name = "title";
        titleInput.type = "text";
        titleInput.required = true;
        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(titleInput);


        const descriptionDiv = document.createElement("div");
        const descriptionLabel = document.createElement("label");
        descriptionLabel.for = "description";
        descriptionLabel.textContent = "Description";
        const descriptionInput = document.createElement("input");
        descriptionInput.id = "description";
        descriptionInput.name = "description";
        descriptionInput.type = "text";
        descriptionInput.required = true;
        descriptionDiv.appendChild(descriptionLabel);
        descriptionDiv.appendChild(descriptionInput);


        const dateDiv = document.createElement("div");
        const dateLabel = document.createElement("label");
        dateLabel.for = "dueDate";
        dateLabel.textContent = "Due Date";
        const dateInput = document.createElement("input");
        dateInput.id = "dueDate";
        dateInput.name = "dueDate";
        dateInput.type = "datetime-local";
        dateInput.required = true;
        dateDiv.appendChild(dateLabel);
        dateDiv.appendChild(dateInput);


        const priorityDiv = document.createElement("div");

        const lowDiv = document.createElement("div");
        const lowLabel = document.createElement("label");
        lowLabel.for = "low";
        lowLabel.textContent = "Low";
        const lowInput = document.createElement("input");
        lowInput.type = "radio";
        lowInput.id = "low";
        lowInput.name = "priority";
        lowInput.value = "Low";
        lowInput.required = true;
        lowDiv.appendChild(lowLabel);
        lowDiv.appendChild(lowInput);


        const mediumDiv = document.createElement("div");
        const mediumLabel = document.createElement("label");
        mediumLabel.for = "medium";
        mediumLabel.textContent = "Medium";
        const mediumInput = document.createElement("input");
        mediumInput.type = "radio";
        mediumInput.id = "medium";
        mediumInput.name = "priority";
        mediumInput.value = "Medium";
        mediumDiv.appendChild(mediumLabel);
        mediumDiv.appendChild(mediumInput);


        const highDiv = document.createElement("div");
        const highLabel = document.createElement("label");
        highLabel.for = "high";
        highLabel.textContent = "High";
        const highInput = document.createElement("input");
        highInput.type = "radio";
        highInput.id = "high";
        highInput.name = "priority";
        highInput.value = "High";
        highDiv.appendChild(highLabel);
        highDiv.appendChild(highInput);


        priorityDiv.appendChild(lowDiv);
        priorityDiv.appendChild(mediumDiv);
        priorityDiv.appendChild(highDiv);

        const submitButton = document.createElement("button");
        submitButton.classList.add("to-do-list-submit-button");
        submitButton.textContent = "Add";
        

        form.appendChild(titleDiv);
        form.appendChild(descriptionDiv);
        form.appendChild(dateDiv);
        form.appendChild(priorityDiv);
        form.appendChild(submitButton);

        form.addEventListener("submit", function(event, choice) {
            event.preventDefault();

            const formData = new FormData(form);
            const title = formData.get("title");
            const description = formData.get("description");
            const dueDate = formData.get("dueDate");
            const priority = formData.get("priority");
            
            console.log(title, description, dueDate, priority);

            if (choice === "add") {
                const toDoItem = new ToDoItem(title, description, dueDate, priority);
                addItem(toDoListKey, toDoItem);
            }

            else if (choice === "edit") {
                dataset = [];
                const container = document.querySelectorAll(".to-do-list-container");
                container.forEach((element) => dataset.push(element.dataset.id));
                changeProperty(toDoListKey, itemsArray, container, ["title", "description", "dueDate", "priority"], [title, description, dueDate, priority]);
            }
            
            const items = retrieveItem(toDoListKey);
            populateScreen(items, toDoListDiv);
            

            dialog.close();           
            dialog.remove();
        });

        dialog.appendChild(form);
        
}