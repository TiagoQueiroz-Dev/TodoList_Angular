import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoSignalService } from 'src/app/services/todo-signal.service';
import { TodoKeyLocalStorage } from 'src/app/models/enums/TodoKeyLocalStorage';
import { todoModel } from 'src/app/models/model/TodoModel';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { HeaderComponent } from '../header/header.component';


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
  styleUrls: [],
  providers: [TodoFormComponent]
})
export class TodoCardComponent implements OnInit {
  ngOnInit(): void {
    this.getAlltodosInLocalStorage();
    console.log(this.Alltodos())
  }

  private todosService = inject(TodoSignalService)
  public Alltodos = this.todosService.todoStorage;
  public indexaux!: number;
  public tarefaSelecionada!: todoModel;
  private dialogService = inject(MatDialog);

  public getAlltodosInLocalStorage(): void{
   const Tarefas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string
   if (Tarefas) {this.Alltodos.set(JSON.parse(Tarefas))}
  }

  public concluirTarefa(id: number): void{
    this.Alltodos.mutate((Tarefas) => {const tarefaConcluida = Tarefas.find((tarefa) => tarefa.id === id)  as todoModel; tarefaConcluida.done = true, this.indexaux = 1, this.todosService.edittodos(tarefaConcluida) });
  }
  public retornarTarefa(id: number): void{
    this.Alltodos.mutate((Tarefas) => {const tarefaConcluida = Tarefas.find((tarefa) => tarefa.id === id)  as todoModel; tarefaConcluida.done = false, this.indexaux = 0,  this.todosService.edittodos(tarefaConcluida) });
  }

  public deletarTarefa(todo: todoModel){
    if (todo) {
      const index = this.Alltodos().indexOf(todo);

      if (index != -1) {
        this.Alltodos.mutate((Tarefas) => {Tarefas.splice(index,1), this.todosService.setLocalStorage()})
      }
    }
  }

  public editarTarefa(tarefaId?: number): void{

    this.Alltodos.mutate((Tarefas) => {this.tarefaSelecionada = Tarefas.find((tarefa) => tarefa.id === tarefaId)  as todoModel});
    console.log(this.tarefaSelecionada);

    this.dialogService.open(TodoFormComponent,{
      width: '50vw',
      maxHeight: '80vh',
      data: this.tarefaSelecionada

    })


  }

}
