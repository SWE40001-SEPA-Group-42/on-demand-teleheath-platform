import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = 'http://localhost:8001/api/doctors'

type Doctor = {
    _id: string,
    drGivenName: string,
    drSurname: string,
    drPreferredName: string
    drDOB: string,
    drBirthSex: string,
    drEmail: string,
    drPhone: string,
    drAddress: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    postcode: string,
    country: string
    drCode: string,
    drPrescriberNo: string,
    drQualifications: string,
    drLanguagesSpoken: string,
    drClinicName: string
}

export const fetchDoctors = createAsyncThunk(
    //action name
    '/doctors/fetchDoctors',
    async () => {
        try {
            const response = await axios.get(`${baseURL}`, {
                params: {
                    drGivenName: "Johnathan",
                    drSurname: "Fury"
                }
            })

            return response.data
        } catch(err) {
            console.log(err)
        }
    }
)

export const fetchDoctorById = createAsyncThunk(
    'doctors/fetchDoctorById',
    async (data: string, { rejectWithValue }) => {
    }
)

export const modifyDoctorById = createAsyncThunk(
    'doctors/modifyDoctorById',
    async (data: Doctor) => {
        try {
            const response = await axios.put(`${baseURL}/${data._id}`, {
                ...data
            })
    
            console.log(response)

            return response.data
        } catch(err) {
            console.log(err)
        }
    }
)

export const addDoctor = createAsyncThunk(
    'doctors/addDoctor',
    async (data: Doctor) => {
        try {
            const response = await axios.put(`${baseURL}/`, {
                ...data
            })

            return response.data
        } catch(err) {
            console.log(err)
        }
    }
)



type InitialState = {
    data: Doctor[],
    loading: boolean, 
    error: string
}
const initialState: InitialState = {
    data: [],
    loading: false,
    error: ''
}

const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        // addDoctor: (state, action) => {
        //     state.data.push(action.payload)
        // },
        // getDoctors: (state, action) => {
        //     state.data = action.payload
        // } 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDoctors.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchDoctors.fulfilled, (state, action: PayloadAction<Doctor[]>) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(fetchDoctors.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message || 'Something went wrong'
        })
        //update doctor by id
        builder.addCase(modifyDoctorById.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(modifyDoctorById.fulfilled, (state, action: PayloadAction<Doctor>) => {
            state.loading = false
            state.data.push(action.payload)
            state.error = ''
        })
        builder.addCase(modifyDoctorById.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
        })
        //add doctor
        builder.addCase(addDoctor.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
            state.loading = false
            state.data.push(action.payload)
            state.error = ''
        })
        builder.addCase(addDoctor.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default doctorSlice.reducer
// export const { addDoctor, getDoctors } = doctorSlice.actions