import { API_ROUTES } from "../utility/Constants";
import { getData } from "./service";


export const getAllUsers = async () => await getData(API_ROUTES.USERS).then(res => res.json());
export const getAllPost = async () => await getData(`${API_ROUTES.POSTS}`).then(res => res.json());
export const getPostByUser = async (userId: string) => await getData(`${API_ROUTES.POSTS}?userId=${userId}`).then(res => res.json());