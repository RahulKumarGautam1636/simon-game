import { Link } from "react-router-dom";
import { useState } from "react"
import { SocialActivityCard } from "./utils/cards";




const SocialActivity = () => {

    const [tabActive, setTabActive] = useState('MedicalCamps');

    const MedicalCamp = [
        {id: 2, img: 'Medical Camps.jpg'},
        {id: 3, img: 'Medical Camps1.jpg'},
        {id: 4, img: 'Medical Camps2.jpg'},
    ]

    const BloodDonationCamp = [
        {id: 1, name: 'Blood Donation Camp', img: 'picture11.jpg'}
    ]

    return (
        <>
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>Social Activities</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-bottom">
                    <div className="px-3 px-lg-5">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="left">
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        <li className="active">Social Activities</li>
                                    </ul>
                                </div>
                                <div className="right">
                                    <a href="#"><span className="material-symbols-outlined notranslate">share</span> Share</a> 
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="team-area doctor doctor-page-area serviceSection">
                <div className="px-3 px-lg-5">
                    <div className="row">
                        <div className="col-md-3">
                            <ul className="nav nav-tabs tab-menu">
                                <li className={tabActive === 'MedicalCamps' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('MedicalCamps')}>FREE MEDICAL CAMPS TO SERVE THE POOR AND NEEDY PEOPLE</Link></li>
                                <li className={tabActive === 'BloodDonationCamps' ? 'active' : '' }><Link to="#" onClick={() => setTabActive('BloodDonationCamps')}>BLOOD DONATION CAMPS</Link></li>
                            </ul>   
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className={`tab-pane ${tabActive === 'MedicalCamps' ? 'active' : ''}`} id="MedicalCamps">
                                    <div className="row">
                                        {MedicalCamp.map(i => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                <SocialActivityCard data={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`tab-pane ${tabActive === 'BloodDonationCamps' ? 'active' : ''}`} id="BloodDonationCamps">
                                    <div className="row">
                                        {BloodDonationCamp.map(i => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                <SocialActivityCard data={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SocialActivity