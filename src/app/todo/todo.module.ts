import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';
import { TodoApiService } from './interfaces/todo-api.service';
import { TodoService } from './services/todo.service';
import { NewtodoComponent } from './components/newtodo/newtodo.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TodosComponent, NewtodoComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: TodoApiService,
      useClass: TodoService
    },
  ]
})
export class TodoModule { }
