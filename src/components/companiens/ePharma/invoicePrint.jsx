// import { useReactToPrint } from 'react-to-print';
// import { useRef } from "react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { getFrom } from "./utilities";
import { Spinner } from './utilities';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isNumber } from "lodash";
import { breadCrumbAction } from "../../../actions";
import { BASE_URL, SRC_URL, TAKE_HOME_ID } from "../../../constants";

const InvoicePrint = ({ match, compCode, breadCrumbAction }) => {

    const [data, setData] = useState({loading: true, data: { SalesObj: {CompanyMaster: {}, SalesDetailsList: [], VoucherList: []} }, err: {status: false, msg: ''}});
    const history = useHistory();

    const b2bMode = useSelector(i => i.globalData.userRegType.CodeValue) === 'Retailer';

    useEffect(() => {
		breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'My Orders', link: '/myOrders'}, {name: 'Invoice', link: '/invoices'}], activeLink: '/invoices'});
	},[breadCrumbAction])
    
    useEffect(() => {
        getData(match.params.id)
    }, [match.params.id])

    const getData = async (query) => {
        if (query) {
          const res = await getFrom(`${BASE_URL}/api/Appointment/GetBill?BilId=${query}&CID=${compCode}`, {}, setData);
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

    const prescriptionPage = (obj) => {
        const paidAmount = obj.VoucherList.reduce((total, i) => (total + i.Amount), 0).toFixed(2);
        // const dueAmount = paidAmount - obj.Amount;
        
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
                        <div className="card A4page">                      
                            <div className="card-body pt-3" style={{ width: "100%", padding: "0 1.25rem 0 1.25rem" }} >
                                <table style={{ width: "100%", border: '1px solid gray' }} id="print-tabale">
                                    <thead className="bg-white">
                                        <tr>
                                            <td colSpan={3} style={{ borderBottom: "1px solid gray", textAlign: "center" }} >
                                                <span style={{ display: 'block', color: "black", padding: '4px 0' }}> <b>TAX INVOICE</b> </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <div className="" style={{ width: "100%", textAlign: "center" }} >
                                                    <table style={{ width: "100%", fontSize: 14 }}>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ width: "20%", padding: 5, overflow: 'hidden' }}>
                                                                    <img src={`${SRC_URL}/Content/CompanyLogo/${obj.CompanyMaster.LogoUrl}`} className="img-fluid" alt="logo" style={{transform: compCode === TAKE_HOME_ID ? 'scale(1.3)' : 'none'}} />
                                                                </td>
                                                                <td style={{ width: "45%" }}>
                                                                    <table style={{ width: "100%", fontSize: '0.95em', textAlign: 'left', fontWeight: 500 }}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ fontWeight: "bold", color: "black" }} >
                                                                                    <h4 className="text-uppercase mb-1" >
                                                                                        <b style={{ fontSize: '0.8em' }}>{obj.CompanyMaster.COMPNAME}</b>
                                                                                    </h4>
                                                                                    <span style={{ fontSize: '1.15em', color: "black" }} > {obj.CompanyMaster.CATCHLINE} </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td >
                                                                                    <b>Address: &nbsp;&nbsp;</b>{obj.CompanyMaster.ADDRESS}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <b>GSTIN: &nbsp;&nbsp;</b> {obj.GSTIN}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <b>DL. No.: &nbsp;&nbsp;</b> {obj.CompanyLicenceNo}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <b>Invoice No & Date: &nbsp;&nbsp;</b> {obj.VchNo} &nbsp;&nbsp;&nbsp; {obj.VchDate.substr(0, 10).split('-').reverse().join('/')}
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td style={{ width: "35%" }}>
                                                                    <table style={{ width: "100%", fontSize: '0.95em', textAlign: 'left', fontWeight: 500 }} cellPadding={3} align="right" >
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    <b>Patient Name &nbsp;:&nbsp; </b>{obj.PartyName} &nbsp;&nbsp; {obj.Age} Yrs {obj.Gender}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <b>Doctor &nbsp;:&nbsp; </b>Alam Khan Kalyani
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> 
                                                                                    <b>Customer &nbsp;:&nbsp;</b>
                                                                                    <span>
                                                                                        {obj.PartyName} [{obj.CpartyCode}] &nbsp;&nbsp; {obj.PMobile} &nbsp;&nbsp; {obj.BillingAddress}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> 
                                                                                    <b>Order No. &nbsp;:&nbsp;</b>
                                                                                    <span>
                                                                                        {obj.BillNo} &nbsp;&nbsp;&nbsp; {obj.ChallanDate.substr(0, 10).split('-').reverse().join('/')}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={3} style={{ borderBottom: "1px solid #000", fontSize: 18 }} align="center" ></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={3} style={{height: '2px', borderBottom: '2px solid'}} />
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody style={{minHeight: '260px !important'}}>
                                        <tr>
                                            <td colSpan={2}>
                                                <table style={{width: '100%', borderRadius: '1px', borderCollapse: 'collapse', fontSize: '0.95em'}} cellSpacing={0}>
                                                    <thead>
                                                        <tr style={{borderBottom: '1px solid black'}}>
                                                            <th className="text-start">HSN</th>
                                                            <th className="text-start">Particulars</th>
                                                            <th className="text-start">Pack</th>
                                                            <th className="text-start">MFG</th>
                                                            <th className="text-start">Batch</th>
                                                            <th className="text-start">EXP Dt.</th>
                                                            <th className="text-end">MRP</th>
                                                            <th className="text-end">Qty.</th>
                                                            <th className="text-start">Unit</th>
                                                            <th className="text-end text-nowrap">{b2bMode ? 'Rate' : 'Net Rate'}</th>

                                                            {b2bMode ? <>
                                                                <th className="text-end">DISC%</th>
                                                                <th className="text-end">SCH%</th>
                                                            </> : ''}

                                                            <th className="text-end">CGST</th>
                                                            <th className="text-end">SGST</th>
                                                            <th className="text-end">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {obj.SalesDetailsList.map(i => (
                                                            <tr key={i.AutoId}>
                                                                <td style={{textAlign: 'left', verticalAlign: 'top'}}>
                                                                    {i.HSNSACNO}
                                                                </td>
                                                                <td style={{textAlign: 'left', verticalAlign: 'top'}}>
                                                                    {i.Description}
                                                                </td>
                                                                <td style={{textAlign: 'left', verticalAlign: 'top', textWrap: 'nowrap'}}>
                                                                    {i.PackSizeDesc}
                                                                </td>                                    
                                                                <td style={{textAlign: 'left', verticalAlign: 'top'}}>
                                                                    {i.MFGBy}                                    
                                                                </td>
                                                                <td style={{textAlign: 'left', verticalAlign: 'top'}}>
                                                                    {i.TrackingNo}                                   
                                                                </td>
                                                                <td style={{textAlign: 'left', verticalAlign: 'top'}}>
                                                                    {new Date(i.EXPDate).toLocaleDateString('en-TT')}                                  
                                                                </td>
                                                                <td style={{textAlign: 'right', verticalAlign: 'top'}}>
                                                                    {i.MRP}
                                                                </td>
                                                                <td style={{textAlign: 'right', verticalAlign: 'top'}}>
                                                                    {i.BillQty}
                                                                </td>
                                                                <td style={{textAlign: 'left', verticalAlign: 'top'}}>
                                                                    {i.UnitName}
                                                                </td>
                                                                <td style={{textAlign: 'right', verticalAlign: 'top'}}>
                                                                    {i.NetRateS}
                                                                </td>

                                                                {b2bMode ? <>
                                                                    <td style={{textAlign: 'right', verticalAlign: 'top'}}>{i.DiscountText}</td>
                                                                    <td style={{textAlign: 'right', verticalAlign: 'top'}}></td>   
                                                                </> : ''}

                                                                <td style={{textAlign: 'right', verticalAlign: 'top'}}>
                                                                    {i.CGSTRATE}
                                                                </td>
                                                                <td style={{textAlign: 'right', verticalAlign: 'top'}}>
                                                                    {i.SGSTRATE}
                                                                </td>   
                                                                <td style={{textAlign: 'right', verticalAlign: 'top'}}>
                                                                    <span>{i.Amount}</span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        <tr style={{fontWeight: 'bold', borderTop: '1px solid black'}}>
                                                            {/* <td colSpan={11}/>
                                                            <td style={{textAlign: 'right'}}> Total: </td>
                                                            <td style={{textAlign: 'right'}}> {obj.Amount} </td> */}
                                                            <td style={{paddingTop: '4px'}}></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <table style={{width: '100%', borderLeft: '0px solid #000', borderRight: '0px solid #000'}} cellPadding={1} cellSpacing={0}>
                                                    <tbody>
                                                        <tr>
                                                            {b2bMode ? '' :
                                                            <td style={{width: '35%', verticalAlign: 'top'}}>
                                                                <table style={{width: '100%'}} cellSpacing={0} cellPadding={0}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style={{width: '80%'}}>
                                                                                <font><b>MRP Value :</b> {obj.TaxDetails.MRPValue.toFixed(2)}</font><br />
                                                                                <font><b>Savings:</b> {obj.TaxDetails.Savings.toFixed(2)}</font><br />
                                                                                {isNumber(obj.TaxDetails.SavingsPer) ? <font><b>Savings(%):</b> {obj.TaxDetails.SavingsPer.toFixed(2)}</font> : ''}
                                                                            </td>
                                                                            <td style={{width: '20%', textAlign: 'right', verticalAlign: 'bottom'}}>
                                                                                <font style={{fontWeight: 'bold'}}>E &amp; O.E</font>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td> }
                                                            <td style={{width: '30%'}}>
                                                                <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.95em'}}>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td style={{verticalAlign: 'middle', textAlign: 'center', fontWeight: 'bold', border: '1px solid black'}}>Taxable Value</td>
                                                                        <td style={{verticalAlign: 'top', textAlign: 'center', fontWeight: 'bold', border: '1px solid black'}}>CGST</td>
                                                                        <td style={{verticalAlign: 'top', textAlign: 'center', fontWeight: 'bold', border: '1px solid black'}}>SGST</td>
                                                                        <td style={{verticalAlign: 'middle', textAlign: 'center', fontWeight: 'bold', border: '1px solid black'}}>Total Tax</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{verticalAlign: 'middle', textAlign: 'center', border: '1px solid black'}}>{obj.TaxDetails.TaxableAmount.toFixed(2)}</td>
                                                                        <td style={{verticalAlign: 'middle', textAlign: 'center', border: '1px solid black'}}>{obj.TaxDetails.CGST.toFixed(2)}</td>
                                                                        <td style={{verticalAlign: 'middle', textAlign: 'center', border: '1px solid black'}}>{obj.TaxDetails.SGST.toFixed(2)}</td>
                                                                        <td style={{verticalAlign: 'middle', textAlign: 'center', border: '1px solid black'}}>{obj.TaxDetails.TotalTax.toFixed(2)}</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                            <td style={{width: '7%'}}>
                                                                <table style={{ width: '100%', display: 'none'}} cellPadding={1} cellSpacing={0}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style={{paddingTop: '4px'}}>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                            <td style={{width: '28%', verticalAlign: 'top', paddingRight: 2}}>
                                                                <table style={{ width: "100%", fontSize: '1em' }} >
                                                                    <tbody>
                                                                        {obj.ExpenseDetails.map(i => (
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
                                                                                <b>Total </b>
                                                                            </td>
                                                                            <td align="right"><b>{obj.Amount}</b></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td valign="top"> 
                                                                                <b>Paid Amount </b>
                                                                            </td>
                                                                            <td align="right">
                                                                                <table style={{ width: "100%" }}>
                                                                                    <tbody>
                                                                                        {obj.VoucherList.map(i => (
                                                                                            <tr key={i.AutoId}>
                                                                                                <td align="right">
                                                                                                    <div className="d-flex justify-content-between">
                                                                                                        <font style={{ fontStyle: "italic", fontWeight: "bold" }} > By {i.PaymentMode}</font> 
                                                                                                        <b>{i.VoucherAmount}</b>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                        {obj.VoucherList.length > 1 && <tr>
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
                                                            <td colSpan={b2bMode ? 3 : 4}>
                                                                <span>Total bill value is <b> {obj.AmountText}</b></span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2}>
                                            <table style={{width: '100%', borderRadius: '1px', borderTop: '1px solid #000', padding: '1px'}} cellSpacing={0} cellPadding={0}>
                                                <tbody><tr>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: '80%'}}>
                                                    </td>
                                                    <td style={{width: '20%', textAlign: 'right'}}>
                                                    <b>Pharmacist Signature</b> 
                                                    </td>
                                                </tr>
                                                </tbody></table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <b>Terms and Conditions:</b> {obj.TermsAndConditions}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>  
        )
    }

    // const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //   content: () => componentRef.current,
    // });

    return (
        <div className="print-page invoice-print" id="printContent" style={{width:'100%'}}>
            {renderData(data)}
        </div>
    )
}

const mapStateInvoicePrint = (state) => {
	return { compCode: state.compCode };
}
  
export default connect(mapStateInvoicePrint, {breadCrumbAction})(InvoicePrint);

