import { createSlice } from '@reduxjs/toolkit'
import { IProfile } from '../../models/IProfile'

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
    increment(state, action) {

    }
  }
})

export default authSlice.reducer