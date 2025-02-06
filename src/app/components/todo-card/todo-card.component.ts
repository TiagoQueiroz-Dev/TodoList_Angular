import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoSignalService } from 'src/app/services/todo-signal.service';
import { TodoKeyLocalStorage } from 'src/app/models/enums/TodoKeyLocalStorage';
import { todoModel } from 'src/app/models/model/TodoModel';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent {
  private todosService = inject(TodoSignalService)
  private Alltodos = this.todosService.todoStorage;


  public getAlltodosInLocalStorage(): void{
   const Tarefas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string
   if (Tarefas) {this.Alltodos.set(JSON.parse(Tarefas))}
  }

  public concluirTarefa(id: number): void{
    this.Alltodos.mutate((Tarefas) => {const tarefaConcluida = Tarefas.find((tarefa) => tarefa.id === id)  as todoModel; tarefaConcluida.done = true;});
  }

  public deletarTarefa(todo: todoModel){
    if (todo) {
      const index = this.Alltodos().indexOf(todo);

      if (index != -1) {
        this.Alltodos.mutate((Tarefas) => {Tarefas.splice(index,1), this.todosService.setLocalStorage()})
      }
    }
  }
}
