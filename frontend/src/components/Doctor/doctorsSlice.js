import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
    name: 'doctors',
    initialState: [
        {
            drFirstName: '',
            drSurname: '',
            drCode: '',
            prescribeCode: '',
            drAddress: '',
            drPhoneNo: '',
            drEmail: '',
            drClinic: '',
            drQualif: '',
            drGender: '',
            drLanguages: []
        }
    ],
    reducers: {
        addDoctor: (state, action) => {
            state.push(action.payload)
        }
    }
})