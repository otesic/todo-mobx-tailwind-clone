import { observer } from 'mobx-react'
import { useEffect } from 'react'

import Logo from '../logo.svg'
import { useStore } from '../stores'
import { ThemeToggle } from './theme-toggle'
import { BaseText } from './base-text'
import { TodoList } from './todo-list'
import { TodoInput } from './todo-input'

export const AppContainer = observer(() => {
  const store = useStore()

  useEffect(() => {
    document.body.setAttribute('data-mode', store.theme.themeMode)
  }, [store.theme.themeMode])

  return (
    <div className="max-w-screen-md mx-auto p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="logo"></img>
          <div className="text-xl text-primary">Todo</div>
        </div>
        <ThemeToggle></ThemeToggle>
      </div>
      <TodoInput></TodoInput>
      <TodoList></TodoList>
    </div>
  )
})
