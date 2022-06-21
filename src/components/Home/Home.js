import { useContext, useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
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
import Detail from '../Detail/Detail.js'

const Home = () => {
  /*
    use context
  */
  const history = useHistory();
  /*
    set states
  */
  const defaultData = {
    name: '',
    surname: '',
    age: '',
    disease: '',
    pic: '',
    contactNumber: '',
    address: '',
    birthMonth: '',
    birthDate: '',
    birthYear: ''
  }
  const [ page, setPage ] = useState(0); 
  const [ data, setData ] = useState([]); 
  const [ detailModalData, setDetailModalData ] = useState(); 
  const [ isShowDetailModal, setIsShowDetailModal ] = useState(false); 
  const [ isShowForm, setIsShowForm ] = useState(false); 
  const [ rowsPerPage, setRowsPerPage ] = useState(5); 
  const [ formSubmitType, setFormSubmitType ] = useState('ADD'); 
  const [ formValues, setFormValues ] = useState(defaultData)

  useEffect(() => {  
    if(values.email.length === 0){
      history.push("/")
    }
  });  

  /*
    handling change page 
  */

  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  

  /*
    handling row per page
  */

  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value); 
    setPage(0);  
  };  

  /*
    use auth context
  */

  const { values } = useContext(PatientAuthContext)

  /*
    Add/Update Patient data 
  */

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
          return { ...data, name: formValues.name , surname: formValues.surname , age: formValues.age , disease: formValues.disease, contactNumber: formValues.contactNumber, address: formValues.address, id: formValues.id, birthDate: formValues.birthDate, birthMonth: formValues.birthMonth, birthYear: formValues.birthYear, pic: formValues.pic }
        }
        return values
      })
    )
    setFormValues(defaultData)
    setIsShowForm(false)
  }

  /*
    when click on patient then set form type
  */

  const updatePatient = (data) => {
    setFormSubmitType("UPDATE")
    setFormValues(data)
    setIsShowForm(!isShowForm)
  }

  /*
    Delete Patient handling
  */
  const deletePatient = (delData) => {
    setData((data) =>
      data.filter((values) => values.id !== delData.id)
    )
  }

   /*
    Detail Patient handling
  */
  const detailPatient = (data) => {
    setIsShowDetailModal(false);
    setDetailModalData(data)
    setIsShowDetailModal(true);
  }

  /*
    Rendering Pagination
  */

  const renderPagination = () => {
    return (
      <TablePagination 
        rowsPerPageOptions={[5, 10, 15]}  
        component="div"  
        count={data.length}  
        rowsPerPage={rowsPerPage} 
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} 
      />  
    )
  }

  /*
    Rendering Patient Data
  */

  const renderPatientData = (row) => {
    return (     
      <TableRow key={row.id}>  
        <TableCell component="th" scope="row">
          {row.id}  
        </TableCell> 
        <TableCell align="right">{row.name}</TableCell> 
        <TableCell align="right">{row.surname}</TableCell>
        <TableCell align="right">{row.age}</TableCell>
        <TableCell align="right">{row.disease}</TableCell>
        <TableCell align="right">
          <Button variant="outlined" color="default" className="margin-left" onClick={()=>
            detailPatient(row)
          }>Detail</Button>
          <Button variant="outlined" color="default" className="margin-left" onClick={()=>
            updatePatient(row)
          }>Edit</Button>
          <Button variant="outlined"  color="secondary" className="margin-left" onClick={()=>
            deletePatient(row)
          }>Remove</Button>
        </TableCell>
      </TableRow> 
    );
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
              setIsShowForm(!isShowForm);
              setFormSubmitType('ADD');
              setFormValues(defaultData)
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
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => renderPatientData(row))} 
            </TableBody>  
          </Table>  
        </TableContainer> 
        {renderPagination()}
        {isShowDetailModal && <Detail detailData={detailModalData} isOpen={isShowDetailModal} setIsShowDetailModal={setIsShowDetailModal}/>}
        
      </Paper> 
    </div>
  );
}

export default Home
