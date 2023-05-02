import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md'
import { BaseText } from './base-text'
import { TodoInterface } from '../interfaces'
import { useStore } from '../stores'
import { useEffect, useRef, useState } from 'react'

interface Props {
  todo: TodoInterface
}

const DISAPEAR_CLASS = 'scale-75 -mb-[calc(48px+12px)] opacity-0 z-0'
const DISAPEAR_DELAY = 120

export const TodoItems = (props: Props) => {
  const store = useStore()

  const todoRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  const [isDone, setIsDone] = useState(props.todo.isDone)
  const [isDisapear, setIsDisapear] = useState(true)

  const toggleDone = () => {
    const transitionCallback = () => {
      setTimeout(() => {
        disapear(() => {
          store.todo.toggleDone(props.todo.id)
        })
      }, DISAPEAR_DELAY)
      labelRef.current?.removeEventListener(
        'transitionend',
        transitionCallback,
        false
      )
    }
    labelRef.current?.addEventListener(
      'transitionend',
      transitionCallback,
      false
    )
    setIsDone(!isDone)
  }

  const disapear = (callback: Function) => {
    const transitionCallback = () => {
      callback()
      todoRef.current?.removeEventListener(
        'transitionend',
        transitionCallback,
        false
      )
    }
    todoRef.current?.addEventListener(
      'transitionend',
      transitionCallback,
      false
    )
    setIsDisapear(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsDisapear(false)
    }, DISAPEAR_DELAY)
  }, [])

  return (
    <div
      ref={todoRef}
      className={`
        relative
        ease-in-out
        duration-300
        ${isDisapear ? DISAPEAR_CLASS : 'z-10'}
    `}
    >
      <div
        className="
    flex
    items-center
    px-3
    h-[48px]
    my-[12px]
    bg-component
    dark:bg-component-dark
    rounded-lg
    gap-3
    shadow-lg
  "
      >
        <button onClick={() => toggleDone()}>
          {!isDone ? (
            <BaseText>
              <MdCheckBoxOutlineBlank></MdCheckBoxOutlineBlank>
            </BaseText>
          ) : (
            <MdCheckBox className="text-primary"></MdCheckBox>
          )}
        </button>
        <div
          className="flex-1 truncate cursor-pointer"
          onClick={() => store.todo.edit(props.todo)}
        >
          <BaseText
            innerref={labelRef}
            className={`
            px-3
            truncate
            inline
            relative
            after:content-['']
            after:absolute
            after:left-0
            after:h-[2px]
            after:top-[calc(50%+2px)]
            after:bg-primary
            after:ease-in-out
            after:duration-300
            after:transition-width
            ${isDone ? 'after:w-full' : 'after:w-0'}
            `}
          >
            {props.todo.title}
          </BaseText>
        </div>
        <button
          className="text-danger"
          onClick={() => disapear(() => store.todo.remove(props.todo.id))}
        >
          <MdDelete></MdDelete>
        </button>
      </div>
    </div>
  )
}
