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
  constructor(private todoApiService: TodoApiService) {
    this.todoServiceObservableSubscription = this.todoApiService.getObservable().subscribe(todos => {
      this.todos = []
      this.todos = todos
      console.info('[Todos Component] observer',this.todos)
    })
  }

  toggleDone(todo:Todo_t){
    console.info('Setting complete status to: ',!todo.done,'for todo:',todo.id)
  }
  delete(todo:Todo_t){
    this.todoApiService.deleteTodo(todo)
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.todoServiceObservableSubscription.unsubscribe()
    
  }
}
