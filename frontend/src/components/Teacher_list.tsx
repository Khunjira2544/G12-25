import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TeachersInterface } from "../models/ITeacher";
import { GetTeachers } from "../services/HttpClientService";
import { margin } from "@mui/system";

function Teacher_List() {
  const [Teacher, setTeacher] = useState<TeachersInterface[]>([]);

  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = async () => {
    let res = await GetTeachers();
    if (res) {
      setTeacher(res);
    }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Prefix",
      headerName: "คำนำหน้า",
      width: 100,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Name",
      headerName: "ชื่อ",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Email",
      headerName: "เมลล์",
      width: 200,
      valueFormatter: (params) => params.value.Email,
    },
    {
      field: "Password",
      headerName: "รหัสผ่าน",
      width: 200,
      valueFormatter: (params) => params.value.Password,
    },

    {
      field: "Faculty",
      headerName: "สำนักวิชา",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Educational",
      headerName: "ระดับการศึกษา",
      width: 100,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Officer",
      headerName: "เจ้าหน้าที่",
      width: 100,
      valueFormatter: (params) => params.value.Name,
    },
  ];

  return (
    <div>
      <Container maxWidth="xl">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
            marginX: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลอาจารย์
            </Typography>
          </Box>
          <Box>
            <Button component={RouterLink} to="/teacher/create" variant="contained" color="primary">
              สร้างข้อมูลอาจารย์
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "105%", marginLeft: "32", marginTop: "20px" }}>
          <DataGrid

            rows={Teacher}
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

export default Teacher_List;