import { Todo } from "../models/todo";
import { createTodoHtml } from "./create-todo-html";


let element;
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {

    if (!element) {
        element = document.querySelector(elementId);
    }

    if (!element) {
        throw new Error(`Element ${elementId} not found`);
    }

    element.innerHTML = '';// Purgar contenido html

    todos.forEach(todo => {
        element.append(createTodoHtml(todo))
    });
}
