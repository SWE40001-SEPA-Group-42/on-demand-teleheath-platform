import React from 'react'
import { Formik, FormikErrors, FormikProps } from 'formik'
import * as Yup from 'yup'


interface FormModel {
  name: string,
  password: string,
  confirmPassword: string,
  specialisation: string,
  email: string,
}

const DoctorForm = () => {
  return (
    <div>
      <Formik<FormModel>
        initialValues={{
          name: "",
          password: "",
          confirmPassword: "",
          specialisation: "",
          email: "",
        }}

        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required('Name cannot be blank'),
          password: Yup.string()
            .required('Password cannot be blank'), //add regex later if required
          confirmPassword: Yup.string()
            .required('Confirm password cannot be blank'),
          specialisation: Yup.string()
            .required('Specialisation cannot be blank'),
          email: Yup.string()
            .email()
            .required("Email cannot be blank")
        })}

        onSubmit={(values) => {
          // alert(JSON.stringify(values))
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
        <label>Name</label>
        <input
          type="text"
          name='name'
          placeholder="Name"
          value={values.name}
          onChange={handleChange} />
        {touched.name && errors.name && <div>{errors.name}</div>}

        <label>Email</label>
        <input
          type="text"
          name='email'
          placeholder="Email"
          value={values.email}
          onChange={handleChange} />
        {touched.email && errors.email && <div>{errors.email}</div>}

        <label>Specialisation</label>
        <input
          type="text"
          name='specialisation'
          placeholder='Specialisation'
          value={values.specialisation}
          onChange={handleChange}
        />
        {touched.specialisation && errors.specialisation && <div>{errors.specialisation}</div>}

        <label>Password</label>
        <input
          type="text"
          name='password'
          placeholder='Password'
          value={values.password}
          onChange={handleChange}
        />
        {touched.password && errors.password && <div>{errors.password}</div>}

        <label>Confirm Password</label>
        <input
          type="text"
          name='confirmPassword'
          placeholder='Confirm your password'
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {touched.confirmPassword && errors.confirmPassword && <div>{errors.confirmPassword}</div>}

        <button type='submit'>
          Add new doctor
        </button>
      </form>
    )
  }

export default DoctorForm