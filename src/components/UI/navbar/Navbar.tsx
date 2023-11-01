import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DAYS, MOKE_TIMEZONE_DATA, Paths } from "../../../utility/Constants";
import { appContext } from "../../../store/app/app-context";
import { getAllCountries, getCurrentTime } from "../../../services/timezon.service";
import { isArray } from "../../../utility/helper";
import { ITimezone } from "../../../interfaces/timezone.interface";

const CLIENT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
const Navbar = () => {

    //****** ALL STATES HERE ********/
    const [localTimezones, setLocalTimezones] = useState<string[]>([]);
    const [selectedLocalTimezone, setSelectedLocalTimezone] = useState<string>(CLIENT_TIMEZONE);
    const [localTime, setLocalTime] = useState<Date>(new Date());
    const [isPaused, setIsPaused] = useState<boolean>(false);


    //****** ALL CONTEXT HERE ********/
    const { showLoader } = useContext(appContext)

    //****** ALL METHODS HERE ********/
    const onInit = async () => {
        try {
            showLoader(true);

            const timezones: string[] = await getAllCountries();


            if (isArray(timezones)) {
                setLocalTimezones(timezones);
            }
            showLoader(false);

        } catch (error) {

            showLoader(false);

            //for Testing purpose only
            setLocalTimezones(MOKE_TIMEZONE_DATA)

        }
    }

    //Get Time 
    const updateTime = () => {
        const newDate = new Date(localTime);
        newDate.setSeconds(newDate.getSeconds() + 1)
        setLocalTime(newDate);
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        const { value = '' } = e?.target;

        if (value) {
            setSelectedLocalTimezone(value);
        }

    }

    //****** ALL USE EFFECTS HERE ********/
    useEffect(() => {
        const fetch = async () => {

            try {
                const time: ITimezone = await getCurrentTime(selectedLocalTimezone);

                if (time) {
                    setLocalTime(new Date(time.datetime));
                }
            } catch (error) {

            }


        }
        if (selectedLocalTimezone !== "") {
            fetch();
        }
    }, [selectedLocalTimezone]);

    useEffect(() => {
        onInit();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                updateTime()
            }
        }, 1000);

        return () => clearInterval(interval);
    });

    return <div className=" row navbar-light bg-light m-2 navbar">
        <div className="col-2">
            <NavLink className="btn btn-primary btn-sm " to={Paths.USERS} replace={true}><i className="bi bi-arrow-left px-1" />Back</NavLink>
        </div>

        <div className="col-10 d-flex  ">
            <div className="col-6 d-flex">
                <select
                    value={selectedLocalTimezone}
                    defaultValue={selectedLocalTimezone}
                    onChange={handleChange}
                    className="form-select form-select-sm">
                    {isArray(localTimezones) ? localTimezones.map(timezone => <option
                        value={timezone}
                        key={timezone}
                        className="dropdown-item"
                    >{timezone}</option>)
                        : <></>

                    }
                </select>
            </div>
            <div className="d-sm-none d-md-flex col-md-1  "></div>

            <div className="col-3 text-align-center bg-dark rounded-4">
                <div className="d-inline-grid font-monospace small">
                    <span className="text-white font-small">{`${localTime.toLocaleDateString()} ${DAYS[localTime.getDay()]}`}</span>
                    <span className="text-white font-small">{localTime.toLocaleTimeString()}</span>
                </div>
            </div>
            <div className="col-2 text-align-end">
                <button
                    className="btn btn-success btn-sm"
                    onClick={(e: any) => {
                        setIsPaused(prev => !prev);
                    }}
                >{isPaused ? <><i className="bi bi-play-fill px-1" />Start</> : <><i className="bi bi-pause-fill px-1" />Pause</>}</button>
            </div>

        </div>


    </div>
}

export default Navbar;