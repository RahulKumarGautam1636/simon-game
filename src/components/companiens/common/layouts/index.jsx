import { connect } from "react-redux";
import { AppLayout } from "./appLayout";
import { AuthLayout } from "./authLayout";
import { useHistory } from "react-router-dom";

const Layout = ({ children, isLoading, isLoggedIn }) => {

    const history = useHistory();
    
    // return isLoggedIn ? <AppLayout isLoading={isLoading} /> : AuthLayout;
    if (isLoggedIn) {
        return (
            <AppLayout isLoading={isLoading} history={history}>
                {children}
            </AppLayout>
        )
    } else {
        return (
            <AuthLayout history={history}>
                {children}
            </AuthLayout>
        )
    }

};

const mapStateToProps = (state) => {
  return { isLoading: state.isLoading, isLoggedIn: state.isLoggedIn };
}

export default connect(mapStateToProps, {})(Layout);
