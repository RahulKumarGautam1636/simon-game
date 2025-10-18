import React, { useState, useEffect, useCallback, useRef } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { connect } from 'react-redux';
import { toastAction, breadCrumbAction, isMobileAction, modalAction, globalDataAction, loaderAction, userInfoAction, cartAction, wishlistAction, bookingInfoAction, loginStatusAction, resetUserAction } from '../../../actions';
import RenderCarousel from '../../carousel.jsx';

import Carousel from 'react-bootstrap/Carousel';
// import history from '../history';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, useHistory } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import store from './../../../index.js';
import { createPortal } from 'react-dom';
import Alert from 'react-bootstrap/Alert';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import { BASE_URL, defaultId, ePharmaId, TAKE_HOME_ID, userRegType, XYZ_ID } from '../../../constants.js';
// import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { initAppState } from '../../../reducers/appState.js';
import Skeleton from 'react-loading-skeleton';
import { NoContent } from '../default/utilities.jsx';


const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;

// export const useFavicon = url => {
//   useEffect(() => {
//     const el = document.createElement('link');
//     el.rel = 'icon';
//     el.href = url;
//     el.async = true;
//     document.head.appendChild(el);
//     return () => {
//       document.head.removeChild(el);
//     };
//   }, [url]);
// };

