import { Arrow, DataList, JQDatePicker, MySlider, SelectMenu, bsnDepartmentList, departmentList, doctorsList, responsive_3, responsive_4, testimonialList } from './utils/utilities';
import { DepartmentCard, ConnectedDoctorCard, HealthPackageCard, TestimonialCard } from './utils/cards';
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { BASE_URL, bhsId, BNH_ID, BSN_ID } from '../../../constants';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { getFrom } from '../default/utilities';
import Skeleton from 'react-loading-skeleton';
import { ErrorCard } from '../default/cards';

const Home = ({ compCode }) => {

    const [tabActive, setTabActive] = useState('IPD');
    const [doctors, setDoctors] = useState({loading: true, data: {PartyMasterList: [], CompanyMasterList: []}, err: {status: false, msg: ''}});


    const getDoctors = async (companyCode, key) => {                      
        if (!companyCode) return alert('no companyCode received');                  
        const res = await getFrom(`${BASE_URL}/api/search/Get?CID=${companyCode}&Type=${key.filterBy}&SearchString=${key.query}`, {}, setDoctors);
        if (res) {
            setDoctors(res);
        } else {
            console.log('No data received');
        }
    }

    useEffect(() => {
        getDoctors(compCode, {query: ' ', filterBy: 'INTDOCT'});
    },[])  
    
    const renderDoctorSlide = (data) => {
        if (data.loading) {
            return <div className='w-100'><Skeleton count={10}/></div>;
          } else if (data.err.status) {
            return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`} />
          } else if (data.data.PartyMasterList.length === 0) {
            return <div className='text-center my-5 w-100'><h2 className="text-info mark">No Doctors been found for current filters</h2></div>;
          } else {
            let doctorSlide = data.data.PartyMasterList.slice(0, 30).map(data => (<div key={data.PartyId}><ConnectedDoctorCard data={data} specialistId={data.SpecialistId} /></div>));
            return (
                <MySlider name={'doctor-slider'} responsive={responsive_4} dataList={doctorSlide} customSettings={{variableWidth: false, dots: false}}/>
            )
        }
    }
    
    // const departments = [
    //     { name: 'Select Department', value: '' },
    //     { name: 'Cardiology', value: 'Cardiology' },
    //     { name: 'Pulmonology', value: 'Pulmonology' },
    //     { name: 'Gynecology', value: 'Gynecology' },
    //     { name: 'Neurology', value: 'Neurology' },
    //     { name: 'Urology', value: 'Urology' },
    //     { name: 'Gastrology', value: 'Gastrology' },
    //     { name: 'Pediatrician', value: 'Pediatrician' },
    //     { name: 'Laboratory', value: 'Laboratory' },
    // ]

    // const myDoctors = [
    //     { name: 'Select Doctor', value: '' },
    //     { name: 'Marc Parcival', value: 'Marc Parcival' },
    //     { name: 'Alen Bailey', value: 'Alen Bailey' },
    //     { name: 'Basil Andrew', value: 'Basil Andrew' },
    //     { name: 'Giles Franklin', value: 'Giles Franklin' },
    //     { name: 'Edgar Denzil', value: 'Edgar Denzil' },
    //     { name: 'Garfield Feris', value: 'Garfield Feris' },
    // ]    

    const departmentSlide = (list) => list.map(data => (<div key={data.id}><DepartmentCard data={data} /></div>));
      
    const testimonialSlide = (list) => list.map(data => (<div key={data.id}><TestimonialCard data={data} /></div>));

    const healthPakageSlide = () => [1,2,3,4,5,6].map(data => (<div key={data}><HealthPackageCard data={data} /></div>));

    const videoSlide = (list) => list.map(data => (<div key={data.id}><div className='d-flex justify-content-center'><img className='img-fluid' src={`/assets/img/doctors/${data.img}`} alt="main-frame" /><span className='vid-overlay'><i className='bx bx-play-circle'></i></span></div></div>));

    const navVideoSlide = (list) => list.map(data => (<div key={data.id}><img className='img-fluid' src={`/assets/img/doctors/${data.img}`} alt="main-frame" /><span className='vid-overlay'><i className='bx bx-play-circle'></i></span></div>));

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [nav3, setNav3] = useState(null);
    const [nav4, setNav4] = useState(null);
    
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);
    let sliderRef3 = useRef(null);
    let sliderRef4 = useRef(null);
  
    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    useEffect(() => {
        setNav3(sliderRef3);
        setNav4(sliderRef4);
    }, []);

    const [tab2Active, setTab2Active] = useState('1');

    const tabList = [
        { 
            id: '1',
            link: '#', 
            heading: 'Programs', 
            accordName: 'accord_1', 
            data: [
                { 
                    title: 'Partnerships & Collaboration',
                    links: [
                        { text: 'Classification of Diseases, Functioning, and Disability (ICD & ICF classification)', link: '#'},
                        { text: 'Collaborating Office of Medical Examiners and Coroners (COMEC) ', link: '#'},
                        { text: 'International Statistics Program', link: '#'},
                        { text: 'Injury', link: '#'},
                        { text: 'Healthy People', link: '#'},
                        { text: 'Washington Group on Disability Statistics', link: '#'},
                    ]
                },
                { 
                    title: 'Services',
                    links: [
                        { text: 'National Death Index', link: '#' },
                        { text: 'Research Data Center', link: '#' },
                        { text: 'Collaborating Center for Questionnaire Design and Evaluation Research', link: '#' },
                    ]
                },
                { 
                    title: 'Data Integration',
                    links: [
                        { text: 'Data Linkage', link: '#' },
                    ]
                }
            ],
        },
        { 
            id: '2',
            link: '#', 
            heading: 'Health Topics', 
            accordName: 'accord_1', 
            data: [
                { 
                    title: 'Fast Stats',
                    links: [
                        { text: 'Diseases and Conditions', link: '#'},
                        { text: 'Infectious/Immune', link: '#'},
                        { text: 'Family LifeInfectious DiseaseFamily Life', link: '#'},
                        { text: 'Health Care and Insurance', link: '#'},
                        { text: 'Disability and Risk Factors', link: '#'},
                        { text: 'Injuries', link: '#'},
                        { text: 'Life Stages and Populations', link: '#'},
                        { text: 'Reproductive Health', link: '#'},
                    ]
                },
                { 
                    title: 'Health Policy Data Requests',
                    links: [
                        { text: 'Chronic Conditions', link: '#' },
                        { text: 'Coverage and Access', link: '#' },
                        { text: 'Disability', link: '#' },
                        { text: 'Mental Health', link: '#' },
                        { text: 'Mortality', link: '#' },
                        { text: 'Use of Health Care Services', link: '#' },
                    ]
                }
            ],
        },
        { 
            id: '3',
            link: '#', 
            heading: 'Data and Tools', 
            accordName: 'accord_1', 
            data: [
                { 
                    title: 'Data Access',
                    links: [
                        { text: 'Public Use Data Files and Documentation', link: '#'},
                        { text: 'Restricted Data', link: '#'},
                        { text: 'Data Linkage', link: '#'},
                        { text: 'National Death Index', link: '#'},
                        { text: 'RANDS', link: '#'},
                        { text: 'Q-Bank: Question Evaluation for Surveys', link: '#'},
                    ]
                },
                { 
                    title: 'Data Tools',
                    links: [
                        { text: 'CDC WONDER', link: '#' },
                        { text: 'NCHS Data Query System', link: '#' },
                        { text: 'NHIS Interactive Data Query Tool', link: '#' },
                        { text: 'WISQARS', link: '#' },
                    ]
                },
                { 
                    title: 'Data Analysis Aids',
                    links: [
                        { text: 'Injury Tools and Frameworks', link: '#' },
                        { text: 'SPACE program', link: '#' },
                        { text: 'Urban/Rural Classification scheme for Counties', link: '#' },
                        { text: 'Semi-Automated Non-response Detection for Surveys', link: '#' },
                    ]
                },
                { 
                    title: 'Data Visualizations',
                    links: [
                        { text: 'NCHS Data Visualization Gallery', link: '#' },
                        { text: 'Stats of the States', link: '#' },
                        { text: 'NHIS Interactive Data Query Tool', link: '#' },
                    ]
                }
            ],
        },
        { 
            id: '4',
            link: '#', 
            heading: 'Publications', 
            accordName: 'accord_1', 
            data: [
                { 
                    title: 'Publications',
                    links: [
                        { text: 'Data Briefs', link: '#'},
                        { text: 'Early Release from the National Health Interview Survey', link: '#'},
                        { text: 'Health E-Stats', link: '#'},
                        { text: 'Health, United States', link: '#'},
                        { text: 'Healthy People Publications', link: '#'},
                        { text: 'National Health Statistics Reports', link: '#'},
                        { text: 'National Vital Statistics Reports', link: '#'},
                        { text: 'Vital and Health Statistics Series', link: '#'},
                        { text: 'Vital Statistics Rapid Release', link: '#'},
                    ]
                },
                { 
                    title: 'Historic and Discontinued Publications',
                    links: [
                        { text: 'Advance Data', link: '#' },
                        { text: 'Monthly Vital Statistics Reports', link: '#' },
                        { text: 'Public Health Service Publications', link: '#' },
                        { text: 'Vital Statistics of the United States', link: '#' },
                        { text: '', link: '#' },
                        { text: '', link: '#' },
                    ]
                }
            ],
        },
        { 
            id: '5',
            link: '#', 
            heading: 'News and Events', 
            accordName: 'accord_1', 
            data: [
                { 
                    title: 'NCHS Press Room',
                    links: [
                        { text: 'Release Schedule', link: '#'},
                        { text: 'Publications Archive', link: '#'},
                        { text: 'Videos', link: '#'},
                    ]
                },
                { 
                    title: 'Blog',
                    links: [
                        { text: 'NCHS Blog', link: '#' },
                    ]
                },
                { 
                    title: 'Events and Announcements',
                    links: [],
                }
            ],
        },
        { 
            id: '6',
            link: '#', 
            heading: 'Visual Gallery', 
            accordName: 'accord_1', 
            data: [
                { 
                    title: 'Data Visualizations',
                    links: [
                        { text: 'National Health and Nutrition Examination Survey', link: '#'},
                        { text: 'National Health Interview Survey', link: '#'},
                        { text: 'National Vital Statistics System', link: '#'},
                    ]
                },
                { 
                    title: 'Visual Abstracts',
                    links: [
                        { text: 'Collection of products for disseminating scientific research in an engaging, easily digestible way. These serve as an adjunct to a full scientific report.', link: '#' },
                    ]
                }
            ],
        },
    ]
    
    var settings = {
        className: 'product-slider',
        prevArrow: <Arrow customClass='slick-prev slick-arrow' el={'left'}/>,
        nextArrow: <Arrow customClass='slick-next slick-arrow' el={'right'}/>,
        arrows: true,
    };

    return (
        <div className="bsn-global">
            <div id="carouselExampleCaptions" className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="2500" data-bs-touch="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 4"></button>
                </div>
                {(() => {
                    if (compCode === bhsId) {
                        return (
                            <div className="carousel-inner main-carousel">
                                <div className="carousel-item active">
                                    <img src="./assets/img/newModal-2.1 (1).jpg" className="d-none d-sm-block w-100" alt="slide-1" />
                                    <div className='d-sm-none'>
                                        <img src="./assets/img/newModal-2.1(mobile.1).jpg" className="d-block w-100" alt="slide-1" />
                                        <img src="./assets/img/Group 205 (1).jpg" className="d-block w-100" alt="slide-1" />
                                    </div>
                                </div>
                            </div>
                        )
                    } else if (compCode === BNH_ID) {
                        return (
                            <>
                                <style>
                                    {`
                                        .carousel-item img {
                                            max-height: 23rem;
                                        }
                                    `}
                                </style>
                                <div className="carousel-inner main-carousel">
                                    <div className="carousel-item active">
                                        <img src="./assets/img/BNH/mainBanners/img1.jpeg" className="d-none d-sm-block w-100" alt="slide-1" />
                                        <img src="./assets/img/BNH/mainBanners/img1.jpeg" className="d-sm-none w-100" alt="slide-1" />
                                    </div>
                                    <div className="carousel-item">
                                        <Link to='/specialists' className="d-none d-sm-block w-100">
                                            <img src="./assets/img/BNH/mainBanners/img2.jpeg" className="w-100" alt="slide-1" />
                                        </Link>
                                        <img src="./assets/img/BNH/mainBanners/img2.jpeg" className="d-sm-none w-100" alt="slide-1" />
                                    </div>
                                    <div className={`carousel-item`}>
                                        <Link to='#' className="d-none d-sm-block w-100">
                                            <img src="./assets/img/BNH/mainBanners/img3.jpeg" className="d-none d-sm-block w-100" alt="slide-1" />
                                        </Link>
                                        <img src="./assets/img/BNH/mainBanners/img3.jpeg" className="d-sm-none w-100" alt="slide-1" />
                                    </div>
                                    <div className={`carousel-item`}>
                                        <Link to='#' className="d-none d-sm-block w-100">
                                            <img src="./assets/img/BNH/mainBanners/img4.jpeg" className="d-none d-sm-block w-100" alt="slide-1" />
                                        </Link>
                                        <img src="./assets/img/BNH/mainBanners/img4.jpeg" className="d-sm-none w-100" alt="slide-1" />
                                    </div>
                                    {/* <div className={`carousel-item`}>
                                        <Link to='#' className="d-none d-sm-block w-100">
                                            <img src="./assets/img/BNH/mainBanners/img5.jpeg" className="d-none d-sm-block w-100" alt="slide-1" />
                                        </Link>
                                        <img src="./assets/img/BNH/mainBanners/img5.jpeg" className="d-sm-none w-100" alt="slide-1" />
                                    </div> */}
                                </div>
                                <button className="carousel-control-prev d-none d-md-block" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next d-none d-md-block" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <div className="carousel-inner main-carousel">
                                    {compCode === BNH_ID ? '' : <div className="carousel-item active">
                                        <img src="./assets/img/BSN/BSN-HERO-1.jpg" className="d-none d-sm-block w-100" alt="slide-1" />
                                        <img src="./assets/img/BSN/NABH-HERO.jpg" className="d-sm-none w-100" alt="slide-1" />
                                    </div>}
                                    <div className="carousel-item">
                                        <Link to='/specialists' className="d-none d-sm-block w-100">
                                            <img src="./assets/img/BSN/BSN-HERO-2.png" className="w-100" alt="slide-1" />
                                        </Link>
                                        <img src="./assets/img/BSN/ADVANCE-HEALTHCARE.jpg" className="d-sm-none w-100" alt="slide-1" />
                                    </div>
                                    <div className={`carousel-item ${compCode === BNH_ID ? 'active' : ''}`}>
                                        <Link to='#' className="d-none d-sm-block w-100">
                                            <img src="./assets/img/BSN/BSN-HERO-3.jpg" className="d-none d-sm-block w-100" alt="slide-1" />
                                        </Link>
                                        <img src="./assets/img/BSN/EMERGENCY.jpg" className="d-sm-none w-100" alt="slide-1" />
                                    </div>
                                    <div className={`carousel-item`}>
                                        <Link to='#' className="d-none d-sm-block w-100">
                                            <img src="./assets/img/BSN/NEPHROLOGY-BANNER.jpg" className="d-none d-sm-block w-100" alt="slide-1" />
                                        </Link>
                                        <img src="./assets/img/BSN/NEPHROLOGY-BANNER-mobile.jpg" className="d-sm-none w-100" alt="slide-1" />
                                    </div>
                                    <div className={`carousel-item`}>
                                        <Link to='#' className="d-none d-sm-block w-100">
                                            <img src="./assets/img/BSN/Surgery-Statistics.jpg" className="d-none d-sm-block w-100" alt="slide-1" />
                                        </Link>
                                        <img src="./assets/img/BSN/Surgery-stats-mobile.jpg" className="d-sm-none w-100" alt="slide-1" />
                                    </div>
                                </div>
                                <button className="carousel-control-prev d-none d-md-block" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next d-none d-md-block" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </>
                        )
                    }
                })()}
            </div>
            {compCode === bhsId ? <section className='floating-card-area'>
                <div className="container d-flex justify-content-end">
                    <div className="floating-card-box">
                        <div className="floating-card">
                            <h4><span className="material-symbols-outlined notranslate">account_child_invert</span> Children</h4>
                            <div>
                                {/* <p className='d-flex justify-content-between'>Count: <span>12</span></p> */}
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td scope="col">Year</td>
                                            <td scope="col">Births</td>
                                            <td scope="col">Vaccination</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2021</td>
                                            <td>3.5L</td>
                                            <td>2.35L</td>
                                        </tr>
                                        <tr>
                                            <td>2022</td>
                                            <td>4.5L</td>
                                            <td>3.05L</td>
                                        </tr>
                                        <tr>
                                            <td>2023</td>
                                            <td>5L</td>
                                            <td>4.2L</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="floating-card">
                            <h4><span className="material-symbols-outlined notranslate">woman</span> Women</h4>
                            <div>
                                <p className='d-flex justify-content-between'>General Fertility rate declined 3% in 2023 from 2020</p>
                                
                            </div>
                        </div>
                        <div className="floating-card">
                            <h4><span className="material-symbols-outlined notranslate">elderly</span> Elderly</h4>
                            <div>
                                {/* <p className='d-flex justify-content-between'>Count: <span>16</span></p> */}
                                <p className='d-flex justify-content-between'>In 2022, More than one third of adults and older visited cardiologist in the past</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> : ''}
            
            {/* <section className='quick-actions'>
                <div className='container'>
                    <div className="row">
                        <div className="col-12">
                            <div className="sec-title">
                                <h1><i className='bx bx-shield-quarter'></i> Our Services</h1>
                                <span className="border"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-between gy-2">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to="/specialists" className='quick-action-item' style={{'--bgClr': '#07bb88'}}>
                                <span>Make a Doctor Appointment</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to="#" className='quick-action-item' style={{'--bgClr': '#dc3545'}}>
                                <span>Pharmacy Service</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <HashLink to="#health-pakages" className='quick-action-item' style={{'--bgClr': '#028fe1'}}>
                                <span>Health Packages</span>
                            </HashLink>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to="#" className='quick-action-item' style={{'--bgClr': '#bf61ef'}}>
                                <span>Find urgent and Emergency care</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section> */}
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

            {/* <section className="callto-action-area">
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
                                                <SelectMenu id={'doctorsSelect'} dataList={myDoctors} />
                                            </div>
                                        </div>
                                        <div className="single-box">    
                                            <div className="input-box"> 
                                                <SelectMenu id={'departmentsSelect1'} dataList={departments} /> 
                                            </div>
                                            <div className="input-box">
                                                <JQDatePicker id={'user_DOB'} setState={() => {}} curValue={''} name={'DOB'} customClassName={'form-control'} format="dd-mm-yy" placeholder="Select Date"/>
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
            </section> */}

            {compCode === bhsId ? <section className="doctor-page-area" style={{background: 'white', padding: '1.8em 0 1.5em', border: '1px solid #e7e7e7'}}>
                <div className="container"> 
                <div className="row">
                    <div className="col-12">
                        <ul className="nav nav-tabs imagingServices-nav tab-menu d-flex mb-0">
                            {tabList.map(tab => (
                                <li className={tab2Active === tab.id ? 'active' : '' } style={{flex: 1}}><Link to="#" className='mb-0 mb-lg-3 text-nowrap' onClick={() => setTab2Active(tab.id)}>{tab.heading}</Link></li>
                            ))}
                        </ul>  
                    </div>
                    <div className="col-12">
                        <div className="tab-content">
                            {tabList.map(tab => (
                                <div className={`tab-pane ${tab2Active === tab.id ? 'active' : ''}`}>
                                    <section className="faq-content-area data-list-area py-0">
                                        <div className="row">
                                            {tab.data.map(i => (
                                                <div className="col-12 col-lg-6 col-xl-4">
                                                    <div className="single-box mb-0">
                                                        <div className="sec-title pb-3">
                                                            <h1>{i.title}</h1>
                                                            <span className="border"></span>
                                                        </div>
                                                        <DataList name='accord_1' data={i.links} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </section> : ''}

            <section className="medical-departments-area" style={{background: '#f7f7f7'}}>
                <div className="container">
                    <div className="sec-title">
                        <h1 className='d-flex'><i className='bx bx-plus-medical me-1 me-lg-2'></i> Medical Departments <Link className='ms-auto text-sm text-primary' to={'/services'}>View All</Link></h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className='department-items-box'>
                                {compCode === BSN_ID ? 
                                    <MySlider name={'department-slider'} responsive={responsive_4} dataList={departmentSlide(bsnDepartmentList)} customSettings={{variableWidth: false, arrows: false}}/>                                
                                    : 
                                    <MySlider name={'department-slider'} responsive={responsive_4} dataList={departmentSlide(departmentList)} customSettings={{variableWidth: false, arrows: false}}/>                                
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="health-pakage-area" id='health-pakages'>
                <div className="container">
                    <div className="sec-title">
                        <h1 className='d-flex'><i className='bx bxs-package me-1 me-lg-2'></i> Health Packages <Link className='ms-auto text-sm text-primary' to={'/healthPakages'}>View All</Link></h1>
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
            </section> */}

            {(() => {
                if (compCode === BNH_ID) {
                    return (
                        <section className="service-area">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="img-holder">
                                            <img src="./assets/img/BNH/hr-img-1.png" alt="Awesome Image"/>
                                            <div className="overlay-content">
                                                <p>As a tertiary referral ICU to provide state of the art care with the help of very good professionals and infrastructure.</p>  
                                            </div>    
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="text-holder">
                                            <div className="tab-box">
                                                <div className="tab-content">
                                                    <div className={`tab-pane ${tabActive === 'IPD' ? 'active' : ''}`} id="IPD">
                                                        <div className="inner-content">
                                                            <div className="sec-title">
                                                                <h1><i className='bx bx-customize' ></i> Our Best Services</h1>
                                                                <span className="border"></span>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="text-box">
                                                                        <h3>IPD</h3>
                                                                        <p>The In-Patient Department (IPD) is the hospital section where patients are admitted for treatment that requires staying overnight or longer under medical supervision. Unlike the Out-Patient Department (OPD), where patients visit for consultations and return home the same day, IPD provides continuous care.</p>
                                                                        <Link className="thm-btn" to="/services">View Services</Link>
                                                                    </div>    
                                                                </div>    
                                                                <div className="col-md-6">
                                                                    <div className="img-box">
                                                                        <img src="./assets/img/BNH/icu-img.jpeg" alt="Awesome Image"/>
                                                                    </div>    
                                                                </div>    
                                                            </div>
                                                        </div>  
                                                    </div>
                                                    <div className={`tab-pane ${tabActive === 'OPD' ? 'active' : ''}`} id="OPD">
                                                        <div className="inner-content">
                                                            <div className="sec-title">
                                                                <h1>Our Best Services</h1>
                                                                <span className="border"></span>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="text-box">
                                                                        <h3>OPD </h3>
                                                                        <p>The Out-Patient Department (OPD) is a key hospital unit where patients receive medical care without being admitted overnight. It serves as the first point of contact for individuals seeking diagnosis, treatment, or follow-up care for various health concerns. OPD plays a crucial role in early detection of diseases, preventive care, and reducing hospital admissions.</p>
                                                                        <Link className="thm-btn" to="/services">View Services</Link>
                                                                    </div>    
                                                                </div>    
                                                                <div className="col-md-6">
                                                                    <div className="img-box">
                                                                        <img src="./assets/img/BNH/img-2.jpeg" alt="Awesome Image"/>
                                                                    </div>    
                                                                </div>    
                                                            </div>
                                                        </div>  
                                                    </div>
                                                    <div className={`tab-pane ${tabActive === 'imaging' ? 'active' : ''}`} id="imaging">
                                                        <div className="inner-content">
                                                            <div className="sec-title">
                                                                <h1>Our Best Services</h1>
                                                                <span className="border"></span>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="text-box">
                                                                        <h3>Imaging Services</h3>
                                                                        <p>Imaging services are essential diagnostic tools in the medical field that use advanced technology to create detailed pictures of the body’s internal structures. These images help doctors diagnose, monitor, and guide treatment for a wide range of health conditions. Imaging services are non-invasive or minimally invasive, often performed on an outpatient basis</p>
                                                                        <Link className="thm-btn" to="/services?pane=imagingServices">View Services</Link>
                                                                    </div>    
                                                                </div>    
                                                                <div className="col-md-6">
                                                                    <div className="img-box">
                                                                        <img src="./assets/img/BNH/img2.jpeg" alt="Awesome Image"/>
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
                                                                        <h3>Laboratory Services</h3>
                                                                        <p>Laboratory services are a vital part of healthcare, providing tests that help doctors diagnose, monitor, and prevent diseases. Laboratory professionals analyze samples such as blood, urine, tissue, and other body fluids to deliver accurate and timely results. Laboratory services play a crucial role in early diagnosis, treatment planning ensuring better patient outcomes.</p>
                                                                        <Link className="thm-btn" to="/services?pane=laboratoryServices">View Services</Link>
                                                                    </div>    
                                                                </div>    
                                                                <div className="col-md-6">
                                                                    <div className="img-box">
                                                                        <img src="./assets/img/BNH/img3.jpeg" alt="Awesome Image"/>
                                                                    </div>    
                                                                </div>    
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>
                                                <ul className="nav nav-tabs tab-menu">
                                                    <li className={tabActive === 'IPD' ? 'active' : ''} onClick={() => setTabActive('IPD')}>
                                                        <Link to="#">
                                                            <div className="img-holder">
                                                                <img src="./assets/img/BNH/icu-img.jpeg" alt="Awesome Image"/>
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
                                                        <h3>IPD</h3>
                                                    </li>
                                                    <li className={tabActive === 'OPD' ? 'active' : ''} onClick={() => setTabActive('OPD')}>
                                                        <Link to="#">
                                                            <div className="img-holder">
                                                                <img src="./assets/img/BNH/img-2.jpeg" alt="Awesome Image"/>
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
                                                        <h3>OPD</h3>
                                                    </li>
                                                    <li className={tabActive === 'imaging' ? 'active' : ''} onClick={() => setTabActive('imaging')}>
                                                        <Link to="#">
                                                            <div className="img-holder">
                                                                <img src="./assets/img/BNH/img2.jpeg" alt="Awesome Image"/>
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
                                                        <h3>Imaging Services</h3>
                                                    </li>
                                                    <li className={tabActive === 'laboratory' ? 'active' : ''} onClick={() => setTabActive('laboratory')}>
                                                        <Link to="#">
                                                            <div className="img-holder">
                                                                <img src="./assets/img/BNH/img3.jpeg" alt="Awesome Image"/>
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
                                                        <h3>laboratory</h3>
                                                    </li>
                                                </ul> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section> 
                    )
                } else {
                    return (
                        <section className="service-area">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="img-holder">
                                            <img src="./assets/img/BSN/Dr. Debasis Paramanik.png" alt="Awesome Image"/>
                                            <div className="overlay-content">
                                                <p>As a tertiary referral ICU to provide state of the art care with the help of very good professionals and infrastructure.</p>  
                                            </div>    
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="text-holder">
                                            <div className="tab-box">
                                                <div className="tab-content">
                                                    <div className={`tab-pane ${tabActive === 'IPD' ? 'active' : ''}`} id="IPD">
                                                        <div className="inner-content">
                                                            <div className="sec-title">
                                                                <h1><i className='bx bx-customize' ></i> Our Best Services</h1>
                                                                <span className="border"></span>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="text-box">
                                                                        <h3>IPD</h3>
                                                                        <p>The In-Patient Department (IPD) is the hospital section where patients are admitted for treatment that requires staying overnight or longer under medical supervision. Unlike the Out-Patient Department (OPD), where patients visit for consultations and return home the same day, IPD provides continuous care.</p>
                                                                        <Link className="thm-btn" to="/services">View Services</Link>
                                                                    </div>    
                                                                </div>    
                                                                <div className="col-md-6">
                                                                    <div className="img-box">
                                                                        <img src="./assets/img/BSN/IPD.jpeg" alt="Awesome Image"/>
                                                                    </div>    
                                                                </div>    
                                                            </div>
                                                        </div>  
                                                    </div>
                                                    <div className={`tab-pane ${tabActive === 'OPD' ? 'active' : ''}`} id="OPD">
                                                        <div className="inner-content">
                                                            <div className="sec-title">
                                                                <h1>Our Best Services</h1>
                                                                <span className="border"></span>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="text-box">
                                                                        <h3>OPD </h3>
                                                                        <p>The Out-Patient Department (OPD) is a key hospital unit where patients receive medical care without being admitted overnight. It serves as the first point of contact for individuals seeking diagnosis, treatment, or follow-up care for various health concerns. OPD plays a crucial role in early detection of diseases, preventive care, and reducing hospital admissions.</p>
                                                                        <Link className="thm-btn" to="/services">View Services</Link>
                                                                    </div>    
                                                                </div>    
                                                                <div className="col-md-6">
                                                                    <div className="img-box">
                                                                        <img src="./assets/img/BSN/OPD.jpg" alt="Awesome Image"/>
                                                                    </div>    
                                                                </div>    
                                                            </div>
                                                        </div>  
                                                    </div>
                                                    <div className={`tab-pane ${tabActive === 'imaging' ? 'active' : ''}`} id="imaging">
                                                        <div className="inner-content">
                                                            <div className="sec-title">
                                                                <h1>Our Best Services</h1>
                                                                <span className="border"></span>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="text-box">
                                                                        <h3>Imaging Services</h3>
                                                                        <p>Imaging services are essential diagnostic tools in the medical field that use advanced technology to create detailed pictures of the body’s internal structures. These images help doctors diagnose, monitor, and guide treatment for a wide range of health conditions. Imaging services are non-invasive or minimally invasive, often performed on an outpatient basis</p>
                                                                        <Link className="thm-btn" to="/services?pane=imagingServices">View Services</Link>
                                                                    </div>    
                                                                </div>    
                                                                <div className="col-md-6">
                                                                    <div className="img-box">
                                                                        <img src="./assets/img/BSN/DSC_2398.jpeg" alt="Awesome Image"/>
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
                                                                        <h3>Laboratory Services</h3>
                                                                        <p>Laboratory services are a vital part of healthcare, providing tests that help doctors diagnose, monitor, and prevent diseases. Laboratory professionals analyze samples such as blood, urine, tissue, and other body fluids to deliver accurate and timely results. Laboratory services play a crucial role in early diagnosis, treatment planning ensuring better patient outcomes.</p>
                                                                        <Link className="thm-btn" to="/services?pane=laboratoryServices">View Services</Link>
                                                                    </div>    
                                                                </div>    
                                                                <div className="col-md-6">
                                                                    <div className="img-box">
                                                                        <img src="./assets/img/BSN/pathology2.jpg" alt="Awesome Image"/>
                                                                    </div>    
                                                                </div>    
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>
                                                <ul className="nav nav-tabs tab-menu">
                                                    <li className={tabActive === 'IPD' ? 'active' : ''} onClick={() => setTabActive('IPD')}>
                                                        <Link to="#">
                                                            <div className="img-holder">
                                                                <img src="./assets/img/BSN/IPD.jpeg" alt="Awesome Image"/>
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
                                                        <h3>IPD</h3>
                                                    </li>
                                                    <li className={tabActive === 'OPD' ? 'active' : ''} onClick={() => setTabActive('OPD')}>
                                                        <Link to="#">
                                                            <div className="img-holder">
                                                                <img src="./assets/img/BSN/OPD.jpg" alt="Awesome Image"/>
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
                                                        <h3>OPD</h3>
                                                    </li>
                                                    <li className={tabActive === 'imaging' ? 'active' : ''} onClick={() => setTabActive('imaging')}>
                                                        <Link to="#">
                                                            <div className="img-holder">
                                                                <img src="./assets/img/BSN/DSC_2398.jpeg" alt="Awesome Image"/>
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
                                                        <h3>Imaging Services</h3>
                                                    </li>
                                                    <li className={tabActive === 'laboratory' ? 'active' : ''} onClick={() => setTabActive('laboratory')}>
                                                        <Link to="#">
                                                            <div className="img-holder">
                                                                <img src="./assets/img/BSN/pathology2.jpg" alt="Awesome Image"/>
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
                                                        <h3>laboratory</h3>
                                                    </li>
                                                </ul> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section> 
                    )
                }
            })()}
 

            <section className="team-area pb-0">
                <div className="container">
                    <div className="sec-title">
                        <h1><i className='bx bx-medal'></i> Team of Consultants</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {renderDoctorSlide(doctors)}
                        </div>
                    </div>
                </div>
            </section> 

            <section className="welcome-area" style={{background: '#fcfcfc', borderTop: '1px solid #f0f0f0'}}>
                <div className="container">
                    <div className="sec-title">
                        <h1><span className="material-symbols-outlined notranslate">visibility</span> Our Mission & Vision</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="img-holder">
                                {compCode === BNH_ID ? 
                                <img src="/assets/img/BNH/about-us.jpeg" alt="Awesome Image"/> 
                                :
                                <img src="/assets/img/BSN/Reception-1.jpg" alt="Awesome Image"/>  
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
                                                <p>To provide affordable quality health care to patients and be an active partner in local community initiatives and contribute to its well-being and development</p>
                                                {/* <div className="text">
                                                    <p><i className='bx bxs-hand-right'></i>Idea of denouncing pleasure and praising.</p>    
                                                    <p><i className='bx bxs-hand-right'></i>Pleasure and praising pain was complete system.</p>    
                                                </div> */}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="button">
                                    <Link className="thm-btn bgclr-1" to="/services">Our Departments</Link>
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
                        <p>Good health is the foundation of a happy and fulfilling life. It means a strong body, a peaceful mind, and balanced emotions. Maintaining good health involves eating nutritious food, staying active.</p>
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

            <section className="testimonial-area">
                <div className="container">
                    <div className="sec-title mar0auto text-center">
                        <h1><i className='bx bxs-user-account'></i> What Our Patients Say</h1>
                        <span className="border"></span>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <MySlider name={'testimonial-slider'} responsive={responsive_3} dataList={testimonialSlide(testimonialList)} customSettings={{variableWidth: false, arrows: false}}/>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="welcome-area videos-area" style={{borderTop: '1px solid #f0f0f0'}}>
                <div className="container">
                    <div className="row gy-5">
                        <div className="col-md-6">
                            <div className="sec-title">
                                <h1><i className='bx bxs-videos'></i> Doctor Videos</h1>
                                <span className="border"></span>
                            </div>
                            <div className='doc-videos'>
                                {/* <MySlider name={'doctor-slider'} dataList={videoSlide(doctorsList)} customSettings={{variableWidth: false, arrows: false, slidesToShow: 1}}/> */}
                                {/* <MySlider name={'doctor-slider'} dataList={navVideoSlide(doctorsList)} responsive={responsive_4} customSettings={{variableWidth: false, arrows: false}}/> */}
                                <div className="main-slide">
                                    <Slider asNavFor={nav2} ref={slider => (sliderRef1 = slider)} arrows={true} className={'main-video-slider'} {...settings}>
                                        {videoSlide(doctorsList)}
                                    </Slider>
                                </div>
                                <div className="child-slide">
                                    <Slider asNavFor={nav1} ref={slider => (sliderRef2 = slider)} slidesToShow={4} swipeToSlide={true} focusOnSelect={true} className={'child-video-slider'} {...settings}>
                                        {navVideoSlide(doctorsList)}
                                    </Slider>
                                </div>  
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="sec-title">
                                <h1><i className='bx bx-news' ></i> Media & News</h1>
                                <span className="border"></span>
                            </div>
                            <div className='media-news'>
                                <div className="main-slide">
                                    <Slider asNavFor={nav4} ref={slider => (sliderRef3 = slider)} arrows={true} className={'main-news-slider'} {...settings}>
                                        {videoSlide(doctorsList)}
                                    </Slider>
                                </div>
                                <div className="child-slide">
                                    <Slider asNavFor={nav3} ref={slider => (sliderRef4 = slider)} slidesToShow={4} swipeToSlide={true} focusOnSelect={true} className={'child-news-slider'} {...settings}>
                                        {navVideoSlide(doctorsList)}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </section>

            {/* <section className="latest-blog-area">
                <div className="container">
                    <div className="sec-title">
                        <h1><i className='bx bx-notepad'></i> Latest From Blog</h1>
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
            </section> */}

            {/* <section className="brand-area">
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
            </section> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { compCode: state.compCode };
}

export default connect(mapStateToProps, {})(Home);