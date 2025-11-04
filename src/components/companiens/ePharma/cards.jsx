import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toastAction, userInfoAction, modalAction, quickviewItemAction, globalDataAction, wishlistAction, cartAction } from '../../../actions';
import { connect } from 'react-redux';
import { addToCart, addToWishlist2, buyNow2, computeWithPackSize, escape, focusArea, getFallbackImg, ImageLoader, noticeToast, productToast, updateLocalStorageItems } from './utilities';
import { ePharmaId, TAKE_HOME_ID, XYZ_ID } from '../../../constants';

import { Minus, Plus } from 'lucide-react';


function ProfileCard({ data }) {

  return (
    <div className="profile-card text-center bg-white d-flex flex-column align-items-center justify-content-around p-3 m-1 position-relative overflow-hidden" style={{"boxShadow": "0 2px 4px 0 rgb(0 0 0 / 20%)", "borderRadius": "0.85em", "maxWidth": "14rem", "width": "14rem", "fontSize": "15px", "minHeight": "19rem"}}>
        <div className="tag"><p>59% off</p></div>
        <div className="rounded-circle p-1 overflow-hidden" style={{"maxWidth": "5.5em", "border": "2px solid #fd5abd"}}>
          <img src="/img/user_unknown.png" className="img-fluid" alt="Speciality"/>
        </div>
        <ul className="d-flex justify-content-between px-0 mt-2 mb-2 text-warning" style={{"listStyle": "none", "minWidth": "7em", "fontSize": "0.8em"}}>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star-half-alt"></i></li>
        </ul>
        <h4 style={{"fontSize": "1.1em"}}><Link to={`/doctorProfile/${data.PartyCode}`}>{data.Name}</Link></h4>
        <h6 style={{"fontSize": "0.85em"}}>{data.Qualification}</h6>
        <p style={{"fontSize": "0.75em"}} className="mb-2">{data.SpecialistDesc}</p>
        <button className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{"borderWidth":"2px", "borderColor": "#157eab", "fontSize": "0.8em"}}>VIEW PROFILE</button>
        <button className="btn btn-sm btn-secondary w-100" type="button" name="button" style={{"backgroundColor": "#157eab", "fontSize": "0.8em", "border": "2px solid #157eab"}}>BOOK APPOINTMENT</button>
    </div>
  );
}

export default ProfileCard;


function PackgeCard({ data }) {
  return (
    <div className="profile-card bg-white d-flex flex-column justify-content-around p-3 m-1 position-relative overflow-hidden" style={{boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)", borderRadius: "0.85em", maxWidth: "19rem", width: "18rem", fontSize: "15px"}}>
        <h4 style={{fontSize: "1.3em"}}>{data.pakageName}</h4>
        <p style={{fontSize: "0.75em", fontWeight: "500"}} className="mb-2">TOTAL TESTS: {data.totalTests}</p>
        <p style={{fontSize: "0.75em", color: "#227066fa"}} className="mb-2">{data.testType}</p>
        <p style={{fontSize: "0.7em"}} className="mb-2"> {data.testName}<span style={{fontWeight: "500", color: "orange"}}> +{data.more} More</span>
        </p>
        <hr className="mb-3 mt-1" style={{background: "#157eab", height: "0px", width: "100%"}} />
        <div className="d-flex w-75 mb-1">
            <h6 style={{fontSize: "0.85em"}}>MRP</h6>
            <h6 className="text-danger position-relative pricing-red" style={{fontSize: "0.85em", margin: "0 2em 0 1em"}}>₹{data.priceRed}</h6>
            <h6 className="text-white position-relative pricing-green" style={{fontSize: "0.85em", zIndex: "1"}}>{data.off}% off</h6>
            <h6 className="position-relative" style={{color: "black", fontSize: "0.85em", zIndex: "1", marginLeft: "2em", transform: "scale(1.2)"}}>₹{data.off}</h6>
        </div>
        <button className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{borderWidth: "2px", borderColor: "#157eab", fontSize: "0.8em"}}>ADD TO CART</button>
    </div>
  );
}


// function LabTestCard({ data, labTestCart, addToCartAction, toastAction }) {
//   const isAddedToCart = Object.keys(labTestCart).filter(i => parseInt(i) === data.LocationItemId );          // Filter cart items to know if item is already added to cart or not.

//   return (
//     <div className="profile-card text-center bg-white d-flex flex-column align-items-center justify-content-around p-3 m-1 position-relative overflow-hidden" style={{"boxShadow": "0 2px 4px 0 rgb(0 0 0 / 20%)", "borderRadius": "0.85em", "maxWidth": "14rem", "width": "14rem", "fontSize": "15px", "minHeight": "16rem"}}>
//         <div className="tag"><p>{data.DiscountPer}% off</p></div>
//         <img src={data.img} alt="Speciality" style={{"maxWidth": "5.5em", "marginBottom": "1em"}}/>
//         <h4 style={{"fontSize": "1.1em"}}>{data.ItemDesc}</h4>
//         <hr className="mb-3 mt-1" style={{"background": "#157eab","height": "1px", "width": "100%"}} />
//         <div className="d-flex justify-content-around w-75 mb-1">
//             <h6 style={{"fontSize": "0.85em"}}>MRP</h6>
//             <h6 className="text-danger position-relative pricing-red" style={{"fontSize": "0.85em"}}>₹{data.MRPrate}</h6>
//             <h6 className="text-white position-relative pricing-green" style={{"fontSize": "0.85em", "zIndex": "1"}}>₹{data.Rate}</h6>
//         </div>
//         <button onClick={() => {addToCartAction(data); toastAction(true, data)}} className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{"borderWidth":"2px", "borderColor": "#157eab", "fontSize": "0.8em"}}>{isAddedToCart.length > 0 ? 'TEST BOOKED' : 'BOOK TEST'}</button>
//     </div>
//   );
// }


// function PharmcyCard({ data, pharmacyCart, addPharmacyCartAction, toastAction }) {
//   const isAddedToCart = Object.keys(pharmacyCart).filter(i => parseInt(i) === data.LocationItemId );          // Filter cart items to know if item is already added to cart or not.

