import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Paths } from "../utility/Constants";

const DirectoryLazyLoading = React.lazy(() => import("../components/directory/Directory"));
const ProfileLazyLoading = React.lazy(() => import("../components/profile/Profile"));

const NotFoundLazyLoading = React.lazy(() => import("../pages/PageNotFound"))


const Router = () => {
    const { DEFAULT, USERS, USER } = Paths;

    return (
        <Routes>

            <Route path={DEFAULT} element={<Navigate replace to={USERS} />} />

            <Route path={USERS} element={<DirectoryLazyLoading />} />
            <Route path={USER} element={<ProfileLazyLoading />} />

            <Route path="*" element={<NotFoundLazyLoading />} />
        </Routes>
    );
};


export default Router;
