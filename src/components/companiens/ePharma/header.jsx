import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { breadCrumbAction, modalAction, cartAction, filterAction, siteDataAction, userInfoAction, loginStatusAction, toastAction, globalDataAction } from '../../../actions';
import { connect } from 'react-redux';
import { AutoComplete, ConnectedBreadCrumb, escape, getFallbackImg, getFrom, getRequiredFieldsOnly, rentCategories, updateLocalStorageItems, wait } from './utilities';
import qs from 'query-string';
import axios from 'axios';
import { CardType5, ConnectedAreaCard, ConnectedSearchListCard } from './cards';
import { BASE_URL, defaultId, ePharmaId, initSiteData, RAJE_RESTAURANT_ID, ROYAL_INN_ID, SRC_URL, TAKE_HOME_ID, TAKEHOME_AGRO, TAKEHOME_ELECTRONICS, TAKEHOME_GARMENTS, takeHome_ids, takehomeMain, XYZ_ID } from '../../../constants';
import { getTotalCartItems, useScrollPosition, logOut } from '../default/utilities';
import { ConnectedProductCard3 } from './B2B/Home';
import { rentSaleProducts } from './rentSale/takehome-database';
import { agroCategories } from './agro/data';
import { ListLoader } from '../../utils/utils';

const Header = ({ isLoggedIn, modalAction, cartAction, wishlistAction, filterData, cart, globalData, wishlist, isMobile, compCode, siteData, filterAction, siteDataAction, userInfo, compInfo, userInfoAction, loginStatusAction, globalDataAction, vType }) => {

    const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true, decode: false }).CID;             
    const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
    let b2bMode = globalData.userRegType.CodeValue === 'Retailer';
    const isRent = vType === 'rent';
    const agro = vType === 'agro';

    useEffect(() => {
        if (queryString && queryString === compCode) {
            console.log('Found compcode in URL.  ');
        } else {
            console.log('No compcode found in URL.');
        }
    }, [queryString, compCode])

    const [selectSearchCategory, setSelectSearchCategory] = useState(false);
    const [cartDropdownActive, setCartDropdownActive] = useState(false);
    const [myAccountDropdown, setMyAccountDropdown] = useState(false);
    const [pinCodeDropdown, setPinCodeDropdown] = useState(false);
    const selectSearchCategoryRef = useRef(); 
    const myAccountRef = useRef();
    const cartRef = useRef();
    const pinCodeRef = useRef();
    const [searchList, setSearchList] = useState([]);
    const [searchResultsActive, setSearchResultsActive] = useState(false);
    const history = useHistory();

    const [menuActive, setMenuActive] = useState(false);
    const pageYCoord = useScrollPosition();
    const [availablePin, setAvailablePin] = useState({ LocationMasterList: [] })

    const handleNavClick = () => {
        setMenuActive(false);
    } 

    useEffect(() => {
        const getAvailablePins = async (locId) => {
            if (!locId) return;           
            const res = await axios.get(`${BASE_URL}/api/Location/Get?LocationId=${locId}`, {});
            if (res.status === 200) {
                setAvailablePin(res.data);
            }
        }
        getAvailablePins(globalData.location.LocationId);
    }, [globalData.location.LocationId])

    // useEffect(() => {
    //     if (!globalData.location.LocationId) return;
    //     const epharmaItemsList = JSON.parse(localStorage.getItem('epharmaItemsList'));
    //     if (siteData.isLoading) return;
    //     if (epharmaItemsList && siteData.itemMasterCollection.length > 0) {
    //         epharmaItemsList.sCart.forEach((item) => {
    //             let cartItem = siteData.itemMasterCollection.find(i => item.id === i.LocationItemId);
    //             if (!cartItem) return;
    //             cartAction('ADD_ITEM', {...cartItem, count: 1, PackSizeId: item.packSizeId}, 'pharmacy')
    //         })
    //         epharmaItemsList.sWishlist.forEach((item) => {
    //             let wishlistItem = siteData.itemMasterCollection.find(i => item.id === i.LocationItemId);
    //             if (!wishlistItem) return;
    //             wishlistAction('ADD_WISH_ITEM', {...wishlistItem, count: 1, PackSizeId: item.packSizeId}, 'pharmacy')
    //         })
    //     }
    // },[siteData.itemMasterCollection, cartAction, globalData.location.LocationId])

    useEffect(() => {
        const onBodyClick = (event) => {
        if (selectSearchCategoryRef.current && selectSearchCategoryRef.current.contains(event.target)) return;               
        setSelectSearchCategory(false);                                                                                      
        if (selectSearchCategoryRef.current && selectSearchCategoryRef.current.contains(event.target)) return;               
        setMyAccountDropdown(false);                                                                                         
        if (cartRef.current && cartRef.current.contains(event.target)) return;                                               
        setCartDropdownActive(false);                                                                                        
        setSearchList([]);                                                                                                   
        if (pinCodeRef.current && pinCodeRef.current.contains(event.target)) return;                                               
        setPinCodeDropdown(false);  
        }                                                                                                                       // 
        document.body.addEventListener('click', onBodyClick, { capture: true });                                                // Add eventlistener on component mount.
        return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                                // Remove Eventlistener on component unmount.
    }, [])


    const [searchTerm, setSearchTerm] = useState({query: '', filterTerm: 'All', filterId: ''});
    const [autoCompleteList, setAutoCompleteList] = useState({loading: false, data: {itemMasterCollection: []}, err: {status: false, msg: ''}}); 
    const [autoCompleteList2, setAutoCompleteList2] = useState({loading: false, data: {LocationMasterList: []}, err: {status: false, msg: ''}}); 
    const [isListActive, setListActive] = useState(false); 
    const isTakehome = takeHome_ids.includes(compCode);

    const totalRentItems = useMemo(() => {
        return rentSaleProducts.map(i => i.data).reduce((arr, item) => [...arr, ...item])
    }, [])
    
    useEffect(() => {
        let controller = new AbortController();
        const getSearchResult = async (companyCode, key, signal) => {                      
            if (!companyCode) return alert('no companyCode received');                  
            const res = await getFrom(`${BASE_URL}/api/item/Get?CID=${companyCode}&SearchStr=${key.query}&LOCID=${globalData.location.LocationId}`, {}, setAutoCompleteList, signal);
            if (res) {                                                                    
                let requiredFields = getRequiredFieldsOnly(res.data.itemMasterCollection);
                setAutoCompleteList(pre => ({ ...pre, loading: false, data: {itemMasterCollection: requiredFields }}));
            } else {
                console.log('No data received');
            }
        }  

        const searchRentItem = async (query) => {
            setAutoCompleteList(pre => ({ ...pre, loading: true }));
            const foundItems = totalRentItems.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
            await wait(800);
            setAutoCompleteList(pre => ({ ...pre, loading: false, data: {itemMasterCollection: foundItems }}));
        }

        const timer = setTimeout(() => {
            if (searchTerm.query.length === 0) return setAutoCompleteList({loading: false, data: {itemMasterCollection: []}, err: {status: false, msg: ''}});
            if (isRent) {
                searchRentItem(searchTerm.query);
            } else {
                getSearchResult(compCode, searchTerm, controller.signal);  
            }
        }, 1000);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [searchTerm, compCode, globalData.location.LocationId, totalRentItems])

    //   -------------------- Area -------------------------------------------------------------------------------------------------------------------------------------------------

    const [areaResultsActive, setAreaResultsActive] = useState(false);
    const [area, setArea] = useState('');

    useEffect(() => {
        if (globalData.focusArea === '0') return;
        setAreaResultsActive(true);
    }, [globalData.focusArea])

    useEffect(() => {
        if (globalData.location.LocationId) {
            setAreaResultsActive(false);
        } else {
            setAreaResultsActive(true);
        } 
    }, [globalData.location.LocationId])  

    useEffect(() => {
        const getAreaResult = async (companyCode, key, businessTypeId) => {                      
            if (!companyCode) return alert('no companyCode received');                  
            if (!businessTypeId) return console.log('No Business type id recieved.');                  
            const res = await getFrom(`${BASE_URL}/api/Location/Get?CID=${companyCode}&SearchStr=${key}&BusinessTypeId=${businessTypeId}`, {}, setAutoCompleteList2);
            if (res) {                                                                   
                setAutoCompleteList2(res);
            } else {
                console.log('No data received');
            }
        }  
        const timer = setTimeout(() => {
            //   if (area.length < 1) return;
            getAreaResult(compCode, area, globalData.businessType.CodeId);                                       //  to initially populate area.                  
        }, 500);
        return () => clearTimeout(timer);
    }, [area, compCode, globalData.businessType.CodeId])

    //   -------------------- Area -------------------------------------------------------------------------------------------------------------------------------------------------


    const handleSearchInput = (e) => {
        setSearchTerm(pre => ({...pre, [e.target.name]: e.target.value}));
        setListActive(true); 
    }

    const handleAreaInput = (e) => {
        setArea(e.target.value);
        setListActive(true); 
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    }

    // ----------------------------------------------------------------------------------
    
    const cartArray = Object.values(cart.pharmacy);                        
    const cartArrayLength = getTotalCartItems(cart);                  
    const wishlistArrayLength = getTotalCartItems(wishlist);                  
    
    const cartItemsValueList = cartArray.map(item => item.count * item.SRate);                     
    const cartSubtotal = cartItemsValueList.reduce((total, num) => total + num, 0).toFixed(2);          
    
    // Categories menu ----------------------------------------------------------------------------------

    const [productsData, setProductsData] = useState({loading: true, data: {itemMasterCollection: [], LinkCategoryList: [], LinkSubCategoryList: []}, err: {status: false, msg: ''}});

    useEffect(() => {
        window.initSideMenu();
    },[productsData.loading])

    useEffect(() => {
        if (!siteData.isLoading) setProductsData({loading: false, data: siteData, err: {status: false, msg: ''}});        // loading is only a placeholder to indicate that first loading of siteData is not completed and api request is still pending.
    },[siteData])

    const renderCategories = (data) => {
        if (data.loading) {
            return <li className='py-4'>&nbsp;</li>;
        } else if (data.err.status) {
            return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
        } else if (data.data.LinkCategoryList.length === 0) {
            return <div className='py-4 text-white'>No Categories found!</div>;
        } else {
            // console.log(data.data.LinkCategoryList);
            return data.data.LinkCategoryList.map((item, index) => {
            const subItemsList = data.data.LinkSubCategoryList.filter(i => item.Value === i.Parent.toString());
            // const subItemsList = [
            //     { Text: 'Covid Essentials', Value: '1', CategoryDesc: 'Covid Essentials', CategoryId: '1' },
            //     { Text: 'Diabetes', Value: '2', CategoryDesc: 'Diabetes', CategoryId: '2' },
            //     { Text: 'Homeopathy', Value: '3', CategoryDesc: 'Homeopathy', CategoryId: '3' },
            // ];
            const icons = ['prescriptions', 'health_and_beauty', 'vaccines', 'pill', 'nutrition', 'glucose', 'content_cut', 'radio_button_checked', 'sanitizer', 'medication_liquid', 'household_supplies', 'pediatrics', 'hide_source'];
            // const nestedSubItemsList = [
            //     { Text: 'Digestion', Value: '1', CategoryDesc: 'Digestion', CategoryId: '1' },
            //     { Text: 'Anaemia', Value: '2', CategoryDesc: 'Anaemia', CategoryId: '2' },
            //     { Text: 'Multiple Sclerosis', Value: '3', CategoryDesc: 'Multiple Sclerosis', CategoryId: '3' },
            // ];
            return (
                <li key={index} className={subItemsList.length ? 'megamenu-static-holder' : ''}> 
                    {
                        subItemsList.length
                        ?   <Link to={`#`}><span className="material-symbols-outlined">{icons[index]}</span> {item.ParentDesc} <i className='bx bxs-down-arrow'></i></Link>
                        :   <Link to={`/filters/?head=${escape(item.ParentDesc).swap}&catVal=${item.Value}&page=1`} onClick={() => {filterAction('selectedCategoryId', item.Value); handleNavClick()}}><span className="material-symbols-outlined">{icons[index]}</span> {item.ParentDesc}</Link>  
                    }
                    <ul className="megamenu hb-megamenu">
                        {
                            subItemsList.map((subItem, n) => {
                            return (
                                <li key={n} className="card-body">
                                    <Link to={`/filters/?head=${escape(item.ParentDesc).swap}&catVal=${item.Value}&subHead=${escape(subItem.CategoryDesc).swap}&subCatVal=${subItem.CategoryId}&page=1`} style={{color: '#242424'}}>{subItem.CategoryDesc}</Link>
                                    {/* <ul className='list-inline' style={{paddingBottom: '0.5em'}}>
                                        {nestedSubItemsList.map(i => (<li key={i.CategoryDesc}><Link onClick={handleNavClick} to="/">{i.CategoryDesc}</Link></li>))}
                                    </ul> */}
                                </li>
                            )
                        })}
                    </ul>
                </li>
            )})
        }
    }

    const logoStyle = {
        'yNQvuwQYqseux%2BhtmuK5MQ==': { transform: 'scale(1.3)' },
    }

    const handleCartDropdown = () => {
        if (isRestaurant) return history.push('/checkout');
        setCartDropdownActive(!cartDropdownActive);
    }

    const handleClose = () => {
        setSearchResultsActive(false);
        if (isRestaurant) setSearchTerm(pre => ({...pre, query: ''}));
    }

    let hideElement = {
        cart: b2bMode && !isLoggedIn ? 'd-none' : '',
        wishlist: (b2bMode || isRent) ? 'd-none' : '',
        appn: compCode === TAKE_HOME_ID && !b2bMode && !agro ? '' : 'd-none'
    }     

    return (
        <div className='epharma-global'>
            {takehomeMain ? <style>{`
                .app-container > *:not(.app-content) {				
                    display: none;
                }
            `}</style> : null}
            <header>       
                <div className="header-middle pl-xs-0 pr-xs-0" style={{columnGap: '2rem'}}>
                    <div className="container">
                        <div className="d-flex justify-content-between flex-column flex-lg-row">
                            <div className="">
                                <div className="llogo pb-xs-15 d-flex justify-content-between">
                                    <Link to="/" className='me-auto d-block text-start header-main-logo' id='logo' style={{marginLeft: '0.8em'}}>
                                        {(() => {
                                            if (compCode === TAKE_HOME_ID) {
                                                return <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="" height="47" style={{transform: isMobile ? 'scale(1.3)' : 'scale(1.7)'}} />;
                                            } else if (compCode === ePharmaId) {
                                                return <img src="/img/logo/epharma.png" alt="" height="47" />;
                                            } else if (compCode === XYZ_ID) {
                                                return <img src="/img/logo/XYZ-LOGO.png" alt="" height="80" style={{maxHeight: '5rem', transform: 'scale(1.5)', transformOrigin: 'left'}} />;
                                            } else {
                                                return <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="" height="47" style={logoStyle[compCode]} />;
                                            }  
                                        })()}
                                    </Link>
                                    <div className="header-middle-right d-flex d-md-none pt-0">
                                        <ul className="hm-menu d-flex justify-content-evenly w-100" style={{listStyle: 'none', fontSize: '0.95em'}}>
                                            {isRestaurant ? 
                                                <li className="hm-wishlist d-flex flex-row gap-3" onClick={() => modalAction('USER_INFO_MODAL', true)}>
                                                    <Link to="#">
                                                        <i className="fas fa-user-edit"></i>
                                                    </Link>
                                                    <p className='fw-bold' style={{fontSize: '1.15em'}}>{userInfo.selectedMember.MemberName}</p>
                                                </li>
                                            :
                                            <>
                                                {/* <li className='hm-wishlist me-0 d-md-none'>
                                                    <ConnectedBusinessTypeSelector typeList={compBusinessTypes} classes={`ms-auto text-primary fw-bold float-start bg-transparent border-0`} styles={{maxWidth: 'fit-content', fontSize: '1em', paddingRight: '2em', margin: '0.5em 0em 0 0'}} />
                                                </li> */}
                                                <li className={`hm-wishlist me-3 ${hideElement.wishlist}`}>
                                                    <Link to="/wishlist">
                                                        {wishlistArrayLength > 0 && <span className="cart-item-count wishlist-item-count">{wishlistArrayLength}</span>}
                                                        <i className="fa fa-heart"></i>
                                                    </Link>
                                                </li>
                                                {globalData.prescription.required && <li className="hm-wishlist me-3">
                                                    <Link to="#" onClick={() => modalAction('PRESCRIPTION_MODAL', true)}>
                                                        <i className="fas fa-cloud-upload-alt"></i>
                                                    </Link>
                                                    {globalData.prescription.src && <b className="cart-item-count bg-sky-500" style={{top: '-1em', right: '-0.7em', left: 'auto'}}>✔</b>}
                                                </li>}
                                                <li className="hm-wishlist me-0">
                                                    <Link to="#" onClick={() => setMenuActive(true)}>
                                                        <i className="fa fa-bars"></i>
                                                    </Link>
                                                </li>
                                            </>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between flex-1" style={{gap: '2.3em', maxWidth: '113rem'}}>

                                <ul className="hm-menu d-none d-md-flex gap-[2.8rem]">
                                    {(() => {
                                        if (!isTakehome) return <li className='w-28'></li>;
                                        if (vType === 'ErpPharma' || vType === 'ErpManufacturing' || vType === 'agro') {
                                            return (
                                                <>
                                                    <li className="hm-wishlist">
                                                        <a href="https://takehome.live/">
                                                            <i className="fas fa-home"></i>
                                                        </a>
                                                        <p>Home</p>
                                                    </li>
                                                    {compCode === TAKE_HOME_ID || <li className="">
                                                        <a href='https://pharma.takehome.live/#/' target='_blank' className='text-center pointer'>
                                                            <img className='h-[3em] block mx-auto' style={{transform: 'scale(1.2)'}} src="/assets/img/agro/segmentImages/capsule.png" alt="Pharmacy" />
                                                            <p className='mb-0 mt-1'>Pharmacy</p>
                                                        </a>
                                                    </li>}
                                                    {compCode === TAKEHOME_AGRO || <li className="">
                                                        <a href='https://agro.takehome.live/#/' target='_blank' className='text-center pointer'>
                                                            <img className='h-[3em] block mx-auto' style={{transform: 'scale(1.2)'}} src="/assets/img/agro/segmentImages/grocery.png" alt="Grocery" />
                                                            <p className='mb-0 mt-2 relative !leading-[1] !text-[0.85em]'>Agro<span className="float-link text-nowrap">& Grocery</span></p>
                                                        </a>
                                                    </li>}  
                                                    {compCode === TAKEHOME_GARMENTS || <li className="">
                                                        <a href='https://gna.takehome.live/#/' target='_blank' className='text-center pointer'>
                                                            <img className='h-[3em] block mx-auto' style={{transform: 'scale(1.2)'}} src="/assets/img/agro/segmentImages/garments.png" alt="garments" />
                                                            <p className='mb-0 mt-1'>Garments</p>
                                                        </a>
                                                    </li>}
                                                    <li className={`${hideElement.appn}`}>
                                                        <Link to='#' className='text-center pointer'>
                                                            <img className='h-[3em] block mx-auto' style={{transform: 'scale(1.1)'}} src="/assets/img/agro/segmentImages/appointment.png" alt="appointment" />
                                                            <p className='mb-0 mt-2 relative !leading-[1] !text-[0.85em]'>Doctor<span className="float-link">Appointment</span></p>
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        }
                                    })()}
                                </ul>

                                {/* {(vType === 'ErpPharma' || vType === 'ErpManufacturing' || vType === 'agro') && <div className='d-none d-md-flex gap-[3rem]'>
                                    {compCode === TAKE_HOME_ID || <a href='https://pharma.takehome.live/#/' target='_blank' className='text-center pointer'>
                                        <img className='h-[3.5em]' style={{transform: 'scale(1.2) translateY(-0.3em)'}} src="/assets/img/agro/segmentImages/capsule.png" alt="Pharmacy" />
                                        <p className='mb-0'>Pharmacy</p>
                                    </a>}                 
                                    {compCode === TAKEHOME_AGRO || <a href='https://agro.takehome.live/#/' target='_blank' className='text-center pointer'>
                                        <img className='h-[3.5em]' style={{transform: 'scale(1.2) translateY(-0.3em)'}} src="/assets/img/agro/segmentImages/grocery.png" alt="Grocery" />
                                        <p className='mb-0'>Grocery</p>
                                    </a>}
                                    {compCode === TAKEHOME_GARMENTS || <a href='https://gna.takehome.live/#/' target='_blank' className='text-center pointer'>
                                        <img className='h-[3.5em]' style={{transform: 'scale(1.2) translateY(-0.3em)'}} src="/assets/img/agro/segmentImages/garments.png" alt="garments" />
                                        <p className='mb-0'>Garments</p>
                                    </a>}
                                </div>} */}
                                <div className={`w-100 w-sm-auto mobile-header-search flex-1 header-sticky ${pageYCoord.top > 200 ? 'sticky' : ''}`}>
                                    <div className='d-flex position-relative' style={{maxWidth: '530px'}}>
                                        {globalData.location.required && <form className="hm-searchbox" onSubmit={handleSearchSubmit} style={{minWidth: 'auto', borderTopRightRadius: 0, borderBottomRightRadius: 0, maxWidth: '4.3em'}}>
                                            <input onChange={handleAreaInput} onClick={() => setAreaResultsActive(true)} value={area} style={{padding: '0 1em'}} name="location" type="text" placeholder="Area" id="area" autoComplete='off'/>
                                            <button className="li-btn" type="submit"><i className="fa fa-search text-white"></i></button>
                                            {areaResultsActive && <AutoComplete name='area-rersults' list={autoCompleteList2.data.LocationMasterList} isLoading={autoCompleteList2.loading} setActive={setAreaResultsActive} children={<ConnectedAreaCard />} keyName={'Area'} itemName={'Service Areas'} noContentMsg={'No Locations Found.'} message='Please choose your area to continue shopping' closeIcon={globalData.location.LocationId ? true : false}/>} 
                                        </form>}
                                        <form className="hm-searchbox flex-1" onSubmit={handleSearchSubmit} ref={selectSearchCategoryRef} style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
                                            <div className={`d-none nice-select select-search-category ${selectSearchCategory && 'open'}`} tabIndex="0" onClick={() => setSelectSearchCategory(!selectSearchCategory)}>
                                                <span className="current d-block overflow-hidden text-muted" style={{maxWidth: 'clamp(1rem, 15vw, 8rem)', textOverflow: 'ellipsis'}}>{searchTerm.filterTerm}</span>
                                                <ul className="list">
                                                    <li onClick={() => {setSearchTerm({...searchTerm, filterTerm: 'All', filterId: ''}); setSelectSearchCategory(false)}} name="All" className={`option ${searchTerm.filterTerm === 'All' && 'selected focus'}`}>All</li>
                                                    {/* {filterData.categories.map((item, index) => <li key={index} onClick={() => {setSearchTerm({...searchTerm, filterTerm: item.CategoryDesc, filterId: item.CategoryId}); setSelectSearchCategory(false)}} className={`option ${searchTerm.filterId === item.CategoryId && 'selected focus'}`}>{item.CategoryDesc}</li>)} */}
                                                    {siteData.LinkCategoryList.map((item, index) => <li key={index} onClick={() => {setSearchTerm({...searchTerm, filterTerm: item.ParentDesc, filterId: item.Value}); setSelectSearchCategory(false)}} className={`option ${searchTerm.filterId === item.Value && 'selected focus'}`}>{item.ParentDesc}</li>)}
                                                </ul>
                                            </div>
                                            <input onChange={handleSearchInput} onClick={() => setSearchResultsActive(true)} value={searchTerm.query} name="query" type="text" placeholder="Search products ..." autoComplete='off'/>
                                            <button className="li-btn" type="submit"><i className="fa fa-search text-white"></i></button>
                                            {/* {searchResultsActive && <AutoComplete name='search-rersults' isHistory={true} list={autoCompleteList.data.itemMasterCollection} query={searchTerm.query} historySearch={(i) => setSearchTerm(pre => ({...pre, query: i}))} isLoading={autoCompleteList.loading} setActive={handleClose} 
                                                styles={b2bMode ? {fontSize: '0.9em'} : {}}
                                                children={b2bMode ? <ConnectedProductCard3 popupViewStyles={{fontSize: '1.1em'}} /> : <ConnectedSearchListCard />} 
                                            />} */}

                                            {(() => {
                                                if (!searchResultsActive) return null;
                                                if (b2bMode) {
                                                    return <AutoComplete name='search-rersults' isHistory={true} list={autoCompleteList.data.itemMasterCollection} query={searchTerm.query} historySearch={(i) => setSearchTerm(pre => ({...pre, query: i}))} isLoading={autoCompleteList.loading} setActive={handleClose} styles={{fontSize: '0.9em'}} loader={<ListLoader/>} children={<ConnectedProductCard3 popupViewStyles={{fontSize: '1.1em'}} />} />
                                                } else if (isRent) {
                                                    return <AutoComplete name='search-rersults' isHistory={true} list={autoCompleteList.data.itemMasterCollection} query={searchTerm.query} historySearch={(i) => setSearchTerm(pre => ({...pre, query: i}))} isLoading={autoCompleteList.loading} setActive={handleClose} loader={<ListLoader/>} styles={{fontSize: '0.8em'}} children={<CardType5 classes='landscape' />} />
                                                } else {
                                                    return <AutoComplete name='search-rersults' isHistory={true} list={autoCompleteList.data.itemMasterCollection} query={searchTerm.query} historySearch={(i) => setSearchTerm(pre => ({...pre, query: i}))} isLoading={autoCompleteList.loading} setActive={handleClose} loader={<ListLoader/>} children={<ConnectedSearchListCard />} />
                                                }
                                            })()}
                                        </form>
                                    </div>
                                    {globalData.location.required && <>
                                        {globalData.location.LocationId ? 
                                            <div htmlFor='area' className='mb-1 mb-lg-0 text-dark'>
                                                <label htmlFor='area' className='text-primary' style={{lineHeight: 0, marginTop: '0.6em', fontSize: '1.3rem'}}>
                                                    <span className='text-dark'><i className='bx bx-current-location'></i> Selected area: </span>
                                                    {globalData.location.LocationName}
                                                </label>
                                                <div ref={pinCodeRef} className='d-inline position-relative'>
                                                    <i role='button' style={{fontSize: '2rem', verticalAlign: 'text-bottom', color: '#f17e1d'}} className='ms-2 bx bx-caret-down' onClick={() => setPinCodeDropdown(!pinCodeDropdown)}></i>
                                                    <div className="setting ht-setting" style={{transform: `scale(${pinCodeDropdown ? 1 : 0})`, left: 0, right: 'unset', transformOrigin: 'left top'}}>
                                                        <div className='help-center' style={{padding: '1em 1.2em 0.2em', background: '#f5f5f5'}}>
                                                            <h6 style={{fontSize: '1em'}}>Avalilable Locations</h6> 
                                                        </div>
                                                        <ul className="ht-setting-list list-inline text-nowrap" style={{minWidth: '19rem', fontSize: '0.98em', fontFamily: 'Poppins', borderTop: '1px solid #e3e3e3', paddingTop: '5px'}}>
                                                            {availablePin.LocationMasterList.map((i, n) => (<li key={n}><span><i className='bx bx-caret-right'></i> {i.PIN}</span></li>))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div> 
                                            : 
                                            <p className='mb-1 mb-lg-0 text-dark' style={{lineHeight: 0, marginTop: '0.6em'}}><i className='bx bx-current-location'></i> Please choose an area.</p>
                                        }
                                    </>}
                                </div>
                                <div className="header-middle-right d-none d-md-flex">
                                    <ul className="hm-menu d-flex justify-content-end w-100 flex-wrap" style={{listStyle: 'none', gap: '2rem'}}>
                                        {(() => {
                                            if (isRestaurant) {
                                                return (
                                                    isLoggedIn && <li className="hm-wishlist" onClick={() => modalAction('USER_INFO_MODAL', true)}>
                                                        <span>
                                                            <i className="fas fa-user-edit"></i>
                                                        </span>
                                                        <p>{userInfo.selectedMember.MemberName}</p>
                                                    </li>
                                                )
                                            } else if (isRent) {
                                                return;
                                            } else {
                                                return (
                                                    <>
                                                        {/* {(() => {
                                                            if (compCode === TAKE_HOME_ID || compCode === TAKEHOME_AGRO || compCode === TAKEHOME_GARMENTS) {
                                                                return (
                                                                    <>
                                                                        <li className={`hm-wishlist ${hideElement.appn}`}>
                                                                            <Link to="#">
                                                                                <i className='fas fa-stethoscope'></i> 
                                                                            </Link>
                                                                            <p>Doctor<span className="float-link">Appointment</span></p>
                                                                        </li>
                                                                    </>
                                                                )
                                                            }
                                                        })()} */}
                                                        
                                                        {isLoggedIn && <li className="hm-wishlist">
                                                            <Link to="/myOrders">
                                                                <i className='bx bxs-gift'></i> 
                                                            </Link>
                                                            <p>Orders</p>
                                                        </li>}
                                                        {/* <li className={`hm-wishlist ${hideElement.wishlist}`}>
                                                            <Link to="/wishlist">
                                                                {wishlistArrayLength > 0 && <span className="cart-item-count wishlist-item-count">{wishlistArrayLength}</span>}
                                                                <i className="fa fa-heart"></i>
                                                            </Link>
                                                            <p>Wishlist</p>
                                                        </li> */}
                                                        {globalData.prescription.required && <li className="hm-wishlist">
                                                            <span onClick={() => modalAction('PRESCRIPTION_MODAL', true)}>
                                                                <i className="fas fa-cloud-upload-alt"></i>
                                                            </span>
                                                            <p>Upload<span className="float-link">Prescription</span></p>
                                                            {globalData.prescription.src && <b className="cart-item-count bg-sky-500" style={{top: '-1em', right: '-0.7em', left: 'auto'}}>✔</b>}
                                                        </li>}

                                                        <li className={`hm-minicart ${hideElement.cart}`} ref={cartRef}>                 
                                                            <div className="hm-minicart-trigger" onClick={handleCartDropdown}>
                                                                <i className="fas fa-cart-plus item-icon "></i>
                                                                {/* {cartArrayLength > 0 && <span className="cart-item-count">{cartArrayLength}</span>} */}
                                                                <span className="item-text">
                                                                    &#8377; {cartSubtotal}
                                                                    {cartArrayLength > 0 && <span className="cart-item-count">{cartArrayLength}</span>}
                                                                </span>
                                                                <i className="fas fa-caret-down" style={{verticalAlign: 'text-top'}}></i>
                                                            </div>
                                                            <span style={{textAlign: 'center', display: 'block', fontSize: '0.89em', fontFamily: 'Lato', color: '#434343'}}>Your Cart</span>
                                                            <div className="minicart" style={{transform: `scaleY(${cartDropdownActive ? 1 : 0})`}}>
                                                                <ul className="minicart-product-list">
                                                                    {cartArray.map((item, index) => (
                                                                        <li key={index}>
                                                                            <Link to={`/productPage/${item.ItemId}`} className="minicart-product-image">
                                                                                <img src={item.ItemImageURL || getFallbackImg()} alt={item.Description}/>
                                                                            </Link>
                                                                            <div className="minicart-product-details">
                                                                                <h6><Link to={`/productPage/${item.ItemId}`}>{item.Description}</Link></h6>
                                                                                <span>&#8377; {item.SRate} x {item.count}</span>
                                                                            </div>
                                                                            <button className="close" onClick={() => {cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy'); updateLocalStorageItems()}}>
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                                <p className="minicart-total">SUBTOTAL: <span>&#8377; {cartSubtotal}</span></p>
                                                                <div className="minicart-button">
                                                                    <Link to="/cartPage" onClick={() => setCartDropdownActive(false)} className="li-button li-button-dark li-button-fullwidth li-button-sm">
                                                                        <span>View Full Cart</span>
                                                                    </Link>
                                                                    {cartArray.length ? <Link to="/checkout" onClick={() => setCartDropdownActive(false)} className="li-button li-button-fullwidth li-button-sm">
                                                                        <span>Checkout</span>
                                                                    </Link> : ''}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>
                                                )
                                            }
                                        })()}
                                        <li className="hm-wishlist" ref={myAccountRef}>
                                            <span onClick={() =>setMyAccountDropdown(!myAccountDropdown)}>
                                                <i className='bx bxs-user'></i>
                                            </span>
                                            <p>{isLoggedIn ? (userInfo.Name).substring(0, 10).trim() + '..' : 'Login'}</p>
                                            <div className="setting ht-setting" style={{transform: `scale(${myAccountDropdown ? 1 : 0})`, transformOrigin: 'top right'}}>
                                                <ul className="ht-setting-list list-inline text-nowrap" style={{minWidth: '19rem', fontSize: '0.9em', fontFamily: 'Poppins'}}>
                                                    {!isLoggedIn && <li><span onClick={() => modalAction('LOGIN_MODAL', true)}><i className='bx bx-log-in'></i> Login</span></li>}
                                                    {!isLoggedIn ? <li>
                                                        {(compCode === TAKE_HOME_ID) || (compCode === TAKEHOME_AGRO) || (compCode === TAKEHOME_GARMENTS) || (compCode === TAKEHOME_ELECTRONICS) ? '' : <a target='__blank' href={SRC_URL}><i className='bx bxs-user-rectangle'></i> Admin Login</a>}
                                                    </li> : ''}
                                                    {isLoggedIn && 
                                                        <>
                                                            <li>
                                                                <span onClick={() => modalAction('USER_INFO_MODAL', true)}>
                                                                    <i className='bx bxs-user'></i> {userInfo.Name}
                                                                </span>
                                                            </li>
                                                            {isRestaurant ? '' : <>
                                                                {b2bMode || <li className={`${hideElement.cart}`}><Link to="/cartPage"><i className='bx bx-cart-alt'></i> Shopping Cart</Link></li>}
                                                                <li><Link to="/myOrders"><i className='bx bx-gift'></i> My Orders</Link></li>
                                                                <li className={`${hideElement.wishlist}`}><Link to="/wishlist"><i className='bx bx-heart'></i> Wishlist</Link></li>
                                                            </>}
                                                            <li><Link onClick={() => logOut(history)} to="#"><i className='bx bx-log-out'></i> Logout</Link></li>
                                                        </>
                                                    }
                                                    {cartArray.length ? <li><Link to="/checkout"><i className='bx bxs-shopping-bag' ></i> Checkout</Link></li> : ''}
                                                </ul>
                                                <div className='help-center' style={{padding: '1.2em 1.2em 0.3em'}}>
                                                    <h6><i className="bx bxs-phone-call" style={{fontSize: '1.4em', verticalAlign: 'middle', marginRight: '0.2em'}}></i> Help Center</h6>
                                                    {(() => {
                                                        if (compCode === TAKE_HOME_ID) {
                                                            return <p>8420209696 / 9330241456</p>
                                                        } 
                                                        // else {
                                                        //     return <p>8584057149 / 8584057149</p>
                                                        // }
                                                    })()}
                                                </div>
                                            </div>
                                        </li>
                                        {/* {isRestaurant ? 
                                            <li className="hm-wishlist" onClick={() => modalAction('MEMBER_SELECT_MODAL', true)}>
                                                <span>
                                                    <i className="fas fa-user-edit"></i>
                                                </span>
                                                <p>{userInfo.selectedMember.MemberName}</p>
                                            </li>
                                        : <>
                                            <li className={`hm-wishlist ${hideElement.appn}`}>
                                                <Link to="#">
                                                    <i className='fas fa-stethoscope'></i> 
                                                </Link>
                                                <p>Doctor<span className="float-link">Appointments</span></p>
                                            </li>
                                            {isLoggedIn && <li className="hm-wishlist">
                                                <Link to="/myOrders">
                                                    <i className='bx bxs-gift'></i> 
                                                </Link>
                                                <p>Orders</p>
                                            </li>}
                                            <li className={`hm-wishlist ${hideElement.wishlist}`}>
                                                <Link to="/wishlist">
                                                    {wishlistArrayLength > 0 && <span className="cart-item-count wishlist-item-count">{wishlistArrayLength}</span>}
                                                    <i className="fa fa-heart"></i>
                                                </Link>
                                                <p>Wishlist</p>
                                            </li>
                                            {globalData.prescription.required && <li className="hm-wishlist">
                                                <span onClick={() => modalAction('PRESCRIPTION_MODAL', true)}>
                                                    <i className="fas fa-cloud-upload-alt"></i>
                                                </span>
                                                <p>Upload<span className="float-link">Prescription</span></p>
                                            </li>}
                                        </>}
                                        <li className={`hm-minicart ${hideElement.cart}`} ref={cartRef}>                 
                                            <div className="hm-minicart-trigger" onClick={handleCartDropdown}>
                                                <i className="fas fa-cart-plus item-icon"></i>
                                                <span className="item-text">
                                                    &#8377; {cartSubtotal}
                                                    {cartArrayLength > 0 && <span className="cart-item-count">{cartArrayLength}</span>}
                                                </span>
                                                <i className="fas fa-caret-down" style={{verticalAlign: 'text-top'}}></i>
                                            </div>
                                            <span style={{textAlign: 'center', display: 'block', fontSize: '0.89em', fontFamily: 'Lato', color: '#434343'}}>Your Cart</span>
                                            <div className="minicart" style={{transform: `scaleY(${cartDropdownActive ? 1 : 0})`}}>
                                                <ul className="minicart-product-list">
                                                    {cartArray.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={`/productPage/${item.ItemId}`} className="minicart-product-image">
                                                                <img src={item.ItemImageURL || getFallbackImg()} alt={item.Description}/>
                                                            </Link>
                                                            <div className="minicart-product-details">
                                                                <h6><Link to={`/productPage/${item.ItemId}`}>{item.Description}</Link></h6>
                                                                <span>&#8377; {item.SRate} x {item.count}</span>
                                                            </div>
                                                            <button className="close" onClick={() => {cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy'); updateLocalStorageItems()}}>
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className="minicart-total">SUBTOTAL: <span>&#8377; {cartSubtotal}</span></p>
                                                <div className="minicart-button">
                                                    <Link to="/cartPage" onClick={() => setCartDropdownActive(false)} className="li-button li-button-dark li-button-fullwidth li-button-sm">
                                                        <span>View Full Cart</span>
                                                    </Link>
                                                    {cartArray.length ? <Link to="/checkout" onClick={() => setCartDropdownActive(false)} className="li-button li-button-fullwidth li-button-sm">
                                                        <span>Checkout</span>
                                                    </Link> : ''}
                                                </div>
                                            </div>
                                        </li>
                                        <li className="hm-wishlist" ref={myAccountRef}>
                                            <span onClick={() =>setMyAccountDropdown(!myAccountDropdown)}>
                                                <i className='bx bxs-user'></i>
                                            </span>
                                            <p>{isLoggedIn ? (userInfo.Name).substring(0, 10).trim() + '..' : 'Login'}</p>
                                            <div className="setting ht-setting" style={{transform: `scale(${myAccountDropdown ? 1 : 0})`, transformOrigin: 'top right'}}>
                                                <ul className="ht-setting-list list-inline text-nowrap" style={{minWidth: '19rem', fontSize: '0.9em', fontFamily: 'Poppins'}}>
                                                    {!isLoggedIn && <li><span onClick={() => modalAction('LOGIN_MODAL', true)}><i className='bx bx-log-in'></i> Login</span></li>}
                                                    {!isLoggedIn ? <li>
                                                        {compCode === TAKE_HOME_ID ? '' : <a target='__blank' href={SRC_URL}><i className='bx bxs-user-rectangle'></i> Admin Login</a>}
                                                    </li> : ''}
                                                    {isLoggedIn && 
                                                        <>
                                                            <li>
                                                                <span onClick={() => modalAction('USER_INFO_MODAL', true)}>
                                                                    <i className='bx bxs-user'></i> {userInfo.Name}
                                                                </span>
                                                            </li>
                                                            {isRestaurant ? '' : <>
                                                                {b2bMode || <li><Link to="/cartPage"><i className='bx bx-cart-alt'></i> Shopping Cart</Link></li>}
                                                                <li><Link to="/myOrders"><i className='bx bx-gift'></i> My Orders</Link></li>
                                                                <li className={`${hideElement.wishlist}`}><Link to="/wishlist"><i className='bx bx-heart'></i> Wishlist</Link></li>
                                                            </>}
                                                            <li><Link onClick={() => logOut(history)} to="#"><i className='bx bx-log-out'></i> Logout</Link></li>
                                                        </>
                                                    }
                                                    {cartArray.length ? <li><Link to="/checkout"><i className='bx bxs-shopping-bag' ></i> Checkout</Link></li> : ''}
                                                </ul>
                                                <div className='help-center' style={{padding: '1.2em 1.2em 0.3em'}}>
                                                    <h6><i className="bx bxs-phone-call" style={{fontSize: '1.4em', verticalAlign: 'middle', marginRight: '0.2em'}}></i> Help Center</h6>
                                                    {(() => {
                                                        if (compCode === TAKE_HOME_ID) {
                                                            return <p>7044655256 / 7044940450</p>
                                                        } else {
                                                            return <p>8584057149 / 8584057149</p>
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>                            
                            </div>                        
                        </div>
                    </div>
                </div>
                <div className="mobile-menu-area col-12">
                    <div className="container">
                        <div className="row">
                            <div className="mobile-menu mean-container">                    {/* Will generate and attach mobile menu here using mean-menu plugin from main.js file. mean-menu will use "hb-menu hb-menu-2" to generate mobile menu.  */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`header-bottom header-sticky ${pageYCoord.top > 500 ? 'sticky' : ''}`} style={{display: isRestaurant ? 'none' : ''}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="hb-menu hb-menu-2">
                                    <div className={`menu-backdrop ${menuActive ? 'active' : ''}`} onClick={() => setMenuActive(false)}></div>
                                    <nav className={`main-menu ${menuActive ? 'menu-opened' : ''}`} >
                                        <div className="menu-header d-lg-none">
                                            <a className="menu-logo" href="#/">
                                                {(() => {
                                                    if (compCode === TAKE_HOME_ID) {
                                                        return <img src="/img/logo/takeHome.png" className="img-fluid logo" alt="LOGO" style={{maxHeight: '5.5em'}}/>;
                                                    } else if (compCode === ePharmaId) {
                                                        return <img src="/img/logo/epharma.png" className="img-fluid logo py-3" alt="LOGO" style={{maxHeight: '4.3em'}}/>;
                                                    } else if (compCode === XYZ_ID) {
                                                        return <img src="/img/logo/XYZ-LOGO.png" className="img-fluid logo" alt="LOGO" style={{maxHeight: '5.5em'}}/>;
                                                    } else {
                                                        return <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} className="img-fluid logo" alt="LOGO" style={{maxHeight: '5.5em'}}/>;
                                                    }   
                                                })()}
                                            </a>
                                            <span id="menu_close" className="menu-close-btn" onClick={() => setMenuActive(false)}>
                                                <i className="bx bx-x"></i>
                                            </span>
                                        </div>
                                        <ul className={`navigation light-bg d-flex flex-wrap w-100 ${b2bMode && 'py-2 fs-3'}`} >                                         
                                            {(() => {  
                                                if (b2bMode) {
                                                    return (
                                                        <>
                                                            <li><Link to="/">Home</Link></li>           
                                                            <li><Link onClick={handleNavClick} to="/myOrders">Your Orders</Link></li>
                                                            <li><Link onClick={() => modalAction('USER_INFO_MODAL', true)}>Account</Link></li>
                                                            <li><Link onClick={handleNavClick} to="/outstandings">Outstandings</Link></li>
                                                            <li><Link onClick={handleNavClick} to="/transactions">Transactions</Link></li>
                                                        </>
                                                    )
                                                } else if (isMobile || compCode === ePharmaId) {                                            {/* to get back down-caret icon, uncomment css at line 1802 in style4.css */}
                                                    return (
                                                        <>
                                                            <li><Link onClick={handleNavClick} to="/">Home</Link></li>           
                                                            <li><Link onClick={handleNavClick} to="/aboutUs">About Us</Link></li>
                                                            <li><Link onClick={handleNavClick} to="/privacyPolicy">Privacy Policy</Link></li>
                                                            <li><Link onClick={handleNavClick} to="/termsConditions">Terms & Conditions</Link></li>
                                                            <li><Link onClick={handleNavClick} to="/returnPolicy">Return Policy</Link></li>
                                                            <li><Link onClick={handleNavClick} to="/contactUs">Contact Us</Link></li>
                                                            {compCode === ePharmaId ? <>
                                                                <li><Link onClick={handleNavClick} to="/franchisee">Franchisee</Link></li>
                                                                <li><Link onClick={handleNavClick} to="/store">Store</Link></li>
                                                            </> : ''}
                                                        </>
                                                    )
                                                } else if (isRent) {
                                                    return (
                                                        <>
                                                            <li><Link onClick={handleNavClick} to="/">Home</Link></li>  
                                                            <li><Link onClick={handleNavClick} to="/">Services</Link></li>
                                                            <li className='me-auto'><a href='https://takehome.live/franchisee.html' target='__blank'>Franchisee</a></li>
                                                            {/* {siteData.LinkCategoryList.map(i => (<li><Link onClick={handleNavClick} to={`/filters/?head=${i.ParentDesc}&catVal=${i.Value}`}>{i.ParentDesc}</Link></li>))} */}
                                                        </>
                                                    )
                                                } else {
                                                    {/* if (agro) return renderCategories({loading: false, data: {itemMasterCollection: [], LinkCategoryList: agroCategories, LinkSubCategoryList: []}, err: {status: false, msg: ''}}); */}
                                                    return renderCategories(productsData);
                                                }  
                                            })()}                        
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {!isMobile && !b2bMode && <ConnectedBreadCrumb/>}
        </div>
    )
}


const mapStateToProps = (state) => {
  return { isMobile: state.isMobile, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, compInfo: state.compInfo, modals: state.modals, filterData: state.filterData, cart: state.cart, wishlist: state.wishlist, siteData: state.siteData, compCode: state.compCode, globalData: state.globalData };
}

export default connect(mapStateToProps, {breadCrumbAction, modalAction, cartAction, filterAction, siteDataAction, userInfoAction, loginStatusAction, toastAction, globalDataAction})(Header);


