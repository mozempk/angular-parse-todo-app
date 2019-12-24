import { Injectable } from '@angular/core';

export class Todo {
  id: string
  text:string
  done: boolean
  _Todo: any
}

@Injectable({
  providedIn: 'root'
})

export abstract class TodoApiService {
  abstract getTodo(user: any,id:string):Todo
  abstract getTodos(user: any,limit?:number):Todo[]
  abstract newTodo(user: any, todo: any):Todo
  abstract editTodo(user: any,id:string, keyValue:any):Todo
  abstract deleteTodo(user: any,id:string):boolean
}
