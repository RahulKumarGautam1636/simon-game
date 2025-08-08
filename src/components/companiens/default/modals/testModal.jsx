import { connect } from "react-redux";
import { userInfoAction, loaderAction, modalAction, compCodeAction } from "../../../../actions";
import { JQDatePicker, getDuration, handleNumberInputs, useFetch, createDate, stringToast, wait, getFrom } from "../utilities";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, initMember, memberLabel } from "../../../../constants";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { AutoComplete } from "../../ePharma/utilities";

const MemberForm = ({ compCode, loaderAction, modalAction, userInfo, userInfoAction, modalData }) => {

    const [statesList, setStatesList] = useState([{Description: 'West Bengal', CodeId: 3}]);
    // const [startDate, setStartDate] = useState(new Date());
    // const [specializations, setSpecializations] = useState({isFieldOpen: false, data: []});
    const genderData = useFetch(`${BASE_URL}/api/Values/Get`, compCode)[0];
    const editId = modalData.editId;

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
        if (editId) {
            const item = userInfo.MembersList.AccPartyMemberMasterList.find(i => i.MemberId === editId);
            console.log(item);
            let newItem = {
                Salutation: item.Salutation ? item.Salutation : '',
                MemberName : item.MemberName ? item.MemberName : '',
                EncCompanyId: item.EncCompanyId ? item.EncCompanyId : userInfo.EncCompanyId,
                RegMob1: userInfo.RegMob1,
                Gender: item.Gender ? item.Gender : '',
                GenderDesc: item.GenderDesc ? item.GenderDesc : '',
                Address: item.Address ? item.Address : '',
                Age: item.Age ? item.Age : 0,
                AgeMonth: item.AgeMonth ? item.AgeMonth : 0,
                AgeDay: item.AgeDay ? item.AgeDay : 0,

                State: item.State ? item.State : '',
                City: item.City ? item.City : '',
                Pin: item.Pin ? item.Pin : '',
                Landmark: item.Landmark ? item.Landmark : '',

                IsDefault: item.IsDefault,
                
                ParentUserId: item.ParentUserId,
                MemberId: item.MemberId,
                MemberTypeId : item.MemberTypeId ? item.MemberTypeId : '',
                UserType: item.UserType ? item.UserType : uType.PATIENT.level,
                UID: item.UID ? item.UID : '',
                UserId: item.UserId,
                
                DOB: new Date(item.DOB).toLocaleDateString('en-TT'),
                DOBstr: new Date(item.DOB).toLocaleDateString('en-TT'),
                IsDOBCalculated: item.IsDOBCalculated ? item.IsDOBCalculated : '',
                Aadhaar: item.Aadhaar ? item.Aadhaar : '',
                ParentAadhaar1: item.ParentAadhaar1 ? item.ParentAadhaar1 : '',
                ParentAadhaar2: item.ParentAadhaar2 ? item.ParentAadhaar2 : '',
                RelationShipWithHolder: item.RelationShipWithHolder ? item.RelationShipWithHolder : '',
                Country: 1,
                Mobile: item.Mobile ? item.Mobile : '',

                Mobile2: item.Mobile2 ? item.Mobile2 : '',
                GstIn: item.GstIn || '',
                LicenceNo: item.LicenceNo || '',
                ContactPerson: item.ContactPerson || '',
                BusinessType: item.BusinessType || '',

                // UserRegTypeId: item.UserRegTypeId
                PartyId: userInfo.PartyId,
                LinkAutoId: item.LinkAutoId                               // When doctor add the member.
            }
            console.log(newItem);
            setMemberData(newItem);
        }
    }, [editId])

    const [memberData, setMemberData] = useState({
        ...initMember,
        EncCompanyId: userInfo.EncCompanyId,    
        RegMob1: userInfo.RegMob1,
        ParentUserId: userInfo.UserId,
        UserType: userInfo.UserType,
        PartyId: userInfo.PartyId,

        UnderDoctId: 0,
        ReferrerId: 0,
        ProviderId: 0,
        MarketById: 0,
    })

    const marketing = 55;
    const salesExecutive = 56;
    const refBy = 57;
    const provider = 58;

    const [fields, setFields] = useState({
        [marketing]: { label: '', active: false },
        [salesExecutive]: { label: '', active: false },
        [refBy]: { label: '', active: false },
        [provider]: { label: '', active: false },
    });

    console.log(memberData);
    console.log(fields);

    const compUserDetail = userInfo.UserCompList.UserDetails;

    useEffect(() => {
        let role = {};
        if (userInfo.UserLevelSeq == marketing) {
            role = { 
                MarketedId: compUserDetail.SubCode, 
            }
            setFields(pre => ({...pre, [marketing]: { label: userInfo.UserFullName, active: true }}))
        } else if (userInfo.UserLevelSeq == salesExecutive) {
            role = {
                UnderDoctId: compUserDetail.SubCode,
                MarketedId: compUserDetail.MarketById,
            }
            setFields(pre => ({...pre, [salesExecutive]: { label: userInfo.UserFullName, active: true }, [marketing]: { label: compUserDetail.MarketByDesc, active: true }}))
        } else if (userInfo.UserLevelSeq == refBy) {
            role = {
                ReferrerId: compUserDetail.SubCode,
                MarketedId: compUserDetail.MarketById,
            }
            setFields(pre => ({...pre, [refBy]: { label: userInfo.UserFullName, active: true }, [marketing]: { label: compUserDetail.MarketByDesc, active: true }}))
        } else if (userInfo.UserLevelSeq == provider) {
            role = {
                ProviderId: compUserDetail.SubCode,
                MarketedId: compUserDetail.MarketById,
            }
            setFields(pre => ({...pre, [provider]: { label: userInfo.UserFullName, active: true }, [marketing]: { label: compUserDetail.MarketByDesc, active: true }}))
        }
        if (Object.keys(role).length) setMemberData(pre => ({ ...pre, ...role }));
    }, [userInfo, compUserDetail])

    const handleMemberFormSubmit = (e) => {
        e.preventDefault();
        console.log(memberData);
        makeAddMemberRequest(memberData);
    }

    const makeAddMemberRequest = async (params) => {
        console.log(params);
        loaderAction(true);
        const res = await axios.post(`${BASE_URL}/api/member/Post`, params);
        loaderAction(false);
        if (res.data[0] !== 'N') {
          stringToast('Successfully Updated the member.', { type: 'success' });
          getMembersList(compCode, userInfo.UserId);
          modalAction('MEMBER_MODAL', false);
        } else {
          alert('Something went wrong, try again later.');
        }
    }

    const handleMemberInput = (e) => {
        const { name, value } = e.target;
        setMemberData(pre => ({...pre, [name]: value}));  
    }

    const toggleGender = (e) => {
        let val = e.target.value;
        let female = ['Ms', 'Mrs', 'Miss'];
        if (female.includes(val)) {
            setMemberData(preValue => {
                return {...preValue, Gender: 105, GenderDesc: 'Female'};
            });
        } else {
            setMemberData(preValue => {
                return {...preValue, Gender: 104, GenderDesc: 'Male'};
            });
        }
    }

    const getMembersList = async (companyCode, userId) => {
        if (!userId) return;
        try {      
          loaderAction(true);
          const res = await axios.get(`${BASE_URL}/api/member/Get?UserId=${userId}&CID=${companyCode}`, {});
          if (res.data) {
            if (userInfo.selectedMember.MemberId) {
                let selectedMember = res.data.AccPartyMemberMasterList.find(i => i.MemberId === userInfo.selectedMember.MemberId);
                userInfoAction({ MembersList: res.data, selectedMember: selectedMember });
            } else {
                userInfoAction({ MembersList: res.data });
            }
          }
        } catch (error) {
          alert('Something went wrong please Refresh or try after some time.');
        }
        loaderAction(false);
    }

    const handleDate = (props) => {
        const { Age, AgeMonth, AgeDay, currField, currValue }  = props;
    
        if (currField === 'Age') {
          if (currValue !== '' && AgeDay !== '' && AgeMonth !== '') {
            const calculatedDOB = createDate(AgeDay, AgeMonth, currValue);
            setMemberData(pre => ({...pre, DOB: calculatedDOB, DOBstr: calculatedDOB, IsDOBCalculated: 'Y'}));
          }
        } else if (currField === 'AgeDay') {
          if (Age !== '' && currValue !== '' && AgeMonth !== '') {
            const calculatedDOB = createDate(currValue, AgeMonth, Age);
            setMemberData(pre => ({...pre, DOB: calculatedDOB, DOBstr: calculatedDOB, IsDOBCalculated: 'Y'}));
          }
        } else if (currField === 'AgeMonth') {
          if (Age !== '' && AgeDay !== '' && currValue !== '') {
            const calculatedDOB = createDate(AgeDay, currValue, Age);
            setMemberData(pre => ({...pre, DOB: calculatedDOB, DOBstr: calculatedDOB, IsDOBCalculated: 'Y'}));
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
            let currValues = { Age: memberData.Age, AgeMonth: memberData.AgeMonth, AgeDay: memberData.AgeDay, currField: name, currValue: value };
            handleDate(currValues);
        }
    }

    
    // useEffect(() => {
    //     const handleDate = () => {
    //         if (memberData.Age && memberData.AgeDay && memberData.AgeMonth) {
    //             const calculatedDOB = createDate(memberData.AgeDay, memberData.AgeMonth, memberData.Age);
    //             setMemberData(pre => ({...pre, DOB: calculatedDOB, IsDOBCalculated: 'Y'}));
    //         }
    //     }
    //     handleDate();
    // }, [memberData.Age,  memberData.AgeDay, memberData.AgeMonth])

    const calculateDuration = (date) => {
        setMemberData(pre => ({ 
            ...pre, IsDOBCalculated: 'N', 
            Age: getDuration(date).years, 
            AgeMonth: getDuration(date).months, 
            AgeDay: getDuration(date).days, 
            DOB: date,
            DOBstr: date
        }))
    }

    const handleMemberPhone = (e) => {
        setMemberData(pre => ({...pre, Mobile: e.target.value}));
        // getExistingMember(e.target.value, compCode)
        getSearchResult(e.target.value, compCode);
    }

    // const getExistingMember = async (phone, companyCode) => {
    //     if (phone.length < 10) return;
    //     try {      
    //         loaderAction(true);
    //         const res = await axios.get(`${BASE_URL}/api/Member/GetMemberByMobileNo?MobileNo=${phone}&CID=${companyCode}`, {});
    //         await wait(1000);
    //         loaderAction(false);
    //         let item = res.data.AccPartyMemberMasterList[0];
    //         if (!item.MemberId) return console.log('No Existing member found.');
    //         let newItem = {
    //             Salutation: item.Salutation ? item.Salutation : '',
    //             MemberName : item.MemberName ? item.MemberName : '',
    //             EncCompanyId: item.EncCompanyId ? item.EncCompanyId : userInfo.EncCompanyId,
    //             RegMob1: userInfo.RegMob1,
    //             Gender: item.Gender ? item.Gender : '',
    //             GenderDesc: item.GenderDesc ? item.GenderDesc : '',
    //             Address: item.Address ? item.Address : '',
    //             Age: item.Age ? item.Age : 0,
    //             AgeMonth: item.AgeMonth ? item.AgeMonth : 0,
    //             AgeDay: item.AgeDay ? item.AgeDay : 0,

    //             State: item.State ? item.State : '',
    //             City: item.City ? item.City : '',
    //             Pin: item.Pin ? item.Pin : '',
    //             Landmark: item.Landmark ? item.Landmark : '',

    //             IsDefault: item.IsDefault,
                
    //             ParentUserId: item.ParentUserId,
    //             MemberId: item.MemberId,
    //             MemberTypeId : item.MemberTypeId ? item.MemberTypeId : '',
    //             UserType: item.UserType ? item.UserType : uType.PATIENT.level,
    //             UID: item.UID ? item.UID : '',
    //             UserId: item.UserId,
                
    //             DOB: new Date(item.DOB).toLocaleDateString('en-TT'),
    //             DOBstr: new Date(item.DOB).toLocaleDateString('en-TT'),
    //             IsDOBCalculated: item.IsDOBCalculated ? item.IsDOBCalculated : '',
    //             Aadhaar: item.Aadhaar ? item.Aadhaar : '',
    //             ParentAadhaar1: item.ParentAadhaar1 ? item.ParentAadhaar1 : '',
    //             ParentAadhaar2: item.ParentAadhaar2 ? item.ParentAadhaar2 : '',
    //             RelationShipWithHolder: item.RelationShipWithHolder ? item.RelationShipWithHolder : '',
    //             Country: 1,
    //             Mobile: item.Mobile ? item.Mobile : '',

    //             Mobile2: item.Mobile2 ? item.Mobile2 : '',
    //             GstIn: item.GstIn || '',
    //             LicenceNo: item.LicenceNo || '',
    //             ContactPerson: item.ContactPerson || '',
    //             BusinessType: item.BusinessType || '',

    //             // UserRegTypeId: item.UserRegTypeId,
    //             PartyId: userInfo.PartyId
    //         }
    //         console.log(newItem);
    //         setMemberData(newItem);
    //     } catch (error) {
    //         alert('Something went wrong please try after some time.');
    //     }
    // }

    const [isListActive, setListActive] = useState(false); 
    const [autoCompleteList, setAutoCompleteList] = useState({loading: false, data: {AccPartyMemberMasterList: []}, err: {status: false, msg: ''}});

    const Card_4 = ({ data }) => (
        <div key={data.PartyId} className="pointer" style={{padding: '0.7em 1.2em'}}>
            {data.MemberName}
            {/* <p style={{lineHeight: '1.1', fontSize: '0.9em', marginBottom: 1}}>{data.RelationShipWithHolder}</p> */}
        </div>
    )

    const renderDocorAutoComplete = () => {
        if (autoCompleteList.loading) return <Skeleton style={{fontSize: '2em'}} count={10}/>

        return autoCompleteList.data.AccPartyMemberMasterList.map(i => (<Card_4 data={i} />));
    }

    const getSearchResult = async (phone, companyCode) => {   
        if (phone.length < 10) return;                                     
        setListActive(true);
        const res = await getFrom(`${BASE_URL}/api/Member/GetMemberByMobileNo?MobileNo=${phone}&CID=${companyCode}`, {}, setAutoCompleteList);
        await wait(1000);
        if (res) {
            setAutoCompleteList(res);
        } else {
            console.log('No data received');
        }
    }  

    const handleSelect = (item) => {

        let memberExist = userInfo.MembersList.AccPartyMemberMasterList.find(i => i.MemberId === item.MemberId);
        if (memberExist) return alert('This Member is Already added.');

        let newItem = {
            Salutation: item.Salutation ? item.Salutation : '',
            MemberName : item.MemberName ? item.MemberName : '',
            EncCompanyId: item.EncCompanyId ? item.EncCompanyId : userInfo.EncCompanyId,
            RegMob1: userInfo.RegMob1,
            Gender: item.Gender ? item.Gender : '',
            GenderDesc: item.GenderDesc ? item.GenderDesc : '',
            Address: item.Address ? item.Address : '',
            Age: item.Age ? item.Age : 0,
            AgeMonth: item.AgeMonth ? item.AgeMonth : 0,
            AgeDay: item.AgeDay ? item.AgeDay : 0,

            State: item.State ? item.State : '',
            City: item.City ? item.City : '',
            Pin: item.Pin ? item.Pin : '',
            Landmark: item.Landmark ? item.Landmark : '',

            IsDefault: item.IsDefault,
            
            ParentUserId: userInfo.UserId,
            MemberId: item.MemberId,
            MemberTypeId : item.MemberTypeId ? item.MemberTypeId : '',
            UserType: item.UserType ? item.UserType : uType.PATIENT.level,
            UID: item.UID ? item.UID : '',
            UserId: item.UserId,
            
            DOB: new Date(item.DOB).toLocaleDateString('en-TT'),
            DOBstr: new Date(item.DOB).toLocaleDateString('en-TT'),
            IsDOBCalculated: item.IsDOBCalculated ? item.IsDOBCalculated : '',
            Aadhaar: item.Aadhaar ? item.Aadhaar : '',
            ParentAadhaar1: item.ParentAadhaar1 ? item.ParentAadhaar1 : '',
            ParentAadhaar2: item.ParentAadhaar2 ? item.ParentAadhaar2 : '',
            RelationShipWithHolder: item.RelationShipWithHolder ? item.RelationShipWithHolder : '',
            Country: 1,
            Mobile: item.Mobile ? item.Mobile : '',

            Mobile2: item.Mobile2 ? item.Mobile2 : '',
            GstIn: item.GstIn || '',
            LicenceNo: item.LicenceNo || '',
            ContactPerson: item.ContactPerson || '',
            BusinessType: item.BusinessType || '',

            // UserRegTypeId: item.UserRegTypeId,
            PartyId: userInfo.PartyId,
            LinkAutoId: item.LinkAutoId                             // When doctor add the member.
        }
        console.log(newItem);
        setMemberData(newItem);
    }

    // AUTOCOMPLETE 2 ----------------------------------------------------------------------------------------

    const userTypes = ['doctor', 'provider', 'collector', 'referrer'];

    return (
        <div className="row" id="divEnqDataContent">
            <form className="bg-white rounded pt-2" onSubmit={handleMemberFormSubmit} id="registrationForm">
                <div className="col-md-12 pt-1">
                    <i className='bx bx-x-circle float-right-corner' style={{top: '0.5em', right: '0.4em', fontSize: '1.5em', transform: 'none'}} onClick={() => modalAction('MEMBER_MODAL', false)}></i>
                    <div>
                        <h4 className="card-title position-relative">
                            <span className="side-marker"></span>
                            <span className="bg-white pe-2">Registration Details</span>
                        </h4>
                        <div className="row gx-1 gx-md-2">
                            <div className="col-6 col-md-4">
                                <div className="form-group form-focus focused" id="lblMobile1">
                                    <label className="focus-label"><b className='text-danger'>* </b>Mobile Number</label>
                                    <input name="RegMob1" readOnly value={memberData.RegMob1} required className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={10} />
                                </div>
                            </div>
                            <div className="col-6 col-md-4 position-relative">
                                <div className="form-group form-focus focused" id="lblMobile1">
                                    <label className="focus-label">{memberLabel} Mobile No.</label>
                                    {userTypes.includes(userInfo.UserType.toLowerCase()) ? 
                                        <input name="Mobile" value={memberData.Mobile} onChange={handleMemberPhone} className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={10} />
                                        :
                                        <input name="Mobile" value={memberData.Mobile} onChange={(e) => handleNumberInputs(e, setMemberData)} className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={10} />
                                    }
                                </div>
                                {/* {isListActive && <div className='search-results-1 active' style={{zIndex: 1111}}>
                                    <ul className='mb-0'>
                                        {renderDocorAutoComplete()}
                                    </ul>
                                </div>}
                                {isListActive && <span onClick={() => setListActive(false)} style={{position: 'fixed', zIndex: 111, inset: '0'}}></span>} */}
                                {isListActive && <AutoComplete name='search-results' list={autoCompleteList.data.AccPartyMemberMasterList} isLoading={autoCompleteList.loading} setActive={setListActive} cardClick={handleSelect} children={<Card_4 />} keyName={'ItemId'} styles={{zIndex: 1111}} variant={2} />}
                            </div>
                            <div className="col-12 col-md-4">
                                {/* {userInfo.UserType === uType.PROVIDER.level ? 
                                    <div className="form-group form-focus focused" id="lblMobile1">
                                        <label className="focus-label">Relation</label>
                                        <input name="RelationShipWithHolder" value={memberData.RelationShipWithHolder} onChange={handleMemberInput} className="form-control floating" tabIndex={1} id="txtMobileNo1" />
                                    </div>
                                : 
                                    <div className="form-group form-focus focused" id="lblMobile1">
                                        <label className="focus-label"><b className='text-danger'>* </b>Relation</label>
                                        <input name="RelationShipWithHolder" value={memberData.RelationShipWithHolder} onChange={handleMemberInput} required className="form-control floating" tabIndex={1} id="txtMobileNo1" />
                                    </div>
                                } */}

                                {userInfo.UserType.toLowerCase() === 'patient' && 
                                    <div className="form-group form-focus focused" id="lblMobile1">
                                        <label className="focus-label"><b className='text-danger'>* </b>Relation</label>
                                        <input name="RelationShipWithHolder" value={memberData.RelationShipWithHolder} onChange={handleMemberInput} required className="form-control floating" tabIndex={1} id="txtMobileNo1" />
                                    </div>
                                }
                            </div>
                            {/* <div className="col-6">
                                <div className="form-group form-focus focused" id="lblMobile1">
                                    <label className="focus-label"><b className='text-danger'>* </b>Aadhaar Number</label>
                                    <input name="Aadhaar" value={memberData.Aadhaar} onChange={(e) => handleNumberInputs(e, setMemberData)} required className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={12} />
                                </div>
                            </div> */}
                        </div>
                        {/* {!memberData.Aadhaar && <div className="row gx-1 gx-md-2">
                            <div className="col-6">
                                <div className="form-group form-focus focused" id="lblMobile1">
                                    <label className="focus-label"><b className='text-danger'>* </b>Father's Aadhaar</label>
                                    <input name="ParentAadhaar1" value={memberData.ParentAadhaar1} onChange={(e) => handleNumberInputs(e, setMemberData)} required className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={12} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group form-focus focused" id="lblMobile1">
                                    <label className="focus-label"><b className='text-danger'>* </b>Mother's Aadhaar</label>
                                    <input name="ParentAadhaar2" value={memberData.ParentAadhaar2} onChange={(e) => handleNumberInputs(e, setMemberData)} required className="form-control floating" tabIndex={1} id="txtMobileNo1" maxLength={12} />
                                </div>
                            </div>
                        </div>} */}
                    </div>

                    <div>
                        <h4 className="card-title position-relative">
                            <span className="side-marker"></span>
                            <span className="bg-white pe-2">Personal Information</span>
                        </h4>
                        <div className="row gx-1 gx-md-2">
                            <div className="col-4">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label"><b className='text-danger'>* </b>Salutation</label>
                                    <select name="Salutation" value={memberData.Salutation} required onChange={(e) => {handleMemberInput(e); toggleGender(e);}} id="ddlSalutation" tabIndex={1} className="form-control">
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
                                    <input name="MemberName" value={memberData.MemberName} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type="text" required/>
                                </div>
                            </div>

                            <div className="col-3">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label"><b className='text-danger'>* </b>Gender</label>
                                    <select name="Gender" value={memberData.Gender} onChange={handleMemberInput} required tabIndex={1} className="form-control floating">
                                    <option value="">-Select-</option>
                                    {genderData.map(item => (<option key={item.CodeId} value={item.CodeId}>{item.Description}</option>))}
                                    </select>
                                    <input type="hidden" defaultValue id="hdnGender" />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label"><b className='text-danger'>* </b>DOB</label>
                                    {/* <DatePicker 
                                        selected={new Date(memberData.DOB)}
                                        // onChange={(date) => setMemberData(pre => ({ ...pre, DOB: date ? date.toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10)}))}
                                        onChange={(date) => {setMemberData(pre => ({ ...pre, IsDOBCalculated: 'N', Age: getDuration(date?.toLocaleDateString('fr-CA')).years, AgeMonth: getDuration(date?.toLocaleDateString('fr-CA')).months, AgeDay: getDuration(date?.toLocaleDateString('fr-CA')).days, DOB: date ? date.toLocaleDateString('fr-CA') : new Date().toLocaleDateString('fr-CA')})); console.log(date)}}
                                        showYearDropdown                                                                                                                                                                                                                                                                                                   // null is possible but it gives 01/01/1970.
                                        dateFormatCalendar="MMMM"
                                        yearDropdownItemNumber={100}
                                        scrollableYearDropdown
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                        // isClearable={true}
                                    /> */}
                                    <JQDatePicker id={'member_DOB'} isRequired={true} setState={setMemberData} handler={calculateDuration} curValue={memberData.DOB} name={'DOB'} customClass={'form-control'} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label">Years</label>
                                    <input name="Age" value={memberData.Age} onChange={(e) => handleNumberInputsWithDate(e, setMemberData)} className="form-control floating" tabIndex={1} type='text' maxLength={2} id="txtPtAge" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label">Months</label>
                                    <input name="AgeMonth" value={memberData.AgeMonth} onChange={(e) => handleNumberInputsWithDate(e, setMemberData)} className="form-control floating" tabIndex={1} type='text' maxLength={2} id="txtPtAgeMonth"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label">Days</label>
                                    <input name="AgeDay" value={memberData.AgeDay} onChange={(e) => handleNumberInputsWithDate(e, setMemberData)} className="form-control floating" tabIndex={1} type='text' maxLength={2} id="txtPtAgeDay"/>
                                </div>
                            </div>
                        </div>
                        <h4 className="card-title position-relative">
                            <span className="side-marker"></span>
                            <span className="bg-white pe-2">Address Details</span>
                        </h4>
                        <div className="row gx-1 gx-md-2">
                            {/* <div className="col-6">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label">Apartment / Flat no.</label>
                                    <input name="Landmark" value={memberData.Landmark} onChange={handleMemberInput} className="form-control floating" tabIndex={1} autoComplete="off"/>
                                </div>
                            </div>                       */}
                            <div className="col-6">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label">Address</label>
                                    <input name="Address" value={memberData.Address} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type="text" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label">City</label>
                                    <input name="City" value={memberData.City} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type='text'/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label"><b className='text-danger'>* </b>State</label>
                                    <select name="State" value={memberData.State} onChange={handleMemberInput} required tabIndex={1} className="form-control floating">
                                        <option value="">-Select-</option>
                                        {statesList.map(item => {
                                            return (
                                            <option key={item.CodeId} value={parseInt(item.CodeId)}>{item.Description}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="col-6">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label"><b className='text-danger'>* </b>Pin Code</label>
                                    <input name="Pin" value={memberData.Pin} onChange={(e) => handleNumberInputs(e, setMemberData)} required className="form-control floating" tabIndex={1} type='text' maxLength={6} />
                                </div>
                            </div>
                            {/* <div className="col-3">
                                <div className="form-group form-focus focused">
                                    <label className="focus-label"><b className='text-danger'>* </b>Country</label>
                                    <input name="Country" value={memberData.country} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type="text" />
                                </div>
                            </div> */}
                        </div>

                        <h4 className="card-title position-relative">
                            <span className="side-marker"></span>
                            <span className="bg-white pe-2">Other Details</span>
                        </h4>
                        <div className="row gx-1 gx-md-2">                 
                            <div className={`col-6 ${fields[marketing].active && 'pe-none'}`}>
                                <div className="form-group form-focus focused">
                                    <label className="focus-label"><b className='text-danger'>* </b>Executive</label>
                                    <input name="UnderDoctId" value={fields[marketing].label} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type="text" />
                                </div>
                            </div>
                            <div className={`col-6 ${fields[salesExecutive].active && 'pe-none'}`}>
                                <div className="form-group form-focus focused">
                                    <label className="focus-label">Partner</label>
                                    <input name="ReferrerId" value={fields[salesExecutive].label} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type='text'/>
                                </div>
                            </div>
                            <div className={`col-6 ${fields[refBy].active && 'pe-none'}`}>
                                <div className="form-group form-focus focused">
                                    <label className="focus-label">Referrer</label>
                                    <input name="ProviderId" value={fields[refBy].label} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type='text'/>
                                </div>
                            </div>                            
                            <div className={`col-6 ${fields[provider].active && 'pe-none'}`}>
                                <div className="form-group form-focus focused">
                                    <label className="focus-label"><b className='text-danger'>* </b>Business Executive</label>
                                    <input name="MarketById" value={fields[provider].label} onChange={handleMemberInput} className="form-control floating" tabIndex={1} type='text'/>
                                </div>
                            </div>
                        </div>
  
                        <button type="submit" className="btn btn-primary d-block btnSave mx-auto fw-bold" style={{width: "10rem"}} tabIndex={1}>SUBMIT</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToMemberForm = (state) => {
    return { compCode: state.compCode, userInfo: state.userInfo };
}
  
export default connect(mapStateToMemberForm, { userInfoAction, loaderAction, modalAction })(MemberForm);