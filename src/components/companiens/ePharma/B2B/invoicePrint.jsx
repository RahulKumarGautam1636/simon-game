// import { useReactToPrint } from 'react-to-print';
// import { useRef } from "react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { getFrom } from "./../utilities";
import { Spinner } from './../utilities';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isNumber } from "lodash";
import { breadCrumbAction } from "../../../../actions";
import { BASE_URL, TAKE_HOME_ID } from "../../../../constants";

const B2BInvoicePrint = ({ match, compCode, breadCrumbAction }) => {

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

    const styles = `
        p {
            font-size: 0.93em;
            margin-bottom: 0em;
            font-weight: 600;
        } 
        .landscape {
            width: 297mm;
            min-height: 210mm;
        }
        table {
            width: 100%;
        }
        thead {
            background: white;
        }
        td, th {
            padding: 0px 4px;
            border: 1px solid gray;
            font-weight: 600;
        }
        h4 {
            font-size: 1.35em;
            font-weight: 800;
        }
        h5, h6 {
            font-size: 1.05em;
            font-weight: 800;
            color: black;
        }
        .h6 {
            font-size: 0.95em;
        }
        .challan td {
            padding: 0 0 0 7px;
        }
        .challan h6 {
            font-weight: 700;
            font-size: 0.93em;
        }
        .items-table th {
            background: #d3d3d3;
            font-weight: 900;
            border: 1px solid gray;
            line-height: 1.6em;
        }
        .table-head p {
            line-height: 1.4em;
        }
    `

    // const products = [
    //     { qty: 3, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    //     { qty: 5, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    //     { qty: 7, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    //     { qty: 2, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    //     { qty: 1, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    //     { qty: 3, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    //     { qty: 5, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    //     { qty: 8, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    //     { qty: 2, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    //     { qty: 10, Mfr: 'N.DR', Pack: "10'S", Name: 'BRIV 50', Batch: 'BDB240813', Exp: '7/26', HSN: 300490, MRP: 186.00, Rate: 132.86, PTR: 132.86, Dis: 10.0, SGST: 6.00, CGST: 6.00 },
    // ]

    const taxes = [
        { CLASS: 'GST 5.00%', TOTAL: '0.00', SCHEME: '0.00', DISCOUNT: '0.00', SGST: '0.00', CGST: '0.00', TOTAL_GST: '0.00', ALL_TOTAL: '881.23' },
        { CLASS: 'GST 12.00%', TOTAL: '13000.05', SCHEME: '0.00', DISCOUNT: '881.23', SGST: '727.14', CGST: '727.14', TOTAL_GST: '1454.28', ALL_TOTAL: '727.14' },
        { CLASS: 'GST 18.00%', TOTAL: '0.00', SCHEME: '0.00', DISCOUNT: '0.00', SGST: '0.00', CGST: '0.00', TOTAL_GST: '0.00', ALL_TOTAL: '727.14' },
        { CLASS: 'GST 28%', TOTAL: '0.00', SCHEME: '0.00', DISCOUNT: '0.00', SGST: '0.00', CGST: '0.00', TOTAL_GST: '0.00', ALL_TOTAL: '0.00' },
    ]

    const prescriptionPage = (obj) => {
        const paidAmount = obj.VoucherList.reduce((total, i) => (total + i.Amount), 0).toFixed(2);
        // const dueAmount = paidAmount - obj.Amount;
        
        return (
            <div className="" id="printContent" style={{ width: "100%" }}>
                <style>{styles}</style>
                <div className="col-12 w-100 d-flex justify-content-center">
                    <div className="print-btn-box">
                        <button onClick={() => history.goBack()} type="buttom" className="btn btn-primary btnSave print-button" tabIndex="1">Back</button>
                        <button onClick={() => window.printPage()} type="buttom" className="btn btn-primary btnSave print-button" tabIndex="1">Print</button>
                    </div>
                </div>
                <div className="col-md-12" style={{ width: "100%" }}>
                    <div className="card A4page landscape">                      
                        <div className="card-body pt-3" style={{ width: "100%", padding: "0 1.25rem 0 1.25rem" }} >
                            <table style={{ border: '1px solid gray' }} id="print-tabale" className="w-100">
                                <thead className="table-head">
                                    <tr>
                                        <th style={{width: '30%', paddingLeft: '0.7em'}}>
                                            <h5 className="text-uppercase mb-1" >{obj.CompanyMaster.COMPNAME}</h5>  
                                            <p>{obj.CompanyMaster.ADDRESS}</p>
                                            <p><b>GSTIN: </b>&nbsp;&nbsp; {obj.GSTIN}</p>
                                            <p><b>DL. No.: </b>&nbsp;&nbsp; {obj.CompanyLicenceNo}</p>
                                            <p><b>Phone: </b>&nbsp;&nbsp; {obj.PMobile}</p>
                                        </th>
                                        <th vAlign="top" className="p-0" style={{width: '40%'}}>
                                            <table className="challan">
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center py-2" colSpan={4}>
                                                            <h4 className="m-0">CHALLAN (CASH)</h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '25%'}}>
                                                            <h6>Invoice No.</h6>
                                                        </td>
                                                        <td style={{width: '25%'}}>
                                                            <h6>{obj.VchNo}</h6>
                                                        </td>
                                                        <td style={{width: '25%'}}>
                                                            <h6>Order No.</h6>
                                                            <h6>Order Date.</h6>
                                                        </td>
                                                        <td style={{width: '25%'}}>
                                                            <h6>{obj.BillNo}</h6>
                                                            <h6>{obj.ChallanDate.substr(0, 10).split('-').reverse().join('/')}</h6>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{width: '25%'}}>
                                                            <h6>Invoice Date.</h6>
                                                            <h6>Due Date.</h6>
                                                        </td>
                                                        <td style={{width: '25%'}}>
                                                            <h6>{obj.VchDate.substr(0, 10).split('-').reverse().join('/')}</h6>
                                                            <h6>&nbsp;</h6>
                                                        </td>
                                                        <td style={{width: '25%'}}>
                                                            <h6>L.R. No.</h6>
                                                            <h6>L.R. Date.</h6>
                                                        </td>
                                                        <td style={{width: '25%'}}>
                                                            <h6>&nbsp;</h6>
                                                            <h6>&nbsp;</h6>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                        <th style={{width: '30%', paddingLeft: '0.7em'}}>
                                            <p className="text-decoration-underline mb-2">PARTY NAME : -</p>
                                            <h5 className="text-uppercase mb-1" >{obj.PartyName}</h5>  
                                            <p>{obj.BillingAddress}</p>
                                            <p><b>GSTIN: </b>&nbsp;&nbsp; {}</p>
                                            <p><b>DL. No.: </b>&nbsp;&nbsp; {}</p>
                                            <p className="mb-1"><b>Phone: </b>&nbsp;&nbsp; {obj.PMobile}</p>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td colSpan={3} className="p-0 border-0">
                                            <table className="items-table">
                                                <thead>
                                                    <tr>
                                                        <th>S. </th>
                                                        <th>Qty. </th>
                                                        <th>Mfr </th>
                                                        <th>Pack </th>
                                                        <th>Product Name </th>
                                                        <th>Batch </th>
                                                        <th>Exp </th>
                                                        <th>HSN </th>
                                                        <th>M.R.P </th>
                                                        <th>Rate </th>
                                                        <th>PTR </th>
                                                        <th>Dis </th>
                                                        <th>SGST </th>
                                                        <th>CGST</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {obj.SalesDetailsList.map((i, n) => (
                                                        <tr>
                                                            <td>{n + 1}.</td>
                                                            <td>{i.BillQty}</td>
                                                            <td>{i.MFGBy}</td>
                                                            <td>{i.PackSizeDesc}</td>
                                                            <td>{i.Description}</td>
                                                            <td>{i.TrackingNo}</td>
                                                            <td>{new Date(i.EXPDate).toLocaleDateString('en-TT')}</td>
                                                            <td>{i.HSNSACNO}</td>
                                                            <td>{i.MRP}</td>
                                                            <td>{i.Rate}</td>
                                                            <td>{i.PTR}</td>
                                                            <td>{i.DiscountText}</td>
                                                            <td>{i.SGSTRATE}</td>
                                                            <td>{i.CGSTRATE}</td>
                                                            <td>{i.Amount}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="p-0 border-0">
                                            <table className="items-table">
                                                <thead>
                                                    <tr>
                                                        <th>CLASS</th>
                                                        <th>TOTAL</th>
                                                        <th>SCHEME</th>
                                                        <th>DISCOUNT</th>
                                                        <th>SGST</th>
                                                        <th>CGST</th>
                                                        <th>TOTAL GST</th>
                                                        <th style={{minWidth: '8rem'}}></th>
                                                        <th>TOTAL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {taxes.map((i, n) => (
                                                        <tr>
                                                            <td>{i.CLASS}</td>
                                                            <td>{i.TOTAL}</td>
                                                            <td>{i.SCHEME}</td>
                                                            <td>{i.DISCOUNT}</td>
                                                            <td>{i.SGST}</td>
                                                            <td>{i.CGST}</td>
                                                            <td>{i.TOTAL_GST}</td>
                                                            <td></td>
                                                            <td>{i.ALL_TOTAL}</td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td style={{fontWeight: 900}}>TOTAL</td>
                                                        <td>13000.05</td>
                                                        <td>0.00</td>
                                                        <td>881.23</td>
                                                        <td>727.14</td>
                                                        <td>727.14</td>
                                                        <td>1454.28</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={8}>Rs. Fourteen Thousand One Hundred Ninety Four Only</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4}>MSG: </td>
                                                        <td colSpan={4}></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4}>
                                                            <h5 className="text-uppercase mb-1" >TERMS & CONDITIONS : -</h5> 
                                                            <p>{obj.CompanyMaster.ADDRESS}</p>
                                                            <p>Goods once sold will not be taken back or exchanged.</p>
                                                            <p>All disputes subject to Jurisdication only.</p>
                                                            <p>Bills not paid due date will attract 24% interest.</p>
                                                        </td>
                                                        <td colSpan={4} valign="top">
                                                            <div className="p-4">
                                                                <h5 className="text-uppercase" style={{marginBottom: '4.4rem'}}>FOR {obj.CompanyMaster.COMPNAME}</h5> 
                                                                <h5 className="text-uppercase mb-0 text-end"> Authorised Signatory</h5>  
                                                            </div>
                                                        </td>
                                                        <td style={{background: '#efefef'}}>
                                                            <h4 className="m-0 text-center" style={{lineHeight: '2em'}}>GRAND TOTAL <br/>14194.00</h4>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    return (
        <div className="print-page invoice-print" id="printContent" style={{width:'100%'}}>
            {renderData(data)}
        </div>
    )
}

const mapStateInvoicePrint = (state) => {
	return { compCode: state.compCode };
}
  
export default connect(mapStateInvoicePrint, {breadCrumbAction})(B2BInvoicePrint);

