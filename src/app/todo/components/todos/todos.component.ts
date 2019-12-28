import { Component, OnInit } from '@angular/core';
import { TodoApiService, Todo_t } from '../../interfaces/todo-api.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  private todos:Todo_t[]
  private todoServiceObservableSubscription: Subscription
  private editingTodo = {'editing':false, 'id':'', 'props':{'text':''}}
  private editSaveButtonText = 'Edit'
  constructor(private todoApiService: TodoApiService) {
    this.todoServiceObservableSubscription = this.todoApiService.getObservable().subscribe(todos => {
      this.todos = []
      this.todos = todos
      console.info('[Todos Component] observer',this.todos)
    })
  }

  toggleDone(todo:Todo_t){
    console.info('Setting complete status to: ',!todo.done,'for todo:',todo.id)
    this.todoApiService.editTodo(todo, {'done':!todo.done} )
  }

  delete(todo:Todo_t){
    this.todoApiService.deleteTodo(todo)
  }

  edit(todo:Todo_t){
    if (todo){
      if (!this.editingTodo.editing) {
        this.editingTodo.editing = true
        this.editingTodo.id = todo.id
        this.editSaveButtonText = 'Save'
      } else {
        this.todoApiService.editTodo(todo,this.editingTodo.props)
        this.editingTodo = {'editing':false, 'id':'', 'props':{'text':''}}
        this.editSaveButtonText = 'Edit'
      }
    }
    else {
      this.editingTodo = {'editing':false, 'id':'', 'props':{'text':''}}
      this.editSaveButtonText = 'Edit'
    }
  }

  getFormattedDate(todo: Todo_t){
    const options = { weekday: 'short',  day: 'numeric', month: 'short', year: 'numeric' };
    const d = new Date(todo._Todo.get('updatedAt'))
    return d.toLocaleDateString('en-US',options)
  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.todoServiceObservableSubscription.unsubscribe()
    
  }
}
