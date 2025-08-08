import { userInfoAction, cartAction, wishlistAction, globalDataAction } from "../../../actions";
import { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CommentsCard } from './cards';
import { handleNumberInputs, getFrom, Spinner, productToast, focusArea } from "./utilities";
import { BASE_URL } from "../../../constants";

const ProductPage = ({ match, isLoggedIn, userInfo, cart, cartAction, compCode, globalData, globalDataAction }) => {

  const [selectedItem, setSelectedItem] = useState({loading: false, data: {ImageMasterCollection: [], ItemMaster: {}, itemMasterCollection: []}, err: {status: false, msg: ''}});
  const [counter, setCounter] = useState(1);

  const getSliderItemImges = useCallback(async (companyCode) => {
    const res = await getFrom(`${BASE_URL}/api/Pharma/GetProductDetails?CID=${companyCode}&PID=${match.params.id}&LOCID=${globalData.location.LocationId}`, {}, setSelectedItem);
    if (res) {
      setSelectedItem(res); 
    } else {
      alert('No data received');
    }
  }, [match.params.id]);

  useEffect(() => {
    getSliderItemImges(compCode);
	},[compCode, getSliderItemImges])

  useEffect(() => {
    window.renderSlickSliders();
		window.renderVenoBox();
    // setCounter(1);
    // return () => {                            
    //   window.removeSliders();             // calling renderSlickSliders() twice on same element causes errors hence remove existing sliders first before adding new one.
    // }
	},[selectedItem])
  
  const [tabActive, setTabActive] = useState('product-description');
  const [pinCode, setPinCode] = useState({pinCode: ''});
  const isAddedToCart = Object.keys(cart).filter(i => i === selectedItem.data.ItemMaster?.LocationItemId).length;
  const [activePackSize, setPackSize] = useState('');

  useEffect(() => {
		const packSizeList = selectedItem.data.ItemMaster?.ItemPackSizeList;
		if (packSizeList && packSizeList?.length) {
			const firstSizeId = packSizeList[0];
			setPackSize(firstSizeId);
		} else {
			setPackSize('');
		}
	},[selectedItem.data.ItemMaster])

  const computeWithPackSize = () => {
		if (!activePackSize) {
			return { ItemMRP: selectedItem.data.ItemMaster?.ItemMRP, SRate: selectedItem.data.ItemMaster?.SRate, StockQty: selectedItem.data.ItemMaster?.StockQty, DiscountPer: selectedItem.data.ItemMaster?.DiscountPer, PackSizeId: selectedItem.data.ItemMaster?.PackSizeId };
		} else {
			// if (activePackSize.MRP) { 
				return { ItemMRP: activePackSize.MRP, SRate: activePackSize.SRate, StockQty: activePackSize.StockQty, DiscountPer: activePackSize.MRPDisPer, PackSizeId: activePackSize.CodeId };	  
			// } else {
			// 	return { ItemMRP: selectedItem.data.ItemMaster?.ItemMRP, SRate: selectedItem.data.ItemMaster?.SRate, StockQty: selectedItem.data.ItemMaster?.StockQty, DiscountPer: selectedItem.data.ItemMaster?.DiscountPer, PackSizeId: selectedItem.data.ItemMaster?.PackSizeId };
			// }
		}
	}

  const handlePackSize = (i) => {
		if (i.CodeId === computeWithPackSize().PackSizeId) return;
		setPackSize(i);
	}

  const handleAdd = () => {
    if (!globalData.location.LocationId) return focusArea(globalDataAction);            // currently have no ui for Area selection still keeping this check.
		if (isAddedToCart) {
      cartAction('REMOVE_ITEM', selectedItem.data.ItemMaster.LocationItemId);
		} else { 
      cartAction('ADD_ITEM', {...selectedItem.data.ItemMaster, Qty: counter, ...computeWithPackSize()});
			wishlistAction('REMOVE_ITEM', selectedItem.data.ItemMaster.LocationItemId);
			let productToastData = { msg: 'Added to Cart', product: {name: selectedItem.data.ItemMaster.Description, price: computeWithPackSize().SRate}, button: {text: 'Visit Cart', link: '/cartPage'} };
			productToast(productToastData);
		}
		// updateLocalStorageItems()
  }

  const renderSlider = (data) => {
    if (data.loading) {
			return <Spinner min_height='24rem' fSize='2rem'/>;
		} else if (data.err.status) {
			return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
	    } else if (data.data.ImageMasterCollection.length === 0) {
			return <div><a className="veno-img" href={`#`}><img src='/img/no-image.png' height="450" width="auto" /></a></div>;
		} else {
      return (  
        <div> {/* never try to replace div with <> */} 
          <div className="main-slide"> 
            {data.data.ImageMasterCollection.map(i => <div key={i.ImgURL}><a className="veno-img" href={i.ImgURL} data-gall="myGallery"><img src={i.ImgURL} alt="features" height="450" width="auto" /></a></div>)}
          </div>
          <div className="img-slide">
            {data.data.ImageMasterCollection.map(i => <div key={i.ImgURL}><img src={i.ImgURL} alt="features" /></div>)}
          </div>  
        </div>
      )
    }
  }
  
  return (
    <section className="bg-white">
      <div className="product-view">
        <div className="image-box position-relative">
          {renderSlider(selectedItem)}
        </div>
        <div className="content-box">
          <ul> 
            <li>
                {globalData.location.LocationId ? 
                    computeWithPackSize().StockQty ? <p className="inStock fw-500">Available in Stock</p> : <p className="inStock bg-danger fw-500">Out of Stock</p>
                : ''}
                {/* <p className="inStock">In Stock</p> */}
                <h2>{selectedItem.data.ItemMaster?.Description}</h2>
                {selectedItem.data.ItemMaster?.ItemPackSizeList?.length ? <div className="product-variants pack-sizes-box pb-20 pb-xs-10" style={{fontSize: '0.63em', padding: '0.4em 0 1em'}}>
										<div className="produt-variants-size">
											<label>Pack size: </label>
											<div className='pack-sizes'>
												{selectedItem.data.ItemMaster?.ItemPackSizeList?.map((i, n) => (
													<div key={i.CodeId} className={i.CodeId === computeWithPackSize().PackSizeId ? 'active' : ''} onClick={() => handlePackSize(i)}>
														<h5>{i.Description}</h5>
														<div className='d-flex gap-2'>
															<p className="old-price">₹ {i.MRP ? i.MRP : selectedItem.data.ItemMaster?.ItemMRP}</p>
															<p>₹ {i.SRate ? i.SRate : selectedItem.data.ItemMaster?.SRate}</p>															
														</div>
													</div>
												))}
											</div>
										</div>
									</div> : ''}
                <div className="rating-box">
                    <p>
                        SKU<span>00114c-1</span>
                    </p>
                    <p>
                        VENDOR<span>Dior</span>
                    </p>
                    <div className="review-count rating">
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star "></i>
                        <span style={{fontSize: '0.9em', marginLeft: '0.4em'}}> (3k reviews)</span>
                    </div>
                </div>
            </li>
            <li>
              <div className="d-flex gap-3 align-items-center mb-2">
                <h3 className="mb-0">₹ {selectedItem.data.ItemMaster?.SRate}</h3>
                <p className="mb-0">₹ {selectedItem.data.ItemMaster?.ItemMRP} <span className="inStock">- {selectedItem.data.ItemMaster?.DiscountPer}% OFF</span></p>
              </div>
              <p className="item-details shipping">+ Shipping or delivery charges ₹50 for  Maheshtala (700 140)</p>
            </li>
            <li>
                <p className="item-details">{selectedItem.data.ItemMaster?.ShortDesc}</p>
            </li>
            <li>
                <div className={`cart-action ${!globalData.location.LocationId || computeWithPackSize().StockQty ? '' : 'opacity-50 pe-none'}`}>
                    <div>
                      <div>
                        <p>Quantity: </p>
                        <div className="quantity-box">
                            <i className='bx bx-plus-circle' onClick={() => setCounter(counter + 1)}></i>
                            <span className="fw-bold">{counter}</span>
                            <i className='bx bx-minus-circle' onClick={() => setCounter(counter === 1 ? 1 : counter - 1)}></i>
                        </div>
                      </div>
                      <div className="check-delivery">
                        <p>Check Delivery: </p>
                        <input type="text" name="pinCode" onChange={(e) => handleNumberInputs(e, setPinCode)} value={pinCode.pinCode} placeholder="Enter your PIN code" maxLength={6} />
                      </div>
                    </div>
                    <div className="btn-box">
                        <button className="btn btn-main btn-round-full add-wishlist-btn">BUY NOW</button>
                        <button className="btn btn-main btn-round-full" onClick={handleAdd}>{isAddedToCart.length > 0 ? 'ADDED' : 'ADD'} TO CART</button>
                    </div>
                </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <nav className="user-tabs mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
              <li className="nav-item">
                <span className={`nav-link ${tabActive === "product-description" ? "active" : '' }`} onClick={() => setTabActive("product-description")} data-toggle="tab">Description</span>
              </li>
              <li className="nav-item">
                <span className={`nav-link ${ tabActive === "products-details" ? "active" : '' }`} onClick={() => setTabActive("products-details")} data-toggle="tab" > Product Details </span>
              </li>
              <li className="nav-item"> 
                <span className={`nav-link ${ tabActive === "product-reviews" ? "active" : '' }`} onClick={() => setTabActive("product-reviews")} data-toggle="tab" > Reviews </span>
              </li>
            </ul>
          </nav>

          <div className="tab-content pt-0">
            <div role="tabpanel" id="product-description" className={`tab-pane fade ${tabActive === "product-description" ? "show active" : ''}`} >
              <div className="row">
                <div className="text-center my-5">
                  <h2 className="text-danger mark">Coming soon!</h2>
                </div>
              </div>
            </div>

            <div role="tabpanel" id="products-details" className={`tab-pane fade ${tabActive === "products-details" ? "show active" : ''}`} >
              <div className="text-center my-5">
                <h2 className="text-danger mark">Coming soon!</h2>
              </div>
            </div>

            <div role="tabpanel" id="product-reviews" className={`reviews-page tab-pane fade ${ tabActive === "product-reviews" ? "show active" : ''}`}>
              <ProductReviews isLoggedIn={isLoggedIn} userInfo={userInfo} tabActive={tabActive}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProductPage = (state) => {
	return { isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, cart: state.cart, siteData: state.siteData, compCode: state.compCode, globalData: state.globalData };
}
  
export default connect(mapStateToProductPage, {userInfoAction, cartAction, globalDataAction})(ProductPage);



const ProductReviews = ({ isLoggedIn, userInfo, tabActive }) => {

  const [review, setReview] = useState({ title: '', content: '' });
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
    <>
      <h4 className="mt-0 mt-md-2">Overall Customer Ratings</h4>
      <div style={{fontSize: "1.4rem",  width: "100%",  padding: "0 3px"}}>
        <div className="top-section d-flex">
          <div className="reviews-total">
            <h1>{overallRating}</h1>
            <div className="stars"> {allStars.map((i, n) =>  i === "full" ? (<i key={n} className="bx bxs-star"></i>) : i === "half" ? (<i key={n} className="bx bxs-star-half"></i>) : (<i key={n} className="bx bx-star"></i>))}
            </div>
            <p>({reviewDataArray.length} reviews)</p>
            <svg className="bar-circle" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="bar-circle-bg" d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#ecececc9" strokeWidth="4" />
              <path className="bar-circle-stroke" style={{ strokeDashoffset: tabActive === "product-reviews" ? starsInRadians : "", }} d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#FFBF1C" strokeWidth="4" />
            </svg>
          </div>
          <div className="review-bars w-100">
            <div className="bar-item">
              <span>5</span> <i className="bx bxs-star"></i>
              <div className="progress">
                <div className="progress-bar bg-transparent" style={{ width: "100%" }} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" >
                  <div className="h-100 bg-warning" style={{ animation: tabActive === "product-reviews" ? "scaleWidth 1.5s ease-in-out 0.5s 1 forwards" : "", }} ></div>
                </div>
              </div>
              <span>{rating_5}</span>
            </div>
            <div className="bar-item">
              <span>4</span> <i className="bx bxs-star"></i>
              <div className="progress">
                <div className="progress-bar bg-transparent" style={{ width: "80%" }} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" >
                  <div className="h-100 bg-warning" style={{ animation: tabActive === "product-reviews" ? "scaleWidth 1.5s ease-in-out 0.5s 1 forwards" : "", }} ></div>
                </div>
              </div>
              <span>{rating_4}</span>
            </div>
            <div className="bar-item">
              <span>3</span> <i className="bx bxs-star"></i>
              <div className="progress">
                <div className="progress-bar bg-transparent" style={{ width: "60%" }} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" >
                  <div className="h-100 bg-warning" style={{ animation: tabActive === "product-reviews" ? "scaleWidth 1.5s ease-in-out 0.5s 1 forwards" : "", }} ></div>
                </div>
              </div>
              <span>{rating_3}</span>
            </div>
            <div className="bar-item">
              <span>2</span> <i className="bx bxs-star"></i>
              <div className="progress">
                <div className="progress-bar bg-transparent" style={{ width: "40%" }} role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" >
                  <div className="h-100 bg-warning" style={{ animation: tabActive === "product-reviews" ? "scaleWidth 1.5s ease-in-out 0.5s 1 forwards" : "", }} ></div>
                </div>
              </div>
              <span>{rating_2}</span>
            </div>
            <div className="bar-item mb-0">
              <span>1</span> <i className="bx bxs-star"></i>
              <div className="progress">
                <div className="progress-bar bg-transparent" style={{ width: "20%" }} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" >
                  <div className="h-100 bg-warning" style={{ animation: tabActive === "product-reviews" ? "scaleWidth 1.5s ease-in-out 0.5s 1 forwards" : "" }} ></div>
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
          {reviewDataArray.map(item => (
            <li key={item.id}>
              <CommentsCard review={item} handleAction={handleAction} userId={userInfo.UserId} />
            </li>
          ))}
        </ul>
        <div className="all-feedback text-center d-flex flex-column flex-md-row gap-3 gap-md-5 justify-content-center align-items-center">
          <Link to="#" className="btn btn-primary btn-sm"> Show all feedback <strong>(167)</strong> </Link>
          {!isLoggedIn && ( <Link to="#" className="btn btn-primary btn-sm"> Login to Write a Review </Link>)}
        </div>
      </div>

      {isLoggedIn && (
        <div className="write-review">
          <h4>
            Write a review for <strong>Dr. Darren Elder</strong>
          </h4>
          <form onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label>Review</label>
              <div className="star-rating">
                <i className={`bx bx${rating[0] ? "s" : ""}-star`} onClick={() => setRating([true, false, false, false, false]) } ></i>
                <i className={`bx bx${rating[1] ? "s" : ""}-star`} onClick={() => setRating([true, true, false, false, false]) } ></i>
                <i className={`bx bx${rating[2] ? "s" : ""}-star`} onClick={() => setRating([true, true, true, false, false]) } ></i>
                <i className={`bx bx${rating[3] ? "s" : ""}-star`} onClick={() => setRating([true, true, true, true, false]) } ></i>
                <i className={`bx bx${rating[4] ? "s" : ""}-star`} onClick={() => setRating([true, true, true, true, true]) } ></i>
              </div>
            </div>
            <div className="form-group">
              <label>Title of your review</label>
              <input className="form-control" onChange={(e) => handleReview(e)} value={review.title} name="title" type="text" placeholder="If you could say it in one sentence, what would you say?" />
            </div>
            <div className="form-group">
              <label>Your review</label>
              <textarea id="review_desc" onChange={(e) => handleReview(e)} value={review.content} name="content" maxLength="100" className="form-control" ></textarea>
              <div className="d-flex justify-content-between mt-3">
                <small className="text-muted"><span id="chars">100</span> characters remaining</small>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <div className="terms-accept">
                <div className="custom-checkbox">
                  <input type="checkbox" id="terms_accept" />
                  <label htmlFor="terms_accept"> I have read and accept{" "} <Link to="#">Terms &amp; Conditions</Link></label>
                </div>
              </div>
            </div>
            <div className="submit-section">
              <button type="submit" className="btn btn-primary submit-btn"> Add Review </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
