import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss';

interface IBackdropProps {
    children?: ReactNode;
    onClose: () => void;
}

export const Backdrop: FC<IBackdropProps> = ({ children, onClose }) => {

    return <div className={"backdrop"} onClick={onClose}></div>
}


interface IModelOverlayProps {
    children?: ReactNode;
    onClose: () => void;
}
const ModelOverlay: FC<IModelOverlayProps> = ({ children, onClose }) => {

    return <div className={"modal d-flex"}>
        {children}
    </div>
}

interface IModalProps {
    children?: ReactNode;
    show: boolean;
    onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, show = false, onClose }) => {

    return show ? <React.Fragment>
        {
            ReactDOM.createPortal(<Backdrop onClose={onClose} />, document.getElementById('backdrop-root')!)
        }
        {
            ReactDOM.createPortal(<ModelOverlay onClose={onClose} > {children}</ModelOverlay>
                , document.getElementById('overlay-root')!)
        }
    </React.Fragment> : <></>
}

export default Modal;