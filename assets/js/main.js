import { Todo } from './Todo.js';
function getLocalStorage() {
    var ls = localStorage.getItem("todos");
    if (ls) {
        return JSON.parse(ls);
    }
    return new Array();
}
function setLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
    implementCountTodo();
}
function countTodoCompleted() {
    var ls = getLocalStorage();
    var size = ls.length;
    var countCompletd = 0;
    for (var _i = 0, ls_1 = ls; _i < ls_1.length; _i++) {
        var todo = ls_1[_i];
        if (todo.completed) {
            countCompletd++;
        }
    }
    return [countCompletd, size - countCompletd];
}
function implementCountTodo() {
    var badgeCompleted = document.getElementById("badge_completed");
    var badgeInProgress = document.getElementById("badge_in_progess");
    var count = countTodoCompleted();
    badgeCompleted.innerText = "" + count[0];
    badgeInProgress.innerText = "" + count[1];
}
function createTodoHtml(todo) {
    var str = "";
    if (todo.completed) {
        str = " completed";
    }
    var li = document.createElement("li");
    li.className = "list-group-item my-1 " + str + " ";
    li.title = "Tâche à terminer";
    li.id = "todo_" + todo.id;
    li.innerHTML = todo.title + "  <span class=\"delete\"><img src=\"./assets/img/delete2.png\" alt=\"delete\" title=\"Supprimer\"></span>";
    return li;
}
function setTodosInHtml() {
    var todos = getLocalStorage();
    var ul = document.getElementById("todos");
    for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
        var todo = todos_1[_i];
        ul.appendChild(createTodoHtml(todo));
    }
}
function newTodo() {
    var btnNewTodo = document.getElementById("btn_new_todo");
    btnNewTodo.addEventListener("click", function (e) {
        var _a;
        e.preventDefault();
        var text = document.getElementById("todo");
        if (text.value.length > 0) {
            var tableau = getLocalStorage();
            var id = tableau.length;
            var todo = new Todo(id, text.value, false);
            text.value = "";
            var liElement = createTodoHtml(todo);
            (_a = document.getElementById("todos")) === null || _a === void 0 ? void 0 : _a.appendChild(liElement);
            tableau.push(todo);
            setLocalStorage(tableau);
            addListenerOneLi(liElement);
            // existe déla dans setLocalStorage()
            // implementCountTodo();
        }
    });
}
function startAllLiAddEventListener() {
    var lis = document.querySelectorAll("li.list-group-item ");
    lis.forEach(function (el) {
        addListenerOneLi(el);
        addListenerButton(el);
    });
}
function addListenerButton(el) {
    var id = el.id.split("todo_")[1];
    var span = el.querySelector("span.delete");
    span.addEventListener("click", function () {
        console.log("delete" + id);
    });
}
function addListenerOneLi(el) {
    var lis = document.querySelectorAll("li.list-group-item ");
    lis.forEach(function (el) {
        el.addEventListener("click", function () {
            el.classList.toggle("completed");
            var id = el.id.split("todo_")[1];
            var todos = getLocalStorage()
                .map(function (todo) {
                if (todo.id == parseInt(id)) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
            setLocalStorage(todos);
        });
    });
}
newTodo();
setTodosInHtml();
implementCountTodo();
startAllLiAddEventListener();
//# sourceMappingURL=main.js.map