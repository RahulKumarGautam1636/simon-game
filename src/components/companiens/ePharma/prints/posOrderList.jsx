import { connect } from 'react-redux';
import { cartAction, wishlistAction, breadCrumbAction, modalAction } from '../../../../actions';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFrom, wait } from '../utilities';
import Skeleton from 'react-loading-skeleton';
import { BASE_URL, ROYAL_INN_ID, SRC_URL } from '../../../../constants';
import ReactSlider from 'react-slider';


const PostOrderList = ({ modalAction, globalData, compCode, compInfo, modals, userInfo }) => {

    const { id } = useParams(); 
    const history = useHistory(); 

    const handleClose = () => {
        history.push('/')
        modalAction('TABLE_SELECTION_MODAL', true);
    }   

    const [billData, setBillData] = useState({loading: false, data: {SalesObj: { SalesDetails: []}}, err: {status: false, msg: ''}})

    useEffect(() => {
        const getAreaResult = async () => {                      
            if (!compCode) return alert('no companyCode received');                  
            const res = await getFrom(`${BASE_URL}/api/pharma/GetKOTPrint?CID=${compCode}&LOCID=${globalData.location.LocationId}&BillId=${id}&Type=LAST`, {}, setBillData);
            if (res) {
                setBillData(res);
                // await wait(700);
                // window.printPage();
            } else alert('Something went wrong !!');
        }  
        if (id === 'test') {
            setBillData({loading: false, data: {SalesObj: testData}, err: {status: false, msg: ''}});
            // setTimeout(() => {
            //     window.printPage();
            // }, 800);
            return;
        };
        getAreaResult();
    }, [id, compCode, globalData.location.LocationId])

    const data = billData.data.SalesObj;

    const defaultSize = { 'Q2kzeREhrDppgBktervZ1Q==': 1.25, 'xKPcvSVytI2evE1RyCZ9hQ==': 0.75 };
    const textSize2 = localStorage.getItem('pos_invoice_text');
    // const withLogo = compCode === 'Q2kzeREhrDppgBktervZ1Q==';
    const withLogo = false;
    const [sliderValue, setSliderValue] = useState(Number(textSize2) || (defaultSize[compCode] || 1));
    const [active, setActive] = useState(false);

    useEffect(() => {
        const onBackClick = (event) => {
            modalAction('TABLE_SELECTION_MODAL', true);
        }                                                                                                                     // 

        window.addEventListener("popstate", onBackClick);
        // document.body.addEventListener('click', onBodyClick, { capture: true });                                                // Add eventlistener on component mount.
        // return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                                // Remove Eventlistener on component unmount.
        return () => window.removeEventListener("popstate", onBackClick);                                // Remove Eventlistener on component unmount.
    }, [])

    return (
        <div id="target" className='w-100' style={{fontFamily: 'Lato', width: '100%'}}>
            <style>
                {`
                    p, td, span, h1, h2, h3, h4, h5, h6 {
                        color: black !important;
                    }
                    .app-container > *:not(.app-content) {				
                        display: none;
                    }

                    .offcanvas-body {
                        padding: 10px 0 0;
                    }
                    #target {
                        margin: 0 auto;
                        background: #FFF;
                        font-family: Arial, Helvetica, sans-serif;
                    }
                    p {
                        line-height: 1.3;
                        font-size: 1em;
                    }
                    .items-table p {
                        font-size: 0.87em;
                        padding: 0.6em 0.3em;
                        margin-bottom: 0;
                    }

                    tr.service {
                        page-break-inside: avoid;
                    }
                    .comp-name {
                        font-size: 1.7em;
                    }
                    .orderlist-title {
                        font-size: 1.4em;
                    }
                       
                    @page {
                        margin: 0 1%;
                    }
                    @media print {
                        .btnPrint {display: none;}
                    }
                    
                    @media (max-width: 767px) {
                        html {
                            font-size: 124% !important;
                        } 
                    }
                `}
                {compCode === ROYAL_INN_ID && `
                    .head-logo {
                        font-size: 1.4em;
                    }
                    .comp-name {
                        font-size: 2.3em;
                    }
                    .orderlist-title {
                        font-size: 1.6em;
                    }
                    .items-table {
                        font-size: 1.7em !important;
                    }
                `}
            </style>
            <div id="invoice-POS" className='invoice-body' style={{ fontSize: `${sliderValue}em`, padding: '1px', paddingRight: '1px 0.7em', background: '#FFF', fontFamily: 'Arial, Helvetica, sans-serif', width: '100%'}}>
                <center id="top">
                    {billData.loading || <div className="btnPrint mb-2 !text-[16px]" style={{textAlign: 'center'}}>
                        <div className='btn btn-secondary px-2 py-1' onClick={() => window.printPage()}><i className='bx bxs-printer'></i> Print</div>
                        <Link to={'/'} onClick={handleClose} className='mx-3 btn btn-secondary px-2 py-1'><i className='bx bx-x'></i> Close</Link>
                        <div className='btn btn-secondary px-2 py-1' onClick={() => setActive(!active)}><i className='bx bx-dots-vertical'></i></div>
                        {active && 
                        <div>
                            <ReactSlider value={[sliderValue]} onChange={value => {setSliderValue(value);localStorage.setItem('pos_invoice_text', value);}} step={0.05} className="pricing-slider single-thumb" thumbClassName="example-thumb" trackClassName="example-track" min={0.1} max={3.5}/>
                            <p className='price-values pt-4 mt-4'><span className='text-blue-600' style={{fontSize: 16}}>ADJUST SIZE: {sliderValue} pt.</span></p>
                        </div>}
                    </div>}
                    <div className="logo" />
                    <div className="info">
                        <h6 className='m-0 comp-name fw-bolder'>{compInfo.COMPNAME}</h6>
                    </div>
                </center>

                {withLogo && <div className='head-logo text-center pb-2' style={{borderBottom: '1px solid #000'}}>
                    {(compInfo.CONTACT1 || compInfo.CONTACT2) && <p className='mb-1'><b>Phone:</b> {compInfo.CONTACT1} / {compInfo.CONTACT2}</p>}
                    {compInfo.GSTIN && <p className='mb-2'><b>GSTIN:</b> {compInfo.GSTIN}</p>}
                    <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} className="img-fluid logo" alt="LOGO" style={{maxHeight: '7em'}}/>
                </div>}

                <div id="mid" className='details-table w-100' style={{borderBottom: '1px solid #000'}}>
                    <div className="info">
                        <h2 className='orderlist-title text-center my-2 fw-bold'>Order List</h2>
                        <table className='text-nowrap' style={{width: '100%', fontSize: '1.4em'}}>
                            <tbody>
                                <tr>
                                    <td style={{width: '35%', fontWeight: 'bold'}}>Order #</td>
                                    <td style={{width: '65%', fontWeight: 'bold'}}>:&nbsp; {data.VchNo}</td>
                                </tr>
                                <tr>
                                    <td style={{width: '35%', fontWeight: 'bold'}}>Order Date</td>
                                    <td style={{width: '65%', fontWeight: 'bold'}}>:&nbsp; {new Date(data.VchDate).toLocaleDateString('en-TT')}, {new Date().getHours()} : {new Date().getMinutes()}</td>
                                </tr>
                                <tr>
                                    <td style={{width: '35%', fontWeight: 'bold'}}>Table No</td>
                                    <td style={{width: '65%', fontWeight: 'bold'}}>:&nbsp; {data.BedDesc}</td>
                                </tr>
                                {compCode === ROYAL_INN_ID && <tr>
                                    <td style={{width: '35%', fontWeight: 'bold'}}>Captain Name</td>
                                    <td style={{width: '65%', fontWeight: 'bold'}}>:&nbsp; {userInfo.Name}</td>
                                </tr>}
                                {data.CollectedBy && <tr>
                                    <td style={{width: '35%', fontWeight: 'bold'}}>Waiter Name</td>
                                    <td style={{width: '65%', fontWeight: 'bold'}}>:&nbsp; {data.CollectedBy}</td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-100">
                    <div id="table">
                        <table className='w-100 items-table' style={{fontSize: '1.6em'}}>
                            <tbody>
                                <tr className="tabletitle" style={{borderBottom: '1px solid #000'}}>
                                    <td style={{verticalAlign: 'top', fontWeight: 'bold'}}>#</td>
                                    <td style={{verticalAlign: 'top', fontWeight: 'bold'}} className="item">Particulars</td>
                                    <td style={{verticalAlign: 'top', fontWeight: 'bold'}} className="Hours" align="right">Qty</td>
                                </tr>
                                {billData.loading ? <tr className="tabletitle" style={{borderBottom: '1px solid #000'}}>
                                    <td colSpan={3}>
                                        <Skeleton count={5} />
                                    </td>
                                </tr> : ''}
                                {data.SalesDetails?.map((i, n) => (
                                    <tr className="service" style={{borderBottom: '1px solid #000'}} key={n}>
                                        <td className="tableitem" style={{verticalAlign: 'top', width: '8%'}}><p className="itemtext" style={{fontWeight: 'bold', lineHeight: '1.1em'}}>{n+1}.</p></td>
                                        <td className="tableitem" style={{verticalAlign: 'top'}}>
                                            <p className="itemtext" style={{fontWeight: 'bold', lineHeight: '1.1em'}}>
                                                {i.Description}
                                                <span className='d-block' style={{marginTop: '0.6em', fontSize: '0.8em'}}>{i.Specification}</span>
                                            </p>
                                        </td>
                                        <td className="tableitem" align="right" style={{verticalAlign: 'top'}}>
                                            <p className="itemtext" style={{fontWeight: 'bold'}}>
                                                {i.BillQty}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div id="legalcopy">
                        <div className="info" style={{textAlign: 'center'}}>
                        </div>
                    </div>
                    {billData.loading || <div className="btnPrint mt-2 !text-[16px]" style={{textAlign: 'center'}}>
                        <div className='btn btn-secondary px-2 py-1 me-3' onClick={() => window.printPage()}><i className='bx bxs-printer'></i> Print</div>
                        <Link to={'/'} onClick={handleClose} className='btn btn-secondary px-2 py-1'><i className='bx bx-x'></i> Close</Link>
                    </div>}
                </div>
            </div>
        </div>

    )  
}

const mapStateToPropsTwo = (state) => {
  return { cart: state.cart, compCode: state.compCode, isMobile: state.isMobile, globalData: state.globalData, userInfo: state.userInfo, compInfo: state.compInfo, isLoggedIn: state.isLoggedIn, modals: state.modals };
}

export default connect(mapStateToPropsTwo, {breadCrumbAction, cartAction, wishlistAction, modalAction})(PostOrderList);



const testData = {
    VchNo: 'SO00000039',
    VchDate: '2025-02-21T00:00:00',
    BedDesc: 'HT - 04',
    CollectedBy: 'Ananda Singh',
    SalesDetails: [
        { 
            id: 1, 
            Description: 'Bata Mach Thali (Rice, Nimbu, Salad, Seasonal Sabji, Sag/Aloo Vaga, Dal, 1pcs Shorshe Bata, Papad,', 
            BillQty: 1,
            Specification: 'Test Note for this Item.'
        },
        { 
            id: 2, 
            Description: 'Bhola Fish Thali (Rice, Nimbu, Salad, Seasonal Sabji, Sag/Aloo Vaga, Dal, 1pcs Bhola Fish Curry, P', 
            BillQty: 2,
            Specification: ''
        },
        // { 
        //     id: 3, 
        //     Description: 'Dal Fry Tadka', 
        //     BillQty: 2,
        //     Specification: 'Test Note for this Item.'
        // },
        // { 
        //     id: 4, 
        //     Description: 'PLAIN DAL', 
        //     BillQty: 1,
        //     Specification: ''
        // },
        // { 
        //     id: 5, 
        //     Description: 'ALU BHAJA', 
        //     BillQty: 1,
        //     Specification: 'Test Note for this Item.'
        // },
        // { 
        //     id: 6, 
        //     Description: 'BOILED EGG DOUBLE', 
        //     BillQty: 4,
        //     Specification: ''
        // },
        // { 
        //     id: 7, 
        //     Description: 'Cheese Omelet (Double Egg)', 
        //     BillQty: 3,
        //     Specification: ''
        // },
        // { 
        //     id: 8, 
        //     Description: 'Bhola Fish Thali (Rice, Nimbu, Salad, Seasonal Sabji, Sag/Aloo Vaga, Dal, 1pcs Bhola Fish Curry, P', 
        //     BillQty: 2,
        //     Specification: ''
        // },
        // { 
        //     id: 9, 
        //     Description: 'Dal Fry Tadka', 
        //     BillQty: 2,
        //     Specification: 'Test Note for this Item.'
        // },
        // { 
        //     id: 10, 
        //     Description: 'PLAIN DAL', 
        //     BillQty: 1,
        //     Specification: ''
        // },
        // { 
        //     id: 11, 
        //     Description: 'ALU BHAJA', 
        //     BillQty: 1,
        //     Specification: 'Test Note for this Item.'
        // },
        // { 
        //     id: 12, 
        //     Description: 'BOILED EGG DOUBLE', 
        //     BillQty: 4,
        //     Specification: ''
        // },
        // { 
        //     id: 13, 
        //     Description: 'Bata Mach Thali (Rice, Nimbu, Salad, Seasonal Sabji, Sag/Aloo Vaga, Dal, 1pcs Shorshe Bata, Papad,', 
        //     BillQty: 1,
        //     Specification: 'Test Note for this Item.'
        // },
        // { 
        //     id: 14, 
        //     Description: 'Dal Fry Tadka', 
        //     BillQty: 2,
        //     Specification: 'Test Note for this Item.'
        // },
    ]
}