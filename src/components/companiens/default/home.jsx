import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileCard from './cards';
import { ControlledCarousel, makeAppointment, getFrom, SliderSection } from './utilities';
import { connect } from 'react-redux';
import { modalAction } from '../../../actions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Hero from '../amNursingHome/home';
import { ATINDRA_ID, BASE_URL, MEDICO_HEALTH_ID, PILLS_CURES } from '../../../constants';
import { uType } from '../../utils/utils';


function Home({ compCode, modalAction, isLoggedIn, compInfo }) {

  const history = useHistory();
  const [profileData, setProfileData] = useState({loading: true, data: [], err: {status: false, msg: ''}});

  useEffect(() => {
    getProfileData(compCode);                               
  },[compCode]);  

  const renderSliders = (data) => {
    if (data.loading) {
      return <Skeleton count={10}/>;
    } else if (data.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.length === 0) {
      return <div className='text-center my-5'><h2 className="bg-slate-200 py-3 text-red-600">NO DATA FOUND</h2></div>;
    } else {
      return <SliderSection children={<ProfileCard/>} data={data.data} id="neurology-slider" heading={'Neurology'} />;
    }
  }

  const getProfileData = async (query) => {
    const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${query}&DID=0`, {}, setProfileData);
    if (res) {
        setProfileData(res);          
    }
  }
  
  const bless_images = [
    'img/bg/bless/bg-1.jpeg',
    'img/bg/bless/bg-2.jpeg',
    'img/bg/bless/bg-5.jpeg'
  ];
  
  // const drug_house_images = [
  //   'img/bg/drugHouse/DrugHouse1.jpeg',        // Images not removed from public folder.
  //   'img/bg/drugHouse/DrugHouse2.jpeg',
  // ];

  const aiih_images = [
    'img/bg/aiih/AIIH1.jpg',
    'img/bg/aiih/AIIH2.jpg',
    'img/bg/aiih/AIIH3.jpg'
  ];

  const konar_images = [
    'img/bg/konar/konar1.jpeg',
    'img/bg/konar/konar2.jpeg',
    'img/bg/konar/konar3.jpeg'
  ];

  const parbati_images = [
    'img/bg/parbati/parbati1.jpeg'
  ]

  const uma_images = [
    'img/bg/uma/uma1.jpeg'
  ]

  const carousel_images = [
    'img/features/feature-01.jpg',
    'img/features/feature-03.jpg',
    'img/features/feature-06.jpg',
    'img/features/feature-04.jpg'
  ];
  
  const sabita_images = [
    'img/bg/sabita/sabita1.jpeg',
    'img/bg/sabita/sabita2.jpeg',
    'img/bg/sabita/sabita3.jpeg',
    'img/bg/sabita/sabita4.jpeg'
  ];
  
  const NewLif_images = [
    'img/bg/newLife/NewLif1.jpeg',
    'img/bg/newLife/NewLif2.jpeg',
    'img/bg/newLife/NewLif3.jpeg',
  ];

  const drishti_images = [
    'img/bg/drishti/drishti_1.jpeg',
    'img/bg/drishti/drishti_2.jpeg',
    'img/bg/drishti/drishti_3.jpeg',
    'img/bg/drishti/drishti_4.jpeg',
    'img/bg/drishti/drishti_5.jpeg',
    'img/bg/drishti/drishti_6.jpeg',
    'img/bg/drishti/drishti_7.jpeg'
  ];

  // const am_nursing_home_images = [
  //   'img/bg/drishti/drishti_1.jpeg',
  //   'img/bg/drishti/drishti_2.jpeg',
  //   'img/bg/drishti/drishti_3.jpeg',
  //   'img/bg/drishti/drishti_4.jpeg',
  //   'img/bg/drishti/drishti_5.jpeg',
  //   'img/bg/drishti/drishti_6.jpeg',
  //   'img/bg/drishti/drishti_7.jpeg'
  // ];

  const atindra_images = [
    'img/bg/atindra/atindra_1.jpeg',
    'img/bg/atindra/atindra_2.jpeg',
    'img/bg/atindra/atindra_3.jpeg',
  ];

  const renderBanner = () => {
    if (compCode === '4K%2Bip4H91KicEh1TMAw9Rw==') {
        return <ControlledCarousel data={bless_images} interval={2000} controls={false}/>; 
    }
    //  else if (compCode === 'Bv0gqRzSyTew7ShrfYGU9A==') {
    //     return <ControlledCarousel data={drug_house_images} interval={2000} controls={false}/>;
    // }
     else if (compCode === 'FDCukgURZyZHT27khrMMvw==') {
        return <ControlledCarousel data={aiih_images} interval={2000} controls={false}/>;
    } else if (compCode === 'b2F%2B3sGtvEzoUKp9S0w%2BCQ==') {
        return <ControlledCarousel data={konar_images} interval={2000} controls={false}/>;
    } else if (compCode === 'oe1ijNSpv7owBqEzXpB79w==') {
        return <ControlledCarousel data={parbati_images} interval={2000} controls={false}/>;
    } else if (compCode === 'PN09B97iCVwCjr/ENAIRIQ==') {
        return <ControlledCarousel data={uma_images} interval={2000} controls={false}/>;
    } else if (compCode === 'T3ejR0xi6tnbln/ChvC1Qg==') {
      return <ControlledCarousel data={sabita_images} interval={2000} controls={false}/>;
    } else if (compCode === '909NTpLAcY/Uq023SuQt2g==') {
      return <ControlledCarousel data={NewLif_images} interval={2000} controls={false}/>;
    } else if (compCode === '7o4TiZg3g39PcnSFOaoLzg==') {
      return <ControlledCarousel data={drishti_images} interval={2000} controls={false}/>;
    } else if (compCode === ATINDRA_ID) {
      return <ControlledCarousel data={atindra_images} interval={2000} controls={true} imgClasses={'w-100 mt-lg-5'}/>;
    } else {
        return <ControlledCarousel data={carousel_images} interval={2000} controls={false}/>
    }
  }

  const renderHeroSection = () => {
    if (compCode === 'MjLxadrssyExUU7EojuDtw==') {                           // Am nursing home.
      return <Hero/>;
    } else {
      return (
        <div className='row pb-3'>
            <div className='col col-12 col-lg-5 order-2 order-lg-1'>
              <div className={`block ps-lg-5 ${compCode === '4K%2Bip4H91KicEh1TMAw9Rw==' ? 'pt-0' : ''}`} style={{fontSize: '1.6rem'}}>
                <div className="divider mb-2 mb-lg-3"></div>
                <h3 className="text-uppercase letter-spacing d-block d-md-none text-background text-info">{compInfo.COMPNAME}</h3>
                <span onClick={() => modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT})} className="text-uppercase text-sm letter-spacing" style={{color: '#008bff'}}>A Total Health care solution</span>
                <h1 className="my-2 my-lg-3 text-background">Your most trusted health partner</h1>

                <p className="pr-5" style={{fontSize: '1em', color: '#2a2a2a', marginBottom: '2.9rem', fontFamily: 'Lato', lineHeight: '1.6em'}}><i className="fa-solid fa-house-medical"></i>
                    {  
                      compCode === '4K%2Bip4H91KicEh1TMAw9Rw==' ?
                      'The facility brings together an expert team of superspecialist doctors who work together with a compassionate nursing staff to provide patients accurate diagnosis and medical care. This hospital has high-end technological infrastructure and medical facilities including advanced Operation Theatres, Digital X-Ray, and  intensive Care Units.' :
                      'The facility brings together an expert team of superspecialist doctors who work together with a compassionate nursing staff to provide patients accurate diagnosis and medical care.'
                    }
                  </p>
                <div className="btn-container ">
                  <span onClick={() => makeAppointment(isLoggedIn, modalAction, true, uType.PATIENT, history)} className="btn btn-main-2 btn-round-full">MAKE APPOINTMENT <i className='bx bx-chevron-right ms-2 ps-2 text-[1.5em] align-bottom'></i></span>
                </div>
              </div>
            </div>
            <div className='col col-12 col-lg-7 order-1 order-lg-2'>
              {renderBanner()}                        
            </div>
        </div>
      )
    }
  }

  return (
    <div className='default-global bg-white'>
        <section className='section carousel-section pt-2 pt-lg-4 hospital-banner'>
            <div className="container-fluid" id='home_carousel'>
                {renderHeroSection()}
                <div className='row features bg-blue-50' style={{borderTop: '1px solid #cfcfcf75', borderBottom: '1px solid #cfcfcf75'}}>
                  <div className="col-lg-12 d-flex justify-content-center">
                    <div className="feature-block d-lg-flex" style={{maxWidth: '110rem', fontSize: '1.6rem'}}>
                      <div className="feature-item mb-4 mb-lg-0" style={{borderColor: '#00ef55'}}>
                        <div className="feature-icon mb-4">
                          <i style={{color: '#00df4f'}} className='bx bx-bookmark-alt-plus'></i>
                        </div>
                        <span>24 Hours Service</span>
                        <h4 className="mb-3">Online Appoinment</h4>
                        <p className="mb-4">Get all time support for emergency.We have introduced the principle of family medicine.</p>
                        <span onClick={() => makeAppointment(isLoggedIn, modalAction, true, uType.PATIENT, history)} className="btn btn-main btn-round-full">Make a appoinment</span>
                      </div>

                      <div className="feature-item mb-4 mb-lg-0" style={{borderColor: '#ff4b83'}}>
                        <div className="feature-icon mb-4">
                          <i className='bx bx-time-five'></i>
                        </div>
                        <span>Timing schedule</span>
                        <h4 className="mb-3">Working Hours</h4>
                        <ul className="w-hours list-unstyled">
                          {(() => {
                            if (compCode === MEDICO_HEALTH_ID) {
                              return (
                                <>
                                  <li className="d-flex justify-content-between">Mon - Sat : <span>8am - 10pm</span></li>
                                  <li className="d-flex justify-content-between">Sunday : <span>8am - 8pm</span></li>
                                </>
                              )
                            } else if (compCode === PILLS_CURES) {
                              return (
                                <>
                                  <li className="d-flex justify-content-between">Mon - Sat : <span>8am - 8pm</span></li>
                                  <li className="d-flex justify-content-between">Sunday : <span>9am - 4pm</span></li>
                                </>
                              )
                            } else {
                              return (
                                <>
                                  <li className="d-flex justify-content-between">Sun - Wed : <span>8:00 - 17:00</span></li>
                                  <li className="d-flex justify-content-between">Thu - Fri : <span>9:00 - 17:00</span></li>
                                  <li className="d-flex justify-content-between">Sat - sun : <span>10:00 - 17:00</span></li>
                                </>
                              )
                            }
                          })()}
                        </ul>
                      </div>

                      <div className="feature-item mb-4 mb-lg-0" style={{borderColor: 'orange'}}>
                        <div className="feature-icon mb-4">
                          <i style={{color: '#ff9800'}} className='bx bx-support'></i>
                        </div>
                        <span>Emergency Support</span>
                        <h4 className="mb-0">+91 {compInfo.CONTACT1}</h4>
                        {compCode === MEDICO_HEALTH_ID && <h4 className="mb-3">+91  8100282472</h4>}
                        <p>Get all time support for emergency.We have introduced the principle of family medicine.Get Conneted with us for any urgency .</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </section>
        {/* <section className="section section-search d-none">
            <div className="container-fluid">
                <div className="banner-wrapper">
                    <div className="banner-header text-center">
                        <h1>Search Doctor, Make an Appointment</h1>
                        <p>Discover the best doctors in the city nearest to you.</p>
                    </div>
                    <div className="search-box">
                          <form action="Home/Specialists" onSubmit={handleSearchFormSubmit}>
                              <div className="form-group search-info">
                                  <input onChange={handleSearchInput} value={searchTerm} type="text" className="form-control" placeholder="Search Doctors"/>
                                  <span className="form-text">Ex : Cardiologist or Dentist etc</span>
                                  <div className="list-group" style={{overflow: 'auto', maxHeight: '10rem'}}>
                                    {searchList.map((item, index) => {
                                      return (
                                        <Link key={index} to="" onClick={() => {setSearchTerm(item.Name); setSearchList([]); userInfoAction({Doctor: item.Name, UnderDoctId: item.PartyCode});}} className="list-group-item list-group-item-action">{item.Name}</Link>
                                      )
                                    })}
                                  </div>
                              </div>
                              <button type="submit" className="btn btn-primary search-btn"><i className="fas fa-search"></i> <span>Search</span></button>
                        </form>
                    </div>
                </div>
            </div>
        </section> */}

        
        <section style={{background: 'var(--bg-1)'}}>
            <div className="section-header text-center pt-3 pt-lg-5 pb-4 m-0">
                <h2 style={{"borderBottom": "2px solid gray", "textTransform": "uppercase", "display": "inline", "letterSpacing": "3px"}}>Specialities</h2>
            </div>
            <div className="container-fluid overflow-hidden">
              {renderSliders(profileData)}
            </div>
        </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { compCode: state.compCode, isLoggedIn: state.isLoggedIn, compInfo: state.compInfo };
}

export default connect(mapStateToProps, {modalAction})(Home);
