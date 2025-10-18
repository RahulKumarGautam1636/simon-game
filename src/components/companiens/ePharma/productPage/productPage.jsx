import { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
// import history from '../history.js';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { SliderSection, Spinner, computeWithPackSize, focusArea, getFallbackImg, getFrom, mmDDyyyyDate, noticeToast, productToast, updateLocalStorageItems, wait } from '../utilities';	
import { loaderAction, breadCrumbAction, cartAction, wishlistAction, modalAction, globalDataAction } from '../../../../actions';
import { CardType5, ConnectedProductCard, ConnectedProductCard1 } from './../cards';
import { SliderM } from '../mobileView/homeM';
import { BASE_URL, ePharmaId, TAKE_HOME_ID, XYZ_ID } from '../../../../constants';
import Reviews from './reviews';
import { ConnectedProductCardM } from '../mobileView/cards';
import { isEmpty } from '../../default/utilities';
import { ChevronUp, Copy } from 'lucide-react';

const ProductPage = ({ loaderAction, match, breadCrumbAction, compCode, cartAction, isMobile, cart, wishlistAction, wishlist, modalAction, globalData, globalDataAction, siteData, vType }) => {

	const [productData, setProductData] = useState({loading: false, data: {ImageMasterCollection: [], ItemMaster: {}, itemMasterCollection: []}, err: {status: false, msg: ''}});       // ItemMaster contains the full Detail of the item.
	const [counter, setCounter] = useState(1);
	const [tabActive, setTabActive] = useState('description');
	const [activePackSize, setPackSize] = useState('');
	const isRent = vType === 'rent';

	// const similarProduct = productData.data.itemMasterCollection[0] || {};
	// const similarProductActivePacksize = similarProduct?.ItemPackSizeList?.length ? similarProduct.ItemPackSizeList[0] : '';
	// const showSimilar = productData.data.itemMasterCollection.length > 0;
	// const similarProductPackSize = () => {      
	// 	return computeWithPackSize(similarProduct, similarProductActivePacksize, vType);
	// }

	let relatedProducts = [];

	if (isEmpty(productData.data.ItemMaster)) {
		relatedProducts = productData.data.itemMasterCollection;
	} else {
		relatedProducts = [productData.data.ItemMaster, ...productData.data.itemMasterCollection]
	}

	const relatedProductPacksizes = relatedProducts.map(item => {
		if (item.ItemPackSizeList && item.ItemPackSizeList.length) {
			const prices = computeWithPackSize(item, item.ItemPackSizeList[0], vType);
			return prices;
		}
	})

	const placeZeroValuedAtLast = () => {
		const sortedBySRateAsc = relatedProductPacksizes.sort((a, b) => a.SRate - b.SRate);
		const findZeroPriced = sortedBySRateAsc.filter(i => i.SRate === 0);
		const findPriced = sortedBySRateAsc.filter(i => i.SRate !== 0);
		return [...findPriced, ...findZeroPriced]
	}

	const similarProduct = vType === 'ErpPharma' ? placeZeroValuedAtLast()[0] || {} : {};
	const showSimilar = !isEmpty(similarProduct) && productData.data.ItemMaster.LocationItemId !== similarProduct.LocationItemId;

	let similarProductBestBefore = mmDDyyyyDate(showSimilar?.EXPDate, '/', '/');																		
	let similarProductBestBeforeDateString = similarProductBestBefore ? new Date(similarProductBestBefore).toDateString().split(' ').slice(1, 4).join(' ') : '';
	
	useEffect(() => {										   
		window.render_ProductPageSlider();
		window.renderVenoBox();
		setCounter(1);
	},[productData])
	
	useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Product Details', link: '/filterPage'}], activeLink: '/filterPage'});
	},[breadCrumbAction])
	
	useEffect(() => {
		async function getSliderItemImges() {
			loaderAction(true);
			const res = await getFrom(`${BASE_URL}/api/Pharma/GetProductDetails?CID=${compCode}&PID=${match.params.id}&LOCID=${globalData.location.LocationId}`, {}, setProductData);
			if (res) {
				setProductData(res); 
			} else {
				console.log('No data received');
			}
			loaderAction(false);
		}
		async function getRentItem() {
			let allRentItems = [ ...siteData.itemMasterCollection ];
			let item = allRentItems.map(a => a.data).reduce((p, c) => [...p, ...c]).filter(i => i.LocationItemId === match.params.id)[0] || {};
			let propertyTypeIndex = allRentItems.map(i => i.title.toLowerCase()).indexOf(item.property_type) || 0;
			let itemPics = [item.pic1,  item.pic2, item.pic3, item.pic4, item.pic5, item.pic6, item.pic7, item.pic8, item.pic9, item.pic10, item.pic11].filter(i => i).map(x => ({ImgURL: `/assets/img/rentNsale/products/${x}`}))
			await wait(800);
			setProductData(pre => ({...pre, loading: false, data: {ImageMasterCollection: itemPics, ItemMaster: item, itemMasterCollection: allRentItems[propertyTypeIndex].data }}));
		}
		if (isRent) {
			setProductData(pre => ({...pre, loading: true}));
			getRentItem();
		} else {
			getSliderItemImges();
		}
	},[match.params.id, loaderAction, compCode, globalData.location.LocationId])

	useEffect(() => {
		const packSizeList = productData.data.ItemMaster?.ItemPackSizeList;
		if (packSizeList && packSizeList?.length) {
			const firstSizeId = packSizeList[0];
			setPackSize(firstSizeId);
		} else {
			setPackSize('');
		}
	},[productData.data.ItemMaster])
	
	const isAddedToCart = Object.values(cart.pharmacy).filter(i => i.LocationItemId === productData.data.ItemMaster.LocationItemId).length;
	const isAddedToWishlist = Object.values(wishlist.pharmacy).filter(i => i.LocationItemId === productData.data.ItemMaster.LocationItemId).length;

	const renderVenoboxSlider = (data) => {
		if (data.loading) {
			return <Spinner min_height='43rem' fSize='2rem'/>;
		} else if (data.err.status) {
			return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
	    } else if (data.data.ImageMasterCollection.length === 0) {
			return (
				<div className="lg-image img-zoom-container">
					<a className="popup-img venobox vbox-item d-flex justify-content-center" href={`#`} data-gall="myGallery">
						<img className="myimage img-fluid" src={getFallbackImg()} alt="product" height="450" width="auto"/>
					</a>
				</div>
			)
		} else {
			return (   
				<div>                                                     
					<div className="product-details-images slider-navigation-1">  			 
						{											              
							data.data.ImageMasterCollection.map((item, index) => {           
								return (										 
									<div className="lg-image img-zoom-container" key={index}>
										<a className="popup-img venobox vbox-item d-flex justify-content-center" href={item.ImgURL} data-gall="myGallery">
											<img id={item.ImgId} className="myimage img-fluid" src={item.ImgURL} style={{maxHeight: '451px'}} alt="product" height="450" width="auto"/>
										</a>
									</div>
								)
							})
						}
					</div>
					
					<div className="product-details-thumbs slider-thumbs-1" style={{paddingTop:'3%'}}>  								  
						{											              
							data.data.ImageMasterCollection.map((item, index) => 			{            
								return (										 
									<div key={index} className="sm-image" style={{paddingLeft:'5px', paddingRight:'5px', width: 'auto'}}><img src={item.ImgURL} style={{maxHeight: '100px'}} alt="product thumb" /></div>
								)
							})
						}
					</div>
				</div>
			)
		}
	}

	const renderProductSlider = useMemo(() => {              		// Without useMemo the carousel rerenders when add to cart button is clicked.						    
		if (productData.loading) {						
		  return <Spinner min_height='25rem' fSize='1.5rem'/>;
		} else if (productData.err.status) {
		  return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{productData.err.msg}</span></h2></div>;
		} else if (productData.data.itemMasterCollection.length === 0) {
		  return false;
		} else {
			// if (isMobile) return <SliderM data={productData.data.itemMasterCollection}/>;
			// return (
			// 	<div className='specialistCard-box'>
			// 		{(() => {
			// 			if (vType === 'ErpManufacturing') {
			// 				return <SliderSection children={<ConnectedProductCard />} data={productData.data.itemMasterCollection} id="neurology-slider" heading={'Neurology'} />;
			// 			} else if (compCode === TAKE_HOME_ID || compCode === XYZ_ID) {
            //               return <SliderSection children={<ConnectedProductCard1 />} data={productData.data.itemMasterCollection} id="neurology-slider" heading={'Neurology'} />;
            //             } else {
            //               return <SliderSection children={<ConnectedProductCard />} data={productData.data.itemMasterCollection} id="neurology-slider" heading={'Neurology'} />;
            //             }
            //           })()}
			// 	</div>
			// )
			return (
				<div className="row product-area">    
					<style>{`   
						.product-area .d-grid {
							grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
							place-items: center;
							padding: 1em 0.7em 0;
							gap: 1.7em 1em;
						}
						@media only screen and (max-width: 1199px) {
							.product-area .d-grid {
								grid-template-columns: 1fr 1fr;
								gap: 1.1em 1em;
    							padding: 1em 0.7em 0px;
								place-items: normal;
							}
						}   
					`}</style>                   
					<div className="col-12 d-grid">
						{productData.data.itemMasterCollection.map((item, index) => {
							if (isMobile) return <ConnectedProductCardM data={item} key={index} />
							if (vType === 'ErpManufacturing') {
								return <ConnectedProductCard classes='bg-slate-100' data={item} key={index} />
							} else if (compCode === TAKE_HOME_ID || compCode === XYZ_ID) {
								return <ConnectedProductCard1 classes='bg-slate-100' data={item} key={index} />
							} else {
								return <ConnectedProductCard classes='bg-slate-100' data={item} key={index} />
							}
						})}
					</div>
				</div>
			)
		}
	},[productData, isMobile])
	
	const handleDummyFunction = () => false;

	let bestBeforeDate = productData.data.ItemMaster?.EXPDate;
	bestBeforeDate = mmDDyyyyDate(bestBeforeDate, '/', '/');																		
	let bestBeforeDateString = bestBeforeDate ? new Date(bestBeforeDate).toDateString().split(' ').slice(1, 4).join(' ') : '';

	const packSize = () => {      
		return computeWithPackSize(productData.data.ItemMaster, activePackSize, vType);
	}

    const handlePackSize = (i) => {
		if (i.CodeId === packSize().PackSizeId) return;
		setPackSize(i);
	}

	const handleAdd = () => {
		if (!globalData.location.LocationId) return focusArea(globalDataAction);
		if (isAddedToCart) {
			cartAction('REMOVE_ITEM', productData.data.ItemMaster.LocationItemId, 'pharmacy');
		} else {
			cartAction('ADD_ITEM', {...productData.data.ItemMaster, count: counter, ...packSize()}, 'pharmacy'); 
			wishlistAction('REMOVE_WISH_ITEM', productData.data.ItemMaster.LocationItemId, 'pharmacy');
			let productToastData = { msg: 'Added to Cart', product: {name: productData.data.ItemMaster.Description, price: packSize().SRate}, button: {text: 'Visit Cart', link: '/cartPage'} };
			productToast(productToastData);
		}
		updateLocalStorageItems()
    }

	const handleCopy = () => {
		const text = `Product Highlights
			Blouse: Running Blouse
			Color: Yellow
			Net Quantity (N): Single
			Occasion: Party

			Additional Details
			Saree Fabric: Georgette
			Transparency: No
			Type: Bandhani
			Blouse Color: Green
			Blouse Fabric: Bangalori Silk
			Blouse Pattern: Embroidered
			Border: Lace
			Border Width: Small Border
			Generic Name: Sarees
			Loom Type: Powerloom
			Ornamentation: Lace border
			Pallu Details: Same as Saree
			Pattern: Embroidered`;
		
		navigator.clipboard.writeText(text);
	};

  	return (
		<div className='pt-3 epharma-global'>
			<div className="content-wraper">
				<div className="container">
					<div className="row single-product-area">
						<div className={`${showSimilar ? 'col-lg-4' : 'col-lg-5'} col-md-6`}>
							<div className="product-details-left position-relative" style={{overflow: 'hidden'}}> 
								{renderVenoboxSlider(productData)}
							</div>
						</div>

						<div className={`${showSimilar ? 'col-lg-4' : 'col-lg-7'} col-md-6`}>
							<div id="myresult" className="img-zoom-result" style={{display:'none'}}>

							</div>
							<div className="product-details-view-content pt-xs-20 pt-10">
								{isRent ? 
								<div className="product-info"> 
									<h2 style={{fontSize: '2.1em'}}>{productData.data.ItemMaster?.name}</h2>
									<div className="price-box pt-3 align-items-center gap-5">
										{/* <span className="old-price">₹ {packSize().ItemMRP}</span> */}
										<span className="new-price">₹ {productData.data.ItemMaster?.amount}</span>
										{/* <span className="discount-percentage" style={{paddingLeft:'15px', color:'green'}}>{packSize().DiscountPer}% OFF</span> */}
										<div className="btn-group-1">
											<button onClick={() => modalAction('SHOW_INTEREST_MODAL', true, {product: productData.data.ItemMaster})} style={{ background: "#c970ff", color: "white", padding: '0.8em 2em', fontSize: '1.1em' }}>SHOW INTEREST</button>
										</div>
									</div>
									{/* <div className="features-table" style={{fontSize: '1.1em', margin: '1.5em 0'}}>
										<table className='w-100'>
											<thead style={{fontFamily: 'Lato'}}>
												<tr>
													<th>Parameters</th>
													<th>Details</th>
												</tr>
											</thead>
											<tbody>
												<tr className='row-cap'>
													<td>For</td>
													<td>{productData.data.ItemMaster?.ptype_id}</td>
												</tr>									
												<tr className='row-cap'>
													<td>No of Rooms</td>
													<td>{productData.data.ItemMaster?.no_of_room}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Carpet Area</td>
													<td>{productData.data.ItemMaster?.carpet_area}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Bathroom</td>
													<td>{productData.data.ItemMaster?.bathroom}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Car Parking</td>
													<td>{productData.data.ItemMaster?.car_parking}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Description</td>
													<td>{productData.data.ItemMaster?.remarks}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Adsress</td>
													<td>{productData.data.ItemMaster?.address}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Area</td>
													<td>{productData.data.ItemMaster?.area}</td>
												</tr>									
												<tr className='row-cap'>
													<td>District</td>
													<td>{productData.data.ItemMaster?.district}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Police Station</td>
													<td>{productData.data.ItemMaster?.police_station}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Landmark</td>
													<td>{productData.data.ItemMaster?.landmark}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Pin Number</td>
													<td>{productData.data.ItemMaster?.pin_no}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Listing Date</td>
													<td>{productData.data.ItemMaster?.add_date}</td>
												</tr>									
												<tr className='row-cap'>
													<td>Amount</td>
													<td>{productData.data.ItemMaster?.amount}</td>
												</tr>									
											</tbody>
										</table>
									</div> */}
									<div className='property-details'>
										<ul className='list-inline'>
											<li><h4>For </h4>: <span>{productData.data.ItemMaster?.ptype_id || 'N/A'}</span></li>
											<li><h4>No of Rooms </h4>: <span>{productData.data.ItemMaster?.no_of_room || 'N/A'}</span></li>
											<li><h4>Carpet Area </h4>: <span>{productData.data.ItemMaster?.carpet_area || 'N/A'}</span></li>
											<li><h4>Bathroom </h4>: <span>{productData.data.ItemMaster?.bathroom || 'N/A'}</span></li>
											<li><h4>Car Parking </h4>: <span>{productData.data.ItemMaster?.car_parking || 'N/A'}</span></li>
											<li><h4>Adsress </h4>: <span>{productData.data.ItemMaster?.address || 'N/A'}</span></li>
											<li><h4>Area </h4>: <span>{productData.data.ItemMaster?.area || 'N/A'}</span></li>
											<li><h4>District </h4>: <span>{productData.data.ItemMaster?.district || 'N/A'}</span></li>
											<li><h4>Police Station </h4>: <span>{productData.data.ItemMaster?.police_station || 'N/A'}</span></li>
											<li><h4>Landmark </h4>: <span>{productData.data.ItemMaster?.landmark || 'N/A'}</span></li>
											<li><h4>Pin Number </h4>: <span>{productData.data.ItemMaster?.pin_no || 'N/A'}</span></li>
											<li><h4>Listing Date </h4>: <span>{productData.data.ItemMaster?.add_date || 'N/A'}</span></li>
											<li><h4>Amount </h4>: <span>{productData.data.ItemMaster?.amount || 'N/A'}</span></li>
											<li className='full-width'><h4>Description </h4>: <span>{productData.data.ItemMaster?.remarks}</span></li>
										</ul>
									</div>
									{/* <div style={{margin: '1.8em 0 1.4em'}}>
										<h4 className='fw-bold lato'>More Details :</h4>
										<p className='mb-0 nunito text-justify' style={{fontSize: '1.1em', lineHeight: '1.6em'}}>Silver Heritage is located in the heart of Paikpara, Kolkata offers 2,3 BHK apartments with sizes ranging from 1000-1500 sqft. The project has 1 building with 12 spacious units. The project is approved by all the major banks and is well known for its superior interior and connectivity. This residential project is just a 2-minute distance from Lake Town Jaya Cinema.</p>
									</div> */}
								</div>
								:
								<div className="product-info">
									<h4 className='text-lg mb-4'>&nbsp;</h4>
									<h2>{productData.data.ItemMaster?.Description}</h2>
									{productData.data.ItemMaster?.ItemPackSizeList?.length ? <div className="product-variants pack-sizes-box pb-20 pb-xs-10" style={{borderBottom: '1px solid #e1e1e1'}}>
										<div className="produt-variants-size">
											<label>Pack size: </label>
											<div className='pack-sizes'>
												{productData.data.ItemMaster?.ItemPackSizeList?.map((i, n) => (
													<div key={i.CodeId} className={i.CodeId === packSize().PackSizeId ? 'active' : ''} onClick={() => handlePackSize(i)}>
														<h5>{i.Description}</h5>
														<div className='d-flex gap-2'>
															<p className="old-price">₹ {i.MRP ? i.MRP : productData.data.ItemMaster?.ItemMRP}</p>
															<p>₹ {i.SRate ? i.SRate : productData.data.ItemMaster?.SRate}</p>															
														</div>
													</div>
												))}
											</div>
										</div>
									</div> : ''}
									{compCode === TAKE_HOME_ID ? '' : <div className="rating-box" style={{fontSize: '1em'}}>
										<ul className="rating rating-with-review-item">
											<li><i className="fas fa-star"></i></li>
											<li><i className="fas fa-star"></i></li>
											<li><i className="fas fa-star"></i></li>
											<li><i className="fas fa-star"></i></li>
											<li><i className="fas fa-star-half-alt"></i></li>
											<li className="review-item mx-4"><Link to="#"><i className="fas fa-th-list"></i> Read Review</Link></li>
											<li className="review-item"><Link to="#"><i className="fas fa-pencil-alt"></i> Write Review</Link></li>
										</ul>
									</div>}
									{globalData.location.LocationId ? <div className="price-box pt-4">
										<span className="old-price">₹ {packSize().ItemMRP}</span>
										<span className="new-price">₹ {packSize().SRate}</span>
										<span className="discount-percentage" style={{paddingLeft:'15px', color:'green'}}>{packSize().DiscountPer}% OFF</span>
									</div> : ''}
									<div className="product-desc mb-0" style={{borderBottom: 'var(--border-clr)'}}>
										{vType === 'ErpPharma' && <p> Best before:<span> {bestBeforeDateString}</span></p>}
										<p> Generic name: <span> {productData.data.ItemMaster?.Technicalname}</span></p>
										<p> MFG By: <span> {productData.data.ItemMaster?.ManufacturBY}</span></p>
									</div>
									<div className='pb-3' style={{borderBottom: 'var(--border-clr)'}}>
										<div className="single-add-to-cart">
											<form action="#" className="cart-quantity d-flex flex-wrap floating-cta-box w-100">
												<div className="quantity d-flex gap-4 align-items-center">
													<label>Quantity</label>
													<div className="cart-plus-minus w-100">
														<input onChange={handleDummyFunction} className="cart-plus-minus-box" value={counter} type="text"/>
														<div className="dec qtybutton" onClick={() => {if (counter !== 1) setCounter(counter-1)}}><i className="fa fa-angle-down"></i></div>
														<div className="inc qtybutton"><i onClick={() => setCounter(counter+1)} className="fa fa-angle-up"></i></div>
													</div>
												</div>
												{(() => {
													if (compCode === TAKE_HOME_ID|| compCode === ePharmaId) {
														return (
															<>
																{productData.data.ItemMaster?.Category !== 24856 ? <button className={`add-to-cart ${!globalData.location.LocationId || packSize().StockQty ? '' : 'opacity-50 pe-none'}`} type="button" onClick={handleAdd}>{isAddedToCart === 1 ? 'Remove from cart' : 'Add to cart'}</button> : 
																<button className={`add-to-cart`} type="button" onClick={() => noticeToast({title: 'Over Counter Sales only..', msg: 'As Government Norms this Product is not to be sold Online - Contact with Service Provider for buying this product.'}, { position: "top-center", autoClose: 5000 })}>Counter Sale only</button>}
															</>
														)
													} else {
														return <button className={`add-to-cart ${!globalData.location.LocationId || packSize().StockQty ? '' : ''}`} type="button" onClick={handleAdd}>{isAddedToCart === 1 ? 'Remove from cart' : 'Add to cart'}</button>;
													}
												})()}
												
											</form>																		
										</div>
										<div className="product-additional-info pt-25 pt-xs-15">
											<div className='d-flex gap-5 flex-wrap'>
												{/* <h6 className={`a wishlist-btn`} onClick={() => {cartAction('REMOVE_ITEM', productData.data.ItemMaster.LocationItemId, 'pharmacy'); wishlistAction('ADD_WISH_ITEM', {...productData.data.ItemMaster, count: counter, ...packSize()}, 'pharmacy'); updateLocalStorageItems()}}><i className={`fa${isAddedToWishlist ? 's' : 'r'} fa-heart`}></i>{isAddedToWishlist === 1 ? 'Added' : 'Add'} to wishlist</h6> */}
												{globalData.location.LocationId && !packSize().StockQty ? <h6 className={`a wishlist-btn text-danger`}><i className={`fa fa-window-close`}></i>Out of Stock</h6> : ''}
											</div>
										</div>

									</div>	
									{/* <AdditionalDetails2 product={productData.data.ItemMaster}/> */}
									{/* <div className="my-4 border-1 border-slate-200 rounded-xl overflow-hidden">
										<h2 className="px-4 py-3 text-black bg-slate-200 mb-0">SOLD BY</h2>
										<div className="p-4 flex gap-4 items-end flex-wrap">
											<i className="bx bx-store text-4xl bg-gray-200 rounded-full p-3"></i>
											<div className="product-desc mb-0">
												<p className="mb-2 !text-xl !font-medium">Shop Name</p>
												<p class="stock-label mb-0 text-gray-500"><i class="bx bxs-message-x text-danger" title="1"></i> Out of Stock</p>
											</div>
											<div className='flex gap-3 ms-auto'>
												<Link class="continue-button bg-white border-sky-500 border-2 rounded-lg text-sky-600 font-semibold !py-[6px] !px-[15px]" to="/shop">VIEW SHOP</Link>
											</div>
										</div>
									</div>
									<div className="my-4 border-1 border-slate-200 rounded-xl overflow-hidden">
										<h2 className="px-4 py-3 text-black bg-slate-200 mb-0">OTHER SELLERS</h2>
										<div className="p-4 flex gap-4 items-end flex-wrap">
											<i className="bx bx-store text-4xl bg-gray-200 rounded-full p-3"></i>
											<div className="product-desc mb-0">
												<p className="mb-2 !text-xl !font-medium">Shop Name</p>
												<p class="stock-label mb-0 text-gray-500"><i class="bx bxs-message-check text-success" title="1"></i> Available in Stock</p>
											</div>
											<div className='flex gap-3 ms-auto'>
												<Link class="continue-button rounded-lg font-semibold !py-[6px] !px-[15px]" to="#">SELECT</Link>
												<Link class="continue-button bg-white border-sky-500 border-2 rounded-lg text-sky-600 font-semibold !py-[6px] !px-[15px]" to="/shop">VIEW SHOP</Link>
											</div>
										</div>
										<hr className="!border-gray-800 border-1 m-0" />
										<div className="p-4 flex gap-4 items-end flex-wrap">
											<i className="bx bx-store text-4xl bg-gray-200 rounded-full p-3"></i>
											<div className="product-desc mb-0">
												<p className="mb-2 !text-xl !font-medium">Shop Name</p>
												<p class="stock-label mb-0 text-gray-500"><i class="bx bxs-message-check text-success" title="1"></i> Available in Stock</p>
											</div>
											<div className='flex gap-3 ms-auto'>
												<Link class="continue-button rounded-lg font-semibold !py-[6px] !px-[15px]" to="#">SELECT</Link>
												<Link class="continue-button bg-white border-sky-500 border-2 rounded-lg text-sky-600 font-semibold !py-[6px] !px-[15px]" to="/shop">VIEW SHOP</Link>
											</div>
										</div>
									</div> */}
								</div>}
							</div>
						</div>
						{showSimilar ?
						<div className="col-lg-4 col-md-6 product-details-view-content bg-slate-100 px-4">
							<div className="product-details-view-content pt-xs-20 pt-10">
								<h4 className='text-lg mb-4 bg-orange-600 !text-white py-2 px-4 w-fit !mt-[-10px] !ml-[-0.84em]'>100% Similar Product at Low Cost</h4>
								<div className="product-info">
									<div className='d-flex gap-4' style={{borderBottom: '1px solid #e1e1e1'}}>
										<div>
											<h2>{similarProduct.Description}</h2>
											{similarProduct.ItemPackSizeList?.length ? <div className="product-variants pack-sizes-box pb-20 pb-xs-10">
												<div className="produt-variants-size">
													<label>Pack size: </label>
													<div className='pack-sizes'>
														{similarProduct.ItemPackSizeList?.map((i, n) => (
															<div key={i.CodeId} className={i.CodeId === similarProduct.PackSizeId ? 'active' : ''} onClick={() => handlePackSize(i)}>
																<h5>{i.Description}</h5>
																<div className='d-flex gap-2'>
																	<p className="old-price">₹ {i.MRP ? i.MRP : similarProduct.ItemMRP}</p>
																	<p>₹ {i.SRate ? i.SRate : similarProduct.SRate}</p>															
																</div>
															</div>
														))}
													</div>
												</div>
											</div> : ''}
										</div>
										<img src={similarProduct.ItemImageURL} className='ml-auto' style={{maxHeight: '100px'}} alt="product thumb" />
									</div>
									{globalData.location.LocationId ? <div className="price-box pt-4">
										<span className="old-price">₹ {similarProduct.ItemMRP}</span>
										<span className="new-price">₹ {similarProduct.SRate}</span>
										<span className="discount-percentage" style={{paddingLeft:'15px', color:'green'}}>{similarProduct.DiscountPer}% OFF</span>
									</div> : ''}
									<div className="product-desc mb-0" style={{borderBottom: 'var(--border-clr)'}}>
										{vType === 'ErpPharma' && <p className='opacity-0'> Best before:<span> {similarProductBestBeforeDateString}</span></p>}
										<p> Generic name: <span> {similarProduct.Technicalname}</span></p>
										<p> MFG By: <span> {similarProduct.ManufacturBY}</span></p>
									</div>
									<div className='pb-3' style={{borderBottom: 'var(--border-clr)'}}>
										<Link to={`/productPage/${similarProduct.ItemId}`} className={`add-to-cart mt-[15px] block w-fit ml-auto bg-teal-600`} >View Product</Link>
									</div>
								</div>
							</div>

						</div> : ''}
					</div>
				</div>	
			</div>

			{isRent ? 
				<section className={`py-5 container mt-4 bg-gray-100 product-list-row`}>
					<div className='d-flex justify-content-between align-items-end pb-3 row-title' style={{borderBottom: '1px solid #cbcbcb'}}>
						<h3 className='mb-0 text-uppercase'>RELATED PRODUCTS YOU MAY LIKE</h3>
						{/* <Link to={'#'} className='text-blue-500 fw-medium'>VIEW ALL</Link> */}
					</div>
					<div className='gap-lg-4 mt-4 mt-md-5 flex-wrap d-grid row-content' style={{gap: '0.6em'}}>
						{productData.data.itemMasterCollection.map(i => <CardType5 data={i} key={i.LocationItemId} />)}      	{/* .filter(x => x.status === 'Approved' && x.featured ==='Y') */}
					</div>
				</section>
			: 
				<>
					{/* <div className="product-area pt-35 pt-xs-10">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="li-product-tab">
										<ul className="nav li-product-menu">
											<li className={`${tabActive === 'description' && 'active'}`} onClick={() => setTabActive('description')}>Description</li>
											<li className={`${tabActive === 'productDetails' && 'active'}`} onClick={() => setTabActive('productDetails')}>Product Details</li>
											{compCode === TAKE_HOME_ID ? '' : <li className={`${tabActive === 'reviews' && 'active'}`} onClick={() => setTabActive('reviews')}>Reviews</li>}
										</ul>
									</div>
								</div>
							</div>
							<div className="row">							  
								<div className={`tab-content overflow-hidden pt-2 ${tabActive === 'reviews' ? 'px-0' : ''}`}>     
									<div id="tabFade-pane-desc" className={`tab-pane fade ${tabActive === 'description' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
										Coming soon...              
									</div>
									<div id="tabFade-pane-details" className={`tab-pane fade ${tabActive === 'productDetails' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
										Coming soon...             
									</div>
									{compCode === TAKE_HOME_ID ? '' : <div id="tabFade-pane-reviews" className={`tab-pane fade ${tabActive === 'reviews' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
										<Reviews tabActive={tabActive}/>
									</div> }
								</div>
							</div> 
							<div className="tab-content">
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
					</div> */}
					{renderProductSlider && <section className="product-area li-laptop-product pt-30 pt-xs-5">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="li-section-title">
										<h2>
											<span>Related Products You May Like</span>
										</h2>
									</div>
									{/* <div className="row">
										<div className="product-active">
											<div className="col-lg-12 home-item position-relative">
												{renderProductSlider}
											</div>                       
										</div>
									</div> */}
									{renderProductSlider}
								</div>
							</div>
						</div>
					</section>}
					<div className="accordion accordion-flush block-reassurance p-6 bg-white" id="reassurance-accordion">
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingDefaultOne">
								<button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseDefaultOne" aria-expanded="true" aria-controls="collapseDefaultOne">
									<i className="fas fa-exchange-alt"></i> Return policy
								</button>
							</h2>
							<div id="collapseDefaultOne" className="accordion-collapse collapse" aria-labelledby="headingDefaultOne" data-bs-parent="#reassurance-accordion">
								<div className="accordion-body">
									<div className="categories-box position-relative">
										<div className="card mb-4">
											<div className="card-header d-flex justify-content-between align-items-baseline p-4">
												<h5 className="mb-0">RETURN PROCESS:</h5>
											</div>
											<div className="card-body cart">
												<ol className='mb-0'>
													<li>For Return intimation, please visit <Link onClick={() => modalAction('RETURN_POLICY_MODAL', false)} to="/contactUs">www.takehomemedicine.in/#/contactUs</Link>.</li>
													<li>TakeHome customer care team will verify the claim made by the customer within 72 (seventy-two) business hours from the time of receipt of complaint.</li>
													<li>Once the claim is verified as genuine and reasonable, TakeHome will initiate the collection of product(s) to be returned.</li>
													<li>The customer will be required to pack the product(s) in original manufacturer’s packaging.</li>
													<li>Refund will be completed within 30 (thirty) days from date of reverse pick up (if required).</li>
												</ol>
											</div>
											<div className="card-footer">
												<Link to="/returnPolicy" className="continue-button ms-auto d-table">Read More</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingDefaultTwo">
							<button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseDefaultTwo" aria-expanded="false" aria-controls="collapseDefaultTwo">
								<i className="fa fa-truck"></i> Shipping Details
							</button>
							</h2>
							<div id="collapseDefaultTwo" className="accordion-collapse collapse" aria-labelledby="headingDefaultTwo" data-bs-parent="#reassurance-accordion">
								<div className="accordion-body">
									<div className="categories-box position-relative">
										<div className="card mb-4">
											<div className="card-header d-flex justify-content-between align-items-baseline p-4">
												<h5 className="mb-0">SHIPPING CHARGES:</h5>
											</div>
											<div className="card-body cart">
												<p className='mb-0'>Estimated shipping charges are calculated as per the value of the order and can be viewed in the cart section at the time of checkout. For any further shipping related information, please write to hbkalyanipharmacy@gmail.com For any further Refund related information, please write to hbkalyanipharmacy@gmail.com</p>
											</div>
											<div className="card-footer">
												<Link to="/returnPolicy" className="continue-button ms-auto d-table">Read More</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingDefaultThree">
							<button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseDefaultThree" aria-expanded="false" aria-controls="collapseDefaultThree">
								<i className="fas fa-shield-alt"></i> Privacy Policy
							</button>
							</h2>
							<div id="collapseDefaultThree" className="accordion-collapse collapse" aria-labelledby="headingDefaultThree" data-bs-parent="#reassurance-accordion">
								<div className="accordion-body">
									<div className="categories-box position-relative">
										<div className="card mb-4">
											<div className="card-header d-flex justify-content-between align-items-baseline p-4">
												<h5 className="mb-0">Privacy Policy</h5>
											</div>
											<div className="card-body cart">
												<p>TakeHome collects Data to improve user experience. The data includes following categories:</p>
												<ol className='mb-0'>
													<li>Contact information: first and last name, email address, postal address, country, employer, phone number and other similar contact data.</li>
													<li>Financial information: payment instrument information, transactions, transaction history, preferences, method, mode and manner of payment, spending pattern or trends, and other similar data.</li>
													<li>Technical information: website, device and mobile app usage, Internet Protocol (IP) address and similar information collected via automated means, such as cookies, pixels and similar technologies.</li>
													<li>Transaction information: the date of the transaction, total amount, transaction history and preferences and related details.</li>
													<li>Health related information, such as information or records relating to Your medical/ health history, health status, details of treatment plans and medication prescribed by a Medical Practitioner, dosage details such as frequency of dosage, alternative medication, medicines ordered by You through the Platform, laboratory testing results and any other information inferred there from</li>
													<li>Product and service information: Your account membership number, registration and payment information, and program-specific information, when you request products and/or services directly from us, or participate in marketing programs.</li>
													<li>Personal information: Age, sex, date of birth, marital status, nationality, details of government identification documents provided, occupation, ethnicity, religion, travel history or any other personal information provided in responses to surveys or questionnaires.</li>
													<li>Your reviews, feedback and opinions about our products, programmes and services.</li>
													<li>Loyalty programme information: your loyalty membership information, account details, profile or password details and any frequent flyer or travel partner programme affiliation.</li>
												</ol>
											</div>
											<div className="card-footer">
												<Link to="/privacyPolicy" className="continue-button ms-auto d-table">Read More</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			}
		</div>
	)
}

