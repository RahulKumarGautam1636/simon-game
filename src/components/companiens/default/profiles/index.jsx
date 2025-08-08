import { navigateToProfile } from "../utilities";
import { connect } from "react-redux";


const Profile = ({ userInfo, match }) => {

    return navigateToProfile(userInfo.UserLevelSeq, match);

}

const mapStateToProfile = (state) => {
    return { userInfo: state.userInfo }
}

export default connect(mapStateToProfile, {})(Profile);