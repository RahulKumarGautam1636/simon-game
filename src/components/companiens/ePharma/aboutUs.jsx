import { useEffect } from 'react';
import { connect } from 'react-redux';
// import history from '../history.js';
// import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import useScript, { logOut, NologinWarning, Spinner, getFrom, BreadCrumb } from './utilities';
import { breadCrumbAction } from '../../../actions';
import { TAKE_HOME_ID, XYZ_ID } from '../../../constants';
import { Link } from 'react-router-dom';

const AboutUs = ({ breadCrumbAction, compCode }) => {

// 	Welcome to our website, "TakeHome"
// 
// 
// 
// 
// 
// 


	useEffect(() => {
		// window.render_counterUp();					// not working with jquery version 3.7.0 hence turning off.
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'About Us', link: '/aboutUs'}], activeLink: '/aboutUs'});
	},[breadCrumbAction])
	
	if (compCode === TAKE_HOME_ID) {
		return (
			<div className="container mt-4">
				<div className="pt-lg-4 foot-links justify-content-center d-flex flex-wrap align-items-start" style={{ gap: "1em 1.4em" }}>
					<Link to="/">HOME</Link>
					<Link to="/contactUs">CONTACT US</Link>
					<Link to="/onBoarding">ON BOARDING</Link>
				</div>
				<div className="row">
					<div className="col-12">
					<div className="contact-form-content pt-25 pe-0 pe-lg-4">
						<h3 className="contact-page-title">ABOUT US</h3>
						<h4 className="mb-25" style={{ color: "#1990ef" }}>Welcome to our website, "TakeHome"</h4>
						<div className="about-text-wrap">
						<p className="mb-4" style={{ color: "rgb(92, 92, 92)", fontSize: 15 }}>
							"TakeHome" is a professional service-oriented platform where we provide informative content and business to consumer services through online advertising pertaining to Agro & Grocery, Medicines, Healthcare & Surgical, Garments & Fashion Accesories, Rent and Re-sale of Property, Furniture, Vehicles, Electricals &amp; Electronic gadgets. We hope you like the content provided by us.
						</p>
						<p className="mb-4" style={{ color: "rgb(92, 92, 92)", fontSize: 15 }}>
							The domain name www.takehome.live, an internet based portal and TakeHome a mobile application, is operated by TakeHome Agro Private Limited, a company duly incorporated under the provisions of the Companies Act, 2013 (hereinafter referred to as “TakeHome” or “We” or “Our” or “Us” or “Company”) having registered office at Plot No. B-1/312, Labonya Apartment, Ground floor, Chittaranjan Park, Kalyani-741235, Nadia, West Bengal, India, with GSTIN 19AAKCT4207D1ZF and PAN AAKCT4207D. The domain name and the mobile application are collectively referred to as the "TakeHome Marketplace".
						</p>
						<p className="mb-4" style={{ color: "rgb(92, 92, 92)", fontSize: 15 }}>
							Aim of "TakeHome": "TakeHome", wants its viewers to enhance their e-commerce skills with the help of its contents.
						</p>
						<p className="mb-4" style={{ color: "rgb(92, 92, 92)", fontSize: 15 }}>
							We shall continue to provide helpful content to our viewers like we do. We are working to turn our passion of "TakeHome" into a bustling online 'bazaar.
						</p>
						<p className="mb-4" style={{ color: "rgb(92, 92, 92)", fontSize: 15 }}>
							For any queries, feedback, further information, or assistance regarding our website, please do not hesitate to contact us through email at
							&nbsp;<a className="text-blue-500 fw-bold" href="mailto:ask@takehome.live">
							ask@takehome.live
							</a>
						</p>
						<h4 className="mt-25 mb-4 text-end fw-bold" style={{ color: "#1990ef" }}>Thank you for Visiting us!</h4>
						</div>
					</div>
					</div>
				</div>
			</div>
		);
	} else if (compCode === XYZ_ID) {
		return (<div className="container"><h1>Coming soon..</h1></div>);
	} else {
		return (
			<>
				<div className="about-us-wrapper pt-20 pb-30">
					<div className="container">
						<div className="row">
							<div className="col-xl-6 order-last order-xl-first">
								<div className="about-text-wrap">
									<p style={{textAlign: 'justify', color: '#5c5c5c', fontSize: '14px'}}> Edifice Pharma Solutions Private Limited is a company that involves in retail franchise medicine outlet with OPD support. Edifice Pharma Solutions Private Limited promoting its businesses under brand of     “E PHARMA”. E PHARMA is one of the most innovative concepts that have the potential to transform the retail medicine sector. The E PHARMA organization has extensive experience in the medical profession. E PHARMA is the first and only company in North Bengal to begin bringing in newcomers to the world of professional, authentic, ethical, and social business practices. </p>
									<p style={{textAlign: 'justify', color: '#5c5c5c', fontSize: '14px'}}> E PHARMA had begun operations in North Bengal's Malda, Uttar Dinajpur, and Dakhshin Dinajpur districts with the support of local business houses. Later on E PHARMA extended their franchise stores to all over West Bengal. </p>
									<p style={{textAlign: 'justify', color: '#5c5c5c', fontSize: '14px'}}> E PHARMA's goal is to ensure that all types of medicines are available at the patient's doorstep in less time than it takes to deliver a pizza, while also providing the consumer with the certainty that they will receive the maximum discount possible (up to 50% depend on the medicine). Assuring a significant profit (up to 20%, depend on the product) to the franchise and assuring that no prescriptions will be returned and that no medicine will expire are two important goals.</p>
								</div>
							</div>
							<div className="col-xl-6 mb-3 mb-xl-0">
								<img className="img-full" src="/assets/img/ePharma/bg-banner/10.jpg" alt="About Us"/>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<div className="about-text-wrap">
									<p style={{textAlign: 'justify', color: '#5c5c5c', fontSize: '14px'}}> In today's pharma sector, the disparity between the product's production cost and its manufacturer's recommended retail price (MRP) is too large, often reaching 40 to 50 times the product's MRP. The primary reason for this is a supply chain management gap between the manufacturing facility and the retail customer. Customers in this chain include marketing team members, hospitals, corporations, doctors, and medical agents, among others. This entire supply chain operates in an ad hoc and disorganized manner, resulting in a rise in product expiration resulting in increase in MRP.</p>
									<p style={{textAlign: 'justify', color: '#5c5c5c', fontSize: '14px'}}> In the recent decade, India produced a large number of doctors, yet OPD services did not expand in a systematic manner. Semi-urban, district, and subdivision areas suffer from a scarcity of doctors, despite the fact that the majority of patients come from these areas. Many doctors may not have enough patients, and many patients do not have access to doctors in their own communities, a situation exacerbated by the lack of communication and infrastructure between doctors and patients.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div className="counterup-area">
					<div className="container-fluid">
						<div className="row no-gutters">
							<div className="col-lg-3 col-md-6 px-0">
								<div className="limupa-counter white-smoke-bg">
									<div className="container">
										<div className="counter-img">
											<img src="/assets/img/ePharma/about-us/icon/1.png" alt="counter"/>
										</div>
										<div className="counter-info">
											<div className="counter-number">
												<h3 className="counter">10000</h3>
											</div>
											<div className="counter-text">
												<span>HAPPY CUSTOMERS</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 px-0">
								<div className="limupa-counter gray-bg">
									<div className="counter-img">
										<img src="/assets/img/ePharma/about-us/icon/4.png" alt="counter"/>
									</div>
									<div className="counter-info">
										<div className="counter-number">
											<h3 className="counter">500000</h3>
										</div>
										<div className="counter-text">
											<span>AVAILABLE MEDICINES</span>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 px-0">
								<div className="limupa-counter white-smoke-bg">
									<div className="counter-img">
										<img src="/assets/img/ePharma/about-us/icon/3.png" alt="counter"/>
									</div>
									<div className="counter-info">
										<div className="counter-number">
											<h3 className="counter">689</h3>
										</div>
										<div className="counter-text">
											<span>OUR BRANCHES</span>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 px-0">
								<div className="limupa-counter gray-bg">
									<div className="counter-img">
										<img src="/assets/img/ePharma/about-us/icon/2.png" alt="counter"/>
									</div>
									<div className="counter-info">
										<div className="counter-number">
											<h3 className="counter">784</h3>
										</div>
										<div className="counter-text">
											<span>AWARDS WINNED</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}



}

const mapStateToProps = (state) => {
  return { compCode: state.compCode };
}

export default connect(mapStateToProps, {breadCrumbAction})(AboutUs);
