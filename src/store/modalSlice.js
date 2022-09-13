import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState:{
    successModal:false,
    errorModal:false,
    addConsultant:false
  },
  reducers: {
    openSuccessModal(state,action){
        state.successModal = true
    },
    closeSuccessModal(state,action){
        state.successModal = false
    },
    openErrorModal(state,action){
        state.errorModal = true
    },
    closeErrorModal(state,action){
        state.errorModal = false
    },
    openAddConsultant(state,action) {
        state.addConsultant =  true;
    },
    closeAddConsultant(state,action) {
      state.addConsultant = false;
    }
  },
})

export const { 
  openSuccessModal,closeSuccessModal,
  openErrorModal,closeErrorModal,
  openAddConsultant,closeAddConsultant
} = modalSlice.actions

export default modalSlice.reducer