//   return (
//     <div className="profile-card text-center bg-white d-flex flex-column align-items-center justify-content-around p-3 m-1 position-relative overflow-hidden" style={{"boxShadow": "0 2px 4px 0 rgb(0 0 0 / 20%)", "borderRadius": "0.85em", "maxWidth": "14rem", "width": "14rem", "fontSize": "15px", "height": "17rem"}}>
//         <div className="tag"><p>{data.DiscountPer}% off</p></div>
//         <div className='img-box'>
//           <img src={data.img} alt="Speciality"/>
//         </div>
//         <h4 style={{"fontSize": "1.1em"}}>{data.ItemDesc}</h4>
//         <hr className="mb-3 mt-1" style={{"background": "#157eab","height": "1px", "width": "100%"}} />
//         <div className="d-flex justify-content-around w-75 mb-1">
//             <h6 style={{"fontSize": "0.85em"}}>MRP</h6>
//             <h6 className="text-danger position-relative pricing-red" style={{"fontSize": "0.85em"}}>₹{data.MRPrate}</h6>
//             <h6 className="text-white position-relative pricing-green" style={{"fontSize": "0.85em", "zIndex": "1"}}>₹{data.Rate}</h6>
//         </div>
//         <button onClick={() => {addPharmacyCartAction(data); toastAction(true, data)}} className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{"borderWidth":"2px", "borderColor": "#157eab", "fontSize": "0.8em"}}>{isAddedToCart.length > 0 ? 'ADDED TO CART' : 'ADD TO CART'}</button>
//     </div>
//   );
// }


function HorizontalProfileCard({ data, userInfo, userInfoAction, companyList, compInfo}) {

  const [activeCompany, setActiveCompany] = useState('');

  useEffect(() => {
    setActiveCompany(userInfo.selectedCompany.COMPNAME);
  },[userInfo.selectedCompany.COMPNAME])

  const selectCompany = (item) => {
    setActiveCompany(item.COMPNAME);
    userInfoAction({selectedCompany: item});
  }

  return (
    <div className="card w-100 mb-0">
        <div className="card-body">
            <div className="doctor-widget">
                <div className="doc-info-left">
                    <div className="doctor-img">
                        <Link to={`/doctorProfile/${data.PartyCode}`}>
                            <img src="/img/DOC.png" className="img-fluid" alt="User"/>
                        </Link>
                    </div>
                    <div className="doc-info-cont">
                        <h4 className="doc-name"><Link to={`/doctorProfile/${data.PartyCode}`}>{data.Name}</Link></h4>
                        <p className="doc-speciality">{data.Qualification}&nbsp;</p>
                        <h5 className="doc-department">
                          {/* <img src="/img/specialities/specialities-05.png" className="img-fluid" alt="Speciality"/> */}
                          {data.SpecialistDesc}&nbsp;
                        </h5>
                        <div className="rating">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star"></i>
                            <span className="d-inline-block average-rating">(17)</span>
                        </div>
                        <div className="clinic-details">
                          <ul className="clinic-gallery" >
                                {
                                  companyList.map((item, index) => {
                                    return (
                                      <li key={index} onClick={() => selectCompany(item)}>
                                        <div className={`d-flex pillButton align-items-center my-1 my-lg-0 ${item.COMPNAME === activeCompany ? 'active' : ''}`}>
                                          <img src='img/logo/opd2.png' alt='clinicImage'/>
                                          <h6 className='mb-0 ms-1'>{item.COMPNAME}</h6>
                                        </div>
                                      </li>
                                    )
                                  })
                                }

                                {/* <li>
                                    <Link to="/img/features/feature-01.jpg" className="gallery-zoom" data-fancybox>
                                        <img src="/img/features/feature-01.jpg" alt="Feature"/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/img/features/feature-02.jpg" className="gallery-zoom" data-fancybox>
                                        <img src="/img/features/feature-02.jpg" alt="Feature"/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/img/features/feature-03.jpg" className="gallery-zoom" data-fancybox>
                                        <img src="/img/features/feature-03.jpg" alt="Feature"/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/img/features/feature-04.jpg" className="gallery-zoom" data-fancybox>
                                        <img src="/img/features/feature-04.jpg" alt="Feature"/>
                                    </Link>
                                </li> */}
                          </ul>
                        </div>
                    </div>
                </div>
                <div className="doc-info-right">
                    <div className="clinic-booking">
                        <Link className="view-pro-btn" to="/#">View Profile</Link>
                        <Link className="apt-btn" to="#" onClick={() => {userInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: null}); }}>Book Appointment</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { labTestCart: state.labTestCart, pharmacyCart: state.pharmacyCart, isToastActive: state.isToastActive, compInfo: state.compInfo, userInfo: state.userInfo };
}

export const ConnectedPackageCard = connect(mapStateToProps, {toastAction})(PackgeCard);
// export const ConnectedLabTestCard = connect(mapStateToProps, {addToCartAction, toastAction})(LabTestCard);
// export const ConnectedPharmacyCard = connect(mapStateToProps, {addPharmacyCartAction, toastAction})(PharmcyCard);
export const ConnectedHorizontalProfileCard = connect(mapStateToProps, {toastAction, userInfoAction})(HorizontalProfileCard);



