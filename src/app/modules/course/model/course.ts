import { User } from 'src/app/shared/models/user.class';
import { Classe } from '../../classe/model/Classe';

export class Course {
    id: number;

    courseName: String;

    description: String;

    classe: Classe;

    professor: User;
}
