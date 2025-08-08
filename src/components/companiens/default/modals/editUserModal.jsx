// import { connect } from "react-redux";
// import { userInfoAction, loaderAction, modalAction, compCodeAction } from "../../../../actions";
// import { JQDatePicker, getDuration, handleNumberInputs, createDate, stringToast, encrypt } from "../utilities";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../../../constants";
// import { uType } from "../../../utils/utils";

// const EditUserForm = ({ compCode, loaderAction, modalAction, userInfo, userInfoAction, modalData, isLoggedIn }) => {

//     const [statesList, setStatesList] = useState([{Description: 'West Bengal', CodeId: 3}]);

//     useEffect(() => {
//         const getStates = async () => {
//             loaderAction(true);
//             const res = await axios.get(`${BASE_URL}/api/Values/Get?Id=1`);
//             loaderAction(false);
//             let states = res.data.map(i => ({Description: i.Description, CodeId: i.CodeId}));
//             setStatesList(states);
//         }
//         getStates();
//     },[loaderAction])

//     useEffect(() => {
//         if (!isLoggedIn) {
//             alert('You are not logged in. Please login first.')
//             modalAction('EDIT_USER_MODAL', false);
//         };
//         let newItem = {
//             Salutation: userInfo.Salutation,
//             Name: userInfo.Name,
//             EncCompanyId: userInfo.EncCompanyId,
//             PartyCode: userInfo.PartyCode,
//             RegMob1: userInfo.RegMob1,
//             Email: userInfo.Email,
//             Gender: userInfo.Gender,
//             GenderDesc: userInfo.GenderDesc,
//             Address: userInfo.Address,
//             Age: userInfo.Age,
//             AgeMonth: userInfo.AgeMonth,
//             AgeDay: userInfo.AgeDay,
//             UserPassword: userInfo.UserPassword,
//             UserType: userInfo.UserType,
//             Qualification: userInfo.Qualification,
//             LicenceNo: userInfo.LicenceNo,
//             SpecialistId: userInfo.SpecialistId,
//             UserId: userInfo.UserId,
//             PartyId: userInfo.PartyId,
//             MemberId: userInfo.MemberId,            
//             Country: userInfo.Country,
        
//             State: userInfo.State,
//             City: userInfo.City,
//             Pin: userInfo.Pin,
//             Address2: userInfo.Address2,
        
//             DOB: new Date(userInfo.DOB).toLocaleDateString('en-TT'),
//             DOBstr: new Date(userInfo.DOB).toLocaleDateString('en-TT'),
//             AnniversaryDate: new Date(userInfo.AnniversaryDate).toLocaleDateString('en-TT'),
//             AnniversaryDatestr: new Date(userInfo.AnniversaryDate).toLocaleDateString('en-TT'),
//             Aadhaar: userInfo.Aadhaar,
//             IsDOBCalculated: userInfo.IsDOBCalculated,
        
//             compName: userInfo.compName,
//             compAddress: userInfo.compAddress,
//             compState: userInfo.compState,
//             compPin: userInfo.compPin,
//             compPhone1: userInfo.compPhone1,
//             compPhone2: userInfo.compPhone2,
//             compMail: userInfo.compMail,
//         }
//         setMemberData(newItem);
//     }, [modalData])

//     const [memberData, setMemberData] = useState({
//         Salutation: '',
//         Name: '',
//         EncCompanyId: compCode,
//         PartyCode: '',
//         RegMob1: '',
//         Email: '',
//         Gender: '',
//         GenderDesc: '',
//         Address: '',
//         Age: '0',
//         AgeMonth: '0',
//         AgeDay: '0',
//         UserPassword: '',
//         UserType: uType.PATIENT.level,                // since this page is for editing only still keeping this for extra safety.
//         Qualification: '',
//         LicenceNo: '',
//         SpecialistId: 0,
//         UserId: 0,
//         PartyId: 0,
//         MemberId: '',            
//         Country: 1,              
        
//         State: '3',
//         City: '',
//         Pin: '',
//         Address2: '',
        
//         DOB: '',
//         DOBstr: '',
//         AnniversaryDate: '',
//         AnniversaryDatestr: '',
//         Aadhaar: '',
//         IsDOBCalculated: 'N',
        
//         compName: '',
//         compAddress: '',
//         compState: '',
//         compPin: '',
//         compPhone1: '',
//         compPhone2: '',
//         compMail: '',
//     })

//     const handleMemberFormSubmit = (e) => {
//         e.preventDefault();
//         makeRegisterationRequest(memberData);
//     }

