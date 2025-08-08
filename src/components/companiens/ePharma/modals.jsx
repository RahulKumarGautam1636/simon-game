import { modalAction } from "../../../actions";
import { LoginAlert, ModalComponent, MyAlert, MyModal, Spinner, wait } from "./utilities";
import { connect } from "react-redux";

import CategoriesModal from './modals/categoriesModal';
import LoginModal from "./modals/loginModal";
import QuickViewModal from './modals/quickviewModal';
import UserInfoModal from './modals/userInfoModal';
import OrderSuccessModal from "./modals/orderSuccessModal";
import OrderCancelledModal from "./modals/orderCancelledModal";
import EditUserModal from "./modals/editUserModal";
import ReturnPolicy from "./modals/policyModals/returnPolicy";
import PrescriptionUpload from "./modals/prescriptionUpload";
import LocationsModal from "./modals/locationsModal";
// import { userRegType } from "../../../constants";
import { CompareProducts } from "./B2B/Home";
import { CustomOffcanvas } from "../default/utilities";
import { useState } from "react";
import { CardType5 } from "./cards";
import { rent } from "../../../constants";
import UserProfile from "./modals/userProfile";

const Modals = ({ modals, modalAction, globalData, compCode }) => {

    const b2bMode = globalData.userRegType.CodeValue === 'Retailer';   
    
    const handleAlertModal = () => {
        modalAction('ALERT_MODAL', false);
    }
    const handlePrescModal = () => {
        modalAction('PRESCRIPTION_MODAL', false);
    }
    return (
        <>
            <ModalComponent isActive={modals.QUICKVIEW_MODAL.state} child={<QuickViewModal modals={modals}/>}/>       
            <ModalComponent isActive={modals.CATEGORY_MODAL.state} child={<CategoriesModal/>}/>       
            <ModalComponent isActive={modals.ORDER_SUCCESS_MODAL.state} child={<OrderSuccessModal/>}/>       
            <ModalComponent isActive={modals.ORDER_CANCELLED_MODAL.state} child={<OrderCancelledModal/>}/>       
            <ModalComponent isActive={modals.RETURN_POLICY_MODAL.state} child={<ReturnPolicy/>}/>       
            <ModalComponent isActive={modals.LOCATION_MODAL.state} className={'location-selection-modal'} child={<LocationsModal />}/>
            {(modals.LOGIN_MODAL.state && !rent) && <MyModal name='LOGIN_MODAL' handleClose={modalAction} customClass='login-modal mobile-full h-full' isStatic={b2bMode} child={<LoginModal modals={modals} />} closeIcon={false} />}       
            {modals.USER_INFO_MODAL.state && <MyModal name='USER_INFO_MODAL' handleClose={modalAction} customClass='' child={<UserInfoModal />} closeIcon={false} />}       
            {/* {modals.USER_INFO_MODAL.state && <MyModal name='USER_INFO_MODAL' handleClose={modalAction} customClass='mobile-full h-full' width='60em' styles={{padding: 0}} child={<UserProfile />} closeIcon={false} />}        */}
            {modals.EDIT_USER_MODAL.state && <MyModal name='EDIT_USER_MODAL' handleClose={modalAction} customClass='login-modal edit-user mobile-full h-full' width='33em' child={<EditUserModal />} closeIcon={false} />}       
            {modals.ALERT_MODAL.state && <MyModal name='local-handler' handleClose={handleAlertModal} customClass='my-alert' width='33em' interval={1750} child={<LoginAlert type={modals.ALERT_MODAL.data} modalAction={modalAction} />} />}
            {modals.PRESCRIPTION_MODAL.state && <MyModal name='local-handler' handleClose={handlePrescModal} customClass='presc-modal mobile-full h-full' styles={{padding: 0, maxWidth: '60em'}} child={<PrescriptionUpload />} />}
            {modals.COMPARE_PRODUCT_MODAL.state && <MyModal name='COMPARE_PRODUCT_MODAL' handleClose={modalAction} customClass='p-lg-5 mobile-full h-full' width="unset" child={<CompareProducts compCode={compCode} itemId={modals.COMPARE_PRODUCT_MODAL.data.itemId} />} closeIcon={false} />} 
            {modals.SHOW_INTEREST_MODAL.state && <CustomOffcanvas isActive={true} name={'SHOW_INTEREST_MODAL'} handleClose={modalAction} customClass='doc-details-modal w-sm-100' styles={{width: '40%'}} child={<ShowInterest modalAction={modalAction} modals={modals} />}/>}
        </>
    )
}

