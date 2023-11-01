import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
    children?: React.ReactNode;
}

interface IState {
    hasError: boolean;
}

const defaultState: IState = {
    hasError: false
}

export class ErrorBoundary extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = defaultState;
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        console.error(error)
        console.error(errorInfo)
    }

    render() {

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div
                className="container"

            >
                <h4>Something went Wrong!!!! Please after sometime or you can navigate to home or refresh page  </h4>

                <NavLink
                    to="/"
                    className={"btn btn-primary"}
                >
                    Home
                </NavLink>;


            </div>
        }

        return this.props.children;
    }
}