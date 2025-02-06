import { Injectable, signal } from '@angular/core';
import { todoModel } from '../models/model/TodoModel';
import { TodoKeyLocalStorage } from '../models/enums/TodoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalService {

  public todoStorage = signal<Array<todoModel>>([]);


  public updatetodos({ id, title, description, done }: todoModel){
    if ((title && id && description !== null) || undefined) {
      this.todoStorage.mutate((todos) => {
        if (todos != null) {
          todos.push(new todoModel(id, title, description, done));
        }
      })
    }
    this.setLocalStorage();
  }


  public setLocalStorage(): void{
    const todo = JSON.stringify(this.todoStorage());
    if (todo) {localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todo)};

  }

}
