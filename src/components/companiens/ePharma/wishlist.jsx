import React, { useEffect } from 'react';
// import { ConnectedLabTestCard, ConnectedPackageCard } from './cards';
// import SliderSection from './sliderSection';
// import { BreadCrumb } from './utilities';
import { breadCrumbAction, cartAction, wishlistAction } from '../../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ConnectedWishlistCardM } from './mobileView/cards';
import { getFallbackImg, stringToast, updateLocalStorageItems } from './utilities';


const Wishlist = ({ breadCrumbAction, wishlist, cartAction, wishlistAction, isMobile }) => {

  useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Wishlist', link: '/wishlist'}], activeLink: '/wishlist'});
  },[breadCrumbAction])  
  
  const wishlistListArray = Object.values(wishlist.pharmacy);                         // Convert cart object into list.
  const wishlistListLength = wishlistListArray.length;                       // Get number of items in cart.

  const renderWishlist = () => (
      <div className="table-content table-responsive">
          <table className="table">
              <thead>
                  <tr>
                      {/* <th className="li-product-thumbnail">images</th> */}
                      <th className="li-product-thumbnail cart-product-name" colSpan={2}>Product</th>
                      <th className="cart-product-name">Pack Size</th>
                      <th className="li-product-price">MRP</th>
                      {/* <th className="li-product-stock-status">Stock Status</th> */}
                      <th className="li-product-add-cart">add to cart</th>
                      <th className="li-product-remove">remove</th>
                  </tr>
              </thead>
              <tbody>
                  {wishlistListArray.map((item, index) => {
                    const activeItem = item.ItemPackSizeList.find(i => i.CodeId === item.PackSizeId);
                    const activePackSize = activeItem ? activeItem.Description : 'N/A';
                    return (
                        <tr key={index}>
                          <td className="li-product-thumbnail"><Link to={`/productPage/${item.ItemId}`}><img src={item.ItemImageURL || getFallbackImg()} alt={item.Description} style={{maxHeight: '5rem'}}/></Link></td>
                          <td className="li-product-name text-start ps-4">
                              <Link to="#">{item.Description}</Link>
                              {item.StockQty ? <p className='stock-label mt-0' style={{fontSize: '0.75em'}}><i className='bx bxs-message-check text-success'></i> Available in Stock</p> : <p className='stock-label mt-0' style={{fontSize: '0.75em'}}><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>}
                          </td>
                          <td className="li-product-name"><Link to="#">{activePackSize}</Link></td>
                          <td className="li-product-price text-end"><span className="amount">₹{item.ItemMRP}</span></td>
                          {/* <td className={`li-product-add-cart ${item.StockQty ? '' : 'opacity-50 pe-none'}`}><Link to="#" onClick={() => {addToCartAction({...item, count: 1}); removeFromWishlistAction(item.LocationItemId); updateLocalStorageItems(); stringToast("Successfully Moved to Cart.", 'warning');}}>add to cart</Link></td> */}
                          <td className={`li-product-add-cart ${item.StockQty ? '' : 'opacity-50 pe-none'}`}><Link to="#" onClick={() => {cartAction('ADD_ITEM', {...item, count: 1}, 'pharmacy'); wishlistAction('REMOVE_WISH_ITEM', item.LocationItemId, 'pharmacy'); updateLocalStorageItems(); stringToast("Successfully Moved to Cart.", 'warning');}}>add to cart</Link></td>
                          {/* <td className="li-product-remove"><Link to="#" onClick={() => {removeFromWishlistAction(item.LocationItemId); updateLocalStorageItems(); stringToast("Successfully Removed from Wishlist.", 'error');}}><i className="fa fa-trash text-danger"></i></Link></td> */}
                          <td className="li-product-remove"><Link to="#" onClick={() => {wishlistAction('REMOVE_WISH_ITEM', item.LocationItemId, 'pharmacy'); updateLocalStorageItems(); stringToast("Successfully Removed from Wishlist.", 'error');}}><i className="fa fa-trash text-danger"></i></Link></td>
                        </tr>
                    )
                  })}
                  {wishlistListLength === 0 && <tr><td colSpan={6} className="li-product-name text-danger">YOUR WISHLIST IS EMPTY<Link to='/' className='add_an_item_btn'>ADD AN ITEM</Link></td></tr>}
              </tbody>
          </table>
      </div>
  )

  const renderMobileWishlist = () => (
    <div>
        {wishlistListArray.map((item, index) => (
            <ConnectedWishlistCardM data={item} key={index}/>
        ))}
        {wishlistListLength === 0 &&
            <div className="card mb-4">
            <div className="card-header">
                <h5 className="mb-0">Wishlist</h5>
            </div>
            <div className="card-body cart">
                <div className="col-sm-12 empty-cart-cls text-center">
                    <img src="/assets/img/ePharma/emptyCart.png" className="img-fluid mb-4 me-4" alt="empty_cart"/>
                    <h5>Your Wishlist is Empty</h5>
                    <Link to='/' className='continue-button' style={{margin: '1rem 0 1.5rem'}}>Continue Shopping</Link>
                </div>
            </div>
        </div>}
    </div>
  )

  return (
    <>
      <div className="wishlist-area pb-xs-0 pb-60 pt-4">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form action="#">
                        { isMobile ? renderMobileWishlist() : renderWishlist() }
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-xs-10 mt-20 d-flex">
                    <Link to="/cartPage" className="continue-button ms-auto">Go to Shopping Cart</Link>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

const mapStateToWishlist = (state) => {
  return { wishlist: state.wishlist, isMobile: state.isMobile };
}

export default connect(mapStateToWishlist, {breadCrumbAction, cartAction, wishlistAction})(Wishlist);