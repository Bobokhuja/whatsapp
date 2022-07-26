import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import profileSlice from './profile/profileSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice
})