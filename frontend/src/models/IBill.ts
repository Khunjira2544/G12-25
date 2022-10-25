//Bill ของเพื่อน
import { PaymentsInterface } from "./IPayment"; //FK
import { OfficersInterface } from "./IOfficer";
import {StudentInterface} from "./IStudent";
import {RegistrationInterface} from "./IRegistration";

export interface BillsInterface {


    Bill_ID: number;

    Student: StudentInterface;
    StudentID: number,

    Registration?: RegistrationInterface;
    RegistrationID?: number,
 	
    //การรับ FK ของ Interface
    Payment_ID:  string,
    Payment: PaymentsInterface
	
    Datetimepay: string;
    Total: number,
    
    Officer?: OfficersInterface;
    OfficerID?: number;  // foreignkey.ID?
	
}
   
   