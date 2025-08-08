import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import history from '../history.js';
// import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import { logOut, NologinWarning, Spinner, getFrom, BreadCrumb } from './utilities';
import { breadCrumbAction } from '../../../actions';
import { TAKE_HOME_ID, XYZ_ID } from '../../../constants';
import { Link } from 'react-router-dom';

const Franchisee = ({ breadCrumbAction, compCode }) => {
	
	const [activeTab, setActiveTab] = useState('NORTH_24_PARAGANAS');
  
	useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Franchisee', link: '/franchisee'}], activeLink: '/franchisee'});
	},[breadCrumbAction])

	if (compCode === XYZ_ID) {
		return (
			<div className="container"><h1>Coming soon..</h1></div>
		)
	} else if (compCode === TAKE_HOME_ID) {
		return (
			<div id="franchisee-container" style={{ background: "#f7f7f7" }} className="about-us-wrapper pt-10 pb-30 overflow-auto">
				<div className="container">
					<div className="pb-4 pb-lg-0 pt-lg-4 foot-links justify-content-center d-flex flex-wrap align-items-start" style={{ gap: "1em 1.4em" }}>
					<Link to="/">HOME</Link>
					<Link to="/contactUs">CONTACT US</Link>
					<Link to="/aboutUs">ABOUT US</Link>
					</div>
					<div className="row mb-5 g-5">
					<div className="col-lg-6">
						<div className="about-text-wrap px-3">
						<h2 className="mt-3 mb-25" style={{ borderBottom: "3px solid gray" }}>
							<span>ON BOARDING</span>
						</h2>
						<h2 className="my-3">
							<span>If Service not Available in your Area of "TakeHome"</span>
						</h2>
						<h4 className="mb-25 fw-bold fs-3" style={{ color: "#1990ef" }}>
							Become A "TakeHome or TH - Buddy" (A Division of "TakeHome") and serve Your Locality.
						</h4>
						<div className="about-text-wrap">
							<h2>
							<span>Why TakeHome?</span>
							</h2>
							<p>Relationship with one of the fastest growing and reputed Service Oriented brands in India "TakeHome".</p>
							<ol className="list-group">
							<li className="list-group-item">1. 100% Genuine Listings Guaranteed.</li>
							<li className="list-group-item">2. Marketing support.</li>
							<li className="list-group-item">3. Access to knowledge repository providing useful information about Rents and Resales of Property, Furniture, Vehicle, Electronics and Electricals Gadgets.</li>
							<li className="list-group-item">4. Technology Support - to manage your business operations, customers training etc.</li>
							</ol>
						</div>
						<div className="about-text-wrap mt-25">
							<h2>
							<span>Figure Out your Capacity</span>
							</h2>
							<p>(Calculate how much you can earn monthly)</p>
							<ol className="list-group">
							<li className="list-group-item">1. Total No of Users in your business area</li>
							<li className="list-group-item">2. Expected Number of Users - as your customers within 6 months</li>
							<li className="list-group-item">3. Expected Number of Users - as your customers within 12 months</li>
							</ol>
						</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="about-text-wrap px-3">
						<h2 className="mt-3 mb-25 text-end" style={{ borderBottom: "3px solid gray" }}>
							<span>GET ON BOARDING</span>
						</h2>
						<h4 className="mb-4 fw-bold fs-3 text-lg-end">Interested in ON BOARDING ? Fill up the form below.</h4>
						<div className="contact-form-content" style={{ padding: "1.5em", background: "rgb(226, 242, 255)", borderRadius: "0.5em", boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px -1px 8px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", }} >
							<div className="contact-form">
							<form id="contact-form" className="d-lg-grid" style={{ gridTemplateColumns: "1fr 1fr", columnGap: "1em" }}>
								<div className="form-group">
								<label>
									Your Name <span className="required">*</span>
								</label>
								<input type="text" name="customerName" id="customername" />
								</div>
								<div className="form-group">
								<label>Phone Number</label>
								<input type="text" name="contactSubject" id="contactSubject" />
								</div>
								<div className="form-group">
								<label>
									Your Email <span className="required">*</span>
								</label>
								<input type="email" name="customerEmail" id="customerEmail" />
								</div>
								<div className="form-group">
								<label>Your Place / City</label>
								<input type="text" name="customerEmail" id="customerEmail" />
								</div>
								<div className="form-group">
								<label>Your Disctrict</label>
								<input type="text" name="customerEmail" id="customerEmail" />
								</div>
								<div className="form-group">
								<label>Your State</label>
								<input type="text" name="customerEmail" id="customerEmail" />
								</div>
								<div className="form-group">
								<label>Your Pincode</label>
								<input type="text" name="customerEmail" id="customerEmail" />
								</div>
								<div className="form-group">
								<label>No of Users in your business area</label>
								<input type="text" name="customerEmail" id="customerEmail" />
								</div>
								<div className="form-group">
								<label className="">Expected Number of Customers in 6 months</label>
								<input type="text" name="customerEmail" id="customerEmail" />
								</div>
								<div className="form-group">
								<label>Expected Number of Customers in 12 months</label>
								<input type="text" name="customerEmail" id="customerEmail" />
								</div>
								<div className="form-group w-100" style={{gridColumnStart: 1, gridColumnEnd: -1}}>
								<label>Your Message</label>
								<textarea name="contactMessage" id="contactMessage" placeholder="Your Message" defaultValue={""} rows={2} />
								</div>
							</form>
							<div className="d-flex flxe-wrap">
								<h4 className="text-primary mb-0 fw-semibold fs-4 text-lg-end lh-base">
								For Queries : <span style={{ color: "#1e73fa" }}>onboarding@takehome.live</span>
								</h4>
								<button type="submit" value="submit" id="submit" className="li-btn-3 d-block ms-auto" name="submit">
								send
								</button>
							</div>
							</div>
							<p className="form-messege" />
						</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div id="franchisee-container" className="about-us-wrapper pt-10 pb-30">
			<div className="container">
				<div className="row mb-5">
					<div className="col-12">
						<div className="about-text-wrap">
							<h2><span>Franchisee</span></h2>
							<p> TakeHome provides local business houses with franchise opportunities in suburban, district, subdivision, and rural areas. TakeHome operates under “franchisee owned and company operated” model; TakeHome is responsible for all parts of the company's operations in order to satisfy the consumers, TakeHome supports in establishment of outlet to sales and promotion, which support includes interior and exterior design, infrastructure, furniture, license, stock medicine, hiring staff and management, sales, and operations. We also provide training and support to franchisees. </p>
							<p> TakeHome delivers outpatient department (OPD) services in conjunction with franchise medicine stores. TakeHome is having in-house doctors who will be available to visit OPDs as needed. Patients in their immediate vicinity can arrange appointments with doctors using our App or website and come to them. </p>
						</div>
					</div>
				</div>
				<div className="row mb-25">
					<div className="col-12">
						<div className="about-text-wrap">
							<h2><span>Why TakeHome?</span></h2>
							<ol className="list-group">
								<li className="list-group-item">1. Assuring you license and legalities without any kind of hard work of franchisee. </li>
								<li className="list-group-item">2. Assuring you a margin of profit up to 20% of sales</li>
								<li className="list-group-item">3. Providing discount to customers up to 50% on an average discount of 22-25%.</li>
								<li className="list-group-item">4. Providing all kind of marketing to promotion support.</li>
								<li className="list-group-item">5. Taking full responsibility of delivery medicine to store to customer.</li>
								<li className="list-group-item">6. 100% responsibility of expiry of medicine to TakeHome.</li>
								<li className="list-group-item">7. 100% computerized authenticated bill to store and customer.</li>
								<li className="list-group-item">8. 100% responsibility of maintaining GST and taxation to TakeHome.</li>
								<li className="list-group-item">9. Secure investment with 0 headache business policy.</li>
								<li className="list-group-item">10. TakeHome making you businessman not a sales agent, as a franchisee you don’t need to sit in the outlet to run the business on daily basis. Still have many more reasons that may give you confidence to join us as franchisee.</li>
							</ol>
						</div>
					</div>
				</div>
				<div className="row mb-5">
					<div className="col-12">
						<div className="about-text-wrap">
							<h2><span>TakeHome business policy and procedure: </span></h2>
							<p>TakeHome Solutions Private Limited offering franchise business model on the brand name of TakeHome. Where franchisee can setup TakeHome retail medicine store along with OPD and lab services. TakeHome franchise retail drug stores offers a discount of up to 50% to the customer. If customers order medicine online through TakeHome portal or mobile application, it will be delivered to customer’s home within 30 minutes. TakeHome supports to setup the outlet from interior to exterior, furniture to equipment, trade license, GST, drug license, marketing to delivery medicine, maintaining the drug stock in the store and support to maintain GST also. Business model is franchisee owned company operated model.</p>
							<p>
								The entire operation will be run by the management of the company, no need for the owner to be worried. TakeHome is providing franchise all over West Bengal only at present. Any business man or any other professional can apply for it.
								To take Franchise, you need a space of minimum 120 square feet (rented also applicable) and investment to establish the shop. TakeHome is Startup India approved company, where a loan of up to 5 lakh rupees can be obtained from PNB if you apply for the TakeHome franchise (loan approval depend on candidates CIBIL score).
							</p>
							<p>
								Franchise owner will get 15 to 20% profit on every sale. The TakeHome will provide franchise only at those places where there will be possibility of Rs. 25 to 30 thousand medicine sales every day. Company will provide TakeHome franchise after market survey. The owner does not have to worry about any management or stock maintenance. With an TakeHome franchise, the owner has no responsibility for medicine expiration. The company will manage everything. If you have suitable shop premises and capacity to invest and intention to run an automated medicine business then you can apply for TakeHome franchise.
								There are two models of franchise available:
							</p>
							<h4 className="sm font-weight-light"><span>Model 1: </span></h4>
							<p>Space: Minimum of 120 square feet room with brick wall and RCC roof. You can arrange the interior of the room yourself, you will get design support from the company.</p>
							<p>License: Rs. 50,000</p>
							<p>Pharmacist: Rs.7000/month</p>
							<p>Software: Rs.15000 once</p>
							<p>Medicines: Rs.500,000 (minimum).</p>
							<p>Getting interior arrangement, trade license, GST, staff hire or any other necessary support you may avail from TakeHome on actual cost. </p>

							<h4 className="sm font-weight-light"><span>Model 2: </span></h4>
							<p>Space: Minimum of 150 square feet room with brick wall and RCC roof. You can arrange the interior of the room yourself, you will get design support from the company.</p>
							<p>License: Rs. 50,000</p>
							<p>Pharmacist: Rs.7000/month</p>
							<p>Software: Rs.15000 once</p>
							<p>Medicines: Rs.700,000 (minimum).</p>
							<p>Getting interior arrangement, trade license, GST, staff hire or any other necessary support you may avail from TakeHome on actual cost.</p>
						</div>
					</div>
				</div>
				<div className="row mb-5">
					<div className="col-12">
						<div className="about-text-wrap">
							<p>
								For model-2, if company takes responsibility from interior to exterior, license and including everything then the budget will be approximately 14 lakhs. There are no hidden costs.
								Franchise fee: for all model franchise fee will be Rs. 100,000 (one lac).
								Approximate budget is given below. It may vary depend on the room and size of the room.
							</p>
							<p>Medicine business in coming days will be entirely online and dependent on fastest delivery. Both of which TakeHome gives you at TakeHome store. </p>
							<p>If you want to start OPD clinic then you may get support from TakeHome, we are having inhouse doctors from department of general physician, gynecology, pediatrician,  appoint a doctor, TakeHome will provide you doctor's support for opd service. Patient will visit your opd with doctor appointment online. You will get full support from TakeHome.</p>
							<p>All business billing, stock everything will be online so everything will be at your fingertips. You don't have to run the business by yourself. Company system will manage your business. Your existing business or profession will not be affected in any way by associating with E PHRMA. If you think this business is suitable for you, you can apply here online. To apply online please click the link <a className="text-primary" href='#'>NO LINK</a></p>
						</div>
					</div>
				</div>
				<div className="row mb-5">
					<div className="col-12">
						<div className="about-text-wrap" style={{overflow: 'auto'}}>
							<table className="table table-bordered" style={{minWidth: '26rem', fontSize: '1em'}}>
								<thead>
									<tr>
										<th scope="col"></th>
										<th scope="col">Module</th>
										<th scope="col">Items</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row" rowSpan="12">1</th>
										<td rowSpan="12">Documentation and licensing </td>
										<td>market survey report</td>
										<td rowSpan="12">250,000-260,000</td>
									</tr>
									<tr>
										<td>document verification </td>
									</tr>
									<tr>
										<td>agreement and legal </td>
									</tr>
									<tr>
										<td>franchisee fee </td>
									</tr>
									<tr>
										<td>Trade license</td>
									</tr>
									<tr>
										<td>MSME </td>
									</tr>
									<tr>
										<td>GST</td>
									</tr>
									<tr>
										<td>PPR</td>
									</tr>
									<tr>
										<td>pharmacist charge for one year 7000/m</td>
									</tr>
									<tr>
										<td>drug license and others documentation</td>
									</tr>
									<tr>
										<td>staff training and hiring </td>
									</tr>
									<tr>
										<td>interior design and measurement </td>
									</tr>

									<tr>
										<th scope="row" rowSpan="7">2</th>
										<td rowSpan="7">interior, floor, wall and roofs</td>
										<td>tiles</td>
										<td rowSpan="7">160,000-170,000</td>
									</tr>
									<tr>
										<td>false ceiling</td>
									</tr>
									<tr>
										<td>wall panel</td>
									</tr>
									<tr>
										<td>wall adjustable channel</td>
									</tr>
									<tr>
										<td>wall adjustable angle</td>
									</tr>
									<tr>
										<td>ACP sign board and exterior</td>
									</tr>
									<tr>
										<td>transportation of adjustments</td>
									</tr>

									<tr>
										<th scope="row" rowSpan="5">3</th>
										<td rowSpan="5">furniture</td>
										<td>drawer desk</td>
										<td rowSpan="5">140,000-150,000</td>
									</tr>
									<tr>
										<td>front desk</td>
									</tr>
									<tr>
										<td>front desk sides</td>
									</tr>
									<tr>
										<td>transportation of furniture</td>
									</tr>
									<tr>
										<td>high tools</td>
									</tr>

									<tr>
										<th scope="row" rowSpan="3">4</th>
										<td rowSpan="3">glass work</td>
										<td>fixed glass</td>
										<td rowSpan="3">40,000-45,000</td>
									</tr>
									<tr>
										<td>glass door</td>
									</tr>
									<tr>
										<td>shelf glass</td>
									</tr>

									<tr>
										<th scope="row" rowSpan="10">5</th>
										<td rowSpan="10">electrical and appliances</td>
										<td>light </td>
										<td rowSpan="10">100,000-110,000</td>
									</tr>
									<tr>
										<td>wiring &amp; others</td>
									</tr>
									<tr>
										<td>chain light</td>
									</tr>
									<tr>
										<td>fridge</td>
									</tr>
									<tr>
										<td>Air conditioner</td>
									</tr>
									<tr>
										<td>AC installation and angle and others</td>
									</tr>
									<tr>
										<td>CCTV camera</td>
									</tr>
									<tr>
										<td>installation</td>
									</tr>
									<tr>
										<td>biometrics</td>
									</tr>
									<tr>
										<td>inverter set</td>
									</tr>

									<tr>
										<th scope="row" rowSpan="4">6</th>
										<td rowSpan="4">Billing system</td>
										<td>billing machine (touch)</td>
										<td rowSpan="4">70,000-75,000</td>
									</tr>
									<tr>
										<td>printer</td>
									</tr>
									<tr>
										<td>scanner</td>
									</tr>
									<tr>
										<td>cash drawer</td>
									</tr>

									<tr>
										<th scope="row" rowSpan="5">7</th>
										<td rowSpan="5">network and mobile</td>
										<td>internet connection/ mobile connection</td>
										<td rowSpan="5">12,000-15,000</td>
									</tr>
									<tr>
										<td>network switch</td>
									</tr>
									<tr>
										<td>router</td>
									</tr>
									<tr>
										<td>smart mobile phone</td>
									</tr>
									<tr>
										<td>junction box metal </td>
									</tr>

									<tr>
										<th scope="row" rowSpan="4">8</th>
										<td rowSpan="4">stationaries and others</td>
										<td>pen, pencil, stationaries</td>
										<td rowSpan="4">1000-1500</td>
									</tr>
									<tr>
										<td>calculator</td>
									</tr>
									<tr>
										<td>printing paper</td>
									</tr>
								</tbody>
							</table>
							<p>To apply online please click the link below <Link className="text-primary" href="#">NO LINK</Link> </p>
						</div>
					</div>
				</div>
				<div className="row mb-5">
					<div className="col-12">
						<div className="about-text-wrap">
							<h2><span>District wise view</span></h2>
							<div className="input-group mb-3">
								{/* <select className="custom-select" id="select_district" onChange="toggleTabs()"> */}
								<select className="custom-select" id="select_district" onChange={(e) => setActiveTab(e.target.value)} style={{height: '4rem'}}>
									<option value="NORTH_24_PARAGANAS">NORTH 24 PARAGANAS</option>
									<option value="SOUTH_24_PARAGANAS">SOUTH 24 PARAGANAS</option>
									<option value="BANKURA">BANKURA</option>
									<option value="PURBA_BARDHAMAN">PURBA BARDHAMAN</option>
									<option value="BIRBHUM">BIRBHUM</option>
									<option value="COOCHBEHAR">COOCHBEHAR</option>
									<option value="DARJEELING">DARJEELING</option>
									<option value="DINAJPUR_DAKSHIN">DINAJPUR DAKSHIN</option>
									<option value="DINAJPUR_UTTAR">DINAJPUR UTTAR</option>
									<option value="HOOGHLY">HOOGHLY</option>
									<option value="HOWRAH">HOWRAH</option>
									<option value="JALPAIGURI">JALPAIGURI</option>
									<option value="MALDAH">MALDAH</option>
									<option value="MEDINIPUR_EAST">MEDINIPUR EAST</option>
									<option value="MEDINIPUR_WEST">MEDINIPUR WEST</option>
									<option value="MURSHIDABAD">MURSHIDABAD</option>
									<option value="NADIA">NADIA</option>
									<option value="PURULIA">PURULIA</option>
									<option value="ALIPURDUAR">ALIPURDUAR</option>
									<option value="KALIMPONG">KALIMPONG</option>
									<option value="JHARGRAM">JHARGRAM</option>
									<option value="PASCHIM_BARDHAMAN">PASCHIM BARDHAMAN</option>
								</select>
								<div className="input-group-append">
									<label className="input-group-text" style={{fontSize: '2rem'}} htmlFor="inputGroupSelect02">Options</label>
								</div>
							</div>
							<div className="tab-content">
								<div id="NORTH_24_PARAGANAS-pane" className={`tab-pane fade ${activeTab === 'NORTH_24_PARAGANAS' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-1">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="22">1</td>
												<td rowSpan="22">NORTH 24 PARAGANAS</td>
												<td rowSpan="22">303</td>
												<td>1</td>
												<td>2322</td>
												<td>Amdanga</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2328</td>
												<td>Baduria</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2316</td>
												<td>Bagda</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2325</td>
												<td>Barasat - I</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2326</td>
												<td>Barasat - II</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2323</td>
												<td>Barrackpur - I</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2324</td>
												<td>Barrackpur - II</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2329</td>
												<td>Basirhat - I</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2330</td>
												<td>Basirhat - II</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2317</td>
												<td>Bongaon</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2327</td>
												<td>Deganga</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2318</td>
												<td>Gaighata</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2320</td>
												<td>Habra - I</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2321</td>
												<td>Habra - II</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2331</td>
												<td>Haroa</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2336</td>
												<td>Hasnabad</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2337</td>
												<td>Hingalganj</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2333</td>
												<td>Minakhan</td>
											</tr>
											<tr>
												<td>19</td>
												<td>2332</td>
												<td>Rajarhat</td>
											</tr>
											<tr>
												<td>20</td>
												<td>2334</td>
												<td>Sandeshkhali - I</td>
											</tr>
											<tr>
												<td>21</td>
												<td>2335</td>
												<td>Sandeshkhali - II</td>
											</tr>
											<tr>
												<td>22</td>
												<td>2319</td>
												<td>Swarupnagar</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="SOUTH_24_PARAGANAS-pane" className={`tab-pane fade ${activeTab === 'SOUTH_24_PARAGANAS' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-2">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="29">1</td>
												<td rowSpan="29">SOUTH 24 PARAGANAS</td>
												<td rowSpan="29">304</td>
												<td>1</td>
												<td>2422</td>
												<td>Baruipur</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2434</td>
												<td>Basanti</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2418</td>
												<td>Bhangar - I</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2419</td>
												<td>Bhangar - II</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2415</td>
												<td>Bishnupur - I</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2416</td>
												<td>Bishnupur - II</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2413</td>
												<td>Budge Budge - I</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2414</td>
												<td>Budge Budge - II</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2420</td>
												<td>Canning - I</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2421</td>
												<td>Canning - II</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2426</td>
												<td>Diamond Harbour - I</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2427</td>
												<td>Diamond Harbour - II</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2425</td>
												<td>Falta</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2435</td>
												<td>Gosaba</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2431</td>
												<td>Jaynagar - I</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2432</td>
												<td>Jaynagar - II</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2437</td>
												<td>Kakdwip</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2428</td>
												<td>Kulpi</td>
											</tr>
											<tr>
												<td>19</td>
												<td>2433</td>
												<td>Kultali</td>
											</tr>
											<tr>
												<td>20</td>
												<td>2424</td>
												<td>Magrahat - I</td>
											</tr>
											<tr>
												<td>21</td>
												<td>2423</td>
												<td>Magrahat - II</td>
											</tr>
											<tr>
												<td>22</td>
												<td>2429</td>
												<td>Mandirbazar</td>
											</tr>
											<tr>
												<td>23</td>
												<td>2430</td>
												<td>Mathurapur - I</td>
											</tr>
											<tr>
												<td>24</td>
												<td>2436</td>
												<td>Mathurapur - II</td>
											</tr>
											<tr>
												<td>25</td>
												<td>2439</td>
												<td>Namkhana</td>
											</tr>
											<tr>
												<td>26</td>
												<td>2440</td>
												<td>Patharpratima</td>
											</tr>
											<tr>
												<td>27</td>
												<td>2438</td>
												<td>Sagar</td>
											</tr>
											<tr>
												<td>28</td>
												<td>2417</td>
												<td>Sonarpur</td>
											</tr>
											<tr>
												<td>29</td>
												<td>2412</td>
												<td>Thakurpukur Mahestola</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="BANKURA-pane" className={`tab-pane fade ${activeTab === 'BANKURA' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="22">3</td>
												<td rowSpan="22">BANKURA</td>
												<td rowSpan="22">305</td>
												<td>1</td>
												<td>2361</td>
												<td>Bankura-1</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2362</td>
												<td>Bankura- II</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2363</td>
												<td>Barjora</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2359</td>
												<td>Chhatna</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2358</td>
												<td>Gangajalghati</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2374</td>
												<td>Hirbandh</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2360</td>
												<td>Indpur</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2366</td>
												<td>Indus</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2368</td>
												<td>Jaypur</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2373</td>
												<td>Khatra</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2367</td>
												<td>Kotulpur</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2357</td>
												<td>Mejhia</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2370</td>
												<td>Onda</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2365</td>
												<td>Patrasayer</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2376</td>
												<td>Raipur</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2375</td>
												<td>Ranibundh</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2356</td>
												<td>Saltora</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2377</td>
												<td>Sarenga</td>
											</tr>
											<tr>
												<td>19</td>
												<td>2372</td>
												<td>Simlapal</td>
											</tr>
											<tr>
												<td>20</td>
												<td>2364</td>
												<td>Sonamukhi</td>
											</tr>
											<tr>
												<td>21</td>
												<td>2371</td>
												<td>Taldangra</td>
											</tr>
											<tr>
												<td>22</td>
												<td>2369</td>
												<td>Vishnupur</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="PURBA_BARDHAMAN-pane" className={`tab-pane fade ${activeTab === 'PURBA_BARDHAMAN' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="23">4</td>
												<td rowSpan="23">PURBA BARDHAMAN</td>
												<td rowSpan="23">306</td>
												<td>1</td>
												<td>2277</td>
												<td>Ausgram - I</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2276</td>
												<td>Ausgram - II</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2286</td>
												<td>Bhatar</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2289</td>
												<td>Burdwan - I</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2290</td>
												<td>Burdwan - II</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2287</td>
												<td>Galsi - I</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2288</td>
												<td>Galsi - II</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2295</td>
												<td>Jamalpur</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2293</td>
												<td>Kalna - I</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2294</td>
												<td>Kalna - II</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2281</td>
												<td>Katwa - I</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2282</td>
												<td>Katwa - II</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2279</td>
												<td>Ketugram - I</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2280</td>
												<td>Ketugram - II</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2297</td>
												<td>Khandaghosh</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2278</td>
												<td>Mangolkote</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2285</td>
												<td>Manteswar</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2291</td>
												<td>Memari - I</td>
											</tr>
											<tr>
												<td>19</td>
												<td>2292</td>
												<td>Memari - II</td>
											</tr>
											<tr>
												<td>20</td>
												<td>2283</td>
												<td>Purbasthali - I</td>
											</tr>
											<tr>
												<td>21</td>
												<td>2284</td>
												<td>Purbasthali - II</td>
											</tr>
											<tr>
												<td>22</td>
												<td>2296</td>
												<td>Raina - I</td>
											</tr>
											<tr>
												<td>23</td>
												<td>2298</td>
												<td>Raina - II</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="BIRBHUM-pane" className={`tab-pane fade ${activeTab === 'BIRBHUM' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="19">5</td>
												<td rowSpan="19">BIRBHUM</td>
												<td rowSpan="19">307</td>
												<td>1</td>
												<td>2264</td>
												<td>Bolpur Sriniketan</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2266</td>
												<td>Dubrajpur</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2265</td>
												<td>Illambazar</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2267</td>
												<td>Khoyrasol</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2262</td>
												<td>Labpur</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2255</td>
												<td>Mayureswar - I</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2256</td>
												<td>Mayureswar - II</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2257</td>
												<td>Mohammad Bazar</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2249</td>
												<td>Murarai - I</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2250</td>
												<td>Murarai - II</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2251</td>
												<td>Nalhati - I</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2252</td>
												<td>Nalhati - II</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2263</td>
												<td>Nanoor</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2258</td>
												<td>Rajnagar</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2253</td>
												<td>Rampurhat - I</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2254</td>
												<td>Rampurhat - II</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2261</td>
												<td>Sainthia</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2259</td>
												<td>Suri - I</td>
											</tr>
											<tr>
												<td>19</td>
												<td>2260</td>
												<td>Suri - II</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="COOCHBEHAR-pane" className={`tab-pane fade ${activeTab === 'COOCHBEHAR' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="12">6</td>
												<td rowSpan="12">COOCHBEHAR</td>
												<td rowSpan="12">308</td>
												<td>1</td>
												<td>2183</td>
												<td>Cooch Behar - I</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2184</td>
												<td>Cooch Behar - II</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2187</td>
												<td>Dinhata - I</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2188</td>
												<td>Dinhata - II</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2179</td>
												<td>Haldibari</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2181</td>
												<td>Mathabhanga - I</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2182</td>
												<td>Mathabhanga - II</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2180</td>
												<td>Mekliganj</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2189</td>
												<td>Sitai</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2190</td>
												<td>Sitalkuchi</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2185</td>
												<td>Tufanganj - I</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2186</td>
												<td>Tufanganj - II</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="DARJEELING-pane" className={`tab-pane fade ${activeTab === 'DARJEELING' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="9">7</td>
												<td rowSpan="9">DARJEELING</td>
												<td rowSpan="9">309</td>
												<td>1</td>
												<td>2154</td>
												<td>Darjeeling Pulbazar</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2159</td>
												<td>Jorebunglow Sukiapokhri</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2165</td>
												<td>Kharibari</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2161</td>
												<td>Kurseong</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2162</td>
												<td>Matigara</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2160</td>
												<td>Mirik</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2163</td>
												<td>Naxalbari</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2164</td>
												<td>Phansidewa</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2155</td>
												<td>Rangli Rangliot</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="DINAJPUR_DAKSHIN-pane" className={`tab-pane fade ${activeTab === 'DINAJPUR_DAKSHIN' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="8">8</td>
												<td rowSpan="8">DINAJPUR DAKSHIN</td>
												<td rowSpan="8">310</td>
												<td>1</td>
												<td>2204</td>
												<td>Balurghat</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2206</td>
												<td>Bansihari</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2201</td>
												<td>Gangarampur</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2207</td>
												<td>Harirampur</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2203</td>
												<td>Hilli</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2202</td>
												<td>Kumarganj</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2200</td>
												<td>Kushmundi</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2205</td>
												<td>Tapan</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="DINAJPUR_UTTAR-pane" className={`tab-pane fade ${activeTab === 'DINAJPUR_UTTAR' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="9">9</td>
												<td rowSpan="9">DINAJPUR UTTAR</td>
												<td rowSpan="9">311</td>
												<td>1</td>
												<td>2191</td>
												<td>Chopra</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2193</td>
												<td>Goalpokhar - I</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2194</td>
												<td>Goalpokhar - II</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2197</td>
												<td>Hemtabad</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2192</td>
												<td>Islampur</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2199</td>
												<td>Itahar</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2198</td>
												<td>Kaliaganj</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2195</td>
												<td>Karandighi</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2196</td>
												<td>Raiganj</td>
											</tr>

										</tbody>
									</table>
								</div>
								<div id="HOOGHLY-pane" className={`tab-pane fade ${activeTab === 'HOOGHLY' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="18">10</td>
												<td rowSpan="18">HOOGHLY</td>
												<td rowSpan="18">312</td>
												<td>1</td>
												<td>2340</td>
												<td>Arambag</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2345</td>
												<td>Balagarh</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2351</td>
												<td>Chanditala - I</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2352</td>
												<td>Chanditala - II</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2346</td>
												<td>Chinsurah - Magra</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2343</td>
												<td>Dhaniakhali</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2338</td>
												<td>Goghat - I</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2339</td>
												<td>Goghat - II</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2348</td>
												<td>Haripal</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2353</td>
												<td>Jangipara</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2354</td>
												<td>Khanakul - I</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2355</td>
												<td>Khanakul - II</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2344</td>
												<td>Pandua</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2347</td>
												<td>Polba - Dadpur</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2341</td>
												<td>Pursura</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2350</td>
												<td>Serampur Uttarpara</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2349</td>
												<td>Singur</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2342</td>
												<td>Tarakeswar</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="HOWRAH-pane" className={`tab-pane fade ${activeTab === 'HOWRAH' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="14">11</td>
												<td rowSpan="14">HOWRAH</td>
												<td rowSpan="14">313</td>
												<td>1</td>
												<td>2400</td>
												<td>Amta - I</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2399</td>
												<td>Amta - II</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2408</td>
												<td>Bagnan - I</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2409</td>
												<td>Bagnan - II</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2403</td>
												<td>Bally Jagachha</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2402</td>
												<td>Domjur</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2401</td>
												<td>Jagatballavpur</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2405</td>
												<td>Panchla</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2404</td>
												<td>Sankrail</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2410</td>
												<td>Shyampur - I</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2411</td>
												<td>Shyampur - II</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2398</td>
												<td>Udaynarayanpur</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2407</td>
												<td>Uluberia - I</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2406</td>
												<td>Uluberia - II</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="JALPAIGURI-pane" className={`tab-pane fade ${activeTab === 'JALPAIGURI' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="7">12</td>
												<td rowSpan="7">JALPAIGURI</td>
												<td rowSpan="7">314</td>
												<td>1</td>
												<td>2176</td>
												<td>Dhupguri</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2178</td>
												<td>Jalpaiguri</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2167</td>
												<td>Mal</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2168</td>
												<td>Matiali</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2177</td>
												<td>Maynaguri</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2169</td>
												<td>Nagrakata</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2166</td>
												<td>Rajganj</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="MALDAH-pane" className={`tab-pane fade ${activeTab === 'MALDAH' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="15">13</td>
												<td rowSpan="15">MALDAH</td>
												<td rowSpan="15">316</td>
												<td>1</td>
												<td>2215</td>
												<td>Bamangola</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2210</td>
												<td>Chanchal - I</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2211</td>
												<td>Chanchal - II</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2218</td>
												<td>English Bazar</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2214</td>
												<td>Gazole</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2216</td>
												<td>Habibpur</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2208</td>
												<td>Harischandrapur - I</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2209</td>
												<td>Harischandrapur - II</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2220</td>
												<td>Kaliachak - I</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2221</td>
												<td>Kaliachak - II</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2222</td>
												<td>Kaliachak - III</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2217</td>
												<td>Maldah (Old</td></tr>
											<tr>
												<td>13</td>
												<td>2219</td>
												<td>Manikchak</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2212</td>
												<td>Ratua - I</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2213</td>
												<td>Ratua - II</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="MEDINIPUR_EAST-pane" className={`tab-pane fade ${activeTab === 'MEDINIPUR_EAST' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="25">14</td>
												<td rowSpan="25">MEDINIPUR EAST</td>
												<td rowSpan="25">317</td>
												<td>1</td>
												<td>2480</td>
												<td>Bhagawanpur - I</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2479</td>
												<td>Bhagawanpur - II</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2481</td>
												<td>Chandipur</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2488</td>
												<td>Contai - I</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2490</td>
												<td>Contai - III</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2489</td>
												<td>Deshopran</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2491</td>
												<td>Egra - I</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2492</td>
												<td>Egra - II</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2483</td>
												<td>Haldia</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2486</td>
												<td>Khejuri - I</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2487</td>
												<td>Khejuri - II</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2471</td>
												<td>Kolaghat</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2475</td>
												<td>Mahisadal</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2476</td>
												<td>Moyna</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2474</td>
												<td>Nanda Kumar</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2484</td>
												<td>Nandigram - I</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2485</td>
												<td>Nandigram - II</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2470</td>
												<td>Panskura</td>
											</tr>
											<tr>
												<td>19</td>
												<td>2477</td>
												<td>Potashpur - I</td>
											</tr>
											<tr>
												<td>20</td>
												<td>2478</td>
												<td>Potashpur - II</td>
											</tr>
											<tr>
												<td>21</td>
												<td>2493</td>
												<td>Ramnagar - I</td>
											</tr>
											<tr>
												<td>22</td>
												<td>2494</td>
												<td>Ramnagar - II</td>
											</tr>
											<tr>
												<td>23</td>
												<td>2473</td>
												<td>Sahid Matangini</td>
											</tr>
											<tr>
												<td>24</td>
												<td>2482</td>
												<td>Sutahata</td>
											</tr>
											<tr>
												<td>25</td>
												<td>2472</td>
												<td>Tamluk</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="MEDINIPUR_WEST-pane" className={`tab-pane fade ${activeTab === 'MEDINIPUR_WEST' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="21">15</td>
												<td rowSpan="21">MEDINIPUR WEST</td>
												<td rowSpan="21">318</td>
												<td>1</td>
												<td>2446</td>
												<td>Chandrakona - I</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2447</td>
												<td>Chandrakona - II</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2467</td>
												<td>Dantan - I</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2468</td>
												<td>Dantan - II</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2449</td>
												<td>Daspur - I</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2450</td>
												<td>Daspur - II</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2462</td>
												<td>Debra</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2444</td>
												<td>Garbeta - I</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2443</td>
												<td>Garbeta - II</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2445</td>
												<td>Garbeta - III</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2448</td>
												<td>Ghatal</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2466</td>
												<td>Keshiary</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2451</td>
												<td>Keshpur</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2460</td>
												<td>Kharagpur - I</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2461</td>
												<td>Kharagpur - II</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2453</td>
												<td>Midnapore</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2469</td>
												<td>Mohanpur</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2465</td>
												<td>Narayangarh</td>
											</tr>
											<tr>
												<td>19</td>
												<td>2463</td>
												<td>Pingla</td>
											</tr>
											<tr>
												<td>20</td>
												<td>2464</td>
												<td>Sabang</td>
											</tr>
											<tr>
												<td>21</td>
												<td>2452</td>
												<td>Salbani</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="MURSHIDABAD-pane" className={`tab-pane fade ${activeTab === 'MURSHIDABAD' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="26">16</td>
												<td rowSpan="26">MURSHIDABAD</td>
												<td rowSpan="26">319</td>
												<td>1</td>
												<td>2244</td>
												<td>Beldanga - I</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2245</td>
												<td>Beldanga - II</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2241</td>
												<td>Berhampore</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2231</td>
												<td>Bhagawangola - I</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2232</td>
												<td>Bhagawangola - II</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2247</td>
												<td>Bharatpur - I</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2246</td>
												<td>Bharatpur - II</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2248</td>
												<td>Burwan</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2235</td>
												<td>Domkal</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2223</td>
												<td>Farakka</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2242</td>
												<td>Hariharpara</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2234</td>
												<td>Jalangi</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2240</td>
												<td>Kandi</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2239</td>
												<td>Khargram</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2229</td>
												<td>Lalgola</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2237</td>
												<td>Murshidabad Jiaganj</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2238</td>
												<td>Nabagram</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2243</td>
												<td>Nawda</td>
											</tr>
											<tr>
												<td>19</td>
												<td>2227</td>
												<td>Raghunathganj - I</td>
											</tr>
											<tr>
												<td>20</td>
												<td>2228</td>
												<td>Raghunathganj - II</td>
											</tr>
											<tr>
												<td>21</td>
												<td>2236</td>
												<td>Raninagar - I</td>
											</tr>
											<tr>
												<td>22</td>
												<td>2233</td>
												<td>Raninagar - II</td>
											</tr>
											<tr>
												<td>23</td>
												<td>2230</td>
												<td>Sagardighi</td>
											</tr>
											<tr>
												<td>24</td>
												<td>2224</td>
												<td>Samserganj</td>
											</tr>
											<tr>
												<td>25</td>
												<td>2225</td>
												<td>Suti - I</td>
											</tr>
											<tr>
												<td>26</td>
												<td>2226</td>
												<td>Suti - II</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="NADIA-pane" className={`tab-pane fade ${activeTab === 'NADIA' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="17">17</td>
												<td rowSpan="17">NADIA</td>
												<td rowSpan="17">320</td>
												<td>1</td>
												<td>2314</td>
												<td>Chakdah</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2305</td>
												<td>Chapra</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2310</td>
												<td>Hanskhali</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2315</td>
												<td>Haringhata</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2303</td>
												<td>Kaliganj</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2299</td>
												<td>Karimpur - I</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2300</td>
												<td>Karimpur - II</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2309</td>
												<td>Krishnaganj</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2308</td>
												<td>Krishnagar - I</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2306</td>
												<td>Krishnagar - II</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2307</td>
												<td>Nabadwip</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2304</td>
												<td>Nakashipara</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2312</td>
												<td>Ranaghat - I</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2313</td>
												<td>Ranaghat - II</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2311</td>
												<td>Santipur</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2301</td>
												<td>Tehatta - I</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2302</td>
												<td>Tehatta - II</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="PURULIA-pane" className={`tab-pane fade ${activeTab === 'PURULIA' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="20">18</td>
												<td rowSpan="20">PURULIA</td>
												<td rowSpan="20">321</td>
												<td>1</td>
												<td>2389</td>
												<td>Arsha</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2392</td>
												<td>Bagmundi</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2393</td>
												<td>Balarampur</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2394</td>
												<td>Barabazar</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2397</td>
												<td>Bundwan</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2386</td>
												<td>Hura</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2378</td>
												<td>Jaipur</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2390</td>
												<td>Jhalda - I</td>
											</tr>
											<tr>
												<td>9</td>
												<td>2391</td>
												<td>Jhalda - II</td>
											</tr>
											<tr>
												<td>10</td>
												<td>2385</td>
												<td>Kashipur</td>
											</tr>
											<tr>
												<td>11</td>
												<td>2395</td>
												<td>Manbazar - I</td>
											</tr>
											<tr>
												<td>12</td>
												<td>2396</td>
												<td>Manbazar - II</td>
											</tr>
											<tr>
												<td>13</td>
												<td>2383</td>
												<td>Neturia</td>
											</tr>
											<tr>
												<td>14</td>
												<td>2380</td>
												<td>Para</td>
											</tr>
											<tr>
												<td>15</td>
												<td>2388</td>
												<td>Puncha</td>
											</tr>
											<tr>
												<td>16</td>
												<td>2387</td>
												<td>Purulia - I</td>
											</tr>
											<tr>
												<td>17</td>
												<td>2379</td>
												<td>Purulia - II</td>
											</tr>
											<tr>
												<td>18</td>
												<td>2382</td>
												<td>Raghunathpur - I</td>
											</tr>
											<tr>
												<td>19</td>
												<td>2381</td>
												<td>Raghunathpur - II</td>
											</tr>
											<tr>
												<td>20</td>
												<td>2384</td>
												<td>Santuri</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="ALIPURDUAR-pane" className={`tab-pane fade ${activeTab === 'ALIPURDUAR' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="6">19</td>
												<td rowSpan="6">ALIPURDUAR</td>
												<td rowSpan="6">664</td>
												<td>1</td>
												<td>2173</td>
												<td>Alipurduar - I</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2174</td>
												<td>Alipurduar - II</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2175</td>
												<td>Falakata</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2171</td>
												<td>Kalchini</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2172</td>
												<td>Kumargram</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2170</td>
												<td>Madarihat</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="KALIMPONG-pane" className={`tab-pane fade ${activeTab === 'KALIMPONG' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="3">20</td>
												<td rowSpan="3">KALIMPONG</td>
												<td rowSpan="3">702</td>
												<td>1</td>
												<td>2158</td>
												<td>Gorubathan</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2156</td>
												<td>Kalimpong -I</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2157</td>
												<td>Kalimpong - II</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="JHARGRAM-pane" className={`tab-pane fade ${activeTab === 'JHARGRAM' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="8">21</td>
												<td rowSpan="8">JHARGRAM</td>
												<td rowSpan="8">703</td>
												<td>1</td>
												<td>2442</td>
												<td>Binpur - I</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2441</td>
												<td>Binpur - II</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2457</td>
												<td>Gopiballavpur - I</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2456</td>
												<td>Gopiballavpur - II</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2455</td>
												<td>Jamboni</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2454</td>
												<td>Jhargram</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2458</td>
												<td>Nayagram</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2459</td>
												<td>Sankrail</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="PASCHIM_BARDHAMAN-pane" className={`tab-pane fade ${activeTab === 'PASCHIM_BARDHAMAN' ? 'show active' : ''}`} role="tabpanel" aria-labelledby="tabFade-3">
									<table className="table table-bordered" style={{minWidth: '26rem'}}>
										<thead>
											<tr>
												<th scope="col">Sl No.</th>
												<th scope="col">District Name</th>
												<th scope="col">District Code</th>
												<th scope="col">Sl No.</th>
												<th scope="col">Block Code</th>
												<th scope="col">Block Name</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td rowSpan="8">22</td>
												<td rowSpan="8">PASCHIM BARDHAMAN</td>
												<td rowSpan="8">704</td>
												<td>1</td>
												<td>2269</td>
												<td>Barabani</td>
											</tr>
											<tr>
												<td>2</td>
												<td>2274</td>
												<td>Faridpur Durgapur</td>
											</tr>
											<tr>
												<td>3</td>
												<td>2270</td>
												<td>Jamuria</td>
											</tr>
											<tr>
												<td>4</td>
												<td>2275</td>
												<td>Kanksa</td>
											</tr>
											<tr>
												<td>5</td>
												<td>2272</td>
												<td>Ondal</td>
											</tr>
											<tr>
												<td>6</td>
												<td>2273</td>
												<td>Pandabeswar</td>
											</tr>
											<tr>
												<td>7</td>
												<td>2271</td>
												<td>Raniganj</td>
											</tr>
											<tr>
												<td>8</td>
												<td>2268</td>
												<td>Salanpur</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
  return { compCode: state.compCode };
}

export default connect(mapStateToProps, {breadCrumbAction})(Franchisee);
