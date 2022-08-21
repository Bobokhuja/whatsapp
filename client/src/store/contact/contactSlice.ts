import { IContact } from '../../models/IContact'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addContact, deleteContact, fetchContacts } from './contactActions'

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
    // addContact(state, action: PayloadAction<IContact>) {
    //   state.contacts.push(action.payload)
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload
    })

    builder.addCase(addContact.fulfilled, (state, action: PayloadAction<IContact>) => {
      state.contacts.push(action.payload)
    })

    builder.addCase(deleteContact.fulfilled, (state, action: PayloadAction<{deleted: boolean, contactId: number}>) => {
      state.contacts = state.contacts.filter(contact => contact.id === action.payload.contactId)
    })
  },
})

export const contactReducer = contactSlice.reducer