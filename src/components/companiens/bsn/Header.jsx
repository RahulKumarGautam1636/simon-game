import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { modalAction } from "../../../actions";
import { getFrom, logOut } from "../default/utilities";
import { BASE_URL, bhsId, BNH_ID, BSN_ID, SRC_URL } from "../../../constants";
import Skeleton from "react-loading-skeleton";
import { HashLink } from "react-router-hash-link";
import { LangaugeControl } from "../default/utilities";
import { departments } from "./Departments/Service";
import { uType } from "../../utils/utils";
// import { userInfoAction } from "../../../actions";
// import { logOut } from "./utils/utilities";

const Header = ({ userInfo, isLoggedIn, modalAction, compCode, compInfo, isMobile }) => {

    const [menuActive, setMenuActive] = useState(false);
    const [searchKey, setSearchKey] = useState({query: '', filterBy: 'INTDOCT'});
    const [isListActive, setListActive] = useState(false); 
    const [autoCompleteList, setAutoCompleteList] = useState({loading: false, data: {PartyMasterList: [], CompanyMasterList: [], services: []}, err: {status: false, msg: ''}}); 

    const history = useHistory();

    const handleNavClick = () => {
        setMenuActive(false);
    }   

    useEffect(() => {
        window.initMenuAccord('.navigation li.dropdown a.menu-toggler');
    },[])

    useEffect(() => {
        const getSearchResult = async (companyCode, key) => {                      
            if (!companyCode) return alert('no companyCode received');                  
            const res = await getFrom(`${BASE_URL}/api/search/Get?CID=${companyCode}&Type=${key.filterBy}&SearchString=${key.query}`, {}, setAutoCompleteList);
            if (res) {
                const services = Object.values(departments).filter(i => i.title.toLowerCase().includes(key.query.toLowerCase())) || [];                
                setAutoCompleteList(pre => ({...pre, loading: false, data: { PartyMasterList: res.data.PartyMasterList, CompanyMasterList: res.data.CompanyMasterList, services: services}}));
            } else {
                console.log('No data received');
            }
        }  
        const timer = setTimeout(() => {
            if (searchKey.query.length < 1) return;
            getSearchResult(compCode, searchKey);  
        }, 800);
        return () => clearTimeout(timer);
    }, [searchKey, compCode])

    const renderAutoComplete = () => {
        if (autoCompleteList.loading) return <Skeleton style={{fontSize: '2em'}} count={10}/>
        if (searchKey.filterBy === 'INTDOCT') {
            return (
                <div className="max-h-[60vh] overflow-auto d-flex flex-column gap-2">
                    {autoCompleteList.data.services.length ? <div>
                        <h6 className="!px-5 py-2 text-sky-700 text-sm bg-sky-100">Services</h6>
                        <ul>
                            {autoCompleteList.data.services.map(i => (
                                <li key={i.deptId} >
                                    <Link onClick={() => setListActive(false)} to={`/services/${i.link}?deptId=${i.deptId}`}>
                                        {i.title}
                                        <p style={{lineHeight: '1.1', fontSize: '0.9em', marginBottom: 1}}>Service</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> : ''}
                    {autoCompleteList.data.PartyMasterList.length ? <div>
                        <h6 className="!px-5 py-2 text-sky-700 text-sm bg-sky-100">Doctors</h6>
                        {autoCompleteList.data.PartyMasterList.map(i => (
                            <ul>
                                <li key={i.PartyId} >
                                    <Link onClick={() => setListActive(false)} to={`/doctors/${i.PartyCode}/?specialistId=${i.SpecialistId}`}>
                                        {i.Name}
                                        <p style={{lineHeight: '1.1', fontSize: '0.9em', marginBottom: 1}}>{i.SpecialistDesc}</p>
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </div> : ''}
                </div>
            )
        }
    }

    // const handleSelect = (item) => {
    //     if (searchKey.filterBy === 'INTDOCT') {
    //         history.push(`/doctors/${item.PartyCode}/?specialistId=${item.SpecialistId}`);
    //     }
    //     setListActive(false);
    // }

    const handleSearchInput = (e) => {
        setSearchKey(pre => ({...pre, [e.target.name]: e.target.value}));
        setListActive(true); 
    }

    return (
        <>
            <div id="header" className="bsn-global bg-white">
                <section className="top-bar-area d-none d-sm-block">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
                                <div className="top-left">
                                    {compCode === BSN_ID ?
                                        <p><span className="material-symbols-outlined notranslate" style={{verticalAlign: 'sub', marginRight: '0.3em', color: '#0392ce'}}>ring_volume</span>24 hours emergency &amp; ambulance Service: <span className="text-nowrap text-primary">8170038223 / 25</span></p> 
                                        :
                                        <p><span className="material-symbols-outlined notranslate" style={{verticalAlign: 'sub', marginRight: '0.3em', color: '#0392ce'}}>ring_volume</span>24 hours emergency &amp; ambulance Service: <span className="text-nowrap text-primary">{compInfo.CONTACT1} / {compInfo.CONTACT2}</span></p> 
                                    }
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12">
                                <div className="top-right clearfix">
                                    <ul className="social-links">
                                        <li><LangaugeControl variant="white" classes={`style-select`} /></li>
                                        <li><Link to="#"><i className='bx bxl-facebook-circle' ></i></Link></li>
                                        <li><Link to="#"><i className='bx bxl-twitter'></i></Link></li>
                                        <li><Link to="#"><i className='bx bxl-google' ></i></Link></li>
                                        <li><Link to="#"><i className='bx bxl-linkedin' ></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="header-area">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between pt-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="logo" style={{fontSize: 'clamp(0.75em, 3.7vw, 1em)'}}>
                                    <HashLink to="/#top" style={{display: 'flex', alignItems: 'center', gap: '0.5em'}}>                                        
                                        {(() => {
                                            if (compCode === bhsId) {
                                                return <span className="bhs-logo">BHS</span>
                                            } else if (compCode === BSN_ID) {
                                                return (
                                                    <>
                                                        {/* <img src="./assets/img/bankura seva logo.webp" style={{maxHeight: '3.75em'}} alt="Awesome Logo" /> */}
                                                        <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} style={{maxHeight: '3.75em'}} alt="Awesome Logo" />
                                                        {(isLoggedIn && isMobile) ? '' : <span className="brand-name">Bankura Seva Niketan</span>}
                                                    </>
                                                )
                                            } else {
                                               return (
                                                <>
                                                    <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} style={{maxHeight: '3.75em'}} alt="Awesome Logo" />
                                                    {(isLoggedIn && isMobile) ? '' : <span className="brand-name">{compInfo.COMPNAME}</span>}
                                                </>
                                               )
                                            }
                                        })()}
                                    </HashLink>
                                </div>
                                <ul className="mob-cta-list list-inline">
                                    <li>
                                        <img className="ms-auto d-sm-none" src="/assets/img/BSN/BSN-NABH-LOGO.png" style={{maxHeight: '3.2em'}} alt="NABH" />
                                    </li>
                                    {isLoggedIn ? <li className="custom-dropdown d-lg-none position-relative">
                                        <div className="icon-holder mob-head-info">
                                            <span><i className='bx bxs-user-circle' style={{fontSize: '3.4em', verticalAlign: 'middle'}}></i> {(userInfo.Name).substr(0, 15)}..<i className='bx bxs-down-arrow'></i></span>
                                        </div>
                                        <div className="custom-dropdown-content">
                                            <div className="custom-dropdown-item">
                                                {/* <div className="text-holder">
                                                    <h4 style={{color: '#535353'}}>{userInfo.Name}</h4>
                                                    <span>{userInfo.RegMob1}Test User name</span>    
                                                </div> */}
                                                <Link to={`/profile/${userInfo.PartyCode}`}><i className="bx bx-user-circle h3 mb-0 me-2"></i> {userInfo.Name}</Link> 
                                            </div>
                                            {/* <div className="custom-dropdown-item">
                                                <Link to="#/profile"><i className="bx bx-user-circle h3 mb-0 me-2"></i> Profile</Link>
                                            </div> */}
                                            <div className="custom-dropdown-item">
                                                <Link to="/dashboard"><i className="bx bx-tachometer h3 mb-0 me-2"></i> Services</Link>
                                            </div>
                                            {/* <div className="custom-dropdown-item">
                                                <Link to="/myOrders"><i className="bx bx-cart-alt h3 mb-0 me-2"></i> My Orders</Link>
                                            </div> */}
                                            <div className="custom-dropdown-item">
                                                <Link to="#" onClick={() => logOut(history)}><i className="bx bx-log-out-circle h3 mb-0 me-2"></i> Logout</Link>
                                            </div>
                                        </div>
                                    </li> 
                                    :
                                    <li>
                                        <button className="ms-auto d-sm-none btn-type-1" style={{fontSize: '0.8em', borderRadius: '5px'}} onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})}>Login</button>
                                    </li>
                                    }
                                </ul>
                            </div>

                            <div className="ms-0 ms-sm-auto d-none d-sm-block">
                                <div className="header-right">
                                    <ul className="d-flex flex-sm-row flex-wrap w-100">
                                        <li className="d-none d-sm-block">
                                            <img src="/assets/img/BSN/BSN-NABH-LOGO.png" style={{maxHeight: '3.6em'}} alt="NABH" />
                                        </li> 
                                        {compCode === bhsId ? '' : <>
                                        <li className="head-info custom-dropdown" id="call-us">
                                            <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">phone_in_talk</span>
                                            </div>
                                            <div className="text-holder">
                                                <h4>Call us now</h4>
                                                <span>{compInfo.CONTACT1} {compInfo.CONTACT2 ? `/ ${compInfo.CONTACT2}` : ''}</span>    
                                            </div>
                                            {compCode === BSN_ID &&
                                            <div className="custom-dropdown-content" style={{left: 'unset', right: '0', fontSize: '1.1em'}}>
                                                <div className="custom-dropdown-item">
                                                    <Link to={`#`}><i className='bx bxs-phone-call'></i> 18002125433</Link>
                                                </div>
                                                <div className="custom-dropdown-item">
                                                    <Link to="#"><i className='bx bxs-phone-call'></i> +913242351313</Link>
                                                </div>
                                                <div className="custom-dropdown-item">
                                                    <Link to="#"><i className='bx bxs-phone-call'></i> +913242351339</Link>
                                                </div>
                                            </div>}
                                        </li>
                                        <li className="head-info" id="top-address">
                                            <div className="icon-holder">
                                                <span className="material-symbols-outlined notranslate">pin_drop</span>
                                            </div>
                                            <div className="text-holder">
                                                <h4>{compInfo.ADDRESS}</h4>
                                                <span>PIN Code - {compInfo.PIN}</span> 
                                            </div>
                                        </li></>}   
                                        {/* <li className="d-none d-sm-block">
                                            <img src="/assets/img/nabh.png" style={{maxHeight: '3.6em'}} alt="NABH" />
                                        </li>  */}
                                        {isLoggedIn ? <li className="head-info custom-dropdown d-none d-md-block">
                                            <div className="icon-holder">
                                                <span className="material-symbols-outlined notranslate" style={{transform: 'scale(1.3)'}}>account_circle</span>
                                                {/* <span><i className='bx bxs-user-circle' style={{transform: 'scale(1.4)', color: '#535353'}}></i></span> */}
                                            </div>
                                            <div className="text-holder d-flex gap-2 align-items-center">
                                                <div>
                                                    <h4>{userInfo.Name}</h4>
                                                    <span>{userInfo.RegMob1}</span>    
                                                </div>
                                                <i className='bx bx-caret-down text-[1.6em]'></i>
                                            </div>
                                            <div className="custom-dropdown-content" style={{left: 'unset', right: '0', fontSize: '1.1em'}}>
                                                <div className="custom-dropdown-item">
                                                    <Link to={`/profile/${userInfo.PartyCode}`}><i className="bx bx-user-circle h3 mb-0 me-2"></i> Members</Link>
                                                </div>
                                                <div className="custom-dropdown-item">
                                                    <Link to="/dashboard"><i className="bx bx-tachometer h3 mb-0 me-2"></i> Services</Link>
                                                </div>
                                                {/* <div className="custom-dropdown-item">
                                                    <Link to="/myOrders"><i className="bx bx-cart-alt h3 mb-0 me-2"></i> My Orders</Link>
                                                </div> */}
                                                <div className="custom-dropdown-item">
                                                    <Link to="#" onClick={() => logOut(history)}><i className="bx bx-log-out-circle h3 mb-0 me-2"></i> Logout</Link>
                                                </div>
                                            </div>
                                        </li>
                                        : 
                                        <li className="mb-0 d-flex align-items-center">
                                            <div className="search-button">
                                                <div className="toggle-search">
                                                    <button className="d-none d-sm-flex" onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})}>Login</button>    
                                                </div>
                                            </div>
                                        </li>      
                                        }
                                    </ul>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>   

                <section className='sidebar-section'>
                    <div>
                        <ul>
                            <li style={{background: "#07bb88"}}>
                                <span className="material-symbols-outlined notranslate">event_available</span> <Link to="/specialists" >Book An Appointment</Link>
                            </li>
                            <li style={{background: "#028fe1"}}>
                               <span className="material-symbols-outlined notranslate">demography</span><Link to="/contactUs" > Get a Second Opinion</Link>
                            </li>
                            <li style={{background: "#dc3545", borderTop: '1px solid white',  borderBottom: '1px solid white'}}>
                               <span className="material-symbols-outlined notranslate">ring_volume</span><Link to="#" > 24 X 7 Emergency Call</Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            <section id='mainmenu-area' className="mainmenu-area bsn-global bg-white" style={{position: 'sticky', top: 0, zIndex: 11, boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px'}}>              {/* Keeping this section out of the group to make it sticky */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between align-items-center">
                            <div className={`menu-backdrop ${menuActive ? 'active' : ''}`} onClick={() => setMenuActive(false)}></div>
                            <nav className={`main-menu ${menuActive ? 'menu-opened' : ''}`}>
                                <div className="menu-header d-lg-none">
                                    <Link className="menu-logo" to="#">
                                        {/* {compCode === bhsId ? <span className="bhs-logo d-block pb-0 pt-1" style={{fontSize: '1.6em'}}>BHS</span> : <img src="./assets/img/bankura seva logo.webp" style={{maxHeight: '3.75em'}} className="img-fluid logo" alt="Bankura seva niketan"/>}  */}

                                        {(() => {
                                            if (compCode === bhsId) {
                                                return <span className="bhs-logo d-block pb-0 pt-1" style={{fontSize: '1.6em'}}>BHS</span>;
                                            } else {
                                                // return <img src="./assets/img/bankura seva logo.webp" style={{maxHeight: '3.75em'}} className="img-fluid logo" alt="Bankura seva niketan"/>;
                                                return <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} style={{maxHeight: '3.75em'}} className="img-fluid logo" />;
                                            }
                                        })()}                                       
                                    </Link>
                                    <span id="menu_close" onClick={() => setMenuActive(false)} className="menu-close" to="#"><i className='bx bx-x'></i></span>
                                </div>
                                <div className="navbar-collapse clearfix">
                                    <ul className="navigation clearfix">
                                        <li className="current"><HashLink to="/#top" onClick={handleNavClick}>Home</HashLink></li>
                                        <li className="dropdown"><Link to="#" className="menu-toggler">About Us <i className='bx bx-caret-down'></i></Link>
                                            <div className="menu-wrapper">
                                                <ul>
                                                    <li><Link onClick={handleNavClick} to="/aboutUs">About Hospitals</Link></li>
                                                    <li><Link onClick={handleNavClick} to="/doctors">Meet Our Doctors</Link></li>
                                                    <li><Link onClick={handleNavClick} to="/faq">Faq’s</Link></li>
                                                    <li><Link onClick={handleNavClick} to="/testimonials">Testimonials</Link></li>
                                                    {/* <li><Link to="#">Our Gallery</Link></li>
                                                    <li><Link to="#">Gallery Single</Link></li> */}
                                                </ul>
                                            </div>
                                        </li>
                                        {/* <li className="dropdown"><Link to={'#'}>Departments <i className='bx bx-caret-down menu-toggler'></i></Link>
                                            <ul>
                                                <li><Link onClick={handleNavClick} to="/departments">View All</Link></li>
                                                <li><Link onClick={handleNavClick} to="/departments/cardiology">Cardiology</Link></li>
                                                <li><Link onClick={handleNavClick} to="/departments/pulmonology">Pulmonology</Link></li>
                                                <li><Link onClick={handleNavClick} to="/departments/gynecology">Gynecology</Link></li>
                                                <li><Link onClick={handleNavClick} to="/departments/neurology">Neurology</Link></li>
                                                <li><Link onClick={handleNavClick} to="/departments/urology">Urology</Link></li>
                                                <li><Link onClick={handleNavClick} to="/departments/gastrology">Gastrology</Link></li>
                                                <li><Link onClick={handleNavClick} to="/departments/pediatrician">Pediatrician</Link></li>
                                                <li><Link onClick={handleNavClick} to="/departments/laborotory">Laborotory</Link></li>
                                            </ul>
                                        </li> */}
                                        <li><Link onClick={handleNavClick} to="/doctors">Doctors</Link></li>
                                        <li><Link onClick={handleNavClick} to="/services">Services</Link></li>
                                        <li><HashLink onClick={handleNavClick} to="/aboutUs#tpa-list">Cashless TPA List</HashLink></li>
                                        {compCode === bhsId ? <li><Link onClick={handleNavClick} to="/healthCenter">Health Center</Link></li> : <li><Link onClick={handleNavClick} to="/contactUs">Contact Us</Link></li>}
                                        {compCode === bhsId ? <li><Link onClick={handleNavClick} to="/articles">Health Topics</Link></li> : 
                                        <li className="dropdown"><Link to="#" className="menu-toggler">Quick Links <i className='bx bx-caret-down'></i></Link>
                                            <div className="menu-wrapper">
                                                <ul>
                                                    {/* <li><HashLink onClick={handleNavClick} to="/aboutUs#tpa-list">Cashless TPA List</HashLink></li> */}
                                                    <li><Link onClick={handleNavClick} to="/careers">Careers</Link></li>
                                                    <li><Link onClick={handleNavClick} to="/blogs">Health Blogs</Link></li>
                                                    {/* <li><Link onClick={handleNavClick} to="/bedCategories">Bed Categories</Link></li> */}
                                                    <li><Link onClick={handleNavClick} to="/socialWorks">Social Works</Link></li>
                                                </ul>
                                            </div>
                                        </li>}
                                        {isLoggedIn && <li><Link onClick={handleNavClick} to="/dashboard">Dashboard</Link></li>}
                                        <li><Link onClick={handleNavClick} to="/specialists">Appointment</Link></li>
                                    </ul>
                                </div>
                                <section className="header-area d-lg-none">
                                    <div className="container-fluid">
                                        <div className="d-flex justify-content-between">
                                            <div className="ms-0 ms-sm-auto">
                                                <div className="header-right">
                                                    <ul className="d-flex flex-column w-100">
                                                        {compCode === bhsId ? '' : <>
                                                        <li className="head-info w-100" id="call-us">
                                                            <div className="icon-holder">
                                                            <span className="material-symbols-outlined notranslate">phone_in_talk</span>
                                                            </div>
                                                            <div className="text-holder">
                                                                <h4>Call us now</h4>
                                                                <span>{compInfo.CONTACT1} {compInfo.CONTACT2 ? `/ ${compInfo.CONTACT2}` : ''}</span>    
                                                            </div>
                                                        </li>
                                                        <li className="head-info w-100" id="top-address">
                                                            <div className="icon-holder">
                                                                <span className="material-symbols-outlined notranslate">pin_drop</span>
                                                            </div>
                                                            <div className="text-holder">
                                                                <h4>{compInfo.ADDRESS}</h4>
                                                                <span>PIN Code - {compInfo.PIN}</span> 
                                                            </div>
                                                        </li></>}
                                                    </ul>                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section> 
                            </nav>

                            <div className="mainmenu-right-box header-search">
                                <div className="search-form position-relative">
                                    <form className="w-100" onSubmit={(e) => e.preventDefault()}>
                                        <div className="search">
                                            <input type="text" onChange={handleSearchInput} name="query" value={searchKey.query} autoComplete="off" placeholder="Search Doctors, services.."/>
                                            <button type="submit"><i className='bx bx-search-alt'></i></button>
                                        </div>
                                    </form>
                                    {isListActive && <div className='search-results-1 active' style={{zIndex: 3}}>
                                        <div className='mb-0'>
                                            {renderAutoComplete()}
                                        </div>
                                    </div>}
                                    {isListActive && <span onClick={() => setListActive(false)} style={{position: 'fixed', zIndex: 1, inset: '0'}}></span>}
                                    <i className='bx bx-menu menu-toggler d-lg-none' onClick={() => setMenuActive(true)}></i>
                                </div>
                            </div>                    
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (state) => {
    return { compCode: state.compCode, userInfo: state.userInfo, isLoggedIn: state.isLoggedIn, compInfo: state.compInfo, isMobile: state.isMobile };
}

export default connect(mapStateToProps, {modalAction})(Header);