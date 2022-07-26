import { createAsyncThunk } from '@reduxjs/toolkit'
import { serverApi } from '../../utils/constants/server'
import { profileSlice } from './profileSlice'

export const fetchProfile = createAsyncThunk(
  'profile/fetchUser',
  async (userId: number, thunkAPI) => {
    try {
      const response = await fetch(`${serverApi}/user/?id=${userId}`)
      const user = await response.json()
      return {
        id: user.id,
        name: user.name,
        username: user.username
      }
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователей')
    }
  }
)