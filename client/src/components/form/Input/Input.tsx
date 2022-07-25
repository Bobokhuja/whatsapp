import React, { HTMLInputTypeAttribute } from 'react'
import classes from './Input.module.scss'

interface IInput {
  type: HTMLInputTypeAttribute
  label: string
  error?: string
}

function Input({type, label, error}: IInput) {
  const htmlFor = `input-${type}-${label}`
  return (
    <div className={classes.Input}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        id={htmlFor}
      />
      <small className={classes.error}>{error}</small>
    </div>
  )
}

export default Input