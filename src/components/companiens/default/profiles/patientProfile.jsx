import { BreadCrumb, getFrom } from '../utilities';
import { connect } from 'react-redux';
import { modalAction } from '../../../../actions';
import { MemberCard } from '../cards'
import { Link } from 'react-router-dom';
import { memberLabel } from '../../../../constants';


const PatientProfile = ({ userInfo, compCode, modalAction }) => {

    // const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true, decode: false });

    // const [doctorData, setDoctorData] = useState({loading: true, data: [], err: {status: false, msg: ''}});

    // useEffect(() => {
    //     if (queryString.CID) {
    //         getDoctorData(queryString.CID);
    //         } else {
    //         getDoctorData(userInfo.selectedCompany.EncCompanyId);
    //     }
    // }, [queryString.CID, userInfo.selectedCompany.EncCompanyId])

    // const getDoctorData = async (companyCode) => {
	// 	if (!companyCode) return;
	// 	const res = await getFrom(`${BASE_URL}/api/Values/Get?CID=${companyCode}&DID=${userInfo.PartyCode}`, {}, setDoctorData);
	// 	if (res) {
	// 	  setTimeout(() => {
	// 		setDoctorData(res);  
	// 	  }, 1000)
	// 	}                                                                                                   
	// }
    
    const breadCrumbData = {
		links: [{name: 'Home', link: '/'}, {name: 'Patient Profile', link: `/profile/${userInfo.PartyCode}`}],
		activeLink: `/profile/${userInfo.PartyCode}`
	}

    return (
        <>
        <BreadCrumb data={breadCrumbData}/>
            <div className='content pt-3 default-global profile-page'>
                <div className="container-fluid" style={{fontSize: '1.1em'}}>
                    <div className="row">
                        <div className="col-12 dct-appoinment">
                            <div className="card">
                                <div className="card-body">
                                    <div style={{ fontSize: "0.8em", marginBottom: "1.3em" }}>
                                        <div className="dashboard-card dashboard-card-user_card">
                                            <div className="dashboard-card__img-box">
                                                <img style={{maxHeight: '5.7em'}} src="/img/user_unknown.png" alt="User" />
                                                <div className="img">
                                                    <Link title="Prakash Verma" to="#"> {userInfo.Name} </Link>
                                                    <span>UHID : {userInfo.UHID}</span>
                                                    <span className="badge badge-pill" style={{background: '#c9eaff', fontSize: '1.1em', width: 'fit-content', marginTop: '0.3em', color: '#006693'}}>{userInfo.UserType}</span>
                                                </div>
                                            </div>
                                            <div className="dashboard-card__content-box">
                                                <p>
                                                    <span>
                                                        <i className="bx bxs-phone-call" /> Phone :
                                                    </span>
                                                    <span> +91 {userInfo.RegMob1}</span>
                                                </p>
                                                <p>
                                                    <span>
                                                        <i className="bx bxs-hourglass-bottom" /> Age :
                                                    </span>
                                                    <span> {userInfo.Age} Years</span>
                                                </p>
                                                <p>
                                                    <span>
                                                        <i className="bx bx-male-female" /> Gender :
                                                    </span>
                                                    <span>{userInfo.GenderDesc}</span>
                                                </p>
                                                <p className="mb-0">
                                                    <span>
                                                        <i className="bx bxs-map" /> Address :
                                                    </span>
                                                    <span>{userInfo.Address}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card-table mb-0">
                                        <div className="card-body">
                                            <div className="appointment-tab">
                                                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded p-3 pe-0 pb-0">
                                                    <li className="nav-item">
                                                        <Link className="nav-link active" to="#"> {memberLabel}s </Link>
                                                    </li>
                                                    {/* <li className="nav-item mx-2">
                                                        <a className="nav-link " href="#"> Tab 2 </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link " href="#"> Tab 3 </a>
                                                    </li> */}
                                                </ul>
                                                <div className="tab-content">
                                                    <div className="tab-pane fade show active" id="previous-appointments" >
                                                        <div className="card card-table mb-0 border-0" style={{boxShadow: 'none'}}>
                                                            <div className="card-body">
                                                                <div className="dashboard-card__btn-box justify-content-between w-100 align-items-center" style={{fontSize: '1.5em'}}> 
                                                                    {/* <h4 className="card-title mb-0">Family {memberLabel}s</h4>                                                       */}
                                                                    <button onClick={() => modalAction('MEMBER_MODAL', true)} className='dashboard-card__btn-box-item reverse-hover d-flex align-items-center icon-btn' style={{'--clr': '#48fffc3b', '--bg': '#149A8D', '--bClr': '#149a8d57', gap: '0.3em', fontSize: '0.8em', padding: '0.5em 0.6em 0.3em'}}><i className='bx bx-plus-circle'></i> Add New {memberLabel}</button>
                                                                </div>
                                                                {userInfo.MembersList.AccPartyMemberMasterList?.map(item => (
                                                                    <MemberCard key={item.MemberId} data={item} modalAction={modalAction} selected={userInfo.selectedMember?.MemberId} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToPatientProfile = (state) => {
    return { compCode: state.compCode, userInfo: state.userInfo };
}
  
export default connect(mapStateToPatientProfile, { modalAction })(PatientProfile);