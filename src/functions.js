function addItem(key, item) {
    let itemsArray = retrieveItem(key)
    if (!itemsArray) {
        createStore(key)
        itemsArray = retrieveItem(key);
        setItem(itemsArray, item);
        updateStore(key, itemsArray);
    }

    else {
        setItem(itemsArray, item);
        updateStore(key, itemsArray);

    }
}

function displayItems(key, keysList) {
    let itemsArray = retrieveItem(key);
    if (!itemsArray) {
        console.log("No items");
        return;
    }
    for (let item of itemsArray) {
        for (let keyItem of keysList) {
            return (item[keyItem]);
        }
    }
}

function changeProperty(key, itemsArray, dataset, properties, values) {
    const i = 0;

    for (let item of itemsArray) {
        for (id of dataset) {
            if (item["id"] === id) {
                for (property of properties){
                    item[property] = values[i];
                    i++;
                }
                updateStore(key, itemsArray);
                return;
        }
        
        }
    }
}

function removeItem(key, itemsArray, id) {
    for (let item of itemsArray) {
        if (item["id"] === id) {
            let index = itemsArray.indexOf(item);
            if (index !== -1) {
                itemsArray.splice(index, 1);
                updateStore(key, itemsArray)
                return;
            }
        }
    }
}



function setItem(itemsArray, item) {
    itemsArray.push(item);
}

function retrieveItem(key) {
    const itemsArray = localStorage.getItem(key);
    if (!itemsArray) {
        return;
    }
    else {
        return JSON.parse(itemsArray);
    }
}

function updateStore(key, itemsArray) {
    localStorage.setItem(key, JSON.stringify(itemsArray))
}

function createStore(key) {
    localStorage.setItem(key, JSON.stringify([]));
}


export { addItem, retrieveItem, changeProperty, removeItem, updateStore }