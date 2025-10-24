  import { Link, useHistory } from 'react-router-dom';
  import React, { useState, useEffect } from 'react';
  import { loginStatusAction, userInfoAction, loaderAction } from '../../../../actions';
  import { connect, useSelector } from 'react-redux';
  import { useFetch, ModalComponent, handleNumberInputs, createDate, getDuration, encrypt, JQDatePicker, useRegType, stringToast, CustomOffcanvas } from '../utilities';
  import axios from 'axios';
  import { Accordion } from 'react-bootstrap';
  import { BASE_URL, defaultId, initReg } from '../../../../constants';
import Timer, { userLevel, uType } from '../../../utils/utils';


  const LoginModal = ({ modals, modalAction, compCode, isLoggedIn, loginStatusAction, userInfo, userInfoAction, loaderAction, bookingInfo, globalData, compInfo }) => {

    const [statesList, setStatesList] = useState([{Description: 'West Bengal', CodeId: 3}]); 

    const history = useHistory();
    const modalOpen = modals.LOGIN_MODAL.state;
    const regType = modals.LOGIN_MODAL.data.mode;
    const userRegTypeId = globalData.userRegType.CodeId;


    const hideReg = regType.level === 55;
    useEffect(() => {
      if (regType.level === 55) {
        setTabActive('login');
      }
    },[regType])
  
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
      setEnteredOTP('');                         // Reset these field on whnever form opens or closes.
      setGeneratedOTP('init_random_otp');        // Initialize with random number to prevent submission with otp === ''.
    },[modalOpen])
  
    useEffect(() => {
      handleUserType(regType);
    },[regType])
    
    useEffect(() => {                             // RESET FORM - Close otp personal fields when user reopens the login modal.
      setShowNumberSubmitBtn(true);
      setShowOtpField(false);
      setLoginError({status: false, message: ''});                      // Reset loginError to false on every page reRender.
      setShowPersonalFields(false);
      setShowOrgFields(false);
    },[modalOpen])
  
    // const [alertVisible, setAlertVisible] = useState(false);
    // const [refNumber, setRefNumber] = useState('');
    const [loginData, setLoginData] = useState({ phone: '', password: '', EncCompanyId: '' });
    const [registerData, setRegisterData] = useState({
      ...initReg,
      BusinessType: 'B2C',        // this module will only have B2C users.
      UserLevelSeq: ''
    })

    const regTypes = { 60: 'Customer', 57: 'SP', 58: 'AP', REFERRER: 'MP', 55: 'MarketBy' };   
    
    useRegType(regTypes[regType.level]);   


    // INSTRUCTIONS TO UPDATE USERTYPE --------------------------------------------------------------------------------------------------------------------------

    // FILES WHERE USERTYPE IS HARDCODED WITH 125 OCCURANCES
    // default utilities
    // default dashboards-new.jsx
    // default editUserModal
    // memberForm
    // default prints new-investigation.jsx
    // ePharma loginModal

    // FIND AND REPLACE
    // PATIENT
    // DOCTOR
    // PROVIDER
    // REFERRER
    // MARKETBY


    
    const genderData = useFetch(`${BASE_URL}/api/Values/Get`, compCode)[0];
    const [showOtpField, setShowOtpField] = useState(false);
    const [showPersonalFields, setShowPersonalFields] = useState(false);
    const [showOrgFields, setShowOrgFields] = useState(false);
    const [showNumberSubmitBtn, setShowNumberSubmitBtn] = useState(true);
    const [loginError, setLoginError] = useState({status: false, message: ''});
    const [generatedOTP, setGeneratedOTP] = useState('init_random_otp');
    const [enteredOTP, setEnteredOTP] = useState('asdfsdff');
    const [specializations, setSpecializations] = useState({isFieldOpen: false, data: []});
    const [isTabActive, setTabActive] = useState('register');
    
    useEffect(() => {
      if (!isLoggedIn) {                        
        setLoginData(pre => ({...pre, EncCompanyId: compCode}));                                     // set company code on both forms.
        setRegisterData(pre => ({...pre, EncCompanyId: compCode, UserRegTypeId: userRegTypeId, UserLevelSeq: regType.level }));          
      } else {
        setLoginData(preValue => {              // Populate the forms with existing user data if he is logged in.
          return { ...preValue, phone: userInfo.RegMob1, password: '', EncCompanyId: userInfo.EncCompanyId };
        });
        setRegisterData((pre => ({             
          ...pre,
          Name: userInfo.Name,
          RegMob1: userInfo.RegMob1,
          UserId: 0,
          UserType: userInfo.UserType,
          PartyCode: userInfo.PartyCode,
          EncCompanyId: userInfo.EncCompanyId,
          Age: userInfo.Age,
          AgeDay: userInfo.AgeDay,
          AgeMonth: userInfo.AgeMonth,
          Gender: userInfo.Gender,
          GenderDesc: userInfo.GenderDesc,
          MPartyCode: userInfo.MPartyCode,
          Address: userInfo.Address,
          Qualification: userInfo.Qualification,
          SpecialistDesc: userInfo.SpecialistDesc,
          State: userInfo.State, 
          StateName: userInfo.StateName,                         
          City: userInfo.City,
          Pin: userInfo.Pin,
          Address2: userInfo.Address2,
          UHID: userInfo.UHID,
          MemberId: userInfo.MemberId,
          PartyId: userInfo.PartyId,
          Salutation: userInfo.Salutation,
    
          DOB: new Date(userInfo.DOB).toLocaleDateString('en-TT'),
          DOBstr: new Date(userInfo.DOB).toLocaleDateString('en-TT'),
          AnniversaryDate: new Date(userInfo.AnniversaryDate).toLocaleDateString('en-TT'),
          AnniversaryDatestr: new Date(userInfo.AnniversaryDate).toLocaleDateString('en-TT'),
          Aadhaar: userInfo.Aadhaar,
          IsDOBCalculated: userInfo.IsDOBCalculated,
    
          compName: userInfo.compName ? userInfo.compName : '',
          compAddress: userInfo.compAddress ? userInfo.compAddress : '',
          compState: userInfo.compState ? userInfo.compState : '',
          compPin: userInfo.compPin ? userInfo.compPin : '',
          compPhone1: userInfo.compPhone1 ? userInfo.compPhone1 : '',
          compPhone2: userInfo.compPhone2 ? userInfo.compPhone2 : '',
          compMail: userInfo.compMail ? userInfo.compMail : '',

          RegMob2: userInfo.RegMob2,            // for Business type.
          GstIn: userInfo.GstIn,
          LicenceNo: userInfo.LicenceNo,
          ContactPerson: userInfo.ContactPerson,
          BusinessType: userInfo.BusinessType,
          UserLevelSeq: userInfo.UserLevelSeq
        })))
      }
    }, [isLoggedIn, userInfo, userRegTypeId]);
    
    // LOGIN FORM FUNCTIONS..
    
    const handleLoginInput = (e) => {
      const {name, value} = e.target;
      setLoginData(preValue => {
        return {...preValue, [name]: value};
      });
    }
    
    const handleLoginFormSubmit = (e) => {
      e.preventDefault();
      makeLoginRequest({ phone: loginData.phone, password: loginData.password, companyCode: compCode });
    }
    
    const makeLoginRequest = async (params) => {
      const body = { UserName: params.phone, UserPassword: params.password, EncCompanyId: params.companyCode };
      loaderAction(true);
      const res = await axios.post(`${BASE_URL}/api/UserAuth/CheckCompLogin`, body);
      // const res = await axios.get(`${BASE_URL}/api/UserAuth/Get?UN=${params.phone}&UP=${params.password}&CID=${params.companyCode}`);
      loaderAction(false);
      const data = res.data[0];

      // let appBusinessType = globalData.businessType.CodeValue;     
      // if (res.data.BusinessType !== appBusinessType) return alert('You are not Allowed to log in.');       // BLOCK LOGIN IF MISMATCH FOUND     
 
      if (data.Remarks === 'INVALID') {
        setLoginError({status: true, message: 'The username or password is incorrect.'});
      } else if (data.Remarks === 'NOTINCOMPANY') {
        setRegisterData((pre => ({             
          ...pre,
          Salutation: data.Salutation,
          Name: data.Name,
          EncCompanyId: data.EncCompanyId,
          PartyCode: '',
          RegMob1: data.RegMob1,
          Gender: data.Gender,
          GenderDesc: data.GenderDesc,
          Address: data.Address,
          Age: data.Age,
          AgeMonth: data.AgeMonth,
          AgeDay: data.AgeDay,
          UserPassword: data.UserPassword,               // force to re-enter.
          // UserType: data.UserType,                       // set by regType
          Qualification: data.Qualification,
          SpecialistId: data.SpecialistId,
          UserId: data.UserId,
          PartyId: data.PartyId,
          MemberId: data.MemberId,
      
          State: data.State,
          StateName: data.StateName,
          City: data.City,
          Pin: data.Pin,
          Address2: data.Address2,
      
          DOB: new Date(data.DOB).toLocaleDateString('en-TT'),
          DOBstr: new Date(data.DOB).toLocaleDateString('en-TT'),
          AnniversaryDate: new Date(data.AnniversaryDate).toLocaleDateString('en-TT'),
          AnniversaryDatestr: new Date(data.AnniversaryDate).toLocaleDateString('en-TT'),
          Aadhaar: '',                                        // Not required.
          IsDOBCalculated: 'N',

          UHID: data.UHID,
      
          compName: data.compName ? data.compName : '',
          compAddress: data.compAddress ? data.compAddress : '',
          compState: data.compState ? data.compState : '',
          compPin: data.compPin ? data.compPin : '',
          compPhone1: data.compPhone1 ? data.compPhone1 : '',
          compPhone2: data.compPhone2 ? data.compPhone2 : '',
          compMail: data.compMail ? data.compMail : '',

          RegMob2: data.RegMob2,            // for Business type.
          GstIn: data.GstIn,
          LicenceNo: data.LicenceNo ? data.LicenceNo : '',
          ContactPerson: data.ContactPerson,
          BusinessType: 'B2C',
          UserLevelSeq: data.UserLevelSeq
        })))
        setShowPersonalFields(true);
        setShowNumberSubmitBtn(false);
        setGeneratedOTP('verified');                                              // hide NEXT button of OTP verification.
        setEnteredOTP('verified');                                                // pass OTP check at makeLoginReuest.
        setTabActive('register');
        setLoginError({status: false, message: ''});
      } else if (!data.UserId) {    // || !data.UserType
        return alert("Something Went wrong, We can't log you in.");
      } else {
        let userLoginData = {
            Name: data.Name,
            UserFullName: data.UserFullName,
            RegMob1: params.phone,
            UserId: data.UserId,
            UserType: data.UserType,
            PartyCode: data.PartyCode,
            EncCompanyId: params.companyCode,
            Age: data.Age,
            AgeDay: data.AgeDay,
            AgeMonth: data.AgeMonth,
            Gender: data.Gender,
            GenderDesc: data.GenderDesc,
            MPartyCode: data.MPartyCode,
            Address: data.Address,
            Qualification: data.Qualification,
            SpecialistDesc: data.SpecialistDesc,
            State: data.State, 
            StateName: data.StateName,                         
            City: data.City,
            Pin: data.Pin,
            Address2: data.Address2,
            UHID: data.UHID,
            MemberId: data.MemberId,
            PartyId: data.PartyId,
            Salutation: data.Salutation,
            Email: data.Email,
            Country: data.Country,
    
            DOB: data.DOB,
            DOBstr: data.DOB,
            AnniversaryDate: data.AnniversaryDate,
            AnniversaryDatestr: data.AnniversaryDate,
            Aadhaar: data.Aadhaar,
            IsDOBCalculated: data.IsDOBCalculated,
    
            compName: data.compName ? data.compName: '',
            compAddress: data.compAddress ? data.compAddress: '',
            compState: data.compState ? data.compState: '',
            compPin: data.compPin ? data.compPin: '',
            compPhone1: data.compPhone1 ? data.compPhone1: '',
            compPhone2: data.compPhone2 ? data.compPhone2: '',
            compMail: data.compMail ? data.compMail: '',

            RegMob2: data.RegMob2,            // for Business type.
            GstIn: data.GstIn,
            LicenceNo: data.LicenceNo ? data.LicenceNo : '',
            ContactPerson: data.ContactPerson,
            BusinessType: 'B2C',

            UnderDoctId: data.UnderDoctId,
            ReferrerId: data.ReferrerId,
            ProviderId: data.ProviderId,
            MarketedId: data.MarketedId,
            
            UserLevelSeq: data.UserLevelSeq,
            UserCompList: data.UserCompList[0],
          };
    
          localStorage.setItem("userLoginData", encrypt({ phone: params.phone, password: data.UserPassword, compCode: params.companyCode }));
          userInfoAction(userLoginData);          
          modalAction('LOGIN_MODAL', false, { mode: data.UserLevelSeq });
          loginStatusAction(true);
          stringToast("Welcome, You successfully logged in.", { type: 'success', autoClose: 5000 });
          // handleRedirect(data.UserType);
        }
    }
    
      const handleRegistrationInput = (e) => {
        const {name, value} = e.target;
        setRegisterData(preValue => {
          return {...preValue, [name]: value};
        });
      }

      const handleStateDropdown = (id) => {
        let selectedState = statesList.find(i => i.CodeId === parseInt(id));
        setRegisterData(pre => ({ ...pre, State: selectedState.CodeId, StateName: selectedState.Description }));
      }

      const handleRegisterFormSubmit = async (e) => {
        e.preventDefault();
        if (registerData.UserPassword.length < 4) return alert('Please Enter a password of minimum 4 digits.');
        if (isValidOtp(enteredOTP, generatedOTP)) {                                              
          let status = await makeRegisterationRequest(registerData);          
            if (status) {                                                     
              setTimeout(() => {
                makeLoginRequest({ phone: registerData.RegMob1, password: registerData.UserPassword, companyCode: compCode });    
              }, 500);
            } else {
              alert('An Error Occured, Please try again later.');
              return;
            }
        } else {
          alert('Wrong OTP, enter correct OTP');
        }
      }
    
      const handleRedirect = (userType) => {
        history.push('/dashboard');
        // switch (userType) {
        //   case uType.PATIENT.level:
        //     break;
        //   default:
        //     history.push('/dashboard');
        //     break;
        // }                                                    
      }
    
      const compareOtp = () => {
        
        if (isValidOtp(enteredOTP, generatedOTP)) {                            // enteredOTP === generatedOTP. also put in in handleRegisterFormSubmit.
          if (regType.level === uType.POLYCLINIC.level) {
            setShowOrgFields(true);
          } else {
            setShowPersonalFields(true);
          }
          setShowOtpField(false);
        } else {
          alert('Wrong OTP, enter correct OTP');
        }
      }

      const isValidOtp = (input, otp) => {
        if (compCode === defaultId) {
          if (enteredOTP !== '') return true;
        }
        if (input === otp) return true;
        else return false;
      }
    
      const resendOtp = () => {
        revealOtpField();
      }
    
      const handleOrgSubmit = () => {
        const res = true;
        if (res) {
          setShowOrgFields(false);
          setShowPersonalFields(true);
        } else {
          console.log('unexpected error.');
        }
      }
    
      const makeRegisterationRequest = async (params) => {
        if (!params.UserType) return alert('Error, no user type received.');
        try {
          loaderAction(true);
          const res = await axios.post(`${BASE_URL}/api/UserReg/Post`, params);
          loaderAction(false);
          if (res.data[1].length > 3) {
            localStorage.setItem("userLoginData", encrypt({ phone: params.RegMob1, password: params.UserPassword, compCode: params.EncCompanyId }));
            userInfoAction({ ...params, UserId: parseInt(res.data[1]) });        // received UserId is string type hence converting it to integer because everywhere (received login data) else it's used as integer
            return true;                                                         // 'UserId' !== UserId which can cuase wrong output in filtering just like done in getMembersList function.
          }      
        } catch (err) {
          console.log(err);
          return false;
        }
        return false;
      }  
    
      const dumpAllRegisterData = () => {
        setRegisterData(preValue => {
          return {
            ...preValue,
            Salutation: '',
            Name: '',
            // EncCompanyId: '',                  // Do not reset EncCompanyId which is compCode for the current user which we got from URL paramenters.
            PartyCode: '',
            RegMob1: '',
            Gender: '',
            GenderDesc: '',
            Address: '',
            Age: '0',
            AgeMonth: '0',
            AgeDay: '0',
            UserPassword: '',   
            UserType: regType.title, 
            Qualification: '',
            SpecialistId: 0,
            State: '3',                           // taking string as select element returns value strings only.
            StateName: 'West Bengal',
            City: '',
            Pin: '',
            Address2: '',
            PartyId: 0,
    
            DOB: '',
            DOBstr: '',
            AnniversaryDate: '',
            AnniversaryDatestr: '',
            Aadhaar: '',
            IsDOBCalculated: 'N',
            UHID: '',
            MemberId: '',
    
            compName: '',
            compAddress: '',
            compState: '',
            compPin: '',
            compPhone1: '',
            compPhone2: '',
            compMail: '',

            RegMob2: '',            // for Business type.
            GstIn: '',
            LicenceNo: '',
            ContactPerson: '',
            BusinessType: 'B2C',

            UserLevelSeq: '',
          }
        });
      }
    
      const makeOtpRequest = async () => {
        loaderAction(true);
        const res = await axios.get(`${BASE_URL}/api/UserReg/Get?Id=0&name=Subscriber&mob=${registerData.RegMob1}`);
        loaderAction(false);
        if (res.status === 200) {
          setGeneratedOTP(res.data);
          return;
        }
        alert('An Error Occured, Try again later.');
      }
    
      const toggleGender = (e) => {
        let val = e.target.value;
        let female = ['Ms', 'Mrs', 'Miss'];
        if (female.includes(val)) {
          setRegisterData(preValue => {
            return {...preValue, Gender: 105, GenderDesc: 'Female'};
          });
        } else {
          setRegisterData(preValue => {
            return {...preValue, Gender: 104, GenderDesc: 'Male'};
          });
        }
      }
    
      const handleFormClose = () => {
        modalAction('LOGIN_MODAL', false, {mode: regType});                    // Close the form.
        dumpAllRegisterData();                   // Dump all entered Register data.
      }
    
      const checkExistingUser = async () => {
        if (registerData.RegMob1.length > 9) {
          loaderAction(true);
          const res = await axios.get(`${BASE_URL}/api/UserReg/Get?UN=${registerData.RegMob1}`);
          loaderAction(false);
          if (res.data === 'Y') {
            setLoginError({status: true, message: 'This number is already registered.'});
            setLoginData(preValue => {
              return { ...preValue, phone: registerData.RegMob1 }
            })
            setRegisterData(preValue => {
              return { ...preValue, RegMob1: '' }
            })
            setTabActive('login');
          } else {
            setLoginError({status: false, message: ''});
            revealOtpField();
            setShowNumberSubmitBtn(false);
          }
        }
      }
    
      const revealOtpField = () => {
        if (registerData.RegMob1.length > 9 && !loginError.status ) {
          setShowOtpField(true);
          makeOtpRequest(); 
        }
      }
    
      // const showReference = () => {
      //   return <span className="text-info">Please keep your Reference(H) No: <span className='text-danger ms-2'>{refNumber}</span></span>;
      // }
    
      // const userTypes = [uType.POLYCLINIC.level, uType.DOCTOR.level, uType.PROVIDER.level, uType.COLLECTOR.level];
    
      const handleUserType = (item) => {
        setRegisterData((preValue) => {
          return {...preValue, UserType: item.title}
        });
        modalAction('LOGIN_MODAL', modalOpen, {mode: item});
        if (item.level === uType.DOCTOR.level || item.level === uType.POLYCLINIC.level) {
          getSpecializations();
        } else {
          setSpecializations(preValue => {
            return {...preValue, isFieldOpen: false}
          });
        }
      } 
    
      const getSpecializations = async () => {
        loaderAction(true);
        const res = await axios.get(`${BASE_URL}/api/Values/Get?CID=${compCode}&p1=0`, {});
        loaderAction(false);
        if (res.data.length > 0) {
          setSpecializations({isFieldOpen: true, data: res.data});
        } else {
          setSpecializations({isFieldOpen: true, data: ['no data found']});
        }
      }
    
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
        setRegisterData(pre => ({...pre, DOB: calculatedDOB, DOBstr: calculatedDOB, IsDOBCalculated: 'Y'}));
      }
    
      const handleNumberInputsWithDate = (e, setStateName) => {
        const {name, value} = e.target;
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
          setStateName(preValue => {
            return {...preValue, [name]: value};
          });
          let currValues = { Age: registerData.Age, AgeMonth: registerData.AgeMonth, AgeDay: registerData.AgeDay, currField: name, currValue: value };
          handleDate(currValues);
        }
      }
    
      const calculateDuration = (date) => {
        setRegisterData(pre => ({ 
            ...pre, IsDOBCalculated: 'N', 
            Age: getDuration(date).years, 
            AgeMonth: getDuration(date).months, 
            AgeDay: getDuration(date).days, 
            DOB: date,
            DOBstr: date
        }))
      }
    
      const backToLogin = () => {
        setTabActive('login');
        setLoginError({status: false, message: ''});
      }

      return (
        <>
          <div className="modal-header" style={{padding: '0.8em 1.3em 0.4em', borderRadius: '0.5em 0.5em 0 0'}}>
            <div className="modal-title h4">Please Login or Register to continue as a {regType.title}</div>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleFormClose}></button>
          </div>
          <div className='modal-body'>
            <div id='loginModal' className='d-flex flex-column flex-lg-row'>
              <div className='notes'>
                <ul>
                  <li style={{'--clr': 'orangered'}}>
                    <p><i className='bx bx-check-circle'></i> Login or Register </p>
                  </li>

                  {(() => {
                    if (regType.level === uType.PATIENT.level || regType.level === uType.MARKETBY.level) {
                      return (
                        <>
                          <li style={{'--clr': '#00b900'}}>
                            <p><i className='bx bx-check-circle'></i> Book Doctor Appointment</p>
                          </li>
                          <li style={{'--clr': '#03A9F4'}}>
                            <p><i className='bx bx-check-circle'></i> Book Lab Tests</p>
                          </li>
                          <li style={{'--clr': '#d143e9'}}>
                            <p><i className='bx bx-check-circle'></i> View Medical Records</p>
                          </li>
                          <li style={{'--clr': '#905bed'}}>
                            <p><i className='bx bx-check-circle'></i> Add Family Members</p>
                          </li>
                        </>
                      )
                    } else if (regType.level === uType.DOCTOR.level) {
                      return (
                        <>
                          <li style={{'--clr': '#00b900'}}>
                            <p><i className='bx bx-check-circle'></i> Book Doctor Appointment</p>
                          </li>
                          <li style={{'--clr': '#905bed'}}>
                            <p><i className='bx bx-check-circle'></i> Add Family Members</p>
                          </li>
                        </>
                      )
                    } else if (regType.level === uType.PROVIDER.level) {
                      return (
                        <>
                          <Accordion className='acc-type-1'>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Read & Accept Partnership Terms</Accordion.Header>
                              <Accordion.Body>
                                Read our Partnership Terms "Partnership Terms, Conditions, and Privacy Policy" carefully and accept the check box given and submit the form.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Email KYC Document</Accordion.Header>
                              <Accordion.Body>
                                Email your Company PAN Card and GST Certificate on info@gbooksindia.com, our team will verify your documents and approve your partner account.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>Avail Online Training</Accordion.Header>
                              <Accordion.Body>
                                After approval of your account, our executive will call you and provide online training of software and explain you all the features over call.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4" className='pb-0'>
                              <Accordion.Header>Start Selling Our Products</Accordion.Header>
                              <Accordion.Body>
                                After successfull training, start selling our software to your clients. Our team is always there to help you in case you face any issues while giving demo to your clients.
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </>
                      )
                    } else if (regType.level === uType.COLLECTOR.level) {
                      return (
                        <>
                          <li style={{'--clr': '#00b900'}}>
                            <p><i className='bx bx-check-circle'></i> Book Doctor Appointment</p>
                          </li>
                          <li style={{'--clr': '#905bed'}}>
                            <p><i className='bx bx-check-circle'></i> Add Family Members</p>
                          </li>
                        </>
                      )
                    } else if (regType.level === uType.POLYCLINIC.level) {
                      return (
                        <>
                          <li style={{'--clr': '#00b900'}}>
                            <p><i className='bx bx-check-circle'></i> Book Doctor Appointment</p>
                          </li>
                          <li style={{'--clr': '#905bed'}}>
                            <p><i className='bx bx-check-circle'></i> Add Family Members</p>
                          </li>
                        </>
                      )
                    } else {
                      return;
                    }
                  })()}           

                  {regType.level !== uType.PROVIDER.level ? <li style={{'--clr': '#FF9800'}}>
                    <p><i className='bx bx-check-circle'></i> And Much More.....</p>
                  </li> : ''}
                </ul>
              </div>
              <div>
                <ul className="nav nav-tabs pb-2 border-0" role="tablist">
                  <li className="nav-item w-50" role="presentation">
                    <button type="button" onClick={() => {setTabActive('login'); setLoginError({status: false, message: ''})}} id="tabFade-1" className={`nav-link w-100 ${isTabActive === 'login' ? 'active' : ''}`}>LOGIN</button>
                  </li>
                  <li className="nav-item w-50" role="presentation">
                    <button type="button" onClick={() => {setTabActive('register'); setLoginError({status: false, message: ''})}} id="tabFade-2" className={`nav-link w-100 ${isTabActive === 'register' ? 'active' : ''}`}>REGISTRATION</button>
                  </li>
                </ul>
                <div className="tab-content pt-3">
                  <div className={`tab-pane fade ${isTabActive === 'login' ? 'show active' : ''}`}>
                    <form onSubmit={handleLoginFormSubmit} className="pt-2">
                      <div className="row gx-2">
                        <div className="col-12">
                          <div className="form-group form-focus focused" id="lblMobile1">
                            <label className="focus-label"><b className='text-danger'>* </b>Mobile Number</label>
                            <input name="phone" onChange={(e) => handleNumberInputs(e, setLoginData)} value={loginData.phone} required className="form-control floating input2" tabIndex={1} id="loginPhone" maxLength={10} />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group form-focus focused">
                            <label className="focus-label"><b className='text-danger'>* </b>Password</label>
                            <input onChange={handleLoginInput} value={loginData.password} required name="password" className="form-control floating input2" type="password" tabIndex={1} autoComplete='off' />
                          </div>
                          <p className="text-danger" style={{display: loginError.status ? 'block' : 'none'}}>{loginError.message}</p>
                          <Link to='' className="text-info cursor" onClick={() => {setTabActive('forgotPassword');}}>Forgot Password ?</Link>
                          <button type="submit" className="d-block btn btn-primary ms-auto" style={{"minWidth": "9em", "fontSize": "1em"}}>Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className={`tab-pane fade ${isTabActive === 'forgotPassword' ? 'show active' : ''}`}>
                    <ForgotPassword backToLogin={backToLogin} />
                  </div>
                  <div className={`tab-pane fade ${isTabActive === 'register' ? 'show active' : ''}`} style={{display: hideReg ? 'none' : ''}}>
                    <div className="row" id="divEnqDataContent">
                      <form className="bg-white rounded pt-2" onSubmit={handleRegisterFormSubmit} id="registrationForm">
                        <div className="col-md-12">
                          {/* <div className="row gx-2 mb-3 justify-content-between mx-0" id='userTypeTabs' style={{display: registerData.UserType !== uType.PATIENT.level ? 'flex' : 'none'}}>
                            {customTabsButtons(userTypes, registerData.UserType, handleUserType)}
                          </div> */}
                          <div className="row gx-2">
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group form-focus focused" id="lblMobile1">
                                <label className="focus-label"><b className='text-danger'>* </b>Mobile Number</label>
                                <input name="RegMob1" value={registerData.RegMob1} onChange={(e) => handleNumberInputs(e, setRegisterData)} required className="form-control floating input2" tabIndex={1} id="txtMobileNo1" maxLength={10} />
                              </div>
                              <p className="text-danger" style={{display: loginError.status ? 'block' : 'none'}}>{loginError.message}</p>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <span className={`btn btn-primary btnSave ms-auto fw-bold ${loginError.status ? 'disabled' : ''}`} onClick={checkExistingUser} style={{width: "8em", display: showNumberSubmitBtn ? 'block' : 'none'}} tabIndex={1}>NEXT</span>
                            </div>
                          </div>
    
                          {showOtpField && <div className="row gx-2 d-flex">
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group form-focus focused mb-0">
                                <label className="focus-label">ENTER YOUR OTP</label>
                                <input onChange={(e) => setEnteredOTP(e.target.value)} value={enteredOTP} className="form-control floating input2" type="text" id="txtPHeight" tabIndex={1} autoComplete='off' />
                                {/* <span className='mark text-sm' onClick={resendOtp}  style={{width: "10rem"}} tabIndex={1}>Resend OTP</span> */}
                                <Timer handleTask={resendOtp} />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12" style={{display: showOtpField ? 'block' : 'none'}}>
                              <span className='btn btn-primary btnSave ms-auto fw-bold d-block' onClick={compareOtp}  style={{width: "8em"}} tabIndex={1}>SUBMIT OTP</span>
                            </div>
                          </div>}
    
                          <div style={{display: showOrgFields && regType.level === uType.POLYCLINIC.level ? 'block' : 'none'}}>
                            <h4 className="card-title">Organisation Information:-</h4>
                            <div className="row gx-2">
                              <div className="col-md-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Organisation Name</label>
                                  <input name="compName" value={registerData.compName} onChange={handleRegistrationInput} className="form-control floating" tabIndex={1} type="text" autoComplete='off' />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group form-focus focused" id="lblMobile1">
                                  <label className="focus-label">Organisation Mobile Number 1</label>
                                  <input name="compPhone1" onChange={(e) => handleNumberInputs(e, setRegisterData)} value={registerData.compPhone1} className="form-control floating" tabIndex={1} maxLength={10} autoComplete='off' />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group form-focus focused" id="lblMobile1">
                                  <label className="focus-label">Organisation Mobile Number 2</label>
                                  <input name="compPhone2" onChange={(e) => handleNumberInputs(e, setRegisterData)} value={registerData.compPhone2} className="form-control floating" tabIndex={1} maxLength={10} autoComplete='off' />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group form-focus focused" id="lblMobile1">
                                  <label className="focus-label">Organisation Email</label>
                                  <input name="compMail" onChange={handleRegistrationInput} value={registerData.compMail} className="form-control floating" tabIndex={1} type='text' autoComplete='off'/>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Organisation Address</label>
                                  <input name="compAddress" value={registerData.compAddress} onChange={handleRegistrationInput} className="form-control floating" tabIndex={1} type="text" autoComplete='off'/>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Organisation State</label>
                                  <select name="compState" value={registerData.compState} onChange={handleRegistrationInput} tabIndex={1} className="form-control floating">
                                    <option value="">-Select-</option>
                                    {statesList.map(item => (<option key={item.CodeId} value={parseInt(item.CodeId)}>{item.Description}</option>))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Organisation Pin Code</label>
                                  <input name="compPin" value={registerData.compPin} onChange={(e) => handleNumberInputs(e, setRegisterData)} className="form-control floating" tabIndex={1} type='text' maxLength={6}  autoComplete='off' />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <span className="btn btn-primary btnSave ms-auto fw-bold d-block" onClick={handleOrgSubmit} tabIndex="1" style={{width: "10rem"}}>NEXT</span>
                              </div>
                            </div>
                          </div>
    
                          <div style={{display: showPersonalFields ? 'block' : 'none'}}>
                            <h4 className="card-title">Personal Information:-</h4>
                            <div className="row gx-2">
                              <div className="col-4">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label"><b className='text-danger'>* </b>Salutation</label>
                                  <select name="Salutation" value={registerData.Salutation} required onChange={(e) => {handleRegistrationInput(e); toggleGender(e);}} id="ddlSalutation" tabIndex={1} className="form-control">
                                    <option value="">-Select-</option>
                                    <option value="Dr">Dr</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Ms">Ms</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                    <option value="BabyOf">Baby Of</option>
                                    <option value="Master">Master</option>
                                    <option value="Baby">Baby</option>
                                    <option value="Md">Md.</option>
                                    <option value="Prof">Prof.</option>
                                    <option value="Rev">Rev.</option>
                                    <option value="Sk">Sk.</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-8">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label"><b className='text-danger'>* </b>Name</label>
                                  <input name="Name" value={registerData.Name} onChange={handleRegistrationInput} className="form-control floating" tabIndex={1} type="text" required/>
                                </div>
                              </div>
                            </div>
                            <div className="row gx-1 gx-md-2">
                              <div className="col-3">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label"><b className='text-danger'>* </b>Gender</label>
                                  <select name="Gender" value={registerData.Gender} onChange={handleRegistrationInput} required tabIndex={1} className="form-control floating">
                                    <option value="">-Select-</option>
                                    {genderData.map(item => (<option key={item.CodeId} value={item.CodeId}>{item.Description}</option>))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-3">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label"><b className='text-danger'>* </b>DOB</label>
                                  {/* <DatePicker 
                                    selected={new Date(registerData.DOB)}
                                    onChange={(date) => setRegisterData(pre => ({ ...pre, IsDOBCalculated: 'N', Age: getDuration(date?.toLocaleDateString('fr-CA')).years, AgeMonth: getDuration(date?.toLocaleDateString('fr-CA')).months, AgeDay: getDuration(date?.toLocaleDateString('fr-CA')).days, DOB: date ? date.toLocaleDateString('fr-CA') : new Date().toLocaleDateString('fr-CA')}))}
                                    showYearDropdown
                                    dateFormatCalendar="MMMM"
                                    yearDropdownItemNumber={100}
                                    scrollableYearDropdown
                                    className="form-control"
                                    dateFormat="dd/MM/yyyy"
                                  /> */}
                                  <JQDatePicker id={'user_DOB'} isRequired={true} setState={setRegisterData} handler={calculateDuration} curValue={registerData.DOB} name={'DOB'} customClass={'form-control'} required />
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Years</label>
                                  <input name="Age" value={registerData.Age} onChange={(e) => handleNumberInputsWithDate(e, setRegisterData)} className="form-control floating" tabIndex={1} type='text' maxLength={2} id="txtPtAge" />
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Months</label>
                                  <input name="AgeMonth" value={registerData.AgeMonth} onChange={(e) => handleNumberInputsWithDate(e, setRegisterData)} className="form-control floating" tabIndex={1} type='text' maxLength={2} id="txtPtAgeMonth"/>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Days</label>
                                  <input name="AgeDay" value={registerData.AgeDay} onChange={(e) => handleNumberInputsWithDate(e, setRegisterData)} className="form-control floating" tabIndex={1} type='text' maxLength={2} id="txtPtAgeDay"/>
                                </div>
                              </div>
                            </div>
    
                            <div className="row gx-2" style={{display: specializations.isFieldOpen ? 'flex' : 'none'}}>
                              <div className="col-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Qualification</label>
                                  <input name="Qualification" value={registerData.Qualification} onChange={handleRegistrationInput} className="form-control floating" tabIndex={1} type="text" id="txtQualification" autoComplete='off' />
                                </div>
                              </div>
    
                              <div className="col-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Specialization</label>
                                  <select name="SpecialistId" value={registerData.SpecialistId} onChange={handleRegistrationInput} id="SpecialistId" tabIndex={1} className="form-control floating" autoComplete='off'>
                                    <option value="">-Select-</option>
                                    {specializations.data.map(item => (<option key={item.SubCode} value={item.SubCode}>{item.Description}</option>))}
                                  </select>
                                </div>
                              </div>

                              {/* <div className="col-4">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Reg. No</label>
                                  <input name="LicenceNo" value={registerData.LicenceNo} onChange={handleRegistrationInput} className="form-control floating" tabIndex={1} type="text" id="txtRegNo" autoComplete='off'/>
                                </div>
                              </div> */}

                            </div>

                            {(regType.level === uType.DOCTOR.level || regType.level === uType.POLYCLINIC.level || regType.level === uType.PROVIDER.level) && <div className="row gx-2">
                              <div className="col-12">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Reg. No</label>
                                  <input name="LicenceNo" value={registerData.LicenceNo} onChange={handleRegistrationInput} className="form-control floating" tabIndex={1} type="text" id="txtRegNo" autoComplete='off'/>
                                </div>
                              </div>
                            </div>}
    
                            {/* {regType === uType.PATIENT.level && <div className="row gx-2">                    
                              <div className="col-12">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Aadhaar Number</label>
                                  <input name="Aadhaar" value={registerData.Aadhaar} onChange={(e) => handleNumberInputs(e, setRegisterData)} className="form-control floating" maxLength={12} tabIndex={1} type="text" autoComplete='off' />
                                </div>
                              </div>
                            </div>} */}
    
                            {/* {regType !== uType.PATIENT.level &&  <div className="row gx-2">                    
                              <div className="col-12">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Aniversary Date</label>
                                  <JQDatePicker id={'user_aniversary'} setState={setRegisterData} handler={handleAniversary} curValue={registerData.AnniversaryDate} name={'AnniversaryDate'} customClass={'form-control'} />
                                </div>
                              </div>
                            </div>} */}
    
                            <div className="row gx-2">
                              {/* <div className="col-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Apartment / Flat no. (optional)</label>
                                  <input name="Address2" value={registerData.Address2} onChange={handleRegistrationInput} tabIndex={1} className="form-control floating" />
                                </div>
                              </div>                       */}
                              <div className="col-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">Address</label>
                                  <input name="Address" value={registerData.Address} onChange={handleRegistrationInput} className="form-control floating" tabIndex={1} type="text" />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label">City</label>
                                  <input name="City" value={registerData.City} onChange={handleRegistrationInput} className="form-control floating" tabIndex={1} type='text'/>
                                </div>
                              </div>
                            </div>
    
                            <div className="row gx-2">
                              <div className="col-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label"><b className='text-danger'>* </b>State</label>
                                  <select name="State" value={registerData.State} onChange={(e) => handleStateDropdown(e.target.value)} required tabIndex={1} className="form-control floating">
                                    <option value="">-Select-</option>
                                    {statesList.map(item => (<option key={item.CodeId} value={parseInt(item.CodeId)}>{item.Description}</option>))}
                                  </select>
                                </div>
                              </div>

                              <div className="col-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label"><b className='text-danger'>* </b>Pin Code</label>
                                  <input name="Pin" value={registerData.Pin} onChange={(e) => handleNumberInputs(e, setRegisterData)} required className="form-control floating" tabIndex={1} type='text' maxLength={6} />
                                </div>
                              </div>
                            </div>
    
                            <div className="row gx-2">
                              <div className="col-md-6">
                                <div className="form-group form-focus focused">
                                  <label className="focus-label"><b className='text-danger'>* </b>Password</label>
                                  <input name="UserPassword" value={registerData.UserPassword} onChange={handleRegistrationInput} className="form-control floating" type="password" tabIndex={1} required autoComplete='off'/>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <p className='text-danger text-sm ps-1'>Enter a strong password to complete Registration and keep it for future logins.</p>
                              </div>
                            </div>                                          
                            <button type="submit" className="btn btn-primary d-block btnSave mx-auto fw-bold" style={{width: "10rem"}} tabIndex={1}>SUBMIT</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
    
    // ***** LoginModal component is not following mount and unmount pattern which prevents auto reset of the component. this needs to be solved.
    
    const mapStateToPropsTwo = (state) => {
      return { compCode: state.compCode, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, isLoading: state.isLoading, bookingInfo: state.bookingInfo, globalData: state.globalData, compInfo: state.compInfo };
    }
    
    export const ConnectedLoginModal = connect(mapStateToPropsTwo, {loginStatusAction, userInfoAction, loaderAction})(LoginModal);



    const ForgotPassword = ({ backToLogin }) => {

      const [forgotPasswordModal, setForgotPasswordModal] = useState({passwordRecoveryNumber: '', msg: ''});
      const [isPasswordSent, setPasswordSent] = useState(false);
      const compCode = useSelector(i => i.compCode);

      const handleForgotPasswordForm = (e) => {
        e.preventDefault();
        sendPassword();
      }

      const goToLogin = () => {
        backToLogin();
        setForgotPasswordModal({passwordRecoveryNumber: '', msg: ''});
        setPasswordSent(false);
      }

      const sendPassword = async () => {
        loaderAction(true);
        const res = await axios.get(`${BASE_URL}/api/UserAuth/Get?id=0&UN=${forgotPasswordModal.passwordRecoveryNumber}&CID=${compCode}&Type=FP`, {});
        loaderAction(false);
        if (res.data === 'Y') {
          setForgotPasswordModal(pre => ({...pre, passwordRecoveryNumber: '', msg: 'Your Password has been sent to your registered mobile number. please check !'}))
          setPasswordSent(true);
        } else {
          setForgotPasswordModal(pre => ({...pre, passwordRecoveryNumber: '', msg: 'This number is not Registered.'}))
        }
      }

      return (
        <form onSubmit={handleForgotPasswordForm} style={{fontSize: '1.2em'}} className='d-flex justify-content-center'>
          <div className='w-100'>
            <h4 className="card-title" style={{fontSize: '1em'}}>Reset Your Password.</h4>
            <div className="row gx-2">
              <div className="col-12">
                <div className="form-group form-focus focused" id="forgotPassword">
                  <label className="focus-label"><b className='text-danger'>* </b>Mobile Number</label>
                  <input name="passwordRecoveryNumber" onChange={(e) => handleNumberInputs(e, setForgotPasswordModal)} value={forgotPasswordModal.passwordRecoveryNumber} required className="form-control floating" tabIndex={1} id="password_recovery_number" maxLength={10} />
                </div>
                <p className="text-danger" style={{display: forgotPasswordModal.msg ? 'block' : 'none'}}>{forgotPasswordModal.msg}</p>
                <div className='d-flex gap-3 justify-content-end'>
                  <button onClick={() => goToLogin()} type="button" className="d-block btn btn-primary text-sm" style={{"minWidth": "9rem"}}>BACK TO LOGIN</button>
                  {!isPasswordSent && <button type="submit" className="d-block btn btn-primary text-sm" style={{"minWidth": "9rem"}}>GET PASSWORD</button>}
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    }