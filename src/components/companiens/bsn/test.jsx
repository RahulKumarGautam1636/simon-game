import { JQDatePicker, MySlider, SelectMenu, responsive_3, responsive_4 } from './utils/utilities';
import { DepartmentCard, DoctorCard, HealthPackageCard, TestimonialCard } from './utils/cards';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const departments = [
        { name: 'Select Department', value: '' },
        { name: 'Cardiology', value: 'Cardiology' },
        { name: 'Pulmonology', value: 'Pulmonology' },
        { name: 'Gynecology', value: 'Gynecology' },
        { name: 'Neurology', value: 'Neurology' },
        { name: 'Urology', value: 'Urology' },
        { name: 'Gastrology', value: 'Gastrology' },
        { name: 'Pediatrician', value: 'Pediatrician' },
        { name: 'Laboratory', value: 'Laboratory' },
    ]

    const doctors = [
        { name: 'Select Department', value: '' },
        { name: 'Marc Parcival', value: 'Marc Parcival' },
        { name: 'Alen Bailey', value: 'Alen Bailey' },
        { name: 'Basil Andrew', value: 'Basil Andrew' },
        { name: 'Giles Franklin', value: 'Giles Franklin' },
        { name: 'Edgar Denzil', value: 'Edgar Denzil' },
        { name: 'Garfield Feris', value: 'Garfield Feris' },
    ]

    const departmentList = [
        { id: 1, title: 'Cardiology', icon: 'cardiology', content: 'How all this mistaken al idea of denouncing pleasure praisings pain was complete.' },
        { id: 2, title: 'Pulmonology', icon: 'pulmonology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
        { id: 3, title: 'Gynecology', icon: 'gynecology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
        { id: 4, title: 'Neurology', icon: 'neurology', content: 'Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.' },
    ]
    
    const departmentSlide = (list) => list.map(data => (<div key={data.id}><DepartmentCard data={data} /></div>));

    const doctorsList = [
        { id: 1, name: 'Marc Parcival', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '1.jpg' },
        { id: 2, name: 'Alen Bailey', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '2.jpg' },
        { id: 3, name: 'Basil Andrew', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '3.jpg' },
        { id: 4, name: 'Edgar Denzil', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '4.jpg' },
    ]

    const doctorSlide = (list) => list.map(data => (<div key={data.id}><DoctorCard data={data} /></div>));

    const testimonialList = [
        { id: 1, name: 'Rossy Miranda', place: 'Newyork', review: 'Mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.', img: '1.png' },
        { id: 2, name: 'Peter Lawrence', place: 'California', review: 'The master-builder of human happiness one rejects, dislikes, or avoids pleasure itself, because it is pleasure pursue.', img: '2.png' },
        { id: 3, name: 'Rossy Miranda', place: 'Newyork', review: 'Mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.', img: '1.png' },
        { id: 4, name: 'Peter Lawrence', place: 'California', review: 'The master-builder of human happiness one rejects, dislikes, or avoids pleasure itself, because it is pleasure pursue.', img: '2.png' },
    ]
      
    const testimonialSlide = (list) => list.map(data => (<div key={data.id}><TestimonialCard data={data} /></div>));

    const healthPakageSlide = () => [1,2,3,4,5,6].map(data => (<div key={data}><HealthPackageCard data={data} /></div>));

    const [tabActive, setTabActive] = useState('opthalmology');

    return (
        <>
            <div id="carouselExampleCaptions" className="carousel carousel-dark slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="./assets/img/slide-1.jpg" className="d-block w-100" alt="slide-1" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="./assets/img/slide-2.jpg" className="d-block w-100" alt="slide-1" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="./assets/img/slide-3.jpg" className="d-block w-100" alt="slide-1" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <section className='quick-actions'>
                <div className='container'>
                    <div className="row d-flex justify-content-between gy-3">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className='quick-action-item' style={{'--bgClr': '#07bb88'}}>
                                <a href="">Book an Appointment</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className='quick-action-item' style={{'--bgClr': '#dc3545'}}>
                                <a href="">Enquire Now</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className='quick-action-item' style={{'--bgClr': '#028fe1'}}>
                                <a href="">Health Packages</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className='quick-action-item' style={{'--bgClr': '#bf61ef'}}>
                                <a href="">Get a Second Opinion</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="callto-action-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="inner-content">
                                <div className="title-box text-center">
                                    <span className="material-symbols-outlined notranslate" style={{fontSize: '2.9em', color: 'white'}}>calendar_month</span>
                                    <h2>Make an Appointment</h2>    
                                </div>
                                <div className="form-holder clearfix">
                                    <form id="appointment" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                                        <div className="single-box">    
                                            <div className="input-box">
                                                <input type="text" name="form_name" value="" placeholder="Your Name" required="" fdprocessedid="7nuspo"/>
                                            </div>
                                            <div className="input-box">
                                                <SelectMenu id={'doctorsSelect'} dataList={doctors} />
                                            </div>
                                        </div>
                                        <div className="single-box">    
                                            <div className="input-box"> 
                                                <SelectMenu id={'departmentsSelect1'} dataList={departments} /> 
                                            </div>
                                            <div className="input-box">
                                                <JQDatePicker id={'user_DOB'} setState={() => {}} curValue={''} name={'DOB'} customClass={'form-control'} format="dd-mm-yy" placeholder="Select Date"/>
                                                <div className="icon-box">
                                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                                </div>
                                            </div>       
                                        </div>
                                        <button className="thm-btn bgclr-1" type="submit" fdprocessedid="t5er99"><i className='bx bx-send' ></i></button>    
                                    </form>      
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="medical-departments-area">
                <div className="container">
                    <div className="sec-title">
                        <h1>Medical Departments</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className='department-items-box'>
                                <MySlider name={'department-slider'} responsive={responsive_4   } dataList={departmentSlide(departmentList)} customSettings={{variableWidth: false, arrows: false}}/>                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="health-pakage-area">
                <div className="container">
                    <div className="sec-title">
                        <h1>Health Pakages</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className='department-items-box'>
                                <MySlider name={'healthPakage-slider'} responsive={responsive_4} dataList={healthPakageSlide()} customSettings={{variableWidth: false, arrows: false}}/>                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="img-holder">
                                <img src="./assets/img/doctor.jpg" alt="Awesome Image"/>
                                <div className="overlay-content">
                                    <p>As a tertiary referral ICU to provide state of the art care with the help of very good professionals and infrastructure.</p>  
                                </div>    
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="text-holder">
                                <div className="tab-box">
                                    <div className="tab-content">
                                        <div className={`tab-pane ${tabActive === 'opthalmology' ? 'active' : ''}`} id="opthalmology">
                                            <div className="inner-content">
                                                <div className="sec-title">
                                                    <h1>Our Best Services</h1>
                                                    <span className="border"></span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="text-box">
                                                            <h3>Opthalmology Analysis</h3>
                                                            <p>Explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                                                            <a className="thm-btn" href="#">Read More</a>
                                                        </div>    
                                                    </div>    
                                                    <div className="col-md-6">
                                                        <div className="img-box">
                                                            <img src="./assets/img/service-big-1.jpg" alt="Awesome Image"/>
                                                        </div>    
                                                    </div>    
                                                </div>
                                            </div>  
                                        </div>
                                        <div className={`tab-pane ${tabActive === 'laboratory' ? 'active' : ''}`} id="laboratory">
                                            <div className="inner-content">
                                                <div className="sec-title">
                                                    <h1>Our Best Services</h1>
                                                    <span className="border"></span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="text-box">
                                                            <h3>Laboratory Analysis</h3>
                                                            <p>Explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and the master-builder of human happiness. Expound the actual teachings of the great explorer of the truth.</p>
                                                            <a className="thm-btn" href="#">Read More</a>
                                                        </div>    
                                                    </div>    
                                                    <div className="col-md-6">
                                                        <div className="img-box">
                                                            <img src="./assets/img/service-big-2.jpg" alt="Awesome Image"/>
                                                        </div>    
                                                    </div>    
                                                </div>
                                            </div>  
                                        </div>
                                        <div className={`tab-pane ${tabActive === 'cardiac' ? 'active' : ''}`} id="cardiac">
                                            <div className="inner-content">
                                                <div className="sec-title">
                                                    <h1>Our Best Services</h1>
                                                    <span className="border"></span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="text-box">
                                                            <h3>Cardiac Clinic Analysis</h3>
                                                            <p>Explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and the master-builder of human happiness. Expound the actual teachings of the great explorer of the truth.</p>
                                                            <a className="thm-btn" href="#">Read More</a>
                                                        </div>    
                                                    </div>    
                                                    <div className="col-md-6">
                                                        <div className="img-box">
                                                            <img src="./assets/img/service-big-3.jpg" alt="Awesome Image"/>
                                                        </div>    
                                                    </div>    
                                                </div>
                                            </div>     
                                        </div>
                                        <div className={`tab-pane ${tabActive === 'outpatient' ? 'active' : ''}`} id="outpatient">
                                            <div className="inner-content">
                                                <div className="sec-title">
                                                    <h1>Our Best Services</h1>
                                                    <span className="border"></span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="text-box">
                                                            <h3>OutPatient Analysis</h3>
                                                            <p>Explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and the master-builder of human happiness. Expound the actual teachings of the great explorer of the truth.</p>
                                                            <a className="thm-btn" href="#">Read More</a>
                                                        </div>    
                                                    </div>    
                                                    <div className="col-md-6">
                                                        <div className="img-box">
                                                            <img src="./assets/img/service-big-4.jpg" alt="Awesome Image"/>
                                                        </div>    
                                                    </div>    
                                                </div>
                                            </div>     
                                        </div>
                                    </div>
                                    <ul className="nav nav-tabs tab-menu">
                                        <li className={tabActive === 'opthalmology' ? 'active' : ''} onClick={() => setTabActive('opthalmology')}>
                                            <Link to="#">
                                                <div className="img-holder">
                                                    <img src="./assets/img/service-small-1.jpg" alt="Awesome Image"/>
                                                    <div className="overlay-style-one">
                                                        <div className="box">
                                                            <div className="content">
                                                                <div className="icon-holder">
                                                                    <span className="material-symbols-outlined notranslate">add</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <h3>Opthalmology</h3>
                                        </li>
                                        <li className={tabActive === 'laboratory' ? 'active' : ''} onClick={() => setTabActive('laboratory')}>
                                            <Link to="#">
                                                <div className="img-holder">
                                                    <img src="./assets/img/service-small-2.jpg" alt="Awesome Image"/>
                                                    <div className="overlay-style-one">
                                                        <div className="box">
                                                            <div className="content">
                                                                <div className="icon-holder">
                                                                    <span className="material-symbols-outlined notranslate">add</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>    
                                            </Link>
                                            <h3>Laboratory</h3>
                                        </li>
                                        <li className={tabActive === 'cardiac' ? 'active' : ''} onClick={() => setTabActive('cardiac')}>
                                            <Link to="#">
                                                <div className="img-holder">
                                                    <img src="./assets/img/service-small-3.jpg" alt="Awesome Image"/>
                                                    <div className="overlay-style-one">
                                                        <div className="box">
                                                            <div className="content">
                                                                <div className="icon-holder">
                                                                    <span className="material-symbols-outlined notranslate">add</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <h3>Cardiac Clinic</h3>
                                        </li>
                                        <li className={tabActive === 'outpatient' ? 'active' : ''} onClick={() => setTabActive('outpatient')}>
                                            <Link to="#">
                                                <div className="img-holder">
                                                    <img src="./assets/img/service-small-4.jpg" alt="Awesome Image"/>
                                                    <div className="overlay-style-one">
                                                        <div className="box">
                                                            <div className="content">
                                                                <div className="icon-holder">
                                                                    <span className="material-symbols-outlined notranslate">add</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <h3>OutPatient</h3>
                                        </li>
                                    </ul> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  

            <section className="team-area">
                <div className="container">
                    <div className="sec-title">
                        <h1>Team of Consultants</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <MySlider name={'doctor-slider'} responsive={responsive_4} dataList={doctorSlide(doctorsList)} customSettings={{variableWidth: false, arrows: false}}/>
                        </div>
                    </div>
                </div>
            </section> 

            <section className="welcome-area" style={{background: '#fcfcfc', borderTop: '1px solid #f0f0f0'}}>
                <div className="container">
                    <div className="sec-title">
                        <h1>Our Mission & Vision</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="img-holder">
                                <img src="/assets/img/aboutUs/welcome.jpg" alt="Awesome Image"/>    
                            </div>
                            <div className="inner-content">
                                <p>As a tertiary referral ICU to provide state of the art care with the help of very good professionals and infrastructure.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-holder">
                                <div className="title">
                                    <h1>Welcome to the Hospitals</h1>
                                    <p>It is a long established fact that a reader will be distracted by the readable content more or less normal distribution of letters opposed.</p>    
                                </div>
                                <ul>
                                    <li>
                                        <div className="single-item">
                                            <div className="icon-box">
                                                <span className="material-symbols-outlined notranslate">volunteer_activism</span>
                                            </div>
                                            <div className="text-box">
                                                <h3>Our Mission</h3>
                                                <p>Reader will be distracted by the readable content of a page when looking at its layout the point of using more or less normal distribution.</p>
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
                                                <p>Explain to you how all this mistaken idea of denouncing pleasure.</p>
                                                <div className="text">
                                                    <p><i className='bx bxs-hand-right'></i>Idea of denouncing pleasure and praising.</p>    
                                                    <p><i className='bx bxs-hand-right'></i>Pleasure and praising pain was complete system.</p>    
                                                </div>
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

            <section className="fact-counter-area">
                <div className="container">
                    <div className="sec-title text-center">
                        <h1>Keep your headup &amp; be patient</h1>
                        <p>How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the<br/> system and expound the actual teachings of the great.</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ul className='d-flex justify-content-around align-items-center flex-wrap'>
                                <li>
                                    <div className="single-item text-center">
                                        <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">pending_actions</span>
                                        </div>
                                        <div className='content-holder'>
                                            <h1><span className="timer" data-from="1" data-to="25" data-speed="5000" data-refresh-interval="50">25</span></h1>
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
                                            <h1><span className="timer" data-from="1" data-to="284" data-speed="5000" data-refresh-interval="50">284</span></h1>
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
                                            <h1><span className="timer" data-from="1" data-to="176" data-speed="5000" data-refresh-interval="50">176</span></h1>
                                            <h3>Heart Transplant</h3>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="single-item text-center">
                                        <div className="icon-holder">
                                            <span className="material-symbols-outlined notranslate">rewarded_ads</span>
                                        </div>
                                        <div className='content-holder'>
                                            <h1><span className="timer" data-from="1" data-to="142" data-speed="5000" data-refresh-interval="50">142</span></h1>
                                            <h3>Awards Holded</h3>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                
                    </div>
                </div>
            </section>

            <section className="testimonial-area">
                <div className="container">
                    <div className="sec-title mar0auto text-center">
                        <h1>What Our Clients Say</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <MySlider name={'testimonial-slider'} responsive={responsive_3} dataList={testimonialSlide(testimonialList)} customSettings={{variableWidth: false, arrows: false}}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="latest-blog-area">
                <div className="container">
                    <div className="sec-title">
                        <h1>Latest From Blog</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="single-blog-item">
                                <div className="img-holder">
                                    <img src="./assets/img/latest-blog-1.jpg" alt="Awesome Image" />
                                    <div className="overlay-style-one">
                                        <div className="box">
                                            <div className="content">
                                                <a href="#"><span className="material-symbols-outlined notranslate">add</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-holder">
                                    <a href="#">
                                        <h3 className="blog-title">How to handle your kids’ from mystery ailments</h3>
                                    </a>
                                    <div className="text">
                                        <p>The great explorer of the truth, master builder of human happiness one rejects, dislikes, or avoids pleasure itself because it is pleasure.</p>
                                    </div>
                                    <ul className="meta-info">
                                        <li><a href="#"><i className="fa fa-calendar" aria-hidden="true"></i>February 14, 2017</a></li>
                                        <li><a href="#"><i className="fa fa-comments-o" aria-hidden="true"></i>21 Comments</a></li>
                                    </ul>
                                </div>    
                            </div>    
                        </div>
                        <div className="col-md-4">
                            <div className="single-blog-item">
                                <div className="img-holder">
                                    <img src="./assets/img/latest-blog-2.jpg" alt="Awesome Image" />
                                    <div className="overlay-style-one">
                                        <div className="box">
                                            <div className="content">
                                                <a href="#"><span className="material-symbols-outlined notranslate">add</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-holder">
                                    <a href="#">
                                        <h3 className="blog-title">Negative statin stories add to heart health risk</h3>
                                    </a>
                                    <div className="text">
                                        <p>There anyone who loves or pursues or desires to obtain pains of itself, because it is pain because occasionally circumstances occur.</p>
                                    </div>
                                    <ul className="meta-info">
                                        <li><a href="#"><i className="fa fa-calendar" aria-hidden="true"></i>January 21, 2017</a></li>
                                        <li><a href="#"><i className="fa fa-comments-o" aria-hidden="true"></i>18 Comments</a></li>
                                    </ul>
                                </div>    
                            </div>    
                        </div>
                        <div className="col-md-4">
                            <div className="single-blog-item">
                                <div className="img-holder">
                                    <img src="./assets/img/latest-blog-3.jpg" alt="Awesome Image" />
                                    <div className="overlay-style-one">
                                        <div className="box">
                                            <div className="content">
                                                <a href="#"><span className="material-symbols-outlined notranslate">add</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-holder">
                                    <a href="#">
                                        <h3 className="blog-title">Lung cancer survival rate in England improves</h3>
                                    </a>
                                    <div className="text">
                                        <p>Which toil and pain can procure him some great pleasure. To take a trivial example, which of us  laborious physical exercise.</p>
                                    </div>
                                    <ul className="meta-info">
                                        <li><a href="#"><i className="fa fa-calendar" aria-hidden="true"></i>January 15, 2017</a></li>
                                        <li><a href="#"><i className="fa fa-comments-o" aria-hidden="true"></i>09 Comments</a></li>
                                    </ul>
                                </div>    
                            </div>    
                        </div>
                    </div>
                </div>
            </section>

            <section className="facilities-appointment-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="facilities-content-box">
                                <div className="sec-title">
                                    <h1>Our Facilities</h1>
                                    <span className="border"></span>
                                </div>

                                <div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">ambulance</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>24 Hrs Ambulance</h3>
                                                    <p>How all this mistaken idea denoucing pleasure and praisings pain was born complete account expound.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">ramen_dining</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>Food &amp; Dietary</h3>
                                                    <p>The Dietitian plans the diet based on the therapeutic needs of the patient, Local specialties, Continental.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">clinical_notes</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>Special Nurses</h3>
                                                    <p>Special nurse services can be arranged through Nursing , master of human happiness.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-item">
                                                <div className="icon-holder">
                                                    <div className="icon-box">
                                                        <div className="icon">
                                                        <span className="material-symbols-outlined notranslate">temple_hindu</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-holder">
                                                    <h3>Places of Worship</h3>
                                                    <p>There is a temple of Goddess Krishna mariamman in the hospital premises, a Namaz room &amp; Prayer cell</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="appointment">
                                <div className="sec-title">
                                    <h1>Make an Appointment</h1>
                                    <span className="border"></span>
                                </div>
                                <form id="appointment-form" name="appointment-form" method="post">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-box">
                                                <input type="text" name="form_name" value="" placeholder="Your Name" required />
                                            </div>
                                            <div className="input-box">
                                                <input type="email" name="form_email" value="" placeholder="Your Email" required />
                                            </div>
                                            <div className="input-box callto-action-area">
                                                <SelectMenu id='departmentsSelect2' dataList={departments}/>
                                                {/* <select className="selectmenu" id="ui-id-3" style={{display: 'none'}}>
                                                    <option selected="selected">Select Department</option>
                                                    <option>Cardiology</option>
                                                    <option>Pulmonology</option>
                                                    <option>Gynecology</option>
                                                    <option>Neurology</option>
                                                    <option>Urology</option>
                                                    <option>Gastrology</option>
                                                    <option>Pediatrician</option>
                                                    <option>Laboratory</option>
                                                </select> */}
                                            </div>
                                            <button className="thm-btn bgclr-1" type="submit">submit</button>        
                                        </div>
                                    </div>
                                </form>        
                            </div>
                        </div>
                    </div>
                </div>    
            </section>

            <section className="brand-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="text-holder">
                                <div className="sec-title">
                                    <h1>You’re in Good Hands</h1>
                                </div>
                                <div className="text">
                                    <p>We believe in bringing the most modern techniques and delivering extraordinary care to ailing population with the highest levels of ethics and standards. We are committed to continuing medical education, through our fellowship and DNB programs.</p>
                                    <p>We organize atleast one conference a month and support research foundation for continued advancement.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="awards-holder">
                                <div className="sec-title">
                                    <h1>Clinic Awards</h1>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="single-item">
                                            <a href="#"><img src="./assets/img/1(1).png" alt="Awesome Brand Image"/></a>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="single-item">
                                            <a href="#"><img src="./assets/img/2(1).png" alt="Awesome Brand Image"/></a>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <div className="single-item">
                                            <a href="#"><img src="./assets/img/1(1).png" alt="Awesome Brand Image"/></a>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="single-item">
                                            <a href="#"><img src="./assets/img/2(1).png" alt="Awesome Brand Image"/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </section>
        </>
    )
}

export default Home;