//     const makeRegisterationRequest = async (params) => {
//         if (!params.UserType) return alert('Error, no user type received.');
//         try {
//           loaderAction(true);
//           const res = await axios.post(`${BASE_URL}/api/UserReg/Post`, params);
//           loaderAction(false);
//           if (res.data[1].length > 3) {
//             localStorage.setItem("userLoginData", encrypt({ phone: params.RegMob1, password: params.UserPassword, compCode: params.EncCompanyId }));
//             userInfoAction({ ...params, UserId: parseInt(res.data[1]) });        // received UserId is string type hence converting it to integer because everywhere (received login data) else it's used as integer
//             modalAction('EDIT_USER_MODAL', false);
//             return true;                                                         // 'UserId' !== UserId which can cuase wrong output in filtering just like done in getMembersList function.
//           }      
//         } catch (err) {
//           alert(err);
//           return false;
//         }
//         return false;
//     } 

//     const handleMemberInput = (e) => {
//         const { name, value } = e.target;
//         setMemberData(pre => ({...pre, [name]: value}));  
//     }

//     return (
//         <div className="row" id="divEnqDataContent">
//             <form className="bg-white rounded pt-2" onSubmit={handleMemberFormSubmit} id="registrationForm">
//                 <div className="col-md-12 pt-1">
//                     <i className='bx bx-x-circle float-right-corner' style={{top: '0.5em', right: '0.4em', fontSize: '1.5em', transform: 'none'}} onClick={() => modalAction('EDIT_USER_MODAL', false)}></i>
//                     {/* <div>
//                         <h4 className="card-title position-relative">
//                             <span className="side-marker"></span>
//                             <span className="bg-white pe-2">Registration Details</span>
//                         </h4>
//                         <div className="row gx-1 gx-md-2">
//                             <div className="col-6">
//                                 <div className="form-group form-focus focused" id="lblMobile1">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Mobile Number</label>
//                                     <input name="RegMob1" readOnly value={memberData.RegMob1} required className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={10} />
//                                 </div>
//                             </div>
//                             <div className="col-6">
//                                 <div className="form-group form-focus focused" id="lblMobile1">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Aadhaar Number</label>
//                                     <input name="Aadhaar" value={memberData.Aadhaar} onChange={(e) => handleNumberInputs(e, setMemberData)} required className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={12} />
//                                 </div>
//                             </div>
//                         </div>
//                         {!memberData.Aadhaar && <div className="row gx-1 gx-md-2">
//                             <div className="col-6">
//                                 <div className="form-group form-focus focused" id="lblMobile1">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Father's Aadhaar</label>
//                                     <input name="ParentAadhaar1" value={memberData.ParentAadhaar1} onChange={(e) => handleNumberInputs(e, setMemberData)} required className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={12} />
//                                 </div>
//                             </div>
//                             <div className="col-6">
//                                 <div className="form-group form-focus focused" id="lblMobile1">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Mother's Aadhaar</label>
//                                     <input name="ParentAadhaar2" value={memberData.ParentAadhaar2} onChange={(e) => handleNumberInputs(e, setMemberData)} required className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={12} />
//                                 </div>
//                             </div>
//                         </div>}
//                         <div className="row gx-1 gx-md-2">
//                             <div className="col-6">
//                                 <div className="form-group form-focus focused" id="lblMobile1">
//                                     <label className="focus-label">Alternate Mobile</label>
//                                     <input name="Mobile" value={memberData.Mobile} onChange={(e) => handleNumberInputs(e, setMemberData)} className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={10} />
//                                 </div>
//                             </div>
//                             <div className="col-6">
//                                 <div className="form-group form-focus focused" id="lblMobile1">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Relation</label>
//                                     <input name="RelationShipWithHolder" value={memberData.RelationShipWithHolder} onChange={handleMemberInput} required className="form-control floating" tabIndex={1} id="txtMobileNo1" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}

//                     <div>
//                         {/* <h4 className="card-title position-relative">
//                             <span className="side-marker"></span>
//                             <span className="bg-white pe-2">Personal Information</span>
//                         </h4>
//                         <div className="row gx-1 gx-md-2">
//                             <div className="col-4">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Salutation</label>
//                                     <select name="Salutation" value={memberData.Salutation} required onChange={(e) => {handleMemberInput(e); toggleGender(e);}} id="ddlSalutation" tabIndex={1} className="form-control">
//                                     <option value="">-Select-</option>
//                                     <option value="Dr">Dr</option>
//                                     <option value="Mr">Mr</option>
//                                     <option value="Ms">Ms</option>
//                                     <option value="Mrs">Mrs</option>
//                                     <option value="Miss">Miss</option>
//                                     <option value="BabyOf">Baby Of</option>
//                                     <option value="Master">Master</option>
//                                     <option value="Baby">Baby</option>
//                                     <option value="Md">Md.</option>
//                                     <option value="Prof">Prof.</option>
//                                     <option value="Rev">Rev.</option>
//                                     <option value="Sk">Sk.</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="col-8">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Name</label>
//                                     <input name="Name" value={memberData.Name} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type="text" required/>
//                                 </div>
//                             </div>

