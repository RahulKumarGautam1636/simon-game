import { connect } from "react-redux";
import { modalAction } from "../../../../actions";
import { MyModal } from "../../default/utilities";
import MemberSelectModal from "../../default/modals/memberSelectModal";
import MemberForm from "../../default/modals/memberForm";
import TableBoard from "../../restaurant/tableBoard";

const Modals = ({ modals, modalAction }) => {
    return (
        <>
            {modals.MEMBER_MODAL.state && <MyModal name='MEMBER_MODAL' handleClose={modalAction} customClass='member-modal mobile-full h-full' child={<MemberForm modalData={modals.MEMBER_MODAL.data}/>} closeIcon={false}/>}
            {modals.MEMBER_SELECT_MODAL.state && <MyModal name='MEMBER_SELECT_MODAL' handleClose={modalAction} customClass='edit-user-modal' child={<MemberSelectModal modalData={modals.MEMBER_SELECT_MODAL.data}/>} closeIcon={false}/>}
            {/* <CustomOffcanvas isActive={modals.TABLE_SELECTION_MODAL.state} name={'TABLE_SELECTION_MODAL'} handleClose={modalAction} customClass='w-100 bg-transparent' child={<TableBoard />}/> */}
            {modals.TABLE_SELECTION_MODAL.state && <MyModal name='TABLE_SELECTION_MODAL' handleClose={modalAction} customClass='w-100 bg-transparent mobile-full h-full' width="100em" child={<TableBoard modalData={modals.TABLE_SELECTION_MODAL.data}/>} closeIcon={false}/>}
            {/* <CustomOffcanvas isActive={modals.CART_EDIT_MODAL.state} name={'CART_EDIT_MODAL'} placement="end" handleClose={modalAction} customClass='w-100 border-0' child={<EditCartPage />}/> */}
            {/* {modals.CART_EDIT_MODAL.state && <EditCartPage handleClose={modalAction} />} */}
        </>
    )
}

const mapStateToModals = (state) => {
    return { modals: state.modals };
}

export default connect(mapStateToModals, {modalAction})(Modals);