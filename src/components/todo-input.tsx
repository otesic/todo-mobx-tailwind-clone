import { observer } from 'mobx-react'
import { useStore } from '../stores'
import { useEffect, useRef, useState } from 'react'

export const TodoInput = observer(() => {
  const store = useStore()
  const [title, setTitle] = useState(store.todo.todoEdit?.title)

  const inputRef = useRef<HTMLInputElement>(null)

  const submit = () => {
    if (title) {
      if (store.todo.todoEdit) {
        store.todo.update(store.todo.todoEdit.id, title)
      } else {
        store.todo.add(title)
      }
      setTitle('')
    }
  }

  useEffect(() => {
    if (store.todo.todoEdit) {
      setTitle(store.todo.todoEdit?.title)
      inputRef.current?.focus()
    }
  }, [store.todo.todoEdit])
  return (
    <div
      className="
        p-3 
        bg-component 
        dark:bg-component-dark 
        text-dark
        dark:text-light
        flex 
        items-center
        shadow-lg
        rounded-lg
        mt-7 

        "
    >
      <input
        value={title}
        onInput={(e) => setTitle(e.currentTarget.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? submit() : '')}
        type="text"
        placeholder="할일을 추가하세요"
        className="bg-transparent outline-0 flex-1 px-3"
      />
      <button
        onClick={() => submit()}
        className="bg-primary px-3 py-1.5 text-sm text-light rounded-lg"
      >
        {store.todo.todoEdit ? 'update' : 'add'}
      </button>
    </div>
  )
})
