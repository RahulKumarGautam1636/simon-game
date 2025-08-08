import { connect } from "react-redux";
import { modalAction } from "../../../../actions";
import { useHistory } from "react-router-dom";

const OrderSuccessModal = ({ modalAction }) => {

    const history = useHistory();

    return (
        <div className="user-info-modal order-success-modal">
            {/* <i className='bx bx-x-circle close-custom-modal' onClick={() => modalAction('ORDER_SUCCESS_MODAL', false)}></i> */}
            <video loading="lazy" muted="muted" src="/assets/img/ePharma/delivery.mp4" type="video/mp4" autoPlay="autoplay" loop="loop"></video>
            <h3>Order Successfully Placed !</h3>
            <div className="cart-buttons">
                <button onClick={() => {history.push('/'); modalAction('ORDER_SUCCESS_MODAL', false)}} className="button">Back to Home</button>
                <button onClick={() => {history.push('/myOrders'); modalAction('ORDER_SUCCESS_MODAL', false)}} className="button">Your Orders</button>
            </div>
        </div>
    )
}

const mapStateToLoginModal = (state) => {
    return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo };
}

export default connect(mapStateToLoginModal, {modalAction})(OrderSuccessModal);