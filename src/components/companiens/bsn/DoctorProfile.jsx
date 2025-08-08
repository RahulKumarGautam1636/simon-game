import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { bookingInfoAction, modalAction } from "../../../actions";
import { connect } from "react-redux";
import { getFrom, Spinner } from "../default/utilities";
import Skeleton from "react-loading-skeleton";
import { getDoctors } from "./Doctors2";
import qs from 'query-string';
import { ErrorCard } from "../default/cards";
import { DocListCard } from "./utils/cards";
import { addedDocImages } from "./utils/utilities";
import { BASE_URL } from "../../../constants";

const DoctorProfile = ({ modalAction, bookingInfoAction, userInfo, match, compCode }) => {

    const [tabActive, setTabActive] = useState('overview');
    const doctorId = match.params.id;
    
    const location = useLocation();
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 
    const specialistId = queryString.specialistId;

    useEffect(() => {
		getDoctorData(userInfo.selectedCompany.EncCompanyId);
        if (specialistId) {
            getDoctors(userInfo.selectedCompany.EncCompanyId, specialistId, setRelatedDoctors);
        } else {
            setRelatedDoctors(pre => ({...pre, loading: false}));
        }
	}, [userInfo.selectedCompany.EncCompanyId, doctorId])

	const [doctorData, setDoctorData] = useState({loading: true, data: [], err: {status: false, msg: ''}});
    const [relateDoctors, setRelatedDoctors] = useState({loading: true, data: [], err: {status: false, msg: ''}});

    const renderRelatedDoctors = (data) => {        
        if (data.loading) {
            return <div className='w-100'><Skeleton count={10}/></div>;
          } else if (data.err.status) {
            return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`} />
          } else if (data.data.length === 0) {
            return <div className='text-center w-100'><h2 className="text-info mark" style={{fontSize: '1.5rem'}}>No Doctors found</h2></div>;
          } else {
            return data.data.slice(0, 10).map(i => {
                const hasImage = addedDocImages.find(x =>  x.split('.')[0] === (i.PartyCode).toString());
                return (
                    <li key={i.PartyCode}>
                        <DocListCard data={i} hasImage={hasImage && `/assets/img/BSN/doctors/${hasImage}`} link={`/doctors/${i.PartyCode}`} />
                    </li>
                )
            })
        }
    }

	const getDoctorData = async (companyCode) => {
		if (!companyCode) return;
		const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&DID=${doctorId}`, {}, setDoctorData);
		if (res) {
		  setTimeout(() => {
			setDoctorData(res);  
		  }, 1000)
		}                                                                                                   
	}  

    const handleBooking = (data) => {      
        bookingInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: '', companyId: '', selectedAppnDate: ''}); 
        modalAction('APPN_BOOKING_MODAL', true);
    }

	const renderDoctor = (data) => {
		if (data.loading) {
		  return <div className='w-100'><Skeleton count={20}/></div>;
		} else if (data.err.status) {
		  return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
		} else if (data.data.length === 0) {
		  return <div className='text-center my-5 w-100'><h2 className="text-info mark">Invalid Doctor or Something wen't wrong.</h2></div>;
		} else {
          let doctor = data.data[0];
          const hasImage = addedDocImages.find(x =>  x.split('.')[0] === (doctor.PartyCode).toString());
          return (                             
            <div className="doctor-profile">
                <div className="card" style={{fontSize: '0.93em'}}>
                    <div className="card-body" style={{display: 'flex', gap: '1.2em', borderBottom: '1px solid #e3e3e3'}}>
                        <div className="profile-img">
                            {/* <img style={{maxHeight: '15.5em'}} src={`./assets/img/doctors/${params.id}.jpg`} alt="Doctor's Photo" /> */}
                            <img style={{maxHeight: 'clamp(8.5em, 18.3vw, 15.5em)'}} src={hasImage ? `/assets/img/BSN/doctors/${hasImage}` : "/img/DOC.png"} alt="Doctor's Photo" />
                        </div>
                        <div className="profile-content">
                            <h3> {doctor.Name}</h3>
                            <p><i className='bx bxs-graduation'></i> {doctor.Qualification}</p>
                            <p><i className='bx bx-bookmark-alt-plus'></i> {doctor.SpecialistDesc}</p>
                            <p><span className="material-symbols-outlined notranslate">pin_drop</span> {doctor.Address1}, {doctor.StateDesc}</p>
                            <p><span className="material-symbols-outlined notranslate">ring_volume</span> {doctor.RegMob1}</p>
                            {/* <div style={{display: 'flex', gap: '0.5em'}}>
                                <p><i className='bx bx-share-alt'></i></p>
                                <ul className="social-links">
                                    <li><a href="#"><i className="bx bxl-facebook-circle"></i></a></li>
                                    <li><a href="#"><i className="bx bxl-twitter"></i></a></li>
                                    <li><a href="#"><i className="bx bxl-google"></i></a></li>
                                    <li><a href="#"><i className="bx bxl-linkedin"></i></a></li>
                                </ul>
                            </div> */}
                            <button className="thm-btn bgclr-1" onClick={() => handleBooking(doctor)}>Book Appointment</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="doctor-details doctor-page-area">
                            <ul className="nav nav-tabs tab-menu">
                                <li className={tabActive === 'overview' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('overview')}>overview</Link></li>
                                <li className={tabActive === 'locations' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('locations')}>locations</Link></li>
                                <li className={tabActive === 'reviews' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('reviews')}>reviews</Link></li>
                            </ul>   
                            <div className="tab-content">
                                <div className={`tab-pane ${tabActive === 'overview' ? 'active' : ''}`} id="overview">
                                    <div>
                                        <h5 className="my-3">About Me</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </div>
                                </div>
                                <div className={`tab-pane ${tabActive === 'locations' ? 'active' : ''}`} id="locations">
                                    <div>
                                        <h5 className="my-3">Locations</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </div>                                                
                                </div>
                                <div className={`tab-pane ${tabActive === 'reviews' ? 'active' : ''}`} id="reviews">
                                    <div>
                                        <h5 className="my-3">Reviews</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </div>
                                </div>                                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )
		}
	}

    let id = specialistId || doctorData.data[0]?.SpecialistId || 0;
    
    return (
        <section className="doctor-profile-area bsn-global">
            <div className="container">
                <div className="row gy-3">
                    <div className="col-lg-8 col-md-7">
                        {renderDoctor(doctorData)}
                    </div>
                    <div className="col-lg-4 col-md-5">
                        <div className="related-doctors">
                            <div className="card" style={{fontSize: '0.87em'}}>
                                <div className="card-body">
                                    <h3 className="d-flex justify-content-between gap-4 align-items-end" style={{marginBottom: '0.8em'}}>
                                        Related Doctors <Link to={`/doctors?deptId=${id}`} className="text-sm text-info">View All</Link>
                                    </h3>
                                    <ul>
                                        {/* style={{maxHeight: '100vh', overflow: 'auto'}} */}
                                        {renderRelatedDoctors(relateDoctors)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToDoctorProfile = (state) => ({ userInfo: state.userInfo, compCode: state.compCode });

export default connect(mapStateToDoctorProfile, { modalAction, bookingInfoAction })(DoctorProfile);