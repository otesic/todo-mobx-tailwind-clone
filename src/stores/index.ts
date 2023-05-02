import { createContext, useContext } from 'react'
import { Theme } from './theme'
import { Todo } from './todo'

const ctx = createContext({
  theme: new Theme(),
  todo: new Todo(),
})

export const useStore = () => useContext(ctx)
