// import {useState, useEffect} from 'react'

import { useEffect, useState } from 'react'
import { useAppSelector } from './redux'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const {token} = useAppSelector(state => state.auth)
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token])
  return [isAuthenticated, setIsAuthenticated]
}