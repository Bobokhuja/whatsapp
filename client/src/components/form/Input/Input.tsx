import React, { ChangeEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler } from 'react'
import classes from './Input.module.scss'

interface IInput {
  type: HTMLInputTypeAttribute
  label?: string
  error?: string
  name: string
  value: string
  placeholder: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

function Input({type, label, error, name, value, placeholder, onChange, onKeyDown}: IInput) {
  const htmlFor = `input-${type}-${label}`
  return (
    <div className={classes.Input}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <input
        type={type}
        id={htmlFor}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <small className={classes.error}>{error}</small>
    </div>
  )
}

export default Input