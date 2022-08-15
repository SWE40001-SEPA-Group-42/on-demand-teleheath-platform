import React from 'react'
import { Formik, FormikErrors, FormikProps} from 'formik'
import { has } from 'lodash'

interface FormModel {
  name: string,
  password: string, 
  specialisation: string,
}

const DoctorForm = () => {
  return (
    <div>
      <Formik<FormModel>
        initialValues={{
          name: "",
          password: "",
          specialisation: ""
        }}

        validate={(values)=>{
          let hasError: boolean = false
          let errors: FormikErrors<FormModel>={
            name: undefined,
            password: undefined,
            specialisation: undefined
          }

          if (values.name == "") {
            errors.name = "Name is required"
            hasError = true 
          }

          if (values.password == "") {
            errors.name = "Password is required"
            hasError = true
          }

          if (values.specialisation == ""){
            errors.name = "Specialisation is required"
            hasError = true
          }

          return (hasError) ? errors : undefined
        }}
        
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
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text" 
          name='name' 
          placeholder="Name"
          value={values.name}
          onChange={handleChange}/>
        { touched.name && errors.name && <div>{errors.name}</div>}

        <label>Username</label>
        <input 
          type="text"
          name='password'
          placeholder='Password'
          value={values.password}
          onChange={handleChange}
        />
        { touched.password && errors.password && <div>{errors.password}</div>}

        <label>Specialisation</label>
        <input 
          type="text"
          name='specialisation'
          placeholder='Specialisation'
          value={values.specialisation}
          onChange={handleChange}
        />
        { touched.specialisation && errors.specialisation && <div>{errors.specialisation}</div>}

        <button type='submit'>
          Add new doctor
        </button>
      </form>
    )
  }

export default DoctorForm