import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { cartAction, toastAction, userInfoAction, modalAction, bookingInfoAction, globalDataAction, wishlistAction } from '../../../actions';
import { connect } from 'react-redux';
import { focusArea, getFrom, HoverDropdown, JQDatePicker, MyModal, productToast, stopPropagation } from './utilities';
import Skeleton from 'react-loading-skeleton';
import { ASTHA_ID, BASE_URL, BCROY_ID, BSN_ID, defaultId } from '../../../constants';


function ProfileCard({ data, bookingInfoAction, modalAction }) {

  const handleBooking = () => {
    bookingInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: '', companyId: '', selectedAppnDate: ''}); 
    modalAction('APPN_BOOKING_MODAL', true);
  }

  return (
    <div className="profile-card text-center bg-white d-flex flex-column align-items-center justify-content-around m-1 position-relative overflow-hidden" >
        {/* <div className="tag"><p>59% off</p></div> */}
        <div className="rounded-circle p-1 overflow-hidden" style={{"width": "5.5em", height: '5.5em', "border": "2px solid #fd5abd"}}>
          {/* <img src="/img/user_unknown.png" className="img-fluid" alt="Speciality"/> */}
          <img src={data.PhotoUrl !== '' ? data.PhotoUrl : '/img/user_unknown.png'} className="img-fluid h-100" alt="Speciality"/>
        </div>
        <ul className="d-flex justify-content-between px-0 mt-2 mb-2 text-warning" style={{"listStyle": "none", "minWidth": "7em", "fontSize": "0.8em"}}>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star"></i></li>
          <li><i className="fas fa-star-half-alt"></i></li>
        </ul>
        <h4 style={{"fontSize": "1.1em"}}><Link to={`/doctors/${data.PartyCode}`}>{data.Name}</Link></h4>
        <h6 style={{"fontSize": "0.85em"}}>{data.Qualification}</h6>
        <p style={{"fontSize": "0.75em"}} className="mb-2">{data.SpecialistDesc}</p>
        <Link to={`/doctors/${data.PartyCode}`} className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile button-link" type="button" name="button">VIEW PROFILE</Link>
        <button className="btn btn-sm btn-secondary w-100" type="button" name="button" onClick={handleBooking} style={{"backgroundColor": "#157eab"}}>BOOK APPOINTMENT</button>
    </div>                                                                                          
  );
}

function PackgeCard({ data, cart, toastAction, cartAction }) {

  const isAddedToCart = Object.keys(cart.labTests).filter(i => i === data.LocationItemId );          // Filter cart items to know if item is already added to cart or not.
  
  return (
    <div className="profile-card bg-white d-flex flex-column justify-content-around p-3 m-1 position-relative overflow-hidden" style={{boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)", borderRadius: "0.85em", maxWidth: "19rem", width: "18rem", fontSize: "15px"}}>
        <Link to={`/productPage/${data.ItemId}`}><h4 style={{fontSize: "1.3em"}}>{data.ItemDesc}</h4></Link>
        <p style={{fontSize: "0.75em", fontWeight: "500"}} className="mb-2">TOTAL TESTS: {data.totalTests}</p>
        <p style={{fontSize: "0.75em", color: "#227066fa"}} className="mb-2">{data.testType}</p>
        <p style={{fontSize: "0.7em"}} className="mb-2"> {data.testName}<span style={{fontWeight: "500", color: "orange"}}> +{data.more} More</span>
        </p>
        <hr className="mb-3 mt-1" style={{background: "#157eab", height: "0px", width: "100%"}} />
        <div className="d-flex w-75 mb-1">
            <h6 style={{fontSize: "0.85em"}}>MRP</h6>
            <h6 className="text-danger position-relative pricing-red" style={{fontSize: "0.85em", margin: "0 2em 0 1em"}}>₹{data.MRPrate}</h6>
            <h6 className="text-white position-relative pricing-green" style={{fontSize: "0.85em", zIndex: "1"}}>{data.Discount}% off</h6>
            <h6 className="position-relative" style={{color: "var(--clr-12)", fontSize: "0.85em", zIndex: "1", marginLeft: "2em", transform: "scale(1.2)"}}>₹{data.Discount}</h6>
        </div>
        <button onClick={() => {cartAction('ADD_ITEM', {...data, Qty: 1}, 'labTests'); toastAction(true, data)}} className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{borderWidth: "2px", borderColor: "#157eab", fontSize: "0.8em"}}>{isAddedToCart.length > 0 ? 'TEST BOOKED' : 'BOOK TEST'} TO CART</button>
    </div>
  );
}


function LabTestCard({ data, cartAction, cart, userInfo, testDate, className='' }) {
  const cartList = Object.values(cart.labTests);
  const isAddedToCart = cartList.filter(i => i.LocationItemId === data.LocationItemId ).length;  
  // const isValidItem = cartList.find(i => i.locId !== userInfo.selectedCompany.LocationId);  
    
  const handleAdd = () => {
    if (!userInfo.selectedCompany.LocationId) return alert('Something went wrong, please try again later.')
    // if (isValidItem.ItemId) {}
    if (isAddedToCart) return cartAction('REMOVE_ITEM', data.LocationItemId, 'labTests');
    cartAction('ADD_ITEM', {...data, Qty: 1, testDate: testDate}, 'labTests'); 
    let productToastData = { msg: 'Added to Cart', product: {name: data.Description, price: data.SRate}, button: {text: 'Visit Cart', link: '/cartPage'} };
    productToast(productToastData);
    // updateLocalStorageItems();
  }
  
  return (
    <div className={`labTestCard gap-3 ${className}`}>
      <div className='d-flex gap-2 mb-3 align-items-start'>
        {/* <div className='iconDiv'>
          <i className='bx bx-heart'></i><p> PACKAGE</p>
        </div> */}
        <div className='heading w-100'>
          <h4><i className="bx bxs-circle text-blue-800" style={{transform: 'translateY(1px)'}}></i> {data.Description}</h4>
          <p>{data.CategoryName}</p>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-end'>
        <div className='amountDiv'>
          {/* <h6><i className='bx bxs-wallet-alt'></i> ₹60 cashback</h6> */}
          <h1 className='d-flex align-items-end'>₹{data.SRate} <span>₹{data.ItemMRP}</span> <span>{data.DiscountPer}% off</span></h1>
        </div>
        <div>     
          {/* <div className="text-center action text-nowrap">
            <i className='bx bx-plus-circle' ></i>
            <span className="mx-2 mx-md-3" style={{fontSize: '0.9em'}} onClick={() => cartAction('ADD_ITEM', {...data, Qty: data.Qty + 1})}>{data.Qty}</span>
            <i className='bx bx-minus-circle' onClick={() => cartAction('ADD_data', {...data, Qty: data.Qty === 1 ? 1 : data.Qty - 1})}></i>
          </div>                                                                  */}
          <button onClick={handleAdd}>{isAddedToCart ? 'REMOVE' : 'ADD'}</button>
        </div>
      </div>
    </div>
  );
}

function PharmcyCard({ data, cart, cartAction, toastAction }) {
  const isAddedToCart = Object.keys(cart.pharmacy).filter(i => i === data.LocationItemId );          // Filter cart items to know if item is already added to cart or not.

  return (
    <div className="profile-card text-center bg-white d-flex flex-column align-items-center justify-content-around p-3 m-1 position-relative overflow-hidden" style={{"height": "17rem"}}>
        <div className="tag"><p>{data.Discount}% off</p></div>
        <div className='img-box'>
          <img src={data.ItemImageURL || '/assets/img/fallback/no-image.png'} alt="Speciality" style={{"maxWidth": "6em", maxHeight: '6em', "marginBottom": "1em"}}/>
        </div>
        <Link to={`/productPage/${data.ItemId}`}><h4 style={{"fontSize": "1.1em"}}>{data.Description}</h4></Link>
        <hr className="mb-3 mt-1" style={{"background": "#157eab","height": "1px", "width": "100%"}} />
        <div className="d-flex justify-content-around w-75 mb-1">
            <h6 style={{"fontSize": "0.85em"}}>MRP</h6>
            <h6 className="text-danger position-relative pricing-red" style={{"fontSize": "0.85em"}}>₹{data.ItemMRP}</h6>
            <h6 className="text-white position-relative pricing-green" style={{"fontSize": "0.85em", "zIndex": "1"}}>₹{data.SRate}</h6>
        </div>
        <button onClick={() => {cartAction('ADD_ITEM', {...data, Qty: 1}, 'pharmacy'); toastAction(true, data)}} className="btn btn-sm btn-outline-secondary w-100 mb-1 view-profile" type="button" name="button" style={{"borderWidth":"2px", "borderColor": "#157eab", "fontSize": "0.8em"}}>{isAddedToCart.length > 0 ? 'ADDED TO CART' : 'ADD TO CART'}</button>
    </div>
  );
}

