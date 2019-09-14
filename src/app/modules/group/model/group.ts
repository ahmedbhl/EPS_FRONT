import { User } from 'src/app/shared/models/user.class';

export class Group {
    id: number;

    groupName: String;

    description: String;

    hashCode: String;

    // posts: Post[];

    professors: User;

    students: User;
}
