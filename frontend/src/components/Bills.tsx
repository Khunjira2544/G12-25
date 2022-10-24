//Bill ของเพื่อน
import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { BillsInterface } from "../models/IBill";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Divider } from "@mui/material";




function Bills() {
  const [bills, setBills] = React.useState<BillsInterface[]>([]);

  const getBills = async () => {
    const apiUrl = "http://localhost:8080/bills";

    const requestOptions = {
      method: "GET",

      headers: { "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setBills(res.data);
        }
      });
  };

  const columns: GridColDef[] = [
    { field: "Bill_ID", headerName: "บิลที่", width: 100 },

    { field: "Bill_StudentID", headerName: "รหัสนักศึกษา", width: 200 },

    { field: "Bill_RegistrationID", headerName: "วิชา", width: 150 },

    { field: "Total", headerName: "จำนวนเงินที่ชำระ", width: 150 },
    
    { field: "Payment_ID", headerName: "ธนาคารที่ชำระ", width: 150 },

    { field: "Datetimepay", headerName: "วันที่ชำระ", width: 150 },
    
    { field: "Bill_OfficerID", headerName: "เจ้าหน้าที่การเงิน", width: 200 },

    ];

  useEffect(() => {
    getBills();
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการชำระค่าลงทะเบียนเรียน
            </Typography>
          </Box>

          <Box>
            <Button
              component={RouterLink}
              to="/create"
              variant="contained"
              color="primary"
            >
              สร้างบิล
            </Button>
          </Box>
        </Box>

        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={bills}
            getRowId={(row) => row.Bill_ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}


export default Bills;