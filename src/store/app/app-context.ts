
import React from "react";
import { ITimezone } from "../../interfaces/timezone.interface";

export const defaultTimeZones: string[] = [];
export const defaultTimeZone: ITimezone = {
    abbreviation: "",
    client_ip: "",
    datetime: "",
    day_of_week: 0,
    day_of_year: 0,
    dst: false,
    dst_from: undefined,
    dst_offset: 0,
    dst_until: undefined,
    raw_offset: 0,
    timezone: "",
    unixtime: 0,
    utc_datetime: "",
    utc_offset: "",
    week_number: 0
};

export const appContext = React.createContext({
    loader: false,
    showLoader: (data: boolean) => { },
    timezones: defaultTimeZones,
    updateTimezonesData: (data: string[]) => { },
    selectedTimezone: defaultTimeZone,
    updateSelectedTimezoneData: (data: ITimezone) => { }

});