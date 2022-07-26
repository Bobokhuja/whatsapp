import { createAsyncThunk } from '@reduxjs/toolkit'
import { serverApi } from '../../utils/constants/server'



export const fetchContacts = createAsyncThunk(
  'contact/fetchAllContacts',
  async (token: string, thunkAPI) => {
    try {
      const response = await fetch(`${serverApi}/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return await response.json()
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить список контактов')
    }
  }
)

export const addContact = createAsyncThunk(
  'contact/addContact',
  async ({token, contactId}: {token: string, contactId: number}, thunkAPI) => {
    try {
      const response = await fetch(`${serverApi}/contact`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({contactId})
      })
      return await response.json()
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось добавить в контакты')
    }
  }
)

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async ({token, contactId}: {token: string, contactId: number}, thunkAPI) => {
    try {
      const response = await fetch(`${serverApi}/contact/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      return await response.json()
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось удалить контакта')
    }
  }
)