import { Todo } from "../models/todo";


/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHtml = (todo) => {

    const {done, decription, id} = todo;
    if (!todo) throw new Error('A TODO object is required');
    const html = ` 
    <div class="view">
        <input class="toggle" type="checkbox" ${ done ? 'checked' : ''} >
        <label>${decription}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    if (done) liElement.classList.add('completed');
    return liElement
}
