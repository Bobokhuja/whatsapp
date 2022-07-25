import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  profile: IProfile | null
}

const initialState: AuthState = {
  token: null,
  profile: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  }
})