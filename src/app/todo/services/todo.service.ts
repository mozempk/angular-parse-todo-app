import { Injectable } from '@angular/core';
import { TodoApiService, Todo_t } from '../interfaces/todo-api.service';
import Parse from 'parse'
import { BehaviorSubject, Observable } from 'rxjs';

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
export class TodoService implements TodoApiService {
  getTodo(user: any, id: string): Todo {
    throw new Error("Method not implemented.");
  }
  getTodos(user: any, limit?: number): Todo[] {
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


      
      let p = newTodo._Todo.save()
        .then(t => {
          let mt = new Todo()
          mt.id = t.id
          mt.done = t.get('complete')
          mt.text = t.get('title')
          mt._Todo = t
          console.info('Succesfully created new todo:',mt)
          // this.todoList.push(mt)
          this.todoList[this.todoList.length] = mt
          this.todosSubject.next(this.todoList)
        })
        return p
  }
  editTodo(user: any, id: string, keyValue: any): Todo {
    throw new Error("Method not implemented.");
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
