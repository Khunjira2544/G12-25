import {StudentInterface} from "./IStudent";
import {SubjectsInterface} from "./ISubject";
import {StateInterface} from "./IState";

export interface RegistrationInterface {
    ID?: number,
    Subject?: SubjectsInterface,
    SubjectID?: number,
    Student?: StudentInterface;
    StudentID?: number,
    State?: StateInterface;
    StateID?: number,

}