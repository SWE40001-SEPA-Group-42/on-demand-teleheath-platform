import { configureStore } from '@reduxjs/toolkit'
import doctorReducers from './Doctor/doctorsSlice';
import clinicReducers from './Clinic/clinicsSlice'

const store = configureStore({
    reducer: {
        doctors: doctorReducers,
        clinics: clinicReducers
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch