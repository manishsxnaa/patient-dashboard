import { useContext, useState, useEffect } from 'react'
import {Link, Route} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { PatientAuthContext } from '../../contexts/PatientAuthContext'
import './Home.css'
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead'; 
import TablePagination from '@material-ui/core/TablePagination'; 
import TableRow from '@material-ui/core/TableRow'; 
import AddUpdatePatientForm from '../Patient/Patient';
import Detail from './components/Detail/Detail';

function Home() {
  const history = useHistory();
  const [page, setPage] = useState(0); 
  const [data, setData] = useState([]); 
  const [isShowForm, setIsShowForm] = useState(false); 
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [formSubmitType, setFormSubmitType] = useState('ADD'); 
  
  const defaultData = {
    id: 0,
    name: '',
    surname: '',
    age: '',
    disease: ''
  }
  const [ formValues, setFormValues ] = useState(defaultData)
  
  useEffect(() => {  
    if(values.email.length === 0){
      history.push("/")
    }
  });  
  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  
  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value); 
    setPage(0);  
  };  
  const { values } = useContext(PatientAuthContext)

  const addUpdateData = () => {
    if(formSubmitType === 'ADD' ){
      formValues.id = data.length + 1
      data.push(formValues)
      setData(data)
      setFormValues(defaultData)
      setIsShowForm(false)
      return
    }
    setData((data) =>
      data.map((values) => {
        if (values.id === formValues.id) {
          return { ...data, name: formValues.name , surname: formValues.surname , age: formValues.age , disease: formValues.disease, id: formValues.id }
        }
        return values
      })
    )
    setFormValues(defaultData)
    setIsShowForm(false)
  }

  const updatePatient = (data) => {
    setFormSubmitType("UPDATE")
    setFormValues(data)
    setIsShowForm(true)
  }

  const deletePatient = (delData) => {
    setData((data) =>
      data.filter((values) => values.id !== delData.id)
    )
  }

  return (
    <div className="Home">
      <div className="bar">
        <Typography variant="h6">
          Welcome {values.email}
        </Typography>
        <Link to="/">
          <Button color="default">Logout</Button>
        </Link>
      </div>
      {isShowForm && (
        <AddUpdatePatientForm formValues={formValues} setFormValues={setFormValues} addUpdateData={addUpdateData} />
      )}
      <Paper className={'table'}>  
        <div className="add">
          <Button variant="contained" color="primary" onClick={
            ()=>{ 
              setIsShowForm(true);
              setFormSubmitType('ADD');
            }
          }
          >Add</Button>
        </div>
        <TableContainer> 
          <Table stickyHeader aria-label="sticky table"> 
            <TableHead>  
              <TableRow>  
                <TableCell>Id</TableCell>  
                <TableCell align="right">Name</TableCell>  
                <TableCell align="right">SurName</TableCell>  
                <TableCell align="right">Age</TableCell> 
                <TableCell align="right">Disease</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow> 
            </TableHead>  
            <TableBody> 
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                return ( 
                  <TableRow>  
                    <TableCell component="th" scope="row">
                      {row.id}  
                    </TableCell> 
                    <TableCell align="right">{row.name}</TableCell> 
                    <TableCell align="right">{row.surname}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">{row.disease}</TableCell>
                    <TableCell align="right">
                      <Route exact path="/detail" component={Detail} />
                      <Button variant="outlined" onClick={()=>history.push("/detail")}>Detail</Button>
                      <Button variant="outlined" color="success" className="margin-left" onClick={()=>
                        updatePatient(row)
                      }>Edit</Button>
                      <Button variant="outlined"  color="secondary" className="margin-left" onClick={()=>
                        deletePatient(row)
                      }>Remove</Button>
                    </TableCell>
                  </TableRow> 
                );
              })} 
            </TableBody>  
          </Table>  
        </TableContainer> 
        <TablePagination 
          rowsPerPageOptions={[5, 10, 15]}  
          component="div"  
          count={data.length}  
          rowsPerPage={rowsPerPage} 
          page={page}
          onChangePage={handleChangePage} 
          onChangeRowsPerPage={handleChangeRowsPerPage} 
        />  
      </Paper> 
    </div>
  );
}

export default Home
