import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo_t } from '../models/todo';

@Injectable({
  providedIn: 'root'
})

export abstract class ITodoService {
  abstract getObservable():Observable<Todo_t[]>
  abstract getTodo(user: any,id:string):Todo_t
  abstract getTodos(user?: any,limit?:number):Todo_t[]
  abstract newTodo(todo: any, user?: any):Promise<Todo_t>
  abstract editTodo(todo: Todo_t, keyValue: any):Todo_t | void
  abstract deleteTodo(todo:Todo_t):boolean
  abstract getNotificationMessage():Observable<any>
  abstract setNotificationMessage(message?:any):void
}
