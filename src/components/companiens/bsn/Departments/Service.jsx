import { Link, useLocation, useParams } from "react-router-dom";
import { ConnectedDoctorCard } from "../utils/cards";
// import { doctorsList } from "../utils/utilities";
import { useEffect, useState } from "react";
import { getDoctors } from "../Doctors2";
import { connect } from "react-redux";
import qs from 'query-string';

export let depImages = {
    cardiology : ['CARDIOLOGY.png', 'CARDIOLOGY.jpg'],      // 'tab-content-4.jpg', 'tab-content-1.jpg', 'tab-content-3.jpg', 'tab-content-5.jpg'
    orthopedics: ['orthopaedic.jpg'],   
    genSurgery : ['DSC_9587.jpeg', 'DSC_9596.jpeg', 'DSC_9597.jpeg'], 
    pediatrics: ['PEDIATRICS.jpg'],
    neurology : ['DSC_2256-deparment.jpg', 'DSC_2218.jpeg', '10. CT SCAN.JPG', 'DSC_2217-deparment.jpg', 'DSC_2214-deparment.jpg'],
    nephrology: ['Nephrology.jpeg'],
    criticalCare: ['Critical Care 1.jpg', 'Critical Care 2.jpg', 'Critical Care 3.jpg'],
    // criticalCare: ['DSC_9652.jpg', 'DSC_2349-department.jpg', 'DSC_2347-department.jpg', 'DSC_9654-department.jpg'],
    urology: ['Urology-1.jpg'],
    obsGyne: ['OBS & Gyne.jpg'],
    emergency: ['Emergency-service.jpg'],
    ICU_SDU: ['icu sdu.jpg'],
    emergencySurgeries: ['DSC_9587.jpeg'],
    oncology: ['Oncology_2.jpeg', 'Oncology.png'],
    ent: ['ENT.png'],
    usg: ['USG.jpg'],
    holterMonitor: ['holter.png'],
    echo: ['Echo-2.jpg', 'DSC_2239.jpg'],
    ecg: ['ECG.jpg'],
    xRay: ['DSC_2398.jpeg'],
    eeg: ['EEG.jpg'],
    emg: ['EMG.jpg'],
    ncv: ['NCV.jpg'],
    pft: ['pulmonary_function.jpeg'],
    uroflowmetry: ['Digital x-ray..jpg'],
    ctScan: ['DSC_2218.jpeg'],
};

export const departments = {
    cardiology: { title: 'Cardiology', mainImg: 'CARDIOLOGY.png', link: 'cardiology', images: depImages.cardiology, deptId: '19654' },
    obsGyne: { title: 'Obstetrics & Gynecology', mainImg: 'OBS & Gyne.jpg', link: 'obsGyne', images: depImages.obsGyne, deptId: '19671' },
    urology: { title: 'Urology', mainImg: 'Urology-1.jpg', link: 'urology', images: depImages.urology, deptId: '19666' },
    neurology: { title: 'Neurology', mainImg: 'DSC_2218.jpeg', link: 'neurology', images: depImages.neurology, deptId: '19662' },
    nephrology: { title: 'Nephrology', mainImg: 'Nephrology.jpeg', link: 'nephrology', images: depImages.nephrology, deptId: '19663' },
    orthopedics: { title: 'Orthopaedics', mainImg: 'orthopaedic.jpg', link: 'orthopedics', images: depImages.orthopedics, deptId: '19659' },
    pediatrics: { title: 'Pediatrics', mainImg: 'PEDIATRICS.jpg', link: 'pediatrics', images: depImages.pediatrics, deptId: '19660' },
    // obstetrics: { title: 'Obstetrics', mainImg: 'OBS & Gyne.png', link: 'obstetrics', images: depImages.obstetrics },
    genSurgery: { title: 'General Surgery', mainImg: 'DSC_9587.jpeg', link: 'genSurgery', images: depImages.genSurgery, deptId: '19657' },
    criticalCare: { title: 'Critical Care', mainImg: 'Critical Care 1.jpg', link: 'criticalCare', images: depImages.criticalCare },
    // emergency: { title: 'Emergency Services', mainImg: 'Emergency-service.jpg', link: 'emergency', images: depImages.emergency },
    // ICU_SDU: { title: 'ICU sdu & gen-WARD', mainImg: 'icu sdu.jpg', link: 'ICU_SDU', images: depImages.ICU_SDU },
    // emergencySurgeries: { title: 'Emergency Surgeries', mainImg: 'DSC_9587.jpeg', link: 'emergencySurgeries', images: depImages.emergencySurgeries },
    oncology: { title: 'Oncology', mainImg: 'Oncology_2.jpeg', link: 'oncology', images: depImages.oncology, deptId: '19665' },
    ent: { title: 'ENT', mainImg: 'ENT.png', link: 'ent', images: depImages.ent, deptId: '19661' },
    usg: { title: 'USG with colour Doppler.', mainImg: 'USG.jpg', link: 'usg', images: depImages.usg, deptId: '' },
    holterMonitor: { title: 'Holter Monitor', mainImg: 'holter.png', link: 'holterMonitor', images: depImages.holterMonitor, deptId: '' },
    echo: { title: 'Echocardiography (Echo)', mainImg: 'Echo-2.jpg', link: 'echo', images: depImages.echo, deptId: '' },
    ecg: { title: 'ECG (Electrocardiogram)', mainImg: 'ECG.jpg', link: 'ecg', images: depImages.ecg, deptId: '' },
    xRay: { title: 'Digital X-ray', mainImg: 'DSC_2398.jpeg', link: 'xRay', images: depImages.xRay, deptId: '' },
    eeg: { title: 'EEG (Electroencephalogram)', mainImg: 'EEG.jpg', link: 'eeg', images: depImages.eeg, deptId: '' },
    emg: { title: 'EMG (Electromyography)', mainImg: 'EMG.jpg', link: 'emg', images: depImages.emg, deptId: '' },
    ncv: { title: 'NCV', mainImg: 'NCV.jpg', link: 'ncv', images: depImages.ncv, deptId: '' },
    pft: { title: 'PFT (Pulmonary Function Test) ', mainImg: 'pulmonary_function.jpeg', link: 'pft', images: depImages.pft, deptId: '' },
    uroflowmetry: { title: 'Uroflowmetry', mainImg: 'Digital x-ray..jpg', link: 'uroflowmetry', images: depImages.uroflowmetry, deptId: '' },
    ctScan: { title: 'CT Scan', mainImg: 'DSC_2218.jpeg', link: 'ctScan', images: depImages.ctScan, deptId: '' },
}
    
