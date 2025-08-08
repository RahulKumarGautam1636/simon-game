import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link";
import { bookingInfoAction, modalAction } from "../../../../actions";
import { connect } from "react-redux";
import { addedDocImages } from "./utilities";

const DoctorCard = ({ data, specialistId='', bookingInfoAction, modalAction, myClass, type='block' }) => {

    const hasImage = addedDocImages.find(i =>  i.split('.')[0] === (data.PartyCode)?.toString());

    const handleBooking = () => {  
        bookingInfoAction({Doctor: data, UnderDoctId: data.PartyCode, AppointDate: '', AppTime: '', TimeSlotId: '', companyId: '', selectedAppnDate: ''}); 
        modalAction('APPN_BOOKING_MODAL', true);
    }

    if (type === 'list') {
        return (
            // <Link to={`/doctors/${data.PartyCode}?specialistId=${data.SpecialistId}`} className="list-card-1 mb-2" style={{gap: '1em', padding: '0.7em 0em 0.7em 1em', background: '#f3f3f3', borderRadius: '0.4em', boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'}}>
            //     <img src={hasImage ? `/assets/img/BSN/doctors/${hasImage}` : `/img/user_unknown.png`} alt="List Item" />
            //     <div className="list-card-content">
            //         <h6>{data.Name}</h6>
            //         <p>{data.Qualification}</p>
            //         <p>{data.SpecialistDesc}</p>
            //     </div>
            // </Link>
            <DocListCard data={data} hasImage={hasImage ? `/assets/img/BSN/doctors/${hasImage}` : ``} link={`/doctors/${data.PartyCode}?specialistId=${data.SpecialistId}`} customClass={'mb-2'} styles={{gap: '1em', padding: '0.7em 0em 0.7em 1em', background: '#f3f3f3', borderRadius: '0.4em', boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'}} />
        )
    } else {
        return (
            <div className={`single-team-member ${myClass}`}>
                <div>
                    <div className="img-holder">
                        <img src={hasImage ? `/assets/img/BSN/doctors/${hasImage}` : `/img/DOC.png`} alt="Awesome Image" style={{height: 'auto', minHeight: '13rem'}}/>
                        <div className="overlay-style">
                            <div className="box">
                                <div className="content pt-0">
                                    <div className="top">
                                        <h3>{data.Name}</h3>
                                        <span>{data.SpecialistDesc}</span>
                                    </div>
                                    <span className="border"></span>
                                    <div className="bottom">
                                        <ul>
                                            {data.RegMob1 && <li><i className="fa fa-phone" aria-hidden="true"></i> {data.RegMob1}</li>}
                                            {/* <li><i className="fa fa-envelope" aria-hidden="true"></i> {data.StateDesc}</li> */}
                                            <li>
                                                {/* <HashLink to={`/doctors/${data.PartyCode}/${specialistId !== `?specialistId=${data.SpecialistId}` ? `?specialistId=${specialistId}` : ''}`} className="readmore my-btn-1 btn-solid text-center w-100 my-2" style={{padding: '0.32em 0.77em 0.32em 0.77em'}}>View Doctor</HashLink> */}
                                                <HashLink to={`/doctors/${data.PartyCode}?specialistId=${specialistId ? specialistId : data.SpecialistId}`} className="readmore my-btn-1 btn-solid text-center w-100 my-2" style={{padding: '0.32em 0.77em 0.32em 0.77em'}}>View Doctor</HashLink>
                                            </li>
                                            <li>
                                                <Link onClick={handleBooking} to={'#'} className="readmore my-btn-1 btn-solid mb-0 text-center w-100" style={{padding: '0.32em 0.77em 0.32em 0.77em'}}>Book Appointment</Link>
                                            </li>
                                        </ul>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-holder">
                            <h3>{data.Name}&nbsp;</h3> 
                            <span>{data.SpecialistDesc}&nbsp;</span>   
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToDoctorProfile = (state) => ({});

export const ConnectedDoctorCard = connect(mapStateToDoctorProfile, { modalAction, bookingInfoAction })(DoctorCard);

export const DocListCard = ({ data, hasImage='', link='', customClass, styles }) => {
    return (
        <Link to={link} className={`list-card-1 ${customClass}`} style={{...styles}}>
            <img src={hasImage ? hasImage : `/img/user_unknown.png`} alt="List Item" />
            <div className="list-card-content">
                <h6>{data.Name}</h6>
                <p>{data.Qualification}</p>
                <p>{data.SpecialistDesc}</p>
            </div>
        </Link>
    )
}

export const ServicesCard = ({ data }) => {

    const item = data.img.split('.')[0];

    return (
        <div className="single-team-member">
            <Link to={data.link ? `/services/${data.link}?deptId=${data.deptId}` : '#'}>
                <div className="img-holder">
                    <img src={`./assets/img/BSN/${data.img}`} alt="Awesome Image"/>
                    <div className="overlay-style">
                        <div className="box">
                            <div className="content">
                                <div className="top">
                                    <h3>{data.name}</h3>
                                </div>
                                <span className="border"></span>
                                <div className="bottom">
                                    {/* <ul>
                                        <li><i className="fa fa-phone" aria-hidden="true"></i> {data.phone}</li>
                                        <li><i className="fa fa-envelope" aria-hidden="true"></i> {data.mail}</li>
                                    </ul>     */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-holder">
                        <h3>{data.name}</h3>   
                    </div>    
                </div>
            </Link>
        </div>
    )
}

export const DepartmentCard = ({ data }) => {
    return (
        <div className="single-item text-center">
            {data.img ? 
                <div className="d-flex justify-content-center align-items-center">
                    <img className="max-h-[10em]" src={`assets/img/BSN/departments/${data.img}.jpeg`} alt="" />
                </div>
             : 
                <div className="icon-holder">
                    <span className="material-symbols-outlined notranslate">{data.icon}</span>
                </div>
             }
            <div className="text-holder">
                <h3>{data.title}</h3>
                <p>{data.content}</p>
            </div>
            <Link className="readmore my-btn-1" to={`services/${data.link}`}>Read More</Link>
        </div>
    )
}

export const TestimonialCard = ({ data }) => {
    return (
        <div className="single-testimonial-item text-center">
        <div className="img-box">
            <div className="img-holder">
                <img src={`./assets/img/${data.img}`} alt="Awesome Image"/>
            </div>
            <div className="quote-box">
                <i className="fa fa-quote-left" aria-hidden="true"></i>    
            </div>
        </div>
        <div className="text-holder">
            <p>{data.review}</p>
        </div>
        <div className="review-stars" style={{margin: '0.4em 0 0.1em'}}>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star-half' ></i>
        </div>
        <div className="name">
            <h3>{data.name}</h3>
            <span>{data.place}</span>
        </div>
        </div>
    )
}

export const HealthPackageCard = () => {
    return (
        <div className="health-pakage">
            <div className="floating-label">
                56% off
            </div>
            <div className="review-stars">
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star-half' ></i>
            </div>
            <h3>BASIC COMPREHENSIVE PACKAGE (TOTAL 58 PARAMETERS)</h3>
            <p className="package-content">Including GLUCOSE FASTING, ESR, COMPLETE BLOOD COUNT(CBC) <span>+more</span></p>
            <p className="home-collection"><i className='bx bxs-home'></i> Home collection available</p>
            <div className="price-box">
                ₹5920 <span>₹2399</span>
            </div>
            <div className="btn-box">
                <Link className="readmore my-btn-1 btn-solid" to="/healthPakages/1234">Read More</Link>
            </div>
        </div>
    )
}

export const BedCategorie = ({ data }) => {

    const item = data.img.split('.')[0];

    return (
        <div className="single-team-member">
            <Link to={data.link ? `/departments/${data.link}` : '#'}>
                <div className="img-holder bedCatagories">
                    <img src={`./assets/img/BSN/${data.img}`} alt="Awesome Image"/>
                    <div className="overlay-style">
                        <div className="box">
                            <div className="content">
                                <div className="top">
                                    <h3>{data.name}</h3>
                                </div>
                                <span className="border"></span>
                                <div className="bottom">
                                    {/* <ul>
                                        <li><i className="fa fa-phone" aria-hidden="true"></i> {data.phone}</li>
                                        <li><i className="fa fa-envelope" aria-hidden="true"></i> {data.mail}</li>
                                    </ul>     */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-holder">
                        <h3>{data.name}</h3>   
                    </div>    
                </div>
            </Link>
        </div>
    )
}
export const SocialActivityCard = ({ data }) => {

    const item = data.img.split('.')[0];

    return (
        <div className="single-team-member">
            <Link to={data.link ? `/departments/${data.link}` : '#'}>
                <div className="img-holder">
                    <img src={`./assets/img/Service/social/${data.img}`} alt="Awesome Image"/>
                    {/* <div className="overlay-style">
                        <div className="box">
                            <div className="content">
                                <div className="top">
                                    <h3>{data.name}</h3>
                                </div>
                                <span className="border"></span>
                                <div className="bottom">
                                    <ul>
                                        <li><i className="fa fa-phone" aria-hidden="true"></i> {data.phone}</li>
                                        <li><i className="fa fa-envelope" aria-hidden="true"></i> {data.mail}</li>
                                    </ul>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-holder">
                        <h3>{data.name}</h3>   
                    </div>     */}
                </div>
            </Link>
        </div>
    )
}