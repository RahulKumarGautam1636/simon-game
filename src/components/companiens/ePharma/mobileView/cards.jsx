import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { globalDataAction, wishlistAction, cartAction } from '../../../../actions';
import { connect } from 'react-redux';
import { addToCart, addToWishlist2, buyNow2, computeWithPackSize, getFallbackImg, ImageLoader, noticeToast, updateLocalStorageItems } from './../utilities';
import { ePharmaId, TAKE_HOME_ID } from '../../../../constants';
import { AddToCartBtn } from '../cards';


const ProductCardM = ({ data, cartAction, wishlistAction, cart, wishlist, globalData, globalDataAction, compCode, vType}) => {
  const existInCart = Object.values(cart.pharmacy).find(i => i.LocationItemId === data.LocationItemId);
  const isAdded = existInCart?.LocationItemId;
  const isAddedToWishlist = Object.values(wishlist.pharmacy).filter(i => i.LocationItemId === data.LocationItemId).length;
  const history = useHistory();
  const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');

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

  const handlePackSize = (i) => {
		if (i.CodeId === activePackSize.CodeId) return;
		setPackSize(i);
    if (isAdded) return cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy');
    if (isAddedToWishlist) wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
	}

  // const computeWithPackSize = () => {
	// 	if (!activePackSize) {
	// 		return { ItemMRP: data.ItemMRP, SRate: data.SRate };
	// 	} else {
	// 		if (activePackSize.MRP) {
	// 			return { ItemMRP: activePackSize.MRP, SRate: data.SRate };    // activePackSize.MRP
	// 		} else {
	// 			return { ItemMRP: data.ItemMRP, SRate: data.SRate };
	// 		}
	// 	}
	// }

  const packSize = () => {      
    return computeWithPackSize(data, activePackSize, vType);
  }
    
  const packSizeList = data.ItemPackSizeList?.map(i => <span className={i.CodeId === activePackSize.CodeId ? 'current' : ''} key={i.CodeId} onClick={() => handlePackSize(i)} role='button'>{i.Description}</span>);

// const handleAdd = () => {
//     if (!globalData.location.LocationId) return focusArea(globalDataAction);
//     if (isAdded) return cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy');
//     cartAction('ADD_ITEM', {...data, count: 1, PackSizeId: activePackSize.CodeId}, 'pharmacy'); 
//     wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
//     let productToastData = { msg: 'Added to Cart', product: {name: data.Description, price: data.SRate}, button: {text: 'Visit Cart', link: '/cartPage'} };
//     productToast(productToastData);
//     updateLocalStorageItems();
// }

// const buyNow = () => {
//     if (!globalData.location.LocationId) return focusArea(globalDataAction);
//     cartAction('DUMP_CART', {}, 'pharmacy');
//     cartAction('ADD_ITEM', {...data, count: 1, PackSizeId: activePackSize.CodeId}, 'pharmacy'); 
//     wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
//     updateLocalStorageItems();
//     history.push('/checkout');
// }

// const addToWishlist = () => {
//     if (!globalData.location.LocationId) return focusArea(globalDataAction);
//     if (isAddedToWishlist) return wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
//     wishlistAction('ADD_WISH_ITEM', {...data, count: 1, PackSizeId: activePackSize.CodeId}, 'pharmacy');
//     cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy');
//     let productToastData = { msg: 'Added to Wishlist', product: {name: data.Description, price: data.SRate}, button: {text: 'View Wishlist', link: '/wishlist'} };
//     productToast(productToastData); 
//     updateLocalStorageItems();
// }

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
    <div className='mobile-product-card'>
      <div className='content-container'>
        <div className='image-box position-relative'>
          <Link to={`/productPage/${data.ItemId}`}>
            <ImageLoader src={data.ItemImageURL ? data.ItemImageURL : getFallbackImg()} alt={data.Description} fSize={'0.8em'} />
          </Link>
        </div>
        <div className='content-box'>
            <h5>{data.Description}</h5>
            {globalData.location.LocationId ?
              <>
                <h6>₹ {packSize().SRate} <span>₹ {packSize().ItemMRP}</span></h6>
                {data.itemmstr === "Stock" ?
                  (packSize().StockQty ? <p className='stock-label' style={{margin: '0.1em 0 0', fontWeight: 'normal'}}><i className='bx bxs-message-check text-success' style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> Available in Stock</p> : <p className='stock-label' style={{margin: '0.1em 0 0', fontWeight: 'normal'}}><i className='bx bxs-message-x text-danger' style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> Out of Stock</p>)
                : ''}
                {vType === 'ErpPharma' && <p className='packSize' style={{margin: '0.5em 0 0', fontSize: '0.7em'}}>{packSizeList?.length ? packSizeList : <span className='current'>No Pack Size</span>}</p>}
              </>
            : ''}
        </div>
        {isRestaurant ? '' : <div className="mobile-price-tag">
          <span>{Math.trunc(packSize().DiscountPer)}%<br/>off</span>
          {data.Category !== 24856 && <div className='wish-icon' onClick={addToWishlist}><i className={`fa${isAddedToWishlist ? 's' : 'r'} fa-heart`}></i></div>}
        </div>}
      </div>
      {data.Category !== 24856 ? <div className={`d-flex`} style={{fontSize: '0.9em'}}> 
        {(() => {
          if (compCode === TAKE_HOME_ID || compCode === ePharmaId) {
            return (
              <AddToCartBtn parent='productCardM' useAuth={true} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} buyNow={buyNow} inCart={existInCart} isAdded={isAdded} />
            )
          } else {
            return (
              <AddToCartBtn parent='productCardM' useAuth={false} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} buyNow={buyNow} inCart={existInCart} isAdded={isAdded} />
            )
          }
        })()}
      </div> :
      <div className="d-flex">
        <button onClick={() => noticeToast({title: 'Over Counter Sales only..', msg: 'As Government Norms this Product is not to be sold Online - Contact with Service Provider for buying this product.'}, { position: "top-center", autoClose: 5000 })} type="button" className="controlled-btn">For sale over counter only</button>
      </div>}
    </div>
  )
}


