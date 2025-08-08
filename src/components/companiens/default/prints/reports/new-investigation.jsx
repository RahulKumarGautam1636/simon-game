// import { useEffect, useState } from "react";
// import { getFrom, handleNumberInputs, MyModal, useTimer } from "../../utilities";
// import { loaderAction } from "../../../../../actions";
// import { BASE_URL, initMember, initReg, SRC_URL, XYZ_ID, HEXAGON_ID } from "../../../../../constants";
// import axios from "axios";
// import { Spinner } from "../../../ePharma/utilities";
// import { Link } from "react-router-dom";
// import { uType } from "../../../../utils/utils";

// const Investigation = ({ id, compCode }) => {

//     // http://localhost:3000/?CID=4K%2Bip4H91KicEh1TMAw9Rw==#/reports?type=INVESTIGATION&id=1622065

//     // http://localhost:3000/#/reports?type=INVESTIGATION&id=2008830

//     const styles = `
//         p {
//             font-size: 0.93em;
//             margin-bottom: 0em;
//             font-weight: 600;
//         } 
//         table {
//             width: 100%;
//         }
//         thead {
//             background: white;
//         }
//         .cell-borders td, .cell-borders th {
//             border: 1px solid #cdcdcd;
//         }
//         .overview td, .overview th {
//             padding: 0px 4px;
//             font-weight: 600;
//         }
//         h4 {
//             font-size: 1.35em;
//             font-weight: 800;
//         }
//         h5, h6 {
//             font-size: 1.05em;
//             font-weight: 800;
//             color: black;
//         }
//         .h6 {
//             font-size: 0.95em;
//         }
//         .challan td {
//             padding: 0 0 0 7px;
//         }
//         .challan h6 {
//             font-weight: 700;
//             font-size: 0.93em;
//         }
//         .items-table th {
//             background: #29a9bf;
//             font-weight: 900;
//             border: 1px solid #127687;
//             line-height: 2em;
//             color: white;
//         }
//         .table-head p {
//             line-height: 1.4em;
//         }

//         .app-container > *:not(.app-content) {				
//             display: none;
//         }
//     `

//     const [isVerified, setVerified] = useState(true);       // open close state of verification modal.
//     const [openReport, setOpenReport] = useState({ state: false, billId: '', autoId: '' });

//     // Copied from invoices/default ----------------------------------------------------------------------------------------------------------------------------

//     const [data, setData] = useState({loading: true, data: { SalesObj: {CompanyMaster: {}, SalesDetailsList: [], VoucherList: []} }, err: {status: false, msg: ''}});
    
//     useEffect(() => {
//         getData(id)
//     }, [id])

//     const getData = async (query) => {
//         if (query) {
//             const res = await getFrom(`${BASE_URL}/api/Appointment/GetBill?BilId=${query}&CID=${compCode}`, {}, setData);
//             if (res) {
//             setTimeout(() => {
//                 setData(res);            
//             }, 400)
//             }
//         }
//     }

//     const renderData = (data) => {
//         if (data.loading) {
//             return <Spinner min_height='31rem' fSize='2rem'/>;
//         } else if (data.err.status) {
//             return <h2 className="text-danger mark">An error occured, please try again later. Error code: <span className="text-dark d-inline">{data.err.msg}</span></h2>;
//         } else if (!data.data.SalesObj) {
//             return <h2 className="text-danger py-2">No Data Received !</h2>;
//         } else {
//             return prescriptionPage(data.data.SalesObj);
//         }
//     }

//     const prescriptionPage = (i) => {

