import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { breadCrumbAction, modalAction, loaderAction } from '../../../actions';
// import { Link } from 'react-router-dom';
// import { ConnectedCartCardM } from './mobileView/cards';
import { ConnectedMyOrdersCard, OrderSummaryCard, ReturnProductCard_1 } from './cards';
import { getFallbackImg, getFrom, MyModal, noItemFound, Spinner, wait } from './utilities';
import { useCallback } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { createPortal } from 'react-dom';
import axios from 'axios';
import qs from 'query-string';
import Skeleton from 'react-loading-skeleton';
import { BASE_URL, userRegType } from '../../../constants';
import { OrderCard3 } from './B2B/Home';
import ProductTable from './invoiceTable';

// EnclosedDocObj
// EnqFollowUpList
// SalesDetailsList
// InvoiceList
// OrderStatus
// ApprovalStatus


const Orders = ({ breadCrumbAction, userInfo, compCode, isLoggedIn, modalAction, loaderAction, globalData }) => {

    const location = useLocation();
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 
    const initTab = queryString.pane || 'active';
    const params = useParams();
    const orderId = params.id || '';

    useEffect(() => {
        breadCrumbAction({ links: [{ name: 'Home', link: '/' }, { name: 'My Orders', link: '/myOrderPage' }], activeLink: '/myOrderPage' });
    }, [breadCrumbAction])

    const [tabActive, setTabActive] = useState(initTab);
    const [myOrderData, setMyOrderData] = useState({ loading: false, data: { OrderList: [] }, err: { status: false, msg: '' } });
    const [returnActive, setReturnActive] = useState(false);
    const [orderReturn, setOrderReturn] = useState({ type: '', orderData: {} });
    // const businessType = globalData.businessType.CodeValue;
    const b2bMode = globalData.userRegType.CodeValue === 'Retailer';
    const [invoice, setInvoice] = useState({ id: '', isActive: false });

    const history = useHistory();

    const getMyOrders = useCallback(async (partyCode, locationId, id) => {
        let url;
        if (orderId) {
            url = `${BASE_URL}/api/Pharma/GetOrderDetails?CID=${compCode}&ORDERID=${id}&PID=${partyCode}&Type=${tabActive}&LOCID=${locationId}`
            // url = `${BASE_URL}/api/Pharma/Get?CID=${compCode}&PID=${partyCode}&Type=${tabActive}&LOCID=${locationId}`
        } else {
            url = `${BASE_URL}/api/Pharma/GetOrderList?CID=${compCode}&PID=${partyCode}&Type=${tabActive}&LOCID=${locationId}`
        }
        const res = await getFrom(url, {}, setMyOrderData);
        if (res) {
            setMyOrderData(res);
        } else {
            console.log('No data received');
        }
    }, [tabActive])                                                               // Adding tabActive as dependency will call getMyOrders whenever tabActive is changed with current tab name.

    useEffect(() => {
        setTabActive(initTab);
    },[initTab])

    useEffect(() => {
        if (!isLoggedIn) return history.push('/');
        getMyOrders(userInfo.PartyCode, globalData.location.LocationId, orderId);
    }, [compCode, getMyOrders, isLoggedIn, history, userInfo.PartyCode, globalData.location.LocationId])

    const [swalShown, setSwalShown] = useState(false);

    const cancelOrder = async (id) => {
        Swal.fire({
            title: 'Do you want to Cancel the Order?',
            showCancelButton: true,
            confirmButtonText: 'CANCEL ORDER',
            cancelButtonText: 'CLOSE',
            icon: 'warning',
            customClass: {
                actions: 'my-actions pt-2'    
            },
            }).then(async (result) => {
            if (result.isConfirmed) {
                await wait(1000);
                loaderAction(true);
                const res = await axios.get(`${BASE_URL}/api/Pharma/Get?id=${id}`, {});
                loaderAction(false);
                if (res) {
                    Swal.fire('Order Cancelled Successfully !', '', 'success');
                    if (b2bMode) return history.push(`/myOrders/${id}?pane=cancelled`)
                    history.push(`/myOrders?pane=cancelled`)
                }
            } else if (result.dismiss) {                                // look more in result property (try result.) for other identifiers.
                //   Swal.fire('Changes are not saved', '', 'info') 
            }
        })
    }

    const PrescPreview = ({ orderItem, isRequired }) => {
        const [visible, setVisible] = useState(isRequired);

        useEffect(() => {
            window.renderVenoBox();
        }, [orderItem.VchNo])

        if (!visible) return;
        let imgUrl = `${orderItem.EnclosedDocObj.EnclosedDocList[0]?.FilePath}/${orderItem.EnclosedDocObj.EnclosedDocList[0]?.FileName}`;
        return (
            <div>
                <h6>Your Prescription: </h6>
                <a className="popup-img venobox vbox-item" style={{ color: '#0d6cf9', fontWeight: 500, borderBottom: '1px solid' }} href={imgUrl} data-gall="myGallery">
                    <i className='bx bx-file'></i> {orderItem.VchNo}.png
                    <img
                        className='d-none'
                        src={imgUrl}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;                               // prevents looping
                            currentTarget.src = getFallbackImg();
                            setVisible(false);
                        }}
                        // onLoad={() => setVisible(true)}
                        alt="Uploaded content"
                    />
                </a>
            </div>
        )
    }

    const renderTabs = (data) => {
        if (data.loading) {
            return <Spinner min_height='25rem' fSize='2.5rem' />;
        } else if (data.err.status) {
            return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
        } else if (data.data.OrderList.length === 0) {
            return noItemFound('Orders', tabActive);
        } else {
            return data.data.OrderList.map(order => {
                if (!orderId) return <OrderSummaryCard data={order} tabActive={tabActive} />

                if (orderId && String(order.BillId) !== orderId) return;
                let firstInvoice = order.InvoiceList[0]?.VchNo;

                let maxPrice = (order.SalesDetailsList.map(i => i.ItemMRP * i.BillQty)).reduce((total, num) => total + num, 0).toFixed(2);
                let totalPTR = (order.SalesDetailsList.map(i => i.Rate * i.BillQty)).reduce((total, num) => total + num, 0).toFixed(2);
                // let totalDiscount  = (order.SalesDetailsList.map(i => (i.ItemMRP * i.BillQty) * (i.MRPOnDisPer / 100 ))).reduce((total, num) => total + num, 0).toFixed(2);
                let totalDiscount = (order.SalesDetailsList.map(i => i.DiscountText)).reduce((total, num) => total + num, 0).toFixed(2);
                let totalGST = (order.SalesDetailsList.map(i => i.IGST ? i.IGST : i.CGST + i.SGST )).reduce((total, num) => total + num, 0).toFixed(2);

                return (
                    <div className="order-section" key={order.BillId}>
                        <div className='card-title'>
                            <h5><i className='bx bx-gift'></i> <span className='ms-2 me-4'>ORDER ID: {order.VchNo}</span> <span style={{ fontFamily: 'Lato', fontSize: '0.9em', color: '#3c3c3c' }}>({Object.values(order.SalesDetailsList).length} Items)</span></h5>
                        </div>
                        <div className="row row-cols-1 row-cols-lg-2 order-details mb-4">
    
                            {b2bMode ? 
                                <>
                                    <div className="col">
                                        <div>
                                            <h6>Order ID: </h6>
                                            <h6>{order.VchNo}</h6>
                                        </div>
                                        <div>
                                            <h6>Order Date: </h6>
                                            <h6>{order.VchDate.slice(0, 10).split('-').reverse().join('-')}</h6>
                                        </div>
                                        <div>
                                            <h6>Ordered By: </h6>
                                            <h6>{order.CashPartyName}  ( <i className='bx bxs-phone-call' style={{ verticalAlign: 'sub', fontSize: '1.2em', color: '#e33041' }}></i> {order.CashPartyMobile} )</h6>
                                        </div>
                                        <div>
                                            <h6>Order Value: </h6>
                                            <h6>₹ {parseFloat(order.Amount).toFixed(2)}</h6>
                                        </div>
                                        <div>
                                            <h6>Distributer Name: </h6>
                                            <h6>{order.LocationName}</h6>
                                        </div>
                                        {/* <div className="d-flex mb-3">
                                            <div>
                                                <div className="p-2 px-3 rounded" style={{ backgroundColor: "#cde5ff" }}>
                                                <i className='bx bxs-phone'></i> Call Distributor @ {order.CashPartyMobile}
                                                </div>
                                            </div>
                                            <button className="p-2 px-4 ms-2 rounded text-white" style={{ backgroundColor: "#0D6EFD" }} >Repeat Order</button>
                                        </div> */}
                                    </div>
                                    <div className="col">
                                        <div>
                                            <h6>Total MRP: </h6>
                                            <h6>₹ {maxPrice}</h6>
                                        </div>
                                        <div>
                                            <h6>Total PTR: </h6>
                                            <h6>₹ {totalPTR}</h6>
                                        </div>
                                        <div>
                                            <h6>Total Discount: </h6>
                                            <h6>₹ {totalDiscount}</h6>
                                        </div>
                                        <div>
                                            <h6>Total GST: </h6>
                                            <h6>₹ {totalGST}</h6>
                                        </div>
                                        <div>
                                            <h6>Order Value: </h6>
                                            <h6>₹ {parseFloat(order.Amount).toFixed(2)}</h6>
                                        </div>
                                    </div>
                                </>
                                
                                : 
                            
                                <>
                                    <div className="col">
                                        <div>
                                            <h6>Order ID: </h6>
                                            <h6>{order.VchNo}</h6>
                                        </div>
                                        <div>
                                            <h6>Order Date: </h6>
                                            <h6>{order.VchDate.slice(0, 10).split('-').reverse().join('-')}</h6>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div>
                                            <h6>Name: </h6>
                                            <h6>{order.CashPartyName}  ( <i className='bx bxs-phone-call' style={{ verticalAlign: 'sub', fontSize: '1.2em', color: '#e33041' }}></i> {order.CashPartyMobile} )</h6>
                                        </div>
                                        <div>
                                            <h6>Payment Method: </h6>
                                            <h6>{order.PaymentMethod}</h6>
                                        </div>
                                    </div>
            
                                    <div className="col">
                                        <div>
                                            <h6>Order Value: </h6>
                                            <h6>₹ {parseFloat(order.Amount).toFixed(2)}</h6>
                                        </div>
                                        <div>
                                            <h6>Service Location: </h6>
                                            <h6>{order.LocationName}</h6>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div>
                                            <h6>Delivery Address: </h6>
                                            <h6>{order.PartyAddress}</h6>
                                        </div>
                                    </div>
                                </>
                            }
                            
                            {tabActive === 'cancelled' ? '' : <div className="col">
                                <div className='align-items-start'>
                                    <h6>Order Status: </h6>
                                    {order.OrderStatus ?
                                        <span className='badge badge-pill d-flex align-items-center text-uppercase' style={{ background: order.ApprovalStatus === 'Y' ? '#00ad44' : '#009efb', fontSize: '0.8em' }}>{order.OrderStatus}</span>
                                        :
                                        <span className='badge badge-pill d-flex align-items-center' style={{ background: order.ApprovalStatus === 'Y' ? '#00ad44' : '#009efb', fontSize: '0.8em' }}>{order.ApprovalStatus === 'Y' ? 'PROCESSED' : 'ORDER PLACED'}</span>
                                    }
                                </div>
                                <div className="my-2 align-items-start">
                                    <h6>Billing Status: </h6>
                                    <span className='badge badge-pill d-flex align-items-center' style={{ background: order.BillStatus === 'PENDING' ? '#f29101' : '#00ad44', fontSize: '0.8em' }}>{order.BillStatus === 'CLOSED' ? 'DONE' : order.BillStatus}</span>
                                </div>
                            </div>}
    
                            <div className="col mb-2">
                                <PrescPreview orderItem={order} isRequired={globalData.prescription.required} />
                            </div>  
    
                            {!order.EnqFollowUpList.length ? '' :
                                <div className='delivery-timeline px-0'>
                                    {order.EnqFollowUpList.length === 1 ? '' : <div className='timeline'></div>}
                                    <div className=''>
                                        <table style={{ fontSize: '0.9em' }}>
                                            <tbody>
                                                {order.EnqFollowUpList.map((i, n) => (
                                                    <tr key={n}>
                                                        <td><span>{new Date(i.NextAppDate).toLocaleDateString('en-TT')}<b className='text-nowrap'>{i.NextAppTime}</b></span></td>
                                                        <td><p className='mb-0'>{i.Tag}, {i.Remarks}</p></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>}
    
                            {tabActive === 'active' && <div className="col mb-3 mb-md-0 mt-2">
                                <div className='btn-box-1'>
                                    {order.ApprovalStatus === 'Y' ? '' : <button onClick={(() => cancelOrder(order.BillId))} type="button" className="button add-cart-button" style={{ '--cClr': '#ff4d79', '--cBg': '#ff4d7929' }}><i className="bx bxs-trash-alt"></i> Cancel Order</button>}
                                </div>
                            </div>}
    
                            {tabActive === 'completed' && <div className="col mb-3 mb-md-0">
                                <div className=''>
                                    <button type="button" className="button help" style={{ '--cClr': '#008798', '--cBg': '#00bcd429', flex: 1 }} onClick={() => { setReturnActive(!returnActive); setOrderReturn({type: 'order', orderData: order})}}><i className='bx bx-undo' style={{ verticalAlign: 'sub', fontSize: '1.4em' }}></i> Return</button>
                                </div>
                            </div>}
                        </div>
                        {tabActive === 'completed' && <div className="row mb-4">
                            <div className='col-12' style={{ borderBottom: '1px solid #c7c7c7' }}>
                                <div className='d-flex justify-content-between gap-3 align-items-end flex-wrap' style={{maxWidth: '45rem'}}>
                                    <h6 style={{ fontFamily: 'Poppins' }}><i className='bx bx-caret-right'></i> INVOICE - <span style={{ color: '#464cff' }}>{firstInvoice}</span> 
                                    </h6>
                                    <div className='d-flex justify-content-between gap-3'>                                    
                                        <div className="dropdown" style={{ flex: 1 }}>
                                            <button className="dropdown-toggle button w-100 px-2 px-lg-4" style={{ color: '#a38300', background: '#f0e4cd', fontWeight: '500' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className='bx bx-file' style={{ verticalAlign: 'sub', fontSize: '1.4em' }}></i> View Invoice
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ fontSize: '1em' }}>
                                                {order.InvoiceList.map(i => b2bMode ? 
                                                    <li key={i.BillId}><span className="dropdown-item" onClick={() => setInvoice({id: i.BillId, isActive: true})}>{i.VchNo}</span></li> :   
                                                    <li key={i.BillId}><Link className="dropdown-item" to={`/invoices/${i.BillId}`}>{i.VchNo}</Link></li>  
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 gy-4">
                            {Object.values(order.SalesDetailsList).map((orderItem, index) => (
                                <div className="col position-relative" key={index} style={{fontSize: '1.2em'}}>
                                    {b2bMode ? <OrderCard3 data={orderItem} /> : <ConnectedMyOrdersCard data={orderItem} />}
                                    {tabActive === 'cancelled' && <h2 className="water-mark">Cancelled</h2>}
                                </div>
                            ))} 
                        </div>
                    </div>
                )
            })
        }
    }


    return (
        <div id="myOrder" className='epharma-global'>
            <div className="Shopping-cart-area pb-xs-0 pb-60 pt-4">
                <div className="container">
                    <div className="row mb">
                        <div className='col-12 myOrder-heading d-flex justify-content-between flex-wrap gap-1'>
                            {orderId ? <h4>Order Details..</h4> :
                            <>
                                <h4>My Orders..</h4>
                                <ul className='d-flex gap-5 align-items-end list-inline'>
                                    <li className={`pb-2`} onClick={() => getMyOrders(userInfo.PartyCode, globalData.location.LocationId)}><i style={{fontSize: '1.4em', verticalAlign: 'middle', color: '#056aff'}} className='bx bx-revision font-bold hover-rotate'></i></li>
                                    <li className={`pb-2 ${tabActive === 'active' && 'active'}`} onClick={() => history.push('/myOrders?pane=active')}>Active</li>
                                    <li className={`pb-2 ${tabActive === 'completed' && 'active'}`} onClick={() => history.push('/myOrders?pane=completed')}>Completed</li>
                                    <li className={`pb-2 ${tabActive === 'cancelled' && 'active'}`} onClick={() => history.push('/myOrders?pane=cancelled')}>Cancelled</li>
                                </ul>
                            </>
                            }
                        </div>
                    </div>

                    <div className="row">
                        <div className="tab-content overflow-hidden pt-2">
                            <div id="tabFade-pane-1" className='tab-pane fade show active' role="tabpanel" aria-labelledby="tabFade-1" style={{ padding: 2 }}>
                                <div className={`${orderId ? '' : 'grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem]'}`}>
                                    {renderTabs(myOrderData)}               {/* dynamically changing tab content hence don't need to switch between tabs. */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {returnActive && <MyModal name='local-modal' handleClose={setReturnActive} customClass='returns-modal' width='45em' styles={{padding: 0}} child={<ReturnSelection setActive={setReturnActive} compCode={compCode} locationId={globalData.location.LocationId} order={orderReturn} userId={userInfo.UserId} loaderAction={loaderAction} />} closeIcon={false} />}
            {invoice.isActive && <MyModal name='local-handler' handleClose={() => setInvoice({id: '', isActive: false})} bodyClass='bg-white p-0 p-lg-3' width='inherit' styles={{padding: 0}} child={<ProductTable invoiceId={invoice.id} compCode={compCode} />} closeIcon={false} />}
            {swalShown &&
            createPortal(
                <Link to="/about" onClick={() => Swal.close()}>
                    Go to About
                </Link>,
                Swal.getHtmlContainer()
            )}
        </div>
    )
}

const mapStateToPropsTwo = (state) => {
    return { isMobile: state.isMobile, userInfo: state.userInfo, compCode: state.compCode, isLoggedIn: state.isLoggedIn, globalData: state.globalData };
}

export default connect(mapStateToPropsTwo, { breadCrumbAction, modalAction, loaderAction })(Orders);



const ReturnSelection = ({ setActive, compCode, order, locationId, userId, loaderAction }) => {

    const [returnOrder, setReturnOrder] = useState({ loading: false, data: { Journal: {}, PackSizeList: [], UnitList: [] }, err: { status: false, msg: '' } });

    const getReturnOrder = async (OrderId, InvoiceId, CID, LOCID) => {            
        const res = await getFrom(`${BASE_URL}/api/SalesInvoice/Get?OrderId=${order.type === 'order' ? OrderId : 0}&BillId=${order.type === 'order' ? 0 : InvoiceId }&CID=${CID}&LOCID=${LOCID}`, {}, setReturnOrder);            
        if (res) {
            await wait(1000);
            setReturnOrder(res);
        }
    }   
    
    // const renderProducts = () => {
    //     if (autoCompleteList.loading) return <Skeleton style={{fontSize: '2em'}} count={10}/>
    //     if (searchKey.filterBy === 'INTDOCT') {
    //       return autoCompleteList.data.PartyMasterList.map(i => <li key={i.PartyId} ><Link to={`#`} onClick={() => handleSelect(i)}>{i.Name}</Link></li>);
    //     } else {
    //       return autoCompleteList.data.CompanyMasterList.map(i => <li key={i.EncCompanyId} ><Link to={`#`} onClick={() => handleSelect(i)}>{i.COMPNAME}</Link></li>);
    //     }
    // }

    const [swalShown, setSwalShown] = useState(false);

    const submitReturnRequest = async () => {
        if (returnOrder.loading) return;
        let body = order.orderData;
        const returnData = { 
            PartyCode: body.PartyCode,              
            CashPartyName: body.CashPartyName,      
            CashPartyMobile: body.CashPartyMobile,  
            VchNo: body.VchNo,      
            VchDate: body.VchDate,  
            VisitId: body.BillId,  
            VisitRefType: body.VisitRefType,   
            Amount: body.Amount,        
            InstrumentAmt: body.InstrumentAmt,      
            BillingState: body.BillingState,    
            DeptId: body.DeptId,        
            BillId: body.InvoiceList[0].BillId,        // body.BillId
            MODCOUNTER: body.MODCOUNTER,        
            Remarks: body.Remarks,      
            EncCompanyId: compCode,    // null
            LocationId: locationId,        
            InsBy: userId,      
            SalesReturnDetailsList: returnOrder.data.Journal.Sales.SalesReturnDetailsList.map(i => ({
                ItemId: i.ItemId,
                Description: i.Description,
                Unit: i.Unit,
                TrackingNo: i.TrackingNo,
                TrackingNo2: i.TrackingNo2,
                TrackingNo3: i.TrackingNo3,
                EXPDate: i.EXPDate,
                TransDate: i.TransDate,
                BillQty: i.BillQty,
                MRP: i.MRP,
                NetRateS: i.NetRateS,
                MRPOnDisPer: i.MRPOnDisPer,
                MRPOnDisAmt: i.MRPOnDisAmt,
                Rate: i.Rate,
                Discount: i.Discount,
                DiscountText: i.DiscountText,
                TaxableAmount: i.TaxableAmount,
                CRate: i.CRate,
                CFACTOR: i.CFACTOR,
                CGSTRATE: i.CGSTRATE,
                SGSTRATE: i.SGSTRATE,
                IGSTRATE: i.IGSTRATE,
                CGST: i.CGST,
                SGST: i.SGST,
                IGST: i.IGST,
                StockTypeCode: i.StockTypeCode,
                ACCODE: i.ACCODE,
                Amount: i.Amount,
                Delstatus: i.Delstatus,
                DrCrType: i.DrCrType,
                CFACTOR_MRP: i.CFACTOR_MRP,
                PackSizeId: i.PackSizeId,
                SBillId: i.SBillId,
                SBillDetailsId: i.SBillDetailsId
            }))
        }

        Swal.fire({
            title: 'Submit Order Return Request ?',
            showCancelButton: true,
            confirmButtonText: 'RETURN ORDER',
            cancelButtonText: 'CANCEL',
            icon: 'warning',
            customClass: {
                actions: 'my-actions pt-2',
                container: 'stack-on-top'    
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const status = await makeReturnRequest(returnData);         // "Y,21076"
                if (status) {
                    try {             
                        if (status.split(',')[0] === 'Y') {
                            Swal.fire({ title: 'Request Submitted Successfully !', customClass: {container: 'stack-on-top'}, icon: 'success'});
                            setActive(false);
                        }
                    } catch (error) {
                        alert('Something went wrong !');
                    }
                }
            }
        })
    }    

    const makeReturnRequest = async (params) => {
        try {
            loaderAction(true);
            const res = await axios.post(`${BASE_URL}/api/SalesInvoice/Post`, params);
            loaderAction(false);
            if (res.status === 200) return res.data;
            else return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    useEffect(() => {
        // if (!isLoggedIn) return setActive(false);
        getReturnOrder(order.orderData.BillId, order.orderData.InvoiceList.BillId, compCode, locationId);
    }, [order.orderData.BillId, order.orderData.InvoiceList.BillId, compCode, locationId])


    let isAlreadySubmitted = returnOrder.data.Journal?.Sales?.AlreadyReturnDetailsList.length;
    let pickupProgress = returnOrder.data.Journal?.Sales?.AlreadyReturnDetailsList[0]?.EnqFollowUpList;
    let isRequestApproved = pickupProgress?.length;

    let productItems;

    if (isAlreadySubmitted) {
        productItems = returnOrder.data.Journal?.Sales?.AlreadyReturnDetailsList || [];  
    } else {
        productItems = returnOrder.data.Journal?.Sales?.SalesReturnDetailsList || [];  
    }

    let total = productItems.reduce((total, i) => total + (parseFloat(i.NetRateS * parseFloat(i.BillQty))), 0).toFixed(2);

    return (
        <div className="returns-page p-4 rounded position-relative" style={{ background: '#f7f7f7' }}>
            <i className='bx bx-x-circle close-custom-modal' onClick={() => setActive(pre => !pre)}></i>
            <h4 style={{ borderBottom: '1px solid #dddddd', paddingBottom: '0.6em', fontSize: '1.5em' }}>RETURN PRODUCTS SUMMARY</h4>
            {returnOrder.loading ? <Skeleton count={5}/> : 
            <div style={{ fontSize: '1.2em' }}>
                {productItems.map((orderItem, index) => (<ReturnProductCard_1 className='mb-4' data={orderItem} key={orderItem.AutoId} />))}
            </div>}
            <div className="shipping-details refund-table pt-3">
                <h3 className="mb-4" style={{fontSize: '1.4em'}}>RETURN DETAILS</h3>
                <div className="your-order-table user-details table-responsive">
                    <table className="table">
                        <tbody>
                            <tr className="cart_item">
                                <td className="cart-product-name">
                                    SUBTOTAL <strong className="product-quantity"> : </strong>
                                </td>
                                <th className="cart-product-total">
                                    <span className="amount">₹ {total} &nbsp;&nbsp;({productItems.length} Items)</span>
                                </th>
                            </tr>
                            {/* <tr className="cart_item">
                                <td className="cart-product-name">
                                    Pickup Address <strong className="product-quantity"> : </strong>
                                </td>
                                <td className="cart-product-total">
                                    <span className="amount">Labonya Apartment, Flat No. GA, Chittaranjan Park, B-1/312, Kalyani,</span>
                                </td>
                            </tr> */}
                            <tr className="cart_item">
                                <td className="cart-product-name">
                                    Shipping Charges <strong className="product-quantity"> : </strong>
                                </td>
                                <td className="cart-product-total">
                                    <span className="amount">FREE</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="cart-product-name">Total Paid : &nbsp;&nbsp;&nbsp;</th>
                                <th className="cart-product-total" style={{ width: "73%" }}>
                                    ₹ {total}
                                </th>
                            </tr>
                            <tr>
                                <th className="cart-product-name">Total Refund : &nbsp;&nbsp;&nbsp;</th>
                                <th className="cart-product-total" style={{ width: "73%" }}>
                                    ₹ {total}
                                </th>
                            </tr>
                            {isAlreadySubmitted ? <tr>
                                <th className="cart-product-name">Return Status : &nbsp;&nbsp;&nbsp;</th>
                                <th className="cart-product-total text-wrap" style={{ width: "73%" }}>
                                    Your Return Request is <span className='text-danger ms-2'> {isRequestApproved ? 'APPROVED' : 'WAITING FOR APPROVAL'}</span>
                                </th>
                            </tr> : ''}
                            {isRequestApproved ? <tr>
                                <th colSpan={2} className='px-0'>
                                    <div className='delivery-timeline px-0'>
                                        {pickupProgress.length === 1 ? '' : <div className='timeline'></div>}
                                        <div className=''>
                                            <table style={{ fontSize: '0.75em', maxWidth: 'unset', width: '100%', whiteSpace: 'normal' }}>
                                                <tbody>
                                                    {pickupProgress.map((i, n) => (
                                                        <tr key={n}>
                                                            <td className='border-0'><span>{new Date(i.NextAppDate).toLocaleDateString('en-TT')}<b className='text-nowrap text-primary d-block ms-0'>{i.NextAppTime}</b></span></td>
                                                            <td className='border-0'>{i.Tag}, {i.Remarks}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </th>
                            </tr> : ''}
                            <tr className="cart_item">
                                <td className="cart-product-total" colSpan="2">
                                    {isAlreadySubmitted ? <span className="add_an_item_btn ms-auto me-0 mt-0 d-block" onClick={() => setActive(false)}>CLOSE</span> 
                                    :
                                    <span className="add_an_item_btn ms-auto me-0 mt-0 d-block" onClick={submitReturnRequest}>SUBMIT RETURN</span> }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {swalShown && Swal.getPopup()}
        </div>
    )
}
