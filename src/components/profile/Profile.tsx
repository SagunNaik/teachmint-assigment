import { useContext, useEffect, useState } from "react";
import { appContext } from "../../store/app/app-context";
import { isArray } from "../../utility/helper";
import { userContext, defaultExtendedUser } from "../../store/user/user-context";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "../UI/navbar/Navbar";
import { Paths, defaultPost } from "../../utility/Constants";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import { Post } from "../../interfaces/post.interface";


const Profile = () => {

    //****** ALL STATES HERE ********/
    const [selectedPost, setSelectedPost] = useState<Post>(defaultPost);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    //****** ALL CONTEXT HERE ********/
    const { loader, showLoader } = useContext(appContext)
    const { user = { ...defaultExtendedUser } } = useContext(userContext)

    //****** ALL VARIABLES HERE ********/
    const navigate = useNavigate()

    let { userId = '' } = useParams();

    const userAddress = `${user.address.street}, ${user.address.city}, ${user.address.suite}, ${user.address.zipcode}`;

    //****** ALL METHODS HERE ********/
    const onInit = async () => {
        try {
            showLoader(true);

            if (userId === '' || user.id === 0) {
                navigate(Paths.USERS, { replace: true });
            }

            showLoader(false);
        } catch (error) {
            showLoader(false);
        }

    }

    const handleCardClick = (post: Post) => (e: any) => {
        e.preventDefault();
        setIsModalVisible(true);
        setSelectedPost(post);
    }

    const handleOnModalClose = () => {
        setIsModalVisible(false);
        setSelectedPost(defaultPost);
    }

    //****** ALL USE EFFECTS HERE ********/

    useEffect(() => {
        onInit();
        // eslint-disable-next-line
    }, []);

    return !loader && user.id !== 0 ? <>
        <Navbar />
        <div className="p-2 p-md-4 ">
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <h2> Profile Page</h2>
                </div>
            </div>

            <div className="card h-100 shadow mt-2 mt-md-3 p-3 rounded-4 border border-secondary">
                <div className="card-body ">
                    <div className="row">
                        <div className="col-6">{user.name}</div>
                        <div className="col-6">{userAddress}</div>
                        <div className="col-6 mt-1 mt-md-2">{`${user.username} | ${user.company.catchPhrase}`}</div>
                        <div className="col-6 mt-1 mt-md-2">{`${user.email} | ${user.phone}`}</div>
                    </div>
                </div>
            </div>

            <div className="row mt-2 mt-md-3 row-cols-1 row-cols-md-3 g-4">

                {
                    isArray(user?.posts) ? user.posts?.map(post => <div
                        className="col pointer"
                        key={post.id}
                        onClick={handleCardClick(post)}
                    >

                        <Card data={post} />

                    </div>)
                        : <></>
                }

            </div>
        </div>
        <Modal show={isModalVisible} onClose={handleOnModalClose}>
            <div className="card border-0">
                <button type="button" className="btn-close end-0 position-absolute" onClick={handleOnModalClose}></button>
                <div className="card-body">
                    <h5 className="card-title">{selectedPost.title}</h5>
                    <p className="card-text overflow-auto max-vh-75">{selectedPost.body}</p>
                </div>
            </div>
        </Modal>
    </> : <div className="p-2 p-md-4 ">
        <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <h4> No User data available</h4>
            </div>
            <div className="col-12 d-flex justify-content-center">
                <NavLink to={Paths.USERS}>Home</NavLink>
            </div>
        </div>
    </div>
}

export default Profile;