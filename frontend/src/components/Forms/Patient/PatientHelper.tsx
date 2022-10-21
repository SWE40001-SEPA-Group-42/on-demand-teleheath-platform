import React from 'react'
import * as Yup from 'yup';



const birthSexOptions = ['male', 'female', 'other'];

export const validationSchema = Yup.object({
    ptGivenName: Yup.string()
        .required('Given name(s) cannot be blank')
        .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
    ptSurname: Yup.string()
        .required('Surname cannot be blank')
        .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
    ptPreferredName: Yup.string().matches(
        /^[A-Za-z]+$/,
        'Only alphabets are allowed for this field'
    ),
    ptDOB: Yup.string()
        .required('Date of Birth cannot be blank')
        .matches(
            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            'Please enter a valid date in the format: YYYY-MM-DD'
        ),
    ptBirthSex: Yup.string()
        .required('Please select your birth sex')
        .oneOf(birthSexOptions),
    ptEmailAddress: Yup.string()
        .required('Email address cannot be blank')
        .email('Please enter valid email address'),
    ptMobilePhone: Yup.string()
        .required('Mobile phone number cannot be blank')
        .matches(
            /^\+(?:[0-9] ?){6,14}[0-9]$/,
            'Please enter a valid phone number (including country code)'
        ),
    ptHomePhone: Yup.string().matches(
        /^\+(?:[0-9] ?){6,14}[0-9]$/,
        'Please enter a valid phone number (including country code)'
    ),
    ptWorkPhone: Yup.string().matches(
        /^\+(?:[0-9] ?){6,14}[0-9]$/,
        'Please enter a valid phone number (including country code)'
    ),
    ptAddress: Yup.object({
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
	ptMedicareCardNo: Yup.string()
			.min(10, 'Medicare card number must be exactly 10 digits long')
			.matches(/^[0-9]{10}$/, 'Only numbers are allowed for this field'),
		ptMedicareCardIRN: Yup.string()
			.max(10, 'Medicare card IRN must be exactly 10 digits long')
			.matches(/^[0-9]{10}$/, 'Only numbers are allowed for this field'),
		ptMedicareCardExpiryDate: Yup.string().matches(
			
			/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
			'Please enter a valid date in the format: DD-MM-YYYY'
		),
		ptPrivateHealthFund: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptPrivateHealthFundNo: Yup.string().matches(
			/^[0-9]{10}$/,
			'Only numbers are allowed for this field'
		),
		ptEmgContactGivenName: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptEmgContactSurname: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptEmgContactRelationship: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptEmgContactMobilePhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptEmgContactHomePhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptEmgContactWorkPhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptNextOfKinGivenName: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptNextOfKinSurname: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptNextOfKinRelationship: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptNextOfKinMobilePhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptNextOfKinHomePhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptNextOfKinWorkPhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptDVAFileNo: Yup.string().matches(
			/^[0-9]{10}$/,
			'Only numbers are allowed for this field'
		),
		ptDVAExpiryDate: Yup.string().matches(
			// ^(0[1-9]|1[0-2])-\d{4}$
			/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
			'Please enter a valid date in the format: YYYY/MM/DD'
		),
		ptHealthcareCardNo: Yup.string().matches(
			/^[0-9]{10}$/,
			'Only numbers are allowed for this field'
		),
		ptHealthcareCardExpiryDate: Yup.string().matches(
			/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
			'Please enter a valid date in the format: MM-YYYY'
		),
		ptPensionCardNo: Yup.string().matches(
			/^\d{10}$/,
			'Only numbers are allowed for this field'
		),
		ptPensionCardExpiryDate: Yup.string().matches(
			// /^(0[1-9]|1[0-2])-\d{4}$/,
			// 'Please enter a valid date in the format: YYYY/MM/DD'
			/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
			'Only numbers are allowed for this field'
		),
});
