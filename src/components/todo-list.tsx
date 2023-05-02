import { observer } from 'mobx-react'
import { TodoItems } from './todo-items'
import { useStore } from '../stores'
import { BaseText } from './base-text'

export const TodoList = observer(() => {
  const store = useStore()

  return (
    <div className="mt-6">
      {store.todo.todos.map((todo) => (
        <TodoItems key={todo.id} todo={todo}></TodoItems>
      ))}
      <BaseText className="p-3">
        Completed ({store.todo.completedTodos.length})
      </BaseText>
      {store.todo.completedTodos.map((todo) => (
        <TodoItems key={todo.id} todo={todo}></TodoItems>
      ))}
    </div>
  )
})
