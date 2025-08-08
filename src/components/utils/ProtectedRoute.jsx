import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({component, path}) => {
    const user = useSelector(i => i.isLoggedIn);

    if(!user) {
        return <Redirect to="/" />
    }
 return <Route path={path} component={component} />;

};

export default ProtectedRoute;