import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addToCartAction, cartAction, wishlistAction, addToWishlistAction, breadCrumbAction, removeFromCartAction, modalAction } from '../../../actions';
// import { useHistory } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';
// import Alert from 'react-bootstrap/Alert';
// import { ModalComponent, handleNumberInputs } from './utilities';
import { Link } from 'react-router-dom';
import { ConnectedCartCardM } from './mobileView/cards';
import { AutoComplete, getFallbackImg, getFrom, getRequiredFieldsOnly, stringToast, updateLocalStorageItems } from './utilities';
import { ConnectedSearchListCard } from './cards';
import { useCallback } from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../../constants';
import { num } from '../default/utilities';


const CartPage = ({ breadCrumbAction, cartAction, modalAction, wishlistAction, cart, isMobile, globalData, compCode, userInfo, isLoggedIn, vType }) => {

  const [searchTerm, setSearchTerm] = useState({query: '', filterTerm: 'All', filterId: 0});    
//   const [autoCompleteList, setAutoCompleteList] = useState({loading: false, data: {itemMasterCollection: []}, err: {status: false, msg: ''}});         
  const [searchList, setSearchList] = useState({loading: false, data: {itemMasterCollection: []}, err: {status: false, msg: ''}});
  const [searchResultsActive, setSearchResultsActive] = useState(false);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchTerm(preValue => {
        return {...preValue, [name]: value};
    })
  }

  const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
  
//   const handleSearchForm = (e) => {
//     e.preventDefault();                                                             // Since searchFunction is already being continuously called using useEffect on line 158 hence we don't need to 
//     history.push(`/productPage/${searchList[activeListItem].ItemId}`);              // call it when form is submitted. We just redirect the user to productPage with current active search item's id.
//     setSearchList([]);
//   }

  const searchItem = useCallback((query, data) => {
    let found = data.filter(i => i.Description.toLowerCase().includes(query.toLowerCase()));
    return found;
  }, []);

//   const searchFunction = useCallback(() => {
//     let filteredByItemId = searchTerm.filterId === 0 ? siteData.itemMasterCollection : siteData.itemMasterCollection.filter(i => i.SubCategoryId === searchTerm.filterId);
//     const searchTerms = searchTerm.query.split(' ').filter(i => i !== '');              // Remove spaces from list to prevent searching blank spaces in item name.
//     var foundItems = [];                                                                // otherwise will use [''] to search and will return all items with that have blank spaces in their names.
//     searchTerms.forEach(query => {
//       var searchResults = searchItem(query, filteredByItemId);
//       foundItems = foundItems.concat(searchResults);
//     })
//     var uniqueItems = [...new Map(foundItems.map(item => [item['LocationItemId'], item])).values()];
//     setSearchList(uniqueItems);
//   },[searchTerm, siteData, searchItem])

//   useEffect(() => {
//     searchFunction();                                            
//   },[searchTerm, searchFunction])

   useEffect(() => {
    const getSearchResult = async (companyCode, key) => {                      
      if (!companyCode) return alert('no companyCode received');                  
      const res = await getFrom(`${BASE_URL}/api/item/Get?CID=${companyCode}&SearchStr=${key.query}&LOCID=${globalData.location.LocationId}`, {}, setSearchList);
      if (res) {  
        let requiredFields = getRequiredFieldsOnly(res.data.itemMasterCollection, globalData.location.LocationId);                                                                  
        setSearchList(pre => ({ ...pre, loading: false, data: {itemMasterCollection: requiredFields }}));
      } else {
        console.log('No data received');
      }
    }  
    const timer = setTimeout(() => {
      if (searchTerm.query.length < 1) return;
      getSearchResult(compCode, searchTerm);  
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, compCode, globalData.location.LocationId])

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Cart', link: '/cartPage'}], activeLink: '/cartPage'});
	},[breadCrumbAction])

