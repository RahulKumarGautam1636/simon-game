import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { cartAction, userInfoAction, loaderAction, modalAction } from '../../../actions';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { getFormattedDate, ModalComponent, handleNumberInputs, BreadCrumb, wait, bookingToast } from './utilities';
import { Link, useHistory } from 'react-router-dom';
import LabTests from './labTests';
import { BASE_URL, memberLabel } from '../../../constants';
import { uType } from '../../utils/utils';
// import { ConnectedCartCard } from './cards';


const Checkout = ({ cart, cartAction, compCode, userInfo, userInfoAction, loaderAction, isLoggedIn, globalData, modalAction }) => {
                   
  const history = useHistory();
  // const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderData, setOrderData] = useState({
    PartyCode: '',
    InsBy: '',              
    PaymentMethod: 'COD',
    Amount: '',
    EncCompanyId: '',
    SalesDetailsList: [],                                // {ItemId: '', Qty: '', Unit: '', MRP: '', MRPOnDisPer: '', Rate: ''}

    BillingState: userInfo.State,
    BillingAddress: userInfo.Address + userInfo.Address2 + userInfo.Pin,
    DeliveryParty: userInfo.PartyCode,
    DeliveryState: userInfo.State,
    DeliveryAddress : userInfo.Address + userInfo.Address2 + userInfo.Pin
  });

  const breadCrumbData = {
    links: [{name: 'Home', link: '/'}, {name: 'Cart', link: '/cartPage'}],
    activeLink: '/cartPage'
  }

  const cartArray = Object.values(cart.pharmacy);                                                               // Convert cart object into list.
  const cartArrayLength = cartArray.length;

  let totalItemsValue = cartArray.map(i => i.SRate * i.Qty);
  let totalCartValue = totalItemsValue.reduce((total, num) => total + num, 0).toFixed(2);
  // const cartItemsValueList = cartArray.map(item => item.Qty * item.SRate);                                              // Array of all item's price * quantity selected.
  // const cartSubtotal = cartItemsValueList.reduce((total, num) => total + num, 0).toFixed(2);                            // Reducing to get sum of cartItemsValueList.

  let orderList = useMemo(() => Object.values(cart.pharmacy).map(i => ({                                                         // since we need value (array) from orderList hence using useMemo instead of useCallback which return function. both can suppress useEffect dependency warning.
    BillQty: i.Qty,                                                     // We can't use cartArray defined above. because it cartArray recalculated on every page render and usecallback thinks it's been changed  
    ItemId: i.ItemId,                                                     // and hence triggers recalculation / re-run of orderList function which makes below useEffect to reRender the page (again recalculates cartArray) resulting falling in a loop.
    Unit: i.Unit,
    MRP: i.ItemMRP,
    MRPOnDisPer: i.DiscountPer,
    Rate: (((i.Qty * i.SRate) - (((i.Qty * i.SRate * i.IGSTRATE) / (i.IGSTRATE + 100))))/i.Qty).toFixed(2),
    PackSizeId: i.PackSizeId ? i.PackSizeId : 0,
    Amount: i.Qty * i.SRate,
    TaxableAmount: ((i.Qty * i.SRate) - ((i.Qty * i.SRate * i.IGSTRATE) / (i.IGSTRATE + 100))).toFixed(2),
    CGSTRATE: i.CGSTRATE,
    SGSTRATE: i.SGSTRATE,
    IGSTRATE: i.IGSTRATE
  })),[cart.pharmacy])

  useEffect(() => {
    async function init () {
      if (isLoggedIn) {
        setOrderData((preValues) => ({
            ...preValues,
            PartyCode: userInfo.PartyCode,
            InsBy: userInfo.UserId,              
            PaymentMethod: 'COD',
            Amount: totalCartValue,
            EncCompanyId: compCode,
            SalesDetailsList: orderList,                       
            BillingState: userInfo.State,
            BillingAddress: userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,
            DeliveryParty: userInfo.PartyCode,
            DeliveryState: userInfo.State,
            DeliveryAddress : userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,
            LocationId: globalData.location.LocationId
        }))
      } else {
        setOrderData((preValues) => ({
            ...preValues,
            PartyCode: '0',
            InsBy: '0',
            BillingState: '',
            BillingAddress: '',
            DeliveryParty: '',
            DeliveryState: '',
            DeliveryAddress : '',              
        }))
      }
    }
    init();
  },[isLoggedIn, userInfo, totalCartValue, compCode, orderList])

  const placeOrder = async () => {
    try {
        loaderAction(true);
        const res = await axios.post(`${BASE_URL}/api/Pharma/Post`, orderData);
        loaderAction(false); 
        bookingToast(res.data, { position: "top-center", autoClose: 4000, closeButton: false, className: 'booking-reference-toast' });
        await wait(3000);
        history.push('/myOrders');
        cartAction('DUMP_CART', {}, 'pharmacy');
        // updateLocalStorageItems();
        // modalAction('ORDER_SUCCESS_MODAL', true);
    } catch (err) {
        console.log(err);
        return false;
    }
  }

  const handleCheckout = () => {
    if (!isLoggedIn) return modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT});
    if (!orderData.LocationId) return alert('Please select a Service Location before making an order.');
    if (!orderData.SalesDetailsList.length) return alert('Add something to your cart before making an order');
    placeOrder();
  }

  return (
    <div id="cartPage">
      <BreadCrumb data={breadCrumbData}/>
      {cartArray.length === 0 && <EmptyCart />}
      <div className="cartPageSection container-fluid content px-3 px-lg-5" >    
        <div className="row">
          <div className="col col-12 col-lg-6">
            {/* {cartArray.length !== 0 && <CartPageSection heading={`${cartArray.length} items`} cartData={cartArray} compCode={compCode} userInfo={userInfo} userInfoAction={userInfoAction}/>} */}
            {cartArrayLength !== 0 && <OrderSummary isLoggedIn={isLoggedIn} cartArray={cartArray} totalCartValue={totalCartValue} userInfo={userInfo}/>}
          </div>
          <div className="col col-12 col-lg-6">
            {cartArrayLength !== 0 && <DeliverSummary isLoggedIn={isLoggedIn} cartArray={cartArray} totalCartValue={totalCartValue} handleCheckout={handleCheckout} userInfo={userInfo} modalAction={modalAction}/>}
          </div>
        </div>
      </div>
      {/* <CheckoutForm isActive={showCheckoutForm} setShowForm={setShowCheckoutForm} cart={cart} compCode={compCode} totalCartValue={totalCartValue} cartAction={cartAction} loaderAction={loaderAction} isLoggedIn={isLoggedIn} userInfo={userInfo} userInfoAction={userInfoAction}/> */}
      {/* <div className="section-header text-center">
          <h2 style={{"borderBottom": "2px solid gray", "textTransform": "uppercase", "display": "inline", "letterSpacing": "3px"}}>Related Products</h2>
      </div>
      <LabTests/> */}
    </div>
  )
}

