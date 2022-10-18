import { configureStore } from '@reduxjs/toolkit';
import doctorReducers from './Doctor/doctorsSlice';
import clinicReducers from './Clinic/clinicsSlice';
import patientsSlice from './Patient/patientsSlice';

const store = configureStore({
	reducer: {
		doctors: doctorReducers,
		clinics: clinicReducers,
		patients: patientsSlice,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
