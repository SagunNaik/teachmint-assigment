import { API_ROUTES } from "../utility/Constants";
import { getData } from "./service";


export const getAllCountries = async () => await getData(API_ROUTES.TIMEZONE).then(res => res.json());
export const getCurrentTime = async (timezone: string) => await getData(`${API_ROUTES.TIMEZONE}/${timezone}`).then(res => res.json());