import { User } from "src/app/shared/models/user.class";

export interface Message {
    message: string;
    userFrom: User;
    userTo: User;
    messagedate: string;
}
