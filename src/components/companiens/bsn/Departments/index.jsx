import { Link } from "react-router-dom";

const Departments = () => {
    return (
        <div className="bsn-global">
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>Departments</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="left pull-left">
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        <li className="active">Departments</li>
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

            <section className="medical-departments-area departments-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="single-item text-center">
                                <div className="icon-holder">
                                    <span className="material-symbols-outlined notranslate">cardiology</span>    
                                </div>
                                <div className="text-holder">
                                    <h3>Cardiology</h3>
                                    <p>How all this mistaken al idea of denouncing pleasure praisings pain was complete.</p>
                                </div>
                                <Link className="readmore my-btn-1 btn-solid" to="/departments/cardiology">Read More</Link>
                            </div>
                        </div> 
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="single-item text-center">
                                <div className="icon-holder">
                                    <span className="material-symbols-outlined notranslate">pulmonology</span>   
                                </div>
                                <div className="text-holder">
                                    <h3>Pulmonology</h3>
                                    <p> Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.</p>
                                </div>
                                <a className="readmore my-btn-1 btn-solid" href="pulmonology.html">Read More</a>
                            </div>
                        </div> 
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="single-item text-center">
                                <div className="icon-holder">
                                    <span className="material-symbols-outlined notranslate">gynecology</span>    
                                </div>
                                <div className="text-holder">
                                    <h3>Gynecology</h3>
                                    <p> Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.</p>
                                </div>
                                <a className="readmore my-btn-1 btn-solid" href="gynecology.html">Read More</a>
                            </div>
                        </div> 
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="single-item text-center">
                                <div className="icon-holder">
                                    <span className="material-symbols-outlined notranslate">neurology</span>    
                                </div>
                                <div className="text-holder">
                                    <h3>Neurology</h3>
                                    <p>How all this mistaken al idea of denouncing pleasure praisings pain was complete.</p>
                                </div>
                                <a className="readmore my-btn-1 btn-solid" href="neurology.html">Read More</a>
                            </div>
                        </div> 
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="single-item text-center">
                                <div className="icon-holder">
                                    <span className="material-symbols-outlined notranslate">urology</span>    
                                </div>
                                <div className="text-holder">
                                    <h3>Urology</h3>
                                    <p> Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.</p>
                                </div>
                                <a className="readmore my-btn-1 btn-solid" href="urology.html">Read More</a>
                            </div>
                        </div> 
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="single-item text-center">
                                <div className="icon-holder">
                                    <span className="material-symbols-outlined notranslate">gastroenterology</span>
                                </div>
                                <div className="text-holder">
                                    <h3>Gastrology</h3>
                                    <p> Who chooses to enjoy a pleasure that has annoying consquences, or one who avoids a pain.</p>
                                </div>
                                <a className="readmore my-btn-1 btn-solid" href="gastrology.html">Read More</a>
                            </div>
                        </div> 
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="single-item text-center">
                                <div className="icon-holder">
                                    <span className="material-symbols-outlined notranslate">pediatrics</span>   
                                </div>
                                <div className="text-holder">
                                    <h3>Pediatrician</h3>
                                    <p> There anyone loves pursue or desires to obtain pain sed of itself because pain occasionally.</p>
                                </div>
                                <a className="readmore my-btn-1 btn-solid" href="pediatrician.html">Read More</a>
                            </div>
                        </div> 
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="single-item text-center">
                                <div className="icon-holder">
                                    <span className="material-symbols-outlined notranslate">biotech</span>
                                </div>
                                <div className="text-holder">
                                    <h3>Laboratory</h3>
                                    <p> Take a trivial example, which of ever undertake laborous physically exercise some advantage.</p>
                                </div>
                                <a className="readmore my-btn-1 btn-solid" href="laborotory.html">Read More</a>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Departments;