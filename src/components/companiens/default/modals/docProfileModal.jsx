import { modalAction } from '../../../../actions';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CommentsCard } from '../cards';


const DocDetailsModal = ({ modals, modalAction, userInfo, isLoggedIn }) => {
    const [review, setReview] = useState({ title: '', content: '' });
	const [tabActive, setTabActive] = useState('');
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

    useEffect(() => {
        setTabActive(modals.DOC_DETAILS_MODAL.data);
    },[modals.DOC_DETAILS_MODAL.data])


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

    return (
        <div className="card default-global">
            <div className="card-header">
                <h4 className="card-title ms-auto" style={{cursor: 'pointer', width: 'fit-content'}} onClick={() => modalAction('DOC_DETAILS_MODAL', false)}><i className='bx bxs-left-arrow'></i> Go Back</h4>
            </div>
            <div className="card-body">
                <nav className="user-tabs mb-4">
                    <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
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
                    </div>
                    
                    <div role="tabpanel" id="doc_locations" className={`tab-pane fade ${tabActive === 'doc_locations' ? 'show active' : ''}`}>
                        <div className='text-center my-5'><h2 className="text-danger mark">Coming soon!</h2></div>
                    </div>
                    
                    <div role="tabpanel" id="doc_reviews" className={`reviews-page tab-pane fade ${tabActive === 'doc_reviews' ? 'show active' : ''}`}>
                        <h4 className="mt-0 mt-md-2">Overall Customer Ratings</h4>
                        <div style={{ width: '100%', padding: '0 3px'}}>
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
                        <div className="widget review-listing" style={{fontSize: '1.4em'}}>
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
                        
                    
                        
                        {isLoggedIn && <div className="write-review" style={{fontSize: '1.4em'}}>
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
                        </div>}						
                    </div>
                    
                    <div role="tabpanel" id="doc_business_hours" className={`tab-pane fade ${tabActive === 'doc_business_hours' ? 'show active' : ''}`}>
                        <div className='text-center'><h2 className="text-danger mark my-5">Coming soon!</h2></div>									
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToDocDetailsModal = (state) => {
    return { modals: state.modals, userInfo: state.userInfo, isLoggedIn: state.isLoggedIn };
}

export default connect(mapStateToDocDetailsModal, {modalAction})(DocDetailsModal);