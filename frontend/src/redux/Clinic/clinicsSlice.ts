import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { modifyDoctorById } from '../Doctor/doctorsSlice'

const baseURL = 'http://localhost:8001/api/doctors'

export const getClinic = createAsyncThunk(
    //action name
    '/clinics/getClinic', 
    async (clName: string) => {
        try {
            const response = await axios.get(`${baseURL}`, {
                params: {
                    clinicName: clName
                }
            })

            return response.data
        } catch(err) {
            console.log(err)
        }
    }
)

