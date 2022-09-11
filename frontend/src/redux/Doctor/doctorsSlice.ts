import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
    drUsername: string;
    drPassword: string;
	drDateCreated: string;
	drGivenName: string;
	drSurname: string;
	drDOB: string;
	drBirthSex: string;
	drPreferredName?: string;
	drEmail: string;
	drPhone: string;
	drAddress: {
		line1: string;
		line2?: string;
		city: string;
		state: string;
		postcode: string;
		country: string;
	};
	drCode: string;
	drPrescribeCode: string;
	drClinicName: string;
	drQualif: string;
	drLanguages: [string];
}

const initialState: Array<InitialState> = [
    {
        drUsername: "",
        drPassword: "",
        drDateCreated: "",
        drGivenName: "",
        drSurname: "",
        drDOB: "",
        drBirthSex: "",
        drPreferredName: "",
        drEmail: "",
        drPhone: "",
        drAddress: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            postcode: "",
            country: "",
        },
        drCode: "",
        drPrescribeCode: "",
        drClinicName: "",
        drQualif: "",
        drLanguages: [""]
    }
] 

export default createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        addDoctor: (state, action) => {
            state.push(action.payload)
        }
    }
})