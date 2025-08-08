import { connect } from "react-redux";
import { modalAction, userInfoAction } from "../../../../actions";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { logOut } from "../../default/utilities";

const UserInfoModal = ({ modalAction, userInfo }) => {

    const history = useHistory();
    const [active, setActive] = useState('personal-info');

    return (
        <div className="user-info-modal">
            {/* <div>
                <button className="logout-btn" onClick={() => modalAction('USER_INFO_MODAL', false)}><i className='bx bx-x-circle'></i></button>
                <div className="img-circle">
                    <img src="/assets/img/ePharma/user_unknown.png" style={{maxHeight: '10rem'}} alt="user"/>
                </div>
                <div className="user-content d-flex align-items-center flex-column text-center">
                    <h4 className="user-name">{userInfo.Name}</h4>
                    <h6 className="user-number">{userInfo.RegMob1}</h6>
                    <p className="user-email">{userInfo.Email}</p>
                    <p className="user-address">{userInfo.Address}</p>
                </div>
                <div className="cart-buttons mt-20">
                    <button onClick={() => {history.push('/cartPage'); modalAction('USER_INFO_MODAL', false)}} className="button">Visit Cart</button>
                    <button className="button" onClick={() => {history.push('/myOrders'); modalAction('USER_INFO_MODAL', false)}}>My Orders</button>
                </div>
                <div className="links-box">
                    <Link className="link-box-item" to='/logout'><i className='bx bx-log-out'></i> Logout</Link>
                    <span className="link-box-item" onClick={() => {modalAction('EDIT_USER_MODAL', true)}}><i className='bx bx-edit'></i> Edit Profile</span>
                </div>
            </div> */}
            <div className="d-flex gap-4" style={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}}>
                <button className="logout-btn" onClick={() => modalAction('USER_INFO_MODAL', false)}><i className='bx bx-x-circle'></i></button>
                <div className="d-flex gap-4 w-100" style={{borderBottom: '1px solid #d8d8d8', paddingBottom: '1.1em'}}>
                    <img src="/assets/img/ePharma/user_unknown.png" style={{maxHeight: '4.3em'}} alt="user"/>
                    <div>
                        <h2 className="mb-2" style={{fontSize: '1.2em', fontWeight: 600}}>{userInfo.Name}</h2>
                        <p className="mb-0">{userInfo.GenderDesc}</p>
                    </div>
                </div>
                <div className="user-content w-100" style={{borderBottom: '1px solid #d8d8d8', paddingBottom: '1.1em'}}>
                    <div className="user-tabs mb-20">
                        <ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap bg-transparent">
                            <li className="nav-item">
                                <Link className={`nav-link py-2 ${active === 'personal-info' ? 'active' : ''}`} to="#" onClick={() => setActive('personal-info')}>
                                    Personal Info
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link py-2 ${active === 'members' ? 'active' : ''}`} to="#" onClick={() => setActive('members')}>
                                    <span>All Members</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id='patiendProfile_tabs'>
                        <div id="personal-info" className={`tab-pane fade ${active === 'personal-info' ? 'show active' : ''}`}>
                            <div className="row-list">
                                <div className="row-item align-items-center">
                                    <h6>Phone: </h6>
                                    <p className="user-number" style={{color: '#5260ff', fontWeight: 600, padding: '0.4rem 1.2rem 0.2rem'}}>{userInfo.RegMob1}</p>
                                </div>
                                {/* <div className="row-item align-items-center">   
                                    <h6>Wallet Balance: </h6>
                                    <p className="user-number" style={{color: 'rgb(235 51 142)', fontWeight: 600, padding: '0.4rem 1.2rem 0.2rem', background: 'rgb(255 232 234)', outline: 'rgb(255 203 208) solid 1px'}}>XXXX</p>
                                </div> */}
                                <div className="row-item">
                                    <h6>Address: </h6>
                                    <p>{userInfo.Address2}, {userInfo.Address}, {userInfo.City}</p>
                                </div>
                                <div className="row-item">
                                    <h6>Pin Code: </h6>
                                    <p>{userInfo.Pin}</p>
                                </div>
                                <div className="row-item">
                                    <h6>State: </h6>
                                    <p>{userInfo.StateName}</p>
                                </div>
                                <div className="row-item">
                                    <h6>E-mail: </h6>
                                    <p>{userInfo.Email}</p>
                                </div>
                                <div className="row-item">
                                    <h6>DOB:  </h6>
                                    <p style={{letterSpacing: 1}}>{new Date(userInfo.DOB).toLocaleDateString('en-TT')}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`tab-pane fade ${active === 'members' ? 'show active' : ''}`} id="members">
                            <ul className="list-inline mb-0" style={{fontSize: '1.2em', padding: '0 2px'}}>
                                {userInfo.MembersList.AccPartyMemberMasterList.map(i => (
                                    <li className="mb-2" key={i.MemberId}>
                                        <div className="card-1 position-relative">
                                            <div>
                                                <img src="/assets/img/ePharma/user_unknown.png" alt="headphone" style={{height: '3em', width: '3em', background: '#157eab', borderRadius: 4}} />
                                                <div>
                                                    <a href="#/productPage/650214">
                                                        <h5>{i.MemberName}</h5>
                                                        <h6 className="text-blue" style={{marginBottom: '0.2em'}}>{i.RelationShipWithHolder}</h6>
                                                        <p className="price text-muted">{i.GenderDesc} <span className="">, {i.Age} Years</span></p>
                                                    </a>
                                                    {/* <p className="packSize"><span className="current" role="button">8 ml</span></p>
                                                    <p className="stock-label mt-0"><i className="bx bxs-message-x text-danger"></i> Out of Stock</p> */}
                                                </div>
                                            </div>
                                            <div className="floating-icons-box bg-transparent border-0" style={{top: 3, fontSize: '0.8em'}}>
                                                <span title="Edit Member" style={{cursor: 'pointer', color: 'orangered'}} onClick={() => modalAction('MEMBER_MODAL', true, {editId: i.MemberId})}>
                                                    <i className="bx bx-pencil"></i>
                                                </span>
                                                <span title="Delete Member" style={{cursor: 'pointer'}}>
                                                    <i className="fas fa-trash"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="cart-buttons mt-2" style={{fontSize: '0.9em'}}>
                    <button onClick={() => {history.push('/cartPage'); modalAction('USER_INFO_MODAL', false)}} className="button">Visit Cart</button>
                    <button className="button" onClick={() => {history.push('/myOrders'); modalAction('USER_INFO_MODAL', false)}}>My Orders</button>
                </div>
                <div className="links-box mt-0">
                    <Link className="link-box-item" to='#' onClick={() => logOut(history)}><i className='bx bx-log-out'></i> Logout</Link>
                    <span className="link-box-item" onClick={() => {modalAction('EDIT_USER_MODAL', true)}}><i className='bx bx-edit'></i> Edit Profile</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToLoginModal = (state) => {
    return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo };
}

export default connect(mapStateToLoginModal, {modalAction, userInfoAction})(UserInfoModal);