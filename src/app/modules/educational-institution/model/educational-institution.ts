import { Administration } from "src/app/shared/models/administration";

export class EducationalInstitution {

    id: number;

    establishmentName: String;

    description: String;

    yearOfFoundation: Date;

    location: String;

    photos: String;

    administration: Administration;

    constructor() {

    }
}
