import { removeItem, retrieveItem, updateStore } from "./functions";

function generateMainbody() {
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    const dialogButton = document.createElement("button");
    dialogButton.classList.add("dialog-button");
    dialogButton.type = "button";
    dialogButton.textContent = "+";

    buttonContainer.appendChild(dialogButton);

    return([contentContainer, buttonContainer, dialogButton]);
}


function generateDialog() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("dialog");

    const closeButtonDiv = document.createElement("div");
    closeButtonDiv.classList.add("close-button-div");
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
        dialog.close();
        dialog.remove();
    })
    closeButtonDiv.appendChild(closeButton);

    const form = document.createElement("form");
    form.id = "form";

    const submitButtonDiv = document.createElement("div");
    submitButtonDiv.classList.add("submit-button-div");
    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.textContent = "Add";
    submitButton.setAttribute("form", "form")

    submitButtonDiv.appendChild(submitButton);

    dialog.appendChild(closeButtonDiv);
    dialog.appendChild(form);
    dialog.appendChild(submitButtonDiv);

    return([dialog, form]);
}



function generateLabel(forVar, text) {
    const label = document.createElement("label");
    label.setAttribute("for", forVar);
    label.textContent = text;
    
    return(label);
}

function generateInput(inputType, idVar, nameVar) {
    const input = document.createElement("input");
    input.type = inputType;
    input.id = idVar;
    input.name = nameVar;
    input.required = true;

    return(input)

}

function generateDiv(childrenArray) {
    const div = document.createElement("div");
    for (const child of childrenArray) {
        div.appendChild(child);
    }

    return(div);
}

function collectData(form, dataArray) {
    const formData = new FormData(form);
    let valuesArray = []

    for (const datum of dataArray) {
        valuesArray.push(formData.get(datum))
    }

    return(valuesArray);
}

function generateContent(contentContainer, key, keysArray, message, func) {
    contentContainer.innerHTML = "";
    contentContainer.classList = "";
    contentContainer.classList.add("content-container");

    const itemsArray = retrieveItem(key);
    console.log(itemsArray);
    if (itemsArray === undefined || itemsArray < 1) {
        const noItemsMessage = document.createElement("p");
        noItemsMessage.textContent = message;
        noItemsMessage.classList.add("no-items-message");
        contentContainer.appendChild(noItemsMessage);
        contentContainer.classList.add("no-items");
        return;
    }

    for (const item of itemsArray) {
        const contentSubcontainer = document.createElement("div");
        contentSubcontainer.classList.add("content-subcontainer");
        contentSubcontainer.dataset.id = item["id"];

        const dataContainer = document.createElement("div");
        dataContainer.classList.add("data-container");

        for (let i = 0; i < keysArray.length; i++) {
            const datum = document.createElement("p");
            datum.textContent = item[keysArray[i]];
            dataContainer.append(datum);
        }

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");

        const removeButtonContainer = document.createElement("div");
        removeButtonContainer.classList.add("remove-button-container");
        const removeButton = document.createElement("p");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButtonContainer.appendChild(removeButton);
        removeButtonContainer.addEventListener("click", () => {
            const id = contentSubcontainer.dataset.id;
            removeItem(key, itemsArray, id);
            generateContent(contentContainer, key, keysArray, message);

        })


        const editButtonContainer = document.createElement("div");
        editButtonContainer.classList.add("edit-button-container");
        const editButton = document.createElement("p");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button")
        editButtonContainer.appendChild(editButton);
        editButtonContainer.addEventListener("click", () => {
            let [dialog, form] = generateDialog();
            func(form);
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                let varsArray = collectData(form, keysArray);
                const id = contentSubcontainer.dataset.id;

                replaceItem(varsArray, key, itemsArray, id);

                generateContent(contentContainer, key, keysArray, message);

                dialog.close();
                dialog.remove();
            })

            document.body.appendChild(dialog);
            dialog.showModal();


        })

        buttonsContainer.appendChild(removeButtonContainer);
        buttonsContainer.appendChild(editButtonContainer);

        contentSubcontainer.appendChild(dataContainer);
        contentSubcontainer.appendChild(buttonsContainer);
        contentContainer.appendChild(contentSubcontainer);
    }
}


function generateToDoListForm(form) {
    form.innerHTML = "";

        const titleLabel = generateLabel("title", "Title");
        const titleInput = generateInput("text", "title", "title");
        const titleDiv = generateDiv([titleLabel, titleInput])

        const descriptionLabel = generateLabel("label", "Description");
        const descriptionInput = generateInput("text", "description", "description");
        const descriptionDiv = generateDiv([descriptionLabel, descriptionInput]);

        const dueDateLabel = generateLabel("dueDate", "Due Date");
        const dueDateInut = generateInput("datetime-local", "dueDate", "dueDate");
        const dueDateDiv = generateDiv([dueDateLabel, dueDateInut]);

        const lowLabel = generateLabel("low", "Low");
        const lowInput = generateInput("radio", "low", "priority");
        lowInput.value = "Low";
        const lowDiv = generateDiv([lowLabel, lowInput]);

        const mediumLabel = generateLabel("medium", "Medium");
        const mediumInput = generateInput("radio", "medium", "priority");
        mediumInput.value = "Medium";
        const mediumDiv = generateDiv([mediumLabel, mediumInput]);

        const highLabel = generateLabel("high", "High");
        const highInput = generateInput("radio", "high", "priority");
        highInput.value = "High";
        const highDiv = generateDiv([highLabel, highInput])
        
        const priorityDiv = generateDiv([lowDiv, mediumDiv, highDiv])
        priorityDiv.classList.add("priority-div");

        form.appendChild(titleDiv);
        form.appendChild(descriptionDiv);
        form.appendChild(dueDateDiv);
        form.appendChild(priorityDiv);
}

function replaceItem(valuesArray, key, itemsArray, id) {
    for (let item of itemsArray) {
        if (id === item["id"]) {
            item["title"] = valuesArray[0];
            item["description"] = valuesArray[1];
            item["dueDate"] = valuesArray[2];
            item["priority"] = valuesArray[3];
            break;
        }
    }
    updateStore(key, itemsArray);

}

function generateNotesForm(form) {
    form.innerHTML = "";

        const titleLabel = generateLabel("title", "Title");
        const titleInput = generateInput("text", "title", "title");
        const titleDiv = generateDiv([titleLabel, titleInput])

        const descriptionLabel = generateLabel("label", "Description");
        const descriptionInput = generateInput("text", "description", "description");
        const descriptionDiv = generateDiv([descriptionLabel, descriptionInput]);

        form.appendChild(titleDiv);
        form.appendChild(descriptionDiv);
}

export { generateMainbody, generateDialog, generateLabel, generateInput, generateDiv, collectData, generateContent, generateToDoListForm, generateNotesForm };