import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'formSlice',
  initialState:{
    data:{}
  },
  reducers: {
    updateData(state,action){
        state.data = action.payload
    }
  },
})

export const { updateData } = formSlice.actions

export default formSlice.reducer