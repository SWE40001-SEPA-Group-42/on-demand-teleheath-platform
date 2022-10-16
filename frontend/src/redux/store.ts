import { configureStore } from '@reduxjs/toolkit'
import doctorReducers from './Doctor/doctorsSlice';

const store = configureStore({
    reducer: {
        doctors: doctorReducers
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch