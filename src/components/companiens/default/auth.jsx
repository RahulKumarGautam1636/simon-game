import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { decrypt, encrypt, validRegType } from "./utilities";
import axios from "axios";
import { loginStatusAction, userInfoAction, compCodeAction, modalAction } from "../../../actions";
import { BASE_URL } from "../../../constants";
import { InactiveWarningCard, Spinner } from "../ePharma/utilities";
import { toast } from "react-toastify";
import { uType } from "../../utils/utils";
import qs from 'query-string';


const Authentication = ({ compCode, vType, bookingInfo, modalAction, loginStatusAction, userInfoAction, compCodeAction, history, globalData }) => {

  const [loading, setLoading] = useState(false);
    
  useEffect(() => {
    autoLogin(compCode);
  }, [compCode])

  const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true, decode: false });

  function autoLogin(companyCode) {
    let user = {};

    if (queryString.slugKey) {
      let slug = decrypt(queryString.slugKey);
      if (!slug) return alert('Something went wrong, unable to log you in.');
      localStorage.setItem('userLoginData', queryString.slugKey);
      user = slug
    } else {
      user = decrypt(localStorage.getItem('userLoginData'));
    }

    if (companyCode !== '') {
      if (user) {
        compareCompCodes(companyCode, user); 
      } else {
        console.log('Prepare Fresh Login');
        handleNewUser()
      }
    } else {
      console.log('No root compcode found');
      saveAndLoginUser(user);
    }
  }
  function compareCompCodes(currCompCode, user) {              
    if (currCompCode === user.compCode) {
      saveAndLoginUser(user);
      return;
    }
    console.log('Company code Mismatch.');
    handleNewUser();
  }

  const saveAndLoginUser = (savedData) => {
    if (savedData && savedData.phone) {
      console.log('Logging you in! Please wait.');        
      makeLoginRequest({ phone: savedData.phone, password: savedData.password, companyCode: savedData.compCode });
    } else {
      handleNewUser();    
    }
  }

  const makeLoginRequest = async (params) => {
    const body = { UserName: params.phone, UserPassword: params.password, EncCompanyId: params.companyCode };
    setLoading(true);
    // const res = await axios.get(`${BASE_URL}/api/UserAuth/Get?UN=${params.phone}&UP=${params.password}&CID=${params.companyCode}`);
    const res = await axios.post(`${BASE_URL}/api/UserAuth/CheckCompLogin`, body);
    setLoading(false);
    const data = res.data[0];
    // let appBusinessType = globalData.businessType.CodeValue;     
    // if (res.data.BusinessType !== appBusinessType) return alert('You are not Allowed to log in.');       // BLOCK LOGIN IF MISMATCH FOUND  


    if (!validRegType(data.UserRegTypeId, false)) return;      // don't check in OPD module.

    
    if (data.Remarks === 'INVALID') {
      console.log('The username or password is incorrect.');
      handleNewUser();
    } else if (!validRegType(data.UserRegTypeId)) {
      return;
    } else if (data.Remarks === 'NOTINCOMPANY') {
      console.log('Not Registered in this company.')
      handleNewUser();
    } else if (data.Remarks === 'INACTIVE') {
      toast(<InactiveWarningCard />, { position: "top-center", autoClose: false, closeButton: false, className: 'product-toast' });
    } else if (data.UserId) {
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
          AnniversaryDate: data.AnniversaryDate,
          Aadhaar: data.Aadhaar,
          IsDOBCalculated: data.IsDOBCalculated,

          compName: data.compName ? data.compName: '',
          compAddress: data.compAddress ? data.compAddress: '',
          compState: data.compState ? data.compState: '',
          compPin: data.compPin ? data.compPin: '',
          compPhone1: data.compPhone1 ? data.compPhone1: '',
          compPhone2: data.compPhone2 ? data.compPhone2: '',
          compMail: data.compMail ? data.compMail: '',
          UserPassword: data.UserPassword,

          RegMob2: data.RegMob2 || '',
          GstIn: data.GstIn || '',
          LicenceNo: data.LicenceNo || '',
          ContactPerson: data.ContactPerson || '',
          BusinessType: data.BusinessType || '',

          UserLevelSeq: data.UserLevelSeq,  //  58, // 
          UserCompList: data.UserCompList[0],
      };
      userInfoAction(userLoginData);
      modalAction('LOGIN_MODAL', false, {mode: uType.PATIENT.level});
      loginStatusAction(true);
    }
  }

  const handleNewUser = () => {
    loginStatusAction(false);
    // if (vType === 'RESTAURANT') { 
    //   history.push('/login');
    // }
  }

  if (loading) {
    return (
      <div className="absolute inset-0 z-[90000] bg-[#4b4b4b66]">
        <Spinner min_height='25rem' fSize='2.5rem' />
      </div>
    )
  }
  return null;
}


const mapStateToAuth = (state) => {
  return { compCode: state.compCode, compInfo: state.compInfo, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, cart: state.cart, siteData: state.siteData, bookingInfo: state.bookingInfo, globalData: state.globalData, vType: state.vType};
}
  
export default connect(mapStateToAuth, {loginStatusAction, userInfoAction, compCodeAction, modalAction})(Authentication);
