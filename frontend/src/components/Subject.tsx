import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SubjectsInterface } from "../models/ISubject";

function Subject() {
    const [subjects, setSubjects] = useState<SubjectsInterface[]>([]);

    const apiUrl = "http://localhost:8080/subjects";

    useEffect(() => {
        getSubjects();
    }, []);

    const getSubjects = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
    
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    return setSubjects(res.data);
                } else {
                    return false;
                }
            });
    };

    const columns: GridColDef[] = [
        {field: "ID", headerName: "ลำดับ", width: 50 },
        {field: "Code", headerName: "รหัสวิชา", width: 250 },
        {field: "Name", headerName: "ชื่อวิชา", width: 250 },
        {field: "Credit", headerName: "หน่วยกิต", width: 250 },
        {field: "Section", headerName: "กลุ่ม", width: 250 },
        {field: "Day", headerName: "วันที่เรียน", width: 250, },
        {field: "Take", headerName: "รับ", width: 250 },
        {field: "Teacher", headerName: "อาจารย์ผู้สอน", width: 150, valueFormatter: (params) => params.value.Name, },
        {field: "Time", headerName: "ช่วงเวลาที่เปิดสอน", width: 150, valueFormatter: (params) => params.value.Period, },
        {field: "Faculty", headerName: "สำนักวิชา", width: 150, valueFormatter: (params) => params.value.Name, },
        {field: "Officer", headerName: "ผู้บันทึก", width: 150, valueFormatter: (params) => params.value.Name, },
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
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            ข้อมูลรายวิชา
                        </Typography>
                    </Box>
                    <Box>
                        <Button component={RouterLink} to="/subject/create" variant="contained" color="primary">
                            สร้างข้อมูล
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                    <DataGrid
                        rows={subjects}
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

export default Subject;