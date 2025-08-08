import React, { useEffect } from 'react';
import { breadCrumbAction } from '../../../actions';
import { connect } from 'react-redux';
import { TAKE_HOME_ID, ePharmaId } from '../../../constants';
import { Link } from 'react-router-dom';

const ContactUs = ({ breadCrumbAction, compCode }) => {

	useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Contact Us', link: '/contactUs'}], activeLink: '/contactUs'});
	},[breadCrumbAction])

		

	if (compCode === TAKE_HOME_ID) {
		return (
			<div className="contact-main-page py-8 overflow-auto">
				<div className="container">
					<div className="foot-links d-flex justify-content-center flex-wrap align-items-start mb-lg-4" style={{ gap: "1em 1.4em" }}>
					<Link to="/">HOME</Link>
					<Link to="/aboutUs">ABOUT US</Link>
					<Link to="/onBoarding">ON BOARDING</Link>
					</div>
					<div className="row">
					<div className="col-lg-6 col-md-12 order-1 order-lg-2 pt-25">
						<div className="px-2 px-lg-5">
						<h3 className="contact-page-title">Contact Us</h3>
						<div style={{ borderRadius: "1rem", boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px -1px 8px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", }} className="contact-page-side-content" >
							<h6 className="contact-page-message mb-0 text-muted">We'd Love to Hear From You</h6>
							<div className="single-contact-block" style={{ textAlign: "justify" }}>
							<h4>
								<i className="bx bxs-map" /> Address
							</h4>
							<p>B-1/312, Labonya Apartment, Chittaranjan Park, Kalyani, Nadia, WB - 741235</p>
							</div>
							<div className="single-contact-block">
							<h4>
								<i className="bx bxs-phone-call" /> Phone
							</h4>
							<p>8420209696 / 9330241456</p>
							</div>
							<div className="single-contact-block d-flex justify-content-between">
							<div>
								<h4>
								<i className="bx bxs-envelope" /> Email
								</h4>
								<p>
								<a style={{ fontSize: "1.6rem", color: "#1f39ff" }} href="mailto:ask@takehome.live">
									ask@takehome.live
								</a>
								</p>
							</div>
							<div>
								<h4>
								<i className="bx bx-globe" /> Website
								</h4>
								<p style={{ fontSize: "1.6rem" }}>
								<a style={{ fontSize: "1.6rem", color: "#1f39ff" }} href="https://takehome.live">
									https://takehome.live
								</a>
								</p>
							</div>
							</div>
							<div>
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1836.5671159785556!2d88.42665376271327!3d22.982090937331908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f894cf7a21c85f%3A0x7bbe378844d724da!2sKalyani%20Chittaranjan%20Park!5e0!3m2!1sen!2sin!4v1653540588631!5m2!1sen!2sin" width={500} height={780} style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
							</div>
						</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-12 order-2 order-lg-1">
						<div className="contact-form-content pt-25 pe-0 pe-lg-4">
						<h3 className="contact-page-title">Tell Us Your Message</h3>
						<div className="contact-form">
							<form id="contact-form" action="http://demo.hasthemes.com/limupa-v3/limupa/mail.php" method="post">
							<div className="form-group">
								<label>
								Your Name <span className="required">*</span>
								</label>
								<input type="text" name="customerName" id="customername" />
							</div>
							<div className="form-group">
								<label>
								Your Email <span className="required">*</span>
								</label>
								<input type="email" name="customerEmail" id="customerEmail" />
							</div>
							<div className="form-group">
								<label>Subject</label>
								<input type="text" name="contactSubject" id="contactSubject" />
							</div>
							<div className="form-group">
								<label>Your Message</label>
								<textarea name="contactMessage" id="contactMessage" defaultValue={""} />
							</div>
							<div className="form-group">
								<button type="submit" value="submit" id="submit" className="li-btn-3 d-block ms-auto ms-lg-0" name="submit">
								send
								</button>
							</div>
							</form>
						</div>
						<p className="form-messege" />
						</div>
					</div>
					{/* <div class="col-12 order-4">
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1836.5671159785556!2d88.42665376271327!3d22.982090937331908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f894cf7a21c85f%3A0x7bbe378844d724da!2sKalyani%20Chittaranjan%20Park!5e0!3m2!1sen!2sin!4v1653540588631!5m2!1sen!2sin" width="500" height="780" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
						</div> */}
					</div>
				</div>
			</div>
		)
	} else if (compCode === ePharmaId) {
		return (
			<div className="contact-main-page mt-45 mt-xs-0">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12 order-1 order-lg-2">
							<div className="contact-page-side-content px-4 px-lg-5">
								<h3 className="contact-page-title">Contact Us</h3>
								<h6 className="contact-page-message mb-0 text-muted">
									We'd Love to Hear From You
								</h6>
								<div className="single-contact-block" style={{textAlign: 'justify'}}>
									<h4><i className='bx bxs-map'></i> Address</h4>
									<span>ADDRESS 1 :</span>
									<p>
										203, Webel IT Park, DH Block(Newtown), Action Area I, Newtown,   North 24 Pgs.700156
									</p>
									<span>ADDRESS 2 :</span>
									<p> 304, Webel IT park, Nuldubi, Malda,732141</p>
								</div>
								<div className="single-contact-block">
									<h4><i className="fa fa-phone"></i> Phone</h4>
									<p>9046032100</p>
								</div>
								<div className="single-contact-block">
									<h4><i className="fa fa-phone"></i> Helpline</h4>
									<p>9046032102 / 9046032111</p>
								</div>
								<div className="single-contact-block">
									<h4><i className="fa fa-phone"></i> Email</h4>
									<p style={{fontSize: '1.6rem'}}>info@epharma.live</p>
								</div>
								<div className="single-contact-block last-child">
									<h4><i className="fa fa-envelope-o"></i> Website</h4>
									<p style={{fontSize: '1.6rem'}}>www.epharma.live</p>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-12 order-2 order-lg-1">
							<div className="contact-form-content pt-25 pe-0 pe-lg-4">
								<h3 className="contact-page-title">Tell Us Your Message</h3>
								<div className="contact-form">
									<form id="contact-form">
										<div className="form-group">
											<label>Your Name <span className="required">*</span></label>
											<input type="text" name="customerName" id="customername" required=""/>
										</div>
										<div className="form-group">
											<label>Your Email <span className="required">*</span></label>
											<input type="email" name="customerEmail" id="customerEmail" required=""/>
										</div>
										<div className="form-group">
											<label>Subject</label>
											<input type="text" name="contactSubject" id="contactSubject"/>
										</div>
										<div className="form-group">
											<label>Your Message</label>
											<textarea name="contactMessage" id="contactMessage"></textarea>
										</div>
										<div className="form-group">
											<button type="submit" value="submit" id="submit" className="li-btn-3 d-block ms-auto ms-lg-0" name="submit">send</button>
										</div>
									</form>
								</div>
								<p className="form-messege"></p>
							</div>
						</div>
					</div>
				</div>
				<div className="container mb-60">
					{/*<div id="google-map">*/}
					<div>
						<iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34390.801115427435!2d88.1689006470963!3d25.037885822778865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fafd076195e6e5%3A0xa69b4c3d2cb2783a!2sWebel%20IT%20Park!5e0!3m2!1sen!2sin!4v1639998496082!5m2!1sen!2sin" width="600" height="450" style={{border: '0'}} allowFullScreen="" loading="lazy"></iframe>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className="contact-main-page mt-45 mt-xs-0">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12 order-1 order-lg-2">
							<div className="contact-page-side-content px-4 px-lg-5">
								<h3 className="contact-page-title">Contact Us</h3>
								<h6 className="contact-page-message mb-0 text-muted">
									We'd Love to Hear From You
								</h6>
								<div className="single-contact-block" style={{textAlign: 'justify'}}>
									<h4><i className='bx bxs-map'></i> Address</h4>
									<span>ADDRESS 1 :</span>
									<p>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry
									</p>
									<span>ADDRESS 2 :</span>
									<p>  Lorem Ipsum has been the industry's standard dummy text</p>
								</div>
								<div className="single-contact-block">
									<h4><i className="fa fa-phone"></i> Phone</h4>
									<p>2342342342</p>
								</div>
								<div className="single-contact-block">
									<h4><i className="fa fa-phone"></i> Helpline</h4>
									<p>9046035322 / 9046030000</p>
								</div>
								<div className="single-contact-block">
									<h4><i className="fa fa-phone"></i> Email</h4>
									<p style={{fontSize: '1.6rem'}}>info@XYZ.live</p>
								</div>
								<div className="single-contact-block last-child">
									<h4><i className="fa fa-envelope-o"></i> Website</h4>
									<p style={{fontSize: '1.6rem'}}>www.XYZ.live</p>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-12 order-2 order-lg-1">
							<div className="contact-form-content pt-25 pe-0 pe-lg-4">
								<h3 className="contact-page-title">Tell Us Your Message</h3>
								<div className="contact-form">
									<form id="contact-form">
										<div className="form-group">
											<label>Your Name <span className="required">*</span></label>
											<input type="text" name="customerName" id="customername" required=""/>
										</div>
										<div className="form-group">
											<label>Your Email <span className="required">*</span></label>
											<input type="email" name="customerEmail" id="customerEmail" required=""/>
										</div>
										<div className="form-group">
											<label>Subject</label>
											<input type="text" name="contactSubject" id="contactSubject"/>
										</div>
										<div className="form-group">
											<label>Your Message</label>
											<textarea name="contactMessage" id="contactMessage"></textarea>
										</div>
										<div className="form-group">
											<button type="submit" value="submit" id="submit" className="li-btn-3 d-block ms-auto ms-lg-0" name="submit">send</button>
										</div>
									</form>
								</div>
								<p className="form-messege"></p>
							</div>
						</div>
					</div>
				</div>
				<div className="container mb-60">
					{/*<div id="google-map">*/}
					<div>
						<iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34390.801115427435!2d88.1689006470963!3d25.037885822778865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fafd076195e6e5%3A0xa69b4c3d2cb2783a!2sWebel%20IT%20Park!5e0!3m2!1sen!2sin!4v1639998496082!5m2!1sen!2sin" width="600" height="450" style={{border: '0'}} allowFullScreen="" loading="lazy"></iframe>
					</div>
				</div>
			</div>
		)
	}   
}

const mapStateToPropsTwo = (state) => {
	return { compCode: state.compCode };
}
  
export default connect(mapStateToPropsTwo, {breadCrumbAction})(ContactUs);