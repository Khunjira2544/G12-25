import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RegistrationInterface } from "../models/IRegistration";
import { GetRegistration } from "../services/HttpClientService";

function Registration() {
  const [Registration, setRegistration] = useState<RegistrationInterface[]>([]);

  useEffect(() => {
    getRegistration();
  }, []);

  const getRegistration = async () => {
    let res = await GetRegistration();
    if (res) {
      console.log("res");
      console.log(res);
      setRegistration(res);
    }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Student",
      headerName: "รหัสนักศึกษา",
      width: 200,
      valueFormatter: (params) => params.value.S_ID,
    },
    {
      field: "Subject",
      headerName: "รหัสวิชา",
      width: 200,
      valueFormatter: (params) => params.value.Code,
    },
    {
      field: "State",
      headerName: "สถานะการเรียน",
      width: 150,
      valueFormatter: (params) => params.value.Name,
    },

  ];

  return (
    <div>
      <Container maxWidth="md">
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
              ข้อมูลการประเมินผู้สอน
            </Typography>
          </Box>
          <Box>
            <Button component={RouterLink} to="/registration/create" variant="contained" color="primary">
              ลงทะเบียนเรียน
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={Registration}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Registration;