//         return (
//             <div className="d-flex justify-content-center overview" id="printContent">
//                 <div className={`card A4page m-4 w-100 ${openReport.state ? 'd-none' : ''}`} style={{minHeight: 'unset', maxWidth: 500}}>                      
//                     <div className="card-body" style={{ padding: "1.25rem" }} >
//                         <table style={{ border: '1px solid gray' }} id="print-tabale" className="w-100 cell-borders">
//                             <thead className="table-head">
//                                 <tr>
//                                     <th colSpan={2} style={{background: '#ebfcff'}}>
//                                         <div className="d-flex gap-1 align-items-center">
//                                             <img className="me-2" style={{maxHeight: '7.5em', padding: '1em'}} src={`${SRC_URL}/Content/CompanyLogo/${i.CompanyMaster.LogoUrl}`} alt="logo" />
//                                             <div className="d-flex flex-column gap-1">
//                                                 <h4 className="m-0" style={{color: '#186773'}}>{i.CompanyMaster.COMPNAME}</h4>
//                                                 <h5 className="m-0" style={{color: '#229bad'}}>{i.CompanyMaster.CATCHLINE}</h5>
//                                                 <p>{i.CompanyMaster.ADDRESS}</p>
//                                                 <p>PH: {i.CompanyMaster.CONTACT1} {i.CompanyMaster.CONTACT2 && ` / ` + i.CompanyMaster.CONTACT2}</p>
//                                             </div>
//                                         </div>
//                                     </th>
//                                 </tr>
//                                 <tr>
//                                     <th><strong style={{fontSize: '0.9em'}}>UHID / MRD / Reg. No.</strong></th>
//                                     <th>{i.CpartyCode}</th>
//                                 </tr>
//                                 <tr>
//                                     <th><strong>Patient</strong></th>
//                                     <th> {i.PartyName}</th>
//                                 </tr>
//                                 <tr>
//                                     <th><strong>Age</strong></th>
//                                     <th>{i.Age} Years, <strong className="ms-5">Sex:</strong> {i.Gender}</th>
//                                 </tr>
//                                 <tr>
//                                     <th><strong>Ref. Doctor</strong></th>
//                                     <th>{i.ReferenceBy1}</th>
//                                 </tr>
//                                 <tr>
//                                     <th><strong>Invoice#</strong></th>
//                                     <th>
//                                         {i.VchNo}
//                                         {/* <Link className="text-primary text-decoration-underline" to={`/invoices/${i.BillId}`}>{i.VchNo}</Link> */}
//                                         <strong className="ms-5">Date:</strong> {new Date(i.VchDate).toLocaleDateString('en-TT')}
//                                     </th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 <tr>
//                                     <td colSpan={3} className="p-0">
//                                         <table className="items-table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>Test Name</th>
//                                                     <th className="text-nowrap text-center">Report Date</th>
//                                                     <th className="text-nowrap text-center">Status</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {i.SalesDetailsList.map((x, n) => (
//                                                     <tr key={x.Description}>
//                                                         {/* <td>{x + 1}</td> */}
//                                                         <td className="px-3 py-2">{x.Description}</td>	
//                                                         <td className="text-nowrap text-center px-3 py-2">{new Date(x.ReportDate).toLocaleDateString('en-TT')}</td>
//                                                         <td className="pointer text-nowrap px-3 py-2">{x.LabRecId > 0 ? <span className="text-info" onClick={() => setOpenReport({ state: true, billId: x.BillId, autoId: x.LabRecId })}>Done <i className="fas fa-eye ms-2"></i></span> : 'Pending'}</td> 
//                                                     </tr>
//                                                     // >
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     // Copied from invoices/default ends ----------------------------------------------------------------------------------------------------------------------------

//     return (
//         <>
//             <style>{styles}</style>
//             {!isVerified && renderData(data)}
//             {isVerified && <MyModal name='local-modal' handleClose={setVerified} customClass='' isStatic={true} child={<Verification patient={data.data.SalesObj} loaderAction={loaderAction} compCode={compCode} handleClose={setVerified} />} width="31em" closeIcon={false}/>}
//             {openReport.state && <ReportPad loaderAction={loaderAction} compInfo={data.data.SalesObj.CompanyMaster} compCode={compCode} handleClose={setOpenReport} billId={openReport.billId} autoId={openReport.autoId} />}
//         </>
//     )
// }
  
// export default Investigation;


// const Verification = ({ loaderAction, compCode, handleClose, patient }) => {

//     const [user, setUser] = useState({ phone: '', inputOtp: '', password: '' });
//     const [otp, setOtp] = useState({ recievedOtp: '', fieldOpen: false, sent: false, verified: false, userExist: false });
//     const [seconds, minutes, setTimer] = useTimer(30, otp.fieldOpen);

