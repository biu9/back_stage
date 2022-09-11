import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modalSlice'
import formSlice from './formSlice'

export default configureStore({
  reducer: {
    modal: modalSlice,
    form: formSlice
  },
})
