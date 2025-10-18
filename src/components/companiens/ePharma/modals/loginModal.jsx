import { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { modalAction, loginStatusAction, loaderAction, userInfoAction, globalDataAction } from "../../../../actions";
import axios from "axios";
import { ConnectedBusinessTypeSelector, InactiveWarningCard, JQDatePicker, createDate, getBase64, getDuration, handleNumberInputs, getBase64String, stringToast } from "../utilities";
import { BASE_URL, initReg, SRC_URL, TAKE_HOME_ID, userRegType, XYZ_ID } from "../../../../constants";
import { encrypt, useFetch, validRegType } from "../../default/utilities";
import { toast } from "react-toastify";
import Timer, { userLevel, uType } from "../../../utils/utils";


const LoginModal = ({modalAction, isLoggedIn, loginStatusAction, compCode, loaderAction, userInfoAction, userInfo, vType, modals, compInfo, globalData, globalDataAction}) => {
    const redirectTo = modals?.LOGIN_MODAL?.data?.redirect;
    console.log(redirectTo);    
    const businessType = globalData.userRegType.CodeValue === 'Retailer' ? 'B2B' : 'B2C';
    const userRegTypeId = globalData.userRegType.CodeId;
    const b2bMode = globalData.userRegType.CodeValue === 'Retailer';
    const hideReg = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
    const [loginData, setLoginData] = useState({phone: '', password: ''});
    const [regData, setRegData] = useState({
        ...initReg,
        DOBstr: '01/10/1900',              // override DOBstr
        EnclosedDocObj: {
            EnclosedDocList: [
                {
                    EnclosedId: '0',
                    AppId: '0',
                    EmpId: '0',
                    AppType: 'Registration',
                    EncloserType: '',
                    EncloserTypeDesc: '',
                    FileName: '',
                    FilePath: '',
                    Description: '',       
                    EnclosedDate: '',
                    EnclosedTime: '',
                    EnclosedDocList: '',
                    EnclosedDeleteDocList: '',
                    Remarks: '',            
                    FileExtension: '',     
                    filesToUpload: ''
                }
            ]
        },
    });

    const [docs, setDocs] = useState({
        GSTIN: {docName: 'GSTIN', src: '', fileName: ''},
        Form20: {docName: 'Form20', src: '', fileName: ''},
        Form21: {docName: 'Form21', src: '', fileName: ''},
        DlRenewal: {docName: 'DlRenewal', src: '', fileName: ''},
        TLicense: {docName: 'TLicense', src: '', fileName: ''},
    });

    const [statesList, setStatesList] = useState([{Description: 'West Bengal', CodeId: 3}]); 
    const stateSelectRef = useRef();
    const genderSelectRef = useRef();
    const [stateSelectOpen, setStateSelectOpen] = useState(false);
    const [genderSelectOpen, setGenderSelectOpen] = useState(false);
    const [tabActive, setTabActive] = useState('login');
    const [otp, setOTP] = useState({isOpen: false, recievedValue: 'null', enteredValue: '', sent: false, verified: false, read_only: false});    // verified: true
    const [loginError, setLoginError] = useState({status: false, message: ''});
    const genderData = useFetch(`${BASE_URL}/api/Values/Get`, compCode)[0];
    const history = useHistory();

  useEffect(() => {
    const onBodyClick = (event) => {
        if (stateSelectRef.current && stateSelectRef.current.contains(event.target)) return;                          // Return if click is triggered from search field form or it's inner elements.
        setStateSelectOpen(false); 
        if (genderSelectRef.current && genderSelectRef.current.contains(event.target)) return;                          // Return if click is triggered from search field form or it's inner elements.
        setGenderSelectOpen(false);                                                                                       // close select element only if click is triggered rest of the elements (outer body).
    }
    document.body.addEventListener('click', onBodyClick, { capture: true });                                                // Add eventlistener on component mount.
    return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                                // Remove Eventlistener on component unmount.
  }, [])

  let activeState = statesList.filter(i => i.CodeId === regData.State)[0]?.Description; 
//   let activeGender = genders.filter(i => i.CodeId === regData.State)[0]?.Description; 


    useEffect(() => {
        let usertype = uType.CUSTOMER;
        if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
            usertype = uType.SALESPOINT;
        }
        setRegData((preVlaues) => ({...preVlaues, EncCompanyId: compCode, BusinessType: businessType, UserRegTypeId: userRegTypeId, UserType: usertype.title, UserLevelSeq: usertype.level}));
    },[compCode, vType, businessType, userRegTypeId])

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
        if (isLoggedIn) {
            setRegData(pre => ({
                ...pre,
                Name: userInfo.Name, 
                EncCompanyId: userInfo.EncCompanyId,
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
            }))
        }
    }, [isLoggedIn, userInfo])

    const handleLoginForm = (e) => {
        const { name, value} = e.target;
        setLoginData({...loginData, [name]: value})
    }

    const handleRegForm = (e) => {
        const { name, value} = e.target;
        setRegData(pre => ({...pre, [name]: value}));
    }    
    

    const handleRegisterFormSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn && otp.verified) {
            if (regData.RegMob1.length < 10) return alert('phone number is invalid, please try again.');
            if (regData.UserPassword.length < 4) return alert('Minimum length for password is 4.');
            let status = await makeRegisterationRequest({ ...regData });
            if (status) {
                let loginStatus = await refreshUserInfo(regData);
                if (loginStatus) {
                    loginStatusAction(true);
                    modalAction('LOGIN_MODAL', false);
                    modalAction('ALERT_MODAL', true, 'register');
                }
            } 
        }
    } 
    
    const handleNext = async () => {
        if (!isLoggedIn && !otp.sent) {
            if (regData.RegMob1.length < 10) return alert('please enter a valid phone number.');
            const userExist = await checkExistingUser();
            if (userExist) return;
            console.log('sending OTP');
            const receivedOtp = await makeOtpRequest();
            setOTP({...otp, isOpen: true, sent: true, recievedValue: receivedOtp});
        } else if (otp.sent) {
            if (compCode !== XYZ_ID) {
                if (otp.recievedValue !== otp.enteredValue) return alert('Wrong OTP.');
            }
            console.log('otp matched');
            setOTP({...otp, isOpen: false, verified: true, read_only: true});
            setAllFields(true);
        }
    }

    const prepareDocs = async (filesList) => {
        let files = [];
        for (const i of filesList) {
            let file = await getBase64String(i.src);
            let obj = {
                EnclosedId: '0',
                AppId: '0',
                EmpId: '0',
                AppType: 'Registration',
                EncloserType: '',
                EncloserTypeDesc: '',
                FileName: '',
                FilePath: '',
                Description: i.docName,                                    
                EnclosedDate: '',
                EnclosedTime: '',
                EnclosedDocList: '',
                EnclosedDeleteDocList: '',
                Remarks: i.fileName,                                   
                FileExtension: '.' + (i.fileName).split('.').pop(),    
                filesToUpload: file
            }
            files.push(obj);
        }
        return files;
    }

    const makeRegisterationRequest = async (params) => {
        let body = { ...params };
        if (body.BusinessType === 'B2B') {
            body.UserType = uType.RETAILER.title;
            const isValid = window.ValidateGSTIN('GSTIN');
            if (!isValid) return alert('Please enter a valid GSTIN number.');
            let attachments = Object.values(docs);
            const files = await prepareDocs(attachments);
            body.EnclosedDocObj.EnclosedDocList = files;
        }
        try {
            loaderAction(true);
            const res = await axios.post(`${BASE_URL}/api/UserReg/Post`, body);
            loaderAction(false);
            if (res.data[1].length > 3) { 
                return true;
            } else {
                alert('Something Went wrong, Please try again later.');
                return false;
            }      
        } catch (err) {
            console.log(err);
            return false;
        }
    } 
    
    const refreshUserInfo = async (params) => {
        try {
            loaderAction(true);
            const body = { UserName: params.RegMob1, UserPassword: params.UserPassword, EncCompanyId: compCode };
            const res = await axios.post(`${BASE_URL}/api/UserAuth/CheckCompLogin`, body);
            // const res = await axios.get(`${BASE_URL}/api/UserAuth/Get?UN=${params.RegMob1}&UP=${encodeURIComponent(params.UserPassword)}&CID=${compCode}`);
            const data = res.data[0];
            loaderAction(false);
            if (data.Remarks === 'INACTIVE') {
                toast(<InactiveWarningCard />, { position: "top-center", autoClose: false, closeButton: false, className: 'product-toast' });
                modalAction('LOGIN_MODAL', false);
                return false;
            } else if (data.UserId) {
                userInfoAction(data);
                handleLoginSuccess(data);
                if (redirectTo) {
                    handleRedirect({ phone: params.RegMob1, password: params.UserPassword, compCode: compCode });
                    return true;
                }
                // localStorage.setItem("userLoginData", encrypt({ phone: params.RegMob1, password: params.UserPassword, compCode: compCode }));
                return true;
            } else {
                alert('We could not log you in, Please log in again manually.');
                return false;
            }
        } catch (err) {
            alert(err)
        }
    }

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        if (loginData.phone.length < 10) return alert('Please enter a valid phone number.');
        if (loginData.phone.length < 4) return alert('Minimum length for password is 4.');
        makeLoginRequest();
    }

    const makeLoginRequest = async () => {
        const body = { UserName: loginData.phone, UserPassword: loginData.password, EncCompanyId: compCode };
        loaderAction(true);
        // const res = await axios.get(`${BASE_URL}/api/UserAuth/Get?UN=${loginData.phone}&UP=${encodeURIComponent(loginData.password)}&CID=${compCode}`);
        const res = await axios.post(`${BASE_URL}/api/UserAuth/CheckCompLogin`, body);
        loaderAction(false);
        const data = res.data[0];

        // let appBusinessType = globalData.businessType.CodeValue;     
        // if (res.data.BusinessType !== appBusinessType) return alert('You are not Allowed to log in.');       // BLOCK LOGIN IF MISMATCH FOUND  

        // if (!validRegType(res.data.UserRegTypeId)) return;

        if (data.Remarks === 'INVALID') {
          setLoginError({status: true, message: 'The username or password is incorrect.'});
        } else if (!validRegType(data.UserRegTypeId)) {
            return;
        } else if (data.Remarks === 'NOTINCOMPANY') {
            setRegData(pre => ({
                ...pre,
                Name: data.Name,
                // EncCompanyId: data.EncCompanyId,
                PartyCode: '',
                PartyId: '',
                UserId: data.UserId,
                RegMob1: data.RegMob1,
                Email: data.Email,
                Address: data.Address,
                // UserPassword: data.UserPassword,
                // UserType: data.UserType,
                Address2: data.Address2,
                City: data.City,
                State: data.State,
                StateName: data.StateName,
                Pin: data.Pin,
                DOB: new Date(data.DOB).toLocaleDateString('en-TT'),
                DOBstr: new Date(data.DOB).toLocaleDateString('en-TT'),
                Age: data.Age,
                AgeMonth: data.AgeMonth,
                AgeDay: data.AgeDay,
                IsDOBCalculated: data.IsDOBCalculated || 'N',
                GenderDesc: data.GenderDesc,
                Gender: data.Gender,
                Country: data.Country,
                MemberId: 0,
                Aadhaar: "",
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
                RegMob2: data.RegMob2,            // for Business type.
                GstIn: '',  
                LicenceNo: '',
                ContactPerson: '',
                // BusinessType: data.BusinessType,
                // UserLevelSeq: data.UserLevelSeq
            }))
            setOTP(pre => ({ ...pre, verified: true})); 
            setAllFields(true);
            setTabActive('register');
            setLoginError({status: false, message: ''});
        } else if (data.Remarks === 'INACTIVE') {
            toast(<InactiveWarningCard />, { position: "top-center", autoClose: false, closeButton: false, className: 'product-toast' });
            modalAction('LOGIN_MODAL', false);
        } else if (!data.UserId || !data.UserType) {
            return alert("Something Went wrong, We can't log you in.");
        } else {
            loginStatusAction(true);
            modalAction('LOGIN_MODAL', false);
            userInfoAction({ ...data, UserCompList: data?.UserCompList[0]});
            handleLoginSuccess(data);
            modalAction('ALERT_MODAL', true, 'login');
            if (redirectTo) {
                handleRedirect({ phone: data.RegMob1, password: data.UserPassword, compCode: compCode });
                return;
            }
            localStorage.setItem("userLoginData", encrypt({ phone: loginData.phone, password: data.UserPassword, compCode: compCode }));
        }
    }

    const handleRedirect = (user) => {  
        let slugKey = encrypt({ phone: user.phone, password: user.password, compCode: user.compCode })
        console.log(slugKey);
        window.location.href = redirectTo + '?slugKey=' + slugKey;
    }

    const handleLoginSuccess = (user) => {
        // if (user.BusinessType === 'B2B') return history.push('/checkout');
    }

    const checkExistingUser = async () => {
        if (regData.RegMob1.length > 9) {
          loaderAction(true);
          const res = await axios.get(`${BASE_URL}/api/UserReg/Get?UN=${regData.RegMob1}`);
          loaderAction(false);
          if (res.data === 'Y') {
            setLoginError({status: true, message: 'This number is already registered.'});
            setLoginData(preValue => {
              return { ...preValue, phone: regData.RegMob1 }
            })
            setRegData(preValue => {
              return { ...preValue, RegMob1: '' }
            })
            setTabActive('login');
            return true;
          } else {
            setLoginError({status: false, message: ''});
            return false;
          }
        }
    }

    const makeOtpRequest = async () => {
        loaderAction(true);
        const res = await axios.get(`${BASE_URL}/api/UserReg/Get?Id=0&name=Subscriber&mob=${regData.RegMob1}`);
        loaderAction(false);
        if (res.status === 200) {
          return res.data;
        }
        alert('An Error Occured, Try again later.');
        return 'asdfasdasdf';
    }
    
    // const makeOtpRequest = () => '0';  

    const handleDate = (props) => {
        const { Age, AgeMonth, AgeDay, currField, currValue }  = props;
        let calculatedDOB;
        if (currField === 'Age') {
            calculatedDOB = createDate(AgeDay || 0, AgeMonth || 0, currValue);
        } else if (currField === 'AgeDay') {
            calculatedDOB = createDate(currValue, AgeMonth || 0, Age || 0);
        } else if (currField === 'AgeMonth') {
            calculatedDOB = createDate(AgeDay || 0, currValue, Age || 0);
        }
        setRegData(pre => ({...pre, DOB: calculatedDOB, DOBstr: calculatedDOB, IsDOBCalculated: 'Y'}));
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
            DOBstr: date,
        }))
    }

    const [allFields, setAllFields] = useState(false);       

    const resendOTP = async () => {
        const receivedOtp = await makeOtpRequest();
        setOTP({...otp, recievedValue: receivedOtp});
    }

