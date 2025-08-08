import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppnRow, DashboardAppnListCard, ErrorCard, LabAppnRow, TestAppnCard } from '../cards';
import { getFrom, NologinWarning, BreadCrumb, CompanySlider, all } from '../utilities';
import { loaderAction, userInfoAction } from '../../../../actions';
import Skeleton from 'react-loading-skeleton';
import qs from 'query-string';
import { BASE_URL, SRC_URL } from '../../../../constants';


const PatientDashboard = ({ isLoggedIn, compCode, userInfo, loaderAction, compInfo, userInfoAction, isMobile, bookingInfo, globalData }) => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appnDayTab, setAppnDayTab] = useState('today');
  const [activeOrderTab, setActiveOrderTab] = useState('active_orders');
  const [testDayTab, setTestDayTab] = useState('today');
  const [appData, setAppnData] = useState({loading: false, data: {PartyFollowupList: []}, err: {status: false, msg: ''}});
  const [labData, setLabData] = useState({loading: false, data: {PartyFollowupList: []}, err: {status: false, msg: ''}});
  const [activeCompany, setActiveCompany] = useState({});
  const sliderRef = useRef(); 
  const location = useLocation();
  const { tab, day } = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 

  const tabs = { appn: 'appointments', lab: 'labTests', pharmacy: 'pharmacy', others: 'others' };  
  const days = { today: {name: 'today', apiParam: 'ENQ'}, tomorrow: {name: 'upcoming', apiParam: 'UENQ'}, yesterday: {name: 'previous', apiParam: 'PENQ'} }; 

  const [appnStyle, setAppnStyle] = useState('grid');
  const [labStyle, setLabStyle] = useState('grid');

  useEffect(() => {
    if (!userInfo.selectedCompany.EncCompanyId) return;
    let currDay = days[day];
    if (currDay) {
      getAppnData(currDay.apiParam);  
      getLabData(currDay.apiParam); 
    } else {
      getAppnData("ENQ");   
      getLabData("ENQ"); 
    }
  },[userInfo.UserId, userInfo.selectedCompany.EncCompanyId])  

  useEffect(() => {
    let currTab = tabs[tab];
    let currDay = days[day];
    if (currTab) setActiveTab(currTab);
    if (currDay) {
      setAppnDayTab(currDay.name);
      setTestDayTab(currDay.name);
    }    
  }, [])

  const resetTabs = () => {
    setAppnDayTab('today');
    setTestDayTab('today');
  }

  const getAppnData = async (query, userId = userInfo.UserId, companyId = userInfo.selectedCompany.EncCompanyId) => {
    if (userInfo.UserId > 1) {
      const res = await getFrom(`${BASE_URL}/api/Appointment/Get?id=${userId}&CID=${companyId}&Type=${query}&CatType=OPD&MemberId=${'0'}`, {}, setAppnData);
      if (res) {
        setTimeout(() => {
          setAppnData(res);            
        }, 400)
      }
    }
  }

  const renderAppnData = (data, viewType) => {
    if (data.loading) {
      return viewType === 'grid' ? <div className='w-100'><Skeleton count={14}/></div> : <tr><td colSpan={6}><Skeleton count={14}/></td></tr>;
    } else if (data.err.status) {
      return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`}/>
    } else if (data.data.PartyFollowupList.length === 0) {
      return <h2 className="text-danger py-2">No Appointments Found</h2>;
    } else {
      return data.data.PartyFollowupList.map((item, index) => {
          if (appnStyle === 'grid') return <DashboardAppnListCard key={item.AutoId} data={item} />;
          return <AppnRow data={item} key={item.AutoId} />
      })
    }
  }

  const getLabData = async (query, userId = userInfo.UserId, companyId = userInfo.selectedCompany.EncCompanyId) => {
    if (userInfo.UserId > 1) {
      const res = await getFrom(`${BASE_URL}/api/Appointment/Get?id=${userId}&CID=${companyId}&Type=${query}&CatType=INVESTIGATION&MemberId=${'0'}`, {}, setLabData);
      if (res) {
        setTimeout(() => {
          setLabData(res);            
        }, 400)
      }
    }
  }

  const renderLabData = (data, viewType) => {
    if (data.loading) {
      return viewType === 'grid' ? <div className='w-100'><Skeleton count={14}/></div> : <tr><td colSpan={6}><Skeleton count={14}/></td></tr>;
    } else if (data.err.status) {
      return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`}/>
    } else if (data.data.PartyFollowupList.length === 0) {
      return <h2 className="text-danger py-2">No Appointments Found</h2>;
    } else {
      return data.data.PartyFollowupList.map((item, index) => {
          if (labStyle === 'grid') return <TestAppnCard key={item.AutoId} data={item} compCode={compCode} locationId={globalData.location.LocationId} />;
          return <LabAppnRow key={item.AutoId} data={item} compCode={compCode} locationId={globalData.location.LocationId} />
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
    if (!companyTabList.data.length) return;
    if (userInfo.selectedCompany.EncCompanyId) {
      setActiveCompany(userInfo.selectedCompany);     
    } else {
      alert('Something went wrong. 132');
    }
  },[userInfo.selectedCompany.EncCompanyId, companyTabList])

  useEffect(() => {
    if (!isMobile) return;
    if (!companyTabList.data.length) return;
    const activeCompanyIndex = companyTabList.data.findIndex((i => i.EncCompanyId === activeCompany.EncCompanyId));
    sliderRef.current.slickGoTo(activeCompanyIndex);
  }, [companyTabList.data])
  
  const handleCompanySelect = (item) => {
    resetTabs();                        // reset tabs to today.
    setActiveCompany(item);                                                                                                              // resetting Department to get All specialists on specialists page when user revisits that page.         
    userInfoAction({selectedCompany: item, Department: {dName: 'All', SubCode: 0} });      // This will avoid the mismatch of company id and spicialists id.
    setAppnDayTab('today');
  }

  const onAllClick = () => {
    alert('Not Avaialble yet..');
  }

  const renderCompList = (data) => {
    if (data.loading) {
      return <div className='w-100'><Skeleton count={3}/></div>;
    } else if (data.err.status) {
      return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`}/>
    } else if (data.data.length === 0) {
      return <div className='text-center my-5'><h2 className="text-info mark">No Company List found</h2></div>;
    } else {
      const cards = data.data.map(item => (
        <div key={item.EncCompanyId}>
          <div className={`companyTabCard d-flex position-relative cursor-pointer ${item.COMPNAME === activeCompany.COMPNAME ? 'active' : ''}`} onClick={() => handleCompanySelect(item)}>
            <img src={`${SRC_URL}/Content/CompanyLogo/${item.LogoUrl}`} className="img-fluid logo" style={{maxHeight: '1.9em', marginRight: '.8em'}}/>
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
    links: [{name: 'Home', link: '/'}, {name: 'Dashboard', link: '/dashboard'}],
    activeLink: '/dashboard'
  }

  if (!isLoggedIn) {
    return <NologinWarning />;
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
              <div className="col-12 dct-appoinment">
                <div className="card">
                  <div className="card-body">
                    <div style={{fontSize: '0.8em', marginBottom: '1.3em'}}>
                      <div className='dashboard-card dashboard-card-user_card'>
                        <div className='dashboard-card__img-box'>
                          <img src="/img/user_unknown.png" alt="User" />
                          <div className="img">
                            <Link to={'#'} title={userInfo.Name}>{userInfo.Name}</Link>
                            {userInfo.UHID && <span>UHID : {userInfo.UHID}</span>}
							              <span className="badge badge-pill" style={{background: '#c9eaff', fontSize: '1.1em', width: 'fit-content', marginTop: '0.3em', color: '#006693'}}>{userInfo.UserType}</span>
                          </div>
                        </div>
                        <div className="dashboard-card__content-box">
                          <p><span><i className='bx bxs-phone-call'></i> Phone : </span><span> +91 {userInfo.RegMob1}</span></p>
                          <p><span><i className="bx bxs-hourglass-bottom"></i> Age : </span><span> {userInfo.Age} Years</span></p>
                          <p><span><i className='bx bx-male-female'></i> Gender : </span> <span>{userInfo.GenderDesc}</span></p>
                          <p className='mb-0'><span><i className='bx bxs-map'></i> Address : </span> <span>{userInfo.Address}</span></p>
                        </div> 
                      </div>
                    </div>
                    <div className="user-tabs mb-3">
                      <ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap">
                        <li className="nav-item">
                          <Link className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('appointments')}>
                            Appointments
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className={`nav-link ${activeTab === 'labTests' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('labTests')}>
                            <span>Lab Tests</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className={`nav-link ${activeTab === 'pharmacy' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('pharmacy')}>
                            <span>Pharmacy</span>
                          </Link>
                        </li>
                        {/* <li className="nav-item">
                          <Link className={`nav-link ${activeTab === 'others' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('others')}>
                            <span>Others</span>
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                    <div className="tab-content" id='patiendProfile_tabs'>
                      <div id="appointments" className={`tab-pane fade ${activeTab === 'appointments' ? 'show active' : ''}`}>
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="appointment-tab">
                              <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-3 border-0 gap-2">
                                <li className="nav-item">
                                  <Link className={`nav-link ${appnDayTab === 'previous' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('previous');getAppnData('PENQ')}}>Previous</Link>
                                </li>	 
                                <li className="nav-item">
                                  <Link className={`nav-link ${appnDayTab === 'today' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('today');getAppnData('ENQ')}}>Today</Link>
                                </li>	 
                                <li className="nav-item">
                                    <Link className={`nav-link ${appnDayTab === 'upcoming' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('upcoming');getAppnData('UENQ')}}>Upcoming</Link>
                                  </li>
                                <li className="nav-item ms-md-auto">
                                    <Link className={`nav-link ${appnStyle === 'grid' ? 'active' : ''}`} to="#" onClick={() => {setAppnStyle('grid')}} style={{padding: '0.3em 0.6em'}}><i className='bx bxs-grid' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${appnStyle === 'list' ? 'active' : ''}`} to="#" onClick={() => {setAppnStyle('list')}} style={{padding: '0.3em 0.6em'}}><i className='bx bx-list-ul' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                </li>	
                              </ul>                          
                              <div className="tab-content">
                                <div className='tab-pane fade show active'>
                                  <div className="card card-table mb-0 border-0 px-1">
                                    <div className="card-body">
                                      {/* {renderAppnData(appData)}	 */}
                                      {appnStyle === 'grid' ? renderAppnData(appData, 'grid') :
                                      <div className="table-responsive" style={{fontSize: '1.5em', flex: 1}}> 
                                        <table className="table table-hover table-center mb-0">
                                          <thead>
                                            <tr>
                                              <th>Patient</th>
                                              <th>Appt Date</th>
                                              <th>Dept./Service</th>
                                              <th>App Confirm</th>
                                              <th>Service Status</th>
                                              <th className='text-center'>Action</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {renderAppnData(appData, 'list')}
                                          </tbody>
                                        </table>		
                                      </div>}
                                    </div>	
                                  </div>	
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`tab-pane fade ${activeTab === 'labTests' ? 'show active' : ''}`} id="labTests">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="appointment-tab">
                              <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-3 pe-0 border-0 gap-2">
                                <li className="nav-item">
                                  <Link className={`nav-link ${testDayTab === 'previous' ? 'active' : ''}`} to="#" onClick={() => {setTestDayTab('previous');getLabData('PENQ')}}>Previous</Link>
                                </li> 
                                <li className="nav-item">
                                  <Link className={`nav-link ${testDayTab === 'today' ? 'active' : ''}`} to="#" onClick={() => {setTestDayTab('today');getLabData('ENQ')}}>Today</Link>
                                </li> 
                                <li className="nav-item">
                                  <Link className={`nav-link ${testDayTab === 'upcoming' ? 'active' : ''}`} to="#" onClick={() => {setTestDayTab('upcoming');getLabData('UENQ')}}>Upcoming</Link>
                                </li>
                                <li className="nav-item ms-md-auto">
                                    <Link className={`nav-link ${labStyle === 'grid' ? 'active' : ''}`} to="#" onClick={() => {setLabStyle('grid')}} style={{padding: '0.3em 0.6em'}}><i className='bx bxs-grid' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${labStyle === 'list' ? 'active' : ''}`} to="#" onClick={() => {setLabStyle('list')}} style={{padding: '0.3em 0.6em'}}><i className='bx bx-list-ul' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                </li>	
                              </ul>                          
                              <div className="tab-content">
                                <div className='tab-pane fade show active'>
                                  <div className="card card-table mb-0 border-0 px-1">
                                    <div className="card-body">
                                      {/* {renderAppnData(appData)}	 */}
                                      {labStyle === 'grid' ? renderLabData(labData, 'grid') :
                                      <div className="table-responsive" style={{fontSize: '1.5em', flex: 1}}> 
                                        <table className="table table-hover table-center mb-0">
                                          <thead>
                                            <tr>
                                              <th>Patient</th>
                                              <th>Appt Date</th>
                                              <th>Dept./Service</th>
                                              <th>App Confirm</th>
                                              <th>Service Status</th>
                                              <th className='text-center'>Action</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {renderLabData(labData, 'list')}
                                          </tbody>
                                        </table>		
                                      </div>}
                                    </div>	
                                  </div>	
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`tab-pane fade ${activeTab === 'pharmacy' ? 'show active' : ''}`} id="pharmacy">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="appointment-tab">
                              <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-3 pe-0 border-0">
                                <li className="nav-item">
                                  <Link className={`nav-link ${activeOrderTab === 'active_orders' ? 'active' : ''}`} to="#" onClick={() => {setActiveOrderTab('active_orders')}}>Active</Link>
                                </li> 
                                <li className="nav-item mx-2">
                                  <Link className={`nav-link ${activeOrderTab === 'cancelled_orders' ? 'active' : ''}`} to="#" onClick={() => {setActiveOrderTab('cancelled_orders')}}>Cancelled</Link>
                                </li> 
                                <li className="nav-item">
                                  <Link className={`nav-link ${activeOrderTab === 'completed_orders' ? 'active' : ''}`} to="#" onClick={() => {setActiveOrderTab('completed_orders')}}>Completed</Link>
                                </li>
                              </ul>                          
                              <div className="tab-content">
                                <div className='tab-pane fade show active'>
                                <div className="card card-table mb-0 border-0 px-1">
                                  <div className="card-body">
                                    <h2 className="text-danger py-2">No Orders Found!</h2>
                                  </div>	
                                </div>	
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div id="others" className={`tab-pane fade ${activeTab === 'others' ? 'show active' : ''}`}>
                        <h2 className="text-danger py-2">Coming Soon..</h2>
                      </div> */}
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

}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.isLoggedIn, isMobile: state.isMobile, compCode: state.compCode, userInfo: state.userInfo, compInfo: state.compInfo, bookingInfo: state.bookingInfo, globalData: state.globalData };
}

export default connect(mapStateToProps, {loaderAction, userInfoAction})(PatientDashboard);
