import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState:{
    successModal:false,
    errorModal:false,
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
    }
  },
})

export const { openSuccessModal,closeSuccessModal,openErrorModal,closeErrorModal } = modalSlice.actions

export default modalSlice.reducer