//     const handleInputs = (e) => {
//         const { name, value } = e.target;
//         setUser(pre => ({ ...pre, [name]: value }));
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!otp.sent) {
//             if (user.phone.length < 10) return alert('please enter a valid phone number.');
//             const receivedOtp = await makeOtpRequest(user);
//             setOtp(pre => ({...pre, fieldOpen: true, sent: true, recievedOtp: receivedOtp}));
//         } else if (otp.sent) {
//             if (String(otp.recievedOtp) !== String(user.inputOtp)) return alert('Wrong OTP.');
//             let userExist = await checkExistingUser(user);
//             if (userExist) {
//                 if (String(user.phone) === String(patient.PMobile)) {
//                     setOtp({...otp, fieldOpen: false, verified: true});
//                     handleClose(false);
//                     console.log('Patient verified.')
//                 } else {
//                     makeAddMemberRequest(user, compCode);
//                 }
//             } else {
//                 let isSuccess = makeRegisterationRequest(user, compCode);
//                 if (isSuccess) {
//                     setOtp({...otp, fieldOpen: false, verified: true});
//                     handleClose(false);
//                 } else {
//                     console.log('something went wrong (1123)');
//                 }
//             }
//         }
//     }

//     const makeOtpRequest = async (params) => {
//         // loaderAction(true);
//         // const res = await axios.get(`${BASE_URL}/api/UserReg/Get?id=0&name=Subscriber&mob=${params.phone}`);
//         // loaderAction(false);
//         // if (res.status === 200) {
//         //   console.log(`${res.data}`.split('').reverse().join(''));
//         //   return res.data;
//         // }
//         // alert('An Error Occured, Try again later.');
//         return 1;
//     }

//     const resendOTP = async () => {
//         if (user.phone.length < 10) return alert('please enter a valid phone number.');
//         const receivedOtp = await makeOtpRequest(user);
//         setOtp(pre => ({...pre, recievedOtp: receivedOtp}));
//         setTimer(30);
//     }

//     const checkExistingUser = async (params) => {
//         if (params.phone.length > 9) {
//           loaderAction(true);
//           const res = await axios.get(`${BASE_URL}/api/UserReg/Get?UN=${params.phone}`);
//           loaderAction(false);
//           if (res.data === 'Y') {
//             return true;
//           } else {
//             return false;
//           }
//         }
//     }

//     const makeRegisterationRequest = async (params, companyId) => {
//         let body = { 
//             ...initReg,
//             DOBstr: '01/10/1900',
//             RegMob1: params.phone, 
//             Name: 'User XX' + (params.phone).slice(7), 
//             UserPassword: '1234',
//             UserRegTypeId: 43198,
//             EncCompanyId: companyId,
//             UserType: uType.PATIENT.title
//         }

//         try {
//             loaderAction(true);
//             const res = await axios.post(`${BASE_URL}/api/UserReg/Post`, body);
//             loaderAction(false);
//             if (res.data[1].length > 3) { 
//                 console.log('Successfully Registered the User.')
//                 return true;
//             } else {
//                 alert('Something Went wrong, Please try again later.');
//                 return false;
//             }      
//         } catch (err) {
//             console.log(err);
//             return false;
//         }
//         // return true;
//     } 

//     const makeAddMemberRequest = async (params, companyId) => {
//         const body = {
//             ...initMember,
//             EncCompanyId: companyId,    
//             RegMob1: params.phone,
//             UserType: uType.PATIENT.title,
//             ParentUserId: '',
//             PartyId: '',
//         }

//         // loaderAction(true);
//         // const res = await axios.post(`${BASE_URL}/api/member/Post`, body);
//         // loaderAction(false);
//         // if (res.data[0] !== 'N') {
//         //     setOtp({...otp, fieldOpen: false, verified: true});
//         //     handleClose(false);
//         // } else {
//         //   alert('Something went wrong, try again later.');
//         // }

//         return true;
//     }


//     // const makeLoginRequest = async () => {
//     //     // loaderAction(true);
//     //     const res = await axios.get(`${BASE_URL}/api/UserAuth/Get?UN=${user.phone}&UP=${encodeURIComponent(user.password)}&CID=${compCode}`);
//     //     // loaderAction(false);

//     //     if (res.data.Remarks === 'INVALID') {
//     //         alert('Username or password in incorrect.')
//     //     } else if (res.data.Remarks === 'NOTINCOMPANY') {
//     //         alert('Not registered in this company.')
//     //     } else if (res.data.Remarks === 'INACTIVE') {
//     //         alert('Not Active.')
//     //     } else if (!res.data.UserId) {
//     //         return alert("Something Went wrong, We can't log you in.");
//     //     } else {
//     //         handleClose(false);
//     //     }
//     // }    

//     return (
//         <div>
//             {/* <h5 className="text-center mb-4 pb-3 fw-semibold" style={{fontFamily: 'Lato', borderBottom: '1px solid gray', fontSize: '1.1em'}}>Please Authenticate Yourself.</h5> */}
//             {/* <form>
//                 <label className="form-label fw-medium">Phone Number</label>
//                 <div className="input-group flex-nowrap mb-3">
//                     <input className="form-control" onChange={handleInputs} value={user.phone} name="phone" type="text" placeholder="Enter Your Number." />
//                 </div>
//                 <label className="form-label fw-medium">Enter Password</label>
//                 <div className="input-group flex-nowrap">
//                     <input className="form-control" onChange={handleInputs} value={user.password} name="password" type="text" placeholder="Enter Your Password." />
//                     <button type="submit" className="input-group-text">SUBMIT</button>
//                 </div>
//                 <button type="submit" className="btn btn-primary d-block ms-auto mt-3">Submit</button>
//             </form>
//             <div className="position-relative d-flex justify-content-center" style={{margin: '1.4em 0 0.9em',textAlign: 'center'}}>
//                 <h3 className="m-0 px-4" style={{ background: '#ffffff', width: 'fit-content', zIndex: 11}}>OR</h3>
//                 <hr className="m-0 position-absolute top-50 left-0 w-100" style={{borderBottom: '1px solid black'}} />
//             </div> */}
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label fw-medium">Enter Phone Number</label>
//                     <input type="text" name="phone" value={user.phone} onChange={(e) => handleNumberInputs(e, setUser)} required className="form-control" tabIndex={1} maxLength={10} />
//                 </div>
//                 {otp.fieldOpen && <div className="mb-3">
//                     <label className="form-label fw-medium">Enter Your OTP</label>
//                     <input type="text" name="inputOtp" value={user.inputOtp} onChange={handleInputs} required className="form-control" tabIndex={1} />
//                 </div>}
//                 <div className="d-flex">
//                     {otp.fieldOpen && <button onClick={resendOTP} type="button" className={`btn btn-primary d-block ${seconds ? 'opacity-50 pe-none' : ''}`}>RESEND OTP</button>}
//                     <button type="submit" className="btn btn-primary d-block ms-auto">{otp.fieldOpen ? 'SUBMIT OTP' : 'GENERATE OTP'}</button>
//                 </div>
//                 {(otp.fieldOpen && seconds) ? <div className="form-text mt-3" style={{color: '#4040df'}}>Resend OTP in {seconds} Seconds</div> : ''}
//             </form>
//         </div>
//     )
// }

// const ReportPad = ({ handleClose, billId, autoId, compCode, compInfo }) => {

//     const [data, setData] = useState({loading: true, data: { Journal: {} }, err: {status: false, msg: ''}});
//     // const history = useHistory();
    
//     useEffect(() => {
//         getData(billId)
//     }, [billId])

//     const getData = async (query) => {
//         if (query) {
//             const res = await getFrom(`${BASE_URL}/api/TestReportGen/Get?CID=${compCode}&BillId=${billId}&TestId=${autoId}`, {}, setData);
//             if (res) {
//                 setTimeout(() => {
//                     setData(res);            
//                 }, 400)
//             }
//         }
//     }

//     const renderData = (data) => {
//         if (data.loading) {
//             return <Spinner min_height='31rem' fSize='2rem'/>;
//         } else if (data.err.status) {
//             return <h2 className="text-danger mark">An error occured, please try again later. Error code: <span className="text-dark d-inline">{data.err.msg}</span></h2>;
//         } else if (!data.data.Journal.Sales.BillId) {
//             return <h2 className="text-danger py-2">No Data Received !</h2>;
//         } else {
//             return prescriptionPage(data.data.Journal.Sales);
//         }
//     }

//     let hasBG = compCode === HEXAGON_ID;

//     const prescriptionPage = (i) => {

//         let itemOne = i?.SalesDetails[0];
//         let sigRight = i.TravellerList.find(x => x.Sigposition === 'Right') || '';
//         let sigLeft = i.TravellerList.find(x => x.Sigposition === 'Left') || '';
//         let sigCenterRight = i.TravellerList.find(x => x.Sigposition === 'CenterRight') || '';
//         let sigCenterLeft = i.TravellerList.find(x => x.Sigposition === 'CenterLeft') || '';

//         return (
//             <div className="">
//                 <style>{hasBG && `
//                     body, p {
//                         color: black;
//                     }
//                     thead {
//                         background: transparent;
//                     }
//                     p {
//                         line-height: 1.5;
//                         font-size: 1em;
//                         font-weight: normal;
//                     }
//                     @page {
//                         margin: 0;
//                     }
//                 `}</style>
//                 <div className="mTable card A4page p-3" style={{background: hasBG ? 'transparent' : 'white' }}>
//                     <table className="table-1" id="invoice" style={{color:"black"}}>
//                         <thead>
//                             <tr style={{backgroundColor:"#fff"}}>
//                                 <td>
//                                     {(() => {
//                                         if (compCode === HEXAGON_ID) {
//                                             return (
//                                                 <>
//                                                     <img src={`${SRC_URL}/Content/images/Header861.png`} className="w-100" alt="header"></img>
//                                                     <img src={`${SRC_URL}/Content/images/WaterMark861.png`} style={{ width: '80%', height: 'auto', position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: '-1', opacity: '0.5' }} className="img-fluid" alt="header"></img>
//                                                 </>
//                                             )
//                                         } else {
//                                             return (
//                                                 <div style={{ textAlign: 'center', borderBottom: '1px solid' }}>
//                                                     <div style={{ paddingRight: '3px', position: 'relative',backgroundColor:"#fff" }}>
//                                                         <div style={{
//                                                             position: 'absolute',
//                                                             left: 0,
//                                                             bottom: 0,
//                                                             top: 0,
//                                                             display: 'flex',
//                                                             alignItems: 'center',

//                                                         }}>
//                                                             <img style={{ width: '115px', padding: '0px 11px', height: '81px' }} src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="logo" />
//                                                         </div>
//                                                         <h2 style={{ fontSize: '20px',fontWeight:"bold" }}>{compInfo.COMPNAME}</h2>
//                                                         <h3 style={{ fontSize: '20px',fontWeight:"400" }}>{compInfo.CATCHLINE}</h3>
//                                                         <p style={{ fontSize: '16px' }}>{compInfo.ADDRESS}</p>
//                                                         <h4>Phone: <span>{compInfo.CONTACT1} {compInfo.CONTACT2 && ` / ` + compInfo.CONTACT2}</span></h4>
//                                                         <h4>Email: <span>{compInfo.MAILID}</span></h4>
//                                                     </div>
//                                                 </div>
//                                             )
//                                         }
//                                     })()}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="4" className="py-2" style={{borderBottom: '1px solid #000'}}>
//                                     {/* <table style={{ width: '100%' }}>
//                                         <tbody>
//                                             <tr>
//                                                 <th style={{ textAlign: 'right', lineHeight: 0 }}>
//                                                     <img src="" alt="" style={{ height: 'auto', width: '100px', marginTop: '-90px', transform: 'translateY(100px)' }} />
//                                                 </th>
//                                             </tr>
//                                         </tbody>
//                                     </table> */}
//                                     <table style={{ width: '85%', fontSize: '15px' ,lineHeight:"1.15" }} cellSpacing="1" cellPadding="0" className="table-2">
//                                         <tbody>
//                                             <tr>
//                                                 <td style={{ width: '60%' }}>
//                                                     <table style={{ width: '100%' }}>
//                                                         <tbody>
//                                                             <tr>
//                                                                 <td style={{ width: '30%' }}><b>VID</b></td>
//                                                                 <td style={{ width: '70%' }}>: {itemOne.VisitNo}</td>
//                                                             </tr>
//                                                             <tr>
//                                                                 <td><b>MRD</b></td>
//                                                                 <td>: {i.MpartyCode}</td>
//                                                             </tr>
//                                                             <tr>
//                                                                 <td><b>Patient Name</b></td>
//                                                                 <td>: {i.PartyName}</td>
//                                                             </tr>
//                                                             <tr>
//                                                                 <td><b>Age / Sex</b></td>
//                                                                 <td>
//                                                                     : {i.Age} Yrs. &nbsp;&nbsp; {i.Gender}
//                                                                 </td>
//                                                             </tr>
//                                                             <tr>
//                                                                 <td><b>Referred By</b></td>
//                                                                 <td><span>: {i.ReferenceBy}</span></td>
//                                                             </tr>
//                                                         </tbody>
//                                                     </table>
//                                                 </td>
//                                                 <td valign="top" style={{ width: '40%' }}>
//                                                     <table style={{ width: '100%' }}>
//                                                         <tbody>
//                                                             <tr>
//                                                                 <td><b>Bill Date</b></td>
//                                                                 <td>: {new Date(i.Billtime).toLocaleDateString('en-TT')} &nbsp;&nbsp; {new Date(i.Billtime).toTimeString().substring(0, 5)}</td>
//                                                             </tr>
//                                                             {compCode === HEXAGON_ID ? <tr><td></td></tr> : <>
//                                                                 <tr>
//                                                                     <td><b>Collection Date</b></td>
//                                                                     <td>: {new Date(itemOne.SampleDate).toLocaleDateString('en-TT')}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <td><b>Lab Received Date</b></td>
//                                                                     <td>: {new Date(itemOne.LabReceivedDate).toLocaleDateString('en-TT')}</td>
//                                                                 </tr>
//                                                             </>}
//                                                             <tr>
//                                                                 <td><b>Report Date</b></td>
//                                                                 <td>
//                                                                     : {new Date(itemOne.ReportDate).toLocaleDateString('en-TT')} 
//                                                                     &nbsp;&nbsp; {new Date(itemOne.ReportDate).toTimeString().substring(0, 5)}
//                                                                 </td>
//                                                             </tr>
//                                                             <tr>
//                                                                 <td><b>Sample Source</b></td>
//                                                                 <td>
//                                                                     : {itemOne.SampleSource || 'LAB'}
//                                                                 </td>
//                                                             </tr>
//                                                         </tbody>
//                                                     </table>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </td>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>
//                                     <div>
//                                         <table className="report-content" style={{ width: '100%'}}>
//                                             <tbody>
//                                                 {i.SalesDetails.map(sale => (
//                                                     <tr key={sale.AutoId}>
//                                                         <td colSpan="4">
//                                                             <div style={{ width: '100%' }}>
//                                                                 <div style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
//                                                                     <table align="center" style={{ width: '100%' }}>
//                                                                         <tbody>
//                                                                             <tr>
//                                                                                 <td align="center"><u>DEPARTMENT OF {sale.ItemGroup1}</u></td>
//                                                                             </tr>
//                                                                             <tr>
//                                                                                 <td align="center" style={{ fontFamily: 'Times New Roman' }}>
//                                                                                     <u>{sale.ItemGroup}</u>
//                                                                                 </td>
//                                                                             </tr>
//                                                                             <tr>
//                                                                                 <td align="center" style={{border: '1px solid #060505'}}>
//                                                                                     <table style={{ width: '70%' }} align="center" cellPadding="0" cellSpacing="0">
//                                                                                         <tbody>
//                                                                                             <tr>
//                                                                                                 <td
//                                                                                                     style={{ fontSize: '14px', fontFamily: 'Times New Roman', textAlign: 'center' }} >
//                                                                                                     <b>{sale.Description}</b>
//                                                                                                 </td>
//                                                                                             </tr>
//                                                                                         </tbody>
//                                                                                     </table>
//                                                                                 </td>
//                                                                             </tr>
//                                                                         </tbody>
//                                                                     </table>
//                                                                 </div>
//                                                                 <table id="ResultTable1" className="ResultTbl mb-3 w-100" style={{ fontSize: '15px' }} cellPadding="0" cellSpacing="0">
//                                                                     <tbody>
//                                                                         <tr valign="top" height="32px">
//                                                                             <th width="34%"><u>Test Name</u></th>
//                                                                             <th className="Result1" width="15%"><u>Result</u></th>
//                                                                             <th className="TestUnit1 text-center" width="15%"><u>UNIT</u></th>
//                                                                             <th className="Normalrange1 text-center" width="36%"><u>Reference Range</u></th>
//                                                                         </tr>
//                                                                         {sale.ItemQCList.map(test => {

//                                                                             let lRange, uRange, fontWt;

//                                                                             if (!i.Gender) return null;

//                                                                             if (i.Age > 10) {
//                                                                                 if (i.Gender.toUpperCase() === 'MALE') {
//                                                                                     lRange = test.Male_LwrPange;
//                                                                                     uRange = test.Male_UprRange;
//                                                                                 } else if (i.Gender.toUpperCase() === 'FEMALE') {
//                                                                                     lRange = test.Female_LwrRange;
//                                                                                     uRange = test.Female_UprRange;
//                                                                                 }
//                                                                             } else {
//                                                                                 lRange = test.Child_LwrRange;
//                                                                                 uRange = test.Child_UprRange;
//                                                                             }

//                                                                             if (isNaN(test.Result)) {
//                                                                                 fontWt = 'normal';
//                                                                             } else {
//                                                                                 let result = test.Result || 0;
//                                                                                 if (result >= lRange && result <= uRange) {
//                                                                                     fontWt = 'normal';
//                                                                                 } else if (lRange === 0 && uRange === 0) {
//                                                                                     fontWt = 'normal';
//                                                                                 } else if (!(test.TestStandard.trim())) {
//                                                                                     fontWt = 'normal';
//                                                                                 } else {
//                                                                                     fontWt = 900;
//                                                                                 }
//                                                                             }

//                                                                             return (
//                                                                                 (test.Result.trim() || test.Comments.trim()) ? <tr key={test.AutoId} valign="top">
//                                                                                     <td className={`${test.QCRoot ? 'fw-bold text-decoration-underline' : 'ps-3'}`} valign="top">
//                                                                                         {test.TestDesc}
//                                                                                         {(test.Result.trim() && test.Method.trim()) ? <font className="fs-6 d-block"> Method: {test.Method}</font> : ''}
//                                                                                     </td>
//                                                                                     {/* {test.Result.trim() ? <> */}
//                                                                                         <td valign="top" style={{fontWeight: fontWt}}>
//                                                                                             {test.Result}
//                                                                                             {test.Comments.trim() && <span className="d-block">{test.Comments}</span>}
//                                                                                         </td>
//                                                                                         <td valign="top" className="TestUnit1 text-center">{test.UnitDesc}</td>
//                                                                                         <td valign="top" className="Normalrange1 text-center" dangerouslySetInnerHTML={{ __html: test.TestStandard }}></td>
//                                                                                     {/* </> : <td valign="top" colSpan={3}>{test.Comments}</td> } */}
//                                                                                 </tr> : ''
//                                                                             )
//                                                                         })}
//                                                                     </tbody>
//                                                                 </table>
//                                                                 <table className="ResultTbl" style={{ width: '100%', fontSize: '13px', padding: '15px 20px' }} align="left">
//                                                                     <tbody>
//                                                                         {sale.InstrmntUsed?.trim() && <tr>
//                                                                             <th className="text-nowrap" width="15%">Instrument Used : </th>
//                                                                             <td width="85%">{sale.InstrmntUsed}</td>
//                                                                         </tr> }  
//                                                                         {sale.Method?.trim() && <tr>
//                                                                             <th className="text-nowrap">Method : </th>
//                                                                             <td className="ps-2">{sale.Method}</td>
//                                                                         </tr>}
//                                                                         {sale.QC_Remarks?.trim() && <tr>
//                                                                             <th className="text-nowrap" valign="top">Special Remarks : </th>
//                                                                             <td className="ps-2" dangerouslySetInnerHTML={{ __html: sale.QC_Remarks }}></td>
//                                                                         </tr>}
//                                                                         {sale.NB?.trim() && <tr>
//                                                                             <th className="text-nowrap" valign="top">NB : </th>
//                                                                             <td className="ps-2" dangerouslySetInnerHTML={{ __html: sale.NB }}></td>
//                                                                         </tr>}
//                                                                         {sale.Remarks?.trim() && <tr>
//                                                                             <th className="text-nowrap" valign="top">Remarks : </th>
//                                                                             <td className="ps-2" dangerouslySetInnerHTML={{ __html: sale.Remarks }}></td>
//                                                                         </tr>}
//                                                                     </tbody>
//                                                                 </table>
//                                                                 <table className="w-100">
//                                                                     <tbody>
//                                                                         <tr>
//                                                                             <td className="pt-3" align="center" valign="middle">***** End Of Report ***** </td>
//                                                                         </tr>
//                                                                     </tbody>
//                                                                 </table>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                             <tfoot>
//                                                 <tr>
//                                                     <td style={{height: 180}}>&nbsp;</td>
//                                                 </tr>
//                                             </tfoot>
//                                             <tfoot className="w-100 d-table position-fixed bottom-0 start-0 end-0">
//                                                 <tr>
//                                                     <td colSpan="4">
//                                                         <div style={{ width: '100%' }} className="div-1">
//                                                             <table align="center" style={{ width: '100%', textAlign: 'center', fontFamily: 'verdana, arial', fontSize: '13px', borderCollapse: 'collapse', paddingLeft: '88px', paddingRight: '25px' }} >
//                                                                 <tbody>
//                                                                     <tr>
//                                                                         <td width="25%" id="S1" valign="bottom">
//                                                                             {sigLeft && <img src={`${SRC_URL}/Content/images/${sigLeft.PartyCode}.png`} style={{ width: '80px', height: '40px' }} alt="Doctor Signature" />}
//                                                                         </td>
//                                                                         <td width="25%" valign="bottom">
//                                                                             {sigCenterLeft && <img src={`${SRC_URL}/Content/images/${sigCenterLeft.PartyCode}.png`} style={{ width: '80px', height: '40px' }} alt="Doctor Signature" />}
//                                                                         </td>
//                                                                         <td width="25%" valign="bottom">
//                                                                             {sigCenterRight && <img src={`${SRC_URL}/Content/images/${sigCenterRight.PartyCode}.png`} style={{ width: '80px', height: '40px' }} alt="Doctor Signature" />}
//                                                                         </td>
//                                                                         <td width="25%" id="S2" valign="bottom" align="left">
//                                                                             {sigRight && <img src={`${SRC_URL}/Content/images/${sigRight.PartyCode}.png`} style={{ width: '80px', height: '40px' }} alt="Doctor Signature" />}
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td width="25%" style={{ paddingLeft: '1%' }}>{sigLeft.Name}</td>
//                                                                         <td width="25%">{sigCenterLeft.Name}</td>
//                                                                         <td width="25%">{sigCenterRight.Name}</td>
//                                                                         <td width="25%" className="fw-bold" align="left">{sigRight.Name}</td>
//                                                                     </tr>
//                                                                     <tr style={{fontSize: '0.9em'}}>
//                                                                         <td width="25%" style={{ paddingLeft: '1%' }}>
//                                                                             {sigLeft.Qualification}
//                                                                             <br /><span>{sigLeft && 'Reg. No:- ' + sigLeft.LicenceNo}</span>
//                                                                             <br /><span>{sigLeft.SpecialistDesc}</span>
//                                                                             <br /><span>{sigLeft.AttachedWith}</span>
//                                                                         </td>
//                                                                         <td width="25%">
//                                                                              {sigCenterLeft.Qualification}
//                                                                             <br /><span>{sigCenterLeft && 'Reg. No:- ' + sigCenterLeft.LicenceNo}</span>
//                                                                             <br /><span>{sigCenterLeft.SpecialistDesc}</span>
//                                                                             <br /><span>{sigCenterLeft.AttachedWith}</span>
//                                                                         </td>
//                                                                         <td width="25%">
//                                                                              {sigCenterRight.Qualification}
//                                                                             <br /><span>{sigCenterRight && 'Reg. No:- ' + sigCenterRight.LicenceNo}</span>
//                                                                             <br /><span>{sigCenterRight.SpecialistDesc}</span>
//                                                                             <br /><span>{sigCenterRight.AttachedWith}</span>
//                                                                         </td>
//                                                                         <td width="25%" align="left">
//                                                                             {sigRight.Qualification}
//                                                                             <br /><span>{sigRight && 'Reg. No:- ' + sigRight.LicenceNo}</span>
//                                                                             <br /><span>{sigRight.SpecialistDesc}</span>
//                                                                             <br /><span>{sigRight.AttachedWith}</span>
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         {/* <td width="25%" className="text-decoration-underline" style={{ fontSize: '11px' }} >
//                                                                             Print By:
//                                                                         </td> */}
//                                                                         <td colSpan="4" style={{ fontSize: 'smaller'}}>
//                                                                             Comments: Please correlate with clinical condition
//                                                                         </td>
//                                                                         {/* <td width="25%" className="text-decoration-underline" style={{ fontSize: '11px' }} >
//                                                                             Checked By:
//                                                                         </td> */}
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td colSpan="4">
//                                                                             {(() => {
//                                                                                 if (compCode === HEXAGON_ID) {
//                                                                                     return (
//                                                                                         <img src={`${SRC_URL}/Content/images/Footer861.png`} className="w-100" alt="foot-bg"/>
//                                                                                     )
//                                                                                 } else {
//                                                                                     return;
//                                                                                 }
//                                                                             })()}
//                                                                         </td>
//                                                                     </tr>
//                                                                 </tbody>
//                                                             </table>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             </tfoot>
//                                         </table>
//                                     </div>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div>
//             <style>
//                 {`        
//                     .table-1 {
//                         width: 100%;
//                         padding: 0rem 1rem 0rem 1rem;
//                     }

//                     .name {
//                         display: flex;
//                         justify-content: center;
//                         align-items: center;
//                     }

//                     .name img {
//                         height: 5rem;
//                     }

//                     .name div {
//                         display: flex;
//                         flex-direction: column;
//                         align-items: flex-start;
//                         gap: 0.2em;
//                         font-size: 1rem;
//                         font-size: 1.3rem;
//                     }

//                     .mTable h3 {
//                         font-size: 1.3rem;
//                     /* font-weight: 600; */
//                     /* color: #585353f2; */
//                     }

//                     .mTable hr {
//                         margin-top: 0.5rem;
//                     }

//                     .contact {
//                         display: flex;
//                         justify-content: center;
//                         align-items: end;
//                         flex-direction: column;
//                         gap: 0.4rem;
//                         padding-bottom: 0.2rem;
//                     }

//                     .contact img {
//                         height: 5rem;
//                     }

//                     .mTable h4 {
//                         font-weight: bold;
//                         font-size: 16px;
//                     }

//                     .mTable span {
//                         font-weight: 400;
//                     }

//                     .table-2 {
//                         width: 100%;
//                         text-align: start;
//                         line-height: 1.3rem;
//                     }

//                     .barcode {
//                         position: absolute;
//                         transform: translate(-4rem, 0.7rem);
//                     }

//                     .barcode img {
//                         height: 6rem;
//                     }

//                     .td-1 {
//                         font-weight: bold;
//                     }

//                     .table-3 {
//                         width: 100%;
//                         text-align: left;
//                         border: 1px solid;
//                     }

//                     .mTable h5 {
//                         font-size: 1.1rem;
//                         font-weight: bold;
//                     }

//                     .div-1 {
//                         display: flex;
//                         justify-content: space-around;
//                         align-items: end;
//                     }

//                     .div-1-1 {
//                         display: flex;
//                         flex-direction: column;
//                         align-items: center;
//                     }

//                     .div-2 {
//                         text-align: center;
//                         color: black;

//                     }

//                     .mTable .bx {
//                         color: black;
//                         font-size: 1.5rem;
//                     }

//                     .content-header td {
//                         width: 25%;
//                     }
                        
//                 `}
//             </style>
//             <div className="d-flex justify-content-center">
//                 <div className="print-btn-box">
//                     <button onClick={() => handleClose({ state: false, billId: '', autoId: '' })} type="buttom" className="btn btn-primary btnSave print-button" tabIndex="1">BACK</button>
//                     <button onClick={() => window.printPage()} type="buttom" className="btn btn-primary btnSave print-button" tabIndex="1">SAVE</button>
//                 </div>
//             </div>
//             {renderData(data)}
//         </div>
//     )
// }