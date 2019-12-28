import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TodoApiService } from '../../interfaces/todo-api.service';

@Component({
  selector: 'app-newtodo',
  templateUrl: './newtodo.component.html',
  styleUrls: ['./newtodo.component.css']
})
export class NewtodoComponent implements OnInit {

  private todoText:String
  constructor(private todoApiService: TodoApiService,private router: Router) {}

  ngOnInit() {
  }

  onSubmit(){
    if (this.todoText !== "") {
      this.todoApiService.newTodo({title: this.todoText, complete: false})
        .then(() => {
          console.info('done creating todo, redirecting')
          //this.router.navigateByUrl('todos')
          this.router.navigate(['todos'])
        })
    }
  }
}
