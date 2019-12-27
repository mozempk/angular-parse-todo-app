import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newtodo',
  templateUrl: './newtodo.component.html',
  styleUrls: ['./newtodo.component.css']
})
export class NewtodoComponent implements OnInit {

  private todoText:String
  constructor(private todoService: TodoService) {}

  ngOnInit() {
  }

  onSubmit(){
    if (this.todoText !== "") {
      this.todoService.newTodo({title: this.todoText, complete: false})
        // .then(() => {
        //   console.info('done creating todo, redirecting')
        //   this.router.navigateByUrl('todos')
        //   // this.router.navigate(['todos'])
        // })
    }
  }
}
