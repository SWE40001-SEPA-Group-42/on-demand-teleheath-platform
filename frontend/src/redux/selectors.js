import { createSelector } from 'reselect'

//Doctors
export const searchTextSelector = (state) => state.filters.search;
export const filterLanguagesSelector = (state) => state.filters.languages;
export const filterGenderSelector = (state) => state.filters.gender;
export const filterSpecialisationSelector = (state) => state.filters.filterSpecialisation;
export const doctorsSelector = (state) => state.doctors;

export const doctorsRemainingSelector = createSelector(
    doctorsSelector,
    filterLanguagesSelector,
    filterGenderSelector, 
    filterSpecialisationSelector,
    searchTextSelector,
    (doctors, languages, gender, specialisation, searchText) => {
        return doctors.filter((doctor) => {
            //TO DO...
            
            return (
                doctor.drFirstName.includes(searchText) && 
                doctor.drSurname.includes(searchText)
            );
        })
    }
)

//Clinics
export const clinicsSelector = (state) => state.clinics;

//Patients 
export const patientsSelector = (state) => state.patients;