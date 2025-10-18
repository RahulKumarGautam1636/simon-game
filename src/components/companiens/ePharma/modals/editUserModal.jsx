import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { modalAction, loginStatusAction, loaderAction, userInfoAction } from "../../../../actions";
import axios from "axios";
import { JQDatePicker, createDate, getDuration, handleNumberInputs, stringToast } from "../utilities";
import { BASE_URL } from "../../../../constants";
import { useFetch } from "../../default/utilities";


const EditUserModal = ({modalAction, isLoggedIn, loginStatusAction, compCode, loaderAction, userInfoAction, userInfo}) => {

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
    const [tabActive, setTabActive] = useState('register');
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

                UserLevelSeq: userInfo.UserLevelSeq,
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
            const body = { UserName: params.RegMob1, UserPassword: params.UserPassword, EncCompanyId: compCode };
            // const res = await axios.get(`${BASE_URL}/api/UserAuth/Get?UN=${params.RegMob1}&UP=${params.UserPassword}&CID=${compCode}`);
            const res = await axios.post(`${BASE_URL}/api/UserAuth/CheckCompLogin`, body);
            loaderAction(false);
            if (res.data[0].UserId === 0) {
              return false;
            } else {
              userInfoAction(res.data[0]);
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

    return (
        <div className='d-flex justify-content-center'>
            <div id='loginForm' className="flex-column gap-0" style={{minHeight: 'unset'}}>
                <i className='bx bx-x-circle close-custom-modal' onClick={() => modalAction('EDIT_USER_MODAL', false)}></i>
                <div className='top d-flex justify-content-around align-items-center m-0' style={{minHeight: '10em'}}>
                    <h5 className={`text-start`}>EDIT YOUR PROFILE</h5>
                </div>
                <div className='bottom'>
                    <div className="tab-content overflow-hidden pt-2">
                        <div id="tabFade-pane-2" className={`tab-pane fade ${tabActive === 'register' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-2">
                            <form onSubmit={handleRegisterFormSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-group mb-4">
                                            <input type="text" name='Name' value={regData.Name} required onChange={handleRegForm}/>
                                            <label className={`${regData.Name && 'active'}`}>Your Name <span className="required">*</span></label>
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="input-group mb-4">
                                            <JQDatePicker id={'user_DOB'} setState={setRegData} handler={calculateDuration} curValue={regData.DOB} name={'DOB'} />
                                            <label className={`${(regData.DOB && regData.DOB !== '0') && 'active'}`}>DOB <span className="required">*</span></label>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="input-group mb-4">
                                            {/* <input type="text" name='Age' value={regData.Age} required onChange={handleRegForm}/> */}
                                            <input name="Age" value={regData.Age} onChange={(e) => handleNumberInputsWithDate(e, setRegData)} required tabIndex={1} type='text' maxLength={2} id="txtPtAge" />
                                            <label className={`${regData.Age !== '' && 'active'}`}>Years</label>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="input-group mb-4">
                                            {/* <input type="text" name='AgeMonth' value={regData.AgeMonth} required onChange={handleRegForm}/> */}
                                            <input name="AgeMonth" value={regData.AgeMonth} onChange={(e) => handleNumberInputsWithDate(e, setRegData)} tabIndex={1} type='text' maxLength={2} id="txtPtAgeMonth"/>
                                            <label className={`${regData.AgeMonth !== '' && 'active'}`}>Months</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="input-group mb-4">
                                            {/* <input type="text" name='AgeDay' value={regData.AgeDay} required onChange={handleRegForm}/> */}
                                            <input name="AgeDay" value={regData.AgeDay} onChange={(e) => handleNumberInputsWithDate(e, setRegData)} tabIndex={1} type='text' maxLength={2} id="txtPtAgeDay"/>
                                            <label className={`${regData.AgeDay !== '' && 'active'}`}>Days</label>
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="input-group mb-4">
                                            <input type="text" name='Address' value={regData.Address} required onChange={handleRegForm}/>
                                            <label className={`${regData.Address && 'active'}`}>Address <span className="required">*</span></label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group mb-4">
                                            <input type="text" name='Address2' value={regData.Address2} onChange={handleRegForm}/>
                                            <label className={`${regData.Address2 && 'active'}`}>Apartment (optional)</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group mb-4">
                                            <input type="text" name='City' value={regData.City} required onChange={handleRegForm}/>
                                            <label className={`${regData.City && 'active'}`}>City <span className="required">*</span></label>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="input-group mb-4">
                                            <input type="text" name='Country' value='India' readOnly={true} required onChange={() => {}}/>
                                            <label className="active">Country <span className="required">*</span></label>
                                        </div>
                                    </div> */}
                                    <div className="col-6">
                                        <div className="input-group mb-4 justify-content-between flex-column" ref={stateSelectRef}>
                                            <label className="position-relative">State <span className="required">*</span></label>
                                            <div className={`nice-select select-filter-category w-100 ${stateSelectOpen && 'open'}`} tabIndex="0" onClick={() => setStateSelectOpen(!stateSelectOpen)}>
                                                <span className="current">{activeState}</span>
                                                <ul className="list" style={{maxHeight: '14em', overflow: 'auto'}}>
                                                    {statesList.map((item, index) => <li key={index} onClick={() => {setRegData({...regData, StateName: item.Description, State: item.CodeId}); setStateSelectOpen(false)}} className={`option ${regData.State === item.CodeId && 'selected focus'}`}>{item.Description}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group mb-4 justify-content-between flex-column" ref={genderSelectRef}>
                                            <label className="position-relative">Gender <span className="required">*</span></label>
                                            <div className={`nice-select select-filter-category w-100 ${genderSelectOpen && 'open'}`} tabIndex="0" onClick={() => setGenderSelectOpen(!genderSelectOpen)}>
                                                <span className="current">{regData.GenderDesc}</span>
                                                <ul className="list">
                                                    {genderData.map((item, index) => <li key={index} onClick={() => {setRegData({...regData, GenderDesc: item.Description, Gender: item.CodeId}); setGenderSelectOpen(false)}} className={`option ${regData.State === item.CodeId && 'selected focus'}`}>{item.Description}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="input-group mb-4">
                                            <input type="text" name='Pin' value={regData.Pin} required onChange={(e) => handleNumberInputs(e, setRegData)} maxLength='6'/>
                                            <label className={`${regData.Pin && 'active'}`}>Pincode / Zip <span className="required">*</span></label>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="input-group mb-4">
                                            <input type="email" name='Email' value={regData.Email} onChange={handleRegForm}/>
                                            <label className={`${regData.Email && 'active'}`}>Email Address</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group mb-4">
                                            <input type="text" name='RegMob1' readOnly={isLoggedIn ? true : false} value={regData.RegMob1} required onChange={(e) => handleNumberInputs(e, setRegData)} maxLength='10'/>
                                            <label className={`${regData.RegMob1 && 'active'}`}>Phone  <span className="required">*</span></label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group mb-4 create-account">
                                            <input type="password" name='UserPassword' value={regData.UserPassword} required onChange={handleRegForm} autoComplete="false"/>
                                            <label className={`${regData.UserPassword && 'active'}`}>Password  <span className="required">*</span></label>
                                        </div>
                                    </div>
                                </div>
                                {loginError.status && <p className="text-danger">{loginError.message}</p>}
                                <button className='add_an_item_btn loginBtn' type="submit">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToEditUserModal = (state) => {
    return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo };
}

export default connect(mapStateToEditUserModal, {modalAction, loginStatusAction, loaderAction, userInfoAction})(EditUserModal);






