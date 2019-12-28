import { Component, OnInit, Input } from '@angular/core';
import { Todo_t } from '../../models/todo';
import { ITodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo_t;

  editingTodo = { editing: false, id: '', props: { text: '' } };
  editSaveButtonText = 'Edit';

  constructor(private todoService: ITodoService) { }

  ngOnInit() {
  }

  getFormattedDate() {
    const options = { weekday: 'short',  day: 'numeric', month: 'short', year: 'numeric' };
    const d = new Date(this.todo._Todo.get('updatedAt'))
    return d.toLocaleDateString('en-US',options)
  }

  toggleDone() {
    console.info('Setting complete status to: ', !this.todo.done, 'for todo:', this.todo.id);
    this.todoService.editTodo(this.todo, {'done':!this.todo.done} )
  }

  edit() {
    if (!this.editingTodo.editing) {
      this.editingTodo.editing = true
      this.editingTodo.id = this.todo.id
      this.editSaveButtonText = 'Save'
    } else {
      this.todoService.editTodo(this.todo, this.editingTodo.props)
      this.editingTodo = {'editing':false, 'id':'', 'props':{'text':''}}
      this.editSaveButtonText = 'Edit'
    }
  }

  delete(){
    this.todoService.deleteTodo(this.todo)
  }

  cancel() {
    this.editingTodo = {'editing':false, 'id':'', 'props':{'text':''}}
    this.editSaveButtonText = 'Edit'
  }

}
