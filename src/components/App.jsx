import { HashRouter, Route, Switch, useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// TAKEHOME--------------------------------------------------------------------------------
import './CSS/ePharma/nice-select.css';
import './CSS/ePharma/helper.css';


import './CSS/default/animations.css';
import './CSS/default/global.css';
import './CSS/default/mobileViewStyles.css';
import './CSS/default/global-responsive.css';
import './CSS/default/react-datepicker.css';
import './CSS/default/fontawesome/css/fontawesome.min.css';
import './CSS/default/fontawesome/css/all.min.css';
import './CSS/default/fancyboxNew.css';
import './CSS/default/slick.css';
import './CSS/default/venobox.css';
import './CSS/default/icofont/icofont.min.css';
import './CSS/default/colors.css';
import './CSS/default/pharmacy.css';


import Home from './companiens/default/home.jsx';
import Profile from './companiens/default/profiles/index.jsx';
import { connect } from 'react-redux';

import { ConnectedIsMobile, ConnectedToast, NotFound, useOnlineStatus, WifiLoader, ScrollToTop, CacheBusting } from './companiens/default/utilities.jsx';
import { Suspense } from 'react';
import CommonModals from './companiens/common/modals/index.jsx';
import HeaderRoute, { FooterRoute, HomeRoute, BottomNavRoute, BedStatusRoute, InvoicePrintRoute, LabTestPageRoute, PatientQueueRoute, PharmacyRoute, PrescriptionRoute, MyOrdersRoute, ServicesRoute, ProductRoute, 
  CartRoute, DashboardsRoute, AboutUsRoute, DoctorsRoute, FAQRoute, TestimonialsRoute, ServiceRoute, ContactUsRoute, CareersRoute, BlogsRoute, BlogRoute, DoctorRoute, BedCategoriesRoute, SocialWorksRoute, 
  HealthCenterRoute, PrivacyPolicyRoute, ReturnPolicyRoute, TermsConditionRoute, WishlistRoute, CheckoutRoute, ModalsRoute, HealthPakagesRoute, HealthPakageRoute, OrderDetailsRoute, SpecialistsRoute, ReportRoute
} from './Routes/Route.jsx';

import CssRoute, { ScreenSplash } from './Routes/CssRoute.jsx';
import Auth from './companiens/default/auth.jsx';
import InitHeader from './companiens/common/initHeader';
import Articles from './companiens/bsn/Articles.jsx';
import { ToastContainer } from 'react-toastify';
// import Checkout from './companiens/default/checkout.jsx';
// import wishlist from './companiens/default/wishlist.jsx';
// import Invoices from './companiens/default/prints/invoices/index.jsx'; 
import FilterPage from './companiens/default/filterPage.jsx';
import Franchisee from './companiens/ePharma/franchisee.jsx';
// import { ConnectedLogout } from './companiens/ePharma/utilities.jsx';
// import PosOrderList from './companiens/ePharma/prints/test.jsx';
import PosOrderList from './companiens/ePharma/prints/posOrderList.jsx'
import CompanySelection from './companiens/common/companySelection.jsx';
import Outstandings, { Trasnsactions } from './companiens/ePharma/B2B/Outstandings.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import Shop from './companiens/ePharma/shop.jsx';
import DeleteAccountPage from './companiens/ePharma/deleteRequest.jsx';
import { BCROY_ID } from '../constants.js';


function App({ isLoading, compCode, vType, compInfo }) {

  return (
    <div className='app-container'>
      <HashRouter>
        <Suspense fallback={<ScreenSplash compCode={compCode} compInfo={compInfo} />}>
          <SiteHeader isLoading={isLoading} vType={vType} />
          {/* <Layouts> */}
            <div className='app-content'>
              <Switch>
                <Route path='/home' component={Home}/>

                <Route path='/specialists' component={SpecialistsRoute}/>
                
                {/* <Route path='/specialists' component={Specialists}/> */}
              

                <Route path='/' exact component={HomeRoute}/>
                <Route path='/pharmacy' component={PharmacyRoute}/>
                <Route path='/labTests' component={LabTestPageRoute}/>
                <Route path='/healthPakages/:id' component={HealthPakageRoute}/>
                <Route path='/healthPakages' component={HealthPakagesRoute}/>
                <Route path='/cartPage' component={CartRoute}/>
                <Route path='/wishlist' component={WishlistRoute}/>
                <Route path='/productPage/:id' component={ProductRoute}/>

                <ProtectedRoute path='/myOrders/:id' component={OrderDetailsRoute}/>
                <ProtectedRoute path='/myOrders' component={MyOrdersRoute}/>
                <ProtectedRoute path='/dashboard' component={DashboardsRoute}/>
                <ProtectedRoute path='/profile/:id?' component={Profile}/> 

                <Route path='/services/:service' component={ServiceRoute}/> 
                <Route path='/services' component={ServicesRoute}/>
                <Route path='/patientQueue' component={PatientQueueRoute}/>
                <Route path='/prescription/:id' component={PrescriptionRoute}/>
                <Route path='/invoices/:id' component={InvoicePrintRoute}/>
                <Route path='/bedStatus' component={BedStatusRoute}/>
                <Route path='/aboutUs' component={AboutUsRoute}/> 
                <Route path='/contactUs' component={ContactUsRoute}/> 
                {/* <Route path='/doctorProfile/:id' component={DoctorProfile}/> */}
                <Route path='/doctors/:id' component={DoctorRoute}/> 
                <Route path='/doctors' component={DoctorsRoute}/> 
                <Route path='/faq' component={FAQRoute}/> 
                <Route path='/careers' component={CareersRoute}/> 
                <Route path='/blogs/:id' component={BlogRoute}/> 
                <Route path='/blogs' component={BlogsRoute}/> 
                <Route path='/testimonials' component={TestimonialsRoute}/> 
                <Route path='/bedCategories' component={BedCategoriesRoute}/> 
                <Route path='/socialWorks' component={SocialWorksRoute}/> 
                <Route path='/healthCenter' component={HealthCenterRoute}/> 
                <Route path='/articles' component={Articles}/>
                <Route path='/checkout' component={CheckoutRoute}/>
                <Route path='/filters'>
                  <FilterPage vType={vType} />
                </Route>
                <Route path='/privacyPolicy' component={PrivacyPolicyRoute}/>
                <Route path='/returnPolicy' component={ReturnPolicyRoute}/>
                <Route path='/termsConditions' component={TermsConditionRoute}/>
                <Route path='/franchisee' component={Franchisee}/>
                <Route path='/posOrderList/:id' component={PosOrderList}/>
                <Route path='/companySelection' component={CompanySelection}/>
                <Route path='/reports' component={ReportRoute}/>
                <Route path='/outstandings'>
                  <Outstandings compCode={compCode} />
                </Route>
                <Route path='/transactions' component={Trasnsactions}/>
                <Route path='/shop' component={Shop}/>
                <Route path='/delete_my_account' component={DeleteAccountPage}/>
                <Route path='/onBoarding' component={Franchisee}/>
                <Route path='/*' component={NotFound}/>
              </Switch>
            </div>
            {/* <SharedLayout isLoading={isLoading} />
          </Layouts> */}
          <SiteFooter/>
        </Suspense>
      </HashRouter>
      <style>
        {
         (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') && `
          .filter-view > div {
            max-width: 12em !important;
            margin-top: 1em !important;
          }

          .product-card-1 .img-box {
            height: 11em;
          }
          @media (max-width: 767px) {
            	.your-order-table table th, .your-order-table table td {
                padding: 0.5em 2px !important;
              }
          }
        `}
        {compCode === BCROY_ID && `
          :root {
            --clr-1: var(--tw-blue-600);
          }  
            // .tabs-carousel .slick-slide button {
            //   font-size: 1.4em;
            // }      
        `}
      </style>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { isLoading: state.isLoading, compCode: state.compCode, vType: state.vType, compInfo: state.compInfo };
}

export default connect(mapStateToProps, {})(App);

export const SiteHeader = ({ isLoading, vType }) => {
  const isOnline = useOnlineStatus();
  const history = useHistory();
  return (
    <>
      {/* <CacheBusting /> */}
      {isLoading ? <GlobalLoader/> : ''}
      {!isOnline && <WifiLoader/>}
      <CssRoute />
      <HeaderRoute />
      <InitHeader vType={vType} />
      <Auth history={history}/>
      <BottomNavRoute vType={vType} />
      <ScrollToTop/>
    </>
  )
}

export const SiteFooter = () => {
  return (
    <>
      <FooterRoute/>
      <ModalsRoute />
      <CommonModals />
      <ConnectedToast/>
      <ConnectedIsMobile/>
      <ToastContainer className="my-toast" />    
    </>
  )
}


export const GlobalLoader = () => {
  return (
    <div className='spinner-container'>
      <div className='spinner-box' style={{minHeight: '100vh'}}>
        <div className="wrapper">
          <div className="circle"></div>     
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="ballShadow"></div>
          <div className="ballShadow"></div>
          <div className="ballShadow"></div>
        </div>
      </div>
    </div> 
  )
}


// const SharedLayout = ({ isLoading }) => {
//   const isOnline = useOnlineStatus();
//   const history = useHistory();
//   return (
//       <>
//           <CacheBusting />
//           {isLoading ? <div className='spinner-container'><GlobalLoader/></div> : ''}
//           {!isOnline && <WifiLoader/>}
//           <CssRoute />
//           <InitHeader />
//           <Auth history={history} />
//           <BottomNavRoute/>
//           <ScrollToTop/> 

//           <ModalsRoute />
//           <CommonModals />
//           <ConnectedToast/>
//           <ConnectedIsMobile/>
//           <ToastContainer className="my-toast" />
//       </>
//   )
// }


