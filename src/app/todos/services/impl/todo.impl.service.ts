import { Injectable } from '@angular/core';
import { ITodoService } from '../todo.service';
import Parse from 'parse'
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo_t } from '../../models/todo';

class Todo extends Parse.Object implements Todo_t  {
  id: string;
  text: string;
  done: boolean;
  _Todo: any;
  static className = 'Todo'
  static register() {
      super.registerSubclass(Todo.className,Todo)
  }
  constructor(){
      super(Todo.className)
  }
}

@Injectable({
  providedIn: 'root'
})
export class TodoService implements ITodoService {

  getTodo(user: any, id: string): Todo {
    throw new Error("Method not implemented.");
  }

  getTodos(user: any, limit?: number): Todo[] {
    this.todosSubject.next([])
    Todo.register()
    let todoList:Todo[] = []
    const q = new Parse.Query(Todo)
    q.descending('createdAt')
    if (limit) q.limit(limit)
    q.find()
      .then(todos => {
        this.fillTodoArray(todos)
          .then(todos => {
            this.todosSubject.next(todos)
            this.todoList = todos
          })
      })
    return todoList
  }

  newTodo(todo: any, user?: any): Promise<Todo> {
      const currentUser = Parse.User.current()
      const newTodo = new Todo()
      const keys = Object.keys(todo)

      newTodo._Todo = new Todo()
      newTodo._Todo.set('author',currentUser)
      for (let k in keys){
        newTodo._Todo.set(keys[k],todo[keys[k]])
      }
      const acl = new Parse.ACL(currentUser)
      acl.setPublicReadAccess(false)
      acl.setPublicWriteAccess(false)
      acl.setReadAccess(currentUser.id,true)
      acl.setWriteAccess(currentUser.id,true)
      newTodo._Todo.setACL(acl)

      return newTodo._Todo.save()
        .then(t => {
          let mt = new Todo()
          mt.id = t.id
          mt.done = t.get('complete')
          mt.text = t.get('title')
          mt._Todo = t
          console.info('Succesfully created new todo:',mt)
          this.todosSubject.next(null)
          return new Promise((resolve, reject) => {
            let size = this.todoList.length
            this.todoList.unshift(mt)
            console.info('[NewTodo] current todoList: ',this.todoList)
            this.todosSubject.next(this.todoList)
            if (this.todoList.length > size) resolve()
          })
        })
  }

  editTodo(todo: Todo, keyValue:any): void {
    console.info('Editing todo:',todo,'new values',keyValue)
    return this.todoList.forEach(t => {
      if(t.id === todo.id) {
        console.info('found todo with id: ',t.id)
        for(let k of Object.keys(keyValue)) {
          console.info('setting property',k,'to value',keyValue[k],'was:',t[k])
          t[k] = keyValue[k]
          if (k === 'done') {
            t._Todo.set('complete',todo[k])
          }
          if (k === 'text') {
            t._Todo.set('title',todo[k])
          }
        }
        return todo._Todo.save()
        .catch(e => {
          console.error('error updating todo',todo,e)
        })
      }
    })
  }

  deleteTodo(todo: Todo): boolean {
    return todo._Todo.destroy().then(data => {
      this.todoList.splice(this.todoList.indexOf(todo),1)
      this.todosSubject.next(this.todoList)
      console.info('succesfully deleted todo')
      return true
    })
    .catch(e => {
      console.error('couldnt delete todo',e)
    })
  }

  private fillTodoArray(todos: any[]):Promise<Todo[]> {
    const total = todos.length
    let done: number = 0
    let myTodos: Todo[] = []
    return new Promise( (resolve,reject) => {
      todos.forEach( t => {
        done++
        let mt = new Todo()
        mt.id = t.id
        mt.done = t.get('complete')
        mt.text = t.get('title')
        mt._Todo = t
        myTodos.push(mt)
        if (done === total) resolve(myTodos)
      })
    })
  }

  getObservable():Observable<Todo[]>{
    return this.todosObservable
  }

  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject([])
  private todosObservable: Observable<Todo[]> = this.todosSubject.asObservable()
  private todoList:Todo[]

  constructor() {
    this.getTodos({})
    console.info('todoList',this.todoList)
  }
}
