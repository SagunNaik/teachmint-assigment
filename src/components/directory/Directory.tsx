import { useContext, useEffect, useState } from "react";
import { ExtendedUser } from "../../store/user/user-context.interface";
import { appContext } from "../../store/app/app-context";
import { getAllPost, getAllUsers } from "../../services/user.service";
import { isArray } from "../../utility/helper";
import { Post } from "../../interfaces/post.interface";
import { User } from "../../interfaces/user.interface";
import { userContext } from "../../store/user/user-context";
import { useNavigate } from "react-router-dom";


const Directory = () => {

    //****** ALL STATES HERE ********/
    const [users, setUsers] = useState<ExtendedUser[]>([]);

    //****** ALL CONTEXT HERE ********/
    const { loader, showLoader } = useContext(appContext)
    const { updateUser } = useContext(userContext)

    //****** ALL VARIABLES HERE ********/
    const navigate = useNavigate()


    //****** ALL METHODS HERE ********/
    const onInit = async () => {
        try {
            showLoader(true);

            const users: User[] = await getAllUsers();

            if (isArray(users)) {
                const allPost: Post[] = await getAllPost() || [];

                if (isArray(allPost)) {

                    const extendedUsers: ExtendedUser[] = users.map(user => {

                        const totalPost = allPost.filter(post => post.userId === user.id)
                        return {
                            ...user,
                            totalPost: totalPost.length,
                            posts: totalPost
                        }
                    });

                    isArray(extendedUsers) ? setUsers(extendedUsers) : setUsers([]);
                }
            }

            showLoader(false);
        } catch (error) {
            showLoader(false);
        }


    }

    const handleRowClick = (user: ExtendedUser) => (e: any) => {
        e.preventDefault();
        updateUser(user);
        navigate(`/user/${user.id}`, { replace: true });
    }

    //****** ALL USE EFFECTS HERE ********/

    useEffect(() => {
        onInit();
        // eslint-disable-next-line
    }, []);

    return !loader ? <div className="p-2 ">
        <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <h1> Directory</h1>
            </div>
        </div>
        <div className="row mt-md-3 mt-2">
            {
                isArray(users) ? users.map(user => <div
                    className="col-12 d-flex border col-12 p-2 p-md-3 rounded-2 mb-3 pointer border-secondary bg-primary-subtle"
                    key={user.id}
                    onClick={handleRowClick(user)}
                >
                    <div className="col-8"><span>Name: {user.name}</span></div>
                    <div className="col-4 d-flex justify-content-end"><span>Post: {user.totalPost}</span></div>
                </div>
                )
                    : <div className="col-12">
                        <span>Currently no users available</span>
                    </div>
            }
        </div>
    </div> : <></>
}

export default Directory;