const ProductCard1 = ({ data, cartAction, wishlistAction, cart, wishlist, globalData, globalDataAction, compCode, vType }) => {
    const history = useHistory();
    const existInCart = Object.values(cart.pharmacy).find(i => i.LocationItemId === data.LocationItemId);
    const isAdded = existInCart?.LocationItemId;
    const isAddedToWishlist = Object.values(wishlist.pharmacy).filter(i => i.LocationItemId === data.LocationItemId).length;
    const [activePackSize, setPackSize] = useState('');

    useEffect(() => {
		const packSizeList = data.ItemPackSizeList;
		if (packSizeList && packSizeList?.length) {
			const firstSizeId = packSizeList[0];
			setPackSize(firstSizeId);
		} else {
			setPackSize('');
		}
	},[data])

    const packSize = () => {      
        return computeWithPackSize(data, activePackSize, vType);
    }

    const handlePackSize = (i) => {
		if (i.CodeId === packSize().PackSizeId) return;
		setPackSize(i);
        if (isAdded) return cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy');
        if (isAddedToWishlist) wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
	}
    
    const packSizeList = data.ItemPackSizeList?.map(i => <span className={i.CodeId === packSize().PackSizeId ? 'current' : ''} key={i.CodeId} onClick={() => handlePackSize(i)} role='button'>{i.Description}</span>);

    const handleAdd = () => {
        addToCart(globalDataAction, globalData, isAdded, data, cartAction, packSize, wishlistAction);
    }

    const buyNow = () => {
        buyNow2(globalData, globalDataAction, packSize, cartAction, wishlistAction, data, history);
    }

    const addToWishlist = () => {
        addToWishlist2(globalData, globalDataAction, packSize, cartAction, wishlistAction, data, isAddedToWishlist);
    }

    return (
        <div className='product-card-1'>
            <div className='img-box position-relative'>
                <Link to={`/productPage/${data.ItemId}`} draggable={false}>
                    <ImageLoader className='img-fluid pe-none' src={data.ItemImageURL || getFallbackImg()} styles={{maxHeight: '190px'}} alt={data.Description} />
                </Link>
                {packSizeList?.length ? <p className='packSize'>{packSizeList}</p> : ''}
            </div>
            {(vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') || <span className="sticker"> {packSize().DiscountPer} %<br />Off </span>}
            <div className='card-content'>
                <Link to={`/productPage/${data.ItemId}`}><h5>{data.Description}</h5></Link>
                {globalData.location.LocationId ? 
                    <>
                        <h6>₹ {packSize().SRate} <span>₹ {packSize().ItemMRP}</span></h6>
                        {data.itemmstr === "Stock" ? 
                            (packSize().StockQty ? <p className='stock-label'><i className='bx bxs-message-check text-success' title={packSize().StockQty}></i> Available in Stock</p> : <p className='stock-label'><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>)
                        : ''}
                    </>
                : ''}
            </div>
            <div className='card-cta'> 
                {data.Category !== 24856 ? <div className="btn-group">
                    {(() => {
                        if (compCode === TAKE_HOME_ID || compCode === ePharmaId) {
                            return (
                                <AddToCartBtn parent='productCard1' useAuth={true} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} buyNow={buyNow} inCart={existInCart} isAdded={isAdded} />
                            )
                        } else {
                            return (
                                <AddToCartBtn parent='productCard1' useAuth={false} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} buyNow={buyNow} inCart={existInCart} isAdded={isAdded} />
                            )
                        }
                    })()}
                    {(vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') || <button onClick={addToWishlist} title='Add to Wishlist' type="button" className="btn btn-outline-primary"><i className={`fa${isAddedToWishlist ? 's' : 'r'} fa-heart`}></i></button>}
                </div> : 
                <div className="btn-group">
                    <button onClick={() => noticeToast({title: 'Over Counter Sales only..', msg: 'As Government Norms this Product is not to be sold Online - Contact with Service Provider for buying this product.'}, { position: "top-center", autoClose: 5000 })} type="button" className="btn btn-outline-primary">For sale over counter only</button>
                </div>}
            </div>
        </div>
    )
}
const mapStateToProductsCard1 = (state) => {
    return { cart: state.cart, wishlist: state.wishlist, globalData: state.globalData, compCode: state.compCode, vType: state.vType };
}
  
export const ConnectedProductCard1 = connect(mapStateToProductsCard1, {modalAction, quickviewItemAction, globalDataAction, cartAction, wishlistAction})(ProductCard1);

const AddToCart = ({ parent, useAuth, locationId, qty, addCart, buyNow, inCart, isAdded, cartAction, vType, classes, styles }) => {
    let isValid;    
    if (useAuth) isValid = !locationId || qty;
    else isValid = true;
    const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');

    if (parent === 'productCard1') {
        return (
            <>
                {isAdded ? 
                    <div className={`btn btn-outline-primary`}>
                        <i onClick={() => {if (inCart.count !== 1) cartAction('ADD_ITEM', {...inCart, count: inCart.count - 1}, 'pharmacy')}} className='bx bx-minus align-middle'></i>
                        &nbsp; {inCart.count} &nbsp;
                        <i className='bx bx-plus align-middle' onClick={() => cartAction('ADD_ITEM', {...inCart, count: inCart.count + 1}, 'pharmacy')}></i>
                    </div> :
                    <button onClick={addCart} type="button" className={`btn btn-outline-primary ${isValid ? '' : 'opacity-50 pe-none'}`}>{isAdded ? 'Remove' : 'Add to cart'}</button> 
                }
                {isRestaurant || <button onClick={buyNow} type="button" className={`btn btn-outline-primary ${isValid ? '' : 'opacity-50 pe-none'}`}>Buy now</button>}    
            </>
        )
    } else if (parent === 'search_list_card') {
        return (
            isAdded ? 
            <div className={`controlled-btn ms-auto`}>
                <i onClick={() => {if (inCart.count !== 1) cartAction('ADD_ITEM', {...inCart, count: inCart.count - 1}, 'pharmacy')}} className='bx bx-minus align-middle text-primary fw-bold'></i>
                &nbsp; {inCart.count} &nbsp;
                <i className='bx bx-plus align-middle text-primary fw-bold' onClick={() => cartAction('ADD_ITEM', {...inCart, count: inCart.count + 1}, 'pharmacy')}></i>
            </div> :
            <button onClick={addCart} type="button" className={`controlled-btn ms-auto ${isValid ? '' : 'opacity-50 pe-none'}`}>{isAdded ? 'Remove' : 'Add to cart'}</button>      
        )
    } else if (parent === 'productCard') {
        return (
            <div className="btn-box-2">
                {isAdded ? 
                    <div className={`btn btn-main btn-round-full`}>
                        <span style={{transform: 'scale(1.2)'}}>
                            <i onClick={() => {if (inCart.count !== 1) cartAction('ADD_ITEM', {...inCart, count: inCart.count - 1}, 'pharmacy')}} className='bx bx-minus align-middle fw-bold'></i>
                            &nbsp; {inCart.count} &nbsp;
                            <i className='bx bx-plus align-middle fw-bold' onClick={() => cartAction('ADD_ITEM', {...inCart, count: inCart.count + 1}, 'pharmacy')}></i>
                        </span>
                    </div> :
                    <button onClick={addCart} type="button" className={`btn btn-main btn-round-full ${isValid ? '' : 'opacity-50 pe-none'}`}>{isAdded ? 'Remove' : 'ADD TO CART'}</button> 
                }
                <button onClick={buyNow} type="button" className={`btn btn-main btn-round-full add-wishlist-btn ${isValid ? '' : 'opacity-50 pe-none'}`}>BUY NOW</button>
            </div>
        )
    } else if (parent === 'productCardM') {
        return (
            <>
                {isAdded ? 
                    <div className={`controlled-btn`} style={{borderBottomLeftRadius: '0.45em'}}>
                        <span style={{transform: 'scale(1.4)'}} className='d-block text-center'>
                            <i onClick={() => {if (inCart.count !== 1) cartAction('ADD_ITEM', {...inCart, count: inCart.count - 1}, 'pharmacy')}} className='bx bx-minus align-middle fw-bold text-primary'></i>
                            &nbsp; {inCart.count} &nbsp;
                            <i className='bx bx-plus align-middle fw-bold text-primary' onClick={() => cartAction('ADD_ITEM', {...inCart, count: inCart.count + 1}, 'pharmacy')}></i>
                        </span>
                    </div> : 
                    <button className={`controlled-btn ${isValid ? '' : 'opacity-50 pe-none'}`} onClick={addCart} type="button" style={{borderBottomLeftRadius: '0.45em'}}>{isAdded ? 'Remove' : 'Add To Cart'}</button>
                }               
                {isRestaurant || <button className={`controlled-btn ${isValid ? '' : 'opacity-50 pe-none'}`} onClick={buyNow} type="button" style={{borderBottomRightRadius: '0.45em'}}>Buy Now</button>}
            </>
        )
    } else if (parent === 'card_6') {
        return (
            <div className="flex-shrink-0">
                {isAdded ? (
                    <div className="flex items-center gap-1 bg-white !rounded-lg p-0.5 border-2 border-orange-300">
                        <button onClick={() => {if (inCart.count !== 1) cartAction('ADD_ITEM', {...inCart, count: inCart.count - 1}, 'pharmacy')}} className="w-6 h-6 rounded bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600" ><Minus className="w-3 h-3" /></button>
                        <span className="font-bold text-xs px-1">{inCart.count}</span>
                        <button onClick={() => cartAction('ADD_ITEM', {...inCart, count: inCart.count + 1}, 'pharmacy')} className="w-6 h-6 rounded bg-green-50 hover:bg-green-100 flex items-center justify-center text-green-600"><Plus className="w-3 h-3" /></button>
                    </div>
                ) : (
                    <button onClick={addCart} type="button" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold !rounded-lg shadow-md hover:shadow-lg">Add</button>
                )}
            </div>
        )
    } else {
        return <button type='button' className={`${classes} ${isValid ? '' : 'opacity-50 pe-none'}`} style={{...styles}} onClick={addCart} >{isAdded ? 'Remove' : 'Add To Cart'}</button>
    }

}

const mapStateToAddToCart = (state) => {
    return { vType: state.vType };
}

export const AddToCartBtn = connect(mapStateToAddToCart, {cartAction})(AddToCart);

const ProductCard = ({ data, wishlistAction, cartAction, cart, wishlist, globalData, globalDataAction, compCode, vType }) => {
    const history = useHistory();
    // const isAdded = Object.values(cart.pharmacy).filter(i => i.LocationItemId === data.LocationItemId).length;
    const existInCart = Object.values(cart.pharmacy).find(i => i.LocationItemId === data.LocationItemId);
    const isAdded = existInCart?.LocationItemId;
    const isAddedToWishlist = Object.values(wishlist.pharmacy).filter(i => i.LocationItemId === data.LocationItemId).length;

    const [activePackSize, setPackSize] = useState('');
    useEffect(() => {
		const packSizeList = data.ItemPackSizeList;
		if (packSizeList && packSizeList?.length) {
			const firstSizeId = packSizeList[0];
			setPackSize(firstSizeId);
		} else {
			setPackSize('');
		}
	},[data])

    const packSize = () => {      
        return computeWithPackSize(data, activePackSize, vType);
    }

    const handlePackSize = (i) => {
		if (i.CodeId === packSize().PackSizeId) return;
		setPackSize(i);
        if (isAdded) return cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy');
        if (isAddedToWishlist) wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
	}
    
    const packSizeList = data.ItemPackSizeList?.map(i => <span className={i.CodeId === packSize().PackSizeId ? 'current' : ''} key={i.CodeId} onClick={() => handlePackSize(i)} role='button'>{i.Description}</span>);
    const handleAdd = () => {
        addToCart(globalDataAction, globalData, isAdded, data, cartAction, packSize, wishlistAction);
    }

    const buyNow = () => {
        buyNow2(globalData, globalDataAction, packSize, cartAction, wishlistAction, data, history);
    }

    const addToWishlist = () => {
        addToWishlist2(globalData, globalDataAction, packSize, cartAction, wishlistAction, data, isAddedToWishlist);
    }
    return (
        <div className='product-card-2'>
            <div className="product-img">
                <Link to={`/productPage/${data.ItemId}`}><img src={data.ItemImageURL || getFallbackImg()} alt="product" /></Link>
                {packSizeList?.length ? <p className='packSize' style={{fontSize: '1.3em'}}>{packSizeList}</p> : ''}
            </div>
            <span className="sticker"> {packSize().DiscountPer} %<br />Off </span>
            {/* {vType === 'agro' ? <div className="organic-label" onClick={addToWishlist}>
                <img src="/assets/img/agro/Organic.png" alt="Organic" />
            </div> : <div className="wish-icon" onClick={addToWishlist}><i className={`fa${isAddedToWishlist ? 's' : 'r'} fa-heart`}></i></div>} */}
            <div className="wish-icon" onClick={addToWishlist}><i className={`fa${isAddedToWishlist ? 's' : 'r'} fa-heart`}></i></div>
            <div className='content-box'>
                <div className="product-details">
                    {globalData.location.LocationId ? <div className='price-box'>
                        <h4>₹ {packSize().SRate}</h4>
                        <h6>₹ {packSize().ItemMRP}</h6>
                        <ul className="ratings d-flex justify-content-between mb-0 p-0 list-unstyled ms-auto" style={{"fontSize": "0.9em", color: 'orange'}}>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star"></i></li>
                            <li><i className="bx bxs-star-half"></i></li>
                        </ul>
                    </div> : ''}
                    <Link to={`/productPage/${data.ItemId}`}><h5>{data.Description}</h5></Link>
                    {globalData.location.LocationId ? 
                        packSize().StockQty ? <p className='stock-label'><i className='bx bxs-message-check text-success' title={packSize().StockQty}></i> Available in Stock</p> : <p className='stock-label'><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>
                    : ''}
                </div>
                <div className="cart-action mt-0">
                    {/* <div className="btn-box-2">
                        <button className={`btn btn-main btn-round-full ${!globalData.location.LocationId || packSize().StockQty ? '' : 'opacity-50 pe-none'}`} onClick={handleAdd}>{isAdded ? 'REMOVE' : 'ADD TO CART'}</button>
                        <button className={`btn btn-main btn-round-full add-wishlist-btn ${!globalData.location.LocationId || packSize().StockQty ? '' : 'opacity-50 pe-none'}`} onClick={buyNow}>BUY NOW</button>
                    </div> */}

                    {(() => {
                        if (compCode === XYZ_ID) {
                            return (
                                // <div className="btn-box-2">
                                //     <button className={`btn btn-main btn-round-full ${!globalData.location.LocationId || packSize().StockQty ? '' : 'opacity-50 pe-none'}`} onClick={handleAdd}>{isAdded ? 'REMOVE' : 'ADD TO CART'}</button>
                                //     <button className={`btn btn-main btn-round-full add-wishlist-btn ${!globalData.location.LocationId || packSize().StockQty ? '' : 'opacity-50 pe-none'}`} onClick={buyNow}>BUY NOW</button>
                                // </div>
                                <AddToCartBtn parent='productCard' useAuth={false} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} buyNow={buyNow} inCart={existInCart} isAdded={isAdded} />
                            )
                        } else {
                            if (compCode === TAKE_HOME_ID && data.Category === 24856) {
                                return (
                                    <div className="btn-box-2">
                                        <button onClick={() => noticeToast({title: 'Over Counter Sales only..', msg: 'As Government Norms this Product is not to be sold Online - Contact with Service Provider for buying this product.'}, { position: "top-center", autoClose: 5000 })} type="button" className="btn btn-main btn-round-full text-uppercase flex-1">For sale over counter only</button>
                                    </div>
                                ) 
                            }
                            return (
                                <AddToCartBtn parent='productCard' useAuth={true} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} buyNow={buyNow} inCart={existInCart} isAdded={isAdded} />
                            )
                        }
                    })()}
                </div>
            </div>
        </div>
        //   <div className="single-product-wrap" style={{borderRadius: '10px 10px 10px 10px', padding: '5px 5px 0px'}}>
        //       <div className="product-image">
        //           <Link to={`/productPage/${data.ItemId}`}>
        //               <img id="imgSmallPWD" src={data.ItemImageURL || '/assets/img/ePharma/no-image.png'} height="120" width="120" alt={data.Description}/>
        //           </Link>
        //       </div>
        //       <span className="sticker"> {data.DiscountPer} %<br />Off </span>
        //       <div className="product_desc">
        //           <div className="product_desc_info">
        //               <div className="product-review">
        //                   <h4 style={{marginBottom: '5px'}}>
        //                       <Link to={`/productPage/${data.ItemId}`} className="product_name">
        //                            {data.Description}
        //                            <span className="nameTooltip">{data.Description}</span>
        //                        </Link>
        //                   </h4>
        //               </div>
        //               <div className="price-box">
        //                   <span className="old-price">₹ {data.ItemMRP}</span>
        //                   <span className="new-price">&nbsp; ₹ {data.SRate}</span>
        //                   <div className="rating-box">
        //                       <ul className="rating">
        //                           <li><i className="fa fa-star-o"></i></li>
        //                           <li><i className="fa fa-star-o"></i></li>
        //                           <li><i className="fa fa-star-o"></i></li>
        //                           <li><i className="fa fa-star-o"></i></li>
        //                           <li className="no-star"><i className="fa fa-star-o"></i></li>
        //                       </ul>
        //                   </div>
        //               </div>
        //               <div className="countersection" style={{visibility: 'hidden', opacity: '0'}}>
        //                   <div className="li-countdown"></div>
        //               </div>
        //           </div>
        //           <div className="add-actions">
        //               <ul className="add-actions-link">
        //                   <li className="add-cart active me-2">
        //                       <button onClick={() => {quickviewItemAction(data.LocationItemId); modalAction('QUICKVIEW_MODAL', true)}}>{isAdded === 1 ? 'Added' : 'Add'} to cart</button>
        //                   </li>
        //                   <li className="add-cart active">
        //                       <button onClick={buyNow}>Buy now</button>
        //                   </li>
        //                   <li className="float-end" onClick={() => {addToWishlistAction({...data, count: 1}); removeFromCartAction(data.LocationItemId); toastAction(true, data, 'Successfully added to Wishlist'); updateLocalStorageItems()}}>
        //                       <button className="links-details" to="#"><i className="fa fa-heart-o"></i></button>
        //                   </li>
        //                   {/* <li className="float-end">
        //                       <button to="#" onClick={() => {quickviewItemAction(data.LocationItemId); modalAction('QUICKVIEW_MODAL', true)}} className="quick-view-btn"><i className="fa fa-eye"></i></button>
        //                   </li> */}
        //               </ul>
        //           </div>
        //       </div>
        //   </div>
    )
}


