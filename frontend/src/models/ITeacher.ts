import { EducationalInterface } from "./IEducational";
import { FacultiesInterface } from "./IFaculty";
import { OfficersInterface} from "./IOfficer"
import { PrefixInterface } from "./IPrefix";


export interface TeachersInterface {
    ID?: number,
    Name?: string;
    Email?:         string ;
	Password?:	string;
	Officer_ID ?:    number;
	Officer ?: OfficersInterface;
	Faculty_ID ?:    number;
	Faculty ?: FacultiesInterface;
	Prefix_ID?:    number;
	Prefix?: PrefixInterface;
	Educational_ID?:    number;
	Educational?: EducationalInterface;

   }