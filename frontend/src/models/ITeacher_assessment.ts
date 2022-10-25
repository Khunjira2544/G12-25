import { StudentInterface } from "./IStudent";
import { TeachersInterface } from "./ITeacher";
import { Teaching_durationsInterface } from "./ITeaching_duration";
import { Content_difficulty_levelsInterface } from "./IContent_difficulty_level";
import { Content_qualitysInterface } from "./IContent_quality";

export interface Teacher_assessmentsInterface {
    ID?: number; 
    Comment?: string;

    //Timestamp?: Date | null;
    Student?: StudentInterface;
    StudentID?: number;     // foreignkey.ID?
    Teacher?: TeachersInterface;
    TeacherID?: number;     // foreignkey.ID?
    Teaching_duration?: Teaching_durationsInterface;
    Teaching_durationID?: number;     // foreignkey.ID?
    Content_difficulty_level?: Content_difficulty_levelsInterface;
    Content_difficulty_levelID?: number;     // foreignkey.ID?
    Content_quality?: Content_qualitysInterface;
    Content_qualityID?: number;     // foreignkey.ID?
   

    
}
