import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './css/animations.css';
import './css/styles2.css';
import './css/responsive2.css';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";
import Home from './Home';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Departments from './Departments';
import Gynecology from './Departments/Gynecology';
import Cardiology from './Departments/Cardiology';
import Blogs from './Blogs';
import Blog from './Blogs/blog';
import Doctors from './Doctors';
import Faq from './Faq';
import Testimonial from './Testimonial';
import DoctorProfile from './DoctorProfile';
import ScrollToTop from './utils/utilities';
import Careers from './Careers';
import Services from './ourServices';


const App = () => {

    // const isLoading = useSelector(state => state.isLoading);

    return (
        <div>
            {/* {isLoading && <GlobalLoader/>} */}
            <HashRouter>
            <Header />
            <main className="app-container">
                <Routes>
                <Route path='/' exact element={<Home />}/>
                    <Route path='/contactUs' element={<ContactUs />}/>
                    <Route path='/aboutUs' element={<AboutUs />}/>
                    <Route path='/departments' element={<Departments />}/>
                    <Route path='/doctors' element={<Doctors />}/>
                    <Route path='/doctors/:id' element={<DoctorProfile />}/>
                    <Route path='/faq' element={<Faq />}/>
                    <Route path='/testimonial' element={<Testimonial />}/>
                    <Route path='/departments/:department' element={<Gynecology />}/>
                    <Route path='/blogs' element={<Blogs />}/>
                    <Route path='/blogs/:blogId' element={<Blog />}/>
                    <Route path='/careers' element={<Careers />}/>
                    <Route path='/services' element={<Services />}/>
                    {/* <Route path='/appointment' element={<Appointment />}/>
                    <Route path='/dashboard' element={<Dashboard />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/logout' element={<Logout />}/> */}
                </Routes>
            </main>
            {/* <IsMobile/> */}
            <Footer />
            <ScrollToTop/>
            </HashRouter>
        </div>
    );
}

export default App;