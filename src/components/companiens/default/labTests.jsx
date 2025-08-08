import React, { useEffect, useState } from 'react';
import { ConnectedLabTestCard, ErrorCard } from './cards';
import { BreadCrumb, getFrom, HeroSlider, JQDatePicker, today } from './utilities';
import { connect } from 'react-redux';
import { modalAction, siteDataAction, userInfoAction } from '../../../actions';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import { escape } from '../ePharma/utilities';
import { GridLoader } from '../../utils/utils';


const LabTests = ({ siteData, siteDataAction, compCode, isMobile, mode='', globalData, userInfo, compInfo, userInfoAction, modalAction }) => {

  const [activeCompany, setActiveCompany] = useState({});
  const [labData, setLabData] = useState({loading: true, data: {ParentCategoryList: [], LinkSubCategoryList: [], itemMasterCollection: []}, err: {status: false, msg: ''}});
  const [companyTabList, setCompanyTabList] = useState({loading: true, data: [], err: {status: false, msg: ''}});
  const [investigationItem, setInvestigationItem] = useState({});

  const breadCrumbData = {
    links: [{name: 'Home', link: '/'}, {name: 'Labtests', link: '/labtests'}],
    activeLink: '/labtests'
  }

  // useEffect(() => {
  //   const getCompanyList = async (companyCode, userId) => {                  
  //     if (!companyCode) return console.log('no companyCode received');               
  //     const res = await getFrom(`${BASE_URL}/api/CompMast/Get?CID=${companyCode}&UID=${userId}`, {}, setCompanyTabList);
  //     if (res) {                                                               
  //       setCompanyTabList(res);                
  //     } else {
  //       alert('Something went wrong.');
  //     }
  //   }
  //   getCompanyList(compCode, userInfo.UserId);
  // },[compCode, userInfo.UserId])

  useEffect(() => {
    setCompanyTabList(pre => ({ ...pre, loading: false, data: userInfo.companyList }));
  }, [userInfo.companyList])  

  // useEffect(() => {
  //   if (userInfo.selectedCompany.EncCompanyId) return setActiveCompany(userInfo.selectedCompany);
  //   setActiveCompany(compInfo);          
  // },[compInfo])

  useEffect(() => {
    if (!companyTabList.data.length) return;
    if (userInfo.selectedCompany.EncCompanyId) {
      setActiveCompany(userInfo.selectedCompany);     
    } else {
      alert('Something went wrong. 47');
    }
  }, [userInfo.selectedCompany.EncCompanyId, companyTabList.data.length])

  useEffect(() => {
    const getLabData = async (company) => {                
      if (!company.EncCompanyId) return console.log('no companyCode received');                 
      if (!company.LocationId) return console.log('no Loc Id received');      
      const res = await getFrom(`${BASE_URL}/api/Pharma/Get?CID=${company.EncCompanyId}&LOCID=${company.LocationId}&CatType=INVESTIGATION`, {}, setLabData);
      if (res) {              
        setLabData(res);        
        setInvestigationItem(res.data.ParentCategoryList[0]);
      } 
    }
    getLabData(activeCompany);
    setSearchItem({name: ''});
  },[activeCompany.EncCompanyId, activeCompany.LocationId])

  // console.log(activeCompany.CompUserMPartyCode, userInfo.UserId);  
  
  const renderSlider = (data, parentId) => {    
    const productCategoryItems = data.data.itemMasterCollection.filter(i => i.Category === parentId);   
    const parentCategoryName = data.data.ParentCategoryList.filter(i => i.Value === parentId.toString())[0]?.Text;
    if (data.loading) {
      return <Skeleton count={10}/>;
    } else if (data.err.status) {
      return <ErrorCard message={`An error occured, please try again later. Error code: ${data.err.msg}`} />
    } else if (productCategoryItems.length === 0) {
      return;
    } else {
      // const products = (list) => list.map(item => (<div key={item.LocationItemId}><ConnectedLabTestCard data={item} /></div>));
      return (
        <div>
          <div className='cat-heading'>
              <h4 className='mb-0'>{parentCategoryName}</h4>
              <Link className='view-all' to={`/filters/?head=${escape(parentCategoryName).swap}&catVal=${parentId}`}>VIEW ALL</Link>
          </div>
          <div className='pt-2 pt-md-0' style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5em 2em', padding: '0 0.5em 0.5em'}}>
              {/* <ProductSlider dataList={products(productCategoryItems)}/> */}
              {productCategoryItems.map(item => (<ConnectedLabTestCard data={item} key={item.LocationItemId} testDate={testDate} />))}
          </div>
        </div>
      )
    }
  }

  const handleDropDown = (id) => {
    let selected = companyTabList.data.find(i => i.EncCompanyId === id);
    setActiveCompany(selected);
    userInfoAction({ selectedCompany: selected });
  }

  const heroCarousel = () => {
    return [1,2].map(item => (
      <div key={item}>
        <img className='img-fluid w-100' src={`/img/labTests/lab-hero-${item}${isMobile ? '-mob' : ''}.jpg`} alt="heroBG" />
      </div>
    ))
  }

  const renderContent = (data) => {
    if (data.loading) {
      // return <Skeleton count={10}/>;
      return <GridLoader containerClass='gap-3 gap-md-4 mb-6 flex-wrap py-3' count={8} classes='rounded-lg h-[111px] min-w-[294px] flex-1' />;
    } else if (data.data.ParentCategoryList.length === 0) {
      return <div className='text-center my-5 w-100'><h2 className="text-info mark">No Products found !</h2></div>;
    } else {
      return data.data.ParentCategoryList.map(item => (<div key={item.Value}>{renderSlider(labData, parseInt(item.Value))}</div>))
    }
  }

  const [ searchItem, setSearchItem ] = useState({name: ''});
  const handleSearchInput = (e) => {
    const { name, value } = e.target;
    setSearchItem(pre => ({ ...pre, [name]: value }));
    setListActive(true);
  }

  const getSearchItems = async (company, query) => {
    if (!company.EncCompanyId) return;
    setLabData(pre => ({ ...pre, loading: true }));
    const res = await axios.get(`${BASE_URL}/api/Item/GetItemFilter?CID=${company.EncCompanyId}&LOCID=${company.LocationId}&SearchStr=${query.name}&CategoryIdList=${investigationItem.Value}&SubCategoryIdList&MFGList&SortBy&ExcludeOutOfStock`);
    if (res.status === 200) {
      setTimeout(() => {
        setLabData(pre => ({ ...pre, loading: false, data: { ...pre.data, itemMasterCollection: res.data.itemMasterCollection }}));    // avoid updatating ParentCategoryList field.
      }, [500])
    }                                                                                                   
  }  

  const handleSearch = (e) => {
    e.preventDefault();
    getSearchItems(activeCompany, searchItem);
  }

  const [testDate, setTestDate] = useState(today);

  const handleTestDate = (date) => {
    setTestDate(date);
    modalAction('LABTEST_BOOK_MODAL', false, date);
  }

  const [isListActive, setListActive] = useState(false); 
  const [autoCompleteList, setAutoCompleteList] = useState({loading: false, data: [], err: {status: false, msg: ''}}); 

  const handleSelect = (item) => {   
    setSearchItem({ name: item.Description });
      getSearchItems(activeCompany, { name: item.Description });
    setListActive(false);
  }

  useEffect(() => {
    const getSearchItems = async (company) => {
      if (!company.EncCompanyId) return;
      setAutoCompleteList(pre => ({ ...pre, loading: true }));
      const res = await axios.get(`${BASE_URL}/api/Item/GetItemFilter?CID=${company.EncCompanyId}&LOCID=${company.LocationId}&SearchStr=${searchItem.name}&CategoryIdList=${investigationItem.Value}&SubCategoryIdList&MFGList&SortBy&ExcludeOutOfStock`);
      if (res.status === 200) {
        setAutoCompleteList(pre => ({ ...pre, loading: false, data: res.data.itemMasterCollection }));
      }                                                                                                   
    }  
    const timer = setTimeout(() => {
      if (searchItem.name.length < 1) return;
      getSearchItems(activeCompany, searchItem);              
    }, 800);
    return () => clearTimeout(timer);
  }, [searchItem.name, activeCompany])

  const renderAutoComplete = () => {
    if (autoCompleteList.loading) return <Skeleton style={{fontSize: '2em'}} count={10}/>
    return autoCompleteList.data.map(i => <li key={i.LocationItemId} ><Link to={`#`} onClick={() => handleSelect(i)}>{i.Description}</Link></li>);
  }
  
  return (
    <>
      <section className="default-global">
        {mode === 'component' ? '' : <BreadCrumb data={breadCrumbData}/>}
        <div className='content pt-0'>
          {mode === 'component' ? '' : <div className='hero-carousel'>
            <HeroSlider dataList={heroCarousel()} />
          </div>}
          <div className="feat-categories main-category">
            <div className="w-100 bg-white" style={{fontSize: '1.2em', padding: '0.9em 0.8em 0.8em', marginTop: '0.5em', borderRadius: '4px', boxShadow: 'rgb(0 0 0 / 13%) 0px 1px 3px 0px, rgb(27 31 35 / 8%) 0px 0px 0px 1px'}}>
              <div className="filter-widget mb-0 w-100" >
                <div className="top-nav-search">
                  {companyTabList.data.length === 1 ? '' : <h4 style={{fontFamily: 'Poppins'}}>Select your Diagnostic Center</h4>}
                  <form className='filter-form d-flex gap-3 gap-lg-4 flex-column flex-md-row' onSubmit={handleSearch}>
                    {companyTabList.data.length === 1 ? '' : <div className='position-relative'>
                      <select className="form-select form-control" name='filterBy' value={activeCompany.EncCompanyId} onChange={(e) => handleDropDown(e.target.value)} aria-label="Default select" id="inputSelect" style={{lineHeight: 1, minWidth: 'fit-content'}}>
                        {companyTabList.data.map(i => (<option value={i.EncCompanyId} key={i.EncCompanyId}>{i.COMPNAME}</option>))}
                      </select>
                    </div>}
                    <div className='d-flex gap-2 ms-0 ms-md-auto position-relative'>
                      <JQDatePicker id={'test_date'} isRequired={true} handler={handleTestDate} curValue={testDate} name={'test_date'} customClass={'form-control'} required style={{flexBasis: '60%', padding: '0.8em'}} />
                      <input className='form-control newSearchBox' type="text" name='name' value={searchItem.name} onChange={handleSearchInput} placeholder='Search Tests' style={{padding: '0em 0.9em'}}/>
                      <div className='d-flex justify-content-between gap-2 gap-lg-3'>
                        <button type='submit' className='dashboard-card__btn-box-item reverse-hover d-flex align-items-center icon-btn text-nowrap' style={{'--clr': '#48fffc3b', '--bg': 'var(--bg-3)', '--bClr': '#149a8d57', gap: '0.3em', fontSize: '0.8em', padding: '0.3em 0.6em 0.3em', borderRadius: '3.1em'}}>
                          <i className='bx bx-search' style={{fontSize: '1.5em'}}></i> <span className='d-none d-lg-block'>Search</span>
                        </button>
                      </div>
                      {isListActive && <div className='search-results-1 active' style={{zIndex: 5}}>
                        <ul className='mb-0'>
                            {renderAutoComplete()}
                        </ul>
                      </div>}
                      {isListActive && <span onClick={() => setListActive(false)} style={{position: 'fixed', zIndex: 1, inset: '0'}}></span>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='feat-categories feat-sub-categories pt-0' style={{background: '#f1f1f1'}}>
            <div className='pharmacy-cards overflow-hidden slider-wrapper'>
                {renderContent(labData)}
            </div> 
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToLabTests = (state) => {
  return { siteData: state.siteData, userInfo: state.userInfo, compCode: state.compCode, compInfo: state.compInfo, isMobile: state.isMobile, globalData: state.globalData }
}

const MemoizedLabTest = React.memo(LabTests);
export default connect(mapStateToLabTests, {siteDataAction, userInfoAction, modalAction})(MemoizedLabTest);