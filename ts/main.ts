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

    loadSavedItems();
}

function loadSavedItems(){
    let itemArray = getTodoItems();
    for(let i = 0; i < itemArray.length; i++){
        displayToDoItem(itemArray[i]);
    }
}

function main(){
    resetSpan();
    if (isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveTodo(item);
    }
}

function resetSpan(){
    document.getElementById("dueDateSpan").innerText = "*";
    document.getElementById("titleSpan").innerText = "*";
}

/**
 * Check for data is valid
 */
function isValid():boolean{
    if(getInput("dueDate").value == ""){
        document.getElementById("dueDateSpan").innerText = "Please select date";
    }
    if(getInput("title").value == ""){
        document.getElementById("titleSpan").innerText = "Please type something";
    }

    if(getInput("dueDate").value == "" || getInput("title").value == ""){
        return false;
    }
    
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
    //itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

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

function saveTodo(item:ToDoItem):void{
    let currItems = getTodoItems();
    if(currItems == null){
        currItems = new Array();
    }
    currItems.push(item);

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey,currItemsString);
}

const todokey = "todo";

function getTodoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item = JSON.parse(itemString);
    return item;
}