const mapStateToModals = (state) => {
    return { modals: state.modals, globalData: state.globalData, compCode: state.compCode };        // compCode only for <CompareProducts />
}

export default connect(mapStateToModals, {modalAction})(Modals);

// -----------------------------------------------------------------------------------------------------------------------


const ShowInterest = ({ modals, modalAction }) => {

    const [data, setData] = useState({ name: '', phone: '', email: '', message: '' });
    const [status, setStatus] = useState({ loading: false, sent: false });
    const product = modals.SHOW_INTEREST_MODAL.data?.product || {};

    const handleChange = (e) => setData(pre => ({...pre, [e.target.name]: e.target.value}));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, sent: false });
        await wait(2500);
        setStatus({ loading: false, sent: true });
    }

	return (
		<div>
			<div className="contact-form-content pt-25 pe-0 pe-lg-4">
                {status.sent ? 
                    <>
                        <h3 className="contact-page-title nunito fw-bold" style={{fontSize: '1.7em'}}>Successfully Recieved Your Request.</h3>
                        <div className="text-center nunito">
                            <img className="img-fluid my-4" style={{maxWidth: '24em'}} src="assets/img/rentNsale/icegif-4141.gif" alt="" />   
                            <h4 className="poppins fw-semibold text-blue-600">Request Id :  THUQN1003</h4>   
                            <h5 className="mt-4 mb-3">Thank You for Showing your Interest.</h5>               
                            <h5>Our Executive will contact you very soon ...</h5>  
                            <div className="btn-group-1 mt-5">
                                <button onClick={() => modalAction('SHOW_INTEREST_MODAL', false, {product: {}})} style={{ background: "#c970ff", color: "white", padding: '0.8em 2em', fontSize: '1.1em' }}>CLOSE</button>
                            </div>        
                        </div>
                    </> 
                :
                    <>
                        <h3 className="contact-page-title nunito fw-bold d-flex justify-content-between" style={{fontSize: '1.7em'}}>CONTACT US <i className='bx bx-x' style={{fontSize: '1.3em', background: 'aliceblue', lineHeight: 1.1, borderRadius: '50%', padding: '0 2px'}} onClick={() => modalAction('SHOW_INTEREST_MODAL', false, {product: {}})}></i></h3>
                        <div className="contact-form">
                            <CardType5 data={product} classes='landscape mt-4' styles={{background: '#f7f7f7'}} />
                            <form id="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group mt-25 mb-25">
                                    {/* <label>Your Name <span className="required">*</span></label> */}
                                    <input placeholder="Your Name" type="text" name="name" value={data.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group mb-25">
                                    {/* <label>Phone Number <span className="required">*</span></label> */}
                                    <input placeholder="Phone Number" type="text" name="phone" value={data.phone} onChange={handleChange} required />
                                </div>
                                <div className="form-group mb-25">
                                    {/* <label>Your Email</label> */}
                                    <input placeholder="Your Email" type="email" name="email" value={data.email} onChange={handleChange} />
                                </div>
                                <div className="form-group mb-25">
                                    {/* <label>Your Message</label> */}
                                    <textarea placeholder="Your Message" name="message" value={data.message} onChange={handleChange}></textarea>
                                </div>
                                <div className="form-group mb-25">
                                    <button type="submit" className="li-btn-3 ms-auto" name="submit">
                                        {status.loading ? <Spinner styles={{minHeight: 'auto', fontSize: '0.3em', width: 'auto', transform: 'scale(1.7)', marginRight: '1em'}}/> : ''} SEND MESSAGE
                                    </button>
                                </div>
                            </form>
                        </div>
                        <p className="form-messege"></p>
                    </>
                }
			</div>
		</div>
	)
}

