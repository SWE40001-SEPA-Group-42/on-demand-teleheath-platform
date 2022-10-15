import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { modifyDoctorById } from '../Doctor/doctorsSlice'

const baseURL = 'http://localhost:8001/api/doctors'