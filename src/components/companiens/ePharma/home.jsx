import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryCard, ConnectedProductCard, ConnectedProductCard1, BannersCard, BrandsCard, CardType5 } from './cards';
import { SliderSectionM } from './mobileView/homeM';
import { ConnectedUpdateScroll, ControlledCarousel, escape, getFrom, MySlider, rentCategories, scrollPage, Spinner, SliderSection } from './utilities';
import { connect } from 'react-redux';
import { breadCrumbAction, filterAction, globalDataAction, modalAction } from '../../../actions';
import { BASE_URL, defaultId, ePharmaId, garments, TAKE_HOME_ID, TAKEHOME_ELECTRONICS, XYZ_ID } from '../../../constants';
import { agroCategories } from './agro/data';
import { GridLoader } from '../../utils/utils';


function Home({ breadCrumbAction, compCode, filterAction, siteData, isLoggedIn, isMobile, globalDataAction, modalAction, globalData, userInfo, vType }) {    
    
  let initState = {loading: true, catLoad: true, productLoad: true, data: {itemMasterCollection: [], LinkCategoryList: [{Parent: ''}], LinkSubCategoryList: []}, err: {status: false, msg: ''}}

  useEffect(() => {
    breadCrumbAction({links: [{name: 'Home', link: '/'}], activeLink: '/'});
    if (!siteData.catLoading) {
      setProductsData(pre => ({...pre, catLoad: false, data: {...pre.data, LinkCategoryList: siteData.LinkCategoryList, LinkSubCategoryList: siteData.LinkSubCategoryList}}));
    } else {
      setProductsData(pre => ({...pre, catLoad: true, data: {...pre.data, LinkCategoryList: [{Parent: ''}], LinkSubCategoryList: []}}));
    }
  },[breadCrumbAction, siteData.catLoading])

  useEffect(() => {
    if (!siteData.productLoading) {
      setProductsData(pre => ({...pre, productLoad: false, data: {...pre.data, itemMasterCollection: siteData.itemMasterCollection, ItemBrandList: siteData.ItemBrandList}}));
    } else {
      setProductsData(pre => ({...pre, productLoad: true, data: {...pre.data, itemMasterCollection: siteData.itemMasterCollection, ItemBrandList: siteData.ItemBrandList}}));
    }
  },[breadCrumbAction, siteData.productLoading])

  const takeHome_banner_images = ['/assets/img/ePharma/bg-banner/slide-1.png', '/assets/img/ePharma/bg-banner/slide-2.png', '/assets/img/ePharma/bg-banner/slide-3.png'];
  const takeHome_agro_banner_images = ['/assets/img/agro/paddy.png', '/assets/img/agro/oils.png', '/assets/img/agro/fruits_nuts.png', '/assets/img/agro/pulses.png'];
  const takehome_garments_banner_images = ['/assets/img/garments/banner_1.jpg', '/assets/img/garments/banner_1.jpg'];
  const takehome_electronics_banner_images = ['/assets/img/takehome/electronics/juicer.jpg', '/assets/img/takehome/electronics/mobiles.jpg', '/assets/img/takehome/electronics/fan.jpg'];
  const default_banner_images = ['/assets/img/ePharma/bg-banner/Final-03.jpg', '/assets/img/ePharma/bg-banner/Final-03.jpg', '/assets/img/ePharma/bg-banner/Final-03.jpg','/assets/img/ePharma/bg-banner/Final-03.jpg'];

  const [productsData, setProductsData] = useState(initState);
  const isRent = vType === 'rent';
  const isAgro = (vType === 'agro') || (vType === 'ErpManufacturing');
  const isPharma = vType === 'ErpPharma';

  const renderCategories = (data) => {
    if (data.catLoad) {
      return <Spinner min_height='19rem' fSize='1.5rem'/>;
    } else if (data.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.LinkCategoryList.length === 0) {
      return <div className='p-4'>No Categories found!</div>;
    } else {
      return data.data.LinkCategoryList.map((item, index) => {
        const subItemsList = data.data.LinkSubCategoryList.filter(i => item.Parent === i.Parent);
        return (
            <div className="card border-0 mb-0" key={index}>
                <div className="card-header d-flex align-items-center bg-white" id={`${item.Parent}`} style={{borderBottom: '1px solid #4d9db3', padding: '0.2rem 1.25rem'}}>
                    <Link to={`/filters/?head=${item.ParentDesc}&catVal=${item.Parent}&page=1`} onClick={() => filterAction('selectedCategoryId', item.Parent)} className="mb-0 text-dark">{item.ParentDesc}</Link>
                    <span className="btn btn-link ms-auto text-muted position-relative" data-toggle="collapse" data-target={`#collapse_${item.Parent}`} aria-expanded="true" aria-controls={`collapse_${item.Parent}`} style={{textDecoration: 'none !important'}}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                </div>
                <div id={`collapse_${item.Parent}`} className="collapse" aria-labelledby={`${item.Parent}`} data-parent="#cat-menu-accordion">
                    {
                    subItemsList.map((subItem, n) => {
                        return (
                            <div key={n} className="card-body" style={{marginBottom: "1px"}}>
                                <Link to={`/filters/?head=${item.ParentDesc}&catVal=${item.Parent}&subHead=${subItem.CategoryDesc}&subCatVal=${subItem.CategoryId}&page=1`} style={{color: 'black', fontWeight: 'bold'}}>{subItem.CategoryDesc}</Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
      })
    }
  }

  const responsive = {
    0: {
      items: 2
    },
    550: {
      items: 2
    },
    768: {
      items: 3
    },
    992: {
      items: 4
    },
    1200: {
      items: 5
    },
	}

  const renderCategoriesSlider = (data) => {
    if (data.catLoad) {
      // return <Spinner min_height='19rem' fSize='1.5rem'/>;
      return <GridLoader classes='h-[120px] min-w-[140px] lg:h-[140px] flex-1' />;
    } else if (data.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.LinkCategoryList.length === 0) {
      return <div className='text-center my-5 w-100'><h2 className="text-info mark">No items found!</h2></div>;
    } else {
      if (isAgro) return <SliderSection children={<CategoryCard folder={'/agro/categories'} />} data={data.data.LinkCategoryList} responsive={responsive} autoPlay={true} id="category-slider" />
      return <SliderSection children={<CategoryCard folder={'/ePharma/categories'} />} data={data.data.LinkCategoryList} responsive={responsive} autoPlay={true} id="category-slider" />
    }
  } 

  let banners = [
    {id: 1, name: 'TakeHome HIGH QUALITY ALLOPATHIC  PRODUCTS', tagline: 'One pharmacy for the whole family',logo: '', button: 'ORDER NOW', img: 'logo-removebg-preview (1).png', clr: '#00a0c7'},
    {id: 2, name: 'DEVELOPED TO FULFIL ALL YOUR HEALTH NEEDS', tagline:'Up to 45% Off on Healthcare Products', button: 'SHOP NOW', img: 'medicine-order.1.png', clr: '#cb1d59'},
    {id: 3, name: 'MEDICATIONS AND MORE RIGHT TO YOUR DOOR', tagline:'Good times and great prices! for Healthcare Proucts', button: 'SHOP NOW', img: 'image-removebg-preview (11) 1.png', clr: '#36a50b'},
    {id: 4, name: 'GET MEDICINES AT THE BEST PRICE', tagline:'Our prices make your heart healthy too', button: 'SHOP NOW', img: 'image-removebg-preview (10) 1.png', clr: '#a510cb'},
  ]

  const responsive_banners = {                                           
    0: {
      items: 1
    },
    550: {
      items: 1
    },
    768: {
      items: 2
    },
    992: {
      items: 2
    },
    1200: {
      items: 3
    },
	}

  // const colors = ['#59fff6', '#ffd145', '#FF9800', '#76e4ff', '#cddc39', '#ffe5c6', '#4eff4e', '#ff77a6', '#00a0c7'];
  const renderBannersSlider = (data) => {
    // if (data.loading) {
    //   return <Spinner min_height='19rem' fSize='1.5rem'/>;
    // } else if (data.err.status) {
    //   return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    // } else if (data.data.LinkCategoryList.length === 0) {
    //   return <div className='text-center my-5 w-100'><h2 className="text-info mark">No items found!</h2></div>;
    // } else {
      return <SliderSection children={<BannersCard />} data={data} responsive={responsive_banners} autoPlay={false} id="category-slider" />
    // }
  }

  // let brands = [
  //   {id: 1, name: 'Wyeth Ltd.'},
  //   {id: 2, name: 'Pfizer Limited'},
  //   {id: 3, name: 'Abbott Healthcare Pvt. Ltd.'},
  //   {id: 4, name: 'USV Private Limited'},
  //   {id: 5, name: 'Bayer Zydus Pharma Pvt. Ltd.'},
  //   {id: 6, name: 'Sanofi India Limited.'},
  //   {id: 7, name: 'Torrent Pharmaceuticals Ltd.'},
  // ]

  const responsive_brands = {
    0: {
      items: 3
    },
    550: {
      items: 4
    },
    768: {
      items: 5
    },
    992: {
      items: 6
    },
    1200: {
      items: 7
    },
    1500: {
      items: 7
    },
	}

  const renderBrandsSlider = (data) => {
    if (data.productLoad) {
      // return <Spinner min_height='19rem' fSize='1.5rem'/>;
      return <GridLoader classes='h-[120px] min-w-[120px] lg:h-[140px] lg:min-w-[140px] rounded-full' count={8}/>;
    } else if (data.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (data.data.ItemBrandList.length === 0) {
      return; // <div className='text-center my-5 w-100'><h2 className="mark">No Brands found!</h2></div>;
    } else {
      return <SliderSection children={<BrandsCard />} data={data.data.ItemBrandList} responsive={responsive_brands} autoPlay={false} id="category-slider" />
    }
  }

  const renderSlider = (data, parentId) => {
    const productCategoryItems = data.data.itemMasterCollection.filter(i => i.Category === parentId).slice(0, 20);   
    const parentCategoryName = data.data.LinkCategoryList.filter(i => i.Parent === parentId)[0]?.ParentDesc;
    const subLinks = data.data.LinkSubCategoryList.filter(i => parentId === i.Parent);
    if (data.productLoad) {
      // return <Spinner min_height='39rem' fSize='1.5rem'/>;
      return <GridLoader containerClass='gap-3 gap-md-4 mb-6 container flex-wrap py-3' count={20} classes='rounded-lg h-[242px] min-w-[140px] lg:h-[288px] lg:min-w-[180px] flex-1' />;
    }
     else if (data.err.status) {
      return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
    } else if (productCategoryItems.length === 0) {
      return; // <div className='text-center my-5 w-100'><h2 className="text-secondary mark">No Product found!</h2></div>;
    } else {
      scrollPage('home', globalDataAction);
      if (isMobile) return <SliderSectionM data={productCategoryItems} parentCategoryName={parentCategoryName} parentId={parentId}/>;
      return (
        <section className="product-area li-laptop-product Special-product overflow-hidden mt-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="li-section-title d-flex justify-content-between">
                            <h2 className='me-4'>
                                {parentCategoryName}
                            </h2>
                            <ul className="li-sub-category-list d-none d-lg-flex gap-2 ms-auto me-4 text-nowrap overflow-hidden align-items-start">
                                {subLinks.map((item, index) => {
                                    return (
                                      <li key={index}><Link to={`/filters/?head=${parentCategoryName}&catVal=${parentId}&subHead=${item.CategoryDesc}&subCatVal=${item.CategoryId}&page=1`}>{item.CategoryDesc}</Link></li>
                                    )
                                })}
                            </ul>
                            <Link className='text-primary text-nowrap' to={`/filters/?head=${escape(parentCategoryName).swap}&catVal=${parentId}`}>VIEW ALL</Link>
                        </div>
                        <div className="row">
                            <div className="special-product-active product-active">
                                <div className="col-lg-12 home-item pt-1 pb-5">
                                  {(() => {
                                    if (compCode === TAKE_HOME_ID || compCode === XYZ_ID) {
                                      let productSlide;
                                      if (vType === 'ErpManufacturing') {
                                        productSlide = productCategoryItems.map(i => (<ConnectedProductCard data={i} key={i.LocationItemId} />));
                                      } else {
                                        productSlide = productCategoryItems.map(i => (<ConnectedProductCard1 data={i} key={i.LocationItemId} />));
                                      }
                                      return <MySlider name={'product-slider'} dataList={productSlide} customSettings={{autoplay: false, infinite: false, dots: false}}/> 
                                    } else {
                                      const productSlide = productCategoryItems.map(i => (<ConnectedProductCard data={i} key={i.LocationItemId} />));
                                      return <MySlider name={'product-slider'} dataList={productSlide} customSettings={{autoplay: false, infinite: false, dots: false}}/>
                                    }
                                  })()}                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )
    }
  }

  // const responsive_4 = [
  //   { breakpoint: 2000, settings: { slidesToShow: 4 } },
  //   { breakpoint: 1200, settings: { slidesToShow: 3 } },
  //   { breakpoint: 1000, settings: { slidesToShow: 2 } },
  //   { breakpoint: 700, settings: { slidesToShow: 1 } }
  // ]

  // ----------- ORDER STATUS START --------------------------------------------------------------------

  const [myOrderData, setMyOrderData] = useState({ loading: false, data: { OrderList: [] }, err: { status: false, msg: '' } });
  

  const getMyOrders = useCallback(async (partyCode, locationId) => {
      // const res = await getFrom(`${BASE_URL}/api/Pharma/Get?CID=${compCode}&PID=${partyCode}&Type=${'active'}&LOCID=${locationId}`, {}, setMyOrderData);
      const res = await getFrom(`${BASE_URL}/api/Pharma/GetOrderList?CID=${compCode}&PID=${partyCode}&Type=${'active'}&LOCID=${locationId}`, {}, setMyOrderData);
      if (res) {
          setMyOrderData(res);
      } else {
          console.log('No data received');
      }
  }, [])                                                           

  useEffect(() => {
      if (!isLoggedIn) return;
      getMyOrders(userInfo.PartyCode, globalData.location.LocationId);
  }, [compCode, getMyOrders, isLoggedIn, userInfo.PartyCode, globalData.location.LocationId])

  const renderTabs = (data) => {
      if (data.loading) {
          return <Spinner min_height='25rem' fSize='2.5rem' />;
      } else if (data.err.status) {
          return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
      } else if (data.data.OrderList.length === 0) {
          return <ReplaceBanner compCode={compCode} vType={vType} />;
      } else {
          return data.data.OrderList.slice(0,1).map(order => {
              return (
                  <div className="order-section mb-0 h-100" key={order.BillId}>   {/* /${order.BillId} */}
                      <Link to={`/myOrders/${order.BillId}?pane=${'active'}`} className='card-title d-block'>
                          <h5 className='d-flex align-items-center pointer' style={{fontSize: '1em'}}>
                            <i className='bx bx-gift'></i> 
                            <span className='ms-3 me-4'>YOUR LAST ORDER:</span> 
                            {/* <span style={{ fontFamily: 'Lato', fontSize: '0.9em', color: '#3c3c3c' }}>({Object.values(order.SalesDetailsList).length} Items)</span> */}
                            <i className='bx bx-right-arrow-alt p-0 bg-transparent ms-auto text-primary' style={{fontSize: '1.5em'}}></i>
                          </h5>
                      </Link>
                      <div className="row row-cols-1 order-details">
                          <div className="col">
                              <div>
                                  <h6>Name: </h6>
                                  <h6>{order.CashPartyName}  ( <i className='bx bxs-phone-call' style={{ verticalAlign: 'sub', fontSize: '1.2em', color: '#e33041' }}></i> {order.CashPartyMobile} )</h6>
                              </div>
                              <div>
                                  <h6>Order Value: </h6>
                                  <h6>₹ {parseFloat(order.Amount).toFixed(2)}</h6>
                              </div>
                              <div>
                                  <h6>Delivery Address: </h6>
                                  <h6>{order.PartyAddress}</h6>
                              </div>
                          </div>
                          <div className="col">
                            <div className='align-items-start'>
                                <h6>Order Status: </h6>
                                {order.OrderStatus ?
                                    <span className='badge badge-pill d-flex align-items-center text-uppercase' style={{ background: order.ApprovalStatus === 'Y' ? '#00ad44' : '#009efb', fontSize: '0.8em' }}>{order.OrderStatus}</span>
                                    :
                                    <span className='badge badge-pill d-flex align-items-center' style={{ background: order.ApprovalStatus === 'Y' ? '#00ad44' : '#009efb', fontSize: '0.8em' }}>{order.ApprovalStatus === 'Y' ? 'PROCESSED' : 'ORDER PLACED'}</span>
                                }

                            </div>
                            <div className="mt-2 align-items-start">
                                <h6 className='m-0'>Billing Status: </h6>
                                <span className='badge badge-pill d-flex align-items-center' style={{ background: order.BillStatus === 'PENDING' ? '#f29101' : '#00ad44', fontSize: '0.8em' }}>{order.BillStatus === 'CLOSED' ? 'DONE' : order.BillStatus}</span>
                            </div>
                          </div>
                          {/* {!order.EnqFollowUpList.length ? '' : <div className='delivery-timeline px-0'>
                              {order.EnqFollowUpList.length === 1 ? '' : <div className='timeline'></div>}
                              <div className=''>
                                  <table style={{ fontSize: '0.9em' }}>
                                      <tbody>
                                          {order.EnqFollowUpList.map((i, n) => (
                                              <tr key={n}>
                                                  <td><span>{new Date(i.NextAppDate).toLocaleDateString('en-TT')}<b className='text-nowrap'>{i.NextAppTime}</b></span></td>
                                                  <td><p className='mb-0'>{i.Tag}, {i.Remarks}</p></td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                              </div>
                          </div>} */}
                      </div>
                  </div>
              )
          })
      }
  }

  // ----------- ORDER STATUS ENDS --------------------------------------------------------------------

  return (
    <div className={`epharma-global ${defaultId && "pt-2 pt-lg-4"}`}>
      {(() => {
        if  (isRent) {
          return (
            <>
              {/* <section className="rent-hero text-center text-lg-start" style={{borderBottom: '1px solid #dbdbdb'}}>
                <style>{`
                  .app-content > .epharma-global {
                    padding-top: 0 !important;
                  }
                `}</style>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 left-side order-2 order-lg-1 px-4">
                      <h1>Find Your Best Dream House for Rental, Buy & Sell...</h1>
                      <p>
                        Properties for buy / rent in in your location. We have more than
                        3000+ listings for you to choose
                      </p>
                      <div onClick={() => window.scroll(0, 500)} className="hero-cta btn-group-1 d-flex gap-4 justify-content-center justify-content-lg-start">
                        <button style={{ background: "#c970ff", color: "white" }}>
                          Buy a Property
                        </button>
                        <button>Rent a Property</button>
                      </div>
                    </div>
                    <div className="col-md-6 text-center text-md-end p-3 p-lg-4 order-lg-2">
                      <img src="/assets/img/rentNsale/electronics.gif" alt="Logo" className='img-fluid' style={{boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'}}/>
                    </div>
                  </div>
                </div>
              </section> */}
              <section className='container rent-category'>
                {/* <div className='text-center' style={{fontFamily: 'Poppins'}}>
                  <h3>Product Categories</h3>
                  <p className='text-4'>Browse products by categories that are available for sale or rent.</p>
                </div> */}
                {/* <div className='d-flex justify-content-between gap-4 flex-wrap'>
                    {rentCategories.map(i => (
                        <Link className="card-type-4" to={`/filters/?head=${i.ParentDesc}&catVal=${i.Value}`}>
                          <div className='img-bg' style={{backgroundImage: `url(/assets/img/rentNsale/categories/${i.img}`}}></div>
                          <p>{i.ParentDesc}</p>
                        </Link>
                    ))}
                </div> */}
                <style>{`
                  .rent-category .d-grid {
                    grid-template-columns: 1fr 1fr 1fr;
                  }
                  .rent-category .card-type-4 {
                    min-width: auto;
                    overflow: hidden;
                  }
                  .rent-category .card-type-4 > .img-bg {
                    transition: 0.2s linear;
                  }
                  .rent-category .card-type-4 > .img-bg:hover {
                    transform: scale(1.1);
                  }
                  .rent-category .card-type-4:first-child {
                    grid-row: span 4;
                  }
                  .rent-category .card-type-4:not(:first-child) {
                    grid-row: span 2;
                  }
                  .rent-category .card-type-4 .img-bg {
                    min-height: 15em;
                  }
                    
                  @media (max-width: 768px) {
                    .rent-category .d-grid {
                      grid-template-columns: 1fr;
                    }
                  }
                  @media (min-width: 768px) {
                    .rent-category .card-type-4:first-child > div {
                      background-size: 134% 100% !important;
                    }
                    .rent-category .card-type-4:last-child {
                      grid-column: span 2;
                    }
                  }
                `}</style>
                <div className='gap-2 gap-lg-4 d-grid'>
                    {rentCategories.map(i => (
                        <Link className="card-type-4 position-relative" to={`/filters/?head=${i.ParentDesc}&catVal=${i.Parent}`}>
                          <div className='img-bg h-100' style={{backgroundImage: `url(/assets/img/rentNsale/categories/${i.img}`, backgroundSize: '100% 100%'}}></div>
                          <div className="btn-group-1" style={{ position: 'absolute', left: '2em', bottom: '1.6em', fontSize: '1.35em'}}>
                              <button className='text-white text-uppercase d-flex align-items-center gap-2 shadow-none' style={{ background: "#c970ff", padding: '0.3em 0.65em 0.3em' }}>{i.ParentDesc} <i className='bx bxs-chevron-right'></i></button>
                          </div>
                        </Link>
                    ))}
                </div>
              </section>
              <section className='mt-4 home-products'>
                <div className='container bg-gray-100 pt-4 d-flex justify-content-between flex-wrap align-items-center gap-3' style={{fontFamily: 'Nunito'}}>
                  <h5 className='mb-0 fw-bold'>Shop By Categories</h5>
                  <ul className='nav-list-1 gap-2 gap-lg-4'>
                    {rentCategories.map(i => (<li><Link to={`/filters/?head=${i.ParentDesc}&catVal=${i.Parent}`}>{i.ParentDesc}</Link></li>))}
                  </ul>
                </div>
                {siteData.itemMasterCollection.map((item, index) => (
                  <div className={`py-5 container product-list-row ${index % 2 === 1 ? 'bg-white' : 'bg-gray-100'}`}>
                    <div className='d-flex justify-content-between align-items-end pb-3 row-title' style={{borderBottom: '1px solid #cbcbcb'}}>
                      <h3 className='mb-0 text-uppercase'>{item.title}</h3>
                      <Link to={`/filters/?head=${escape(item.title).swap}&catVal=${item.id}`} className='text-blue-500 fw-medium'>VIEW ALL</Link>
                    </div>
                    <div className='gap-lg-4 mt-4 mt-md-5 flex-wrap d-grid row-content' style={{gap: '0.6em'}}>
                      {item.data.map(i => <CardType5 data={i} />)}      {/* .filter(x => x.status === 'Approved' && x.featured ==='Y') */}
                    </div>
                  </div>
                ))}
              </section>
            </> 
          )
        } else if (isPharma || isAgro) {
          return (
            <>
              <div className="slider-with-banner pb-xs-5 pb-15">
                <div className="container">
                    <div className="row flex-column flex-lg-row gy-2">
                        <div className="col-lg-4 ">
                          {(() => {
                            if (compCode === ePharmaId) {
                              return (
                                <div className="category-menu category-menu-2">
                                    <div className="category-heading">
                                        <h2 className="categories-toggle"><i className="fas fa-th"></i><span>categories</span> <i className="fas fa-chevron-down ms-auto"></i></h2>
                                    </div>
                                    <div id="cate-toggle" className="category-menu-list">
                                        <div id="cat-menu-accordion">
                                            {renderCategories(productsData)}
                                        </div>
                                    </div>
                                </div>
                              )
                            } else {
                              return isLoggedIn ? renderTabs(myOrderData) : <ReplaceBanner compCode={compCode} vType={vType} />
                            }
                          })()}
                        </div>  
                        <div className="col-lg-8 position-relative" id='home-banner'>
                            {(() => {
                              if (compCode === TAKE_HOME_ID || compCode === XYZ_ID || isAgro) {
                                if (isAgro) return <ControlledCarousel data={vType === 'ErpManufacturing' ? takehome_garments_banner_images : takeHome_agro_banner_images} interval={2000} controls={false} />;
                                return <ControlledCarousel data={takeHome_banner_images} interval={2000} controls={false} />;
                              } else if (compCode === TAKEHOME_ELECTRONICS) {
                                return <ControlledCarousel data={takehome_electronics_banner_images} interval={2000} controls={false} />;
                              } else {
                                return <ControlledCarousel data={default_banner_images} interval={2000} controls={false} />
                              }
                            })()}
                            {
                              globalData.prescription.required &&                             
                              <div className='presc-mini-box' onClick={() => modalAction('PRESCRIPTION_MODAL', true)}>
                                <div>
                                  {globalData.prescription.name ? <i className='bx bxs-message-square-check'></i> : <i className="fas fa-cloud-upload-alt"></i>}
                                  <div>
                                    <span>{globalData.prescription.name ? 'Uploaded your' : 'Upload your'}</span>
                                    <h4>Prescription</h4>
                                  </div>
                                </div>
                              </div>
                            }
                        </div>    
                    </div>
                </div>
              </div> 
              {(compCode === TAKE_HOME_ID || compCode === XYZ_ID || isAgro) && (
                <div className="cat-content">
                  <div className="featCat-sub-list container">
                    <div className="li-section-title">
                      <h2>Categories</h2>
                      <ul className="li-sub-category-list d-none d-lg-block"></ul>
                    </div>
                    {renderCategoriesSlider(productsData)}
                  </div>
                </div>
              )}
              {(isPharma && compCode === TAKE_HOME_ID) && (
                <div className="cat-content">
                  <div className="featCat-sub-list container">
                    <div className="li-section-title">
                      <h2>Offers</h2>
                      <ul className="li-sub-category-list d-none d-lg-block"></ul>
                    </div>
                    {renderBannersSlider(banners)}
                  </div>
                </div>
              )}
              {(isPharma || isAgro) && <div>
                {/* {(compCode === TAKE_HOME_ID || compCode === XYZ_ID) && ( */}
                  <div className="cat-content brand-section">
                    <div className="featCat-sub-list container">
                      <div className="li-section-title mb-md-4">
                        <h2>Brands</h2>
                        <ul className="li-sub-category-list d-none d-lg-block"></ul>
                      </div>
                      {renderBrandsSlider(productsData)}
                    </div>
                  </div>
                {/* )} */}
              </div>}
              {/* {compCode === TAKE_HOME_ID ? <div>
                <div className='mt-3 mb-0 mb-md-20 offerBnr'>
                  <div className='d-flex justify-content-between  mw-100 align-items-center gap-3 flex-md-row flex-column pb-4 pb-md-0'>
                      <div><img src="/assets/img/ePharma/offers/image-removebg-preview (7) 1.png" alt="" /></div>      
                      <div>
                        <h1>Amazing deals on buying medicines from us</h1>
                        <h3>Get extra savings on your orders. Free shipping, same-day delivery and more...</h3>
                      </div>
                      <div className='banner p-0 me-auto me-md-0'><button style={{width: '10em', padding: '.5em 0'}}>KNOW MORE</button></div>      
                  </div>
                </div>
              </div> : ''} */}
              <div>
                {productsData.data.LinkCategoryList.map((item, index) => (
                  <div key={index} className={isMobile ? "sliderContainer" : ""}>
                    {renderSlider(productsData, parseInt(item.Parent))}
                  </div>
                ))}
              </div>
            </>
          )
        }
      })()}
      {/* {isRent ? 
        <>
          <section className='container rent-category'>
            <style>{`
              .rent-category .d-grid {
                grid-template-columns: 1fr 1fr 1fr;
              }
              .rent-category .card-type-4 {
                min-width: auto;
                overflow: hidden;
              }
              .rent-category .card-type-4 > .img-bg {
                transition: 0.2s linear;
              }
              .rent-category .card-type-4 > .img-bg:hover {
                transform: scale(1.1);
              }
              .rent-category .card-type-4:first-child {
                grid-row: span 4;
              }
              .rent-category .card-type-4:not(:first-child) {
                grid-row: span 2;
              }
              .rent-category .card-type-4 .img-bg {
                min-height: 15em;
              }
                
              @media (max-width: 768px) {
                .rent-category .d-grid {
                  grid-template-columns: 1fr;
                }
              }
              @media (min-width: 768px) {
                .rent-category .card-type-4:first-child > div {
                  background-size: 134% 100% !important;
                }
              }
            `}</style>
            <div className='gap-2 gap-lg-4 d-grid'>
                {rentCategories.map(i => (
                    <Link className="card-type-4 position-relative" to={`/filters/?head=${i.ParentDesc}&catVal=${i.Parent}`}>
                      <div className='img-bg h-100' style={{backgroundImage: `url(/assets/img/rentNsale/categories/${i.img}`, backgroundSize: '100% 100%'}}></div>
                      <div className="btn-group-1" style={{ position: 'absolute', left: '2em', bottom: '1.6em', fontSize: '1.35em'}}>
                          <button className='text-white text-uppercase d-flex align-items-center gap-2 shadow-none' style={{ background: "#c970ff", padding: '0.3em 0.65em 0.3em' }}>{i.ParentDesc} <i className='bx bxs-chevron-right'></i></button>
                      </div>
                    </Link>
                ))}
            </div>
          </section>
          {siteData.itemMasterCollection.map((item, index) => (
            <section className={`py-5 container mt-4 product-list-row ${index % 2 === 1 ? 'bg-white' : 'bg-gray-100'}`}>
              <div className='d-flex justify-content-between align-items-end pb-3 row-title' style={{borderBottom: '1px solid #cbcbcb'}}>
                <h3 className='mb-0 text-uppercase'>{item.title}</h3>
                <Link to={`/filters/?head=${escape(item.title).swap}&catVal=${item.title}`} className='text-blue-500 fw-medium'>VIEW ALL</Link>
              </div>
              <div className='gap-lg-4 mt-4 mt-md-5 flex-wrap d-grid row-content' style={{gap: '0.6em'}}>
                {item.data.map(i => <CardType5 data={i} />)}     
              </div>
            </section>
          ))}
        </> 
        :
        <>
          <div className="slider-with-banner pb-xs-5 pb-15">
            <div className="container">
                <div className="row flex-column flex-lg-row gy-2">
                    <div className="col-lg-4 ">
                      {(() => {
                        if (compCode === ePharmaId) {
                          return (
                            <div className="category-menu category-menu-2">
                                <div className="category-heading">
                                    <h2 className="categories-toggle"><i className="fas fa-th"></i><span>categories</span> <i className="fas fa-chevron-down ms-auto"></i></h2>
                                </div>
                                <div id="cate-toggle" className="category-menu-list">
                                    <div id="cat-menu-accordion">
                                        {renderCategories(productsData)}
                                    </div>
                                </div>
                            </div>
                          )
                        } else {
                          return isLoggedIn ? renderTabs(myOrderData) : <ReplaceBanner compCode={compCode} vType={vType} />
                        }
                      })()}
                    </div>  
                    <div className="col-lg-8 position-relative" id='home-banner'>
                        {(() => {
                          if (compCode === TAKE_HOME_ID || compCode === XYZ_ID) {
                            return <ControlledCarousel data={takeHome_banner_images} interval={2000} controls={false} />;
                          } else {
                            return <ControlledCarousel data={default_banner_images} interval={2000} controls={false} />
                          }
                        })()}
                        <div className='presc-mini-box' onClick={() => modalAction('PRESCRIPTION_MODAL', true)}>
                          <div>
                            {globalData.prescription.name ? <i className='bx bxs-message-square-check'></i> : <i className="fas fa-cloud-upload-alt"></i>}
                            <div>
                              <span>{globalData.prescription.name ? 'Uploaded your' : 'Upload your'}</span>
                              <h4>Prescription</h4>
                            </div>
                          </div>
                        </div>
                    </div>    
                </div>
            </div>
          </div> 
          {(compCode === TAKE_HOME_ID || compCode === XYZ_ID) && (
            <div className="cat-content">
              <div className="featCat-sub-list container">
                <div className="li-section-title">
                  <h2>Categories</h2>
                  <ul className="li-sub-category-list d-none d-lg-block"></ul>
                </div>
                {renderCategoriesSlider(productsData)}
              </div>
            </div>
          )}
          {compCode === TAKE_HOME_ID && (
            <div className="cat-content">
              <div className="featCat-sub-list container">
                <div className="li-section-title">
                  <h2>Offers</h2>
                  <ul className="li-sub-category-list d-none d-lg-block"></ul>
                </div>
                {renderBannersSlider(banners)}
              </div>
            </div>
          )}
          <div>
            {(compCode === TAKE_HOME_ID || compCode === XYZ_ID) && (
              <div className="cat-content brand-section">
                <div className="featCat-sub-list container">
                  <div className="li-section-title mb-md-4">
                    <h2>Brands</h2>
                    <ul className="li-sub-category-list d-none d-lg-block"></ul>
                  </div>
                  {renderBrandsSlider(productsData)}
                </div>
              </div>
            )}
          </div>
          <div>
            {productsData.data.LinkCategoryList.map((item, index) => (
              <div key={index} className={isMobile ? "sliderContainer" : ""}>
                {renderSlider(productsData, parseInt(item.Parent))}
              </div>
            ))}
          </div>
        </>
      } */}
      <ConnectedUpdateScroll page={"home"} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { compCode: state.compCode, siteData: state.siteData, isMobile: state.isMobile, globalData: state.globalData, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo };
}

export default connect(mapStateToProps, {breadCrumbAction, filterAction, globalDataAction, modalAction})(Home);

const ReplaceBanner = ({ compCode, vType }) => {
  if (compCode === TAKE_HOME_ID && vType !== 'agro') {
    return <AppnBox />
  } else {
    return <HowItWorks />
  }
}

const AppnBox = () => {
  return (
    <Link to={'#'}>
      <img className='img-fluid w-100 d-none d-lg-block' src="/assets/img/ePharma/Book_Appns2.jpeg" alt="Book Appointments" style={{maxHeight: '15.2em'}} />
      <div className='action-list'>
        <div className="action-item" style={{'--clr': '#ceeffe', background: '#0775b1', borderRadius: '0 0 6px 6px'}}>
          <i className='fas fa-user-md rounded-2 outline-0' style={{'color': '#ff399b'}}></i>
          <div className=''>
            <h4 className='text-white'>Book Doctor Appointments</h4>
            {/* <p className='mb-0'>Book your doctor appointments online.</p> */}
          </div>
          <i className='bx bxs-chevron-right ms-auto bg-transparent p-0 text-white outline-0'></i>
        </div>
      </div>
    </Link>
  )
}

const HowItWorks = () => {
  return (
    <div className='row action-list g-2 pt-3 pt-lg-0'>
      <div className='col col-6 col-lg-12'>
        <div className="action-item" style={{'--clr': '#feeec8'}}>
          <i className='bx bxs-package'></i>
          <div className=''>
            <h4>Select Products</h4>
            <p className='mb-0'>Add products to your cart.</p>
          </div>
        </div>
      </div>
      <div className='col col-6 col-lg-12'>
        <div className="action-item" style={{'--clr': '#ceeffe'}}>
          <i className='bx bxs-shopping-bag'></i>
          <div className=''>
            <h4>Place your order</h4>
            <p className='mb-0'>Checkout and Place your order.</p>
          </div>
        </div>
      </div>
      <div className='col col-6 col-lg-12'>
        <div className="action-item" style={{'--clr': '#d4f8c4'}}>
          <i className='bx bx-gift'></i>
          <div className=''>
            <h4>Packing Your Order</h4>
            <p className='mb-0'>We'll pack and ship your order</p>
          </div>
        </div>
      </div>
      <div className='col col-6 col-lg-12'>
        <div className="action-item" style={{'--clr': '#d8dafe'}}>
          <i className='bx bxs-truck' ></i>
          <div className=''>
            <h4>Out for delivery.</h4>
            <p className='mb-0'>We'll Deliver to your doorstep.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