const mapStateToProductsCard = (state) => {
  return { cart: state.cart, wishlist: state.wishlist, globalData: state.globalData, compCode: state.compCode, vType: state.vType };
}

export const ConnectedProductCardM = connect(mapStateToProductsCard, {cartAction, globalDataAction, wishlistAction})(ProductCardM);


const CartCardM = ({ data, cartAction, wishlistAction, className, styles, vType }) => {

  const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
  const activePackSize = data.ItemPackSizeList?.length ? data.ItemPackSizeList.find(i => i.CodeId === data.PackSizeId).Description : 'N/A';
  // const activeItem = data.ItemPackSizeList.find(i => i.CodeId === data.PackSizeId);
  // const activePackSize = activeItem ? activeItem.Description : 'N/A';
  return (
    <>
      {/* <div className='mobile-cart-card'>
        <div className='cart-content d-flex mb-2'>
          <div className='cart-image'>
            <Link to={`/productPage/${data.ItemId}`}>
              <img src={data.ItemImageURL} alt="cart-item" />
            </Link>
          </div>
          <div className='cart-item-details pt-2'>
            <Link to={`/productPage/${data.ItemId}`}>
              <h6 className='mb-0'>{data.Description}s</h6>
              <p style={{margin: '0.2em 0 0'}}>Pack size: <span className='text-dark'>{activePackSize}</span></p>
              {data.StockQty ? <p className='stock-label mt-0'><i className='bx bxs-message-check text-success'></i> Available in Stock</p> : <p className='stock-label mt-0'><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>}
            </Link>
          </div>
        </div>
        <div className="details-rows">
          <div className="details-row">
              <p>MRP</p>
              <p>₹ {data.ItemMRP}</p>
          </div>
          <div className="details-row">
              <p>Discount</p>
              <p>{data.DiscountPer} %</p>
          </div>
          <div className="details-row">
              <p>Quantity</p>
              <div style={{color: '#898989', fontSize: '1.1em'}}>
                  <i className='bx bx-plus-circle me-3' onClick={() => {cartAction('ADD_ITEM', {...data, count: parseInt(data.count + 1)}, 'pharmacy'); updateLocalStorageItems()}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> 
                    {data.count} 
                  <i className='bx bx-minus-circle ms-3' onClick={() => {if (data.count !== 1) cartAction('ADD_ITEM', {...data, count: parseInt(data.count - 1)}, 'pharmacy'); updateLocalStorageItems()}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i>
              </div>
          </div>
          <div className="details-row">
              <p>Total</p>
              <p>₹ {(data.count * data.SRate).toFixed(2)}</p>
          </div>
        </div>
        <div className='cart-buttons'>                                            
          <button type='button' style={{'--cClr': '#ff4d79', '--cBg': '#ff4d7929'}} onClick={() => {cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy'); wishlistAction('ADD_WISH_ITEM', data, 'pharmacy'); updateLocalStorageItems();}} className='button add-cart-button'><i className="bx bxs-heart"></i> Move to wishlist</button>
          <button type='button' style={{'--cClr': '#00a9bf', '--cBg': '#00bcd429'}} onClick={() => {cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy'); updateLocalStorageItems();}} className='button add-wishlist-button'><i className="bx bxs-trash-alt"></i> Remove from cart</button>
        </div>
      </div> */}

      <div className={`card-1 cart-card-1 ${className}`} style={{...styles}}>
        <div>
            <img src={data.ItemImageURL ? data.ItemImageURL : getFallbackImg()} alt="product"/>
            <div>
                <Link to={`/productPage/${data.ItemId}`}>
                    <h5>{data.Description}</h5>
                    {isRestaurant || <h6>{activePackSize}</h6>} 
                    <p className='price text-primary'>₹{data.ItemMRP} <span className="text-success opacity-100">{data.DiscountPer}% off</span></p>
                    <p className='stock-label my-0' style={{fontSize: '0.8em'}}>
                      {/* <i className='bx bx-money text-danger' style={{verticalAlign: 'text-top'}}></i>&nbsp; */}
                      Total: ₹ {(data.count * data.SRate).toFixed(2)}
                    </p>
                </Link>
                {/* {packSizeList.length ? <p className='packSize'>{packSizeList}</p> : ''} */}
                {/* {globalData.location.LocationId && !computeWithPackSize().StockQty ? <p className='stock-label mt-0'><i className='bx bxs-message-x text-danger'></i> Out of Stock</p> : ''} */}
                {/* <p className='stock-label mt-0'><i className='bx bxs-message-x text-danger'></i> ₹ {(data.count * data.SRate).toFixed(2)}</p> */}
            </div>
        </div>

        <div className='d-flex flex-column gap-4'>
            <div className='d-flex justify-content-between' style={{color: '#898989', gap: '0.8em'}}>
                <i className='bx bx-minus-circle' onClick={() => {if (data.count !== 1) cartAction('ADD_ITEM', {...data, count: parseInt(data.count - 1)}, 'pharmacy'); updateLocalStorageItems()}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i>
                    <span className='text-dark'>{data.count}</span>
                <i className='bx bx-plus-circle' onClick={() => {cartAction('ADD_ITEM', {...data, count: parseInt(data.count + 1)}, 'pharmacy'); updateLocalStorageItems()}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> 
            </div>
            <p className='d-flex gap-3 justify-content-between mt-0' style={{fontSize: '1.2em'}}>
              <i className={`bx bx-heart text-danger ${isRestaurant ? 'invisible' : ''}`} onClick={() => {cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy'); wishlistAction('ADD_WISH_ITEM', data, 'pharmacy'); updateLocalStorageItems();}}></i>
              <i className='bx bx-trash text-danger' onClick={() => {cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy'); updateLocalStorageItems();}}></i> 
            </p>
            {/* <button onClick={handleAdd} className={`controlled-btn ms-auto ${computeWithPackSize().StockQty ? '' : ''}`} type="button">{isAdded === 1 ? 'Remove' : 'Add to cart'}</button> */}
        </div>

        {/* {(() => {
            if (compCode === TAKE_HOME_ID) {
                return (
                    <>
                        {data.Category !== 24856 ? <button onClick={handleAdd} className={`controlled-btn ms-auto ${computeWithPackSize().StockQty ? '' : 'opacity-50 pe-none'}`} type="button">{isAdded === 1 ? 'Remove' : 'Add to cart'}</button> : 
                        <button  className="controlled-btn ms-auto" onClick={() => noticeToast({title: 'Over Counter Sales only..', msg: 'As Government Norms this Product is not to be sold Online - Contact with Service Provider for buying this product.'}, { position: "top-center", autoClose: 5000 })} type="button">Counter sale only</button>}
                    </>
                )
            } else {
                return (
                    <div className='d-flex flex-column gap-2'>
                        <div className='d-flex justify-content-between' style={{color: '#898989'}}>
                            <i className='bx bx-plus-circle' onClick={() => setAddCount(addCount + 1)} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> 
                                <span className='text-dark'>{addCount}</span>
                            <i className='bx bx-minus-circle' onClick={() => {if (addCount !== 1) setAddCount(addCount - 1)}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i>
                        </div>
                        <button onClick={handleAdd} className={`controlled-btn ms-auto ${computeWithPackSize().StockQty ? '' : ''}`} type="button">{isAdded === 1 ? 'Remove' : 'Add to cart'}</button>
                    </div>
                )
            }
        })()} */}
    </div>
  </>
  )
}

const mapStateToCartCard = (state) => {
  return { vType: state.vType };
}

export const ConnectedCartCardM = connect(mapStateToCartCard, {cartAction, wishlistAction})(CartCardM);


const WishlistCardM = ({ data, cartAction, wishlistAction }) => {
  return (
    <div className='mobile-cart-card'>
      <div className='cart-content d-flex mb-2'>
        <div className='cart-image'>
          <Link to={`/productPage/${data.ItemId}`}>
            <img src={data.ItemImageURL} alt="cart-item" />
          </Link>
        </div>
        <div className='cart-item-details'>
          <Link to={`/productPage/${data.ItemId}`}>
            <h6 className='mb-0'>{data.Description}</h6>
            {data.StockQty ? <p className='stock-label'><i className='bx bxs-message-check text-success'></i> Available in Stock</p> : <p className='stock-label'><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>}
          </Link>
          {/* <div className='d-flex flex-wrap'> 
             <div className='col-price'>Price</div>
             <div className='col-quantity'>Quantity</div>
             <div className='col-total'>Total</div>
             <div>₹ {data.SRate}</div>
             <div>{data.count}</div>
             <div>₹ {(data.count * data.SRate).toFixed(2)}</div>
          </div> */}
          </div>
        </div>
          <div className="details-rows">
            <div className="details-row">
                <p>MRP</p>
                <p>₹ {data.ItemMRP}</p>
            </div>
            <div className="details-row">
                <p>Discount</p>
                <p>{data.DiscountPer} %</p>
            </div>
            <div className="details-row">
                <p>Quantity</p>
                <div style={{color: '#898989'}}>
                    {/* <i className='bx bx-plus-circle me-3' onClick={() => {addToCartAction({...data, count: parseInt(data.count + 1)}); updateLocalStorageItems()}} style={{fontSize: '1.8rem', verticalAlign: 'middle'}}></i>  */}
                    <i className='bx bx-plus-circle me-3' onClick={() => {cartAction('ADD_ITEM', {...data, count: parseInt(data.count + 1)}, 'pharmacy'); updateLocalStorageItems()}} style={{fontSize: '1.8rem', verticalAlign: 'middle'}}></i> 
                      {data.count} 
                    {/* <i className='bx bx-minus-circle ms-3' onClick={() => {if (data.count !== 1) addToCartAction({...data, count: parseInt(data.count - 1)}); updateLocalStorageItems()}} style={{fontSize: '1.8rem', verticalAlign: 'middle'}}></i> */}
                    <i className='bx bx-minus-circle ms-3' onClick={() => {if (data.count !== 1) cartAction('ADD_ITEM', {...data, count: parseInt(data.count - 1)}, 'pharmacy'); updateLocalStorageItems()}} style={{fontSize: '1.8rem', verticalAlign: 'middle'}}></i>
                </div>
            </div>
            <div className="details-row">
                <p>Total</p>
                <p>₹ {(data.count * data.SRate).toFixed(2)}</p>
            </div>
      </div>
      <div className='cart-buttons'>
        <button type='button' style={{'--cClr': '#ff4d79', '--cBg': '#ff4d7929'}} onClick={() => {wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy'); updateLocalStorageItems();}} className='button add-cart-button'><i className="bx bxs-trash-alt"></i> Remove from wishlist</button>
        <button type='button' style={{'--cClr': '#00a9bf', '--cBg': '#00bcd429'}} onClick={() => {cartAction('ADD_ITEM', data, 'pharmacy'); wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy'); updateLocalStorageItems();}} className='button add-wishlist-button'><i className='bx bxs-cart-alt'></i> Move to cart</button>
      </div>                                 {/* no need to update cart item count because it will already have count property when it get added as wishlist items */}
    </div>
  )
}

const mapStateToWishlistCardM = (state) => {
  return {};
}

export const ConnectedWishlistCardM = connect(mapStateToWishlistCardM, {cartAction, wishlistAction})(WishlistCardM);

