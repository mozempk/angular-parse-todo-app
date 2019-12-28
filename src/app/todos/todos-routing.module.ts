import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { NewTodoPageComponent } from './pages/new-todo-page/new-todo-page.component';


const routes: Routes = [
  {
    path: 'todos', canActivate: [AuthGuard], children: [
      {
        path: '',
        component: TodosPageComponent
      },
      {
        path: 'new',
        component: NewTodoPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
