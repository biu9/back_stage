import { createSlice } from '@reduxjs/toolkit'

const consultationSlice = createSlice({
  name: 'consultationSlice',
  initialState:{
    symptom:{
        "mainDesc":"主要描述",
        "descriptions":{//这里先把名字取了，搞得不好用得上
            "theme":"主题",
            "sleepingQuality":"睡眠质量",
            "eatingCondition":"饮食状况",// 饮食状况（x
            "injuringThought":'String',
            "injuringAction":'String',
            "suicideThought":'String',
            "suicideAction":'String',
            "familyHistory":'String',
            "diagnosis":'String',
        },
        "optionInfo":'String' || null,
    },
    consultation:{

    }
  },
  reducers: {
    setSymptom(state,action) {
        state.symptom = action.payload;
    },
    setConsultation(state,action) {
        state.consultation = action.payload;
    }
  },
})

export const { setSymptom,setConsultation } = consultationSlice.actions

export default consultationSlice.reducer