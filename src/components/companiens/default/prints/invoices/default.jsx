import { useState } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getFrom } from "../../utilities";
import { BASE_URL, SRC_URL } from "../../../../../constants";
import { Spinner } from "../../../ePharma/utilities";

const InvoiceDefault = ({ id, compCode, type }) => {

    const [data, setData] = useState({loading: true, data: { SalesObj: {CompanyMaster: {}, SalesDetailsList: [], VoucherList: []} }, err: {status: false, msg: ''}});
    const history = useHistory();
    console.log(type);    
    
    useEffect(() => {
        getData(id)
    }, [id])

    const getData = async (query) => {
        if (query) {
          const res = await getFrom(`${BASE_URL}/api/Appointment/GetBill?BilId=${query}&CID=${compCode}&type=${type}`, {}, setData);
          if (res) {
            setTimeout(() => {
                setData(res);            
            }, 400)
          }
        }
    }

    const renderData = (data) => {
        if (data.loading) {
          return <Spinner min_height='31rem' fSize='2rem'/>;
        } else if (data.err.status) {
          return <h2 className="text-danger mark">An error occured, please try again later. Error code: <span className="text-dark d-inline">{data.err.msg}</span></h2>;
        } else if (!data.data.SalesObj) {
          return <h2 className="text-danger py-2">No Data Received !</h2>;
        } else {
          return prescriptionPage(data.data.SalesObj);
        }
    }

    const prescriptionPage = (item) => {
        const paidAmount = item.VoucherList.reduce((total, i) => (total + i.Amount), 0).toFixed(2);
        const dueAmount = paidAmount - item.Amount;
        return (
            <>
                <div className="" id="printContent" style={{ width: "100%" }}>
                    <div className="col-12 w-100 d-flex justify-content-center">
                        <div className="print-btn-box">
                            <button onClick={() => history.goBack()} type="buttom" className="btn btn-primary btnSave print-button" tabIndex="1">Back</button>
                            <button onClick={() => window.printPage()} type="buttom" className="btn btn-primary btnSave print-button" tabIndex="1">Print</button>
                        </div>
                    </div>
                    <div className="col-md-12" style={{ width: "100%" }}>
                        <div className="card A4page">                       {/* ref={componentRef} */}
                            <div className="card-body pt-3" style={{ width: "100%", padding: "0 1.25rem 0 1.25rem" }} >
                                <table style={{ width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="" style={{ width: "100%", textAlign: "center" }} >
                                                    <table style={{ width: "100%", fontSize: 14 }}>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ width: "15%", padding: 5 }}> <img src={`${SRC_URL}/Content/CompanyLogo/${item.CompanyMaster.LogoUrl}`} style={{ height: 100, width: 100 }} />
                                                                </td>
                                                                <td style={{ width: "70%" }}>
                                                                    <table style={{ width: "100%", fontSize: 18 }}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" style={{ fontWeight: "bold", color: "var(--clr-12)" }} >
                                                                                    <h4 className="text-uppercase mb-1" style={{ fontSize: "24px !important" }} >
                                                                                        <b>{item.CompanyMaster.COMPNAME}</b>
                                                                                    </h4>
                                                                                    <span style={{ fontSize: 18, color: "var(--clr-12)" }} > {item.CompanyMaster.CATCHLINE} </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" style={{ fontSize: "17px !important", fontWeight: 'normal' }} >
                                                                                    {item.CompanyMaster.ADDRESS}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" style={{ fontWeight: 'normal', fontSize: "17px !important" }}>
                                                                                    PH: {item.CompanyMaster.CONTACT1} / {item.CompanyMaster.CONTACT2}
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td style={{ width: "15%" }}>
                                                                    <img src={`${SRC_URL}/Content/CompanyLogo/${item.CompanyMaster.LogoUrl_R}`} style={{ height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={3} style={{ borderBottom: "1px solid #000", fontSize: 18 }} align="center" ></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={3} style={{height: '2px', borderBottom: '2px solid'}} />
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={3} style={{ borderTop: "2.5px solid #000 !important", textAlign: "center" }} >
                                                                    <span style={{ display: 'block', color: "var(--clr-12)", padding: '4px 0' }}> <b>BILL/RECEIPT ( {item.Department} )</b> </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div style={{ width: "100%" }}>
                                                    <div className="px-2" style={{ width: "100%", border: "1px solid #000" }} >
                                                        <table style={{ width: "100%", lineHeight: "1 !important" }} >
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ width: "60%", fontSize: 13, borderRight: "1px solid #000" }} >
                                                                        <table style={{ width: "100%", lineHeight: "1 !important" }} cellPadding={3} >
                                                                            <tbody>
                                                                                <tr style={{}}>
                                                                                    <td> 
                                                                                        <b> Patient Name : &nbsp; <font style={{ fontSize: 19 }}> {item.PartyName} </font> </b>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td> 
                                                                                        <b>Age : &nbsp;</b> <font style={{ fontSize: 18, fontWeight: "bold" }} > {item.Age} Yrs.  </font> &nbsp;&nbsp;&nbsp;&nbsp;  <b>Sex : &nbsp; {item.Gender}</b>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <b>Address :&nbsp;</b> {item.BillingAddress} 
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <table style={{ width: "100%", lineHeight: "1 !important" }} >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    {item.UnderDocSpecialization && <td style={{ width: "20%" }}>
                                                                                                        <b>{item.UnderDocSpecialization} :</b>
                                                                                                    </td>}
                                                                                                    {item.UnderDoct && <td style={{ fontWeight: "bold" }}>
                                                                                                        <font style={{ fontSize: 19 }}>
                                                                                                            {item.UnderDoct}
                                                                                                        </font>
                                                                                                    </td>}
                                                                                                </tr>
                                                                                                {item.UnderDoct && <tr>
                                                                                                    <td></td>
                                                                                                    <td colSpan={2}>[{item.UnderDoctQualification}]</td>
                                                                                                </tr>}
                                                                                                <tr>
                                                                                                    <td colSpan={2}>
                                                                                                        <span><b>Token Number :</b>&nbsp;&nbsp; {item.VisitNo}</span>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td style={{ width: "40%", fontSize: 13, verticalAlign: "top", paddingLeft: "2%" }} >
                                                                        <table style={{ width: "100%", lineHeight: "1 !important" }} cellPadding={3} align="right" >
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>
                                                                                        <b>MRD &nbsp;:&nbsp; {item.CpartyCode}</b>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <b>PH &nbsp;:&nbsp; {item.PMobile}</b>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <b>Inv No &nbsp;:&nbsp; {item.VchNo}</b>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td> 
                                                                                        <b>Inv Date &nbsp;:&nbsp;</b> <span> {item.VchDate?.substr(0, 10).split('-').reverse().join('/')}</span>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="" style={{ marginTop: 5, width: "100%" }}>
                                                        <div style={{ width: "100%" }}>
                                                            <table style={{ width: "100%", lineHeight: "1 !important" }} className="table custom-table" >
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: 10 }}>#</th>
                                                                        <th align="left">
                                                                            <span>Particulars</span>
                                                                        </th>
                                                                        <th>{item.Department === 'INVESTIGATION' && 'Department'}</th>
                                                                        <th style={{ textAlign: "right !important" }}>
                                                                            Rate
                                                                        </th>
                                                                        <th style={{ textAlign: "right !important" }}>
                                                                            Qty
                                                                        </th>
                                                                        <th style={{ textAlign: "right !important" }}>
                                                                            Dis Amt.
                                                                        </th>
                                                                        <th style={{ textAlign: "right !important" }}>
                                                                            Amount
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item.SalesDetailsList.map((i, n) => (
                                                                        <tr key={i.Description}>
                                                                            <td>{n + 1}</td>
                                                                            <td align="left">{i.Description} </td>
                                                                            <td align="left" style={{whiteSpace: 'nowrap'}}>{item.Department === 'INVESTIGATION' && i.Department}</td>
                                                                            <td align="right">{i.Rate}</td>
                                                                            <td align="right">{i.BillQty}</td>
                                                                            <td align="right">{i.DiscountText}</td>
                                                                            <td align="right">{i.Amount}</td>
                                                                        </tr>
                                                                    ))}
                                                                    <tr>
                                                                        <td colSpan={2} align="right" style={{ verticalAlign: "middle !important", paddingRight: 0 }} >
                                                                            <br />
                                                                            <div style={{paddingRight: 60, fontSize: '1.8em'}}>
                                                                                <span>
                                                                                    {dueAmount < 0 ? <b>Due Amount : {Math.abs(dueAmount)}</b> : <b>FULL PAID : {paidAmount}</b>}
                                                                                </span>
                                                                            </div>
                                                                            <br />
                                                                            <div align="left">
                                                                                <span></span>
                                                                            </div>
                                                                        </td>
                                                                        <td colSpan={5} align="right;"> 
                                                                            <table style={{ width: "100%", lineHeight: "1 !important" }} >
                                                                                <tbody>
                                                                                    {item.ExpenseDetails.map(i => (
                                                                                        <tr key={i.AutoId}>
                                                                                            <td>
                                                                                                <b>{i.Description} </b>
                                                                                            </td>
                                                                                            <td align="right">
                                                                                                <b>{i.AddLessDesc.includes('Cr.') ? '-' : ''} { i.Amount}</b>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                    <tr>
                                                                                        <td>
                                                                                            <b>Total Amount </b>
                                                                                        </td>
                                                                                        <td align="right"><b>{item.Amount}</b></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td valign="top"> 
                                                                                            <b>Paid Amount </b>
                                                                                        </td>
                                                                                        <td align="right">
                                                                                            <table style={{ width: "100%" }}>
                                                                                                <tbody>
                                                                                                    {item.VoucherList.map(i => (
                                                                                                        <tr key={i.AutoId}>
                                                                                                            <td align="right">
                                                                                                                <div className="d-flex justify-content-between">
                                                                                                                    <font style={{ fontStyle: "italic", fontWeight: "bold" }} > By {i.PaymentMode}</font> 
                                                                                                                    <b>{i.VoucherAmount}</b>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    ))}
                                                                                                    {item.VoucherList.length > 1 && <tr>
                                                                                                        <td align="right">
                                                                                                            <div className="d-flex justify-content-between">
                                                                                                                <font style={{ fontStyle: "italic", fontWeight: "bold" }} > Total Paid </font> 
                                                                                                                <b>{paidAmount}</b>
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>}
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={2}>
                                                                            <span> Receive with thanks from {item.PartyName} an amount of  <b> {item.AmountText}</b> by {item.Insname} </span>
                                                                        </td>
                                                                        <td colSpan={5} style={{ height: 30, verticalAlign: "bottom !important", textAlign: "right", paddingTop: 35 }} >
                                                                            <b> Bill By :</b> {item.Insname}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="" style={{ width: "100%" }}>
                                                        <table style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ width: "33%" }} />
                                                                    <td style={{ width: "33%" }}></td>
                                                                    <td style={{ width: "33%" }}></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>  
        )
    }

    return (
        <div className="print-page prescription invoice-print" id="printContent" style={{width:'100%'}}>
            {renderData(data)}
        </div>
    )
}

const mapStateInvoicePrint = (state) => {
	return { compCode: state.compCode };
}
  
export default connect(mapStateInvoicePrint, {})(InvoiceDefault);

