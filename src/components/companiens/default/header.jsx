import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { loginStatusAction, userInfoAction, compInfoAction, compCodeAction, loaderAction, siteDataAction, modalAction } from '../../../actions';
import { connect } from 'react-redux';
import { useFetch, ModalComponent, handleNumberInputs, logOut, customTabsButtons, createDate, getDuration, MODULES, encrypt, JQDatePicker, MyModal, getTotalCartItems, getFrom, LangaugeControl } from './utilities';
import axios from 'axios';
import Menu from './menu';
import { amNursingId, ASTHA_ID, ATINDRA_ID, BASE_URL, BCROY_ID, defaultId, existingLogos, MEDICO_HEALTH_ID, SRC_URL, zero } from '../../../constants';
import { Button } from 'react-bootstrap';
import { AutoComplete } from '../ePharma/utilities';
import { amNursingHome } from '../amNursingHome/home';
import { uType } from '../../utils/utils';


const Header = ({ siteData, modalAction, isLoggedIn, loginStatusAction, userInfo, userInfoAction, cart, compCode, compInfo, compInfoAction, compCodeAction, loaderAction, isHeaderActive }) => {

  const history = useHistory();

  // useEffect(() => {
  //     return history.listen((location) => {                         // Listen for changes in history object or Url changes to toggle active menu link.
  //         setActiveLink(location.pathname);
  //         setMenuOpen(false);
  //     })
  // },[history]) 

  // useEffect(() => {
  //   if (window.location.hash === '#/') {               // set activeLink '/' on page load to highlight the home page link.
  //     setActiveLink('/');
  //   } else if (window.location.hash === '#/pharmacy') {
  //     setActiveLink('/pharmacy');
  //   } else if (window.location.hash === '#/labTests') {
  //     setActiveLink('/labTests');
  //   }     
  // }, [])

  const [activeLink, setActiveLink] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const totalCartItems = getTotalCartItems(cart);          // Add Pharmacy cart and Labtest cart items list to get total no. of cart items.   
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = useState(false);
  const searchBoxRef = useRef();
  const mobileSearchBoxRef = useRef();


  useEffect(() => {
    const onBodyClick = (event) => {                                                                                        
      if (searchBoxRef.current && searchBoxRef.current.contains(event.target)) return;                                      // Return if click is triggered from serach-box div and it's inner elements.
      setSearchBoxOpen(false);                                                                                              // close search-box only if click is triggered from rest of the elements (outer body).                                                                                                   // no need to use useRef because we wish to remove searchList on any clicks including
      setAutoCompleteList({loading: false, data: {PartyMasterList: [], CompanyMasterList: []}, err: {status: false, msg: ''}});
      if (mobileSearchBoxRef.current && mobileSearchBoxRef.current.contains(event.target)) return;                                      // Return if click is triggered from serach-box div and it's inner elements.
      setMobileSearchBoxOpen(false);                                                                                              // close search-box only if click is triggered from rest of the elements (outer body).                                                                                                   // no need to use useRef because we wish to remove searchList on any clicks including
      setAutoCompleteList({loading: false, data: {PartyMasterList: [], CompanyMasterList: []}, err: {status: false, msg: ''}});
    }                                                                                                                        
    document.body.addEventListener('click', onBodyClick, { capture: true });                                                // Add eventlistener on component mount.
    return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                                // Remove Eventlistener on component unmount.
  }, [])

  // SEARCHBAR ---------------------------------------------------------------------------------------------------

  const [searchKey, setSearchKey] = useState({query: '', filterBy: 'INTDOCT'});
  const [isListActive, setListActive] = useState(true); 
  const [autoCompleteList, setAutoCompleteList] = useState({loading: false, data: {PartyMasterList: [], CompanyMasterList: []}, err: {status: false, msg: ''}});

  const Card_4 = ({ data }) => (
    <Link key={data.PartyId} to={`/doctors/${data.PartyCode}?specialistId=${data.SpecialistId}`} className="pointer" style={{padding: '0.7em 1.2em', borderTop: '1px solid #80808030'}}>
        {data.Name}
        {data.SpecialistDesc && <p style={{lineHeight: '1.1', fontSize: '0.9em', margin: '3px 0 1px'}}>{data.SpecialistDesc}</p>}
    </Link>
  )

  const handleSearchInput = (e) => {
    setSearchKey(pre => ({...pre, [e.target.name]: e.target.value}));
    setListActive(true); 
  }

   useEffect(() => {
     const getSearchResult = async (companyCode, key) => {                      
       if (!companyCode) return alert('no companyCode received');                  
       const res = await getFrom(`${BASE_URL}/api/search/Get?CID=${companyCode}&Type=${key.filterBy}&SearchString=${key.query}`, {}, setAutoCompleteList);
       if (res) {
         setAutoCompleteList(res);
       } else {
         console.log('No data received');
       }
     }  
     const timer = setTimeout(() => {
       if (searchKey.query.length < 2) return;
       if (compCode === defaultId) {
         getSearchResult(zero, searchKey);                 // search every company if default company compCode.
       } else {
         getSearchResult(compCode, searchKey);             // search only the current company if not default company compCode.
       }
     }, 500);
     return () => clearTimeout(timer);
  }, [searchKey, zero, compCode])

  const [locationActive, setLocationActive] = useState(false);

  // const CompanySearchCard = ({ data, classes }) => {
  //   return (
  //     <div key={data.EncCompanyId} className={classes}>
  //       <div className={`companyTabCard d-flex cursor-pointer position-relative ${data.COMPNAME === compInfo.COMPNAME ? 'active' : ''}`}>
  //         <img src={`${SRC_URL}/Content/CompanyLogo/${data.LogoUrl}`} className="img-fluid logo" style={{maxHeight: '1.9em', margin: '0 0.5em 0.4em 0'}}/>
  //         <div className=''>
  //           <h5 className="mb-0">{data.COMPNAME}</h5>
  //           <h6>{data.ADDRESS}</h6>
  //         </div>                       
  //       </div>
  //     </div>
  //   ) 
  // }
  // const handleCompSelect = (data) => {
  //   alert('TESTSTS')
  //   userInfoAction({ Department: {dName: 'All', SubCode: 0}, selectedCompany: data })
  // }
  return (
    <>
      <header className="header" id="header">
        <span className="d-none">{activeLink}</span>
        <nav className="navbar navbar-expand-lg header-nav py-1 py-md-0 bg-slate-50" style={{fontSize: '1.6rem'}}>
        <div className="navbar-header flex-1">
          <ul className="nav header-navbar-rht d-flex justify-content-start align-items-center w-100">
            <li className="nav-item d-inline-flex d-lg-none">
              <span id="mobile_btn" onClick={() => setMenuOpen(true)} style={{fontSize: '0.8em'}}>
                  <span className="bar-icon">
                      <span></span>
                      <span></span>
                      <span></span>
                  </span>
              </span>
            </li>
            <li className="nav-item me-auto px-0">
              <Link to="/" className="navbar-brand logo py-0">
                {
                  existingLogos.includes(compInfo.LogoUrl.split('.')[0]) ? 
                  <>
                    {(() => {
                      if (compCode === ASTHA_ID) {
                        return <span className='d-flex align-items-center'><img id="header-logo" src={`/img/logo/${compInfo.LogoUrl}`} className="img-fluid logo" alt={compInfo.COMPNAME}/><span style={{width: 'auto', whiteSpace: 'normal', fontSize: '1.3em'}} className="d-none d-md-inline text-uppercase text-background"> {compInfo.COMPNAME}</span></span>  
                      } else {
                        return <img id="header-logo" src={`/img/logo/${compInfo.LogoUrl}`} className="img-fluid logo" alt={compInfo.COMPNAME}/> 
                      }
                    })()}
                  </>                  
                  :                                                                                                                                 
                  <span className='d-flex align-items-center'>
                    <img id="header-logo" 
                      src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} 
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;                                   // prevents looping
                        currentTarget.src = '/img/logo/opd2.png';
                      }}
                      className="img-fluid logo" alt={compInfo.COMPNAME}
                    />
                    {(() => {
                      if (compCode === BCROY_ID) {
                        return <span style={{width: 'auto', whiteSpace: 'normal', fontSize: '1.3em'}} className="d-none d-md-inline text-uppercase text-background"> Dr. B.&nbsp;C. Roy General Hospital & Maternity Home</span>
                      } else {
                        return <span style={{width: 'auto', whiteSpace: 'normal', fontSize: '1.3em'}} className="d-none d-md-inline text-uppercase text-background"> {compInfo.COMPNAME}</span>
                      }
                    })()}
                  </span>                                                                                                                                                                                        
                }
              </Link>
            </li>

            {/* <li className="nav-item flex-1">
              <div className="position-relative max-w-[28em] w-100">
                <div className="input-group w-100 gap-3">
                  <span className="input-group-text bg-transparent border-0 !text-[0.8em] p-0" onClick={() => setLocationActive(true)}>
                    <div>
                      <p className="mb-0 !text-[0.9em] text-start !leading-[1.5] font-medium" > Select Clinic </p>
                      <b className='text-[1em] text-blue-500'>XYZ Hospitality</b>
                    </div>
                    <i className="bx bxs-down-arrow" />
                  </span>
                  <div className='position-relative flex-1'>
                    <input onChange={handleSearchInput} value={searchKey.query} name="query" type="text" className="form-control !border-2 !border-slate-300 nunito !py-[0.53em] !rounded-md" placeholder="Search Doctors, Clinics, Specialities.." tabIndex={1} autoComplete="off" />
                    <i className="bx bx-search text-[1.4em] absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 text-gray-600" />
                    {isListActive && <AutoComplete name='search-results' list={autoCompleteList.data.PartyMasterList} isLoading={autoCompleteList.loading} setActive={setListActive} children={<Card_4 />} keyName={'LocationItemId'} styles={{zIndex: 1111}} variant={2} />}
                  </div>
                </div>
              </div>
            </li> */}

            <div className='flex gap-2 poppins items-center me-4 d-lg-none text-[0.8em]'>
              <span className='text-dark'>View In : </span>
              <LangaugeControl variant='dark' />  
            </div>

            <li className="nav-item d-sm-none p-0" style={{display: !isLoggedIn ? '' : 'none'}}>
              {/* <button className="nav-link header-login me-2">Login</button>
              <button className="nav-link header-login me-2">Join us</button> */}
              <Link to="#" className="dropdown-toggle nav-link align-items-center p-0 me-2" data-toggle="dropdown" aria-expanded="false">
                <button className="nav-link header-login" style={{fontSize: 'clamp(.6em,2.8vw,0.75em)'}}>Login</button>
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                {(() => {
                  if (compCode === ASTHA_ID) {
                    return (
                      <>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">personal_injury</span> As Patient
                        </span>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PROVIDER})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">handshake</span> As Provider
                        </span>
                      </>
                    )
                  } else if (compCode === MEDICO_HEALTH_ID || compCode === ATINDRA_ID) {
                    return (
                      <>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">personal_injury</span> As Patient
                        </span>
                      </>
                    )
                  } else if (compCode === 'DXjdmwQhaZDlMG0FfaHJxw==') {
                    return (
                      <>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.MARKETBY})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">personal_injury</span> As Marketing Executive
                        </span>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">personal_injury</span> As Patient
                        </span>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.DOCTOR})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">stethoscope</span> As Doctor
                        </span>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PROVIDER})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">handshake</span> As Provider
                        </span>
                        {/* <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: 'REFERRER'})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">stethoscope_arrow</span> As Referrer
                        </span> */}
                        {/* <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.COLLECTOR.level})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">approval_delegation</span> As Collector
                        </span>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.POLYCLINIC.level})} className="dropdown-item">
                          <i className='bx bx-clinic h3 mb-0 me-2'></i> As Polyclinic
                        </span> */}
                        {compCode === defaultId && <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.MARKETBY})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">handshake</span> As Marketing Executive
                        </span>}
                      </>
                    )
                  }
                })()}
              </div>
            </li>
            
            <li className="nav-item d-sm-none px-1">
                <a href={`${SRC_URL}/Login.aspx`} target={'_blank'} rel="noreferrer">
                  <img src="/img/gbooks-round-logo.png" alt="Gbooks" style={{maxHeight: '2.2em', boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px 0px', borderRadius: '50%'}} />
                </a>
            </li>

            <li className="nav-item dropdown has-arrow logged-item d-sm-none" style={{display: isLoggedIn ? '' : 'none'}}>
              <Link to="#" className="dropdown-toggle nav-link px-0" data-toggle="dropdown" aria-expanded="false">
                <span className="user-img">
                  <img className="rounded-circle" src="/img/user_unknown.png" width="31" alt="Darren Elder"/>
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="user-header d-flex align-items-center">
                  <div className="avatar avatar-sm">
                    <img src="/img/user_unknown.png" alt="User" className="avatar-img rounded-circle"/>
                  </div>
                  <div className="user-text">
                    <h6>{userInfo.Name}</h6>
                    {/*<p className="text-muted mb-0">Doctor</p> */}
                  </div>
                </div>
                <Link to={`/profile/${userInfo.PartyCode}`} className="dropdown-item">
                  <i className='bx bx-user-circle h3 mb-0 me-3'></i> Members
                </Link>
                <Link to='/dashboard' className="dropdown-item">
                  <i className='bx bx-tachometer h3 mb-0 me-3'></i> Appointments / Order Manage
                </Link>
                {(MODULES[compCode]?.includes('PHARMACY') && MODULES[compCode]?.includes('LAB_TEST')) || <>
                <Link className="dropdown-item" to="/myOrders"><i className='bx bx-gift h3 mb-0 me-3'></i> My Orders</Link>
                <Link className="dropdown-item" to="/cartPage"><i className='bx bx-cart-alt h3 mb-0 me-3'></i> Cart</Link>
                <Link className="dropdown-item" to="/wishlist"><i className='bx bx-heart h3 mb-0 me-3'></i> My Wishlist</Link></>}
                <span onClick={() => logOut(history)} className="dropdown-item" to="#">
                  <i className='bx bx-log-out-circle h3 mb-0 me-3'></i> Logout
                </span>
                {/* <a href='#' onClick={getLocation} className="dropdown-item" to="#">
                  <i className='bx bx-log-out-circle h3 mb-0 me-3'></i> Location
                </a> */}
              </div>
            </li>

            <li className="nav-item d-sm-none p-0">
              <span to="#" className='search-open-btn'>
                <form className='search-bar' ref={mobileSearchBoxRef}>
                  <div className="input-box">
                    <div className={`${mobileSearchBoxOpen ? 'results-active' : ''} ${isListActive ? 'loaded' : ''}`}>
                      <input id='mobile_search_input' onChange={handleSearchInput} value={searchKey.query} name="query" type="text" tabIndex={1} placeholder="Enter your search key ..." />
                      {isListActive && <AutoComplete name='search-results' list={autoCompleteList.data.PartyMasterList} isLoading={autoCompleteList.loading} setActive={setListActive} children={<Card_4 />} keyName={'LocationItemId'} styles={{zIndex: 1111}} variant={2} />}
                    </div>
                    <label htmlFor="mobile_search_input">
                        <i className='bx bx-search header-login' style={{marginLeft: '1.1em'}} onClick={() => setMobileSearchBoxOpen(!mobileSearchBoxOpen)}></i>
                    </label>
                  </div>
                </form>
              </span>
            </li>

          </ul>

        </div>
        {/* <div className={`main-menu-wrapper ${menuOpen ? 'menu-opened' : ''}`}>
            <div className="menu-header">
                <Link to="/" className="menu-logo">
                    {
                      existingLogos.includes(compInfo.LogoUrl.split('.')[0]) ? 
                      <img src={`/img/logo/${compInfo.LogoUrl}`} className="img-fluid logo" alt={compInfo.COMPNAME}/> :
                      <img src={'/img/logo/opd2.png'} className="img-fluid logo rounded-circle" alt={compInfo.COMPNAME}/>
                    }
                    
                </Link>
                <span id="menu_close" className="menu-close" to="#" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-times"></i>
                </span>
            </div>
            <ul className="main-nav">
                <li className="" style={{display: isLoggedIn ? '' : 'none'}}>
                  <Link to="#" onClick={() => {setMenuOpen(false);navigateTo()}}>
                    <i className='bx bxs-id-card h3 mb-0 me-2 d-md-none'></i> Dashboard
                  </Link>
                </li>
                <li className='d-md-none'>
                  <Link to='/specialists' onClick={() => {setMenuOpen(false);}}>
                    <i className='bx bxs-contact h3 mb-0 me-2'></i> Specialists
                  </Link>
                </li>
                <li className="d-md-none">
                  <Link to="/cartPage" onClick={() => setMenuOpen(false)}>
                    <i className='bx bx-cart-alt h3 mb-0 me-2'></i> Cart
                  </Link>
                </li>
                <li className="d-md-none">
                  <Link to="/cartPage" onClick={() => setMenuOpen(false)}>
                    <i className='bx bxs-package h3 mb-0 me-2'></i> My Orders
                  </Link>
                </li>
            </ul>
        </div> */}
        <div className='flex gap-2 poppins items-center me-4 d-none d-lg-flex text-[0.9em]'>
          <span className='text-dark'>View In : </span>
          <LangaugeControl variant='dark' />  
        </div>
        
        <ul className="nav header-navbar-rht">
          {MODULES[compCode]?.includes('OPD') || <li className={`px-0 py-1 tab-btn big-menu ${activeLink === '/specialists' ? 'active': ''}`}>        {/* Toggle activeLink by directly tracking the hash. */}
              <Link className='nav-link' to="/specialists" style={{fontSize: '0.9em', padding: '0.6em 0.7em'}}>
                  OPD SERVICES
                  <hr style={{"margin": "0", "marginTop": "2px", "background": "#0000004f"}} />
                  <span className="d-block mt-1" style={{"fontWeight": "500", "fontSize": "0.84em"}}>
                    {/* {compCode === BCROY_ID ? "Doctor's Schedule" : "Book Appointment"} */}
                    Book Appointment
                  </span>
              </Link>
          </li>}
          {/* {MODULES[compCode]?.includes('PHARMACY') || <li className={`px-0 py-1 tab-btn big-menu ${activeLink === '/pharmacy' ? 'active': ''}`} style={{display: 'inline-flex'}}>
              <Link className='nav-link' to="/pharmacy" style={{fontSize: '0.9em', padding: '0.6em 0.7em'}}>
                  PHARMACY
                  <hr style={{"margin": "0", "marginTop": "2px", "background": "#0000004f"}} />
                  <span className="d-block mt-1" style={{"fontWeight": "500", "fontSize": "0.84em"}}>Medicines & Products</span>
              </Link>
          </li>} */}
          {MODULES[compCode]?.includes('LAB_TEST') || <li className={`px-0 py-1 tab-btn big-menu ${activeLink === '/labTests' ? 'active': ''}`}  style={{display: 'inline-flex'}}>
              <Link className='nav-link' to="/labTests" style={{fontSize: '0.9em', padding: '0.6em 0.7em'}}>
                  LAB TESTS
                  <hr style={{"margin": "0", "marginTop": "2px", "background": "#0000004f"}} />
                  <span className="d-block mt-1" style={{"fontWeight": "500", "fontSize": "0.84em"}}>Health check-ups</span>
              </Link>
          </li>}
          {/* <li className="nav-item contact-item">
            <div className='d-flex align-items-center'>
              <div className="header-contact-img">
                  <i className="fas fa-map-marker text-dark"></i>
              </div>
              <div className="header-contact-detail">
                  <p className="contact-header">Location</p>
                  <p className="contact-info-header"> Select Location</p>
              </div>
            </div>
            <form className="hm-searchbox" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
              <input name="query" type="text" placeholder="Enter your search key ..." autoComplete='off'/>
              <button className="li-btn" type="submit"><i className="fa fa-search text-white"></i></button>
              <AutoComplete name='search-rersults' list={[]} isLoading={true} setActive={() => {}} children={<Button />} keyName={'LocationItemId'}/>
            </form>
          </li> */}

          {(MODULES[compCode]?.includes('PHARMACY') && MODULES[compCode]?.includes('LAB_TEST')) || <li className="nav-item">
              <Link to='/cartPage' className='' onClick={() => setMenuOpen(false)}>
                <i className='bx bx-cart-alt h2 mb-0 mt-2 position-relative'>
                  <span id="cart-badge" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '11px', fontFamily: 'Poppins', display: totalCartItems > 0 ? 'block' : 'none'}}>{totalCartItems}</span>
                </i>
              </Link>
          </li>}
          
          <li className="nav-item">
            <span to="#" className='search-open-btn'>
              <form className='search-bar' ref={searchBoxRef}>
                <div className="input-box">
                  <div className={`${searchBoxOpen ? 'results-active' : ''} ${isListActive ? 'loaded' : ''}`}>
                    <input onChange={handleSearchInput} value={searchKey.query} name="query" type="text" id='search_input' tabIndex={1} placeholder="Enter your search key ..." autoComplete='off'/>
                    {isListActive && <AutoComplete name='search-results' list={autoCompleteList.data.PartyMasterList} isLoading={autoCompleteList.loading} setActive={setListActive} children={<Card_4 />} keyName={'LocationItemId'} styles={{zIndex: 1111}} variant={2} />}
                  </div>
                    <label htmlFor="search_input">
                        <i className='bx bx-search header-login' onClick={() => setSearchBoxOpen(!searchBoxOpen)} style={{marginLeft: '1.2em'}}></i>
                    </label>
                </div>
              </form>
            </span>
          </li>

          {/* <li className="nav-item" style={{display: isLoggedIn ? 'none' : ''}}>
              <button className="nav-link header-login" to="#" onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.POLYCLINIC.level})}>Join us</button>
          </li> */}

                                          {/* has-arrow */}
          <li className="nav-item dropdown logged-item" style={{display: isLoggedIn ? 'none' : ''}}>
            <Link to="#" className="dropdown-toggle nav-link align-items-center" data-toggle="dropdown" aria-expanded="false">
              <button className="nav-link header-login" style={{fontSize: 'clamp(.6em,2.8vw,0.75em)'}}>Login</button>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
            {(() => {
                  if (compCode === ASTHA_ID) {
                    return (
                      <>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">personal_injury</span> As Patient
                        </span>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PROVIDER})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">handshake</span> As Provider
                        </span>
                      </>
                    )
                  } else if (compCode === MEDICO_HEALTH_ID || compCode === ATINDRA_ID) {
                    return (
                      <>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">personal_injury</span> As Patient
                        </span>
                      </>
                    )
                  } else if (compCode === 'DXjdmwQhaZDlMG0FfaHJxw==') {
                    return (
                      <>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.MARKETBY})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-2">personal_injury</span> As Marketing Executive
                        </span>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-3">personal_injury</span> As Patient
                        </span>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.DOCTOR})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-3">stethoscope</span> As Doctor
                        </span>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PROVIDER})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-3">handshake</span> As Provider
                        </span>
                        {/* <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: 'REFERRER'})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-3">stethoscope_arrow</span> As Referror
                        </span> */}
                        {/* <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.COLLECTOR.level})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-3">approval_delegation</span> As Collector
                        </span>
                        <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.POLYCLINIC.level})} className="dropdown-item">
                          <i className='bx bx-clinic h3 mb-0 me-3'></i> As Polyclinic
                        </span> */}  
                        {compCode === defaultId && <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.MARKETBY})} className="dropdown-item">
                          <span className="material-symbols-outlined notranslate h3 mb-0 me-3">personal_injury</span> As Marketing Executive
                        </span>}
                      </>
                    )
                  }
                })()}
            </div>
          </li>



          {/* <li className="nav-item" style={{display: isLoggedIn ? 'none' : ''}}>
              <button className="nav-link header-login" to="#" onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})}>Login </button>
          </li> */}
          <li className="nav-item">
              <a href={`${SRC_URL}/Login.aspx`} target={'_blank'} rel="noreferrer">
                <img src="/img/gbooks-round-logo.png" alt="Gbooks" style={{maxHeight: '2.2em', boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px 0px', borderRadius: '50%'}} />
              </a>
          </li>
          <li className="nav-item dropdown has-arrow logged-item" style={{display: isLoggedIn ? '' : 'none'}}>
            <Link to="#" className="dropdown-toggle nav-link align-items-center" data-toggle="dropdown" aria-expanded="false">
              <span className="user-img">
                <img className="rounded-circle" src="/img/user_unknown.png" width="31" alt="Darren Elder"/>
              </span>
              <h6 className="ms-2 mb-0">{userInfo.Name}</h6>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="user-header d-flex align-items-center">
                <div className="avatar avatar-sm">
                  <img src="/img/user_unknown.png" alt="User" className="avatar-img rounded-circle"/>
                </div>
                <div className="user-text">
                  <h6>{userInfo.Name}</h6>
                  {/*<p className="text-muted mb-0">Doctor</p> */}
                </div>
              </div>
              <Link className="dropdown-item" to={`/profile/${userInfo.PartyCode}`}>
                <i className='bx bx-user-circle h3 mb-0 me-3'></i> Members
              </Link>
              <Link className="dropdown-item" to="/dashboard">
                <i className='bx bx-tachometer h3 mb-0 me-3'></i> Appointments / Order Manage
              </Link>
              {(MODULES[compCode]?.includes('PHARMACY') && MODULES[compCode]?.includes('LAB_TEST')) || <>
              <Link className="dropdown-item" to="/myOrders"><i className='bx bx-gift h3 mb-0 me-3'></i> My Orders</Link>
              <Link className="dropdown-item" to="/cartPage"><i className='bx bx-cart-alt h3 mb-0 me-3'></i> Cart</Link>
              <Link className="dropdown-item" to="/wishlist"><i className='bx bx-heart h3 mb-0 me-3'></i> My Wishlist</Link></>} 
              <span onClick={() => logOut(history)} className="dropdown-item" to="#">
                <i className='bx bx-log-out-circle h3 mb-0 me-3'></i> Logout
              </span>
              {/* <a href='/' className="dropdown-item" to="#">
                <i className='bx bx-log-out-circle h3 mb-0 me-3'></i> Logout
              </a> */}
            </div>
          </li>
        </ul>
      </nav>
      <div className={`menu-backdrop ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}></div>
    </header>
    {/* <CompanySearchCard data={{COMPNAME: 'NEW LOCATION'}} /> */}
    <div className={`main-menu-wrapper ${menuOpen ? 'menu-opened' : ''}`}>
    <div className="menu-header">
            <Link to="/" className="menu-logo">
                {
                  existingLogos.includes(compInfo.LogoUrl.split('.')[0]) ? 
                  <img src={`/img/logo/${compInfo.LogoUrl}`} className="img-fluid logo" alt={compInfo.COMPNAME}/> :
                  <img src={'/img/logo/opd2.png'} className="img-fluid logo rounded-circle" alt={compInfo.COMPNAME}/>
                }
            </Link>
            <span id="menu_close" className="menu-close" to="#" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-times"></i>
            </span>
        </div>
        {isHeaderActive && <Menu isLoggedIn={isLoggedIn} handleOpen={setMenuOpen} />}
        <style>{compCode === amNursingId && amNursingHome}</style>
    </div>
    </>
  )
}


const mapStateToProps = (state) => {
  return { compCode: state.compCode, compInfo: state.compInfo, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, cart: state.cart, siteData: state.siteData, isHeaderActive: state.isHeaderActive };
}

export default connect(mapStateToProps, {loginStatusAction, siteDataAction, userInfoAction, compInfoAction, compCodeAction, loaderAction, modalAction})(Header);