export const UseFavicon = ({ compCode }) => {
  useEffect(() => {
    let companies = {
      [ePharmaId]: 'epharma.png',
      [TAKE_HOME_ID]: 'takeHome.png',
      [XYZ_ID]: 'XYZ.png'
    }
    const el = document.createElement('link');
    el.rel = 'icon';
    el.href = `/images/favicons/${companies[compCode]}`;
    el.async = true;
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, [compCode]);
  return;
};

export const NologinWarning = () => {
  return (
    <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{background: '#bdbdbd'}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger fw-bold" id="exampleModalLabel">Warning !</h5>
            <Link className="btn-close" to='/' aria-label="Close" ></Link>
          </div>
          <div className="modal-body">
            You are not Logged in Please log in to view this page.
          </div>
          <div className="modal-footer">
            <Link to='/' className="btn btn-primary" data-dismiss="modal">GO TO HOMEPAGE</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const handleNumberInputs = (e, setStateName, isObject=true) => {
  const {name, value} = e.target;
  const re = /^[0-9\b]+$/;
  if (value === '' || re.test(value)) {
    if (!isObject) return setStateName(value);
   setStateName(preValue => {
       return {...preValue, [name]: value};
     });
  }
}

export const getCurrentDate = () => {
  const d = new Date();
  const currentDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
  return currentDate;
}

const IsMobile = ({ isMobileAction }) => {                                             // Determines if device is mobile or desktop.

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    isMobileAction(mediaQuery.matches);
    const handleMediaQueryChange = (e) => {
      isMobileAction(e.matches);
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [isMobileAction])

  return;
}

const mapStateToIsMobile = (state) => {
  return {};
}
export const ConnectedIsMobile = connect(mapStateToIsMobile, {isMobileAction})(IsMobile);

const ShowToast = ({ isToastActive, toastAction, isMobile }) => {

    return (
      <div aria-live="polite" aria-atomic="true" className="toastBackground" style={{position: 'fixed', top: '0', left: '0', height: '100vh', width: '100vw', pointerEvents: 'none'}}>
        <ToastContainer className="p-3" position={isMobile ? 'bottom-center' : 'middle-end'}>
          <Toast onClose={() => toastAction(false, {})} show={isToastActive.status} delay={300000} autohide>
            <Toast.Header>
              <img src="favicon.PNG" className="rounded me-3" alt="asdf" style={{height: '2.5rem'}}/>
              <strong className="me-auto">{isToastActive.msg}</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>
              <div className="w-100 d-flex justify-content-between">
                <p className="mb-0 fw-bold">{isToastActive.item.Description}</p>
                <p className="mb-0 fw-bold mark bg-success rounded-pill px-4">₹ {isToastActive.item.SRate}</p>
              </div>
              <Link to={'/cartPage'} className='controlled-btn mt-2' style={{display: 'inline-block', fontFamily: 'Poppins', padding: '0.4em 1.4em 0.3em'}}>Visit Cart</Link>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
}

const mapStateToProps2 = (state) => {
  return { isToastActive: state.isToastActive, isMobile: state.isMobile };
}

export const ConnectedToast = connect(mapStateToProps2, {toastAction})(ShowToast);

export const ProductToastCard = ({ toastData, closeToast }) => {
  return (
    <div className="toast fade show">
      <div className="toast-header" style={{color: 'var(--clr-1)'}}>
        <i className='bx bxs-smile me-2' style={{fontSize: '1.4em'}}></i>
        <strong className="me-auto">{toastData.msg}</strong><small className='text-muted'>Just now</small>
        <button type="button" onClick={closeToast} className="btn-close"></button>
      </div>
      <div className="toast-body">
        <div className="w-100 d-flex justify-content-between">
          <p className="mb-0 fw-bold text-dark">{toastData.product.name}</p>
          <p className="mb-0 fw-bold mark bg-success rounded-pill px-4">₹ {toastData.product.price}</p>
        </div>
        <Link className="controlled-btn mt-2" onClick={closeToast} to={toastData.button.link} style={{display: 'inline-block', fontFamily: 'Poppins', padding: '0.4em 1.4em 0.3em'}}>{toastData.button.text}</Link>
      </div>
    </div>
  )
}

export const productToast = (productToastData, options) => {
  let { vType, globalData } = store.getState();
  if ((vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') || globalData.userRegType.CodeValue === 'Retailer') return;
  return toast(<ProductToastCard toastData={productToastData} />, { position: "top-right", autoClose: 2500, closeButton: false, className: 'product-toast', ...options });
};
export const stringToast = (toastData, type='') => toast(toastData, { type: type, autoClose: 2000 });

export const Notice = ({ toastData, closeToast }) => {
  return (
    <div className='d-flex align-items-center gap-4'>
      <i className='bx bxs-info-circle' style={{fontSize: '3em', color: 'orangered'}}></i>
      <div>
        <h4 style={{color: 'orangered'}}>{toastData.title}</h4>
        <span>{toastData.msg}</span>
      </div>
    </div>
  )
}

export const noticeToast = (noticeData, options) => toast(<Notice toastData={noticeData} />, options); 

export const ControlledCarousel = ({ data, interval, controls }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={interval} controls={controls}>
        {
            data.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                    <img className="w-100" src={item} alt={`${index + 1}_slide`}/>
                    {/* <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
              )
            })
        }
    </Carousel>
  );
}


export const ControlledTabs = ({ children, data, activetab }) => {
  const [key, setKey] = useState(activetab);

  return (
    <Tabs
      id="date-slot-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {
        data.map((item, index) => {
          return (
            <Tab eventKey={item.name.sName} key={index} title={item.name.sName}>
              {React.cloneElement(children, { data: item.name, key: index })}
            </Tab>
          );
        })
      }
    </Tabs>
  );
}


export const makeAppointment = (isLoggedIn, action, status, mode, history) => {
  if (isLoggedIn) {
    history.push('/specialists');
  } else {
    action(status, mode);
  }
}

export const useDocumentTitle = (title, prevailOnUnmount = false) => {      // To Dynamicall set the website Title.
  const defaultTitle = useRef(document.title);                              // Used in header page.
  // const favIcon = useRef(document.);                                     // Used in header page.

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  }, [prevailOnUnmount])
}


export const ModalComponent = ({ isActive, child, className }) => {

  return (
    <Modal show={isActive} centered backdrop="static" className={`${className} epharma-global`} keyboard={false}>                   
      <Modal.Body>
        {child}
      </Modal.Body>
    </Modal>
  )
}

// Remove empty, nil, undefined values from objects.
// _.omitBy({ a: null, b: 1, c: undefined, d: false }, _.isNil)
// let o = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== '' || v !== null));

export const CustomModal = ({ isActive, heading, child, handleClose, modalName }) => {

  return (
    <div className={`custom-modal-backdrop ${isActive ? 'active' : ''}`}>
        <div className='custom-modal'>
        <i className='bx bx-x-circle close-custom-modal' onClick={() => handleClose(modalName, false)}></i>
            {child}
        </div>
    </div>
  )
}

export const DropdownElement = ({ title, variant, data }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant={variant} id="dropdown-basic">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {data.map((item, index) => {
          return (
            <Dropdown.Item as="button">{item.text}</Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export const customTabsButtons = (data, activeItem, onClickHandler) => {
  return data.map((item, index) => {
    return (
      <label className={`custom_check ${activeItem === item ? 'active' : ''}`} key={index}>
        <input type="button" name="tab-input" onClick={() => onClickHandler(item)}/>
        As {item}
      </label>
    )
  })
}

export const handleLogOut = (history) => {
 
  store.dispatch(resetUserAction());
  store.dispatch(bookingInfoAction(initAppState.bookingInfo));
  store.dispatch(cartAction('EMPTY_CART', {}, ''));
  store.dispatch(wishlistAction('EMPTY_WISHLIST', {}, ''));
  store.dispatch(globalDataAction({ 
    scrollPos: { home: '', filterPage: '' },
    prescription: { required: true, patient: { docName: '', docAddress: '' } },
  }));
  // store.dispatch({ type: 'EMPTY_CART', payload: initAppState.cart });    // alternative syntax.
  
  localStorage.removeItem('ePharmaUserData');
  localStorage.removeItem('epharmaItemsList');

  store.dispatch(loginStatusAction(false));
  history.push('/');
  store.dispatch(modalAction('ALERT_MODAL', true, 'logout'));
}

// export const logOutUser = async (history) => {
//   // let { compCode } = store.getState();
//   localStorage.removeItem('userLoginData');
//   localStorage.removeItem('epharmaItemsList');
//   // localStorage.removeItem(`userLocation_${compCode}`);
//   history.push('/');
//   store.dispatch(modalAction('ALERT_MODAL', true, 'logout'));
//   await wait(2000);
//   window.reloadPage();
// }

const Logout = ({ isLoggedIn, modalAction }) => {
  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) return;                      // prevents loop due to reload.
    setTimeout(() => {
      localStorage.removeItem('ePharmaUserData');
      localStorage.removeItem('epharmaItemsList');
      window.reloadPage();
    }, 1000);
  },[])

  return (
    <div className="order-success-modal logout-page">
        {isLoggedIn ? <Spinner min_height='10rem' fSize='1.6rem'/> : <i className='bx bx-check'></i>}
        <h3 style={{margin: '1.4em 0 0.4em'}}>
          {isLoggedIn ? 'Please Wait...' : 'You Successfully Logged out !'}
        </h3>
        <p>Thank You, Visit Again !</p>
        <div className="cart-buttons mt-0 justify-content-center">
            <button onClick={() => {history.push('/'); modalAction('LOGIN_MODAL', true)}} className="continue-button border-0">Login Again</button>
            <Link to={'/'} className="continue-button border-0">Back to Home</Link>
        </div>
    </div>
  )
}
const mapStateToLogout = (state) => ({ isLoggedIn: state.isLoggedIn });
export const ConnectedLogout = connect(mapStateToLogout, {modalAction})(Logout);

export const Spinner = ({ min_height='10rem', fSize='16px', styles }) => {                
  return (
    <>
      <div className='spinner-box' style={{minHeight: min_height, fontSize: fSize, ...styles}}>
        <svg className="loader" viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
          <circle
            className="active"
            pathLength="360"
            fill="transparent"
            strokeWidth="32"
            cx="192"
            cy="192"
            r="176"
          ></circle>
          <circle
            className="track"
            pathLength="360"
            fill="transparent"
            strokeWidth="32"
            cx="192"
            cy="192"
            r="176"
          ></circle>
        </svg>
      </div>
    </>
  )
}

export const getFrom = async (queryUrl, params={}, setStateName, signal='') => {
  setStateName(preValue => {
    return {...preValue, loading: true};
  })
  try {
    const res = await axios.get(queryUrl, { params: params, signal: signal });
    if (res.status === 200) {
      return {loading: false, data: res.data, err: {status: false, msg: ''}};
    } else if (res.status === 500) {
      setStateName(preValue => {
        return {...preValue, loading: false, err: {status: true, msg: res.status}};
      })
      return false;
    }
  } catch (error) {
    console.log(error);
    setStateName(preValue => {
      return {...preValue, loading: false, err: {status: true, msg: error.message}};
    })
    return false;
  }
}

// const useWindowSize = () => {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
//   // const [width, height] = useWindowSize();     // use it like this in components. Resizing will update the component as it is connected with useState.
// }


export const BreadCrumb = ({ breadCrumbAction, breadCrumbData }) => {
  if (window.location.hash === '#/' || window.location.hash === '#/#top') return;
  return (
    <div className="breadcrumb-area">
      <div className="container">
        <div className="breadcrumb-content">
          <ul>
            {/* {data.links.map((item, index) => <li key={index} className={`${data.activeLink === item.link ? 'active' : ''}`}>{data.activeLink === item.link ? `${item.name}` : <Link to={item.link}>{item.name}</Link>}</li>)} */}

            {breadCrumbData.links.map((item, index) => breadCrumbData.activeLink === item.link ? <li key={index} className="active">{item.name}</li> : <li key={index}><Link to={item.link}>{item.name}</Link></li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

const mapStateToBreadCrumb = (state) => {
  return { breadCrumbData: state.breadCrumbData };
}

export const ConnectedBreadCrumb = connect(mapStateToBreadCrumb, {breadCrumbAction})(BreadCrumb);

export const NotFound = () => {
  return (
    <div className='not-found'>
      <img src="images/err-404.jpg" alt="not found"/>
      <h3 className='mt-4'>The page you are looking for couldn't be found.</h3>
      <Link to='/' className='add_an_item_btn'>Go Back</Link>
    </div>
  )
}


export const updateLocalStorageItems = () => {                                             // Update localStorage cart, wislist items whenever changes are made in either of them.
    let { cart, wishlist } = store.getState();                                             // Can't do this in useEffect connected with cart and wishlist Due to looping problem.
    let cartItems = Object.values(cart).map(i => ({id: i.LocationItemId, packSizeId: i.PackSizeId}));
    let wishListItems = Object.values(wishlist).map(i => ({id: i.LocationItemId, packSizeId: i.PackSizeId}));
    localStorage.setItem("epharmaItemsList", JSON.stringify({sCart: cartItems, sWishlist: wishListItems}));
}

export const scrollWithOffset = (el, offsetValue) => {                                  // Scroll with offset. Works with Hashlink. Got from Hashlink docs.
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;              // Add "#top" after path in to prop to scroll to the top of the page after loading the next page.
  const yOffset = -offsetValue; 
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}


export const AutoComplete = ({ name, list, setActive=()=>{}, query='', historySearch=()=>{}, customClass='', styles, ulClasses, children, loader, keyName, itemName='Items', message='', isLoading=false, closeIcon=true, isHistory=false, cardClick=()=>{}, variant=1, noContentMsg }) => {
  const listRef = useRef();
  let savedQueries = isHistory ? JSON.parse(localStorage.getItem('search_history')) : isHistory;
  let [searchHistory, setSearchHistory] = useState(savedQueries || { isEnbled: isHistory, list: []});

  useEffect(() => {
    const onBodyClick = (event) => {                                                                                        // no need to use useRef because we wish to remove searchList on any clicks including clicks on the searchList itself.
      if (listRef.current && listRef.current.contains(event.target)) return;    
      if (!closeIcon) return;            
      setActive(false);
    }                                                                                                                        
    document.body.addEventListener('click', onBodyClick, { capture: true });                                               
    return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                               
  }, [])

  useEffect(() => {
    if (!searchHistory.isEnbled) return;
    if (!query) return;
    const timer = setTimeout(() => {
      let isDuplicate = searchHistory.list.find(i => i.trim() === query.trim());
      if (isDuplicate) return;
      setSearchHistory(pre => {
        pre.list = pre.list.slice(0, 8);
        return {...pre, list: [ query, ...pre.list ]};
      });
    }, 1500);
    return () => clearTimeout(timer);
  },[query])

  useEffect(() => {
    localStorage.setItem("search_history", JSON.stringify(searchHistory));
  },[JSON.stringify(searchHistory)])

  if (variant === 2) {
    return (
      <div className={`search-results-1 overflow-hidden z-[1111] ${customClass}`} ref={listRef} style={styles}>
          <ul className={`mb-0 max-h-[24em] overflow-auto ${ulClasses}`}>
            {isLoading ? 
              <Skeleton style={{fontSize: '2em'}} count={10}/> : 
              list.map((i, n) => <li key={keyName ? i[keyName] : n} onClick={() => cardClick(i)}>{React.cloneElement(children, { data: i, handleActive: setActive })}</li>)
            }
          </ul>
      </div>
    )
  } else {

    return (
      <div className={`search-results ${customClass}`} ref={listRef} style={styles}>
          {searchHistory.isEnbled && searchHistory.list.length ? <div className='history'>
              <div className="search-details pt-0">
                  <h5>Search History</h5>
                  {searchHistory.list.length ? 
                  <div className='d-flex gap-3'>
                    {searchHistory.isEnbled ? <h5 onClick={() => setSearchHistory({isEnbled: false, list: searchHistory.list})} role='button'><i className='bx bx-notepad' title='Disable Search History'></i></h5> : ''}
                    <h5 onClick={() => setSearchHistory(pre => ({...pre, list: []}))} role='button'><i className='bx bx-x-circle'></i> Clear</h5>
                  </div> : ''}
              </div>
              <ul className='list-inline' style={{paddingBottom: '0.9em'}}>
                {searchHistory.list.map(i => (<li key={i}><span onClick={() => historySearch(i)}>{i}</span> <i className='bx bx-x' onClick={() => setSearchHistory(pre => ({...pre, list: pre.list.filter(x => x !== i)}))}></i></li>))}
              </ul>
          </div> : ''}
          {isLoading ? 
          (loader ? loader : <Spinner min_height='19rem' fSize='1.5rem'/>) :
          <div className="search-content">
              <div className="search-details">
                  <h5>We found <span>{list.length}</span> {itemName}</h5>
                  {closeIcon ? 
                  <div className='d-flex gap-3'>
                    {isHistory && !searchHistory.isEnbled ? <h5 onClick={() => setSearchHistory({isEnbled: true, list: savedQueries.list.length ? savedQueries.list : (query.trim() ? [query] : [])})} role='button'><i className='bx bx-notepad' title='Enable Search History'></i></h5> : ''}
                    <h5 onClick={() => setActive(false)} role='button'><i className='bx bx-x-circle'></i> Close</h5>
                  </div> : ''}
              </div>
              <div className="autoComplete-list">
                  {list.length ? <ul className={`list-inline mb-0 ${ulClasses}`}>
                      {list.map((i, n) => <li key={keyName ? i[keyName] : n} onClick={() => cardClick(i)}>{React.cloneElement(children, { data: i, handleActive: setActive })}</li>)}
                    </ul> : 
                  <NoContent styles={{fontSize: '0.45em'}} textClass='text-rose-600 mb-0' head={noContentMsg} />}
              </div>
              {message ? <p className='auto-complete-msg' style={{margin: '0.5em 0 0', color: 'orangered',fontWeight: 500, fontSize:"1.2em"}}><i className='bx bx-info-circle'></i> {message}</p> : ''}
          </div>}
      </div>
    )
  }
}

export const mmDDyyyyDate = (date, currSeperator, requiredSeperator) => {                 // Convert dd/mm/yyyy to mm/dd/yyyy format because dd/mm/yyyy is not taken as Date() object to create new date.
  if (!date) return '';
  if (!date.includes(currSeperator)) return console.log('CurrentSeperator does not exist in received date.');
  const [dd, mm, yyyy] = date.split(currSeperator);
  return mm + requiredSeperator + dd + requiredSeperator + yyyy;                  
}  

export const JQDatePicker = ({ id, curValue, setState, name, customClass, handler, format='dd/mm/yy', required }) => {

  useEffect(() => {
    window.$(`#${id}`).datepicker({
      dateFormat: format,
      changeMonth: true,
      changeYear: true,
      yearRange: "-60:+0",
      onSelect: function() {this.focus()}, 
      onClose: function(date) {
        if (handler) return handler(date);
        setState(pre => ({ ...pre, [name]: date}))
      }      
    });
    console.log('picker rendered');
    return () => window.$(`#${id}`).datepicker( "destroy" );
  },[id, setState, name, format])             // passing handler causing problem (datepicker not closing) when user types invalid date in input.

  const handleChange = (e) => {               // character validation for android apps.
    let value = e.target.value;
    if (isNaN(value.split('/').join(''))) return 
    setState(pre => ({ ...pre, [name]: value}))
  }

  return <input type="text" maxLength={10} required value={curValue} onChange={handleChange} className={customClass} autoComplete="off" id={id} tabIndex={1}/>;
}

export const createDate = (days, months, years) => {
  var date = new Date(); 
  date.setDate(date.getDate() - days);
  date.setMonth(date.getMonth() - months);
  date.setFullYear(date.getFullYear() - years);  
  return date.toLocaleDateString('en-TT');
  // return date.toISOString().substr(0, 10);    
}

export const MyModal = ({ handleClose, name, customClass, fullscreen, child, isStatic, width='', closeIcon=true, interval='', styles, bodyClass }) => {

  const handleHide = () => {
    if (name === 'local-modal') {               // for local state controlled modals.
      handleClose(false);                        
    } else if (name === 'local-handler') {      // for local/redux state controlled modals with addional line of code to run with modal hide.
      handleClose();                              
    } else {                                    // default for redux state controlled modals.
      handleClose(name, false);       
    }
  }

  const handleBGClick = () => {
    if (!isStatic) return handleHide();
  }

  useEffect(() => {
    const autoClose = async () => {
      if (interval) {
        await wait(interval); 
        handleHide();
      }
    }
    autoClose();
  },[interval, handleHide])

  return (
    createPortal(
      <section className={`myModal ${customClass} ${fullscreen} epharma-global`}>
        <div className="bg-overlay" onClick={handleBGClick}></div>
        <div className={`myModal-body ${bodyClass}`} style={{...styles, maxWidth: width}}>
          {closeIcon && <i className='bx bx-x-circle modal-close-btn' onClick={handleHide}></i>}
          {React.cloneElement(child, { handleClose: handleClose })}
        </div>
      </section>,
      document.body
    )
  )
}

export const getDuration = (date) => {

  // let [byears, bmonths, bdays] = date ? date.split('-') : new Date().toLocaleDateString('en-CA').split('-');
  let [bdays, bmonths, byears] = date ? date.split('/') : new Date().toLocaleDateString('en-TT').split('/');
  let [days, months, years] = new Date().toLocaleDateString('en-TT').split('/');
  
  var by = Number.parseFloat(byears),
      bm = Number.parseFloat(bmonths),
      bd = Number.parseFloat(bdays),
      ty = Number.parseFloat(years),
      tm = Number.parseFloat(months),
      td = Number.parseFloat(days);

  if (td < bd) {
    days = (td - bd + 30);
    tm = tm - 1;
  } else {
    days = (td - bd);
  }

  if (tm < bm) {
    months = (tm - bm + 12);
    ty = ty - 1;
  } else {
    months = (tm - bm)
  }
  years = (ty - by);
  return { 
           years: years ? years : 0,
           months: months ? months : 0,
           days: days ? days : 0 
         }
}

export const wait = async (time) => await new Promise((resolve) => setTimeout(resolve, time));

export const LoginAlert = ({ type, modalAction }) => {

  const history = useHistory();
  
  switch (type) {
      case 'login':
          return (
            <Alert variant="light">
                <Alert.Heading><h4 className='text-center'>Welcome !</h4></Alert.Heading>          
                <div className="d-flex justify-content-end flex-column align-items-center">
                    <img src="/assets/img/ePharma/success.png" alt="success" className='img-fluid' style={{maxWidth: '23rem', width: 'auto'}} />
                    <h4>You Logged in successfully.</h4>
                </div>
                <div className="progress mt-4">
                    <div className="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </Alert>
        )

      case 'register':
          return (
            <Alert variant="light">
                <Alert.Heading><h4 className='text-center'>Welcome !</h4></Alert.Heading>          
                <div className="d-flex justify-content-end flex-column align-items-center">
                    <img src="/assets/img/ePharma/success.png" alt="success" className='img-fluid' style={{maxWidth: '23rem', width: 'auto'}} />
                    <h4>Registration Successfull.</h4>
                </div>
            </Alert>
        )

      case 'logout':
          return (
            <Alert variant="light">
                <Alert.Heading><h4 className='text-center'>Thank you for visiting !</h4></Alert.Heading>          
                {/* <div className="d-flex justify-content-end flex-column align-items-center">
                    <img src="/assets/img/ePharma/success.png" alt="success" className='img-fluid' style={{maxWidth: '23rem', width: 'auto'}} />
                    <h4>You successfully Logged out.</h4>
                </div> */}
                <div className="order-success-modal logout-page">
                  <i className='bx bx-check'></i>
                  <h3 style={{margin: '1.4em 0px 0.8em'}}>
                    You Successfully Logged out !'
                  </h3>
                  <p style={{fontSize: '2rem', color: '#f91e07', fontFamily: 'Poppins'}}>Please Wait !</p>
                  {/* <div className="cart-buttons mt-0 justify-content-center">
                      <button onClick={() => {history.push('/'); modalAction('LOGIN_MODAL', true)}} className="continue-button border-0">Login Again</button>
                      <Link to={'/'} className="continue-button border-0">Back to Home</Link>
                  </div> */}
              </div>
            </Alert>
        )
    
      default:
        break;
  }

}

export const MySlider = ({ name, dataList, responsive=[], customSettings={} }) => {
  const Arrow = ({ customClass, onClick, el }) => <i className={`${customClass} bx bxs-chevrons-${el}`} onClick={onClick}></i>;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: 3000,
    // slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    className: 'product-slider',
    prevArrow: <Arrow customClass='custom-arrow' el={'left'}/>,
    nextArrow: <Arrow customClass='custom-arrow' el={'right'}/>,
    arrows: true,
    // centerMode: true,      // force slider to init in center position.
    ...customSettings         // to override above defined settings.
  };
  return <Slider {...settings} className={name} responsive={responsive}>{dataList}</Slider>;
}

export const focusArea = (globalDataAction) => {
  window.scrollTo(0, 0);
  let x = Math.random() * 10000;
  globalDataAction({ focusArea: x });
}

export const scrollToContent = (ref, offset=100) => window.scrollTo(0, ref.current.offsetTop - offset);

export const getRequiredFieldsOnly = (list) => {
  // let { globalData } = store.getState();
  // let b2bMode = globalData.userRegType.CodeValue === 'Retailer';
  if (!list) return [];
  return list.map(i => {
    return ({ 
    // PTR: b2bMode ? 'B2B' : 'B2C',
    PTR: i.PTR,
    AutoId: i.AutoId,
    Category: i.Category, 
    CategoryName: i.CategoryName, 
    CompanyId: i.CompanyId,
    Description: i.Description, 
    Discount: i.Discount,
    DiscountPer: i.DiscountPer,
    ItemId: i.ItemId, 
    ItemMRP: i.ItemMRP, 
    PackSizeId: i.PackSizeId,
    ItemPackSizeList: i.ItemPackSizeList, 
    // ItemPackSizeList: [
    //   { CodeId: 11, Description: '30 g', MRP: 1000, MRPDisPer: 5, StockQty: 3, CodeId: 11, SRate: 800 },
    //   { CodeId: 12, Description: '100 g', MRP: 2000, MRPDisPer: 10, StockQty: 2, CodeId: 12, SRate: 1600 },
    //   { CodeId: 13, Description: '150 g', MRP: 3000, MRPDisPer: 20, StockQty: 0, CodeId: 13, SRate: 2500 }
    // ], 
    SRate: i.SRate, 
    StockQty: i.StockQty, 
    GroupName: i.GroupName, 
    Parent: i.Parent, 
    ParentDesc: i.ParentDesc, 
    Technicalname: i.Technicalname,
    sv_CostId: i.sv_CostId, 
    itemmstr: i.itemmstr, 
    LocationId: i.LocationId, 
    ManufacturBY: i.ManufacturBY,
    Unit: i.Unit,
    UnitName: i.UnitName,
    IsVisible: i.IsVisible, 
    ItemCode: i.ItemCode, 
    ItemImageURL: i.ItemImageURL,    
    CGST: i.CGST,
    SGST: i.SGST,
    IGST: i.IGST, 
    CGSTRATE: i.CGSTRATE, 
    SGSTRATE: i.SGSTRATE,
    IGSTRATE: i.IGSTRATE, 
    Specification: i.Specification || '',

    LocationName: i.LocationName || '',
    LocationItemId: i.LocationItemId
  })});
}

export const getCategoryRequiredFieldsOnly = (list) => {

  return list.map(i => ({ 
    Parent: i.Parent,
    ParentDesc: i.ParentDesc,
    Text: i.ParentDesc,
    Value: String(i.Parent),
    ImageURL: i.ImageURL
  }));
}


const UpdateScroll = ({ page, globalData, globalDataAction }) => {
  let YPosition = '';
  useEffect(() => {
    const save = () => YPosition = window.scrollY;
    window.addEventListener('scroll', save);
    return () => {
      window.removeEventListener('scroll', save);
      globalDataAction({ scrollPos: { ...globalData.scrollPos, [page]: YPosition }});
    };
  }, [page]);
}

const mapStateToUpdateScroll = (state) => {
  return { globalData: state.globalData };
}
export const ConnectedUpdateScroll = connect(mapStateToUpdateScroll, {globalDataAction})(UpdateScroll);

export const scrollPage = (pageName, globalDataAction) => {
  let { globalData } = store.getState();
  let YPosition = globalData.scrollPos[pageName];
  if (YPosition === '') return;       // ***prevents looping due to changing scrollPos from the caller components that is also using globalData.scrollPos in <UpdateScroll />
  setTimeout(() => {
    window.scrollTo(0, YPosition);
    globalDataAction({ scrollPos: { ...globalData.scrollPos, [pageName]: '' }});  // ***set scrollPos to '' for that page to stop looping and uneccessary scrolls (due to rerenders of that that page) by checking for '' above. 
  }, 500);
}

export const escape = (str) => ({ swap: str.replace('&', '-'), unswap: str.replace('-', '&') });      // swap and unswap the & char with - to escape the url interference due to & character.

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
      // const offset = window.$('#header')[0].clientHeight;
      // console.log(offset);
      // window.scrollTo(0, offset);
      window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const ImageLoader = ({ src='', className='', height='', width='', alt='', fSize='1em', delay=0, styles }) => {
  const [isLoading, setLoading] = useState(true);

  const handleLoaded = () => {
    setTimeout(() => {
      setLoading(false)
    }, 800 + delay);
  }

  useEffect(() => {
    setLoading(true);
  },[src])
  
  return (
    <div className='img-loader-box'>
      <img className={className} height={height} width={width} src={src} onLoad={handleLoaded} alt={alt} style={{opacity: isLoading ? '0' : '1', ...styles}} />
      <img className='load' loading='lazy' style={{display: isLoading ? 'block' : 'none', fontSize: fSize}} src="/assets/img/ePharma/loader.svg" alt="" />
    </div>
  )
}

export const getFallbackImg = () => {
  let { compCode } = store.getState();
  let companies = {
    [defaultId]: 'no-image.png',
    [ePharmaId]: 'ePharma-no-image.png',
    [TAKE_HOME_ID]: 'takeHome-no-image.png',
    [XYZ_ID]: 'no-image.png',
  }
  let imgUrl = companies[compCode] ? companies[compCode] : 'no-image.png';

  return `/assets/img/fallback/${imgUrl}`;
}

// const LoginPage = ({ compInfo }) => {
//   return (
//     <section className='login-page epharma-global login-modal' style={{padding: '4em 1em', background: '#ededed'}}>
//       <style>{`
//         .login-page .right > div {
//           justify-content: start !important;
//         }
//         @media (min-width: 768px) {
//           justify-content: center !important;    
//         }
//       `}</style>
//       <div className='row'>
//         <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
//           <img style={{maxWidth: '20em'}} src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="Logo" />
//         </div>
//         <div className="col-lg-6 right">
//           <LoginModal />
//         </div>
//       </div>
//     </section>
//   )
// }
// const mapStateToLoginPage = (state) => ({ compInfo: state.compInfo });
// export const ConnectedLoginPage = connect(mapStateToLoginPage, {})(LoginPage);

const BusinessTypeSelector = ({ typeList, isLoggedIn, globalData, globalDataAction, classes, styles }) => {

  const [businessTypes, setBusinessTypes] = useState([]);

  useEffect(() => {
      setBusinessTypes(typeList)
  },[typeList])

  const handleBusinessType = (e) => {
      const target = businessTypes.find(i => parseInt(i.CodeId) === parseInt(e.target.value));
      if (!target) return alert('Invalid Selection.');
      globalDataAction({ businessType: { Description: target.Description, CodeId: target.CodeId, CodeValue: target.CodeValue }, location: {LocationId: 0} });
  }

  return (
    <select className={`form-select ${classes}`} value={globalData.businessType.CodeId} onChange={(e) => handleBusinessType(e)} style={{ ...styles }}>
        {isLoggedIn ? <option value={globalData.businessType.CodeId}>{globalData.businessType.Description}</option> :
        businessTypes.map(i => (<option key={i.CodeId} value={i.CodeId}>{i.Description}</option>))}
    </select> 
  )
}

const mapStateToBusinessTypeSelector = (state) => ({ globalData: state.globalData, isLoggedIn: state.isLoggedIn });
  
export const ConnectedBusinessTypeSelector = connect(mapStateToBusinessTypeSelector, {globalDataAction})(BusinessTypeSelector);

export const addToCart = (globalDataAction, globalData, isAdded, data, cartAction, computeWithPackSize, wishlistAction, count=1) => {
  if (!globalData.location.LocationId) return focusArea(globalDataAction);
  if (isAdded) return cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy');
  cartAction('ADD_ITEM', {...data, ...computeWithPackSize(), count: count}, 'pharmacy'); 
  wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
  let productToastData = { msg: 'Added to Cart', product: {name: data.Description, price: computeWithPackSize().SRate}, button: {text: 'Visit Cart', link: '/cartPage'} };
  productToast(productToastData);
  updateLocalStorageItems();
}

export const buyNow2 = (globalData, globalDataAction, computeWithPackSize, cartAction, wishlistAction, data, history) => {
  if (!globalData.location.LocationId) return focusArea(globalDataAction);
  cartAction('DUMP_CART', {}, 'pharmacy');
  cartAction('ADD_ITEM', {...data, ...computeWithPackSize(), count: 1}, 'pharmacy'); 
  wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
  updateLocalStorageItems();
  history.push('/checkout');
}

export const addToWishlist2 = (globalData, globalDataAction, computeWithPackSize, cartAction, wishlistAction, data, isAddedToWishlist) => {
  if (!globalData.location.LocationId) return focusArea(globalDataAction);
  if (isAddedToWishlist) return wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
  wishlistAction('ADD_WISH_ITEM', {...data, ...computeWithPackSize(), count: 1}, 'pharmacy');
  cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy');
  let productToastData = { msg: 'Added to Wishlist', product: {name: data.Description, price: computeWithPackSize().SRate}, button: {text: 'View Wishlist', link: '/wishlist'} };
  productToast(productToastData); 
  updateLocalStorageItems();
}

export const computeWithPackSize = (data, activePackSize, vType) => {      
  if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') return data;
  if (!activePackSize) {
      return data;     // { ItemMRP: data.ItemMRP, SRate: data.SRate, StockQty: data.StockQty, DiscountPer: data.DiscountPer, PackSizeId: data.PackSizeId };
  } else {
    if (activePackSize.MRP) {
      return { ...data, ItemMRP: activePackSize.MRP, SRate: activePackSize.SRate, StockQty: activePackSize.StockQty, DiscountPer: activePackSize.MRPDisPer, PackSizeId: activePackSize.CodeId, PTR: activePackSize.PTR };  
    } else {
      return data;     // { ItemMRP: data.ItemMRP, SRate: data.SRate, StockQty: data.StockQty, DiscountPer: data.DiscountPer, PackSizeId: data.PackSizeId };
    }
  }
} 

export const InactiveWarningCard = ({ closeToast }) => {
  return (
    <div className="modal-content" style={{maxWidth: '56rem', fontFamily: 'Lato'}}>
        <div className="modal-header p-3 px-4">
            <h5 className="modal-title text-danger fw-bold" id="exampleModalLabel"><i className="bx bx-shield-quarter"></i> Please Note !</h5>
            <Link className="btn-close" to='/' onClick={closeToast} aria-label="Close" ></Link>
        </div>
        <div className="modal-body p-3 px-4" style={{borderBottom: '1px solid #e7e7e7', borderTop: '1px solid rgb(235 235 235)'}}>
            <h6 style={{lineHeight: '1.8em', fontWeight: 600, fontSize: '1.2em'}}>Your Registration is Waiting for approval from the Admin. You will be able to <span style={{color: 'blue'}}>login</span> after approval.</h6>
            <p className='mb-0 mt-2 text-end' style={{color: '#565656', fontSize: '1em'}}><i className='bx bxs-hand-right text-danger me-2'></i> Please keep your Credentials for future Logins.</p>
        </div>
        <div className="modal-footer p-3 px-4">
            <Link to='/' onClick={closeToast} className="btn btn-primary" style={{padding: '0.5em 2em', fontWeight: 600}}>CLOSE</Link>
        </div>
    </div>
  )
}

export const getBase64 = (file) => new Promise(function (resolve, reject) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject('Error: ', error);
})  

export const getBase64String = async (source) => {
  if (source) {
      const formData = new FormData();
      const file = await fetch(source).then(r => r.blob());
      formData.append('file', file);
      let parsedFile = await getBase64(formData.get('file'));
      let target = parsedFile.indexOf('base64,');
      parsedFile = parsedFile.slice(target + 7);                                
      return parsedFile;       
  } 
}

export const noItemFound = (label, tab, classes) => (
  <div className={`card ${classes}`}>
      <div className="card-header">
          <h5 className="mb-0">Orders</h5>
      </div>
      <div className="card-body cart">
          <div className="col-sm-12 empty-cart-cls text-center">
              <img src="/assets/img/ePharma/emptyCart.png" className="img-fluid mb-4 me-4" alt="empty_cart" style={{height: '7em'}} />
              <h5>You have no {tab} {label}</h5>
              <Link to='/' className='continue-button' style={{margin: '1rem 0 1.5rem', fontSize: '1.3em'}}>Place an Order</Link>
          </div>
      </div>
  </div>
)

export const EmptyCart = ({label, btn, classes, styles}) => {
  return (
    <div className={`card ${classes}`} style={{...styles}}>
        <div className="card-header">
            <h5 className="mb-0">Cart</h5>
        </div>
        <div className="card-body cart">
            <div className="col-sm-12 empty-cart-cls text-center">
                <img src="/assets/img/ePharma/emptyCart.png" className="img-fluid mb-4 me-4" alt="empty_cart" style={{height: '7em'}} />
                <h5>{label}</h5>
                {btn && <Link to='/' className='continue-button' style={{margin: '1rem 0 1.5rem', fontSize: '1.3em'}}>Continue Shopping.</Link>}
            </div>
        </div>
    </div>
  )
}

export const ToggleMode = ({ isLoggedIn, modalAction, globalDataAction, globalData, cartAction, classes, vType }) => {

    const history = useHistory();
    let b2bMode = globalData.userRegType.CodeValue === 'Retailer';
    
    const handleToggleMode = (type) => {
        if (type === 'B2C') {
            modalAction('LOGIN_MODAL', true, {businessType: 'B2C'}); 
            globalDataAction({ userRegType: { CodeId: 43198, Description: 'Customer', CodeValue: 'Customer', for: 'B2C / Patient' } })
        } else if (type === 'B2B') {
            modalAction('LOGIN_MODAL', true, {businessType: 'B2B'}); 
            globalDataAction({ userRegType: { CodeId: 43194, Description: 'Retailer', CodeValue: 'Retailer', for: 'B2B / Retailer' } })
        }
        history.push('/');
        cartAction('EMPTY_CART', {}, '');



        window.scrollTo(0, 0);
    }

    if (isLoggedIn || vType !== 'ErpPharma') return;
    
    return (
        b2bMode ?
        <div onClick={() => handleToggleMode('B2C')} className={`text-white rounded-3 pointer ${classes}`} style={{background: '#3c5b9b', padding: '0.7em 1em 0.5em'}}>
            <i className="fas fa-landmark me-3" style={{fontSize: '2em', verticalAlign: 'sub'}}></i> <span style={{fontWeight: 500}}>B2C LOGIN</span>
        </div>
        :
        <div onClick={() => handleToggleMode('B2B')} className={`text-white rounded-3 pointer ${classes}`} style={{background: '#3c5b9b', padding: '0.7em 1em 0.5em'}}>
            <i className="fas fa-landmark me-3" style={{fontSize: '2em', verticalAlign: 'sub'}}></i> <span style={{fontWeight: 500}}>B2B LOGIN</span>
        </div>
    )
}

const mapStateToToggleMode = (state) => ({ globalData: state.globalData, isLoggedIn: state.isLoggedIn, vType: state.vType });
  
export const ConnectedToggleMode = connect(mapStateToToggleMode, {modalAction, globalDataAction, cartAction})(ToggleMode);

export const rentCategories = [
  {Text: 'Property', Value: 1, img: 'properties2.jpg', icon: 'real_estate_agent'},
  {Text: 'Furniture', Value: 2, img: 'furnitures.jpg', icon: 'chair'},
  {Text: 'Vehicle', Value: 3, img: 'vehicles.jpg', icon: 'local_shipping'},
  {Text: 'Electronic Appliance', Value: 4, img: 'kitchen-appliance.jpg', icon: 'media_output'},
  // {Text: 'Electricals', Value: 'Electricals', img: 'electronics.jpg', icon: 'electrical_services'},
] 

export function SliderSection({ children, data, heading, responsive, autoPlay=true }) {
  const items = data.map((item, index) => {
    return (
      <div key={index} style={{"display": "grid", "placeItems": "center"}}>
          {React.cloneElement(children, { data: item, key: index })}
          {/* {children({data: item, key: index})} */}
      </div>      
    )
  })
  const defaultResponsive = { 0: { items: 1 }, 550: { items: 2 }, 768: { items: 3 }, 992: { items: 4 }, 1200: { items: 5 }, 1500: { items: 5 } };
  return (
    <>
      <div className="my-4 d-none" style={{"borderBottom": "1px solid #09dca4"}}>
        <img src="/img/urology.png" alt="urology" style={{"height": "2rem", "marginRight": "0.5rem"}}/>
        <h3 style={{"lineHeight": "2rem"}}>{heading}</h3>
      </div>
        <RenderCarousel
          data={items} 
          responsive={responsive ? responsive : defaultResponsive}
          autoPlay={autoPlay}
          stopAutoPlayOnHover={true}
          infinite={true}
          autoPlayInterval={1500}
        />
    </>
  );
}


export const Success = () => {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      {/* Background Circle  */}
      <circle cx="200" cy="200" r="180" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" opacity="0.3"/>
      
      {/* Main Success Circle  */}
      <circle cx="200" cy="200" r="80" fill="#22c55e">
          <animate attributeName="r" values="0;80" dur="0.8s" fill="freeze"/>
      </circle>
      
      {/* Checkmark  */}
      <path d="M160 200 L185 225 L240 175" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <animate attributeName="stroke-dasharray" values="0 100;100 100" dur="0.6s" begin="0.4s" fill="freeze"/>
          <animate attributeName="stroke-dashoffset" values="100;0" dur="0.6s" begin="0.4s" fill="freeze"/>
      </path>
      
      {/* Floating Success Elements  */}
      {/* Stars  */}
      <g fill="#fbbf24" opacity="0.8">
          <polygon points="100,120 105,130 115,130 107,137 110,147 100,140 90,147 93,137 85,130 95,130" transform="rotate(0 100 120)">
          <animateTransform attributeName="transform" type="rotate" values="0 100 120;360 100 120" dur="3s" repeatCount="indefinite"/>
          </polygon>
          <polygon points="320,150 325,160 335,160 327,167 330,177 320,170 310,177 313,167 305,160 315,160" transform="rotate(0 320 150)">
          <animateTransform attributeName="transform" type="rotate" values="0 320 150;-360 320 150" dur="4s" repeatCount="indefinite"/>
          </polygon>
          <polygon points="80,280 85,290 95,290 87,297 90,307 80,300 70,307 73,297 65,290 75,290" transform="rotate(0 80 280)">
          <animateTransform attributeName="transform" type="rotate" values="0 80 280;360 80 280" dur="2.5s" repeatCount="indefinite"/>
          </polygon>
          <polygon points="340,280 345,290 355,290 347,297 350,307 340,300 330,307 333,297 325,290 335,290" transform="rotate(0 340 280)">
          <animateTransform attributeName="transform" type="rotate" values="0 340 280;-360 340 280" dur="3.5s" repeatCount="indefinite"/>
          </polygon>
      </g>
      
      {/* Confetti  */}
      <g opacity="0.7">
          <rect x="130" y="100" width="6" height="6" fill="#ef4444" rx="1">
          <animateTransform attributeName="transform" type="translate" values="0,0;-20,80" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/>
          </rect>
          <rect x="280" y="120" width="6" height="6" fill="#3b82f6" rx="1">
          <animateTransform attributeName="transform" type="translate" values="0,0;30,70" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0" dur="2.2s" repeatCount="indefinite"/>
          </rect>
          <rect x="150" y="90" width="6" height="6" fill="#8b5cf6" rx="1">
          <animateTransform attributeName="transform" type="translate" values="0,0;-40,90" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite"/>
          </rect>
          <rect x="300" y="110" width="6" height="6" fill="#f59e0b" rx="1">
          <animateTransform attributeName="transform" type="translate" values="0,0;40,85" dur="2.1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0" dur="2.1s" repeatCount="indefinite"/>
          </rect>
      </g>
      
      {/* Celebration Circles  */}
      <g opacity="0.4">
          <circle cx="120" cy="160" r="3" fill="#22c55e">
          <animate attributeName="r" values="3;15;3" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="300" cy="180" r="4" fill="#22c55e">
          <animate attributeName="r" values="4;20;4" dur="2.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="250" r="3" fill="#22c55e">
          <animate attributeName="r" values="3;12;3" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="320" cy="240" r="3" fill="#22c55e">
          <animate attributeName="r" values="3;18;3" dur="2.3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.3s" repeatCount="indefinite"/>
          </circle>
      </g>
      
      {/* Success Text (Optional)  */}
      <text x="200" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#22c55e" opacity="0">
          Success!
          <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1s" fill="freeze"/>
      </text>
    </svg>
  )
}