const mapStateToProductsCard = (state) => {
  return { cart: state.cart, wishlist: state.wishlist, globalData: state.globalData, compCode: state.compCode, vType: state.vType };
}

export const ConnectedProductCard = connect(mapStateToProductsCard, {modalAction, wishlistAction, cartAction, toastAction})(ProductCard);


const HorizontalProductCard = ({ data }) => {
    return (
        <div className="row product-layout-list">
            <div className="col-lg-3 col-md-5 position-relative">
                <div className="product-image">
                    <Link to={`/productPage/${data.ItemId}`}>
                        <img src={data.ItemImageURL} alt="Li's Product" style={{maxHeight: '175px'}}/>
                    </Link>
                </div>
                <span className="sticker grid-view-sticker">{data.DiscountPer}%<br/>Off</span>
            </div>
            <div className="col-lg-5 col-md-7">
                <div className="product_desc pt-3">
                    <div className="product_desc_info">
                        <div className="product-review">
                            <h4><Link className="product_name" to={`/productPage/${data.ItemId}`}>{data.Description}</Link></h4>
                            <div className="rating-box">
                                <ul className="rating">
                                    <li><i className="fa fa-star-o"></i></li>
                                    <li><i className="fa fa-star-o"></i></li>
                                    <li><i className="fa fa-star-o"></i></li>
                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="price-box">
                                <span className="old-price">₹ {data.ItemMRP}</span>
                                <span className="new-price">&nbsp; ₹ {data.SRate}</span>
                        </div>
                        <p></p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="shop-add-action mb-xs-30">
                    <ul className="add-actions-link">
                        <li className="add-cart" onClick={() => {}}><button>Add to cart</button></li>
                        <li className="wishlist" onClick={() => {}}><button><i className="fa fa-heart-o"></i>Add to wishlist</button></li>
                        <li onClick={() => {quickviewItemAction(data.ItemId); modalAction('QUICKVIEW_MODAL', true)}}><button className="quick-view" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye"></i>Quick view</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const mapStateToHorizontalProductCard = (state) => {
  return {};
}

export const ConnectedHorizontalProductCard = connect(mapStateToHorizontalProductCard, {modalAction})(HorizontalProductCard);


const ReviewCard = ( {data: { id, name, img, stars, title, content, likes, unlikes, posted }, handleAction, userId } ) => {

    const isLiked = likes.filter(i => i === userId);
    const isUnliked = unlikes.filter(i => i === userId);
    return (
        <div className="review-card">
            <div className="review-image-box">
                <img className="img-fluid" src={`/assets/img/ePharma/${img}`} alt={img} />
            </div>
            <div className="review-content-box">
                <div className="title-box d-flex flex-column flex-md-row">
                    <h2>{name}</h2>
                    <div className="stars">
                        <i className='bx bxs-star'></i>
                        <i className={`bx bx${stars >= 2 ? 's' : ''}-star`}></i>
                        <i className={`bx bx${stars >= 3 ? 's' : ''}-star`}></i>
                        <i className={`bx bx${stars >= 4 ? 's' : ''}-star`}></i>
                        <i className={`bx bx${stars >= 5 ? 's' : ''}-star`}></i>
                    </div>
                </div>
                <h3>'{title}'</h3>
                <p>{content}</p>
                <div className="review-actions">
                    <span>{likes.length} <i className={`bx ${isLiked.length > 0 ? 'bxs-like' : 'bx-like'}`} onClick={() => handleAction('like', id, userId)}></i></span>
                    {/* <span>6 <i className='bx bxs-like'></i></span> */}
                    <span>{unlikes.length} <i className={`bx ${isUnliked.length > 0 ? 'bxs-dislike' : 'bx-dislike'}`} onClick={() => handleAction('dislike', id, userId)}></i></span>
                    {/* <span>6 <i className='bx bxs-dislike'></i></span> */}
                    <span className='posted-date'><i className='bx bx-time-five'></i> {posted}</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToReviewCard = (state) => {
    return {};
}
  
export const ConnectedReviewCard = connect(mapStateToReviewCard, {})(ReviewCard);

const SearchListCard = ({ cart, data, handleActive=() => {}, cartAction, wishlistAction, globalData, compCode, className='', vType, modalAction, type }) => {
    const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
    const existInCart = Object.values(cart.pharmacy).find(i => i.LocationItemId === data.LocationItemId);
    const isAdded = existInCart?.LocationItemId;
    const [activePackSize, setPackSize] = useState('');
    useEffect(() => {
		const packSizeList = data.ItemPackSizeList;
		if (packSizeList && packSizeList?.length) {
			const firstSizeId = packSizeList[0];
			setPackSize(firstSizeId);
		} else {
			setPackSize('');
		}
	},[data])

    const packSize = () => {      
        return computeWithPackSize(data, activePackSize, vType);
    }

    const handlePackSize = (i) => {
		if (i.CodeId === packSize().PackSizeId) return;
		setPackSize(i);
        if (isAdded) return cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy');
        wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
	}

    const packSizeList = data.ItemPackSizeList.map(i => <span className={i.CodeId === packSize().PackSizeId ? 'current' : ''} key={i.CodeId} onClick={() => handlePackSize(i)} role='button'>{i.Description}</span>);
    const handleAdd = () => {
        addToCart(globalDataAction, globalData, isAdded, data, cartAction, packSize, wishlistAction);
    }

    if (isRestaurant) {
        return (
            <div className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 !rounded-lg p-2.5 transition-all shadow-sm">
                <div className="flex items-center gap-2.5">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 !rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-300">
                        <span className="text-xl">🍽️</span>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1.5 mb-1">
                            <h4 className="font-bold text-xs text-gray-800 line-clamp-1">{data.Description}</h4>
                            <span className="flex-shrink-0 px-1.5 py-0.5 bg-orange-100 text-orange-700 text-[9px] font-bold rounded">{data.CategoryName}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm font-bold text-orange-600">₹{packSize().SRate}</span>
                            <span className="text-[10px] text-gray-400 line-through">₹{packSize().ItemMRP}</span>
                            <span className="px-1 py-0.5 bg-green-100 text-green-700 text-[8px] font-bold rounded">Save ₹10</span>
                        </div>

                        <p className="text-[10px] text-gray-500">
                            <span className="inline-flex items-center gap-0.5">
                            <span className="w-1 h-1 bg-green-500 !rounded-full"></span>
                                Available
                            </span>
                        </p>
                    </div>
                    <AddToCartBtn parent='card_6' useAuth={false} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} inCart={existInCart} isAdded={isAdded} />
                </div>
            </div>
        )
    }

    return (
        <div className={`card-1 ${className}`}>
            <div>
                <img src={data.ItemImageURL ? data.ItemImageURL : getFallbackImg()} alt=""/>
                <div>
                    <Link to={`/productPage/${data.ItemId}`} onClick={() => {handleActive(false)}} className={isRestaurant && 'pe-none'}>
                        <h5>{data.Description}</h5>
                        <h6>{data.CategoryName}</h6>
                        <p className='price'>₹{packSize().SRate} <span className="text-decoration-line-through">₹{packSize().ItemMRP}</span></p>
                    </Link>
                    {packSizeList.length ? <p className='packSize'>{packSizeList}</p> : ''}
                    {isRestaurant ? '' : 
                        (globalData.location.LocationId && !packSize().StockQty ? <p className='stock-label mt-0'><i className='bx bxs-message-x text-danger'></i> Out of Stock</p> : '')
                    }
                </div>
            </div>

            <div className='d-flex flex-column ms-auto'>
                {/* <div className='d-flex justify-content-between' style={{color: '#898989'}}>
                    <i className='bx bx-minus-circle' onClick={() => {if (addCount !== 1) setAddCount(addCount - 1)}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i>
                        <span className='text-dark'>{addCount}</span>
                    <i className='bx bx-plus-circle' onClick={() => setAddCount(addCount + 1)} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> 
                </div> */}
                {(() => {
                    if (compCode === TAKE_HOME_ID) {
                        return (
                            data.Category !== 24856 ? 
                            // <button onClick={handleAdd} className={`controlled-btn ms-auto ${packSize().StockQty ? '' : 'opacity-50 pe-none'}`} type="button">{isAdded === 1 ? 'Remove' : 'Add to cart'}</button> : 
                            <AddToCartBtn parent='search_list_card' useAuth={true} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} inCart={existInCart} isAdded={isAdded} /> : 
                            <button className="controlled-btn ms-auto" onClick={() => noticeToast({title: 'Over Counter Sales only..', msg: 'As Government Norms this Product is not to be sold Online - Contact with Service Provider for buying this product.'}, { position: "top-center", autoClose: 5000 })} type="button">Counter sale only</button>
                        )
                    } else {
                        return (
                            // <button onClick={handleAdd} className={`controlled-btn ms-auto ${packSize().StockQty ? '' : ''}`} type="button">{isAdded === 1 ? 'Remove' : 'Add to cart'}</button>
                            <AddToCartBtn parent='search_list_card' useAuth={false} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} inCart={existInCart} isAdded={isAdded} />
                        )
                    }
                })()}
            </div>
        </div>
    )
}