const mapStateToPropsTwo = (state) => {
  return { cart: state.cart, compCode: state.compCode, userInfo: state.userInfo, isLoggedIn: state.isLoggedIn, globalData: state.globalData };
}

export default connect(mapStateToPropsTwo, {cartAction, userInfoAction, loaderAction, modalAction})(Checkout);


// const CartPageSection = ({ cartData, heading }) => {

//   return (
//     <div className="card border-0 w-100" style={{minHeight: '17.7rem'}}>
//       <h3 className="card-header border-info bg-transparent">Cart Overview <span style={{fontSize: '0.7rem'}}>({heading})</span></h3>             
//       <div className="card-body">
//         <div className="cart-list-wrapper">
//           {cartData.map(i => <ConnectedCartCard item={i} key={i.LocationItemId}/>)}
//         </div>
//       </div>
//       <div className="card-footer border-info bg-transparent">Date: {getFormattedDate()}</div>
//     </div>
//   )
// }

const OrderSummary = ({ totalCartValue, cartArray, userInfo, isLoggedIn }) => {

  const [paymentMethod, setPaymentMethod] = useState(1);

  const payMethods = { 1: 'Cash on Delivery', 2: 'Pay Online', 3: 'Others' };

  const deliveryCharges = 50;

  return (
    <div className="card border-0 w-100 order-summary" style={{minHeight: '17.7rem'}}>
      <h3 className="card-header border-info bg-transparent">Order Summary</h3>
      <div className="card-body">
        <div className='product-list'>
          <ul>
            {cartArray.map(i => <li key={i.LocationItemId}><div>{i.Description}<i className='bx bx-x'></i>{i.Qty}</div> ₹ {(i.Qty*i.SRate).toFixed(2)}</li>)}
          </ul>
        </div>
        <div className="checkout-details">
          {/* <div>
            <h4 className="card-title">Deliver to</h4>
            <h5 className="card-text">{isLoggedIn ? userInfo.Name : 'Please Login'}</h5>
          </div>
          <div className='checkout-address'>
            <div>
              <h4 className="card-title">Delivery Address</h4>
              <button type="button" className="btn payment-btn btn-primary">{isLoggedIn ? 'Change Address' : 'Add Address'}</button>
            </div>
            <span>{isLoggedIn ? userInfo.Address : 'Please login to add an address.'}</span>
          </div> */}
          <div>
            <h4 className="card-title">Cart Subtotal</h4>
            <h5 className="card-text">₹ {totalCartValue}</h5>
          </div>
          <div>
            <h4 className="card-title">Delivery Charges</h4>
            <h5 className="card-text">Free Delivery</h5>
          </div>
          <div>
            <h4 className="card-title">Order Total</h4>
            <h5 className="card-text">₹ {parseFloat(totalCartValue)}</h5>
          </div>
          {/* <div>
            <h4 className="card-title">Payment Method</h4>
            <div className="dropdown">
              <button type="button" className="btn dropdown-toggle payment-btn" id="dropdownButton" data-bs-toggle="dropdown" aria-expanded="false">{payMethods[paymentMethod]}</button>
              <div className="dropdown-menu" aria-labelledby="dropdownButton">
                {Object.keys(payMethods).map((i, n) => <span key={n} className="dropdown-item" onClick={() => setPaymentMethod(i)}>{payMethods[i]}</span>)}
              </div>
            </div>
          </div> */}
        </div>
        {/* <button className="btn btn-primary w-100 mt-3 py-2 checkout-btn">PLACE ORDER</button> */}
        {/* <div className='d-flex gap-3 justify-content-center'>
          <Link to={'/wishlist'} className="btn btn-primary mt-3 py-2 checkout-btn" style={{flex: 1}}>WISHLIST</Link>
          <Link to={'/cartPage'} className="btn btn-primary mt-3 py-2 checkout-btn" style={{flex: 1}}>VISIT CART</Link>
        </div> */}
        <div className="btn-box mt-3" style={{fontSize: '1.7em'}}>
            <Link to={'/wishlist'} className="btn btn-main add-wishlist-btn">WISHLIST</Link>
            <Link to={'/cartPage'} className="btn btn-main">VISIT CART</Link>
        </div>
      </div>
      <div className="card-footer border-info bg-transparent">Created DD-MM-YYYY</div>
    </div>
  )
}