const PharmacyCard2 = ({ data, cartAction, wishlistAction, cart, wishlist, globalData, globalDataAction }) => {
  const isAddedToCart = Object.keys(cart.pharmacy).filter(i => i === data.LocationItemId ).length;          // Filter cart items to know if item is already added to cart or not.
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
    cartAction('ADD_ITEM', {...data, Qty: 1, ...computeWithPackSize()}, 'pharmacy'); 
    let productToastData = { msg: 'Added to Cart', product: {name: data.Description, price: computeWithPackSize().SRate}, button: {text: 'Visit Cart', link: '/cartPage'} };
    productToast(productToastData);
    wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
    // updateLocalStorageItems();
  }

  const buyNow = () => {
    if (!globalData.location.LocationId) return focusArea(globalDataAction);
    cartAction('DUMP_CART', {}, 'pharmacy');
    cartAction('ADD_ITEM', {...data, Qty: 1, ...computeWithPackSize()}, 'pharmacy'); 
    wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy')
    // updateLocalStorageItems();
    history.push('/checkout');
  }

  const addToWishlist = () => {
    if (!globalData.location.LocationId) return focusArea(globalDataAction);
    if (isAddedToWishlist) return wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
    wishlistAction('ADD_WISH_ITEM', {...data, Qty: 1, ...computeWithPackSize()}, 'pharmacy'); 
    cartAction('REMOVE_ITEM', data.LocationItemId); 
    let productToastData = { msg: 'Added to Wishlist', product: {name: data.Description, price: computeWithPackSize().SRate}, button: {text: 'View Wishlist', link: '/wishlist'} };
    productToast(productToastData); 
    // updateLocalStorageItems();
  }
  return (
    <div className="product-card">
      <div className="product-img">
        <Link to={`/productPage/${data.ItemId}`}><img src={data.ItemImageURL || '/assets/img/fallback/no-image.png'} alt="product" /></Link>
        {packSizeList?.length ? <p className='packSize'>{packSizeList}</p> : ''}
        <div className="wish-icon" onClick={addToWishlist}><i className={`fa${isAddedToWishlist ? 's' : 'r'} fa-heart`}></i></div> 
      </div>
      <div className="price-tag">{computeWithPackSize().DiscountPer}% off</div>
      <div className="product-details" style={{fontSize: '0.9em'}}>
        {globalData.location.LocationId ? <div className='price-box'>
          <h4>₹ {computeWithPackSize().SRate}</h4>
          <h6>₹ {computeWithPackSize().ItemMRP}</h6>
          <ul className="ratings d-flex justify-content-between mb-0 p-0 text-warning list-unstyled ms-auto" style={{"fontSize": "0.8em"}}>
            <li><i className="fas fa-star"></i></li>
            <li><i className="fas fa-star"></i></li>
            <li><i className="fas fa-star"></i></li>
            <li><i className="fas fa-star"></i></li>
            <li><i className="fas fa-star-half-alt"></i></li>
          </ul>
        </div> : ''}
        <Link to={`/productPage/${data.ItemId}`}><h5>{data.Description}</h5></Link>
        {globalData.location.LocationId ? 
            computeWithPackSize().StockQty ? <p className='stock-label'><i className='bx bxs-message-check text-success' title={computeWithPackSize().StockQty}></i> Available in Stock</p> : <p className='stock-label'><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>
        : ''}
      </div>
      <div className="cart-action mt-0">
        <div className="btn-box">
          <button className={`btn btn-main btn-round-full ${!globalData.location.LocationId || computeWithPackSize().StockQty ? '' : 'opacity-50 pe-none'}`} onClick={handleAdd}>{isAddedToCart ? 'ADDED TO CART' : 'ADD TO CART'}</button>
          <button className={`btn btn-main btn-round-full add-wishlist-btn ${!globalData.location.LocationId || computeWithPackSize().StockQty ? '' : 'opacity-50 pe-none'}`} onClick={buyNow}>BUY NOW</button>
        </div>
      </div>
    </div>
  )
}

function DocPreviewCard({ data, bookingInfoAction, modalAction }) {

  const handleBooking = () => {
    bookingInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: '', companyId: '', selectedAppnDate: ''}); 
    modalAction('APPN_BOOKING_MODAL', true);
  }

  return (
    <div className="card dash-card">
      <div className="card-header">
        <p>Total :<span className='text-info'>8</span></p>
        <p>Today :<span style={{color: '#ff9800'}}>8</span></p>
        <p>Booking :<span className='text-danger'>8</span></p>
        <i className="far fa-eye" style={{fontSize: '0.9em', cursor: 'pointer'}}></i>
      </div>
      <div className="card-body">
        <div className="dash-widget dct-border-rht mb-0 pb-0 border-0">
          <Link className='img-box' to={`/doctors/${data.PartyCode}`}>
            <img src={data.PhotoUrl !== '' ? data.PhotoUrl : '/img/DOC.png'} className="img-fluid" alt="patient"/>
          </Link>
          <div className="dash-widget-info overflow-hidden">
            <Link to={`/doctors/${data.PartyCode}`} title={data.Name}><h6>{data.Name}</h6></Link>
            <h3 title={data.SpecialistDesc}>{data.SpecialistDesc}&nbsp;</h3>
            <p className="text-muted" title={data.Qualification}>{data.Qualification}&nbsp;</p>
          </div>
        </div>
      </div>
      <div className="clinic-booking">
        <Link className="view-pro-btn my-0" onClick={() => {modalAction('SCHEDULE_MODAL', true)}} to="#">View Schedule</Link>
        <Link className="apt-btn my-0" to="#" onClick={handleBooking}>Book Appointment</Link>
      </div>
    </div>
  )
}

export function DashboardAppnListCard({ data, styles }) {

  const [active, setActive] = useState(false);
  const [collapse, setCollapse] = useState(true);

  const FollowUp = ({ handleClose }) => {
  
    return (
      <div className="modal-body" style={{padding: '1.2em clamp(0.7em, 2vw, 1.2em) 1.2em'}}>
        <div className="card appn-preview mb-0">
          <h4 className="card-title mb-0"><i className="bx bxs-calendar px-1"></i> Follow UP</h4>
          <div className="card-body follow-up d-grid" style={{fontSize: '0.73em', padding: '0.8em 2px', gridTemplateColumns: 'repeat(auto-fit, minmax(327px, 1fr))', gap: '1em'}}>
            {/* <div className='dashboard-card member-box p-0 border-0 mt-0 mb-2'>
              <ul className="list-unstyled mb-0" style={{overflow: 'auto', maxHeight: '40.9rem'}}>
                <li style={{ background: '#e0feff', fontWeight: 500 }}>
                  <span>Test Name</span>
                  <span>Amount</span>
                  <span>Test Date</span>
                  <span>Status</span>
                  <span>Action</span>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-between py-2" style={{fontSize: '1.2em'}}>
              <h4 className="card-title mb-0">Test Date</h4>
              <h4 className="card-text h4">12/06/2023</h4>
            </div> */}
            <div>
              <h5>Under Doct Remarks</h5>
              <p>Lorem Ipsum is simply dummy text</p>
            </div>
            <div>
              <h5>Diagnosis</h5>
              <p>Lorem Ipsum is simply dummy text</p>
            </div>
            <div>
              <h5>Follow Up Remarks</h5>
              <p>Lorem Ipsum is simply dummy text</p>
            </div>
            <div>
              <h5>Next Appointment Date</h5>
              <p className='d-flex justify-content-between align-items-center text-sky-600' style={{gap: '0.5em', fontSize: '1.3em', padding: '0.5em 1em'}}><i className='bx bxs-calendar text-6'></i> 11/05/2025 <i className='bx bx-time-five ms-auto text-6'></i>10:43 AM</p>
            </div>
            <div>
              <h5>Reffered To</h5>
              <p>Lorem Ipsum is simply dummy text</p>
            </div>
            <div>
              <h5>Dept. / Procedure To</h5>
              <p>Lorem Ipsum is simply dummy text</p>
            </div>
            <div>
              <h5>Location / Branch Clinic To</h5>
              <p>Lorem Ipsum is simply dummy text</p>
            </div>
            <button type="button" className="btn btn-primary d-block btnSave fw-bold ms-auto height-fit mt-auto px-5 text-6" onClick={() => handleClose(false)} tabIndex={1} style={{ borderRadius: '0' }} > CLOSE </button>
          </div>
          {/* <div className="mt-2 d-flex justify-content-between">
            <button type="button" onClick={() => {}} className="btn btn-primary d-block btnSave fw-bold" tabIndex={1} style={{ borderRadius: '0' }} > PREVIOUS </button>
            <button type="button" className="btn btn-primary d-block btnSave fw-bold ms-auto" onClick={() => handleClose(false)} tabIndex={1} style={{ borderRadius: '0' }} > CLOSE </button>
          </div> */}
        </div>
      </div>
    )
  }
  
  return (
    <div className={`dashboard-card position-relative h-fit collapsable ${collapse || 'open'}`} style={styles}>
      <div className='dashboard-card__img-box cursor-pointer' onClick={() => setCollapse(!collapse)} >
        <img src="/img/user_unknown.png" alt="User" />
        <div className="img">
          <Link to={`/doctors/${data.AppointmentToId}`} title={data.AppointmentTo}>{data.AppointmentTo}</Link>
          <span>{data.DocSpecialistDesc}</span>
          {/* <span>{data.DocQualification}</span>                                  
          <span>{data.DocMobile}</span>     */}
          <span className='my-1' style={{fontSize: '1.2em'}}>{data.PartyName}</span>                                 
          <span className='d-flex gap-3' style={{fontSize: '1.15em'}}><span>{new Date(data.NextAppDate).toLocaleDateString('en-TT')}</span><span> {data.NextAppTime}</span></span>
        </div>
      </div>
      <i className='bx bxs-chevron-right position-absolute pe-none' style={{ right: '0.4em', top: '1em', fontSize: '3.4em', color: 'var(--tw-slate-500)', transition: '0.5s ease-in-out', transform: collapse || 'rotate(-90deg)' }}></i>
      <div className={`dashboard-card__content-box`} style={{fontSize: '1.15em'}}>
        <p>Patient Name : <span style={{color: 'var(--clr-34)'}}> {data.PartyName}</span></p>
        <p>MRD : <span>{data.UHID}</span></p>
        <p>Reference No. : <span>{data.TranNo}</span></p>
        <p>App Date : <span><i className='bx bxs-calendar'></i> {new Date(data.NextAppDate).toLocaleDateString('en-TT')}</span><span><i className='bx bx-time-five'></i> {data.NextAppTime}</span></p>
        <p>Service Department : <span>{data.DeptName}</span></p>
        <p>Appointment Status : <span className='badge badge-pill' style={{background: data.IsAppConfirmed === 'Y' ? '#00ad44' : '#009efb'}}>{ data.IsAppConfirmed === 'Y' ? 'Confirmed' : 'Booked' }</span></p>
        <p>Service Status : <span className='badge badge-pill' style={{background: data.Status === 'Y' ? '#00ad44' : '#f29101'}}>{ data.Status === 'Y' ? 'Done' : 'Pending' }</span></p>
        <div className="dashboard-card__btn-box mt-auto pt-3">
          {/* {data.PrescriptionId !== 0 && <Link to={`/prescription/${data.PrescriptionId}`} className='dashboard-card__btn-box-item' style={{'--clr': '#149A8D', '--bg': '#48fffc3b', '--bClr': '#149a8d57'}}>Prescription</Link>} */}
          <Link to={`/prescription/${data.PrescriptionId}`} className={`dashboard-card__btn-box-item ${!data.PrescriptionId ? `opacity-50 pe-none` : ''}`} style={{'--clr': '#149A8D', '--bg': '#48fffc3b', '--bClr': '#149a8d57'}}>Prescription</Link>
          <Link to={`/invoices/${data.BillId}?type=OPD`} className={`dashboard-card__btn-box-item ${!data.BillId ? `opacity-50 pe-none` : ''}`} style={{'--clr': '#26AE24', '--bg': '#3cf7a952', '--bClr': '#26ae2454'}}>Bill</Link>
          {data.IsAppConfirmed !== 'Y' && <Link to={`#`} className='dashboard-card__btn-box-item' style={{'--clr': '#E80202', '--bg': '#ffbcbc63', '--bClr': '#ff33333d'}}>Cancel</Link>}
          {/* <Link to={`#`} onClick={() => setActive(true)} className='dashboard-card__btn-box-item' style={{'--clr': '#d63af1', '--bg': '#fce8ff', '--bClr': '#f2a9ff'}}><i className='bx bxs-calendar'></i></Link> */}
          {/* <div className='hover-dropdown'>
            <Link to='#' className='dashboard-card__btn-box-item' style={{'--clr': '#26AE24', '--bg': '#3cf7a952', '--bClr': '#26ae2454'}}>DETAILS</Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="#"><i className='bx bx-user-circle' style={{'--clr': '#0494f9'}}></i> Follow UP</Link></li>
              <li><Link className="dropdown-item" onClick={toggleMember} to="/specialists"><i className='bx bx-calendar-check' style={{'--clr': '#0494f9'}}></i> Book Appointments</Link></li>
              <li><Link className="dropdown-item" onClick={toggleMember} to="/labTests"><i className='bx bx-test-tube' style={{'--clr': '#ab54fd'}}></i> Book Lab Tests</Link></li>
            </ul>
          </div> */}
        </div>
      </div>  
      {active && <MyModal width='48em' name='FOLLOW_UP' handleClose={() => setActive(false)} customClass='booking-modal' child={<FollowUp handleClose={() => setActive(false)} />} closeIcon={false}/>} 
    </div>
  )
}