const mapStateToSearchListCard = (state) => {
    return { cart: state.cart, globalData: state.globalData, compCode: state.compCode, vType: state.vType };
}
  
export const ConnectedSearchListCard = connect(mapStateToSearchListCard, {cartAction, wishlistAction, modalAction})(SearchListCard);

const MyOrdersCard = ({ data, className, styles }) => {


    return (
        // <div className='mobile-cart-card p-0'>
        //     <div className='cart-content d-flex'>
        //         <div className='cart-image'>
        //             <Link to={`/productPage/${data.ItemId}`}>
        //                 <img src={data.ItemImageURL || getFallbackImg()} alt="cart-item" />
        //             </Link>
        //         </div>
        //         <div className='cart-item-details'>
        //         <h6>{data.Description}</h6>
        //         <p></p>
        //         <div className='d-flex flex-wrap'> 
        //             <div className='col-price'>Price</div>
        //             <div className='col-quantity'>Quantity</div>
        //             <div className='col-total'>Total</div>
        //             <div>₹ {(parseFloat(data.Rate) + parseFloat(data.CGST) + parseFloat(data.CGST) + parseFloat(data.IGST)).toFixed(2)}</div>
        //             <div>{data.BillQty}</div>
        //             <div>₹ {parseFloat(data.Amount).toFixed(2)}</div>
        //         </div>
        //         </div>
        //     </div>
        // </div>
        <div className={`card-1 return-card-1 cart-card-mobile ${className}`} styles={{...styles}}>
            <div>
                <img src={data.ItemImageURL || getFallbackImg()} style={{height: '5.6em', width: '5.6em'}} alt="" />
                <div>
                    <Link to={`/productPage/${data.ItemId}`} onClick={() => { }}>
                        <h5 className='mb-3'>{data.Description}</h5>
                        <p className="packSize"><span className="" role="button">{data.PackSizeId ? data.PackSizeDesc : 'No pack size'}</span></p>
                        <p className='price' style={{ color: '#2d82ff', marginBottom: '0.4em' }}>₹{(parseFloat(data.Amount/data.BillQty)).toFixed(2)} <span style={{ color: '#161616' }}>X {data.BillQty}</span></p>
                        <h6 style={{ fontWeight: 600, fontSize: '0.8em', marginBottom: '0.3em' }}>Total : &nbsp;&nbsp;₹ {parseFloat(data.Amount).toFixed(2)}</h6>
                    </Link>
                </div>
            </div>
            <button onClick={() => {}} className={`controlled-btn ms-auto rounded-circle ${data.StockQty ? '' : ''}`} type="button" style={{padding: '0.3em 0.4em'}}>
                <i className='bx bx-check' style={{fontSize: '1.7em', color: 'inherit', verticalAlign: 'sub'}}></i>
            </button>
        </div>
    )
}

