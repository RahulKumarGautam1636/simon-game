import { connect } from "react-redux"
import { loaderAction, modalAction, userInfoAction } from "../../../../actions"
import { Link } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../../../constants"

const MemberSelection = ({ userInfo, modalAction, loaderAction, userInfoAction, mode }) => {
    const selectedMember = userInfo.selectedMember;
    const renderCurrentMember = () => {
        if (Object.keys(selectedMember).length === 0) {
          return (
            <>
              <div className='dashboard-card__img-box p-0'>
                <img src="/img/user_unknown.png" alt="User" style={{maxHeight: '4em'}} />
                <div className="img">
                  <Link to={'#'} title={userInfo.Name}>{userInfo.Name}</Link>
                  {userInfo.UHID && <span>UHID : {userInfo.UHID}</span>}
                </div>
              </div>
              <div className="dashboard-card__content-box w-100">
                <p><span><i className='bx bxs-phone-call'></i> Phone : </span><span> +91 {userInfo.RegMob1}</span></p>
                <p><span><i className="bx bxs-hourglass-bottom"></i> Age : </span><span> {userInfo.Age} Years</span></p>
                <p><span><i className='bx bx-male-female'></i> Gender : </span> <span>{userInfo.GenderDesc}</span></p>
                <p className='mb-0'><span><i className='bx bxs-map'></i> Address : </span> <span>{userInfo.Address}</span></p>
              </div>
            </>
          )
        } else {
          return (
            <>
              <div className='dashboard-card__img-box p-0'>
                <img src="/img/user_unknown.png" alt="User" style={{maxHeight: '4em'}} />
                <div className="img">
                  <Link to={'#'} title={selectedMember.MemberName}>{selectedMember.MemberName}</Link>
                  {selectedMember.UHID && <span>UHID : {selectedMember.UHID}</span>}
                </div>
              </div>
              <div className="dashboard-card__content-box w-100">
                <p><span><i className='bx bxs-phone-call'></i> Phone : </span><span> +91 {selectedMember.Mobile}</span></p>
                <p><span><i className="bx bxs-hourglass-bottom"></i> Age : </span><span> {selectedMember.Age} Years</span></p>
                <p><span><i className='bx bx-male-female'></i> Gender : </span> <span>{selectedMember.GenderDesc}</span></p>
                <p className='mb-0'><span><i className='bx bxs-map'></i> Address : </span> <span>{selectedMember.Address}</span></p>
              </div>
            </>
          )
        }
    }

    const handleMemberSelection = async (item, companyCode) => {
        if (!item) return;
        try {      
          loaderAction(true);
          const res = await axios.get(`${BASE_URL}/api/member/GetMemberIsDefault?MemberId=${item.MemberId}&CID=${companyCode}`, {});
          loaderAction(false);
          if (!res.data.MemberId) return alert('Something went wrong. Please try again.');
          userInfoAction({selectedMember: res.data});
        } catch (error) {
          alert('Something went wrong please try after some time.');
        }
    }

    return (
        <>
          <h4 className="card-title mb-3"><i className="fas fa-user-check ps-1 pe-2"></i> Masters List</h4>
          <div className="card-body" style={{padding: '2px'}}>
            <div style={{fontSize: '0.72em', marginBottom: '1.3em'}}>
              <div className='dashboard-card dashboard-card-user_card'>
                {renderCurrentMember()}
                <div className="member-box">
                  {/* <h4 className="card-title mb-3">{userInfo.UserType === uType.PROVIDER.level ? '' : 'Family '}Members</h4> */}
                  <ul className="list-unstyled mb-2" style={{overflow: 'auto', maxHeight: '42vh', fontSize: '0.94em'}}>
                    <li style={{ background: '#e0feff', fontWeight: 500 }}>
                      <span>Name</span>
                      <span>Date of Birth</span>
                      <span>Gender</span>
                      <span>Action</span>
                    </li>
                    {userInfo.MembersList.AccPartyMemberMasterList?.map(item => (
                      <li key={item.MemberId}>
                        <span title={`Select ${item.MemberName} for Appointment`} onClick={() => handleMemberSelection(item, userInfo.selectedCompany.EncCompanyId)}><i className={`bx bx-${userInfo.selectedMember?.MemberId === item.MemberId ? 'check-' : ''}circle`} ></i> {item.MemberName}</span>
                        <span>{new Date(item.DOB).toLocaleDateString('en-TT')}</span>
                        <span>{item.GenderDesc}</span>
                        <span><i onClick={() => modalAction('MEMBER_MODAL', true, {editId: item.MemberId})} className='bx bx-edit me-sm-3' title="Edit"></i> {/* <i className='bx bx-trash' title="Delete"></i> */}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="dashboard-card__btn-box">
                    <button onClick={() => modalAction('MEMBER_MODAL', true)} className='dashboard-card__btn-box-item' style={{'--clr': '#149A8D', '--bg': '#48fffc3b', '--bClr': '#149a8d57', padding: '0.45em 1em 0.5em'}}>Add New</button>
                    {mode === 'component' ? '' : <button onClick={() => modalAction('MEMBER_SELECT_MODAL', false)} className='dashboard-card__btn-box-item' style={{'--clr': '#142b9a', '--bg': '#d2e4ff', '--bClr': '#0020a057'}}>OK</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

const mapStateToMemberSelection = (state) => {
    return { userInfo: state.userInfo };
}
  
export default connect(mapStateToMemberSelection, { userInfoAction, modalAction, loaderAction })(MemberSelection);