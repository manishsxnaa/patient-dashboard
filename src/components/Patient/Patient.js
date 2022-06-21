import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import {
  getMonths,
  getYears,
  daysInMonth
} from '../../data'
import './Patient.css'


const AddUpdatePatientForm = ({formValues, setFormValues, addUpdateData}) => {
  /*
    set state
  */
  const [patientFormHasError, setPatientFormHasError] = useState(false)

  /*
    handle Form data and add validation
  */

  const handleSubmit = () => {
    if(formValues.name.length === 0 || formValues.surname.length === 0 || formValues.age.length === 0 || formValues.disease.length === 0 || formValues.contactNumber.length === 0 || formValues.address.length === 0 || formValues.birthDate.length === 0 || formValues.birthMonth.length === 0 || formValues.birthYear.length === 0){
      setPatientFormHasError(true)
      return
    }
    
    setPatientFormHasError(false)
    addUpdateData()
  }

  /*
    handle Image capture
  */

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      setFormValues({...formValues, 'pic': e.target.result})
    };
  };

  /*
    handle Form data values changes
  */

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  return (
    <div className="container">
      <Card variant="outlined" className="card">
        <div className="error">Name, Surname, Age, Disease, Contact Information, Address, DOB are Manadatory *</div>
        {patientFormHasError && (<div className="error">Please enter correct data</div>)}
        <br />
        <Grid container rowspacing={1} columnspacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <div className="patient-form">
              <TextField 
                variant="outlined"
                label="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="patient-form">
              <TextField
                label="surname"
                variant="outlined"
                name="surname"
                value={formValues.surname}
                onChange={handleChange}
              />
          </div>
          </Grid>
          <Grid item xs={6}>
            <div className="patient-form">
              <TextField
                label="Age"
                variant="outlined"
                name="age"
                min="0"
                type="number"
                value={formValues.age}
                onChange={handleChange}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="patient-form">
              <TextField
                label="Contact Infomration"
                variant="outlined"
                name="contactNumber"
                type="number"
                min="0"
                value={formValues.contactNumber}
                onChange={handleChange}
              />
             </div> 
          </Grid>
          <Grid item xs={6}>
            <div className="patient-form">
              <TextField
                label="Address"
                variant="outlined"
                multiline
                maxRows={4}
                name="address"
                value={formValues.address}
                onChange={handleChange}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="patient-form">
              <TextField
                label="Disease"
                variant="outlined"
                multiline
                maxRows={4}
                name="disease"
                value={formValues.disease}
                onChange={handleChange}
              />
            </div> 
          </Grid>
          <Grid item xs={12}>
            <div className="patient-form">
              <TextField
                select
                label="Select"
                name="birthMonth"
                value={formValues.birthMonth}
                onChange={handleChange}
                helperText="Please select your Month"
              >
                {getMonths().map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Select"
                value={formValues.birthDate}
                name="birthDate"
                onChange={handleChange}
                helperText="Please select your Date"
              >
                {daysInMonth(1980,1).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Select"
                name="birthYear"
                value={formValues.birthYear}
                onChange={handleChange}
                helperText="Please select your Year"
              >
                {getYears().map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="patient-form">
              <input
                accept="image/*"
                id="icon-button-photo"
                onChange={handleCapture}
                type="file"
              />
              <br />
              <br />
              {formValues.pic.length > 0 && (
                <img alt="" src={formValues.pic} width={80} height={80} />
              )}
            </div> 
          </Grid>
        </Grid>
        <br />
        <br />
        <Button 
          type="submit"
          size="large"
          fontSize="large"
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
        <br />
        <br />
      </Card>
    </div>  
  )
}
export default AddUpdatePatientForm;