// import { ControlledCarousel } from "../default/utilities";

const Hero = () => {

    // const images = [
    //     'img/bg/newLife/NewLif1.jpeg',
    //     'img/bg/newLife/NewLif2.jpeg',
    //     'img/bg/newLife/NewLif3.jpeg',
    // ];

    return (
        <div className='row am-nursing-home'>
            <div className='col col-12 col-lg-6 order-2 order-lg-1'>
                <div className="choose-us-content">
                    <span className="text-uppercase letter-spacing" style={{fontWeight: 600, color: 'rgb(255 69 0)'}}>WHY CHOOSE US</span>
                    <h2>Our hospital has professional doctors who provide low cost 24 hour service</h2>
                    <ul>
                        <li>
                            <span>1</span>
                            <div>
                                <h3>Modern Technology</h3>
                                <p>Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                            </div>
                        </li>
                        <li className="active">
                            <span>2</span>
                            <div>
                                <h3>Professional Doctors</h3>
                                <p>Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                            </div>
                        </li>
                        <li>
                            <span>3</span>
                            <div>
                                <h3>Affordable Price</h3>
                                <p>Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
                <div className='col col-12 col-lg-6 order-1 order-lg-2 position-relative'>
                <div className='img-box'>
                    <img className='img-fluid' src="/img/choose-us-img.jpg" alt="choose-us"/>                    
                    {/* <ControlledCarousel data={images} interval={2000} controls={false}/> */}
                    <div className='contact-lable'>
                        <i className='bx bxs-ambulance'></i>
                        <div>
                            <p>24/7 Hours Service</p>
                            <h2>1800 123 763</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;


export const amNursingHome = `
    .header-nav {
        background: white;
    }
    .am-nursing-home > div:first-child {
        background-image: linear-gradient(45deg, #ffffff66, #e5f8f5), url(../../../../public/img/choose-us-bg.jpg);
        background-size: contain;
        background-repeat: no-repeat;
    }
    .am-nursing-home .img-box {
        position: relative;
    }
    .am-nursing-home .img-box img {
        width: 94%;
        max-height: 51rem;
        margin-left: 3rem;
        margin-top: 0rem;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
    .contact-lable {
        position: absolute;
        left: 0rem;
        bottom: 1.5rem;
        background: white;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
    .contact-lable i {
        font-size: 5em;
        color: orangered;
    }
    .contact-lable p {
        font-size: 1.5em;
        font-weight: 700;
        color: blue;
        margin-bottom: 0.3em;
    }
    .contact-lable h2 {
        margin-bottom: 0;
        font-size: 2.5em;
    }
    .choose-us-content {
        padding-left: 1.7em;
        padding-bottom: 3em;
        padding-top: 1.6em;
        font-family: 'Poppins';
    }
    .choose-us-content > span {
        font-weight: 500;
        color: rgb(0, 87, 184);
    }
    .choose-us-content h2 {
        text-transform: capitalize;
        font-size: 2.1em;
        margin: 0.4em 0 0.8em 0;
        position: relative;
        line-height: 1.6em;
        background: #207c98;
        color: white;
        padding: 0.5em 0.8em;
        box-shadow: rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
    .choose-us-content h2::before {
        content: '';
        position: absolute;
        height: 3.5em;
        width: 2.5em;
        background: #1b687f;
        top: 0;
        left: 100%;
        clip-path: polygon(0 0, 0 100%, 100% 100%);
    }
    .choose-us-content p {
        font-size: 1.15em;
    }
    .choose-us-content ul {
        list-style: none;
        padding-left: 0;
    }
    .choose-us-content li {
        display: flex;
        justify-content: center;
        font-size: 0.85em;
        padding: 0.5em 0;
    }
    .choose-us-content h3 {
        font-size: 1.7em;
    }
    .choose-us-content li span {
        height: 10em;
        width: 10em;
        max-width: 3.2em;
        max-height: 3.2em;
        background: #077db2;
        color: white;
        border-radius: 50%;
        display: grid;
        place-items: center;
        margin-right: 1em;
        position: relative;
        font-size: 1.5em;
    }
    .choose-us-content li span::before {
        content: '';
        position: absolute;
        top: 5px;
        height: 296%;
        background: #077db2;
        width: 3px;
        z-index: -1;
    }
    .choose-us-content li:last-child span::before {
        content: none;
    }
    .carousel-item {
        overflow: hidden;
    }

    .footer {
        background: #148288;
    }
    .footer .footer-widget .footer-logo {
        margin: 10px 16px 20px;
        background: white;
        width: fit-content;
        outline: 10px solid white;
    }
    @media only screen and (max-width: 991px) {
        .am-nursing-home {
            max-width: 42em;
            margin: 0 auto;
        }
        .choose-us-content {
            padding-left: 0;
            padding-top: 0;
            padding-bottom: 1em;
        }
        .choose-us-content h2::before {
            left: auto;
            transform: rotate(180deg);
            top: 100%;
            right: 0%;
        }
        .am-nursing-home .img-box img {
            margin-left: 0;
            width: 100%;
            margin-bottom: 1em;
            max-height: 34rem;
        }
        .choose-us-content li:not(:last-child) div {
            border-bottom: 1px solid #077db2a8;
        }
    }
    @media only screen and (max-width: 576px)  {
        .am-nursing-home {
            margin-right: calc(-.5 * var(--bs-gutter-x));
            margin-left: calc(-.5 * var(--bs-gutter-x));
        }
        .choose-us-content h2 {
            font-size: 1.7em;
        }
    }
`