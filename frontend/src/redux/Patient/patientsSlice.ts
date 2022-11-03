import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { modifyDoctorById } from '../Doctor/doctorsSlice'
import { Patient } from '../../types/Patient'

const baseURL = `${process.env.REACT_APP_SSL_URL}/api/patients`;

export const getPatient = createAsyncThunk(
    //action name
    '/patients/getPatient',
    async ({ptGivenName, ptSurname}: {
        ptGivenName: string,
        ptSurname: string
    }) => {
        try {
            const response = await axios.get(`${baseURL}`, {
                params: {
                    ptGivenName: ptGivenName,
                    ptSurname: ptSurname
                }
            })

            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const getAllPatient = createAsyncThunk(
    'patients/getPatientByEmail',
    async () => {
        try {
            const response = await axios.get(`${baseURL}/all`)

            return response.data
        } catch(err) {
            console.log(err)
        }
    } 
)

export const addPatient = createAsyncThunk(
    '/patients/addPatient',
    async (data: Patient) => {
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

export const modifyPatientById = createAsyncThunk(
    'patients/modifyPatientById',
    async (data: Patient) => {
        try {
            const response = await axios.put(`${baseURL}/${data._id}`, {
                ...data
            })

            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

type InitialState = {
    data: Patient[],
    loading: boolean,
    error: string,
}

const initialState: InitialState = {
    data: [],
    loading: false,
    error: ''   
}

const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get patient by name
        builder.addCase(getPatient.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getPatient.fulfilled, (state, action: PayloadAction<Patient[]>) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getPatient.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message || 'Something went wrong'
        })
        //update patient by id
        builder.addCase(modifyPatientById.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(modifyDoctorById.fulfilled, (state, action: PayloadAction<Patient>) => {
            state.loading = false
            state.data.push(action.payload)
            state.error = ''
        })
        builder.addCase(modifyDoctorById.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrongs'
        })
        //add patient
        builder.addCase(addPatient.pending, (state, action) => {
            state.loading = true
        }) 
        builder.addCase(addPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
            state.loading = false
            state.data.push(action.payload)
            state.error = ''
        })
        builder.addCase(addPatient.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message || 'Something went wrong'
        })
        //getPatientByEmail
        builder.addCase(getAllPatient.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllPatient.fulfilled, (state, action: PayloadAction<Patient[]>) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(getAllPatient.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default patientSlice.reducer
