import React from 'react'
import classes from './RegistrationForm.module.scss'

interface IRegistrationForm {

}

function RegistrationForm({}: IRegistrationForm) {
  return (
    <div className={classes.RegistrationForm}>
      <h2>Registration</h2>
    </div>
  )
}

export default RegistrationForm