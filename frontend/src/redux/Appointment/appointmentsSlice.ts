import { createAsyncThunk, createSlice, PayloadAction, TaskAbortError } from '@reduxjs/toolkit'
import axios from 'axios'
import { string } from 'yup'
import { Appointment } from '../../types/Appointment'

const baseURL = 'http://localhost:8001/api/dashboard'

export const createAppointment = createAsyncThunk(
    'appointments/createApt',
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

export const searchForAppointment = createAsyncThunk(
    'appointments/searchApt',
    async ({ptEmail, drEmail}: {ptEmail: string, drEmail: string}) => {
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
    name: 'appontments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //createAppointment
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
            state.data = []
        })
        //searchAppointment
        builder.addCase(searchForAppointment.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchForAppointment.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        }) 
        builder.addCase(searchForAppointment.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default appointmentSlice.reducer