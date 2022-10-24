import React , {useEffect, useState} from 'react';
//import logo from './logo.svg';
//import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormControl from '@mui/material/FormControl/FormControl';

//New
import { Link as RouterLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FacultiesInterface } from "../models/IFaculty";
import { OfficersInterface } from "../models/IOfficer";
import { StudentInterface } from "../models/IStudent";
import { TeachersInterface } from "../models/ITeacher";
import { CollegeyearInterface } from "../models/ICollegeyear";
//box
import {
  GetCollegeyear,
  GetFaculty,
  GetOfficerByUID,
  GetTeachers,
  Student,
} from "../services/HttpClientService";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import moment from 'moment';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {

  const [student, setstudent] = React.useState<StudentInterface>({
    //Date_of_birth: new Date(),
  });
  const [BirthDay, setBirthDay] = React.useState<Date | null>(null);
  const [S_id, setS_id] = useState<string>("");
  const [Student_name, setStudent_name] = useState<string>("");
  //ชั้นปี
  const [S_GPAX, setS_GPAX] = useState<GLfloat>();
  //สาขา
  const [Phone, setPhone] = useState<string>("");
  const [Parent, setParent] = useState<string>("");
  //อาจารย์
  //พนักงาน
  const [Collegeyear, setCollegeyear] = useState<CollegeyearInterface[]>([]);
  const [Faculty, setFaculty] = useState<FacultiesInterface[]>([]);
  const [Teacher, setTeacher] = useState<TeachersInterface[]>([]);
  const [officers, setOfficers] = useState<OfficersInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof student;
    setstudent({
      ...student,
      [name]: event.target.value,
    });
  };
////
  const getOfficersID = async () => {
    let res = await GetOfficerByUID();
    student.OfficerID = res.ID;
    console.log(student.OfficerID);
    if (res) {
        setOfficers(res);
    }
  };

  const getCollegeyear = async () => {
    let res = await GetCollegeyear();
    if (res) {
      setCollegeyear(res);
    }
  };

  const getFaculty = async () => {
    let res = await GetFaculty();
    if (res) {
      setFaculty(res);
    }
  };

  const getTeacher = async () => {
    let res = await GetTeachers();
    if (res) {
      setTeacher(res);
    }
  };

  useEffect(() => {
    getCollegeyear();
    getFaculty();
    getTeacher();
    getOfficersID();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      CollegeyearID: convertType(student.CollegeyearID),
      FacultyID: convertType(student.FacultyID),
      TeacherID: convertType(student.TeacherID),
      OfficerID: convertType(student.OfficerID),

      S_ID:  S_id,     
	    Name: Student_name,       
	    Gpax: (S_GPAX),
	    date_of_birth: moment(BirthDay).format("YYYY-MM-DD"),
	    Phone: Phone,      
	    Parent: Parent,  
      Password: Phone,
    };

    let res = await Student(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }

    // fetch("http://localhost:8080/student", {
    //   method: "POST",
    //   headers:{
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  };


  return (
    <div>
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
        {/*<Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />*/}
      <Paper >
        <Box
          display={"flex"}
            sx={{
              marginTop: 2,
              paddingX: 2,
              paddingY: 2,
            }}
        >
          <h2>Creat Student</h2>
        </Box>
        <hr/>
        <Grid container spacing={2} sx={{padding: 2}} > 
          <Grid item xs={6}>
            <p>รหัสนักศึกษา</p>
            <TextField 
            fullWidth
            id="Student_ID" 
            type="string"
            variant="outlined" 
            onChange={(event) => setS_id(event.target.value)}/>
            {/*<Item>ชื่อนามสกุล</Item>*/}
          </Grid>
          <Grid item xs={6}>
            <p>ชื่อนามสกุล</p>
            <TextField 
            fullWidth
            id="Student_Name" 
            type="string"
            variant="outlined" 
            onChange={(event) => setStudent_name(event.target.value)}/>
            {/*<Item>ชื่อนามสกุล</Item>*/}
          </Grid>

          
          <Grid item xs={6}> 
            <FormControl fullWidth variant="outlined">
              <p>ชั้นปี</p>
              <Select
                native
                value={student.CollegeyearID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "CollegeyearID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชั้นปี
                </option>
                {Collegeyear.map((item: CollegeyearInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <p>เกรด</p>
            <TextField 
            fullWidth
            id="GPAX" 
            type="string"
            variant="outlined" 
            onChange={(event) => setS_GPAX(parseFloat(event.target.value))}/>
            {/*<Item>เกรด</Item>*/}
          </Grid>


          <Grid item xs={6}> 
            <FormControl fullWidth variant="outlined">
              <p>สำนักวิชา</p>
              <Select
                native
                value={student.FacultyID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "FacultyID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสำนักวิชา
                </option>
                {Faculty.map((item: FacultiesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}> 
            <FormControl fullWidth variant="outlined">
              <p>อาจารย์ที่ปรึกษา</p>
              <Select
                native
                value={student.TeacherID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "TeacherID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกอาจารย์ที่ปรึกษา
                </option>
                {Teacher.map((item: TeachersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันเดือนปีเกิด</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={BirthDay} //รับมาจากการอัพเดท
                  
                  onChange={(newValue) => {
                    setBirthDay(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>เบอร์โทร</p>
            <TextField 
            fullWidth
            id="Phone" 
            type="string"
            variant="outlined" 
            onChange={(event) => setPhone(event.target.value)}/>
            {/*<Item>เบอร์โทร</Item>*/}
          </Grid>
          <Grid item xs={6}>
            <p>ผู้ปกครอง</p>
            <TextField 
            fullWidth
            id="Parent" 
            type="string"
            variant="outlined" 
            onChange={(event) => setParent(event.target.value)}/>
            {/*<Item>ผู้ปกครอง</Item>*/}
          </Grid>
          <Grid item xs={12}>
              <Button variant="contained" color='info'>Back</Button>
              <Button 
              variant="contained" 
              color='success' 
              sx={{float: "right"}} 
              onClick={submit}
              >Submit</Button>
          </Grid>
        </Grid>
        
        </Paper>
      </Container>
    </div>
  );
}

export default App;

