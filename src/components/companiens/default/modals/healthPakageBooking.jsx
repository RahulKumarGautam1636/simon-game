import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { modalAction } from "../../../../actions";
import { uType } from "../../../utils/utils";
// import { loaderAction, modalAction, userInfoAction } from "../../../../actions"
// import { Link } from "react-router-dom"
// import axios from "axios"

const HealthPakageBooking = ({ modalAction }) => {

    return (
        <>
          <div className="content health-pakage-booking p-0 p-lg-3" style={{ transform: "none", minHeight: "158.5px" }}>
          <i className='bx bx-x-circle float-right-corner' style={{top: '0.5em', right: '0.4em', fontSize: '1.5em', transform: 'none'}} onClick={() => modalAction('HEALTH_PAKAGE_MODAL', false)}></i>
            <div className="container p-0" style={{ transform: "none" }}>
                <div className="row" style={{ transform: "none" }}>
                <div className="col-md-7">
                    <div className="card">
                    <div className="card-body">
                        {/* Checkout Form */}
                        <form action="https://dreamguys.co.in/demo/doccure/booking-success.html">
                        {/* Personal Information */}
                        <div className="info-widget">
                            <h4 className="card-title">Personal Information</h4>
                            <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                <label>First Name</label>
                                <input className="form-control" type="text" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                <label>Last Name</label>
                                <input className="form-control" type="text" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                <label>Email</label>
                                <input className="form-control" type="email" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group card-label">
                                <label>Phone</label>
                                <input className="form-control" type="text" />
                                </div>
                            </div>
                            </div>
                            <div className="exist-customer">
                            Existing Customer? <Link to="#" onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})}>Click here to login</Link>
                            </div>
                        </div>
                        {/* /Personal Information */}
                        {/* <div className="payment-widget">
                            <h4 className="card-title">Payment Method</h4>
                            <div className="payment-list">
                            <label className="payment-radio credit-card-option">
                                <input type="radio" name="radio" defaultChecked="" />
                                <span className="checkmark" />
                                Credit card
                            </label>
                            <div className="row">
                                <div className="col-md-6">
                                <div className="form-group card-label">
                                    <label htmlFor="card_name">Name on Card</label>
                                    <input
                                    className="form-control"
                                    id="card_name"
                                    type="text"
                                    />
                                </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group card-label">
                                    <label htmlFor="card_number">Card Number</label>
                                    <input
                                    className="form-control"
                                    id="card_number"
                                    placeholder="1234  5678  9876  5432"
                                    type="text"
                                    />
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="form-group card-label">
                                    <label htmlFor="expiry_month">Expiry Month</label>
                                    <input
                                    className="form-control"
                                    id="expiry_month"
                                    placeholder="MM"
                                    type="text"
                                    />
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="form-group card-label">
                                    <label htmlFor="expiry_year">Expiry Year</label>
                                    <input
                                    className="form-control"
                                    id="expiry_year"
                                    placeholder="YY"
                                    type="text"
                                    />
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="form-group card-label">
                                    <label htmlFor="cvv">CVV</label>
                                    <input className="form-control" id="cvv" type="text" />
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="payment-list">
                            <label className="payment-radio paypal-option">
                                <input type="radio" name="radio" />
                                <span className="checkmark" />
                                Paypal
                            </label>
                            </div>
                            <div className="terms-accept">
                            <div className="custom-checkbox">
                                <input type="checkbox" id="terms_accept" />
                                <label htmlFor="terms_accept">
                                I have read and accept{" "}
                                <Link href="#">Terms &amp; Conditions</a>
                                </label>
                            </div>
                            </div>
                            <div className="submit-section mt-4">
                            <button type="submit" className="btn btn-primary submit-btn">
                                Confirm and Pay
                            </button>
                            </div>
                        </div> */}
                        </form>
                    </div>
                    </div>
                </div>
                <div
                    className="col-lg-5 theiaStickySidebar"
                    style={{
                    position: "relative",
                    overflow: "visible",
                    boxSizing: "border-box",
                    minHeight: 1
                    }}
                >
                    {/* Booking Summary */}
                    {/* /Booking Summary */}
                    <div
                    className="theiaStickySidebar"
                    style={{
                        paddingTop: 0,
                        paddingBottom: 1,
                        position: "static",
                        transform: "none",
                        top: 0,
                        left: "684.984px"
                    }}
                    >
                    <div className="card booking-card">
                        <div className="card-header">
                        <h4 className="card-title">Booking Summary</h4>
                        </div>
                        <div className="card-body">
                        {/* Booking Doctor Info */}
                        <div className="booking-doc-info">
                            <Link to="#" className="booking-doc-img">
                            <img
                                src="/img/logo/opd2.png"
                                alt="User Image"
                            />
                            </Link>
                            <div className="booking-info" style={{fontSize: '0.8em'}}>
                            <h4>
                                <Link to="#" style={{lineHeight: '1.5em'}}>BASIC COMPREHENSIVE PACKAGE (58 PARAMETERS)</Link>
                            </h4>
                            <div className="rating">
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star" />
                                <span className="d-inline-block average-rating">35</span>
                            </div>
                            <div className="clinic-details">
                                <p className="doc-location">
                                <i className="fas fa-map-marker-alt" /> Kolkata
                                </p>
                            </div>
                            </div>
                        </div>
                        {/* Booking Doctor Info */}
                        <div className="booking-summary">
                            <div className="booking-item-wrap">
                            <ul className="booking-date">
                                <li>
                                Date <span>16 Nov 2024</span>
                                </li>
                                <li>
                                Time <span>10:00 AM</span>
                                </li>
                            </ul>
                            <ul className="booking-fee">
                                <li>
                                Consulting Fee <span>₹ 250</span>
                                </li>
                                <li>
                                Booking Fee <span>₹ 1599</span>
                                </li>
                                <li>
                                Video Call <span>₹ 50</span>
                                </li>
                            </ul>
                            <div className="booking-total">
                                <ul className="booking-total-list">
                                <li>
                                    <span>Total</span>
                                    <span className="total-cost">₹ 1899</span>
                                </li>
                                </ul>
                            </div>
                            </div>
                            <div className="submit-section mt-4">
                                <button type="submit" className="btn btn-primary submit-btn w-100">CONFIRM AND PAY</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div
                        className="resize-sensor"
                        style={{
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                        zIndex: -1,
                        visibility: "hidden"
                        }}
                    >
                        <div
                        className="resize-sensor-expand"
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            overflow: "hidden",
                            zIndex: -1,
                            visibility: "hidden"
                        }}
                        >
                        <div
                            style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            transition: "all",
                            width: 330,
                            height: 760
                            }}
                        />
                        </div>
                        <div
                        className="resize-sensor-shrink"
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            overflow: "hidden",
                            zIndex: -1,
                            visibility: "hidden"
                        }}
                        >
                        <div
                            style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            transition: "0s",
                            width: "200%",
                            height: "200%"
                            }}
                        />
                        </div>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </>
    )
}

const mapStateToHealthPakageBooking = (state) => {
    return { };
}
  
export default connect(mapStateToHealthPakageBooking, { modalAction })(HealthPakageBooking);