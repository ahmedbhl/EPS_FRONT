import { Comment } from './comment';
import { Like } from './like';
import { User } from './user.class';

export class Post {

    id: number;

    type: String;

    description: String;

    postPicture: String;

    postDate: string;

    user: User;

    comments: Comment[];

    likes: Like[];

    constructor() { }

}
