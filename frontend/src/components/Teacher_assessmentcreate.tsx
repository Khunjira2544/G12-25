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
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { StudentInterface } from "../models/IStudent";
import { TeachersInterface } from "../models/ITeacher";
import { Teaching_durationsInterface } from "../models/ITeaching_duration";
import { Content_difficulty_levelsInterface } from "../models/IContent_difficulty_level";
import { Content_qualitysInterface } from "../models/IContent_quality";
import { Teacher_assessmentsInterface } from "../models/ITeacher_assessment";


import {
  GetOnlyStudent,
  GetTeacher,
  GetTeaching_duration,
  GetContent_difficulty_level,
  GetContent_quality,
  CreateTeacher_assessment,
} from "../services/HttpClientService";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Teacher_assessmentCreate() {
  const [student, setStudent] = useState<StudentInterface>({});
  const [Teachers, setTeachers] = useState<TeachersInterface[]>([]);
  const [Teaching_durations, setTeaching_durations] = useState<Teaching_durationsInterface[]>([]);
  const [Content_difficulty_levels, setContent_difficulty_levels] = useState<Content_difficulty_levelsInterface[]>([]);
  const [Content_qualitys, setContent_qualitys] = useState<Content_qualitysInterface[]>([]);
  const [Teacher_assessment, setTeacher_assessments] = useState<Partial<Teacher_assessmentsInterface>>({});

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
    const name = event.target.name as keyof typeof Teacher_assessment;
    const value = event.target.value;
    setTeacher_assessments({
      ...Teacher_assessment,
      [name]: value,
    });
    console.log(`${name}: ${value}`);
  };

  const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
    const id = event.target.id as keyof typeof Teacher_assessment;
    const { value } = event.target;
    setTeacher_assessments({ ...Teacher_assessment, [id]: value });
};

  const getStudent = async () => {
    let res = await GetOnlyStudent();
    Teacher_assessment.StudentID = res.ID
    if (res) {
      setStudent(res);
      console.log(res);
    }
  };
  const getTeacher = async () => {
    let res = await GetTeacher();
    if (res) {
      setTeachers(res);
      console.log(res);
    }
  };

  const getTeaching_duration = async () => {
    let res = await GetTeaching_duration();
    if (res) {
      setTeaching_durations(res);
      console.log(res);
    }
  };
  const getContent_difficulty_level = async () => {
    let res = await GetContent_difficulty_level();
    if (res) {
      setContent_difficulty_levels(res);
      console.log(res);
    }
  };
  const getContent_quality = async () => {
    let res = await GetContent_quality();
    if (res) {
      setContent_qualitys(res);
      console.log(res);
    }
  };

  useEffect(() => {
    getStudent();
    getTeacher();
    getTeaching_duration();
    getContent_difficulty_level();
    getContent_quality();

  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      Student_ID: convertType(Teacher_assessment.StudentID),
      Teacher_ID: convertType(Teacher_assessment.TeacherID),
      Teaching_duration_ID: convertType(Teacher_assessment.Teaching_durationID),
      Content_difficulty_level_ID: convertType(Teacher_assessment.Content_difficulty_levelID),
      Content_quality_ID: convertType(Teacher_assessment.Content_qualityID),
      Comment: Teacher_assessment.Comment,

    };
    console.log("data");
    console.log(data);
    let res = await CreateTeacher_assessment(data);
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
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>????????????????????????????????????</p>
              <Select
                native

                value={Teacher_assessment.StudentID + ""}
                onChange={handleChange}
                disabled
                inputProps={{
                  name: "StudentID",
                }}
              >
                <option aria-label="None" value="">
                  ???????????????????????????????????????????????????
                </option>
                <option value={student?.ID} key={student?.ID}>
                  {student?.S_ID}
                </option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>???????????????????????????????????????</p>
              <Select
                native
                value={Teacher_assessment.TeacherID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "TeacherID",
                }}
              >
                <option aria-label="None" value="">
                  ?????????????????????????????????????????????????????????????????????
                </option>
                {Teachers.map((item: TeachersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>????????????????????????????????????????????????</p>
              <Select
                native
                value={Teacher_assessment.Teaching_durationID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "Teaching_durationID",
                }}
              >
                <option aria-label="None" value="">
                  ???????????????????????????????????????????????????
                </option>
                {Teaching_durations.map((item: Teaching_durationsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Description}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>??????????????????????????????????????????????????????????????????</p>
              <Select
                native
                value={Teacher_assessment.Content_difficulty_levelID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "Content_difficulty_levelID",
                }}
              >
                <option aria-label="None" value="">
                  ???????????????????????????????????????????????????
                </option>
                {Content_difficulty_levels.map((item: Content_difficulty_levelsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Description}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>????????????????????????????????????????????????</p>
              <Select
                native
                value={Teacher_assessment.Content_qualityID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "Content_qualityID",
                }}
              >
                <option aria-label="None" value="">
                  ???????????????????????????????????????????????????
                </option>
                {Content_qualitys.map((item: Content_qualitysInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Description}
                  </option>

                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>????????????????????????????????????????????????????????????</p>
              <TextField
                id="Comment"
                value={Teacher_assessment.Comment || ""}
                label="?????????????????????????????????????????????"
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/teacher_assessments"
              variant="contained"
              color="inherit"
            >
              ????????????
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              ??????????????????
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Teacher_assessmentCreate;