const mapStateToProps = (state) => {
  return { compCode: state.compCode, isMobile: state.isMobile, cart: state.cart, wishlist: state.wishlist, globalData: state.globalData, siteData: state.siteData };
}

export default connect(mapStateToProps, {loaderAction, breadCrumbAction, cartAction, modalAction, globalDataAction, wishlistAction})(ProductPage);


const AdditionalDetails = ({ product }) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const details = [
		{ label: 'Breed', content: 'Gir, Sahiwal, Murrah, etc.' },
		{ label: 'Age', content: '2–6 yrs' },
		{ label: 'Milk Yield', content: '8–15 L/day' },
		{ label: 'Health', content: 'Vaccinated, Dewormed' },
		{ label: 'Unit', content: 'Per Animal' },	 
	]
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4 text-[1.2em]">
			<div className="flex items-center justify-between !p-4 border-y border-gray-200">
				<h3 className="!text-lg font-semibold text-gray-900 mb-0">Additional Details</h3>
				<button 
				onClick={() => setIsExpanded(!isExpanded)}
				className="text-gray-600 hover:text-gray-800"
				>
				<ChevronUp 
					size={20} 
					className={`transform transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
				/>
				</button>
			</div>
			{isExpanded && (
				<div className="!p-4 grid grid-cols-2 !gap-4 font-lato">
					{details.map(i => (
						<div className="">
							<div className="!text-sm text-gray-600 !mb-1">{i.label}</div>
							<div className="!text-sm font-medium text-gray-900">{i.content}</div>
						</div>
					))}


					{/* <div className="grid grid-cols-2 !gap-4">
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Type</div>
						<div className="!text-sm font-medium text-gray-900">Bandhani</div>
						</div>
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Blouse Color</div>
						<div className="!text-sm font-medium text-gray-900">Green</div>
						</div>
					</div>

					<div className="grid grid-cols-2 !gap-4">
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Blouse Fabric</div>
						<div className="!text-sm font-medium text-gray-900">Bangalori Silk</div>
						</div>
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Blouse Pattern</div>
						<div className="!text-sm font-medium text-gray-900">Embroidered</div>
						</div>
					</div>

					<div className="grid grid-cols-2 !gap-4">
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Border</div>
						<div className="!text-sm font-medium text-gray-900">Lace</div>
						</div>
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Border Width</div>
						<div className="!text-sm font-medium text-gray-900">Small Border</div>
						</div>
					</div>

					<div className="grid grid-cols-2 !gap-4">
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Generic Name</div>
						<div className="!text-sm font-medium text-gray-900">Sarees</div>
						</div>
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Loom Type</div>
						<div className="!text-sm font-medium text-gray-900">Powerloom</div>
						</div>
					</div>

					<div className="grid grid-cols-2 !gap-4">
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Ornamentation</div>
						<div className="!text-sm font-medium text-gray-900">Lace border</div>
						</div>
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Pallu Details</div>
						<div className="!text-sm font-medium text-gray-900">Same as Saree</div>
						</div>
					</div>

					<div className="grid grid-cols-2 !gap-4">
						<div>
						<div className="!text-sm text-gray-600 !mb-1">Pattern</div>
						<div className="!text-sm font-medium text-gray-900">Embroidered</div>
						</div>
						<div></div>
					</div> */}
				</div>
			)}
		</div>
	)
}

const AdditionalDetails2 = ({ product }) => {				// use this one
	const [activeTab, setActiveTab] = useState('overview');

	const details = [
		{ label: 'Breed', value: 'Gir, Sahiwal, Murrah, etc.' },
		{ label: 'Age', value: '2–6 yrs' },
		{ label: 'Milk Yield', value: '8–15 L/day' },
		{ label: 'Health', value: 'Vaccinated, Dewormed' },
		{ label: 'Unit', value: 'Per Animal' },	 
	]
	return (
		<div className="max-w-6xl mx-auto bg-white text-[1.2em]">
		{/* Tab Navigation */}
		<div className="flex border-b border-gray-200">
			<button
			onClick={() => setActiveTab('overview')}
			className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
				activeTab === 'overview'
				? 'text-green-700 border-green-600'
				: 'text-gray-800 border-transparent hover:text-gray-700'
			}`}
			>
			Overview
			</button>
			<button
			onClick={() => setActiveTab('description')}
			className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
				activeTab === 'description'
				? 'text-green-700 border-green-600'
				: 'text-gray-800 border-transparent hover:text-gray-700'
			}`}
			>
			Description
			</button>
		</div>

		{/* Tab Content */}
		<div className="mt-4">
			{activeTab === 'overview' && (
			<div className="space-y-0">
				{details.map((item, index) => (
				<div
					key={index}
					className={`grid grid-cols-4 py-3 px-4 ${
					index % 2 === 1 ? 'bg-blue-50' : 'bg-white'
					}`}
				>
					<div className="text-sm font-medium text-gray-900">
					{item.label}
					</div>
					<div className="col-span-3 text-sm text-gray-700">
					{item.value}
					</div>
				</div>
				))}
			</div>
			)}

			{activeTab === 'description' && (
			<div className="p-4">
				<p className="text-gray-600">Description content would go here...</p>
			</div>
			)}
		</div>
		</div>
	);
}

