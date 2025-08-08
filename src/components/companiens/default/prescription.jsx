import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { getFrom } from "./utilities";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../constants";
import { Spinner } from "../ePharma/utilities";

const Prescription = ({ match, compCode }) => {

    const [data, setData] = useState({loading: true, data: { PrescriptionObj: {CompanyMaster: {}, PrescriptionHospDocsAnnexList: [], PrescriptionDetailsList: []} }, err: {status: false, msg: ''}});
    const history = useHistory();
    const LOCID = useSelector(i => i.globalData).location.LocationId;

    useEffect(() => {
        getData(match.params.id)
    }, [match.params.id])

    const getData = async (query) => {
        if (query) {
          const res = await getFrom(`${BASE_URL}/api/Appointment/GetPrescription?PId=${query}&CID=${compCode}&LOCID=${LOCID}`, {}, setData);
          if (res) {
            setTimeout(() => {
                setData(res);            
            }, 400)
          }
        }
    }

    const renderData = (data) => {
        if (data.loading) {
          return <Spinner min_height='31rem' fSize='3rem'/>;
        } else if (data.err.status) {
          return <h2 className="text-danger mark">An error occured, please try again later. Error code: <span className="text-dark d-inline">{data.err.msg}</span></h2>;
        } else if (!data.data.PrescriptionObj) {
          return <h2 className="text-danger py-2">No Data Received !</h2>;
        } else {
          return prescriptionPage(data.data.PrescriptionObj);
        }
    }

    const prescriptionPage = (item) => {
        const pharmacy = item.PrescriptionDetailsList.filter(i => i.Category === "PHARMACY");
        const investigations = item.PrescriptionDetailsList.filter(i => i.Category === "INVESTIGATION");
        return (
            <div className="row">
                <div className="col-md-12" style={{width:'100%'}}>
                    <div className="col-12 w-100 d-flex justify-content-center">
                        <div className="print-btn-box">
                            <button onClick={() => history.goBack()} type="buttom" className="btn btn-primary btnSave print-button" tabIndex="1">Back</button>
                            <button onClick={() => window.printPage()} type="buttom" className="btn btn-primary btnSave print-button" tabIndex="1">Print</button>
                        </div>
                    </div>
                    <div className="card A4page">            {/* ref={componentRef} */}
                        <div className="card-body" style={{width:'100%'}}>
                            <table style={{width: '100%'}}>
                                <thead>
                                    <tr style={{display: 'none'}}>
                                        <th style={{textAlign: 'center'}}>
                                            <span style={{width: '100%', color: 'var(--clr-12)', textDecoration: 'underline'}}><b>PRESCRIPTION</b></span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table style={{width: '100%', fontSize: '14px'}}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{width:'45%', padding:'5px', verticalAlign: 'top'}}>
                                                            <span style={{color: '#18a2cc'}} onClick={() => getData(match.params.id)}><b>{item.CompanyMaster.COMPNAME}</b></span>
                                                            <br/> {item.CompanyMaster.CATCHLINE}<br/> {item.CompanyMaster.ADDRESS} {item.CompanyMaster.PIN}<br/>
                                                            <span>PH: </span>{item.CompanyMaster.CONTACT1} / {item.CompanyMaster.CONTACT2}<br/>   
                                                        </td>
                                                        <td style={{width:'10%', padding:'5px', verticalAlign: 'top'}}>
                                                            <img src={`/img/logo/${item.CompanyMaster.LogoUrl}`} style={{position: 'absolute', maxWidth: '100%', maxHeight: '3.6rem'}} />
                                                        </td>
                                                        <td style={{width:'45%', padding:'5px', verticalAlign:'top', textAlign:'right'}}>
                                                            <b><span style={{color:'#18a2cc'}}>{item.UnderDoc} </span></b>
                                                            <br/> {item.UnderDocSpecialization}
                                                            <br/> {item.UnderDocQualification}
                                                            <br/> Reg. No: {item.LicenceNo}<br/> Mob. No: {item.UnderDocMobile}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3" style={{borderBottom:'1px solid #000'}}></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3" style={{height: 3, borderBottom: '2px solid'}}></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3" style={{borderTop:'2.5px solid #000 !important', textAlign:'center'}}></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2" style={{width:'55%', padding:'5px', verticalAlign:'top'}}>
                                                            <b> ID: {item.RegNo} - {item.PartyName}  &nbsp; {item.Age} Yrs. / {item.Gender} </b>
                                                            <br/> Mob No: {item.RegMobNo1} {item.RegMobNo2 && `/ ${item.RegMobNo2}`} <br/> {item.Address}    
                                                        </td>
                                                        <td style={{width:'45%',padding:'5px', verticalAlign:'top'}}>
                                                            <div className="grid grid-cols-2">
                                                                <b>Date: {item.AppDate?.substr(0, 10).split('-').reverse().join('/')}</b><br/>
                                                                {item.PrescriptionFieldsAnnexList.map(i => {
                                                                    if (!i.Description) return;
                                                                    return <span>{i.Caption}: &nbsp; &nbsp; &nbsp;{i.Description}{i.Caption === 'SPO2' ? '%' : ''}<br/></span>
                                                                })}
                                                            </div>
                                                            {/* Height: {item.Height} <span className="!ml-[4rem]"> Weight: {item.Weight}</span><br/> 
                                                            BP: {item.PatientBP} <span className="!ml-[4rem]"> SpO2: {item.PatientSaturation}%</span><br/> 
                                                            Pulse: {item.PatientPulseRate} <span className="!ml-[4rem]">Blood Group: {item.PatientBloodGroupDesc}</span><br/> */}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3" style={{borderBottom: '1px solid #000'}}></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <table style={{width: '100%'}}>
                                                <tbody>
                                                    <tr style={{borderBottom: '1px solid #000'}}>
                                                        <td style={{width:'30%',borderRight:'1px solid #000'}} valign="top">
                                                            {item.PrescriptionHospDocsAnnexList.map(i => (<span key={i.Caption}><b>{i.Caption.replace(/<[^>]+>/g, '')} :</b> <p>{i.Description.replace(/<[^>]+>/g, '')}</p><hr /></span>))}
                                                            {/* <b>History:</b> <p>dsadsd</p><hr />
                                                            <b>Diagnosis:</b> <p>gsdff</p><hr/>
                                                            <b>Examination Findings:</b> <p>sdsadsds</p><hr/>
                                                            <b>Advice:</b> <p>sdsds</p><hr/>
                                                            <b>Progress Note:</b> <p>sdsadad</p><hr/> */}
                                                        </td>
                                                        <td style={{width:'70%',paddingLeft:'10px'}} valign="top">
                                                            <p style={{fontWeight:'bold', fontSize:'15px'}}>R<sub>x</sub></p>
                                                            <table style={{width:'100%', fontSize: '14px', color:'black', fontFamily: 'ui-sans-serif'}}>
                                                                <tbody>
                                                                    <tr style={{borderTop:'1px solid #000', borderBottom: '1px solid #000', fontWeight:'bold'}}>
                                                                        <td style={{width:'2%', textAlign:'left'}}></td>
                                                                        <td style={{width:'39%', textAlign:'left', paddingLeft:'3px'}}>Medicine Name</td>
                                                                        <td style={{width:'39%', textAlign:'left'}}>Dosage</td>
                                                                        <td style={{width:'20%', textAlign:'left'}}>Duration</td>
                                                                    </tr>
                                                                    {pharmacy.map(i => (
                                                                        <tr key={i.AutoId}>
                                                                            <td align="left" style={{width:'2%', textAlign:'left', verticalAlign:'top'}}><b>1.</b></td>
                                                                            <td align="left" style={{width:'39%', textAlign:'left', verticalAlign:'top', paddingLeft:'3px'}}><b>{i.ItemDesc}</b><br/><span style={{fontSize:'11px', color:'#7c6c6c'}}>{i.PreparationTypeDesc}</span></td>
                                                                            <td align="left" style={{width:'39%', textAlign:'left', verticalAlign:'top', borderBottom:'1px dotted #000'}}>
                                                                                {i.Dosage} {i.DosageUnitDesc}{i.FrequencyDesc ? `, ${i.FrequencyDesc}` : ''}  <br/>{i.DirectionDesc ? (i.DirectionDesc) : ''}  
                                                                            </td>
                                                                            <td align="left" style={{width:'20%', textAlign:'left', verticalAlign:'top', borderBottom:'1px dotted #000'}}>
                                                                                {i.Duration} {i.DurationUnitDesc}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                    {/* <tr>
                                                                        <td align="left" style={{width:'2%', textAlign:'left', verticalAlign:'top'}}><b>1.</b></td>
                                                                        <td align="left" style={{width:'39%', textAlign:'left', verticalAlign:'top', paddingLeft:'3px'}}><b>Tablet PARACETAMOL 200</b><br/><span style={{fontSize:'11px', color:'#7c6c6c'}}>sd</span></td>
                                                                        <td align="left" style={{width:'39%', textAlign:'left', verticalAlign:'top', borderBottom:'1px dotted #000'}}>
                                                                            1 ml,  Immediately <br/>(Before Meals)
                                                                        </td>
                                                                        <td align="left" style={{width:'20%', textAlign:'left', verticalAlign:'top', borderBottom:'1px dotted #000'}}>
                                                                            s hours
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left" style={{width:'2%', textAlign:'left', verticalAlign:'top'}}><b>2.</b></td>
                                                                        <td align="left" style={{width:'39%', textAlign:'left', verticalAlign:'top', paddingLeft:'3px'}}><b>Tablet CALPOL</b><br/><span style={{fontSize:'11px', color:'#7c6c6c'}}>sdsd</span></td>
                                                                        <td align="left" style={{width:'39%', textAlign:'left', verticalAlign:'top', borderBottom:'1px dotted #000'}}>
                                                                            1 ml,  If required <br/>(Before Meals)
                                                                        </td>
                                                                        <td align="left" style={{width:'20%', textAlign:'left', verticalAlign:'top', borderBottom:'1px dotted #000'}}>
                                                                            s hours
                                                                        </td>
                                                                    </tr> */}
                                                                </tbody>
                                                            </table>
                                                            <hr/>
                                                            <p style={{fontWeight:'bold', fontSize:'14px'}}>Advised Investigations</p>
                                                            <table style={{width: '100%', fontSize: '14px', color:'black', fontFamily: 'ui-sans-serif'}}>
                                                                <tbody>
                                                                    <tr style={{borderTop:'1px solid #000', borderBottom: '1px solid #000', fontWeight:'bold'}}>
                                                                        <td style={{width:'2%', textAlign:'left'}}></td>
                                                                        <td style={{width:'50%', textAlign:'left', paddingLeft:'3px'}}>Test</td>
                                                                        <td style={{width:'48%', textAlign:'left'}}>Instruction</td>
                                                                    </tr>
                                                                    {investigations.map(i => (
                                                                        <tr key={i.AutoId}>
                                                                            <td align="left" style={{width:'2%'}}><b>1.</b></td>
                                                                            <td align="left" style={{width:'50%'}}>
                                                                                <b> {i.ItemDesc}</b>
                                                                            </td>
                                                                            <td align="left" style={{width:'48%'}}>
                                                                                {i.Instruction}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2">
                                                            <p><b className="ms-1">Next FollowUp Date :</b> {item.FollowUpDate?.substr(0, 10).split('-').reverse().join('/')}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <div className="prescription-footer" style={{width:'100%'}}>
                    <table style={{width:'100%'}}>
                        <tbody>
                            <tr>
                                <td><b>PREPARED BY</b>: HMS Administrator</td>
                                <td align="right"><b>SIGNED BY DOCTOR</b>: Soumya Banerjee  </td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
            </div>        
        )
    }

    // const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //   content: () => componentRef.current,
    // });

    return (
        <div className="print-page prescription" id="printContent" style={{width:'100%'}}>
            {renderData(data)}
        </div>
    )
}

const mapStatePrescription = (state) => {
	return { compCode: state.compCode };
}
  
export default connect(mapStatePrescription, {})(Prescription);

