import { FC } from "react";


interface Iprops {
    showLoader: boolean;
}

const PageLoader: FC<Iprops> = ({ showLoader }) => {

    return showLoader ? <div className="position-absolute top-50 start-50 translate-middle">
        <div className="d-flex justify-content-center text-primary">
            <div className="spinner-border" role="status" />
        </div>
    </div>
        : <></>

}

export default PageLoader;