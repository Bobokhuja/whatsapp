import React, { useState } from 'react'
import classes from './RegistrationForm.module.scss'
import * as Yup from 'yup'
import { serverApi } from '../../../utils/constants/server'
import { Field, Form, Formik } from 'formik'
import Button from '../../../components/form/Button/Button'
import { authActions } from '../../../store/auth/authSlice'
import { useAppDispatch } from '../../../hooks/redux'

interface IRegistrationForm {

}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'To Short!')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(18, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Min Length 6 character')
})

function RegistrationForm({}: IRegistrationForm) {
  const [error, setError] = useState<string | null>(null)
  const {setAuthData} = authActions
  const dispatch = useAppDispatch()

  return (
    <div className={classes.RegistrationForm}>
      <h2>Registration</h2>
      <Formik
        initialValues={{
          name: '',
          username: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async values => {
          const response = await fetch(`${serverApi}/auth/register`, {
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
          } else {
            dispatch(setAuthData(result))
          }
        }}
      >
        {({errors, touched}) => (
          <Form>
            <div className={classes.RegistrationInputs}>
              <div className="Input">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                />
                <small className="error">{errors.name && touched.name ? errors.name : null}</small>
              </div>
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
              customClass={classes.RegistrationButton}
              type="submit"
            >Registration</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegistrationForm