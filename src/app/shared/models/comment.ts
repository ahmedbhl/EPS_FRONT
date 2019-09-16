import { User } from './user.class';
import { Post } from './post';

export class Comment {

    id: number;

    type: String;

    message: String;

    commentDate: string;

    user: User;

    post: Post;

    constructor() { }

}