// --------------------- Forgot Password -----------------------------------------------------------------------

    const [forgotPasswordModal, setForgotPasswordModal] = useState({ isOpen: false, passwordRecoveryNumber: '', error: '' });

    const handleForgotPasswordForm = (e) => {
        e.preventDefault();
        sendPassword();
    }

    const sendPassword = async () => {
        try {
            loaderAction(true);
            const res = await axios.get(`${BASE_URL}/api/UserAuth/Get?id=0&UN=${forgotPasswordModal.passwordRecoveryNumber}&CID=${compCode}&Type=FP`, {});
            loaderAction(false);
            if (res.data === 'Y') {
                setForgotPasswordModal(pre => ({ ...pre, error: 'Your Password has been sent to your registered mobile number. please check !' }));
            } else {
                setForgotPasswordModal(pre => ({ ...pre, error: 'This number is not Registered.' }));
            }            
        } catch (error) {
            loaderAction(false);
            alert('Something went wrong, Please try again later!');
        }
    }

    // const compBusinessTypes = useFetch(`${BASE_URL}/api/Values/GetMstAllMaster?CID=${compInfo.CompanyId}&type=BUSINESSTYPE&P1=0`, compInfo.CompanyId)[0];

    const handleAttachments = (event) => {
        let name = event.target.name;
        let target = event.target.files[0];
        var url = URL.createObjectURL(target);
        setDocs(pre => ({...pre, [name]: { docName: name, src: url, fileName: target.name }}));
    }

    return (
        <div className='d-flex justify-content-center'>
            <style>{b2bMode && `
                .login-modal .bg-overlay {
                    background: #d3d3d3;
                }
            `}</style>
            <div id='loginForm'>
                <div className='main-logo-box' style={{flex: 1, display: 'grid', placeItems: 'center'}}>
                    {compCode === XYZ_ID ? 
                        <img src={`/img/logo/XYZ-LOGO.png`} style={{maxWidth: '80%', maxHeight: '24rem'}} />
                        : 
                        <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} style={{maxWidth: '80%', maxHeight: '24rem'}} />
                    }
                    
                </div>
                <div className="flex-1 d-flex flex-column">
                    {b2bMode ? '' : <i className='bx bx-x-circle close-custom-modal' onClick={() => modalAction('LOGIN_MODAL', false)}></i>}
                    <div className='top d-flex justify-content-around align-items-center'>
                        {tabActive !== 'forgotPassword' ?
                            <>
                                <label htmlFor="mode" role="button" style={{fontSize: '1em'}}><h5 className={`${tabActive === 'register' && 'bg-white text-secondary'}`}>Login</h5></label>
                                <label className="toggle-switch">
                                    <input id='mode' type="checkbox" checked={tabActive === 'login' ? false : true} onChange={() => {setTabActive(tabActive === 'login' ? 'register' : 'login'); setLoginError({status: false, message: ''})}}/>
                                    <div className="toggle-switch-background">
                                        <div className="toggle-switch-handle"></div>
                                    </div>
                                    <span className="check"></span>
                                </label>
                                <label htmlFor="mode" role="button" style={{fontSize: '1em'}}><h5 className={`${tabActive === 'login' && 'bg-white text-secondary'}`}>REGISTER</h5></label>
                            </>  
                            :
                            <h5 className={``}><i className='bx bxs-lock'></i> FORGOT PASSWORD</h5>
                        }
                    </div>
                    <div className='bottom flex-1 d-flex justify-content-between flex-column'>
                        <div className="tab-content overflow-hidden pt-2">
                            <div id="tabFade-pane-1" className={`tab-pane fade ${tabActive === 'login' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
                                <form onSubmit={handleLoginFormSubmit}>
                                    <div className='input-group mb-30'>
                                        <input type='text' onChange={(e) => handleNumberInputs(e, setLoginData)} required name='phone' value={loginData.phone} autoComplete='true' maxLength={10}/>
                                        <label className={`${loginData.phone && 'active'}`} htmlFor='phone'>Phone Number</label>
                                    </div>
                                    <div className='input-group mb-20'>
                                        <input type='password' onChange={handleLoginForm} required name='password' value={loginData.password} autoComplete='true'/>
                                        <label className={`${loginData.password && 'active'}`} htmlFor='password'>Your Password</label>
                                    </div>
                                    <p className="text-danger" style={{display: loginError.status ? 'block' : 'none'}}>{loginError.message}</p>
                                    <Link to='#' onClick={() => setTabActive('forgotPassword')} className='text-primary'>Forgot Password ?</Link>
                                    <button className='add_an_item_btn loginBtn'>LOGIN</button>
                                </form>
                            </div>

                            <div id="tabFade-pane-3" className={`tab-pane fade ${tabActive === 'forgotPassword' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-3">
                                <form onSubmit={handleForgotPasswordForm}>
                                    <div className='input-group mb-30'>
                                        <input type='text' onChange={(e) => handleNumberInputs(e, setForgotPasswordModal)} value={forgotPasswordModal.passwordRecoveryNumber} required name='passwordRecoveryNumber' autoComplete='true' maxLength={10}/>
                                        <label className={`${forgotPasswordModal.passwordRecoveryNumber && 'active'}`} htmlFor='phone'>Phone Number</label>
                                    </div>
                                    <p className="text-danger" style={{display: forgotPasswordModal.error ? 'block' : 'none'}}>{forgotPasswordModal.error}</p>
                                    <Link to='#' onClick={() => setTabActive('login')} className='text-primary'>Back To Login ?</Link>
                                    <button className='add_an_item_btn loginBtn'>GET OTP</button>
                                </form>
                            </div>

                            <div id="tabFade-pane-2" className={`tab-pane fade ${tabActive === 'register' && 'show active'} ${hideReg && 'opacity-0 invisible pe-none'}`} role="tabpanel" aria-labelledby="tabFade-2">

                                {/* <select className="form-select ms-auto text-primary" value={businessType.CodeId} onChange={(e) => handleBusinessType(e)} style={{maxWidth: 'fit-content', fontSize: '1em', paddingRight: '2.6em'}}>
                                    {businessTypes.map(i => (<option key={i.CodeId} value={i.CodeId}>✔&nbsp; {i.Description}</option>))}
                                </select>  */}
                                {/* <ConnectedBusinessTypeSelector typeList={compBusinessTypes} classes={`ms-auto text-primary`} styles={{maxWidth: 'fit-content', fontSize: '1em', paddingRight: '2em'}} /> */}
                                <form onSubmit={handleRegisterFormSubmit}>
                                    {/* <div className='input-group mb-30'>
                                        <input type='text' onChange={handleRegForm} id="RegMob1" name='RegMob1' value={regData.RegMob1} autoComplete='true'/>
                                        <label className={`${regData.RegMob1 && 'active'}`} htmlFor='RegMob1'>Phone Number</label>
                                    </div> */}
                                    {/* <div className='input-group mb-20'>
                                        <input type='password' onChange={handleRegForm} id="UserPassword" name='UserPassword' value={regData.UserPassword} autoComplete='true'/>
                                        <label className={`${regData.UserPassword && 'active'}`} htmlFor='UserPassword'>Choose a Password</label>
                                    </div> */}
                                    {/* {!isLoggedIn && <div className="col-md-12">   
                                        {otp.isOpen && <div id="cbox-info" className="checkout-form-list create-account">
                                            <input placeholder="Enter your OTP.." type="text" name='otp' value={otp.enteredValue} onChange={(e) => setOTP({...otp, enteredValue: e.target.value})}/>
                                        </div>}
                                    </div>} */}
                                    {/* <p className="text-danger" style={{display: loginError.status ? 'block' : 'none'}}>{loginError.message}</p> */}


                                    <div className="row">

                                        <div className="col-12">
                                            <div className="input-group mb-4">
                                                <input type="text" name='RegMob1' readOnly={isLoggedIn || otp.read_only ? true : false} value={regData.RegMob1} required onChange={(e) => handleNumberInputs(e, setRegData)} maxLength='10'/>
                                                <label className={`${regData.RegMob1 && 'active'}`}>Phone Number <span className="required">*</span></label>
                                            </div>
                                        </div>
                                        {otp.isOpen && <div className="col-12">
                                            <div className="input-group create-account">
                                                <input placeholder="Enter your OTP.." type="text" name='otp' value={otp.enteredValue} required onChange={(e) => setOTP({...otp, enteredValue: e.target.value})}/>
                                                {/* <p className="text-primary ms-auto mt-2" role="button" onClick={resendOTP}>Resend OTP.</p> */}
                                                <Timer handleTask={resendOTP} />
                                            </div>
                                        </div>}
                                        {!allFields && <>
                                            <div className="order-button-payment">
                                                <p>We'll send an OTP, please enter it to complete creating your account.</p>
                                            </div>
                                            <div className="col-12">
                                                <button className='add_an_item_btn loginBtn' onClick={handleNext} type="button">NEXT</button>
                                            </div>
                                        </>}

                                        {allFields && 
                                        <div className="col-12">
                                            <div className="row">

                                                <div className="col-6 d-flex align-items-end">
                                                    <div className="input-group mb-4">
                                                        <input type="text" name='Name' value={regData.Name} required onChange={handleRegForm} tabIndex={1} />
                                                        <label className={`${regData.Name && 'active'}`}>{b2bMode ? 'Business Name' : 'Your Name'} <span className="required">*</span></label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="input-group mb-4 justify-content-between flex-column" ref={genderSelectRef}>
                                                        <label className="position-relative">Gender <span className="required">*</span></label>
                                                        <div className={`nice-select select-filter-category w-100 ${genderSelectOpen && 'open'}`} tabIndex="1" onClick={() => setGenderSelectOpen(!genderSelectOpen)}>
                                                            <span className="current">{regData.GenderDesc}</span>
                                                            <ul className="list">
                                                                {genderData.map((item, index) => <li key={index} onClick={() => {setRegData({...regData, GenderDesc: item.Description, Gender: item.CodeId}); setGenderSelectOpen(false)}} className={`option ${regData.State === item.CodeId && 'selected focus'}`}>{item.Description}</li>)}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                {b2bMode ? <>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="text" name='ContactPerson' value={regData.ContactPerson} required onChange={handleRegForm} tabIndex={1}/>
                                                            <label className={`${regData.ContactPerson && 'active'}`}>Contact Name <span className="required">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="text" name='RegMob2' value={regData.RegMob2} required onChange={(e) => handleNumberInputs(e, setRegData)} tabIndex={1} maxLength='10'/>
                                                            <label className={`${regData.RegMob2 && 'active'}`}>Mobile Number <span className="required">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="text" name='GstIn' value={regData.GstIn} required id="GSTIN" onChange={handleRegForm} tabIndex={1}/>
                                                            <label className={`${regData.GstIn && 'active'}`}>GSTIN Number <span className="required">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="file" accept="image/png, image/jpeg, image/jpg, application/pdf, .doc, .docx" style={{fontSize: '0.8em', paddingBottom: '0.19em', display: 'none'}} name='GSTIN' required id="attach_GSTIN" onChange={handleAttachments} tabIndex={1}/>
                                                            <input type="text" value={docs.GSTIN?.fileName || ''} readOnly />
                                                            <label className={`pe-all ${docs.GSTIN?.src ? 'active' : 'file-select'}`} htmlFor="attach_GSTIN"><i className='bx bx-paperclip'></i> GSTIN Reg. Certificate <span className="required">*</span></label>
                                                            {docs.GSTIN?.src && <i className='bx bx-x position-absolute pointer' style={{top: '40%', right: 0}} onClick={() => setDocs(pre => ({...pre, GSTIN: {docName: 'GSTIN', src: '', fileName: ''}}))}></i>}
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="text" name='LicenceNo' value={regData.LicenceNo} required onChange={handleRegForm} tabIndex={1}/>
                                                            <label className={`${regData.LicenceNo && 'active'}`}>DL Number 1 <span className="required">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="text" name='DL_Number2' value={regData.DL_Number2} required onChange={handleRegForm} tabIndex={1}/>
                                                            <label className={`${regData.DL_Number2 && 'active'}`}>DL Number 2 <span className="required">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="file" accept="image/png, image/jpeg, image/jpg, application/pdf, .doc, .docx" style={{fontSize: '0.8em', paddingBottom: '0.19em', display: 'none'}} name='Form20' required id="form_20" onChange={handleAttachments} tabIndex={1}/>
                                                            <input type="text" value={docs.Form20?.fileName || ''} readOnly />
                                                            <label className={`pe-all ${docs.Form20?.src ? 'active' : 'file-select'}`} htmlFor="form_20"><i className='bx bx-paperclip'></i> FORM 20 <span className="required">*</span></label>
                                                            {docs.Form20?.src && <i className='bx bx-x position-absolute pointer' style={{top: '40%', right: 0}} onClick={() => setDocs(pre => ({...pre, Form20: {docName: 'Form20', src: '', fileName: ''}}))}></i>}
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="file" accept="image/png, image/jpeg, image/jpg, application/pdf, .doc, .docx" style={{fontSize: '0.8em', paddingBottom: '0.19em', display: 'none'}} name='Form21' required id="form_21" onChange={handleAttachments} tabIndex={1}/>
                                                            <input type="text" value={docs.Form21?.fileName || ''} readOnly />
                                                            <label className={`pe-all ${docs.Form21?.src ? 'active' : 'file-select'}`} htmlFor="form_21"><i className='bx bx-paperclip'></i> FORM 21 <span className="required">*</span></label>
                                                            {docs.Form21?.src && <i className='bx bx-x position-absolute pointer' style={{top: '40%', right: 0}} onClick={() => setDocs(pre => ({...pre, Form21: {docName: 'Form21', src: '', fileName: ''}}))}></i>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="input-group mb-4">
                                                            <input type="file" accept="image/png, image/jpeg, image/jpg, application/pdf, .doc, .docx" style={{fontSize: '0.8em', paddingBottom: '0.19em', display: 'none'}} name='DlRenewal' required id="dl_reneval_copy" onChange={handleAttachments} tabIndex={1}/>
                                                            <input type="text" value={docs.DlRenewal?.fileName || ''} readOnly />
                                                            <label className={`pe-all ${docs.DlRenewal?.src ? 'active' : 'file-select'}`} htmlFor="dl_reneval_copy"><i className='bx bx-paperclip'></i> DL Reneval Copy <span className="required">*</span></label>
                                                            {docs.DlRenewal?.src && <i className='bx bx-x position-absolute pointer' style={{top: '40%', right: 0}} onClick={() => setDocs(pre => ({...pre, DlRenewal: {docName: 'DlRenewal', src: '', fileName: ''}}))}></i>}
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="text" name='TradeLicense' value={regData.TradeLicense} required onChange={handleRegForm} tabIndex={1}/>
                                                            <label className={`${regData.TradeLicense && 'active'}`}>TL Number <span className="required">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4">
                                                            <input type="file" accept="image/png, image/jpeg, image/jpg, application/pdf, .doc, .docx" style={{fontSize: '0.8em', paddingBottom: '0.19em', display: 'none'}} name='TLicense' required id="tl_attachment" onChange={handleAttachments} tabIndex={1}/>
                                                            <input type="text" value={docs.TLicense?.fileName || ''} readOnly />
                                                            <label className={`pe-all ${docs.TLicense?.src ? 'active' : 'file-select'}`} htmlFor="tl_attachment"><i className='bx bx-paperclip'></i> Trade License <span className="required">*</span></label>
                                                            {docs.TLicense?.src && <i className='bx bx-x position-absolute pointer' style={{top: '40%', right: 0}} onClick={() => setDocs(pre => ({...pre, TLicense: {docName: 'TLicense', src: '', fileName: ''}}))}></i>}
                                                        </div>
                                                    </div>
                                                </> : ''}



                                                {b2bMode ? '' : <>
                                                    <div className="col-4">
                                                        <div className="input-group mb-4">
                                                            <JQDatePicker id={'user_DOB'} setState={setRegData} handler={calculateDuration} curValue={regData.DOB} name={'DOB'} tabIndex={1} required />
                                                            <label className={`${regData.DOB && 'active'}`}>DOB <span className="required">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="input-group mb-4">
                                                            <input name="Age" value={regData.Age} onChange={(e) => handleNumberInputsWithDate(e, setRegData)} tabIndex={1} type='text' maxLength={2} id="txtPtAge" />
                                                            <label className={`${regData.Age !== '' && 'active'}`}>Years </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="input-group mb-4">
                                                            <input name="AgeMonth" value={regData.AgeMonth} onChange={(e) => handleNumberInputsWithDate(e, setRegData)} tabIndex={1} type='text' maxLength={2} id="txtPtAgeMonth"/>
                                                            <label className={`${regData.AgeMonth !== '' && 'active'}`}>Months </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="input-group mb-4">
                                                            <input name="AgeDay" value={regData.AgeDay} onChange={(e) => handleNumberInputsWithDate(e, setRegData)} tabIndex={1} type='text' maxLength={2} id="txtPtAgeDay"/>
                                                            <label className={`${regData.AgeDay !== '' && 'active'}`}>Days </label>
                                                        </div>
                                                    </div>
                                                </>}

                                                <div className="col-12">
                                                    <div className="input-group mb-4">
                                                        <input type="text" name='Address' value={regData.Address} required onChange={handleRegForm} tabIndex={1}/>
                                                        <label className={`${regData.Address && 'active'}`}>Address <span className="required">*</span></label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="input-group mb-4">
                                                        <input type="text" name='Address2' value={regData.Address2} onChange={handleRegForm} tabIndex={1}/>
                                                        <label className={`${regData.Address2 && 'active'}`}>Apartment (optional)</label>
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex align-items-end">
                                                    <div className="input-group mb-4">
                                                        <input type="text" name='City' value={regData.City} onChange={handleRegForm} tabIndex={1}/>
                                                        <label className={`${regData.City && 'active'}`}>City</label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="input-group mb-4 justify-content-between flex-column" ref={stateSelectRef}>
                                                        <label className="position-relative">State <span className="required">*</span></label>
                                                        <div className={`nice-select select-filter-category w-100 ${stateSelectOpen && 'open'}`} tabIndex="1" onClick={() => setStateSelectOpen(!stateSelectOpen)}>
                                                            <span className="current">{activeState}</span>
                                                            <ul className="list" style={{maxHeight: '14em', overflow: 'auto'}}>
                                                                {statesList.map((item, index) => <li key={index} onClick={() => {setRegData({...regData, StateName: item.Description, State: item.CodeId}); setStateSelectOpen(false)}} className={`option ${regData.State === item.CodeId && 'selected focus'}`}>{item.Description}</li>)}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>                                           

                                                <div className="col-6 d-flex align-items-end">
                                                    <div className="input-group mb-4">
                                                        <input type="text" name='Pin' value={regData.Pin} required onChange={(e) => handleNumberInputs(e, setRegData)} maxLength='6' tabIndex={1}/>
                                                        <label className={`${regData.Pin && 'active'}`}>Pincode / Zip <span className="required">*</span></label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="input-group mb-4">
                                                        <input type="email" name='Email' value={regData.Email} onChange={handleRegForm} tabIndex={1}/>
                                                        <label className={`${regData.Email && 'active'}`}>Email Address</label>
                                                    </div>
                                                </div>
                                                {!isLoggedIn && <>
                                                    <div className="col-6">
                                                        <div className="input-group mb-4 create-account">
                                                            <input type="password" name='UserPassword' value={regData.UserPassword} required onChange={handleRegForm} autoComplete="false" tabIndex={1}/>
                                                            <label className={`${regData.UserPassword && 'active'}`}>Choose a password  <span className="required">*</span></label>
                                                        </div>
                                                        
                                                    </div>
                                                </>} 
                                                <div className="col-12">
                                                    {loginError.status && <p className="text-danger">{loginError.message}</p>}
                                                    <button className='add_an_item_btn loginBtn' type="submit">REGISTER</button>
                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                        {(vType === 'ErpPharma' && b2bMode) && <div className="d-flex justify-content-center mt-4 mb-lg-4">
                            {compCode === TAKE_HOME_ID ? 
                            <a href="https://takehome.live/" className='text-white rounded-3 pointer' style={{background: '#3c5b9b', padding: '0.6em 0.9em 0.6em', width: 'fit-content'}}>
                                <i className="fas fa-home me-2" style={{fontSize: '2em', verticalAlign: 'sub'}}></i> <span style={{fontWeight: 500, fontSize: '1.2em'}}>HOME</span>
                            </a>
                            : 
                            <span onClick={() => {globalDataAction({ userRegType: { CodeId: 43198, Description: 'Customer', CodeValue: 'Customer', for: 'B2C / Patient' } }); modalAction('LOGIN_MODAL', false)}} className='text-white rounded-3 pointer' style={{background: '#3c5b9b', padding: '0.6em 0.9em 0.6em', width: 'fit-content'}}>
                                <i className="fas fa-home me-2" style={{fontSize: '2em', verticalAlign: 'sub'}}></i> <span style={{fontWeight: 500, fontSize: '1.2em'}}>BACK</span>
                            </span>}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToLoginModal = (state) => {
    return { isLoggedIn: state.isLoggedIn, compCode: state.compCode, userInfo: state.userInfo, vType: state.vType, globalData: state.globalData, compInfo: state.compInfo };
}

export default connect(mapStateToLoginModal, {modalAction, loginStatusAction, loaderAction, userInfoAction, globalDataAction})(LoginModal);