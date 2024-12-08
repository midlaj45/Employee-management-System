
import { Department } from './department';

export class Employee {
  id?: number;
  firstName?: string;
  lastName?: string;
  emailId?: string;
  phoneNumber?: string;
  department?: Department;  // Change from string to Department object
  role?: string;
  isDeleted?:boolean;
   
}

