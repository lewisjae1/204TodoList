var picker = datepicker("#dueDate");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
function getInput(id) {
    return document.getElementById(id);
}
window.onload = function () {
    var addItem = document.getElementById("add");
    addItem.onclick = main;
    loadSavedItem();
};
function loadSavedItem() {
    var item = getTodo();
    displayToDoItem(item);
}
function main() {
    resetSpan();
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveTodo(item);
    }
}
function resetSpan() {
    document.getElementById("dueDateSpan").innerText = "*";
    document.getElementById("titleSpan").innerText = "*";
}
function isValid() {
    if (getInput("dueDate").value == "") {
        document.getElementById("dueDateSpan").innerText = "Please select date";
    }
    if (getInput("title").value == "") {
        document.getElementById("titleSpan").innerText = "Please type something";
    }
    if (getInput("dueDate").value == "" || getInput("title").value == "") {
        return false;
    }
    return true;
}
function getToDoItem() {
    var myItem = new ToDoItem();
    var titleInput = getInput("title");
    myItem.title = titleInput.value;
    var dueDateInput = getInput("dueDate");
    myItem.dueDate = new Date(dueDateInput.value);
    var isCompleted = getInput("isCompleted");
    myItem.isCompleted = isCompleted.checked;
    return myItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        var completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else {
        var incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completedItems = document.getElementById("complete-items");
    completedItems.appendChild(itemDiv);
}
function saveTodo(item) {
    var itemString = JSON.stringify(item);
    localStorage.setItem(todokey, itemString);
}
var todokey = "todo";
function getTodo() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
