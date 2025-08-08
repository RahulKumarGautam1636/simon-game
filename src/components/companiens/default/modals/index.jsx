import { connect } from "react-redux";
import { modalAction } from "../../../../actions";
import { CustomOffcanvas, MyModal } from "../utilities";
import TimeSchedule from "./timeSchedule";
// import MemberForm from "./memberForm";
import DocDetailsModal from "./docProfileModal";
import { ConnectedLoginModal } from "./loginModal";
import BookingModal from "./bookingModal";
// import EditUserModal from "./editUserModal";
import MemberProfile from "./memberProfileModal";
// import MemberSelectModal from "./memberSelectModal";
import HealthPakageBooking from "./healthPakageBooking";
import LabTestBooking from "./labTestBooking";


const Modals = ({ modals, modalAction }) => {
    return (
        <>
            {/* <CustomModal isActive={modals.SCHEDULE_MODAL.state} fullscreen={false} handleClose={modalAction} customClass='schedule-modal' name={'SCHEDULE_MODAL'} child={<TimeSchedule/>}/> */}
            {modals.SCHEDULE_MODAL.state && <MyModal name='SCHEDULE_MODAL' handleClose={modalAction} customClass='schedule-modal' child={<TimeSchedule/>} closeIcon={false}  isStatic={true} />}
            {/* <CustomModal isActive={modals.PRINT_MODAL} handleClose={modalAction} customClass='print-canvas' child={<InvoicePrint/>} /> */}
            {/* <CustomModal isActive={modals.MEMBER_MODAL.state} handleClose={modalAction} customClass='member-modal' child={<MemberForm modalData={modals.MEMBER_MODAL.data}/>} name={'MEMBER_MODAL'}/> */}
            {/* <ModalComponent isActive={modals.QUICKVIEW_MODAL} child={<QuickViewModal/>}/>
            <ModalComponent isActive={modals.USER_INFO_MODAL} child={<UserInfoModal/>}/>
            <ModalComponent isActive={modals.ORDER_SUCCESS_MODAL} child={<OrderSuccessModal/>}/>
            <ModalComponent isActive={modals.ORDER_CANCELLED_MODAL} child={<OrderCancelledModal/>}/> */}
            {modals.DOC_DETAILS_MODAL.state && <CustomOffcanvas isActive={true} name={'DOC_DETAILS_MODAL'} handleClose={modalAction} customClass='doc-details-modal' child={<DocDetailsModal/>}/>}
            {modals.MEMBER_PROFILE_MODAL.state && <CustomOffcanvas isActive={true} name={'MEMBER_PROFILE_MODAL'} handleClose={modalAction} customClass='doc-details-modal' child={<MemberProfile/>}/>}

            {/* {modals.MEMBER_MODAL.state && <MyModal name='MEMBER_MODAL' handleClose={modalAction} customClass='member-modal' child={<MemberForm modalData={modals.MEMBER_MODAL.data}/>} closeIcon={false}/>} */}
            {/* {modals.EDIT_USER_MODAL.state && <MyModal name='EDIT_USER_MODAL' handleClose={modalAction} customClass='edit-user-modal' child={<EditUserModal modalData={modals.EDIT_USER_MODAL.data}/>} closeIcon={false}/>} */}
            
            {/* {modals.MEMBER_SELECT_MODAL.state && <MyModal name='MEMBER_SELECT_MODAL' handleClose={modalAction} customClass='edit-user-modal' child={<MemberSelectModal modalData={modals.MEMBER_SELECT_MODAL.data}/>} closeIcon={false}/>} */}
            {modals.HEALTH_PAKAGE_MODAL.state && <MyModal name='HEALTH_PAKAGE_MODAL' handleClose={modalAction} customClass='edit-user-modal' child={<HealthPakageBooking modalData={modals.HEALTH_PAKAGE_MODAL.data}/>} closeIcon={false} width="auto"/>}
            {/* <ConnectedLoginModal modalAction={modalAction} modals={modals} /> */}
            {modals.LOGIN_MODAL.state && <MyModal name='LOGIN_MODAL' handleClose={modalAction} customClass='login-modal mobile-full h-full' width='55em' child={<ConnectedLoginModal modals={modals} modalAction={modalAction} />} closeIcon={false}/>}
            {/* {bookingModalOpen && <MyModal name='local-handler' handleClose={() => {}} customClass='booking-modal' child={<BookingModal setRefNo={''} setRefActive={''}/>} closeIcon={false} />} */}
            {modals.APPN_BOOKING_MODAL.state && <MyModal name='APPN_BOOKING_MODAL' handleClose={modalAction} customClass='booking-modal mobile-full h-full' child={<BookingModal />} closeIcon={false}/>}
            {modals.LABTEST_BOOK_MODAL.state && <MyModal name='LABTEST_BOOK_MODAL' handleClose={modalAction} customClass='booking-modal mobile-full h-full' child={<LabTestBooking testDate={modals.LABTEST_BOOK_MODAL.data} />} closeIcon={false}/>}
        </>
    )
}

const mapStateToModals = (state) => {
    return { modals: state.modals };
}

export default connect(mapStateToModals, {modalAction})(Modals);