//   const dummyFunction = () => false;
  const cartArray = Object.values(cart.pharmacy);                         
  const cartArrayLength = cartArray.length;                  

  const cartItemsValueList = cartArray.map(item => item.count * item.SRate);                    
  const cartSubtotal = cartItemsValueList.reduce((total, num) => total + num, 0).toFixed(2);           

  const cartItemsMRPList = cartArray.map(item => item.count * item.ItemMRP);                    
  const grossTotal = cartItemsMRPList.reduce((total, num) => total + num, 0).toFixed(2);  
  
  const cartItemsDiscountList = cartArray.map(item => ((item.ItemMRP * item.DiscountPer) / 100) * item.count);                  
  const discountTotal = cartItemsDiscountList.reduce((total, num) => total + num, 0).toFixed(2);  

//   const cartItemsGSTValueList = cartArray.map(i => {
//       let taxbleAmt = num((i.count * i.SRate)- ((i.count * i.SRate) * (i.DiscountPer / 100 )));
//       let cgst = num(taxbleAmt * (i.CGSTRATE / 100));
//       let sgst = num(taxbleAmt * (i.SGSTRATE / 100));
//       return num(sgst + cgst);
//   });                   
//   const gstTotal = num(cartItemsGSTValueList.reduce((total, num) => total + num, 0));    

  const renderCart = () => (
    <div className="table-content">
        <table className="table">
            <thead>
                <tr>
                    {/* <th className="li-product-thumbnail">images</th> */}
                    <th className="li-product-thumbnail cart-product-name" colSpan={2}>Product</th>
                    {isRestaurant || <th className="cart-product-name">Pack Size</th>}
                    <th className="li-product-price">{isRestaurant ? 'Rate' : 'MRP'}</th>
                    {isRestaurant || <th className="li-product-price">Discount</th>}
                    <th className="li-product-quantity">Quantity</th>
                    <th className="li-product-subtotal">Total</th>
                    <th className="li-product-remove">action</th>
                </tr>
            </thead>
            <tbody>
                {cartArray.map(item => {
                    const activeItem = item.ItemPackSizeList.find(i => i.CodeId === item.PackSizeId);
                    const activePackSize = activeItem ? activeItem.Description : 'N/A';
                    return (
                        <tr key={item.LocationItemId}>
                            <td className="li-product-thumbnail"><Link to={`/productPage/${item.ItemId}`}><img src={item.ItemImageURL || getFallbackImg()} alt={item.Description} style={{maxHeight: '5rem'}}/></Link></td>
                            <td className="li-product-name text-start ps-4">
                                <Link to={`/productPage/${item.ItemId}`}>{item.Description}</Link>
                                {isRestaurant ? '' : (item.StockQty ? <p className='stock-label mt-0' style={{fontSize: '0.75em'}}><i className='bx bxs-message-check text-success'></i> Available in Stock</p> : <p className='stock-label mt-0' style={{fontSize: '0.75em'}}><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>)}
                            </td>
                            {isRestaurant || <td className="li-product-name"><Link to="#">{activePackSize}</Link></td>}
                            <td className="li-product-price text-end"><span className="amount">₹{isRestaurant ? item.SRate : item.ItemMRP}</span></td>
                            {isRestaurant || <td className="li-product-name text-end"><Link to="#">{item.DiscountPer}%</Link></td>}
                            <td className="quantity">
                                <div className="cart-plus-minus">                                                                                                 
                                    <input className="cart-plus-minus-box" onChange={(e) => {if (e.target.value !== '0' && e.target.value !== '') cartAction('ADD_ITEM', {...item, count: parseInt(e.target.value)}, 'pharmacy'); updateLocalStorageItems()}} value={item.count} type="text"/>
                                    <div onClick={() => {if (item.count !== 1) cartAction('ADD_ITEM', {...item, count: item.count-1}, 'pharmacy')}} className="dec qtybutton"><i className="fa fa-angle-down"></i></div>
                                    <div onClick={() => cartAction('ADD_ITEM', {...item, count: item.count+1}, 'pharmacy')} className="inc qtybutton"><i className="fa fa-angle-up"></i></div>
                                </div>
                            </td>                                                               
                            <td className="product-subtotal text-end"><span className="amount">₹{(item.count * item.SRate).toFixed(2)}</span></td>  
                            <td className="li-product-remove">
                                <i onClick={() => {cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy'); updateLocalStorageItems(); stringToast("Successfully Removed from Cart.", 'error');}} className="fas fa-trash-alt text-danger me-3"></i> &nbsp;
                                {isRestaurant || <i onClick={() => {cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy'); wishlistAction('ADD_WISH_ITEM', {...item, count: item.count}, 'pharmacy'); updateLocalStorageItems(); stringToast("Successfully Moved to wishlist.", 'warning')}} className="fas fa-heart text-success" title='Add to Wishlist'></i>}
                            </td>    
                        </tr> 
                    )
                })}
                <tr>
                    <td colSpan={8} style={{background: 'var(--clr-1)', padding: '2px'}}></td>
                </tr>
                {cartArrayLength === 0 && <tr><td colSpan={8} className="li-product-name text-danger"><i className='bx bxs-cart-alt h1 align-middle me-2'></i> YOUR CART IS EMPTY<Link to='/' className='add_an_item_btn'>ADD AN ITEM</Link></td></tr>}
            </tbody>
        </table>    
        {/* <div className="products-chart">
            <ul className="list-inline mb-0">
                {cartArray.map(i => <li><ConnectedSearchListCard data={i} cart={cart} setSearchResultsActive={() => {}} /></li>)}
            </ul>
        </div> */}
    </div>
  )

  const renderMobileCart = () => (
    <div>
        <div style={{fontSize: '1.25em'}}>
            {cartArray.map(item => (
                <ConnectedCartCardM className={'mb-3'} data={item} key={item.LocationItemId} styles={{border: '1px solid #efefef'}}/>
                // <ConnectedSearchListCard className={'mb-3'} data={item} key={item.LocationItemId} />
            ))}
        </div>
        {cartArrayLength === 0 &&
            <div className="card mb-4">
            <div className="card-header">
                <h5 className="mb-0">Cart</h5>
            </div>
            <div className="card-body cart">
                <div className="col-sm-12 empty-cart-cls text-center">
                    <img src="/assets/img/ePharma/emptyCart.png" className="img-fluid mb-4 me-4" alt="empty_cart"/>
                    <h5>Your Cart is Empty</h5>
                    <Link to='/' className='continue-button' style={{margin: '1rem 0 1.5rem'}}>Continue Shopping</Link>
                    <br/>
                    <Link to='/wishlist' className='continue-button' style={{margin: '1rem 0 1.5rem'}}>Go to Wishlist</Link>
                </div>
            </div>
        </div>}
    </div>
  )

  let table = globalData.restaurant.table;
  const selectMember = () => {
    if (!isLoggedIn) return modalAction('LOGIN_MODAL', true);
    modalAction('MEMBER_SELECT_MODAL', true);
  }
  
  return (
    <div id="cartPage" className='epharma-global'>
      <div className="Shopping-cart-area pb-xs-0 pb-60 pt-4">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form>
                        {isRestaurant ? 
                        <div className='d-flex align-items-center justify-content-end pb-3' style={{gap: 'clamp(1em, 2.7vw, 2.5em)', fontSize: 'clamp(0.9em, 2.7vw, 1em)', flex: 1}}>   
                            <h5 className="mb-0 d-flex align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em', color: '#005ee9'}} onClick={() => modalAction('TABLE_SELECTION_MODAL', true)} role='button'><i className='bx bxs-grid-alt'></i> {table ? <>{table?.BedDesc}, &nbsp; {table?.BedGroupDesc}</> : 'Select Table'} <i style={{fontSize: '2rem', color: '#f17e1d'}} className='bx bx-caret-down'></i></h5>
                            <h5 className="mb-0 align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em', color: '#ef008d', display: isLoggedIn ? 'flex' : 'none'}}><i className='bx bxs-user'></i> {userInfo.selectedMember.MemberName}</h5>
                            <span onClick={selectMember} className='continue-button d-inline' style={{background: '#1f8dc9', padding: '0 7px', lineHeight: '2.3', borderRadius: '6px'}} role='button'>Select Entity</span>
                        </div> : ''}

                        {/* {isRestaurant ? 
                        <div className='d-flex align-items-center justify-content-end pb-3 flex-wrap' style={{gap: 'clamp(1em, 2.7vw, 2.5em)', fontSize: 'clamp(0.9em, 2.7vw, 1em)', flex: 1}}>  
                            <div className='me-auto'>
                                <h5 className="mb-0 d-flex align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em'}}><i className='bx bxs-grid-alt'></i> Order ID: ######</h5>
                                <div className="details-rows mt-3">
                                    <div className="details-row border-0 px-0 gap-3">
                                        <p className='text-dark'>Customer Name: </p><p> Mr. Ashish Sinha</p>
                                    </div>
                                    <div className="details-row border-0 px-0 gap-3 pb-0">
                                        <p className='text-dark'>Phone Number: </p><p>7004654984</p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex align-items-center justify-content-end flex-wrap gap-4'>
                                <h5 className="mb-0 d-flex align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em', color: '#005ee9'}} role='button' onClick={() => modalAction('TABLE_SELECTION_MODAL', true)}><i className='bx bxs-grid-alt'></i> {table ? <>{table?.BedDesc}, &nbsp; {table?.BedGroupDesc}</> : 'Select Table'} <i style={{fontSize: '2rem', color: '#f17e1d'}} className='bx bx-caret-down'></i></h5>
                                <h5 className="mb-0 d-flex align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em', color: '#ef008d'}}><i className='bx bxs-user'></i> {userInfo.selectedMember.MemberName}</h5>
                                <span onClick={selectMember} className='continue-button d-inline' style={{background: '#1f8dc9', padding: '0 7px', lineHeight: '2.3', borderRadius: '6px'}} role='button'>Select Entity</span>
                            </div>
                        </div> : ''} */}
                        
                        { isMobile ? renderMobileCart() : renderCart() }
                        {/* <div className="row">
                            <div className="col-12">
                                <div className="coupon-all">
                                    <div className="coupon">
                                        <input id="coupon_code" className="input-text" name="coupon_code" onChange={dummyFunction} value="" placeholder="Coupon code" type="text"/>
                                        <input className="button" name="apply_coupon" onChange={dummyFunction} value="Apply coupon" type="submit"/>
                                    </div>
                                    <div className="coupon2">
                                        <input className="button" name="update_cart" onChange={dummyFunction} value="Update cart" type="submit"/>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="row position-relative mt-3">
                            <div className="col-lg-6">
                                <div className="input-group" style={{fontSize: '1.2em', maxWidth: '55rem'}}>
                                    <input className="form-control" onChange={handleSearch} onClick={() => setSearchResultsActive(true)} value={searchTerm.query} name="query" type="text" placeholder="Search products" />
                                    <span className="input-group-text" id="basic-addon2">Add to Cart</span>
                                    {searchResultsActive && <AutoComplete name='search-results' list={searchList.data.itemMasterCollection} isLoading={searchList.loading} setActive={setSearchResultsActive} styles={{fontSize: '0.9em'}} children={<ConnectedSearchListCard />} keyName={'LocationItemId'} />}
                                </div>
                            </div>
                        </div>
                        {cartArrayLength !== 0 && <div className="row">
                            <div className="col-md-5 ms-auto">
                                <div className="cart-page-total d-flex flex-column pt-4 pt-md-0">
                                    <h2 className="mb-xs-10 mb-20">Cart totals</h2>
                                    <ul>
                                        <li>Gross Amount <span>{grossTotal}</span></li>
                                        <li>Less Discount <span>- {discountTotal}</span></li>
                                        {/* <li>Add GST <span>+ {gstTotal}</span></li> */}
                                        <li>Payable Amount <span>₹ {cartSubtotal}</span></li>
                                    </ul>
                                    <div className='mt-xs-10 mt-15 d-flex justify-content-between w-100'>
                                        <Link to="/wishlist" className="">Go to Wishlist</Link>
                                        <Link to="/checkout" className="">Proceed to checkout</Link>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToPropsTwo = (state) => {
  return { cart: state.cart, compCode: state.compCode, isMobile: state.isMobile, globalData: state.globalData, userInfo: state.userInfo, isLoggedIn: state.isLoggedIn };
}

export default connect(mapStateToPropsTwo, {breadCrumbAction, cartAction, wishlistAction, modalAction})(CartPage);