import React, { useState, FC } from "react";
import { defaultExtendedUser, userContext } from "./user-context";
import { ExtendedUser } from "./user-context.interface";

interface IProps {
    children?: React.ReactNode;
}



const UserContextProvider: FC<IProps> = ({ children }) => {

    const [user, setUser] = useState<ExtendedUser>(defaultExtendedUser)


    return <userContext.Provider
        value={{
            updateUser: (data: ExtendedUser) => setUser(data),
            user: user
        }}
    >
        {children}
    </userContext.Provider>
}

export default UserContextProvider;