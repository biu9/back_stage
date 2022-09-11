import { createSlice } from '@reduxjs/toolkit'

const sideBarSlice = createSlice({
  name: 'formSlice',
  initialState:{
    ifShowUser:false,
    ifShowConsultant:false,
  },
  reducers: {
    showUser(state,action){
        state.ifShowUser = true
        state.ifShowConsultant = false
    },
    showConsultant(state,action){
        state.ifShowUser = false
        state.ifShowConsultant = true
    }
  },
})

export const { showUser,showConsultant } = sideBarSlice.actions

export default sideBarSlice.reducer