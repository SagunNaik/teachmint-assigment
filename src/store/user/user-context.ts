import React from "react";
import { ExtendedUser } from "./user-context.interface"


export const defaultExtendedUser: ExtendedUser = {
    totalPost: 0,
    posts: [],
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
            lat: 0,
            lng: 0
        }
    },
    phone: "",
    website: "",
    company: {
        name: "",
        catchPhrase: "",
        bs: ""
    }
}

export const userContext = React.createContext({
    user: { ...defaultExtendedUser },
    updateUser: (data: ExtendedUser) => { },

});
