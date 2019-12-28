import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class Todo_t {
  id: string
  text:string
  done: boolean
  _Todo: any
}

@Injectable({
  providedIn: 'root'
})

export abstract class TodoApiService {
  abstract getObservable():Observable<Todo_t[]>
  abstract getTodo(user: any,id:string):Todo_t
  abstract getTodos(user?: any,limit?:number):Todo_t[]
  abstract newTodo(todo: any, user?: any):Promise<Todo_t>
  abstract editTodo(todo: Todo_t, keyValue: any):Todo_t | void
  abstract deleteTodo(todo:Todo_t):boolean
}
