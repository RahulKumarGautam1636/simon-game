// import { useState } from "react";
// import { Link } from "react-router-dom";
import { BedCategorie } from "./utils/cards";


const BedCatagories = () => {

    const bedCategories = [
        // {id: 1, name: 'ICU - 13', img: 'ICU.jpg'},
        {id: 1, name: 'ICU - 13', img: 'DSC_2349.jpg'},
        {id: 2, name: 'SDU - 8', img: 'Picture2.png'},
        {id: 3, name: 'GENRAL WARDS - 36', img: 'Picture3.png'},
        {id: 4, name: 'EMERGENCY DEPARTMENT - 1', img: 'DSC_9652.jpg'},
        {id: 5, name: 'SINGLE CABIN A.C & NON A.C - 16', img: 'A.C Room.jpg'},
        // {id: 6, name: 'SEMI PRIVATE CABINS - 11 ', img: 'SEMI PRIVATE CABINS.webp'},
        {id: 6, name: 'SEMI PRIVATE CABINS - 11 ', img: 'DSC_9614.jpg'},
        {id: 7, name: 'DIALYSIS - 7', img: 'DIALYSIS.jpg'}
    ]

    return (
        <>
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>Bed Categories</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-bottom">
                    <div className="px-3 px-lg-5">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="left pull-left">
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        <li className="active">Bed Catagories</li>
                                    </ul>
                                </div>
                                <div className="right pull-right">
                                    <a href="#"><span className="material-symbols-outlined notranslate">share</span> Share</a> 
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="team-area doctor doctor-page-area serviceSection">
                <div className="px-3 px-lg-5">
                    <div className="">
                        <div className="">
                            <div className="">          
                                <div className="" id="bedCategories" style={{fontSize: '0.8em'}}>
                                    <div className="row">
                                        {bedCategories.map(i => (
                                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                <BedCategorie data={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        {/* <div className="col-md-3">
                            <ul className="nav nav-tabs tab-menu">
                                <li className="bedList">BED CATEGORIES</li>
                            </ul>   
                        </div>
                        <div className="col-md-9">
                            <div className="">          
                                <div className="" id="bedCategories">
                                    <div className="row">
                                        {bedCategories.map(i => (
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                                <BedCategorie data={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                           
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default BedCatagories;