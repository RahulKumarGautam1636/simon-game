import { useState } from "react";
import { ConnectedReviewCard } from "../cards";
import { connect } from "react-redux";
import { modalAction } from "../../../../actions";

const Reviews = ({ tabActive, userInfo, isLoggedIn, modalAction, styles }) => {

    const d = new Date();
    const currDate = d.toDateString().slice(4, d.length);
    const [review, setReview] = useState({ stars: 4, title: '', content: '', posted: currDate });
    const [reviewData, setReviewData] = useState({
        '_1': {id: '_1', name: "Praveen Madhav", stars: 4, likes: [1,2,3], unlikes: [4,5,12671], posted: '26 Jan 2023', img: 'user_unknown.png', title: 'Best in class Quality', content: "Very good tablets with lots of health benefits very low and reasonable price tablets Value of money."},
        '_2': {id: '_2', name: "Saikat Ghosh", stars: 5, likes: [6,41,12671], unlikes: [], posted: '4 May 2023', img: 'user_unknown.png', title: "Can't expect better", content: "Very accurate and prompt responses wherever help required really needed app. Works best for me."},
        '_3': {id: '_3', name: "Mithun Kr. Kori", stars: 2, likes: [7,8,9,10,11,12,13,14], unlikes: [15,16], posted: '17 Sept 2023', img: 'user_unknown.png', title: 'Worth every penny', content: "First time purchased from this site. I will add my review after one month. delivery was fast and good."},
        '_4': {id: '_4', name: "Akhilesh Kumar Shah", stars: 5, likes: [17,18,19,20,21,22], unlikes: [23,24,25], posted: '20 June 2023', img: 'user_unknown.png', title: 'Outstanding review design', content: "Due to long period of diabetes my fingers devolveped numbness which is effectively controlled by this tablet."},
        '_5': {id: '_5', name: "Mithun Kr. Kori", stars: 3, likes: [26,27,28,29,30,31,32,33,12671], unlikes: [35,36,37,38,39], posted: '12 Oct 2023', img: 'user_unknown.png', title: 'Worth every penny', content: "if you have Neuropathy pain that means you having B vitamin deficiency This one is the perfect medicine to fix earlier stage of Neuropathy issues Of you have major pain in legs and if you thinking its related to Neuropathy and I would suggest to consume Nurokind G medicine. Works best"},
    });

    // Object keys teds to maintain thier numeric order if possible which causes to addition of cards in wrong order. To prevent this we added '_' in front of keys to ensure it is treated as string instead of number.

    const reviewDataArray = Object.values(reviewData);                                                              // convert reivewData to array.

    const handleReviewForm = (e) => {
        const { name, value } = e.target;
        setReview({...review, [name]: value});
    }

    const ratingMsg = {
        1: '😭 Worse product.',
        2: '😞 Not Good.',
        3: '🙂 Satisfying product.',
        4: '😃 Nice Quality product.',
        5: '😍 Loved It.'
    }

    const handleReviewFormSubmit = (e) => {
        e.preventDefault();
        if (review.title === '') return alert('Please the fields to submit review');
        const newReview = { id: ('_' + reviewDataArray.length + 1), name: userInfo.Name, stars: review.stars, likes: [], unlikes: [], posted: review.posted, img: 'user_unknown.png', title: review.title, content: review.content };
        setReviewData(pre => ({[newReview.id]: newReview, ...pre}));                                                 // This ordering works only if keys are strings otherwise it will be sorted according automatic key sorting property of objects.           
        setReview({title: '', content: '', stars: 4, posted: currDate});                           
    }
 
    const totalStars = reviewDataArray.map(i => i.stars).reduce((n, i) => n + i);                                    // Get number of all the stars.
    const overallRating = (totalStars / reviewDataArray.length).toFixed(1);                                          // get average rating upto one decimal number.

    const rating_5 = reviewDataArray.filter(i => i.stars === 5).length;                                              // Get number of all different ratings in the review data.
    const rating_4 = reviewDataArray.filter(i => i.stars === 4).length;
    const rating_3 = reviewDataArray.filter(i => i.stars === 3).length;
    const rating_2 = reviewDataArray.filter(i => i.stars === 2).length;
    const rating_1 = reviewDataArray.filter(i => i.stars === 1).length;

    const overallStars = reviewDataArray.length * 5;
    const starsInRadians = 400 - (400 / overallStars) * totalStars;

    const fullStars = Math.floor(overallRating)                                                                 // get whole number part of overall rating number.
    const fullStarsArray = Array.from({length: fullStars}).map(i => 'full');                                    // create array with value 'full' having length equal to above said whole number.
    const halfStars = overallRating >= 5 ? [] : (overallRating % 1) > 0 ? ['half'] : ['empty'];                 // get the decimal part of the overall rating and create an empty array if overall rating is greater or equeal to 5, 'empty' if it's 0, and 'half' if it has any +ve value.
    const emptyStars = Array.from({length: 5 - (fullStarsArray.length + 1)}).map(i => 'empty');                 // create array with value 'empty' having length equal to added length of fullStars and halfStars.
    const allStars = [...fullStarsArray, ...halfStars, ...emptyStars];                                          // merge them all to create a single array.

    const handleAction = (type, id, userId) => {

        if (!isLoggedIn) return alert('Please login to comment and like.');
        let likedReview = reviewDataArray.filter(i => i.id === id)[0];
        let unLikedReview = reviewDataArray.filter(i => i.id === id)[0];
        let isLiked = likedReview.likes.filter(i => i === userId);
        let isUnLiked = unLikedReview.unlikes.filter(i => i === userId);

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
                let filteredUnLikedList = unLikedReview.unlikes.filter(i => i !== userId);
                unLikedReview.unlikes = filteredUnLikedList;
                setReviewData((pre) => ({...pre, [id]: unLikedReview}));
            } else {
                if (isLiked.length > 0) likeReview();                                                  // toggle filled like icon to empty like icon if it is already liked.
                unLikedReview.unlikes.push(userId);                
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
        <div className="reviews-page" style={styles}>
            <h4 className="mb-25 mb-xs-20">Overall Customer Ratings</h4>
            <div className="top-section d-flex" style={{fontFamily: 'Poppins'}}>
                <div className="reviews-total">
                    <h1>{overallRating}</h1>
                    <div className="stars">
                        {allStars.map((i, n) => i === 'full' ? <i key={n} className='bx bxs-star'></i> : i === 'half' ? <i key={n} className='bx bxs-star-half'></i> : <i key={n} className='bx bx-star'></i>)}
                    </div>
                    <p>({reviewDataArray.length} reviews)</p>
                    <svg className="bar-circle" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="bar-circle-bg" d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#ecececc9" strokeWidth="4"/>
                        <path className="bar-circle-stroke" style={{strokeDashoffset: tabActive === 'reviews' ? starsInRadians : ''}} d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#FFBF1C" strokeWidth="4"/>
                    </svg>
                </div>
                <div className="review-bars w-100">
                    <div className="bar-item">
                        <span>5</span> <i className='bx bxs-star'></i>
                        <div className="progress">
                            <div className="progress-bar bg-transparent" style={{width: '100%'}} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                <div className="h-100 bg-warning" style={{animation: tabActive === 'reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                            </div>
                        </div>
                        <span>{rating_5}</span>
                    </div>
                    <div className="bar-item">
                        <span>4</span> <i className='bx bxs-star'></i>
                        <div className="progress">
                            <div className="progress-bar bg-transparent" style={{width: '80%'}} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                                <div className="h-100 bg-warning" style={{animation: tabActive === 'reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                            </div>
                        </div>
                        <span>{rating_4}</span>
                    </div>
                    <div className="bar-item">
                        <span>3</span> <i className='bx bxs-star'></i>
                        <div className="progress">
                            <div className="progress-bar bg-transparent" style={{width: '60%'}} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                <div className="h-100 bg-warning" style={{animation: tabActive === 'reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                            </div>
                        </div>
                        <span>{rating_3}</span>
                    </div>
                    <div className="bar-item">
                        <span>2</span> <i className='bx bxs-star'></i>
                        <div className="progress">
                            <div className="progress-bar bg-transparent" style={{width: '40%'}} role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                <div className="h-100 bg-warning" style={{animation: tabActive === 'reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                            </div>
                        </div>
                        <span>{rating_2}</span>
                    </div>
                    <div className="bar-item mb-0">
                        <span>1</span> <i className='bx bxs-star'></i>
                        <div className="progress">
                            <div className="progress-bar bg-transparent" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                <div className="h-100 bg-warning" style={{animation: tabActive === 'reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                            </div>
                        </div>
                        <span>{rating_1}</span>
                    </div>

                </div>
            </div>
            <div className="bottom-section">
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <h4 className="my-4">Customer Reviews</h4>
                    {!isLoggedIn && <button className="review-submit-button write-review" type="button" onClick={() => modalAction('LOGIN_MODAL', true)}><i className='bx bxs-edit-alt'></i> Write Review</button>}
                </div>
                <div className="review-cards">
                    {reviewDataArray.map((item, index) => <ConnectedReviewCard data={item} key={index} handleAction={handleAction} userId={userInfo.UserId}/>)}
                </div>
            </div>
            {isLoggedIn && <div className="middle-section">
            <h4 className="mb-25 mt-35 mb-xs-20 mt-xs-20">Write your own review</h4>
                <div className="my-review">
                    <div className="stars-box stars-box mb-4 d-flex align-items-baseline">
                        <div className="stars me-5">
                            <i className='bx bxs-star' onClick={() => setReview({...review, stars: 1})}></i>
                            <i className={`bx bx${review.stars >= 2 ? 's' : ''}-star`} onClick={() => setReview({...review, stars: 2})}></i>
                            <i className={`bx bx${review.stars >= 3 ? 's' : ''}-star`} onClick={() => setReview({...review, stars: 3})}></i>
                            <i className={`bx bx${review.stars >= 4 ? 's' : ''}-star`} onClick={() => setReview({...review, stars: 4})}></i>
                            <i className={`bx bx${review.stars >= 5 ? 's' : ''}-star`} onClick={() => setReview({...review, stars: 5})}></i>
                        </div>
                        <h5 className="mb-0">{ratingMsg[review.stars]}</h5>
                    </div>
                    <div className="checkout-form-list mb-20 mb-xs-15">
                        <input type="text" name="title" onChange={handleReviewForm} value={review.title} placeholder='Title: review in one sentence..'/>
                    </div>
                    <div className="checkout-form-list w-100">
                        <textarea id="checkout-mess" onChange={handleReviewForm} className="w-100 p-3" value={review.content} name="content" cols="30" rows="4" placeholder="Write your detailed review here.."></textarea>
                    </div>
                    <div className="reivew-form-footer d-flex justify-content-between align-items-center">
                        <div className="user-details d-flex gap-3 gap-md-4 align-items-center">
                            <img src="/assets/img/ePharma/user_unknown.png" alt="user" style={{maxWidth: '5rem'}}/>
                            <div>
                                <h4>{userInfo.Name}</h4>
                                <p className="mb-0">{review.posted}</p>
                            </div>
                        </div>
                        <button onClick={handleReviewFormSubmit} className="review-submit-button" type="button">Submit</button>
                    </div>
                    <p className="mb-0 mt-3 mt-lg-4"><i style={{fontSize: '1.1em', color: '#ffba0c'}} className="fa fa-exclamation-triangle" aria-hidden="true"></i> Your feedback will be publicly posted on the web.</p>
                </div>
            </div>}
        </div>
    )
}

const mapStateToReviews = (state) => {
    return { userInfo: state.userInfo, isLoggedIn: state.isLoggedIn };
  }
  
  export default connect(mapStateToReviews, {modalAction})(Reviews);