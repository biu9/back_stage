import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'formSlice',
  initialState:{
    value:null,
  },
  reducers: {
    setSearchParam(state,action) {
        state.value = action.payload.value
    }
  },
})

export const { setSearchParam } = searchSlice.actions

export default searchSlice.reducer