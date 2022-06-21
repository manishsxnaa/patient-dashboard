import { createContext, useState } from 'react'
import { login_data  } from '../data'

export const PatientAuthContext = createContext()

const PatientAuthContextProvider = (props) => {
  /*
    Set State Values
  */
  const [ values, setValues ] = useState({
    email: '',
    password: ''
  })
 
  const [ isFormHasError, setIsFormHasError ] = useState(false)

  /*
    Handle State change values
  */
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  /*
    Handle Form submit
  */
  const handleSubmit = () => {
    if(login_data.email === values.email && login_data.password === values.password) {
      setIsFormHasError(false)
      return {
        status: true
      }
    }
    setIsFormHasError(true)
    return {
      status: false
    }
  }

  return (
    <PatientAuthContext.Provider value={{values, handleChange, handleSubmit, isFormHasError}}>
      {props.children}
    </PatientAuthContext.Provider>
  )
}

export default PatientAuthContextProvider