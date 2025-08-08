import React, { useEffect, useCallback, useState } from 'react';
import { ConnectedPharmacyCard, ConnectedPharmacyCard2 } from './cards';
// import SliderSection from './sliderSection';
import { BreadCrumb, HeroSlider, CategorySlider, ProductSlider, getFrom } from './utilities';
import { connect } from 'react-redux';
import axios from 'axios';
import { siteDataAction } from '../../../actions';
import { SliderSectionM } from './mobileView/homeM';
import Skeleton from 'react-loading-skeleton';
import { BASE_URL } from '../../../constants';
import { getRequiredFieldsOnly } from '../ePharma/utilities';


const Pharmacy = ({ siteData, siteDataAction, compCode, isMobile, globalData, compInfo }) => {

  // Design inspirations.
  // http://preview.themeforest.net/item/pharmacy-woocommerce-wordpress-responsive-theme/full_screen_preview/8799461?_ga=2.192260650.1248602442.1705559424-154484551.1705559424
  // const getProductsData = useCallback(async () => {
  //   if (!siteData.isLoading) return;
  //     const res = await axios.get(`${BASE_URL}/api/Pharma/Get?CID=${compCode}&LOCID=${globalData.location.LocationId}`, {});
  //     if (res.status === 200) {
  //       // const products = getRequiredFieldsOnly(res.data.itemMasterCollection);
  //       const products = res.data.itemMasterCollection;
  //       siteDataAction({ ...res.data, itemMasterCollection: products, isLoading: false }); 
  //     }
  // },[compCode, siteData, siteDataAction])

  // useEffect(() => {
  //   getProductsData();
  // },[getProductsData])

  useEffect(() => {
    const getPharmacyData = async (companyCode, locId) => {                
      // if (!companyCode) return alert('no companyCode received');                 
      // if (!locId) return alert('NO LOCID Received'); 
      const res = await axios.get(`${BASE_URL}/api/Pharma/Get?CID=${companyCode}&LOCID=${locId}&CatType=PHARMACY`);
      if (res.status === 200) {
        const products = getRequiredFieldsOnly(res.data.itemMasterCollection);
        siteDataAction({ ...res.data, itemMasterCollection: products, isLoading: false }); 
      }
    }
    getPharmacyData(compInfo.EncCompanyId, globalData.location.LocationId);
  },[compInfo.EncCompanyId, globalData.location.LocationId])

  const breadCrumbData = {
    links: [{name: 'Home', link: '/'}, {name: 'Pharmacy', link: '/pharmacy'}],
    activeLink: '/pharmacy'
  }

  const heroData = [
    {
      bg: '#36b1be',
      img: 'medicine-order.png',
      heading: ['Flat 25% Off on', 'Medicine order'],
      offers: [{name: 'Win Big Offers', content: 'Every Day', icon: 'bx bxs-offer', clr: '#feb41f'}, {name: 'Free', content: 'Delivery', icon: 'bx bxs-truck', clr: '#e5518e'}]
    },
    {
      bg: '#d9aa1d',
      img: 'health-products.png',
      heading: ['Upto 30% Off on', 'Healthcare products'],
      offers: [{name: 'Win Big Offers', content: 'Every Day', icon: 'bx bxs-offer', clr: '#feb41f'}, {name: 'Free', content: 'Delivery', icon: 'bx bxs-truck', clr: '#e5518e'}]
    },
    {
      bg: '#e49df1',
      img: 'medicine-order.png',
      heading: ['Book LAB TESTS', 'Curated by Experts'],
      offers: [{name: 'Win Big Offers', content: 'Every Day', icon: 'bx bxs-offer', clr: '#feb41f'}, {name: 'Free', content: 'Delivery', icon: 'bx bxs-truck', clr: '#e5518e'}]
    },
    {
      bg: '#1dbd73',
      img: 'health-essentials.png',
      heading: ['Special offers on', 'Daily Health Essentials'],
      offers: [{name: 'Win Big Offers', content: 'Every Day', icon: 'bx bxs-offer', clr: '#feb41f'}, {name: 'Free', content: 'Delivery', icon: 'bx bxs-truck', clr: '#e5518e'}]
    }
  ]

  const heroCarousel = () => {
    return heroData.map(item => (
      <div key={item.heading[0]}>
        <div className='bg-box w-100' style={{'--bg': item.bg}}>
          <div className='sec-left'>
            <img src={`./img/pharmacy/${item.img}`} alt="medicine" />
          </div>
          <div className='sec-right d-none d-md-inline'>
            <h1 className='main-heading'>{item.heading[0]} <br/> {item.heading[1]}</h1>
            <ul className='cat-list offer-list' style={{marginBottom: '1.5em'}}>
              <li style={{'--i': '#41cbcb'}}>
                  <p className='mb-0 me-3'>Code: <span style={{color: 'var(--clr-7)'}}>SAVE25</span></p>
                  <button type="button" className="dashboard-card__btn-box-item reverse-hover d-flex align-items-center icon-btn text-nowrap" style={{'--clr': '#48fffc3b', '--bg': '#054f3b', '--bclr': '#149a8d57', gap: '0.6em', fontSize: '0.8em', padding: '0.4em 1em 0.4em 0.5em', borderRadius: '3.1em'}}><i className="bx bxs-right-arrow-alt" style={{fontSize: '1.8em'}} /> <span style={{fontSize: '1.1em'}}>SHOP NOW</span></button>
              </li>
            </ul>
            <ul className='cat-list offer-list'>
              {item.offers.map(i => (
                <li key={i.icon} style={{'--i': i.clr}}>
                  <i className={i.icon}></i>
                  <div>
                    <h4>{i.name}</h4>
                    <span>{i.content}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ))
  }

  const colors = ['#37c3bb', '#ebb100', '#ff8100', '#1ab2d7', '#afc100', '#ebb16c', '#16bf16', '#fb3e7f', '#37c3bb', '#ebb100', '#ff8100', '#1ab2d7', '#afc100', '#ebb16c', '#16bf16', '#fb3e7f', '#37c3bb', '#ebb100', '#ff8100'];

  const subCategories = [
    {name: 'Personal Care', icon: 'icofont-group-students'},
    {name: 'Cardiac Care', icon: 'icofont-heart-beat-alt'},
    {name: 'Diabetes Care', icon: 'icofont-blood-drop'},
    {name: 'Women Care', icon: 'icofont-woman-in-glasses'},
    {name: 'Respitory Care', icon: 'icofont-brand-ipair'},
    {name: 'Sexual wellness', icon: 'icofont-maximize'},
    {name: 'Anti-Biotics', icon: 'icofont-test-bottle'},
    {name: 'Vitamins', icon: 'icofont-capsule'},
    {name: 'Eye Care', icon: 'icofont-eye-open'},
    {name: 'Stomach Care', icon: 'icofont-fast-food'},
    {name: 'Baby Care', icon: 'icofont-baby'},
    {name: 'Elderly Care', icon: 'icofont-users'},
    {name: 'Oral Care', icon: 'icofont-capsule'},
    {name: 'Pain Relief', icon: 'icofont-capsule'},
    {name: 'Liver Care', icon: 'icofont-capsule'},
    {name: 'Chest Care', icon: 'icofont-capsule'},
    {name: 'Others', icon: 'icofont-capsule'},
    {name: 'Thyroidism', icon: 'icofont-capsule'},
    {name: 'Analgesic', icon: 'icofont-capsule'},
  ]

  const subCatSlider = () => subCategories.map((i, n) => (
    <div key={i.name}>
      <div className='featCat-list-item' style={{'--clr': colors[n]}}>
        <i className={i.icon}></i>
        <p>{i.name}</p>
      </div>
    </div>
  ))

  const parentCategories = [
    {name: 'Medicines', content: '3 products', img: 'capsules-vecteezy3.png'},
    {name: 'Nutrition', content: '3 products', img: 'nutrition.png'},
    {name: 'Cosmetic Item', content: '3 products', img: 'cosmetics.webp'},
    {name: 'Ointment & Cream', content: '3 products', img: 'ointment.png'},
    {name: 'Medical Devices', content: '3 products', img: 'medicalDevices.jpg'},
    {name: 'Others', content: '3 products', img: 'others.png'},
    {name: 'Injectable', content: '3 products', img: 'injectable.png'},
    {name: 'Surgical', content: '3 products', img: 'surgical.png'},
  ]
  // #e5f9f6
  const parentCatSlider = () => parentCategories.map(i => (
    <div key={i.name} className='h-100'>
      <div className='main-category-item'>
        <div className='cat-img'>
          <img src={`/img/pharmacy/${i.img}`} alt="medicines" />    {/* <a href="https://www.vecteezy.com/free-png/pharmacy">Pharmacy PNGs by Vecteezy</a> */}
        </div>
        <div>
          <h4>{i.name}</h4>
          <p>{i.content}</p>
        </div>
      </div>
    </div>
  ))

  const renderSlider = (data, parentId) => {
    const productCategoryItems = data.itemMasterCollection.filter(i => i.Category === parentId).slice(0, 30);   
    const parentCategoryName = data.LinkCategoryList.filter(i => i.Value === parentId.toString())[0]?.ParentDesc;
    if (data.isLoading) {
      return <div className='w-100'><Skeleton count={20}/></div>;
    } else if (productCategoryItems.length === 0) {
      return;
    } else {
      if (isMobile) return <SliderSectionM data={productCategoryItems} parentCategoryName={parentCategoryName} parentId={parentId}/>;
      const products = (list) => list.slice(0, 20).map(data => (<div key={data.LocationItemId}><ConnectedPharmacyCard2 data={data} /></div>));
      return (
        <>
          <div className='cat-heading'>
              <h4 className='mb-0'>{parentCategoryName}</h4>
              <span>View All</span>
          </div>
          <div className=''>
            <ProductSlider dataList={products(productCategoryItems)}/>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <BreadCrumb data={breadCrumbData}/>
      {!compCode ? 
        <div className='text-center my-5 w-100'><h2 className="text-info mark">No Integration for this demo version</h2></div> :
        <section className="pharmacy">
          <div className='content pt-0'>
            <div style={{padding: '0.9em 4px 0.5em'}}>
              <ul className='cat-list'>
                <li style={{'--i': '#41cbcb'}}>
                  <i className='bx bxs-capsule'></i>
                  <div>
                    <h4>Medicine</h4>
                    <span>Over 25000 products</span>
                  </div>
                </li>
                <li style={{'--i': '#e5518e'}}>
                  <i className='bx bx-shield-plus'></i>
                  <div>
                    <h4>Wellness</h4>
                    <span>Health products</span>
                  </div>
                </li>
                <li style={{'--i': '#80cc46'}}>
                  <i className='bx bx-notepad'></i>
                  <div>
                    <h4>Diagnostic</h4>
                    <span>Book tests & checkups</span>
                  </div>
                </li>
                <li style={{'--i': '#52adf0'}}>
                  <i className='bx bx-heart-circle'></i>
                  <div>
                    <h4>Health Corner</h4>
                    <span>Trending from health experts</span>
                  </div>
                </li>
                <li style={{'--i': '#feb41f'}}>
                  <i className='bx bx-box'></i>
                  <div>
                    <h4>Others</h4>
                    <span>More info</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className='hero-carousel'>
              <HeroSlider dataList={heroCarousel()} />
            </div>
          </div>
          <div className="feat-categories main-category">
            <div className='cat-heading'>
              <h4 className='mb-0'>Featured Categories</h4>
              <span>See All Categories</span>
            </div>
            <div className='cat-content'>
              {/* {renderCategories()} */}
              <CategorySlider dataList={parentCatSlider()} />
            </div>
          </div>
          <div className='feat-categories feat-sub-categories bg-white'>
            <div className='cat-heading'>
              <h4 className='mb-0'>More Sub Categories</h4>
              <span>See All Categories</span>
            </div>
            <div className='cat-content'>
              <div className='featCat-sub-list list-unstyled'>
                <CategorySlider dataList={subCatSlider()} />
              </div>
            </div>
          </div>
          <div className='feat-categories feat-sub-categories pt-0 pt-md-3' style={{background: '#f1f1f1'}}>
            <div className='pharmacy-cards overflow-hidden slider-wrapper'>
                {siteData.LinkCategoryList.map(item => (<div key={item.Value}>{renderSlider(siteData, parseInt(item.Value))}</div>))}
            </div>
          </div>
        </section>
      }
    </>
  )
}

const mapStateToPharmacy = (state) => {
  return { siteData: state.siteData, compCode: state.compCode, compInfo: state.compInfo, isMobile: state.isMobile, globalData: state.globalData }
}

const MemoizedPharmacy = React.memo(Pharmacy);
export default connect(mapStateToPharmacy, {siteDataAction})(MemoizedPharmacy);