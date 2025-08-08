import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { getFrom, ScrollToTop, Spinner, stringToast } from "./utilities";
import { useHistory, Link } from "react-router-dom";
import { ConnectedMyOrderCard } from "./cards";
import { loaderAction } from "../../../actions";
import axios from "axios";
import { wait } from "@testing-library/user-event/dist/utils";
import Skeleton from "react-loading-skeleton";
import { BASE_URL } from "../../../constants";

let order = {        
    BillQty: 1,                                                     
    ItemId: 4654,
    Rate: 58,
    Amount: 154,
    ItemImageURL: '/img/question.jpg',
    Description: 'Product Name'
}

const data = [
    { 
        VchNo: 'Order ID',
        VchDate: 'Order Date',
        Amount: 450,
        PaymentMethod: 'Cash on Delivery',
        PartyName: 'Party Name',
        PartyAddress: 'Party Address',
        BillId: 45644,
        SalesDetailsList: [order, order, order]
    },
    { 
        VchNo: 'Order ID',
        VchDate: 'Order Date',
        Amount: 450,
        PaymentMethod: 'Cash on Delivery',
        PartyName: 'Party Name',
        PartyAddress: 'Party Address',
        BillId: 45644,
        SalesDetailsList: [order, order, order]
    },
    { 
        VchNo: 'Order ID',
        VchDate: 'Order Date',
        Amount: 450,
        PaymentMethod: 'Cash on Delivery',
        PartyName: 'Party Name',
        PartyAddress: 'Party Address',
        BillId: 45644,
        SalesDetailsList: [order, order, order]
    }
]


