import { useState } from "react";
import { stringToast } from "../default/utilities";
import { BSN_ID } from "../../../constants";
import { connect } from "react-redux";

const ContactUs = ({ compInfo, compCode }) => {

    const [query, setQuery] = useState({ name: '', phone: '', mail: '', subject: '', message: '' });

    const handleQuery = (e) => {
        const { name, value } = e.target;
        setQuery(pre => ({ ...pre, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        stringToast("Successfully sent your message. We will call you very soon..", { type: 'success', autoClose: 5000, theme: 'colored' });
    }

    return (
        <div className="bsn-global">
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>Contact us</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="left pull-left">
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        <li className="active">Contact us</li>
                                    </ul>
                                </div>
                                <div className="right pull-right">
                                    <a href="#"><span className="material-symbols-outlined notranslate">share</span> Share</a> 
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-form-area">
                <div className="container">
                    <div className="sec-title">
                        <h1>Get in Touch With Us</h1>
                        <span className="border"></span>
                        {/* <div className="select-box pull-right">
                            <div className="btn-group bootstrap-select text-capitalize form-control required" style={{width: '100%'}}><button type="button" className="btn dropdown-toggle g-select" data-toggle="dropdown" role="button" title="Newyork Campus" fdprocessedid="sy4ybg"><span className="filter-option pull-left">Newyork Campus</span>&nbsp;<span className="bs-caret"><span className="caret"></span></span></button><div className="dropdown-menu open" role="combobox"><ul className="dropdown-menu inner" role="listbox" aria-expanded="false"><li data-original-index="0" className="selected"><a tabindex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="true"><span className="text">Newyork Campus</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Canada Campus</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">UK Campus</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">USA Campus</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select className="text-capitalize selectpicker form-control required" name="form_subject" data-style="g-select" data-width="100%" tabindex="-98">
                                <option>Newyork Campus</option>
                                <option>Canada Campus</option>
                                <option>UK Campus</option>
                                <option>USA Campus</option>
                            </select></div>
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-7">
                            <div className="contact-form">
                                <form id="contact-form" className="default-form" onSubmit={handleSubmit}>
                                    <h2>Our team will call you.</h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" name="name" value={query.name} onChange={handleQuery} placeholder="Your Name*" required="" aria-required="true" fdprocessedid="s3dufj"/>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="email" name="mail" value={query.mail} onChange={handleQuery} placeholder="Your Mail*" required="" aria-required="true" fdprocessedid="fjrja"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" name="phone" value={query.phone} onChange={handleQuery} placeholder="Phone" fdprocessedid="dxii2d"/>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="subject" value={query.subject} onChange={handleQuery} placeholder="Subject" fdprocessedid="gmzny"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <textarea name="message" value={query.message} onChange={handleQuery} placeholder="Your Message.." required="" aria-required="true"></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button className="thm-btn bgclr-1" type="submit" data-loading-text="Please wait..." fdprocessedid="l1iazs">send message</button>
                                        </div>
                                    </div>
                                </form>  
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5">
                            <div className="quick-contact">
                                <div className="title">
                                    <h2>Quick Contact</h2>
                                    <p>If you have any questions simply use the following contact details.</p>
                                </div>
                                <ul className="contact-info">
                                    <li>
                                        <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">pin_drop</span>
                                        </div>
                                        <div className="text-holder">
                                            <h5><span>Address:</span> {compInfo.ADDRESS}, {compInfo.PIN}</h5>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">phone_in_talk</span>
                                        </div>
                                        <div className="text-holder d-flex gap-3">
                                            <h5><span>Phone: </span></h5>
                                            {compCode === BSN_ID ? <div>
                                                <h5 className="mb-1"><i className='bx bx-right-arrow-alt'></i> 18002125433</h5>
                                                <h5 className="mb-1"><i className='bx bx-right-arrow-alt'></i> 7797701790</h5>
                                                <h5 className="mb-1"><i className='bx bx-right-arrow-alt'></i> 7797701791</h5>
                                                <h5 className="mb-1"><i className='bx bx-right-arrow-alt'></i> +913242351313</h5>
                                                <h5 className="mb-0"><i className='bx bx-right-arrow-alt'></i> +913242351339</h5>
                                            </div> : 
                                            <div>
                                                <h5 className="mb-1"><i className='bx bx-right-arrow-alt'></i> {compInfo.CONTACT1}</h5>
                                                <h5 className="mb-1"><i className='bx bx-right-arrow-alt'></i> {compInfo.CONTACT2}</h5>
                                            </div>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">forward_to_inbox</span>
                                        </div>
                                        <div className="text-holder">
                                            <h5><span>Email:</span> {compInfo.MAILID}</h5>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="social-links">
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                    <li><a href="#"><i className="fa fa-pinterest-p"></i></a></li>
                                    <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                                </ul>
                            </div>    
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToFooter = (state) => ({ compInfo: state.compInfo, compCode: state.compCode });

export default connect(mapStateToFooter, {})(ContactUs);