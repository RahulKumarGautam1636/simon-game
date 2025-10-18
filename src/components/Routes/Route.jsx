import { connect } from "react-redux";
import Header from "../companiens/default/header";
import Footer from "../companiens/default/footer";
import { BCROY_ID, BNH_ID, BSN_ID, CITIZEN_ID, HAYATT_ID, RCC_ID, bhsId, defaultId, takehomeMain } from "../../constants";
import { NotFound } from "../companiens/default/utilities";
import { ConnectedB2BHome } from '../companiens/ePharma/B2B/Home';
import { B2BOrders } from "../companiens/ePharma/B2B/Myorder";
import { useHistory } from "react-router-dom";
import { lazy } from "react";
import Home from "../companiens/default/home";
import BCRoyPrivacyPolicy from "../companiens/amNursingHome/bc_roy_privacy";
const Queries = lazy(() => import('../companiens/ePharma/rentSale/queries'));
const BCRoyHome = lazy(() => import('../companiens/amNursingHome/bc_roy_home'));
const BCRoyAboutPage = lazy(() => import('../companiens/amNursingHome/bcroyhomeabout'));
// import Pharmacy from "../companiens/default/pharmacy";
const Specialists = lazy(() => import("../companiens/default/specialists"));
// const Home = lazy(() => import("../companiens/default/home"));
const BottomNav = lazy(() => import("../companiens/default/bottomNav"));
const BedStatus = lazy(() => import("../companiens/default/bedStatus"));
const LabTests = lazy(() => import("../companiens/default/labTests"));
const PatientQueue = lazy(() => import("../companiens/default/patientQueue"));
const Prescription = lazy(() => import("../companiens/default/prescription"));
const MyOrders = lazy(() => import("../companiens/default/myOrders"));
const Services = lazy(() => import("../companiens/default/services"));
const Product = lazy(() => import("../companiens/default/productPage"));
const Cart = lazy(() => import("../companiens/default/cartPage"));
const Wishlist = lazy(() => import("../companiens/default/wishlist"));
const Checkout = lazy(() => import("../companiens/default/checkout"));
const Dashboards = lazy(() => import("../companiens/default/dashboards"));
const BSNHeader = lazy(() => import('../companiens/bsn/Header'));
const BSNFooter = lazy(() => import('../companiens/bsn/Footer'));
const BSNHome = lazy(() => import('../companiens/bsn/Home'));
const BSNServices = lazy(() => import('../companiens/bsn/ourServices'));
const AboutUs = lazy(() => import("../companiens/bsn/AboutUs"));
const BSNDoctors = lazy(() => import("../companiens/bsn/Doctors2"));
const BSNDoctor = lazy(() => import("../companiens/bsn/DoctorProfile"));
const BSNFaq = lazy(() => import("../companiens/bsn/Faq"));
const BSNTestimonials = lazy(() => import("../companiens/bsn/Testimonial"));
const BSNService = lazy(() => import("../companiens/bsn/Departments/Service"));
const BSNContactUs = lazy(() => import("../companiens/bsn/ContactUs"));
const BSNCareers = lazy(() => import("../companiens/bsn/Careers"));
const BSNBlogs = lazy(() => import("../companiens/bsn/Blogs"));
const BSNBlog = lazy(() => import("../companiens/bsn/Blogs/blog"));
const DoctorProfile = lazy(() => import("../companiens/default/profiles/doctorProfile"));
const BedCategories = lazy(() => import("../companiens/bsn/BedCatagories"));
const SocialWorks = lazy(() => import("../companiens/bsn/SocialWorks"));
const HealthCenter = lazy(() => import("../companiens/bhs/HealthCenter"));
const Invoices = lazy(() => import("../companiens/default/prints/invoices"));
const EPharmaHeader = lazy(() => import('../companiens/ePharma/header'));
const EPharmaHome = lazy(() => import('../companiens/ePharma/home'));
const EPharmaFooter = lazy(() => import('../companiens/ePharma/footer'));
const EPharmaAboutUs = lazy(() => import('../companiens/ePharma/aboutUs'));
const EPharmaPrivacyPolicy = lazy(() => import('../companiens/ePharma/polycies/privacyPlicy'));
const EPharmaReturnPolicy = lazy(() => import('../companiens/ePharma/polycies/returnPolicy'));
const EPharmaTermsCondition = lazy(() => import('../companiens/ePharma/polycies/termsCondition'));
const EPharmaContactUs = lazy(() => import('../companiens/ePharma/contactUs'));
const EPharmaProductPage = lazy(() => import('../companiens/ePharma/productPage/productPage'));
const EPharmaCartPage = lazy(() => import('../companiens/ePharma/cartPage'));
const EPharmaWishlistPage = lazy(() => import('../companiens/ePharma/wishlist'));
// const EPharmaCheckout = lazy(() => import('../companiens/ePharma/checkout'));
// const EPharmaCheckout = lazy(() => import('../companiens/ePharma/checkout-new'));
const EPharmaCheckout = lazy(() => import('../companiens/ePharma/checkout-new-2'));
const EPharmaBottomNav = lazy(() => import('../companiens/ePharma/bottomNav'));
const EPharmaOrders = lazy(() => import('../companiens/ePharma/orders'));
const EPharmaInvoice = lazy(() => import('../companiens/ePharma/invoicePrint'));
const EPharmaModals = lazy(() => import('../companiens/ePharma/modals'));
const Modals = lazy(() => import("../companiens/default/modals"));
const HealthPakages = lazy(() => import("../companiens/default/healthPakages"));
const HealthPakage = lazy(() => import("../companiens/default/healthPakages/healthPakage"));
const InvoicePrint = lazy(() => import("../companiens/ePharma/B2B/invoicePrint"));
const Reports = lazy(() => import("../companiens/default/prints/reports"));
// import OrderDetails from "../companiens/ePharma/orderDetails";
// import MyOrderDetails from "../companiens/ePharma/B2B/MyOrderDetails";

