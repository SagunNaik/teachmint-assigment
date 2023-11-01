import { API_METHOD, HEADERS } from "../utility/Constants"


export const getData = (url: string, headers = {}) => {
    return fetch(url, {

        method: API_METHOD.GET,
        headers: {
            ...HEADERS,
            ...headers
        }
    }).then(res => res)
}

export const postData = (url: string, headers = {}, body: string) => {
    return fetch(url, {

        method: API_METHOD.POST,
        headers: {
            ...HEADERS,
            ...headers
        },
        body
    }).then(res => res)
}

export const patchData = (url: string, headers = {}, body: string) => {
    return fetch(url, {

        method: API_METHOD.PATCH,
        headers: {
            ...HEADERS,
            ...headers
        },
        body
    }).then(res => res)
}

export const putData = (url: string, headers = {}) => {
    return fetch(url, {

        method: API_METHOD.PUT,
        headers: {
            ...HEADERS,
            ...headers
        }
    }).then(res => res)
}

