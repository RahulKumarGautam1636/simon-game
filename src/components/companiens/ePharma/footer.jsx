import { connect } from 'react-redux';
import { cartAction, globalDataAction, modalAction } from '../../../actions';
import { Link } from 'react-router-dom';
import { currentVersion, ePharmaId, SRC_URL, TAKE_HOME_ID, TAKEHOME_AGRO, TAKEHOME_ELECTRONICS, TAKEHOME_GARMENTS, XYZ_ID } from '../../../constants';
import { ConnectedToggleMode } from './utilities';
// import { HashLink } from 'react-router-hash-link';


const Footer = ({ compCode, compInfo, isLoggedIn, vType }) => {
    
  return (
    <div className='epharma-global'>
        <div className="footer pb-4 pb-lg-0">
            {(() => {
                if (compCode === TAKE_HOME_ID || compCode === TAKEHOME_AGRO || compCode === TAKEHOME_GARMENTS || compCode === TAKEHOME_ELECTRONICS ) {
                    return (
                        <div className="footer-static-middle">
                            <div className="container">
                                <div className="footer-logo-wrap pt-20 pb-35">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-6">
                                            <div className="footer-logo">                                                
                                                <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="Footer Logo" style={{height: '11rem', width: 'auto', marginBottom: '1rem'}}/>
                                                <p style={{background: 'var(--clr-9)', color: 'white', padding: '6px 0.3rem 5px 1rem', width: 'fit-content', borderRadius: '7px', boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px'}}>
                                                    “TakeHome” is a professional and Service Oriented platform where we provide informative content like Services through online advertising regarding Property.
                                                </p>
                                            </div>
                                            <ul className="des" style={{paddingLeft: '2rem'}}>
                                                <li>
                                                    <span className='!font-bold !text-[1.1em]' style={{textTransform: 'none'}} onClick={() => alert(currentVersion)}>TakeHome - TAPL</span>
                                                    {/* {compInfo.ADDRESS}, West Bengal - {compInfo.PIN} */}
                                                </li>
                                                <li>
                                                    <span>Phone: </span>
                                                    <Link to="#"> 8420209696 / 9330241456</Link>
                                                </li>
                                                <li>
                                                    <span>Email: </span>
                                                    <Link to="#"> ask@takehome.live</Link>
                                                </li>
                                                {/* <li>
                                                    <span onClick={() => alert(currentVersion)}>Address: </span>
                                                    {compInfo.ADDRESS}, West Bengal - {compInfo.PIN}
                                                </li>
                                                <li>
                                                    <span>Phone: </span>
                                                    <Link to="#"> {compInfo.CONTACT1} {compInfo.CONTACT2 && ' / ' + compInfo.CONTACT2}</Link>
                                                </li>
                                                {compInfo.MAILID && <li>
                                                    <span>Email: </span>
                                                    <Link to="#">{compInfo.MAILID}</Link>
                                                </li>} */}
                                            </ul>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 d-flex">
                                            <div className="footer-block text-center w-100">
                                                <h3 className="footer-block-title">Quick Links</h3>
                                                <ul>
                                                    <li><a target='__blank' href='https://admin.takehome.live/'>B2C Admin Login</a></li>
                                                    <li><a target='__blank' href='https://admin.takehome.live/'>B2B Admin Login</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 d-flex">
                                            <div className="footer-block text-center w-100">
                                                <h3 className="footer-block-title">Our Polycies</h3>
                                                <ul>
                                                    <li><Link to="/termsConditions">Terms & Conditions</Link></li>
                                                    <li><Link to="/privacyPolicy">Privacy Policy</Link></li>
                                                    <li><Link to="/returnPolicy">Return Policy</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 d-flex">
                                            {isLoggedIn ? 
                                                <div className="footer-block w-100 text-center text-lg-start">
                                                    <h3 className="footer-block-title">Follow Us</h3>
                                                    <ul className="social-link">
                                                        <li className="twitter">
                                                            <Link to="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                                                                <i className="fab fa-twitter"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="rss">
                                                            <Link to="https://www.linkedin.com/company/e-pharmas/" data-toggle="tooltip" target="_blank" title="Linkedin">
                                                                <i className="fab fa-linkedin-in"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="google-plus">
                                                            <Link to="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google +">
                                                                <i className="fab fa-google-plus-g"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="facebook">
                                                            <Link to="https://www.facebook.com/epharmaofc/" data-toggle="tooltip" target="_blank" title="Facebook">
                                                                <i className="fab fa-facebook"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="youtube">
                                                            <Link to="https://www.youtube.com/" data-toggle="tooltip" target="_blank" title="Youtube">
                                                                <i className="fab fa-youtube"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="instagram">
                                                            <Link to="https://www.instagram.com/epharmaofc" data-toggle="tooltip" target="_blank" title="Instagram">
                                                                <i className="fab fa-instagram"></i>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            : 
                                                <div className="footer-block w-100 text-center text-lg-start">
                                                    <h3 className="footer-block-title">More Links</h3>
                                                    <ul className="social-link">
                                                        <li><ConnectedToggleMode /></li>
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else if (compCode === ePharmaId) {
                    return (
                        <>
                            <div className="footer-static-top footer-static-top-3">
                                <div className="container">
                                    <div className="footer-shipping pb-xs-0">
                                        <div className="row">
                                            <div className="col-6 col-md-3 col-sm-6">
                                                <div className="li-shipping-inner-box">
                                                    <div className="shipping-icon">
                                                        <img src="/assets/img/ePharma/shipping-icon/1.png" alt="Shipping Icon"/>
                                                    </div>
                                                    <div className="shipping-text">
                                                        <h2>Free Delivery</h2>
                                                        <p className="d-none d-md-block">And free returns. See checkout for delivery dates.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 col-md-3 col-sm-6">
                                                <div className="li-shipping-inner-box">
                                                    <div className="shipping-icon">
                                                        <img src="/assets/img/ePharma/shipping-icon/2.png" alt="Shipping Icon"/>
                                                    </div>
                                                    <div className="shipping-text">
                                                        <h2>Safe Payment</h2>
                                                        <p className="d-none d-md-block">Pay with the world's most popular and secure payment methods.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 col-md-3 col-sm-6">
                                                <div className="li-shipping-inner-box">
                                                    <div className="shipping-icon">
                                                        <img src="/assets/img/ePharma/shipping-icon/3.png" alt="Shipping Icon"/>
                                                    </div>
                                                    <div className="shipping-text">
                                                        <h2>Shop with Confidence</h2>
                                                        <p className="d-none d-md-block">Our Buyer Protection covers your purchase from click to delivery.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 col-md-3 col-sm-6">
                                                <div className="li-shipping-inner-box last-child">
                                                    <div className="shipping-icon">
                                                        <img src="/assets/img/ePharma/shipping-icon/4.png" alt="Shipping Icon"/>
                                                    </div>
                                                    <div className="shipping-text">
                                                        <h2>24/7 Help Center</h2>
                                                        <p className="d-none d-md-block">Have a question? Call a Specialist.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-static-middle">
                                <div className="container">
                                    <div className="footer-logo-wrap pt-xs-20 pt-40 pb-25">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6">
                                                <div className="footer-logo">
                                                    {/* <img src="/img/logo/logo1.jpeg" alt="Footer Logo" style="border-radius: 5px"/> */}
                                                    <img src="/img/logo/ePharma.png" alt="Footer Logo" style={{height: 'clamp(2rem, 22vw, 5rem)', width: 'auto', marginBottom: '1rem'}}/>
                                                    <p style={{background: 'linear-gradient(#518ac3, #4ca1af)', color: 'white', padding: '0 0.6rem', width: 'fit-content'}}>A unit of Edifice Pharma Solutions Private Limited</p>
                                                </div>
                                                <ul className="des" style={{paddingLeft: '2rem'}}>
                                                    <li>
                                                        <span>Address 1: </span>
                                                        203, Webel IT Park, DH Block(Newtown), Action Area I, Newtown,   North 24 Pgs.700156
                                                    </li>
                                                    <li>
                                                        <span>Address 2: </span>
                                                        304, Webel IT park, Nuldubi, Malda,732141
                                                    </li>
                                                    <li>
                                                        <span>Phone: </span>
                                                        <Link to="#"> 9046032100</Link>
                                                    </li>
                                                    <li>
                                                        <span>Helpline: </span>
                                                        <Link to="#"> 9046032102 / 9046032111</Link>
                                                    </li>
                                                    <li>
                                                        <span>Email: </span>
                                                        <Link to="#">info@epharma.live</Link>
                                                    </li>
                                                    <li>
                                                        <span>Email: </span>
                                                        <Link to="#">www.epharma.liveEmail</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <div className="col-lg-2 col-md-3 col-sm-6">
                                                <div className="footer-block">
                                                    <h3 className="footer-block-title">Product</h3>
                                                    <ul>
                                                        <li><Link to="#">Prices drop</Link></li>
                                                        <li><Link to="#">New products</Link></li>
                                                        <li><Link to="#">Best sales</Link></li>
                                                        <li><Link to="#">Contact us</Link></li>
                                                    </ul>
                                                </div>
                                            </div> */}
                                            <div className="col-lg-3 col-md-3 col-sm-6 d-flex">
                                                <div className="footer-block text-center w-100">
                                                    <h3 className="footer-block-title">Our company</h3>
                                                    <ul>
                                                        <li><Link to="/">Home</Link></li>
                                                        <li><Link to="/franchisee">Franchisee</Link></li>
                                                        <li><Link to="/aboutUs">About us</Link></li>
                                                        <li><Link to="/contactUs">Contact us</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-6 d-flex">
                                                <div className="footer-block text-center w-100">
                                                    <h3 className="footer-block-title">Our Polycies</h3>
                                                    <ul>
                                                        <li><Link to="/termsConditions">Terms & Conditions</Link></li>
                                                        <li><Link to="/privacyPolicy">Privacy Policy</Link></li>
                                                        <li><Link to="/returnPolicy">Return Policy</Link></li>
                                                        {/* <li><Link to="#"></Link></li> */}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 d-none d-lg-flex">
                                                <div className="footer-block">
                                                    <h3 className="footer-block-title">Follow Us</h3>
                                                    <ul className="social-link">
                                                        <li className="twitter">
                                                            <Link to="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                                                                <i className="fab fa-twitter"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="rss">
                                                            <Link to="https://www.linkedin.com/company/e-pharmas/" data-toggle="tooltip" target="_blank" title="Linkedin">
                                                                <i className="fab fa-linkedin-in"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="google-plus">
                                                            <Link to="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google +">
                                                                <i className="fab fa-google-plus-g"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="facebook">
                                                            <Link to="https://www.facebook.com/epharmaofc/" data-toggle="tooltip" target="_blank" title="Facebook">
                                                                <i className="fab fa-facebook"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="youtube">
                                                            <Link to="https://www.youtube.com/" data-toggle="tooltip" target="_blank" title="Youtube">
                                                                <i className="fab fa-youtube"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="instagram">
                                                            <Link to="https://www.instagram.com/epharmaofc" data-toggle="tooltip" target="_blank" title="Instagram">
                                                                <i className="fab fa-instagram"></i>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <div className="footer-newsletter">
                                                    <h4>Sign up to newsletter</h4>
                                                    <form action="#" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="footer-subscribe-form validate" target="_blank" noValidate>
                                                        <div id="mc_embed_signup_scroll">
                                                            <div id="mc-form" className="mc-form subscribe-form form-group">
                                                                <input id="mc-email" type="email" autoComplete="off" placeholder="Enter your email" />
                                                                <button className="btn" id="mc-submit">Subscribe</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-static-bottom">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* <div className="footer-links">
                                                <ul>
                                                    <li><Link to="#">Online Shopping</Link></li>
                                                    <li><Link to="#">Promotions</Link></li>
                                                    <li><Link to="#">My Orders</Link></li>
                                                    <li><Link to="#">Help</Link></li>
                                                    <li><Link to="#">Customer Service</Link></li>
                                                    <li><Link to="#">Most Populars</Link></li>
                                                    <li><Link to="#">New Arrivals</Link></li>
                                                    <li><Link to="#">Special Products</Link></li>
                                                    <li><Link to="#">Our Stores</Link></li>
                                                    <li><Link to="#">Shipping</Link></li>
                                                    <li><Link to="#">Payments</Link></li>
                                                    <li><Link to="#">Discount</Link></li>
                                                    <li><Link to="#">Refunds</Link></li>
                                                    <li><Link to="#">Policy Shipping</Link></li>
                                                </ul>
                                            </div> */}
                                            <div className="payment text-center">
                                                <Link to="#">
                                                    <img src="/assets/img/ePharma/payment.png" alt=""/>
                                                </Link>
                                            </div>
                                            <div className="copyright text-center pt-25">
                                                <span><Link target="_blank" to="#">Edifice Pharma Solutions Pvt. Ltd.</Link></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
                    return (
                        <>
                            <div className="footer-static-middle">
                                <div className="container">
                                    <div className="footer-logo-wrap pt-xs-20 pt-40 pb-25">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6">
                                                <div className="footer-logo">
                                                    <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="Footer Logo" style={{maxHeight: '9rem', width: 'auto', marginBottom: '1rem'}}/>
                                                </div>
                                                <ul className="des" style={{paddingLeft: '2rem'}}>
                                                    <li>
                                                        <span>Address 1<Link to='/posOrderList/test' >:</Link> </span>
                                                        {compInfo.ADDRESS}
                                                    </li>
                                                    {compInfo.ADDRESS2 && <li>
                                                        <span>Address 2: </span>
                                                        {compInfo.ADDRESS2}
                                                    </li>}
                                                    <li>
                                                        <span>Phone: </span>
                                                        <Link to="#"> {compInfo.CONTACT1}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                } else {
                    return (
                        <>
                            <div className="footer-static-middle">
                                <div className="container">
                                    <div className="footer-logo-wrap pt-xs-20 pt-40 pb-25">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6">
                                                <div className="footer-logo">
                                                    {/* <img src="/img/logo/logo1.jpeg" alt="Footer Logo" style="border-radius: 5px"/> */}
                                                    {(() => {
                                                        if (compCode === XYZ_ID) {
                                                            return <img src={`/img/logo/XYZ-LOGO.png`} alt="Footer Logo" style={{maxHeight: '9rem', width: 'auto', marginBottom: '1rem'}}/>
                                                        } else {
                                                            return <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="Footer Logo" style={{maxHeight: '9rem', width: 'auto', marginBottom: '1rem'}}/>
                                                        }
                                                    })()}
                                                    {/* <p style={{background: 'linear-gradient(#518ac3, #4ca1af)', color: 'white', padding: '0 0.6rem', width: 'fit-content'}}>A unit of Edifice Pharma Solutions Private Limited</p> */}
                                                </div>
                                                <ul className="des" style={{paddingLeft: '2rem'}}>
                                                    {compCode === TAKEHOME_AGRO ?
                                                        <li>
                                                            <span>Address: </span>
                                                            B-1/312, Flat no. G-A, Chittaranjan Park, Kalyani -741235, Nadia, West Bengal, India.
                                                        </li>
                                                        :
                                                        <li>
                                                            <span>Address 1: </span>
                                                            {compInfo.ADDRESS} {compInfo.StateDesc} {compInfo.PIN}
                                                        </li>
                                                    }                                                    
                                                    {compInfo.ADDRESS2 && <li>
                                                        <span>Address 2: </span>
                                                        {compInfo.ADDRESS2}
                                                    </li>}
                                                    <li>
                                                        <span>Phone: </span>
                                                        <Link to="#"> {compInfo.CONTACT1}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <div className="col-lg-2 col-md-3 col-sm-6">
                                                <div className="footer-block">
                                                    <h3 className="footer-block-title">Product</h3>
                                                    <ul>
                                                        <li><Link to="#">Prices drop</Link></li>
                                                        <li><Link to="#">New products</Link></li>
                                                        <li><Link to="#">Best sales</Link></li>
                                                        <li><Link to="#">Contact us</Link></li>
                                                    </ul>
                                                </div>
                                            </div> */}
                                            <div className="col-lg-3 col-md-3 col-sm-6 d-flex">
                                                <div className="footer-block text-center w-100">
                                                    <h3 className="footer-block-title">Our company</h3>
                                                    <ul>
                                                        <li><Link to="/">Home</Link></li>
                                                        <li><Link to="/franchisee">Franchisee</Link></li>
                                                        <li><Link to="/aboutUs">About us</Link></li>
                                                        <li><Link to="/contactUs">Contact us</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-6 d-flex">
                                                <div className="footer-block text-center w-100">
                                                    <h3 className="footer-block-title">Our Polycies</h3>
                                                    <ul>
                                                        <li><Link to="/termsConditions">Terms & Conditions</Link></li>
                                                        <li><Link to="/privacyPolicy">Privacy Policy</Link></li>
                                                        <li><Link to="/returnPolicy">Return Policy</Link></li>
                                                        <li><ConnectedToggleMode classes='w-fit mx-auto' /></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 d-none d-lg-flex">
                                                <div className="footer-block">
                                                    <h3 className="footer-block-title">Follow Us</h3>
                                                    <ul className="social-link">
                                                        <li className="twitter">
                                                            <Link to="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                                                                <i className="fab fa-twitter"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="rss">
                                                            <Link to="https://www.linkedin.com/company/e-pharmas/" data-toggle="tooltip" target="_blank" title="Linkedin">
                                                                <i className="fab fa-linkedin-in"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="google-plus">
                                                            <Link to="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google +">
                                                                <i className="fab fa-google-plus-g"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="facebook">
                                                            <Link to="https://www.facebook.com/epharmaofc/" data-toggle="tooltip" target="_blank" title="Facebook">
                                                                <i className="fab fa-facebook"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="youtube">
                                                            <Link to="https://www.youtube.com/" data-toggle="tooltip" target="_blank" title="Youtube">
                                                                <i className="fab fa-youtube"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="instagram">
                                                            <Link to="https://www.instagram.com/epharmaofc" data-toggle="tooltip" target="_blank" title="Instagram">
                                                                <i className="fab fa-instagram"></i>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <div className="footer-newsletter">
                                                    <h4>Sign up to newsletter</h4>
                                                    <form action="#" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="footer-subscribe-form validate" target="_blank" noValidate>
                                                        <div id="mc_embed_signup_scroll">
                                                            <div id="mc-form" className="mc-form subscribe-form form-group">
                                                                <input id="mc-email" type="email" autoComplete="off" placeholder="Enter your email" />
                                                                <button className="btn" id="mc-submit">Subscribe</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-static-bottom">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* <div className="footer-links">
                                                <ul>
                                                    <li><Link to="#">Online Shopping</Link></li>
                                                    <li><Link to="#">Promotions</Link></li>
                                                    <li><Link to="#">My Orders</Link></li>
                                                    <li><Link to="#">Help</Link></li>
                                                    <li><Link to="#">Customer Service</Link></li>
                                                    <li><Link to="#">Most Populars</Link></li>
                                                    <li><Link to="#">New Arrivals</Link></li>
                                                    <li><Link to="#">Special Products</Link></li>
                                                    <li><Link to="#">Our Stores</Link></li>
                                                    <li><Link to="#">Shipping</Link></li>
                                                    <li><Link to="#">Payments</Link></li>
                                                    <li><Link to="#">Discount</Link></li>
                                                    <li><Link to="#">Refunds</Link></li>
                                                    <li><Link to="#">Policy Shipping</Link></li>
                                                </ul>
                                            </div> */}
                                            <div className="payment text-center">
                                                <Link to="#">
                                                    <img src="/assets/img/ePharma/payment.png" alt=""/>
                                                </Link>
                                            </div>
                                            {/* <div className="copyright text-center pt-25">
                                                <span><Link target="_blank" to="#">Edifice Pharma Solutions Pvt. Ltd.</Link></span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            })()}
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { compCode: state.compCode, compInfo: state.compInfo, isLoggedIn: state.isLoggedIn };
}

export default connect(mapStateToProps, {modalAction, globalDataAction, cartAction})(Footer);