const PreviewBox = ({ RefId, compCode, locationId, handleClose }) => {

  const [tests, setTests] = useState({loading: true, data: {enqObj: []}, err: {status: false, msg: ''}});

  const getLabData = async (query, companyId, locId) => {
      const res = await getFrom(`${BASE_URL}/api/Appointment/Get?EnqId=${query}&CID=${companyId}&LOCID=${locId}`, {}, setTests);
      if (res) {
          setTimeout(() => {
            setTests(res);            
          }, 400)
      }
  }
  
  const renderData = (data) => {    
    if (data.loading) return <Skeleton count={10} />
    else if ( data.data.enqObj.length) return <h3>No Tests found..</h3>
    else {
      return data.data.enqObj.EnquiryDetailsList.map(i => (
        <li key={i.LocationItemId}>
          <span> {i.ItemDesc}</span>
          <span>₹ {(i.BillQty * i.Rate).toFixed(2)}</span>
          <span>{new Date(i.TranDate).toLocaleDateString('en-TT')}</span>
          {/* <span>{i.MRPRate}</span> */}
          <span className='badge badge-pill' style={{background: i.Status === 'Y' ? '#00ad44' : '#f29101'}}>{ i.Status === 'Y' ? 'Done' : 'Pending' }</span>
          <span><i className='bx bx-trash text-danger' title="Delete"></i></span>
          {/* <Link to={`/reports?type=INVESTIGATION&id=${data.BillId}`}><i className='bx bx-file text-danger' title="Delete"></i></Link> */}
        </li>
      ))
    }
  }

  useEffect(() => {
    getLabData(RefId, compCode, locationId);
  },[RefId, compCode, locationId])

  return (
    <div className="modal-body" style={{padding: '1.5em clamp(0.7em, 2vw, 1.2em) 0.6em'}}>
      <div className="card appn-preview mb-0">
        <h4 className="card-title mb-2"><i className="fas fa-flask px-1"></i> Tests Included</h4>
        <div className="card-body" style={{fontSize: '0.73em', padding: '2px'}}>
          <div className='dashboard-card member-box p-0 border-0 mt-0 mb-2'>
            <ul className="list-unstyled mb-0" style={{overflow: 'auto', maxHeight: '40.9rem'}}>
              <li style={{ background: '#e0feff', fontWeight: 500 }}>
                <span>Test Name</span>
                <span>Amount</span>
                <span>Test Date</span>
                <span>Status</span>
                <span>Action</span>
              </li>
              {renderData(tests)}
            </ul>
          </div>
          {/* <div className="d-flex justify-content-between py-2" style={{fontSize: '1.2em'}}>
            <h4 className="card-title mb-0">Test Date</h4>
            <h4 className="card-text h4">12/06/2023</h4>
          </div> */}
        </div>
        <div className="mt-2 d-flex justify-content-between">
          {/* <button type="button" onClick={() => {}} className="btn btn-primary d-block btnSave fw-bold" tabIndex={1} style={{ width: "48%", borderRadius: '0' }} > PREVIOUS </button> */}
          <button type="button" onClick={handleClose} className="btn btn-primary d-block btnSave fw-bold ms-auto" tabIndex={1} style={{ borderRadius: '0' }} > CLOSE </button>
        </div>
      </div>
    </div>
  )
}

export function TestAppnCard({ data, compCode, locationId }) {
  const [preview, setPreview] = useState(false);
  
  return (
    <div className='dashboard-card p-0 border-0 test-appn-card'>
      <h4>Patient Name : <span> {data.PartyName}</span></h4>
      <div className="dashboard-card__content-box">
        {/* <p style={{fontSize: '1.3em'}}>Patient Name : <span style={{color: 'var(--clr-34)'}}> {data.PartyName}</span></p> */}
        <p>MRD : <span>{data.UHID}</span></p>
        <p>Reference No. : <span>{data.TranNo}</span></p>
        <p>App Date : <span><i className='bx bxs-calendar'></i> {data.NextAppDate.split('T')[0] + " "}</span></p>
        <p>Service Department : <span>{data.DeptName}</span></p>
        <p>Bill Status : <span className='badge badge-pill' style={{background: data.IsAppConfirmed === 'Y' ? '#00ad44' : '#009efb'}}>{ data.IsAppConfirmed === 'Y' ? 'Confirmed' : 'Processing...' }</span></p>
        <p>Service Status : <span className='badge badge-pill' style={{background: data.Status === 'Y' ? '#00ad44' : '#f29101'}}>{ data.Status === 'Y' ? 'Done' : 'Pending' }</span></p>
        <div className="dashboard-card__btn-box mt-auto">
          <Link to={`#`} onClick={() => setPreview(true)} className='dashboard-card__btn-box-item' style={{'--clr': '#149A8D', '--bg': '#48fffc3b', '--bClr': '#149a8d57'}}>View Details</Link>
          {data.BillId ? <Link to={`/invoices/${data.BillId}?type=INVESTIGATION`} className={`dashboard-card__btn-box-item`} style={{'--clr': '#26AE24', '--bg': '#3cf7a952', '--bClr': '#26ae2454'}}>Bill</Link> : ''}
          {data.IsAppConfirmed !== 'Y' && <Link to={`#`} className='dashboard-card__btn-box-item' style={{'--clr': '#E80202', '--bg': '#ffbcbc63', '--bClr': '#ff33333d'}}>Cancel</Link>}
          {data.BillId ? <Link className='dashboard-card__btn-box-item' style={{'--clr': '#008bba', '--bg': '#ccf2ff', '--bClr': '#72dcff'}} to={`/reports?type=INVESTIGATION&id=${data.BillId}`}><i className='bx bx-file' title="View Report"></i></Link> : ''}
        </div>
      </div> 
      {preview && <MyModal name='LABTEST_BOOK_MODAL' handleClose={() => setPreview(false)} customClass='booking-modal' child={<PreviewBox handleClose={() => setPreview(false)} RefId={data.RefId} compCode={compCode} locationId={locationId}  />} closeIcon={false}/>} 
    </div>
  )
}

