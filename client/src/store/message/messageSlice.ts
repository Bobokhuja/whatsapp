import { IMessage } from '../../models/IMessage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMessages } from './messageActions'

interface MessageState {
  messages: IMessage[]
}

const initialState: MessageState = {
  messages: []
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMessages.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload
    })
  }
})

export const messageReducer = messageSlice.reducer