const mapStateToMyOrdersCard = (state) => {
    return {};
}
  
export const ConnectedMyOrdersCard = connect(mapStateToMyOrdersCard, {modalAction})(MyOrdersCard);

export const ReturnProductCard_1 = ({ data, className, styles }) => {         // copiend from MyOrdersCard.
    return (
        <div className={`card-1 return-card-1 ${className}`} styles={{...styles}}>
            <div>
                <img src={data.ItemImageURL || getFallbackImg()} style={{height: '5.6em', width: '5.6em'}} alt="" />
                <div>
                    <Link to={`/productPage/${data.ItemId}`} onClick={() => { }}>
                        <h5 className='mb-3'>{data.Description}</h5>
                        <p className="packSize"><span className="" role="button">{data.PackSizeId ? data.PackSizeDesc : 'No pack size'}</span></p>
                        <p className='price' style={{ color: '#2d82ff', marginBottom: '0.4em' }}>₹{data.NetRateS} <span style={{ color: '#161616' }}>X {data.BillQty}</span></p>
                        <h6 style={{ fontWeight: 600, fontSize: '0.8em', marginBottom: '0.3em' }}>Total : &nbsp;&nbsp;₹ {data.Amount}</h6>
                    </Link>
                </div>
            </div>
            <button onClick={() => {}} className={`controlled-btn ms-auto rounded-circle ${data.StockQty ? '' : ''}`} type="button" style={{padding: '0.3em 0.4em'}}>
                <i className='bx bx-check' style={{fontSize: '1.7em', color: 'inherit', verticalAlign: 'sub'}}></i>  {/* REMOVE */}
            </button>
        </div>
    )
}

