// import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
// import { SocialActivityCard } from "../bsn/utils/cards";
import { getFrom } from "../default/utilities";
import { loaderAction } from "../../../actions";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { BASE_URL, SRC_URL } from "../../../constants";




const HealthCenter = ({ compCode, userInfo }) => {

    const [tabActive, setTabActive] = useState('MedicalCamps');

    const [companyTabList, setCompanyTabList] = useState({loading: true, data: [], err: {status: false, msg: ''}});
  
    useEffect(() => {
      getCompanyTabList(compCode, userInfo.UserId);
    }, [compCode, userInfo.UserId])
  
    const getCompanyTabList = async (companyCode, userId) => {
      loaderAction(true);
      const res = await getFrom(`${BASE_URL}/api/CompMast/Get?CID=${companyCode}&UID=${userId}`, {}, setCompanyTabList);
      if (res) {
        setCompanyTabList(res); 
      } else {
        console.log('No data received');
      }
      loaderAction(false);
    }

    const renderCompList = (data) => {
        if (data.loading) {
          return <div className='w-100'><Skeleton count={6}/></div>;
        } else if (data.err.status) {
          return <div className='text-center my-5'><h3 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h3></div>;
        } else if (data.data.length === 0) {
          return <div className='text-center my-5'><h2 className="text-info mark">No Company List found</h2></div>;
        } else {
          return data.data.map(i => (
            <div className="col-lg-6 col-xs-12">
                <CompanyCard data={i} />
            </div>
        ))
        }
    }

    const CompanyCard = ({ data }) => {
        return (
            <div className="doctor-profile company-card" style={{paddingTop: 1}}>
                <div className="card mb-3">
                    <div className="card-body flex-row" style={{display: 'flex', gap: '1.2em', borderBottom: '1px solid #e3e3e3'}}>
                        <div className="profile-img">
                            <img style={{maxHeight: '3.8em'}} src={`${SRC_URL}/Content/CompanyLogo/${data.LogoUrl}`} />
                        </div>
                        <div className="profile-content overflow-hidden">
                            <h3 style={{fontSize: '1.2em', marginBottom: 0}}> {data.COMPNAME}</h3>
                            <p><span className="material-symbols-outlined">pin_drop</span> {data.ADDRESS}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="breadcrumb-area" style={{backgroundImage: 'url(/assets/img/aboutUs/aboutus-background.jpg)'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumbs">
                                <h1>Health Center</h1>
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
                                        <li><span className="material-symbols-outlined">navigate_next</span></li>
                                        <li className="active">Health Center</li>
                                    </ul>
                                </div>
                                <div className="right">
                                    <a href="#"><span className="material-symbols-outlined">share</span> Share</a> 
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="team-area doctor doctor-page-area serviceSection health-center-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ul className="nav nav-tabs tab-menu">
                                <li className={tabActive === 'MedicalCamps' ? 'active' : '' }>
                                    {/* <Link to="#" onClick={() => setTabActive('MedicalCamps')}>AREA</Link> */}
                                    <div className="mainmenu-right-box header-search w-100 py-0" style={{marginBottom: '0.62em', fontSize: '1.25em'}}>
                                        <div className="search-form">
                                            <form className="w-100">
                                                <div className="search">
                                                    <input type="text" name="search" placeholder="Search by Area.."/>
                                                    <button type="submit"><i className='bx bxs-map'></i></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>  
                                </li>
                                <li className={tabActive === 'BloodDonationCamps' ? 'active' : '' }>
                                    <div className="mainmenu-right-box header-search w-100 py-0" style={{marginBottom: '0.62em', fontSize: '1.25em'}}>
                                        <div className="search-form">
                                            <form className="w-100">
                                                <div className="search">
                                                    <input type="text" name="search" placeholder="Search by Pincode.."/>
                                                    <button type="submit"><i className='bx bxs-map-pin' ></i></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div> 
                                </li>
                            </ul>   
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className={`tab-pane ${tabActive === 'MedicalCamps' ? 'active' : ''}`} id="MedicalCamps">
                                    <div className="row">
                                        {renderCompList(companyTabList)}
                                    </div>
                                </div>
                                {/* <div className={`tab-pane ${tabActive === 'BloodDonationCamps' ? 'active' : ''}`} id="BloodDonationCamps">
                                    <div className="row">
                                        {renderCompList(companyTabList)}
                                    </div>
                                </div> */}
                            </div>
                           
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (state) => {
    return { compCode: state.compCode, userInfo: state.userInfo };
  }
  
  export default connect(mapStateToProps, {loaderAction})(HealthCenter);