export function PatientAppnListCard({ data }) {
  return (
    <div className='dashboard-card'>
      <div className='dashboard-card__img-box'>
        <img src="/img/user_unknown.png" alt="User" style={{maxHeight: '6.8em'}}/>
        <div className="img">
          <Link to={'#'} title={data.PartyName}>{data.PartyName}</Link>          {/* to={`/doctors/${data.AppointmentToId}`} */}
          <span>Patient ID : {data.PartyCode}</span>
          <span>{data.Address}</span>                                  {/* <i className='bx bxs-book-reader'></i> */}
          <span>{data.MobileNo1} </span>                                         {/* <i className='bx bxs-phone-call'></i> */}
        </div>
      </div>
      <div className="dashboard-card__content-box">
        <p>App Date : <span><i className='bx bxs-calendar'></i> {data.NextAppDate.split('T')[0] + " "}</span><span><i className='bx bx-time-five'></i> {data.NextAppTime}</span></p>
        <p>MRD : <span>{data.UHID}</span></p>
        <p>Reference No. : <span>{data.TranNo}</span></p>
        <p>Service Department : <span>{data.DeptName}</span></p>
        <p>Appointment Status : <span className='badge badge-pill' style={{background: data.IsAppConfirmed === 'Y' ? '#00ad44' : '#009efb'}}>{ data.IsAppConfirmed === 'Y' ? 'Confirmed' : 'Booked' }</span></p>
        <p>Service Status : <span className='badge badge-pill' style={{background: data.Status === 'Y' ? '#00ad44' : '#f29101'}}>{ data.Status === 'Y' ? 'Done' : 'Pending' }</span></p>
        <p>Clinic Name : <span>{data.CompanyName}</span></p>
        <div className="dashboard-card__btn-box mt-auto">
          {/* {data.PrescriptionId !== 0 && <Link to={`/prescription/${data.PrescriptionId}`} className='dashboard-card__btn-box-item' style={{'--clr': '#149A8D', '--bg': '#48fffc3b', '--bClr': '#149a8d57'}}>Prescription</Link>} */}
          <Link to={`/prescription/${data.PrescriptionId}`} className='dashboard-card__btn-box-item' style={{'--clr': '#149A8D', '--bg': '#48fffc3b', '--bClr': '#149a8d57'}}>Prescription</Link>
          {/* <Link to={`/prescription`} className='dashboard-card__btn-box-item' style={{'--clr': '#26AE24', '--bg': '#3cf7a952', '--bClr': '#26ae2454'}}>Bill</Link> */}
          {data.IsAppConfirmed !== 'Y' && <Link to={`/prescription`} className='dashboard-card__btn-box-item' style={{'--clr': '#E80202', '--bg': '#ffbcbc63', '--bClr': '#ff33333d'}}>Cancel</Link>}
        </div>
      </div>  
    </div>
  )
}

export const MemberCard = ({ data, modalAction, mode='', userInfoAction, selected='', userType }) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className={`dashboard-card member-card position-relative h-fit collapsable ${collapse || 'open'}`}>
      <div className='dashboard-card__img-box cursor-pointer' onClick={() => setCollapse(!collapse)}>
        <img src="/img/user_unknown.png" alt="User"/>
        <div className="img">
          <Link className='position-relative' to={`#`} onClick={() => modalAction('MEMBER_PROFILE_MODAL', true, {tab: 'appointments', memberId: data.MemberId})} title={data.MemberName}>
            {data.MemberName}&nbsp;
            {/* {userType.toLowerCase() === uType.PATIENT.level.toLowerCase() && ` (${data.RelationShipWithHolder})`} */}
            {selected && (data.MemberId === selected) && <span className="position-absolute top-0 p-1 border border-light rounded-circle" style={{background: '#ff007f', left: '102%'}}></span>}
          </Link>
          {data.UHID && <span>UHID : {data.UHID}</span>}
          <p className='mb-0'>{data.RelationShipWithHolder}</p>
        </div>
      </div>
      <i className='bx bxs-chevron-right position-absolute pe-none' style={{ right: '0.4em', top: '0.76em', fontSize: '3.4em', color: 'var(--tw-slate-500)', transition: '0.5s ease-in-out', transform: collapse || 'rotate(-90deg)' }}></i>
      <div className={`dashboard-card__content-box`} style={{fontSize: '1.15em'}}>
        <p>Gender : <span style={{color: 'var(--clr-34)'}}> {data.GenderDesc}</span></p>
        <p>DOB : <span style={{color: 'var(--clr-34)'}}>{new Date(data.DOB).toLocaleDateString('es-CL')}</span></p>
        <p>Mobile : <span style={{color: 'var(--clr-34)'}}>{data.Mobile}</span></p>
        {/* <p>Aadhaar : <span style={{color: 'var(--clr-34)'}}>{data.Aadhaar}</span></p> */}
        <p className='text-nowrap'>Address : <span style={{color: 'var(--clr-34)', whiteSpace: 'wrap'}}>{data.Address}</span></p>
        {/* <p>Landmark : <span style={{color: 'var(--clr-34)'}}>{data.Landmark}</span></p> */}
        <p>City : <span> {data.City}</span> &nbsp;&nbsp;&nbsp;Country: <span> {data.CountryDesc}</span></p>
        {/* <p>Appointment Status : <span className='badge badge-pill' style={{background: data.IsAppConfirmed === 'Y' ? '#00ad44' : '#009efb'}}>{ data.IsAppConfirmed === 'Y' ? 'Confirmed' : 'Booked' }</span></p> */}
        {/* <p>Service Status : <span className='badge badge-pill' style={{background: data.Status === 'Y' ? '#00ad44' : '#f29101'}}>{ data.Status === 'Y' ? 'Done' : 'Pending' }</span></p> */}
        <div className="dashboard-card__btn-box mt-auto">
          {/* {data.PrescriptionId !== 0 && <Link to={`/prescription/${data.PrescriptionId}`} className='dashboard-card__btn-box-item' style={{'--clr': '#149A8D', '--bg': '#48fffc3b', '--bClr': '#149a8d57'}}>Prescription</Link>} */}
          {mode === 'provider_dashboard' ? <HoverDropdown modalAction={modalAction} member={data} userInfoAction={userInfoAction} /> : ''}
          <Link to={`#`} onClick={() => modalAction('MEMBER_MODAL', true, {editId: data.MemberId})} className='dashboard-card__btn-box-item icon-btn' style={{'--clr': '#149A8D', '--bg': '#48fffc3b', '--bClr': '#149a8d57'}} title='Edit Member'><i className='bx bx-edit-alt'></i></Link>
          <Link to={`#`} className='dashboard-card__btn-box-item icon-btn' style={{'--clr': '#E80202', '--bg': '#ffbcbc63', '--bClr': '#ff33333d'}} title='Delete Member'><i className='bx bx-trash'></i></Link>
        </div>
      </div>  
    </div>
  )
}

