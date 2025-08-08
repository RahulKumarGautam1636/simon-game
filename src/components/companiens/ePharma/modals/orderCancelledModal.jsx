import { connect } from "react-redux";
import { modalAction } from "../../../../actions";
import { useHistory } from "react-router-dom";

const OrderCancelledModal = ({ modalAction }) => {

    const history = useHistory();

    return (
        <div className="user-info-modal order-success-modal">
            {/* <i className='bx bx-x-circle close-custom-modal' onClick={() => modalAction('ORDER_SUCCESS_MODAL', false)}></i> */}
            {/* <img src="images/order_success.svg" style={{maxHeight: '31rem'}} alt="success" /> */}

            <svg width="297" height="228" viewBox="0 0 297 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="success">
                    <g id="svgBG" style={{transform: 'translate(0)'}}>
                        <path style={{animation: 'up-down 2s ease-in-out infinite alternate-reverse both'}} id="starttop" d="M10.6202 21.9596L12.8017 28.6735H19.8611L14.1499 32.8229L16.3314 39.5367L10.6202 35.3873L4.90905 39.5367L7.09052 32.8229L1.37936 28.6735H8.43874L10.6202 21.9596Z" fill="#F4CD41"/>
                        <path style={{animation: 'up-down 2s ease-in-out infinite alternate-reverse both'}} id="starbottom" d="M117.884 170.875L119.127 174.702H123.151L119.896 177.066L121.139 180.893L117.884 178.528L114.629 180.893L115.872 177.066L112.618 174.702H116.641L117.884 170.875Z" fill="#F4CD41"/>
                        <path style={{animation: 'up-down 2s ease-in-out infinite alternate-reverse both'}} id="startmiddle" d="M288.186 84.0654L289.973 89.5651L295.756 89.5651L291.077 92.9641L292.864 98.4638L288.186 95.0648L283.508 98.4638L285.295 92.9641L280.616 89.5651L286.399 89.5651L288.186 84.0654Z" fill="#F4CD41"/>
                        <circle style={{animation: 'up-down 2s ease-in-out 0.3s infinite alternate-reverse both'}} id="circlebottom" cx="37.094" cy="127.289" r="4.28718" fill="#77E321"/>
                        <circle style={{animation: 'up-down 2s ease-in-out 0.3s infinite alternate-reverse both'}} id="circletop" cx="184.287" cy="13.6786" r="4.28718" fill="#77E321"/>
                        <circle style={{animation: 'up-down 2s ease-in-out 0.3s infinite alternate-reverse both'}} id="circlemiddle" cx="211.887" cy="100.625" r="7.4402" fill="#77E321"/>
                        <path style={{animation: 'up-down 2s ease-in-out 0.6s infinite alternate-reverse both'}} id="linebottom" d="M258.598 170.875C258.598 176.83 255.74 189.596 244.308 193.026" stroke="#EDA5A5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path style={{animation: 'up-down 2s ease-in-out 0.6s infinite alternate-reverse both'}} id="lineleft" d="M26.8925 225.41C23.8915 220.267 19.9257 207.8 28.0713 199.076" stroke="#EDA5A5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path style={{animation: 'up-down 2s ease-in-out 0.6s infinite alternate-reverse both'}} id="linetop" d="M88.6287 16.1019C91.2916 10.7761 97.0517 4.08653 108.811 6.13164" stroke="#EDA5A5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <path id="check" d="M83.7854 115.593C90.8448 118.417 108.352 129.995 121.906 153.714C143.932 128.3 171.04 90.1793 219.327 76.6252" stroke="#36DBFF" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
            </svg>



            <h3 className="mt-4">Order Successfully Cancelled !</h3>
            <div className="cart-buttons">
                <button onClick={() => {history.push('/'); modalAction('ORDER_CANCELLED_MODAL', false)}} className="button">Continue Shopping</button>
                <button onClick={() => {history.push('/myOrders'); modalAction('ORDER_CANCELLED_MODAL', false)}} className="button">Back to Orders</button>
            </div>
        </div>
    )
}

const mapStateToOrderCancelledModal = (state) => {
    return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo };
}

export default connect(mapStateToOrderCancelledModal, {modalAction})(OrderCancelledModal);