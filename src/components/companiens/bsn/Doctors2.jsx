import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ConnectedDoctorCard } from "./utils/cards";
import { getFrom, Pagination } from "../default/utilities";
import { ErrorCard } from "../default/cards";
import Skeleton from "react-loading-skeleton";
import qs from 'query-string';
import { connect } from "react-redux";
import { BASE_URL } from "../../../constants";

export const getDoctors = async (companyCode, specialistId, setState, signal='') => {                      
    if (!companyCode) return console.log('no companyCode received');                  
    // const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&type=INTDOCT&prefixText=&Specialist=${specialistId}&Sdate=&Area=&Pin=&LowerFeesRange=&UpperFeesRange=`, {}, setState);
    const res = await getFrom(`${BASE_URL}/api/Values/GetAllDoctors?CID=${companyCode}&SID=${specialistId}`, {}, setState, signal);
    if (res) {
        setState(res);
    } else {
        console.log('No data received');
    }
}

const Doctors = ({ compCode, isMobile }) => {

    const [tabActive, setTabActive] = useState(0);
    
    const location = useLocation();
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 
    const deptId = queryString.deptId;
    const [filterActive, setFilterActive] = useState(false); 

    const [activePage, setActivePage] = useState(1);
    let visibleItems = 20;


    const [departmentData, setDepartmentData] = useState({loading: true, data: [], err: {status: false, msg: ''}});
    const [doctors, setDoctors] = useState({loading: true, data: [], err: {status: false, msg: ''}});

    const getDepartmentsList = async (companyCode) => {
        if (!companyCode) return console.log('no companyCode received');
        const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&P1=0`, {}, setDepartmentData);
        if (res) {
          setDepartmentData(res);
        }
    }
    
    useEffect(() => {
        let controller1 = new AbortController();
        let deptIdNumber = parseFloat(deptId);
        let isValidId = isNaN(deptIdNumber);
        if (!isValidId) setTabActive(deptIdNumber);
        getDoctors(compCode, !isValidId ? deptIdNumber : 0, setDoctors, controller1.signal);
        getDepartmentsList(compCode);
        return () => controller1.abort();
    },[])  
    
    const handleSelect = (id) => {
        let controller2 = new AbortController();
        getDoctors(compCode, id, setDoctors, controller2.signal);
        setActivePage(1);
        setTabActive(id);
        return () => controller2.abort();
    }

    const renderDepartments = (data) => {
        if (data.loading) {
            return <div className='w-100'><Skeleton count={10}/></div>;
          } else if (data.err.status) {
            return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`} />
          } else if (data.data.length === 0) {
            return <div className='text-center my-5 w-100'><h2 className="text-info mark">No Departments found</h2></div>;
          } else {
            return data.data.map(i => (
                <li key={i.SubCode} className={tabActive === i.SubCode ? 'active' : '' }><Link to="#" onClick={() => {handleSelect(i.SubCode); setFilterActive(false)}}>{i.Description}</Link></li>
            ))
        }
    }

    const renderDoctors = (data) => {
        if (data.loading) {
            return <div className='w-100'><Skeleton count={10}/></div>;
          } else if (data.err.status) {
            return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`} />
          } else if (data.data.length === 0) {
            return <div className='text-center my-5 w-100'><h2 className="text-info mark">No Doctors found</h2></div>;
          } else {
            return data.data.slice((activePage-1)*visibleItems, activePage*visibleItems).map(i => (
                <div className="col-xs-12 col-md-6 col-lg-4 col-xl-3" key={i.PartyCode} style={{fontSize: '0.87em'}}>
                    {isMobile ? 
                        <ConnectedDoctorCard myClass={'type-sm'} data={i} specialistId={i.SpecialistId} type="list" />
                        : 
                        <ConnectedDoctorCard myClass={'type-sm'} data={i} specialistId={i.SpecialistId} />
                    }
                </div>
            ))
        }
    }

    // const getCategoryDoctor = () => {
    //     if (!doctors.data.length) return [];
    //     let catDoctors = doctors.data.filter(i => i.SubCode === tabActive);
    //     console.log(catDoctors);    
    //     return catDoctors.length ? catDoctors : [];
    // }

    // console.log(getCategoryDoctor());
    
    return (
        <div className="bsn-global doctors-page">
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>Our Doctors</h1>
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
                                        <li className="active">Our Doctors</li>
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

            <section className="team-area doctor doctor-page-area">
                <div className="container">
                    <div className="row">
                        <div className='col-md-3'>
                            <h4 onClick={() => setFilterActive(!filterActive)} className='d-flex justify-content-end align-items-start gap-3 pb-2 mt-1 mb-3 d-md-none text-uppercase' style={{borderBottom: '1px solid #dddddd'}}>Filter By Specialists <i className='bx bxs-down-arrow'></i></h4>
                            <div className={`p-3 p-lg-0 hide-on-mobile ${filterActive ? `show` : ''}`} style={{fontSize: '0.85em'}}>
                                <ul className="nav nav-tabs tab-menu">
                                    {renderDepartments(departmentData)}
                                    {/* <li className={tabActive === 'cardiologist' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('cardiologist')}>Cardiologist</Link></li>
                                    <li className={tabActive === 'gynaecologist' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('gynaecologist')}>Gynaecologist</Link></li>
                                    <li className={tabActive === 'neurologist' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('neurologist')}>Neurologist</Link></li>
                                    <li className={tabActive === 'ophthalmologist' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('ophthalmologist')}>Ophthalmologist</Link></li>
                                    <li className={tabActive === 'paediatrician' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('paediatrician')}>Paediatrician</Link></li>
                                    <li className={tabActive === 'practitioner' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('practitioner')}>General Practitioner</Link></li> */}
                                </ul>   
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className={`tab-pane active`}>
                                    <div className="row gx-3">
                                        {renderDoctors(doctors)}
                                    </div>
                                </div>
                            </div>
                            <style>
                                {`.page-link { padding: 0.4em 0.8em !important;}`}
                            </style>
                            <Pagination activePage={activePage} setActivePage={setActivePage} visibleItems={visibleItems} data={doctors.data}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const mapStateToDoctors = (state) => {
    return { isMobile: state.isMobile }
}

export default connect(mapStateToDoctors, {})(Doctors);