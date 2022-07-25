import React, { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import classes from './Button.module.scss'
import { typeOptions } from '@testing-library/user-event/dist/types/utility'

type ButtonTypes = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'

interface IButton {
  children: ReactNode
  onClick?: MouseEventHandler
  typeButton?: ButtonTypes
  customClass?: string
  type?: 'button' | 'submit'
}

function Button({children, onClick, typeButton = 'primary', customClass, type = 'button'}: IButton) {
  const cls = [
    classes[typeButton],
    classes.Button,
    customClass
  ]

  return (
    <button
      onClick={onClick}
      type={type}
      className={cls.join(' ')}
    >
      {children}
    </button>
  )
}

export default Button