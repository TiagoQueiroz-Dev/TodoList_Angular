import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoSignalService } from 'src/app/services/todo-signal.service';
import { TodoKeyLocalStorage } from 'src/app/models/enums/TodoKeyLocalStorage';
import { todoModel } from 'src/app/models/model/TodoModel';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,

  ],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent {

  private todosService = inject(TodoSignalService)
  public Alltodos = this.todosService.todoStorage;
  public selectedIndex = signal<number>(0);
  public indexaux!: number;

  public getAlltodosInLocalStorage(): void{
   const Tarefas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string
   if (Tarefas) {this.Alltodos.set(JSON.parse(Tarefas))}
  }

  public concluirTarefa(id: number): void{
    this.Alltodos.mutate((Tarefas) => {const tarefaConcluida = Tarefas.find((tarefa) => tarefa.id === id)  as todoModel; tarefaConcluida.done = true, this.teste(1) });
  }

  public deletarTarefa(todo: todoModel){
    if (todo) {
      const index = this.Alltodos().indexOf(todo);

      if (index != -1) {
        this.Alltodos.mutate((Tarefas) => {Tarefas.splice(index,1), this.todosService.setLocalStorage()})
      }
    }
  }

  public teste(teste: number): void{
    this.selectedIndex.mutate((index) => {this.indexaux = index + teste})
    console.log('Valor dentro da funçao',this.indexaux);
  }

}
