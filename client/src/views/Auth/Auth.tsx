import React, { useState } from 'react'
import classes from './Auth.module.scss'
import LoginForm from './LoginForm/LoginForm'
import RegistrationForm from './RegistrationForm/RegistrationForm'

interface IAuth {

}

function Auth({}: IAuth) {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  
  return (
    <div className={classes.Auth}>
      <div className={classes.Form}>
        {
          isLogin
            ? <LoginForm />
            : <RegistrationForm />
        }
        <button
          className={classes.FormToggle}
          onClick={() => setIsLogin(prev => !prev)}
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
    </div>
  )
}

export default Auth