import { connect } from "react-redux";
import { bhsId } from "../../../constants"
import { Link } from "react-router-dom";
import { LangaugeControl } from "../default/utilities";

const Footer = ({ compCode, compInfo }) => {

    return (
        <div className="bsn-global">
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-12">
                            {compCode === bhsId ? <div className="single-footer-widget pd-bottom50">
                                <div className="title">
                                    <h3>About Organisation</h3>
                                    <span className="border"></span>
                                </div>
                                <div className="our-info">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    <p className="mar-top">when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <Link to="#">Know More<i className="fa fa-caret-right" aria-hidden="true"></i></Link>
                                </div>
                            </div> :
                            <div className="single-footer-widget pd-bottom50">
                                <div className="title">
                                    <h3>About Hospital</h3>
                                    <span className="border"></span>
                                </div>
                                <div className="our-info">
                                    {/* <Link to="#" style={{margin: '0 0 0.5em', fontSize: '1.3em', lineHeight: '1.5'}}>Bankura Seva Niketan Private Limited</Link> */}
                                    <Link to="#" style={{margin: '0 0 0.5em', fontSize: '1.3em', lineHeight: '1.5'}}>{compInfo.COMPNAME}</Link>
                                    <p>The relentless service of Hospitals in the past 25 years taken health care to the most modern levels in the region catering to urban &amp; rural.</p>
                                    <p className="mar-top">A Health Care Provider of Western Approach, Hospitals is the most trusted multispecialty hospital.</p>
                                    <Link to="/aboutUs">Know More<i className="fa fa-caret-right" aria-hidden="true"></i></Link>
                                </div>
                            </div>}
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className="single-footer-widget pd-bottom50 ps-lg-5">
                                <div className="title">
                                    <h3>Usefull Links</h3>
                                    <span className="border"></span>
                                </div>
                                <ul className="usefull-links fl-lft">
                                    <li><Link to="#/aboutUs">About Us</Link></li>
                                    <li><Link to="#">Awards</Link></li>
                                    <li><Link to="#/doctors">Consultants</Link></li>
                                    <li><Link to="#">Working Hours</Link></li>
                                    <li><Link to="#">Procedures</Link></li>
                                    <li><Link to="#">Special Offers</Link></li>
                                    <li><Link to="#/faq">FAQ’s</Link></li>
                                </ul>
                                <ul className="usefull-links">
                                    <li><Link to="#/services">Services</Link></li>
                                    <li><Link to="#">Healthy Foods</Link></li>
                                    <li><Link to="#/specialists">Appointments</Link></li>
                                    <li><Link to="#">Latest News</Link></li>
                                    <li><Link to="#">Certificates</Link></li>
                                    <li><Link to="#">Qualifications</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className="single-footer-widget mar-bottom">
                                <div className="title">
                                    <h3>Contact Details</h3>
                                    <span className="border"></span>
                                </div>
                                <ul className="footer-contact-info">
                                    <li>
                                        <div className="icon-holder">
                                        <span className="material-symbols-outlined notranslate">pin_drop</span>
                                        </div>
                                        <div className="text-holder">
                                            {compCode === bhsId ? <h5>Organisation Example Address</h5> : <h5>{compInfo.ADDRESS} {compInfo.PIN}</h5>}
                                        </div>
                                    </li>
                                    {/* <li>
                                        <div className="icon-holder">
                                        <span className="material-symbols-outlined notranslate">forward_to_inbox</span>
                                        </div>
                                        <div className="text-holder">
                                            <h5>{compInfo.MAILID}&nbsp;</h5>
                                        </div>
                                    </li> */}
                                    <li>
                                        <div className="icon-holder">
                                        <span className="material-symbols-outlined notranslate">phone_in_talk</span>
                                        </div>
                                        <div className="text-holder">
                                            {compCode === bhsId ? <h5> 7757878538</h5> : <h5>{compInfo.CONTACT1} / {compInfo.CONTACT2}</h5>}
                                        </div>
                                    </li>
                                    {/* <li>
                                        <div className="icon-holder">
                                        <span className="material-symbols-outlined notranslate">alarm</span>
                                        </div>
                                        <div className="text-holder">
                                            <h5>Mon-Satday: 9am to 18pm</h5>
                                        </div>
                                    </li> */}
                                    <li>
                                        <div className="icon-holder">
                                        <span className="material-symbols-outlined notranslate">g_translate</span>
                                        </div>
                                        <div className="text-holder d-flex gap-3">
                                            <h5>Change Language: </h5><LangaugeControl />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-lg-4 col-12">
                            <div className="single-footer-widget clearfix">
                                <div className="title">
                                    <h3>Make an Appointment</h3>
                                    <span className="border"></span>
                                </div>
                                <form className="appointment-form" action="#">
                                    <div className="input-box">
                                        <input type="text" name="form_name" placeholder="Your Name" required="" fdprocessedid="zuycjlj"/>
                                        <div className="icon-box">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <input type="email" name="form_email" placeholder="Your Email" required="" fdprocessedid="ea7cot"/>
                                        <div className="icon-box">
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <textarea name="form_message" placeholder="Your Message.." required="" aria-required="true"></textarea>
                                    </div>
                                    <button type="submit" fdprocessedid="l5dpx">submit</button>
                                </form>
                            </div>
                        </div> */}
                    </div>
                </div>
            </footer>

            <section className="footer-bottom-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="copyright-text">
                                <p>Copyrights © 2017 All Rights Reserved, Powered by <Link to="#">Hospitals.</Link></p> 
                            </div>
                        </div>
                        <div className="col-md-4">
                            <ul className="footer-social-links">
                                <li><Link to="#"><i className='bx bxl-facebook-circle' ></i></Link></li>
                                <li><Link to="#"><i className='bx bxl-twitter'></i></Link></li>
                                <li><Link to="#"><i className='bx bxl-google' ></i></Link></li>
                                <li><Link to="#"><i className='bx bxl-linkedin' ></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { compCode: state.compCode, compInfo: state.compInfo };
}

export default connect(mapStateToProps, {})(Footer);