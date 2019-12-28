import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ITodoService } from '../../services/todo.service';

@Component({
  selector: 'app-newtodo',
  templateUrl: './newtodo.component.html',
  styleUrls: ['./newtodo.component.css']
})
export class NewtodoComponent implements OnInit {

  private todoText:String
  constructor(private todoService: ITodoService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit(){
    if (this.todoText !== "") {
      this.todoService.newTodo({title: this.todoText, complete: false})
        .then(() => {
          console.info('done creating todo, redirecting')
          //this.router.navigateByUrl('todos')
          this.router.navigate(['todos'])
        })
    }
  }
}
