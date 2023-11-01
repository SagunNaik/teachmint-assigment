import { FC } from "react";
import { Post } from "../../../interfaces/post.interface";

interface ICardProp {
    data: Post;
}

const defaultPost: Post = {
    userId: 0,
    id: 0,
    title: "",
    body: ""
}

const Card: FC<ICardProp> = ({ data = defaultPost }) => {



    return <div className="card h-100 shadow">
        <div className="card-body ">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.body}</p>
        </div>
    </div>

};

export default Card;