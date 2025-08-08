import { useState } from "react";
import { MyAccordion, MySlider, responsive_4 } from "./utils/utilities";
import { ConnectedDoctorCard } from "./utils/cards";
import { Link } from "react-router-dom";
import { BSN_ID } from "../../../constants";
import { connect } from "react-redux";

const AboutUs = ({ compCode }) => {

    const [activeItem, setActiveItem] = useState('1');

    const accordData = [
        { key: '1', heading: 'Where is the hospital located?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs &amp; preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '2', heading: 'What is the deposit amount for admission?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs &amp; preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '3', heading: 'What are the visiting hours?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs &amp; preferences of patients, the Patient Centered Medical  model encourages.' },
        { key: '4', heading: 'How many visitors are allowed at a time?', content: 'A Patient Centered Medical Home is a model of healthcare delivery in which care is tailored to the needs &amp; preferences of patients, the Patient Centered Medical  model encourages.' },
    ]

    const doctorsList = [
        { id: 1, name: 'Marc Parcival', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '1.jpg' },
        { id: 2, name: 'Alen Bailey', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '2.jpg' },
        { id: 3, name: 'Basil Andrew', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '3.jpg' },
        { id: 4, name: 'Edgar Denzil', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '4.jpg' },
    ]

    const doctorSlide = (list) => list.map(data => (<div key={data.id}><ConnectedDoctorCard data={data} /></div>));

    const managementTeam = [
        { id: 1, name: 'DR. JITENDRANATH BANERJEE', post: 'MANAGING DIRECTOR / CEO' },
        { id: 2, name: 'DR. SWAYAMBHU BANERJEE', post: 'MEDICAL DIRECTOR' },
        { id: 3, name: 'MRS. SHREYA KOLAY BANERJEE', post: 'DIRECTOR, OPERATIONS' },
        { id: 4, name: 'MRS. JYOTSNA PATRA KARMAKAR', post: 'NURSING SUPERINTENDENT' },
    ]

    const tpaData = [
        { id: 1, number: 1, name: 'WEST BENGAL HEALTH SCHEME'},
        { id: 2, number: 2, name: 'SWASTHYASATHI'},
        { id: 3, number: 3, name: 'KOLKATA POLICE GROUP MEDICLAIM'},
        { id: 4, number: 4, name: 'GENINS INDIA INS. TPA LTD'},
        { id: 5, number: 5, name: 'SAFEWAY  INSURANCE TPA PVT. LTD'},
        { id: 6, number: 6, name: 'MD INDIA HEALTH INS. TPA. LTD'},
        { id: 7, number: 7, name: 'FAMILY HEALTH PLAN INS. TPA LTD.'},
        { id: 8, number: 8, name: 'HERITAGE HEALTH INS. TPA LTD'},
        { id: 9, number: 9, name: 'PARAMOUNT HEALTH SERVICES INS. TPA LTD.'},
        { id: 10, number: 10, name: 'RAKSHA HEALTH INS. TPA. LTD'},
        { id: 11, number: 11, name: 'EAST WEST ASSIST TPA PVT. LTD.'},
        { id: 12, number: 12, name: 'HEALTH INS. TPA OF INDIA LTD.'},
        { id: 13, number: 13, name: 'GRAND INS. TPA PVT. LTD'},
        { id: 14, number: 14, name: 'MEDICARE INS. TPA. LTD'},
        { id: 15, number: 15, name: 'MEDI ASSIST INS. TPA. LTD.'},
        { id: 16, number: 16, name: 'BAJAJ ALLIANZ GEN. INS. CO. LTD.'},
        { id: 17, number: 17, name: 'ICICI LOMBARD GEN. INS. CO. LTD'},
        { id: 18, number: 18, name: 'STAR HEALTH AND ALLIED INS. CO. LTD.'},
        { id: 19, number: 19, name: 'UNIVERSAL SOMPO GEN. INS. CO. LTD.'},
        { id: 20, number: 20, name: 'HDFC ERGO GEN. INS. CO'},
        { id: 21, number: 21, name: 'APOLLO MUNICH HEALTH INS. CO. LTD'},
        { id: 22, number: 22, name: 'CIGNA TTK HEALTH INS. CO. LTD.'},
        { id: 23, number: 23, name: 'RELIANCE GEN. INS. CO. LTD'},
        { id: 24, number: 24, name: 'ADITYA BIRLA HEALTH INS. CO. LTD'},
        { id: 25, number: 25, name: 'CHOLAMONDALAM GEN. INS. CO.'},
        { id: 26, number: 26, name: 'VIDAL HEALTH INSURANCE TPA'},
        { id: 27, number: 27, name: 'ERICSON INSURANCE TPA PVT. LTD.'},
        { id: 28, number: 28, name: 'NIVA BUPA HEALTH INSURANCE'},
        { id: 29, number: 29, name: 'SBI GENERAL HEALTH INSURANCE'},
        { id: 30, number: 30, name: 'TATA AIG GENERAL INSURANCE'},
        { id: 31, number: 31, name: 'CARE HEALTH INSURANCE '},
        { id: 32, number: 32, name: 'LIBERTY GENERAL INSURANCE'},
        { id: 33, number: 33, name: 'GO DIGIT GENERAL INSURANCE'}
    ]

    return (
        <div className="bsn-global">
            <section className="breadcrumb-area" style={{backgroundImage: 'url("/assets/img/aboutUs/aboutus-background.jpg")'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>About Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="left">
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        <li className="active">About Us</li>
                                    </ul>
                                </div>
                                <div className="right">
                                    <a href="#"><span className="material-symbols-outlined notranslate">share</span> Share</a>   
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {compCode === BSN_ID ? 
            <>
                <section className="welcome-area about-us-list overview-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="img-holder">
                                    <img src="/assets/img/BSN/Picture1.jpg" alt="Awesome Image"/>    
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="text-holder">
                                    <div className="sec-title title">
                                        <h1>OVERVIEW</h1>
                                        <span className="border"></span>
                                    </div>
                                    <ul>
                                        <li>
                                            <div className="single-item">
                                                <div className="icon-box">
                                                    <i className='bx bxs-hand-right'></i>
                                                </div>
                                                <div className="text-box">
                                                    <p>
                                                        We take this opportunity to introduce our <span className="fw-bold">101 Bedded</span> Hospital in the name of <span className="fw-bold">BANKURA SEVA NIKETAN HOSPITAL PVT. LTD.</span> located in remote district town of Bankura catering 
                                                        affordable quality healthcare services in the region of Rarh Bengal (Bankura, Midnapore, Purulia, Birbhum, Burdwan and some parts of Jharkhand).
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="single-item ">
                                                <div className="icon-box">
                                                    <i className='bx bxs-hand-right'></i>
                                                </div>
                                                <div className="text-box">
                                                    <p>
                                                        The Centre is conveniently located with fully equipped Intensive Care Units <span className="fw-bold">(I.C.U. and S.D.U.)</span> along with 3-technologically <span className="fw-bold">Advanced Operation Theatres</span> and a <span className="fw-bold">Labour room.</span> 
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="single-item ">
                                                <div className="icon-box">
                                                    <i className='bx bxs-hand-right'></i>
                                                </div>
                                                <div className="text-box">
                                                    <p> <span className="fw-bold">24-hour</span> Residential Medical Officers are available to ensure emergency services.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="single-item ">
                                                <div className="icon-box">
                                                    <i className='bx bxs-hand-right'></i>
                                                </div>
                                                <div className="text-box">
                                                    <p>
                                                        We offer comprehensive Inpatient and outpatient services to our esteemed patients. Our Diagnostic services and Imaging service are well equipped with latest and modern 
                                                        apparatus covering most areas of care including a well-equipped <span className="fw-bold">Pathology Lab, Digital X-ray, Ultrasound with color Doppler, CT Scan along with MRI and Echocardiography 
                                                        facilities.</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="single-item ">
                                                <div className="icon-box">
                                                    <i className='bx bxs-hand-right'></i>
                                                </div>
                                                <div className="text-box">
                                                    <p>
                                                        Our medical and surgical departments are currently one of the most advanced in Bankura being headed by both highly skilled and experienced Doctors Consultants as well as
                                                        Nurses & Technicians.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="single-item ">
                                                <div className="icon-box">
                                                    <i className='bx bxs-hand-right'></i>
                                                </div>
                                                <div className="text-box">
                                                    <p>
                                                        Special care is taken for recruitment of nurses , technicians and also regular in - house training is imparted to all technical and non-technical staffs, so as to maintain 
                                                        a high degree of proficiency towards dealing with proper patient care.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>   
                                </div>
                            </div>
                        </div>
                    </div>    
                </section>

                <section className="welcome-area chairman-msg-area">
                    <div className="container">
                        <div className="row chairman-msg-row">
                            <div className="col-md-9">
                                <div className="text-holder chairman-msg">
                                    <div className="sec-title title">
                                        <h1>CHAIRMAN’S MESSAGE</h1>
                                        <span className="border"></span>
                                    </div>
                                    <div className="">
                                        <p>
                                            Bankura Seva Niketan Hospital was established in 1986 with the mission to provide affordable and quality healthcare facilities to the people of Bankura and Rarh 
                                            Bengal. The organization pledges to provide with standardized healthcare facilities to its patients, while incorporating newer technologies and playing an active
                                            role in promoting as well as improving health within our community. The organization envisages to build a strong integrated system for regional health-care 
                                            delivery with the motto of <span className="fw-bold"> "LOVE ALL, SERVE ALL"</span>
                                        </p>
                                    </div>
                                    <div className="d-flex hospital-logo justify-content-between">
                                        <div className="logo">
                                            <img style={{width: '50%'}} src="/assets/img/bankura seva logo.webp" alt="" />
                                            <p>BANKURA SEVA NIKETAN HOSPITAL</p>
                                        </div>
                                        <ul className="d-flex align-bottom flex-column doctor-name">
                                            <li><h5>Dr. Jitendranath Banerjee</h5></li>
                                            <li> <h6>Founder</h6></li>
                                            <li><p>Bankura Seva Niketan Hospital</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="chairman-img">
                                    <div className="img-holder">
                                        <img  style={{maxHeight: '21em'}} src="/assets/img/BSN/chairman.png" alt="Awesome Image"/>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </section>
            </>
            : ''}

            <section className="welcome-area">
                <div className="container">
                    <div className="sec-title">
                        <h1><span className="material-symbols-outlined notranslate">visibility</span> Our Mission & Vision</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="img-holder">
                                {compCode === BSN_ID ? 
                                    <img src="/assets/img/BSN/Reception-2.jpg" alt="Awesome Image"/>    
                                    : 
                                    <img src="/assets/img/BNH/image-2.jpeg" alt="Awesome Image"/>    
                                }
                            </div>
                            <div className="inner-content">
                                <p>As a tertiary referral ICU to provide state of the art care with the help of very good professionals and infrastructure.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-holder">
                                <div className="title">
                                    <h1>Welcome to the Hospital</h1>   
                                    <p>We look forward to serve humanity with best of our services that are well equipped with latest and modern apparatus covering most areas of care.</p>    
                                </div>
                                <ul>
                                    <li>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <span className="material-symbols-outlined notranslate">volunteer_activism</span>
                                            </div>
                                            <div className="text-box">
                                                <h3>Our Mission</h3>
                                                <p>To Become a center of excellence in healthcare by bringing quality healthcare to the people of Rarh Bengal.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item our-vision">
                                            <div className="icon-box">
                                                <span className="material-symbols-outlined notranslate">eye_tracking</span>
                                            </div>
                                            <div className="text-box">
                                                <h3>Our Vision</h3>
                                                <p>To provide affordable quality health care to patients and be an active partner in local community initiatives and contribute to its well-being and development.</p>
                                                {/* <div className="text">
                                                    <p><i className='bx bxs-hand-right'></i>Idea of denouncing pleasure and praising.</p>    
                                                    <p><i className='bx bxs-hand-right'></i>Pleasure and praising pain was complete system.</p>    
                                                </div> */}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="button">
                                    <a className="thm-btn bgclr-1" href="#">Our Departments</a>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>    
            </section>

            <section className="facilities-appointment-area pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="sec-title">
                                <h1><i className='bx bx-shield-quarter'></i> Our Facilities</h1>
                                <span className="border"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="facilities-content-box">
                                <div>
                                    <div className="row">
                                        <Link to={'/services?pane=hourServices'} className="col-md-6">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">ambulance</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>Emergency Services</h3>
                                                    <p> Emergency services are available 24/7 to handle accidents, heart attacks, strokes and other critical situations.</p>
                                                </div>
                                            </div>
                                        </Link>
                                        {/* <Link to={'/services/ICU_SDU'} className="col-md-4">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">apartment</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>ICU SDU & GEN-WARD</h3>
                                                    <p>Modern ICU, SDU & GEN-WARD for patients who need constant monitoring, advanced life support and care.</p>
                                                </div>
                                            </div>
                                        </Link> */}
                                        <Link to={'/services?pane=laboratoryServices'} className="col-md-6">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">experiment</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>Advance Laboratory</h3>
                                                    <p>Advance Laboratory with skilled professionals for diagnosing, monitoring, and preventing diseases.</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="row">
                                        <Link to={'/services?pane=imagingServices'} className="col-md-6">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">radiology</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>Imaging Services</h3>
                                                    <p>We're equipped with various types of imaging machinery to help diagnose, monitor, and guide treatment.</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to={'/services/genSurgery'} className="col-md-6">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">diversity_3</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>Modular Operation Theatre</h3>
                                                    <p>Highly specialized Operation Theatre (OT) with a sterile, specialized room for advance surgical procedures.</p>
                                                </div>
                                            </div>
                                        </Link>
                                        {/* <div className="col-md-4">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">support_agent</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>Patient Support</h3>
                                                    <p>Undertakes laborious physical exercise, except to obtain some advantage from it any right.</p>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>    
            </section>

            <section className="fact-counter-area black-bg" style={{backgroundImage: 'url("/assets/img/aboutUs/fact-counter-bg-v2.jpg")'}}>
                <div className="container">
                    <div className="sec-title text-center">
                        <h1>Keep <span>your headup</span> &amp; be patient</h1>
                        <p className="text-gray-300">Good health is the foundation of a happy and fulfilling life. It means a strong body, a peaceful mind, and balanced emotions. Maintaining good health involves eating nutritious food, staying active.</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <ul className='d-flex justify-content-around align-items-center flex-wrap'>
                                <li>
                                    <div className="single-item text-center">
                                        <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">pending_actions</span>
                                        </div>
                                        <div className='content-holder'>
                                            <h1><span className="timer" data-from="1" data-to="25" data-speed="5000" data-refresh-interval="50">30+</span></h1>
                                            <h3>Years of Experience</h3>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="single-item text-center">
                                        <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">add_reaction</span>
                                        </div>
                                        <div className='content-holder'>
                                            <h1><span className="timer" data-from="1" data-to="284" data-speed="5000" data-refresh-interval="50">1000+</span></h1>
                                            <h3>Well Smiley Faces</h3>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="single-item text-center">
                                        <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">volunteer_activism</span>
                                        </div>
                                        <div className='content-holder'>
                                            <h1><span className="timer" data-from="1" data-to="176" data-speed="5000" data-refresh-interval="50">500+</span></h1>
                                            <h3>Permanent Pacemaker Implantation</h3>
                                        </div>
                                    </div>
                                </li>
                                {/* <li>
                                    <div className="single-item text-center">
                                        <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">rewarded_ads</span>
                                        </div>
                                        <div className='content-holder'>
                                            <h1><span className="timer" data-from="1" data-to="142" data-speed="5000" data-refresh-interval="50">142</span></h1>
                                            <h3>Awards Holded</h3>
                                        </div>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                
                    </div>
                </div>
            </section>

            {/* <section className="team-area doctor">
                <div className="container">
                    <div className="sec-title">
                        <h1>Meet Our Doctors</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <MySlider name={'doctor-slider'} responsive={responsive_4} dataList={doctorSlide(doctorsList)} customSettings={{variableWidth: false, arrows: false}}/>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* <section className="managementTeam" style={{paddingTop: '5em'}}>
                <div className="container">
                    <div className="sec-title">
                        <h1>Management Team</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="related-doctors">
                                <div className="row">
                                    {managementTeam.map((i, n) => (
                                        <div className="col-md-6" key={i.id} style={{paddingBottom: '0.7em'}}>
                                            <span className="list-card-1">
                                                <img src='/img/logo/opd2.png' alt="List Item" />
                                                <div className="list-card-content">
                                                    <h6 style={{marginBottom: '0.6em'}}>{i.name}</h6>
                                                    <p>{i.post}</p>
                                                </div>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="project-faq-area sec-padding">
                <div className="container">
                    <div className="sec-title ">
                        <h1>Photo Gallery &amp; FAQ’s</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        {compCode === BSN_ID ? <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div className="latest-project grid-cols-2 sm:grid-cols-3 grid gap-3">
                                <div className="single-project-item">
                                    <div className="img-holder">
                                        <img src="/assets/img/BSN/DSC_2158.jpg" alt="Awesome Image"/>
                                        <div className="overlay-style-one">
                                            <div className="box">
                                                <div className="content">
                                                    <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-project-item">
                                    <div className="img-holder">
                                        <img src="/assets/img/BSN/DSC_2343-small.jpg" alt="Awesome Image"/>
                                        <div className="overlay-style-one">
                                            <div className="box">
                                                <div className="content">
                                                    <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-project-item">
                                    <div className="img-holder">
                                        <img src="/assets/img/BSN/DSC_2239.jpg" alt="Awesome Image"/>
                                        <div className="overlay-style-one">
                                            <div className="box">
                                                <div className="content">
                                                    <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-project-item">
                                    <div className="img-holder">
                                        <img src="/assets/img/BSN/DSC_2398.jpeg" alt="Awesome Image"/>
                                        <div className="overlay-style-one">
                                            <div className="box">
                                                <div className="content">
                                                    <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-project-item">
                                    <div className="img-holder">
                                        <img src="/assets/img/BSN/DSC_9636-small.jpg" alt="Awesome Image"/>
                                        <div className="overlay-style-one">
                                            <div className="box">
                                                <div className="content">
                                                    <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-project-item">
                                    <div className="img-holder">
                                        <img src="/assets/img/BSN/DSC_9661.jpg" alt="Awesome Image"/>
                                        <div className="overlay-style-one">
                                            <div className="box">
                                                <div className="content">
                                                    <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            </div> : 
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <div className="latest-project grid-cols-2 sm:grid-cols-3 grid gap-3">
                                    <div className="single-project-item">
                                        <div className="img-holder">
                                            <img src="/assets/img/BNH/icu-img.jpeg" alt="Awesome Image"/>
                                            <div className="overlay-style-one">
                                                <div className="box">
                                                    <div className="content">
                                                        <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-project-item">
                                        <div className="img-holder">
                                            <img src="/assets/img/BNH/img-2.jpeg" alt="Awesome Image"/>
                                            <div className="overlay-style-one">
                                                <div className="box">
                                                    <div className="content">
                                                        <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-project-item">
                                        <div className="img-holder">
                                            <img src="/assets/img/BNH/icu-img.jpeg" alt="Awesome Image"/>
                                            <div className="overlay-style-one">
                                                <div className="box">
                                                    <div className="content">
                                                        <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-project-item">
                                        <div className="img-holder">
                                            <img src="/assets/img/BNH/img2.jpeg" alt="Awesome Image"/>
                                            <div className="overlay-style-one">
                                                <div className="box">
                                                    <div className="content">
                                                        <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-project-item">
                                        <div className="img-holder">
                                            <img src="/assets/img/BNH/img3.jpeg" alt="Awesome Image"/>
                                            <div className="overlay-style-one">
                                                <div className="box">
                                                    <div className="content">
                                                        <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-project-item">
                                        <div className="img-holder">
                                            <img src="/assets/img/BNH/img2.jpeg" alt="Awesome Image"/>
                                            <div className="overlay-style-one">
                                                <div className="box">
                                                    <div className="content">
                                                        <Link to="#"><i className='bx bx-link' aria-hidden="true"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        }
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div className="faq-content">
                                <MyAccordion data={accordData} activeKey={activeItem} handler={setActiveItem} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="slogan-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title pull-left">
                                <h2>If you are a patient seeking quality healthcare at affordable prices!.</h2>
                            </div>
                            <div className="button pull-right mt-0 mt-lg-3">
                                <Link className="thm-btn bgclr-1" to="/specialists">Make an Appointment</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="welcome-area overview-sec about-us-list strength-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="text-holder">
                                <div className="sec-title title">
                                    <h1>STRENGTH</h1>
                                    <span className="border"></span>
                                </div>
                                <ul>
                                    <li>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>
                                                    Multi-Speciality Hospital encompassing major clinical departments in a peripheral region (Bankura)~ 200KM from Kolkata.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Modular OT (With HEPA) </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Modular ICU (With HEPA)</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Round the Clock Availability of Doctors</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>   
                            </div>
                        </div>
                        <div className="col-md-6 ps-lg-5">
                            <div className="text-holder">
                                <div className="sec-title title">
                                    <h1>OUTSOURCED SERVICES</h1>
                                    <span className="border"></span>
                                </div>
                                <ul>
                                    <li>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Specialised Laboratory Services</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Blood Bank</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>BIO Medical Waste Management</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Security</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Laundary Services</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>   
                            </div>
                        </div>       
                    </div>
                </div>    
            </section>

            {/* <section className="welcome-area overview-sec about-us-list committee-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="text-holder">
                                <div className="sec-title title">
                                    <h1>COMMITTEES</h1>
                                    <span className="border"></span>
                                </div>
                                <ul>
                                    <li>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Quality Assurance Committee.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Safety Committee.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Infection Control Committee.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>CPR Committee</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Pharmacotheraputic Committee.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Blood Transfusion Committee.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Medical Records Committee.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Grievance Handling Committee.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Sexual Harassment Committee</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>   
                            </div>
                        </div>
                        <div className="col-md-6 ps-lg-5">
                            <div className="text-holder">
                                <div className="sec-title title">
                                    <h1>MAN POWER STRENGTH</h1>
                                    <span className="border"></span>
                                </div>
                                <ul>
                                    <li>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Total Hospital Staff :</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Consultants :</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Doctors (RMO) :</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Nurses GNM :</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Nurses ANM :</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>B.Sc. Nursing :</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Nursing Assistant :</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Paramedical Staff :</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>   
                            </div>
                        </div>       
                    </div>
                </div>    
            </section>

            <section className="welcome-area overview-sec about-us-list Indicators-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="text-holder">
                                <div className="sec-title title">
                                    <h1>CLINICAL INDICATORS</h1>
                                    <span className="border"></span>
                                </div>
                                <ul>
                                    <li>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Needle Stick Injury</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Incidence of falls</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Mortality Rate</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Anaesthesia related Mortality rate</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>VAP</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>SSI</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>   
                            </div>
                        </div>
                        <div className="col-md-6 ps-lg-5">
                            <div className="text-holder">
                                <div className="sec-title title">
                                    <h1>NON CLINICAL INDICARTORS</h1>
                                    <span className="border"></span>
                                </div>
                                <ul>
                                    <li>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Employee Attrition rate</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Employee absenteeism rate</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Percentage of Medical records not having discharge summary</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Percentage of medical records having incomplete/and or improper consent</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>Percentage of missing records</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>   
                            </div>
                        </div>       
                    </div>
                </div>    
            </section> */}
{/* 
            <section className="welcome-area overview-sec about-us-list manPower-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-holder">
                                <div className="sec-title title">
                                    <h1>WEAKNESS</h1>
                                    <span className="border"></span>
                                </div>
                                <ul>
                                    <li>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>No CATH LAB</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-item ">
                                            <div className="icon-box">
                                                <i className='bx bxs-hand-right'></i>
                                            </div>
                                            <div className="text-box">
                                                <p>1.5 Tesla MRI</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>   
                            </div>
                        </div>       
                    </div>
                </div>    
            </section> */}

            {/* <section className="welcome-area overview-sec about-us-list">
                <div className="container">
                    <div style={{border: '1px solid gray'}}>
                        <div className="clinicalData-heading">
                            <h1>CLINICAL DATA</h1>
                        </div>
                            <div className="clinicalData-table-div overflow-auto">
                                <table style={{width: '100%'}} className="clinicalData-table">
                                    <tbody>
                                        <tr style={{background: '#94c600'}}>
                                            <td>
                                                <h4>Data Type</h4>
                                            </td>
                                            <td>
                                                <h4>DECEMBER 2021</h4>
                                            </td>
                                            <td>
                                                <h4>JANUARY  2022</h4>
                                            </td>
                                            <td>
                                                <h4>FEBRUARY 2022</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>IPD Patient</h4>
                                            </td>
                                            <td>
                                                <h4>912</h4>
                                            </td>
                                            <td>
                                                <h4>947</h4>
                                            </td>
                                            <td>
                                                <h4>806</h4>
                                            </td>
                                        </tr>
                                        <tr className="Surgeries">
                                            <td>
                                                <h4>No. Surgeries</h4>
                                            </td>
                                            <td>
                                                <h4>245</h4>
                                            </td>
                                            <td>
                                                <h4>184</h4>
                                            </td>
                                            <td>
                                                <h4>251</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>No. Death</h4>
                                            </td>
                                            <td>
                                                <h4>11</h4>
                                            </td>
                                            <td>
                                                <h4>17</h4>
                                            </td>
                                            <td>
                                                <h4>16</h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="welcome-area overview-sec about-us-list" id="tpa-list">
                <div className="container">
                    <div style={{border: '1px solid gray'}}>
                        <div className="clinicalData-heading">
                            <h1>CASHLESS TPA LIST</h1>
                        </div>
                        <div className="clinicalData-table-div overflow-auto">
                            <table style={{width: '100%'}} className="clinicalData-table">
                                <tbody>
                                    {tpaData.map(i => (
                                        <tr className="tpaData" key={i.id}>
                                            <td>
                                                {i.number}
                                            </td>
                                            <td>
                                                {i.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <section className="certificates-area">
                {/* <div className="container">
                    <div className="sec-title">
                        <h1>Awards &amp; Recognition</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="certificates d-flex flex-column flex-lg-row">
                                <div className="single-item pointer">
                                    <img src="/assets/img/aboutUs/certificates/1.jpg" alt="Awesome Image" />
                                </div>
                                <div className="single-item pointer">
                                    <img src="/assets/img/aboutUs/certificates/2.jpg" alt="Awesome Image" />
                                </div>
                                <div className="single-item pointer">
                                    <img src="/assets/img/aboutUs/certificates/3.jpg" alt="Awesome Image" />
                                </div>
                                <div className="single-item pointer">
                                    <img src="/assets/img/aboutUs/certificates/4.jpg" alt="Awesome Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="container">
                    <div className="sec-title">
                        <h1>Certificates</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="certificates d-flex flex-column flex-lg-row">
                                <div className="single-item pointer p-3 rounded border-0" style={{background: '#f2f2f2', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
                                    <img src="/assets/img/BSN/BSN-NABH-LOGO.png" alt="NABH LOGO" style={{maxHeight: '14em'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { compCode: state.compCode };
}

export default connect(mapStateToProps, {})(AboutUs);