export const CategoryCard = ({ data, folder }) => {
    let imgPath = (data?.ParentDesc).replaceAll(' / ', '-');  
    
    return (
        <Link title={data.ParentDesc} to={`/filters/?head=${escape(data.ParentDesc).swap}&catVal=${data.Parent}&page=1`} className="cat-card">
            <img 
                className='img-fluid pe-none' 
                src={data.ImageURL || `/assets/img${folder}/${imgPath}.png`}   
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;               // prevents looping
                    currentTarget.src = getFallbackImg();
                }}
                alt="medicine"
             />
            <h4>{data.ParentDesc}</h4>
        </Link>
    )
}

export const BannersCard = ({ data }) => {

    return (
        <div className='banner w-100'>
            <div className='d-flex justify-content-between align-items-center w-100' style={{backgroundImage: 'url(/assets/img/ePharma/offers/bannersBg.svg)', '--bg': data.clr}}>
                <div className='d-flex justify-content-center flex-column'>
                    <h1>{data.name}</h1>
                    <h3>{data.tagline}</h3>
                    <div><button>{data.button}</button></div>
                </div>
                <img draggable={false} src={`/assets/img/ePharma/offers/${data.img}`} alt="" />
            </div>
        </div>
    )
}

export const BrandsCard = ({ data }) => {
    let imgSrc = data.Text.trim();
    return (
        <div className='brands'>
            <Link to={`/filters/?head=${escape(data.Text).swap}&brands=${data.Text}`}>
                <div className='img-box'>
                    <img className='img-fluid pe-none' src={`/assets/img/ePharma/brands-logo/${imgSrc}.png`}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;               // prevents looping
                            currentTarget.src = getFallbackImg();
                        }}
                    />
                </div>
                <span>{data.Text}</span>
            </Link>
        </div>
    )
}

