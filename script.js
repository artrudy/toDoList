var taskList = [];
function mainMenu() {
    var _a;
    if (taskList.length === 0) {
        if (localStorage.getItem("toDos") !== null) {
            var taskListFromLocalStorage = JSON.parse(localStorage.getItem("toDos"));
            var restoredTaskList = taskListFromLocalStorage.map(function (it, index) { return "\n ".concat(index + 1, ": ").concat(it); });
            taskList = [].concat(restoredTaskList);
        }
    }
    var userInput = (_a = prompt("to add new task -- please enter 'add',\nto delete previously added task -- please enter \"delete\",\nto edit previously added task -- plese enter \"edit\", \nto clear list of tasks -- please enter \"clear\", \nto view the list of tasks -- please enter 'view'. \nMake your choise.")) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
    switch (userInput) {
        case "add":
            console.log("add");
            addToList(userInput);
            break;
        case "view":
            console.log("view");
            viewList();
            break;
        case "clear":
            console.log("clear");
            clearTaskList();
            break;
        case "delete":
            console.log("delete");
            deleteTask();
            break;
        case "edit":
            console.log("edit");
            editTask();
            break;
        default:
            mainMenu();
    }
}
function addToList(addedInput) {
    var _a;
    var taskToDo = (_a = prompt("Enter the task you want to add:")) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
    //   localStorage.setItem(`${taskList.length + 1}`, `${taskToDo}`);
    taskList.push("\n ".concat(taskList.length + 1, ": ").concat(taskToDo));
    var partsToInsertArr = taskList.map(function (it) { return it.split(":").pop(); });
    localStorage.clear();
    localStorage.setItem("toDos", JSON.stringify(partsToInsertArr));
    console.log(taskList);
    mainMenu();
}
function viewList() {
    alert(taskList);
    mainMenu();
}
function clearTaskList() {
    taskList = [];
    localStorage.clear();
    mainMenu();
}
function deleteTask() {
    var itemToDelete = Number(prompt("What is the number of the task that you want to delete?"));
    if (itemToDelete < 1 ||
        itemToDelete > taskList.length ||
        isNaN(itemToDelete)) {
        deleteTask();
    }
    taskList.splice(itemToDelete - 1, 1);
    var partsToInsertArr = taskList.map(function (it) { return it.split(":").pop(); });
    var newTaskList = partsToInsertArr.map(function (it, index) { return "\n ".concat(index + 1, ": ").concat(it); });
    taskList = [].concat(newTaskList);
    localStorage.clear();
    localStorage.setItem("toDos", JSON.stringify(partsToInsertArr));
    mainMenu();
}
function editTask() {
    var itemToEdit = Number(prompt("What is the number of the task that you want to edit?"));
    if (itemToEdit < 1 || itemToEdit > taskList.length || isNaN(itemToEdit)) {
        editTask();
    }
    var newContentOfItem = prompt("Please enter change the content of the task", "".concat(taskList[itemToEdit - 1].split(":").pop()));
    taskList.splice(itemToEdit - 1, 1, "\n ".concat(itemToEdit, ": ").concat(newContentOfItem));
    var partsToInsertArr = taskList.map(function (it) { return it.split(":").pop(); });
    localStorage.clear();
    localStorage.setItem("toDos", JSON.stringify(partsToInsertArr));
    mainMenu();
}
console.log(taskList);
mainMenu();
