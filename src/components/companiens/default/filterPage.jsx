import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { breadCrumbAction, filterAction, globalDataAction, modalAction } from '../../../actions';
import { CardType5, ConnectedProductCard, ConnectedProductCard1, ConnectedSearchListCard } from '../ePharma/cards';
import { ConnectedCartCardM, ConnectedProductCardM } from '../ePharma/mobileView/cards';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ConnectedUpdateScroll, getFrom, scrollPage, scrollToContent, Spinner, escape } from '../ePharma/utilities';
import { BASE_URL, ePharmaId, RAJE_RESTAURANT_ID, TAKE_HOME_ID, XYZ_ID } from '../../../constants';
import qs from 'query-string';
import { ConnectedLabTestCard, ConnectedPharmacyCard2 } from './cards';
import { ConnectedProductCard3 } from '../ePharma/B2B/Home';
import { today } from './utilities';
import { GridLoader } from '../../utils/utils';

const FilterPage = ({ siteData, breadCrumbAction, compCode, modals, modalAction, isMobile, globalData, globalDataAction, userInfo, isLoggedIn, filterData, filterAction, vType }) => {

    const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
    const b2bMode = globalData.userRegType.CodeValue === 'Retailer';
    const isHospital = (vType === 'ErpHospital'); 
    const isRent = vType === 'rent';    

    const history = useHistory();    
    const location = useLocation();
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 

    const getField = (key) => queryString[key] || '';

    const filterCategoryName = escape(getField('head')).unswap;                            // head and subHead are used only to show heading on first load of filterpage.
    const filterSubCategoryName = escape(getField('subHead')).unswap;
    const currPage = getField('page') || '1';

    const [heading, setHeading] = useState({ heading: '', subHeading: '' });
    const [productsList, setProductsList] = useState({loading: true, data: {itemMasterCollection: []}, err: {status: false, msg: ''}});
    const [hasMore, setHasMore] = useState(true);
    const targetRef = useRef(null);

    useEffect(() => {
        if (currPage) {
            setActivePage(parseInt(currPage));
        };
    },[currPage])

    // Observe scroll position
    useEffect(() => {
        const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting) {
                if (targetRef.current === false) return;
                if (productsList.loading) return;
                let newQueryString = { ...queryString, page: parseInt(currPage) + 1 };
                let parsed = qs.stringify(newQueryString);
                setTimeout(() => {
                    history.push(`?${parsed}`);
                }, 300);
            }
        },
        { threshold: 0.1 }
        );

        if (targetRef.current) observer.observe(targetRef.current);

        return () => observer.disconnect();
    }, [hasMore, currPage, productsList.loading]);

    useEffect(() => {
        // setProductsList({loading: true, data: {itemMasterCollection: []}, err: {status: false, msg: ''}})
        setHasMore(true)
        window.scrollTo(0, 0);
        let newQueryString = { ...queryString, page: 1 };
        let parsed = qs.stringify(newQueryString);
        history.push(`?${parsed}`);
    }, [queryString.catVal, queryString.subCatVal, queryString.brands, queryString.sortBy, queryString.query, queryString.hideOutStock])

    
    useEffect(() => {
        setHeading({ heading: filterCategoryName, subHeading: filterSubCategoryName });
    }, [filterCategoryName, filterSubCategoryName])

    const [activePage, setActivePage] = useState(0);
    const sortByOpenRef = useRef();
    const [filterActive, setFilterActive] = useState(false);  

    useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: filterCategoryName, link: '/filterPage'}], activeLink: '/filterPage'});
    },[breadCrumbAction, filterCategoryName])    

    useEffect(() => {
        const onBodyClick = (event) => {
            if (sortByOpenRef.current && sortByOpenRef.current.contains(event.target)) return;                          // Return if click is triggered from search field form or it's inner elements.
            setSortByOpen(false);                                                                                       // close select element only if click is triggered rest of the elements (outer body).                                                                                         // close cart dropdown only if click is triggered rest of the elements (outer body).
        }
        document.body.addEventListener('click', onBodyClick, { capture: true });                                                // Add eventlistener on component mount.
        return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                                // Remove Eventlistener on component unmount.
    }, [])

  const initTab = isRent ? 'list-view' : 'grid-view';    
  const [tabActive, setTabActive] = useState(initTab); 
  const [goto, setGoto] = useState('');

  const nextPage = () => {
    // if (activePage >= totalPages) return;
    let newQueryString = { ...queryString, page: activePage + 1 };
    let parsed = qs.stringify(newQueryString);
    history.push(`?${parsed}`);
    // scrollToContent(filterResultsRef);
  }
    
  const previousPage = () => {
      // if (activePage !== 1) return setActivePage(activePage-1);
    if (activePage !== 1) {
        let newQueryString = { ...queryString, page: activePage - 1 };
        let parsed = qs.stringify(newQueryString);
        history.push(`?${parsed}`);
        // scrollToContent(filterResultsRef);
    }
  };

  const gotoPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        let newQueryString = { ...queryString, page: pageNumber };
        let parsed = qs.stringify(newQueryString);
        history.push(`?${parsed}`);
        // scrollToContent(filterResultsRef);
        setGoto('');
    } else {
        alert('Please enter a valid page number.');
    }
  }

  const visibleItems = 20;                                                 // Number of items currently visible on the page.
  const lastProductIndex = activePage*visibleItems;
  const totalProducts = productsList.data.itemMasterCollection.length;
