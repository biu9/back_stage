import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modalSlice'
import formSlice from './formSlice'
import sideBarSlice from './sideBarSlice'

export default configureStore({
  reducer: {
    modal: modalSlice,
    form: formSlice,
    sideBar: sideBarSlice,
  },
})
