import { EducationalInstitution } from 'src/app/modules/educational-institution/model/educational-institution';

/**
 * Current User Class
 */
export class User {

    id: number;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    address: string;
    credentials: string;
    credentialsNonExpired: boolean;
    dateOfRegistration: string;
    email: string;
    enabled: boolean;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profilePicture: string;
    establishment: EducationalInstitution;
    /**
     * User assigned roles
     */
    authorities: string[] = [];
    /**
    * User assigned roles
    */
    roles: any[] = [];
}
