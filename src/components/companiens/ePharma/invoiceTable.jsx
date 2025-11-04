import { Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../constants";
import { useEffect, useState } from "react";
import { getFrom, Spinner } from "./utilities";



const tableData = [
    {
        description: "Medicine A",
        pack: "Box",
        expDate: "2025-12-31",
        remarks: "Keep in cool place",
        billQty: 10,
        freeQty: 1,
        qUOM: "Pcs",
        mrp: 500,
        mrpDiscount: 5,
        rate: 450,
        discount: 2,
        discountAmount: 9,
        schemeDiscount: 1,
        schemeDiscountAmount: 4,
        taxableAmount: 437,
        cgstPercent: 5,
        cgstAmount: 21.85,
        sgstPercent: 5,
        sgstAmount: 21.85,
        amount: 480.7,
        profit: 50,
        loss: 0,
        action: "Edit | Delete"
    },
    {
        description: "Medicine B",
        pack: "Strip",
        expDate: "2026-06-15",
        remarks: "Away from sunlight",
        billQty: 5,
        freeQty: 0,
        qUOM: "Tablets",
        mrp: 300,
        mrpDiscount: 10,
        rate: 270,
        discount: 3,
        discountAmount: 8.1,
        schemeDiscount: 2,
        schemeDiscountAmount: 5.4,
        taxableAmount: 256.5,
        cgstPercent: 5,
        cgstAmount: 12.83,
        sgstPercent: 5,
        sgstAmount: 12.83,
        amount: 282.16,
        profit: 30,
        loss: 0,
        action: "Edit | Delete"
    }
];

const MyTable = ({ column, tableData }) => {
    return (
        <Table hover bordered className="table-standard">
            <thead className="table-success">
                <tr>
                    {column.map((el, index) => (
                        <th key={`${index}th002`} className='text-nowrap'>{el.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, rowIndex) => (
                    <tr key={`${rowIndex}ordertr`}>
                        {column.map((col, colIndex) => {
                            if (col.render) {
                                return <td key={`${rowIndex}-${colIndex}td002`} className='text-nowrap'>{col.render(row, rowIndex, colIndex)}</td>
                            }
                            switch (col.key) {
                                case "action":
                                    return (
                                        <td key={`${rowIndex}-${colIndex}td002`} className='text-nowrap text-center'>
                                            <i className='bx bx-x-circle ms-md-2 text-danger circle-rounded' role='button' style={{ fontSize: '1.3em', verticalAlign: 'sub' }}></i>
                                        </td>)
                                default: return (
                                    <td key={`${rowIndex}-${colIndex}td002`} className='text-nowrap'>{row[col.key] ? row[col.key] : ""}</td>
                                )
                            }
                        })}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

// const column = [
//     { label: "Description", key: "description" },
//     { label: "Pack", key: "pack" },
//     { label: "EXP Date", key: "expDate" },
//     { label: "Remarks", key: "remarks" },
//     {
//         label: "BillQty", key: "billQty",
//         render: (row) => {
//             return (
//                 <div className='d-flex justify-content-between align-items-center' style={{ color: '#898989' }}>
//                     <span className='text-dark mx-1'>
//                         {row["billQty"]}
//                     </span>
//                 </div>
//             )
//         }
//     },
//     { label: "Free Qty", key: "freeQty" },
//     { label: "Q. UOM", key: "qUOM" },
//     { label: "MRP", key: "mrp" },
//     { label: "MRP Dis(%)", key: "mrpDiscount" },
//     { label: "Rate", key: "rate" },
//     { label: "Dis(%)", key: "discount" },
//     { label: "Dis. Amt.", key: "discountAmount" },
//     { label: "Sch Dis(%)", key: "schemeDiscount" },
//     { label: "Sch Dis", key: "schemeDiscountAmount" },
//     { label: "Taxable Amt", key: "taxableAmount" },
//     { label: "CGST %", key: "cgstPercent" },
//     { label: "CGST", key: "cgstAmount" },
//     { label: "SGST %", key: "sgstPercent" },
//     { label: "SGST", key: "sgstAmount" },
//     { label: "Amount", key: "amount" },
//     { label: "Profit", key: "profit" },
//     { label: "Loss", key: "loss" },
//     {
//         label: "Action", key: "action",
//         render: () => {
//             return (
//                 <div className="text-center">
//                     <i className='bx bx-x-circle ms-md-2 text-danger circle-rounded' role='button' style={{ fontSize: '1.3em', verticalAlign: 'sub' }}></i>
//                 </div>
//             )
//         }
//     }
// ];

const ProductTable = ({ compCode, invoiceId }) => {

    const [data, setData] = useState({loading: true, data: { SalesObj: {CompanyMaster: {}, SalesDetailsList: [], VoucherList: []} }, err: {status: false, msg: ''}});

    useEffect(() => {
        getData(invoiceId)
    }, [invoiceId])

    const getData = async (query) => {
        if (query) {
            const res = await getFrom(`${BASE_URL}/api/Appointment/GetBill?BilId=${query}&CID=${compCode}&type=`, {}, setData);
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
            return renderPage(data.data.SalesObj);
        }
    }

    const renderPage = (obj) => {
        return (
            <div className="p-3">
                <h4>{obj.CompanyMaster.COMPNAME} ({obj.LocationName})</h4>
                <div className="p-2 px-3 rounded w-100 my-4" style={{ backgroundColor: "var(--tw-gray-100)", lineHeight: '2.6rem' }}>
                    <div className="d-flex flex-wrap flex-column flex-md-row">
                        <div>
                            <span className="fw-semibold">Invoice ID</span>: <span>{obj.VchNo} </span> <span className="d-none d-md-inline">&nbsp; | &nbsp;</span> 
                        </div>
                        <div>
                            <span className="fw-semibold">Invoice Date</span>: <span>{obj.VchDate.substr(0, 10).split('-').reverse().join('/')}</span> <span className="d-none d-md-inline">&nbsp; | &nbsp;</span> 
                        </div>
                        <div>
                            <span className="fw-semibold">Invoice Amount</span>: <span>₹ {obj.Amount}</span> <span className="d-none d-md-inline">&nbsp; | &nbsp;</span> 
                        </div>
                    </div>
                    <div className="d-flex flex-wrap flex-column flex-md-row">
                        <div>
                            <span className="fw-semibold">DL. No.</span>: <span>{obj.CompanyLicenceNo}</span> <span className="d-none d-md-inline">&nbsp; | &nbsp;</span> 
                        </div>
                        <div>
                            <span className="fw-semibold">GSTIN</span>: <span>{obj.GSTIN}</span>
                        </div>
                    </div>
                </div>

                <div className='w-100 mt-2 overflow-auto' style={{ maxHeight: "90vh", boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', fontSize: '1.3em' }}>
                    {/* <MyTable column={column} tableData={tableData} /> */}
                    <table className="table-standard table table-bordered">
                        <thead className="table-success text-nowrap">
                            <tr className="row-style" style={{fontSize: '0.95em'}}>
                                <th className="1">Description</th>
                                <th className="2">Pack</th>
                                <th className="3">EXP Date</th>
                                <th className="4">Remarks</th>
                                <th className="5">BillQty</th>
                                <th className="6">Free Qty</th>
                                <th className="7">Q. UOM</th>
                                <th className="8">MRP</th>
                                <th className="9">MRP Dis(%)</th>
                                <th className="10">Rate</th>
                                <th className="11">Dis(%)</th>
                                <th className="12">Dis. Amt.</th>
                                <th className="13">Sch Dis(%)</th>
                                <th className="14">Sch Dis</th>
                                <th className="15">Taxable Amt</th>
                                <th className="16">CGST %</th>
                                <th className="17">CGST</th>
                                <th className="18">SGST %</th>
                                <th className="19">SGST</th>
                                <th className="20">Amount</th>
                                {/* <th className="21">Profit</th>
                                <th className="22">Loss</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {obj.SalesDetailsList.map(i => (
                                <tr>
                                <td className="text-nowrap 1">{i.Description}</td>
                                <td className="text-nowrap 2">{i.PackSizeDesc}</td>
                                <td className="text-nowrap 3">{new Date(i.EXPDate).toLocaleDateString('en-TT')}</td>
                                <td className="text-nowrap 4"></td>
                                <td className="text-nowrap 5 text-end">{i.BillQty}</td>
                                <td className="text-nowrap 6"></td>
                                <td className="text-nowrap 7">{i.UnitName}</td>
                                <td className="text-nowrap 8 text-end">{i.MRP}</td>
                                <td className="text-nowrap 9 text-end">{i.MRPOnDisPer}</td>
                                <td className="text-nowrap 10 text-end">{i.NetRateS}</td>
                                <td className="text-nowrap 11 text-end">{i.Discount}</td>
                                <td className="text-nowrap 12 text-end">{i.MRPOnDisAmt}</td>
                                <td className="text-nowrap 13"></td>
                                <td className="text-nowrap 14"></td>
                                <td className="text-nowrap 15 text-end">{i.TaxableAmount}</td>
                                <td className="text-nowrap 16 text-end">{i.CGSTRATE}</td>
                                <td className="text-nowrap 17 text-end">{i.CGST}</td>
                                <td className="text-nowrap 18 text-end">{i.SGSTRATE}</td>
                                <td className="text-nowrap 19 text-end">{i.SGST}</td>
                                <td className="text-nowrap 20 text-end">{i.Amount}</td>
                                {/* <td className="text-nowrap 21"></td>
                                <td className="text-nowrap 22"></td> */}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="dashboard-card__btn-box mt-4">
                    <Link className="dashboard-card__btn-box-item icon-btn fs-3" title="Edit Member" to={`/invoices/${invoiceId}`} style={{'--clr': '#149A8D', '--bg': '#48fffc3b', '--bClr': '#149a8d57'}}>
                        <i className='bx bx-file'></i>  PRINT
                    </Link>
                </div>
            </div>
        )
    }

    return renderData(data)
}
export default ProductTable;