import { TodoCardComponent } from './../todo-card/todo-card.component';
import { TodoSignalService } from './../../services/todo-signal.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { todoModel } from 'src/app/models/model/TodoModel';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: []

})
export class TodoFormComponent implements OnInit {
  private todoSignalService = inject(TodoSignalService);
  private dialogService = inject(MatDialogRef<HeaderComponent>)
  public allTodos = this.todoSignalService.todoStorage();
  private tarefaEditar!: todoModel;
  private data = inject(MAT_DIALOG_DATA);

  public addTodosForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    description: new FormControl('',[Validators.required, Validators.minLength(5)])
  });

  ngOnInit(): void {
    this.tarefaEditar = this.data;
    if (this.tarefaEditar != null) {
      this.telaEditar(this.tarefaEditar);
    }
  }



  public separaEditarAdicionar(){
    if (this.tarefaEditar != null) {
      this.handleEditTodo()
      console.log('editar')
    }else{
      console.log('adiconar')
      this.handleCreateNewTodo()
    }
  }

  public handleCreateNewTodo(): void{
    //if (this.addTodosForm.valid && this.addTodosForm.value) {

      const title = String(this.addTodosForm.controls['title'].value);
      const description = String(this.addTodosForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const done = false;

      this.todoSignalService.updatetodos({ id, title, description, done });

    //}
    this.dialogService.close();
  }

  public handleEditTodo(){
    this.tarefaEditar.title = String(this.addTodosForm.controls['title'].value);
    this.tarefaEditar.description= String(this.addTodosForm.controls['description'].value);
    this.todoSignalService.edittodos(this.tarefaEditar);
    this.dialogService.close();
  }


  public telaEditar(tarefa: todoModel){
    this.addTodosForm.setValue({title: tarefa.title as string , description: tarefa.description as string})
  }




  public close(): void{
    this.dialogService.close();
  }
}
