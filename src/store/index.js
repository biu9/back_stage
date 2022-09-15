import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modalSlice'
import formSlice from './formSlice'
import sideBarSlice from './sideBarSlice'
import searchSlice from './searchSlice'
import consultantSlice from './consultantSlice'
import consultationSlice from './consultationSlice'

export default configureStore({
  reducer: {
    modal: modalSlice,
    form: formSlice,
    sideBar: sideBarSlice,
    search:searchSlice,
    consultant:consultantSlice,
    consultation:consultationSlice,
  },
})
