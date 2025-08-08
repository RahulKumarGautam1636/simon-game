import { useState } from "react";
import { DefaultAccordion, stringToast } from "../utilities";
import { Link } from "react-router-dom";
import { modalAction } from "../../../../actions";
import { connect } from "react-redux";

const HealthPakage = ({ modalAction }) => {

    const [accordKey_1, setAccordKey_1] = useState('accord_1-1');
    const accordData_1 = [
        { key: '1', heading: 'Is your Laboratory accredited?', content: 'Yes our laboratory is accredited by the NABL (National Accreditation Board of Testing and Calibration of Laboratories) India & College of American Pathologists (CAP). This accreditation process is carried out every 2 years for NABL & annually for CAP with periodic internal audits carried out twice in a year. All our aforementioned tests are accredited by NABL & CAP.' },
        { key: '2', heading: 'What are TruHealth Packages?', content: 'TruHealth is an expert and comprehensive inner health wellness by Bankura Seva Niketan. It helps you monitor and maintain your inner health parameters better, so that you are ready to achieve your dreams, always. Bankura Seva Niketan – Because Health is Everything.' },
        { key: '3', heading: 'What is a SMART report?', content: 'SMART report covers a comprehensive view of your lifestyle related diseases and risk analysis, health recommendations, reminders and recommended reflex tests. Get regular communications to monitor and maintain your inner health.' },
        { key: '4', heading: 'How long will it take for me to receive the reports?', content: 'Reports will be delivered on your registered email id with a TAT (Turnaround time) of 24 hours.' },
        { key: '5', heading: 'How can I download my test reports?', content: 'We will deliver reports on your email id, check the email received from Bankura Seva Niketan. You can also download it by signing in to your profile in our website or in TruHealth App' },
        { key: '6', heading: 'Which is the right TruHealth package for me?', content: 'You can select the best health package suited to you based on your gender, age and lifestyle.' },
        { key: '7', heading: 'Is home blood collection service free of charge?', content: 'Additional Home Visit and Safety charges will be applicable for all test and Health packages.' },
        { key: '8', heading: 'What is the timing for blood collection from home?', content: 'We collect samples from home between 7 AM to 11 PM for (Kolkata) and 7 AM to 9 PM for other cities. we offer Blood collection service on Sunday’s as well.' },
        { key: '9', heading: 'Is a doctor’s prescription required to avail the testing service?', content: 'Doctor’s prescription is not required if you avail any wellness package. For any illness test, prescription might be required.' },
        { key: '10', heading: 'Where is your test sample processed?', content: 'Test samples are processed at our regional laboratories in various cities – Kolkata, Pune, Chennai, Bangalore, Delhi and more. You can check out more information here – Our Labs' }
    ]

    return (
        <div className="content default-global health-pakage-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card flex-fill">
                            <div className="card-header">
                                <h5 className="mb-0">Health Package Details</h5>
                            </div>
                            <div className="card-body">
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <h5 className="card-title">General Information</h5>
                                        <div className="table-responsive" style={{boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'}}>
                                            <table className="table table-hover table-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Basic Health Checkup Packages in Kolkata</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Sample Type</th>
                                                        <td style={{fontWeight: 500}}>BLOOD</td>
                                                    </tr>
                                                    <tr>
                                                        <th>No of Test</th>
                                                        <td><span className="d-block" style={{color: '#0d6efd', fontWeight: 500}}>43+ Tests</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Pre-test Information</th>
                                                        <td>
                                                            <div>
                                                                <p>Patients are requested to reach the venue by 9:00am after confirmation of their booking.</p>
                                                                <p>Due to the nature of certain tests, patients are advised to keep 5-6 hours of their time in hand.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Report Delivery</th>
                                                        <td>
                                                            <div>
                                                                <p>Reports will be available within 24/48 hours. For further query, speak with our customer care executive.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Price</th>
                                                        <td>
                                                            <div className="d-flex gap-4 align-items-center">
                                                                <p className="my-4">
                                                                <span className="btn btn-sm bg-danger-light p-1 px-2" style={{fontWeight: 'BOLD', fontSize: '1em', textDecoration: 'line-through'}}>
                                                                    <i className='bx bx-rupee'></i> 6,400
                                                                </span>
                                                                <span className="mx-4"> Our Offer </span>
                                                                <span className="btn btn-sm bg-success-light p-1 px-2" style={{fontWeight: 'BOLD', fontSize: '1em'}}>
                                                                    <i className='bx bx-rupee'></i> 5,399/-
                                                                </span>
                                                                </p>
                                                                <button type="button" onClick={() => modalAction('HEALTH_PAKAGE_MODAL', true)} className="btn btn-block btn-outline-info active text-white">BOOK PACKAGE</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="card-title d-flex align-items-end justify-content-between">Tests Included <span style={{fontSize: '0.8em', color: '#292929'}}>7 Profile | 70 Parameters</span></h5>
                                        <ul className="list-inline included-tests-list">
                                            <li>CBC Profile </li>
                                            <li>Creatine</li>
                                            <li>Lipid Profile </li>
                                            <li>Uric Acid</li>
                                            <li>Urine R/E</li>
                                            <li>Stool R/EECG</li>
                                            <li>Chest X-Ray</li>
                                            <li>Dental Check-up</li>
                                            <li>Dietician Consultation</li>
                                            <li>Physician Consultation</li>
                                            <li>USG (Whole Abdomen)</li>
                                            <li>Liver Function Test (LFT) </li>
                                            <li>Blood Group & RH Typing</li>
                                            <li>Blood Sugar (Fasting &PP)</li>
                                            <li>Pulmonary Function Test (PFT)</li>
                                            <li>Breakfast (Complementary)</li>
                                        </ul>
                                    </div>

                                    <div className="col-12">
                                        <div className="test-features">
                                            <div>
                                                <i className='bx bxs-report text-warning'></i>
                                                <div>
                                                    <h5>Smart Report with Trend Analysis</h5>
                                                </div>
                                            </div>
                                            <div>
                                                <i className='bx bx-medal text-info'></i>
                                                <div>
                                                    <h5>NABH & CAP Accredited Labs</h5>
                                                </div>
                                            </div>
                                            <div>
                                                <i className='bx bx-bullseye text-success'></i>
                                                <div>
                                                    <h5>Accurate & Quality Test Reports</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="single-box">
                                            <div className="mt-5 mb-4 d-flex justify-content-center">
                                                <h4 className="pb-2" style={{borderBottom: '3px solid #438fff', width: 'fit-content'}}>Frequently Asked Questions</h4>
                                            </div>
                                            <DefaultAccordion name='accord_1' data={accordData_1} activeKey={accordKey_1} handler={setAccordKey_1} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer text-muted">
                                <h6 className="mb-0 fw-normal d-flex align-items-center gap-4 flex-wrap"><i className='bx bxs-info-circle text-info text-xl'></i> Need Help with Checkup Booking <Link to="/contactUs" className="btn btn-block btn-outline-primary active text-white">CLICK HERE</Link></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>		
    )
}

const mapStateToHealthPakage = (state) => {
    return { };
}
  
export default connect(mapStateToHealthPakage, { modalAction })(HealthPakage);