function SpecialistPreviewCard({ data, reviews, bookingInfoAction, modalAction, isLoggedIn, userInfo, activeCompanyId, userInfoAction, selectedDate, compCode }) {
	const [tabActive, setTabActive] = useState('doc_overview'); 
  const handleBooking = (e) => {
    bookingInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: '', companyId: activeCompanyId, selectedAppnDate: selectedDate}); 
    modalAction('APPN_BOOKING_MODAL', true);
    stopPropagation(e);
  }

  return (
    <div className="card dash-card">
      <div className="card-header">
        <p>FEES :<span className='text-info'>{data.Rate}</span></p>
        {/* <p>Today :<span style={{color: '#ff9800'}}>8</span></p><p>Booking :<span className='text-danger'>8</span></p> */}
        <Link to={`/doctors/${data.PartyCode}`}><i className="far fa-eye" style={{fontSize: '0.9em', cursor: 'pointer'}}></i></Link>
      </div>
      <div className="card-body">
        <div className={`dash-widget dct-border-rht mb-0 pb-0 border-0`}>
          <Link className='img-box' to={`/doctors/${data.PartyCode}`}>
            <img src={data.PhotoUrl !== '' ? data.PhotoUrl : '/img/DOC.png'} className="img-fluid" alt="patient"/>
          </Link>
          <div className={`dash-widget-info items-start overflow-hidden ${compCode === BCROY_ID && 'use_bangla'}`}>
            <Link className='notranslate' to={`/doctors/${data.PartyCode}`} title={data.Name}><h6>{data.Name}</h6></Link>
            <h3 title={data.SpecialistDesc}>{data.SpecialistDesc}</h3>
            <p className="text-muted" title={data.Qualification}>{data.Qualification}</p>
            {data.PrescriptionFooter && <div className='mt-1' dangerouslySetInnerHTML={{ __html: data.PrescriptionFooter}}></div>}
          </div>
        </div>
      </div>
      <div className="clinic-booking">
        {/* onClick={() => {userInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: null}); modalAction('SCHEDULE_MODAL', true)}} */}
        <Link className="view-pro-btn my-0" to={`/doctors/${data.PartyCode}/${data.SpecialistId !== '' ? `?specialistId=${data.SpecialistId}` : ''}`}>View Doctor</Link>
        <Link className={`apt-btn my-0`} to="#" onClick={(e) => handleBooking(e)}>
          {/* {compCode === BCROY_ID ? "Doctor's Schedule" : "Book Appointment"} */}
          Book Appointment
        </Link>
      </div>
      {compCode === defaultId ? <>
        <ul className="nav nav-tabs card-nav new-style" role="tablist" style={{display: compCode === ASTHA_ID ? 'none' : ''}}>
          <li className="nav-item" role="presentation">
            <button type="button" className={`nav-link ${tabActive === 'Clinics' ? 'active' : ''}`} onClick={() => setTabActive(tabActive === 'Clinics' ? '' : 'Clinics')}>Clinics <i className='bx bx-x-circle'></i></button>
          </li>
          <li className="nav-item" role="presentation">
            <button type="button" className={`nav-link ${tabActive === 'Stories' ? 'active' : ''}`} onClick={() => setTabActive(tabActive === 'Stories' ? '' : 'Stories')}>Stories <i className='bx bx-x-circle'></i></button>
          </li>
          <li className="nav-item" role="presentation">
            <button type="button" className={`nav-link ${tabActive === 'Consult' ? 'active' : ''}`} onClick={() => setTabActive(tabActive === 'Consult' ? '' : 'Consult')}>Consult <i className='bx bx-x-circle'></i></button>
          </li>
          <li className="nav-item" role="presentation">
            <button type="button" className={`nav-link ${tabActive === 'Reviews' ? 'active' : ''}`} onClick={() => {setTabActive(''); modalAction('DOC_DETAILS_MODAL', true, 'doc_reviews')}}>Reviews <i className='bx bx-x-circle'></i></button>
          </li>
          <li className="nav-item" role="presentation">
            <button type="button" className={`nav-link ${tabActive === 'YourStories' ? 'active' : ''}`} onClick={() => setTabActive(tabActive === 'YourStories' ? '' : 'YourStories')}>Your Stories <i className='bx bx-x-circle'></i></button>
          </li>
        </ul>
        <div className="tab-content card-navTab">
          <div id={`tabFade-pane-1-${data.PartyCode}`} className={`tab-pane fade ${tabActive === 'Clinics' ? 'show active' : ''}`} role="tabpanel" aria-labelledby={`tabFade-1-${data.PartyCode}`}>
            <ul className='clinic-list list-unstyled'>
              <li className="clinic-list-item">
                <div>
                  <h4>Clinic 1 : <span>XYZ Multispeciality Hospital</span></h4>
                  <p>Address : <span>96 L, S.P. Mukherjee Road, Kolkata - 700 140</span></p>
                  <p>Time Schedule : <span className='time-mark'>2 : 30 pm - 5 : 30 pm</span></p>
                  <p className='availibility'>Availibility : <i className='bx bxs-check-circle'></i> Available</p>
                </div>
              </li>
              <li className="clinic-list-item">
                <div>
                  <h4>Clinic 2 : <span>Minati Polyclinic & Diagnostic Centre</span></h4>
                  <p>Address : <span>No. 32, Foreshore Road, P. O. B Garden, Shibpur, Howrah - 711102</span></p>
                  <p>Time Schedule : <span className='time-mark'>7 : 30 pm - 9 : 30 pm</span></p>
                  <p className='availibility'>Availibility : <i className='bx bxs-x-square text-danger'></i> Unavailable</p>
                </div>
              </li>
            </ul>
          </div>
          <div id={`tabFade-pane-2-${data.PartyCode}`} className={`tab-pane fade ${tabActive === 'Stories' ? 'show active' : ''}`} role="tabpanel" aria-labelledby={`tabFade-2-${data.PartyCode}`}>
            <p className='mb-0'>No Stories found.</p>
          </div>
          <div id={`tabFade-pane-3-${data.PartyCode}`} className={`tab-pane fade ${tabActive === 'Consult' ? 'show active' : ''}`} role="tabpanel" aria-labelledby={`tabFade-3-${data.PartyCode}`}>
            <p className='mb-0'>Consult</p>
          </div>
          <div id={`tabFade-pane-4-${data.PartyCode}`}  className={`in-card reviews-page tab-pane fade ${tabActive === 'Reviews' ? 'show active' : ''}`} role="tabpanel" aria-labelledby={`tabFade-4-${data.PartyCode}`}>
              {/* <h4 className="mt-2 mt-md-3 mb-1">Overall Customer Ratings</h4>
              <div className='top-section-wrapper'>
                <div className="top-section d-flex">
                  <div className="reviews-total">
                    <h1>{overallRating}</h1>
                    <div className="stars">
                      {allStars.map((i, n) => i === 'full' ? <i key={n} className='bx bxs-star'></i> : i === 'half' ? <i key={n} className='bx bxs-star-half'></i> : <i key={n} className='bx bx-star'></i>)}
                    </div>
                    <p>({reviewDataArray.length} reviews)</p>
                    <svg className="bar-circle" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="bar-circle-bg" d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#ecececc9" strokeWidth="4"/>
                      <path className="bar-circle-stroke" style={{strokeDashoffset: tabActive === 'Reviews' ? starsInRadians : ''}} d="M128 64.5C124.8 13.7 84.6667 1 65 1C14.6 2.6 1.33333 44 1 64.5C3.8 115.3 44.8333 128 65 128C115.8 124.8 128.167 84.3333 128 64.5Z" stroke="#FFBF1C" strokeWidth="4"/>
                    </svg>
                  </div>
                  <div className="review-bars w-100">
                    <div className="bar-item">
                      <span>5</span> <i className='bx bxs-star'></i>
                      <div className="progress">
                        <div className="progress-bar bg-transparent" style={{width: '100%'}} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                          <div className="h-100 bg-warning" style={{animation: tabActive === 'Reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                        </div>
                      </div>
                      <span>{rating_5}</span>
                    </div>
                    <div className="bar-item">
                      <span>4</span> <i className='bx bxs-star'></i>
                      <div className="progress">
                        <div className="progress-bar bg-transparent" style={{width: '80%'}} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                          <div className="h-100 bg-warning" style={{animation: tabActive === 'Reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                        </div>
                      </div>
                      <span>{rating_4}</span>
                    </div>
                    <div className="bar-item">
                      <span>3</span> <i className='bx bxs-star'></i>
                      <div className="progress">
                        <div className="progress-bar bg-transparent" style={{width: '60%'}} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                          <div className="h-100 bg-warning" style={{animation: tabActive === 'Reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                        </div>
                      </div>
                      <span>{rating_3}</span>
                    </div>
                    <div className="bar-item">
                      <span>2</span> <i className='bx bxs-star'></i>
                      <div className="progress">
                        <div className="progress-bar bg-transparent" style={{width: '40%'}} role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                          <div className="h-100 bg-warning" style={{animation: tabActive === 'Reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                        </div>
                      </div>
                      <span>{rating_2}</span>
                    </div>
                    <div className="bar-item mb-0">
                      <span>1</span> <i className='bx bxs-star'></i>
                      <div className="progress">
                        <div className="progress-bar bg-transparent" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <div className="h-100 bg-warning" style={{animation: tabActive === 'Reviews' ? 'scaleWidth 1.5s ease-in-out 0.5s 1 forwards' : ''}}></div>
                        </div>
                      </div>
                      <span>{rating_1}</span>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="my-2">Customer Reviews</h4>
              <div className="widget review-listing mt-0">
                <ul className="comments-list">
                  {reviewDataArray.map(item => (<li key={item.id}><CommentsCard review={item} handleAction={handleAction} userId={userInfo.UserId}/></li>))}
                </ul>
                <div className="all-feedback text-center d-flex flex-column flex-md-row gap-3 gap-md-5 justify-content-center align-items-center">
                  <Link to="#" className="btn btn-primary btn-sm">
                    Show all feedback <strong>(167)</strong>
                  </Link>
                  {!isLoggedIn && <Link to="#" className="btn btn-primary btn-sm">
                    Login to Write a Review
                  </Link>}
                </div>									
              </div>  
              {isLoggedIn && <div className="write-review">
                <h4>Write a review for <strong>Dr. Darren Elder</strong></h4>
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <label>Review</label>
                    <div className="star-rating">
                      <i className={`bx bx${rating[0] ? 's' : ''}-star`} onClick={() => setRating([true, false, false, false, false])}></i>
                      <i className={`bx bx${rating[1] ? 's' : ''}-star`} onClick={() => setRating([true, true, false, false, false])}></i>
                      <i className={`bx bx${rating[2] ? 's' : ''}-star`} onClick={() => setRating([true, true, true, false, false])}></i>
                      <i className={`bx bx${rating[3] ? 's' : ''}-star`} onClick={() => setRating([true, true, true, true, false])}></i>
                      <i className={`bx bx${rating[4] ? 's' : ''}-star`} onClick={() => setRating([true, true, true, true, true])}></i>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Title of your review</label>
                    <input className="form-control" onChange={(e) => handleReview(e)} value={review.title} name='title' type="text" placeholder="If you could say it in one sentence, what would you say?"/>
                  </div>
                  <div className="form-group">
                    <label>Your review</label>
                    <textarea id="review_desc" onChange={(e) => handleReview(e)} value={review.content} name='content' maxLength="100" className="form-control"></textarea>											  
                  <div className="d-flex justify-content-between mt-3"><small className="text-muted"><span id="chars">100</span> characters remaining</small></div>
                  </div>
                  <hr/>
                  <div className="form-group">
                    <div className="terms-accept">
                      <div className="custom-checkbox">
                      <input type="checkbox" id="terms_accept"/>
                      <label htmlFor="terms_accept">I have read and accept <Link to="#">Terms &amp; Conditions</Link></label>
                      </div>
                    </div>
                  </div>
                  <div className="submit-section mb-3 d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary submit-btn">Add Review</button>
                    <button type="submit" className="btn btn-primary submit-btn">Close</button>
                  </div>
                </form>
              </div>}						 */}
          </div>
          <div id={`tabFade-pane-5-${data.PartyCode}`} className={`tab-pane fade ${tabActive === 'YourStories' ? 'show active' : ''}`} role="tabpanel" aria-labelledby={`tabFade-5-${data.PartyCode}`}>
            <p className='mb-0'>Share your stories</p>
          </div>
        </div>
      </> : ''}
    </div>
  )
}


