// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#dueDate");
picker.setMin(new Date()); // Set today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}

/*
let item = new ToDoItem();
item.title = "Testing";
item.dueDate = new Date(2020, 6, 1);
item.isCompleted = false;
*/

function getInput(id):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

window.onload = function(){
    let addItem = document.getElementById("add");
    addItem.onclick = main;
}

function main(){
    if (isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

/**
 * Check for data is valid
 */
function isValid():boolean{
    return true;
}

/** 
 * Get all input off form and wrap in
 * a ToDoItem object
*/
function getToDoItem(): ToDoItem{
    let myItem = new ToDoItem();

    let titleInput = getInput("title");
    myItem.title = titleInput.value;

    let dueDateInput = getInput("dueDate");
    myItem.dueDate = new Date(dueDateInput.value);

    let isCompleted = getInput("isCompleted")
    myItem.isCompleted = isCompleted.checked;

    return myItem;
}

/**
 * Display given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title

    let itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toDateString();

    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo")
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted){
        let completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}

function markAsComplete(){
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("complete-items");
    completedItems.appendChild(itemDiv);
}

// Task: Allow use to mark a ToDoItem as completed
// Task: Store ToDoItems in web storage