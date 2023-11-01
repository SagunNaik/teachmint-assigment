import { API_ROUTES } from "../utility/Constants";
import { getData } from "./service";


export const getAllCountries = async () => await getData(API_ROUTES.TIMEZONE, {}, { mode: 'no-cors' }).then(res => res.json());
export const getCurrentTime = async (timezone: string) => await getData(`${API_ROUTES.TIMEZONE}/${timezone}`, {}, { mode: 'no-cors' }).then(res => res.json());