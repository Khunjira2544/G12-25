//Bill ของเพื่อน
import { PaymentsInterface } from "./IPayment"; //FK

export interface BillsInterface {


    Bill_ID: number;
    Bill_StudentID: string;
    Bill_RegistrationID: string;
    Total: number;
 	
    //การรับ FK ของ Interface
    Payment_ID:  string,
    Payment: PaymentsInterface
	
    Datetimepay: string;
    Bill_OfficerID: String;
	
}
   
   