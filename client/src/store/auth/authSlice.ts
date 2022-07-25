import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProfile } from '../../models/IProfile'

interface AuthState {
  token: string | null
  userId: number | null
}

const initialState: AuthState = {
  token: null,
  userId: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<{token: string, userId: number}>) {
      // state = action.payload
      const {token, userId} = action.payload
      state.token = token
      state.userId = userId
    }
  }
})

export default authSlice.reducer
export const authActions = authSlice.actions