export const AreaCard = ({ data, modalAction }) => {
    const handleSelectArea = () => {
        modalAction('LOCATION_MODAL', true, data.Area);
    }
    return (
        <div className="card-1 location-card" role='button' onClick={handleSelectArea}>
            <div style={{display: 'flex', gap: '0.4em'}}>
                <i className='bx bxs-map' style={{color: 'var(--clr-1)'}}></i>
                <div>
                    <h5 style={{color: 'var(--clr-1)'}}>{data.Area}</h5>
                    {/* <h6>{data.Address}</h6>
                    <p>{data.PIN}</p> */}
                </div>
            </div>
            {/* <button className="controlled-btn ms-auto" type="button" onClick={() => handleSelect(data)}>SELECT</button> */}
        </div>
    )
}

const mapStateToAreaCard = (state) => {
    return { cart: state.cart };
}
  
export const ConnectedAreaCard = connect(mapStateToAreaCard, {modalAction})(AreaCard);

// 1) Double brand items not solved.
// 2) Generic name related items in product page is done.
// 3) The login problem you sent the screenshot of which is some kind of glitch. the phone number field of the user is empty which seems impossible to me. I tried to reproduce that behavior in website and app but failed.
// 2) Order Status showing in my order status page is done.
// 3) Showing Invoices for completed orders is done.
// 4) Fixed the problem of not reflecting the latest work in the website and app. Awaiting confirmation from your side. 


export const WaiterCard = ({ data, handleSelect }) => {
    return (
        <div role='button' onClick={() => handleSelect(data)} key={data.PartyCode} style={{padding: '0.4em 0.9em', background: 'white', border: '1px solid #d9d9d9'}} to={`#`}>{data.Name}</div>
    )
}

export const CardType5m = ({ data, classes='', styles={}, handleActive=()=>{}, modalAction }) => {

    return (
        <div className={`card-type-5 shine hover-shine ${classes}`} style={styles} key={data.PROPID}>
            <div className="imageBox">
                <img 
                    className='img-fluid' 
                    src={`/assets/img/rentNsale/products/${data.pic1}`} 
                    onError={({ currentTarget }) => {
                    currentTarget.onerror = null;                                   // prevents looping
                    currentTarget.src = getFallbackImg();
                    }}
                    alt="Product Preview" 
                />
            <div className='tags-box'>
                <span style={{background: `var(--tw-${data.ptype_id === 'Sale' ? 'blue' : 'rose'}-500)`}}>{data.ptype_id}</span>
            </div>
            </div>
            <div className='product-text p-3 p-lg-4'>
                <h4>{data.name}</h4>
                <p>Price - {data.amount}</p>
                <div className="btn-group-1 d-flex gap-2 gap-lg-3 justify-content-between">
                    <Link className='d-block' to={`/productPage/${data.ItemId}`} onClick={() => {handleActive(false)}} style={{ background: "#c970ff", color: "white" }}>View Details</Link>
                    <button onClick={() => modalAction('SHOW_INTEREST_MODAL', true, {product: data})}>Show Interest</button>
                </div>
            </div>
        </div>
    )
}
  
export const CardType5 = connect(() => ({}), {modalAction})(CardType5m);

export const OrderSummaryCard = ({ data, tabActive }) => {
    return (
        <Link to={`/myOrders/${data.BillId}?pane=${tabActive}`} className="order-section px-[1em] py-[.9em]">
            <div className='card-title !pt-3 !pb-2'>
                <h5 className='mb-0'><i className='bx bx-gift'></i> <span className='ms-2 me-4'>ORDER ID: {data.VchNo}</span></h5>
            </div>
            <div className="row row-cols-1 order-details relative">
                <span className='float-right-corner p-0 text-gray-500 text-[1.7em] w-fit'>
                    <i class="fas fa-arrow-right"></i>
                </span>
                <div className="col">
                    <div>
                        <h6>Name: </h6>
                        <h6>{data.CashPartyName} ( <i className="bx bxs-phone-call" style={{ verticalAlign: "sub", fontSize: "1.2em", color: "rgb(227, 48, 65)", }} /> {data.CashPartyMobile} )</h6>
                    </div>
                </div>
                <div className="col">
                    <div>
                        <h6>Order Value: </h6>
                        <h6>₹ {parseFloat(data.Amount).toFixed(2)}</h6>
                    </div>
                </div>
                {tabActive === 'cancelled' ? '' : <div className="col">
                    <div className="align-items-start">
                        <h6>Order Status: </h6>
                        {data.OrderStatus ?
                            <span className='badge badge-pill d-flex align-items-center text-uppercase' style={{ background: data.ApprovalStatus === 'Y' ? '#00ad44' : '#009efb', fontSize: '0.8em' }}>{data.OrderStatus}</span>
                            :
                            <span className='badge badge-pill d-flex align-items-center' style={{ background: data.ApprovalStatus === 'Y' ? '#00ad44' : '#009efb', fontSize: '0.8em' }}>{data.ApprovalStatus === 'Y' ? 'PROCESSED' : 'ORDER PLACED'}</span>
                        }
                    </div>
                    <div className="my-2 align-items-start">
                        <h6 className="mb-0">Billing Status: </h6>
                        <span className='badge badge-pill d-flex align-items-center' style={{ background: data.BillStatus === 'PENDING' ? '#f29101' : '#00ad44', fontSize: '0.8em' }}>{data.BillStatus === 'CLOSED' ? 'DONE' : data.BillStatus}</span>
                    </div>
                </div>}
            </div>
        </Link>
    )
}