import { ChevronLeft, User, CreditCard, Building, Clock, FileText, Smartphone, Lock, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import { modalAction, loginStatusAction, loaderAction, userInfoAction } from "../../../../actions";
import axios from "axios";
import { JQDatePicker, createDate, getDuration, handleNumberInputs, stringToast } from "../utilities";
import { BASE_URL } from "../../../../constants";
import { useFetch } from "../../default/utilities";

function UserProfile({ modalAction, isLoggedIn, loginStatusAction, compCode, loaderAction, userInfoAction, userInfo }) {

  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);

  const history = useHistory();
  const [active, setActive] = useState('personal');

  const ProfileSection = () => (
    <div className="bg-white p-4 mb-0 border-b border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Profile</h3>
      <div className="">
        <MenuItem icon={CreditCard} text="Personal Details" target='personal'/>
        <MenuItem icon={Building} text="Your Orders" target='orders'/>
        <MenuItem icon={Clock} text="Delivery Addresses" target='address'/>
        <MenuItem icon={FileText} text="Uploaded Documents" target='documents'/>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="bg-white p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Security</h3>
      <div className="">
        <MenuItem icon={Lock} text="Change Password" />
        <MenuItem icon={CreditCard} text="Payment Methods" />
        <MenuItem icon={Smartphone} text="Get Support" />
        {/* <ToggleMenuItem icon={Eye} text="Face Id" enabled={faceIdEnabled} onToggle={() => setFaceIdEnabled(!faceIdEnabled)}/> */}
        <ToggleMenuItem icon={EyeOff} text="Hide balances" enabled={hideBalances} onToggle={() => setHideBalances(!hideBalances)}/>
      </div>
    </div>
  );

  const MenuItem = ({ icon: Icon, text, target }) => (
    <div className={`flex items-center p-3 ${tabActive === target && 'bg-sky-600'}`} onClick={() => {setTabActive(target); setFilterActive(!filterActive)}}>
      <Icon className={`w-5 h-5 mr-3 ${tabActive === target ? 'text-white' : 'text-gray-400'}`} />
      <span className={`flex-1 ${tabActive === target ? 'text-white' : 'text-gray-900'}`}>{text}</span>
    </div>
  );

  const ToggleMenuItem = ({ icon: Icon, text, enabled, onToggle }) => (
    <div className="flex items-center p-3">
      <Icon className="w-5 h-5 text-gray-400 mr-3" />
      <span className="text-gray-900 flex-1">{text}</span>
      <button onClick={onToggle} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ enabled ? 'bg-blue-500' : 'bg-gray-200' }`} >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ enabled ? 'translate-x-6' : 'translate-x-1' }`} />
      </button>
    </div>
  );


  // ------------------------------------------------------------------------------------------------------------- USER EDIT

   const [regData, setRegData] = useState({
        Name: '',        
        EncCompanyId: '',
        PartyCode: '0',
        PartyId: '0',
        UserId: '0',
        RegMob1: '',
        Email: '', 
        Address: '',
        UserPassword: '',
        UserType: '',
        Address2: '',
        City: '',
        State: 3,
        StateName: 'West Bengal',
        Pin: '',        
        DOB: '',
        DOBstr: '',
        Age: '',
        AgeMonth: '',
        AgeDay: '',
        IsDOBCalculated: 'N',
        GenderDesc: 'Male',
        Gender: 104,
        Country: 1,
        MemberId: '',

        Aadhaar: "",        // Unused fields.
        Salutation: "",
        Qualification: "",
        SpecialistId: '',
        AnniversaryDate: "",
        AnniversaryDatestr: "",
        compName: "",
        compAddress: "",
        compState: "",
        compPin: "",
        compPhone1: "",
        compPhone2: "",
        compMail: "",

        BusinessType: '',        // for businessType.
        ContactPerson: '',
        RegMob2: '',
        GstIn: '',
        LicenceNo: '',
        DL_Number2: '',
        TradeLicense: '',
        UserRegTypeId: '',
    });
    const [statesList, setStatesList] = useState([{Description: 'West Bengal', CodeId: 3}]); 
    const stateSelectRef = useRef();
    const genderSelectRef = useRef();
    const [stateSelectOpen, setStateSelectOpen] = useState(false);
    const [genderSelectOpen, setGenderSelectOpen] = useState(false);
    const [tabActive, setTabActive] = useState('personal');
    const [loginError, setLoginError] = useState({status: false, message: ''});
    const [genderData, genderDataLoading, genderDataError] = useFetch(`${BASE_URL}/api/Values/Get`, compCode);

    useEffect(() => {
        const onBodyClick = (event) => {
            if (stateSelectRef.current && stateSelectRef.current.contains(event.target)) return;                         
            setStateSelectOpen(false); 
            if (genderSelectRef.current && genderSelectRef.current.contains(event.target)) return;                          
            setGenderSelectOpen(false);                                                                                       
        }
        document.body.addEventListener('click', onBodyClick, { capture: true });                                                
        return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                                
    }, [])

    let activeState = statesList.filter(i => i.CodeId === regData.State)[0]?.Description; 

    useEffect(() => {
        const getStates = async () => {
            loaderAction(true);
            const res = await axios.get(`${BASE_URL}/api/Values/Get?Id=1`);
            loaderAction(false);
            let states = res.data.map(i => ({Description: i.Description, CodeId: i.CodeId}));
            setStatesList(states);
        }
        getStates();
    },[loaderAction])

    useEffect(() => {
        setRegData((preVlaues) => ({...preVlaues, EncCompanyId: compCode}));
    },[compCode])

    useEffect(() => {
        if (isLoggedIn) {
            setRegData(pre => ({
                ...pre,
                Name: userInfo.Name, 
                // EncCompanyId: userInfo.EncCompanyId,
                PartyCode: userInfo.PartyCode,
                PartyId: userInfo.PartyId,
                UserId: userInfo.UserId,
                RegMob1: userInfo.RegMob1,
                Email: userInfo.Email,
                Address: userInfo.Address,
                UserPassword: userInfo.UserPassword,
                UserType: userInfo.UserType,
                Address2: userInfo.Address2,
                City: userInfo.City,
                State: userInfo.State,
                StateName: userInfo.StateName,
                Pin: userInfo.Pin,
                // DOB: new Date(userInfo.DOB).toLocaleDateString('en-CA'),
                DOB: new Date(userInfo.DOB).toLocaleDateString('en-TT'),
                DOBstr: new Date(userInfo.DOB).toLocaleDateString('en-TT'),
                Age: userInfo.Age,
                AgeMonth: userInfo.AgeMonth,
                AgeDay: userInfo.AgeDay,
                IsDOBCalculated: userInfo.IsDOBCalculated,
                GenderDesc: userInfo.GenderDesc,
                Gender: userInfo.Gender,
                Country: userInfo.Country,
                MemberId: userInfo.MemberId,

                BusinessType: userInfo.BusinessType,        // for businessType.
                ContactPerson: userInfo.ContactPerson,
                RegMob2: userInfo.RegMob2,
                GstIn: userInfo.GstIn,
                LicenceNo: userInfo.LicenceNo,
                DL_Number2: userInfo.DL_Number2,
                TradeLicense: userInfo.TradeLicense,
                UserRegTypeId: userInfo.UserRegTypeId,
            }))
        }
    }, [isLoggedIn, userInfo])

    const handleRegForm = (e) => {
        const { name, value} = e.target;
        setRegData({...regData, [name]: value})
    }    

    const handleRegisterFormSubmit = async (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            if (regData.RegMob1.length < 10) return alert('please enter a valid phone number.');
            if (regData.UserPassword.length < 4) return alert('Minimum length for password is 4.');
            
            let status = await makeRegisterationRequest(regData);
            if (status) {
                let loginStatus = await refreshUserInfo(regData);
                if (loginStatus) {
                    loginStatusAction(true);
                    modalAction('EDIT_USER_MODAL', false);
                    stringToast("Successfully updated your Profile.", 'success');
                } else {
                    alert('We could not log you in, Please log in again manually and try again.');
                }
            } 
        } else {
            alert('Please Login first to Edit your profile.');
        }
    }  

    const makeRegisterationRequest = async (params) => {
        if (!params.UserType) return alert('Something went wrong. Please try again later. No Usertype.');
        try {
            loaderAction(true);
            const res = await axios.post(`${BASE_URL}/api/UserReg/Post`, params);
            loaderAction(false);
            if (res.data[1].length > 3) { 
                return true;
            }      
        } catch (err) {
            console.log(err);
            return false;
        }
        return false;
    } 
    
    const refreshUserInfo = async (params) => {
        try {
            loaderAction(true);
            const res = await axios.get(`${BASE_URL}/api/UserAuth/Get?UN=${params.RegMob1}&UP=${params.UserPassword}&CID=${compCode}`);
            loaderAction(false);
            if (res.data.UserId === 0) {
              return false;
            } else {
              userInfoAction(res.data);
              return true;
            }
        } catch (err) {
            alert(err)
        }
    }

    const handleDate = (props) => {
        const { Age, AgeMonth, AgeDay, currField, currValue }  = props;
    
        if (currField === 'Age') {
          if (currValue !== '' && AgeDay !== '' && AgeMonth !== '') {
            const calculatedDOB = createDate(AgeDay, AgeMonth, currValue);
            setRegData(pre => ({...pre, DOB: calculatedDOB, DOBstr: calculatedDOB, IsDOBCalculated: 'Y'}));
          }
        } else if (currField === 'AgeDay') {
          if (Age !== '' && currValue !== '' && AgeMonth !== '') {
            const calculatedDOB = createDate(currValue, AgeMonth, Age);
            setRegData(pre => ({...pre, DOB: calculatedDOB, DOBstr: calculatedDOB, IsDOBCalculated: 'Y'}));
          }
        } else if (currField === 'AgeMonth') {
          if (Age !== '' && AgeDay !== '' && currValue !== '') {
            const calculatedDOB = createDate(AgeDay, currValue, Age);
            setRegData(pre => ({...pre, DOB: calculatedDOB, DOBstr: calculatedDOB, IsDOBCalculated: 'Y'}));
          }
        }
    }
    
    const handleNumberInputsWithDate = (e, setStateName) => {
        const {name, value} = e.target;
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
          setStateName(preValue => {
             return {...preValue, [name]: value};
          });
          let currValues = { Age: regData.Age, AgeMonth: regData.AgeMonth, AgeDay: regData.AgeDay, currField: name, currValue: value };
          handleDate(currValues);
        }
    }

    const calculateDuration = (date) => {
        setRegData(pre => ({ 
            ...pre, IsDOBCalculated: 'N', 
            Age: getDuration(date).years, 
            AgeMonth: getDuration(date).months, 
            AgeDay: getDuration(date).days, 
            DOB: date,
            DOBstr: date
        }))
    }
  // ------------------------------------------------------------------------------------------------------------- USER EDIT
  const [filterActive, setFilterActive] = useState(false);  

  return (
    <div className='flex flex-col lg:flex-row bg-white'>
        <div className="bg-gray-50 text-nowrap w-100 lg:max-w-[18em]">
            {/* Header */}
            <div className="bg-white px-4 pb-3 pt-6 flex items-center border-b border-gray-200">
                <ChevronLeft className="w-6 h-6 text-blue-500" />
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium text-sm">AK</span>
                </div>
                <div className="flex-1">
                    <h1 className="text-lg font-semibold text-gray-900">{userInfo.Name}</h1>
                    <p className="text-sm text-gray-500 mb-0">Personal account</p>
                </div>
            </div>

            {/* Content */}
            <div className="py-t space-y-4">
                <ProfileSection />
                <SecuritySection />
            </div>

            {/* Bottom Indicator */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-1 bg-black rounded-full"></div>
            </div>
        </div>

        <div className={`bg-white p-8 bg-slate-50 flex-1 hide-on-mobile ${filterActive ? `show` : ''}`}>
          {/* absolute inset-0 z-[1111] overflow-auto lg:relative */}
          {(() => {
            if (tabActive === 'personal') {
              return (
                <div>
                  <h1 className="!text-2xl font-semibold text-gray-900 mb-8 border-b border-gray-200 pb-3 mb-4" onClick={() => setFilterActive(!filterActive)}>
                    <ChevronLeft className="align-sub w-5 h-5 text-blue-500" /> Contact Details
                  </h1>
                  <form className="space-y-4" onSubmit={handleRegisterFormSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm !font-medium text-gray-800 mb-2"> Name <span className="required">*</span></label>
                              <input type="text" name='Name' value={regData.Name} required onChange={handleRegForm}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                          </div>
                          <div>
                              <label className="block text-sm !font-medium text-gray-800 mb-2">Phone Number <span className="required">*</span></label>
                              <input type="text" name='RegMob1' readOnly={isLoggedIn ? true : false} value={regData.RegMob1} required onChange={(e) => handleNumberInputs(e, setRegData)} maxLength='10' className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm !font-medium text-gray-800 mb-2"> Address <span className="required">*</span></label>
                              <input type="text" name='Address' value={regData.Address} required onChange={handleRegForm}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                          </div>
                          <div>
                              <label className="block text-sm !font-medium text-gray-800 mb-2"> Apartment (optional)</label>
                              <input type="text" name='Address2' value={regData.Address2} onChange={handleRegForm}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm !font-medium text-gray-800 mb-2">City <span className="required">*</span></label>
                            <input type="text" name='City' value={regData.City} required onChange={handleRegForm} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm !font-medium text-gray-800 mb-2">State <span className="required">*</span></label>
                            <div className={`nice-select select-filter-category w-100 ${stateSelectOpen && 'open'}`} tabIndex="0" onClick={() => setStateSelectOpen(!stateSelectOpen)}>
                              <span className="current">{activeState}</span>
                              <ul className="list" style={{maxHeight: '14em', overflow: 'auto'}}>
                                  {statesList.map((item, index) => <li key={index} onClick={() => {setRegData({...regData, StateName: item.Description, State: item.CodeId}); setStateSelectOpen(false)}} className={`option ${regData.State === item.CodeId && 'selected focus'}`}>{item.Description}</li>)}
                              </ul>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm !font-medium text-gray-800 mb-2"> Pin Code <span className="required">*</span></label>
                            <input type="text" name='Pin' value={regData.Pin} required onChange={(e) => handleNumberInputs(e, setRegData)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm !font-medium text-gray-800 mb-2">Email</label>
                              <input type="email" name='Email' value={regData.Email} onChange={handleRegForm} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                          </div>
                          <div>
                              <label className="block text-sm !font-medium text-gray-800 mb-2"> Password <span className="required">*</span></label>
                              <input type="password" name='UserPassword' value={regData.UserPassword} required onChange={handleRegForm} autoComplete="false"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                          </div>                    
                      </div>
                      {loginError.status && <p className="text-danger">{loginError.message}</p>}
                      <div className="text-end pt-3">
                          <button type='submit' className="bg-sky-600 hover:bg-sky-400 text-white font-medium px-8 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none" >Save Changes</button>
                      </div>
                  </form>
                </div>
              )
            } else if (tabActive === 'address') {
              return (
                <div>
                  <h1 className="!text-2xl font-semibold text-gray-900 mb-8 border-b border-gray-200 pb-3 mb-4" onClick={() => setFilterActive(!filterActive)}>
                    <ChevronLeft className="align-sub w-5 h-5 text-blue-500" /> Your Addresses
                  </h1>
                  <form className="space-y-4" onSubmit={handleRegisterFormSubmit}>
                      <div>
                          <label className="block text-sm !font-medium text-gray-800 mb-2"> Address Line 1 <span className="required">*</span></label>
                          <textarea rows={3} type="text" name='Name' value={regData.Address}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                          <button type='submit' className="ms-auto block mt-2 bg-sky-600 hover:bg-sky-400 text-white font-medium px-8 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none" >Save Changes</button>
                      </div>
                      <div>
                          <label className="block text-sm !font-medium text-gray-800 mb-2"> Address Line 2 <span className="required">*</span></label>
                          <textarea rows={3} type="text" name='Address' value={regData.Address}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                          <button type='submit' className="ms-auto block mt-2 bg-sky-600 hover:bg-sky-400 text-white font-medium px-8 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none" >Save Changes</button>
                      </div>
                      {/* {loginError.status && <p className="text-danger">{loginError.message}</p>} */}
                  </form>
                </div>
              )
            }
          })()}
        </div>
    </div>

  );
}

const mapStateToLoginModal = (state) => {
    return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo };
}

export default connect(mapStateToLoginModal, {modalAction, loginStatusAction, loaderAction, userInfoAction})(UserProfile);