const DeliverSummary = ({ totalCartValue, handleCheckout, cartArray, userInfo, isLoggedIn, modalAction }) => {

  const [paymentMethod, setPaymentMethod] = useState(1);

  const payMethods = { 1: 'Cash on Delivery', 2: 'Pay Online', 3: 'Others' };

  const deliveryCharges = 50;

  return (
    <div className="card border-0 w-100 order-summary" style={{minHeight: '17.7rem'}}>
      <h3 className="card-header border-info bg-transparent">Delivery Summary</h3>
      <div className="card-body pt-2">
        {/* <div className='product-list'>
          <ul>
            {cartArray.map(i => <li key={i.SRate}><div>{i.Description}<i className='bx bx-x'></i>{i.Qty}</div> ₹ {(i.Qty*i.SRate).toFixed(2)}</li>)}
          </ul>
        </div> */}
        <div className="checkout-details">
          <div>
            <h4 className="card-title">Deliver to</h4>
            <h5 className="card-text">{isLoggedIn ? userInfo.Name : 'Please Login'}</h5>
          </div>
          <div>
            <h4 className="card-title">{memberLabel}</h4>
            <h5 className="card-text">{userInfo.selectedMember.MemberName} <Link to={`#`} onClick={() => modalAction('MEMBER_SELECT_MODAL', true)} className='dashboard-card__btn-box-item ms-2' style={{'--clr': '#E80202', '--bg': '#ffbcbc63', '--bClr': '#ff33333d', fontSize: '0.8em'}}>CHANGE</Link></h5>
          </div>
          <div>
            <h4 className="card-title">Phone Number</h4>
            <h5 className="card-text">{isLoggedIn ? userInfo.RegMob1 : 'Please Login'}</h5>
          </div>
          <div className='checkout-address'>
            <div>
              <h4 className="card-title">Delivery Address</h4>
              <button type="button" className="btn payment-btn btn-primary" onClick={() => modalAction('EDIT_USER_MODAL', true)}>{isLoggedIn ? 'Change Address' : 'Add Address'}</button>
            </div>
            <span>{isLoggedIn ?  `${userInfo.Address2 ? (userInfo.Address2 + ', '): ''} ${userInfo.Address}${userInfo.Pin ? (', Pin code - ' + userInfo.Pin): ''}` : 'Please login to add an address.'}</span>
          </div>
          {/* <div>
            <h4 className="card-title">Cart Subtotal</h4>
            <h5 className="card-text">₹ {totalCartValue}</h5>
          </div>
          <div>
            <h4 className="card-title">Delivery Charges</h4>
            <h5 className="card-text">Free Delivery</h5>
          </div>
          <div>
            <h4 className="card-title">Order Total</h4>
            <h5 className="card-text">₹ {parseFloat(totalCartValue)}</h5>
          </div> */}
          <div>
            <h4 className="card-title">Payment Method</h4>
            <div className="dropdown">
              <button type="button" className="btn dropdown-toggle payment-btn" id="dropdownButton" data-bs-toggle="dropdown" aria-expanded="false">{payMethods[paymentMethod]}</button>
              <div className="dropdown-menu" aria-labelledby="dropdownButton">
                {Object.keys(payMethods).map((i, n) => <span key={n} className="dropdown-item" onClick={() => setPaymentMethod(i)}>{payMethods[i]}</span>)}
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary w-100 mt-3 py-2 checkout-btn" onClick={handleCheckout}>PLACE ORDER</button>
      </div>
      <div className="card-footer border-info bg-transparent">Created DD-MM-YYYY</div>
    </div>
  )
}

const EmptyCart = () => (
    <div className="container-fluid content emptyCart">
    <div className="row mx-md-4">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
          <h5 className="mb-0">Cart</h5>
          </div>
          <div className="card-body cart">
            <div className="col-sm-12 empty-cart-cls text-center">
              <img src="/img/emptyCart.png" width="130" height="130" className="img-fluid mb-4 mr-3" alt="empty_cart" style={{transform: 'translateX(-11px)'}}/>
              <h3><strong>Your Cart is Empty</strong></h3>
              <h4>Add something to make me happy :)</h4>
              <Link to="/labTests" className="btn btn-primary cart-btn-transform m-3 py-2 px-3" data-abc="true" style={{fontSize: '2rem'}}>Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// item id changed.