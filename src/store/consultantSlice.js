import { createSlice } from '@reduxjs/toolkit'

const consultantSlice = createSlice({
  name: 'formSlice',
  initialState:{
    userInfo:{}
  },
  reducers: {
    setInitUserInfo(state,action) {
      state.userInfo = action.payload;
    },
    setSingleInof(state,action) {
      state.userInfo[action.payload.key] = action.payload.value;
    }
  },
})

export const { setInitUserInfo,setSingleInof } = consultantSlice.actions

export default consultantSlice.reducer