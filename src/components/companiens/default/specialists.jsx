import { useState, useEffect, useRef } from 'react';
import { ConnectedSpecialistPreviewCard, ErrorCard } from './cards';
import { loginStatusAction, userInfoAction, loaderAction } from '../../../actions';
import { connect } from 'react-redux';
import useScript, { getFrom, BreadCrumb, Pagination, getDatesArray, CustomOffcanvas, handleNumberInputs, sortClinicsbyUserLocation, ButtonSlider, CompanySlider, all } from './utilities';
import Form from 'react-bootstrap/Form';
import ReactSlider from 'react-slider';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { BASE_URL, BCROY_ID, BSN_ID, defaultId, SRC_URL, zero } from '../../../constants';
import { GridLoader } from '../../utils/utils';


function Specialists({ compCode, userInfo, loaderAction, userInfoAction, isMobile, compInfo }) {

  useScript('js/fancybox.umd.js');

  const scrollRef = useRef(null);
  const sliderRef = useRef();
  // const history = useHistory();

  // useEffect(() => {
  //   let controller1 = new AbortController();
  //   getCompanyTabList(compCode, userInfo.UserId, controller1.signal);
  //   return () => controller1.abort();
  // }, [compCode, userInfo.UserId])  
  
  useEffect(() => {
    setCompanyTabList(pre => ({ ...pre, loading: false, data: userInfo.companyList }));
  }, [userInfo.companyList])  

  useEffect(() => {
    userInfoAction({ Department: {dName: 'All', SubCode: 0}});
    if (userInfo.selectedCompany.EncCompanyId) {
      setActiveCompany(userInfo.selectedCompany);
    } else {
      setActiveCompany(compInfo);         // Only EncCompanyId and COMPNAME fields of activeCompany is being used that are available in reducer initialisation.
    }                                     // So don't need to worry about api delays during updating compInfo in initHeader.
  }, [userInfoAction])          

  const [departmentData, setDepartmentData] = useState({loading: true, data: [], err: {status: false, msg: ''}});            // Real department data with name and subcode in key value pairs.
  const [companyTabList, setCompanyTabList] = useState({loading: true, data: [], err: {status: false, msg: ''}});
  const [activeCompany, setActiveCompany] = useState({});  
  const [departmentsState, setDepartmentsState] = useState([]);              // List of Checkbox states where false = uncheck and true = checked state.
  const [filterDates, setFilterDates] = useState({dates: getDatesArray(new Date(), 30), activeDate: new Date().toLocaleDateString('en-TT')});
  const [activePage, setActivePage] = useState(1);
  const [filterCanvasActive, setFilterCanvasActive] = useState(false);
  const [filterValues, setFilterValues] = useState({ Pin: '', Area: '', Rating: 4, MinFee: 300, MaxFee: 5000});
  const [sliderValue, setSliderValue] = useState([300, 5000]);

  // --------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [searchKey, setSearchKey] = useState({query: '', filterBy: 'INTDOCT'});
  const [autoCompleteList, setAutoCompleteList] = useState({loading: false, data: {PartyMasterList: [], CompanyMasterList: []}, err: {status: false, msg: ''}}); 
  const [searchList3, setSearchList3] = useState({loading: true, data: {PartyMasterList: [], CompanyMasterList: []}, err: {status: false, msg: ''}}); 
  const [isListActive, setListActive] = useState(false); 

  const [upcomingDoctors, setUpcomingDoctors] = useState({loading: true, data: {PartyMasterList: [], CompanyMasterList: []}, err: {status: false, msg: ''}});
  const [activePage2, setActivePage2] = useState(1);
  
  useEffect(() => {
    const getSearchResult = async (companyCode, key) => {                      
      if (!companyCode) return alert('no companyCode received');                  
      const res = await getFrom(`${BASE_URL}/api/search/Get?CID=${companyCode}&Type=${key.filterBy}&SearchString=${key.query}`, {}, setAutoCompleteList);
      if (res) {
        setAutoCompleteList(res);
      } else {
        console.log('No data received');
      }
    }  
    const timer = setTimeout(() => {
      if (searchKey.query.length < 2) return;
      if (compCode === defaultId) {
        getSearchResult(zero, searchKey);                 // search every company if default company compCode.
      } else {
        getSearchResult(compCode, searchKey);             // search only the current company if not default company compCode.
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchKey, zero, compCode])

  useEffect(() => {
    if (!userInfo.location.latitude || !companyTabList.data.length) return;
    let sortedCompanies = sortClinicsbyUserLocation([...companyTabList.data], userInfo.location.latitude, userInfo.location.longitude, 3.4);
    if (!sortedCompanies.length) return alert('No nearby clinics found.');
    setCompanyTabList({loading: false, data: sortedCompanies, err: {status: false, msg: ''}});
  },[userInfo.location.latitude, userInfo.location.longitude])

  const handleSearchInput = (e) => {
    setSearchKey(pre => ({...pre, [e.target.name]: e.target.value}));
    setListActive(true); 
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  }
  
  useEffect(() => {
    if (!isMobile) return;
    if (!companyTabList.data.length) return;
    const activeCompanyIndex = companyTabList.data.findIndex((i => i.EncCompanyId === activeCompany.EncCompanyId));
    sliderRef.current.slickGoTo(activeCompanyIndex);
  }, [companyTabList.data])

  const handleFiltersSubmit = (e) => {
    if (!activeCompany.EncCompanyId) return;
    e.preventDefault();
    handleAdvanceFilters(); 
  }

  const visibleItems = 12;

  // const getCompanyTabList = async (companyCode, userId, signal) => {                  // on page refresh activeCompany.EncCompanyId does not exist which throws error. 
  //   if (!companyCode) return console.log('no companyCode received');                  // all api calls made with activeCompany.EncCompanyId are to be checked before making request.                       
  //   loaderAction(true);
  //   const res = await getFrom(`${BASE_URL}/api/CompMast/Get?CID=${companyCode}&UID=${userId}`, {}, setCompanyTabList, signal);
  //   loaderAction(false);
  //   if (res) {                                                                // since getLocation function is delayed by 3 secs userInfo.location remains {} during second useEffect call (due to sctrict mode).
  //     if (!userInfo.location.latitude) return setCompanyTabList(res);         // which prevents sortedCompanies to be set in setCompanyTabList. this make no issues in production mode when useEffect are called only once.
  //     let sortedCompanies = sortClinicsbyUserLocation(res.data, userInfo.location.latitude, userInfo.location.longitude, 3.4);
  //     if (!sortedCompanies.length) return setCompanyTabList(res);
  //     setCompanyTabList({loading: false, data: sortedCompanies, err: {status: false, msg: ''}});
  //   } else {
  //     console.log('No data received');
  //   }
  // }

  const getDepartmentsList = async (companyCode, signal='') => {
    if (!companyCode) return console.log('no companyCode received');
    // const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}`, {}, setDepartmentData, signal);
    const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&P1=0`, {}, setDepartmentData, signal);
    if (res) {
      let departmentsList = res.data.map(i => {
        return {dName: i.Description, sCode: i.SubCode};
      });
      setDepartmentData({loading: false, data: departmentsList, err: {status: false, msg: ''}});
      let newDepartmentsStates = new Array(departmentsList.length).fill(false);           // Create new Array and fill it with false values to imitate uncheck state of checkboxes.
      newDepartmentsStates = newDepartmentsStates.map((item, index) => {
        return userInfo.Department.dName === departmentsList[index].dName ? true : false;
      })
      setDepartmentsState(newDepartmentsStates);
    }
  }

  const handleOnChange = (position) => {
    let newDepState = departmentsState.map((item, index) => index === position ? true : false);
    setDepartmentsState(newDepState);
    let selectedDep = newDepState.indexOf(true);           // Get the index of where value is true (index of selected department).
    userInfoAction({Department: {dName: departmentData.data[selectedDep].dName, SubCode: departmentData.data[selectedDep].sCode}});         // useEffect on 216 will be triggered to get doctors.
    // force select the first company and also set Department to All whenever user searches for a doctor and then clicks any specialist departments.
    const selectedCompany = companyTabList.data.find(i => i.EncCompanyId === activeCompany.EncCompanyId);
    if (!selectedCompany) {
      setActiveCompany(companyTabList.data[0]);
      userInfoAction({ Department: {dName: 'All', SubCode: 0}, selectedCompany: companyTabList.data[0] });
    };
  };

  const renderDesktopSearchList2 = (data, activePage, visibleItems, setActivePage, label='') => {
    if (data.loading) {
      // return <div className='w-100'><Skeleton count={16}/></div>;
      return <GridLoader containerClass='gap-3 gap-md-4 mb-6 flex-wrap py-3' count={6} classes='rounded-lg h-[150px] min-w-[310px] flex-1' />;
    } else if (data.err.status) {
      return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`} />
      // return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.PartyMasterList.length === 0) {
      return <div className='text-center my-5 w-100'><h2 className="text-red-500 bg-slate-200 py-3 fs-1">NO DOCTORS FOUND {label === 'allDoctors' ? '' : 'FOR THE SELECTED DATE'}</h2></div>;
    } else {
      return (
        <>
          <div className='doc-preview-box mb-4 w-100'>
            {
              activePage ? data.data.PartyMasterList.slice((activePage-1)*visibleItems, activePage*visibleItems).map(item => (
                <div className='doc-preview' key={item.PartyCode}>                                                                 {/* if doctors compnay is not in the companyTabList then it will be handled on bookingModal. */}
                  <ConnectedSpecialistPreviewCard data={item} activeCompanyId={activeCompany.EncCompanyId} selectedDate={filterDates.activeDate} />
                </div>
              ))
              : 
              data.data.PartyMasterList.map(item => (
                <div className='doc-preview' key={item.PartyCode}>                                                                 {/* if doctors compnay is not in the companyTabList then it will be handled on bookingModal. */}
                  <ConnectedSpecialistPreviewCard data={item} activeCompanyId={activeCompany.EncCompanyId} selectedDate={filterDates.activeDate} />
                </div>
              ))
            }
          </div>
          {activePage && <Pagination activePage={activePage} setActivePage={setActivePage} visibleItems={visibleItems} data={data.data.PartyMasterList}/>}
        </>
      )
    }
  }

  const renderDepartmentData = (data) => {
    if (data.loading) {
      return <div className='w-100'><Skeleton count={15}/></div>;
    } else if (data.err.status) {
      return <ErrorCard myStyle={{fontSize: '0.8em'}} message={`An error occured, please try again later. Error code: ${data.err.msg}`}/>;
      // return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.length === 0) {
      return <div className='text-center my-5'><h2 className="text-red-500 bg-slate-200 py-3 fs-1">No Departments found</h2></div>;
    } else {
      return data.data.map((item, index) => {
        return (
          <label className="custom_check me-2 me-lg-0" key={item.sCode}>
            <input type="checkbox" name="select_specialist" checked={departmentsState[index]} onChange={() => handleOnChange(index)}/>
            <span className="checkmark"></span> {item.dName}
          </label>
        )
      })
    }
  }

  // useEffect(() => {
  //   if (userInfo.selectedCompany.EncCompanyId) return setActiveCompany(userInfo.selectedCompany);
  //   setActiveCompany(compInfo);          
  // },[compInfo, userInfo.selectedCompany.EncCompanyId])
  
  // useEffect(() => {
  //   if (!companyTabList.data.length) return;
  //   if (userInfo.selectedCompany.EncCompanyId) {
  //     setActiveCompany(userInfo.selectedCompany);     
  //   } else {
  //     alert('Something went wrong. 191');
  //   }
  // },[
  //   userInfo.selectedCompany.EncCompanyId, 
  //   // companyTabList
  // ])

  useEffect(() => {         
    if (!activeCompany.EncCompanyId) return;
    let controller2 = new AbortController();
    getSearchList3(activeCompany.EncCompanyId, userInfo.Department.SubCode, filterDates.activeDate, controller2.signal);          // refresh doctors for every change in department and active filter date.       
    return () => controller2.abort();
  }, [activeCompany.EncCompanyId, userInfo.Department.SubCode, filterDates.activeDate])

  useEffect(() => {         
    if (!activeCompany.EncCompanyId) return;
    let controller = new AbortController();
    getUpcomingDoctors(activeCompany.EncCompanyId, userInfo.Department.SubCode, controller.signal);          // refresh upcoming doctors for every change in department.       
    return () => controller.abort();
  }, [activeCompany.EncCompanyId, userInfo.Department.SubCode])

  const handleCompanySelect = (item) => {
    setActiveCompany(item);                                                                                                                // this will reset Department to All whenever user changes company.
    userInfoAction({ Department: {dName: 'All', SubCode: 0}, selectedCompany: item });
    if (activeCompany.EncCompanyId === item.EncCompanyId) getSearchList3(item.EncCompanyId, userInfo.Department.SubCode, filterDates.activeDate); 
  }

  useEffect(() => {
    let controller3 = new AbortController();
    getDepartmentsList(activeCompany.EncCompanyId, controller3.signal);
    return () => controller3.abort();
  }, [activeCompany.EncCompanyId])  

  const responsiveSlick = [
    { breakpoint: 1024, settings: { slidesToShow: 9, } },
    { breakpoint: 880, settings: { slidesToShow: 6, } },
    { breakpoint: 480, settings: { slidesToShow: 5, } }
  ]

  const onAllClick = () => alert('Not Avaialble yet..');

  const renderCompList2 = (data) => {
    if (data.loading) {
      // return <Skeleton count={3}/>
      return <GridLoader classes='h-[48px] min-w-[190px] lg:h-[60px] lg:min-w-[260px] flex-1' containerClass='gap-3' />;               
    } else if (data.err.status) {
      return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`}/>
    } else if (data.data.length === 0) {
      // return <div className='text-center my-1'><h2 className="text-red-500 bg-slate-200 py-3 fs-1 mb-0">No Company List found</h2></div>;
      return <GridLoader classes='h-[48px] min-w-[190px] lg:h-[60px] lg:min-w-[260px] flex-1' containerClass='gap-3' />;
    } else {
      const cards = data.data.map(item => (
        <div key={item.EncCompanyId}>
          <div className={`companyTabCard d-flex cursor-pointer position-relative  ${item.COMPNAME === activeCompany.COMPNAME ? 'active' : ''}`} onClick={() => handleCompanySelect(item)}>
            <img src={`${SRC_URL}/Content/CompanyLogo/${item.LogoUrl}`} className="img-fluid logo" style={{maxHeight: '1.9em', margin: '0 0.5em 0.4em 0'}}/>
            <div className=''>
              <h5 className="mb-0">{item.COMPNAME}</h5>
              <h6>{item.ADDRESS}</h6>
            </div>  
            <span className='d-flex flex-column justify-content-between h-100'><Link to={'/bedStatus'}><i className='bx bxs-bed' ></i></Link><Link to={`/patientQueue`}><i className='bx bxs-user-plus'></i></Link></span>                     
          </div>
        </div>
      ))

      const itemList = cards.length > 1 ? [all(activeCompany.COMPNAME, onAllClick), ...cards] : cards;
      return <CompanySlider dataList={itemList} myRef={sliderRef} />
    }
  }

  const breadCrumbData = {
    links: [{name: 'Home', link: '/'}, {name: 'Specialist', link: '/Specialist'}],
    activeLink: '/Specialist'
  }

  const handleDateChange = (item) => {
    const selectedCompany = companyTabList.data.find(i => i.EncCompanyId === activeCompany.EncCompanyId);
    if (!selectedCompany) {setActiveCompany(companyTabList.data[0]); userInfoAction({ selectedCompany: companyTabList.data[0] })};      // force select active.
    setFilterDates((pre) => ({...pre, activeDate: item.date}));
  }

  const tabList = () => filterDates.dates.map((item, index) => {
    return (
      <button key={item.date} type="button" id='tabButtons-1' onClick={() => handleDateChange(item)} className={`nav-item nav-link d-flex justify-content-center align-items-center notranslate ${index === 0 ? 'active' : ''} slotDate`} data-bs-toggle="tab" data-bs-target='#tabButtons-pane-1' role="tab" aria-controls='tabButtons-pane-1' aria-selected="true">
        <h5 style={{fontSize: 'clamp(1em, 3.8vw, 1.4em)', margin: '0 2px 0 0', fontWeight: 'bold'}}>{item.dateStr.split(' ')[2]}</h5>
        <div>
          <span className="p d-block mb-0 nMonth" style={{lineHeight: '1.25em', fontSize: 'clamp(0.4em, 1.9vw, 0.7em)', fontWeight: '500'}}>{item.dateStr.split(' ')[1]}</span>
          <span className="p d-block mb-0 text-capitalize nDay" style={{lineHeight: '1.2em', fontSize: 'clamp(0.4em, 1.9vw, 0.7em)', fontWeight: '500'}}>{item.dateStr.split(' ')[0]}</span>
        </div>
      </button>
    )
  })

  const filterSection = () => {
    return (
      <div style={{fontSize: '1.6rem'}}>
        <i className='bx bx-x-circle float-right-corner' style={{top: '3.5%', fontSize: '1.6em'}} onClick={() => setFilterCanvasActive(false)}></i>
        <h4 className="card-title">Advance Filters</h4>
        <form onSubmit={handleFiltersSubmit}>
          <div className="input-group mb-3">                                        
            <input type="text" name='Pin' value={filterValues.Pin} className="form-control" onChange={(e) => handleNumberInputs(e, setFilterValues)} placeholder="Filter by Pin code" maxLength={6} />
            <span className="input-group-text" id="after">Pin Code</span>
          </div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" value={filterValues.Area} onChange={(e) => setFilterValues(pre => ({...pre, Area: e.target.value}))} placeholder="Filter by Area" />
            <span className="input-group-text" id="after">Area / Region</span>
          </div>
          <h4 className="card-title">Filter By Ratings</h4>
          <div className="filter-rating-box mb-3" key={`reverse-radio`}>
            {[5, 4, 3, 2, 1].map(item => {
              return (
                <div className='d-flex align-items-center gap-2' key={item}>
                  <Form.Check label="" name="group1" type="radio" id={`reverse-radio-${item}`} checked={filterValues.Rating === item ? true : false} onChange={() => setFilterValues(pre => ({...pre, Rating: item}))} />
                  <div className='stars'>
                    {Array.from({length:item},(v,k)=>k+1).map((i, n) => (<i key={n} className='bx bxs-star'></i>))}
                  </div>
                </div>
              )
            })}
          </div>
          <h4 className="card-title mb-3">Filter By Pricing</h4>
          <ReactSlider
            value={[filterValues.MinFee, filterValues.MaxFee]}
            // onBeforeChange={(value, index) => console.log(value)}
            onChange={(value, index) => {setSliderValue(value); setFilterValues(pre => ({...pre, MinFee: value[0], MaxFee: value[1]}))}}
            // onAfterChange={(value, index) => setSliderValue(value)}
            className="pricing-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            min={300}
            max={5000}
          />
          <p className='price-values'><span>₹ {sliderValue[0]}</span><span>₹ {sliderValue[1]}</span></p>
          <button style={{marginTop: '7.8rem'}} type="submit" className="btn btn-primary d-block btnSave ms-auto fw-bold text-nowrap" tabIndex="1">APPLY FILTERS</button>
        </form>
      </div>
    )
  }

  const getDoctorCompanies = async (item, userId) => {
    setCompanyTabList({loading: true, data: [], err: {status: false, msg: ''}});   
    const res = await getFrom(`${BASE_URL}/api/search/Get?PID=${item.PartyId}&UID=${userId}`, {}, setSearchList3);
    if (res) {
      setTimeout(() => {
        let companiesList = res.data.CompanyMasterList;
        const sortedCompanies = sortClinicsbyUserLocation(companiesList, userInfo.location.latitude, userInfo.location.longitude);
        setSearchList3({loading: false, data: {PartyMasterList: [item], CompanyMasterList: []}, err: {status: false, msg: ''}});
        setCompanyTabList({loading: false, data: !userInfo.location.latitude ? companiesList : sortedCompanies, err: {status: false, msg: ''}});    
      }, 1000)
    }                                                                                                   
  } 

  const getSearchList3 = async (companyCode, query, activeDate, signal='') => {
    if (!companyCode) return console.log('no companyCode received');
    const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&type=INTDOCT&prefixText=&Specialist=${query}&Sdate=${activeDate}&Area=&Pin=&LowerFeesRange=&UpperFeesRange=`, {}, setSearchList3, signal);                                                        
    if (res) {
      setTimeout(() => {
        setSearchList3(pre => ({loading: false, data: {...pre.data, PartyMasterList: res.data}, err: {status: false, msg: ''}}));
        setActivePage(1);                           // reset pagination.
      }, 500)
    }                                                                                                   
  }  

  const getUpcomingDoctors = async (companyCode, query, signal='') => {
    if (!companyCode) return console.log('no companyCode received');                                                     
    // const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&SID=${query}&P1=0&P2=0&P3=0`, {}, setUpcomingDoctors, signal);                                                        
    const res = await getFrom(`${BASE_URL}/api/Values/GetAllDoctors?CID=${companyCode}&SID=${query}`, {}, setUpcomingDoctors, signal); 
    if (res) {
      setTimeout(() => {
        setUpcomingDoctors(pre => ({loading: false, data: {...pre.data, PartyMasterList: res.data}, err: {status: false, msg: ''}}));
        setActivePage2(1);                           // reset pagination.
      }, 500)
    }                                                                                                   
  }  

  const handleAdvanceFilters = async () => {
    if (filterValues.Area.length < 3 && !filterValues.Pin) return alert('Please enter valid keywords.');
    setFilterCanvasActive(false);
    const res = await getFrom(`${BASE_URL}/api/search/Get?PinCodeSearch=${filterValues.Pin}&AreaSearch=${filterValues.Area}&RatingSearch=${filterValues.Rating}&LowPriceRange=${filterValues.MinFee}&UpperPriceRange=${filterValues.MaxFee}`, {}, setCompanyTabList);                                                 
    if (res) {
      if (!res.data.CompanyMasterList.length) {
        setCompanyTabList({ loading: false, data: [...companyTabList.data], err: {status: false, msg: '' }});
        alert('No clinics found !');
        return;
      }
      setTimeout(() => {
        setCompanyTabList({ loading: false, data: res.data.CompanyMasterList, err: {status: false, msg: '' }});
        setActiveCompany(res.data.CompanyMasterList[0]);
        userInfoAction({ selectedCompany: res.data.CompanyMasterList[0] });
        setActivePage(1);                           // reset pagination.
      }, 1000)
    } 
  }

  const handleSelect = (item) => {
    if (searchKey.filterBy === 'INTDOCT') {
      getDoctorCompanies(item, userInfo.UserId);
    } else {
      setCompanyTabList({ loading: false, data: [item], err: {status: false, msg: '' }});
      userInfoAction({ selectedCompany: item, Department: {dName: 'All', SubCode: 0} });
      setActiveCompany(item);
    }
    setListActive(false);
  }
  
  const resetPage = () => {
    setCompanyTabList(pre => ({ ...pre, loading: false, data: userInfo.companyList }));
    setFilterValues({ Pin: '', Area: '', Rating: 4, MinFee: 300, MaxFee: 5000});
    userInfoAction({ Department: {dName: 'All', SubCode: 0}});
    getSearchList3(activeCompany.EncCompanyId, userInfo.Department.SubCode, filterDates.activeDate);
    setSearchKey({ query: '', filterBy: 'INTDOCT' });
  }

  const renderAutoComplete = () => {
    if (autoCompleteList.loading) return <Skeleton style={{fontSize: '2em'}} count={10}/>
    if (searchKey.filterBy === 'INTDOCT') {
      return autoCompleteList.data.PartyMasterList.map(i => <li key={i.PartyId} ><Link to={`#`} onClick={() => handleSelect(i)}>{i.Name}</Link></li>);
    } else {
      return autoCompleteList.data.CompanyMasterList.map(i => <li key={i.EncCompanyId} ><Link to={`#`} onClick={() => handleSelect(i)}>{i.COMPNAME}</Link></li>);
    }
  }

  const renderDocorAutoComplete = () => {
    if (autoCompleteList.loading) return <Skeleton style={{fontSize: '2em'}} count={10}/>
    if (searchKey.filterBy === 'INTDOCT') {
      return autoCompleteList.data.PartyMasterList.map(i => (
      <li key={i.PartyId} >
        <Link to={`/doctors/${i.PartyCode}?specialistId=${i.SpecialistId}`}>
          {i.Name}
          <p style={{lineHeight: '1.1', fontSize: '0.9em', marginBottom: 1}}>{i.SpecialistDesc}</p>
        </Link>
      </li>));
    }
  }

  const showAllDoctorsOnly = false;

  return (
    <div className='default-global'>
      <BreadCrumb data={breadCrumbData}/>
      {filterCanvasActive && <CustomOffcanvas isActive={true} handleClose={() => setFilterCanvasActive(false)} customclassName={'filterOffcanvas'} child={filterSection()} />}
      <div className="content pt-1 pt-lg-0">
          <div className="container-fluid overflow-hidden specialists-page">
              {compCode === defaultId && <div className="d-flex flex-column w-100 position-relative justify-content-start align-items-start flex-md-column" style={{marginTop: '0.5em', borderRadius: '7px', boxShadow: 'rgb(0 0 0 / 13%) 0px 1px 3px 0px, rgb(27 31 35 / 8%) 0px 0px 0px 1px'}}>
                  <div className="nav nav-tabs w-100 bg-white border-0" role="tablist" style={{fontSize: 'clamp(1em, 2vw, 1.15em)', padding: '0.9em 0.8em 0.8em'}}>
                    <div className="filter-widget mb-0 w-100" >
                      <div className="top-nav-search">
                        <form className='filter-form d-flex gap-2 gap-lg-3 !static' onSubmit={handleSearchSubmit}>
                          <div className='position-relative'>
                            <select className="form-select form-control" name='filterBy' value={searchKey.filterBy} onChange={handleSearchInput} aria-label="Default select" id="inputSelect" style={{lineHeight: 1, width: 'fit-content'}}>
                              <option value="INTDOCT">Doctors</option>
                              <option value="Clinics">Clinics</option>
                            </select>
                          </div>
                          <div className='' style={{width: '-webkit-fill-available', maxWidth: '24rem'}}>
                            <div style={{zIndex: '2', position: 'relative'}}>
                              <input name='query' onChange={handleSearchInput} autoComplete='off' value={searchKey.query} type="text" className="form-control" placeholder={`Search ${searchKey.filterBy === 'INTDOCT' ? 'Doctor' : searchKey.filterBy}`}/>
                              <button className="btn" type="submit"><i className="fa fa-search"></i></button>
                            </div>
                            {isListActive && <div className='search-results-1 active' style={{zIndex: 5, maxWidth: '30em', left: 'unset', left: 0}}>
                              <ul className='mb-0 !text-[1.15em] max-h-[18em] overflow-auto'>
                                  {renderAutoComplete()}
                              </ul>
                            </div>}
                            {isListActive && <span onClick={() => setListActive(false)} style={{position: 'fixed', zIndex: 1, inset: '0'}}></span>}
                          </div>
                          <div className='d-flex gap-2 gap-lg-3 ms-auto'>
                            <button type='button' onClick={() => setFilterCanvasActive(true)} className='dashboard-card__btn-box-item reverse-hover d-flex align-items-center icon-btn text-nowrap ms-auto' style={{'--clr': '#48fffc3b', '--bg': 'var(--clr-1)', '--bClr': '#149a8d57', gap: '0.3em', fontSize: '0.8em', padding: '0.3em 0.6em 0.3em', borderRadius: '3.1em'}}><i className='bx bx-filter-alt' style={{fontSize: '1.5em'}}></i> <span className='d-none d-md-inline'>Advance Filters</span></button>
                            <button type='button' onClick={resetPage} className='dashboard-card__btn-box-item reverse-hover d-flex align-items-center icon-btn text-nowrap ms-auto' style={{'--clr': '#48fffc3b', '--bg': 'var(--clr-1)', '--bClr': '#149a8d57', gap: '0.3em', fontSize: '0.8em', padding: '0.3em 0.6em 0.3em', borderRadius: '3.1em'}}><i className='bx bx-reset' style={{fontSize: '1.5em'}}></i> <span className='d-none d-md-inline'>Reset</span></button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
              </div>}
              <div className="row">
                  {/* {compCode === defaultId ?  */}
                    <div className='col-12'>
                      <div style={{padding: '0.6em 0px'}} id='companyTabs'>       
                        {renderCompList2(companyTabList)}
                      </div>
                    </div>
                   {/* :
                  <span className='pt-2 pt-lg-4 d-block'></span>
                  } */}
                  <div className="col-md-12 col-lg-4 col-xl-3">
                      <div className="card search-filter sticky-element top-0 overflow-visible" style={{zIndex: 3}}>
                          <div className="card-body pt-md-4">
                              {compCode === defaultId ? '' :<div className="filter-widget">
                                  <div className="top-nav-search position-relative text-[1.15em]">
                                    <form onSubmit={handleSearchSubmit}>                                                                                  {/* onSubmit={(e) => {e.preventDefault(); scrollRef.current.scrollIntoView()}} */}
                                      <input name='query' onChange={handleSearchInput} autoComplete='off' value={searchKey.query} type="text" className="form-control" placeholder="Search By Doctor Name"/>      {/* onChange={(e) => searchDoctor(e.target.value, searchList)} value={searchTerm} */}
                                      <button className="btn" type="submit"><i className="fa fa-search"></i></button>
                                    </form>
                                    {isListActive && <div className='search-results-1 active'>
                                      <ul className='mb-0'>
                                          {renderDocorAutoComplete()}
                                      </ul>
                                    </div>}
                                    
                                  </div>
                              </div>}
                              {/* <div className="filter-widget d-none d-md-block">
                                  <h4>Filter By Date:</h4>
                                  <Form.Control type="date" name="datepic" placeholder="DateRange" value={'04/10/2023'} onChange={(e) => {}}/>
                              </div> */}
                              <div className="filter-widget mb-0">
                                  <h4 
                                  // onClick={() => window.googleTranslateElementInit()}
                                  >Select Specialists</h4>
                                  <div className="d-flex justify-content-start align-items-start flex-lg-column position-relative overflow-auto">
                                    {renderDepartmentData(departmentData)}
                                </div>
                              </div>
                              {/*<div className="btn-search">
                                  <button type="button" className="btn btn-block">Search</button>
                              </div>*/}
                          </div>
                      </div>
                      {isListActive && <span onClick={() => setListActive(false)} style={{position: 'fixed', zIndex: 1, inset: '0'}}></span>}     {/* Being used only by renderDocorAutoComplete() */}
                  </div>

                  <div className="d-flex flex-column col-md-12 col-lg-8 col-xl-9 position-relative justify-content-start align-items-start flex-md-column overflow-auto pb-2" style={{paddingTop: '1px'}}>
                        <nav ref={scrollRef} className='tabs-carousel d-block w-100 button-carousel w-100 bg-white mb-3' style={{padding: '0.6em 0.9em 0.55em', borderRadius: '7px', boxShadow: 'rgb(0 0 0 / 13%) 0px 1px 3px 0px, rgb(27 31 35 / 8%) 0px 0px 0px 1px'}}>
                          <div className="nav nav-tabs d-block w-100 pt-2 pb-1 px-2" role="tablist" style={{borderBottom: 'none'}}>
                            <ButtonSlider customSettings={{slidesToShow: 9, slidesToScroll: 4}} dataList={tabList()} responsive={responsiveSlick}/>
                          </div>
                        </nav>
                        {showAllDoctorsOnly ? null :
                        <div className='w-100'>
                          <h4 style={{fontSize: '1.1em', marginBottom: '0.9em', color: '#4c4c4c', lineHeight: '1.5em'}}>Showing <span style={{color: 'var(--clr-3)'}}>{userInfo.Department.dName === 'All' ? 'Doctors' : (userInfo.Department.dName.trim() + 's')}</span> available on <span style={{color: 'var(--clr-3)'}}>{filterDates.activeDate}</span></h4>
                          {compCode === BSN_ID ?
                            renderDesktopSearchList2(searchList3)
                            :
                            renderDesktopSearchList2(searchList3, activePage, visibleItems, setActivePage)
                          }                        
                        </div>}
                      <div className='w-100 mt-4 mt-lg-0'>
                        <div className='d-flex justify-content-between gap-3 bg-white shadow-sm p-4 mt-4 ' style={{padding: '0.4em 0', marginBottom: '0.9em', borderBottom: '1px solid #cacaca'}}>
                          <h4 className='mb-0' style={{fontSize: 'clamp(1.1em, 4vw, 1.3em)', lineHeight: '1.5em'}}>
                            <span style={{color: '#005de5'}}><i className='bx bxs-hand-right'></i></span>&nbsp;
                            All Doctors available on other days 
                            {userInfo.Department.dName === 'All' ? '' : <span> in <span style={{color: '#0067ff'}}>{userInfo.Department.dName.trim()}</span></span>} 
                          </h4>
                          {compCode === BSN_ID ? <Link to={`/doctors?deptId=${userInfo.Department.SubCode || 0}`} className="text-info" style={{fontSize: '1.3em', fontWeight: 500}}>View All</Link> : ''}
                        </div>
                        {compCode === BCROY_ID ? renderDesktopSearchList2(upcomingDoctors) : renderDesktopSearchList2(upcomingDoctors, activePage2, visibleItems, setActivePage2, 'allDoctors')}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

const mapStateToSpecialists = (state) => {
  return { isMobile: state.isMobile, compCode: state.compCode, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, compInfo: state.compInfo };
}

export default connect(mapStateToSpecialists, {loginStatusAction, userInfoAction, loaderAction })(Specialists);
