import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
    name: 'filters',
    initialState: {
        search: '',
        languages: [],
        gender: 'male',
        specialisation: ''
    },
    reducers: {
        searchFilterChange: (state, action) => {
            state.search = action.payload
        },
        languagesFilterChange: (state, action) => {
            state.languages = action.payload
        },
        genderFilterChange: (state, action) => {
            state.gender = action.payload
        },
        specialisationFilterChange: (state, action) => {
            state.specialisation = action.payload
        }
    }
})