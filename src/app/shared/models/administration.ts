import { Role } from "./role";

export class Administration {

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
