import { IMessage, ISendMessage } from '../../models/IMessage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMessages, sendMessage } from './messageActions'

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
    builder.addCase(sendMessage.pending, (state, action) => {
      // state.messages.push(action.meta.arg.message)
      console.log(action.meta.arg.message)
    })
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      console.log(action)
      state.messages.push({
        ...action.payload,
        ...action.meta.arg.message,
        date: Date.now()
      })
    })
  }
})

export const messageReducer = messageSlice.reducer
