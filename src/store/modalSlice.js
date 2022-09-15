import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState:{
    successModal:false,
    errorModal:false,
    addConsultant:false,
    modifyConsultantInfo:false,
    userInfoModal:false,
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
    },
    openModifyConsultantInfo(state,action) {
      state.modifyConsultantInfo = true;
    },
    closeModifyConsultantInfo(state,action) {
      state.modifyConsultantInfo = false;
    },
    openUserInfoModal(state,action) {
      state.userInfoModal = true;
    },
    closeUserInfoModal(state,action) {
      state.userInfoModal = false;
    }
  },
})

export const { 
  openSuccessModal,closeSuccessModal,
  openErrorModal,closeErrorModal,
  openAddConsultant,closeAddConsultant,
  openModifyConsultantInfo,closeModifyConsultantInfo,
  openUserInfoModal,closeUserInfoModal
} = modalSlice.actions

export default modalSlice.reducer
