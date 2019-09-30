import { User } from 'src/app/shared/models/user.class';
import { Post } from 'src/app/shared/models/post';

export class Group {
    id: number;

    groupName: string;

    description: string;

    hashCode: string;

    posts: Post[];

    professors: User[];

    students: User[];
}
