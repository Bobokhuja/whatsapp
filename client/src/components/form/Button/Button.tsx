import React, { MouseEventHandler, ReactNode } from 'react'
import classes from './Button.module.scss'

type ButtonTypes = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'

interface IButton {
  children: ReactNode
  onClick?: MouseEventHandler
  type?: ButtonTypes
  customClass?: string
}

function Button({children, onClick, type = 'primary', customClass}: IButton) {
  const cls = [
    classes.Button,
    classes[type],
    customClass
  ]
  return (
    <button
      onClick={onClick}
      type="button"
      className={cls.join(' ')}
    >
      {children}
    </button>
  )
}

export default Button