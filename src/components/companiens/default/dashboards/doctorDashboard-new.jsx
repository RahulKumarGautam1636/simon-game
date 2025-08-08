import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logOut, NologinWarning, Spinner, getFrom, BreadCrumb, CompanySlider, all, JQDatePicker, today, mmDDyyyyDate, NoContent } from '../utilities';
import { BASE_URL, SRC_URL } from '../../../../constants';
import Skeleton from 'react-loading-skeleton';
import { userInfoAction } from '../../../../actions';
import { AppnRow, DashboardAppnListCard, ErrorCard, LabAppnRow, TestAppnCard } from '../cards';
import qs from 'query-string';
import { uType } from '../../../utils/utils';

const DoctorDashboard = ({ isLoggedIn, compCode, userInfo, userInfoAction, globalData, isMobile }) => {
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
  const isDoctor = false // userInfo.UserLevelSeq === uType.DOCTOR.level;
  const [appnStatusTab, setAppnStatusTab] = useState('pending');

//   const Card6 = ({ data }) => {
// 	return (
// 		<div className='card-6'>
// 			{data.PartyName}
// 		</div>
// 	)
//   }

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
      return viewType === 'grid' ? <div className='w-100'><Skeleton count={14}/></div> : <tr><td colSpan={6} className='p-0'><Skeleton count={14}/></td></tr>;
    } else if (data.err.status) {
      return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`}/>
    } else if (data.data.PartyFollowupList.length === 0) {
      return <NoContent head={'No Appointments Found'} textClass='text-rose-600 mb-3'/>
    } else {

      let items = []
      if (appnStatusTab === 'pending') {
        items = data.data.PartyFollowupList.filter(i => i.IsAppConfirmed !== 'Y')
      } else if (appnStatusTab === 'confirmed') {
        items = data.data.PartyFollowupList.filter(i => i.IsAppConfirmed === 'Y')
      } else if (appnStatusTab === 'completed') {
        items = data.data.PartyFollowupList.filter(i => i.Status === 'Y')
      }

      return items.map((item, index) => {
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
      return <NoContent head={'No Tests Found'} textClass='text-rose-600 mb-3'/>
    } else {
      let items = []
      if (appnStatusTab === 'pending') {
        items = data.data.PartyFollowupList.filter(i => i.IsAppConfirmed !== 'Y')
      } else if (appnStatusTab === 'confirmed') {
        items = data.data.PartyFollowupList.filter(i => i.IsAppConfirmed === 'Y')
      } else if (appnStatusTab === 'completed') {
        items = data.data.PartyFollowupList.filter(i => i.Status === 'Y')
      }

      return items.map((item, index) => {
          if (labStyle === 'grid') return <TestAppnCard key={item.AutoId} data={item} compCode={compCode} locationId={globalData.location.LocationId} />;
          return <LabAppnRow key={item.AutoId} data={item} compCode={compCode} locationId={globalData.location.LocationId} />
      })
    }
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [companyTabList, setCompanyTabList] = useState({loading: true, data: [], err: {status: false, msg: ''}});

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
    if (!isMobile || companyTabList.data.length === 1) return;
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

//   const renderTabData = (data) => {
//     if (data.loading) {
//       return <tr style={{position: 'relative'}}><td colSpan="9" className='p-0'><Skeleton count={6}/></td></tr>;
//     } else if (data.err.status) {
//       return <tr><td colSpan="9" className='p-0'><h2 className="text-danger mark py-4 w-100 text-center" style={{fontSize: '1.4em'}}>An error occured, please try again later. Error code: <span className="text-dark d-inline">{data.err.msg}</span></h2></td></tr>;
//     } else if (data.data.PartyFollowupList.length === 0) {
//       return <tr><td colSpan="9" className='p-0'><h2 className="text-danger mark py-4 w-100 text-center" style={{fontSize: '1.4em'}}>No Appointments Found</h2></td></tr>;
//     } else {
//       return data.data.PartyFollowupList.map(item => {
//         // return <Card6 data={item} />
//         return (
//           <tr key={item.PartyName}>
//             <td>
//             <h2 className="table-avatar">
//               <Link to="#" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="/img/user_unknown.png" alt="User Image"/></Link>
//               <Link to="#">{item.PartyName} <span>#PT0016</span></Link>
//             </h2>
//             </td>
//             <td>{new Date(item.NextAppDate).toLocaleDateString('en-TT') + " "} <span className="d-block text-info">{item.NextAppTime}</span></td>
//             {/* <td>{item.CallDate.split('T')[0]}</td> */}
//             <td>{item.DeptName}</td>
//             <td>
//             <span className={`badge badge-pill bg-${ item.IsAppConfirmed === 'Y' ? 'success' : 'danger' }-light`}>
//             { item.IsAppConfirmed === 'Y' ? 'Confirmed' : 'Not Confirmed' }
//             </span>
//             </td>
//             <td>
//             <span className={`badge badge-pill bg-${ item.Status === 'Y' ? 'success' : 'danger' }-light`}>
//             { item.Status === 'Y' ? 'Done' : 'Pending' }
//             </span>
//             </td>
//             <td dangerouslySetInnerHTML={{ __html: item.Remarks }}></td>
//             <td dangerouslySetInnerHTML={{ __html: item.Remarks1 }}></td>
//             <td dangerouslySetInnerHTML={{ __html: item.Remarks2 }}></td>
//             <td className="text-right">
//             <div className="table-action">
//               <Link to="#" className="btn btn-sm bg-info-light">
//               <i className="far fa-eye"></i> View
//               </Link>
              
//               <Link to="#" className="btn btn-sm bg-success-light mx-2">
//               <i className="fas fa-check"></i> Accept
//               </Link>
//               <Link to="#" className="btn btn-sm bg-danger-light">
//               <i className="fas fa-times"></i> Cancel
//               </Link>
//             </div>
//             </td>
//           </tr>
//         )
//       })
//     }
//   }

// const head = [
//   'Department',	
//   'No. of Patient',	
//   'No. of Cases',	
//   'Avg Amount',	
//   'DBC',	
//   'Net', 
//   'Amount',	
//   'Total'
// ]	

const tableBody = [
  { id: 1, name: 'USG', patientCount: 456, casesCount: 507, avgAmount: 236, dbc: 455, netAmount: 10555, total: 11000 },
  { id: 2, name: 'Pathology', patientCount: 456, casesCount: 507, avgAmount: 236, dbc: 455, netAmount: 10555, total: 11000 },
  { id: 3, name: 'Non-Pathology', patientCount: 456, casesCount: 507, avgAmount: 236, dbc: 455, netAmount: 10555, total: 11000 },
  { id: 4, name: 'OPD', patientCount: 456, casesCount: 507, avgAmount: 236, dbc: 455, netAmount: 10555, total: 11000 },
  { id: 5, name: 'IPD', patientCount: 456, casesCount: 507, avgAmount: 236, dbc: 455, netAmount: 10555, total: 11000 },
  { id: 6, name: 'OT', patientCount: 456, casesCount: 507, avgAmount: 236, dbc: 455, netAmount: 10555, total: 11000 }
];

// const [date, setDate] = useState({ from: today.toLocaleDateString('en-TT'), to: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('en-TT') });
const [fromDate, setFromDate] = useState(new Date().toLocaleDateString('en-TT'));
const [toDate, setToDate] = useState(new Date(mmDDyyyyDate(fromDate, '/', '/')).toLocaleDateString('en-TT'));
const [duration, setDuration] = useState('day');

let range = { day: 1, week: 7, month: 30 }

const handleDate = (type) => {

    setFromDate(pre => {
      let preDate = mmDDyyyyDate(pre, '/', '/');
      let d = new Date(preDate);
      let a;
      if (type === 'next') {
        a = new Date(d.setDate(d.getDate() + range[duration])).toLocaleDateString('en-TT');  
      } else {
        a = new Date(d.setDate(d.getDate() - range[duration])).toLocaleDateString('en-TT');
      }
      return a;
    })
}

useEffect(() => {
  let to = new Date(mmDDyyyyDate(fromDate, '/', '/'));
  setToDate(new Date(to.setDate(to.getDate() + range[duration])).toLocaleDateString('en-TT'));
}, [fromDate])

  if (!isLoggedIn) {
    return (
      <NologinWarning />
    );
  } else {
    return (
        <>
            <BreadCrumb data={breadCrumbData}/>
            <div className="content dashboard default-global" id='doctor_dashboard'>
                <div className="container-fluid">
                   
                    <div className="row">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar position-relative">
                            
                            <div className="profile-sidebar position-sticky top-0 md:h-full">
                                <div className="widget-profile pro-widget-content">
                                    <div className="profile-info-widget">
                                        <Link to="#" className="booking-doc-img">
                                            <img src="/img/user_unknown.png" alt="User Image"/>
                                        </Link>
                                        <div className="profile-det-info">
                                            <h3>{userInfo.Name}</h3>
                                            
                                            <div className="patient-details">
                                                <h5 className='font-medium'>{userInfo.Qualification}</h5>
                                                <h5 className="mb-3">{userInfo.GenderDesc}, {userInfo.Age} Years</h5>
                                                <h5 className="myBtnStyle d-inline-block" style={{'--local-bg': 'hsla(195deg, 90%, 54%, .16)', '--local-clr': '#0b92be'}}><i className='bx bxs-phone-call align-middle me-1' style={{fontSize: '1.1em'}}></i> {userInfo.RegMob1}</h5>
                                                <h5 className='mb-0 flex text-start gap-4 p-3 bg-slate-100 !leading-[1.6] !whitespace-normal'><i className='fas fa-map-marker text-blue-500 mt-2 text-[1.1em]' ></i> {userInfo.Address}, {userInfo.StateName} {userInfo.Pin}</h5>
                                                {/* <h5 className="mb-0 myBtnStyle d-inline-block"></h5> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-widget d-none d-lg-none">
                                    <nav className="dashboard-menu">
                                        <ul>
                                            <li className="active">
                                                <Link to="#">
                                                    <i className="fas fa-columns"></i>
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            {/* <li>
                                                <Link to="#">
                                                    <i className="fas fa-calendar-check"></i>
                                                    <span>Appointments</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fas fa-user-injured"></i>
                                                    <span>My Patients</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fas fa-hourglass-start"></i>
                                                    <span>Schedule Timings</span>
                                                </Link>
                                            </li>
                                            <li className='d-none'>
                                                <Link to="#">
                                                    <i className="fas fa-file-invoice"></i>
                                                    <span>Invoices</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fas fa-star"></i>
                                                    <span>Reviews</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fas fa-comments"></i>
                                                    <span>Message</span>
                                                    <small className="unread-msg">23</small>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fas fa-user-cog"></i>
                                                    <span>Profile Settings</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fas fa-share-alt"></i>
                                                    <span>Social Media</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fas fa-lock"></i>
                                                    <span>Change Password</span>
                                                </Link>
                                            </li>
                                            <li onClick={() => logOut(history)}>
                                                <Link to="#">
                                                    <i className="fas fa-sign-out-alt"></i>
                                                    <span>Logout</span>
                                                </Link>
                                            </li> */}
                                        </ul>
                                    </nav>
                                </div>
                            </div>						
                        </div>
                        <div className="col-md-7 col-lg-8 col-xl-9">
                            {companyTabList.data.length > 1 && <div style={{padding: '0 0 0.8em', fontSize: '1.15em'}} id='companyTabs'>
                                {renderCompList(companyTabList)}
                            </div>}
                            {isDoctor &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card dash-card">
                                        <div className="card-body" style={{padding: '1.2em 1.2em 0.8em'}}>
                                            <div className="row" style={{fontFamily: 'Poppins'}}>
                                                <div className="col-6 col-lg-4">
                                                    <div className="dash-widget dct-border-rht">
                                                        <div className="circle-bar circle-bar1">
                                                            <div className="circle-graph border border-5 border-danger">
                                                                <img src="/img/icon-01.png" className="img-fluid" alt="patient"/>
                                                            </div>
                                                        </div>
                                                        <div className="dash-widget-info">
                                                            <h6>Total Patient</h6>
                                                            <h3>0</h3>
                                                            <p className="text-muted">Till Today</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-6 col-lg-4">
                                                    <div className="dash-widget dct-border-rht">
                                                        <div className="circle-bar circle-bar2">
                                                            <div className="circle-graph border border-5 border-info">
                                                                <img src="/img/icon-02.png" className="img-fluid" alt="Patient"/>
                                                            </div>
                                                        </div>
                                                        <div className="dash-widget-info">
                                                            <h6>Today Patient</h6>
                                                            <h3>0</h3>
                                                            <p className="text-muted">{new Date().toDateString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-6 col-lg-4">
                                                    <div className="dash-widget">
                                                        <div className="circle-bar circle-bar3">
                                                            <div className="circle-graph border border-5 border-warning">
                                                                <img src="/img/icon-03.png" className="img-fluid" alt="Patient"/>
                                                            </div>
                                                        </div>
                                                        <div className="dash-widget-info">
                                                            <h6>Appoinments</h6>
                                                            <h3>0</h3>
                                                            <p className="text-muted">{new Date().toDateString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            <div className="row">
                                <div className="col-md-12">

                                  <div className="user-tabs mb-lg-4 mt-2" style={{fontSize: '1.1em'}}>
                                    <ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap p-3 p-lg-0 gap-3 rounded-0">
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
                                  <style>{`
                                    .nav-tabs .nav-link {
                                        background: #e7e7e7;
                                    }
                                  `}</style>
                                  <div className="tab-content" id='patiendProfile_tabs'>
                                    <div id="appointments" className={`tab-pane fade ${activeTab === 'appointments' ? 'show active' : ''}`}>
                                      <div className="card card-table mb-0 bx-shadow-none">
                                        <div className="card-body">
                                          <div className="appointment-tab mb-0">
                                            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-4 border-0 gap-2">
                                              <li className="nav-item">
                                                <Link className={`nav-link ${appnDayTab === 'previous' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('previous');getAppnData('PENQ')}}>Previous</Link>
                                              </li>	 
                                              <li className="nav-item">
                                                <Link className={`nav-link ${appnDayTab === 'today' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('today');getAppnData('ENQ')}}>Today</Link>
                                              </li>	 
                                              <li className="nav-item">
                                                  <Link className={`nav-link ${appnDayTab === 'upcoming' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('upcoming');getAppnData('UENQ')}}>Upcoming</Link>
                                                </li>
                                              <li className="nav-item ms-auto">
                                                  <Link className={`nav-link ${appnStyle === 'grid' ? 'active' : ''}`} to="#" onClick={() => {setAppnStyle('grid')}} style={{padding: '0.3em 0.6em'}}><i className='bx bxs-grid' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                              </li>
                                              <li className="nav-item">
                                                  <Link className={`nav-link ${appnStyle === 'list' ? 'active' : ''}`} to="#" onClick={() => {setAppnStyle('list')}} style={{padding: '0.3em 0.6em'}}><i className='bx bx-list-ul' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                              </li>	
                                            </ul>                          
                                            <div className="tab-content">
                                              <div className='tab-pane fade show active'>
                                                <div className="card card-table mb-0 border-0 px-1">
                                                  <div className='btn-group-4 mx-3 pt-3 border-b border-gray-200 !text-[0.9em]'>
                                                    <button className={`${appnStatusTab === 'pending' ? 'active' : ''}`} onClick={() => setAppnStatusTab('pending')}>Pending</button>
                                                    <button className={`${appnStatusTab === 'confirmed' ? 'active' : ''}`} onClick={() => setAppnStatusTab('confirmed')}>Confirmed</button>
                                                    <button className={`${appnStatusTab === 'completed' ? 'active' : ''}`} onClick={() => setAppnStatusTab('completed')}>Completed</button>
                                                    <button className={`${appnStatusTab === 'cancelled' ? 'active' : ''}`} onClick={() => setAppnStatusTab('cancelled')}>Cancelled</button>
                                                  </div>
                                                  <div className="card-body">
                                                    {/* {renderAppnData(appData)}	 */}
                                                    {appnStyle === 'grid' ? renderAppnData(appData, 'grid') :
                                                    <div className="table-responsive" style={{fontSize: '1.65em', flex: 1}}> 
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
                                            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-4 border-0 gap-2">
                                              <li className="nav-item">
                                                <Link className={`nav-link ${testDayTab === 'previous' ? 'active' : ''}`} to="#" onClick={() => {setTestDayTab('previous');getLabData('PENQ')}}>Previous</Link>
                                              </li> 
                                              <li className="nav-item">
                                                <Link className={`nav-link ${testDayTab === 'today' ? 'active' : ''}`} to="#" onClick={() => {setTestDayTab('today');getLabData('ENQ')}}>Today</Link>
                                              </li> 
                                              <li className="nav-item">
                                                <Link className={`nav-link ${testDayTab === 'upcoming' ? 'active' : ''}`} to="#" onClick={() => {setTestDayTab('upcoming');getLabData('UENQ')}}>Upcoming</Link>
                                              </li>
                                              <li className="nav-item ms-auto">
                                                  <Link className={`nav-link ${labStyle === 'grid' ? 'active' : ''}`} to="#" onClick={() => {setLabStyle('grid')}} style={{padding: '0.3em 0.6em'}}><i className='bx bxs-grid' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                              </li>
                                              <li className="nav-item">
                                                  <Link className={`nav-link ${labStyle === 'list' ? 'active' : ''}`} to="#" onClick={() => {setLabStyle('list')}} style={{padding: '0.3em 0.6em'}}><i className='bx bx-list-ul' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                              </li>	
                                            </ul>                          
                                            <div className="tab-content">
                                              <div className='tab-pane fade show active'>
                                                <div className="card card-table mb-0 border-0 px-1">
                                                  <div className='btn-group-4 mx-3 pt-3 border-b border-gray-200 !text-[0.9em]'>
                                                    <button className={`${appnStatusTab === 'pending' ? 'active' : ''}`} onClick={() => setAppnStatusTab('pending')}>Pending</button>
                                                    <button className={`${appnStatusTab === 'confirmed' ? 'active' : ''}`} onClick={() => setAppnStatusTab('confirmed')}>Confirmed</button>
                                                    <button className={`${appnStatusTab === 'completed' ? 'active' : ''}`} onClick={() => setAppnStatusTab('completed')}>Completed</button>
                                                    <button className={`${appnStatusTab === 'cancelled' ? 'active' : ''}`} onClick={() => setAppnStatusTab('cancelled')}>Cancelled</button>
                                                  </div>
                                                  <div className="card-body">
                                                    {/* {renderAppnData(appData)}	 */}
                                                    {labStyle === 'grid' ? renderLabData(labData, 'grid') :
                                                    <div className="table-responsive" style={{fontSize: '1.65em', flex: 1}}> 
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
                                            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-4 border-0">
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
                                                  <NoContent head={'No Records Found'} textClass='text-rose-600 mb-3'/>
                                                </div>	
                                              </div>	
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div id="others" className={`tab-pane fade ${activeTab === 'others' ? 'show active' : ''}`}>
                                      <h2 className="text-danger py-2 px-4">Coming Soon..</h2>
                                    </div> */}
                                  </div>



                                    {/* <h4 className="mb-4">Patient Appoinment</h4>
                                    <div className="appointment-tab">
                                        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded border-0" style={{padding: '1.1em', fontSize: '1.15em'}}>
                                            <li className="nav-item">
                                                <Link className={`nav-link ${appnDayTab === 'previous' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('previous'); getAppnData('PENQ')}}>Previous</Link>
                                            </li> 
                                            <li className="nav-item mx-2">
                                                <Link className={`nav-link ${appnDayTab === 'today' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('today'); getAppnData('ENQ')}}>Today</Link>
                                            </li> 
                                            <li className="nav-item">
                                                <Link className={`nav-link ${appnDayTab === 'upcoming' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('upcoming'); getAppnData('UENQ')}}>Upcoming</Link>
                                            </li>
                                            <li className="nav-item ms-auto">
                                                <Link className={`nav-link`} to="#" onClick={() => {setAppnStyle(appnStyle === 'grid' ? 'list' : 'grid')}} style={{padding: '0.3em 0.6em'}}><i className={`bx bx${appnStyle === 'grid' ? '-list-ul' : 's-grid'}`} style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                            </li>	
                                        </ul>                                        
                                        <div className="tab-content">
                                            <div className='tab-pane fade show active' id="previous-appointments">
                                                <div className="card card-table mb-0 border-0">
                                                    <div className="card-body">
                                                        {appnStyle === 'grid' ? renderAppnData(appData, 'grid') :
                                                        <div className="table-responsive" style={{flex: 1}}> 
                                                            <table className="table table-hover table-center mb-0" style={{fontSize: '1.45em'}}>
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
                                    </div> */}
                                </div>
                            </div>
                            <style>{`
                              thead th {
                                padding: 0.8em 0.5em ! important;
                              }
                            `}</style>
                            {isDoctor && <div className="row">
                              <div className="col-md-12">
                                <div className="card card-table mb-0 border-0 px-1">
                                  <div className="card-body p-3">
                                    <div className="mb-4 mt-3 d-flex justify-content-between gap-4 flex-wrap">
                                      <h4 className="mb-0">{userInfo.Name}</h4>
                                      <select className="form-select form-control pe-5 fw-medium ms-auto" name='duration' value={duration} onChange={(e) => setDuration(e.target.value)} aria-label="Default select" id="inputSelect" style={{lineHeight: 1, width: 'fit-content'}}>
                                        <option value="day">Day</option>
                                        <option value="week">Week</option>
                                        <option value="month">Month</option>
                                      </select>
                                      <div className="form-group form-focus focused d-flex gap-3 mb-0 align-items-center">
                                        <i className='bx bxs-chevrons-left text-blue-600' onClick={() => handleDate('prev')} style={{fontSize: '1.4em'}}></i>
                                        {/* <JQDatePicker id={'from'} isRequired={true} setState={setDate} curValue={date.from} name={'from'} customClass={'form-control'} required style={{width: 100}} /> */}
                                        <JQDatePicker id={'fromDate'} isRequired={true} handler={setFromDate} curValue={fromDate} name={'from'} customClass={'form-control'} required style={{width: 100}} />
                                        <span>To</span>
                                        {/* <JQDatePicker id={'to'} isRequired={true} setState={setDate} curValue={date.to} name={'to'} customClass={'form-control'} required style={{width: 100}} /> */}
                                        <JQDatePicker id={'toDate'} isRequired={true} handler={setToDate} curValue={toDate} name={'to'} customClass={'form-control'} required style={{width: 100}} />
                                        <i className='bx bxs-chevrons-right text-blue-600' onClick={() => handleDate('next')} style={{fontSize: '1.4em'}}></i>
                                      </div>
                                    </div>
                                    <div className="table-responsive" style={{ flex: "1 1 0%" }}>
                                      <table className="table table-hover table-center mb-0" style={{ fontSize: "1.1em" }}>
                                        <thead>
                                          <tr>
                                            <th>Department</th>
                                            <th className='text-end'>No. of Patient</th>
                                            <th className='text-end'>No. of Cases</th>
                                            <th className='text-end'>Avg Amount</th>
                                            <th className='text-end'>DBC</th>
                                            <th className='text-end'>Net Amount</th>
                                            <th className='text-end'>Total</th>
                                            {/* <th className="text-center">Action</th> */}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {tableBody.map(i => (
                                            <tr key={i.id}>
                                              <td className='ps-3'>
                                                <h2 className="table-avatar text-center">
                                                  <a className="fw-medium" href="#/dashboard">
                                                    {i.name}
                                                  </a>
                                                </h2>
                                              </td>
                                              <td className='text-end'>
                                                {i.patientCount}
                                              </td>
                                              <td className='text-end'>{i.casesCount}</td>
                                              <td className='text-end'>
                                                {i.avgAmount}
                                              </td>
                                              <td className='text-end'>
                                                {i.dbc}
                                              </td>
                                              <td className='text-end'>{i.netAmount}</td>
                                              <td className='text-end pe-3'>{i.total}</td>
                                              {/* <td>{i.}</td> */}
                                            </tr>
                                          ))}
                                          {/* <tr>
                                            <td className='ps-3'>
                                              <h2 className="table-avatar text-center">
                                                <a className="fw-medium" href="#/dashboard">
                                                  USG
                                                </a>
                                              </h2>
                                            </td>
                                            <td>
                                              456
                                            </td>
                                            <td>507</td>
                                            <td>
                                              236
                                            </td>
                                            <td>
                                              455
                                            </td>
                                            <td>10555</td>
                                            <td>11000</td>
                                            <td>24000</td>
                                          </tr>
                                          <tr>
                                              <td className='ps-3'>
                                                <h2 className="table-avatar text-center">
                                                  <a className="fw-medium" href="#/dashboard">
                                                    Pathology
                                                  </a>
                                                </h2>
                                              </td>
                                              <td>
                                                456
                                              </td>
                                              <td>507</td>
                                              <td>
                                                236
                                              </td>
                                              <td>
                                                455
                                              </td>
                                              <td>10555</td>
                                              <td>11000</td>
                                              <td>24000</td>
                                            </tr>
                                            <tr>
                                              <td className='ps-3'>
                                                <h2 className="table-avatar text-center">
                                                  <a className="fw-medium" href="#/dashboard">
                                                    Non-Pathology
                                                  </a>
                                                </h2>
                                              </td>
                                              <td>
                                                456
                                              </td>
                                              <td>507</td>
                                              <td>
                                                236
                                              </td>
                                              <td>
                                                455
                                              </td>
                                              <td>10555</td>
                                              <td>11000</td>
                                              <td>24000</td>
                                            </tr>
                                            <tr>
                                              <td className='ps-3'>
                                                <h2 className="table-avatar text-center">
                                                  <a className="fw-medium" href="#/dashboard">
                                                    OPD
                                                  </a>
                                                </h2>
                                              </td>
                                              <td>
                                                456
                                              </td>
                                              <td>507</td>
                                              <td>
                                                236
                                              </td>
                                              <td>
                                                455
                                              </td>
                                              <td>10555</td>
                                              <td>11000</td>
                                              <td>24000</td>
                                            </tr>
                                            <tr>
                                              <td className='ps-3'>
                                                <h2 className="table-avatar text-center">
                                                  <a className="fw-medium" href="#/dashboard">
                                                    IPD
                                                  </a>
                                                </h2>
                                              </td>
                                              <td>
                                                456
                                              </td>
                                              <td>507</td>
                                              <td>
                                                236
                                              </td>
                                              <td>
                                                455
                                              </td>
                                              <td>10555</td>
                                              <td>11000</td>
                                              <td>24000</td>
                                            </tr>
                                            <tr>
                                              <td className='ps-3'>
                                                <h2 className="table-avatar text-center">
                                                  <a className="fw-medium" href="#/dashboard">
                                                    OT
                                                  </a>
                                                </h2>
                                              </td>
                                              <td>
                                                456
                                              </td>
                                              <td>507</td>
                                              <td>
                                                236
                                              </td>
                                              <td>
                                                455
                                              </td>
                                              <td>10555</td>
                                              <td>11000</td>
                                              <td>24000</td>
                                            </tr> */}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                {/* <table className="table" style={{boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', fontSize: '1em', fontFamily: 'Lato', background: 'white' }} >
                                  <thead>
                                    <tr role="row" className='text-nowrap'> 
                                        <th className="sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="SL: activate to sort column descending" > 
                                            Department 
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="SOURCE: activate to sort column ascending" >
                                            No. of Patient
                                        </th>
                                        <th className="sorting_disabled" rowSpan={1} colSpan={1} aria-label="Date" >
                                            No. of Cases
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="QID: activate to sort column ascending" >
                                            Avg Amount
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Query For: activate to sort column ascending" >
                                            DBC
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Customer Details: activate to sort column ascending" >
                                            Net Amount
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Message: activate to sort column ascending" >
                                            Total
                                        </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                      <tr role="row" className="odd">
                                          <td className="sorting_1">1</td>
                                          <td>Buyer</td>
                                          <td>2025-04-07</td>
                                          <td>THUQN1003</td>
                                          <td>Home Theater </td>
                                          <td>
                                              kumar Gautam <br /> MGM@gmail.com <br /> 9163226377
                                          </td>
                                          <td>TEST MESSAGE</td>
                                      </tr>
                                      <tr role="row" className="even">
                                          <td className="sorting_1">2</td>
                                          <td>Buyer</td>
                                          <td>2025-04-07</td>
                                          <td>THUQN1002</td>
                                          <td>Home Theater </td>
                                          <td>
                                              kumar Gautam <br /> MGM@gmail.com <br /> 9163226377
                                          </td>
                                          <td>TEST MESSAGE</td>
                                      </tr>
                                      <tr role="row" className="odd">
                                          <td className="sorting_1">3</td>
                                          <td>Buyer</td>
                                          <td>2025-04-07</td>
                                          <td>THUQN1001</td>
                                          <td>Home Theater </td>
                                          <td>
                                              kumar Gautam <br /> MGM@gmail.com <br /> 9163226377
                                          </td>
                                          <td>TEST MESSAGE</td>
                                      </tr>
                                  </tbody>
                              </table> */}
                              </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>	
    )
  }

}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo, globalData: state.globalData, isMobile: state.isMobile };
}

export default connect(mapStateToProps, {userInfoAction})(DoctorDashboard);
