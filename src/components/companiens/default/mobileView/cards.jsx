import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { addToCartAction, addToWishlistAction, toastAction, modalAction, quickviewItemAction, removeFromWishlistAction, removeFromCartAction, cartAction, wishlistAction, globalDataAction } from '../../../../actions';
import { connect } from 'react-redux';
import { focusArea, productToast, updateLocalStorageItems } from '../utilities';


const ProductCardM = ({ data, cartAction, wishlistAction, cart, wishlist, globalData, globalDataAction }) => {

  const isAddedToCart = Object.keys(cart).filter(i => i === data.LocationItemId ).length;          // Filter cart items to know if item is already added to cart or not.
  const history = useHistory();
  const isAddedToWishlist = Object.keys(wishlist).filter(i => i === data.LocationItemId ).length;

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

  const computeWithPackSize = () => {         
    if (!activePackSize) {
      return { ItemMRP: data.ItemMRP, SRate: data.SRate, StockQty: data.StockQty, DiscountPer: data.DiscountPer, PackSizeId: data.PackSizeId };
    } else {
      if (activePackSize.MRP) {
        return { ItemMRP: activePackSize.MRP, SRate: activePackSize.SRate, StockQty: activePackSize.StockQty, DiscountPer: activePackSize.MRPDisPer, PackSizeId: activePackSize.CodeId };  
      } else {
        return { ItemMRP: data.ItemMRP, SRate: data.SRate, StockQty: data.StockQty, DiscountPer: data.DiscountPer, PackSizeId: data.PackSizeId };
      }
    }
  }

  const handlePackSize = (i) => {
    if (i.CodeId === computeWithPackSize().PackSizeId) return;
    setPackSize(i);
  }
    
  const packSizeList = data.ItemPackSizeList?.map(i => <span className={i.CodeId === computeWithPackSize().PackSizeId ? 'current' : ''} key={i.CodeId} onClick={() => handlePackSize(i)} role='button'>{i.Description}</span>);
  const handleAdd = () => {
    if (!globalData.location.LocationId) return focusArea(globalDataAction);
    if (isAddedToCart) return cartAction('REMOVE_ITEM', data.LocationItemId);
    cartAction('ADD_ITEM', {...data, Qty: 1, ...computeWithPackSize()}); 
    let productToastData = { msg: 'Added to Cart', product: {name: data.Description, price: computeWithPackSize().SRate}, button: {text: 'Visit Cart', link: '/cartPage'} };
    productToast(productToastData);
    wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId);
    // updateLocalStorageItems();
  }

  const buyNow = () => {
    if (!globalData.location.LocationId) return focusArea(globalDataAction);
    cartAction('DUMP_CART', {});
    cartAction('ADD_ITEM', {...data, Qty: 1, ...computeWithPackSize()}); 
    wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId)
    // updateLocalStorageItems();
    history.push('/checkout');
  }

  const addToWishlist = () => {
    if (!globalData.location.LocationId) return focusArea(globalDataAction);
    if (isAddedToWishlist) return wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId);
    wishlistAction('ADD_WISH_ITEM', {...data, Qty: 1, ...computeWithPackSize()}); 
    cartAction('REMOVE_ITEM', data.LocationItemId); 
    let productToastData = { msg: 'Added to Wishlist', product: {name: data.Description, price: computeWithPackSize().SRate}, button: {text: 'View Wishlist', link: '/wishlist'} };
    productToast(productToastData); 
    // updateLocalStorageItems();
  }

  return (
    // <div className='mobile-product-card'>
    //     <div className='image-box'>
    //       <Link to={`/productPage/${data.ItemId}`}>
    //         <img src={data.ItemImageURL || '/assets/img/fallback/no-image.png'} alt={data.Description}/>
    //       </Link>
    //     </div>
    //     <div className='content-box'>
    //         <h5>{data.Description}</h5>
    //     </div>
    //     <span className='mobile-price-tag'>{Math.trunc(data.Discount)}%<br/>off</span>
    // </div>

    <div className='mobile-product-card'>
      <div className='content-container'>
        <div className='image-box'>
          <Link to={`/productPage/${data.ItemId}`}>
            <img src={data.ItemImageURL || '/assets/img/fallback/no-image.png'} alt={data.Description}/>
          </Link>
        </div>
        {/* <div className="wish-icon" onClick={addToWishlist}><i className={`fa${isAddedToWishlist ? 's' : 'r'} fa-heart`}></i></div>  */}
        <div className='content-box' style={{margin: '0.4em 0 0'}}>
            <h5>{data.Description}</h5>
            {globalData.location.LocationId ? <div className='price-box' style={{fontSize: '0.9em', margin: '4px 0'}}>
            <h4>₹ {computeWithPackSize().SRate}</h4>
            <h6>₹ {computeWithPackSize().ItemMRP}</h6>
            {/* <ul className="ratings d-flex justify-content-between mb-0 p-0 text-warning list-unstyled ms-auto" style={{"fontSize": "0.8em"}}>
              <li><i className="fas fa-star"></i></li>
              <li><i className="fas fa-star"></i></li>
              <li><i className="fas fa-star"></i></li>
              <li><i className="fas fa-star"></i></li>
              <li><i className="fas fa-star-half-alt"></i></li>
            </ul> */}
          </div> : ''}
            {globalData.location.LocationId ?
              <>
                {/* <h6>₹ {computeWithPackSize().SRate} <span>₹ {computeWithPackSize().ItemMRP}</span></h6> */}
                {data.StockQty ? <p className='stock-label' style={{margin: '0.2em 0px 0.5em', fontWeight: 'normal', fontSize: '0.75em'}}><i className='bx bxs-message-check text-success' style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> Available in Stock</p> : <p className='stock-label' style={{margin: '0.2em 0px 0.5em', fontWeight: 'normal', fontSize: '0.75em'}}><i className='bx bxs-message-x text-danger' style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> Out of Stock</p>}
                <p className='packSize' style={{margin: '0.5em 0px 0px 2px', fontSize: '0.7em'}}>{packSizeList?.length ? packSizeList : <span className='current'>No Pack Size</span>}</p>
              </>
            : ''}
        </div>
        {/* <button className="controlled-btn" onClick={() => {addToCartAction({...data, count: 1}); removeFromWishlistAction(data.LocationItemId); toastAction(true, data, 'Successfully added to Cart'); updateLocalStorageItems()}} type="button">{isAdded === 1 ? 'Added' : 'Add to Cart'}</button> */}
        <div className="mobile-price-tag">
          <span>{Math.trunc(data.Discount)}%<br/>off</span>
          <div className='wish-icon' onClick={addToWishlist}><i className={`fa${isAddedToWishlist ? 's' : 'r'} fa-heart`}></i></div>
        </div>
        <div className="cart-action mt-0" style={{padding: '0.4em 0px 0px'}}>
          <div className="btn-box">
            <button className={`btn btn-main btn-round-full ${!globalData.location.LocationId || computeWithPackSize().StockQty ? '' : 'opacity-50 pe-none'}`} onClick={handleAdd}>{isAddedToCart ? 'ADDED TO CART' : 'ADD TO CART'}</button>
            <button className={`btn btn-main btn-round-full add-wishlist-btn ${!globalData.location.LocationId || computeWithPackSize().StockQty ? '' : 'opacity-50 pe-none'}`} onClick={buyNow}>BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProductsCard = (state) => {
  return {cart: state.cart, wishlist: state.wishlist, globalData: state.globalData};
}

export const ConnectedProductCardM = connect(mapStateToProductsCard, {cartAction, wishlistAction, globalDataAction})(ProductCardM);


const CartCardM = ({ data, removeFromCartAction, addToWishlistAction, addToCartAction }) => {
  return (
    <div className='mobile-cart-card'>
      <div className='cart-content d-flex'>
        <div className='cart-image'>
          <Link to={`/productPage/${data.ItemId}`}>
            <img src={data.ItemImageURL || '/assets/img/fallback/no-image.png'} alt="cart-item" />
          </Link>
        </div>
        <div className='cart-item-details'>
          <Link to={`/productPage/${data.ItemId}`}>
            <h6>{data.Description}</h6>
          </Link>
          <div className='d-flex flex-wrap'> 
             <div className='col-price'>Price</div>
             <div className='col-quantity'>Quantity</div>
             <div className='col-total'>Total</div>
             <div>₹ {data.SRate}</div>
             <div>
                <i className='bx bx-minus-circle ms-3' onClick={() => {if (data.count !== 1) addToCartAction({...data, count: parseInt(data.count - 1)}); updateLocalStorageItems()}} style={{fontSize: '1.8rem', verticalAlign: 'middle'}}></i>
                  {data.count} 
                <i className='bx bx-plus-circle me-3' onClick={() => {addToCartAction({...data, count: parseInt(data.count + 1)}); updateLocalStorageItems()}} style={{fontSize: '1.8rem', verticalAlign: 'middle'}}></i> 
             </div>
             <div>₹ {(data.count * data.SRate).toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div className='cart-buttons'>                                             {/* no need to update cart item count because it will already have count property when it get added as cart items */}
        <button type='button' onClick={() => {removeFromCartAction(data.LocationItemId); addToWishlistAction(data); updateLocalStorageItems();}} className='button add-cart-button'><i className="bx bxs-heart"></i> Move to wishlist</button>
        <button type='button' onClick={() => {removeFromCartAction(data.LocationItemId); updateLocalStorageItems();}} className='button add-wishlist-button'><i className="bx bxs-trash-alt"></i> Remove from cart</button>
      </div>
    </div>
  )
}

const mapStateToCartCard = (state) => {
  return {};
}

export const ConnectedCartCardM = connect(mapStateToCartCard, {addToWishlistAction, toastAction, removeFromCartAction, addToCartAction})(CartCardM);


const WishlistCardM = ({ data, removeFromWishlistAction, addToCartAction }) => {
  return (
    <div className='mobile-cart-card'>
      <div className='cart-content d-flex'>
        <div className='cart-image'>
          <Link to={`/productPage/${data.ItemId}`}>
            <img src={data.ItemImageURL || '/assets/img/fallback/no-image.png'} alt="cart-item" />
          </Link>
        </div>
        <div className='cart-item-details'>
          <Link to={`/productPage/${data.ItemId}`}>
            <h6>{data.Description}</h6>
          </Link>
          <div className='d-flex flex-wrap'> 
             <div className='col-price'>Price</div>
             <div className='col-quantity'>Quantity</div>
             <div className='col-total'>Total</div>
             <div>₹ {data.SRate}</div>
             <div>{data.count}</div>
             <div>₹ {(data.count * data.SRate).toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div className='cart-buttons'>
        <button type='button' onClick={() => {removeFromWishlistAction(data.LocationItemId); updateLocalStorageItems();}} className='button add-cart-button'><i className="bx bxs-trash-alt"></i> Remove from wishlist</button>
        <button type='button' onClick={() => {addToCartAction(data); removeFromWishlistAction(data.LocationItemId); updateLocalStorageItems();}} className='button add-wishlist-button'><i className='bx bxs-cart-alt'></i> Move to cart</button>
      </div>                                 {/* no need to update cart item count because it will already have count property when it get added as wishlist items */}
    </div>
  )
}

const mapStateToWishlistCardM = (state) => {
  return {};
}

export const ConnectedWishlistCardM = connect(mapStateToWishlistCardM, {addToCartAction, toastAction, removeFromWishlistAction})(WishlistCardM);

