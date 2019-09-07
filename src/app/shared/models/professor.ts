import { Role } from './role';

export class Professor {

    id: number;
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    roles: Role;
    dateOfRegistration: String;
    phoneNumber: String;
    profilePicture: String;
    address: String;
    enabled: boolean;

    constructor() { }

}
