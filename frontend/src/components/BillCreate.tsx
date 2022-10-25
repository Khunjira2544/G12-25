//Bill ของเพื่อน
import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { useEffect } from "react";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";


import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { BillsInterface } from "../models/IBill";
import { PaymentsInterface } from "../models/IPayment";

import { SelectChangeEvent } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OfficersInterface } from "../models/IOfficer";
import {RegistrationInterface} from "../models/IRegistration";
import { StudentInterface } from "../models/IStudent";
import { SubjectsInterface } from "../models/ISubject";



import{
  GetOfficerByUID,
  GetStudent,
  GetSubjects,
  
  
}from "../services/HttpClientService";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";




const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

 props,

 ref

) {

 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function BillCreate() {
  let [bill, setBill] = React.useState<Partial<BillsInterface>>({});
  const [students, setStudents] = React.useState<StudentInterface[]>([]); //
  const [registrations, setRegistrations] = React.useState<RegistrationInterface[]>([]); //
  const [payments, setPayments] = React.useState<PaymentsInterface[]>([]);
  const [subjects, setSubjects] = React.useState<SubjectsInterface[]>([]); //
  const [datetimepay, setDatetimepay] = React.useState<Date | null>(null);
  const [officers, setOfficers] = React.useState<OfficersInterface>();
  
  const [success, setSuccess] = React.useState(false);

  const [error, setError] = React.useState(false);

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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof BillCreate;

    const { value } = event.target;

    setBill({ ...bill, [id]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof typeof bill;
    setBill({
      ...bill,
      [name]: event.target.value,
    });
  };


  //Funtion get FK payment
  const getPayments = async () => {
    const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
    fetch(`${apiUrl}/payments`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                setPayments(res.data);
            } else {
                console.log("else");
            }
        });
};
const getOfficersID = async () => {
  let res = await GetOfficerByUID();
  bill.OfficerID = res.ID;
  console.log(bill.OfficerID);
  if (res) {
      setOfficers(res);
  }
};

const getStudents = async () => {
  let res = await GetStudent();
  bill.StudentID = res.ID;
  if (res) {
    setStudents(res);
  }
};
    const getSubjects = async () => {
      let res = await GetSubjects();
      if (res) {
        setSubjects(res);
      }
    };



  // fetch previous income record
  const getPrevBill = async () => {
    const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
    fetch(`${apiUrl}/previous_bill`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                bill.Bill_ID = res.data.Bill_ID + 1;
            } else {
                console.log("else");
            }
        });
};
useEffect(() => {
  getPrevBill();
  getPayments();
  getOfficersID();
  getStudents();
  getSubjects();
  
    }, []);

    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
  };

        function submit() {
          let data = {
            StudentID: convertType(bill.StudentID),
            RegistrationID:convertType(bill.RegistrationID),
            Total: typeof bill.Total == "string" ? parseInt(bill.Total) : 0,

            //Combobox
            Payment_ID: bill.Payment_ID ?? "",

            Datetimepay: moment(datetimepay).format("YYYY-MM-DD"),
            OfficerID: convertType(bill.OfficerID),
              
              
          
          }
          const apiUrl = "http://localhost:8080/bills";

          const requestOptions = {
            method: "POST",
    
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json" },
    
            body: JSON.stringify(data),
          };
    
          fetch(apiUrl, requestOptions)
            .then((response) => response.json())
    
            .then((res) => {
              if (res.data) {
                setSuccess(true);
              } else {
                setError(true);
              }
            });
        }
         
        

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>

      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              กรอกข้อมูลการชำระค่าลงทะเบียนเรียน
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Grid container spacing={1} sx={{ padding: 2 }}>

        <Grid item xs={8} >
            <p>รหัสนักศึกษา</p>

            <FormControl fullWidth variant="outlined">
            
            <Select
                               variant="outlined"
                               id="StudentID"
                               
                                value={bill.StudentID + ""}
                                onChange={handleSelectChange}
                              
                                inputProps={{
                                    name: "StudentID",
                                }}
                            >
                              {students.map((item: StudentInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.S_ID}
                                </option>
                                 ))}
                            </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>ข้อมูลการลงทะเบียนเรียน</p>

            <FormControl fullWidth variant="outlined">
            <Select
                                variant="outlined"
                                id="SubjectID"
                                value={bill.RegistrationID+""}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "SubjectID",
                                }}

                            >
                                {subjects.map((item: SubjectsInterface) => (
                                    <option
                                        value={item.ID}
                                        key={item.ID}
                                    >
                                        {item.Name}
                                        </option>
                                ))}
                            </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>จำนวนเงินที่ชำระ</p>

            <FormControl fullWidth variant="outlined">
              <TextField
                id="Total"
                
                type="number"
                size="medium"
                value={bill.Total || ""}
                onChange={handleInputChange}
                
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>ชำระผ่าน</p>

            <FormControl fullWidth variant="outlined">
            
            <Select
                                variant="outlined"
                                id="Payment_ID"
                                value={bill.Payment_ID+""}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "Payment_ID",
                                }}

                            >
                                {payments.map((item: PaymentsInterface) => (
                                    <option
                                        value={item.Payment_ID}
                                        key={item.Payment_ID}
                                    >
                                        {item.Name}
                                        </option>
                                ))}
                            </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่ชำระเงิน</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={datetimepay} //รับมาจากการอัพเดท
                  
                  onChange={(newValue) => {
                    setDatetimepay(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>เจ้าหน้าที่การเงิน</p>

            <FormControl fullWidth variant="outlined">
              <Select
                                variant="outlined"
                                id="OfficerID"
                                value={bill.OfficerID+""}
                                onChange={handleSelectChange}
                                disabled
                                inputProps={{
                                    name: "OfficerID",
                                }}

                            ><option value={officers?.ID} key={officers?.ID}>
                            {officers?.Name}
                        </option>
                           
                            </Select>
            </FormControl>
          </Grid>

          

          

         
          
          <Grid item xs={12}>
          <Button component={RouterLink} to="/bills" variant="contained">
              กลับ
              </Button>

            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
              
            >
              บันทึกบิลการชำระเงิน
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}


export default BillCreate;