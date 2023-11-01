import { Post } from "../../interfaces/post.interface";
import { User } from "../../interfaces/user.interface";

export interface ExtendedUser extends User {
    totalPost?: number;
    posts?: Post[]
}