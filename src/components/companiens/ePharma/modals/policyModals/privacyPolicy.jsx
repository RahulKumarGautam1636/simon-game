import { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
// import history from '../history.js';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { SliderSection, Spinner, getFrom, updateLocalStorageItems } from '../../utilities';	
import { loaderAction, breadCrumbAction, addToCartAction, removeFromCartAction, addToWishlistAction, removeFromWishlistAction, modalAction } from '../actions';
import { ConnectedProductCard } from './cards';
import { SliderM } from './mobileView/homeM';
import { HashLink } from 'react-router-hash-link';
import { BASE_URL, SRC_URL } from '../../../../../constants';


const ProductPage = ({ loaderAction, match, breadCrumbAction, compCode, addToCartAction, isMobile, cart, removeFromCartAction, addToWishlistAction, removeFromWishlistAction, wishlist, modalAction }) => {

	const [venoBoxSliderImageList, setVenoBoxSliderImageList] = useState({loading: false, data: {ImageMasterCollection: [], ItemMaster: {}, itemMasterCollection: []}, err: {status: false, msg: ''}});       // ItemMaster contains the full Detail of the item.
	const [counter, setCounter] = useState(1);
	const [tabActive, setTabActive] = useState('description');
	
	useEffect(() => {
		window.render_ProductPageSlider();
		window.renderVenoBox();
		// return () => {
		// 	window.remove_ProductPageSlider();                 // Since spinner replaces (destroys) the whole slider hence we don't need to remove the previous slider manually. 
		// }
		setCounter(1);
	},[venoBoxSliderImageList])
	
	useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Single Product', link: '/filterPage'}], activeLink: '/filterPage'});
	},[breadCrumbAction])
	
	useEffect(() => {
		async function getSliderItemImges() {
			loaderAction(true);
			const res = await getFrom(`${BASE_URL}/api/Pharma/Get?CID=${compCode}&PID=${match.params.id}`, {}, setVenoBoxSliderImageList);
			if (res) {
				// setTimeout(() => {
					setVenoBoxSliderImageList(res); 
				// },[2000])
			} else {
				console.log('No data received');
			}
			loaderAction(false);
		}
		getSliderItemImges();
	},[match.params.id, loaderAction, compCode])


	
	
	
	const isAddedToCart = Object.values(cart).filter(i => i.LocationItemId === venoBoxSliderImageList.data.ItemMaster.LocationItemId).length;
	const isAddedToWishlist = Object.values(wishlist).filter(i => i.LocationItemId === venoBoxSliderImageList.data.ItemMaster.LocationItemId).length;

	const renderVenoboxSlider = (data) => {

		if (data.loading) {
			return <Spinner min_height='50rem' fSize='2.5rem'/>;
		} else if (data.err.status) {
			return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
	    } else if (data.data.ImageMasterCollection.length === 0) {
			return <div className='text-center my-5 w-100'><h2 className="text-warning">No Item Found.</h2></div>;
		} else {
			return (   
				<>                                                        
					    {/* Slick slider won't render correctly (un-initialized) with asynchronous reredering of slider after removing spinner */}   
					<div className="product-details-images slider-navigation-1">  								  {/* component from parent div hence rendering slider and spinner both togather and use css to show/hide the spinner */}  
						{											              
							data.data.ImageMasterCollection.map((item, index) => 			{            // When looping on each slider image, slick slider adds a div to parent div, during rerendering react recognizes it as non-child hence instead removing,
								return (										 // it throws non-child removal error (attempt to remove child that is not child of the parent). hence we'll replace the whole parent div to overcome this issue.
									<div className="lg-image img-zoom-container" key={index}>
										<a className="popup-img venobox vbox-item" href={item.ImgURL} data-gall="myGallery">
											<img id={item.ImgId} className="myimage" src={item.ImgURL} alt="product" height="450" width="auto"/>
										</a>
									</div>
								)
							})
						}
					</div>
					
					<div className="product-details-thumbs slider-thumbs-1" style={{paddingTop:'3%'}}>  								  {/* component from parent div hence rendering slider and spinner both togather and using css to show/hide the spinner */}  
						{											              
							data.data.ImageMasterCollection.map((item, index) => 			{            // When looping on each slider image, slick slider adds a div to parent div, during rerendering react recognizes it as non-child hence instead removing,
								return (										 // it throws non-child removal error (attempt to remove child that is not child of the parent). hence we'll replace the whole parent div to overcome this issue.
									<div key={index} className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px', maxHeight: '100px', width: 'auto'}}><img src={item.ImgURL} alt="product thumb"/></div>
								)
							})
						}
					</div>
				</>
			)
		}
	}

	const renderProductSlider = useMemo(() => {              		// Connecting cartlist in redux state is cousing this function to be recalculated when we click add to cart button which adds an item in cartlist, this results reRendering of carousel. 
		// console.log(data);									    // To prevent this we using useMemo, forcing it to rerender only if venoBoxSliderImageList changes not when cartlist changes. text on card buttons is updated from card component.
		if (venoBoxSliderImageList.loading) {						// We don't need to reRender whole carousel to update that.
		  return <Spinner min_height='25rem' fSize='1.5rem'/>;
		} else if (venoBoxSliderImageList.err.status) {
		  return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{venoBoxSliderImageList.err.msg}</span></h2></div>;
		} else if (venoBoxSliderImageList.data.itemMasterCollection === 0) {
		  return <div className='text-center my-5 w-100'><h2 className="text-info"><span className="text-warning">No Related Products Found.</span></h2></div>;
		} else {
			if (isMobile) return <SliderM data={venoBoxSliderImageList.data.itemMasterCollection}/>;
			return (
				<div className='specialistCard-box'>
					<SliderSection children={<ConnectedProductCard/>} data={venoBoxSliderImageList.data.itemMasterCollection} id="neurology-slider" heading={'Neurology'} />
				</div>
			)
		}
	},[venoBoxSliderImageList, isMobile])
	
	const handleQuantity = () => false;
	const handleDummyFunction = () => false;
  	return (
		<>
			<div className="content-wraper">
				<div className="container">
					<div className="row single-product-area">
						<div className="col-lg-5 col-md-6">
							<div className="product-details-left position-relative" style={{maxHeight: '580px', overflow: 'hidden'}}>
								{/* <div className="product-details-images slider-navigation-1"> */}
									<div className="lg-image img-zoom-container" id="img-zoom-container">
										<Link className="popup-img venobox vbox-item" to={`${SRC_URL}/Content/ImageMaster/220601102538_1.jpeg`} data-gall="myGallery">
											<img id="myimage_0" className="myimage" src={`${SRC_URL}/Content/ImageMaster/220601102538_1.jpeg`} alt="product image" height="450" width="auto"/>
										</Link>
									</div>
									<div className="lg-image img-zoom-container" id="img-zoom-container">
										<Link className="popup-img venobox vbox-item" to={`${SRC_URL}/Content/ImageMaster/220601102549_2.webp`} data-gall="myGallery">
											<img id="myimage_1" className="myimage" src={`${SRC_URL}/Content/ImageMaster/220601102549_2.webp`} alt="product image" height="450" width="auto"/>
										</Link>
									</div>
									<div className="lg-image img-zoom-container" id="img-zoom-container">
										<Link className="popup-img venobox vbox-item" to={`${SRC_URL}/Content/ImageMaster/220601102602_3.webp`} data-gall="myGallery">
											<img id="myimage_2" className="myimage" src={`${SRC_URL}/Content/ImageMaster/220601102602_3.webp`} alt="product image" height="450" width="auto"/>
										</Link>
									</div>
									<div className="lg-image img-zoom-container" id="img-zoom-container">
										<Link className="popup-img venobox vbox-item" to={`${SRC_URL}/Content/ImageMaster/249363_4.webp`} data-gall="myGallery">
											<img id="myimage_3" className="myimage" src={`${SRC_URL}/Content/ImageMaster/249363_4.webp`} alt="product image" height="450" width="auto"/>
										</Link>
									</div>
									<div className="lg-image img-zoom-container" id="img-zoom-container">
										<Link className="popup-img venobox vbox-item" to={`${SRC_URL}/Content/ImageMaster/249363_5.jpeg`} data-gall="myGallery">
											<img id="myimage_4" className="myimage" src={`${SRC_URL}/Content/ImageMaster/249363_5.jpeg`} alt="product image" height="450" width="auto"/>
										</Link>
									</div> 
									{renderVenoboxSlider(venoBoxSliderImageList)}
								{/* </div> */}

								{/* <div className="product-details-thumbs slider-thumbs-1" style={{paddingTop:'3%'}}>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src={`${SRC_URL}/Content/ImageMaster/220601102538_1.jpeg`} alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src={`${SRC_URL}/Content/ImageMaster/220601102549_2.webp`} alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src={`${SRC_URL}/Content/ImageMaster/220601102602_3.webp`} alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src={`${SRC_URL}/Content/ImageMaster/249363_4.webp`} alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src={`${SRC_URL}/Content/ImageMaster/249363_5.jpeg`} alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
								</div> */}


								{/* <div className="product-details-images slider-navigation-1">
									<div className="lg-image img-zoom-container">
										<Link className="popup-img venobox vbox-item" to="/images/product/large-size/1.jpg" data-gall="myGallery">
											<img id="myimage_0" className="myimage" src="/images/product/large-size/1.jpg" alt="product image" height="450" width="auto"/>
										</Link>
									</div>
									<div className="lg-image img-zoom-container">
										<Link className="popup-img venobox vbox-item" to="/images/product/large-size/2.jpg" data-gall="myGallery">
											<img id="myimage_1" className="myimage" src="/images/product/large-size/2.jpg" alt="product image"/>
										</Link>
									</div>
									<div className="lg-image img-zoom-container">
										<Link className="popup-img venobox vbox-item" to="/images/product/large-size/3.jpg" data-gall="myGallery">
											<img id="myimage_2" className="myimage" src="/images/product/large-size/3.jpg" alt="product image"/>
										</Link>
									</div>
									<div className="lg-image img-zoom-container">
										<Link className="popup-img venobox vbox-item" to="/images/product/large-size/4.jpg" data-gall="myGallery">
											<img id="myimage_3" className="myimage" src="/images/product/large-size/4.jpg" alt="product image"/>
										</Link>
									</div>
									<div className="lg-image img-zoom-container">
										<Link className="popup-img venobox vbox-item" to="/images/product/large-size/5.jpg" data-gall="myGallery">
											<img id="myimage_4" className="myimage" src="/images/product/large-size/5.jpg" alt="product image"/>
										</Link>
									</div>
									<div className="lg-image img-zoom-container">
										<Link className="popup-img venobox vbox-item" to="/images/product/large-size/6.jpg" data-gall="myGallery">
											<img id="myimage_5" className="myimage" src="/images/product/large-size/6.jpg" alt="product image"/>
										</Link>
									</div>
								</div>
						
								<div className="product-details-thumbs slider-thumbs-1" style={{paddingTop:'3%'}}>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src="/images/product/small-size/1.jpg" alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src="/images/product/small-size/2.jpg" alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src="/images/product/small-size/3.jpg" alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src="/images/product/small-size/4.jpg" alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src="/images/product/small-size/5.jpg" alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
									<div className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px'}}><img src="/images/product/small-size/6.jpg" alt="product image thumb" style={{maxHeight: '100px', width: 'auto'}}/></div>
								</div> */}
							</div>
						</div>

						<div className="col-lg-7 col-md-6">
							<div id="myresult" className="img-zoom-result" style={{display:'none'}}>

							</div>
							<div className="product-details-view-content pt-60">
								<div className="product-info">
									<h2>{venoBoxSliderImageList.data.ItemMaster?.Description}</h2>
									{/* <span className="product-details-ref">Reference: Specification</span> */}
									<div className="rating-box pt-20 pt-xs-5">
										<ul className="rating rating-with-review-item">
											<li><i className="fa fa-star-o"></i></li>
											<li><i className="fa fa-star-o"></i></li>
											<li><i className="fa fa-star-o"></i></li>
											<li className="no-star"><i className="fa fa-star-o"></i></li>
											<li className="no-star"><i className="fa fa-star-o"></i></li>
											<li className="review-item"><Link to="#">Read Review</Link></li>
											<li className="review-item"><Link to="#">Write Review</Link></li>
										</ul>
									</div>
									<div className="price-box pt-20 pt-xs-5">
										<span className="old-price">₹ {venoBoxSliderImageList.data.ItemMaster?.ItemMRP}</span>
										<span className="new-price">₹ {venoBoxSliderImageList.data.ItemMaster?.SRate}</span>
										<span className="discount-percentage" style={{paddingLeft:'15px', color:'green'}}>{venoBoxSliderImageList.data.ItemMaster?.DiscountPer}% OFF</span>
									</div>
									<div className="product-desc">
										<p>
											<span>
												{venoBoxSliderImageList.data.ItemMaster?.ShortDesc}
											</span>
										</p>
									</div>
									<div className="product-variants" style={{display:'none'}}>
										<div className="produt-variants-size">
											<label>Dimension</label>
											<select onChange={handleQuantity} className="nice-select">
												<option value="1" title="S" defaultValue="selected">40x60cm</option>
												<option value="2" title="M">60x90cm</option>
												<option value="3" title="L">80x120cm</option>
											</select>
										</div>
									</div>
									<div className="single-add-to-cart">
										<form action="#" className="cart-quantity">
											<div className="quantity">
												<label>Quantity</label>
												<div className="cart-plus-minus">
													<input onChange={handleDummyFunction} className="cart-plus-minus-box" value={counter} type="text"/>
													<div className="dec qtybutton" onClick={() => {if (counter !== 1) setCounter(counter-1)}}><i className="fa fa-angle-down"></i></div>
													<div className="inc qtybutton"><i onClick={() => setCounter(counter+1)} className="fa fa-angle-up"></i></div>
												</div>
											</div>
											<button className="add-to-cart" type="button" onClick={() => {addToCartAction({...venoBoxSliderImageList.data.ItemMaster, count: counter}); removeFromWishlistAction(venoBoxSliderImageList.data.ItemMaster.LocationItemId); updateLocalStorageItems()}}>{isAddedToCart === 1 ? 'Added' : 'Add'} to cart</button>
										</form>																		{/*	three dot's means we taking all properties from venoBoxSliderImageList object and place them in this new object along with new count property */}
									</div>
									<div className="product-additional-info pt-25 pt-xs-15">
										<h6 className="a wishlist-btn" to="#" onClick={() => {removeFromCartAction(venoBoxSliderImageList.data.ItemMaster.LocationItemId); addToWishlistAction({...venoBoxSliderImageList.data.ItemMaster, count: counter}); updateLocalStorageItems()}}><i className={`fa fa-heart${isAddedToWishlist !== 1 ? '-o' : ''}`}></i>{isAddedToWishlist === 1 ? 'Added' : 'Add'} to wishlist</h6>
										{/* <div className="product-social-sharing pt-25">
											<ul>
												<li className="facebook"><Link to="#"><i className="fa fa-facebook"></i>Facebook</Link></li>
												<li className="twitter"><Link to="#"><i className="fa fa-twitter"></i>Twitter</Link></li>
												<li className="google-plus"><Link to="#"><i className="fa fa-google-plus"></i>Google +</Link></li>
												<li className="instagram"><Link to="#"><i className="fa fa-instagram"></i>Instagram</Link></li>
											</ul>
										</div> */}
									</div>
									<div className="block-reassurance">
										<ul>
											<li>
												<div className="reassurance-item">
													<div className="reassurance-icon">
														<i className="fa fa-check-square-o"></i>
													</div>
													<HashLink to='/privacyPolicy'><p>Privacy policy</p></HashLink>
												</div>
											</li>
											<li>
												<div className="reassurance-item">
													<div className="reassurance-icon">
														<i className="fa fa-truck"></i>
													</div>
													<p>Delivery policy</p>
												</div>
											</li>
											<li>
												<div className="reassurance-item">
													<div className="reassurance-icon">
														<i className="fa fa-exchange"></i>
													</div>
													<p onClick={() => modalAction('RETURN_POLICY_MODAL', true)}> Return policy</p>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="product-area pt-35 pt-xs-10">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="li-product-tab">
								<ul className="nav li-product-menu">
									{/* <li><Link className="active" data-toggle="tab" to="#description"><span>Description</span></Link></li>
									<li><Link data-toggle="tab" to="#product-details"><span>Product Details</span></Link></li>
									<li><Link data-toggle="tab" to="#reviews"><span>Reviews</span></Link></li> */}
									<li className={`${tabActive === 'description' && 'active'}`} onClick={() => setTabActive('description')}>Description</li>
									<li className={`${tabActive === 'productDetails' && 'active'}`} onClick={() => setTabActive('productDetails')}>Product Details</li>
									<li className={`${tabActive === 'reviews' && 'active'}`} onClick={() => setTabActive('reviews')}>Reviews</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="tab-content overflow-hidden pt-2">
							<div id="tabFade-pane-1" className={`tab-pane fade ${tabActive === 'description' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
								Product Desctiption              
							</div>
							<div id="tabFade-pane-1" className={`tab-pane fade ${tabActive === 'productDetails' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
								Product Details             
							</div>
							<div id="tabFade-pane-1" className={`tab-pane fade ${tabActive === 'reviews' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
								Product Reveiws
							</div>
						</div>
					</div> 


					<div className="tab-content">
						<div id="description" className="tab-pane active show" role="tabpanel">
							<div className="product-description">
								<span>Model Specification</span>
								<span>Model Technicalname</span>
							</div>
						</div>
						<div id="product-details" className="tab-pane" role="tabpanel">
							<div className="product-details-manufacturer">
								<Link to="#">
									<img src="/images/product-details/1.jpg" alt="Product Manufacturer"/>
								</Link>
								<p><span>Reference</span> demo_7</p>
								<p><span>Reference</span> demo_7</p>
							</div>
						</div>
						<div id="reviews" className="tab-pane" role="tabpanel">
							<div className="product-reviews" style={{display:'none'}}>
								<div className="product-details-comment-block">
									<div className="comment-review">
										<span>Grade</span>
										<ul className="rating">
											<li><i className="fa fa-star-o"></i></li>
											<li><i className="fa fa-star-o"></i></li>
											<li><i className="fa fa-star-o"></i></li>
											<li className="no-star"><i className="fa fa-star-o"></i></li>
											<li className="no-star"><i className="fa fa-star-o"></i></li>
										</ul>
									</div>
									<div className="comment-author-infos pt-25">
										<span>HTML 5</span>
										<em>01-12-18</em>
									</div>
									<div className="comment-details">
										<h4 className="title-block">Demo</h4>
										<p>Plaza</p>
									</div>
									<div className="review-btn">
										<Link className="review-links" to="#" data-toggle="modal" data-target="#mymodal">Write Your Review!</Link>
									</div>
									<div className="modal fade modal-wrapper" id="mymodal">
										<div className="modal-dialog modal-dialog-centered" role="document">
											<div className="modal-content">
												<div className="modal-body">
													<h3 className="review-page-title">Write Your Review</h3>
													<div className="modal-inner-area row">
														<div className="col-lg-6">
															<div className="li-review-product">
																<img src="@Model.ImageMasterCollection[0].ImgURL"  width="400" height="400" alt="Li's Product"/>
																<img src="/images/product/large-size/3.jpg" alt="Li's Product"/>
																<div className="li-review-product-desc">
																	<p className="li-product-name">Model GroupName</p>
																	<p>
																		<span>Beach Camera Exclusive Bundle - Includes Two Samsung Radiant 360 R3 Wi-Fi Bluetooth Speakers. Fill The Entire Room With Exquisite Sound via Ring Radiator Technology. Stream And Control R3 Speakers Wirelessly With Your Smartphone. Sophisticated, Modern Design </span>
																	</p>
																</div>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="li-review-content">
																<div className="feedback-area">
																	<div className="feedback">
																		<h3 className="feedback-title">Our Feedback</h3>
																		<form action="#">
																			<p className="your-opinion">
																				<label>Your Rating</label>
																				<span>
																					<select className="star-rating">
																						<option value="1">1</option>
																						<option value="2">2</option>
																						<option value="3">3</option>
																						<option value="4">4</option>
																						<option value="5">5</option>
																					</select>
																				</span>
																			</p>
																			<p className="feedback-form">
																				<label htmlFor="feedback">Your Review</label>
																				<textarea id="feedback" name="comment" cols="45" rows="8" aria-required="true"></textarea>
																			</p>
																			<div className="feedback-input">
																				<p className="feedback-form-author">
																					<label htmlFor="author">
																						Name<span className="required">*</span>
																					</label>
																					<input onChange={handleDummyFunction} id="author" name="author" value="" size="30" aria-required="true" type="text"/>
																				</p>
																				<p className="feedback-form-author feedback-form-email">
																					<label htmlFor="email">
																						Email<span className="required">*</span>
																					</label>
																					<input onChange={handleDummyFunction} id="email" name="email" value="" size="30" aria-required="true" type="text"/>
																					<span className="required"><sub>*</sub> Required fields</span>
																				</p>
																				<div className="feedback-btn pb-15">
																					<Link to="#" className="close" data-dismiss="modal" aria-label="Close">Close</Link>
																					<Link to="#">Submit</Link>
																				</div>
																			</div>
																		</form>
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
					</div>
				</div>
			</div>

			<section className="product-area li-laptop-product pt-30 pt-xs-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="li-section-title">
								<h2>
									<span>15 other products in the same category:</span>
								</h2>
							</div>
							<div className="row">
								<div className="product-active">
									<div className="col-lg-12 home-item position-relative">
										{renderProductSlider}
									</div>                       
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

const mapStateToProps = (state) => {
  return { compCode: state.compCode, isMobile: state.isMobile, cart: state.cart, wishlist: state.wishlist };
}

export default connect(mapStateToProps, {loaderAction, breadCrumbAction, addToCartAction, removeFromCartAction, addToWishlistAction, removeFromWishlistAction, modalAction})(ProductPage);
