import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';



@NgModule({
  declarations: [TodosComponent],
  imports: [
    CommonModule
  ]
})
export class TodoModule { }