const TakeHome = lazy(() => import("../companiens/takeHome/selectionPage"));


const HeaderRoute = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNHeader />;
        } else if (compCode === HAYATT_ID) {
            return;
        } else {
            return <Header />
        }
    } else if (vType === 'ErpPharma' || vType === 'rent' || vType === 'agro' || vType === 'ErpManufacturing') {
        return <EPharmaHeader vType={vType} />;
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return <EPharmaHeader vType={vType} />
    }
}
const HomePage = ({ compCode, match, vType, globalData, userInfo }) => {

    // let businessType = globalData.businessType.CodeValue;
    let history = useHistory();
    const b2bMode = globalData.userRegType.CodeValue === 'Retailer';

    if (vType === 'ErpHospital') {
        if (compCode === defaultId || compCode === CITIZEN_ID || compCode === RCC_ID) {
            // if (userInfo.UserType.toLowerCase() === 'doctor') return history.push('/dashboard')
            return <Specialists />;
        } else if (compCode === BCROY_ID) {
            return <BCRoyHome />
        } else if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNHome />;
        } else if (compCode === HAYATT_ID) {
            return history.push('/patientQueue');
        } else {
            return <Home />;
        }
    } else if (vType === 'ErpPharma' || vType === 'rent' || vType === 'agro' || vType === 'ErpManufacturing') {
        if (takehomeMain) return <TakeHome />
        if (b2bMode) return <ConnectedB2BHome />
        return <EPharmaHome vType={vType} />
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return history.push('/checkout')
    }
}

const SpecialistsPage = ({ vType, userInfo }) => {

    if (vType === 'ErpHospital') {
        // if (userInfo.UserType.toLowerCase() === 'doctor') return <Dashboards />
        return <Specialists />;
    }
}

const FooterPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNFooter />;
        } else if (compCode === HAYATT_ID ) {
            return;
        } else {
            return <Footer />;
        } 
    } else if (vType === 'ErpPharma' || vType === 'rent' || vType === 'agro' || vType === 'ErpManufacturing') {
        return <EPharmaFooter vType={vType} />;
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return <EPharmaFooter vType={vType} />;
    }
}
const BottomNavBar = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === HAYATT_ID) {
            return;
        } else {
            return <BottomNav />;
        }
    } else if (vType === 'ErpPharma' || vType === 'rent' || vType === 'agro' || vType === 'ErpManufacturing') {
        return <EPharmaBottomNav vType={vType} />;
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return <EPharmaBottomNav vType={vType} />;
    }
}
const BedStatusView = ({ compCode, vType }) => {
    if (vType === 'ErpHospital') {
        return <BedStatus />;
    }
}
const AboutUsPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <AboutUs />;
        } else if (compCode === BCROY_ID) {
            return <BCRoyAboutPage />
        }
    } if (vType === 'ErpPharma') {
        return <EPharmaAboutUs />;
    }
}
const ContactUsPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNContactUs />;
        }
    } if (vType === 'ErpPharma') {
        return <EPharmaContactUs />;
    }
}
const InvoicePrintPage = ({ compCode, match, vType, globalData }) => {

    const b2bMode = globalData.userRegType.CodeValue === 'Retailer';

    if (vType === 'ErpHospital') {
        return <Invoices match={match} />;
    } else if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing') {
        if (b2bMode) return <InvoicePrint match={match} />
        return <EPharmaInvoice match={match} />;
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return <EPharmaInvoice match={match} />;
    }
}
const LabTestPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID) {
            return <NotFound />;
        } else {
            return <LabTests />;
        }
    }
}

const HealthPakagesPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === defaultId || compCode === BSN_ID || compCode === BNH_ID) {
            return <HealthPakages/>;
        } else {
            return <NotFound/>
        }
    }
}

const HealthPakagePage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === defaultId || compCode === BSN_ID || compCode === BNH_ID) {
            return <HealthPakage/>;
        } else {
            return <NotFound/>
        }
    }
}

const PatientQueuePage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        return <PatientQueue  />;
    }
}
const PharmacyPage = ({ compCode }) => {
    // if (compCode === defaultId) {
    //     return <EPharmaHome />;
    // } else {
    //     return <Pharmacy />;
    // }
    return;
}
const PrescriptionPage = ({ compCode, match, vType }) => {

    if (vType === 'ErpHospital') {
        return <Prescription match={match} />;
    } 
}
const MyOrdersPage = ({ vType, globalData }) => {
    // let businessType = globalData.businessType.CodeValue;
    const b2bMode = globalData.userRegType.CodeValue === 'Retailer';
    if (vType === 'ErpHospital') {
        return <MyOrders />;
    } else if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing') {
        if (b2bMode) return <B2BOrders />
        return <EPharmaOrders />;
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return <EPharmaOrders />;
    } else if (vType === 'rent') {
        return <Queries />
    }
}
const OrderDetailsPage = ({ vType, match, globalData }) => {
    // let businessType = globalData.businessType.CodeValue;
    if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing') {
    //    if (b2bMode) return <MyOrderDetails />
    //    return <OrderDetails match={match} />
        return <EPharmaOrders match={match} />;
    }
}
const ServicesPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNServices />;
        } else {
            return <Services />
        }
    }
}
const ProductPage = ({ compCode, match, vType, globalData }) => {

    const b2bMode = globalData.userRegType.CodeValue === 'Retailer';

    if (vType === 'ErpHospital') {
        return <Product match={match} />;
    } else if (vType === 'ErpPharma' || vType === 'rent' || vType === 'agro' || vType === 'ErpManufacturing') {
        if (b2bMode) return <NotFound />;
        // if (compCode === ePharmaId || compCode === TAKE_HOME_ID || compCode === XYZ_ID || compCode === defaultId) {
            return <EPharmaProductPage match={match} vType={vType} />;
        // }
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return; // <EPharmaProductPage match={match} />;
    }
}
const CartPage = ({ compCode, vType, globalData }) => {

    if (vType === 'ErpHospital') {
        return <Cart />;
    } else if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing') {
        const b2bMode = globalData.userRegType.CodeValue === 'Retailer';
        if (b2bMode) return <EPharmaCheckout />;
        return <EPharmaCartPage vType={vType} />;
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return <EPharmaCartPage vType={vType} />;
    }
}
const WishlistPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        return <Wishlist />;
    } else if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing') {
        return <EPharmaWishlistPage />;
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return <EPharmaWishlistPage />;
    }
}
const DoctorsPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNDoctors compCode={compCode} />;
        }
    }
}
const DoctorPage = ({ compCode, match, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNDoctor match={match} />;
        } else {
            return <DoctorProfile match={match} />;
        }
    }
}
const DashboardsPages = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        return <Dashboards />
    }
}
const FAQPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNFaq />;
        }
    }
}
const TestimonialsPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNTestimonials />;
        }
    }
}
const ServicePage = ({ compCode, match, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNService match={match} />;
        }
    }
}
const CareersPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNCareers />;
        }
    }
}
const BlogsPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNBlogs />;
        }
    }
}
const BlogPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BSNBlog />;
        }
    }
}
const BedCategoriesPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <BedCategories />;
        }
    }
}
const SocialWorksPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            return <SocialWorks />;
        }
    }
}

const HealthCenterPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        if (compCode === bhsId) {
            return <HealthCenter />;
        }
    }
}

const PrivacyPolicyPage = ({ compCode, vType }) => {
    if (vType === 'ErpHospital') {
        if (compCode === BCROY_ID) return <BCRoyPrivacyPolicy />
        return <NotFound />
    }
    if (vType === 'ErpPharma') {
        return <EPharmaPrivacyPolicy/>;
    }
    return <NotFound />
}

