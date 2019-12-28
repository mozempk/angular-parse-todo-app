import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo_t } from '../../models/todo';
import { ITodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo_t[]

  private todoServiceObservableSubscription: Subscription
  private editingTodo = {'editing':false, 'id':'', 'props':{'text':''}}
  private editSaveButtonText = 'Edit'

  constructor(private todoService: ITodoService) {
    this.todoServiceObservableSubscription = this.todoService.getObservable().subscribe(todos => {
      this.todos = []
      this.todos = todos
      console.info('[Todos Component] observer',this.todos)
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.todoServiceObservableSubscription.unsubscribe()
  }

}
