import { action, computed, makeObservable, observable } from 'mobx'
import { TodoInterface } from '../interfaces'

const STORAGE_KEY = '@todos'
export class Todo {
  constructor() {
    this.fetchs()
    makeObservable(this)
  }

  protected fetchs() {
    if (localStorage[STORAGE_KEY]) {
      this._todos = JSON.parse(localStorage[STORAGE_KEY])
    }
  }

  protected sync() {
    localStorage[STORAGE_KEY] = JSON.stringify(this._todos)
  }

  @observable
  protected _todos: TodoInterface[] = []

  @observable
  protected _todoEdit?: TodoInterface

  @computed
  get todoEdit() {
    return this._todoEdit
  }

  @action
  edit(todo: TodoInterface) {
    this._todoEdit = todo
  }

  @computed
  get todos() {
    return this._todos
      .filter((todo) => !todo.isDone)
      .sort((a, b) => b.updateAt - a.updateAt)
  }

  @computed
  get completedTodos() {
    return this._todos
      .filter((todo) => todo.isDone)
      .sort((a, b) => b.updateAt - a.updateAt)
  }

  protected generateId(): number {
    let rand = Math.random()

    while (this._todos.find((todo) => todo.id === rand)) {
      rand = Math.random()
    }
    return rand
  }

  protected find(
    id: TodoInterface['id'],
    callback: (todo: TodoInterface, index: number) => void
  ) {
    const index = this._todos.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      callback(this._todos[index], index)
    }
  }

  @action
  add(title: string) {
    this._todos.push({
      title,
      id: this.generateId(),
      isDone: false,
      updateAt: new Date().getTime(),
    })
    this.sync()
  }

  @action
  update(id: TodoInterface['id'], title: string) {
    this.find(id, (todo, i) => {
      this._todos[i] = {
        ...todo,
        title,
      }
      this._todoEdit = undefined
      this.sync()
    })
  }

  @action
  remove(id: TodoInterface['id']) {
    this.find(id, (_, i) => {
      this._todos.splice(i, 1)
      this.sync()
    })
  }

  @action
  toggleDone(id: TodoInterface['id']) {
    this.find(id, (todo, i) => {
      this._todos[i] = {
        ...todo,
        isDone: !todo.isDone,
        updateAt: !todo.isDone ? new Date().getTime() : todo.updateAt,
      }
      this.sync()
    })
  }
}
