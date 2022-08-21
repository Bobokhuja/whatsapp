import { createAsyncThunk } from '@reduxjs/toolkit'
import { serverApi } from '../../utils/constants/server'
import { ISendMessage } from '../../models/IMessage'

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

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async ({token, message}: {token: string, message: ISendMessage}, thunkAPI) => {
    try {
      const response = await fetch(`${serverApi}/message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(message)
      })
      return await response.json()
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Не удалось отправить сообщение')
    }
  }
)