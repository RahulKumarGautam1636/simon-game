import React, { useState, useEffect, useCallback, useRef } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { connect } from 'react-redux';
import { toastAction, isMobileAction, cartAction, modalAction, globalDataAction } from '../../../actions';
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
// import PatientDashboard from './dashboards/patientDashboard';
import PatientDashboard from './dashboards/doctorDashboard-new';
import DoctorDashboard from './dashboards/doctorDashboard';
import PolyClinicDashboard from './dashboards/polyClinicDashboard';
import CollectorDashboard from './dashboards/collectorDashboard';
// import ProviderDashboard from './dashboards/providerDashboard';
// import PatientProfile from './profiles/patientProfile';
// import DoctorProfile from './profiles/doctorProfile';
import Slider from 'react-slick';
import CryptoJS from 'crypto-js';
import { createPortal } from 'react-dom';
import {  BASE_URL, BSN_ID, currentVersion, existingLogos, SRC_URL } from '../../../constants';
import { toast } from 'react-toastify';
// import ProviderProfile from './profiles/providerProfile';
import ProviderProfile from './profiles/providerProfile-new';
import { Dropdown, DropdownButton } from "react-bootstrap";
import store from '../../..';
import RenderCarousel from '../../carousel';
import { uType } from '../../utils/utils';


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

