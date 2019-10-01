import { Administration } from 'src/app/shared/models/administration';
import { Professor } from 'src/app/shared/models/professor';
import { Student } from 'src/app/shared/models/student';

export class EducationalInstitution {

    id: number;

    establishmentName: String;

    description: String;

    yearOfFoundation: string;

    location: String;

    photos: String;

    administration: Administration;

    professors: Professor[];

    students: Student[];

    constructor() {

    }
}
