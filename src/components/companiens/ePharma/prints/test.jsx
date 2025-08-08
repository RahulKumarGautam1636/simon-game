import { connect } from 'react-redux';
import { cartAction, wishlistAction, breadCrumbAction, modalAction } from '../../../../actions';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFrom, wait } from '../utilities';
import Skeleton from 'react-loading-skeleton';
import { BASE_URL } from '../../../../constants';

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";


const PostOrderList = ({ modalAction, globalData, compCode, compInfo, modals }) => {

    const contentRef = useRef(null);
    const handlePrint = useReactToPrint({ 
        content: () => contentRef.current // Pass the ref to content prop
    });

    const { id } = useParams(); 
    const history = useHistory(); 

    const handleClose = () => {
        history.push('/')
        modalAction('TABLE_SELECTION_MODAL', true);
    }   

    const [billData, setBillData] = useState({loading: false, data: {SalesObj: { SalesDetails: []}}, err: {status: false, msg: ''}})

    useEffect(() => {
        const getAreaResult = async () => {                      
            if (!compCode) return alert('no companyCode received');                  
            const res = await getFrom(`${BASE_URL}/api/pharma/GetKOTPrint?CID=${compCode}&LOCID=${globalData.location.LocationId}&BillId=${id}&Type=LAST`, {}, setBillData);
            if (res) {
                setBillData(res);
                await wait(700);
                handlePrint();
            } else alert('Something went wrong !!');
        }  
        if (id === 'test') {
            setBillData({loading: false, data: {SalesObj: testData}, err: {status: false, msg: ''}});
            setTimeout(() => {
                handlePrint();
            }, 800);
            return;
        };
        getAreaResult();
    }, [id, compCode, globalData.location.LocationId])

    const data = billData.data.SalesObj;

    return (
        <div id="target" className='' style={{fontFamily: 'Lato'}}>
            <div id="invoice-POS" style={{padding: '1px', paddingRight: '1px 0.7em', background: '#FFF', fontFamily: 'Arial, Helvetica, sans-serif'}} ref={contentRef}>
                <style>
                    {`
                        // body {
                        //     background: #ffc5c5 !important;
                        // }
                        // body * {
                        //     background: aliceblue !important;
                        // }
                        .app-container > *:not(.app-content) {				
                            display: none;
                        }

                        .offcanvas-body {
                            padding: 10px 0 0;
                        }
                        #target {
                            margin: 0 auto;
                            background: #FFF;
                            font-family: Arial, Helvetica, sans-serif;
                        }
                        p {
                            font-size: 1.95rem;
                            padding: 0.6em 0.3em;
                            margin-bottom: 0;
                        }
                        
                        @page {
                            margin: 0 1%;
                        }
                        @media print {
                            .btnPrint {display: none;}
                        }
                        
                        @media (max-width: 767px) {
                            html {
                                font-size: 124% !important;
                            } 
                        }
                    `}
                </style>
                <center id="top">
                    <div className="btnPrint mb-2" style={{textAlign: 'center'}}>
                        <span className='btn btn-secondary px-2 py-1 me-3' onClick={handlePrint}><i className='bx bxs-printer'></i> Print</span>
                        <Link to={'/'} onClick={handleClose} className='btn btn-secondary px-2 py-1'><i className='bx bx-x'></i> Close</Link>
                    </div>
                    <div className="logo" />
                    <div className="info">
                        <h6 style={{marginBottom: 0, marginTop: 0}}>
                            <font style={{fontSize: '2.3rem', fontWeight: 'bold'}}> {compInfo.COMPNAME}</font>
                        </h6>
                    </div>
                </center>
                <div id="mid" style={{borderBottom: '1px solid #000'}} >
                    <div className="info">
                        <h2 style={{textAlign: 'center', fontSize: '1.4em'}} className='my-2 fw-bold'>Order List</h2>
                        <table style={{width: '100%', fontSize: '1.4em'}}>
                            <tbody>
                                <tr>
                                    <td style={{width: '35%', fontWeight: 'bold'}}>Order #</td>
                                    <td style={{width: '65%', fontWeight: 'bold'}}>:&nbsp; {data.VchNo}</td>
                                </tr>
                                <tr>
                                    <td style={{width: '35%', fontWeight: 'bold'}}>Order Date</td>
                                    <td style={{width: '65%', fontWeight: 'bold'}}>:&nbsp; {new Date(data.VchDate).toLocaleDateString('en-TT')} &nbsp;&nbsp; {new Date().getHours()} : {new Date().getMinutes()}</td>
                                </tr>
                                <tr>
                                    <td style={{width: '35%', fontWeight: 'bold'}}>Table No</td>
                                    <td style={{width: '65%', fontWeight: 'bold'}}>:&nbsp; {data.BedDesc}</td>
                                </tr>
                                {data.CollectedBy && <tr>
                                    <td style={{width: '35%', fontWeight: 'bold'}}>Waiter Name</td>
                                    <td style={{width: '65%', fontWeight: 'bold'}}>:&nbsp; {data.CollectedBy}</td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="bot">
                    <div id="table">
                        <table className='w-100' style={{fontSize: '1.6em'}}>
                            <tbody>
                                <tr className="tabletitle" style={{borderBottom: '1px solid #000'}}>
                                    <td style={{verticalAlign: 'top', fontWeight: 'bold'}}>#</td>
                                    <td style={{verticalAlign: 'top', fontWeight: 'bold'}} className="item">Particulars</td>
                                    <td style={{verticalAlign: 'top', fontWeight: 'bold'}} className="Hours" align="right">Qty</td>
                                </tr>
                                {billData.loading ? <tr className="tabletitle" style={{borderBottom: '1px solid #000'}}>
                                    <td colSpan={3}>
                                        <Skeleton count={5} />
                                    </td>
                                </tr> : ''}
                                {data.SalesDetails?.map((i, n) => (
                                    <tr className="service" style={{borderBottom: '1px solid #000'}} key={n}>
                                        <td className="tableitem" style={{verticalAlign: 'top', width: '8%'}}><p className="itemtext" style={{fontWeight: 'bold', lineHeight: '2rem'}}>{n+1}.</p></td>
                                        <td className="tableitem" style={{verticalAlign: 'top'}}>
                                            <p className="itemtext" style={{fontWeight: 'bold', lineHeight: '2rem'}}>
                                                {i.Description}
                                                <span className='fw-normal d-block' style={{marginTop: '0.6em', fontSize: '0.6em'}}>{i.Specification}</span>
                                            </p>
                                        </td>
                                        <td className="tableitem" align="right" style={{verticalAlign: 'top'}}>
                                            <p className="itemtext" style={{fontWeight: 'bold'}}>
                                                {i.BillQty}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div id="legalcopy">
                        <div className="info" style={{textAlign: 'center'}}>
                        </div>
                    </div>
                    <div className="btnPrint mt-2" style={{textAlign: 'center'}}>
                        <span className='btn btn-secondary px-2 py-1 me-3' onClick={handlePrint}><i className='bx bxs-printer'></i> Print</span>
                        <Link to={'/'} onClick={handleClose} className='btn btn-secondary px-2 py-1'><i className='bx bx-x'></i> Close</Link>
                    </div>
                </div>
            </div>
        </div>

    )  
}

const mapStateToPropsTwo = (state) => {
  return { cart: state.cart, compCode: state.compCode, isMobile: state.isMobile, globalData: state.globalData, userInfo: state.userInfo, compInfo: state.compInfo, isLoggedIn: state.isLoggedIn, modals: state.modals };
}

export default connect(mapStateToPropsTwo, {breadCrumbAction, cartAction, wishlistAction, modalAction})(PostOrderList);



const testData = {
    VchNo: 'SO00000039',
    VchDate: '2025-02-21T00:00:00',
    BedDesc: 'HT - 04',
    CollectedBy: 'Ananda Singh',
    SalesDetails: [
        { 
            id: 1, 
            Description: 'Bata Mach Thali (Rice, Nimbu, Salad, Seasonal Sabji, Sag/Aloo Vaga, Dal, 1pcs Shorshe Bata, Papad,', 
            BillQty: 1,
            Specification: 'Test Note for this Item.'
        },
        { 
            id: 2, 
            Description: 'Bhola Fish Thali (Rice, Nimbu, Salad, Seasonal Sabji, Sag/Aloo Vaga, Dal, 1pcs Bhola Fish Curry, P', 
            BillQty: 2,
            Specification: ''
        },
        { 
            id: 3, 
            Description: 'Dal Fry Tadka', 
            BillQty: 2,
            Specification: 'Test Note for this Item.'
        },
        { 
            id: 4, 
            Description: 'PLAIN DAL', 
            BillQty: 1,
            Specification: ''
        },
        { 
            id: 5, 
            Description: 'ALU BHAJA', 
            BillQty: 1,
            Specification: 'Test Note for this Item.'
        },
        { 
            id: 6, 
            Description: 'BOILED EGG DOUBLE', 
            BillQty: 4,
            Specification: ''
        },
        { 
            id: 7, 
            Description: 'Cheese Omelet (Double Egg)', 
            BillQty: 3,
            Specification: ''
        },
        { 
            id: 8, 
            Description: 'Bhola Fish Thali (Rice, Nimbu, Salad, Seasonal Sabji, Sag/Aloo Vaga, Dal, 1pcs Bhola Fish Curry, P', 
            BillQty: 2,
            Specification: ''
        },
        { 
            id: 9, 
            Description: 'Dal Fry Tadka', 
            BillQty: 2,
            Specification: 'Test Note for this Item.'
        },
        { 
            id: 10, 
            Description: 'PLAIN DAL', 
            BillQty: 1,
            Specification: ''
        },
        { 
            id: 11, 
            Description: 'ALU BHAJA', 
            BillQty: 1,
            Specification: 'Test Note for this Item.'
        },
        { 
            id: 12, 
            Description: 'BOILED EGG DOUBLE', 
            BillQty: 4,
            Specification: ''
        },
        { 
            id: 13, 
            Description: 'Bata Mach Thali (Rice, Nimbu, Salad, Seasonal Sabji, Sag/Aloo Vaga, Dal, 1pcs Shorshe Bata, Papad,', 
            BillQty: 1,
            Specification: 'Test Note for this Item.'
        },
        { 
            id: 14, 
            Description: 'Dal Fry Tadka', 
            BillQty: 2,
            Specification: 'Test Note for this Item.'
        },
    ]
}







// import { Link, useHistory } from 'react-router-dom';
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { loginStatusAction, userInfoAction, compInfoAction, compCodeAction, loaderAction, siteDataAction, modalAction } from '../../../actions';
// import { connect } from 'react-redux';
// import { useFetch, ModalComponent, handleNumberInputs, logOut, customTabsButtons, createDate, getDuration, MODULES, encrypt, JQDatePicker, MyModal, getTotalCartItems } from './utilities';
// import axios from 'axios';
// import Menu from './menu';
// import { ASTHA_ID, existingLogos, MEDICO_HEALTH_ID } from '../../../constants';
// import { Button } from 'react-bootstrap';
// import { AutoComplete } from '../ePharma/utilities';


// const Header = ({ siteData, modalAction, isLoggedIn, loginStatusAction, userInfo, userInfoAction, cart, compCode, compInfo, compInfoAction, compCodeAction, loaderAction, isHeaderActive }) => {

//   const history = useHistory();

//   useEffect(() => {
//       return history.listen((location) => {                         // Listen for changes in history object or Url changes to toggle active menu link.
//           setActiveLink(location.pathname);
//           setMenuOpen(false);
//       })
//   },[history]) 

//   useEffect(() => {
//     if (window.location.hash === '#/') {               // set activeLink '/' on page load to highlight the home page link.
//       setActiveLink('/');
//     } else if (window.location.hash === '#/pharmacy') {
//       setActiveLink('/pharmacy');
//     } else if (window.location.hash === '#/labTests') {
//       setActiveLink('/labTests');
//     }     
//   }, [])

//   const [activeLink, setActiveLink] = useState('');
//   const [menuOpen, setMenuOpen] = useState(false);
//   const totalCartItems = getTotalCartItems(cart);          // Add Pharmacy cart and Labtest cart items list to get total no. of cart items.   
//   const [searchBoxOpen, setSearchBoxOpen] = useState(false);
//   const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = useState(false);
//   const searchBoxRef = useRef();
//   const mobileSearchBoxRef = useRef();

//   // ----------------------------------------SEARCH BAR-------------------------------------------------
//   const [searchTerm, setSearchTerm] = useState({query: '', filterTerm: 'All', filterId: 0});               // Avoid using null for filterId.
//   const [searchList, setSearchList] = useState([]);
//   const [activeListItem, setActiveListItem] = useState(0);

//   useEffect(() => {
//     const onKeyDown = (e) => {
//         if (searchList.length === 0) return;
//         if (e.keyCode === 40 && activeListItem + 1 !== searchList.length) {
//             setActiveListItem(preValue => preValue + 1);
//         } else if (e.keyCode === 38 && activeListItem !== 0) {
//             setActiveListItem(preValue => preValue - 1);
//         }                                                                          
//     }
//     document.body.addEventListener('keydown', onKeyDown, { capture: true });                                               
//     return () => document.body.removeEventListener('keydown', onKeyDown, { capture: true });                               
//   }, [searchList.length, activeListItem])

//   const handleSearch = (e) => {
//     const { name, value } = e.target;
//     setSearchTerm(preValue => {
//         return {...preValue, [name]: value};
//     })
//   }
  
//   const handleSearchForm = (e) => {
//     e.preventDefault();                                                             // Since searchFunction is already being continuously called using useEffect on line 158 hence we don't need to 
//     history.push(`/productPage/${searchList[activeListItem].ItemId}`);              // call it when form is submitted. We just redirect the user to productPage with current active search item's id.
//     setSearchList([]);
//   }

//   const searchItem = useCallback((query, data) => {
//     if (data.isLoading) return [];
//     let found = data.filter(i => i.Description.toLowerCase().includes(query.toLowerCase()));
//     return found;
//   }, []);

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
//     // setSearchList([...new Set(foundItems)]);              // can be deleted safely.
//   },[searchTerm, siteData, searchItem])

//   useEffect(() => {
//         searchFunction();                                            // hence empty input box will return no query to which prevents filter and trigger search.
//         setActiveListItem(0);
//   },[searchTerm, searchFunction])

//   // ----------------------------------------SEARCH BAR-------------------------------------------------

//   useEffect(() => {
//     const onBodyClick = (event) => {                                                                                        
//       if (searchBoxRef.current && searchBoxRef.current.contains(event.target)) return;                                      // Return if click is triggered from serach-box div and it's inner elements.
//       setSearchBoxOpen(false);                                                                                              // close search-box only if click is triggered from rest of the elements (outer body).                                                                                                   // no need to use useRef because we wish to remove searchList on any clicks including
//       setSearchList([]);
//       if (mobileSearchBoxRef.current && mobileSearchBoxRef.current.contains(event.target)) return;                                      // Return if click is triggered from serach-box div and it's inner elements.
//       setMobileSearchBoxOpen(false);                                                                                              // close search-box only if click is triggered from rest of the elements (outer body).                                                                                                   // no need to use useRef because we wish to remove searchList on any clicks including
//       setSearchList([]);
//     }                                                                                                                        
//     document.body.addEventListener('click', onBodyClick, { capture: true });                                                // Add eventlistener on component mount.
//     return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                                // Remove Eventlistener on component unmount.
//   }, [])

//   return (
//     <>
//       <header className="header" id="header">
//         <span className="d-none">{activeLink}</span>
//         <nav className="navbar navbar-expand-lg header-nav py-1 py-md-0" style={{fontSize: '1.6rem'}}>
//         <div className="navbar-header">
//           <ul className="nav header-navbar-rht d-flex justify-content-end align-items-center w-100">
//             <li className="nav-item d-inline-flex d-lg-none">
//               <span id="mobile_btn" onClick={() => setMenuOpen(true)} style={{fontSize: '0.8em'}}>
//                   <span className="bar-icon">
//                       <span></span>
//                       <span></span>
//                       <span></span>
//                   </span>
//               </span>
//             </li>
//             <li className="nav-item me-auto px-0">
//               <Link to="/" className="navbar-brand logo py-0">
//                 {
//                   existingLogos.includes(compInfo.LogoUrl.split('.')[0]) ? 
//                   <>
//                     {(() => {
//                       if (compCode === ASTHA_ID) {
//                         return <span className='d-flex align-items-center'><img id="header-logo" src={`/img/logo/${compInfo.LogoUrl}`} className="img-fluid logo" alt={compInfo.COMPNAME}/><span style={{width: 'auto', whiteSpace: 'normal', fontSize: '1.3em'}} className="d-none d-md-inline text-uppercase text-background"> {compInfo.COMPNAME}</span></span>  
//                       } else {
//                         return <img id="header-logo" src={`/img/logo/${compInfo.LogoUrl}`} className="img-fluid logo" alt={compInfo.COMPNAME}/> 
//                       }
//                     })()}
//                   </>                  
//                   :                                                                   // 15rem                                                                  
//                   <span className='d-flex align-items-center'><img id="header-logo" src={'/img/logo/opd2.png'} className="img-fluid logo rounded-circle" alt={compInfo.COMPNAME}/><span style={{width: 'auto', whiteSpace: 'normal', fontSize: '1.3em'}} className="d-none d-md-inline text-uppercase text-background"> {compInfo.COMPNAME}</span></span>                                                                                                                                                                                        
//                 }
//               </Link>
//             </li>
//             <li className="nav-item d-sm-none p-0" style={{display: !isLoggedIn ? '' : 'none'}}>
//                 {/* <button className="nav-link header-login me-2">Login</button>
//                 <button className="nav-link header-login me-2">Join us</button> */}
//                 <Link to="#" className="dropdown-toggle nav-link align-items-center p-0 me-2" data-toggle="dropdown" aria-expanded="false">
//                   <button className="nav-link header-login" style={{fontSize: 'clamp(.6em,2.8vw,0.75em)'}}>Login</button>
//                 </Link>
//                 <div className="dropdown-menu dropdown-menu-right">
//                   {(() => {
//                     if (compCode === ASTHA_ID) {
//                       return (
//                         <>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">personal_injury</span> As Patient
//                           </span>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PROVIDER})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">handshake</span> As Provider
//                           </span>
//                         </>
//                       )
//                     } else if (compCode === MEDICO_HEALTH_ID) {
//                       return (
//                         <>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">personal_injury</span> As Patient
//                           </span>
//                         </>
//                       )
//                     } else {
//                       return (
//                         <>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">personal_injury</span> As Patient
//                           </span>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.DOCTOR})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">stethoscope</span> As Doctor
//                           </span>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PROVIDER})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">handshake</span> As Provider
//                           </span>
//                           {/* <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.COLLECTOR})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">approval_delegation</span> As Collector
//                           </span>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.POLYCLINIC})} className="dropdown-item">
//                             <i className='bx bx-clinic h3 mb-0 me-2'></i> As Polyclinic
//                           </span> */}
//                         </>
//                       )
//                     }
//                   })()}
//                 </div>
//             </li>
            
//             <li className="nav-item d-sm-none px-1">
//                 <a href='#' target={'_blank'} rel="noreferrer">
//                   <img src="/img/gbooks-round-logo.png" alt="Gbooks" style={{maxHeight: '2.2em', boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px 0px', borderRadius: '50%'}} />
//                 </a>
//             </li>

//             <li className="nav-item dropdown has-arrow logged-item d-sm-none" style={{display: isLoggedIn ? '' : 'none'}}>
//               <Link to="#" className="dropdown-toggle nav-link px-0" data-toggle="dropdown" aria-expanded="false">
//                 <span className="user-img">
//                   <img className="rounded-circle" src="/img/user_unknown.png" width="31" alt="Darren Elder"/>
//                 </span>
//               </Link>
//               <div className="dropdown-menu dropdown-menu-right">
//                 <div className="user-header d-flex align-items-center">
//                   <div className="avatar avatar-sm">
//                     <img src="/img/user_unknown.png" alt="User" className="avatar-img rounded-circle"/>
//                   </div>
//                   <div className="user-text">
//                     <h6>{userInfo.Name}</h6>
//                     {/*<p className="text-muted mb-0">Doctor</p> */}
//                   </div>
//                 </div>
//                 <Link to={`/profile/${userInfo.PartyCode}`} className="dropdown-item">
//                   <i className='bx bx-user-circle h3 mb-0 me-3'></i> Members
//                 </Link>
//                 <Link to='/dashboard' className="dropdown-item">
//                   <i className='bx bx-tachometer h3 mb-0 me-3'></i> Services
//                 </Link>
//                 {(MODULES[compCode]?.includes('PHARMACY') && MODULES[compCode]?.includes('LAB_TEST')) || <>
//                 <Link className="dropdown-item" to="/myOrders"><i className='bx bx-gift h3 mb-0 me-3'></i> My Orders</Link>
//                 <Link className="dropdown-item" to="/cartPage"><i className='bx bx-cart-alt h3 mb-0 me-3'></i> Cart</Link>
//                 <Link className="dropdown-item" to="/wishlist"><i className='bx bx-heart h3 mb-0 me-3'></i> My Wishlist</Link></>}
//                 <span onClick={() => logOut(history)} className="dropdown-item" to="#">
//                   <i className='bx bx-log-out-circle h3 mb-0 me-3'></i> Logout
//                 </span>
//                 {/* <a href='#' onClick={getLocation} className="dropdown-item" to="#">
//                   <i className='bx bx-log-out-circle h3 mb-0 me-3'></i> Location
//                 </a> */}
//               </div>
//             </li>

//             <li className="nav-item d-sm-none p-0">
//               <span to="#" className='search-open-btn'>
//                 <form className='search-bar' ref={mobileSearchBoxRef} onSubmit={handleSearchForm}>
//                   <div className="input-box">
//                     <div className={`${mobileSearchBoxOpen ? 'results-active' : ''} ${searchList.length > 0 ? 'loaded' : ''}`}>
//                       <input  id='mobile_search_input' onChange={handleSearch} value={searchTerm.query} name="query" type="text" tabIndex={1} placeholder="Enter your search key ..." />
//                       <div className='search-results-1'>
//                         <ul>
//                             {searchList.map((i, n) => <li key={i.LocationItemId} className={`${activeListItem === n ? 'active' : ''}`}><Link to={`/productPage/${i.ItemId}`} onClick={() => setSearchList([])}>{i.Description}</Link></li>)}
//                         </ul> 
//                       </div>
//                     </div>
//                     <label htmlFor="mobile_search_input">
//                         <i className='bx bx-search header-login' style={{marginLeft: '1.1em'}} onClick={() => setMobileSearchBoxOpen(!mobileSearchBoxOpen)}></i>
//                     </label>
//                   </div>
//                 </form>
//               </span>
//             </li>

//           </ul>

//         </div>
//         {/* <div className={`main-menu-wrapper ${menuOpen ? 'menu-opened' : ''}`}>
//             <div className="menu-header">
//                 <Link to="/" className="menu-logo">
//                     {
//                       existingLogos.includes(compInfo.LogoUrl.split('.')[0]) ? 
//                       <img src={`/img/logo/${compInfo.LogoUrl}`} className="img-fluid logo" alt={compInfo.COMPNAME}/> :
//                       <img src={'/img/logo/opd2.png'} className="img-fluid logo rounded-circle" alt={compInfo.COMPNAME}/>
//                     }
                    
//                 </Link>
//                 <span id="menu_close" className="menu-close" to="#" onClick={() => setMenuOpen(false)}>
//                     <i className="fas fa-times"></i>
//                 </span>
//             </div>
//             <ul className="main-nav">
//                 <li className="" style={{display: isLoggedIn ? '' : 'none'}}>
//                   <Link to="#" onClick={() => {setMenuOpen(false);navigateTo()}}>
//                     <i className='bx bxs-id-card h3 mb-0 me-2 d-md-none'></i> Dashboard
//                   </Link>
//                 </li>
//                 <li className='d-md-none'>
//                   <Link to='/specialists' onClick={() => {setMenuOpen(false);}}>
//                     <i className='bx bxs-contact h3 mb-0 me-2'></i> Specialists
//                   </Link>
//                 </li>
//                 <li className="d-md-none">
//                   <Link to="/cartPage" onClick={() => setMenuOpen(false)}>
//                     <i className='bx bx-cart-alt h3 mb-0 me-2'></i> Cart
//                   </Link>
//                 </li>
//                 <li className="d-md-none">
//                   <Link to="/cartPage" onClick={() => setMenuOpen(false)}>
//                     <i className='bx bxs-package h3 mb-0 me-2'></i> My Orders
//                   </Link>
//                 </li>
//             </ul>
//         </div> */}
//         <ul className="nav header-navbar-rht">
//             {MODULES[compCode]?.includes('OPD') || <li className={`px-0 py-1 tab-btn big-menu ${activeLink === '/specialists' ? 'active': ''}`}>        {/* Toggle activeLink by directly tracking the hash. */}
//                 <Link className='nav-link' to="/specialists" style={{fontSize: '0.9em', padding: '0.6em 0.7em'}}>
//                     OPD SERVICES
//                     <hr style={{"margin": "0", "marginTop": "2px", "background": "#0000004f"}} />
//                     <span className="d-block mt-1" style={{"fontWeight": "500", "fontSize": "0.84em"}}>Book Appointments</span>
//                 </Link>
//             </li>}
//             {/* {MODULES[compCode]?.includes('PHARMACY') || <li className={`px-0 py-1 tab-btn big-menu ${activeLink === '/pharmacy' ? 'active': ''}`} style={{display: 'inline-flex'}}>
//                 <Link className='nav-link' to="/pharmacy" style={{fontSize: '0.9em', padding: '0.6em 0.7em'}}>
//                     PHARMACY
//                     <hr style={{"margin": "0", "marginTop": "2px", "background": "#0000004f"}} />
//                     <span className="d-block mt-1" style={{"fontWeight": "500", "fontSize": "0.84em"}}>Medicines & Products</span>
//                 </Link>
//             </li>} */}
//             {MODULES[compCode]?.includes('LAB_TEST') || <li className={`px-0 py-1 tab-btn big-menu ${activeLink === '/labTests' ? 'active': ''}`}  style={{display: 'inline-flex'}}>
//                 <Link className='nav-link' to="/labTests" style={{fontSize: '0.9em', padding: '0.6em 0.7em'}}>
//                     LAB TESTS
//                     <hr style={{"margin": "0", "marginTop": "2px", "background": "#0000004f"}} />
//                     <span className="d-block mt-1" style={{"fontWeight": "500", "fontSize": "0.84em"}}>Health check-ups</span>
//                 </Link>
//             </li>}
//             {/* <li className="nav-item contact-item">
//               <div className='d-flex align-items-center'>
//                 <div className="header-contact-img">
//                     <i className="fas fa-map-marker text-dark"></i>
//                 </div>
//                 <div className="header-contact-detail">
//                     <p className="contact-header">Location</p>
//                     <p className="contact-info-header"> Select Location</p>
//                 </div>
//               </div>
//               <form className="hm-searchbox" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
//                 <input name="query" type="text" placeholder="Enter your search key ..." autoComplete='off'/>
//                 <button className="li-btn" type="submit"><i className="fa fa-search text-white"></i></button>
//                 <AutoComplete name='search-rersults' list={[]} isLoading={true} setActive={() => {}} children={<Button />} keyName={'LocationItemId'}/>
//               </form>
//             </li> */}

//             {(MODULES[compCode]?.includes('PHARMACY') && MODULES[compCode]?.includes('LAB_TEST')) || <li className="nav-item">
//                 <Link to='/cartPage' className='' onClick={() => setMenuOpen(false)}>
//                   <i className='bx bx-cart-alt h2 mb-0 mt-2 position-relative'>
//                     <span id="cart-badge" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '11px', fontFamily: 'Poppins', display: totalCartItems > 0 ? 'block' : 'none'}}>{totalCartItems}</span>
//                   </i>
//                 </Link>
//             </li>}
            
//             <li className="nav-item">
//               <span to="#" className='search-open-btn'>
//                 <form className='search-bar' ref={searchBoxRef} onSubmit={handleSearchForm}>
//                   <div className="input-box">
//                     <div className={`${searchBoxOpen ? 'results-active' : ''} ${searchList.length > 0 ? 'loaded' : ''}`}>
//                       <input onChange={handleSearch} value={searchTerm.query} name="query" type="text" id='search_input' tabIndex={1} placeholder="Enter your search key ..." />
//                       <div className='search-results-1'>
//                         <ul>
//                             {searchList.map((i, n) => <li key={i.LocationItemId} className={`${activeListItem === n ? 'active' : ''}`}><Link to={`/productPage/${i.ItemId}`} onClick={() => setSearchList([])}>{i.Description}</Link></li>)}
//                         </ul> 
//                       </div>
//                     </div>
//                       <label htmlFor="search_input">
//                           <i className='bx bx-search header-login' onClick={() => setSearchBoxOpen(!searchBoxOpen)} style={{marginLeft: '1.2em'}}></i>
//                       </label>
//                   </div>
//                 </form>
//               </span>
//             </li>

//             {/* <li className="nav-item" style={{display: isLoggedIn ? 'none' : ''}}>
//                 <button className="nav-link header-login" to="#" onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.POLYCLINIC})}>Join us</button>
//             </li> */}

//                                             {/* has-arrow */}
//             <li className="nav-item dropdown logged-item" style={{display: isLoggedIn ? 'none' : ''}}>
//               <Link to="#" className="dropdown-toggle nav-link align-items-center" data-toggle="dropdown" aria-expanded="false">
//                 <button className="nav-link header-login" style={{fontSize: 'clamp(.6em,2.8vw,0.75em)'}}>Login</button>
//               </Link>
//               <div className="dropdown-menu dropdown-menu-right">
//               {(() => {
//                     if (compCode === ASTHA_ID) {
//                       return (
//                         <>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">personal_injury</span> As Patient
//                           </span>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PROVIDER})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">handshake</span> As Provider
//                           </span>
//                         </>
//                       )
//                     } else if (compCode === MEDICO_HEALTH_ID) {
//                       return (
//                         <>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">personal_injury</span> As Patient
//                           </span>
//                         </>
//                       )
//                     } else {
//                       return (
//                         <>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">personal_injury</span> As Patient
//                           </span>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.DOCTOR})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">stethoscope</span> As Doctor
//                           </span>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PROVIDER})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">handshake</span> As Provider
//                           </span>
//                           {/* <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.COLLECTOR})} className="dropdown-item">
//                             <span className="material-symbols-outlined h3 mb-0 me-2">approval_delegation</span> As Collector
//                           </span>
//                           <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.POLYCLINIC})} className="dropdown-item">
//                             <i className='bx bx-clinic h3 mb-0 me-2'></i> As Polyclinic
//                           </span> */}
//                         </>
//                       )
//                     }
//                   })()}
//               </div>
//             </li>



//             {/* <li className="nav-item" style={{display: isLoggedIn ? 'none' : ''}}>
//                 <button className="nav-link header-login" to="#" onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})}>Login </button>
//             </li> */}
//             <li className="nav-item">
//                 {/* <a href='#' target={'_blank'} rel="noreferrer"><i className="bx bx-desktop header-login" style={{fontSize: '18px', cursor: 'pointer'}}></i></a> */}
//                 <a href='#' target={'_blank'} rel="noreferrer">
//                   <img src="/img/gbooks-round-logo.png" alt="Gbooks" style={{maxHeight: '2.2em', boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px 0px', borderRadius: '50%'}} />
//                 </a>
//             </li>
//             <li className="nav-item dropdown has-arrow logged-item" style={{display: isLoggedIn ? '' : 'none'}}>
//               <Link to="#" className="dropdown-toggle nav-link align-items-center" data-toggle="dropdown" aria-expanded="false">
//                 <span className="user-img">
//                   <img className="rounded-circle" src="/img/user_unknown.png" width="31" alt="Darren Elder"/>
//                 </span>
//                 <h6 className="ms-2 mb-0">{userInfo.Name}</h6>
//               </Link>
//               <div className="dropdown-menu dropdown-menu-right">
//                 <div className="user-header d-flex align-items-center">
//                   <div className="avatar avatar-sm">
//                     <img src="/img/user_unknown.png" alt="User" className="avatar-img rounded-circle"/>
//                   </div>
//                   <div className="user-text">
//                     <h6>{userInfo.Name}</h6>
//                     {/*<p className="text-muted mb-0">Doctor</p> */}
//                   </div>
//                 </div>
//                 <Link className="dropdown-item" to={`/profile/${userInfo.PartyCode}`}>
//                   <i className='bx bx-user-circle h3 mb-0 me-3'></i> Members
//                 </Link>
//                 <Link className="dropdown-item" to="/dashboard">
//                   <i className='bx bx-tachometer h3 mb-0 me-3'></i> Services
//                 </Link>
//                 {(MODULES[compCode]?.includes('PHARMACY') && MODULES[compCode]?.includes('LAB_TEST')) || <>
//                 <Link className="dropdown-item" to="/myOrders"><i className='bx bx-gift h3 mb-0 me-3'></i> My Orders</Link>
//                 <Link className="dropdown-item" to="/cartPage"><i className='bx bx-cart-alt h3 mb-0 me-3'></i> Cart</Link>
//                 <Link className="dropdown-item" to="/wishlist"><i className='bx bx-heart h3 mb-0 me-3'></i> My Wishlist</Link></>} 
//                 <span onClick={() => logOut(history)} className="dropdown-item" to="#">
//                   <i className='bx bx-log-out-circle h3 mb-0 me-3'></i> Logout
//                 </span>
//                 {/* <a href='/' className="dropdown-item" to="#">
//                   <i className='bx bx-log-out-circle h3 mb-0 me-3'></i> Logout
//                 </a> */}
//               </div>
//             </li>
//         </ul>
//       </nav>
//       <div className={`menu-backdrop ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}></div>
//     </header>
//     <div className={`main-menu-wrapper ${menuOpen ? 'menu-opened' : ''}`}>
//     <div className="menu-header">
//             <Link to="/" className="menu-logo">
//                 {
//                   existingLogos.includes(compInfo.LogoUrl.split('.')[0]) ? 
//                   <img src={`/img/logo/${compInfo.LogoUrl}`} className="img-fluid logo" alt={compInfo.COMPNAME}/> :
//                   <img src={'/img/logo/opd2.png'} className="img-fluid logo rounded-circle" alt={compInfo.COMPNAME}/>
//                 }
//             </Link>
//             <span id="menu_close" className="menu-close" to="#" onClick={() => setMenuOpen(false)}>
//                 <i className="fas fa-times"></i>
//             </span>
//         </div>
//         {isHeaderActive && <Menu isLoggedIn={isLoggedIn} />}
//     </div>
//     </>
//   )
// }


// const mapStateToProps = (state) => {
//   return { compCode: state.compCode, compInfo: state.compInfo, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, cart: state.cart, siteData: state.siteData, isHeaderActive: state.isHeaderActive };
// }

// export default connect(mapStateToProps, {loginStatusAction, siteDataAction, userInfoAction, compInfoAction, compCodeAction, loaderAction, modalAction})(Header);
