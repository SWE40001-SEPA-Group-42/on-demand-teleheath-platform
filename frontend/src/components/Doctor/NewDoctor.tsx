import React from 'react'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'

interface FormModel {
  drFirstName: string,
  drSurname: string,
  drCode: string,
  drAddress: string,
  prescribeCode: string,
  drPhoneNo: string,
  drEmail: string, 
  drClinic: string, 
  drQualif: string,
  drGender: string,
  drLanguages: [string]
}

const DoctorForm = () => {
  return (
    <div>
      <Formik<FormModel>
        initialValues={{
          drFirstName: "",
          drSurname: "",
          drCode: "",
          drAddress: "",
          prescribeCode: "",
          drPhoneNo: "",
          drEmail: "", 
          drClinic: "", 
          drQualif: "",
          drGender: "",
          drLanguages: [""],
        }}

        validationSchema={Yup.object().shape({
          drFirstName: Yup.string()
            .required('First name cannot be blank'),
          drSurname: Yup.string()
            .required('Surname cannot be blank'), //add regex later if required
          drCode: Yup.string()
            .required('Code cannot be blank'),
          drAddress: Yup.string()
            .required('Address cannot be blank'),
          prescribeCode: Yup.string()
            .required('Prescriber Code cannot be blank'),
          drPhoneNo: Yup.string()
            .required("Phone number cannot be blank"),
          drEmail: Yup.string()
            .email()
            .required("Email cannot be blank"),
          drClinic: Yup.string()
            .required("Clinic cannot be blank"),
          drQualif: Yup.string()
            .required("Doctor Qualify cannot be blank"),
          // drGender: Yup.string()
          //   .required("Doctor gender cannot be blank")
        })}

        onSubmit={(values) => {
          // alert(JSON.stringify(values))
          console.log(JSON.stringify(values))
        }}

        component={Form}
      />
    </div>
  )
}

let Form: (props: FormikProps<FormModel>) => JSX.Element =
  ({ handleSubmit, values, errors, handleChange, setFieldValue, touched }) => {

    return (
      <form
        style={{
          width: "40%",     
          display: "flex",
          flexDirection: "column",
          textAlign: "left"
        }}
        //style to be removed later
        onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name='drFirstName'
          placeholder="First name"
          value={values.drFirstName}
          onChange={handleChange} />
        {touched.drFirstName && errors.drFirstName && <div>{errors.drFirstName}</div>}

        <label>Surname</label>
        <input
          type="text"
          name='drSurname'
          placeholder="Surname"
          value={values.drSurname}
          onChange={handleChange} />
        {touched.drSurname && errors.drSurname && <div>{errors.drSurname}</div>}

        <label>Doctor Code</label>
        <input
          type="text"
          name='drCode'
          placeholder="Doctor Code"
          value={values.drCode}
          onChange={handleChange} />
        {touched.drCode && errors.drCode && <div>{errors.drCode}</div>}

        <label>Prescribe Code</label>
        <input
          type="text"
          name='prescribeCode'
          placeholder="Prescribe Code"
          value={values.prescribeCode}
          onChange={handleChange} />
        {touched.prescribeCode && errors.prescribeCode && <div>{errors.prescribeCode}</div>}
        
        <label>Address</label>
        <input
          type="text"
          name='drAddress'
          placeholder="Address"
          value={values.drAddress}
          onChange={handleChange} />
        {touched.drAddress && errors.drAddress && <div>{errors.drAddress}</div>}

        <label>Phone Number</label>
        <input
          type="text"
          name='drPhoneNo'
          placeholder="Phone Number"
          value={values.drPhoneNo}
          onChange={handleChange} />
        {touched.drPhoneNo && errors.drPhoneNo && <div>{errors.drPhoneNo}</div>}

        <label>Email</label>
        <input
          type="text"
          name='drEmail'
          placeholder="Email"
          value={values.drEmail}
          onChange={handleChange} />
        {touched.drEmail && errors.drEmail && <div>{errors.drEmail}</div>}

        <label>Clinic</label>
        <input
          type="text"
          name='drClinic'
          placeholder='Clinic'
          value={values.drClinic}
          onChange={handleChange}
        />
        {touched.drClinic && errors.drClinic && <div>{errors.drClinic}</div>}

        <label>Qualification</label>
        <input
          type="text"
          name='drQualif'
          placeholder='Qualification'
          value={values.drQualif}
          onChange={handleChange}
        />
        {touched.drQualif && errors.drQualif && <div>{errors.drQualif}</div>}

        <label>Gender</label>
        <select 
          name="drGender"
          onChange={handleChange} 
        >
          <option value="male">Male</option>
          <option value="male">Female</option>
          <option value="male">Other</option>
        </select>
        {touched.drGender && errors.drGender && <div>{errors.drGender}</div>}

        <label>Spoken Languages</label>
        <select 
          name="drLanguage"
          onChange={handleChange} 
          multiple
        >
          <option value="male">English</option>
          <option value="male">Mandarin</option>
          <option value="male">Vietnamese</option>
          <option value="male">Hindi</option>
          <option value="male">Cantonese</option>
          <option value="male">Greek</option>
        </select>
        {touched.drGender && errors.drGender && <div>{errors.drGender}</div>}

        <button type='submit'>
          Add new doctor
        </button>
      </form>
    )
  }

export default DoctorForm