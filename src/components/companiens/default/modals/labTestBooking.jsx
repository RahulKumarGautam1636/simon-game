import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { modalAction, loginStatusAction, userInfoAction, loaderAction, bookingInfoAction, cartAction } from "../../../../actions";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { ButtonSlider, CompanySlider, bookingToast, getConfirmation, getDateDifference, getFrom, today } from "../utilities";
import MemberSelectModal from "./memberSelectModal";
import { BASE_URL } from "../../../../constants";
import { uType } from "../../../utils/utils";


const LabTestBooking = ({ bookingInfo, modalAction, isLoggedIn, userInfo, userInfoAction, loaderAction, cart, testDate, cartAction }) => {

  const history = useHistory();
  const [remarks, setRemarks] = useState('');
  
  const labTests = Object.values(cart.labTests);

  let orderList = labTests.map(i => ({                           
    AutoId: i.AutoId,
    ItemId: i.ItemId, 
    BillQty: i.Qty,
    Rate: (((i.Qty * i.SRate) - (((i.Qty * i.SRate * i.IGSTRATE) / (i.IGSTRATE + 100))))/i.Qty).toFixed(2),
    Amount: i.Qty * i.SRate,

    DepartmentId: i.DepartmentId,
    SubCategoryId: i.SubCategoryId,

    TranDate: i.testDate,
    TranDateStr: i.testDate
  }))
  
  const handleBookingFormSubmit = async (e) => {
    e.preventDefault();
    if (!labTests.length) return alert('Your Cart is empty. Please add some Tests in your cart to proceed.')
    if (isLoggedIn) {
      let appDate = getDateDifference(testDate);
      let selectedMember = userInfo.selectedMember;  
      if (!selectedMember.MemberId) {     
        if (getConfirmation(`Book Lab Test for ${userInfo.Name} in ${userInfo.selectedCompany.COMPNAME}`) === false) return; 
        const newbookingData = { 
          ...bookingInfo,
          Salutation: userInfo.Salutation,
          Name: userInfo.Name,
          EncCompanyId: userInfo.selectedCompany.EncCompanyId,
          PartyCode: userInfo.selectedCompany.CompUserPartyCode,          
          MPartyCode: userInfo.selectedCompany.CompUserMPartyCode,        
          RegMob1: userInfo.RegMob1,
          Gender: userInfo.Gender,
          GenderDesc: userInfo.GenderDesc,
          Address: userInfo.Address,
          Age: userInfo.Age,
          AgeMonth: userInfo.AgeMonth,
          AgeDay: userInfo.AgeDay,
          State: userInfo.State,
          City: userInfo.City,
          Pin: userInfo.Pin,
          Address2: userInfo.Address2,
          AnniversaryDate: userInfo.AnniversaryDate,
          Aadhaar: userInfo.Aadhaar,
          UserId: userInfo.UserId,
          UHID: userInfo.UHID,
          MemberId: userInfo.MemberId,
          Country: userInfo.Country,
          EnqType: 'INVESTIGATION',
          LocationId: userInfo.selectedCompany.LocationId,

          EnquiryDetailsList: orderList,
          EnqDate: testDate,
          EnqDateStr: testDate,
          Doctor: {},
          
          UnderDoctId: userInfo.UnderDoctId,  // sales
          ReferrerId: userInfo.ReferrerId,   // refBy
          ProviderId: userInfo.ProviderId,   // provider
          MarketedId: userInfo.MarketedId,   // marketing,
          Remarks: remarks,
        }
        console.log('user labtest booking');
        makeBookingRequest(newbookingData);
      } else {
        if (getConfirmation(`Book Lab Test for ${selectedMember.MemberName} in ${userInfo.selectedCompany.COMPNAME}`) === false) return;
        const newbookingData = { 
          ...bookingInfo,
          Salutation: selectedMember.Salutation,
          Name: selectedMember.MemberName,
          EncCompanyId: userInfo.selectedCompany.EncCompanyId,
          PartyCode: selectedMember.CompUserPartyCode,
          MPartyCode: selectedMember.CompUserMPartyCode,
          RegMob1: selectedMember.Mobile,
          Gender: selectedMember.Gender,
          GenderDesc: selectedMember.GenderDesc,
          Address: selectedMember.Address,
          Age: selectedMember.Age,
          AgeMonth: selectedMember.AgeMonth,
          AgeDay: selectedMember.AgeDay,
          State: selectedMember.State,
          City: selectedMember.City,
          Pin: selectedMember.Pin,
          Address2: selectedMember.Landmark,
          AnniversaryDate: selectedMember.AnniversaryDate,
          Aadhaar: selectedMember.Aadhaar,
          UserId: userInfo.UserId,
          UHID: selectedMember.UHID,
          MemberId: selectedMember.MemberId,
          Country: selectedMember.Country,
          EnqType: 'INVESTIGATION',
          LocationId: userInfo.selectedCompany.LocationId,

          EnquiryDetailsList: orderList,
          EnqDate: testDate,
          EnqDateStr: testDate,
          Doctor: {},
          
          UnderDoctId: userInfo.selectedMember.UnderDoctId,  // sales
          ReferrerId: userInfo.selectedMember.ReferrerId,   // refBy
          ProviderId: userInfo.selectedMember.ProviderId,   // provider
          MarketedId: userInfo.selectedMember.MarketedId,   // marketing,
          Remarks: remarks,
        }
        console.log('member labtest booking');
        makeBookingRequest(newbookingData);
      }
      setTimeout(() => { history.push(`/dashboard?tab=lab&day=${appDate}`) }, 2000);
    } else {
      userInfoAction({ AppointDate: '', AppTime: '', TimeSlotId: null });
      modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT});
    }
  }     

  const makeBookingRequest = async (params) => {
    if (!params.UserId) return alert('Something went wrong, try again later. No user Id received: F');
    loaderAction(true);
    const res = await axios.post(`${BASE_URL}/api/Appointment/Post`, params);
    loaderAction(false);
    if (res.status === 200) {
      bookingToast(res.data, { position: "top-center", autoClose: 4000, closeButton: false, className: 'booking-reference-toast' });
      modalAction('LABTEST_BOOK_MODAL', false);          
      cartAction('DUMP_CART', {}, 'labTests');
    } else {
      alert('Something went wrong, try again later.');
    }    
  }  

  const renderAppnPreview = () => {
    return (
      <div className="card appn-preview mb-0">
        { isLoggedIn && <MemberSelectModal mode='component' />}
        <div className="form-group form-focus focused mt-1">
          <label className="focus-label">Remarks</label>
          <input name="City" value={remarks} onChange={(e) => setRemarks(e.target.value)} className="form-control floating" tabIndex={1} type='text'/>
        </div>
        <h4 className="card-title mb-3"><i className="fas fa-flask px-1"></i> Selected Lab Tests</h4>
        <div className="card-body" style={{fontSize: '0.73em', padding: '2px'}}>
          <div className='dashboard-card member-box p-0 border-0 mt-0 mb-2'>
            <ul className="list-unstyled mb-0" style={{overflow: 'auto', maxHeight: '25rem', fontSize: '0.95em'}}>
              <li style={{ background: '#e0feff', fontWeight: 500 }}>
                <span>Test Name</span>
                <span>Test Date</span>
                <span>Qty</span>
                <span>MRP</span>
                <span>Total</span>
                <span>Action</span>
              </li>
              {labTests.map(item => ( 
                <li key={item.LocationItemId}>
                  <span>{item.Description}</span>
                  <span>{item.testDate}</span>
                  <span>{item.Qty}</span>
                  <span>{item.SRate}</span>
                  <span>₹ {(item.Qty * item.SRate).toFixed(2)}</span>
                  <span onClick={() => cartAction('REMOVE_ITEM', item.LocationItemId, 'labTests')}><i className='bx bx-trash text-danger' title="Delete"></i></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-flex justify-content-between py-3" style={{fontSize: '1.1em'}}>
            <h4 className="card-title mb-0">Booking Date</h4>
            <h4 className="card-text" style={{fontSize: '1.15em'}}>{testDate}</h4>
          </div>
          <div className="d-flex justify-content-between py-2 gap-5" style={{fontSize: '1.1em'}}>
            <h4 className="card-title mb-0">Hospital</h4>
            <h4 className="card-text text-end" style={{fontSize: '1.15em'}}>{userInfo.selectedCompany.COMPNAME}</h4>
          </div>
        </div>
        <div className="mt-2 d-flex justify-content-between">
          {/* <button type="button" onClick={() => {setAppnPreviewActive(false)}} className="btn btn-primary d-block btnSave fw-bold" tabIndex={1} style={{ width: "48%", borderRadius: '0' }} > PREVIOUS </button> */}
          <button type="button" onClick={(e) => {handleBookingFormSubmit(e)}} className="btn btn-primary d-block btnSave fw-bold" tabIndex={1} style={{ width: "100%", borderRadius: '0' }} > CONFIRM BOOKING </button>
        </div>
      </div>
    )
  }
    
  return (
    <>
      <div className="modal-header" style={{padding: '0.8em 1.3em 0.4em', borderRadius: '0.5em 0.5em 0 0'}}>
        <div className="modal-title h4">Book Lab Test</div>
        <button type="button" className="btn-close" onClick={() => modalAction('LABTEST_BOOK_MODAL', false)} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {renderAppnPreview()}
      </div>
    </>
  )
}

const mapStateToPropsTwo = (state) => {
  return { cart: state.cart, compCode: state.compCode, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, bookingInfo: state.bookingInfo };
}

export default connect(mapStateToPropsTwo, { modalAction, loginStatusAction, userInfoAction, loaderAction, bookingInfoAction, cartAction })(LabTestBooking);