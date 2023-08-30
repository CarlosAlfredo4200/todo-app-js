import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos, renderPending } from "./use-case";

const ElementIds = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  Clearecomplete: ".clear-completed",
  TodoFilters: ".filtro",
  PendingCountLabel: '#pending-count'
};

/**
 *
 * @param {String} elementId
 */

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(ElementIds.PendingCountLabel);
  }

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
  const todoListUL = document.querySelector(ElementIds.TodoList);
  const todoListDelete = document.querySelector(ElementIds.TodoList);
  const clearCompletedBtn = document.querySelector(ElementIds.Clearecomplete);
  const filtersList = document.querySelectorAll(ElementIds.TodoFilters);

  newDescriptionInput.addEventListener("keyup", (e) => {
    if (e.keyCode !== 13) return;
    if (e.target.value.trim().length === 0) return;
    todoStore.addTodo(e.target.value);
    displayTodos();
    e.target.value = "";
  });

  todoListUL.addEventListener("click", (e) => {
    const elementFader = e.target.closest("[data-id]");
    todoStore.toggleTodo(elementFader.getAttribute("data-id"));
    displayTodos();
  });

  todoListDelete.addEventListener("click", (e) => {
    const isDestroyElement = e.target.className === "destroy";
    const elementFader = e.target.closest("[data-id]");
    if (!elementFader || !isDestroyElement) return;

    todoStore.deleteTodo(elementFader.getAttribute("data-id"));
    displayTodos();
  });

  clearCompletedBtn.addEventListener("click", () => {
    todoStore.deleteCompletedTodo();
    displayTodos();
  });

  filtersList.forEach((element) => {
    element.addEventListener("click", (element) => {
      filtersList.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");

      switch (element.target.text) {
        case "Todos":
          todoStore.setFilterTodo(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilterTodo(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilterTodo(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });



};
