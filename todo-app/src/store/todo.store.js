import { Todo } from "../todo/models/todo";

// Filters en mayusculas para indicar que sera una numeracion
export const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del tiempo"),
    new Todo("Piedra del poder"),
    new Todo("Piedra del campo"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log("InitStore ");
};

//--------- Metodos ----------------

const loadStore = () => {
  if( !localStorage.getItem('state')) return;
  const { todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
  state.todos = todos;
  state.filter = filter;
};

const saveStateLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state))
  
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];

    case Filters.Completed:
      return state.todos.filter((todo) => todo.done); //igual a : todo =>  todo.done === true

    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done); //igual a : todo =>  todo.done === false

    default:
      throw new Error(`Option ${filter} is not valid.`);
  }
};

/**
 *
 * @param {String} description
 */
const addTodo = (description) => {
  if (!description) throw new Error("Description is required");
  state.todos.push(new Todo(description));
  saveStateLocalStorage();
};

/**
 * Cambiar estado
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateLocalStorage();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  saveStateLocalStorage();
};

const deleteCompletedTodo = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveStateLocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */
const setFilterTodo = (newFilter = Filters.All) => {
  state.filter = newFilter;
  saveStateLocalStorage();
};

// obtener filtro actual
const getCurrentFilter = () => {
  return state.filter;
};

export default {
  initStore,
  getTodos,
  loadStore,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompletedTodo,
  setFilterTodo,
  getCurrentFilter,
};
