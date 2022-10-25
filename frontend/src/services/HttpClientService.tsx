import React from "react";
//import { SigninInterface } from "../models/ISignin";
import { OfficersInterface } from "../models/IOfficer";
import { RegistrationInterface } from "../models/IRegistration";
import { SigninInterface } from "../models/ISignin";
import { StudentInterface } from "../models/IStudent";
import { SubjectsInterface } from "../models/ISubject";
import { TeachersInterface } from "../models/ITeacher";
import { Teacher_assessmentsInterface } from "../models/ITeacher_assessment";

const apiUrl = "http://localhost:8080";

async function Login(data: SigninInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/login`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("uid", res.data.id);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

// อาจจะต้องมี2อัน
async function GetStudent() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/students`, requestOptions) //////////
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetOfficers() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/officers`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetBills() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json", 
            },
    };

    let res = await fetch(`${apiUrl}/bills`, requestOptions)
    .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });
    return res;
};

async function GetTeachers() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/teachers`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetFaculty() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/facultys`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetCollegeyear() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/collegeyear`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetOfficerByUID() {
    let uid = localStorage.getItem("uid");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token11")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/officer/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

// อาจจะต้องลบออก
async function CreateOfficer(data: OfficersInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/officers/create`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function Student(data: StudentInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/students/create`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//วิชา
//อาจจะต้องมี2อัน
async function GetSubjects() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/subjects`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetTime() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/times`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}


async function Subjects(data: SubjectsInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/subjects`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//T
async function GetOnlyOfficer() {
    const uid = localStorage.getItem("uid");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/officers/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetEducational() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/educationnals`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetPrefix() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/prefixes`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function CreateTeacher(data: TeachersInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/teachers`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//ประเมิณอาจารย์ ของภีม
async function Login1(data: StudentInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/login1`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                localStorage.setItem("token1", res.data.token1);
                localStorage.setItem("uid", res.data.id);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}


async function GetOnlyStudent() {
    const uid = localStorage.getItem("uid");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/students/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//อาจะต้องมี 2 อัน
async function GetTeacher() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/teachers`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetTeaching_duration() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/Teaching_durations`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetContent_difficulty_level() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/Content_difficulty_levels`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetContent_quality() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/Content_qualitys`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetTeacher_assessments() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    let res = await fetch(`${apiUrl}/Teacher_assessments`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function CreateTeacher_assessment(data: Teacher_assessmentsInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/Teacher_assessments`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//services/http
async function GetRegistration() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/registrations`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function GetState() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/states`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

async function CreateRegistration(data: RegistrationInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/registrations`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}





export {
    Login,
    GetOfficers,
    GetTeachers,
    GetStudent,
    GetFaculty,
    GetSubjects,
    GetCollegeyear,
    CreateOfficer,
    Student,
    GetOfficerByUID,
    
    GetTime,
    Subjects,

    GetOnlyOfficer,
    GetEducational,
    GetPrefix,
    CreateTeacher,

    Login1,
    GetTeacher_assessments,
    //GetStudent,
    GetTeacher,
    GetTeaching_duration,
    GetContent_difficulty_level,
    GetContent_quality,
    CreateTeacher_assessment,

    GetRegistration,
    GetState,
    CreateRegistration,
    GetOnlyStudent,
    GetBills,
};