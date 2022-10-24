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


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

 props,

 ref

) {

 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function BillCreate() {
  
  

  let [bill, setBill] = React.useState<Partial<BillsInterface>>({});
  const [payments, setPayments] = React.useState<PaymentsInterface[]>([]);

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

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Funtion get FK payment
   const getPayments = async () => {
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

  // fetch previous income record
  const getPrevBill = async () => {
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
    }, []);



        function submit() {
          let data = {
            Bill_StudentID: bill.Bill_StudentID ?? "",
            Bill_RegistrationID: bill.Bill_RegistrationID ?? "",
            Total: typeof bill.Total == "string" ? parseInt(bill.Total) : 0,

            //Combobox
            Payment_ID: bill.Payment_ID ?? "",

            Datetimepay: bill.Datetimepay,
            Bill_OfficerID: bill.Bill_OfficerID ?? "",
              
              
          
          }
          const apiUrl = "http://localhost:8080/bills";

          const requestOptions = {
            method: "POST",
    
            headers: { "Content-Type": "application/json" },
    
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
              <TextField
                id="Bill_StudentID"
                
                type="string"
                size="medium"
                value={bill.Bill_StudentID || ""}
                onChange={handleInputChange}
                
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>ข้อมูลการลงทะเบียนเรียน</p>

            <FormControl fullWidth variant="outlined">
              <TextField
                id="Bill_RegistrationID"
                
                type="string"
                size="medium"
                value={bill.Bill_RegistrationID || ""}
                onChange={handleInputChange}
                
                
              />
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
                                value={bill.Payment_ID}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "Payment_ID",
                                }}

                            >
                                {payments.map((item: PaymentsInterface) => (
                                    <MenuItem
                                        value={item.Payment_ID}
                                        key={item.Payment_ID}
                                    >
                                        {item.Name}
                                    </MenuItem>
                                ))}
                            </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>วันที่ชำระ</p>

            <FormControl fullWidth variant="outlined">
              <TextField
                id="Datetimepay"
                
                type="string"
                size="medium"
                value={bill.Datetimepay || ""}
                onChange={handleInputChange}
                
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>เจ้าหน้าที่การเงิน</p>

            <FormControl fullWidth variant="outlined">
              <TextField
                id="Bill_OfficerID"
                
                type="string"
                size="medium"
                value={bill.Bill_OfficerID || ""}
                onChange={handleInputChange}
                
                
              />
            </FormControl>
          </Grid>

          

          

         
          
          <Grid item xs={12}>
            <Button component={RouterLink} to="/" variant="contained">
              Back
            </Button>

            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
              
            >
              ยืนยันการชำระเงิน
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}


export default BillCreate;