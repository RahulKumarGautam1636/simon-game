import { BreadCrumb, getFrom, groupMembers } from '../utilities';
import { connect } from 'react-redux';
import { modalAction, userInfoAction } from '../../../../actions';
import { MemberCard } from '../cards'
import { Link } from 'react-router-dom';
import { memberLabel } from '../../../../constants';


const ProviderProfile = ({ userInfo, compCode, modalAction, userInfoAction }) => {

    // const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true, decode: false });

    // const [doctorData, setDoctorData] = useState({loading: true, data: [], err: {status: false, msg: ''}});

    // useEffect(() => {
    //     if (queryString.CID) {
    //         getDoctorData(queryString.CID);
    //         } else {
    //         getDoctorData(userInfo.selectedCompany.EncCompanyId);
    //     }
    // }, [queryString.CID, userInfo.selectedCompany.EncCompanyId])

    // const getDoctorData = async (companyCode) => {
	// 	if (!companyCode) return;
	// 	const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&DID=${match.params.id}`, {}, setDoctorData);
	// 	if (res) {
	// 	  setTimeout(() => {
	// 		setDoctorData(res);  
	// 	  }, 1000)
	// 	}                                                                                                   
	// } 

    const breadCrumbData = {
		links: [{name: 'Home', link: '/'}, {name: 'Profile', link: `/profile/${userInfo.PartyCode}`}],
		activeLink: `/profile/${userInfo.PartyCode}`
	}

    const primaryUser = userInfo.MembersList.AccPartyMemberMasterList.find(i => i.MemberId === userInfo.MemberId);
    const allMembers = userInfo.MembersList.AccPartyMemberMasterList.filter(i => i.MemberId !== userInfo.MemberId);

    const groupedMembers = groupMembers(allMembers) || {};
    const members = Object.values(groupedMembers);    

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
                                                <h5>{userInfo.Qualification}</h5>
                                                <h5 className="mb-3">{userInfo.GenderDesc}, {userInfo.Age} Years</h5>
                                                <h5 className="myBtnStyle d-inline-block" style={{'--local-bg': 'hsla(195deg, 90%, 54%, .16)', '--local-clr': '#0b92be'}}><i className='bx bxs-phone-call align-middle me-1' style={{fontSize: '1.1em'}}></i> {userInfo.RegMob1}</h5>
                                                <h5 className='mb-0' style={{whiteSpace: 'normal', lineHeight: 1.6}}><i className='fas fa-map-marker text-blue-500' style={{fontSize: '1.1em'}}></i> {userInfo.Address}, {userInfo.StateName} {userInfo.Pin}</h5>
                                                {/* <h5 className="mb-0 myBtnStyle d-inline-block"></h5> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-widget d-none d-lg-block">
                                    <nav className="dashboard-menu">
                                        <ul>
                                            <li className="active">
                                                <Link to="#">
                                                    <i className="fas fa-columns"></i>
                                                    <span>Profile</span>
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
                            {/* <div className="row">
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
                            </div> */}
                            <div className="row">
                                <div className="col-md-12">
                                    {/* <h4 className="mb-4">Patient Appoinment</h4> */}
                                    <div className="appointment-tab">
                                        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded border-0 align-items-center" style={{padding: '1.1em', fontSize: '1.1em'}}>
                                            <li className="nav-item">
                                                <Link className={`nav-link active`} to="#">{memberLabel}s</Link>
                                            </li> 
                                            {/* <li className="nav-item mx-2">
                                                <Link className={`nav-link ${appnDayTab === 'today' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('today'); getAppnData('ENQ')}}>Today</Link>
                                            </li> 	 */}
                                            <li className='ms-auto'>
                                                <button onClick={() => modalAction('MEMBER_MODAL', true)} className='dashboard-card__btn-box-item reverse-hover d-flex align-items-center icon-btn' style={{'--clr': '#48fffc3b', '--bg': '#149A8D', '--bClr': '#149a8d57', gap: '0.3em', padding: '0.5em 0.6em'}}><i className='bx bx-plus-circle'></i> Add New {memberLabel}</button>
                                            </li>
                                        </ul>                                        
                                        <div className="tab-content">
                                            <div className='tab-pane fade show active' id="previous-appointments">
                                                <div className="card card-table mb-0 border-0">
                                                    {/* <div className="card-body">
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
                                                    </div>	 */}
                                                        <div className='bg-gray-200 py-2 px-3'>
                                                            <p className='text-gray-800 mb-0'>
                                                                Primary User
                                                            </p>
                                                        </div>
                                                        <div className="card-body">
                                                            <MemberCard key={primaryUser.MemberId} userType={userInfo.UserType} data={primaryUser} modalAction={modalAction} mode='provider_dashboard' userInfoAction={userInfoAction} selected={userInfo.selectedMember?.MemberId} />
                                                        </div>
                                                        {members.flatMap(i => {
                                                            {/* if (i.UnderDoctDesc === '' && i.ProviderDesc === '' && i.ReferrerDesc === '' && i.MarketedDesc === '') return undefined; */}
                                                            console.log(i, userInfo.MemberId)
                                                            return (
                                                                <>
                                                                    <div className='bg-gray-200 py-2 px-3'>
                                                                        <p className='text-gray-800 mb-0'>
                                                                            {userInfo.MemberId == i.MemberId ? 'Primary User' : `CE: ${i.UnderDoctDesc}, PE: ${i.ProviderDesc}, RE: ${i.ReferrerDesc}, ME: ${i.MarketedDesc}`}
                                                                        </p>
                                                                    </div>
                                                                    <div className="card-body">
                                                                        {i.items.map(item => (
                                                                            <MemberCard key={item.MemberId} userType={userInfo.UserType} data={item} modalAction={modalAction} mode='provider_dashboard' userInfoAction={userInfoAction} selected={userInfo.selectedMember?.MemberId} />
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                </div>	
                                            </div>
                                        </div>
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

const mapStateToProviderProfile = (state) => {
    return { compCode: state.compCode, userInfo: state.userInfo };
}
  
export default connect(mapStateToProviderProfile, { modalAction, userInfoAction })(ProviderProfile);