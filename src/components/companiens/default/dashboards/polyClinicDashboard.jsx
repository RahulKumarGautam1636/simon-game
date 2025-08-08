import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logOut, NologinWarning, Spinner, getFrom, BreadCrumb, Pagination } from '../utilities';
import { ConnectedDocPreviewCard } from '../cards';
import { BASE_URL } from '../../../../constants';

const DoctorDashboard = ({ isLoggedIn, compCode, userInfo }) => {
 
  const [docList, setDocList] = useState({loading: true, data: [], err: {status: false, msg: ''}});
  const [activePage, setActivePage] = useState(1);
  const history = useHistory();


  const visibleItems = 9;                 // Number of items currently visible on the page.


  const getDocList = async (companyCode, query) => {
	let currDate = new Date().toLocaleDateString('en-TT');
    const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&type=INTDOCT&prefixText=&Specialist=${query}&Sdate=${currDate}&Area=&Pin=&LowerFeesRange=&UpperFeesRange=`, {}, setDocList);
    if (res) {
      setTimeout(() => {
        setDocList(res);
      }, 1000)
    }                                                                                                   
  } 
  
  useEffect(() => {
	// getDocList(compCode, userInfo.Department.SubCode);
	getDocList(compCode, '0');
//   },[compCode, userInfo.Department.SubCode])
  },[compCode])

  const breadCrumbData = {
	links: [{name: 'Home', link: '/'}, {name: 'Polyclinic Dashboard', link: '/dashboard'}],
	activeLink: '/dashboard'
  }

  const renderDoctors = (data) => {
    if (data.loading) {
      return <Spinner min_height='28rem' fSize='2rem'/>;
    } else if (data.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.length === 0) {
		return <div className='text-center my-5 w-100'><h2 className="text-info mark">No Doctors been found for current filters</h2></div>;
	} else {
      return data.data.slice((activePage-1)*visibleItems, activePage*visibleItems).map(item => {
        return (
			<div className="col-md-12 col-lg-4" key={item.PartyCode}>
				<ConnectedDocPreviewCard data={item}/>
			</div>
		)
      })
    }
  }

  if (!isLoggedIn) {
    return (
      <NologinWarning />
    );
  } else {
    return (
		<>
			<BreadCrumb data={breadCrumbData}/>
			<div className="content default-global dashboard" style={{fontSize: '1.1em'}} id='doctor_dashboard'>
				<div className="container-fluid">

					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
							<div className="profile-sidebar">
								<div className="dashboard-widget">
									<nav className="dashboard-menu">
										<ul>
											<li className="active">
												<Link to="#">
													<i className="fas fa-columns"></i>
													<span>Dashboard</span>
												</Link>
											</li>
											<li>
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
											</li>
										</ul>
									</nav>
								</div>
							</div>						
						</div>
						
						<div className="col-md-7 col-lg-8 col-xl-9" style={{fontFamily: 'Poppins'}}>
							<div className="row doc-preview" style={{minHeight: '65vh'}}>
								{renderDoctors(docList)}
							</div>
							<Pagination activePage={activePage} setActivePage={setActivePage} visibleItems={visibleItems} data={docList.data}/>
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