//                             <div className="col-3">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Gender</label>
//                                     <select name="Gender" value={memberData.Gender} onChange={handleMemberInput} required tabIndex={1} className="form-control floating">
//                                     <option value="">-Select-</option>
//                                     {genderData.map(item => (<option key={item.CodeId} value={item.CodeId}>{item.Description}</option>))}
//                                     </select>
//                                     <input type="hidden" defaultValue id="hdnGender" />
//                                 </div>
//                             </div>
//                             <div className="col-3">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label"><b className='text-danger'>* </b>DOB</label>
//                                     <JQDatePicker id={'member_DOB'} isRequired={true} setState={setMemberData} handler={calculateDuration} curValue={memberData.DOB} name={'DOB'} customClass={'form-control'} />
//                                 </div>
//                             </div>
//                             <div className="col-2">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label">Years</label>
//                                     <input name="Age" value={memberData.Age} onChange={(e) => handleNumberInputsWithDate(e, setMemberData)} className="form-control floating" tabIndex={1} type='text' maxLength={2} id="txtPtAge" />
//                                 </div>
//                             </div>
//                             <div className="col-2">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label">Months</label>
//                                     <input name="AgeMonth" value={memberData.AgeMonth} onChange={(e) => handleNumberInputsWithDate(e, setMemberData)} className="form-control floating" tabIndex={1} type='text' maxLength={2} id="txtPtAgeMonth"/>
//                                 </div>
//                             </div>
//                             <div className="col-2">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label">Days</label>
//                                     <input name="AgeDay" value={memberData.AgeDay} onChange={(e) => handleNumberInputsWithDate(e, setMemberData)} className="form-control floating" tabIndex={1} type='text' maxLength={2} id="txtPtAgeDay"/>
//                                 </div>
//                             </div>
//                         </div> */}
//                         <h4 className="card-title position-relative">
//                             <span className="side-marker"></span>
//                             <span className="bg-white pe-2">Address Details</span>
//                         </h4>
//                         <div className="row gx-1 gx-md-2">
//                             <div className="col-6">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label">Apartment / Flat no.</label>
//                                     <input name="Address2" value={memberData.Address2} onChange={handleMemberInput} className="form-control floating" tabIndex={1} autoComplete="off"/>
//                                 </div>
//                             </div>                      
//                             <div className="col-6">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Address</label>
//                                     <input name="Address" value={memberData.Address} onChange={handleMemberInput} required className="form-control floating" tabIndex={1} type="text" />
//                                 </div>
//                             </div>
//                             <div className="col-3">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label"><b className='text-danger'>* </b>State</label>
//                                     <select name="State" value={memberData.State} onChange={handleMemberInput} required tabIndex={1} className="form-control floating">
//                                         <option value="">-Select-</option>
//                                         {statesList.map(item => {
//                                             return (
//                                             <option key={item.CodeId} value={parseInt(item.CodeId)}>{item.Description}</option>
//                                             )
//                                         })}
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="col-3">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label"><b className='text-danger'>* </b>City</label>
//                                     <input name="City" value={memberData.City} onChange={handleMemberInput} required className="form-control floating" tabIndex={1} type='text'/>
//                                 </div>
//                             </div>
//                             <div className="col-3">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Pin Code</label>
//                                     <input name="Pin" value={memberData.Pin} onChange={(e) => handleNumberInputs(e, setMemberData)} required className="form-control floating" tabIndex={1} type='text' maxLength={6} />
//                                 </div>
//                             </div>
//                             {/* <div className="col-3">
//                                 <div className="form-group form-focus focused">
//                                     <label className="focus-label"><b className='text-danger'>* </b>Country</label>
//                                     <input name="Country" value={memberData.country} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type="text" />
//                                 </div>
//                             </div> */}
//                         </div>
  
//                         <button type="submit" className="btn btn-primary d-block btnSave mx-auto fw-bold" style={{width: "10rem"}} tabIndex={1}>SUBMIT</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// const mapStateToMemberForm = (state) => {
//     return { compCode: state.compCode, userInfo: state.userInfo, isLoggedIn: state.isLoggedIn };
// }
  
// export default connect(mapStateToMemberForm, { userInfoAction, loaderAction, modalAction })(EditUserForm);

