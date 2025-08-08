import { modalAction } from "../../../../actions";
import { navigateToDashboard } from "../utilities";
import { connect } from "react-redux";


const Dashboard = ({ userInfo, isLoggedIn, modalAction }) => {

    
    // if (!isLoggedIn) {                                           // now handled by ProtectedRoute.
    //    modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT.level});
    //    return;
    // };
    return navigateToDashboard(userInfo.UserLevelSeq);

}

const mapStateToDashboard = (state) => {
    return { userInfo: state.userInfo, isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateToDashboard, {modalAction})(Dashboard);