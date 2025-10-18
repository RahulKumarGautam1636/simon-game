import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { userInfoAction } from '../../../actions';
import { amNursingId, ASTHA_ID, defaultId, existingLogos, SRC_URL } from "../../../constants";
import { uType } from "../../utils/utils";
import { Link } from "react-router-dom";


function Footer({ compInfo, userInfo, userInfoAction, compCode }) {

  const [locationOverlay, setLocationOverlay] = useState(true);
  const [dropdownActive, setDropdownActive] = useState(false);

  function getLocation() {
    if (userInfo.location.latitude) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        userInfoAction({ location: position.coords });
        setLocationOverlay(false);
      },
      function(err) {
        console.log(err.message);
      });                
    } else {
      console.log("Not Available");
    }
  }
  
  useEffect(() => {
    setTimeout(() => {        
      getLocation();      
    }, 3000);
  }, [userInfoAction])

  const logoStyle = {
    [amNursingId]: { height: '4.5em' }
  }

  return (
    <>
      {locationOverlay && <span onClick={() => {getLocation(); setLocationOverlay(false);}} style={{position: 'fixed', inset: 0, zIndex: 1111 }}></span>}   {/* background: '#f0f8ff7d' */} 
      {/* {locationOverlay && <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{background: '#00000057'}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-info fw-bold" id="exampleModalLabel">GET NEARBY CLINICS</h5>
              <Link className="btn-close" to='#' onClick={() => setLocationOverlay(false)} aria-label="Close" ></Link>
            </div>
            <div className="modal-body">
              View nearby clinics only.
            </div>
            <div className="modal-footer">
              <Link to='/' className="btn btn-primary" data-dismiss="modal" onClick={() => {getLocation(); setLocationOverlay(false);}}> YES PLEASE </Link>
              <Link to='/' className="btn btn-primary" data-dismiss="modal" onClick={() => setLocationOverlay(false)}> NO THANKS </Link>
            </div>
          </div>
        </div>
      </div>} */}
      <footer className="footer footer-bg" style={{fontSize: '1.2em'}}>
        <div className="footer-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget footer-about">
                            <div className="footer-logo">
                                {
                                  existingLogos.includes(compInfo.LogoUrl.split('.')[0]) ? 
                                  <>
                                    {(() => {
                                      if (compCode === ASTHA_ID) {
                                        return <span className='d-flex align-items-center'><img className="logo" src={`/img/logo/${compInfo.LogoUrl}`} alt={compInfo.COMPNAME} style={{height: '4.5rem'}}/><span style={{fontWeight: 600, marginLeft: '0.5em', fontSize: '1.2em'}} className="text-white"> {compInfo.COMPNAME}</span></span>  
                                      } else if (compCode === defaultId) {
                                        return <img className="logo" src={`/img/logo/612.jpeg`} alt={compInfo.COMPNAME} style={{height: '4.5rem', ...logoStyle[compCode]}}/>
                                      } else {
                                        return <img className="logo" src={`/img/logo/${compInfo.LogoUrl}`} alt={compInfo.COMPNAME} style={{height: '4.5rem', ...logoStyle[compCode]}}/> 
                                      }
                                    })()}
                                  </>
                                  :
                                  <img 
                                    src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} 
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null;                                   // prevents looping
                                      currentTarget.src = '/img/logo/opd2.png';
                                    }}
                                    className="img-fluid logo" alt={compInfo.COMPNAME} style={{height: '4.5rem', ...logoStyle[compCode]}} 
                                  />
                                }
                            </div>
                            {/* <div className="footer-about-content">
                                <div className="social-icon">
                                    <ul className="d-flex justify-content-around w-75">
                                        <li>
                                            <a href="#" target="_blank"><i className="fab fa-facebook-f"></i> </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank"><i className="fab fa-twitter"></i> </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank"><i className="fab fa-instagram"></i></a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank"><i className="fab fa-dribbble"></i> </a>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget footer-menu">
                            <h2 className="footer-title">For Patients</h2>
                            <ul>
                                <li><a href="#"><i className="fas fa-angle-double-right"></i> Search for Doctors</a></li>
                                <li><a href="#"><i className="fas fa-angle-double-right"></i> Login</a></li>
                                <li><a href="#"><i className="fas fa-angle-double-right"></i> Register</a></li>
                                <li><a href="#"><i className="fas fa-angle-double-right"></i> Booking</a></li>
                                <li><a href="#"><i className="fas fa-angle-double-right"></i> Patient Dashboard</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget footer-menu">
                            <h2 className="footer-title">For Doctors</h2>
                            <ul>
                                <li><a href="#l"><i className="fas fa-angle-double-right"></i> Appointments</a></li>
                                <li><a href="#"><i className="fas fa-angle-double-right"></i> Login</a></li>
                                <li><a href="#"><i className="fas fa-angle-double-right"></i> Register</a></li>
                                <li><a href="#"><i className="fas fa-angle-double-right"></i> Doctor Dashboard</a></li>
                                <li><Link to="/privacyPolicy"><i className="fas fa-angle-double-right"></i> Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget footer-contact">
                            <h2 className="footer-title">Contact Us</h2>
                            <div className="footer-contact-info">
                              <div className="footer-address">
                                <span><i className="fas fa-map-marker-alt"></i></span>
                                {/* <p> 3556  Beech Street, San Francisco,<br/> California, CA 94108 </p> */}
                                <p>{compInfo.ADDRESS}</p>
                              </div>
                              <p><i className="fas fa-phone-alt"></i> +91 {compInfo.CONTACT1}</p>
                              {/* <p className="mb-0 text-decoration-line-through"><i className="fas fa-envelope"></i> mailExample@gmail.com</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="copyright-menu d-flex flex-column flex-md-row w-100 justify-content-between align-items-center">
                        <ul className="policy-menu mb-3">
                            <li><a href="#">Terms and Conditions</a></li>
                            <li><a href="#">Policy</a></li>
                        </ul>
                        {dropdownActive && <select className="form-select" value={userInfo.UserType} onChange={(e) => {userInfoAction({UserType: e.target.value}); setDropdownActive(false)}} style={{maxWidth: 'fit-content'}}>
                          <option value={uType.PATIENT.level}>Patient</option>
                          <option value={uType.DOCTOR.level}>Doctor</option>
                          <option value={uType.POLYCLINIC.level}>Polyclinic</option>
                          <option value={uType.COLLECTOR.level}>Collector</option>
                          <option value={uType.PROVIDER.level}>Provider</option>
                        </select>}
                        <p className="text-white my-2"><span onClick={() => setDropdownActive(!dropdownActive)}>Powered by </span> &nbsp;<img className="logo" style={{maxHeight: '2.5rem'}} src="img/logo/612.jpeg" alt="Gbooks" /></p>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </>
  )
}

const mapStateToProps = (state) => {
  return { compCode: state.compCode, compInfo: state.compInfo, userInfo: state.userInfo, isMobile: state.isMobile };
}

export default connect(mapStateToProps, {userInfoAction})(Footer);