const TermsConditionPage = ({ compCode, vType }) => {

    if (vType === 'ErpPharma') {
        return <EPharmaTermsCondition/>;
    }
    return <NotFound />
}

const ReturnPolicyPage = ({ compCode, vType }) => {

    if (vType === 'ErpPharma') {
        return <EPharmaReturnPolicy/>;
    }
    return <NotFound />
}

const CheckoutPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        return <Checkout />;
    } else if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing') {
        return <EPharmaCheckout />;
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return <EPharmaCheckout />;
    }
}

const ModalsPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        return <Modals />;
    } else if (vType === 'ErpPharma' || vType === 'rent' || vType === 'agro' || vType === 'ErpManufacturing') {
        return <EPharmaModals />;
    } else if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
        return <EPharmaModals />;
    }
}

const ReportPage = ({ compCode, vType }) => {

    if (vType === 'ErpHospital') {
        return <Reports />;
    }
}

const mapStateToProps = (state) => ({ 
    compCode: state.compCode, vType: state.vType, globalData: state.globalData, userInfo: state.userInfo 
})

export default connect(mapStateToProps, {})(HeaderRoute);
export const HomeRoute = connect(mapStateToProps, {})(HomePage);
export const SpecialistsRoute = connect(mapStateToProps, {})(SpecialistsPage);
export const FooterRoute = connect(mapStateToProps, {})(FooterPage);
export const BottomNavRoute = connect(mapStateToProps, {})(BottomNavBar);
export const BedStatusRoute = connect(mapStateToProps, {})(BedStatusView);
export const AboutUsRoute = connect(mapStateToProps, {})(AboutUsPage);
export const InvoicePrintRoute = connect(mapStateToProps, {})(InvoicePrintPage);
export const LabTestPageRoute = connect(mapStateToProps, {})(LabTestPage);
export const HealthPakagesRoute = connect(mapStateToProps, {})(HealthPakagesPage);
export const HealthPakageRoute = connect(mapStateToProps, {})(HealthPakagePage);
export const PatientQueueRoute = connect(mapStateToProps, {})(PatientQueuePage);
export const PharmacyRoute = connect(mapStateToProps, {})(PharmacyPage);
export const PrescriptionRoute = connect(mapStateToProps, {})(PrescriptionPage);
export const MyOrdersRoute = connect(mapStateToProps, {})(MyOrdersPage);
export const OrderDetailsRoute = connect(mapStateToProps, {})(OrderDetailsPage);
export const ServicesRoute = connect(mapStateToProps, {})(ServicesPage);
export const ProductRoute = connect(mapStateToProps, {})(ProductPage);
export const CartRoute = connect(mapStateToProps)(CartPage);
export const CheckoutRoute = connect(mapStateToProps, {})(CheckoutPage);
export const WishlistRoute = connect(mapStateToProps, {})(WishlistPage);
export const DashboardsRoute = connect(mapStateToProps, {})(DashboardsPages);
export const DoctorsRoute = connect(mapStateToProps, {})(DoctorsPage);
export const DoctorRoute = connect(mapStateToProps, {})(DoctorPage);
export const FAQRoute = connect(mapStateToProps, {})(FAQPage);
export const TestimonialsRoute = connect(mapStateToProps, {})(TestimonialsPage);
export const ServiceRoute = connect(mapStateToProps, {})(ServicePage);
export const ContactUsRoute = connect(mapStateToProps, {})(ContactUsPage);
export const CareersRoute = connect(mapStateToProps, {})(CareersPage);
export const BlogsRoute = connect(mapStateToProps, {})(BlogsPage);
export const BlogRoute = connect(mapStateToProps, {})(BlogPage);
export const BedCategoriesRoute = connect(mapStateToProps, {})(BedCategoriesPage);
export const SocialWorksRoute = connect(mapStateToProps, {})(SocialWorksPage);
export const HealthCenterRoute = connect(mapStateToProps, {})(HealthCenterPage);
export const ReturnPolicyRoute = connect(mapStateToProps, {})(ReturnPolicyPage);
export const TermsConditionRoute = connect(mapStateToProps, {})(TermsConditionPage);
export const PrivacyPolicyRoute = connect(mapStateToProps, {})(PrivacyPolicyPage);
export const ModalsRoute = connect(mapStateToProps, {})(ModalsPage);
export const ReportRoute = connect(mapStateToProps, {})(ReportPage);