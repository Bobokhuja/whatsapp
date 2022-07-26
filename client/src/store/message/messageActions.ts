import { createAsyncThunk } from '@reduxjs/toolkit'
import { serverApi } from '../../utils/constants/server'

export const fetchMessages = createAsyncThunk(
  'message/fetchMessages',
  async ({token, receiverId}: {token: string, receiverId: number}, thunkAPI) => {
    try {
      const response = await fetch(`${serverApi}/message/${receiverId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return await response.json()
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить список сообщений')
    }
  }
)