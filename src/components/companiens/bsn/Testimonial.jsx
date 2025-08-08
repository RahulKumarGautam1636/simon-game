const Testimonial = () => {

    return (
        <div className="bsn-global">
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>Testimonials</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="left">
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><span className="material-symbols-outlined notranslate">navigate_next</span></li>
                                        <li className="active">Testimonials</li>
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

            <section className="testimonial-page">
                <div className="container">
                    <div className="row masonary-layout">
                        <div className="col-lg-6 col-sm-12">
                            <div className="single-testimonial-item text-center">
                                <div className="img-box">
                                    <div className="img-holder">
                                        <img src="./assets/img/1.png" alt="Awesome Image"/>
                                    </div>
                                    <div className="quote-box">
                                        {/* <i className="fa fa-quote-left" aria-hidden="true"></i>  */}
                                        <i className='bx bxs-quote-left'></i>  
                                    </div>
                                </div>
                                <div className="text-holder">
                                    <p>Mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.</p>
                                </div>
                                <div className="name">
                                    <h3>Rossy Miranda</h3>
                                    <span>Newyork</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="single-testimonial-item text-center">
                                <div className="img-box">
                                    <div className="img-holder">
                                        <img src="./assets/img/2.png" alt="Awesome Image"/>
                                    </div>
                                    <div className="quote-box">
                                        <i className='bx bxs-quote-left'></i>
                                    </div>
                                </div>
                                <div className="text-holder">
                                    <p>The master-builder of human happiness one rejects, dislikes, or avoids pleasure itself, because it is pleasure pursue.</p>
                                </div>
                                <div className="name">
                                    <h3>Peter Lawrence</h3>
                                    <span>California</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="single-testimonial-item text-center">
                                <div className="img-box">
                                    <div className="img-holder">
                                        <img src="./assets/img/1.png" alt="Awesome Image"/>
                                    </div>
                                    <div className="quote-box">
                                        <i className='bx bxs-quote-left'></i>    
                                    </div>
                                </div>
                                <div className="text-holder">
                                    <p>Explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of and expound the actual teachings.</p>
                                </div>
                                <div className="name">
                                    <h3>Aldwen Shannen</h3>
                                    <span>Los Angeles</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="single-testimonial-item text-center">
                                <div className="img-box">
                                    <div className="img-holder">
                                        <img src="./assets/img/2.png" alt="Awesome Image"/>     
                                    </div>
                                    <div className="quote-box">
                                        <i className='bx bxs-quote-left'></i>  
                                    </div>
                                </div>
                                <div className="text-holder">
                                    <p>There anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can great pleasure.</p>
                                </div>
                                <div className="name">
                                    <h3>Ranald Prince</h3>
                                    <span>California</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12"> 
                            <ul className="post-pagination text-center d-flex align-center justify-content-center">
                                <li><a href="#"><i className="bx bxs-chevrons-left"></i></a></li>
                                <li className="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#"><i className="bx bxs-chevrons-right"></i></a></li>
                            </ul>
                        </div> 
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default Testimonial;