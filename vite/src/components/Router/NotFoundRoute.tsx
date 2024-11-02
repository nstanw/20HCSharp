import { Component } from "react";
import { Navigate, Route } from "react-router-dom";

export class NotFoundRoute extends Component {
    render() {
        return (
            <>
                <Route element={<Navigate to={{ pathname: "/exception?type=404" }} />} />
            </>
        );
    }
}

export default NotFoundRoute;
