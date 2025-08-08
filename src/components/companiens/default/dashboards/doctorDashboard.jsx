import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PatientAppnListCard } from '../cards';
import { getFrom, NologinWarning, Spinner, BreadCrumb, CompanySlider, all } from '../utilities';
import { bookingInfoAction, loaderAction, modalAction, userInfoAction } from '../../../../actions';
import Skeleton from 'react-loading-skeleton';
import { BASE_URL, SRC_URL } from '../../../../constants';


const DoctorDashboard = ({ isLoggedIn, compCode, userInfo, loaderAction, compInfo, userInfoAction, modalAction, bookingInfoAction }) => {

  const [activeDayTab, setActiveDayTab] = useState('today_appointments');
  const [tabData, setTabData] = useState({loading: false, data: {PartyFollowupList: []}, err: {status: false, msg: ''}});
  const [activeCompany, setActiveCompany] = useState({});
  const sliderRef = useRef();

  useEffect(() => {
    getTabData("ENQ");
  },[userInfo.PartyCode, userInfo.EncCompanyId])
  

  const getTabData = async (query, userId = userInfo.UserId, companyId = userInfo.EncCompanyId) => {
    if (userInfo.UserId > 1) {
      const res = await getFrom(`${BASE_URL}/api/Appointment/Get?id=${userId}&CID=${companyId}&Type=${query}&CatType=OPD&MemberId=${'0'}`, {}, setTabData);
      if (res) {
        setTimeout(() => {
          setTabData(res);            
        }, 400)
      }
    }
  }

  const renderTabData = (data) => {
    if (data.loading) {
      return <div className='w-100'><Skeleton count={14}/></div>;
    } else if (data.err.status) {
      return <h2 className="text-danger mark">An error occured, please try again later. Error code: <span className="text-dark d-inline">{data.err.msg}</span></h2>;
    } else if (data.data.PartyFollowupList.length === 0) {
      return <h2 className="text-danger py-2">No Appointments Found</h2>;
    } else {
      return data.data.PartyFollowupList.map(item => {
        return (
          <PatientAppnListCard key={item.AutoId} data={item} />
        )
      })
    }
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [companyTabList, setCompanyTabList] = useState({loading: true, data: [], err: {status: false, msg: ''}});


  // useEffect(() => {
  //   getCompanyTabList(compCode, userInfo.UserId);
  // }, [compCode, userInfo.UserId])

  // const getCompanyTabList = async (companyCode, userId) => {
  //   loaderAction(true);
  //   const res = await getFrom(`${BASE_URL}/api/CompMast/Get?CID=${companyCode}&UID=${userId}`, {}, setCompanyTabList);
  //   if (res) {
  //     setCompanyTabList(res); 
  //   } else {
  //     console.log('No data received');
  //   }
  //   loaderAction(false);
  // }

  useEffect(() => {
    setCompanyTabList(pre => ({ ...pre, loading: false, data: userInfo.companyList }));
  }, [userInfo.companyList])  

  useEffect(() => {
    setActiveCompany(userInfo.selectedCompany);          
  },[userInfo.selectedCompany.COMPNAME])
  
  const handleCompanySelect = (item) => {
    setActiveCompany(item);
    userInfoAction({selectedCompany: item, EncCompanyId: item.EncCompanyId, PartyCode: item.CompUserPartyCode, MPartyCode: item.CompUserMPartyCode});
    setActiveDayTab('today_appointments');
  }

  const onAllClick = () => {
    alert('Not Avaialble yet..');
  }

  const renderCompList = (data) => {
    if (data.loading) {
      return <Spinner min_height='6rem'/>;
    } else if (data.err.status) {
      return <div className='text-center my-5'><h3 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h3></div>;
    } else if (data.data.length === 0) {
      return <div className='text-center my-5'><h2 className="text-info mark">No Company List found</h2></div>;
    } else {
      const cards = data.data.map(item => (
        <div key={item.EncCompanyId}>
          <div className={`companyTabCard d-flex position-relative cursor-pointer ${item.COMPNAME === activeCompany.COMPNAME ? 'active' : ''}`} onClick={() => handleCompanySelect(item)}>
            <img src={`${SRC_URL}/Content/CompanyLogo/${item.LogoUrl}`} className="img-fluid logo" style={{maxHeight: '1.9em', marginRight: '.8em'}} alt={item.COMPNAME}/>
            <div className=''>
              <h5 className="mb-0">{item.COMPNAME}</h5>
              <h6>{item.ADDRESS}</h6>
            </div>
            <span className='d-flex flex-column justify-content-between h-100'><Link to={'/bedStatus'}><i className='bx bxs-bed' ></i></Link><Link to={`/patientQueue`}><i className='bx bxs-user-plus'></i></Link></span>                     
          </div> 
        </div>  
      ))
      const itemList = cards.length > 1 ? [all(activeCompany.COMPNAME, onAllClick), ...cards] : cards;
      return <CompanySlider myRef={sliderRef} dataList={itemList} />
    }
  }
  
  const breadCrumbData = {
    links: [{name: 'Home', link: '/'}, {name: 'Patient Dashboard', link: '/patientDashboard'}],
    activeLink: '/patientDashboard'
  }

  const handleBooking = () => {
    bookingInfoAction({Doctor: userInfo, UnderDoctId: userInfo.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: '', companyId: '', selectedAppnDate: ''}); 
    modalAction('APPN_BOOKING_MODAL', true);
  }

  if (!isLoggedIn) {
    return (
      <NologinWarning />
    );
  } else {
    return (
      <>
        <BreadCrumb data={breadCrumbData}/>
        <div className="content pt-1 pt-lg-0 default-global dashboard" style={{fontSize: '1.1em'}}>
          <div className="container-fluid">
            <div style={{padding: '0.45em 0px'}} id='companyTabs'>
                {renderCompList(companyTabList)}
            </div>
            <div className="row">
              {/* <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar dct-dashbd-lft">
                <div className="card widget-profile pat-widget-profile">
                  <div className="card-body">
                    <div className="pro-widget-content">
                      <div className="profile-info-widget">
                        <Link to="#" className="booking-doc-img">
                          <img src="/img/user_unknown.png" alt="User" />
                        </Link>
                        <div className="profile-det-info">
                          <h3 style={{display: isLoggedIn ? 'block' : 'none'}}>{userInfo.Name}</h3>
                          <div className="patient-details">
                            {userInfo.MPartyCode && <h5><b>Patient ID :</b> {userInfo.MPartyCode}</h5>}
                            {userInfo.Address && <h5 className="mb-0"><i className="fas fa-map-marker-alt" /> {userInfo.Address}</h5>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="patient-info">
                      <ul>
                        <li>
                          Phone <span>+91 {userInfo.RegMob1}</span>
                        </li>
                        <li>
                          Age <span>{userInfo.Age} Years, {userInfo.GenderDesc}</span>
                        </li>
                        <li className='d-none'>
                          Blood Group <span>AB+</span>
                        </li>
                      </ul>
                    </div>
                  </div>
              </div>
              <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Last Booking</h4>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <img
                            alt="Image placeholder"
                            src="/img/doctors/doctor-thumb-02.jpg"
                            className="avatar  rounded-circle"
                          />
                        </div>
                        <div className="media-body">
                          <h5 className="d-block mb-0">Dr. Darren Elder </h5>
                          <span className="d-block text-sm text-muted">Dentist</span>
                          <span className="d-block text-sm text-muted">
                            14 Nov 2019 5.00 PM
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <img
                            alt="Image placeholder"
                            src="/img/doctors/doctor-thumb-02.jpg"
                            className="avatar  rounded-circle"
                          />
                        </div>
                        <div className="media-body">
                          <h5 className="d-block mb-0">Dr. Richard wilson </h5>
                          <span className="d-block text-sm text-muted">Dentist</span>
                          <span className="d-block text-sm text-muted">
                            12 Nov 2019 11.00 AM
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="col-12 dct-appoinment">
                <div className="card">
                  <div className="card-body">
                    <div style={{fontSize: '0.8em', marginBottom: '1.3em'}}>
                      <div className='dashboard-card dashboard-card-user_card'>
                        <div className='dashboard-card__img-box'>
                          <img src="/img/user_unknown.png" alt="User" />
                          <div className="img d-flex flex-column" style={{gap: '0.2em'}}>
                            <Link to={'#'} title={userInfo.Name}>{userInfo.Name}</Link>
                            <span>{userInfo.SpecialistDesc}</span>
                            <span>{userInfo.Qualification}</span>
                            <div className="rating mb-0">
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star"></i>
                              <span className="ms-1 d-inline-block average-rating">(35)</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="dashboard-card__content-box">
                            <p><span><i className='bx bxs-phone-call'></i> Phone : </span><span> +91 {userInfo.RegMob1}</span></p>
                            <p><span><i className="bx bxs-hourglass-bottom"></i> Age : </span><span> {userInfo.Age} Years</span></p>
                            <p><span><i className='bx bx-male-female'></i> Gender : </span> <span>{userInfo.GenderDesc}</span></p>
                            <p className='mb-0'><span><i className='bx bxs-map'></i> Address : </span> <span>{userInfo.Address}</span></p>
                          </div>
                          <button onClick={handleBooking} className='dashboard-card__btn-box-item reverse-hover d-flex align-items-center icon-btn mt-3 ms-auto' style={{'--clr': '#48fffc3b', '--bg': '#149A8D', '--bClr': '#149a8d57', gap: '0.3em', fontSize: '1.2em', padding: '0.4em 0.8em 0.4em'}}><i className='bx bx-plus-medical'></i> Book Appointment</button>
                        </div>
                      </div>
                    </div>
                    <div className="card card-table mb-0">
                      <div className="card-body">
                        <div className="appointment-tab">
                          <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-3 pe-0 border-0 gap-2">
                            <li className="nav-item">
                              <Link className={`nav-link ${activeDayTab === 'previous_appointments' ? 'active' : ''}`} to="#" onClick={() => {setActiveDayTab('previous_appointments');getTabData('PENQ')}}>Previous</Link>
                            </li> 
                            <li className="nav-item">
                              <Link className={`nav-link ${activeDayTab === 'today_appointments' ? 'active' : ''}`} to="#" onClick={() => {setActiveDayTab('today_appointments');getTabData('ENQ')}}>Today</Link>
                            </li> 
                            <li className="nav-item">
                              <Link className={`nav-link ${activeDayTab === 'upcoming_appointments' ? 'active' : ''}`} to="#" onClick={() => {setActiveDayTab('upcoming_appointments');getTabData('UENQ')}}>Upcoming</Link>
                            </li>
                          </ul>                          
                          <div className="tab-content">
                            <div className='tab-pane fade show active' id="previous-appointments">
                              <div className="card card-table mb-0 border-0 px-1">
                                <div className="card-body">
                                  {renderTabData(tabData)}	
                                </div>	
                              </div>	
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="user-tabs">
                      <ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap">
                        <li className="nav-item">
                          <Link className={`nav-link ${activeTab === 'pat_appointments' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('pat_appointments')}>
                            Appointments
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className={`nav-link ${activeTab === 'pres' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('pres')}>
                            <span>Prescription</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className={`nav-link ${activeTab === 'billing' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('billing')}>
                            <span>Billing</span>
                          </Link>
                        </li>
                      </ul>
                    </div> */}

                    {/* <div className="tab-content" id='patiendProfile_tabs'>
                      <div id="pat_appointments" className={`tab-pane fade ${activeTab === 'pat_appointments' ? 'show active' : ''}`}>
                        
                      </div>

                      <div className={`tab-pane fade ${activeTab === 'pres' ? 'show active' : ''}`} id="pres">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive table-striped">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Doctor</th>
                                    <th>Appt Date</th>
                                    <th>Booking Date</th>
                                    <th>Amount</th>
                                    <th>Follow Up</th>
                                    <th>Status</th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <h2 className="table-avatar">
                                        <Link
                                          to="#"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="/img/doctors/doctor-thumb-02.jpg"
                                            alt="User"
                                          />
                                        </Link>
                                        <Link to="#">
                                          Dr. Richard wilson <span>Dental</span>
                                        </Link>
                                      </h2>
                                    </td>
                                    <td>
                                      14 Nov 2019{" "}
                                      <span className="d-block text-info">
                                        10.00 AM
                                      </span>
                                    </td>
                                    <td>12 Nov 2019</td>
                                    <td>$160</td>
                                    <td>16 Nov 2019</td>
                                    <td>
                                      <span className="badge badge-pill bg-success-light">
                                        Confirm
                                      </span>
                                    </td>
                                    <td className="text-right">
                                      <div className="table-action">
                                        <Link
                                          to="#"
                                          className="btn btn-sm bg-success-light"
                                        >
                                          <i className="far fa-edit" /> Edit
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`tab-pane fade ${activeTab === 'billing' ? 'show active' : ''}`} id="billing">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive table-striped">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Doctor</th>
                                    <th>Appt Date</th>
                                    <th>Booking Date</th>
                                    <th>Amount</th>
                                    <th>Follow Up</th>
                                    <th>Status</th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <h2 className="table-avatar">
                                        <Link
                                          to="#"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="/img/doctors/doctor-thumb-02.jpg"
                                            alt="User"
                                          />
                                        </Link>
                                        <Link to="#">
                                          Dr. Darren Elder <span>Dental</span>
                                        </Link>
                                      </h2>
                                    </td>
                                    <td>
                                      14 Nov 2019{" "}
                                      <span className="d-block text-info">
                                        10.00 AM
                                      </span>
                                    </td>
                                    <td>12 Nov 2019</td>
                                    <td>$160</td>
                                    <td>16 Nov 2019</td>
                                    <td>
                                      <span className="badge badge-pill bg-success-light">
                                        Confirm
                                      </span>
                                    </td>
                                    <td className="text-right">
                                      <div className="table-action">
                                        <Link
                                          to="#"
                                          className="btn btn-sm bg-success-light"
                                        >
                                          <i className="far fa-edit" /> Edit
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo, compInfo: state.compInfo };
}

export default connect(mapStateToProps, {loaderAction, userInfoAction, modalAction, bookingInfoAction})(DoctorDashboard);
