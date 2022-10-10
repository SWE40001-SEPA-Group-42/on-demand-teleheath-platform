import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { modifyDoctorById } from '../Doctor/doctorsSlice'

const baseURL = 'http://localhost:8001/api/doctors'

type Patient = {
    ptGiveName: string,
    ptSurname: string,
    ptPreferredName: string,
    ptDOB: string,
    ptBirthSex: string,
    ptEmailAddress: string,
    ptMobilePhone: string,
    ptHomePhone: string,
    ptWorkPhone: string,
    ptAddress: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    postcode: string,
    country: string,
    ptMedicareCardNo: string,
    ptMedicareCardIRN: string,
    ptMedicareCardExpiryDate: string,
    ptPrivateHealthFund: string,
    ptPrivateHealthFundNo: string,
    ptEmgContactGivenName: string,
    ptEmgContactSurname: string,
    ptEmgContactRelationship: string,
    ptEmgContactMobilePhone: string,
    ptEmgContactHomePhone: string,
    ptEmgContactWorkPhone: string,
    ptNextOfKinGivenName: string,
    ptNextOfKinSurname: string,
    ptNextOfKinRelationship: string,
    ptNextOfKinMobilePhone: string,
    ptNextOfKinHomePhone: string,
    ptNextofKinWorkPhone: string,
    ptDVAFileNo: string,
    ptDVAExpiryDate: string,
    ptHealthcareCardNo: string,
    ptHealthcareCardExpiryDate: string,
    ptPensionCardNo: string,
    ptPensionCardExpiryDate: string,
}

export const getPatient = createAsyncThunk(
    //action name
    '/patients/getPatient',
    async () => {
        try {
            const response = await axios.get(`${baseURL}`, {
                params: {
                    drGivenName: "",
                    drSurname: ""
                }
            })

            return response.data
        } catch (err) {
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
            const response = await axios.put(`${baseURL}`, {
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
    }
})