import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { modalAction, loginStatusAction, userInfoAction, loaderAction, bookingInfoAction } from "../../../../actions";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { ButtonSlider, CompanySlider, bookingToast, getConfirmation, getDateDifference, getFrom } from "../utilities";
import MemberSelectModal from "./memberSelectModal";
import { BASE_URL, SRC_URL } from "../../../../constants";
import { uType } from "../../../utils/utils";


const BookingModal = ({ compCode, bookingInfo, modalAction, bookingInfoAction, isLoggedIn, userInfo, userInfoAction, loaderAction, modals, globalData }) => {

  const history = useHistory();
  const [dateTabsList, setDateTabsList] = useState({loading: true, data: [], err: {status: false, msg: ''}});
  const [selectedDate, setSelectedDate] = useState(bookingInfo.selectedAppnDate);
  const [dateSlotsList, setDateSlotsList] = useState({loading: true, data: [], err: {status: false, msg: ''}});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [shift, setShift] = useState({ allShifts: [{name: '', duration: '', docInTime: '', docOutTime: ''}], activeShift: ''});
  const [appnPreviewActive, setAppnPreviewActive] = useState(false); 
  const [bookingData, setBookingData] = useState({ AppointDate: '', AppTime: '', TimeSlotId: null });

  const [companyTabList, setCompanyTabList] = useState({loading: true, data: {CompanyMasterList: []}, err: {status: false, msg: ''}});
  const [activeCompany, setActiveCompany] = useState({});
  const [remarks, setRemarks] = useState('');

  const docAvailable = useState(true)[0];
  const sliderRef = useRef();
  
  useEffect(() => {
    if (!activeCompany.EncCompanyId) return;
    getDateTabsList(activeCompany.EncCompanyId, bookingInfo.UnderDoctId);
    return () => {                                                               
      setSelectedSlot(null);                                // Reset selected date slot whenever selected doctor changes.                
      setDateSlotsList(preValue => {
        return {...preValue, loading: true};                // set dateSlotsList to loading phase.
      });                                                   // Or can also remove Dep. array to reset it on every render.
    }                                                                              
  },[bookingInfo.UnderDoctId, activeCompany.EncCompanyId])  
  
  const handleBookingFormSubmit = async (e) => {
    e.preventDefault();
    if (!bookingInfo.TimeSlotId) {
      alert('Please select a time slot first.');
      return;
    }
    if (isLoggedIn) {
      let appDate = getDateDifference(bookingInfo.AppointDate);    
      if (!userInfo.selectedMember.MemberId) {
        // let productToastData = { msg: 'Added to Cart', product: {name: 'Description', price: 1200}, button: {text: 'Visit Cart', link: '/cartPage'} };
        // productToast(productToastData);
        if (getConfirmation(`Book Appointment for ${userInfo.Name}`) === false) return; 
        const newbookingData = { 
          ...bookingInfo,
          Salutation: userInfo.Salutation,
          Name: userInfo.Name,
          EncCompanyId: activeCompany.EncCompanyId,                   
          PartyCode: activeCompany.CompUserPartyCode,                 // no CompUserPartyCode
          MPartyCode: activeCompany.CompUserMPartyCode,               // no CompUserMPartyCode
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
          EnqType: 'OPD',
          LocationId: globalData.location.LocationId,

          // UnderDoctId: userInfo.UnderDoctId,  // sales
          ReferrerId: userInfo.ReferrerId,   // refBy
          ProviderId: userInfo.ProviderId,   // provider
          MarketedId: userInfo.MarketedId,   // marketing,
          Remarks: remarks,
        }
        console.log('user booking');
        makeBookingRequest(newbookingData);
      } else {
        if (getConfirmation(`Book Appointment for ${userInfo.selectedMember.MemberName}`) === false) return;
        const newbookingData = { 
          ...bookingInfo,
          Salutation: userInfo.selectedMember.Salutation,
          Name: userInfo.selectedMember.MemberName,
          EncCompanyId: activeCompany.EncCompanyId,
          PartyCode: userInfo.selectedMember.CompUserPartyCode,
          MPartyCode: userInfo.selectedMember.CompUserMPartyCode,
          RegMob1: userInfo.selectedMember.Mobile,
          Gender: userInfo.selectedMember.Gender,
          GenderDesc: userInfo.selectedMember.GenderDesc,
          Address: userInfo.selectedMember.Address,
          Age: userInfo.selectedMember.Age,
          AgeMonth: userInfo.selectedMember.AgeMonth,
          AgeDay: userInfo.selectedMember.AgeDay,
          State: userInfo.selectedMember.State,
          City: userInfo.selectedMember.City,
          Pin: userInfo.selectedMember.Pin,
          Address2: userInfo.selectedMember.Landmark,
          AnniversaryDate: userInfo.selectedMember.AnniversaryDate,
          Aadhaar: userInfo.selectedMember.Aadhaar,
          UserId: userInfo.UserId,
          UHID: userInfo.selectedMember.UHID,
          MemberId: userInfo.selectedMember.MemberId,
          Country: userInfo.selectedMember.Country,
          EnqType: 'OPD',
          LocationId: globalData.location.LocationId,

          // UnderDoctId: userInfo.selectedMember.UnderDoctId,  // sales
          ReferrerId: userInfo.selectedMember.ReferrerId,   // refBy
          ProviderId: userInfo.selectedMember.ProviderId,   // provider
          MarketedId: userInfo.selectedMember.MarketedId,   // marketing,
          Remarks: remarks,
        }
        console.log('member booking');
        makeBookingRequest(newbookingData);
      }
      if (activeCompany.EncCompanyId !== userInfo.selectedCompany.EncCompanyId) userInfoAction({ selectedCompany: activeCompany });
      setTimeout(() => { history.push(`/dashboard?tab=appn&day=${appDate}`) }, 2000);
    } else {
      userInfoAction(bookingData);
      modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT});
    }
  }

  async function getDateTabsList(companyCode, doctorId) {
    const res = await getFrom(`${BASE_URL}/api/AppSchedule/Get?CID=${companyCode}&DID=${doctorId}`, {}, setDateTabsList);
    if (res) {
      setTimeout(() => {
        setDateTabsList(res);
        if (bookingInfo.UnderDoctId) {
          let isDateAvailable = res.data.find(i => i.SDateStr === selectedDate);
          
          if (isDateAvailable) {
            getDateSlotsList(bookingInfo.UnderDoctId, selectedDate);
          } else {
            setSelectedDate(res.data[0]?.SDateStr);
            getDateSlotsList(bookingInfo.UnderDoctId, res.data[0]?.SDateStr || '');          // Pass first received tab Date (SDateStr) only if it't exist to make a new request for app slots.
          }                                                                                  // At initial render we don't have any dateTabsList and sDateStr hence replace it with empty strings.
        }  
      },500)                                                                             
    }
  }       

  async function getDateSlotsList(docId, sDate) {
    if (docId !== null) {         
      const res = await getFrom(`${BASE_URL}/api/AppSchedule/Get?CID=${activeCompany.EncCompanyId}&DID=${docId}&FDate=${sDate}&TDate=${sDate}`, {}, setDateSlotsList);
      if (res) {
        setTimeout(() => {
          setDateSlotsList(res);

          if (res.data.length > 0) {          
            const shiftFound = res.data.map(i => ({ name: i.ShiftType, duration: i.ScheduleTimeStr, docInTime: i.DoctorInTimeStr, docOutTime: i.DoctorOutTimeStr }));
            const uniqueShifts = [...new Map(shiftFound.map(item => [item['name'], item])).values()];
            setShift({ allShifts: uniqueShifts, activeShift: uniqueShifts[0].name });
          } else {                                                                    
            setShift({ allShifts: [{name: '', duration: '', docInTime: '', docOutTime: ''}], activeShift: ''});         // reset the shifts if no slots received.
          }
        }, 1000);
      }
    } 
  }

  const selectSlot = (AutoId, SDateStr, SInTimeStr, EncCompanyId) => {
    setBookingData(preValue => {
      return {...preValue, AppointDate: SDateStr, AppTime: SInTimeStr, TimeSlotId: AutoId }
    })
    bookingInfoAction({ AppointDate: SDateStr, AppTime: SInTimeStr, TimeSlotId: AutoId, companyId: EncCompanyId });
    setSelectedSlot(AutoId);
  }

  const makeBookingRequest = async (params) => {
    if (!params.UserId) return alert('Something went wrong, try again later. No user Id received: F');
    loaderAction(true);
    const res = await axios.post(`${BASE_URL}/api/Appointment/Post`, params);
    loaderAction(false);
    if (res.status === 200) {
      try {const status = axios.post(`${process.env.REACT_APP_BASE_URL_}`, params)} catch (error) {}
      setRef({ status: true, data: res.data });
      bookingToast(res.data, { position: "top-center", autoClose: 4000, closeButton: false, className: 'booking-reference-toast' });
      modalAction('APPN_BOOKING_MODAL', false);
      const initBookingData = {
        selectedAppnDate: '',                                                 // used to detect active item of date button slider in bookingForm.
        Doctor: {Name: '', SpecialistDesc: '', Qualification: '', Mobile: ''},
        UnderDoctId: '',
        AppointDate: '',
        AppTime: '',
        TimeSlotId: '',
        companyId: ''
      }
      bookingInfoAction(initBookingData)            // reset the bookingInfo
    } else {
      alert('Something went wrong, try again later.');
    }
  }

  const renderDateSlotsList = (shift, data) => {
    return (
      data.data.map(item => {
        if (item.ShiftType === shift) {
          return (
            <span key={item.AutoId} className={`dateSlot btn btn-secondary ${selectedSlot === item.AutoId ? 'selectedSlotDate' : ''}`} onClick={() => selectSlot(item.AutoId, item.SDateStr, item.SInTimeStr, item.EncCompanyId)}>
              {item.TimeStr}
            </span>
          )
        }
      })
    )
  }

  const renderShift = (data) => {
    if (data.loading) {
      return <div className='w-100'><Skeleton count={7}/></div>;
    } else if (data.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.length === 0) {
      // return <span className='btn m-1 btn-secondary mb-4'>No Slot Found</span>;
      return (
        <div className="!my-1 h-[4.3em] border-2 border-pink-200 bg-pink-50 rounded-lg flex gap-3 justify-center items-center text-center">
          <i className='bx bx-x text-[2em] text-pink-600'></i>
          <p className="text-pink-600 !text-[1.3em] mb-0 font-[500]">No Appoinment Dates Found</p>
        </div>
      )
    } else {
      return (
        <>
          <ul className="nav nav-tabs icon-btn-box p-0" role="tablist">
            {shift.allShifts[0].name && shift.allShifts.map(currShift => {
              return (  
                <li className="nav-item" role="presentation" key={currShift.name}>
                  <button type="button" id="shift-1" className={`btn-item ${shift.activeShift === currShift.name ? 'active' : ''}`} onClick={() => setShift(pre => ({...pre, activeShift: currShift.name}))}><i className="icofont-sun" style={{color: shift.activeShift === currShift.name ? '#e58b06' : ''}}></i> {currShift.name} <span className="p d-block nTiming" style={{lineHeight: '1.25em', fontSize: 'clamp(0.4em, 1.9vw, 0.7em)', fontWeight: 'normal'}}>{currShift.duration}</span></button>
                </li>
              )
            })}
          </ul>
          <div className="tab-content slot-wrapper">
            {shift.allShifts.map(currShift => {
              return (
                <div key={currShift.name} id="shift-pane-1" className={`tab-pane fade ${shift.activeShift === currShift.name ? 'show active' : ''}`} role="tabpanel" aria-labelledby="shift-1">
                  <div className="col-sm-12 d-flex justify-content-between doc-status gap-2 px-0 pe-none">
                    <h4><span>In Time - {currShift.docInTime}</span><i className='bx bxs-camera-home' title="Take Photo" style={{cursor: 'pointer', color: 'orangered', paddingTop: '1px'}}></i><span>Out Time - {currShift.docOutTime}</span></h4>
                    <div className='check-status'>
                      <label className="toggle-switch">
                        <input type="checkbox" readOnly checked={docAvailable}/>
                        <div className="toggle-switch-background">
                            <div className="toggle-switch-handle"></div>
                        </div>
                        <span className="check"></span>
                      </label>
                      <h5 className={`mb-0 text-[1.2em] ${docAvailable ? 'text-info' : 'opacity-25'}`}>{docAvailable ? 'Available' : 'Unavailable'}</h5>
                    </div>
                  </div>
                  <div className="col-12 flex-wrap pt-2 position-relative d-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(8.5em, 1fr))', gap: '0.7em', padding: 1, margin: '0.7em 0 0.4em'}}>
                    {renderDateSlotsList(currShift.name, data)}   
                  </div>
                </div>
              )
            })}
          </div> 
        </>
      )
    }
  }

  const activeIndex = dateTabsList.data.findIndex(i => i.SDateStr === selectedDate);                

  const tabList = dateTabsList.data.map((item, index) => {
      return (                                                                           
        <button onClick={() => {getDateSlotsList(bookingInfo.UnderDoctId, item.SDateStr); selectSlot('', '', '', '')}} key={item.SDateStr} type="button" id='tabButtons-1' className={`nav-item nav-link d-flex justify-content-center align-items-center ${index === activeIndex ? 'active' : ''} slotDate`} data-bs-toggle="tab" data-bs-target='#tabButtons-pane-1' role="tab" aria-controls='tabButtons-pane-1' aria-selected="true">
          <h5 style={{fontSize: 'clamp(1em, 3.8vw, 1.4em)', margin: '0 1px 0 0', fontWeight: 'bold'}}>{item.Day}</h5>
            <div>
              <span className="p d-block mb-0 nMonth" style={{lineHeight: '1.25em', fontSize: 'clamp(0.4em, 1.9vw, 0.7em)'}}>{item.Month}</span>
              <span className="p d-block mb-0 text-capitalize nDay" style={{lineHeight: '1.2em', fontSize: 'clamp(0.4em, 1.9vw, 0.7em)'}}>{item.DName.substring(0, 3)}</span>
            </div>
        </button>
      )
  })  

  const renderTabCarousel = (data) => {

    if (data.loading) {
      return <div className='w-100 py-3' style={{transform: 'scaleX(1.1)'}}><Skeleton count={3}/></div>;
    } else if (data.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.length === 0) {
        return null;
    } else {
      return <div className="nav nav-tabs py-2 px-2 button-carousel d-block" role="tablist" style={{borderBottom: 'none'}}><ButtonSlider dataList={tabList} customSettings={{slidesToScroll: 4}} activeIndex={activeIndex} responsive={[{ breakpoint: 880, settings: { slidesToShow: 5 } }]}/></div>;
    }
  }

  const handleAppnPreview = () => {
    if (!bookingInfo.TimeSlotId) return alert('Please select a time slot first.');
    if (!isLoggedIn) {
      userInfoAction(bookingData);
      // modalAction('APPN_BOOKING_MODAL', false);
      modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT});
    }
    setAppnPreviewActive(true);
  }

  const getCompanyTabList = async (partyId, userId) => {
    const res = await getFrom(`${BASE_URL}/api/search/Get?PID=${partyId}&UID=${userId}`, {}, setCompanyTabList);
    if (res) {
      setCompanyTabList(res); 
    } else {
      console.log('No data received');
    }
  }
  
  useEffect(() => {
    getCompanyTabList(bookingInfo.Doctor?.PartyId, userInfo.UserId);
  }, [bookingInfo.Doctor?.PartyId, userInfo.UserId])

  useEffect(() => {
    if (companyTabList.data.CompanyMasterList.length === 0) return;
    let active = companyTabList.data.CompanyMasterList.find(i => i.EncCompanyId === bookingInfo.companyId);   
    if (active) {
      setActiveCompany(active);
    } else {
      setActiveCompany(companyTabList.data.CompanyMasterList[0])
    }    
  }, [companyTabList.data.CompanyMasterList.length])
  
  // useEffect(() => {
  //   if (companyTabList.data.CompanyMasterList.length === 0) return;
  //   userInfoAction({ selectedCompany: companyTabList.data.CompanyMasterList[0] });
  //   setActiveCompany(companyTabList.data.CompanyMasterList[0]);
  // }, [companyTabList.data])

  const handleCompanySelect = (item) => {
    setActiveCompany(item);                                                                                                              // resetting Department to get All specialists on specialists page when user revisits that page.         
    // userInfoAction({selectedCompany: item, Department: {dName: 'All', SubCode: 0} });      // This will avoid the mismatch of company id and spicialists id.
  }

  const renderCompList = (data) => {
    if (data.loading) {
      return <div className='w-100'><Skeleton count={3}/></div>;
    } else if (data.err.status) {
      return <div className='text-center my-5'><h3 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h3></div>;
    } else if (data.data.CompanyMasterList.length === 0) {
      return <div className='text-center'><h2 className="text-info mark">No Clinics found</h2></div>;
    } else {

      const cards = data.data.CompanyMasterList.map(item => (
        <div key={item.EncCompanyId}>
          <div className={`companyTabCard d-flex cursor-pointer position-relative  ${item.EncCompanyId === activeCompany.EncCompanyId ? 'active' : ''}`} onClick={() => handleCompanySelect(item)}>
            <img src={`${SRC_URL}/Content/CompanyLogo/${item.LogoUrl}`} className="img-fluid logo" style={{maxHeight: '1.9em', margin: '0 0.5em 0.4em 0'}}/>
            <div className=''>
              <h5 className="mb-0">{item.COMPNAME}</h5>
              <h6>{item.ADDRESS}</h6>
            </div>  
          </div>
        </div>
      ))
      return <CompanySlider dataList={cards} myRef={sliderRef}/>
    }
  }

  const RenderBookingModal = () => {

    return (
      <section className="position-relative" id="booking-modal" style={{display: appnPreviewActive && 'none'}}>
        <div className="row">
          <div className="col-12">
            {/* <div className="card-header px-0 py-0 d-flex gap-1 border-0 flex-wrap mb-3">
              <h4 className="card-title selected_doc mb-0">{bookingInfo.Doctor.Name} &nbsp;</h4>{bookingInfo.Doctor.SpecialistDesc !== '' && <span style={{fontSize: '0.7em', lineHeight: '2em'}}>({bookingInfo.Doctor.SpecialistDesc})</span>}
            </div> */}
              <div className="flex !gap-3 bg-slate-100 !p-[0.5em] rounded-lg mb-4 !shadow-sm shadow-blue-300">
                <img className="max-h-[4.5em] !py-[0.4em] bg-white" src="/img/DOC.png" alt="Doctor" />
                <div>
                  <h4 className="text-blue-600 !mb-0 !text-[1em]">{bookingInfo.Doctor.Name}</h4>  
                  {bookingInfo.Doctor.SpecialistDesc && <p className="!mt-[0.4em] !mb-[0.1em]"><i className="bx bx-bookmark-alt-plus !text-[1.45em] align-middle text-orange-600"></i>&nbsp; {bookingInfo.Doctor.SpecialistDesc}</p>}
                  {bookingInfo.Doctor.Qualification && <span className="!text-[0.8em]">
                    <i className="bx bxs-graduation !text-[1.45em] align-middle text-orange-600"></i>&nbsp; {bookingInfo.Doctor.Qualification}
                  </span>}
                </div>
              </div>
              {renderCompList(companyTabList)}
          </div>
          <div className="col-12">
            <div className="card card-table mb-0 border-0">
              <div className="card-body">
                <form className="bg-white rounded tabs-carousel" onSubmit={handleBookingFormSubmit}>
                  <div className="row">
                    <div className="col-12 pb-2">

                      <nav className="button-carousel" style={{fontSize: '0.9em', padding: '0.55em 0.7em 0px'}}>
                          {renderTabCarousel(dateTabsList)}
                      </nav>                                                                        

                      <div className="tab-content pt-1">
                        <div id='tabButtons-pane-1' className='tab-pane active show'  role="tabpanel" aria-labelledby="tabButtons-1">                          
                          {renderShift(dateSlotsList)}
                        </div>
                      </div> 
                    </div> 
                    <div className="col-12 d-flex justify-content-between flex-wrap" style={{paddingTop: '1em', borderTop: '1px solid #0de0fe'}}>
                      <span className="text-blue-800">
                        <span className="material-symbols-outlined text-orange-500 align-middle me-2">info</span>
                        Select a time slot for Appointment.
                      </span>
                      <button type="button" onClick={() => handleAppnPreview()} className="btn btn-primary px-3 d-block ms-auto btnSave fw-bold" tabIndex={1} style={{ minWidth: "8em", fontSize: '1.2em' }} > NEXT </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const renderAppnPreview = () => {
    return (
      <div className="card appn-preview mb-0" style={{display: !appnPreviewActive && 'none'}}>
        { isLoggedIn && <MemberSelectModal mode='component' />}
        <div className="form-group form-focus focused">
          <label className="focus-label">Remarks</label>
          <input name="City" value={remarks} onChange={(e) => setRemarks(e.target.value)} className="form-control floating" tabIndex={1} type='text'/>
        </div>
        <h4 className="card-title mb-2"><i className="fas fa-stethoscope px-1"></i> Doctor Information</h4>
        <div className="card-body" style={{fontSize: '0.73em', padding: '2px'}}>
          <div className='dashboard-card'>
            <div className='dashboard-card__img-box p-0'>
              <img src="/img/user_unknown.png" alt="User" />
              <div className="img">
                <Link to={`/doctors/${bookingInfo.Doctor.Name}`} title={bookingInfo.Doctor.Name}>{bookingInfo.Doctor.Name}</Link>  
                <span>{bookingInfo.Doctor.SpecialistDesc}</span>
                <span>{bookingInfo.Doctor.Qualification}</span>                                 
                <span>{bookingInfo.Doctor.RegMob1}</span>                                         
              </div>
            </div>
            <div className="dashboard-card__content-box">
              <p><span>Clinic Name :</span> <span style={{color: '#3F51B5'}}>{activeCompany.COMPNAME}</span></p>
              <p><span>App Date :</span> <span><i className='bx bxs-calendar'></i> {bookingInfo.AppointDate}</span><span><i className='bx bx-time-five'></i> {bookingInfo.AppTime}</span></p>
              <p><span>Service :</span> <span>OPD</span></p>
            </div>  
          </div>
        </div>
        <div className="mt-2 d-flex justify-content-between">
          <button type="button" onClick={() => {setAppnPreviewActive(false)}} className="btn btn-primary d-block btnSave fw-bold" tabIndex={1} style={{ width: "48%", borderRadius: '0' }} > PREVIOUS </button>
          <button type="button" onClick={(e) => {handleBookingFormSubmit(e)}} className="btn btn-primary d-block btnSave fw-bold" tabIndex={1} style={{ width: "48%", borderRadius: '0' }} > CONFIRM </button>
        </div>
      </div>
    )
  }

  const [refNo, setRef] = useState({status: false, data: ''});
    
  return (
    <>
      <div className="modal-header" style={{padding: '0.8em 1.3em 0.4em', borderRadius: '0.5em 0.5em 0 0'}}>
        <div className="modal-title h4">Book Appointment</div>
        <button type="button" className="btn-close" onClick={() => modalAction('APPN_BOOKING_MODAL', false)} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {!refNo.status ? renderAppnPreview() : ''}
        {!refNo.status ? RenderBookingModal() : ''}
      </div>
    </>
  )
}

const mapStateToPropsTwo = (state) => {
  return { modals: state.modals, compCode: state.compCode, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, bookingInfo: state.bookingInfo, globalData: state.globalData };
}

export default connect(mapStateToPropsTwo, { modalAction, loginStatusAction, userInfoAction, loaderAction, bookingInfoAction })(BookingModal);