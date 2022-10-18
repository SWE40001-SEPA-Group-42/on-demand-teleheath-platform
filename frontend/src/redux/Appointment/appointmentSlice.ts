import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Appointment } from '../../types/Appointment'

const baseURL = 'http://localhost:8001/api/dashboard'

export const searchForAppointment = createAsyncThunk(
    'appointments/searchAppointment',
    async ({ptEmail, drEmail} : {ptEmail: string, drEmail: string}) => {
        try {
            const response = await axios.get(`${baseURL}`, {
                params: {
                    ptEmail: ptEmail,
                    drEmail: drEmail
                }
            })

            return response.data
        } catch(err) {
            console.log(err)
        }
    }
)

export const createAppointment = createAsyncThunk(
    'appointments/createAppointment',
    async (apt: Appointment) => {
        try {
            const response = await axios.post(`${baseURL}`, {
                ...apt
            })

            return response.data
        } catch(err) {
            console.log(err)
        }
    }
)

type InitialState = {
    data: Appointment[],
    loading: boolean, 
    error: string
}

const initialState: InitialState = {
    data: [],
    loading: false,
    error: ''
}

const appointmentSlice = createSlice({
    name: 'clinics',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        //searchApt
        builder.addCase(searchForAppointment.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchForAppointment.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        })
        builder.addCase(searchForAppointment.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong"
        })
        //createApt
        builder.addCase(createAppointment.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
            state.loading = false
            state.data = [action.payload]
            state.error = ''
        })
        builder.addCase(createAppointment.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default appointmentSlice.reducer