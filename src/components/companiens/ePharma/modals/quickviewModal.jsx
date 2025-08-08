import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { modalAction, cartAction, toastAction, wishlistAction } from "../../../../actions";
import { getFallbackImg, getFrom, Spinner, updateLocalStorageItems } from "../utilities";
import { BASE_URL } from "../../../../constants";

const QuickViewModal = ({ quickviewItem, compCode, cart, wishlist, modalAction, globalData, cartAction, wishlistAction, modals }) => {

    const [sliderImageList, setSliderImageList] = useState({loading: true, data: {ImageMasterCollection: [], ItemMaster: {}}, err: {status: false, msg: ''}});           // ItemMaster contains the full Detail of the item.
    const [counter, setCounter] = useState(1);
    const isAddedToCart = Object.values(cart.pharmacy).filter(i => i.LocationItemId === sliderImageList.data.ItemMaster.LocationItemId).length;
    const isAddedToWishlist = Object.values(wishlist.pharmacy).filter(i => i.LocationItemId === sliderImageList.data.ItemMaster.LocationItemId).length;    
    const [activePackSize, setPackSize] = useState('');

    useEffect(() => {
		window.render_QuickviewSlider();
		window.renderVenoBox();
		// return () => {
		// 	window.remove_QuickviewSlider();               // Quickview is a modal and it's slider gets destroyed when user closes the modal (when component unmounts)
		// }                                               // hence Don't need to clear previously rendered slider because mannually.
	},[sliderImageList])

    const getProductsList = useCallback(async () => {
        const res = await getFrom(`${BASE_URL}/api/Pharma/GetProductDetails?CID=${compCode}&PID=${modals.QUICKVIEW_MODAL.data.id}&LOCID=${globalData.location.LocationId}`, {}, setSliderImageList);            // using useCallback to avoid esling warning about unwanted multiple rerendering.
        if (res) {
            // setTimeout(() => {
                setSliderImageList(res); 
            // },[2000])     
        }
    },[compCode, modals.QUICKVIEW_MODAL.data.id])

    useEffect(() => {
        getProductsList();
    },[getProductsList])


    const handleDummyFunction = () => false;

    const renderVenoboxSlider = (data) => {
        if (data.loading) {
            return <Spinner min_height='36rem' fSize='2.5rem'/>;
        } else if (data.err.status) {
            return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
        } else if (data.data.ImageMasterCollection.length === 0) {
            return <img id="myimage_0" className="myimage" src={getFallbackImg()} alt="product" height="320" width="auto"/>;
        } else {
            return (   
                <>                                                                                                                                                                        
                    <div className="product-details-images slider-navigation-1 quickview-lg-slider" style={{maxHeight: '321px', overflow: 'hidden'}}>  								  
                        {											              
                            data.data.ImageMasterCollection.map((item, index) => { 		             // When looping on each slider image, slick slider adds a div to parent div, during rerendering react recognizes it as non-child hence instead removing,
                                return (										                     // it throws non-child removal error (attempt to remove child that is not child of the parent). hence we'll replace the whole parent div to overcome this issue.
                                    <div className="lg-image img-zoom-container" key={index}>
                                        <a className="popup-img venobox vbox-item" href={item.ImgURL} data-gall="myGallery">
                                            <img id="myimage_0" className="myimage" src={item.ImgURL} alt="product" height="320" width="auto"/>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                    <div className="product-details-thumbs slider-thumbs-1 quickview-sm-slider" style={{paddingTop:'3rem', maxHeight: '100px', overflow: 'hidden'}}>  								 
                        {											              
                            data.data.ImageMasterCollection.map((item, index) => {                    // When looping on each slider image, slick slider adds a div to parent div, during rerendering react recognizes it as non-child hence instead removing,
                                return (										                      // it throws non-child removal error (attempt to remove child that is not child of the parent). hence we'll replace the whole parent div to overcome this issue.
                                    <div key={index} className="sm-image" style={{marginRight: '10px', maxHeight: '100px', width: 'auto'}}><img src={item.ImgURL} style={{maxHeight: '60px', width: 'auto'}} alt="product thumb"/></div>
                                )
                            })
                        }
                    </div>
                </>
            )
        }
    }

    useEffect(() => {
		const packSizeList = sliderImageList.data.ItemMaster?.ItemPackSizeList;
		if (packSizeList && packSizeList?.length) {
			const firstSizeId = packSizeList[0];
			setPackSize(firstSizeId);
		} else {
			setPackSize('');
		}
	},[sliderImageList.data.ItemMaster])

    const handlePackSize = (i) => {
		if (i.CodeId === activePackSize.CodeId) return;
		setPackSize(i);
	}

    const computeWithPackSize = () => {
		if (!activePackSize) {
			return { ItemMRP: sliderImageList.data.ItemMaster?.ItemMRP, SRate: sliderImageList.data.ItemMaster?.SRate };
		} else {
			if (activePackSize.MRP) {
				return { ItemMRP: activePackSize.MRP, SRate: activePackSize.SRate };     
			} else {
				return { ItemMRP: sliderImageList.data.ItemMaster?.ItemMRP, SRate: sliderImageList.data.ItemMaster?.SRate };
			}
		}
	}

    const handleAdd = () => {
        if (!sliderImageList.data.ItemMaster.Description) return;
        if (isAddedToCart) return cartAction('REMOVE_ITEM', sliderImageList.data.ItemMaster.LocationItemId, 'pharmacy');
        cartAction('ADD_ITEM', {...sliderImageList.data.ItemMaster , count: counter, PackSizeId: activePackSize ? activePackSize.CodeId : '0'}, 'pharmacy');
        wishlistAction('REMOVE_WISH_ITEM', sliderImageList.data.ItemMaster.LocationItemId, 'pharmacy');
        updateLocalStorageItems()
    }
                                                                                                                                                      
    return (                                                                            
        <>                                                                                   
            <div className="modal-inner-area row p-3 p-lg-4 bg-white">
                <i className='bx bx-x-circle close-custom-modal' onClick={() => modalAction('QUICKVIEW_MODAL', false)}></i>
                <div className="col-lg-5 col-md-6 col-sm-6 pt-20 position-relative">
                    <div className="product-details-left">
                        {renderVenoboxSlider(sliderImageList)}
                    </div>
                </div>

                <div className="col-lg-7 col-md-6 col-sm-6">
                    <div className="product-details-view-content pt-35">
                        <div className="product-info">
                            <h2>{sliderImageList.data.ItemMaster?.Description}</h2>
                            
                            {/* <div className="rating-box pt-10">
                                <ul className="rating rating-with-review-item">
                                    <li><i className="fa fa-star-o"></i></li>
                                    <li><i className="fa fa-star-o"></i></li>
                                    <li><i className="fa fa-star-o"></i></li>
                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                    <li className="review-item"><Link to="/">Read Review</Link></li>
                                    <li className="review-item"><Link to="/">Write Review</Link></li>
                                </ul>
                            </div> */}
                            <div className="price-box pt-10">
                                <span className="old-price">₹ {computeWithPackSize().ItemMRP}</span>
                                <span className="new-price"> ₹ {computeWithPackSize().SRate}</span>
                                <span className="discount-percentage" style={{paddingLeft: '15px', color: 'green'}}>{sliderImageList.data.ItemMaster?.DiscountPer}% OFF</span>
                            </div>
                            <div className="product-desc">
                                <p>
                                    <span>
                                        {sliderImageList.data.ItemMaster?.ShortDesc}
                                    </span>
                                </p>
                            </div>
                            {sliderImageList.data.ItemMaster?.ItemPackSizeList?.length ? <div className="product-variants pack-sizes-box pb-20 pb-xs-10" style={{borderBottom: '1px solid #e1e1e1'}}>
                                <div className="produt-variants-size">
                                    <label>Pack size: </label>
                                    <div className='pack-sizes'>
                                        {sliderImageList.data.ItemMaster?.ItemPackSizeList?.map((i, n) => (
                                            <div key={i.CodeId} className={i.CodeId === activePackSize.CodeId ? 'active' : ''} onClick={() => handlePackSize(i)}>
                                                <h5>{i.Description}</h5>
                                                <div className='d-flex gap-2'>
                                                    <p className="old-price">₹ {i.MRP ? i.MRP : sliderImageList.data.ItemMaster?.ItemMRP}</p>
                                                    <p>₹ {i.SRate ? i.SRate : sliderImageList.data.ItemMaster?.SRate}</p>															
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div> : ''}
                            <div className="single-add-to-cart">
                                <form action="#" className="cart-quantity d-flex align-items-end gap-3 flex-wrap">
                                    <div className="quantity d-flex gap-3">
                                        <label>Quantity:</label>
                                        <div className="cart-plus-minus">
                                            <input onChange={handleDummyFunction} className="cart-plus-minus-box" value={counter} type="text"/>
                                            <div onClick={() => {if (counter !== 1) setCounter(counter-1)}} className="dec qtybutton"><i className="fa fa-angle-down"></i></div>
                                            <div onClick={() => setCounter(counter+1)} className="inc qtybutton"><i className="fa fa-angle-up"></i></div>
                                        </div>
                                    </div>
                                    <button className="add-to-cart" type="button" onClick={handleAdd} to="">{isAddedToCart === 1 ? 'Remove from cart' : 'Add to cart'}</button>
                                </form>                                                                        {/*	three dot's means we taking all properties from sliderImageList object and place them in this new object along with new count property */}
                            </div>
                            <div className="product-additional-info pt-15">
                                <div className="d-flex flex-wrap gap-5">
                                    <h6 className="wishlist-btn" to="#" onClick={() => {cartAction('REMOVE_ITEM', sliderImageList.data.ItemMaster.LocationItemId, 'pharmacy'); wishlistAction('ADD_WISH_ITEM', {...sliderImageList.data.ItemMaster, count: counter}, 'pharmacy'); updateLocalStorageItems()}}><i className={`fa${isAddedToWishlist ? 's' : 'r'} fa-heart`}></i>{isAddedToWishlist === 1 ? 'Added' : 'Add'} to wishlist</h6>
                                    <Link to={`/cartPage`} onClick={() => modalAction('QUICKVIEW_MODAL', false)}><h6 className="wishlist-btn text-primary"><i className='bx bxs-cart'></i>Visit Cart</h6></Link>
                                </div>
                                <div className="product-social-sharing pt-20">
                                    <ul>
                                        <li className="facebook"><Link to="/"><i className="fa fa-facebook"></i>Facebook</Link></li>
                                        <li className="twitter"><Link to="/"><i className="fa fa-twitter"></i>Twitter</Link></li>
                                        <li className="google-plus"><Link to="/"><i className="fa fa-google-plus"></i>Google +</Link></li>
                                        <li className="instagram"><Link to="/"><i className="fa fa-instagram"></i>Instagram</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToPropsTwo = (state) => {
  return { quickviewItem: state.quickviewItem, compCode: state.compCode, cart: state.cart, wishlist: state.wishlist, globalData: state.globalData };
}

export default connect(mapStateToPropsTwo, {toastAction, modalAction, cartAction, wishlistAction})(QuickViewModal);
