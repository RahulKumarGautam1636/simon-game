import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logOut, NologinWarning, Spinner, getFrom, BreadCrumb } from '../utilities';
import { BASE_URL } from '../../../../constants';
import Skeleton from 'react-loading-skeleton';

const DoctorDashboard = ({ isLoggedIn, compCode, userInfo }) => {
  const [activeTab, setActiveTab] = useState('today_appointments');
  const [tabData, setTabData] = useState({loading: false, data: {PartyFollowupList: []}, err: {status: false, msg: ''}});
  const history = useHistory();

  useEffect(() => {
	  getTabData('ENQ');
  },[userInfo.PartyCode])

  const getTabData = async (query) => {
	if (userInfo.PartyCode !== '') {
	  const res = await getFrom(`${BASE_URL}/api/Appointment/Get?id=${userInfo.UserId}&CID=${compCode}&Type=${query}&CatType=OPD&MemberId=${'0'}`, {}, setTabData);
	  if (res) {
		setTimeout(() => {
		  setTabData(res);            
		}, 400)
	  }
	}
  }

//   const Card6 = ({ data }) => {
// 	return (
// 		<div className='card-6'>
// 			{data.PartyName}
// 		</div>
// 	)
//   }

  const renderTabData = (data) => {
	if (data.loading) {
	  return <tr style={{position: 'relative'}}><td colSpan="9" className='p-0'><Skeleton count={6}/></td></tr>;
	} else if (data.err.status) {
	  return <tr><td colSpan="9" className='p-0'><h2 className="text-danger mark py-4 w-100 text-center" style={{fontSize: '1.4em'}}>An error occured, please try again later. Error code: <span className="text-dark d-inline">{data.err.msg}</span></h2></td></tr>;
	} else if (data.data.PartyFollowupList.length === 0) {
	  return <tr><td colSpan="9" className='p-0'><h2 className="text-danger mark py-4 w-100 text-center" style={{fontSize: '1.4em'}}>No Appointments Found</h2></td></tr>;
	} else {
	  return data.data.PartyFollowupList.map(item => {
		// return <Card6 data={item} />
		return (
		  <tr key={item.PartyName}>
			<td>
			<h2 className="table-avatar">
			  <Link to="#" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="/img/user_unknown.png" alt="User Image"/></Link>
			  <Link to="#">{item.PartyName} <span>#PT0016</span></Link>
			</h2>
			</td>
			<td>{new Date(item.NextAppDate).toLocaleDateString('en-TT') + " "} <span className="d-block text-info">{item.NextAppTime}</span></td>
			{/* <td>{item.CallDate.split('T')[0]}</td> */}
			<td>{item.DeptName}</td>
			<td>
			<span className={`badge badge-pill bg-${ item.IsAppConfirmed === 'Y' ? 'success' : 'danger' }-light`}>
			{ item.IsAppConfirmed === 'Y' ? 'Confirmed' : 'Not Confirmed' }
			</span>
			</td>
			<td>
			<span className={`badge badge-pill bg-${ item.Status === 'Y' ? 'success' : 'danger' }-light`}>
			{ item.Status === 'Y' ? 'Done' : 'Pending' }
			</span>
			</td>
			<td dangerouslySetInnerHTML={{ __html: item.Remarks }}></td>
			<td dangerouslySetInnerHTML={{ __html: item.Remarks1 }}></td>
			<td dangerouslySetInnerHTML={{ __html: item.Remarks2 }}></td>
			<td className="text-right">
			<div className="table-action">
			  <Link to="#" className="btn btn-sm bg-info-light">
			  <i className="far fa-eye"></i> View
			  </Link>
			  
			  <Link to="#" className="btn btn-sm bg-success-light mx-2">
			  <i className="fas fa-check"></i> Accept
			  </Link>
			  <Link to="#" className="btn btn-sm bg-danger-light">
			  <i className="fas fa-times"></i> Cancel
			  </Link>
			</div>
			</td>
		  </tr>
		)
	  })
	}
  }

  const breadCrumbData = {
	links: [{name: 'Home', link: '/'}, {name: 'Collector Dashboard', link: '/collectorDashboard'}],
	activeLink: '/collectorDashboard'
  }

  if (!isLoggedIn) {
	return (
	  <NologinWarning />
	);
  } else {
	return (
		<>
			<BreadCrumb data={breadCrumbData}/>
			<div className="content dashboard" id='doctor_dashboard'>
				<div className="container-fluid">

					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
							
							<div className="profile-sidebar">
								<div className="widget-profile pro-widget-content">
									<div className="profile-info-widget">
										<Link to="#" className="booking-doc-img">
											<img src="/img/user_unknown.png" alt="User Image"/>
										</Link>
										<div className="profile-det-info">
											<h3>{userInfo.Name}</h3>
											
											<div className="patient-details">
												<h5>{userInfo.Qualification}</h5>
												<h5 className="mb-2">{userInfo.SpecialistDesc}</h5>
												<h5 className='mb-4'>Reg No: {userInfo.LicenceNo}</h5>
												<h5 className="myBtnStyle d-inline-block" style={{'--local-bg': 'hsla(195deg, 90%, 54%, .16)', '--local-clr': '#0b92be'}}><i className='bx bxs-phone-call align-middle me-1' style={{fontSize: '1.1em'}}></i> {userInfo.RegMob1}</h5>
												{/* <h5 className="mb-0 myBtnStyle d-inline-block"></h5> */}
											</div>
										</div>
									</div>
								</div>
								<div className="dashboard-widget">
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

							<div className="row">
								<div className="col-md-12">
									<div className="card dash-card">
										<div className="card-body">
											<div className="row" style={{fontFamily: 'Poppins'}}>
												<div className="col-md-12 col-lg-4">
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
												
												<div className="col-md-12 col-lg-4">
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
												
												<div className="col-md-12 col-lg-4">
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
							</div>
							
							<div className="row">
								<div className="col-md-12">
									<h4 className="mb-4">Patient Appoinment</h4>
									<div className="appointment-tab">
									
										{/* Appointment Tab */}
										<ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded border-0" style={{padding: '1.1em', fontSize: '1.15em'}}>
											<li className="nav-item">
												<Link className={`nav-link ${activeTab === 'previous_appointments' ? 'active' : ''}`} to="#" onClick={() => {setActiveTab('previous_appointments');getTabData('PENQ')}}>Previous</Link>
											</li> 
											<li className="nav-item mx-2">
												<Link className={`nav-link ${activeTab === 'today_appointments' ? 'active' : ''}`} to="#" onClick={() => {setActiveTab('today_appointments');getTabData('ENQ')}}>Today</Link>
											</li> 
											<li className="nav-item">
												<Link className={`nav-link ${activeTab === 'upcoming_appointments' ? 'active' : ''}`} to="#" onClick={() => {setActiveTab('upcoming_appointments');getTabData('UENQ')}}>Upcoming</Link>
											</li>
										</ul>
										{/* /Appointment Tab */}
										
										<div className="tab-content">
										
											<div className='tab-pane fade show active' id="previous-appointments">
												<div className="card card-table mb-0 border-0 px-1">
													<div className="card-body">
														<div className="table-responsive w-100">
															<table className="table table-hover table-center mb-0" style={{fontSize: '1.4em'}}>
																<thead>
																	<tr>
																		<th>Patient</th>
																		<th>Appt Date</th>
																		{/* <th>Booking Date</th> */}
																		<th>Dept./Service</th>
																		{/* <th>App Confirm</th> */}
																		{/* <th>Follow Up</th> */}
																		<th>App Confirm</th>
																		<th>Service Status</th>
																		<th>Diagnosis</th>
																		<th>Doc. Remarks</th>
																		<th>Followup Remarks</th>
																		<th>Action</th>
																	</tr>
																</thead>
																<tbody>
																	{renderTabData(tabData)}
																</tbody>
															</table>		
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
				</div>
			</div>
		</>	
	)
  }

}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo };
}

export default connect(mapStateToProps, {})(DoctorDashboard);
