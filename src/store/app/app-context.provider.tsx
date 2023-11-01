import React, { useState, FC } from "react";
import { appContext, defaultTimeZone } from "./app-context";
import PageLoader from "../../components/UI/Loaders/PageLoader";
import { ITimezone } from "../../interfaces/timezone.interface";

interface IProps {
    children?: React.ReactNode;
}

const AppContextProvider: FC<IProps> = ({ children }) => {

    const [loader, setLoader] = useState<boolean>(false)
    const [timezone, setTimezone] = useState<string[]>([])
    const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(defaultTimeZone)


    return <appContext.Provider
        value={
            {
                loader: loader,
                showLoader: (loader: boolean) => setLoader(loader),
                timezones: timezone,
                updateTimezonesData: (data: string[]) => setTimezone(data),
                selectedTimezone,
                updateSelectedTimezoneData: (data: ITimezone) => setSelectedTimezone(data)
            }
        }
    >
        <div className='container'>
            <PageLoader showLoader={loader} />
            {children}
        </div>
    </appContext.Provider>
}

export default AppContextProvider;