import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { NewTodoPageComponent } from './pages/new-todo-page/new-todo-page.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './components/todos/todos.component';
import { NewtodoComponent } from './components/newtodo/newtodo.component';
import { ITodoService } from './services/todo.service';
import { TodoService } from './services/impl/todo.impl.service';


@NgModule({
  declarations: [
    TodosPageComponent,
    NewTodoPageComponent,
    TodosComponent,
    TodoComponent,
    NewtodoComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: ITodoService, useClass: TodoService }
  ],
})
export class TodosModule { }
