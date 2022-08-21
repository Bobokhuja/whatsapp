import React, { useState } from 'react'
import classes from './LoginForm.module.scss'
import Input from '../../../components/form/Input/Input'
import Button from '../../../components/form/Button/Button'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { serverApi } from '../../../utils/constants/server'
import { authActions } from '../../../store/auth/authSlice'
import { useAppDispatch } from '../../../hooks/redux'

interface ILoginForm {

}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Min Length 6 character')
})

function LoginForm({}: ILoginForm) {
  const [error, setError] = useState<string | null>(null)
  const {setAuthData} = authActions
  const dispatch = useAppDispatch()
  return (
    <div className={classes.LoginForm}>
      <h2>Login</h2>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async values => {
          const response = await fetch(`${serverApi}/auth/login`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          const result = await response.json()
          setError(null)
          if (response.status !== 201) {
            setError(result.message)
            values.password = ''
          } else {
            dispatch(setAuthData(result))
          }
        }}
      >
        {({errors, touched}) => (
          <Form>
            <div className={classes.LoginInputs}>
              <div className="Input">
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                />
                <small className="error">{errors.username && touched.username ? errors.username : null}</small>
              </div>

              <div className="Input">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                />
                <small className="error">{errors.password && touched.password ? errors.password : null}</small>
              </div>
            </div>
            {error && <small style={{textAlign: 'center'}} className="error">{error}</small>}
            <Button
              customClass={classes.LoginButton}
              type="submit"
            >Login</Button>
          </Form>
        )}
      </Formik>

    </div>
  )
}

export default LoginForm