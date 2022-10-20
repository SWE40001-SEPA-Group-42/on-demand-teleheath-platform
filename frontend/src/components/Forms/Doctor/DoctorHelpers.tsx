import React from 'react'
import * as Yup from 'yup';
import {Doctor} from '../../../types/Doctor'
import Userfront from '@userfront/react';

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);




//FORM VALIDATOR OPTION
const birthSexOptions = ['Male', 'Female', 'Other'];
const languagesSpokenOptions = [
    'English',
    'Mandarin',
    'Vietnamese',
    'Hindi',
    'Cantonese',
    'Greek',
    'Other',
];



//FORM VALIDATOR
export const validationSchema = Yup.object().shape({
    drGivenName: Yup.string()
        .required('Given name(s) cannot be blank')
        .matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed for this field'),
    drSurname: Yup.string()
        .required('Surname cannot be blank')
        .matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed for this field'),
    drPreferredName: Yup.string().matches(
        /^[A-Za-z ]+$/,
        'Only alphabets are allowed for this field'
    ),
    drDOB: Yup.string()
        .required('Date of Birth cannot be blank')
        .matches(
            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            'Please enter a valid date in the format: YYYY-MM-DD'
        ),
    drBirthSex: Yup.string()
        .required('Please select your birth sex')
        .oneOf(birthSexOptions),
    drEmail: Yup.string()
        .required('Email cannot be blank')
        .email('Please enter valid email address'),
    drPhone: Yup.string()
        .required('Phone number cannot be blank')
        .matches(
            /^\+(?:[0-9] ?){6,14}[0-9]$/,
            'Please enter a valid phone number (including country code)'
        ),
    drAddress: Yup.object({
        line1: Yup.string()
            .required('Address Line 1 cannot be blank')
            .matches(
                /^[ A-Za-z0-9_./#&-]*$/,
                'Please enter a valid street address'
            ),
        line2: Yup.string().matches(
            /^[ A-Za-z0-9_./#&-]*$/,
            'Please enter a valid address'
        ),
        city: Yup.string()
            .required('City cannot be blank')
            .matches(
                /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
                'Only alphabets are allowed for this field'
            ),
        state: Yup.string()
            .required('State cannot be blank')
            .matches(
                /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
                'Please enter a valid state'
            ),
        postcode: Yup.string()
            .required('Postcode cannot be blank')
            .matches(/^[A-Za-z0-9]+$/, 'Please enter a valid postcode'),
        country: Yup.string()
            .required('Country cannot be blank')
            .matches(
                /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
                'Please enter a valid country'
            ),
    }),
    drCode: Yup.string().required("Doctor's code cannot be blank"),
    drPrescriberNo: Yup.string().required('Prescriber Code cannot be blank'),
    drClinicName: Yup.string()
        .required('Clinic cannot be blank')
        .matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed for this field'),
    drQualifications: Yup.string()
        .required('Qualifications cannot be blank')
        .matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed for this field'),
    drLanguagesSpoken: Yup.string()
        .required('Please select languages spoken')
        .oneOf(languagesSpokenOptions),
});