export const QueueCard = ({ data }) => {
  return (
    <div className="card queue-card">
      <div className="card-header text-center">
        {data.DoctName}
        {/* <Link to="/" className='d-block'>{data.Qualification}&nbsp;</Link> */}
        <p>{data.Qualification}&nbsp;</p>
      </div>
      <div className="card-body">
        <div className='left'>
          <div>
            <h1>{data.TokenNo}</h1>
            <h2>{data.Name}</h2>
            <h3>{data.MPartyCode === '' ? '' : 'MRD No : '}{data.MPartyCode}</h3>
          </div>
        </div>
        <div className='right'>
          <div>
          <h1>{data.TokenNo2}</h1>
            <h2>{data.Name2}</h2>
            <h3>{data.MPartyCode2 === '' ? '' : 'MRD No : '}{data.MPartyCode2}</h3>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <h5 style={{fontWeight: 'bolder', color: '#009b00'}}>Current Token <i className='bx bxs-up-arrow-alt'></i></h5>
        <h5 style={{fontWeight: 'bolder', color: '#ca8300'}}><i className='bx bxs-up-arrow-alt'></i> Next Token</h5>
      </div>
    </div>
  )
}


// function HorizontalProfileCard({ data, userInfo, userInfoAction, modalAction, companyList }) {

//   const [activeCompany, setActiveCompany] = useState('');
//   useEffect(() => {
//     setActiveCompany(userInfo.selectedCompany.COMPNAME);
//   },[userInfo.selectedCompany.COMPNAME])

//   const selectCompany = (item) => {
//     setActiveCompany(item.COMPNAME);
//     userInfoAction({selectedCompany: item});
//   }

//   return (
//     <div className="card w-100 mb-0">
//         <div className="card-body">
//             <div className="doctor-widget">
//                 <div className="doc-info-left">
//                     <div className="doctor-img">
//                         <Link to={`/doctors/${data.PartyCode}`}>
//                             <img src={data.PhotoUrl !== '' ? data.PhotoUrl : '/img/DOC.png'} className="img-fluid" alt="Users"/>
//                         </Link>
//                     </div>
//                     <div className="doc-info-cont">
//                         <h4 className="doc-name"><Link to={`/doctors/${data.PartyCode}`}>{data.Name}</Link></h4>
//                         <p className="doc-speciality">{data.Qualification}&nbsp;</p>
//                         <h5 className="doc-department">
//                           {/* <img src="/img/specialities/specialities-05.png" className="img-fluid" alt="Speciality"/> */}
//                           {data.SpecialistDesc}&nbsp;
//                         </h5>
//                         <div className="rating">
//                             <i className="fas fa-star filled"></i>
//                             <i className="fas fa-star filled"></i>
//                             <i className="fas fa-star filled"></i>
//                             <i className="fas fa-star filled"></i>
//                             <i className="fas fa-star"></i>
//                             <span className="d-inline-block average-rating">(17)</span>
//                         </div>
//                         <div className="clinic-details">
//                           <ul className="clinic-gallery" >
//                                 {
//                                   companyList.map((item, index) => {
//                                     return (
//                                       <li key={index} onClick={() => selectCompany(item)}>
//                                         <div className={`d-flex pillButton align-items-center my-1 my-lg-0 ${item.COMPNAME === activeCompany ? 'active' : ''}`}>
//                                           <img src='img/logo/opd2.png' alt='clinicImage'/>
//                                           <h6 className='mb-0 ms-1'>{item.COMPNAME}</h6>
//                                         </div>
//                                       </li>
//                                     )
//                                   })
//                                 }

//                                 {/* <li>
//                                     <a href="/img/features/feature-01.jpg" className="gallery-zoom" data-fancybox>
//                                         <img src="/img/features/feature-01.jpg" alt="Feature"/>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a href="/img/features/feature-02.jpg" className="gallery-zoom" data-fancybox>
//                                         <img src="/img/features/feature-02.jpg" alt="Feature"/>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a href="/img/features/feature-03.jpg" className="gallery-zoom" data-fancybox>
//                                         <img src="/img/features/feature-03.jpg" alt="Feature"/>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a href="/img/features/feature-04.jpg" className="gallery-zoom" data-fancybox>
//                                         <img src="/img/features/feature-04.jpg" alt="Feature"/>
//                                     </a>
//                                 </li> */}
//                           </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="doc-info-right">
//                     <div className="clinic-booking">
//                         <Link className="view-pro-btn" to={`/doctors/${data.PartyCode}`}>View Profile</Link>
//                         <Link className="apt-btn" to="#" onClick={() => {userInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: null}); modalAction('APPN_BOOKING_MODAL', true);}}>Book Appointment</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

