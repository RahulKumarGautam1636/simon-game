import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ServicesCard } from "./utils/cards";
import { MySlider, responsive_3, responsive_2 } from "./utils/utilities";
import qs from 'query-string';

const Services = () => {

    const [tabActive, setTabActive] = useState('opdAndIpd');
    const contentRef = useRef(null);

    const location = useLocation();
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 
    const tab = queryString.pane;   
    
    useEffect(() => {
        if (!tab) return;
        setTabActive(tab);
    },[])

    const scrollToContent = (event) => {     
        if (window.screen.width > 767) return;
        contentRef.current.scrollIntoView({behavior: "smooth"});
    };

    const ipdServices = [
        { id: 2, name: 'GENERAL SURGERY INCLUDING LAPAROSCOPIC SURGERIES', link: 'genSurgery', img:'DSC_9597.jpeg', deptId: '19657'},
        { id: 3, name: 'ORTHOPAEDICS', link: 'orthopedics', img:'orthopaedic.jpg', deptId: '19659'},
        { id: 4, name: 'PEDIATRICS', link: 'pediatrics', img:'PEDIATRICS.jpg', deptId: '19660'},
        { id: 5, name: 'CARDIOLOGY', link: 'cardiology', img:'CARDIOLOGY.png', deptId: '19654'},
        { id: 6, name: 'NEUROLOGY', link: 'neurology', img:'DSC_2256.jpg', deptId: '19662'},
        { id: 7, name: 'NEPHROLOGY INCLUDING DIALYSIS', link: 'nephrology', img:'Nephrology.jpeg', deptId: '19663'},
        { id: 8, name: 'UROLOGY', link: 'urology', img:'Urology-1.jpg', deptId: '19666'},
        { id: 10, name: 'OBSTETRICS & GYNECOLOGY', link: 'obsGyne', img:'OBS & Gyne.jpg', deptId: '19671'},
        { id: 11, name: 'CRITICAL CARE', link: 'criticalCare', img:'Critical Care 1.jpg', deptId: ''},
        { id: 1, name: 'GENERAL MEDICINE', link: '', img:'General-Medicine.jpg', deptId: ''},
        // { id: 9, name: 'FAMILY MEDICINE', link: '', img:'16. DOCTORS CHAMBER 2.jpg', deptId: ''}, 

        { id: 12, name: 'ENT', link: 'ent', img: 'ENT.png', deptId: '19661'},
        { id: 13, name: 'Neuro & Spine surgery', link: '', img: 'neuro-and-spine-surgery.jpg', deptId: ''},
        { id: 14, name: 'Chest medicine', link: '', img: 'Chest_Medicine.jpeg', deptId: '19656'},     // no service page.
        { id: 15, name: 'Oncology', link: 'oncology', img: 'Oncology_2.jpeg', deptId: '19665'},
        { id: 16, name: 'Gastroenterology', link: '', img: 'Gastroenterology.png', deptId: '19664'},   // no service page
        { id: 17, name: 'Neuropsychiatrist', link: '', img: 'EEG.jpg', deptId: '19667'},               // no service page
        { id: 18, name: 'Endocrinology', link: '', img: 'Endocrinology.jpg', deptId: ''},
        { id: 19, name: 'Dermatology', link: '', img: 'Dermatology.png', deptId: ''},
        { id: 20, name: 'Dental Department', link: '', img: 'Dental Department.png', deptId: ''},
        { id: 21, name: 'A.V.F. Creation', link: '', img:'AVF.jpeg', deptId: ''},
        { id: 22, name: 'Physiotherapy', link: '', img:'physiotherapy.jpg', deptId: ''},
    ]
    // const avf = [
    //     { id: 1, name: 'A.V.F. Creation', link: '', img:'AVF.jpeg', deptId: ''},
        
    // ]

    const opd = [
        // { id: 2, name: 'GYNECOLOGY & OBSTETRICS', link: 'gynecology', img:'OBS & Gyne.png', deptId: ''}, 
        { id: 3, name: 'GENERAL SURGERY', link: 'genSurgery', img:'DSC_9587.jpeg', deptId: '19657'},
        { id: 4, name: 'UROLOGY' , link: 'urology', img:'Urology-1.jpg', deptId: ''},
        // { id: 5, name: 'NEUROLOGY', link: 'neurology', img:'NEUROLOGY.webp', deptId: ''},
        // { id: 5, name: 'NEUROLOGY', link: 'neurology', img:'DSC_2214.JPG', deptId: ''},
        { id: 5, name: 'NEUROLOGY', link: 'neurology', img:'10. CT SCAN.JPG', deptId: ''},
        { id: 6, name: 'NEPHROLOGY', link: 'nephrology', img:'Nephrology.jpeg', deptId: ''},
        { id: 7, name: 'CARDIOLOGY', link: 'cardiology', img:'CARDIOLOGY.png', deptId: '19654'},
        { id: 1, name: 'GENERAL MEDICINE', link: '', img:'General-Medicine.jpg', deptId: ''},
        { id: 8, name: 'CHEST- MEDICINE', link: '', img:'Chest_Medicine.jpeg', deptId: ''},    

        ...ipdServices
    ]
    const laboratoryServices = [
        {id: 1, name: 'HAEMATOLOGY', link: '', img: 'HAEMATOLOGY.jpg', deptId: ''},
        // {id: 2, name: 'CLINICAL PATHOLOGY', link: '', img: 'CLINICAL PATHOLOGY.jpg', deptId: ''},
        {id: 2, name: 'CLINICAL PATHOLOGY', link: '', img: 'pathology2.jpg', deptId: ''},
        {id: 3, name: 'BIOCHEMISTRY', link: '', img: 'DSC_2151.jpg', deptId: ''},
        {id: 4, name: 'SEROLOGY', link: '', img: 'DSC_2158.jpg', deptId: ''},
        {id: 5, name: 'ELISA', link: '', img: 'ELISA.jpg', deptId: ''},
        {id: 7, name: 'CYTOLOGY', link: '', img: 'pathology2.jpg', deptId: ''},
        {id: 6, name: 'CLIA', link: '', img: 'CLIA.jpg', deptId: ''},
    ]

    const hourServices = [
        {id: 1, name: 'EMERGENCY DEPARTMENT', link: '', img: 'Emergency-service.jpg', deptId: ''},
        {id: 2, name: 'ICU sdu & gen-WARD', link: '', img: 'icu sdu.jpg', deptId: ''},
        // {id: 3, name: 'LAB', img: 'Picture1.png', deptId: ''},
        {id: 3, name: 'LAB', img: 'DSC_2158.jpg', deptId: ''},
        // {id: 4, name: 'X-RAY', img: 'Digital x-ray..jpg', deptId: ''},
        {id: 4, name: 'X-RAY', img: 'DSC_2398.jpeg', deptId: ''},
        // {id: 5, name: 'OPERATION THEATRE', img: 'OPERATION THEATRE.jpg', deptId: ''},
        {id: 5, name: 'EMERGENCY SURGERIES', link: 'emergencySurgeries', img: 'DSC_9587.jpeg', deptId: ''},
        {id: 6, name: 'AMBULANCE', img: 'DSC_2381.jpg', deptId: ''},
        {id: 7, name: 'PHARMACY', img: 'DSC_9636.jpeg', deptId: ''},
    ]
    const mediclProcedure = [
        {id: 1, name: 'ENDOSCOPY', img: 'ENDOSCOPY.jpeg', deptId: ''},
        {id: 2, name: 'COLONOSCOPY', img: 'COLONOSCOPY.jpeg', deptId: ''},
        {id: 3, name: 'BRONCHOSCOPY', img: 'BRONCHOSCOPY.jpeg', deptId: ''},
    ]

    const alliedServices = [
        {id: 8, name: 'PHYSIOTHERAPY', img: 'physiotherapy.jpg', deptId: ''},
        {id: 8, name: 'CANTEEN', img: 'DSC_9661.jpg', deptId: ''},
    ]

    // const neurologist = [
    //     { id: 4, name: 'Edgar Denzil', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '4.jpg' },
    //     { id: 3, name: 'Basil Andrew', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '3.jpg' },
    //     { id: 6, name: 'Garfield Feris', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '6.jpg' },
    //     { id: 1, name: 'Marc Parcival', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '1.jpg' },
    //     { id: 5, name: 'Giles Franklin', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '5.jpg' },
    //     { id: 2, name: 'Alen Bailey', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '2.jpg' },
    // ]

    // const ophthalmologist = [
    //     { id: 3, name: 'Basil Andrew', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '3.jpg' },
    //     { id: 1, name: 'Marc Parcival', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '1.jpg' },
    //     { id: 5, name: 'Giles Franklin', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '5.jpg' },
    //     { id: 6, name: 'Garfield Feris', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '6.jpg' },
    //     { id: 2, name: 'Alen Bailey', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '2.jpg' },
    //     { id: 4, name: 'Edgar Denzil', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '4.jpg' },
    // ]

    // const pediatrician = [
    //     { id: 6, name: 'Garfield Feris', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '6.jpg' },
    //     { id: 5, name: 'Giles Franklin', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '5.jpg' },
    //     { id: 4, name: 'Edgar Denzil', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '4.jpg' },
    //     { id: 3, name: 'Basil Andrew', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '3.jpg' },
    //     { id: 1, name: 'Marc Parcival', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '1.jpg' },
    //     { id: 2, name: 'Alen Bailey', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '2.jpg' },
    // ]

    // const genPractitioner = [
    //     { id: 2, name: 'Alen Bailey', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '2.jpg' },
    //     { id: 5, name: 'Giles Franklin', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '5.jpg' },
    //     { id: 6, name: 'Garfield Feris', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '6.jpg' },
    //     { id: 1, name: 'Marc Parcival', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '1.jpg' },
    //     { id: 3, name: 'Basil Andrew', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '3.jpg' },
    //     { id: 4, name: 'Edgar Denzil', place: 'Newyork', phone: '+321 567 89 0123', mail: 'Bailey@Hospitals.com', img: '4.jpg' },
    // ]
    const [ipdtab2Active, ipdsetTab2Active] = useState('ipdServices');

    // const ipdServicesSubTabs = [
    //     { id: 1, name: 'Services', link: 'ipdServices', content: ipdServices, deptId: ''},
    //     { id: 2, name: 'CTVS OR CARDIOTHORACIC', link: 'avf', content: avf, deptId: ''},
    // ]

    const [tab2Active, setTab2Active] = useState('generalServices');

    const generalServices = [
        // {id: 1, name: 'Digital x-ray.', img: 'Digital x-ray..jpg', deptId: ''},
        {id: 1, name: 'Digital x-ray.', link: 'xRay', img: 'DSC_2398.jpeg', deptId: ''},
        // {id: 2, name: 'USG with colour Doppler.', img: 'USG with colour Doppler..jpg', deptId: ''},
        {id: 2, name: 'USG with colour Doppler.', link: 'usg', img: 'USG.jpg', deptId: ''},
        // {id: 3, name: 'CT SCAN.', img: 'CT SCAN.jpg', deptId: ''},
        {id: 3, name: 'CT SCAN.', link: 'ctScan', img: 'DSC_2218.jpeg', deptId: ''},
        {id: 4, name: 'MRI.', img: 'DSC_2245-deparment.jpeg', deptId: ''},

    ]
    

    const cardiologyServices = [
        {id: 1, name: 'ECG', link: 'ecg', img: 'ECG.jpg', deptId: ''},
        {id: 2, name: 'ECHO', link: 'echo', img: 'Echo-2.jpg', deptId: ''},
        {id: 3, name: 'Holter monitor', link: 'holterMonitor', img: 'holter.png', deptId: ''},
    ]

    const neurology = [
        {id: 1, name: 'NCV', link: 'ncv', img: 'NCV.jpg', deptId: ''},
        {id: 2, name: 'EEG', link: 'eeg', img: 'EEG.jpg', deptId: ''},
        {id: 3, name: 'EMG', link: 'emg', img: 'EMG.jpg', deptId: ''},
    ]

    const urology = [
        {id: 1, name: 'Uroflowmetry', link: 'uroflowmetry', img: 'Digital x-ray..jpg', deptId: ''}
    ]

    const respiratoryServices = [
        {id: 1, name: 'Pulmonary function testing', link: 'pft', img: 'pulmonary_function.jpeg', deptId: ''}
    ]

    const imagingServicesSubTabs = [
        { id: 1, name: 'General Services', link: 'generalServices', content: generalServices, deptId: ''},
        { id: 2, name: 'Cardiology Services', link: 'cardiologyServices', content: cardiologyServices, deptId: ''},
        { id: 3, name: 'Neurology', link: 'neurology', content: neurology, deptId: ''},
        { id: 4, name: 'Urology', link: 'urology', content: urology, deptId: ''},
        { id: 5, name: 'Respiratory Services', link: 'respiratoryServices', content: respiratoryServices, deptId: ''},
    ]

    return (
        <div className="bsn-global">
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>Scope of Services</h1>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-bottom">
                    <div className="px-3 px-lg-5">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="left pull-left">
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        <li className="active">Our Services</li>
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

            <section className="team-area doctor doctor-page-area serviceSection">
                <div className="px-3 px-lg-5">
                    <div className="row">
                        <div className="col-md-3">
                            <ul className="nav nav-tabs tab-menu">
                                <li className={tabActive === 'opdAndIpd' ? 'active' : '' }><Link to="#" onClick={() => {setTabActive('opdAndIpd'); scrollToContent()}}>OPD AND IPD</Link></li>
                                {/* <li className={tabActive === 'opd' ? 'active' : '' }><Link to="#" onClick={() => {setTabActive('opd'); scrollToContent()}}>OPD</Link></li> */}
                                <li className={tabActive === 'laboratoryServices' ? 'active' : '' }><Link to="#" onClick={() => {setTabActive('laboratoryServices'); scrollToContent()}}>LABORATORY SERVICES</Link></li>
                                <li className={tabActive === 'imagingServices' ? 'active' : '' }><Link to="#" onClick={() => {setTabActive('imagingServices'); scrollToContent()}}>COMPLETE IMAGING SERVICES</Link></li>
                                <li className={tabActive === 'hourServices' ? 'active' : '' }><Link to="#" onClick={() => {setTabActive('hourServices'); scrollToContent()}}>24 HOURS SERVICES</Link></li>
                                <li className={tabActive === 'mediclProcedure' ? 'active' : '' }><Link to="#" onClick={() => {setTabActive('mediclProcedure'); scrollToContent()}}>MEDICAL PROCEDURE</Link></li>
                                <li className={tabActive === 'alliedServices' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('alliedServices')}>Allied services</Link></li>
                            </ul>   
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content" ref={contentRef}>
                                {/* <div className={`tab-pane ${tabActive === 'ipd' ? 'active' : ''}`} id="ipd">
                                    <div className="row">
                                         <div className="">
                                            <div className="tab-content">
                                                <div className={`tab-pane ${ipdtab2Active === 'ipdServices' ? 'active' : ''}`} id="ipdServices">
                                                    <div className="row">
                                                    {ipdServices.map(i => (
                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                            <ServicesCard data={i} />
                                                        </div>
                                                    ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className={`tab-pane ${tabActive === 'opdAndIpd' ? 'active' : ''}`} id="opd">
                                    <div className="row">
                                        {opd.map(i => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                <ServicesCard data={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`tab-pane ${tabActive === 'laboratoryServices' ? 'active' : ''}`} id="laboratoryServices">
                                    <div className="row">
                                        {laboratoryServices.map(i => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                <ServicesCard data={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`tab-pane ${tabActive === 'imagingServices' ? 'active' : ''}`} id="imagingServices">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <ul className="nav nav-tabs imagingServices-nav tab-menu d-flex mb-0">
                                                {imagingServicesSubTabs.map(tab => (
                                                    <li key={tab.id} className={tab2Active === tab.link ? 'active' : '' }><Link to="#" onClick={() => setTab2Active(tab.link)}>{tab.name}</Link></li>
                                                ))}
                                                {/* <li className={tab2Active === 'generalServices' ? 'active' : '' }><Link to="#" onClick={() => setTab2Active('generalServices')}>General Services</Link></li>
                                                <li className={tab2Active === 'cardiologyServices' ? 'active' : '' }><Link to="#" onClick={() => setTab2Active('cardiologyServices')}>Cardiology Services</Link></li>
                                                <li className={tab2Active === 'neurology' ? 'active' : '' }><Link to="#" onClick={() => setTab2Active('neurology')}>Neurology</Link></li>
                                                <li className={tab2Active === 'urology' ? 'active' : '' }><Link to="#" onClick={() => setTab2Active('urology')}>Urology</Link></li>
                                                <li className={tab2Active === 'respiratoryServices' ? 'active' : '' }><Link to="#" onClick={() => setTab2Active('respiratoryServices')}>Respiratory Services</Link></li> */}
                                            </ul>  
                                        </div>
                                         <div className="">
                                            <div className="tab-content">
                                                <div className={`tab-pane ${tab2Active === 'generalServices' ? 'active' : ''}`} id="generalServices">
                                                    <div className="row">
                                                        {generalServices.map(i => (
                                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                                <ServicesCard data={i} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className={`tab-pane ${tab2Active === 'cardiologyServices' ? 'active' : ''}`} id="cardiologyServices">
                                                    <div className="row">
                                                        {cardiologyServices.map(i => (
                                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                                <ServicesCard data={i} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className={`tab-pane ${tab2Active === 'neurology' ? 'active' : ''}`} id="neurology">
                                                    <div className="row">
                                                        {neurology.map(i => (
                                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                                <ServicesCard data={i} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className={`tab-pane ${tab2Active === 'urology' ? 'active' : ''}`} id="urology">
                                                    <div className="row">
                                                        {urology.map(i => (
                                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                                <ServicesCard data={i} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className={`tab-pane ${tab2Active === 'respiratoryServices' ? 'active' : ''}`} id="respiratoryServices">
                                                    <div className="row">
                                                        {respiratoryServices.map(i => (
                                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                                <ServicesCard data={i} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane ${tabActive === 'hourServices' ? 'active' : ''}`} id="hourServices">
                                    <div className="row">
                                        {hourServices.map(i => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                <ServicesCard data={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className={`tab-pane ${tabActive === 'mediclProcedure' ? 'active' : ''}`} id="mediclProcedure">
                                    <div className="row">
                                        {mediclProcedure.map(i => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                <ServicesCard data={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={`tab-pane ${tabActive === 'alliedServices' ? 'active' : ''}`} id="alliedServices">
                                    <div className="row">
                                        {alliedServices.map(i => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={i.id}>
                                                <ServicesCard data={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Services;