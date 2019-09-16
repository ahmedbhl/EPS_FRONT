import { Group } from 'src/app/modules/group/model/group';
import { Comment } from './comment';
import { Like } from './like';
import { User } from './user.class';

export class Post {

    id: number;

    type: String;

    description: String;

    group: Group;

    user: User;

    comments: Comment[];

    like: Like[];

    constructor() { }

}
