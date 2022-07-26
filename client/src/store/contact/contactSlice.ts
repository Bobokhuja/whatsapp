import { IContact } from '../../models/IContact'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteContact, fetchContacts } from './contactActions'

interface ContactState {
  contacts: IContact[]
}

const initialState: ContactState = {
  contacts: []
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload
    })

    builder.addCase(deleteContact.fulfilled, (state, action: PayloadAction<{deleted: boolean, contactId: number}>) => {
      state.contacts = state.contacts.filter(contact => contact.id === action.payload.contactId)
    })
  },
})

export const contactReducer = contactSlice.reducer