import React, { HTMLInputTypeAttribute } from 'react'
import classes from './Input.module.scss'

interface IInput {
  type: HTMLInputTypeAttribute
  label: string
  error?: string
  name: string
  value: string
}

function Input({type, label, error, name, value}: IInput) {
  const htmlFor = `input-${type}-${label}`
  return (
    <div className={classes.Input}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        id={htmlFor}
        name={name}
        value={value}
      />
      <small className={classes.error}>{error}</small>
    </div>
  )
}

export default Input