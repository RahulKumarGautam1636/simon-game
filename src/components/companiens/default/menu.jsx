import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const colors = ['#59fff6', '#ffd145', '#FF9800', '#76e4ff', '#cddc39', '#ffe5c6', '#4eff4e', '#ff77a6'];

const Menu = ({ isLoggedIn }) => {

    const subDepartments2 = [
        {name: 'PRIMARY CARE', link: '#', img: ''},
        {name: 'LAB TEST', link: '#', img: ''},
        {name: 'SYMPTOM CHECK', link: '#', img: ''},
        {name: 'HEART RATE', link: '#', img: ''}
    ]

    const subDepartments1 = [
        {name: 'Neurology', link: '#', img: 'neurology.png'},
        {name: 'Cardiology', link: '#', img: 'cardiology.jpg', hasChild: true, child: subDepartments2},
        {name: 'Dentist', link: '#', img: 'dentist.png'},
        {name: 'Orthopaedics', link: '#', img: 'orthopaedics.png'},
        {name: 'Surgical', link: '#', img: 'surgery.png'},
        {name: 'Urology', link: '#', img: 'urology.png'},
    ]

    const subServices = [
        {name: 'Nephrologist Care', link: '/services', img: 'nephrology.png'},
        {name: 'Prenatal Care', link: '/services', img: 'parent.png'},
        {name: 'Medical Counseling', link: '/services', img: 'medical-counselling.png'},
        {name: 'Rehabilitation Center', link: '/services', img: 'rehab.png'},
        {name: 'Eldery Care', link: '/services', img: 'elderly.png'},
        {name: 'Competitive Doctors', link: '/services', img: 'competitive.png'},
    ]

    const menuLinks = [
        {name: 'Home', link: '/', icon: 'bx bx-home'},
        {name: 'Appointments / Order Manage', link: '/dashboard', icon: 'bx bxs-copy-alt', visible: isLoggedIn},
        {name: 'Members', link: '/profile', icon: 'icofont-people', visible: isLoggedIn},
        {name: 'Specialities', link: '/specialists', icon: 'icofont-medical-sign-alt'},
        {name: 'Departments', link: '#', icon: 'bx bxs-customize', hasChild: true, child: subDepartments1},
        {name: 'Health Checkups', link: '#', icon: 'bx bxs-shield-plus'},
        // {name: 'Appointments / Order Manage', link: '#', icon: 'bx bxs-duplicate', hasChild: true, child: subServices},
        // {name: 'Patient Guide', link: '#', icon: 'bx bxs-user-rectangle'},
        {name: 'Emergency Care', link: '/', icon: 'bx bx-run fw-bold'},
    ]

    // const [menu, setMenu] = useState(menuLinks);

    // useEffect(() => {
    //     setMenu(i => i.map(i => i.name === 'Appointments / Order Manage' ? { ...i, visible: isLoggedIn ? 'true' : false } : i));
    // },[isLoggedIn])

    const createMenu = (menuItems, isChild=false) => {
        if (!isChild) {
            return createMainMenu(menuItems);
        } else {
            return createSubMenu(menuItems);
        }
    }

    const createMainMenu = (mainMenu) => (
        <ul className="menu-list">
            {mainMenu.map((i, n) => {
                if (i.hasOwnProperty('visible') && i.visible === false) return '';
                if (i.hasChild) {
                    return <li key={i.name}><span><i className={i.icon}></i> {i.name} <i className='bx bxs-down-arrow'></i></span>{i.hasChild && createMenu(i.child, true)}</li>
                } else {
                    return <li key={i.name}><Link to={i.link}><i className={i.icon}></i> {i.name}</Link></li>
                }
            })}
        </ul>
    )

    const createSubMenu = (submenu) => (
        <ul className="sub-menu-1">
            {submenu.map((i, n) => {
                if (i.hasChild) {
                    return (
                        <li key={i.name}>
                            <span>
                                {i.img && <img src={`/img/${i.img}`} className="me-3" alt="circle" />}
                                {i.name} <i className='bx bxs-down-arrow'></i>
                            </span>
                            {i.hasChild && createMenu(i.child, true)}
                        </li>
                    )
                } else {
                    return (
                        <li key={i.name}>
                            <Link to={i.link}>
                                {i.img && <img src={`/img/${i.img}`} className="me-3" alt="circle" />}
                                {i.name}
                            </Link>
                        </li>
                    )
                }
            })}
        </ul>
    )
    
    return (
        <nav className="main-menu bg-slate-200">
            {createMenu(menuLinks)}
        </nav>
    )
}

