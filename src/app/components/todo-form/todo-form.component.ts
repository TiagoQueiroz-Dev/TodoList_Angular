import { TodoSignalService } from './../../services/todo-signal.service';
import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { todoModel } from 'src/app/models/model/TodoModel';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { TodoCardComponent } from '../todo-card/todo-card.component';

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
  styleUrls: [],
  providers: [TodoCardComponent]
})
export class TodoFormComponent {
  private todoSignalService = inject(TodoSignalService);
  private dialogService = inject(MatDialogRef<HeaderComponent>)
  public allTodos = this.todoSignalService.todoStorage();
  private todoCardForm = inject(TodoCardComponent);

  public addTodosForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    description: new FormControl('',[Validators.required, Validators.minLength(5)])
  });

  public handleCreateNewTodo(): void{
    //if (this.addTodosForm.valid && this.addTodosForm.value) {

      const title = String(this.addTodosForm.controls['title'].value);
      const description = String(this.addTodosForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const done = false;

      this.todoSignalService.updatetodos({ id, title, description, done });

    //}
    this.dialogService.close();
    this.todoCardForm.teste(0);//não ta funcionando e o motivo eu ainda não sei

  }

  public close(): void{
    this.dialogService.close();
  }
}
