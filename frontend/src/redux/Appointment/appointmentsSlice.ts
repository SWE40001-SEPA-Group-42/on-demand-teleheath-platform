import { createAsyncThunk, createSlice, PayloadAction, TaskAbortError } from '@reduxjs/toolkit'
import axios from 'axios'
import { Appointment } from '../../types/Appointment'

const baseURL = `${process.env.REACT_APP_SSL_URL}/api/dashboard/appointment`;

export const createAppointment = createAsyncThunk(
    'appointments/createApt',
    async ({ptEmail, drEmail, aptLink} : {
        ptEmail: string, 
        drEmail: string,
        aptLink: string
    }) => {
        try {   
            const response = await axios.post(`${baseURL}`, {
                ptEmail: ptEmail,
                drEmail: drEmail,
                aptLink: aptLink
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

export const searchForAppointmentByDoctor = createAsyncThunk(
    'appointments/searchAptByDoctor',
    async (drEmail: string) => {
        try {
            const response = await axios.get(`${baseURL}/doctor`, {
                params: {
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
        //searchAppointmentByDoctor
        builder.addCase(searchForAppointmentByDoctor.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchForAppointmentByDoctor.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(searchForAppointmentByDoctor.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default appointmentSlice.reducer
