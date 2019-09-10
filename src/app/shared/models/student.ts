import { EducationalInstitution } from 'src/app/modules/educational-institution/model/educational-institution';
import { Role } from './role';

export class Student {

    id: number;
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    roles: Role;
    dateOfRegistration: String;
    phoneNumber: String;
    profilePicture: String;
    establishment: EducationalInstitution;
    address: String;
    enabled: boolean;

    constructor() { }

}
