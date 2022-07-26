import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProfile } from '../../models/IProfile'
import { fetchProfile } from './profileActions'

const initialState: IProfile = {
  id: null,
  name: null,
  username: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<IProfile>) {
      state = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action: PayloadAction<IProfile>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.username = action.payload.username
    })
  },
})

export default profileSlice.reducer

