import React from 'react'
import classes from './LoginForm.module.scss'
import Input from '../../../components/form/Input/Input'
import Button from '../../../components/form/Button/Button'

interface ILoginForm {

}

function LoginForm({}: ILoginForm) {
  return (
    <div className={classes.LoginForm}>
      <h2>Login</h2>
      <div className={classes.LoginInputs}>
        <Input
          type="text"
          label="Username"
        />
        <Input
          type="password"
          label="Password"
          error=""
        />
      </div>
      <Button
        customClass={classes.LoginButton}
      >Login</Button>
    </div>
  )
}

export default LoginForm