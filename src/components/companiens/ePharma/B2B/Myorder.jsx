import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCallback, useEffect, useState } from 'react';
import MyDatePicker from './MyDatePicker';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { AutoComplete, getFrom, noItemFound, Spinner } from '../utilities';
import { BASE_URL } from '../../../../constants';
import { Link, useHistory } from 'react-router-dom';
import { ConnectedAreaCard } from '../cards';


const MyOrder = ({ compCode, globalData, userInfo, isLoggedIn }) => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const history = useHistory();
    // const handleDateChange = (date) => {
    //     setEndDate(date);
    // };

    const [tabActive, setTabActive] = useState('active');
    const [myOrderData, setMyOrderData] = useState({ loading: false, data: { OrderList: [] }, err: { status: false, msg: '' } });
    
    let strDate = startDate ? new Date(startDate).toLocaleDateString('en-TT') : '';
    let eDate = endDate ? new Date(endDate).toLocaleDateString('en-TT') : '';

    const getMyOrders = useCallback(async (PID, locationId) => {
        const res = await getFrom(`${BASE_URL}/api/Pharma/Get?CID=${compCode}&PID=${PID}&Type=${tabActive}&LOCID=${locationId}&FromDtStr=${strDate}&ToDtStr=${eDate}`, {}, setMyOrderData);
        if (res) {
            setMyOrderData(res);
        } else {
            console.log('No data received');
        }
    }, [tabActive, strDate, eDate])       

    useEffect(() => {
        if (!isLoggedIn) return history.push('/');
        getMyOrders(userInfo.PartyCode, globalData.location.LocationId);
    }, [compCode, getMyOrders, isLoggedIn, history, userInfo.PartyCode, globalData.location.LocationId])

    const renderTabs = (data) => {
        
        if (data.loading) {
            return <tr className='pe-none'><td colSpan={11} className='p-0'><Spinner min_height='15rem' fSize='2.5rem' styles={{background: 'white'}} /></td></tr>;
        } else if (data.err.status) {
            return <td colSpan={11} className='text-center fs-1 py-4'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark mt-4'>{data.err.msg}</span></h2></td>;
        } else if (data.data.OrderList.length === 0) {
            return <tr className='pe-none'><td colSpan={11} className='p-0'>{noItemFound('Orders', 'active', 'mb-0')}</td></tr>
        } else {
            return data.data.OrderList.map(order => {
                return (
                    <tr key={order.BillId} className='position-relative'>
                        <td className='text-nowrap'>{order.VchNo}</td>
                        <td className='text-nowrap'>{order.VchDate.slice(0, 10).split('-').reverse().join('-')}</td>
                        <td className='text-nowrap'>{order.LocationName}</td>
                        <td className='text-nowra'>
                            {order.OrderStatus ?
                                <span className='badge badge-pill w-fit ms-auto d-flex align-items-center text-uppercase' style={{ background: order.ApprovalStatus === 'Y' ? '#00ad44' : '#009efb', fontSize: '0.8em' }}>{order.OrderStatus}</span>
                                :
                                <span className='badge badge-pill w-fit ms-auto d-flex align-items-center' style={{ background: order.ApprovalStatus === 'Y' ? '#00ad44' : '#009efb', fontSize: '0.8em' }}>{order.ApprovalStatus === 'Y' ? 'PROCESSED' : 'ORDER PLACED'}</span>
                            }
                        </td>
                        <td className='text-nowrap text-end'>
                            <span className='badge badge-pill w-fit ms-auto d-flex align-items-center' style={{ background: order.BillStatus === 'PENDING' ? '#f29101' : '#00ad44', fontSize: '0.8em' }}>{order.BillStatus === 'CLOSED' ? 'DONE' : order.BillStatus}</span>
                        </td>
                        <td className='text-nowrap text-end'>{order.PaymentMethod}</td>
                        <td className='text-nowrap text-end'>{parseFloat(order.Amount).toFixed(2)}</td>
                        <td className='text-nowrap text-end'>{userInfo.Name}</td>
                        {/* <td className='text-nowrap'>Website</td> */}
                        <td className='text-nowrap text-center' >
                            <Link style={{position: 'absolute', inset: 0}} to={`/myOrders/${order.BillId}?pane=${tabActive}`}></Link>
                            <i className="far fa-eye text-primary"></i>
                        </td>
                    </tr>
                )
            })
        }
    }

    // Distributer Autocomplete -------------------------------------------------------------------------------------------------------------------

    const [area, setArea] = useState('');   
    //   const [autoCompleteList, setAutoCompleteList] = useState({loading: false, data: {itemMasterCollection: []}, err: {status: false, msg: ''}});         
    const [searchList, setSearchList] = useState({loading: false, data: {LocationMasterList: []}, err: {status: false, msg: ''}});
    const [searchResultsActive, setSearchResultsActive] = useState(false);

    const handleAreaSearch = (e) => {
        setArea(e.target.value);
    }

    const handleAreaSelect = (i) => {
        setArea(i.Area)
    }

    useEffect(() => {
        const getAreaResult = async (companyCode, key, businessTypeId) => {                      
            if (!companyCode) return alert('no companyCode received');                  
            if (!businessTypeId) return console.log('No Business type id recieved.');                  
            const res = await getFrom(`${BASE_URL}/api/Location/Get?CID=${companyCode}&SearchStr=${key}&BusinessTypeId=${businessTypeId}`, {}, setSearchList);
            if (res) {                                                                   
                setSearchList(res);
            } else {
                console.log('No data received');
            }
        }  
        const timer = setTimeout(() => {
            //   if (area.length < 1) return;
            getAreaResult(compCode, area, globalData.businessType.CodeId);                                       //  to initially populate area.                  
        }, 500);
        return () => clearTimeout(timer);
    }, [area, compCode, globalData.businessType.CodeId])

    // Distributer Autocomplete -------------------------------------------------------------------------------------------------------------------

    return (
        <div className='w-100 pt-md-2 px-3 p-md-4' style={{background: '#f5f5f5'}}s>
            <div className='mt-3 mb-4'>
                <h4 className='mb-4 pt-4' style={{borderBottom: '2px solid #c8c8c8', paddingBottom: '0.4em'}}>Manage Your Orders.</h4>
                <div className='row g-3'>
                    <div className="col-6 col-md-2">
                        <Form.Select value={tabActive} onChange={(e) => setTabActive(e.target.value)} className='inputMyorder'>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </Form.Select>
                    </div>
                    <div className="col-6 col-md-2">
                        <MyDatePicker value={startDate} onChange={(selectedDates) => setStartDate(selectedDates[0])} placeholder="Start date" className='inputMyorder' />
                    </div>
                    <div className="col-6 col-md-2">
                        <MyDatePicker value={endDate} onChange={(selectedDates) => setEndDate(selectedDates[0])} placeholder="End date" className='inputMyorder' />
                    </div>
                    <div className="col-6 col-md-4">
                        <div className='position-relative'>
                            <Form.Control onChange={handleAreaSearch} autoComplete='off' onClick={() => setSearchResultsActive(true)} value={area} name="query" type="text" placeholder="Find by Distributor" className="inputMyorder" />
                            {searchResultsActive && <AutoComplete name='search-results' cardClick={handleAreaSelect} list={searchList.data.LocationMasterList} isLoading={searchList.loading} setActive={setSearchResultsActive} styles={{fontSize: '0.9em'}} children={<ConnectedAreaCard />} keyName={'LocationItemId'} />}
                        </div>
                    </div>
                    <div className="col-12 col-md-2 text-end">
                        <Button variant="primary" className="myOrderbtn w-100" size={"sm"}>FILTER ORDERS</Button>
                    </div>
                </div>
            </div>

            <div className='w-100 mt-2 overflow-auto' style={{ maxHeight: "90vh", boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', fontSize: '1.8rem' }}>
                <Table className="table-standard">
                    <thead>
                        <tr className='row-style'>
                            <th className='text-nowrap'>Order ID</th>
                            <th className='text-nowrap'>Order Date</th>
                            <th className='text-nowrap'>Distributor</th>
                            <th className='text-nowrap text-end'>Order Status</th>
                            <th className='text-nowrap text-end'>Billing Status</th>
                            <th className='text-nowrap text-end'>Payment</th>
                            <th className='text-nowrap text-end'>Amount</th>
                            <th className='text-nowrap text-end'>Order By</th>
                            {/* <th className='text-nowrap'>Platform</th> */}
                            <th className='text-nowrap text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTabs(myOrderData)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps2 = (state) => {
    return { compCode: state.compCode, globalData: state.globalData, userInfo: state.userInfo, isLoggedIn: state.isLoggedIn };
}
  
export const B2BOrders = connect(mapStateToProps2, {})(MyOrder);



