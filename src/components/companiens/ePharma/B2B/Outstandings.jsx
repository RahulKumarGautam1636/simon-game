import { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductTable from "../invoiceTable";
import { MyModal, Spinner } from "../utilities";

import Button from 'react-bootstrap/Button';
import MyDatePicker from "./MyDatePicker";

const Outstandings = ({ compCode }) => {

    const [activeTab, setActiveTab] = useState('pending');

    const orders = [
        {
            VchNo: "SO00000080",
            Amount: 767.17,
            VchDate: "2025-03-05T00:00:00",
            OrderStatus: "Due"
        },
        {
            VchNo: "SO00000079",
            Amount: 391.41,
            VchDate: "2025-03-04T00:00:00",
            OrderStatus: "Due"
        }
    ]

    const [distributer, setDistributer] = useState('')

    const [invoice, setInvoice] = useState({ id: '', isActive: false });

    return (
        <section className='px-0 px-md-5'>
            <style>{`
                .user-tabs .nav-tabs > li > a, .user-tabs .nav-tabs > li > span {
                    padding: 0.3em;
                    font-size: 1.2em;
                }
            `}</style>
           <div className="d-flex flex-column-reverse flex-lg-row gap-3 gap-lg-5 bg-white p-4 mt-4" style={{minHeight: '50rem'}}>
                <div className="flex-1">
                   <div className="d-flex justify-content-between flex-wrap" style={{borderBottom: '2px solid #dddddd'}}>
                        <div>
                            <h4 style={{fontSize: '1.5em'}}>Aarush Tirupati Enterprise (MR-KOL-2) 
                                {/* <span className="badge badge-pill" style={{background: '#c9eaff', fontSize: '1.1em', width: 'fit-content', marginTop: '0.3em', color: '#006693'}}>55KVW3C</span> */}
                                <span className="ms-3" style={{fontSize: '0.7em', color: '#037be7'}}>55KVW3C</span>
                            </h4>
                            <p>Last paid on 3 Mar 2025</p>
                        </div>
                        <div className="d-flex gap-3 align-items-center pb-3 ms-auto ms-lg-0">
                            <b className="position-relative me-3 pointer pe-3">INVOICES
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    2<span className="visually-hidden">unread messages</span>
                                </span>
                            </b>
                            <button className='dashboard-card__btn-box-item reverse-hover d-flex align-items-center icon-btn' style={{'--clr': '#48fffc3b', '--bg': '#149A8D', '--bClr': '#149a8d57', gap: '0.3em', padding: '0.3em 0.5em 0.3em'}}><i className='bx bx-filter-alt'></i> FILTERS</button>
                        </div>
                    </div>
                    <div className="user-tabs my-4">
                        <ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap">
                            <li className="nav-item">
                                <Link className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('pending')}>
                                    Pending
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${activeTab === 'inProcess' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('inProcess')}>
                                    <span>In Process</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${activeTab === 'settled' ? 'active' : ''}`} to="#" onClick={() => setActiveTab('settled')}>
                                    <span>Settled</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id='patiendProfile_tabs'>
                        <div id="pending" className={`tab-pane fade ${activeTab === 'pending' ? 'show active' : ''}`}>
                            
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'inProcess' ? 'show active' : ''}`} id="inProcess">
                            
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'settled' ? 'show active' : ''}`} id="settled">
                            
                        </div>
                    </div>

                    <div className='w-100 overflow-auto' style={{ maxHeight: "90vh", boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', fontSize: '1.8rem' }}>
                        <Table className="table-standard">
                            <thead>
                                <tr className='row-style'>
                                    <th className='text-nowrap'>INVOICE#</th>
                                    <th className='text-nowrap text-end'>Pending Amount</th>
                                    <th className='text-nowrap text-end'>Invoice Date</th>
                                    <th className='text-nowrap text-end'>Due Date</th>
                                    <th className='text-nowrap text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {renderTabs(myOrderData)} */}
                                {orders.map(order => (
                                    <tr>
                                        <td className='text-nowrap'>{order.VchNo}</td>
                                        <td className='text-nowrap text-end'><i className="fas fa-rupee-sign text-primary"></i> {parseFloat(order.Amount).toFixed(2)}</td>
                                        <td className='text-nowrap text-end'>{order.VchDate.slice(0, 10).split('-').reverse().join('-')}</td>
                                        <td className='text-nowrap text-end'>
                                            <div className="d-flex gap-3 justify-content-end">
                                                {order.VchDate.slice(0, 10).split('-').reverse().join('-')}
                                                <span className='badge badge-pill w-fit d-flex align-items-center text-uppercase' style={{ background: '#f79300', fontSize: '0.8em' }}>{order.OrderStatus}</span>
                                            </div>
                                        </td>
                                        <td className='text-nowrap text-center' >
                                            <Link to={'#'} onClick={() => setInvoice({ id: 1622144, isActive: true })}>
                                                <i className="far fa-eye text-primary"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="dashboard-card__btn-box mt-5 justify-content-start flex-wrap">
                        <Link to={`#`} className={`dashboard-card__btn-box-item`} style={{'--clr': '#0b877b', '--bg': '#48fffc3b', '--bClr': '#149a8d57'}}><i className="bx bxs-wallet me-1" ></i> Quick Pay</Link>
                        <Link to={`#`} className={`dashboard-card__btn-box-item`} style={{'--clr': '#169314', '--bg': '#8cffcf52', '--bClr': '#26ae2454'}}><i className='bx bxs-download me-1' ></i> Download Statement</Link>
                        <Link to={`/transactions`} className='dashboard-card__btn-box-item' style={{'--clr': '#E80202', '--bg': '#ffbcbc63', '--bClr': '#ff33333d'}}><i className='bx bx-transfer-alt me-1' ></i> View Transaction</Link>
                    </div>
                </div>
                <div style={{ minWidth: '37rem' }}>
                    <div className={`sidebar-categores-box light-bg h-100`} style={{border: '1px solid #dfdfdf'}}>
                        <div className="sidebar-title border-0" style={{cursor: 'pointer'}}>
                            <h2 className='d-flex align-items-center gap-2 mb-3'><span className='me-auto'>Search Distributers</span></h2>
                        </div>
                        <div className="filter-sub-area pt-sm-10 pb-sm-15 pb-xs-0">
                            <div className="categori-checkbox">
                                <form>
                                    <div className="input-group flex-nowrap">
                                        <input className="form-control" onChange={(e) => setDistributer(e.target.value)} value={distributer} name="query" type="text" placeholder="Search Distributer" style={{fontSize: '1.1em', border: '1px solid #dbdbdb', background: '#efefef'}} />
                                        <span className="input-group-text" id="basic-addon2">Search</span>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="side-tab-group mt-4">
                            <div className="pointer active">
                                <h4 style={{fontSize: '1.2em'}}>Aarush Tirupati Enterprise (MR-KOL-2) 
                                    <span className="d-block mt-1" style={{fontSize: '0.7em', color: '#037be7'}}>55KVW3C</span>
                                </h4>
                                <p className="fw-bold mb-0 d-flex justify-content-between align-items-center">Outstanding: ₹ 6500 <i className='bx bx-right-arrow-alt' style={{transform: 'scale(2.4)', color: '#FF5722'}}></i></p>
                            </div>
                            <div className="pointer">
                                <h4 style={{fontSize: '1.2em'}}>Aarush Tirupati Enterprise (MR-KOL-2) 
                                    <span className="d-block mt-1" style={{fontSize: '0.7em', color: '#037be7'}}>55KVW3C</span>
                                </h4>
                                <p className="fw-bold mb-0 d-flex justify-content-between align-items-center">Outstanding: ₹ 6500 <i className='bx bx-right-arrow-alt' style={{transform: 'scale(2.4)', color: '#FF5722'}}></i></p>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           {invoice.isActive && <MyModal name='local-handler' handleClose={() => setInvoice({id: '', isActive: false})} bodyClass='bg-white p-0 p-lg-3' width='inherit' styles={{padding: 0}} child={<ProductTable invoiceId={invoice.id} compCode={compCode} />} closeIcon={false} />}
        </section>
    )
}