const Service = ({ match, compCode, compInfo }) => {

    const params = match.params;
    const service = params.service;
    const location = useLocation();
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 
    const specialistId = queryString.deptId;

    const [active, setActive] = useState('cardiology');
    const department = departments[active];
    const [activeSlide, setActiveSlide] = useState('');
    const [relateDoctors, setRelatedDoctors] = useState({loading: true, data: [], err: {status: false, msg: ''}});

    useEffect(() => {
        if (!specialistId) {
            setRelatedDoctors(pre => ({...pre, data: []}));
            return;
        }
        getDoctors(compCode, specialistId, setRelatedDoctors);
	}, [compCode, specialistId])

    useEffect(() => {
        if (!departments[service]) return;
        setActive(service);
        // let x = Math.round(Math.random() * 4);
        // setActiveSlide(department.images[x]);
        setActiveSlide(department.mainImg);
    }, [service, department])

    return (
        <div className="bsn-global">
            <style>{`
                p {
                    font-weight: 400;
                }
            `}</style>
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>{department.title}</h1>
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
                                        <li><Link to="/">Home</Link></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        {/* <li><Link to="/services">Department</Link></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li> */}
                                        <li className="active">{department.title}</li>  
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

            <section id="departments-single-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12 pull-right">  
                            <div className="tab-box">
                                <div className="tab-content">
                                    {Object.values(departments).map(i => (
                                        <div className={`tab-pane ${i.link === department.link ? 'active' : ''}`} key={i.link}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="img-box">
                                                        <img className="w-100" src={`/assets/img/BSN/${activeSlide}`} alt="Awesome Image"/>
                                                    </div>    
                                                </div>      
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <ul className="nav nav-tabs tab-menu">
                                    {department.images.length > 1 && department.images.map(image => (
                                        <li className={activeSlide === image ? 'active' : ''} key={image} onClick={() => setActiveSlide(image)}>
                                            <a href="#" data-toggle="tab">
                                                <div className="img-holder">
                                                    <img src={`/assets/img/BSN/${image}`} alt="Awesome Image"/>
                                                    <div className="overlay-style-one">
                                                        <div className="box">
                                                            <div className="content">
                                                                <div className="iocn-holder">
                                                                    <span className="flaticon-plus-symbol"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {(() => {
                                if (service === 'genSurgery') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>General surgery is a surgical specialty focused on the surgical treatment of a wide range of conditions affecting various parts of the body, particularly the abdomen, breast, skin, and endocrine system. It encompasses both common and complex surgical procedures, including those for the digestive tract, hernias, and injuries. </p>
                                                <p>Our hospital has experienced general surgeon and we have performed several major surgeries regularly. We perform laparoscopic surgeries, open surgery and other scope-guided procedures to treat patients.</p>
                                            </div> 
                                            <div className="pricing-box pb-4">
                                                <div className="row">
                                                    <div className="col-md-6 pe-0">
                                                        <div className="single-box">
                                                            <h3 style={{background: 'var(--clr-2)', color: 'white'}}>Major Surgeries</h3>
                                                            <ul>
                                                                <li><i class='bx bxs-circle'></i>LAPROSCOPIC CHOLECYSTECTOMY</li>
                                                                <li><i class='bx bxs-circle'></i>LAPROSCOPIC APPENDICECTOMY</li>
                                                                <li><i class='bx bxs-circle'></i>LAAPROSCOPIC HERNIA REPAIR</li>
                                                                <li><i class='bx bxs-circle'></i>SKIN GRAFTING + FASCIOTOMY</li>
                                                                <li><i class='bx bxs-circle'></i>FISSURECTOMY AND HAEMORRHOIDECTOMY</li>
                                                                <li><i class='bx bxs-circle'></i>THYROIDECTOMY</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 ps-0">
                                                        <div className="single-box">
                                                            <h3 className="d-none d-md-block" style={{background: 'var(--clr-2)', color: 'white'}}>&nbsp;</h3>
                                                            <ul>
                                                                <li><i class='bx bxs-circle'></i>GASTOJEJUNOSTOMY AND VAGOTOMY</li>
                                                                <li><i class='bx bxs-circle'></i>BREAST LUMP / FIBROADENOMA EXCISION</li>
                                                                <li><i class='bx bxs-circle'></i>HYDROCELE EXCISION </li>
                                                                <li><i class='bx bxs-circle'></i>ORCHIDECTOMY</li>
                                                                <li><i class='bx bxs-circle'></i>MASTECTOMY</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </>
                                    )
                                } else if (service === 'orthopedics') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Orthopedic surgery is the branch of surgery concerned with conditions involving the musculoskeletal system and that treats conditions affecting the bones, muscles, and joints.</p>
                                                <p>Bankura Seva Niketan Hospital has highly skilled specialist doctors in this field. Over the last thirty years, we have successfully completed numerous major Orthopedic surgeries at our hospital. Only In the last one year, we have successfully completed more than 600+ orthopedic surgeries including major joint replacement surgery.</p>
                                            </div>
                                            <div className="pricing-box pb-4">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="single-box">
                                                            <h3 style={{background: 'var(--clr-2)', color: 'white'}}>Major Orthopedic Surgery</h3>
                                                            <ul>
                                                                <li><i class='bx bxs-circle'></i>Total Knee Replacement</li>
                                                                <li><i class='bx bxs-circle'></i>Total Hip Replacement</li>
                                                                <li><i class='bx bxs-circle'></i>Fracture of Neck Femur</li>
                                                                <li><i class='bx bxs-circle'></i>Arthroscopic reconstruction / repair -knee /- shoulder</li>
                                                                <li><i class='bx bxs-circle'></i>Antero-lateral decompression of spine & fusion with/without Costotransversectomy Spinal stabilization by posterior instrumentation with/without laminectomy/Costotransversectomy/Discectomy Amputation</li> 
                                                                <li><i class='bx bxs-circle'></i>Sequestrectomy � saucerisation in chronic osteomyelitis</li>
                                                                <li><i class='bx bxs-circle'></i>Linear/JESS External fixation long bone & small bone Open/Closed reduction of fracture of long bone(femur, tibia, febula,forearm, hemerus, clavicle,calcanium)/dislocation major joint (hip,knee,ankle,shoulder, elbow)/fracture dislocation of major above bone and joint with/without internal fixation</li> 	
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                } else if (service === 'urology') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Urology is the branch of medicine that focuses on surgical and medical diseases of the urinary system and the reproductive organs. Organs under the domain of urology include the kidneys, adrenal glands, ureters, urinary bladder, urethra, and the male reproductive organs.</p>
                                                <p>Our hospital has experienced urologists and we have performed several major surgeries. We perform laparoscopic surgeries, laser-assisted surgeries and other scope-guided procedures to treat patients.</p>
                                            </div>
                                            <div className="pricing-box pb-4">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="single-box">
                                                            <h3 style={{background: 'var(--clr-2)', color: 'white'}}>Major Surgeries</h3>
                                                            <ul>
                                                                <li><i class='bx bxs-circle'></i>Ureteroscopic Stone Removal</li>
                                                                <li><i class='bx bxs-circle'></i>VVF Repair</li>
                                                                <li><i class='bx bxs-circle'></i>Urethral Reconstruction</li>
                                                                <li><i class='bx bxs-circle'></i>Urethroplasty</li>
                                                                <li><i class='bx bxs-circle'></i>Transurethral Resection of the Prostate</li>
                                                                <li><i class='bx bxs-circle'></i>Transurethral Resection of Bladder Tumor</li>
                                                                <li><i class='bx bxs-circle'></i>DORMIA EXTRACTION OF CALCULUS</li>
                                                                <li><i class='bx bxs-circle'></i>HYDROSPADIUS</li>
                                                                <li><i class='bx bxs-circle'></i>PERCUTANEOUS NEPHRO LITHOTOMY</li>
                                                                <li><i class='bx bxs-circle'></i>NEPHROLITHOTOMY & PYELOLITHOTOMY</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                } else if (service === 'cardiology') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Cardiology is the branch of medicine that deals with the diagnosis, treatment, and prevention of heart and blood vessel disorders. It encompasses everything from congenital heart defects and coronary artery disease to heart failure, arrhythmias, and valvular diseases.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-se pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Our core medical areas of cardiology</h1>
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
                                                                                    <span className="font-semibold">Preventive Cardiology :</span> Focuses on managing risk factors like hypertension, diabetes, and high cholesterol to prevent heart disease
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
                                                                                <p><span className="font-semibold">Electrophysiology :</span> Deals with heart rhythm disorders (arrhythmias) and treatments like <span className="font-semibold">pacemaker</span> implantation.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Coronary Artery Disease (CAD)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Myocardial Infarction (Heart Attack)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Congestive Heart Failure (CHF)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>   
                                        </>
                                    )
                                } else if (service === 'nephrology') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Nephrology is a medical specialty focused on the kidneys—their structure, function, diseases, and treatments. Kidneys play a vital role in filtering blood, balancing fluids and electrolytes, regulating blood pressure, and producing hormones.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-se pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Common Kidney diseases that we treat regularly</h1>
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
                                                                                    <span className="font-semibold">Chronic Kidney Disease (CKD) -</span> Gradual loss of kidney function
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
                                                                                <p><span className="font-semibold">Glomerulonephritis :</span> – Inflammation of the kidney’s filtering units</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Nephrotic Syndrome –</span> Heavy protein loss in urine, edema</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Urinary Tract Infections (UTIs) –</span> Infections involving the kidneys (pyelonephritis)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Kidney Stones –</span> Crystalline deposits causing pain and obstruction</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Hypertensive Nephropathy –</span> Kidney damage due to chronic high blood pressure</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Diabetic Nephropathy –</span> Kidney damage from uncontrolled diabetes</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>   
                                        </>
                                    )
                                } else if (service === 'neurology') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Neurology is the branch of medicine that deals with disorders of the brain, spinal cord, nerves, and muscles. Neurologists diagnose and treat diseases of the central and peripheral nervous systems.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Our Major Divisions of Neurology</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Clinical Neurology –</span> Diagnosis & treatment of neurological disorders.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Neurophysiology –</span> Studies electrical activity of the nervous system.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Neurocritical Care –</span> For life-threatening neurological conditions (e.g., stroke, coma).</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Pediatric Neurology –</span> Focuses on neurological issues in children.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Behavioral Neurology –</span> Deals with cognitive disorders (e.g., dementia).</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>  
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Our main focus on Common Neurological Disorders</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Stroke (CVA) –</span> Blocked or ruptured blood vessels in the brain</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Epilepsy –</span> Seizure disorders</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Parkinson’s Disease –</span> Movement disorder due to dopamine loss</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Progressive memory loss and dementia</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Migraine & Headaches</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Spinal Cord Disorders</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>    
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Our Diagnostic Tools for Neurology Treatment</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">MRI/CT Brain and Spine –</span> Imaging structures</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">EEG (Electroencephalogram) –</span> Brain wave activity</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">EMG/NCS –</span> Nerve and muscle function testing</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>    
                                        </>
                                    )
                                } else if (service === 'obsGyne') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Obstetrics & Gynecology (OB/GYN) is a combined medical specialty that focuses on the female reproductive system, pregnancy, childbirth, and postpartum care. We have highly qualified and experience gynecologist in our hospital.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Our main focus is on</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Health of the female reproductive organs</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Diagnosis and treatment of menstrual disorders</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Contraception and family planning</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Infertility evaluations</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Menopause management</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Screening and treatment of reproductive cancers</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Common surgeries: hysterectomy, laparoscopy, D&C, fibroid removal, etc.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Pregnancy care (prenatal, antenatal)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Labor and delivery</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Management of high-risk pregnancies</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Cesarean section (C-section) and vaginal delivery</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>   
                                        </>
                                    )
                                } else if (service === 'pediatrics') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Pediatrics is the branch of medicine that focuses on the health and medical care of infants, children, and adolescents, typically from birth to 18 years. Pediatricians manage the physical, behavioral, and mental health of children.</p>                                            
                                                <p>We are provide Pediatrics Medicine as well Pediatrics surgery related issues in our hospital. </p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list pt-2 pb-0 strength-sec">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Common Pediatric illnesses we treat</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Fever, cough, colds</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Asthma and allergies</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Ear infections</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Diarrhea and vomiting</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Growth and nutritional issues</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Vaccination and immunization</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Skin conditions (eczema, rashes)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Circumcision</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Pediatrics Inguinal hernias</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>   
                                        </>
                                    )
                                } else if (service === 'oncology') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Oncology is the branch of medicine that deals with the prevention, diagnosis, and treatment of cancer. We Uses chemotherapy  to treat cancer  through Medical Oncology and also Focuses on the removal of tumors and surrounding tissue during an operation through  Surgical Oncology.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Diagnostic Tools Available for Cancer Diagnosis</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p><span className="font-semibold">Biopsy</span> (gold standard)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Blood tests (tumor markers like PSA, CA-125)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Imaging (CT scan, MRI, Ultrasound)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Endoscopy and colonoscopy</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>   
                                        </>
                                    )
                                } else if (service === 'ent') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>ENT stands for Ear, Nose, and Throat. It deals with the diagnosis and treatment of disorders related to the ear, nose, throat, head, and neck.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Ear Common Conditions:</h1>
                                                                    <span className="border"></span>
                                                                   </div>
                                                                <h4 className="text-gray-600 mt-2 my-4"><i class='bx bxs-circle align-middle'></i> &nbsp;Otitis Media/Externa ,  Hearing Loss ,Tinnitus , Vertigo </h4>
                                                                <h4 className="text-gray-600 mt-2 my-4 text-md">Common Procedures: </h4>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Tympanoplasty (eardrum repair), Mastoidectomy, Cochlear Implantation</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>   
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Nose & Sinuses Common Conditions:</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Rhinitis (Allergic, Vasomotor), Sinusitis (Acute/Chronic), Nasal Polyps, Deviated Nasal Septum (DNS), Epistaxis – Nosebleeds, Anosmia/Hyposmia – Loss/reduction of smell</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>  
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0">
                                                                <h4 className="text-gray-600 mt-2 my-4"><i class='bx bxs-circle align-middle'></i> &nbsp;Common Procedures</h4>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Functional Endoscopic Sinus Surgery (FESS)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li> 
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Septoplasty</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                     <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Turbinoplasty</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section>   
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Throat & Neck Common Conditions</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Tonsillitis / Pharyngitis, Laryngitis – Voice changes, Vocal Cord Nodules/Polyps, Thyroid Disorders / Goiter, Neck Masses – Lymphadenopathy, tumors, Throat Cancer / Laryngeal Cancer</p>
                                                                            </div>
                                                                        </div>
                                                                    </li> 
                                                                </ul>   
                                                                <h4 className="text-gray-600 mt-2 my-4"><i class='bx bxs-circle align-middle'></i> &nbsp;Common Procedures</h4>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Tonsillectomy</p>
                                                                            </div>
                                                                        </div>
                                                                    </li> 
                                                                     <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Tracheostomy</p>
                                                                            </div>
                                                                        </div>
                                                                    </li> 
                                                                     <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Thyroidectomy</p>
                                                                            </div>
                                                                        </div>
                                                                    </li> 
                                                                     <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Laryngoscopy (direct/indirect)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li> 
                                                                </ul> 
                                                            </div>
                                                        </div>     
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'usg') {
                                   return (
                                    <>
                                        <div className="text-box mt-4">
                                            <h3 className="mb-3 fw-bold">{department.title}</h3>                                        
                                        </div>
                                        <section className="welcome-area overview-sec about-us-list pt-2 pb-0 strength-sec">
                                            <div className="">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="text-holder mt-0">
                                                            <div className="sec-title title">
                                                                <h1>What is an ultrasound?</h1>
                                                                <span className="border"></span>
                                                            </div>
                                                            <p>A real time imaging technique which is use to detect the cause of illness &  problem and find out the actual disease  using a high frequency sound wave and create image of organs and internal structures. Pregnancy, Abdominal, Cardiological and Musculoskeletal imaging done with ultrasound. Ultrasound done by specialist Doctor only.  </p> 
                                                        </div>
                                                    </div> 
                                                    <div className="col-12 mt-4">
                                                        <div className="text-holder mt-0">
                                                            <div className="sec-title title">
                                                                <h1>Are there any side effects?</h1>
                                                                <span className="border"></span>
                                                            </div>
                                                            <p>No known and proven side effects in Ultrasound imaging. No radiation exposure in this procedure. Totally safe for pregnancy imaging. Generally Ultrasound is non invasive. A gel is applied and a transducer is moved over the area of interest & need and capture the images of organs.  </p> 
                                                        </div>
                                                    </div>     
                                                </div>
                                            </div>    
                                        </section>   
                                    </>
                                   )
                                } else if (service === 'holterMonitor') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title} Overview</h3>
                                                <p>A Holter monitor is a portable, continuous ECG recording device that monitors a patient’s heart activity—typically over 24 to 72 hours—to detect intermittent cardiac arrhythmias or ischemic changes that may not show up on a standard ECG.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Why It’s Used</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <p>To detect transient or episodic heart problems, especially when:</p>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>The patient complains of palpitations, dizziness, syncope (fainting), or chest pain.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>ECG is normal but symptoms persist.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Evaluating the effectiveness of antiarrhythmic drugs or pacemakers.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Monitoring for silent ischemia in high-risk patients</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>  
                                                        <div className="col-12 mt-3">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>How It Works</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Small electrodes are attached to the chest.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Wires connect them to a battery-powered recorder worn on a belt or shoulder strap.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>The device records every heartbeat continuously.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>The patient is advised to maintain a symptom diary to correlate events with ECG findings</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>       
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'echo') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Echocardiography (commonly called Echo) is a non-invasive ultrasound-based imaging technique used to visualize the heart’s structure and function in real time. It evaluates chamber size, valve function, wall motion, and blood flow.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>How It Works    </h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Uses high-frequency sound waves (ultrasound).</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>The probe (transducer) sends sound waves that bounce off the heart structures.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>The returning echoes are converted into images or videos on a screen.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>      
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'ecg') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>An ECG is a non-invasive test that records the electrical activity of the heart over time using electrodes placed on the skin. It helps diagnose cardiac rhythm disorders, ischemia, electrolyte imbalance, and structural heart problems</p>                                            
                                                <p>⚫ &nbsp;The heart’s activity produces electrical impulses, which can be measured on the body surface.</p>
                                                <p>⚫ &nbsp;These signals are represented as waves and intervals on graph paper or a monitor.</p>
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Uses of ECG</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Detect arrhythmias </p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Diagnose heart attack </p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Evaluate pacemaker function</p>
                                                                            </div>
                                                                        </div>
                                                                    </li><li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Assess electrolyte imbalances</p>
                                                                            </div>
                                                                        </div>
                                                                    </li><li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Pre-op cardiac assessment</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>      
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'xRay') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Digital X-ray, or Digital Radiography (DR), is a modern form of X-ray imaging where digital sensors (instead of traditional photographic film) are used to capture, view, and store images. It offers faster processing, better image quality, and less radiation exposure.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>How It Works</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>X-rays pass through the body and are captured by a digital detector. </p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>The captured image is converted into a digital signal and displayed on a computer.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>It can be enhanced, zoomed, and shared instantly</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>      
                                                        <div className="col-12 mt-3">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Advantages of Digital X-ray</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Instant image preview (no film development needed)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Lower radiation dose than conventional X-ray</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Better image quality and contrast adjustment</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Easy image storage & retrieval (PACS – Picture Archiving and Communication System)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Eco-friendly – no chemicals or films used</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Remote sharing for teleradiology</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>   
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Safety & Radiation</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Digital X-rays use less radiation than film-based ones.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Lead shielding is used to protect sensitive body parts.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Pregnant women are advised caution unless absolutely necessary.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'criticalCare') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>Critical Care, also known as Intensive Care Medicine, involves the management of life-threatening conditions that require sophisticated organ support and continuous monitoring. Patients are usually admitted to ICU (Intensive Care Unit) or CCU (Critical Care Unit).</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Who Needs Critical Care?</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Severe infections (e.g., sepsis, septic shock)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Respiratory failure (e.g., ARDS, COPD exacerbation)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Cardiac emergencies (e.g., MI, arrhythmias, cardiac arrest)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Multi-organ failure</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Post-operative monitoring (e.g., neurosurgery, transplant)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Trauma patients</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Poisoning or drug overdose</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Acute stroke or intracranial hemorrhage</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>      
                                                        <div className="col-12 mt-3">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Systems Supported in ICU</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <div className="d-flex gap-3 flex-wrap">
                                                                    <p className="px-3 mb-0 py-2 bg-blue-50 rounded-full text-blue-700 !font-medium">Mechanical ventilation</p>
                                                                    <p className="px-3 mb-0 py-2 bg-blue-50 rounded-full text-blue-700 !font-medium">oxygen therapy</p>
                                                                    <p className="px-3 mb-0 py-2 bg-blue-50 rounded-full text-blue-700 !font-medium">Inotropes</p>
                                                                    <p className="px-3 mb-0 py-2 bg-blue-50 rounded-full text-blue-700 !font-medium">vasopressors</p>
                                                                    <p className="px-3 mb-0 py-2 bg-blue-50 rounded-full text-blue-700 !font-medium">defibrillation</p>
                                                                    <p className="px-3 mb-0 py-2 bg-blue-50 rounded-full text-blue-700 !font-medium">Temporary Pacemaker Implantation</p>
                                                                    <p className="px-3 mb-0 py-2 bg-blue-50 rounded-full text-blue-700 !font-medium">Dialysis (CRRT or HD)</p>
                                                                </div>   
                                                            </div>
                                                        </div>   
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'eeg') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>EEG is a non-invasive test that records electrical activity of the brain using electrodes placed on the scalp. It helps in evaluating and diagnosing a variety of brain disorders, especially seizure disorders.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>What Does EEG Detect?</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Brain waves (electrical impulses in the brain) </p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Helps detect abnormalities in brain activity patterns</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>      
                                                        <div className="col-12 mt-3">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Common Uses of EEG</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Epilepsy & Seizures – Most common use</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Unconsciousness or coma evaluation</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Sleep disorders (e.g., narcolepsy)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Encephalopathy (brain dysfunction)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Brain tumors or stroke</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Monitoring brain activity during surgery or in ICU</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>   
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'emg') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>EMG is a diagnostic test that evaluates the health of muscles and the motor neurons (nerves that control muscles). It helps detect neuromuscular abnormalities</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>What Does EMG Do?</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Measures electrical activity in muscles at rest and during contraction. </p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Helps determine if muscle weakness is caused by muscle problems or nerve problems.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>      
                                                        <div className="col-12 mt-3">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>When Is EMG Used?</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <p className="text-semibold text-gray-900 text-[1.4em] mt-3">⚫ It’s commonly used to diagnose:</p>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Neuropathies (e.g., diabetic neuropathy, carpal tunnel syndrome)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Radiculopathies (e.g., pinched nerve in spine)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Myopathies (e.g., muscular dystrophy, polymyositis)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Motor neuron diseases (e.g., ALS)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Nerve injuries</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>   
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Is EMG Painful?</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Slight discomfort when the needle is inserted</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Mild soreness in the tested muscles afterward.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'ncv') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>"NCV" typically stands for Nerve Conduction Velocity, which is a medical diagnostic test used to evaluate the function of the nerves—especially to detect nerve damage or dysfunction.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>NCV Test Overview:</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <p className="text-semibold text-gray-800 text-[1.2em] mt-3">⚫ &nbsp;<span className="text-dark">Purpose: </span> Measures how fast electrical signals move through your peripheral nerves</p>
                                                                <p className="text-semibold text-gray-800 text-[1.2em] mt-3 mb-3">⚫ &nbsp;<span className="text-dark">Commonly Used For Diagnosing: </span></p>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Carpal tunnel syndrome</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Peripheral neuropathy (common in diabetes)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Guillain-Barré syndrome</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Radiculopathies (e.g., due to slipped disc)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>      
                                                        <div className="col-12 mt-3">
                                                            <div className="text-holder mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>How It Works:</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Electrodes are placed on the skin over a nerve.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>A small electrical pulse is applied to stimulate the nerve</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Sensors detect the speed and strength of the signal traveling through the nerve.</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'pft') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                                <p>PFT stands for Pulmonary Function Test, a group of non-invasive tests that measure how well your lungs are working. It assesses lung volume, capacity, flow rates, and gas exchange.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Purpose of PFT:</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <p className="text-semibold text-gray-800 text-[1.2em] mt-3">⚫ &nbsp;<span className="text-dark"></span>Helps diagnose and monitor:</p>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Asthma</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Chronic Obstructive Pulmonary Disease (COPD)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Pulmonary fibrosis</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Restrictive lung diseases</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>                                                                    
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Pre-surgical lung assessment</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Occupational lung disease</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>    
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'uroflowmetry') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title} Overview</h3>
                                                <p>Uroflowmetry is a simple, non-invasive urine flow test that measures the rate, volume, and pattern of urine flow. It helps assess how well the bladder and urethra are functioning.</p>                                            
                                            </div>
                                            <section className="welcome-area overview-sec about-us-list strength-sec pt-2 pb-0">
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>Purpose of Uroflowmetry:</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <p className="text-semibold text-gray-800 text-[1.2em] mt-3">⚫ &nbsp;<span className="text-dark"></span>Used to evaluate:</p>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Urinary obstruction (e.g., enlarged prostate in men)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Urinary incontinence</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Incomplete bladder emptying</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Bladder dysfunction (neurogenic bladder)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>                                                                    
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Post-surgical follow-up (e.g., prostate or urethral surgery)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div>    
                                                         <div className="col-12">
                                                            <div className="text-holder mt-0 mt-0">
                                                                <div className="sec-title title">
                                                                    <h1>How Is It Done?</h1>
                                                                    <span className="border"></span>
                                                                </div>
                                                                <p className="text-semibold text-gray-800 text-[1.2em] mt-3">1. &nbsp; The patient urinates into a special funnel or toilet connected to a measuring device.</p>
                                                                <p className="text-semibold text-gray-800 text-[1.2em] mt-3">2. &nbsp; The device automatically records:</p>
                                                                <ul>
                                                                    <li>
                                                                        <div className="single-item">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Flow rate (mL/sec)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Voided volume (total urine passed)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Flow time</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Time to maximum flow</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>                                                                    
                                                                    <li>
                                                                        <div className="single-item ">
                                                                            <div className="icon-box">
                                                                                <i className='bx bxs-hand-right'></i>
                                                                            </div>
                                                                            <div className="text-box">
                                                                                <p>Pattern of the flow (continuous, intermittent, weak, etc.)</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>   
                                                            </div>
                                                        </div> 
                                                    </div>
                                                </div>    
                                            </section> 
                                        </>
                                    )
                                } else if (service === 'ctScan') {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title} Overview</h3>
                                                <p className="text-semibold text-gray-800 mt-3"><span className="font-bold text-[1.2em]">1.</span> &nbsp; CT scan (Computed Tomography), a medical imaging procedure which using X-Rays penetrating through our body and reconstructs images by a computer acquisition and creates detailed, cross-sectional images. CT scan done by senior Radiographer and report done by experienced specialist Doctors (Radiologists) only. </p>                                            
                                                <p className="text-semibold text-gray-800 mt-3 mb-2"><span className="font-bold text-[1.2em]">2.</span> &nbsp; Although CT scan uses ionizing radiation (X-Rays) but by the help of modern technology we provide less, appropriate, optimum dose and collimate the X-Rays to the actual area to interest. Also added there is different protocol for adult and paediatric CT scan to delivered actual dose. </p>                                            
                                                <p className="text-semibold text-gray-800">CT scan is avoided in pregnancy mother, especially in early stage. When it is very necessary to done CT scan of other parts of pregnancy mother except pelvic area, there is other way to safeguard the foetus in mother’s womb. Sometime CT scan is minimally invasive and a contrast media injected to body through vein. It is injected after proper consent and evaluation of the RFT parameters. After all there is a chance of allergic reaction in some patients.   </p>
                                                <p className="text-semibold text-gray-800 mt-3"><span className="font-bold text-[1.2em]">3.</span> &nbsp; Abdominal, Brain, Limbs, Chest, Neck and Joints imaging done in CT scan. In Contrast enhanced (CECT) scan we got details blood vessels and internal tissue characterization.  In addition of oral contrast in CECT scan we got detail imaging of gastrointestinal tract. In medical emergency cases such as CVA, RTA, Traumatic injury, etc,  CT scan will preferred.</p>
                                            </div>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <div className="text-box mt-4">
                                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                            </div>
                                        </>
                                    )
                                }
                            })()}
                            
                            {/* <div className="text-box mt-4">
                                <h3 className="mb-3 fw-bold">{department.title}</h3>
                                <p>Explain to you how all this mistaken idea of denouncing pleasure and praising pain was born wewill give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure sed rationally encounter consequences that are extremely painful.</p>
                                <p>Denouncing pleasure and praising pain was born wewill give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness rationally.</p>
                            </div>  */}
                            
                            {/* <div className="pricing-box">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="single-box">
                                            <h3>Investigation</h3>
                                            <ul>
                                                <li>Gastroscopy .......... <span>₹ 3200</span></li>
                                                <li>Colonoscopy .......... <span>₹ 1450</span></li>
                                                <li>Bronshoscopy .......... <span>₹ 2700</span></li>
                                                <li>Paratyroid Scan .......... <span>₹ 800</span></li>
                                                <li>Allergy Testing .......... <span>₹ 3850</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="single-box">
                                            <h3>Treatments</h3>
                                            <ul>
                                                <li>Paratyroid Scan .......... <span>₹ 800</span></li>
                                                <li>Allergy Testing .......... <span>₹ 3850</span></li>
                                                <li>Colonoscopy .......... <span>₹ 1450</span></li>
                                                <li>Gastroscopy .......... <span>₹ 3200</span></li>
                                                <li>Bronshoscopy .......... <span>₹ 2700</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            
                            <div className="service-plan">
                                <div className="sec-title">
                                    <h1>Our Services</h1>
                                    <span className="border"></span>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="single-box">
                                            <div className="icon-holder">
                                                <span className="material-symbols-outlined notranslate">ambulance</span>
                                            </div>
                                            <div className="text-box">
                                                <h3>24 Hrs Ambulance</h3>
                                                <p>How all this mistaken idea denoucing pleasure and praisings pain was born complete account expound.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="single-box">
                                            <div className="icon-holder">
                                                <span className="material-symbols-outlined notranslate">ramen_dining</span>
                                            </div>
                                            <div className="text-box">
                                                <h3>Food &amp; Dietry</h3>
                                                <p>There anyone who loves or pursues or to obtain pain of itself, because it is but because occasionally.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="single-box">
                                            <div className="icon-holder">
                                                <span className="material-symbols-outlined notranslate">clinical_notes</span> 
                                            </div>
                                            <div className="text-box">
                                                <h3>Special Nurses</h3>
                                                <p>Pursues or desires to obtain pain itself, because is pain, because occasionally circumstances occur procure.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="single-box">
                                            <div className="icon-holder">
                                                <span className="material-symbols-outlined notranslate">temple_hindu</span> 
                                            </div>
                                            <div className="text-box">
                                                <h3>Places of Worship</h3>
                                                <p>Undertakes laborious physical exercise, except to obtain some advantage from it but who has any right.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  */}
                            <div className="d-md-none">
                                {relateDoctors.data.length ? <RelatedDoctors doctors={relateDoctors.data} specialistId={specialistId} /> : '' } 
                            </div>
                        </div> 
                        
                        <div className="col-lg-3 col-md-4 col-sm-7 col-xs-12 pull-left">
                            <div className="departments-sidebar d-flex flex-column-reverse flex-md-column">
                                <div className="single-sidebar">
                                    <div className="title">
                                        <h3>Departments</h3>    
                                    </div>
                                    <ul className="all-departments">
                                        {Object.values(departments).map(i => (
                                            <li className={department.link === i.link ? 'active' : ''} key={i.title} onClick={() => setActive(i.link)}>
                                                <Link to={`/services/${i.link}?deptId=${i.deptId || ''}`}>{i.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div> 
                                {/* <div className="single-sidebar">
                                    <div className="title">
                                        <h3>Opening Hours</h3>    
                                    </div>
                                    <ul className="opening-time">
                                        <li>Mon to Friday: <span>09.00 to 18.00</span></li>
                                        <li>Saturday: <span>10.00 to 16.00</span></li>
                                        <li>Sunday: <span>10.00 to 14.00</span></li>
                                    </ul>
                                </div>  */}
                                <div className="single-sidebar">
                                    <div className="title">
                                        <h3>Quick Contact</h3>    
                                    </div>
                                    <div className="contact-us">
                                        <ul className="contact-info">
                                            <li>
                                                <div className="icon-holder">
                                                    <span className="material-symbols-outlined notranslate">pin_drop</span>
                                                </div>
                                                <div className="text-holder mt-0">
                                                    <h5>{compInfo.ADDRESS},<br/>PIN Code - {compInfo.PIN}</h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon-holder">
                                                    <span className="material-symbols-outlined notranslate">phone_in_talk</span>
                                                </div>
                                                <div className="text-holder mt-0">
                                                    <h5>{compInfo.CONTACT1}</h5>
                                                    <h5>{compInfo.CONTACT2}</h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon-holder">
                                                    <span className="material-symbols-outlined notranslate">forward_to_inbox</span>
                                                </div>
                                                <div className="text-holder mt-0">
                                                    <h5>&nbsp;</h5>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div> 
                            </div>    
                        </div>
                    </div>
                    <div className="d-none d-md-block">
                        {relateDoctors.data.length ? <RelatedDoctors doctors={relateDoctors.data} specialistId={specialistId} /> : '' } 
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToDoctorProfile = (state) => ({ compCode: state.compCode, compInfo: state.compInfo });

export default connect(mapStateToDoctorProfile, {})(Service);



const RelatedDoctors = ({ doctors, specialistId }) => {
    return (
        <div className="team-area doctor pt-3">
            <div className="sec-title">
                <h1>Meet Our Doctors</h1>
                <span className="border"></span>
            </div>
            <div className="row">
                {doctors.map(i => (
                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12" key={i.PartyCode}>
                        <ConnectedDoctorCard data={i} specialistId={specialistId} />
                    </div>
                ))}
            </div>
        </div>
    )
}