export const UseFavicon = ({ LogoUrl }) => {
  useEffect(() => {
    
    const el = document.createElement('link');
    el.rel = 'icon';
    el.href = existingLogos.includes(LogoUrl.split('.')[0]) ? `/img/logo/favicons/${LogoUrl}` : `${SRC_URL}/Content/CompanyLogo/${LogoUrl}`;
    el.async = true;
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, [LogoUrl]);    // compCode
  return;
};

export const useStylesheet = stylePath => {
  useEffect(() => {
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.async = true;
    link.href = stylePath;

    head.appendChild(link);
    return () => { 
      head.removeChild(link);
     }
  }, [stylePath]);
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

export const handleNumberInputs = (e, setStateName) => {
  const {name, value} = e.target;
  const re = /^[0-9\b]+$/;
  if (value === '' || re.test(value)) {
    setStateName(preValue => {
       return {...preValue, [name]: value};
    });
  }
}

export const useFetch = (url, isValid) => {          // isValid is taken to ensure correct params for API calls.

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    if (isValid) {
      try {
        const res = await fetch(url);
        if (res.status === 500) {            // Status 500 called internal server error is not an error it's a responce.
          setError(true);                    // hence it can't be catched by try catch statement hence handling it mannually.
          return;
        }
        const json = await res.json();
        setData(json);          
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }

  }, [url, isValid]);

  useEffect(() => {
    setLoading(true);
    // setTimeout(() => {                        // turn on Timeout to test Skeleton loading.
      fetchData();
    // }, 5000);
  }, [fetchData]);

  return [data, isLoading, error]
}



export const getFormattedDate = (rDate = new Date()) => {
  const d = new Date(rDate);
  const currentDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
  return currentDate;
}

const ShowToast = ({ isToastActive, toastAction, cartAction, cart }) => {

  const isAddedToCart = Object.keys(cart).find(i => i === isToastActive.item.LocationItemId ); 

    return (
      <div aria-live="polite" aria-atomic="true" className="toastBackground" style={{position: 'fixed', top: '0', left: '0', height: '100vh', width: '100vw', pointerEvents: 'none'}}>
        <ToastContainer className="p-3" position={'bottom-end'}>
          <Toast onClose={() => toastAction(false, {})} show={isToastActive.status} delay={3000}>  {/* autoHide */}
            <Toast.Header>
              <img src="favicon.png" className="rounded me-2" alt="asdf" style={{height: '20px'}}/>
              <strong className="me-auto">Successfully added to cart</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>
              <div className="w-100 d-flex justify-content-between">
                <p className="mb-0 fw-bold">{isToastActive.item.Description}</p>
                <p className="mb-0 fw-bold mark bg-success rounded-pill px-2 text-nowrap">₹ {isToastActive.item.SRate}</p>
              </div>
              <div className="btn-box">
                <button className="btn btn-main btn-round-full" onClick={() => cartAction('REMOVE_ITEM', isToastActive.item.LocationItemId)}>{isAddedToCart ? 'REMOVE' : 'REMOVED'}</button>
                <Link to="/cartPage" className="btn btn-main btn-round-full add-wishlist-btn">VISIT CART</Link>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
}

const mapStateToToast = (state) => {
  return { isToastActive: state.isToastActive, cart: state.cart };
}

export const ConnectedToast = connect(mapStateToToast, {toastAction, cartAction})(ShowToast);

export const ProductToastCard = ({ toastData, closeToast }) => {
  return (
    <div className="toast fade show"> 
      <div className="toast-header" style={{color: 'var(--clr-1)'}}>
        <i className='bx bxs-smile me-2' style={{fontSize: '1.4em'}}></i>
        <strong className="me-auto">{toastData.msg}</strong>
        <small className='text-dark' onClick={closeToast}>Just now</small>
      </div>
      <div className="toast-body">
        <div className="w-100 d-flex justify-content-between align-items-start">
          <p className="mb-0 fw-bold">{toastData.product.name}</p>
          <p className="mb-0 fw-bold mark bg-success rounded-pill px-2 text-nowrap">₹ {toastData.product.price}</p>
        </div>
        <div className="btn-box">
          <Link onClick={closeToast} to={toastData.button.link} className="btn btn-main btn-round-full add-wishlist-btn">{toastData.button.text}</Link>
          <button className="btn btn-main btn-round-full" onClick={() => cartAction('REMOVE_ITEM', toastData.LocationItemId)}>REMOVE</button>
        </div>
      </div>
    </div>
  )
}

export const productToast = (productToastData, options) => toast(<ProductToastCard toastData={productToastData} />, { position: "top-right", autoClose: 2500, closeButton: false, className: 'product-toast', ...options });


export const BookingReference = ({ toastData, closeToast }) => {
  return (
    <div>
      <h4>Thank you for Booking.</h4>
      <span className="text-info">Please keep your Reference No: <span className='text-danger ms-2'>{toastData}</span></span>
      {/* <span className="d-flex justify-content-end">Closing.</span> */}
    </div>
  )
}

export const bookingToast = (bookingToastData, options) => toast(<BookingReference toastData={bookingToastData} />, options);   // { position: "top-right", autoClose: 2500, closeButton: false, className: 'product-toast' }
export const stringToast = (toastData, options) => toast(toastData, { autoClose: 2000, ...options });

export const stopPropagation = (e) => e.preventDefault();

export const ControlledCarousel = ({ data, interval, controls, imgStyles, imgClasses }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={interval} controls={controls}>
        {
            data.map((item, index) => {
              return (
                <Carousel.Item key={item}>
                    <img className={imgClasses ? imgClasses : "h-100 w-100"} src={item} alt={`${index + 1}_slide`} style={imgStyles} />
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

export const ControlledTabs = ({ children, data, activetab}) => {
  const [key, setKey] = useState(activetab);

  return (
    <Tabs
      id="date-slot-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {
        data.map(item => {
          return (
            <Tab eventKey={item.name.sName} key={item.name.sName} title={item.name.sName}>
              {React.cloneElement(children, { data: item.name, key: item.name.sName })}
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
    action('LOGIN_MODAL', status, {mode: mode});
  }
}

export const useDocumentTitle = (title, prevailOnUnmount = false) => {      // To Dynamicall set the website Title.
  const defaultTitle = useRef(document.title);                              // Used in header page.

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  }, [prevailOnUnmount])
}


export const ModalComponent = ({ isActive, heading, child, handleClose, className='' }) => {

  return (
    <Modal className={className} show={isActive} onHide={() => handleClose(false)} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {child}
      </Modal.Body>
      {/* <Modal.Footer>
      </Modal.Footer> */}
    </Modal>
  )
}

export const DropdownElement = ({ title, variant, data }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant={variant} id="dropdown-basic">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {data.map(item => {
          return (
            <Dropdown.Item as="button" key={item.text}>{item.text}</Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export const customTabsButtons = (data, activeItem, onClickHandler) => {
  return data.map(item => {
    return (
      <label className={`custom_check ${activeItem === item ? 'active' : ''}`} key={item}>
        <input type="button" name="tab-input" onClick={() => onClickHandler(item)}/>
        As {item}
      </label>
    )
  })
}

export const logOut = async (history) => {
  // history.push('/');
  // localStorage.removeItem('userLoginData');
  // window.location.reload();

  let { vType } = store.getState();
  localStorage.removeItem('userLoginData');
  localStorage.removeItem('epharmaItemsList');
  // localStorage.removeItem(`userLocation_${compCode}`);
  history.push('/');
  if (vType === 'ErpPharma') {
    store.dispatch(modalAction('ALERT_MODAL', true, 'logout'));
  } else {
    stringToast("You successfully logged out, Please wait.", { type: 'error', autoClose: 5000 });
  }
  await wait(2000);
  window.reloadPage();
}

export const Spinner = ({ min_height='10rem', fSize='16px' }) => {                
  return (
    <>
      <div className='spinner-box test' style={{minHeight: min_height, fontSize: fSize}}>
        <div className="loader"></div>       {/* stripe square and running square */}
      </div>
    </>
  )
}

export const getFrom = async (queryUrl, params, setStateName, signal='') => {
  
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
    if (error.code === 'ERR_CANCELED') return false;           // return early if request aborted to prevent loading: false.
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


export const BreadCrumb = ({data}) => {
  return (
    <div className="breadcrumb-bar">
        <div className="container-fluid">
            <div className="row align-items-center">
                <div className="col-md-8 col-12">
                    <nav aria-label="breadcrumb" className="page-breadcrumb">
                        <ol className="breadcrumb">
                          {data.links.map(item => <li key={item.name} className={`breadcrumb-item ${data.activeLink === item.link ? 'pe-none opacity-50' : ''}`}><Link to={item.link}>{item.name}</Link></li>)}
                            {/* <li className="breadcrumb-item active" aria-current="page">Search</li> */}
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
  )
}

export const navigateToDashboard = (userLevelSeq) => {
  switch(userLevelSeq) {
    case uType.DOCTOR.level:
      // return <PatientDashboard/>;          // doctorDashbord is same as PatientDashboard. only difference is in rating bar shown below name of doctor.
      return <DoctorDashboard/>;        // doctorDashbord is same as PatientDashboard. only difference is in rating bar shown below name of doctor.
    case uType.POLYCLINIC.level:
      return <PolyClinicDashboard/>;
    case uType.PROVIDER.level:
      return <PatientDashboard/>;         // Existing providerDashboart file is 100% same as patientDashboard.
    case uType.COLLECTOR.level:
      return <CollectorDashboard/>;
    default:                              // Default case -> UserType === uType.PATIENT.level
      return <PatientDashboard/>;
  }
}

export const navigateToProfile = (userLevelSeq, match) => {
  switch(userLevelSeq) {
    case uType.DOCTOR.level:
      // return <DoctorProfile match={match}/>;
      return <ProviderProfile/>;
    // case uType.POLYCLINIC.level:
    //   return <PolyClinicDashboard/>;
    case uType.PROVIDER.level:
      return <ProviderProfile/>;
    // case uType.COLLECTOR.level:
    //   return <CollectorDashboard/>;
    default:                                        // Default case -> UserType === uType.PATIENT.level
      // return <PatientProfile/>;
      return <ProviderProfile/>;
  }
}

export const Pagination = ({ activePage, setActivePage, visibleItems, data }) => {                // *** remember to reset activePage when data is reloaded or changed in parent Component to reset the page to 1.

  const lastProductIndex = activePage*visibleItems;
  const totalProducts = data.length;
  const totalPages = Math.ceil(totalProducts / visibleItems);

  const nextPage = () => {
    if (activePage >! totalPages) return setActivePage(activePage+1);
  }

  const previousPage = () => {
    if (activePage !== 1) return setActivePage(activePage-1);
  };

  return (
    <div className='d-flex justify-content-between flex-wrap mt-2 gap-2 w-100'>
      <div className="col-lg-6 col-md-6 pt-xs-15">
        <small style={{fontSize: '1em'}}>Showing {1+((activePage-1)*visibleItems)} - {lastProductIndex > totalProducts ? totalProducts : lastProductIndex} of {totalProducts} items</small>
      </div>
      <ul className="pagination">
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <Link to="#" className='page-link' tabIndex="-1" onClick={previousPage}>Previous</Link>
        </li>
        <li className="page-item active">
          <Link to="#" className='page-link'>{activePage}</Link>
        </li>
        <li className={`page-item ${(activePage < totalPages && activePage + 1) === false ? 'disabled' : ''}`}>
          <Link to="#" className='page-link' onClick={() => setActivePage(activePage + 1)}>&nbsp;{activePage < totalPages && activePage + 1}<span className="sr-only">{activePage < totalPages && activePage + 1}</span></Link>
        </li>
        <li className={`page-item ${(activePage + 1 < totalPages && activePage + 2) === false ? 'disabled' : ''}`}>
          <Link to="#" className='page-link' onClick={() => setActivePage(activePage + 2)}>&nbsp;{activePage + 1 < totalPages && activePage + 2}</Link>
        </li>
        <li className={`page-item ${activePage >= totalPages ? 'disabled' : ''}`}>
          <Link to="#" className='page-link' onClick={nextPage} >Next</Link>
        </li>
      </ul>
    </div>
  )
}


export const CustomModal = ({ isActive=false, handleClose, name, customClass, fullscreen, child }) => {
  return (
    <Modal show={isActive} fullscreen={fullscreen} className={customClass} onHide={() => handleClose(name, false)}>
        <Modal.Body>
          {child}
        </Modal.Body>
    </Modal>
  )
}

export const CustomOffcanvas = ({ isActive=false, handleClose, name, customClass, child, placement='start', styles }) => {

  const handleHide = () => {
    if (name === 'local-modal') {              
      handleClose(false);                        
    } else if (name === 'local-handler') {     
      handleClose();                           
    } else {                                   
      handleClose(name, false);              
    }
  }

  return (
    <Offcanvas show={isActive} onHide={handleHide} className={customClass} placement={placement} style={styles}>
      <Offcanvas.Body>
        {child}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export const handleIsoDate = (isoDate, timeStr) => {
  const start = new Date(isoDate);                                                              // iso format in time.
  const newTimeStr = timeStr.replace(' ', ':00 ');                                              // convert '10:30 AM' to '10:30:00'.
  let dateString = new Date(start.toLocaleDateString() + ',' + newTimeStr);                     // create new date object by taking date from SInTime and time from the time picker.
  let isoFormatDate = new Date(dateString - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0, 19);          // eleminate offset and get iso format of the date.
  return isoFormatDate;
}

// NOTE ABOUT DATES USED IN THE PROJECT.

// NOTE : 1) toISOString works fine only when date is passed in 'yyyy/mm/dd' format otherwise can give wrong date show below. it's better to use toLocaleDateString();
//        2) toISOString returns date with TimezoneOffSet that can cause to wrong dates. eg - new Date('11/17/2023').toISOString() will return '2023-11-16T18:30:00.000Z' which is not correct to use.
//           we need to substract the TimezoneOffSet from it to get corrent value of date. see example below.
//
//           >> new Date(new Date('11/17/2023') - new Date().getTimezoneOffset() * 60 * 1000).toISOString()
//           >> '2023-11-17T00:00:00.000Z'           this is what we need.
//
//        3) toISOString returns wrong date in following cases.
//           1. new Date('05-25-2023').toISOString();                // when date is passed in mm/dd/yyyy format.
//           -> '2023-05-24T18:30:00.000Z'                           // returns 1 less day.
//           2. new Date('2023-11-5').toISOString();                 // when day or month is passed in single digit.
//           -> '2023-11-04T18:30:00.000Z'                           // returns 1 less day.

// 2) Followings are date formats used in the project. 
      // .toLocaleDateString('es-CL')  ==>  25-11-2023
      // .toLocaleDateString('en-TT')  ==>  25/11/2023

export const mmDDyyyyDate = (date, currSeperator, requiredSeperator) => {                 // Convert dd/mm/yyyy to mm/dd/yyyy format because dd/mm/yyyy is not taken as Date() object to create new date.
  if (!date.includes(currSeperator)) return console.log('CurrentSeperator does not exist in received date.');
  const [dd, mm, yyyy] = date.split(currSeperator);
  return mm + requiredSeperator + dd + requiredSeperator + yyyy;                  
}

export const getDateDifference = (date) => {
  let x = mmDDyyyyDate(date, '/', '/');
  let appnDate = new Date(x).getDate();
  const currDate = new Date().getDate();
  if (appnDate > currDate) {
    return 'tomorrow';    
  } else if (appnDate < currDate) {     
    return 'yesterday';    
  } else {
    return 'today';      
  }
}  


export const getDatesArray = function(start, end) {
  const endDate = new Date(new Date().setDate(start.getDate() + end));
  for(var arr=[],dt=new Date(start); dt<=new Date(endDate); dt.setDate(dt.getDate()+1)){
      arr.push({dateStr: new Date(dt).toDateString(), date: new Date(dt).toLocaleDateString('en-TT')});
  }
  return arr;
};

const IsMobile = ({ isMobileAction }) => {                                             // Determines if device is mobile or desktop.
  // const [isMobile, seIsMobile] = useState(false);
  // useScript('https://gbooksindia.in/js/tailwind_unminnify_com.js');

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

export const updateLocalStorageItems = () => {}


export const createDate = (days, months, years) => {
  var date = new Date(); 
  date.setDate(date.getDate() - days);
  date.setMonth(date.getMonth() - months);
  date.setFullYear(date.getFullYear() - years);  
  return date.toLocaleDateString('en-TT');
  // return date.toISOString().substr(0, 10);    
}

export const getAge = (date) => {
  let currDate = new Date();

  let yearDiff = Math.abs(currDate.getDate() - date.getDate());
  let monthDiff = Math.abs(currDate.getMonth() - date.getMonth());
  let dayDiff = Math.abs(currDate.getDay() - date.getDay());

  return `${yearDiff}-${monthDiff}-${dayDiff}`;
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
export function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lat2 || !lon1 || !lon2) {
    console.log('invalid coordinates !');
    return 0;
  }
  var earthRadiusKm = 6371;
  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);
  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return earthRadiusKm * c;
}

export const NotFound = () => {
  const history = useHistory()
  return (
    <div className='not-found'>
      <img src="img/err-404.jpg" alt="not found"/>
      <h3 className='mt-4'>The page you are looking for couldn't be found.</h3>
      <Link onClick={() => history.goBack()} to='/' className='add_an_item_btn'>Go Back</Link>
    </div>
  )
}

export const getDuration = (date) => {

  // let [byears, bmonths, bdays] = date ? date.split('-') : new Date().toLocaleDateString('en-CA').split('-');
  // let [years, months, days] = new Date().toLocaleDateString('en-CA').split('-');
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

export const sortClinicsbyUserLocation = (list, lat, lng, maxDistance=100) => {    
  // maxDistance = 100;  
  let companiesList = [ ...list ];
  let companiesListWithDistance = companiesList.map(i => ({...i, Distance: distanceInKmBetweenEarthCoordinates(lat, lng, parseFloat(i.latitude), parseFloat(i.longitude))}));
  // let logFilteredCompanies = companiesListWithDistance.map(i => ({name: i.COMPNAME, Distance: i.Distance}));
  // console.log(logFilteredCompanies);
  let companiesWithMinDistance = companiesListWithDistance.filter(i => i.Distance < maxDistance);
  let sortedCompanies = companiesWithMinDistance.sort((a, b) => a.Distance - b.Distance);
  return sortedCompanies;
}

export const WifiLoader = () => {
  return (
    <div className="no- prio">
      <div>
        <div className="loader-wifi"></div>
      </div>
      <h1 style={{fontSize: '0.6em'}} className='text-danger'>Network Disconnected 😔!</h1>
    </div>
  )
}

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    window.addEventListener('online', function() {
      setIsOnline(true);
    });

    window.addEventListener('offline', function() {
      setIsOnline(false);
    });

  }, [])
  return isOnline;
}

export const ButtonSlider = ({ activeIndex, dataList, responsive=[], customSettings=[] }) => {

  const sliderRef = useRef();

  useEffect(() => {
    if (!activeIndex) return;
    sliderRef.current.slickGoTo(activeIndex);
  },[activeIndex])

  const Arrow = ({ customClass, onClick, el }) => <div className={`btn-${customClass}`} onClick={onClick}>{el}</div>
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: <Arrow customClass='prev' el={'〈'}/>,
    nextArrow: <Arrow customClass='next' el={'〉'}/>,
    ...customSettings
  };
  return <Slider ref={sliderRef} {...settings} responsive={responsive}>{dataList}</Slider>;
}

export const CompanySlider = ({ dataList, responsive=[], customSettings={}, myRef={} }) => {
  const Arrow = ({ customClass, onClick, el }) => <span className={customClass} onClick={onClick}><i className={`bx bxs-chevrons-${el}`}></i></span>
  responsive = [
    { breakpoint: 2000, settings: { slidesToScroll: 3 } },
    { breakpoint: 1200, settings: { slidesToScroll: 2 } },
    { breakpoint: 750, settings: { slidesToScroll: 1 } },
    ...responsive
  ]
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    variableWidth: true,
    className: 'company-slider',
    prevArrow: <Arrow customClass='slick-prev slick-arrow' el={'left'}/>,
    nextArrow: <Arrow customClass='slick-next slick-arrow' el={'right'}/>,
    ...customSettings
  };
  return <Slider {...settings} responsive={responsive} ref={myRef}>{dataList}</Slider>;
}

export const HeroSlider = ({ dataList, responsive=[], customSettings={} }) => {
  const Arrow = ({ customClass, onClick, el }) => <span className={customClass} onClick={onClick}><i className={`bx bxs-chevrons-${el}`}></i></span>
  var settings = {
    dots: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    pauseOnHover: false,
    className: 'hero-slider',
    prevArrow: <Arrow customClass='slick-prev slick-arrow' el={'left'}/>,
    nextArrow: <Arrow customClass='slick-next slick-arrow' el={'right'}/>,
    ...customSettings
  };
  return <Slider {...settings} responsive={responsive}>{dataList}</Slider>;
}

export const CategorySlider = ({ dataList, responsive=[], customSettings={} }) => {
  const Arrow = ({ customClass, onClick, el }) => <span className={customClass} onClick={onClick}><i className={`bx bxs-chevrons-${el}`}></i></span>
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    // autoplay: true,
    // autoplaySpeed: 3500,
    // cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    className: 'category-slider',
    prevArrow: <Arrow customClass='slick-prev slick-arrow' el={'left'}/>,
    nextArrow: <Arrow customClass='slick-next slick-arrow' el={'right'}/>,
    ...customSettings
  };
  return <Slider {...settings} responsive={responsive}>{dataList}</Slider>;
}

export const ProductSlider = ({ dataList, responsive=[], customSettings={} }) => {
  const Arrow = ({ customClass, onClick, el }) => <span className={customClass} onClick={onClick}><i className={`bx bxs-chevrons-${el}`}></i></span>
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    className: 'product-slider',
    prevArrow: <Arrow customClass='slick-prev slick-arrow' el={'left'}/>,
    nextArrow: <Arrow customClass='slick-next slick-arrow' el={'right'}/>,
    ...customSettings
  };
  return <Slider {...settings} responsive={responsive}>{dataList}</Slider>;
}

export const all = (activeItem, handleClick) => {
  return (
    <div key={'select_all'}>
      <div className={`companyTabCard d-flex cursor-pointer position-relative  ${activeItem === 'All' ? 'active' : ''}`} onClick={handleClick}>
        <img src='img/hospital.png' className="img-fluid logo" style={{maxHeight: '1.9em', margin: '0 0.5em 0.4em 0'}} alt={'All clinics'}/>
        <div className=''>
          <h5 className="mb-0">All</h5>
          <h6>Clinics</h6>
        </div>
        <span style={{width: 0, pointerEvents: 'none', visibility: 'hidden'}} className='d-flex flex-column justify-content-between h-100'><Link to='#'><i className='bx bxs-bed' ></i></Link><Link to='#'><i className='bx bxs-user-plus'></i></Link></span>                       
      </div>
    </div>
  )
}

export const MODULES = {
  'FFCeIi27FQMTNGpatwiktw==': [],
  'TcbqtUi5nB%2BX6FL5ySfFyg==': ['OPD'],
  '4K%2Bip4H91KicEh1TMAw9Rw==': ['PHARMACY', 'LAB_TEST'],
  '4Op9Y17TOeDj0pSHB/sotw==': [],
  '909NTpLAcY/Uq023SuQt2g==': ['PHARMACY', 'LAB_TEST'], 
  'MjLxadrssyExUU7EojuDtw==': ['PHARMACY'],
  'r7GrVAPQzw/kllPyQ5rxCA==': ['PHARMACY', 'LAB_TEST'],
  'Za2mOwLGdnsDt9dWguvATw==': ['PHARMACY', 'LAB_TEST'],
  'qHz3Nkhia89KjStqSPartg==': ['PHARMACY'],
  'KHLqDFK8CUUxe1p1EotU3g==': ['OPD', 'LAB_TEST']
}

export const encrypt = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();
// let data = { phone: "7003290011", password: "1234", compCode: "FFCeIi27FQMTNGpatwiktw==" };

export const decrypt = (data) => {
  if (!data) return false;
  if (data.length > 200) return false;
  var bytes  = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY);
  var decryptedData;
  try {
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Invalid Data. Unable to derypt.", error)
    decryptedData = false;
  }
  return decryptedData;
}

// let encrypted = encrypt({ phone: "7003290011", password: "1234", compCode: "FFCeIi27FQMTNGpatwiktw==" });
// let decrypted = decrypt(encrypted);
// console.log(encrypted);
// console.log(decrypted);

// export const ErrorCard = () => {
//   return (
//     <div className="err-card">
//       <h3 className="err-heading">Something Went wrong !</h3>
//       <div className="err-content">
//         <p>An error occured, please try again later. Error code: Network Error.</p>
//       </div>
//     </div>
//   )
// }

// export const JQDatePicker = ({ id, curValue, setState, name, customClass }) => {

//   useEffect(() => {
//     function handleDate(pickedDate, name) {
//       setState(pre => ({ ...pre, [name]: pickedDate}));
//     }
//     window.initPicker(id, handleDate, name);
//     return () => window.removePicker(id);
//   },[id, setState, name])

//   return <input type="text" value={curValue} onChange={(e) => setState(pre => ({ ...pre, [name]: e.target.value}))} className={customClass} autoComplete="off" id={id} />;
// }

export const JQDatePicker = ({ id, curValue, setState, name, customClass, handler, format='dd/mm/yy', isRequired, readOnly=false, ...props }) => {

  useEffect(() => {
    window.$(`#${id}`).datepicker({
      dateFormat: format,
      changeMonth: true,
      changeYear: true,
      yearRange: "-60:+0",
      beforeShow: function(i) { if (window.$(`#${id}`).attr('readonly')) { return readOnly ? false : null; } },
      onSelect: function() {this.focus()}, 
      onClose: function(date) {
        if (handler) return handler(date);
        setState(pre => ({ ...pre, [name]: date}))
      }      
    });
    console.log('picker rendered');
    return () => window.$(`#${id}`).datepicker( "destroy" );
  },[id, setState, name, format])             // passing handler causing problem (datepicker not closing) when user types invalid date in input.

  const handleChange = (e) => {
    let value = e.target.value;
    if (isNaN(value.split('/').join(''))) return 
    setState(pre => ({ ...pre, [name]: value}))
  }

  return <input {...props} type="text" maxLength={10} readOnly={readOnly} required={isRequired} value={curValue} onChange={handleChange} className={customClass} autoComplete="off" id={id} tabIndex={1}/>;
}

export const MyModal = ({ handleClose, name, customClass, fullscreen, child, isStatic, width='40em', closeIcon=true, styles }) => {

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

  const fullscreenStyles = fullscreen ? { borderRadius: '0', width: '100%', maxWidth: '100%' } : {};

  return (
    createPortal(
      <section className={`myModal ${customClass} ${fullscreen ? 'p-0' : ''} default-global`} style={{fontSize: '1.6rem'}}>
        <div className="bg-overlay" onClick={handleBGClick}></div>
        <div className={`myModal-body`} style={{maxWidth: width, ...fullscreenStyles, ...styles}}>
          {closeIcon && <i className='bx bx-x-circle modal-close-btn' onClick={handleHide}></i>}
          {child}
        </div>
      </section>,
      document.body
    )
  )
}

export function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        // const offset = window.$('#header')[0].clientHeight;
        // console.log(offset);
        // window.scrollTo(0, offset);
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export const scrollToContent = (ref, offset=100) => window.scrollTo(0, ref.current.offsetTop - 100);

export const focusArea = (globalDataAction) => {
  window.scrollTo(0, 0);
  let x = Math.random() * 10000;
  globalDataAction({ focusArea: x });
}

export const wait = async (time) => await new Promise((resolve) => setTimeout(resolve, time));

export const HoverDropdown = ({ modalAction, member, userInfoAction }) => {
  const toggleMember = () => {
    userInfoAction({selectedMember: member});
  }
  return (
    <div className='hover-dropdown'>
      <Link to='#' className='dashboard-card__btn-box-item' style={{'--clr': '#26AE24', '--bg': '#3cf7a952', '--bClr': '#26ae2454'}}>BOOK SERVICES</Link>
      <ul className="dropdown-menu">
        <li><Link className="dropdown-item" onClick={() => modalAction('MEMBER_PROFILE_MODAL', true, {tab: 'appointments', memberId: member.MemberId})} to="#"><i className='bx bx-user-circle' style={{'--clr': '#0494f9'}}></i> View Bookings</Link></li>
        <li><Link className="dropdown-item" onClick={toggleMember} to="/specialists"><i className='bx bx-calendar-check' style={{'--clr': '#0494f9'}}></i> Book Appointments</Link></li>
        <li><Link className="dropdown-item" onClick={toggleMember} to="/labTests"><i className='bx bx-test-tube' style={{'--clr': '#ab54fd'}}></i> Book Lab Tests</Link></li>
      </ul>
    </div>
  )
}

export const getConfirmation = (query) => {
  if (window.confirm(query) === true) {
    return true;
  } else {
    return false;
  }
}

export const today = new Date().toLocaleDateString('en-TT');


// 1. All three modules OPD, PHARMACY, LAB TESTS will have different type of paramenters for thier apis. 

export const getTotalCartItems = (cart, type='') => {
  let pharmacy = Object.keys(cart.pharmacy).length;
  let labTests = Object.keys(cart.labTests).length;
  if (type === 'pharmacy') {
    return pharmacy;
  } else if (type === 'labTests') {
    return labTests
  } else {
    return pharmacy + labTests;
  }
}

export const CacheBusting = () => {
  useEffect(() => {

    const caching = () => {
      let oldVersion = localStorage.getItem('version');

      if (!oldVersion) {
        localStorage.setItem('version', currentVersion);
        window.location.reload(true);
        return;
      }

      if (oldVersion !== currentVersion) {
        // stringToast("Got a new Update, please wait", 'error');
        // alert("Got a new Update, please wait")
        if ('caches' in window) {
          caches.keys().then((names) => {
            names.forEach(name => {
                caches.delete(name);
            })
          });
        }
        // localStorage.clear();
        localStorage.setItem('version', currentVersion);
        window.location.reload(true);
      } else {
        localStorage.setItem('version', currentVersion);
      }
    };
    caching();
  }, [])

  return;
}

export const DefaultAccordion = ({ name, data, activeKey, handler, allOpen=false }) => {

  return (
    <div className="accordion" id={name}>
      {data.map(i => {
        const uniqueKey = name + '-' + i.key;
        return (
          <div className="accordion-item" key={uniqueKey}>
            <h2 className="accordion-header" id="headingOne">
              <button type="button" className={`accordion-button ${allOpen || uniqueKey === activeKey ? '' : 'collapsed'}`} onClick={() => handler(uniqueKey)}>
                <i className='bx bxs-right-arrow-square me-3' style={{fontSize: '1.4em'}}></i> {i.heading}
              </button>
            </h2>
            <div id="collapseOne" className={`accordion-collapse collapse ${allOpen || uniqueKey === activeKey ? 'show' : ''}`}>
              <div className="accordion-body">
                {i.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const ScrollUpIcon = ({ compCode, vTypeAction, vType }) => {
  const handleClick = () => window.scrollTo(0, 0);
  const [vertical, setVertical] = useState({ current: vType, types: ['ErpHospital', 'ErpPharma', 'RESTAURANT', 'HOTEL', 'RESORT'] })


  // return (
  //   <select className="form-select position-fixed bottom-0 end-0" value={vertical.current} onChange={(e) => {vTypeAction(e.target.value);setVertical(pre => ({...pre, current: e.target.value}))}} style={{maxWidth: 'fit-content'}}>
  //     {vertical.types.map(i => ( <option key={i} value={i}>{i}</option>))}
  //   </select>    
  // )


  if (compCode === BSN_ID) {
      return <span onClick={handleClick} className='scrollUp-icon'><i className='bx bxs-up-arrow-circle'></i></span>;
  } else  {
      return <span onClick={handleClick} className='scrollUp-icon'><i className='bx bxs-up-arrow-circle'></i></span>;
  }
} 

export const useScrollPosition = () => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  
  const handleScroll = () => {
    const position = { top: window.pageYOffset, left: window.pageXOffset };
    setCoords(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return coords;
}

// export const useRegType = (setState, type, companyId) => {
//   const regTypes = useFetch(`${BASE_URL}/api/Values/GetMstAllMaster?CID=${companyId}&type=RegistrationType&P1=0`, companyId)[0];
//   useEffect(() => {
//     if (!regTypes.length) return;
//     let regType = regTypes.find(i => i.CodeValue === type);
//     if (!regType) alert('Something went wrong. Please try later. No RegType found.');
//     setState(pre => ({...pre, UserRegTypeId: 
//       // { name: regType.Description, CodeId: regType.CodeId }
//       regType.CodeId
//     }));
//   },[regTypes, type])
//   return null;
// }

export const useRegType = (type) => {
  let { compInfo } = store.getState();
  const regTypes = useFetch(`${BASE_URL}/api/Values/GetMstAllMaster?CID=${compInfo.CompanyId}&type=RegistrationType&P1=0`, compInfo.CompanyId)[0];
  useEffect(() => {
    if (!regTypes.length) return;
    let regType = regTypes.find(i => i.CodeValue === type);
    if (!regType) {
      alert('Something went wrong. Please try later. Invalid RegType.');
      store.dispatch(modalAction('LOGIN_MODAL', false, {mode: uType.PATIENT}));
      return;
    }
    store.dispatch(globalDataAction({ userRegType: { CodeId: regType.CodeId, Description: regType.Description, CodeValue: regType.CodeValue }}));
  },[regTypes, type])
  return null;
}

export const validRegType = (UserRegTypeId, warn=true) => {
  let { vType, globalData } = store.getState();
  if (vType && vType !== 'ErpPharma') return true;
  if (UserRegTypeId === globalData.userRegType.CodeId) {
    return true;
  } else {
    if (warn) alert('You are not Allowed to log in.');       
    return false; 
  }
}

export const LangaugeControl = ({ styles, classes, variant='secondary' }) => {
  const [selectedLang, setSelectedLang] = useState("English");

  const languages = [{ key: 'en', title: 'English' }, { key: 'bn', title: 'বাংলা' }]

  const changeLanguage = (lang) => {
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = lang.key;
      selectField.dispatchEvent(new Event("change"));
    }
    localStorage.setItem("selectedLanguage", JSON.stringify(lang)); 
    setSelectedLang(lang.title);
  };

  useEffect(() => {
    const saved = localStorage.getItem("selectedLanguage");
    if (!saved) return;
    const savedLang = JSON.parse(saved);
    if (savedLang.key === 'en') return;
    changeLanguage(savedLang)
  }, []);

  return (
    <div className="notranslate">
      <DropdownButton title={selectedLang} variant={variant} size="sm" style={{...styles}} className={'language-select ' + classes}>
        {languages.map(i => (
            <Dropdown.Item onClick={() => changeLanguage(i)} key={i.key}>
              {i.title}
            </Dropdown.Item>
        ))}
      </DropdownButton>
      <style>{`
        .language-select.style-select > button {
          padding: 0;
          border: 0;
        }
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc {
          display: none;
        }
        `}
      </style>
    </div>
  );
};

export const num = (n) => parseFloat(n.toFixed(2));

export const useTimer = (delayResend=30, start=false) => {
  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  useEffect(() => {
    
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0 || !start) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [start, delay]);


  return [seconds, minutes, setDelay]
};


export class ErrorBoundary extends React.Component {

  state = { hasError: false };

  componentDidMount() {
    console.log('Component mounted.')
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info.componentStack);
    console.log(typeof error, typeof info.componentStack);
    // log to server.
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function SliderSection({ children, data, className='' }) {

  const items = data.map(item => {
    return (
      <div key={item.LocationItemId} className={className} style={{"display": "grid", "placeItems": "center"}}>
          {React.cloneElement(children, { data: item, key: item.LocationItemId })}
      </div>      
    )
  })

  const responsive = { 0: { items: 1 }, 480: { items: 2 }, 768: { items: 3 }, 992: { items: 4 }, 1200: { items: 5 } };
  
  if (items.length === 0) return;

  return (
    <>
      <RenderCarousel
        data={items} 
        responsive={responsive}
        autoPlay={false}
        stopAutoPlayOnHover={true}
        infinite={true}
        autoPlayInterval={1500} 
      />
    </>
  );
}


export const NoContent = ({ head='No Items Found.', tSize='clamp(1.8em, 5.2vw, 2.5em)', imgClass='max-h-[18em] mt-4 mb-2', textClass='text-rose-600 mb-0', styles }) => {
  return (
    <div className='d-flex flex-column justify-content-center gap-4 text-center w-100 align-items-center' style={{...styles}}>
        <img src="/img/no_content.png" alt="No Records Found." className={imgClass} />
        <h2 className={`py-2 ${textClass}`} style={{fontSize: tSize, fontFamily: 'Poppins'}}>{head}</h2>
    </div>
  )
}

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}