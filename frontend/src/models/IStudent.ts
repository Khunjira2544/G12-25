import { FacultiesInterface } from "./IFaculty";
import { OfficersInterface } from "./IOfficer";
import { TeachersInterface } from "./ITeacher";
import { CollegeyearInterface } from "./ICollegeyear";

export interface StudentInterface {
    ID?: number;
    S_ID?: string;
    Name?: string;
    Gpax?: GLfloat;
    Date_of_birth?: string;
    Phone?: string;
    Parent?: string;
    Password?: string;

    Teacher?: TeachersInterface;
    TeacherID?: number;     // foreignkey.ID?

    Collegeyear?: CollegeyearInterface; 
    CollegeyearID?: number;     // foreignkey.ID?

    Faculty?: FacultiesInterface;
    FacultyID?: number; // foreignkey.ID?

    Officer?: OfficersInterface;
    OfficerID?: number;  // foreignkey.ID?
}