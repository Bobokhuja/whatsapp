import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import profileSlice from './profile/profileSlice'
import { contactReducer } from './contact/contactSlice'
import { messageReducer } from './message/messageSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  contact: contactReducer,
  message: messageReducer
})