import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import { FacultiesInterface } from "../models/IFaculty";
import { OfficersInterface } from "../models/IOfficer";
import { SubjectsInterface } from "../models/ISubject";
import { TeachersInterface } from "../models/ITeacher";
import { TimesInterface } from "../models/ITime";

import {
    GetTeachers,
    GetFaculty,
    GetTime,
    GetOfficerByUID,
    Subjects,
} from "../services/HttpClientService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SubjectCreate() {
    const [teachers, setTeachers] = useState<TeachersInterface[]>([]);
    const [faculties, setFaculties] = useState<FacultiesInterface[]>([]);
    const [times, setTimes] = useState<TimesInterface[]>([]);
    const [officers, setOfficers] = useState<OfficersInterface[]>([]);
    const [subjects, setSubjects] = useState<Partial<SubjectsInterface>>({});
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
        const name = event.target.name as keyof typeof subjects;
        setSubjects({
            ...subjects,
            [name]: event.target.value,
        });
    };

    const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
        const id = event.target.id as keyof typeof subjects;
        const { value } = event.target;
        setSubjects({ ...subjects, [id]: value });
    };

    const getTeachers = async () => {
        let res = await GetTeachers();
        if (res) {
            setTeachers(res);
        }
    };

    const getOfficersID = async () => {
        let res = await GetOfficerByUID();
        subjects.OfficerID = res.ID;
        console.log(subjects.OfficerID);
        if (res) {
            setOfficers(res);
        }
    };

    const getFaculty = async () => {
        let res = await GetFaculty();
        if (res) {
            setFaculties(res);
        }
    };

    const getTime = async () => {
        let res = await GetTime();
        if (res) {
            setTimes(res);
        }
    };

    useEffect(() => {
        getTeachers();
        getFaculty();
        getTime();
        getOfficersID();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            Code: subjects.Code ?? "",
            Name: subjects.Name ?? "",
            Credit: convertType(subjects.Credit),
            Section: convertType(subjects.Section),
            Day: subjects.Day ?? "",
            Take: convertType(subjects.Take),
            TimeID: convertType(subjects.TimeID),
            TeacherID: convertType(subjects.TeacherID),
            FacultyID: convertType(subjects.FacultyID),
            OfficerID: convertType(subjects.OfficerID),
        };

        let res = await Subjects(data);
        if (res) {
            setSuccess(true);
        } else {
            setError(true);
        }

    }

    return (
        <Container maxWidth="md">
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    ??????????????????????????????????????????????????????
                </Alert>
            </Snackbar>
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="error">
                    ???????????????????????????????????????????????????????????????
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
                            ???????????????????????????????????????
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>????????????????????????</p>
                            <TextField
                                id="Code"
                                value={subjects.Code || ""}
                                label="????????????????????????????????????"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>????????????????????????</p>
                            <TextField
                                id="Name"
                                value={subjects.Name || ""}
                                label="????????????????????????????????????"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>????????????????????????</p>
                            <TextField
                                id="Credit"
                                type="number"
                                value={subjects.Credit || ""}
                                label="????????????????????????????????????"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>???????????????????????????????????????</p>
                            <Select native value={subjects.TeacherID + ""} onChange={handleChange} inputProps={{ name: "TeacherID", }}>
                                <option aria-label="None" value="">
                                    ?????????????????????????????????????????????????????????????????????
                                </option>
                                {teachers.map((item: TeachersInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>???????????????????????????</p>
                            <Select native value={subjects.FacultyID + ""} onChange={handleChange} inputProps={{ name: "FacultyID", }}>
                                <option aria-label="None" value="">
                                    ?????????????????????????????????????????????????????????
                                </option>
                                {faculties.map((item: FacultiesInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>????????????????????????</p>
                            <TextField
                                id="Section"
                                type="number"
                                value={subjects.Section || ""}
                                label="???????????????????????????"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>?????????????????????????????????</p>
                            <RadioGroup value={subjects.Day} row onChange={handleChange}>
                                <FormControlLabel value="Mon" control={<Radio />} label="??????????????????" />
                                <FormControlLabel value="Tue" control={<Radio />} label="??????????????????" />
                                <FormControlLabel value="Wed" control={<Radio />} label="?????????" />
                                <FormControlLabel value="Thu" control={<Radio />} label="????????????????????????" />
                                <FormControlLabel value="Fri" control={<Radio />} label="???????????????" />
                                <FormControlLabel value="Sat" control={<Radio />} label="???????????????" />
                                <FormControlLabel value="Sun" control={<Radio />} label="?????????????????????" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>???????????????????????????????????????</p>
                            <Select native value={subjects.TimeID + ""} onChange={handleChange} inputProps={{ name: "TimeID", }}>
                                <option aria-label="None" value="">
                                    ?????????????????????????????????????????????????????????????????????
                                </option>
                                {times.map((item: TimesInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Period}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>????????????????????????????????????????????????</p>
                            <TextField
                                id="Take"
                                type="number"
                                value={subjects.Take || ""}
                                label="?????????????????????????????????????????????????????????????????????(??????)"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={RouterLink} to="/subjects" variant="contained" color="inherit">
                            ????????????
                        </Button>
                        <Button style={{ float: "right" }} onClick={submit} variant="contained" color="primary">
                            ??????????????????
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default SubjectCreate;