export const CommentsCard = ({ review, handleAction, userId }) => {

    const { id, name, date, stars, title, likes, dislikes, content } = review;

    const isLiked = likes.filter(i => i === userId);
    const isDisliked = dislikes.filter(i => i === userId);

    return (
        <div className="comment">
            <img className="avatar avatar-sm rounded-circle" alt="User Avatar" src="/img/DOC.png"/>
            <div className="comment-body">
                <div className="meta-data">
                    <img className="avatar avatar-sm rounded-circle" alt="User Avatar" src="/img/DOC.png"/>
                    <div>
                        <span className="comment-author">{name}</span>
                        <span className="comment-date">Reviewed {date} Days ago</span>
                        <div className="review-count rating">
                            <i className="fas fa-star filled"></i>
                            <i className={`fas fa-star ${stars >= 2 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${stars >= 3 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${stars >= 4 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${stars >= 5 ? 'filled' : ''}`}></i>

                            {/* <i className='bx bxs-star'></i>
                            <i className={`bx bx${stars >= 2 ? 's' : ''}-star`}></i>
                            <i className={`bx bx${stars >= 3 ? 's' : ''}-star`}></i>
                            <i className={`bx bx${stars >= 4 ? 's' : ''}-star`}></i>
                            <i className={`bx bx${stars >= 5 ? 's' : ''}-star`}></i> */}
                        </div>
                    </div>
                </div>
                {title !== '' && <p className="recommended"><i className="far fa-thumbs-up"></i> {title}</p>}
                <p className="comment-content">{content}</p>
                <div className="comment-reply">
                    <Link className="comment-btn" to="#">
                        <i className="fas fa-reply"></i> Reply
                    </Link>
                    <p className="recommend-btn">
                        Recommend ?
                        <span className="like-btn" onClick={() => handleAction('like', id, userId)}>
                             <i className={`${isLiked.length > 0 ? 'fas' : 'far'} fa-thumbs-up`}></i> {likes.length}
                        </span>
                        <span className="dislike-btn" onClick={() => handleAction('dislike', id, userId)}>
                             <i className={`${isDisliked.length > 0 ? 'fas' : 'far'} fa-thumbs-down`}></i> {dislikes.length}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

const PharmacyCartCard = ({ item, cartAction, wishlistAction }) => {
  const activePackSizeItem = item.ItemPackSizeList.find(i => i.CodeId === item.PackSizeId);
  const activePackSize = activePackSizeItem ? activePackSizeItem.Description : 'N/A';
  return (
    <div className="cart-item d-flex flex-column flex-sm-row p-3 mb-3 justify-content-between align-items-center">
      <div className="d-flex">
        <img style={{maxHeight: '4.5em', maxWidth: '5em'}} src={item.ItemImageURL || '/assets/img/fallback/no-image.png'} alt="urology"/>
        <div className="ms-4 ms-md-3">
        <Link to={`/productPage/${item.ItemId}`}><h4 style={{fontSize: '1em', lineHeight: '1.5em', marginBottom: '0', color: 'var(--clr-1)'}}>{item.Description}</h4></Link>
          <p style={{fontSize: '0.8em', margin: '0.1em 0 0.3em'}}>{activePackSize}</p>
          {item.StockQty ? <p className='stock-label mt-0' style={{fontSize: '0.77em'}}><i className='bx bxs-message-check text-success'></i> Available in Stock</p> : <p className='stock-label mt-0' style={{fontSize: '0.77em'}}><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-start gap-0 gap-sm-5" style={{fontSize: '0.95em'}}>
        <div className="text-center action text-nowrap">
          <h5 style={{fontSize: '0.95em'}}>Quantity</h5>
          <i className='bx bx-plus-circle' onClick={() => cartAction('ADD_ITEM', {...item, Qty: item.Qty + 1}, 'pharmacy')}></i>
          <span className="mx-2 mx-md-3" style={{fontSize: '0.9em'}}>{item.Qty}</span>
          <i className='bx bx-minus-circle' onClick={() => cartAction('ADD_ITEM', {...item, Qty: item.Qty === 1 ? 1 : item.Qty - 1}, 'pharmacy')}></i>
        </div>
        <div className="text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>MRP</h5>
          <h6 className="position-relative mb-0"style={{fontSize: '0.9em'}}>₹ {item.ItemMRP}</h6>
        </div>
        <div className="text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Discount</h5>
          <h6 className="position-relative mb-0"style={{fontSize: '0.9em'}}>₹ {item.DiscountPer}%</h6>
        </div>
        <div className="pe-3 pe-sm-4 text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Total</h5>
          <h6 className="text-white position-relative pricing-green mb-0" style={{"fontSize": "0.9em", "zIndex": "1"}}>₹ {(item.Qty*item.SRate).toFixed(2)}</h6>
        </div>
        <div className="floating-icons-box">
          {/* <span title='Add to Wishlist' onClick={() => {cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy'); wishlistAction('ADD_WISH_ITEM', item, 'pharmacy')}} style={{cursor: 'pointer'}}><i className="fas fa-heart"></i></span> */}
          <span title='Delete from Cart' onClick={() => cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy')} style={{cursor: 'pointer', color: 'orangered'}}><i className="fas fa-trash"></i></span>
        </div>
      </div>
    </div>
  )
}

const LabtestCartCard = ({ item, cartAction, wishlistAction, userInfo }) => {

  const isValid = (item.CompanyId === userInfo.selectedCompany.CompanyId);
  const [testDate, setTestDate] = useState(item.testDate);

  const handleDate = (date) => {
    setTestDate(date);
    cartAction('ADD_ITEM', {...item, testDate: date}, 'labTests')
  }
  
  return (
    <div className="cart-item d-flex flex-column flex-md-row p-3 justify-content-between align-items-center" style={{animation: isValid ? '' : 'blink 1.3s linear infinite', marginBottom: '2.1rem'}}>
      <div className="d-flex">
        <img className='rounded' style={{maxHeight: '4.5em', maxWidth: '5em', border: '1px solid #dbdbdb'}} src={item.ItemImageURL || '/assets/img/fallback/no-image.png'} alt="urology" title={item.CompanyId} />
        <div className="ms-4 ms-md-3">
        <Link to={`/productPage/${item.ItemId}`}><h4 style={{fontSize: '1em', lineHeight: '1.5em', marginBottom: '0', color: 'var(--clr-1)'}}>{item.Description}</h4></Link>
          <div className='d-flex gap-3 mt-1 mt-md-2 text-nowrap'>
            <p className='mb-0' style={{fontSize: '0.8em'}}>TEST DATE: </p>
            <JQDatePicker id={`test_date_${item.ItemId}`} handler={handleDate} curValue={testDate} name={`test_date_${item.ItemId}`} customClass={'form-control'} required style={{padding: '0.1em 0.5em', width: '8em', fontSize: '0.9em'}} />
          </div>
          {/* {item.StockQty ? <p className='stock-label mt-0' style={{fontSize: '0.77em'}}><i className='bx bxs-message-check text-success'></i> Available in Stock</p> : <p className='stock-label mt-0' style={{fontSize: '0.77em'}}><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>} */}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-start gap-0 gap-sm-5" style={{fontSize: '0.95em'}}>
        <div className="text-center action text-nowrap">
          <h5 style={{fontSize: '0.95em'}}>Quantity</h5>
          <i className='bx bx-plus-circle' onClick={() => cartAction('ADD_ITEM', {...item, Qty: item.Qty + 1}, 'labTests')}></i>
          <span className="mx-2 mx-md-3" style={{fontSize: '0.9em'}}>{item.Qty}</span>
          <i className='bx bx-minus-circle' onClick={() => cartAction('ADD_ITEM', {...item, Qty: item.Qty === 1 ? 1 : item.Qty - 1}, 'labTests')}></i>
        </div>
        <div className="text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>MRP</h5>
          <h6 className="position-relative mb-0"style={{fontSize: '0.9em'}}>₹ {item.ItemMRP}</h6>
        </div>
        <div className="text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Discount</h5>
          <h6 className="position-relative mb-0"style={{fontSize: '0.9em'}}>₹ {item.DiscountPer}%</h6>
        </div>
        <div className="pe-3 pe-sm-4 text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Total</h5>
          <h6 className="text-white position-relative pricing-green mb-0" style={{"fontSize": "0.9em", "zIndex": "1"}}>₹ {(item.Qty*item.SRate).toFixed(2)}</h6>
        </div>
        <div className="floating-icons-box">
          {/* <span title='Add to Wishlist' onClick={() => {cartAction('REMOVE_ITEM', item.LocationItemId, 'labTests'); wishlistAction('ADD_WISH_ITEM', item, 'labTests')}} style={{cursor: 'pointer'}}><i className="fas fa-heart"></i></span> */}
          <span title='Delete from Cart' onClick={() => cartAction('REMOVE_ITEM', item.LocationItemId, 'labTests')} style={{cursor: 'pointer', color: 'orangered'}}><i className="fas fa-trash"></i></span>
        </div>
      </div>
    </div>
  )
}

const WishlistCard = ({ item, cartAction, wishlistAction, productType }) => {
  const activePackSizeItem = item.ItemPackSizeList.find(i => i.CodeId === item.PackSizeId);
  const activePackSize = activePackSizeItem ? activePackSizeItem.Description : 'N/A';

  return (
    <div className="cart-item d-flex flex-column flex-sm-row p-3 mb-3 justify-content-between align-items-center">
      <div className="d-flex">
        <img style={{maxHeight: '4.5em', maxWidth: '5em'}} src={item.ItemImageURL || '/assets/img/fallback/no-image.png'} />
        <div className="ms-4 ms-md-3">
        <Link to={`/productPage/${item.ItemId}`}><h4 style={{fontSize: '1em', lineHeight: '1.5em', marginBottom: '0', color: 'var(--clr-1)'}}>{item.Description}</h4></Link>
          <p style={{fontSize: '0.8em', margin: '0.1em 0 0.3em'}}>{activePackSize}</p>
          {item.StockQty ? <p className='stock-label mt-0' style={{fontSize: '0.77em'}}><i className='bx bxs-message-check text-success'></i> Available in Stock</p> : <p className='stock-label mt-0' style={{fontSize: '0.77em'}}><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-start gap-0 gap-sm-5" style={{fontSize: '0.95em'}}>
        <div className="text-center action text-nowrap">
          <h5 style={{fontSize: '0.95em'}}>Quantity</h5>
          {/* <i className='bx bx-plus-circle'></i> */}
          <span className="mx-2 mx-md-3" style={{fontSize: '0.9em'}}>{item.Qty}</span>
          {/* <i className='bx bx-minus-circle'></i> */}
        </div>
        <div className="text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>MRP</h5>
          <h6 className="position-relative mb-0"style={{fontSize: '0.9em'}}>₹ {item.ItemMRP}</h6>
        </div>
        <div className="text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Discount</h5>
          <h6 className="position-relative mb-0"style={{fontSize: '0.9em'}}>₹ {item.DiscountPer}%</h6>
        </div>
        <div className="pe-3 pe-sm-4 text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Total</h5>
          <h6 className="text-white position-relative pricing-green mb-0" style={{"fontSize": "0.9em", "zIndex": "1"}}>₹ {(item.Qty*item.SRate).toFixed(2)}</h6>
        </div>
        <div className="floating-icons-box">
          <span onClick={() => {wishlistAction('REMOVE_WISH_ITEM', item.LocationItemId, productType); cartAction('ADD_ITEM', item, productType)}} style={{cursor: 'pointer', color: 'orangered'}} title='Move to Cart'><i className="fas fa-shopping-cart"></i></span>
          <span onClick={() => wishlistAction('REMOVE_WISH_ITEM', item.LocationItemId, productType)} style={{cursor: 'pointer'}} title='Remove from Wishlist'><i className="fas fa-trash"></i></span>
        </div>
      </div>
    </div>
  )
}


const MyOrderCard = ({ item }) => {
  return (
    // <div className="cart-item d-flex flex-column flex-sm-row p-3 mb-3 justify-content-between align-items-center">
    //   <div className="d-flex">
    //     <img style={{maxHeight: '4.5em', maxWidth: '5em'}} src={item.ItemImageURL} alt="urology"/>
    //     <div className="ms-4 ms-md-3">
    //     <Link to={`/productPage/${item.ItemId}`}><h4 style={{fontSize: '1.15em', lineHeight: '1.5em', marginBottom: '0'}}>{item.Description}</h4></Link>
    //       <p style={{fontSize: '0.8em'}} className="mb-0">{item.ItemGroup}</p>
    //     </div>
    //   </div>
    //   <div className="d-flex justify-content-between align-items-start gap-0 gap-sm-5">
    //     <div className="text-center action text-nowrap">
    //       <h5 style={{fontSize: '1em'}}>Quantity</h5>
    //       <span className="mx-2 mx-md-3" style={{fontSize: '0.9em'}}>{item.BillQty}</span>
    //     </div>
    //     <div className="text-nowrap">
    //       <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Price</h5>
    //       <h6 className="position-relative mb-0"style={{fontSize: '0.9em'}}>₹ {item.Rate}</h6>
    //     </div>
    //     <div className="pe-3 pe-sm-4 text-nowrap">
    //       <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Total</h5>
    //       <h6 className="text-white position-relative pricing-green mb-0" style={{"fontSize": "0.9em", "zIndex": "1"}}>₹ {(item.Amount)}</h6>
    //     </div>
    //   </div>
    // </div>

    <div className="cart-item d-flex flex-column flex-sm-row p-3 mb-3 justify-content-between align-items-center">
      <div className="d-flex">
        <img style={{maxHeight: '4.5em', maxWidth: '5em'}} src={item.ItemImageURL || '/assets/img/fallback/no-image.png'} />
        <div className="ms-4 ms-md-3">
        <Link to={`/productPage/${item.ItemId}`}><h4 style={{fontSize: '1em', lineHeight: '1.5em', marginBottom: '0', color: 'var(--clr-1)'}}>{item.Description}</h4></Link>
          {/* <p style={{fontSize: '0.8em', margin: '0.1em 0 0.3em'}}>{activePackSize}</p> */}
          {/* {item.StockQty ? <p className='stock-label mt-0' style={{fontSize: '0.77em'}}><i className='bx bxs-message-check text-success'></i> Available in Stock</p> : <p className='stock-label mt-0' style={{fontSize: '0.77em'}}><i className='bx bxs-message-x text-danger'></i> Out of Stock</p>} */}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-start gap-0 gap-sm-5" style={{fontSize: '0.95em'}}>
        <div className="text-center action text-nowrap">
          <h5 style={{fontSize: '0.95em'}}>Quantity</h5>
          <i className='bx bx-plus-circle d-none'></i>
          <span className="mx-2 mx-md-3" style={{fontSize: '0.9em'}}>{item.BillQty}</span>
          <i className='bx bx-minus-circle d-none'></i>
        </div>
        <div className="text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Rate</h5>
          <h6 className="position-relative mb-0"style={{fontSize: '0.9em'}}>₹ {(parseFloat(item.Rate) + parseFloat(item.CGST) + parseFloat(item.CGST) + parseFloat(item.IGST)).toFixed(2)}</h6>
        </div>
        {/* <div className="text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Discount</h5>
          <h6 className="position-relative mb-0"style={{fontSize: '0.9em'}}>₹ {item.DiscountPer}%</h6>
        </div> */}
        <div className="pe-3 pe-sm-4 text-nowrap">
          <h5 style={{fontSize: '1em', marginBottom: '1.5em'}}>Total</h5>
          <h6 className="text-white position-relative pricing-green mb-0" style={{"fontSize": "0.9em", "zIndex": "1"}}>₹ {parseFloat(item.Amount).toFixed(2)}</h6>
        </div>
        {/* <div className="floating-icons-box">
          <span onClick={() => {wishlistAction('REMOVE_WISH_ITEM', item.LocationItemId); cartAction('ADD_ITEM', item)}} style={{cursor: 'pointer', color: 'orangered'}} title='Move to Cart'><i className="fas fa-shopping-cart"></i></span>
          <span onClick={() => wishlistAction('REMOVE_WISH_ITEM', item.LocationItemId)} style={{cursor: 'pointer'}} title='Remove from Wishlist'><i className="fas fa-trash"></i></span>
        </div> */}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { compCode: state.compCode, cart: state.cart, wishlist: state.wishlist, globalData: state.globalData, isToastActive: state.isToastActive, isLoggedIn: state.isLoggedIn, compInfo: state.compInfo, userInfo: state.userInfo };
}

export default connect(mapStateToProps, {userInfoAction, bookingInfoAction, modalAction})(ProfileCard);
export const ConnectedPackageCard = connect(mapStateToProps, {cartAction, toastAction})(PackgeCard);
export const ConnectedLabTestCard = connect(mapStateToProps, {cartAction, toastAction})(LabTestCard);
export const ConnectedPharmacyCard = connect(mapStateToProps, {cartAction, toastAction})(PharmcyCard);
export const ConnectedPharmacyCard2 = connect(mapStateToProps, {cartAction, wishlistAction, globalDataAction})(PharmacyCard2);
// export const ConnectedHorizontalProfileCard = connect(mapStateToProps, {cartAction, toastAction, userInfoAction, modalAction})(HorizontalProfileCard);
export const ConnectedDocPreviewCard = connect(mapStateToProps, {cartAction, toastAction, bookingInfoAction, modalAction})(DocPreviewCard);
export const ConnectedSpecialistPreviewCard = connect(mapStateToProps, {cartAction, toastAction, bookingInfoAction, modalAction, userInfoAction})(SpecialistPreviewCard);
export const ConnectedPharmacyCartCard = connect(mapStateToProps, {cartAction, wishlistAction})(PharmacyCartCard);
export const ConnectedLabtestCartCard = connect(mapStateToProps, {cartAction, wishlistAction})(LabtestCartCard);
export const ConnectedWishlistCard = connect(mapStateToProps, {cartAction, wishlistAction})(WishlistCard);
export const ConnectedMyOrderCard = connect(mapStateToProps, {cartAction})(MyOrderCard);




export const ErrorCard = ({ myStyle, message }) => {
  return (
    <div className="card-1" style={{minHeight: 'auto', padding: '0.7em', ...myStyle}}>
        <div className='d-flex'>
            <i className='bx bx-x-circle'></i>
            <div>
                <h6 style={{marginBottom: '0.2em'}}>Ooops</h6>
                <p>{message}</p>
            </div>
        </div>
        {/* <button className="controlled-btn" type="button">Try again</button> */}
    </div>
  )
}

export const AppnRow = ({ data }) => {

  return (
      <tr key={data.PartyName}>
          <td>
              <h2 className="table-avatar">
                  <Link to="#" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="/img/user_unknown.png" alt="User Image"/></Link>
                  <Link to="#" className='fw-medium'>{data.PartyName}
                    <span>{data.UHID}&nbsp;</span>
                  </Link>
              </h2>
          </td>
          <td>{data.NextAppDate.split('T')[0] + " "} <span className="d-block text-info">{data.NextAppTime}</span></td>
          <td>{data.DeptName}</td>
          <td>
              <span className='badge badge-pill' style={{background: data.IsAppConfirmed === 'Y' ? '#00ad44' : '#009efb'}}>{ data.IsAppConfirmed === 'Y' ? 'Confirmed' : 'Processing...' }</span>
          </td>
          <td>
              <span className='badge badge-pill' style={{background: data.Status === 'Y' ? '#00ad44' : '#f29101'}}>{ data.Status === 'Y' ? 'Done' : 'Pending' }</span>
          </td>
          <td className="text-right">
              <div className="table-action">
                  {data.PrescriptionId ? <Link to={`/prescription/${data.PrescriptionId}`} className={`btn btn-sm bg-info-light`}><i className="far fa-eye"></i> Prescription</Link> : ''}
                  {data.BillId ? <Link to={`/invoices/${data.BillId}?type=OPD`} className={`btn btn-sm bg-success-light mx-2`}><i className="fas fa-check"></i> Bill</Link> : ''}
                  {data.IsAppConfirmed !== 'Y' && <Link to="#" className="btn btn-sm bg-danger-light"><i className="fas fa-times"></i> Cancel</Link>}
              </div>
          </td>
      </tr>
  )
}

export const LabAppnRow = ({ data, compCode, locationId }) => {
  const [preview, setPreview] = useState(false);
  return (
      <tr key={data.PartyName}>
          <td>
              <h2 className="table-avatar">
                  <Link to="#" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="/img/user_unknown.png" alt="User Image"/></Link>
                  <Link to="#">{data.PartyName}
                   <span>{data.UHID}&nbsp;</span>
                  </Link>
              </h2>
          </td>
          <td>{data.NextAppDate.split('T')[0] + " "} <span className="d-block text-info">{data.NextAppTime}</span></td>
          <td>{data.DeptName}</td>
          <td>
              <span className='badge badge-pill' style={{background: data.IsAppConfirmed === 'Y' ? '#00ad44' : '#009efb'}}>{ data.IsAppConfirmed === 'Y' ? 'Confirmed' : 'Processing...' }</span>
          </td>
          <td>
              <span className='badge badge-pill' style={{background: data.Status === 'Y' ? '#00ad44' : '#f29101'}}>{ data.Status === 'Y' ? 'Done' : 'Pending' }</span>
          </td>
          <td className="text-right">
              <div className="table-action">
                  <Link to={`#`} onClick={() => setPreview(true)} className={`btn btn-sm bg-info-light`}><i className="far fa-eye"></i> View Details</Link>
                  {data.BillId ? <Link to={`/invoices/${data.BillId}?type=INVESTIGATION`} className={`btn btn-sm bg-success-light mx-2`}><i className="fas fa-check"></i> Bill</Link> : ''}
                  {data.IsAppConfirmed !== 'Y' && <Link to="#" className="btn btn-sm bg-danger-light"><i className="fas fa-times"></i> Cancel</Link>}
                  {data.BillId ? <Link to={`/reports?type=INVESTIGATION&id=${data.BillId}`} className="btn btn-sm bg-info-light"><i className="fas fa-file"></i> Report</Link> : ''}
              </div>
              {preview && <MyModal name='LABTEST_BOOK_MODAL' handleClose={() => setPreview(false)} customClass='booking-modal' child={<PreviewBox handleClose={() => setPreview(false)} RefId={data.RefId} compCode={compCode} locationId={locationId}  />} closeIcon={false}/>}
          </td>
      </tr>
  )
}

// item id changed.