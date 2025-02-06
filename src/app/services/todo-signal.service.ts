import { Injectable, signal } from '@angular/core';
import { todoModel } from '../models/model/TodoModel';
import { TodoKeyLocalStorage } from '../models/enums/TodoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalService {

  public todoStorage = signal<Array<todoModel>>([]);


  public updatetodos(requestData: todoModel){
    if (requestData != null) {
      this.todoStorage.mutate((todos) => {
        if (todos != null) {
          todos.push(requestData);
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
