import { connect } from "react-redux";
import { modalAction } from "../../../../../actions";
import { Link } from "react-router-dom";

const ReturnPolicyModal = ({ modalAction }) => {


    return (
        <div className="categories-modal h-100 p-3 p-lg-4 overflow-hidden bg-white">
            <i className='bx bx-x-circle close-custom-modal' onClick={() => modalAction('RETURN_POLICY_MODAL', false)}></i>
            <h3 className="title ps-2">Return Policy</h3>
            <div className="h-100 overflow-auto p-2">
                <div className="categories-box position-relative">
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-baseline">
                            <h5 className="mb-0">RETURN PROCESS:</h5>
                            {/* <Link style={{fontSize: '1.3rem', color: '#FF9800'}} to={`/filterPage/${item.ParentDesc}~${item.Value}~`} onClick={() => {filterAction('selectedCategoryId', item.Value); modalAction('CATEGORY_MODAL', false)}} className='mb-0'>View All</Link> */}
                        </div>
                        <div className="card-body cart">
                            <ol>
                                <li>For Return intimation, please visit <Link onClick={() => modalAction('RETURN_POLICY_MODAL', false)} to="/contactUs">www.E-Pharma.com/contactUs</Link>.</li>
                                <li>E-Pharma customer care team will verify the claim made by the customer within 72 (seventy-two) business hours from the time of receipt of complaint.</li>
                                <li>Once the claim is verified as genuine and reasonable, E-Pharma will initiate the collection of product(s) to be returned.</li>
                                <li>The customer will be required to pack the product(s) in original manufacturer’s packaging.</li>
                                <li>Refund will be completed within 30 (thirty) days from date of reverse pick up (if required).</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            
            <Link onClick={() => modalAction('RETURN_POLICY_MODAL', false)} to="/returnPolicy" className="continue-button ms-auto d-table">Read More</Link>
        </div>
    )
}


const mapStateToReturnPolicyModal = (state) => {
    return {};
}

export default connect(mapStateToReturnPolicyModal, {modalAction})(ReturnPolicyModal);