//   const totalPages = Math.ceil(totalProducts / visibleItems);
  const totalPages = productsList.data.itemMasterCollection[0]?.PageCnt || 1;

  const renderProducts = (data) => {
    // if (data.loading) {
    //   return <GridLoader containerClass='gap-3 gap-md-4 mb-6 flex-wrap py-3' count={10} classes='rounded-lg h-[242px] min-w-[140px] lg:h-[288px] lg:min-w-[170px] flex-1' />;
    // } else 
    if (data.err.status) {
      return <div className='text-center py-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } 
    // else if (data.data.itemMasterCollection.length === 0) {
    //   return <div className='text-center py-5 w-100'><h2 className="text-info">No Product found for current filters!</h2></div>;
    // } 
    else {
      scrollPage('filterPage', globalDataAction);                       // scroll page only when content is ready.
      return (
        <>
            {(() => {
                if (isHospital) {
                    return (
                        <div id="grid-view" className={`tab-pane fade ${tabActive === 'grid-view' && 'active show'}`} role="tabpanel">
                            <div className="product-area shop-product-area">    
                                <div className="row">                       
                                    <div className="col-12 filter-view" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5em', padding: '1em 1.5em'}}>
                                        {productsList.data.itemMasterCollection.map((item, index) => {
                                            return (
                                                <div key={index} className='pharmacy-cards'>
                                                    <ConnectedLabTestCard data={item} key={item.LocationItemId} testDate={today} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else if (b2bMode) {
                    return (
                        <div id="list-view" className={`tab-pane fade product-list-view active show`} role="tabpanel">
                            <div className="row">
                                <div className={`col mt-15 d-flex flex-wrap flex-column gap-0`} style={{padding: '0em 0.55em 0.2em', fontSize: '1.2em'}}>
                                    {productsList.data.itemMasterCollection.map((item, index) => {
                                        return <ConnectedProductCard3 styles={{maxWidth: 'none'}} data={item} key={index} />
                                    })} 
                                </div>
                            </div>
                        </div>
                    )
                } else if (isRent) {
                    return (
                        <>
                            <div id="grid-view" className={`tab-pane fade ${tabActive === 'grid-view' && 'active show'}`} role="tabpanel">
                                <div className="product-area shop-product-area">
                                    <style>{`   
                                        .product-area .d-grid {
                                            grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
                                        }
                                        @media only screen and (max-width: 1199px) {
                                            .product-area .d-grid {
                                                grid-template-columns: 1fr 1fr;
                                            }
                                        }   
                                    `}</style>
                                    <div className="row">                       
                                        <div className="col-12 d-grid" style={{gap: '1em', padding: '1em 0.7em 0'}}>
                                            {productsList.data.itemMasterCollection.map((item, index) => {
                                                return (
                                                    <CardType5 classes='bg-slate-100' data={item} key={index} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="list-view" className={`tab-pane fade product-list-view ${tabActive === 'list-view' && 'active show'}`} role="tabpanel">
                                <div className="row">
                                    <div className={`col d-grid`} style={{ padding: '1em 0.55em 0.2em', fontSize: '1.15em', gap: '1em', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                                        {productsList.data.itemMasterCollection.map((item, index) => {
                                            return <CardType5 data={item} key={index} classes='landscape bg-slate-100' />
                                        })} 
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                } else {
                    return (
                        <>
                            <div id="grid-view" className={`tab-pane fade ${tabActive === 'grid-view' && 'active show'}`} role="tabpanel">
                                <div className="product-area shop-product-area">
                                    { 
                                        isMobile ? 
                                        <div id='mobile-card-view' style={{fontSize: '1.18em'}}>
                                            {productsList.data.itemMasterCollection.map((item, index) => <ConnectedProductCardM key={index} data={item}/>)}
                                        </div>
                                        :                                       // Encoutering multiple items with same LocationItemId hence using index as key.
                                        <div className="row">                       
                                            <div className="col-12 d-flex flex-wrap justify-content-around filter-view" style={{columnGap: '0.85em'}}>
                                                {productsList.data.itemMasterCollection.map((item, index) => {
                                                        if (compCode === ePharmaId || vType === 'agro' || vType === 'ErpManufacturing') {
                                                            return (
                                                                <div style={{marginTop: '1.8em', fontSize: '0.94em'}} key={index}>
                                                                    <ConnectedProductCard data={item} />
                                                                </div>
                                                            )
                                                        } else if (compCode === TAKE_HOME_ID || compCode === XYZ_ID || isRestaurant) {
                                                            return (
                                                                <div style={{marginTop: '1.8em', maxWidth: '15.8em'}} key={index}>
                                                                    <ConnectedProductCard1 data={item} />
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div style={{marginTop: '1.8em'}} key={index} className='pharmacy-cards'>
                                                                    <ConnectedPharmacyCard2 data={item} />
                                                                </div>
                                                            )
                                                        }
                                                    }                                    
                                                )}
                                            </div>
                                        </div>
                                    }  
                                </div>
                            </div>
                            <div id="list-view" className={`tab-pane fade product-list-view ${tabActive === 'list-view' && 'active show'}`} role="tabpanel">
                                <div className="row">
                                    <div className={`col mt-15 d-flex flex-wrap gap-3`} style={{padding: '0em 0.55em 0.2em', fontSize: '1.25em'}}>
                                        {productsList.data.itemMasterCollection.map((item, index) => {
                                            return <ConnectedSearchListCard data={item} key={index} />
                                        })} 
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            })()}
            {/* {(() => {
                if (data.loading) {
                    return <div ref={targetRef}><GridLoader containerClass='gap-3 gap-md-4 mb-6 flex-wrap py-3' count={10} classes='rounded-lg h-[242px] min-w-[140px] lg:h-[288px] lg:min-w-[170px] flex-1' /></div>;
                }
            })()} */}
        </>
      )
    }
  }

//   ---------------------------------------------- FILTERS STARTS ----------------------------------------------------------------------------------------------------------------

  const [filters, setFilters] = useState({ categories: [], subCategories: [], brands: [] }); 
  const [hideOutOfStockItems, setHideOutOfStockItems] = useState('N');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByOpen, setSortByOpen] = useState(false);
  const [sortBySelected, setSortBySelected] = useState({ name: 'Name (A - Z)', id: 2, value: 'NameASC'}); 
  const filterResultsRef = useRef(null);
  let visibleCount = 5;

//   if (compCode === TAKE_HOME_ID) visibleCount = 20;
  const [maxItems, setMaxItems] = useState({ categories: visibleCount, subCategories: visibleCount, brands: visibleCount });

  const sortByOptions = [
    { name: 'Name (A - Z)', id: 2, value: 'NameASC'},
    { name: 'Name (Z - A)', id: 3, value: 'NameDESC'},
    { name: 'Price (Low > High)', id: 4, value: 'PriceASC'},
    { name: 'Price (High > Low)', id: 5, value: 'PriceDESC'},
  ]

  const handleSelect = (catName, catIdName, item) => {
    let allFilterData = { ...filters };
    let targetCategory = allFilterData[catName];
    let toggleIsSelected = targetCategory.map(i => i[catIdName] === item[catIdName] ? { ...i, isSelected: !i.isSelected} : i);
    setFilters(pre => ({ ...pre, [catName]: toggleIsSelected }));
  }

  useEffect(() => {
    if (siteData.isLoading) return;

    let catIds = getField('catVal').split(',');
    let subCatIds = getField('subCatVal').split(',');
    let brandsNames = getField('brands').split(',');
    // let brandsNames = (escape(getField('brands')).unswap).split(',');
    let query = getField('query');
    let sortBy = getField('sortBy') || 'NameASC';
    let hideOutStock = getField('hideOutStock') || 'N';
    let categories = insertStatus(siteData.LinkCategoryList, 'Parent', catIds);
    let subCategories = insertStatus([...new Map(siteData.LinkSubCategoryList.map(item => [item['CategoryId'], item])).values()], 'CategoryId', subCatIds);
    let brands  = insertStatus(siteData.ItemBrandList, 'Value', brandsNames);
    setSearchTerm(query);
    const selectedSortBy = sortByOptions.find(i => i.value === sortBy);
    setSortBySelected(selectedSortBy);
    setHideOutOfStockItems(hideOutStock);
    setFilters({ categories: categories, subCategories: subCategories, brands: brands });
  }, [siteData.LinkCategoryList, siteData.LinkSubCategoryList, siteData.isLoading, queryString.catVal, queryString.subCatVal, queryString.brands, queryString.query, queryString.sortBy])          // siteData.LinkSubCategoryList resets the selected filters to initial state when globalData.location.locationId changes.

  const insertStatus = (arr, idName, activeCategoryIdList) => {
    if (activeCategoryIdList) {
        return arr.map(i => (activeCategoryIdList.includes((i[idName]).toString())) ? { ...i, isSelected: true } : { ...i, isSelected: false });
    }
    return arr.map(i => ({ ...i, isSelected: false }));
  }

  const handleFilterForm = (e) => {
    e.preventDefault();
    setHeading({ heading: 'Filtered Products', subHeading: '' });
    handleFilters(sortBySelected.value);
    setFilterActive(false);
  }

  const handleFilters = (sortBy) => {
    let selectedCategories = getSelectedItems('categories', 'Parent');
    let selectedSubCategories = getSelectedItems('subCategories', 'CategoryId');
    let selectedBrands = getSelectedItems('brands', 'Value');
    let newQueryString = { ...queryString, catVal: selectedCategories, subCatVal: selectedSubCategories, brands: selectedBrands, sortBy: sortBy, query: searchTerm, page: '1', hideOutStock: hideOutOfStockItems };
    let parsed = qs.stringify(newQueryString);
    history.push(`?${parsed}`);
  }

  const handleShowAll = (name) => {
    if (maxItems[name] === 5) return setMaxItems(pre => ({ ...pre, [name]: filters[name].length }));
    setMaxItems(pre => ({ ...pre, [name]: 5 }));
  }

  const makeFilterRequest = async (reset) => {

    let categories = getField('catVal');
    let subCategories = getField('subCatVal');
    let brands = getField('brands');
    // let brands = escape(getField('brands')).unswap;
    let sortBy = getField('sortBy') || 'NameASC';
    let query = getField('query');
    let hideOutStock = getField('hideOutStock') || 'N';
    let data = { categories: categories, subCategories: subCategories, brands: brands };

    if (isRent) {
        let categoryNames = data.categories.split(',');
        let currentItems = categoryNames.map(i => (siteData.itemMasterCollection.filter(x => x.id === Number(i))).map(k => k.data).reduce((t, p) => ([...t, ...p]))).reduce((t, p) => ([...t, ...p]));
        setProductsList({loading: false, data: {itemMasterCollection: currentItems}, err: {status: false, msg: ''}})
    } else {
        if (!userInfo.selectedCompany.EncCompanyId) return console.log('No selected company EncCompanyId found.');         // labtest also uses this page so we using selectedCompany instead of compcode.
        try {
            const res = await getFrom(`${BASE_URL}/api/Item/GetItemFilterPaging?CID=${userInfo.selectedCompany.EncCompanyId}&SearchStr=${query}&CategoryIdList=${data.categories}&SubCategoryIdList=${data.subCategories}&MFGList=${data.brands}&LOCID=${globalData.location.LocationId}&SortBy=${sortBy}&ExcludeOutOfStock=${hideOutStock}&PageNo=${currPage}&PageSize=20`, {}, setProductsList);  
            if (res) {
                if (!res.data.itemMasterCollection.length) {
                    setProductsList(pre => ({...pre, loading: false})); 
                    setHasMore(false)
                    return;
                }
                if (reset) {
                    setProductsList({loading: false, data: { itemMasterCollection: res.data.itemMasterCollection }, err: {status: false, msg: ''}})
                } else {
                    setProductsList(pre => ({...res, data: { itemMasterCollection: [...pre.data.itemMasterCollection, ...res.data.itemMasterCollection] }}))
                }
            } else {
                setHasMore(false);            
                alert('Something went wrong. Please try later.');
            } 
        } catch (error) {
            setHasMore(false);            
            alert('An Error occured. Please try later.');
            console.log(error);
        }
    }
  }

  const getSelectedItems = (keyName, idName) => {
    let selectedItems = filters[keyName].filter(i => i.isSelected === true);
    let itemsString = selectedItems.map(i => i[idName]).join(',');
    return itemsString;
  }

  const renderCategory = (keyName, idName, textName) => filters[keyName].slice(0, maxItems[keyName]).map(i => <li key={i[idName]}><input id={i[idName]} checked={i.isSelected} onChange={() => handleSelect(keyName, idName, i)} type="checkbox" name="product-categori"/><label htmlFor={i[idName]}>{i[textName]}</label> </li>);
//   const renderCategory = (keyName, idName, textName) => filters[keyName].slice(0, maxItems[keyName]).map(i => <li key={i[idName]}><img height={20} src={`/images/brands-logo/${i[textName]}.png`} /><label htmlFor={i[idName]}>{i[textName]}</label> </li>);

  const renderCount = (catName) => {
    if (filters[catName].length < 5) return;
    let hiddenItems = filters[catName].length - maxItems[catName];
    return (
        <span onClick={() => handleShowAll(catName)}>
            {hiddenItems === 0 ? '' : hiddenItems} {hiddenItems === 0 ? 'Show less' : 'more'} <i style={{transform: hiddenItems === 0 ? 'rotate(180deg)' : 'none'}} className='bx bxs-down-arrow'></i>
        </span>
    )
  }

  const renderSelectedItemButtons = (catName, idName, textName) => {
    let selectedCategories = filters[catName].filter(i => i.isSelected === true);
    return selectedCategories.map(i => <button key={i[idName]} onClick={() => handleSelect(catName, idName, i)} className="btn-clear-all"><i className="fas fa-times"></i> {i[textName]}</button>)
  }

  const uncheckAll = (arr) => arr.map(i => ({ ...i, isSelected: false }));  

  const clearAll = () => {
    setHideOutOfStockItems('N');
    let categories = uncheckAll(siteData.LinkCategoryList);
    let subCategories = uncheckAll([...new Map(siteData.LinkSubCategoryList.map(item => [item['CategoryId'], item])).values()]);
    let brands  = uncheckAll(siteData.ItemBrandList);
    setFilters({ categories: categories, subCategories: subCategories, brands: brands });
    setSearchTerm('');
  }
  
  useEffect(() => {
    // let controller = new AbortController();
    if (targetRef.current === false) return;
    setProductsList({loading: true, data: {itemMasterCollection: []}, err: {status: false, msg: ''}})
    makeFilterRequest(true);
    // return () => controller.abort();
  }, [globalData.location.LocationId, siteData.LinkCategoryList, siteData.LinkSubCategoryList, siteData.ItemBrandList, queryString.catVal, queryString.subCatVal, queryString.brands, queryString.sortBy, queryString.query, queryString.hideOutStock])


  useEffect(() => {
    if (currPage == '1') return;
    makeFilterRequest(false);
  }, [currPage])

  const handleSortBy = (item) => {
    setSortBySelected(item); 
    setSortByOpen(false);
    handleFilters(item.value);
  }
  
  let table = globalData.restaurant.table;
  const selectMember = () => {
    if (!isLoggedIn) return modalAction('LOGIN_MODAL', true);
    modalAction('MEMBER_SELECT_MODAL', true);
  }
  return (
    <div className="content-wraper pt-4 pb-60 epharma-global">
        {/* <ConnectedUpdateScroll page='filterPage' />              */}
        <div className="container">
            <div className="row">
                <div className='col-12 col-md-9 order-2 px-lg-4'>
                    <div className="single-banner shop-page-banner d-flex justify-content-between">
                        <div className={`${isRestaurant ? 'd-none d-lg-flex' : ''} flex-wrap gap-3 flex-1`}>   
                            <h4 className='d-flex justify-content-between align-items-end gap-3'>{heading.heading} <span className='d-md-none text-nowrap' style={{color: '#3b79d5', fontSize: '0.9em'}} onClick={() => setFilterActive(!filterActive)}><i className='bx bxs-filter-alt'></i>Filters</span></h4> 
                            <span>{heading.subHeading}</span>
                        </div>
                        {isRestaurant ? <div className='d-flex align-items-center justify-content-end' style={{gap: 'clamp(1em, 2.7vw, 2.5em)', fontSize: 'clamp(0.9em, 2.7vw, 1em)', flex: 1}}>   
                            <h5 className="mb-0 d-flex align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em', color: '#005ee9'}} role='button' onClick={() => modalAction('TABLE_SELECTION_MODAL', true)}><i className='bx bxs-grid-alt'></i> {table ? <>{table?.BedDesc}, &nbsp; {table?.BedGroupDesc}</> : 'Select Table'} <i style={{fontSize: '2rem', color: '#f17e1d'}} className='bx bx-caret-down'></i></h5>
                            <h5 className="mb-0 align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em', color: '#ef008d', display: isLoggedIn ? 'flex' : 'none'}}><i className='bx bxs-user'></i> {userInfo.selectedMember.MemberName}</h5>
                            <span onClick={selectMember} className='continue-button d-inline' style={{background: '#1f8dc9', padding: '0 7px', lineHeight: '2.3', borderRadius: '6px'}} role='button'>Select Entity</span>
                        </div> : ''}
                    </div>
                    {isRestaurant ? <>
                        <div className={`sidebar-categores-box p-3 mt-2 ${isRestaurant ? 'd-md-none' : ''}`}>
                            <div className="filter-sub-area pt-1 filter-grid-view">
                                <h5 className="filter-sub-titel mt-0">Selected Categories</h5>
                                <div className="categori-checkbox">
                                    <form className='d-flex gap-3 pt-2 flex-wrap'>
                                        {renderSelectedItemButtons('categories', 'Parent', 'ParentDesc')}
                                        <button onClick={clearAll} type='button' className="btn-clear-all"><i className="fas fa-times"></i> Clear All</button> 
                                    </form>
                                </div>
                                <h5 className="filter-sub-titel mt-4">Categories</h5>
                                <div className="categori-checkbox">
                                    <form action="#">
                                        <ul className='list-inline'>
                                            {renderCategory('categories', 'Parent', 'ParentDesc')}
                                        </ul>
                                    </form>
                                    <div className='d-flex gap-2'>
                                        {/* <div className='flex-1'>
                                            {renderCount('categories')}
                                        </div> */}
                                        <span className='continue-button d-block text-center text-white flex-1' style={{background: '#1f8dc9'}} role='button' onClick={handleFilterForm} to={'#'}>Apply Filters</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='d-flex justify-content-between pb-3 flex-column' style={{fontSize: 'clamp(0.9em, 2.7vw, 0.93em)', padding: '1em 0.8em', marginTop: '1em', background: 'aliceblue'}}>  
                            <div className='me-auto'>
                                <h5 className="mb-0 d-flex align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em'}}><i className='bx bxs-grid-alt'></i> Order ID: ######</h5>
                                <div className="details-rows mt-2">
                                    <div className="details-row border-0 px-0 gap-3 py-1">
                                        <p className='text-dark'>Customer Name: </p><p> Mr. Ashish Sinha</p>
                                    </div>
                                    <div className="details-row border-0 p-0 gap-3">
                                        <p className='text-dark'>Phone Number: </p><p>7004654984</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <h5 className="filter-sub-titel text-end pb-2" style={{fontSize: '1.3em', borderBottom: '1px solid #bfbfbf'}}>INCLUDED ITEMS</h5>
                                <div style={{fontSize: '1.2em', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '0.6em'}}>
                                    {productsList.data.itemMasterCollection.slice(0, 5).map(i => (
                                        <ConnectedCartCardM data={i} />
                                    ))}
                                </div>
                            </div>
                        </div> */}
                    </>
                    : ''}
                    
                    <div className="shop-top-bar mt-xs-5 mt-10 bg-light">
                        <div className="shop-bar-inner">
                            {b2bMode || <div className="product-view-mode me-4">
                                <ul className="nav shop-item-filter-list" role="tablist">
                                    <li><span onClick={() => setTabActive('grid-view')} className={`${tabActive === 'grid-view' && 'show active'}`}><i className="fa fa-th"></i></span></li>
                                    <li><span onClick={() => setTabActive('list-view')} className={`${tabActive === 'list-view' && 'show active'}`}><i className="fa fa-th-list"></i></span></li>
                                </ul>
                            </div>}
                            <div className="toolbar-amount">
                                {/* <span>Showing {1+((activePage-1)*visibleItems)} - {lastProductIndex > totalProducts ? totalProducts : lastProductIndex} of {totalProducts} items</span> */}
                                <span>Showing {totalProducts} items.</span>
                            </div>
                        </div>
                        <div className="product-select-box" ref={sortByOpenRef}>
                            <div className="product-short">
                                <p>Sort By:</p>
                                <div className={`nice-select select-filter-category ${sortByOpen ? 'open' : ''}`} tabIndex="0" onClick={() => setSortByOpen(!sortByOpen)}>
                                    <span className="current">{sortBySelected.name}</span>
                                    <ul className="list">
                                        {sortByOptions.map((item, index) => <li key={index} onClick={() => handleSortBy(item)} className={`option ${sortBySelected.id === item.id && 'selected focus'}`}>{item.name}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shop-products-wrapper" ref={filterResultsRef}>
                        <div className={`tab-content ${isHospital && 'bg-slate-100 border-medium border-top-0'}`}>
                            {renderProducts(productsList)}
                            {hasMore && <div ref={targetRef}><GridLoader containerClass='gap-3 gap-md-4 mb-6 flex-wrap py-3' count={10} classes='rounded-lg h-[242px] min-w-[140px] lg:h-[288px] lg:min-w-[170px] flex-1' /></div>}
                        </div>
                        <div className="paginatoin-area bg-gray-100">
                            <div className="row">
                                {hasMore || <div className="col-12">
                                    <h2 className="text-sky-600 text-center font-poppins my-4">No more Products Found!</h2>
                                </div>}
                                {/* <div className="col-lg-6 col-md-6 d-flex gap-4">
                                    <p className='text-nowrap'>Showing {activePage} of <span role='button' className='text-primary' onClick={() => gotoPage(totalPages)}>{totalPages === 0 ? 1 : totalPages}</span> page(s)</p>
                                    <form onSubmit={(e) => {e.preventDefault();gotoPage(goto)}}>
                                        <div className="input-group flex-nowrap">
                                            <input className="form-control" onChange={(e) => setGoto(e.target.value)} value={goto} type="text" placeholder="Goto Page" />
                                            <span className="input-group-text" id="basic-addon2" onClick={() => gotoPage(goto)}>GO</span>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <ul className="pagination-box pt-xs-20 pb-xs-15">
                                        <li onClick={previousPage}><span className={`Previous ${activePage === 1 && 'pe-none opacity-50'}`}><i className="fa fa-chevron-left"></i> Previous</span></li>
                                        <li className="active"><span>{activePage}</span></li>
                                        <li onClick={() => gotoPage(activePage+1)}><span>{activePage < totalPages && activePage + 1}</span></li>
                                        <li onClick={() => gotoPage(activePage+2)}><span>{activePage + 1 < totalPages && activePage + 2}</span></li>
                                        <li onClick={nextPage}><span className={`Next ${activePage >= totalPages && 'pe-none opacity-50'}`}> Next <i className="fa fa-chevron-right"></i></span></li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
              
                <div className={`col-md-3 order-1`}>                    
                    <div className={`sidebar-categores-box light-bg hide-on-mobile ${filterActive ? `show` : ''}`} style={{'--clr': 'var(--bg-1)'}}>
                        <div className="sidebar-title border-0" style={{cursor: 'pointer'}}>
                            <h2 onClick={() => setFilterActive(!filterActive)} className='d-flex align-items-center gap-2 mb-3'><span className='me-auto'>Advance Filters</span> <span className={`d-sm-none`}><i className='bx bx-x'></i> Close</span></h2>
                        </div>
                        <div className="filter-sub-area pt-sm-10 pb-sm-15 pb-xs-0">
                            <div className="categori-checkbox">
                                <form onSubmit={handleFilterForm}>
                                    <div className="input-group flex-nowrap">
                                        <input className="form-control" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} name="query" type="text" placeholder="Search by name" />
                                        <span className="input-group-text" id="basic-addon2" onClick={handleFilterForm}>Search</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="filter-sub-area pt-sm-10 pb-sm-15 pb-xs-0">
                            <h5 className="filter-sub-titel">Selected Categories</h5>
                            <div className="categori-checkbox">
                                <form className='d-flex gap-3 pt-3 flex-wrap'>
                                    {renderSelectedItemButtons('categories', 'Parent', 'ParentDesc')}
                                    {renderSelectedItemButtons('subCategories', 'CategoryId', 'CategoryDesc')}
                                    {renderSelectedItemButtons('brands', 'Value', 'Text')} 
                                    <button onClick={clearAll} type='button' className="btn-clear-all"><i className="fas fa-times"></i> Clear All</button> 
                                </form>
                                {(isHospital || isRestaurant) ? '' : <form className='pt-3'>
                                    <ul className="list-inline">
                                        <li className='mb-0'>
                                            <input id="stocks" type="checkbox" onChange={() => setHideOutOfStockItems(hideOutOfStockItems === 'Y' ? 'N' : 'Y')} checked={hideOutOfStockItems === 'Y' ? true : false} name="product-stocks" />
                                            <label htmlFor="stocks">Hide out of stock items</label> 
                                        </li>
                                    </ul>
                                </form>}
                            </div>
                        </div>
                        {isHospital ? '' : siteData.isLoading ? 
                            <Spinner min_height='39rem' fSize='2.5rem'/> : 
                            <div>                                                       {/* className={filterActive ? `` : 'hide-on-mobile'} */}
                                {filters.categories.length ? <div className="filter-sub-area pt-sm-10 pt-xs-10">
                                    <h5 className="filter-sub-titel">Categories</h5>
                                    <div className="categori-checkbox">
                                        <form action="#">
                                            <ul className='list-inline'>
                                                {renderCategory('categories', 'Parent', 'ParentDesc')}
                                            </ul>
                                        </form>
                                        {renderCount('categories')}
                                    </div>
                                </div> : ''}
                                {filters.subCategories.length ? <div className="filter-sub-area">
                                    <h5 className="filter-sub-titel">Sub Categories</h5>
                                    <div className="categori-checkbox">
                                        <form action="#">
                                            <ul className='list-inline'>
                                                {renderCategory('subCategories', 'CategoryId', 'CategoryDesc')}
                                            </ul>
                                        </form>
                                        {renderCount('subCategories')}
                                    </div>
                                </div> : ''}
                                {filters.brands.length ? <div className="filter-sub-area">
                                    <h5 className="filter-sub-titel">Brands</h5>
                                    <div className="categori-checkbox">
                                        <form action="#">
                                            <ul className='list-inline'>
                                                {renderCategory('brands', 'Value', 'Text')}
                                            </ul>
                                        </form>
                                        {renderCount('brands')}
                                    </div>
                                </div> : ''}                               
                            </div>
                        }
                        <span className='continue-button d-block text-center mt-3 mt-lg-4 position-sticky bottom-0 left-0' style={{background: '#1f8dc9'}} role='button' onClick={handleFilterForm} to={'#'}>Apply Filters</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { compCode: state.compCode, modals: state.modals, isMobile: state.isMobile, siteData: state.siteData, globalData: state.globalData, userInfo: state.userInfo, isLoggedIn: state.isLoggedIn, filterData: state.filterData, vType: state.vType };
}

export default connect(mapStateToProps, {breadCrumbAction, modalAction, globalDataAction, filterAction})(FilterPage);





// import { useState, useEffect, useRef } from 'react';
// import { connect } from 'react-redux';
// import { breadCrumbAction, filterAction, globalDataAction, modalAction } from '../../../actions';
// import { CardType5, ConnectedProductCard, ConnectedProductCard1, ConnectedSearchListCard } from '../ePharma/cards';
// import { ConnectedCartCardM, ConnectedProductCardM } from '../ePharma/mobileView/cards';
// import { Link, useHistory, useLocation } from 'react-router-dom';
// import { ConnectedUpdateScroll, getFrom, scrollPage, scrollToContent, Spinner, escape } from '../ePharma/utilities';
// import { BASE_URL, ePharmaId, RAJE_RESTAURANT_ID, TAKE_HOME_ID, XYZ_ID } from '../../../constants';
// import qs from 'query-string';
// import { ConnectedLabTestCard, ConnectedPharmacyCard2 } from './cards';
// import { ConnectedProductCard3 } from '../ePharma/B2B/Home';
// import { today } from './utilities';
// import { GridLoader } from '../../utils/utils';

// const FilterPage = ({ siteData, breadCrumbAction, compCode, modals, modalAction, isMobile, globalData, globalDataAction, userInfo, isLoggedIn, filterData, filterAction, vType }) => {

//     const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
//     const b2bMode = globalData.userRegType.CodeValue === 'Retailer';
//     const isHospital = (vType === 'ErpHospital'); 
//     const isRent = vType === 'rent';

//     const history = useHistory();    
//     const location = useLocation();
//     const queryString = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 

//     const getField = (key) => queryString[key] || '';

//     const filterCategoryName = escape(getField('head')).unswap;                            // head and subHead are used only to show heading on first load of filterpage.
//     const filterSubCategoryName = escape(getField('subHead')).unswap;
//     const currPage = getField('page') || '1';

//     const [heading, setHeading] = useState({ heading: '', subHeading: '' });

//     useEffect(() => {
//         if (currPage) {
//             setActivePage(parseInt(currPage));
//         };
//     },[currPage])
    
//     useEffect(() => {
//         setHeading({ heading: filterCategoryName, subHeading: filterSubCategoryName });
//     }, [filterCategoryName, filterSubCategoryName])

//     const [activePage, setActivePage] = useState(1);
//     const sortByOpenRef = useRef();
//     const [filterActive, setFilterActive] = useState(false);  

//     useEffect(() => {
// 		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: filterCategoryName, link: '/filterPage'}], activeLink: '/filterPage'});
//     },[breadCrumbAction, filterCategoryName])    

//     useEffect(() => {
//         const onBodyClick = (event) => {
//             if (sortByOpenRef.current && sortByOpenRef.current.contains(event.target)) return;                          // Return if click is triggered from search field form or it's inner elements.
//             setSortByOpen(false);                                                                                       // close select element only if click is triggered rest of the elements (outer body).                                                                                         // close cart dropdown only if click is triggered rest of the elements (outer body).
//         }
//         document.body.addEventListener('click', onBodyClick, { capture: true });                                                // Add eventlistener on component mount.
//         return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                                // Remove Eventlistener on component unmount.
//     }, [])

//   const initTab = isRent ? 'list-view' : 'grid-view';    
//   const [tabActive, setTabActive] = useState(initTab); 
//   const [productsList, setProductsList] = useState({loading: true, data: {itemMasterCollection: []}, err: {status: false, msg: ''}});
//   const [goto, setGoto] = useState('');

//   const nextPage = () => {
//     if (activePage >= totalPages) return;
//     let newQueryString = { ...queryString, page: activePage + 1 };
//     let parsed = qs.stringify(newQueryString);
//     history.push(`?${parsed}`);
//     scrollToContent(filterResultsRef);
//   }
    
//   const previousPage = () => {
//       // if (activePage !== 1) return setActivePage(activePage-1);
//     if (activePage !== 1) {
//         let newQueryString = { ...queryString, page: activePage - 1 };
//         let parsed = qs.stringify(newQueryString);
//         history.push(`?${parsed}`);
//         scrollToContent(filterResultsRef);
//     }
//   };

//   const gotoPage = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//         let newQueryString = { ...queryString, page: pageNumber };
//         let parsed = qs.stringify(newQueryString);
//         history.push(`?${parsed}`);
//         scrollToContent(filterResultsRef);
//         setGoto('');
//     } else {
//         alert('Please enter a valid page number.');
//     }
//   }

//   const visibleItems = 20;                                                 // Number of items currently visible on the page.
//   const lastProductIndex = activePage*visibleItems;
//   const totalProducts = productsList.data.itemMasterCollection.length;
// //   const totalPages = Math.ceil(totalProducts / visibleItems);
//   const totalPages = productsList.data.itemMasterCollection[0]?.PageCnt || 1;

//   const renderProducts = (data) => {
//     if (data.loading) {
//     //   return <Spinner min_height='39rem' fSize='2.5rem'/>;
//       return <GridLoader containerClass='gap-3 gap-md-4 mb-6 flex-wrap py-3' count={10} classes='rounded-lg h-[242px] min-w-[140px] lg:h-[288px] lg:min-w-[170px] flex-1' />;
//     } else if (data.err.status) {
//       return <div className='text-center py-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
//     } else if (data.data.itemMasterCollection.length === 0) {
//       return <div className='text-center py-5 w-100'><h2 className="text-info">No Product found for current filters!</h2></div>;
//     } else {
//       scrollPage('filterPage', globalDataAction);                       // scroll page only when content is ready.
//       return (
//         <>
//             {(() => {
//                 if (isHospital) {
//                     return (
//                         <div id="grid-view" className={`tab-pane fade ${tabActive === 'grid-view' && 'active show'}`} role="tabpanel">
//                             <div className="product-area shop-product-area">    
//                                 <div className="row">                       
//                                     <div className="col-12 filter-view" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5em', padding: '1em 1.5em'}}>
//                                         {productsList.data.itemMasterCollection.map((item, index) => {
//                                             return (
//                                                 <div key={index} className='pharmacy-cards'>
//                                                     <ConnectedLabTestCard data={item} key={item.LocationItemId} testDate={today} />
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 } else if (b2bMode) {
//                     return (
//                         <div id="list-view" className={`tab-pane fade product-list-view active show`} role="tabpanel">
//                             <div className="row">
//                                 <div className={`col mt-15 d-flex flex-wrap flex-column gap-0`} style={{padding: '0em 0.55em 0.2em', fontSize: '1.2em'}}>
//                                     {productsList.data.itemMasterCollection.map((item, index) => {
//                                         return <ConnectedProductCard3 styles={{maxWidth: 'none'}} data={item} key={index} />
//                                     })} 
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 } else if (isRent) {
//                     return (
//                         <>
//                             <div id="grid-view" className={`tab-pane fade ${tabActive === 'grid-view' && 'active show'}`} role="tabpanel">
//                                 <div className="product-area shop-product-area">
//                                     <style>{`   
//                                         .product-area .d-grid {
//                                             grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
//                                         }
//                                         @media only screen and (max-width: 1199px) {
//                                             .product-area .d-grid {
//                                                 grid-template-columns: 1fr 1fr;
//                                             }
//                                         }   
//                                     `}</style>
//                                     <div className="row">                       
//                                         <div className="col-12 d-grid" style={{gap: '1em', padding: '1em 0.7em 0'}}>
//                                             {productsList.data.itemMasterCollection.map((item, index) => {
//                                                 return (
//                                                     <CardType5 classes='bg-slate-100' data={item} key={index} />
//                                                 )
//                                             })}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div id="list-view" className={`tab-pane fade product-list-view ${tabActive === 'list-view' && 'active show'}`} role="tabpanel">
//                                 <div className="row">
//                                     <div className={`col d-grid`} style={{ padding: '1em 0.55em 0.2em', fontSize: '1.15em', gap: '1em', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
//                                         {productsList.data.itemMasterCollection.map((item, index) => {
//                                             return <CardType5 data={item} key={index} classes='landscape bg-slate-100' />
//                                         })} 
//                                     </div>
//                                 </div>
//                             </div>
//                         </>
//                     )
//                 } else {
//                     return (
//                         <>
//                             <div id="grid-view" className={`tab-pane fade ${tabActive === 'grid-view' && 'active show'}`} role="tabpanel">
//                                 <div className="product-area shop-product-area">
//                                     { 
//                                         isMobile ? 
//                                         <div id='mobile-card-view' style={{fontSize: '1.18em'}}>
//                                             {productsList.data.itemMasterCollection.map((item, index) => <ConnectedProductCardM key={index} data={item}/>)}
//                                         </div>
//                                         :                                       // Encoutering multiple items with same LocationItemId hence using index as key.
//                                         <div className="row">                       
//                                             <div className="col-12 d-flex flex-wrap justify-content-around filter-view" style={{columnGap: '0.85em'}}>
//                                                 {productsList.data.itemMasterCollection.map((item, index) => {
//                                                         if (compCode === ePharmaId || vType === 'agro' || vType === 'ErpManufacturing') {
//                                                             return (
//                                                                 <div style={{marginTop: '1.8em', fontSize: '0.94em'}} key={index}>
//                                                                     <ConnectedProductCard data={item} />
//                                                                 </div>
//                                                             )
//                                                         } else if (compCode === TAKE_HOME_ID || compCode === XYZ_ID || isRestaurant) {
//                                                             return (
//                                                                 <div style={{marginTop: '1.8em', maxWidth: '15.8em'}} key={index}>
//                                                                     <ConnectedProductCard1 data={item} />
//                                                                 </div>
//                                                             )
//                                                         } else {
//                                                             return (
//                                                                 <div style={{marginTop: '1.8em'}} key={index} className='pharmacy-cards'>
//                                                                     <ConnectedPharmacyCard2 data={item} />
//                                                                 </div>
//                                                             )
//                                                         }
//                                                     }                                    
//                                                 )}
//                                             </div>
//                                         </div>
//                                     }  
//                                 </div>
//                             </div>
//                             <div id="list-view" className={`tab-pane fade product-list-view ${tabActive === 'list-view' && 'active show'}`} role="tabpanel">
//                                 <div className="row">
//                                     <div className={`col mt-15 d-flex flex-wrap gap-3`} style={{padding: '0em 0.55em 0.2em', fontSize: '1.25em'}}>
//                                         {productsList.data.itemMasterCollection.map((item, index) => {
//                                             return <ConnectedSearchListCard data={item} key={index} />
//                                         })} 
//                                     </div>
//                                 </div>
//                             </div>
//                         </>
//                     )
//                 }
//             })()}
//         </>
//       )
//     }
//   }

// //   ---------------------------------------------- FILTERS STARTS ----------------------------------------------------------------------------------------------------------------

//   const [filters, setFilters] = useState({ categories: [], subCategories: [], brands: [] }); 
//   const [hideOutOfStockItems, setHideOutOfStockItems] = useState('N');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortByOpen, setSortByOpen] = useState(false);
//   const [sortBySelected, setSortBySelected] = useState({ name: 'Name (A - Z)', id: 2, value: 'NameASC'}); 
//   const filterResultsRef = useRef(null);
//   let visibleCount = 5;

// //   if (compCode === TAKE_HOME_ID) visibleCount = 20;
//   const [maxItems, setMaxItems] = useState({ categories: visibleCount, subCategories: visibleCount, brands: visibleCount });

//   const sortByOptions = [
//     { name: 'Name (A - Z)', id: 2, value: 'NameASC'},
//     { name: 'Name (Z - A)', id: 3, value: 'NameDESC'},
//     { name: 'Price (Low > High)', id: 4, value: 'PriceASC'},
//     { name: 'Price (High > Low)', id: 5, value: 'PriceDESC'},
//   ]

//   const handleSelect = (catName, catIdName, item) => {
//     let allFilterData = { ...filters };
//     let targetCategory = allFilterData[catName];
//     let toggleIsSelected = targetCategory.map(i => i[catIdName] === item[catIdName] ? { ...i, isSelected: !i.isSelected} : i);
//     setFilters(pre => ({ ...pre, [catName]: toggleIsSelected }));
//   }

//   useEffect(() => {
//     if (siteData.isLoading) return;

//     let catIds = getField('catVal').split(',');
//     let subCatIds = getField('subCatVal').split(',');
//     let brandsNames = getField('brands').split(',');
//     // let brandsNames = (escape(getField('brands')).unswap).split(',');
//     let query = getField('query');
//     let sortBy = getField('sortBy') || 'NameASC';
//     let hideOutStock = getField('hideOutStock') || 'N';
    
//     let categories = insertStatus(siteData.LinkCategoryList, 'Parent', catIds);
//     let subCategories = insertStatus([...new Map(siteData.LinkSubCategoryList.map(item => [item['CategoryId'], item])).values()], 'CategoryId', subCatIds);
//     let brands  = insertStatus(siteData.ItemBrandList, 'Value', brandsNames);
//     setSearchTerm(query);
//     const selectedSortBy = sortByOptions.find(i => i.value === sortBy);
//     setSortBySelected(selectedSortBy);
//     setHideOutOfStockItems(hideOutStock);
//     setFilters({ categories: categories, subCategories: subCategories, brands: brands });
//   }, [siteData.LinkSubCategoryList, queryString.catVal, queryString.subCatVal, queryString.brands, queryString.query, queryString.sortBy])          // siteData.LinkSubCategoryList resets the selected filters to initial state when globalData.location.locationId changes.

//   const insertStatus = (arr, idName, activeCategoryIdList) => {
//     if (activeCategoryIdList) {
//         return arr.map(i => (activeCategoryIdList.includes((i[idName]).toString())) ? { ...i, isSelected: true } : { ...i, isSelected: false });
//     }
//     return arr.map(i => ({ ...i, isSelected: false }));
//   }

//   const handleFilterForm = (e) => {
//     e.preventDefault();
//     setHeading({ heading: 'Filtered Products', subHeading: '' });
//     handleFilters(sortBySelected.value);
//     setFilterActive(false);
//   }

//   const handleFilters = (sortBy) => {
//     let selectedCategories = getSelectedItems('categories', 'Parent');
//     let selectedSubCategories = getSelectedItems('subCategories', 'CategoryId');
//     let selectedBrands = getSelectedItems('brands', 'Value');
//     let newQueryString = { ...queryString, catVal: selectedCategories, subCatVal: selectedSubCategories, brands: selectedBrands, sortBy: sortBy, query: searchTerm, page: '1', hideOutStock: hideOutOfStockItems };
//     let parsed = qs.stringify(newQueryString);
//     history.push(`?${parsed}`);
//   }

//   const handleShowAll = (name) => {
//     if (maxItems[name] === 5) return setMaxItems(pre => ({ ...pre, [name]: filters[name].length }));
//     setMaxItems(pre => ({ ...pre, [name]: 5 }));
//   }

//   const makeFilterRequest = async (data, sortBy, query, hideOutStock, signal) => {
//     if (isRent) {
//         let categoryNames = data.categories.split(',');
//         let currentItems = categoryNames.map(i => (siteData.itemMasterCollection.filter(x => x.id === Number(i))).map(k => k.data).reduce((t, p) => ([...t, ...p]))).reduce((t, p) => ([...t, ...p]));
//         setProductsList({loading: false, data: {itemMasterCollection: currentItems}, err: {status: false, msg: ''}})
//     } else {
//         if (!userInfo.selectedCompany.EncCompanyId) return console.log('No selected company EncCompanyId found.');         // labtest also uses this page so we using selectedCompany instead of compcode.
//         const res = await getFrom(`${BASE_URL}/api/Item/GetItemFilterPaging?CID=${userInfo.selectedCompany.EncCompanyId}&SearchStr=${query}&CategoryIdList=${data.categories}&SubCategoryIdList=${data.subCategories}&MFGList=${data.brands}&LOCID=${globalData.location.LocationId}&SortBy=${sortBy}&ExcludeOutOfStock=${hideOutStock}&PageNo=${currPage}&PageSize=20`, {}, setProductsList);  
//         if (res) {
//             setProductsList(res);
//             // filterAction('searchString', location.search);
//             // filterAction('products', res.data.itemMasterCollection.slice(0, 100));
//         }
//     }
//   }

//   const getSelectedItems = (keyName, idName) => {
//     let selectedItems = filters[keyName].filter(i => i.isSelected === true);
//     let itemsString = selectedItems.map(i => i[idName]).join(',');
//     return itemsString;
//   }

//   const renderCategory = (keyName, idName, textName) => filters[keyName].slice(0, maxItems[keyName]).map(i => <li key={i[idName]}><input id={i[idName]} checked={i.isSelected} onChange={() => handleSelect(keyName, idName, i)} type="checkbox" name="product-categori"/><label htmlFor={i[idName]}>{i[textName]}</label> </li>);
// //   const renderCategory = (keyName, idName, textName) => filters[keyName].slice(0, maxItems[keyName]).map(i => <li key={i[idName]}><img height={20} src={`/images/brands-logo/${i[textName]}.png`} /><label htmlFor={i[idName]}>{i[textName]}</label> </li>);

//   const renderCount = (catName) => {
//     if (filters[catName].length < 5) return;
//     let hiddenItems = filters[catName].length - maxItems[catName];
//     return (
//         <span onClick={() => handleShowAll(catName)}>
//             {hiddenItems === 0 ? '' : hiddenItems} {hiddenItems === 0 ? 'Show less' : 'more'} <i style={{transform: hiddenItems === 0 ? 'rotate(180deg)' : 'none'}} className='bx bxs-down-arrow'></i>
//         </span>
//     )
//   }

//   const renderSelectedItemButtons = (catName, idName, textName) => {
//     let selectedCategories = filters[catName].filter(i => i.isSelected === true);
//     return selectedCategories.map(i => <button key={i[idName]} onClick={() => handleSelect(catName, idName, i)} className="btn-clear-all"><i className="fas fa-times"></i> {i[textName]}</button>)
//   }

//   const uncheckAll = (arr) => arr.map(i => ({ ...i, isSelected: false }));  

//   const clearAll = () => {
//     setHideOutOfStockItems('N');
//     let categories = uncheckAll(siteData.LinkCategoryList);
//     let subCategories = uncheckAll([...new Map(siteData.LinkSubCategoryList.map(item => [item['CategoryId'], item])).values()]);
//     let brands  = uncheckAll(siteData.ItemBrandList);
//     setFilters({ categories: categories, subCategories: subCategories, brands: brands });
//     setSearchTerm('');
//   }
  
//   useEffect(() => {
//     let controller = new AbortController();
//     let categories = getField('catVal');
//     let subCategories = getField('subCatVal');
//     let brands = getField('brands');
//     // let brands = escape(getField('brands')).unswap;
//     let sortBy = getField('sortBy') || 'NameASC';
//     let query = getField('query');
//     let hideOutStock = getField('hideOutStock') || 'N';
//     let params = { categories: categories, subCategories: subCategories, brands: brands };

//     // if (location.search === filterData.searchString) {
//     //     setProductsList({loading: false, data: {itemMasterCollection: filterData.products}, err: {status: false, msg: ''}});
//     //     return;
//     // }


//     makeFilterRequest(params, sortBy, query, hideOutStock, controller.signal);
//     return () => controller.abort();
//   }, [globalData.location.LocationId, queryString.catVal, queryString.subCatVal, queryString.brands, queryString.sortBy, queryString.query, queryString.hideOutStock, currPage])

//   const handleSortBy = (item) => {
//     setSortBySelected(item); 
//     setSortByOpen(false);
//     handleFilters(item.value);
//   }
  
//   let table = globalData.restaurant.table;
//   const selectMember = () => {
//     if (!isLoggedIn) return modalAction('LOGIN_MODAL', true);
//     modalAction('MEMBER_SELECT_MODAL', true);
//   }
//   return (
//     <div className="content-wraper pt-4 pb-60 epharma-global">
//         <ConnectedUpdateScroll page='filterPage' />                {/* updates the scroll position for the filterPage in redux state. */}
//         <div className="container">
//             <div className="row">
//                 <div className='col-12 col-md-9 order-2 px-lg-4'>
//                     <div className="single-banner shop-page-banner d-flex justify-content-between">
//                         <div className={`${isRestaurant ? 'd-none d-lg-flex' : ''} flex-wrap gap-3 flex-1`}>   
//                             <h4 className='d-flex justify-content-between align-items-end gap-3'>{heading.heading} <span className='d-md-none text-nowrap' style={{color: '#3b79d5', fontSize: '0.9em'}} onClick={() => setFilterActive(!filterActive)}><i className='bx bxs-filter-alt'></i>Filters</span></h4> 
//                             <span>{heading.subHeading}</span>
//                         </div>
//                         {isRestaurant ? <div className='d-flex align-items-center justify-content-end' style={{gap: 'clamp(1em, 2.7vw, 2.5em)', fontSize: 'clamp(0.9em, 2.7vw, 1em)', flex: 1}}>   
//                             <h5 className="mb-0 d-flex align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em', color: '#005ee9'}} role='button' onClick={() => modalAction('TABLE_SELECTION_MODAL', true)}><i className='bx bxs-grid-alt'></i> {table ? <>{table?.BedDesc}, &nbsp; {table?.BedGroupDesc}</> : 'Select Table'} <i style={{fontSize: '2rem', color: '#f17e1d'}} className='bx bx-caret-down'></i></h5>
//                             <h5 className="mb-0 align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em', color: '#ef008d', display: isLoggedIn ? 'flex' : 'none'}}><i className='bx bxs-user'></i> {userInfo.selectedMember.MemberName}</h5>
//                             <span onClick={selectMember} className='continue-button d-inline' style={{background: '#1f8dc9', padding: '0 7px', lineHeight: '2.3', borderRadius: '6px'}} role='button'>Select Entity</span>
//                         </div> : ''}
//                     </div>
//                     {isRestaurant ? <>
//                         <div className={`sidebar-categores-box p-3 mt-2 ${isRestaurant ? 'd-md-none' : ''}`}>
//                             <div className="filter-sub-area pt-1 filter-grid-view">
//                                 <h5 className="filter-sub-titel mt-0">Selected Categories</h5>
//                                 <div className="categori-checkbox">
//                                     <form className='d-flex gap-3 pt-2 flex-wrap'>
//                                         {renderSelectedItemButtons('categories', 'Parent', 'ParentDesc')}
//                                         <button onClick={clearAll} type='button' className="btn-clear-all"><i className="fas fa-times"></i> Clear All</button> 
//                                     </form>
//                                 </div>
//                                 <h5 className="filter-sub-titel mt-4">Categories</h5>
//                                 <div className="categori-checkbox">
//                                     <form action="#">
//                                         <ul className='list-inline'>
//                                             {renderCategory('categories', 'Parent', 'ParentDesc')}
//                                         </ul>
//                                     </form>
//                                     <div className='d-flex gap-2'>
//                                         {/* <div className='flex-1'>
//                                             {renderCount('categories')}
//                                         </div> */}
//                                         <span className='continue-button d-block text-center text-white flex-1' style={{background: '#1f8dc9'}} role='button' onClick={handleFilterForm} to={'#'}>Apply Filters</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <div className='d-flex justify-content-between pb-3 flex-column' style={{fontSize: 'clamp(0.9em, 2.7vw, 0.93em)', padding: '1em 0.8em', marginTop: '1em', background: 'aliceblue'}}>  
//                             <div className='me-auto'>
//                                 <h5 className="mb-0 d-flex align-items-center lh-0" style={{fontSize: '1.1em', gap: '0.3em'}}><i className='bx bxs-grid-alt'></i> Order ID: ######</h5>
//                                 <div className="details-rows mt-2">
//                                     <div className="details-row border-0 px-0 gap-3 py-1">
//                                         <p className='text-dark'>Customer Name: </p><p> Mr. Ashish Sinha</p>
//                                     </div>
//                                     <div className="details-row border-0 p-0 gap-3">
//                                         <p className='text-dark'>Phone Number: </p><p>7004654984</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='flex-1'>
//                                 <h5 className="filter-sub-titel text-end pb-2" style={{fontSize: '1.3em', borderBottom: '1px solid #bfbfbf'}}>INCLUDED ITEMS</h5>
//                                 <div style={{fontSize: '1.2em', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '0.6em'}}>
//                                     {productsList.data.itemMasterCollection.slice(0, 5).map(i => (
//                                         <ConnectedCartCardM data={i} />
//                                     ))}
//                                 </div>
//                             </div>
//                         </div> */}
//                     </>
//                     : ''}
                    
//                     <div className="shop-top-bar mt-xs-5 mt-10 bg-light">
//                         <div className="shop-bar-inner">
//                             {b2bMode || <div className="product-view-mode me-4">
//                                 <ul className="nav shop-item-filter-list" role="tablist">
//                                     <li><span onClick={() => setTabActive('grid-view')} className={`${tabActive === 'grid-view' && 'show active'}`}><i className="fa fa-th"></i></span></li>
//                                     <li><span onClick={() => setTabActive('list-view')} className={`${tabActive === 'list-view' && 'show active'}`}><i className="fa fa-th-list"></i></span></li>
//                                 </ul>
//                             </div>}
//                             <div className="toolbar-amount">
//                                 <span>Showing {1+((activePage-1)*visibleItems)} - {lastProductIndex > totalProducts ? totalProducts : lastProductIndex} of {totalProducts} items</span>
//                             </div>
//                         </div>
//                         <div className="product-select-box" ref={sortByOpenRef}>
//                             <div className="product-short">
//                                 <p>Sort By:</p>
//                                 <div className={`nice-select select-filter-category ${sortByOpen ? 'open' : ''}`} tabIndex="0" onClick={() => setSortByOpen(!sortByOpen)}>
//                                     <span className="current">{sortBySelected.name}</span>
//                                     <ul className="list">
//                                         {sortByOptions.map((item, index) => <li key={index} onClick={() => handleSortBy(item)} className={`option ${sortBySelected.id === item.id && 'selected focus'}`}>{item.name}</li>)}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="shop-products-wrapper" ref={filterResultsRef}>
//                         <div className={`tab-content ${isHospital && 'bg-slate-100 border-medium border-top-0'}`}>
//                             {renderProducts(productsList)}
//                         </div>
//                         <div className="paginatoin-area">
//                             <div className="row">
//                                 <div className="col-lg-6 col-md-6 d-flex gap-4">
//                                     <p className='text-nowrap'>Showing {activePage} of <span role='button' className='text-primary' onClick={() => gotoPage(totalPages)}>{totalPages === 0 ? 1 : totalPages}</span> page(s)</p>
//                                     <form onSubmit={(e) => {e.preventDefault();gotoPage(goto)}}>
//                                         <div className="input-group flex-nowrap">
//                                             <input className="form-control" onChange={(e) => setGoto(e.target.value)} value={goto} type="text" placeholder="Goto Page" />
//                                             <span className="input-group-text" id="basic-addon2" onClick={() => gotoPage(goto)}>GO</span>
//                                         </div>
//                                     </form>
//                                 </div>
//                                 <div className="col-lg-6 col-md-6">
//                                     <ul className="pagination-box pt-xs-20 pb-xs-15">
//                                         <li onClick={previousPage}><span className={`Previous ${activePage === 1 && 'pe-none opacity-50'}`}><i className="fa fa-chevron-left"></i> Previous</span></li>
//                                         <li className="active"><span>{activePage}</span></li>
//                                         <li onClick={() => gotoPage(activePage+1)}><span>{activePage < totalPages && activePage + 1}</span></li>
//                                         <li onClick={() => gotoPage(activePage+2)}><span>{activePage + 1 < totalPages && activePage + 2}</span></li>
//                                         <li onClick={nextPage}><span className={`Next ${activePage >= totalPages && 'pe-none opacity-50'}`}> Next <i className="fa fa-chevron-right"></i></span></li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
              
//                 <div className={`col-md-3 order-1`}>                    
//                     <div className={`sidebar-categores-box light-bg hide-on-mobile ${filterActive ? `show` : ''}`} style={{'--clr': 'var(--bg-1)'}}>
//                         <div className="sidebar-title border-0" style={{cursor: 'pointer'}}>
//                             <h2 onClick={() => setFilterActive(!filterActive)} className='d-flex align-items-center gap-2 mb-3'><span className='me-auto'>Advance Filters</span> <span className={`d-sm-none`}><i className='bx bx-x'></i> Close</span></h2>
//                         </div>
//                         <div className="filter-sub-area pt-sm-10 pb-sm-15 pb-xs-0">
//                             <div className="categori-checkbox">
//                                 <form onSubmit={handleFilterForm}>
//                                     <div className="input-group flex-nowrap">
//                                         <input className="form-control" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} name="query" type="text" placeholder="Search by name" />
//                                         <span className="input-group-text" id="basic-addon2" onClick={handleFilterForm}>Search</span>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                         <div className="filter-sub-area pt-sm-10 pb-sm-15 pb-xs-0">
//                             <h5 className="filter-sub-titel">Selected Categories</h5>
//                             <div className="categori-checkbox">
//                                 <form className='d-flex gap-3 pt-3 flex-wrap'>
//                                     {renderSelectedItemButtons('categories', 'Parent', 'ParentDesc')}
//                                     {renderSelectedItemButtons('subCategories', 'CategoryId', 'CategoryDesc')}
//                                     {renderSelectedItemButtons('brands', 'Value', 'Text')} 
//                                     <button onClick={clearAll} type='button' className="btn-clear-all"><i className="fas fa-times"></i> Clear All</button> 
//                                 </form>
//                                 {(isHospital || isRestaurant) ? '' : <form className='pt-3'>
//                                     <ul className="list-inline">
//                                         <li className='mb-0'>
//                                             <input id="stocks" type="checkbox" onChange={() => setHideOutOfStockItems(hideOutOfStockItems === 'Y' ? 'N' : 'Y')} checked={hideOutOfStockItems === 'Y' ? true : false} name="product-stocks" />
//                                             <label htmlFor="stocks">Hide out of stock items</label> 
//                                         </li>
//                                     </ul>
//                                 </form>}
//                             </div>
//                         </div>
//                         {isHospital ? '' : siteData.isLoading ? 
//                             <Spinner min_height='39rem' fSize='2.5rem'/> : 
//                             <div>                                                       {/* className={filterActive ? `` : 'hide-on-mobile'} */}
//                                 {filters.categories.length && <div className="filter-sub-area pt-sm-10 pt-xs-10">
//                                     <h5 className="filter-sub-titel">Categories</h5>
//                                     <div className="categori-checkbox">
//                                         <form action="#">
//                                             <ul className='list-inline'>
//                                                 {renderCategory('categories', 'Parent', 'ParentDesc')}
//                                             </ul>
//                                         </form>
//                                         {renderCount('categories')}
//                                     </div>
//                                 </div>}
//                                 {filters.subCategories.length ? <div className="filter-sub-area">
//                                     <h5 className="filter-sub-titel">Sub Categories</h5>
//                                     <div className="categori-checkbox">
//                                         <form action="#">
//                                             <ul className='list-inline'>
//                                                 {renderCategory('subCategories', 'CategoryId', 'CategoryDesc')}
//                                             </ul>
//                                         </form>
//                                         {renderCount('subCategories')}
//                                     </div>
//                                 </div> : ''}
//                                 {filters.brands.length ? <div className="filter-sub-area">
//                                     <h5 className="filter-sub-titel">Brands</h5>
//                                     <div className="categori-checkbox">
//                                         <form action="#">
//                                             <ul className='list-inline'>
//                                                 {renderCategory('brands', 'Value', 'Text')}
//                                             </ul>
//                                         </form>
//                                         {renderCount('brands')}
//                                     </div>
//                                 </div> : ''}                               
//                                 {/* <div className="filter-sub-area pt-sm-10 pt-xs-10">
//                                     <h5 className="filter-sub-titel">Product Type</h5>
//                                     <div className="color-categoriy">
//                                         <form action="#">
//                                             <ul className='list-inline'>
//                                                 <li><span className="white"></span><Link to="#">Ointment</Link></li>
//                                                 <li><span className="black"></span><Link to="#">Moisturiser</Link></li>
//                                                 <li><span className="Orange"></span><Link to="#">Spray</Link></li>
//                                                 <li><span className="Blue"></span><Link to="#">Cleanser</Link></li>
//                                             </ul>
//                                         </form>
//                                     </div>
//                                 </div>
//                                 <div className="filter-sub-area pt-sm-10 pb-sm-15 pb-xs-15">
//                                     <h5 className="filter-sub-titel">Product Tags</h5>
//                                     <div className="categori-checkbox">
//                                         <form action="#">
//                                             <ul className='list-inline'>
//                                                 <li><input type="checkbox" name="product-categori"/><Link to="#">Hydration</Link></li>
//                                                 <li><input type="checkbox" name="product-categori"/><Link to="#">Moisturize</Link></li>
//                                                 <li><input type="checkbox" name="product-categori"/><Link to="#">Antioxidant</Link></li>
//                                                 <li><input type="checkbox" name="product-categori"/><Link to="#">Itching</Link></li>
//                                             </ul>
//                                         </form>
//                                     </div>
//                                 </div> */}
//                                 {/* <span className='continue-button d-block text-center mt-20 position-sticky bottom-0 left-0' role='button' onClick={handleFilterForm} to={'#'}>Apply Filters</span> */}
//                             </div>
//                         }
//                         <span className='continue-button d-block text-center mt-3 mt-lg-4 position-sticky bottom-0 left-0' style={{background: '#1f8dc9'}} role='button' onClick={handleFilterForm} to={'#'}>Apply Filters</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )

// }

// const mapStateToProps = (state) => {
//   return { compCode: state.compCode, modals: state.modals, isMobile: state.isMobile, siteData: state.siteData, globalData: state.globalData, userInfo: state.userInfo, isLoggedIn: state.isLoggedIn, filterData: state.filterData, vType: state.vType };
// }

// export default connect(mapStateToProps, {breadCrumbAction, modalAction, globalDataAction, filterAction})(FilterPage);

// item id changed