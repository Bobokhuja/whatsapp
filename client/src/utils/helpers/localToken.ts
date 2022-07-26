import { serverApi } from '../constants/server'

export const setLocalToken = (token: string, userId: number): void => {
  localStorage.setItem('authData', JSON.stringify({token, userId}))
}

export const getLocalToken = (): {userId: number, token: string} | null => {
  const token = localStorage.getItem('authData')
  if (token) return JSON.parse(token)
  return null
}

export const checkToken = async (token: string): Promise<boolean> => {
  const response = await fetch(`${serverApi}/auth`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.status === 200;
}