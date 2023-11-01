import { FC } from "react";

interface Iprops {
    showLoader: boolean;
}

const ButtonLoader: FC<Iprops> = ({ showLoader }) => {

    return showLoader ? <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true" />
        : <></>
}

export default ButtonLoader;