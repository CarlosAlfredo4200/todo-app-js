import GeneradorId from "../../helpers/GeneradorId";



export class Todo {


  constructor(description) {
    this.id = GeneradorId();
    this.decription = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
