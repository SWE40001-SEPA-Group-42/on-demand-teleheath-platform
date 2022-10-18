import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Clinic } from '../../types/Clinic'

const baseURL = 'http://localhost:8001/api/clinics'

export const getClinic = createAsyncThunk(
    //action name
    '/clinics/getClinic', 
    async (clinicName: string) => {
        try {
            const response = await axios.get(`${baseURL}`, {
                params: {
                    clName: clinicName
                }
            })

            return response.data
        } catch(err) {
            console.log(err)
        }
    }
)

export const updateClinicById = createAsyncThunk(
    'clinics/modifyClinicById',
    async (data: Clinic) => {
        try {
            const response = await axios.put(`${baseURL}/${data._id}`, {
                ...data
            } )

            return response.data
        } catch(err) {
            console.log(err)
        }
    }
)

export const addClinic = createAsyncThunk(
    'clinics/addClinic',
    async (data: Clinic) => {
        try {
            const response = await axios.post(`${baseURL}`, {
                ...data
            })

            return response.data
        } catch(err) {
            console.log(err)
        }
    }
)

type InitialState = {
    data: Clinic[],
    loading: boolean, 
    error: string
}
const initialState: InitialState = {
    data: [],
    loading: false,
    error: ''
}

const clinicSlice = createSlice({
    name: 'clinics',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        //getClinic
        builder.addCase(getClinic.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getClinic.fulfilled, (state, action: PayloadAction<Clinic[]>) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getClinic.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong"
            state.data = []
        })
        //modifyClinicById 
        builder.addCase(updateClinicById.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateClinicById.fulfilled, (state, action: PayloadAction<Clinic>) => {
            state.loading = false
            state.data.push(action.payload)
            state.error = ''
        })
        builder.addCase(updateClinicById.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
        })
        //addClinic
        builder.addCase(addClinic.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addClinic.fulfilled, (state, action: PayloadAction<Clinic>) => {
            state.loading = false
            state.data[0] = action.payload
            state.error = ""
        })
        builder.addCase(addClinic.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong"
        })
    }
})

export default clinicSlice.reducer

