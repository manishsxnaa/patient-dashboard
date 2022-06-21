import { useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { PatientAuthContext } from '../../contexts/PatientAuthContext'
import './Login.css'
import { useHistory } from "react-router-dom";

const SubmitButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#f73378'),
    backgroundColor: '#f73378',
    '&:hover': {
      backgroundColor: '#880e4f',
    },
  },
}))(Button)


const Login = () => {
  const history = useHistory();
  const { values, handleChange, handleSubmit, isFormHasError } = useContext(PatientAuthContext)
  /*
    Redirect to home when form has not error
  */
  const redirectToHome = () => {
    history.push("/Home")
  }
  /*
    Handle Login: When for is valid then redirect to home
  */
  const handleLogin = () => {
    const formSubmitStatus = handleSubmit()
    if(formSubmitStatus.status){
      redirectToHome()
    }
  }

  return (
  <div className="login">
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Paper elevation={3}>
          <br />
          <h2 >Sign in to Patient Dashboard</h2>
          
          {isFormHasError && <div className="login_error">Please enter correct credential</div>}
          <br />
          <div>
            
            <TextField 
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <br />
            <br />
            <SubmitButton 
              type="submit"
              size="large"
              fontSize="large"
              variant="text"
              color="primary"
              onClick={() => handleLogin()}
            >
            Sign in
            </SubmitButton>
            <br />
            <br />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  </div>
  )
}

export default Login