export default Outstandings;


export const Trasnsactions = () => {

    const dummyData = { taransId: 'CLO6124432', paymentTo: 'Aarush Tirupati Enterprise (MR-KOL-2)', paymentMode: 'UPI', paymentDate: '01 Mar 2025, 12:36 AM', amount: '2544.75', isSuccess: true };

    const [transactions, setTransactions] = useState({ loading: false, data: { invoiceData: [dummyData, dummyData, dummyData] }, err: { status: false, msg: '' } });

    let strDate = new Date().toLocaleDateString('en-TT');
    let eDate = new Date().toLocaleDateString('en-TT');

    const renderTabs = (data) => {
        
        if (data.loading) {
            return <tr className='pe-none'><td colSpan={11} className='p-0'><Spinner min_height='15rem' fSize='2.5rem' styles={{background: 'white'}} /></td></tr>;
        } else if (data.err.status) {
            return <td colSpan={11} className='text-center fs-1 py-4'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark mt-4'>{data.err.msg}</span></h2></td>;
        } else if (data.data.invoiceData.length === 0) {
            return <tr className='pe-none'><td colSpan={11} className='p-0'>NO TRANSACTIONS FOUND.</td></tr>
        } else {
            return data.data.invoiceData.map(order => {
                return (
                    <tr key={order.taransId} className='position-relative'>
                        <td className='text-nowrap'>{order.taransId}</td>
                        <td className='text-nowrap'>{order.paymentTo}</td>
                        <td className='text-nowrap center'>{order.paymentMode}</td>
                        <td className='text-nowrap text-end'>{order.paymentDate}</td>
                        <td className='text-nowrap text-end'>{order.amount}</td>
                        <td className='text-nowrap text-end'>
                            <span className='badge badge-pill w-fit ms-auto d-flex align-items-center' style={{ background: order.isSuccess ? 'var(--tw-green-600)' : 'orangered', fontSize: '0.8em' }}>{order.isSuccess ? 'SUCCESS' : 'FAILED'}</span>
                        </td>
                    </tr>
                )
            })
        }
    }
    
    return (
        <div className='w-100 p-2 px-3 p-md-4 max-w-[1200px] mx-auto'>
            <style>{`
                .stat-card {
                    padding: 1.3em 0.2em;
                    // background: white;
                    text-align: center;
                    box-shadow: rgb(60 64 67 / 17%) 0px 1px 2px 0px, rgb(60 64 67 / 11%) 0px 1px 3px 1px;
                    border-radius: 1em;
                }
                .stat-card h2 {
                    color: white;
                    font-size: clamp(1.5em, 5vw, 2.5em);
                }
                .stat-card p {
                    font-size: 1.2em;
                    color: white;
                }
            `}</style>
            <div className='gy-2 mt-3 mb-4'>
                <h4 className='mb-3' style={{borderBottom: '2px solid #c8c8c8', paddingBottom: '0.4em'}}>Transactions</h4>
                <div className="row g-3 mb-4 mb-lg-30">
                    <div className="col-6">
                        <div className="stat-card bg-gradient-to-r from-cyan-500 to-blue-500">
                            <h2>26</h2>
                            <p className="mb-0">Transactions</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="stat-card bg-gradient-to-r from-amber-500 to-pink-500">
                            <h2>₹ 25466.00</h2>
                            <p className="mb-0">Total Amount</p>
                        </div>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-6 col-md-2">
                        <MyDatePicker
                            value={strDate}
                            onChange={(selectedDates) => {}}
                            placeholder="Start date"
                            className='inputMyorder'
                        />
                    </div>
                    <div className="col-6 col-md-2">
                        <MyDatePicker
                            value={eDate}
                            onChange={(selectedDates) => {}}
                            placeholder="End date"
                            className='inputMyorder'
                        />
                    </div>
                    <div className="col-12 col-md-2">
                        <Button variant="primary" className="myOrderbtn w-100" size={"sm"}>FILTER BY DATE</Button>
                    </div>
                </div>
            </div>

            <div className='w-100 mt-2 overflow-auto' style={{ maxHeight: "90vh", boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', fontSize: '1.8rem' }}>
                <Table className="table-standard">
                    <thead>
                        <tr className='row-style'>
                            <th className='text-nowrap'>Transaction ID</th>
                            <th className='text-nowrap'>Payment To</th>
                            <th className='text-nowrap'>Payment Mode</th>
                            <th className='text-nowrap text-end'>Payment Date</th>
                            <th className='text-nowrap text-end'>Amount</th>
                            <th className='text-nowrap text-end'>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTabs(transactions)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}