import { API_ROUTES } from "../utility/Constants";
import { getData } from "./service";

const options = {
    redirect: 'follow'
}

export const getAllCountries = async () => await getData(API_ROUTES.TIMEZONE, {}, options).then(res => res.json());
export const getCurrentTime = async (timezone: string) => await getData(`${API_ROUTES.TIMEZONE}/${timezone}`, {}, options).then(res => res.json());
