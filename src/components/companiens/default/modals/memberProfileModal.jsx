import { modalAction } from '../../../../actions';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppnRow, CommentsCard, DashboardAppnListCard, ErrorCard, LabAppnRow, TestAppnCard } from '../cards';
import { getFrom } from '../utilities';
import Skeleton from 'react-loading-skeleton';
import { BASE_URL } from '../../../../constants';


const MemberProfile = ({ modals, modalAction, userInfo, isLoggedIn, globalData, compCode }) => {
    const [tabActive, setTabActive] = useState('appointments');
    const [appnDayTab, setAppnDayTab] = useState('today');
    const [testDayTab, setTestDayTab] = useState('today');
    const [appnData, setAppnData] = useState({loading: false, data: {PartyFollowupList: []}, err: {status: false, msg: ''}});
    const [labData, setLabData] = useState({loading: false, data: {PartyFollowupList: []}, err: {status: false, msg: ''}});
    const [appnStyle, setAppnStyle] = useState('grid');
    const [labStyle, setLabStyle] = useState('grid');

    const { tab, memberId } = modals.MEMBER_PROFILE_MODAL.data;

    useEffect(() => {
        if (!userInfo.EncCompanyId) return;
        getTabData("ENQ");
        getLabData("ENQ");
    },[userInfo.UserId, userInfo.EncCompanyId])

    useEffect(() => {
        setTabActive(tab);
    },[tab])

    const getTabData = async (query, userId = userInfo.UserId, companyId = userInfo.EncCompanyId, id = memberId) => {
        if (userInfo.UserId > 1) {
            const res = await getFrom(`${BASE_URL}/api/Appointment/Get?id=${userId}&CID=${companyId}&Type=${query}&CatType=OPD&MemberId=${id}`, {}, setAppnData);
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
          return data.data.PartyFollowupList.map(item => {
            if (appnStyle === 'grid') return <DashboardAppnListCard key={item.AutoId} data={item} />;
            return <AppnRow data={item} key={item.AutoId} />
        })}
    }

    const getLabData = async (query, userId = userInfo.UserId, companyId = userInfo.EncCompanyId, id = memberId) => {
        if (userInfo.UserId > 1) {
            const res = await getFrom(`${BASE_URL}/api/Appointment/Get?id=${userId}&CID=${companyId}&Type=${query}&CatType=INVESTIGATION&MemberId=${memberId}`, {}, setLabData);
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
          return <h2 className="text-danger py-2">No Tests Found</h2>;
        } else {
          return data.data.PartyFollowupList.map(item => {
            if (labStyle === 'grid') return <TestAppnCard key={item.AutoId} data={item} compCode={compCode} locationId={globalData.location.LocationId}/>;
            return <LabAppnRow data={item} key={item.AutoId} />
        })}
    }

    

    return (
        <div className="card default-global">
            <div className="card-header">
                <h4 className="card-title ms-auto" style={{cursor: 'pointer', width: 'fit-content'}} onClick={() => modalAction('MEMBER_PROFILE_MODAL', false)}><i className='bx bxs-left-arrow'></i> Go Back</h4>
            </div>
            <div className="card-body">
                <nav className="user-tabs mb-4">
                    <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                        <li className="nav-item">
                            <span className={`nav-link ${tabActive === 'appointments' ? 'active' : ''}`} onClick={() => setTabActive('appointments')}>Appointments</span>
                        </li>
                        <li className="nav-item">
                            <span className={`nav-link ${tabActive === 'labTests' ? 'active' : ''}`} onClick={() => setTabActive('labTests')}>Lab Tests</span>
                        </li>
                        <li className="nav-item">
                            <span className={`nav-link ${tabActive === 'pharmacy' ? 'active' : ''}`} onClick={() => setTabActive('pharmacy')}>Medicines</span>
                        </li>
                        {/* <li className="nav-item">
                            <span className={`nav-link ${tabActive === 'others' ? 'active' : ''}`} onClick={() => setTabActive('others')}>Others</span>
                        </li> */}
                    </ul>
                </nav>
                
                <div className="tab-content pt-0">
                    <div role="tabpanel" id="appointments" className={`tab-pane fade ${tabActive === 'appointments' ? 'show active' : ''}`}>
                        <div className="card card-table mb-0">
                            <div className="card-body">
                                <div className="appointment-tab">
                                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-3 border-0 gap-2">
                                        <li className="nav-item">
                                            <Link className={`nav-link ${appnDayTab === 'previous_appointments' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('previous_appointments');getTabData('PENQ')}}>Previous</Link>
                                        </li> 
                                        <li className="nav-item">
                                            <Link className={`nav-link ${appnDayTab === 'today' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('today');getTabData('ENQ')}}>Today</Link>
                                        </li> 
                                        <li className="nav-item">
                                            <Link className={`nav-link ${appnDayTab === 'upcoming_appointments' ? 'active' : ''}`} to="#" onClick={() => {setAppnDayTab('upcoming_appointments');getTabData('UENQ')}}>Upcoming</Link>
                                        </li>
                                        <li className="nav-item ms-md-auto">
                                            <Link className={`nav-link ${appnStyle === 'grid' ? 'active' : ''}`} to="#" onClick={() => {setAppnStyle('grid')}} style={{padding: '0.3em 0.6em'}}><i className='bx bxs-grid' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${appnStyle === 'list' ? 'active' : ''}`} to="#" onClick={() => {setAppnStyle('list')}} style={{padding: '0.3em 0.6em'}}><i className='bx bx-list-ul' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                        </li>
                                    </ul>                           
                                    <div className="tab-content">
                                        <div className='tab-pane fade show active' id="previous-appointments">
                                            <div className="card card-table mb-0 border-0">
                                                <div className="card-body">
                                                    {appnStyle === 'grid' ? renderAppnData(appnData, 'grid', 'appointments') :
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
                                                                {renderAppnData(appnData, 'list', 'appointments')}
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
                    
                    <div role="tabpanel" id="labTests" className={`tab-pane fade ${tabActive === 'labTests' ? 'show active' : ''}`}>
                        {/* <h4 className="mt-0 mt-md-2">No Lab Tests Booked!</h4> */}
                        <div className="card card-table mb-0">
                            <div className="card-body">
                                <div className="appointment-tab">
                                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-3 border-0 gap-2">
                                        <li className="nav-item">
                                            <Link className={`nav-link ${testDayTab === 'previous_tests' ? 'active' : ''}`} to="#" onClick={() => {setTestDayTab('previous_tests');getLabData('PENQ')}}>Previous</Link>
                                        </li> 
                                        <li className="nav-item">
                                            <Link className={`nav-link ${testDayTab === 'today' ? 'active' : ''}`} to="#" onClick={() => {setTestDayTab('today');getLabData('ENQ')}}>Today</Link>
                                        </li> 
                                        <li className="nav-item">
                                            <Link className={`nav-link ${testDayTab === 'upcoming_tests' ? 'active' : ''}`} to="#" onClick={() => {setTestDayTab('upcoming_tests');getLabData('UENQ')}}>Upcoming</Link>
                                        </li>
                                        <li className="nav-item ms-md-auto">
                                            <Link className={`nav-link ${labStyle === 'grid' ? 'active' : ''}`} to="#" onClick={() => {setLabStyle('grid')}} style={{padding: '0.3em 0.6em'}}><i className='bx bxs-grid' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${labStyle === 'list' ? 'active' : ''}`} to="#" onClick={() => {setLabStyle('list')}} style={{padding: '0.3em 0.6em'}}><i className='bx bx-list-ul' style={{fontSize: '1.9em', verticalAlign: 'middle'}}></i></Link>
                                        </li>
                                    </ul>                           
                                    <div className="tab-content">
                                        <div className='tab-pane fade show active' id="previous-appointments">
                                            <div className="card card-table mb-0 border-0">
                                                <div className="card-body">
                                                    {labStyle === 'grid' ? renderLabData(labData, 'grid', 'labTests') :
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
                                                                {renderLabData(labData, 'list', 'labTests')}
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
                    
                    <div role="tabpanel" id="pharmacy" className={`reviews-page tab-pane fade ${tabActive === 'pharmacy' ? 'show active' : ''}`}>
                        <h4 className="mt-0 mt-md-2">No Medicines Booked!</h4>
                        {/* <div style={{fontSize: '1.4rem', width: '100%', padding: '0 3px'}}>
                            <div className="top-section d-flex">
                                <div className="reviews-total">
                                    <h1>{overallRating}</h1>
                                    <div className="stars">
                                        {allStars.map((i, n) => i === 'full' ? <i key={n} className='bx bxs-star'></i> : i === 'half' ? <i key={n} className='bx bxs-star-half'></i> : <i key={n} className='bx bx-star'></i>)}
                                    </div>
                                    <p>({reviewDataArray.length} reviews)</p>
                                    <svg className="bar-circle" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="bar-circle-bg" d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#ecececc9" strokeWidth="4"/>
                                        <path className="bar-circle-stroke" style={{strokeDashoffset: tabActive === 'pharmacy' ? starsInRadians : ''}} d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#FFBF1C" strokeWidth="4"/>
                                    </svg>
                                </div>
                                <div className="review-bars w-100">
                                    <div className="bar-item">
                                        <span>5</span> <i className='bx bxs-star'></i>
                                        <div className="progress">
                                            <div className="progress-bar bg-transparent" style={{width: '100%'}} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                                <div className="h-100 bg-warning" style={{animation: tabActive === 'pharmacy' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                                            </div>
                                        </div>
                                        <span>{rating_5}</span>
                                    </div>
                                    <div className="bar-item">
                                        <span>4</span> <i className='bx bxs-star'></i>
                                        <div className="progress">
                                            <div className="progress-bar bg-transparent" style={{width: '80%'}} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                                                <div className="h-100 bg-warning" style={{animation: tabActive === 'pharmacy' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                                            </div>
                                        </div>
                                        <span>{rating_4}</span>
                                    </div>
                                    <div className="bar-item">
                                        <span>3</span> <i className='bx bxs-star'></i>
                                        <div className="progress">
                                            <div className="progress-bar bg-transparent" style={{width: '60%'}} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                                <div className="h-100 bg-warning" style={{animation: tabActive === 'pharmacy' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                                            </div>
                                        </div>
                                        <span>{rating_3}</span>
                                    </div>
                                    <div className="bar-item">
                                        <span>2</span> <i className='bx bxs-star'></i>
                                        <div className="progress">
                                            <div className="progress-bar bg-transparent" style={{width: '40%'}} role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                                <div className="h-100 bg-warning" style={{animation: tabActive === 'pharmacy' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                                            </div>
                                        </div>
                                        <span>{rating_2}</span>
                                    </div>
                                    <div className="bar-item mb-0">
                                        <span>1</span> <i className='bx bxs-star'></i>
                                        <div className="progress">
                                            <div className="progress-bar bg-transparent" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                <div className="h-100 bg-warning" style={{animation: tabActive === 'pharmacy' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                                            </div>
                                        </div>
                                        <span>{rating_1}</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                            
                        {/* <h4 className="my-3">Customer Reviews</h4>
                        <div className="widget review-listing">
                            <ul className="comments-list">
                                {reviewDataArray.map(item => (<li key={data.id}><CommentsCard review={item} handleAction={handleAction} userId={userInfo.UserId}/></li>))}
                            </ul>
                            <div className="all-feedback text-center d-flex flex-column flex-md-row gap-3 gap-md-5 justify-content-center align-items-center">
                                <Link to="#" className="btn btn-primary btn-sm">
                                    Show all feedback <strong>(167)</strong>
                                </Link>
                                {!isLoggedIn && <Link to="#" className="btn btn-primary btn-sm">
                                    Login to Write a Review
                                </Link>}
                            </div>									
                        </div>
                        
                    
                        
                        {isLoggedIn && <div className="write-review">
                            <h4>Write a review for <strong>Dr. Darren Elder</strong></h4>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="form-group">
                                    <label>Review</label>
                                    <div className="star-rating">
                                        <i className={`bx bx${rating[0] ? 's' : ''}-star`} onClick={() => setRating([true, false, false, false, false])}></i>
                                        <i className={`bx bx${rating[1] ? 's' : ''}-star`} onClick={() => setRating([true, true, false, false, false])}></i>
                                        <i className={`bx bx${rating[2] ? 's' : ''}-star`} onClick={() => setRating([true, true, true, false, false])}></i>
                                        <i className={`bx bx${rating[3] ? 's' : ''}-star`} onClick={() => setRating([true, true, true, true, false])}></i>
                                        <i className={`bx bx${rating[4] ? 's' : ''}-star`} onClick={() => setRating([true, true, true, true, true])}></i>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Title of your review</label>
                                    <input className="form-control" onChange={(e) => handleReview(e)} value={review.title} name='title' type="text" placeholder="If you could say it in one sentence, what would you say?"/>
                                </div>
                                <div className="form-group">
                                    <label>Your review</label>
                                    <textarea id="review_desc" onChange={(e) => handleReview(e)} value={review.content} name='content' maxLength="100" className="form-control"></textarea>											  
                                <div className="d-flex justify-content-between mt-3"><small className="text-muted"><span id="chars">100</span> characters remaining</small></div>
                                </div>
                                <hr/>
                                <div className="form-group">
                                    <div className="terms-accept">
                                        <div className="custom-checkbox">
                                        <input type="checkbox" id="terms_accept"/>
                                        <label htmlFor="terms_accept">I have read and accept <Link to="#">Terms &amp; Conditions</Link></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button type="submit" className="btn btn-primary submit-btn">Add Review</button>
                                </div>
                            </form>
                        </div>}						 */}
                    </div>
                    
                    {/* <div role="tabpanel" id="others" className={`tab-pane fade ${tabActive === 'others' ? 'show active' : ''}`}>
                        <div className='text-center'><h2 className="text-danger mark my-5">Coming soon!</h2></div>									
                    </div> */}
                </div>
            </div>
        </div>
    )
}

const mapStateToMemberProfile = (state) => {
    return { modals: state.modals, compCode: state.compCode, userInfo: state.userInfo, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, globalData: state.globalData, };
}

export default connect(mapStateToMemberProfile, {modalAction})(MemberProfile);