export default Menu;




// -------------------- Frame Preserve ---------------------------------------------------------------------------------------------------



// <nav className="main-menu">
//     <ul className="menu-list">
//         <li><Link to="/"><i className="bx bx-home" style={{color: colors[0]}}></i> Home</Link></li>
//         <li><Link to="/dashboard"><i className='bx bxs-copy-alt' style={{color: colors[5]}} ></i> Appointments / Order Manage</Link></li>
//         <li><Link to="/"><i className="icofont-medical-sign-alt" style={{color: colors[1]}}></i> Specialities</Link></li>
//         <li>
//             <span to="#"><i className='bx bxs-customize' style={{color: colors[2]}}></i> Departments <i className='bx bxs-down-arrow'></i></span>
//             <ul className="sub-menu-1">
//                 <li><Link to="#"><img src="/img/neurology.png" className="me-1" alt="circle" /> Neurology</Link></li>
//                 <li>
//                     <span to="#"><img src="/img/cardiology.jpg" className="me-1" alt="circle" /> Cardiology <i className='bx bxs-down-arrow'></i></span>
//                     <ul>
//                         <li><Link to="#">PRIMARY CARE</Link></li>
//                         <li><Link to="#">LAB TEST</Link></li>
//                         <li><Link to="#">SYMPTOM CHECK</Link></li>
//                         <li><Link to="#">HEART RATE</Link></li>
//                     </ul>
//                 </li>
//                 <li><Link to="#"><img src="/img/dentist.png" className="me-1" alt="circle" /> Dentist</Link></li>
//                 <li><Link to="#"><img src="/img/orthopaedics.png" className="me-1" alt="circle" /> Orthopaedics</Link></li>
//                 <li><Link to="#"><img src="/img/surgery.png" className="me-1" alt="circle" /> Surgical</Link></li>
//                 <li><Link to="#"><img src="/img/urology.png" className="me-1" alt="circle" /> Urology</Link></li>
//                 <li><Link to="#"><img src="/img/orthopaedics.png" className="me-1" alt="circle" /> Orthopedic</Link></li>
//             </ul>
//         </li>
//         <li><Link to="#"><i className='bx bxs-shield-plus' style={{color: colors[3]}}></i> Health Checkups </Link></li>
//         <li>
//             <span to="#"><i className='bx bxs-duplicate' style={{color: colors[4]}}></i> Appointments / Order Manage <i className='bx bxs-down-arrow'></i></span>
//             <ul className="sub-menu-1">
//                 <li><Link to="/services"><img src="/img/nephrology.png" className="me-1" alt="circle" /> Nephrologist Care</Link></li>
//                 <li><Link to="/services"><img src="/img/parent.png" className="me-1" alt="circle" /> Prenatal Care</Link></li>
//                 <li><Link to="/services"><img src="/img/medical-counselling.png" className="me-1" alt="circle" /> Medical Counseling</Link></li>
//                 <li><Link to="/services"><img src="/img/rehab.png" className="me-1" alt="circle" /> Rehabilitation Center</Link></li>
//                 <li><Link to="/services"><img src="/img/elderly.png" className="me-1" alt="circle" /> Eldery Care</Link></li>
//                 <li><Link to="/services"><img src="/img/competitive.png" className="me-1" alt="circle" /> Competitive Doctors</Link></li>
//             </ul>
//         </li>
//         <li><Link to="#"><i className='bx bxs-user-rectangle' style={{color: colors[6]}}></i> Patient Guide  </Link></li>
//         <li><Link to="#"><i className='bx bx-run fw-bold' style={{color: colors[7]}}></i> Emergency Care</Link></li>
//     </ul>
// </nav>