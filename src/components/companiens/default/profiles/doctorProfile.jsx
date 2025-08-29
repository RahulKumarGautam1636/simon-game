import React, { useState, useEffect } from 'react';
import { BreadCrumb, getFrom, Spinner } from '../utilities';
import { loaderAction, modalAction, bookingInfoAction } from '../../../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CommentsCard } from '../cards';
import { BASE_URL, BCROY_ID, defaultId, zero } from '../../../../constants';
import Skeleton from 'react-loading-skeleton';

const DectorProfile = ({ match, compCode, loaderAction, modalAction, userInfo, bookingInfoAction, isLoggedIn}) => {

	// const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true, decode: false });

	const [review, setReview] = useState({ title: '', content: '' });
	const [tabActive, setTabActive] = useState('doc_overview');
	const [rating, setRating] = useState([true, true, true, true, true]);
	const [reviewData, setReviewData] = useState({
		1: { id: 1, name: 'Richard Wilson', date: 2, stars: 4, title: 'I recommend the doctor', likes: [7,8,9,10,11,12,13,12528], dislikes: [15,16], content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus'},
		2: { id: 2, name: 'Charlene Reed', date: 3, stars: 3, title: '', likes: [17,18,19,20,21,22], dislikes: [23,24,25,12528], content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus'},
		3: { id: 3, name: 'Travis Trimble', date: 4, stars: 5, title: 'I recommend the doctor', likes: [26,27,28,29,30,31,32,33,12528], dislikes: [35,36,37,38,39], content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus'},
	});
	const reviewDataArray = Object.values(reviewData);

	const totalStars = reviewDataArray.map(i => i.stars).reduce((n, i) => n + i);                                    // Get number of all the stars.
    const overallRating = (totalStars / reviewDataArray.length).toFixed(1);                                          // get average rating upto one decimal number.

    const rating_5 = reviewDataArray.filter(i => i.stars === 5).length;                                              // Get number of all different ratings in the review data.
    const rating_4 = reviewDataArray.filter(i => i.stars === 4).length;
    const rating_3 = reviewDataArray.filter(i => i.stars === 3).length;
    const rating_2 = reviewDataArray.filter(i => i.stars === 2).length;
    const rating_1 = reviewDataArray.filter(i => i.stars === 1).length;

    const overallStars = reviewDataArray.length * 5;
    const starsInRadians = 400 - (400 / overallStars) * totalStars;

    const fullStars = Math.floor(overallRating);                                                                // get whole number part of overall rating number.
    const fullStarsArray = Array.from({length: fullStars}).map(i => 'full');                                    // create array with value 'full' having length equal to above said whole number.
    const halfStars = overallRating >= 5 ? [] : (overallRating % 1) > 0 ? ['half'] : ['empty'];                 // get the decimal part of the overall rating and create an empty array if overall rating is greater or equeal to 5, 'empty' if it's 0, and 'half' if it has any +ve value.
    const emptyStars = Array.from({length: 5 - (fullStarsArray.length + 1)}).map(i => 'empty');                 // create array with value 'empty' having length equal to added length of fullStars and halfStars.
    const allStars = [...fullStarsArray, ...halfStars, ...emptyStars];

	const handleReview = (e) => {
		const { name, value } = e.target;
		setReview({...review, [name]: value});
	}

	const handleReviewSubmit = (e) => {
		e.preventDefault();
		const newReview = { id: reviewDataArray.length+1, name: userInfo.Name, date: 6, stars: rating.filter(i => i === true).length, title: review.title, likes: [], dislikes: [], content: review.content };
		setReviewData({ ...reviewData, [newReview.id]: newReview });
		setReview({ title: '', content: '' });
	}

	// useEffect(() => {
	//   if (queryString.CID) {
	// 	getDoctorData(queryString.CID);
	// 	} else {
	// 	getDoctorData(userInfo.selectedCompany.EncCompanyId);
	//   }
	// }, [queryString.CID, userInfo.selectedCompany.EncCompanyId])

	useEffect(() => {
		getDoctorData(userInfo.selectedCompany.EncCompanyId);
	}, [userInfo.selectedCompany.EncCompanyId])

	// const [doctorData, setDoctorData] = useState([]);
	const [doctorData, setDoctorData] = useState({loading: true, data: [], err: {status: false, msg: ''}});

	// const getDoctorData = async (companyCode) => {
	// 	loaderAction(true);
	// 	const res = await axios.get(`${BASE_URL}/api/Values/Get?CID=${companyCode}&DID=${match.params.id}`);
	// 	loaderAction(false);
	// 	if (res.data) {
	// 		setTimeout(() => {
	// 			setDoctorData(res.data[0]);
	// 		}, 1000)
	// 	} 
	// }

	const getDoctorData = async (companyCode) => {
		if (!companyCode) return;
		// companyCode = compCode === defaultId ? zero : compCode;
		const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&DID=${match.params.id}`, {}, setDoctorData);
		// const res = await getFrom(`https://requestly.dev/api/mockv2/internalServerError?rq_uid=p49rL6EBtjhWFxNQkI0wmutlvOH2`, {}, setSearchList);
		if (res) {
		  setTimeout(() => {
			setDoctorData(res);  
		  }, 1000)
		}                                                                                                   
	}  

	const renderPage = (data) => {
		if (data.loading) {
		  return <Skeleton count={15}/>;
		} else if (data.err.status) {
		  return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
		} else if (data.data.length === 0) {
		  return <div className='text-center my-5 w-100'><h2 className="text-info mark">Invalid Doctor Id or Something wen't wrong.</h2></div>;
		} else {
		  return renderContent(data.data[0]);
		}
	}

	const breadCrumbData = {
		links: [{name: 'Home', link: '/'}, {name: 'Doctor Profile', link: `/profile/${match.params.id}`}],
		activeLink: `/profile/${match.params.id}`
	}

	const handleAction = (type, id, userId) => {

        if (!isLoggedIn) return alert('Please login to comment and like.');
        let likedReview = reviewDataArray.filter(i => i.id === id)[0];
        let unLikedReview = reviewDataArray.filter(i => i.id === id)[0];
        let isLiked = likedReview.likes.filter(i => i === userId);
        let isUnLiked = unLikedReview.dislikes.filter(i => i === userId);

        const likeReview = () => {
            if (isLiked.length > 0) {
                let filteredLikesList = likedReview.likes.filter(i => i !== userId);
                likedReview.likes = filteredLikesList;
                setReviewData((pre) => ({...pre, [id]: likedReview}));
            } else {
                if (isUnLiked.length > 0) unlikeReview();                                              // toggle filled unlike icon to empty unlike icon if it is already unliked.
                likedReview.likes.push(userId);                
                setReviewData((pre) => ({...pre, [id]: likedReview}));
            }
        }

        const unlikeReview = () => {
            if (isUnLiked.length > 0) {
                let filteredUnLikedList = unLikedReview.dislikes.filter(i => i !== userId);
                unLikedReview.dislikes = filteredUnLikedList;
                setReviewData((pre) => ({...pre, [id]: unLikedReview}));
            } else {
                if (isLiked.length > 0) likeReview();                                                  // toggle filled like icon to empty like icon if it is already liked.
                unLikedReview.dislikes.push(userId);                
                setReviewData((pre) => ({...pre, [id]: unLikedReview}));
            }
        }

        if (type === 'like') {
            likeReview();
        } else if (type === 'dislike') {
            unlikeReview();
        }
    }
	const handleBooking = (data) => {      
		bookingInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: '', companyId: '', selectedAppnDate: ''}); 
		modalAction('APPN_BOOKING_MODAL', true);
    }

	const renderContent = (data) => {
		return (
			<div className="content default-global profile-page" style={{fontSize: '1.1em'}}>
				<div className="container">					
					<div className="card mb-4">
						<div className="card-body">
							<div className="doctor-widget">
								<div className="doc-info-left">
									<div className="doctor-img">
										<img src={data.PhotoUrl !== '' ? data.PhotoUrl : "/img/DOC.png"} className="img-fluid" alt="User Image"/>
									</div>
									<div className="doc-info-cont" style={{fontSize: '1.2em'}}>
										<h4 className="doc-name">{data.Name}</h4>
										<p className="doc-speciality">{data.Qualification}</p>
										<p className="doc-department">
                                            {/* <img src="/img/specialities-05.png" className="img-fluid" alt="Speciality"/> */}
                                            {data.SpecialistDesc}
                                        </p>
										<div className="rating">
											<i className="fas fa-star filled"></i>
											<i className="fas fa-star filled"></i>
											<i className="fas fa-star filled"></i>
											<i className="fas fa-star filled"></i>
											<i className="fas fa-star"></i>
											<span className="d-inline-block average-rating">(35)</span>
										</div>
										<style>{`
											table * {
												height: auto !important;
												border: none !important;
											}
											table {
												line-height: 1.5em !important;
											}
										`}</style>
										<div className='text-sm' dangerouslySetInnerHTML={{ __html: data.PrescriptionFooter}}></div>
										{/* <div className="clinic-details">
											<p className="doc-location"><i className="fas fa-map-marker-alt"></i> Newyork, USA - <Link to="#">Get Directions</Link></p>
											<ul className="clinic-gallery">
												<li>
													<Link to="/img/features/feature-01.jpg" data-fancybox="gallery">
														<img src="/img/features/feature-01.jpg" alt="Feature"/>
													</Link>
												</li>
												<li>
													<Link to="/img/features/feature-02.jpg" data-fancybox="gallery">
														<img  src="/img/features/feature-02.jpg" alt="Feature Image"/>
													</Link>
												</li>
												<li>
													<Link to="/img/features/feature-03.jpg" data-fancybox="gallery">
														<img src="/img/features/feature-03.jpg" alt="Feature"/>
													</Link>
												</li>
												<li>
													<Link to="/img/features/feature-04.jpg" data-fancybox="gallery">
														<img src="/img/features/feature-04.jpg" alt="Feature"/>
													</Link>
												</li>
											</ul>
										</div> */}
										{/* <div className="clinic-services">
											<span>Dental Fillings</span>
											<span>Teeth Whitneing</span>
										</div> */}
									</div>
								</div>
								<div className="doc-info-right">
									<div className="clini-infos" style={{fontSize: '1.3em'}}>
										<ul>
											{/* <li><i className="far fa-thumbs-up"></i> 99%</li>
											<li><i className="far fa-comment"></i> 35 Feedback</li>
											<li><i className="fas fa-map-marker-alt"></i> Newyork, USA</li>
											<li><i className="far fa-money-bill-alt"></i> $100 per hour </li> */}
											<li><i className="fas fa-map-marker-alt text-blue-700"></i>{data.Address1}, {data.StateDesc}&nbsp;</li>
											<li><i className="fa fa-phone text-blue-700"></i>{data.RegMob1}&nbsp;</li>
										</ul>
									</div>
									<div className="doctor-action">
										<Link to="#" className="btn btn-white fav-btn">
											<i className="far fa-bookmark"></i>
										</Link>
										<Link to="chat.html" className="btn btn-white msg-btn">
											<i className="far fa-comment-alt"></i>
										</Link>
										<Link to="#" className="btn btn-white call-btn" data-toggle="modal" data-target="#voice_call">
											<i className="fas fa-phone"></i>
										</Link>
										<Link to="#" className="btn btn-white call-btn" data-toggle="modal" data-target="#video_call">
											<i className="fas fa-video"></i>
										</Link>
									</div>
									<div className={`clinic-booking ${compCode === BCROY_ID && 'opacity-50 pe-none'}`}>
										<Link className="apt-btn" to="#" onClick={() => handleBooking(data)}>
											{compCode === BCROY_ID ? "Doctor's Schedule" : "Book Appointment"}
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
					
					<div className="card">
						<div className="card-body">
						
							
							<nav className="user-tabs mb-4">
								<ul className="nav nav-tabs nav-tabs-bottom nav-justified !gap-3">
									<li className="nav-item">
										<span className={`nav-link ${tabActive === 'doc_overview' ? 'active' : ''}`} onClick={() => setTabActive('doc_overview')} data-toggle="tab">Overview</span>
									</li>
									<li className="nav-item">
										<span className={`nav-link ${tabActive === 'doc_locations' ? 'active' : ''}`} onClick={() => setTabActive('doc_locations')} data-toggle="tab">Locations</span>
									</li>
									<li className="nav-item">
										<span className={`nav-link ${tabActive === 'doc_reviews' ? 'active' : ''}`} onClick={() => setTabActive('doc_reviews')} data-toggle="tab">Reviews</span>
									</li>
									<li className="nav-item">
										<span className={`nav-link ${tabActive === 'doc_business_hours' ? 'active' : ''}`} onClick={() => setTabActive('doc_business_hours')} data-toggle="tab">Business Hours</span>
									</li>
								</ul>
							</nav>
							
							
							
							<div className="tab-content pt-0">
							
								<div role="tabpanel" id="doc_overview" className={`tab-pane fade ${tabActive === 'doc_overview' ? 'show active' : ''}`}>
									<div className='text-center'><h2 className="text-danger mark my-5">Coming soon!</h2></div>
									{/* <div className="row">
										<div className="col-md-12 col-lg-9">
										
											
											<div className="widget about-widget">
												<h4 className="widget-title">About Me</h4>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
											</div>
											
										
											
											<div className="widget education-widget">
												<h4 className="widget-title">Education</h4>
												<div className="experience-box">
													<ul className="experience-list">
														<li>
															<div className="experience-user">
																<div className="before-circle"></div>
															</div>
															<div className="experience-content">
																<div className="timeline-content">
																	<Link to="#/" className="name">American Dental Medical University</Link>
																	<div>BDS</div>
																	<span className="time">1998 - 2003</span>
																</div>
															</div>
														</li>
														<li>
															<div className="experience-user">
																<div className="before-circle"></div>
															</div>
															<div className="experience-content">
																<div className="timeline-content">
																	<Link to="#/" className="name">American Dental Medical University</Link>
																	<div>MDS</div>
																	<span className="time">2003 - 2005</span>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>
											
									
											
											<div className="widget experience-widget">
												<h4 className="widget-title">Work & Experience</h4>
												<div className="experience-box">
													<ul className="experience-list">
														<li>
															<div className="experience-user">
																<div className="before-circle"></div>
															</div>
															<div className="experience-content">
																<div className="timeline-content">
																	<Link to="#/" className="name">Glowing Smiles Family Dental Clinic</Link>
																	<span className="time">2010 - Present (5 years)</span>
																</div>
															</div>
														</li>
														<li>
															<div className="experience-user">
																<div className="before-circle"></div>
															</div>
															<div className="experience-content">
																<div className="timeline-content">
																	<Link to="#/" className="name">Comfort Care Dental Clinic</Link>
																	<span className="time">2007 - 2010 (3 years)</span>
																</div>
															</div>
														</li>
														<li>
															<div className="experience-user">
																<div className="before-circle"></div>
															</div>
															<div className="experience-content">
																<div className="timeline-content">
																	<Link to="#/" className="name">Dream Smile Dental Practice</Link>
																	<span className="time">2005 - 2007 (2 years)</span>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>
											
								
											
											<div className="widget awards-widget">
												<h4 className="widget-title">Awards</h4>
												<div className="experience-box">
													<ul className="experience-list">
														<li>
															<div className="experience-user">
																<div className="before-circle"></div>
															</div>
															<div className="experience-content">
																<div className="timeline-content">
																	<p className="exp-year">July 2019</p>
																	<h4 className="exp-title">Humanitarian Award</h4>
																	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
																</div>
															</div>
														</li>
														<li>
															<div className="experience-user">
																<div className="before-circle"></div>
															</div>
															<div className="experience-content">
																<div className="timeline-content">
																	<p className="exp-year">March 2011</p>
																	<h4 className="exp-title">Certificate for International Volunteer Service</h4>
																	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
																</div>
															</div>
														</li>
														<li>
															<div className="experience-user">
																<div className="before-circle"></div>
															</div>
															<div className="experience-content">
																<div className="timeline-content">
																	<p className="exp-year">May 2008</p>
																	<h4 className="exp-title">The Dental Professional of The Year Award</h4>
																	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>
											
											
											
											<div className="service-list">
												<h4>Services</h4>
												<ul className="clearfix">
													<li>Tooth cleaning </li>
													<li>Root Canal Therapy</li>
													<li>Implants</li>
													<li>Composite Bonding</li>
													<li>Fissure Sealants</li>
													<li>Surgical Extractions</li>
												</ul>
											</div>
											
											
											
											<div className="service-list">
												<h4>Specializations</h4>
												<ul className="clearfix">
													<li>Children Care</li>
													<li>Dental Care</li>	
													<li>Oral and Maxillofacial Surgery </li>	
													<li>Orthodontist</li>	
													<li>Periodontist</li>	
													<li>Prosthodontics</li>	
												</ul>
											</div>
											

										</div>
									</div> */}
								</div>
								
								
								
								<div role="tabpanel" id="doc_locations" className={`tab-pane fade ${tabActive === 'doc_locations' ? 'show active' : ''}`}>
									<div className='text-center my-5'><h2 className="text-danger mark">Coming soon!</h2></div>
									
									{/* <div className="location-list">
										<div className="row">
										
											
											<div className="col-md-6">
												<div className="clinic-content">
													<h4 className="clinic-name"><Link to="#">Smile Cute Dental Care Center</Link></h4>
													<p className="doc-speciality">MDS - Periodontology and Oral Implantology, BDS</p>
													<div className="rating">
														<i className="fas fa-star filled"></i>
														<i className="fas fa-star filled"></i>
														<i className="fas fa-star filled"></i>
														<i className="fas fa-star filled"></i>
														<i className="fas fa-star"></i>
														<span className="d-inline-block average-rating">(4)</span>
													</div>
													<div className="clinic-details mb-0">
														<h5 className="clinic-direction"> <i className="fas fa-map-marker-alt"></i> 2286  Sundown Lane, Austin, Texas 78749, USA <br/><Link to="#">Get Directions</Link></h5>
														<ul>
															<li>
																<Link to="/img/features/feature-01.jpg" data-fancybox="gallery2">
																	<img src="/img/features/feature-01.jpg" alt="Feature Image"/>
																</Link>
															</li>
															<li>
																<Link to="/img/features/feature-02.jpg" data-fancybox="gallery2">
																	<img src="/img/features/feature-02.jpg" alt="Feature Image"/>
																</Link>
															</li>
															<li>
																<Link to="/img/features/feature-03.jpg" data-fancybox="gallery2">
																	<img src="/img/features/feature-03.jpg" alt="Feature Image"/>
																</Link>
															</li>
															<li>
																<Link to="/img/features/feature-04.jpg" data-fancybox="gallery2">
																	<img src="/img/features/feature-04.jpg" alt="Feature Image"/>
																</Link>
															</li>
														</ul>
													</div>
												</div>
											</div>
											
											
											
											<div className="col-md-4">
												<div className="clinic-timing">
													<div>
														<p className="timings-days">
															<span> Mon - Sat </span>
														</p>
														<p className="timings-times">
															<span>10:00 AM - 2:00 PM</span>
															<span>4:00 PM - 9:00 PM</span>
														</p>
													</div>
													<div>
													<p className="timings-days">
														<span>Sun</span>
													</p>
													<p className="timings-times">
														<span>10:00 AM - 2:00 PM</span>
													</p>
													</div>
												</div>
											</div>
											
											
											<div className="col-md-2">
												<div className="consult-price">
													$250
												</div>
											</div>
										</div>
									</div>
									
									
									
									<div className="location-list">
										<div className="row">
										
											
											<div className="col-md-6">
												<div className="clinic-content">
													<h4 className="clinic-name"><Link to="#">The Family Dentistry Clinic</Link></h4>
													<p className="doc-speciality">MDS - Periodontology and Oral Implantology, BDS</p>
													<div className="rating">
														<i className="fas fa-star filled"></i>
														<i className="fas fa-star filled"></i>
														<i className="fas fa-star filled"></i>
														<i className="fas fa-star filled"></i>
														<i className="fas fa-star"></i>
														<span className="d-inline-block average-rating">(4)</span>
													</div>
													<div className="clinic-details mb-0">
														<p className="clinic-direction"> <i className="fas fa-map-marker-alt"></i> 2883  University Street, Seattle, Texas Washington, 98155 <br/><Link to="#">Get Directions</Link></p>
														<ul>
															<li>
																<Link to="/img/features/feature-01.jpg" data-fancybox="gallery2">
																	<img src="/img/features/feature-01.jpg" alt="Feature Image"/>
																</Link>
															</li>
															<li>
																<Link to="/img/features/feature-02.jpg" data-fancybox="gallery2">
																	<img src="/img/features/feature-02.jpg" alt="Feature Image"/>
																</Link>
															</li>
															<li>
																<Link to="/img/features/feature-03.jpg" data-fancybox="gallery2">
																	<img src="/img/features/feature-03.jpg" alt="Feature Image"/>
																</Link>
															</li>
															<li>
																<Link to="/img/features/feature-04.jpg" data-fancybox="gallery2">
																	<img src="/img/features/feature-04.jpg" alt="Feature Image"/>
																</Link>
															</li>
														</ul>
													</div>

												</div>
											</div>
											
											
											
											<div className="col-md-4">
												<div className="clinic-timing">
													<div>
														<p className="timings-days">
															<span> Tue - Fri </span>
														</p>
														<p className="timings-times">
															<span>11:00 AM - 1:00 PM</span>
															<span>6:00 PM - 11:00 PM</span>
														</p>
													</div>
													<div>
														<p className="timings-days">
															<span>Sat - Sun</span>
														</p>
														<p className="timings-times">
															<span>8:00 AM - 10:00 AM</span>
															<span>3:00 PM - 7:00 PM</span>
														</p>
													</div>
												</div>
											</div>
											
											
											<div className="col-md-2">
												<div className="consult-price">
													$350
												</div>
											</div>
										</div>
									</div> */}
									

								</div>
								
								<div role="tabpanel" id="doc_reviews" className={`reviews-page tab-pane fade ${tabActive === 'doc_reviews' ? 'show active' : ''}`}>
									<h4 className="mt-0 mt-md-2">Overall Customer Ratings</h4>
									<div style={{fontSize: '1.4rem', width: '100%', padding: '0 3px'}}>
										<div className="top-section d-flex">
											<div className="reviews-total">
												<h1>{overallRating}</h1>
												<div className="stars">
													{allStars.map((i, n) => i === 'full' ? <i key={n} className='bx bxs-star'></i> : i === 'half' ? <i key={n} className='bx bxs-star-half'></i> : <i key={n} className='bx bx-star'></i>)}
												</div>
												<p>({reviewDataArray.length} reviews)</p>
												<svg className="bar-circle" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path className="bar-circle-bg" d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#ecececc9" strokeWidth="4"/>
													<path className="bar-circle-stroke" style={{strokeDashoffset: tabActive === 'doc_reviews' ? starsInRadians : ''}} d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#FFBF1C" strokeWidth="4"/>
												</svg>
											</div>
											<div className="review-bars w-100">
												<div className="bar-item">
													<span>5</span> <i className='bx bxs-star'></i>
													<div className="progress">
														<div className="progress-bar bg-transparent" style={{width: '100%'}} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
															<div className="h-100 bg-warning" style={{animation: tabActive === 'doc_reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
														</div>
													</div>
													<span>{rating_5}</span>
												</div>
												<div className="bar-item">
													<span>4</span> <i className='bx bxs-star'></i>
													<div className="progress">
														<div className="progress-bar bg-transparent" style={{width: '80%'}} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
															<div className="h-100 bg-warning" style={{animation: tabActive === 'doc_reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
														</div>
													</div>
													<span>{rating_4}</span>
												</div>
												<div className="bar-item">
													<span>3</span> <i className='bx bxs-star'></i>
													<div className="progress">
														<div className="progress-bar bg-transparent" style={{width: '60%'}} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
															<div className="h-100 bg-warning" style={{animation: tabActive === 'doc_reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
														</div>
													</div>
													<span>{rating_3}</span>
												</div>
												<div className="bar-item">
													<span>2</span> <i className='bx bxs-star'></i>
													<div className="progress">
														<div className="progress-bar bg-transparent" style={{width: '40%'}} role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
															<div className="h-100 bg-warning" style={{animation: tabActive === 'doc_reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
														</div>
													</div>
													<span>{rating_2}</span>
												</div>
												<div className="bar-item mb-0">
													<span>1</span> <i className='bx bxs-star'></i>
													<div className="progress">
														<div className="progress-bar bg-transparent" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
															<div className="h-100 bg-warning" style={{animation: tabActive === 'doc_reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
														</div>
													</div>
													<span>{rating_1}</span>
												</div>

											</div>
										</div>

									</div>
										
									<h4 className="my-3">Customer Reviews</h4>
									<div className="widget review-listing">
										<ul className="comments-list">
											{reviewDataArray.map(item => (<li key={item.id}><CommentsCard review={item} handleAction={handleAction} userId={userInfo.UserId}/></li>))}
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
												{/* <div className="star-rating">
													<input id="star-5" type="radio" onClick={() => setRating([true, true, true, true, true])} name="rating" value="star-5"/>
													<label htmlFor="star-5" title="5 stars">
														<i className="active fa fa-star"></i>
													</label>
													<input id="star-4" type="radio" onClick={() => setRating([true, true, true, true, false])} name="rating" value="star-4"/>
													<label htmlFor="star-4" title="4 stars">
														<i className="active fa fa-star"></i>
													</label>
													<input id="star-3" type="radio" onClick={() => setRating([true, true, true, false, false])} name="rating" value="star-3"/>
													<label htmlFor="star-3" title="3 stars">
														<i className="active fa fa-star"></i>
													</label>
													<input id="star-2" type="radio" onClick={() => setRating([true, true, false, false, false])} name="rating" value="star-2"/>
													<label htmlFor="star-2" title="2 stars">
														<i className="active fa fa-star"></i>
													</label>
													<input id="star-1" type="radio" onClick={() => setRating([true, false, false, false, false])} name="rating" value="star-1"/>
													<label htmlFor="star-1" title="1 star">
														<i className="active fa fa-star"></i>
													</label>
												</div> */}
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
									</div>}						
								</div>
								
								
								
								<div role="tabpanel" id="doc_business_hours" className={`tab-pane fade ${tabActive === 'doc_business_hours' ? 'show active' : ''}`}>
									<div className='text-center'><h2 className="text-danger mark my-5">Coming soon!</h2></div>
									{/*<div className="row">
										 <div className="col-md-6 offset-md-3">
										
											
											<div className="widget business-widget">
												<div className="widget-content">
													<div className="listing-hours">
														<div className="listing-day current">
															<div className="day">Today <span>5 Nov 2019</span></div>
															<div className="time-items">
																<span className="open-status"><span className="badge bg-success-light">Open Now</span></span>
																<span className="time">07:00 AM - 09:00 PM</span>
															</div>
														</div>
														<div className="listing-day">
															<div className="day">Monday</div>
															<div className="time-items">
																<span className="time">07:00 AM - 09:00 PM</span>
															</div>
														</div>
														<div className="listing-day">
															<div className="day">Tuesday</div>
															<div className="time-items">
																<span className="time">07:00 AM - 09:00 PM</span>
															</div>
														</div>
														<div className="listing-day">
															<div className="day">Wednesday</div>
															<div className="time-items">
																<span className="time">07:00 AM - 09:00 PM</span>
															</div>
														</div>
														<div className="listing-day">
															<div className="day">Thursday</div>
															<div className="time-items">
																<span className="time">07:00 AM - 09:00 PM</span>
															</div>
														</div>
														<div className="listing-day">
															<div className="day">Friday</div>
															<div className="time-items">
																<span className="time">07:00 AM - 09:00 PM</span>
															</div>
														</div>
														<div className="listing-day">
															<div className="day">Saturday</div>
															<div className="time-items">
																<span className="time">07:00 AM - 09:00 PM</span>
															</div>
														</div>
														<div className="listing-day closed">
															<div className="day">Sunday</div>
															<div className="time-items">
																<span className="time"><span className="badge bg-danger-light">Closed</span></span>
															</div>
														</div>
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
		)
	}

    return (
        <div className="main-wrapper">					
			<BreadCrumb data={breadCrumbData}/>			
			{renderPage(doctorData)}				   
		</div>
    )
}

const mapStateToPropsTwo = (state) => {
	return { compCode: state.compCode, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, compInfo: state.compInfo };
  }
  
  export default connect(mapStateToPropsTwo, {loaderAction, modalAction, bookingInfoAction})(DectorProfile);