const MyOrders = ({ isLoggedIn, userInfo, compCode, globalData }) => {

    const [tabActive, setTabActive] = useState('active');
    const [myOrderData, setMyOrderData] = useState({loading: false, data: {OrderList: []}, err: {status: false, msg: ''}});
  
    const history = useHistory();  
  
    const getMyOrders = useCallback( async (params, locationId) => {
        const res = await getFrom(`${BASE_URL}/api/Pharma/Get?CID=${compCode}&PID=${params}&Type=${tabActive}&LOCID=${locationId}`, {}, setMyOrderData);
        if (res) {                                              
            setMyOrderData(res);
        } else {
            console.log('No data received');
        }
    },[tabActive])                                                               // Adding tabActive as dependency will call getMyOrders whenever tabActive is changed with current tab name.
  
    useEffect(() => {
    //   if (!isLoggedIn) return history.push('/');
      getMyOrders(userInfo.PartyCode, globalData.location.LocationId);
    },[compCode, getMyOrders, 
        // isLoggedIn, 
        history, userInfo.PartyCode, globalData.location.LocationId])
  
    const noItemFound = () => (
      <div className="card mb-4">
          <div className="card-header">
              <h5 className="mb-0">Orders</h5>
          </div>
          <div className="card-body cart pt-0">
              <div className="col-sm-12 empty-cart-cls text-center">
                  <img src="/img/products.png" className="img-fluid" style={{maxHeight: '12rem'}} alt="empty_cart"/>
                  <h3 className="fw-bold">You have no {tabActive} orders</h3>
                  <Link to='/labTests' className='btn btn-primary cart-btn-transform m-3 py-2 px-3 btn-lg' style={{fontSize: '1.3em'}}>Place an Order</Link>
              </div>
          </div>
      </div>
    )
  
    const cancelOrder = async (id) => {
      loaderAction(true);
      const res = await axios.get(`${BASE_URL}/api/Pharma/Get/${id}`, {});
      loaderAction(false);
      if (res) {
        // history.push('/showErrorPage');                             // Redirecting to error page so that user can click back to orders button to be again
        // modalAction('ORDER_CANCELLED_MODAL', true)                  // redirected to my order page so it can relaod itself with latest changes.
        stringToast("Successfully Cancelled this Order.", 'error');
        await wait(2000);
        setTabActive('cancelled');
        ScrollToTop();
      }                          
    }
  
    const renderTabs = (data) => {
      if (data.loading) {
        return <Skeleton count={16}/>;
      } else if (data.err.status) {
        return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
      } else if (data.data.OrderList.length === 0) {
        return noItemFound();
      } else {
          return data.data.OrderList.map(order => {
            return (
                <div key={order.BillId} className="card my-order-dtails overflow-hidden">
                    <div className="row gx-0">
                        <div className="col-12 col-lg-8 left">
                            <div className="card mb-0">
                                <h4 className="card-header border-info bg-transparent">
                                    Ordered Items
                                </h4>
                                <div className="card-body">
                                    {Object.values(order.SalesDetailsList).map((order, index)  => <ConnectedMyOrderCard  key={index} item={order} />)}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 right">
                            <div className="card mb-0">
                                <h4 className="card-header border-info bg-transparent">
                                    Order Summary
                                </h4>
                                <div className="card-body">
                                    <div className="checkout-details">
                                    <div>
                                        <h4 className="card-title">Order ID</h4>
                                        <h5 className="card-text">{order.VchNo}</h5>
                                    </div> 
                                    <div>
                                        <h4 className="card-title">Deliver to</h4>
                                        <h5 className="card-text">{order.PartyName}</h5>
                                    </div>
                                    <div className='checkout-address'>
                                        <div>
                                        <h4 className="card-title mb-1">Delivery Address</h4>
                                        {/* <button type="button" className="btn payment-btn btn-primary">Change Address</button> */}
                                        </div>
                                        <span>{order.PartyAddress}</span>
                                    </div>
                                    <div>
                                        <h4 className="card-title">Order Date</h4>
                                        <h5 className="card-text">{order.VchDate.slice(0, 10).split('-').reverse().join('-')}</h5>
                                    </div>
                                    {/* <div>
                                        <h4 className="card-title">Cart Total</h4>
                                        <h5 className="card-text">₹ 684</h5>
                                    </div>
                                    <div>
                                        <h4 className="card-title">Delivery Charges</h4>
                                        <h5 className="card-text">₹ 50</h5>
                                    </div> */}
                                    <div>
                                        <h4 className="card-title">Order Total</h4>
                                        <h5 className="card-text">₹ {parseFloat(order.Amount).toFixed(2)}</h5>
                                    </div>
                                    <div>
                                        <h4 className="card-title">Payment Method</h4>
                                        <div className="dropdown">
                                        <h5 className="card-text">{order.PaymentMethod}</h5>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="d-flex gap-1">
                                        {tabActive === 'active' && <button onClick={(() => cancelOrder(order.BillId))} className="btn btn-primary w-50 mt-3 py-2 checkout-btn cancel-btn">Cancel Order</button>}
                                        <button className={`btn btn-primary ${tabActive === 'active' ? 'w-50' : 'w-100'} mt-3 py-2 checkout-btn`}>Need Help</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
      }
    }
  
  
    return (
      <div id="myOrders">
        {/* <div className="Shopping-cart-area pb-xs-0 pb-60 pt-4">
          <div className="container">
              <div className="row mb-2">
                  <div className='col-12 myOrder-heading d-flex justify-content-between flex-column flex-md-row gap-4'>
                      <h2>My Orders..</h2>
                      <ul className='d-flex gap-5 align-items-end list-inline'>
                          <li className={`pb-2 ${tabActive === 'active' && 'active'}`} onClick={() => setTabActive('active')}>Active</li>
                          <li className={`pb-2 ${tabActive === 'completed' && 'active'}`} onClick={() => setTabActive('completed')}>Completed</li>
                          <li className={`pb-2 ${tabActive === 'cancelled' && 'active'}`} onClick={() => setTabActive('cancelled')}>Cancelled</li>
                      </ul>
                  </div>
              </div>
   
              <div className="row">
                  <div className="tab-content overflow-hidden pt-2">
                      <div id="tabFade-pane-1" className='tab-pane fade show active' role="tabpanel" aria-labelledby="tabFade-1">
                          {renderTabs(myOrderData)}               dynamically changing tab content hence don't need to switch between tabs.
                      </div>
                  </div>
              </div>            
          </div>
        </div> */}

        <div className="cartPageSection my-orders container-fluid content px-2 px-lg-5" >         {/* style={{display: cartListLength > 0 ? 'grid' : 'none'}} */}
            <div className="row">
                <div className="col col-12">
                    <div className='border-0 d-flex justify-content-between flex-column flex-md-row gap-2 gap-lg-4 mb-0 mb-md-2'>
                        <h1 className="mb-0" style={{fontSize: '1.8em'}}>My Orders..</h1>
                        <nav className="user-tabs">
                            <ul className="nav nav-tabs nav-tabs-bottom nav-justified gap-2 gap-lg-3 bg-transparent border-0">
                                <li className="nav-item">
                                    <span className={`nav-link ${tabActive === "active" ? "active" : ''}`} onClick={() => setTabActive("active")} data-toggle="tab">Active</span>
                                </li>
                                <li className="nav-item">
                                    <span className={`nav-link ${ tabActive === "completed" ? "active" : ''}`} onClick={() => setTabActive("completed")} data-toggle="tab" > Completed </span>
                                </li>
                                <li className="nav-item"> 
                                    <span className={`nav-link ${ tabActive === "cancelled" ? "active" : ''}`} onClick={() => setTabActive("cancelled")} data-toggle="tab" > Cancelled </span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="tab-content overflow-hidden pt-0">
                        <div id="tabFade-pane-1" className='tab-pane fade show active' role="tabpanel" aria-labelledby="tabFade-1" style={{padding: '2px'}}>
                            {renderTabs(myOrderData)}               {/* dynamically changing tab content hence don't need to switch between tabs. */}
                        </div>
                    </div>
                </div>
                {/* <div className="col col-12">
                    <div className="card border-0 w-100 order-summary" style={{minHeight: '17.7rem'}}>
                        <h3 className="card-header border-info bg-transparent">Order Details</h3>
                        <div className="card-body">
                            
                        </div>
                        <div className="card-footer border-info bg-transparent">Created DD-MM-YYYY</div>
                    </div>
                </div> */}
            </div>
        </div>
      </div>
    )
}

const mapStateToMyOrders = (state) => {
    return { isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, compCode: state.compCode, globalData: state.globalData };
}

export default connect(mapStateToMyOrders, {})(MyOrders);