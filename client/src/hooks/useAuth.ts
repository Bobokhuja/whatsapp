// import {useState, useEffect} from 'react'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import { checkToken, getLocalToken, setLocalToken } from '../utils/helpers/localToken'
import { authActions } from '../store/auth/authSlice'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const {token, userId} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const {setAuthData} = authActions

  useEffect(() => {
    if (token && userId) {
      setLocalToken(token, userId)
    }
    const authData = getLocalToken()
    if (authData) {
      (async () => {
        const isLogin = await checkToken(authData.token)
        if (isLogin) dispatch(setAuthData(authData))
      })()
    }
  }, [])

  useEffect(() => {
    if (token && userId) {
      setIsAuthenticated(true)
      setLocalToken(token, userId)
    }
  }, [token])
  return [isAuthenticated, setIsAuthenticated]
}