import React, { useEffect, useState, useMemo, Fragment } from 'react';
import { ModalComponent, getFrom, handleNumberInputs, updateLocalStorageItems, Spinner, focusArea, createDate, AutoComplete, getBase64String } from './utilities';
import { breadCrumbAction, loginStatusAction, userInfoAction, loaderAction, modalAction, cartAction, myOrdersAction, globalDataAction } from '../../../actions';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, memberLabel, ROYAL_INN_ID, TAKE_HOME_ID, XYZ_ID } from '../../../constants';
import { WaiterCard } from './cards';
import Skeleton from 'react-loading-skeleton';
import { num } from '../default/utilities';

const Checkout = ({ vType, breadCrumbAction, cart, isLoggedIn, userInfo, compCode, loaderAction, modalAction, cartAction, globalData, globalDataAction, compInfo }) => {

    const history = useHistory();
    const locationId = globalData.location.LocationId;
    const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
    let b2bMode = globalData.userRegType.CodeValue === 'Retailer';
        
    useEffect(() => {
        if (!isLoggedIn) {
            modalAction('LOGIN_MODAL', true);
            return;
        } else {
            modalAction('LOGIN_MODAL', false);
            if (isRestaurant) {
                setDeliverable(true);
            } else {
                setLocationModalActive(true);
            }
        }
    }, [userInfo.Pin, isLoggedIn, isRestaurant, locationId])

    useEffect(() => {
        if (compCode === XYZ_ID || isRestaurant) return;
        let cartArray = Object.values(cart.pharmacy);                                                               
        let stockQtyList = cartArray.map(item => item.StockQty);                      
        if (stockQtyList.includes(0)) {
            alert('Please Remove or move to wishlist, out of Stock Products in your cart to continue.');
            history.push('/cartPage');
        }
    }, [])

    // -------------- Prescription start ------------------------------------------------------------------------------------------------
    const prescription = globalData.prescription;
    
    useEffect(() => {						
        window.renderVenoBox();
    },[prescription.src])
        
    // -------------- Prescription ends ------------------------------------------------------------------------------------------------
    useEffect(() => {
        breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Checkout', link: '/checkout'}], activeLink: '/checkout'});
    },[breadCrumbAction])  

    const cartArray = Object.values(cart.pharmacy);                                                                // Convert cart object into list.
    const cartItemsValueList = cartArray.map(item => item.count * item.SRate);                                     // Array of all item's price * quantity selected.
    const cartSubtotal = parseFloat(cartItemsValueList.reduce((total, num) => total + num, 0).toFixed(2));         // .toFixed converts it into string so using parsefloat.
    //   const [couponTab, setCouponTab] = useState(false);


    // B2B SUMMARY START----------------------------------------------------------------------------------------------------

    // const cartArrayLength = cartArray.length;                   
  
    const b2bItemsValueList = cartArray.map(item => item.count * item.PTR);                      
    const b2bSubtotal = num(b2bItemsValueList.reduce((total, num) => total + num, 0));    
    
    // const cartItemsMRPValueList = cartArray.map(item => item.count * item.ItemMRP);                      
    // const cartMRPtotal = num(cartItemsMRPValueList.reduce((total, num) => total + num, 0)); 

    const cartItemsDiscount = cartArray.map(item => ((item.PTR * item.count) * (item.DiscountPer / 100 )));                      
    const cartDiscount = num(cartItemsDiscount.reduce((total, num) => total + num, 0)); 

    const cartItemsGSTValueList = cartArray.map(i => {
        let taxbleAmt = num((i.count * i.PTR)- ((i.count * i.PTR) * (i.DiscountPer / 100 )));
        let cgst = num(taxbleAmt * (i.CGSTRATE / 100));
        let sgst = num(taxbleAmt * (i.SGSTRATE / 100));
        return num(sgst + cgst);
    }); 
                   
    const cartGSTtotal = num(cartItemsGSTValueList.reduce((total, num) => total + num, 0));  
    const b2bGrandTotal = num(b2bSubtotal - cartDiscount + cartGSTtotal); 

    // B2B SUMMARY ENDS-----------------------------------------------------------------------------------------------------
    
    const [orderData, setOrderData] = useState({
        PartyCode: '',
        InsBy: '',              
        PaymentMethod: 'COD',
        Amount: '',
        EncCompanyId: '',
        SalesDetailsList: [],                               

        BillingState: userInfo.State,
        BillingAddress: userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,
        DeliveryParty: userInfo.PartyCode,
        DeliveryState: userInfo.State,
        DeliveryAddress : userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,

        UnderDoctId: 0,
        ReferrerId: 0,
        ReferrerId1: 0,
        MarketedId: 0,
        DeptId: 0,
        BedCatId: 0,
        CollectedById: 0,  
        CashPartyMobile: '', 
        VisitId: 0,  
    });
    
    const [locationModalActive, setLocationModalActive] = useState(false);
    const [isDeliverable, setDeliverable] = useState(false);
    const [selectedServiceLocation, setSelectedServiceLocation] = useState({ LocationName: '', Address: '', PIN: '' });

    
    let orderList = useMemo(() => {
        let cartList = Object.values(cart.pharmacy);
        let items = [];

        if (b2bMode) {
            items = cartList.map(i => {
                let taxbleAmt = num((i.count * i.PTR)- ((i.count * i.PTR) * (i.DiscountPer / 100 )));
                let cgst = num(taxbleAmt * (i.CGSTRATE / 100));
                let sgst = num(taxbleAmt * (i.SGSTRATE / 100));
                let amount = num(taxbleAmt + sgst + cgst);
                return {             
                    Description: i.Description,      
                    BillQty: i.count,                                                              
                    ItemId: i.ItemId,                                                              
                    AutoId: i.AutoId,
                    Unit: i.Unit,
                    MRP: i.ItemMRP,
                    PackSizeId: i.PackSizeId ? i.PackSizeId : 0,

                    Rate: i.PTR,
                    Discount: i.DiscountPer,
                    DiscountText: num((i.count * i.PTR) - taxbleAmt),
                    TaxableAmount: taxbleAmt,
                    Amount: amount,
                    SGST: sgst,
                    CGST: cgst,

                    CGSTRATE: i.CGSTRATE,
                    SGSTRATE: i.SGSTRATE,
                    IGSTRATE: i.IGSTRATE,
                    Specification: i.Specification,
                    LocationId: i.LocationId
                }
            })
        } else if (isRestaurant) {
            items = cartList.map(i => {
                let taxbleAmt = num((i.count * i.SRate)- ((i.count * i.SRate) * (i.DiscountPer / 100 )));
                let cgst = num(taxbleAmt * (i.CGSTRATE / 100));
                let sgst = num(taxbleAmt * (i.SGSTRATE / 100));
                let amount = num(taxbleAmt + sgst + cgst);
                return {             
                    Description: i.Description,      
                    BillQty: i.count,                                                              
                    ItemId: i.ItemId,                                                              
                    AutoId: i.AutoId,
                    Unit: i.Unit,
                    MRP: i.ItemMRP,
                    PackSizeId: i.PackSizeId ? i.PackSizeId : 0,

                    // Discount: i.DiscountPer,
                    // DiscountText: num((i.count * i.SRate) - taxbleAmt),
                    Rate: i.SRate,
                    TaxableAmount: taxbleAmt,
                    Amount: amount,
                    SGST: sgst,
                    CGST: cgst,

                    CGSTRATE: i.CGSTRATE,
                    SGSTRATE: i.SGSTRATE,
                    IGSTRATE: i.IGSTRATE,
                    Specification: i.Specification,
                    LocationId: i.LocationId
                }
            })
        } else {
            items = cartList.map(i => ({             
                Description: i.Description,      
                BillQty: i.count,                                                              
                ItemId: i.ItemId,                                                              
                AutoId: i.AutoId,
                Unit: i.Unit,
                MRP: i.ItemMRP,
                PackSizeId: i.PackSizeId ? i.PackSizeId : 0,
                MRPOnDisPer: i.DiscountPer,
                Rate: num(((i.count * i.SRate) - (((i.count * i.SRate * i.IGSTRATE) / (i.IGSTRATE + 100))))/i.count),
                TaxableAmount: num((i.count * i.SRate) - ((i.count * i.SRate * i.IGSTRATE) / (i.IGSTRATE + 100))),
                Amount: i.count * i.SRate,
                CGSTRATE: i.CGSTRATE,
                SGSTRATE: i.SGSTRATE,
                IGSTRATE: i.IGSTRATE,
                Specification: i.Specification,
                LocationId: i.LocationId
            }))
        }
        return items;
    } ,[cart])   

    const restaurantTable = globalData.restaurant.table;
    
    useEffect(() => {
        async function init() {   
            if (isLoggedIn) {
                let cashPartyName;
                let cashPartyMobile; 
                let partyCode;
                let billingState;
                let deliveryState;

                if (isRestaurant) {
                    cashPartyName = '';
                    cashPartyMobile = '';
                    partyCode = compInfo.DefaultCashParty;
                    billingState = compInfo.StateId || userInfo.State;          // Remove userInfo.Satete when compInfo.StateId is available.
                    deliveryState = compInfo.StateId || userInfo.State;

                } else {
                    cashPartyName = prescription.patient.name || userInfo.Name;
                    cashPartyMobile = prescription.patient.phone || userInfo.RegMob1;  
                    partyCode = userInfo.PartyCode;
                    billingState = userInfo.State;
                    deliveryState = prescription.patient.state.CodeId || userInfo.State;
                }

                setOrderData((preValues) => ({
                    ...preValues,
                    InsBy: userInfo.UserId,              
                    PaymentMethod: 'COD',
                    Amount: b2bMode ? b2bGrandTotal : cartSubtotal,
                    EncCompanyId: compCode,
                    SalesDetailsList: orderList, 

                    BillingState: billingState,
                    DeliveryState: deliveryState,

                    BillingAddress: userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,
                    DeliveryAddress : userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,
                    LocationId: locationId,
                    filesToUpload: prescription,

                    PartyCode : partyCode,
                    DeliveryParty: userInfo.selectedMember.PartyCode || userInfo.PartyCode,
                    ReferenceBy: prescription.patient.docName || '',
                    DoctorLocation: prescription.patient.docAddress || '',

                    CashPartyName: cashPartyName,
                    CashPartyMobile: cashPartyMobile,

                    // --------- NEW FIELDS FOR RESTAURANT STARTS ---------------------------------------

                    BillId: restaurantTable?.ProvInvBillid || 0,
                    BedCatId: restaurantTable?.BedGroupId || 0,
                    BedId: restaurantTable?.BedId || 0,
                    CollectedById: '',
                    
                    // --------- NEW FIELDS FOR RESTAURANT ENDS ---------------------------------------

                    UnderDoctId: userInfo.UnderDoctId,
                    ReferrerId: userInfo.ReferrerId,
                    ReferrerId1: userInfo.ProviderId,
                    MarketedId: userInfo.MarketedId,
                    DeptId: userInfo?.UserCompList?.PahrmaDeptId,

                    AccPartyMemberMaster: {
                        Salutation: '',
                        MemberName : prescription.patient.name || userInfo.Name,
                        EncCompanyId: compCode,    
                        RegMob1: userInfo.RegMob1,
                        Gender: prescription.patient.gender?.CodeId || userInfo.Gender,
                        GenderDesc: prescription.patient.gender?.GenderDesc || userInfo.GenderDesc,
                        Address: prescription.patient.address || userInfo.Address,
                        Age: prescription.patient.age || userInfo.Age,
                        AgeMonth: '0',
                        AgeDay: '0',           

                        State: prescription.patient.state?.CodeId || userInfo.State,
                        City: prescription.patient.city || userInfo.City,
                        Pin: prescription.patient.pinCode || userInfo.Pin,
                        Landmark: '',

                        ParentUserId: userInfo.UserId,
                        MemberId: prescription.patient.memberId || userInfo.MemberId,
                        MemberTypeId : 0,
                        UserType: userInfo.UserType,
                        UID: '',
                        UserId: 0,
                        
                        DOB: prescription.patient.age ? createDate(0, 0, prescription.patient.age) : new Date(userInfo.DOB).toLocaleDateString('en-TT'),
                        DOBstr: prescription.patient.age ? createDate(0, 0, prescription.patient.age) : new Date(userInfo.DOB).toLocaleDateString('en-TT'),
                        IsDOBCalculated: 'N',
                        Aadhaar: '',
                        ParentAadhaar1: '',
                        ParentAadhaar2: '',
                        RelationShipWithHolder: '',
                        Mobile: prescription.patient.phone || userInfo.RegMob1,
                        Country: 1
                    },

                    EnclosedDocObj: {
                        EnclosedDocList: [
                            {
                                EnclosedId: '0',
                                AppId: '0',
                                EmpId: prescription.patient.memberId || userInfo.MemberId,              // memberid ||  || ||0
                                AppType: 'Order',
                                EncloserType: '',
                                EncloserTypeDesc: '',
                                FileName: '',
                                FilePath: '',
                                Description: 'Prescription',
                                EnclosedDate: '',
                                EnclosedTime: '',
                                EnclosedDocList: '',
                                EnclosedDeleteDocList: '',
                                Remarks: prescription.imgName || '',            // img nam || name
                                FileExtension: prescription.extn,
                                filesToUpload: ''
                            }
                        ]
                    }
                }))

            } else {
                setOrderData((preValues) => ({
                    ...preValues,
                    PartyCode: '0',
                    InsBy: '0',
                    BillingState: '',
                    BillingAddress: '',
                    DeliveryParty: '',
                    DeliveryState: '',
                    DeliveryAddress : '',
                    filesToUpload: {},
                    
                    PartyCode : '',
                    DeliveryParty: '',
                    ReferenceBy: '',
                    DoctorLocation: '',
                }))
            }
        }
        init();
    },[isLoggedIn, userInfo, cartSubtotal, compCode, orderList, locationId, prescription.src, restaurantTable?.ProvInvBillid, restaurantTable?.BedId])
    
    const placeOrder = async () => {
        if (!isLoggedIn) return alert('please login to place an order.');
        if (!orderData.LocationId) return alert('Please select a Service Location before making an order.');

        if (!isRestaurant) {
            if (!orderList.length) return alert('Add something to your cart before making an order.');
        }
        
        let body = { ...orderData };

        if (compCode === TAKE_HOME_ID) {
            // if (!orderData.filesToUpload.src) return alert('Please add your prescription to place your order.');
        } else if (isRestaurant) {
            delete body.EnclosedDocObj;
            if (!restaurantTable?.BedId) return alert('Please select a Table to place an order.');
        }
        

        if (prescription.src) {
            let imgString = await getBase64String(orderData.filesToUpload.src);            
            delete body.filesToUpload;
            body.EnclosedDocObj.EnclosedDocList[0].filesToUpload = imgString;        
        } else {
            delete body.filesToUpload;
        } 

        try {
            loaderAction(true);
            const res = await axios.post(`${BASE_URL}/api/Pharma/Post`, body);
            loaderAction(false);
            if (res.data === 'N' || res.status !== 200) {return alert('Failed to Place Order.');};
            cartAction('DUMP_CART', {}, 'pharmacy');
            updateLocalStorageItems();
            if (isRestaurant) {
                history.push(`/posOrderList/${res.data.split(',')[0]}`);
                globalDataAction({ restaurant: { table: {} } });
                setPreviousOrder({loading: false, data: { SalesObj: { SalesDetails: [] } }, err: {status: false, msg: ''}});
                setCustomer({ customerName: '', customerPhone: '' });
                setSelectedWaiter({ Name: '', PartyCode: '' });
            } else {

                modalAction('ORDER_SUCCESS_MODAL', true);
                globalDataAction({ prescription: { required: prescription.required, patient: {docName: '', docAddress: '' }} });
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const closeModal = () => setLocationModalActive(false);

    useEffect(() => {
        if (!locationId) return;
        setSelectedServiceLocation(globalData.location);
    }, [globalData.location])

//   ---------------------------------------------------------------------------------------------------------------------------------------

    const [searchTerm, setSearchTerm] = useState({waiterName: '', filterTerm: 'All', filterId: 0});    
    const [searchList, setSearchList] = useState({loading: false, data: [], err: {status: false, msg: ''}});
    const [searchResultsActive, setSearchResultsActive] = useState(false);
    const [selectedWaiter, setSelectedWaiter] = useState({ Name: '', PartyCode: '' });
    const [customer, setCustomer] = useState({ customerName: '', customerPhone: '' });

    const handleSearch = (e) => {
        const { name, value } = e.target;
        setSearchTerm(pre => ({...pre, [name]: value}));
        if (value === '') setSelectedWaiter({ Name: '', PartyCode: '' }); 
    }    

    useEffect(() => {
    if (!isRestaurant) return;
    const getSearchResult = async (companyCode, key) => {                      
        if (!companyCode) return alert('no companyCode received');                  
        const res = await getFrom(`${BASE_URL}/Api/Values/Get?CID=${companyCode}&type=CollectedBy&prefixText=${key}&Specialist=0`, {}, setSearchList);
        if (res) {                                                                    
            setSearchList(res);
        } else {
            console.log('No data received');
        }
    }  
    const timer = setTimeout(() => {
        if (searchTerm.waiterName.length < 1) return;
        getSearchResult(compCode, searchTerm.waiterName);  
    }, 500);
    return () => clearTimeout(timer);
    }, [searchTerm.waiterName, compCode, locationId])

    const handleSelect = (i) => {
        setSelectedWaiter(i);
        setSearchTerm(pre => ({ ...pre, waiterName: i.Name}));
        setSearchResultsActive(false);
    }

    // const selectMember = () => {
    //     if (!isLoggedIn) return modalAction('LOGIN_MODAL', true);
    //     modalAction('MEMBER_SELECT_MODAL', true);
    // }  

    const [previousOrder, setPreviousOrder] = useState({loading: true, data: { SalesObj: { SalesDetails: [] } }, err: {status: false, msg: ''}});
    const [viewItems, setViewItems] = useState(true);
    const [note, setNote] = useState({id: '', text: ''});

    let previousOrderItems = useMemo(() => previousOrder.data.SalesObj.SalesDetails.map(i => ({ 
        Description: i.Description,      
        BillQty: i.BillQty,                                                              
        ItemId: i.ItemId,                                                              
        Unit: i.Unit,
        AutoId: i.AutoId,
        MRP: i.ItemMRP,
        MRPOnDisPer: '',
        // Rate: num(((i.Amount) - (((i.Amount * i.IGSTRATE) / (i.IGSTRATE + 100))))/i.BillQty),
        Rate: i.Rate,
        PackSizeId: i.PackSizeId ? i.PackSizeId : 0,
        Amount: num(i.Amount),
        // SRate: num(i.Amount / i.BillQty),
        TaxableAmount: i.TaxableAmount,
        CGSTRATE: i.CGSTRATE,
        SGSTRATE: i.SGSTRATE,
        IGSTRATE: i.IGSTRATE,

        SGST: i.SGST,
        CGST: i.CGST,

        Specification: i.Specification,                                                    // rerender when note.id changes due edits in specification.
    })),[previousOrder.data.SalesObj.SalesDetails, restaurantTable?.BedId, note.id])       // previousOrder depends on table Id. 

    const previousValueList = previousOrderItems.map(item => parseFloat(item.Amount));
    const previousTotal = parseFloat(previousValueList.reduce((total, num) => total + num, 0).toFixed(2)); 
    const previousTaxableValueList = previousOrderItems.map(item => parseFloat(item.TaxableAmount));
    const previousTaxableTotal = parseFloat(previousTaxableValueList.reduce((total, num) => total + num, 0).toFixed(2)); 

    useEffect(() => {
        if (!isRestaurant) return;
        const getPreviousOrder = async (CID, LOCID, BillId, TableId) => {
            if (CID, LOCID, BillId, TableId) {
                const res = await getFrom(`${BASE_URL}/api/Pharma/GetKOTDetails?CID=${CID}&LOCID=${LOCID}&BillId=${BillId}&TableId=${TableId}`, {}, setPreviousOrder);
                if (res) {              
                    setPreviousOrder(res);                       
                }
            }
        }  
        getPreviousOrder(compCode, locationId, restaurantTable.ProvInvBillid, restaurantTable.BedId)
    }, [compCode, locationId, restaurantTable?.ProvInvBillid, restaurantTable?.BedId])

    useEffect(() => { 
        if (!isRestaurant) return;        
        setOrderData(pre => ({
            ...pre,
            PartyCode: compInfo.DefaultCashParty,
            CollectedById: selectedWaiter.PartyCode,
            CashPartyName: customer.customerName,
            CashPartyMobile: customer.customerPhone,
            VchNo: previousOrder.data.SalesObj.VchNo, 
            SalesDetailsList: [ ...orderList,  ...previousOrderItems ],
            Amount: cartSubtotal + previousTotal,
            VisitId: previousOrder.data.SalesObj.VisitId
        }))
    }, [selectedWaiter.PartyCode, customer.customerName, customer.customerPhone, previousOrderItems, previousTotal, orderList, cartSubtotal, restaurantTable?.BedId])      // depends on table Id.

    useEffect(() => {
        if (!isRestaurant) return;
        if (restaurantTable?.ProvInvBillid) {
            if (previousOrder.data.SalesObj.BillId === undefined) return;            // intially it is undefined.         
            setCustomer({ customerName: previousOrder.data.SalesObj.CashPartyName, customerPhone: previousOrder.data.SalesObj.CashPartyMobile });
            setSelectedWaiter({ PartyCode: previousOrder.data.SalesObj.CollectedById, Name: previousOrder.data.SalesObj.CollectedBy });
            setSearchTerm(pre => ({ ...pre, waiterName: previousOrder.data.SalesObj.CollectedBy || '' }));
        } else {
            setCustomer({ customerName: '', customerPhone: '' });
            // if (compCode === ROYAL_INN_ID) {
            //     setSelectedWaiter({ PartyCode: userInfo.PartyCode, Name: userInfo.Name });    
            //     setSearchTerm(pre => ({ ...pre, waiterName: userInfo.Name }));
            // } else {
                setSelectedWaiter({ PartyCode: '', Name: '' });
                setSearchTerm(pre => ({ ...pre, waiterName: '' }));
            // }
        }
    }, [previousOrder.data.SalesObj.BillId, restaurantTable?.ProvInvBillid, restaurantTable?.BedId])

    const submitNote = (item, type, modifyIndex) => {
        if (type === 'previous order') {
            setPreviousOrder(pre => {
                let list = [ ...pre.data.SalesObj.SalesDetails ];   
                if (modifyIndex !== undefined) {
                    list[modifyIndex].Specification = '';               // Clear Specification. can't use note.id because state update is delayed which gives note.id = '' when this function is called.
                } else {
                    list[note.id].Specification = note.text;
                }
                let newState = {...pre, data: { SalesObj: { ...pre.data.SalesObj, SalesDetails: list } }};               
                return newState;
            });
        } else {
            cartAction('ADD_ITEM', {...item, Specification: note.text}, 'pharmacy');
        }
        setNote({id: '', text: ''});
    }

    return (                                                                                                      
        <>
            <div className={`checkout-area ${b2bMode || 'pt-2 pt-lg-3'} pb-30 epharma-global`}>
                <div className="container">
                    <div className={`row mt-0 ${b2bMode ? 'gy-4' : ' mt-lg-3'}`}>
                        <div className={`${b2bMode || 'col-lg-5'} col-12`}>
                            {!isLoggedIn && <h3>Please <span className='text-decoration-underline text-primary' role='button' onClick={() => modalAction('LOGIN_MODAL', true)}>Login</span> to place an order.</h3>}
                            {isLoggedIn && <div className={`${b2bMode && 'd-flex flex-wrap gap-md-4 flex-column flex-lg-row'}`}>
                                {(() => {
                                    if (isRestaurant) {
                                        return (
                                            <>                                        
                                                <div className={`shipping-details pt-3 p-lg-0`}>
                                                    <div className='d-flex justify-content-between align-items-center mb-3 mb-lg-4'>
                                                        <h5 className='mb-0' style={{fontSize: '1.9rem'}}>Billing Details</h5>
                                                        {/* <h5 className="mb-0 align-items-center lh-0" style={{fontSize: '1em', gap: '0.3em', color: '#ef008d', display: isLoggedIn ? 'flex' : 'none'}}><i className='bx bxs-user' style={{fontSize: '1em', color: '#ef008d'}}></i> {userInfo.selectedMember.MemberName} <i style={{verticalAlign: 'sub', color: '#f17e1d'}} role='button' className='ms-1 bx bx-caret-down' onClick={selectMember}></i></h5> */}
                                                        {restaurantTable?.ProvInvBillid ? <h5 className="mb-0 align-items-center lh-0" style={{fontSize: '1em', gap: '0.3em', color: '#ef008d', display: isLoggedIn ? 'flex' : 'none'}}>{previousOrder.data.SalesObj.VchNo} <i style={{verticalAlign: 'sub'}} role='button' className={`ms-1 bx bx-${viewItems ? 'minus' : 'plus'}-circle rounded-circle`} onClick={() => setViewItems(!viewItems)}></i></h5> : ''}
                                                    </div>
                                                    <div className="your-order-table user-details table-responsive overflow-visible">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th className="cart-product-name text-nowrap"><span onClick={() => {history.push(`/posOrderList/${previousOrder.data.SalesObj.BillId}`)}}>T</span>able : &nbsp;&nbsp;&nbsp;</th>
                                                                    <th className="cart-product-total" style={{width: '73%'}}>
                                                                        {restaurantTable?.BedId ? 
                                                                            <span style={{color: '#005ee9'}} role='button' onClick={() => modalAction('TABLE_SELECTION_MODAL', true)}>{restaurantTable?.BedDesc}, &nbsp; {restaurantTable?.BedGroupDesc} <i style={{verticalAlign: 'sub', color: '#f17e1d'}} className='bx bx-caret-down'></i></span>
                                                                            : 
                                                                            <span style={{color: '#005ee9'}} role='button' onClick={() => modalAction('TABLE_SELECTION_MODAL', true)}>Select Table <i style={{verticalAlign: 'sub', color: '#f17e1d'}} className='bx bx-caret-down'></i></span>
                                                                        }
                                                                    </th> 
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* {restaurantTable?.ProvInvBillid ? <tr className="cart_item">
                                                                    <td className="cart-product-name text-nowrap">
                                                                        <strong className="product-quantity">Order ID : </strong>
                                                                    </td>
                                                                    <td className="cart-product-total">
                                                                        <div className='d-flex justify-content-between py-0 py-lg-1'>
                                                                            <span className="amount fw-bold mt-1">{previousOrder.data.SalesObj.VchNo}</span>
                                                                            <h6 className='mb-0 fw-bold' style={{color: '#007bff', cursor: 'pointer', borderBottom: '2px solid #007fff', fontSize: '0.9em'}} onClick={() => setViewItems(!viewItems)}>
                                                                                <i className={`bx bx-${viewItems ? 'minus' : 'plus'}-circle rounded-circle`} style={{color: '#007bff', fontSize: '1.9rem', verticalAlign: 'middle'}}></i>&nbsp;View Items
                                                                            </h6>
                                                                        </div>
                                                                    </td>
                                                                </tr> : ''} */}
                                                                <tr className="cart_item">
                                                                    <td className="cart-product-name text-nowrap">Select Waiter <strong className="product-quantity"> : </strong></td>
                                                                    <td className="cart-product-total">
                                                                        <form>
                                                                            <div className="input-group flex-nowrap position-relative">
                                                                                <input className="form-control fw-bold"  onChange={handleSearch} onClick={() => setSearchResultsActive(true)} value={searchTerm.waiterName} name="waiterName" type="text" placeholder="Search Waiter" />
                                                                                <span className="input-group-text">Search</span>
                                                                                {searchResultsActive && <AutoComplete name='search-results' list={searchList.data} isLoading={searchList.loading} setActive={setSearchResultsActive} styles={{fontSize: '0.9em'}} children={<WaiterCard handleSelect={handleSelect} />} keyName={'PartyCode'} />}
                                                                            </div>
                                                                        </form>
                                                                    </td>
                                                                </tr>
                                                                <tr className="cart_item">
                                                                    <td className="cart-product-name text-nowrap">{memberLabel} Name <strong className="product-quantity"> : </strong>
                                                                    </td>
                                                                    <td className="cart-product-total">
                                                                        <div className="input-group flex-nowrap">
                                                                            <input className="form-control" name='customerName' value={customer.customerName} onChange={(e) => setCustomer(pre => ({...pre, [e.target.name]: e.target.value}))} type="text" placeholder="Enter Name" />
                                                                        </div>  
                                                                    </td>
                                                                </tr>
                                                                <tr className="cart_item">
                                                                    <td className="cart-product-name text-nowrap"> Phone Number <strong className="product-quantity"> : </strong></td>
                                                                    <td className="cart-product-total">
                                                                        <div className="input-group flex-nowrap">
                                                                            <input className="form-control" name='customerPhone' value={customer.customerPhone} maxLength={10} onChange={(e) => setCustomer(pre => ({...pre, [e.target.name]: e.target.value}))} type="text" placeholder="Enter Number" />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <div className={`shipping-details pt-3 p-lg-0 ${b2bMode && 'flex-1'}`}>
                                                <h3 className='mb-4'>Shipping Details</h3>
                                                <div className="your-order-table user-details table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th className="cart-product-name">Bill To : &nbsp;&nbsp;&nbsp;</th>
                                                                <th className="cart-product-total" style={{width: '73%'}}>{userInfo.Name}</th> 
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* <tr className="cart_item">
                                                                <td className="cart-product-name fw-bold text-dark">{memberLabel} <strong className="product-quantity"> : </strong></td>
                                                                <td className="cart-product-total">
                                                                    <div className='d-flex justify-content-between align-items-start gap-3'>
                                                                        <div>
                                                                            <span className="amount fw-bold text-dark d-block mb-2">{userInfo.selectedMember.MemberName}</span>
                                                                            <span className="amount">( {userInfo.selectedMember.GenderDesc}, {userInfo.selectedMember.Age} Yrs )</span>
                                                                        </div>
                                                                        <h6 onClick={() => modalAction('MEMBER_MODAL', true, {editId: userInfo.selectedMember.MemberId})} className='mb-0 fw-bold' style={{color: '#007bff', cursor: 'pointer', borderBottom: '2px solid #007fff', fontSize: '1em'}}>
                                                                            Details&nbsp;<i className='bx bx-caret-down' style={{color: '#007bff', fontSize: '1.9rem', verticalAlign: 'middle'}}></i>
                                                                        </h6>
                                                                    </div>
                                                                </td>   
                                                            </tr> */}
                                                            <tr className="cart_item">
                                                                <td className="cart-product-name"> Phone <strong className="product-quantity"> : </strong></td>
                                                                <td className="cart-product-total"><span className="amount">{userInfo.RegMob1}</span></td>
                                                            </tr>
                                                            <tr className="cart_item">
                                                                <td className="cart-product-name"> Address <strong className="product-quantity"> : </strong></td>
                                                                <td className="cart-product-total"><span className="amount">{userInfo.Address2}, {userInfo.Address}, {userInfo.City}, {userInfo.StateName}</span></td>
                                                            </tr>
                                                            <tr className="cart_item">
                                                                <td className="cart-product-name"> Pin Code <strong className="product-quantity"> : </strong></td>
                                                                <td className="cart-product-total">
                                                                    <span className="amount">{userInfo.Pin}</span>
                                                                    {/* {!isDeliverable && <p className='text-danger mb-0' role='button'>We do not deliver to this address. <span className='text-primary text-decoration-underline' onClick={() => setLocationModalActive(true)}>Change Delivery Address</span></p>} */}
                                                                </td>
                                                            </tr>
                                                            <tr className="cart_item">
                                                                <td className="cart-product-name"> E-mail <strong className="product-quantity"> : </strong></td>
                                                                <td className="cart-product-total"><span className="amount">{userInfo.Email}</span></td>
                                                            </tr>
                                                            <tr className="cart_item">
                                                                <td className="cart-product-total" colSpan={2}>
                                                                    <Link to='#' onClick={() => {modalAction('EDIT_USER_MODAL', true)}} className='add_an_item_btn ms-auto'>EDIT</Link>
                                                                </td>                          
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )
                                    }
                                })()}
                                {selectedServiceLocation.PIN && <div className={`row mb-4 ${b2bMode && 'flex-1'}`}>
                                    <div className="col-md-12">
                                        <h6 className='my-4'>Selected Service Location</h6>
                                        <div className="card-1 location-card bg-light" style={{fontSize: '1.2em'}}>
                                            <div style={{display: 'flex', gap: '1em'}}>
                                                <i className='bx bxs-shopping-bag' style={{fontSize: '3.5em', color: 'var(--clr-1)'}}></i>
                                                <div>
                                                    <h5 style={{color: 'var(--clr-1)'}}>{selectedServiceLocation.LocationName}</h5>
                                                    <h6>{selectedServiceLocation.Address}</h6>
                                                    <p>{selectedServiceLocation.PIN}</p>
                                                </div>
                                            </div>
                                            {/* <i className='bx bx-check-circle' style={{fontSize: '2em', color: 'var(--bg-1)'}}></i> */}
                                            {/* <button className="controlled-btn ms-auto" type="button" onClick={() => setLocationModalActive(true)}>CHANGE</button>    */}
                                        </div>
                                    </div>
                                </div>}
                            </div>}
                        </div>
                        <div className={`${b2bMode || 'col-lg-7'} col-12`}>
                            <style>
                                {  
                                    b2bMode && `.your-order {
                                        padding: 1em;
                                    }
                                    .your-order-table table th, .your-order-table table td {
                                        padding: 0.45em 6px;
                                    }
                                    .your-order .your-order-table table th {
                                        border-right: 1px solid #d5d5d5;
                                        font-weight: 500;
                                        font-size: 1.1em;
                                        font-family: 'Poppins' !important;
                                        padding: 0.45em 0.8em;
                                    }
                                    .your-order .your-order-table table td {
                                        font-size: 1.2em;
                                    }
                                `}
                            </style>
                            {isLoggedIn && <div className="your-order">
                                <h3 className={`${b2bMode && 'mb-2'}`}>Your order</h3>
                                <div className="your-order-table table-responsive" style={{borderBottom: '3px solid #00ddd4', marginBottom: b2bMode || '2.5rem'}}>
                                        
                                    <table className="table">
                                        <thead>
                                            {
                                                b2bMode ? 
                                                <tr className='checkout-table-header row-style'>
                                                    <th className='cart-product-name'>Description</th>
                                                    <th className='cart-product-name'>Pack</th>
                                                    {/* <th className='cart-product-name'>EXP Date</th> */}
                                                    {/* <th className='cart-product-name'>Remarks</th> */}
                                                    <th className='cart-product-name text-center'>BillQty</th>
                                                    {/* <th className='cart-product-name'>Free Qty</th> */}
                                                    {/* <th className='cart-product-name'>Q. UOM</th> */}
                                                    <th className='cart-product-name text-end'>MRP</th>
                                                    <th className='cart-product-name text-end'>PTR</th>
                                                    <th className='cart-product-name text-end'>Discount</th>
                                                    <th className='cart-product-name text-end'>Taxable Amt</th>
                                                    {/* <th className='cart-product-name'>Dis(%)</th> */}
                                                    {/* <th className='cart-product-name'>Dis. Amt.</th> */}
                                                    {/* <th className='cart-product-name'>Sch Dis(%)</th> */}
                                                    {/* <th className='cart-product-name'>Sch Dis</th> */}
                                                    <th className='cart-product-name text-end'>CGST %</th>
                                                    <th className='cart-product-name text-end'>CGST</th>
                                                    <th className='cart-product-name text-end'>SGST %</th>
                                                    <th className='cart-product-name text-end'>SGST</th>
                                                    <th className='cart-product-name text-end'>Amount</th>
                                                    {/* <th className='cart-product-name'>Profit</th> */}
                                                    {/* <th className='cart-product-name'>Loss</th> */}
                                                    <th className='cart-product-name text-center'>Action</th>
                                                </tr> : 
                                                <tr className='checkout-table-header'>
                                                    <th className="cart-product-name w-50">{isRestaurant ? 'NEW ORDER' : 'Product'}</th>
                                                    <th className="cart-product-name text-center">QTY</th>  
                                                    <th className="cart-product-name text-end">{isRestaurant ? 'RATE' : 'MRP'}</th>
                                                    {isRestaurant || <th className="cart-product-name text-end">Discount</th>}
                                                    <th className="cart-product-total text-end">Total</th>
                                                </tr>
                                            }
                                        </thead>
                                        <tbody>
                                            {cartArray.length ? '' : <tr className="cart_item bg-white">
                                                {/* <td className="cart-product-name" colSpan={isRestaurant ? 4 : 5}><strong className="product-quantity">NO ITEM IS ADDED.</strong></td> */}
                                                <td className="cart-product-name" colSpan={26}><strong className="product-quantity">NO ITEM IS ADDED.</strong></td>
                                            </tr>}

                                            {
                                                b2bMode ? 
                                                cartArray.map((item, index) => {
                                                    const activeItem = item.ItemPackSizeList.find(x => x.CodeId === item.PackSizeId);
                                                    const activePackSize = activeItem ? activeItem.Description : 'N/A';

                                                    let taxbleAmt = (item.count * item.PTR)- ((item.count * item.PTR) * (item.DiscountPer / 100 ));
                                                    let cgst = taxbleAmt * (item.CGSTRATE / 100);
                                                    let sgst = taxbleAmt * (item.SGSTRATE / 100);
                                                    let amount = taxbleAmt + sgst + cgst;

                                                    return (
                                                        <Fragment key={item.LocationItemId}>
                                                            <tr className="cart_item bg-white">
                                                                <td className="cart-product-name text-nowrap">{item.Description}</td>
                                                                <td className="cart-product-name text-nowrap">{activePackSize}</td>
                                                                {/* <td className="cart-product-name"></td> */}
                                                                {/* <td className="cart-product-name"></td> */}
                                                                <td className="cart_item bg-white">
                                                                    <div className='d-flex justify-content-between align-items-center' style={{color: '#898989'}}>
                                                                        <i className='bx bx-minus-circle' onClick={() => {if (item.count !== 1) cartAction('ADD_ITEM', {...item, count: item.count - 1}, 'pharmacy')}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i>
                                                                            <span className='text-dark mx-1'>{item.count}</span>
                                                                        <i className='bx bx-plus-circle' onClick={() => cartAction('ADD_ITEM', {...item, count: item.count + 1}, 'pharmacy')} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> 
                                                                    </div>
                                                                </td>
                                                                {/* <td className="cart-product-name"></td> */}
                                                                {/* <td className="cart-product-name"></td> */}
                                                                <td className="cart-product-name text-end text-end text-nowrap"><strong className="product-quantity">{item.ItemMRP}</strong></td>
                                                                <td className="cart-product-total text-end text-end text-nowrap">{item.PTR}</td>
                                                                <td className="cart-product-name text-end text-end"><strong className="product-quantity">{item.DiscountPer} %</strong></td>
                                                                {/* <td className="cart-product-name"></td>
                                                                <td className="cart-product-name"></td>
                                                                <td className="cart-product-name"></td>
                                                                <td className="cart-product-name"></td> */}

                                                                <td className="cart-product-name text-end">{num(taxbleAmt)}</td>
                                                                {/* <td className="cart-product-name text-end">{((item.count * item.PTR) - ((item.count * item.PTR * item.IGSTRATE) / (item.IGSTRATE + 100))).toFixed(2)}</td> */}
                                                                <td className="cart-product-name text-end">{item.CGSTRATE}</td>
                                                                <td className="cart-product-name text-end">{num(cgst)}</td>
                                                                <td className="cart-product-name text-end">{item.SGSTRATE}</td>
                                                                <td className="cart-product-name text-end">{num(sgst)}</td>
                                                                <td className="cart-product-name text-end">{num(amount)}</td>
                                                                {/* <td className="cart-product-name"></td>
                                                                <td className="cart-product-name"></td> */}
                                                                <td className="cart-product-total text-center"><span className="amount" onClick={() => cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy')}> <i className='bx bx-x-circle ms-md-2 text-danger circle-rounded' role='button' style={{fontSize: '1.3em', verticalAlign: 'sub'}}></i></span></td>
                                                            </tr>
                                                        </Fragment>
                                                    )
                                                })
                                                :
                                                cartArray.map((item) => (
                                                    <Fragment key={item.LocationItemId}>
                                                        <tr className="cart_item bg-white">
                                                            <td className="cart-product-name">
                                                                {isRestaurant && <><i onClick={() => setNote({id: item.LocationItemId, text: item.Specification})} className='bx bx-edit align-middle me-md-2' style={{color: '#008503', fontSize: '1.2em'}} role='button'></i>&nbsp;</>}
                                                                {item.Description}
                                                            </td>
                                                            <td className="cart_item bg-white">
                                                                <div className='d-flex justify-content-between align-items-center' style={{color: '#898989'}}>
                                                                    <i className='bx bx-minus-circle' onClick={() => {if (item.count !== 1) cartAction('ADD_ITEM', {...item, count: item.count - 1}, 'pharmacy')}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i>
                                                                        <span className='text-dark mx-1'>{item.count}</span>
                                                                    <i className='bx bx-plus-circle' onClick={() => cartAction('ADD_ITEM', {...item, count: item.count + 1}, 'pharmacy')} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> 
                                                                </div>
                                                            </td>
                                                            {isRestaurant ? 
                                                                <td className="cart-product-name text-end text-nowrap"><strong className="product-quantity">{item.SRate}</strong></td>
                                                            : 
                                                                <>
                                                                    <td className="cart-product-name text-end text-nowrap"><strong className="product-quantity">{item.ItemMRP}</strong></td>
                                                                    <td className="cart-product-name text-end"><strong className="product-quantity"> {item.DiscountPer}%</strong></td>
                                                                </>
                                                            }
                                                            <td className="cart-product-total text-end text-nowrap"><span className="amount" onClick={() => cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy')}>₹ {num(item.SRate * item.count)} <i className='bx bx-x-circle ms-md-2 text-danger circle-rounded' role='button' style={{fontSize: '1.3em', verticalAlign: 'sub'}}></i></span></td>
                                                        </tr>
                                                        {isRestaurant && item.Specification ? <tr>
                                                            <td className="cart_item p-2" colSpan={4} style={{background: 'aliceblue'}}>
                                                                <i className='bx bx-subdirectory-right me-2' style={{transform: 'scale(1.6)'}}></i> {item.Specification} <i className='bx bx-message-square-x ms-2' onClick={() => cartAction('ADD_ITEM', {...item, Specification: ''}, 'pharmacy')} role='button' style={{transform: 'scale(1.2)'}}></i>
                                                            </td>
                                                        </tr> : ''}
                                                        {isRestaurant && (note.id === item.LocationItemId) ? 
                                                        <>
                                                            <tr>
                                                                <td className="cart-product-total" colSpan={4}>
                                                                    <form className="input-group flex-nowrap position-relative" onSubmit={() => submitNote(item)}>
                                                                        <input className="form-control fw-bold" onChange={(e) => setNote(pre => ({...pre, text: e.target.value}))} value={note.text} name="Note" type="text" placeholder="Write Notes" />
                                                                        <button type='submit' className="input-group-text">Add Note</button>
                                                                    </form>
                                                                </td>
                                                            </tr>
                                                        </> : ''}
                                                    </Fragment>
                                                ))
                                            }                                 

                                        {isRestaurant && <tr className="cart_item bg-white" style={{borderTop: '2px solid #c1c1c1'}}>
                                                <th className="py-3">Current Total</th>
                                                <th className="py-3"></th>
                                                {isRestaurant || <th className="py-3"></th>}
                                                <th className="py-3"></th>
                                                <th className="py-3 text-end">₹ {cartSubtotal}</th>
                                            </tr>}
                                        </tbody>
                                        {(() => {
                                            if (isRestaurant || b2bMode) {
                                                return; 
                                            } else {
                                                return (
                                                    <tfoot>
                                                        <tr className="cart-subtotal">
                                                            <th>Cart Subtotal</th>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <th className='text-end' colSpan={22}><span className="amount">₹ {cartSubtotal}</span></th>
                                                        </tr>
                                                        <tr className="cart-subtotal">
                                                            <th>Service Charge</th>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <th className='text-end' colSpan={22}><span className="amount">₹ 00</span></th>
                                                        </tr>
                                                        <tr className="order-total">
                                                            <th>Order Total</th>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <th className='text-end' colSpan={22}><strong><span className="amount">₹ {cartSubtotal}</span></strong></th>
                                                        </tr>
                                                    </tfoot>
                                                )
                                            }
                                        })()}
                                    </table>

                                    {restaurantTable?.ProvInvBillid ? <table className="table mt-4 mb-0" style={{display: viewItems ? 'table' : 'none', transition: '0.4s linear', borderTop: '3px solid rgb(0, 221, 212)'}}>
                                        <thead>
                                            <tr>
                                                <th className="cart-product-name">Previously Ordered</th>
                                                <th className="cart-product-name">QTY</th>                                            
                                                <th className="cart-product-name text-end">RATE</th>
                                                <th className="cart-product-total text-end">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {   previousOrder.loading ? 
                                                <tr className="cart_item bg-white">
                                                    <td className="cart-product-name" colSpan={4}>
                                                        <Skeleton count={6}/>                                      
                                                    </td>
                                                </tr> :
                                                previousOrderItems.map((item, index) => (
                                                <Fragment key={index}>
                                                    <tr className="cart_item bg-white">
                                                        <td className="cart-product-name"> 
                                                            <i onClick={() => setNote({id: index, text: item.Specification})} className='bx bx-edit align-middle me-md-2' style={{color: '#008503', fontSize: '1.2em'}} role='button'></i>&nbsp;
                                                            {item.Description}
                                                        </td>
                                                        <td className="cart-product-name"><strong className="product-quantity">{item.BillQty}</strong></td>
                                                        <td className="cart-product-name text-end text-nowrap"><strong className="product-quantity">{item.Rate}</strong></td>
                                                        <td className="cart-product-total text-end text-nowrap">{num(item.BillQty * item.Rate)}<span className="amount"> </span></td>
                                                        {/* <td className="cart-product-total text-end text-nowrap">₹ {item.Amount}<span className="amount"> </span></td> */}
                                                    </tr>
                                                    {item.Specification ? <tr>
                                                        <td className="cart_item p-2" colSpan={4} style={{background: 'aliceblue'}}>
                                                            <i className='bx bx-subdirectory-right me-2' style={{transform: 'scale(1.6)'}}></i> {item.Specification} <i className='bx bx-message-square-x ms-2' onClick={() => {setNote({id: index, text: ''}); submitNote(item, 'previous order', index)}} role='button' style={{transform: 'scale(1.2)'}}></i>
                                                        </td>
                                                    </tr> : ''}
                                                    {note.id === index ? <tr>
                                                        <td className="cart-product-total" colSpan={4}>
                                                            <form className="input-group flex-nowrap position-relative" onSubmit={() => submitNote(item, 'previous order')}>
                                                                <input className="form-control fw-bold" onChange={(e) => setNote(pre => ({...pre, text: e.target.value}))} value={note.text} name="Note" type="text" placeholder="Write Notes" />
                                                                <button type='submit' className="input-group-text" id="basic-addon2" >Add Note</button>
                                                            </form>
                                                        </td>
                                                    </tr>: ''}
                                                </Fragment>
                                            ))}
                                            <tr className="cart_item bg-white" style={{borderTop: '2px solid #c1c1c1'}}>
                                                <th className="py-3">Previous Total</th>
                                                <th className="py-3"></th>
                                                <th className="py-3"></th>
                                                <th className="py-3 text-end">₹ {previousTaxableTotal}</th>
                                            </tr>
                                            <tr className="order-total">
                                                <th>Order Total</th>
                                                <td></td>
                                                <td></td>
                                                <th className='text-end'><strong><span className="amount">₹ {cartSubtotal + previousTaxableTotal}</span></strong></th>
                                            </tr>
                                        </tbody>
                                    </table> : ''}

                                    {prescription.patient.name && <div className='d-flex justify-content-between align-items-start' style={{borderTop: '1px solid #d3d3d3', padding: '1em 0'}}>
                                        <h6 style={{marginTop: 3}}>Patient Name</h6>
                                        <div className='d-flex flex-column align-items-end'>

                                            <div className='hover-dropdown'>
                                                <h6 className='mb-0 d-flex align-items-center gap-2 mb-1' style={{fontWeight: 500}}>
                                                    <i className='bx bx-check-double' style={{fontSize: '1.7em', verticalAlign: 'middle', color: 'var(--clr-9)'}}></i> 
                                                    <span>
                                                        {prescription.patient.name} &nbsp;&nbsp;
                                                        <i className='bx bxs-down-arrow' style={{color: '#007bff', fontSize: '1.9rem', verticalAlign: 'middle'}}></i>
                                                    </span>
                                                </h6>
                                                <ul className="dropdown-menu" style={{fontSize: '1.05em'}}>
                                                    <li><Link onClick={() => modalAction('PRESCRIPTION_MODAL', true)} className="dropdown-item py-3" to="#"><i className='bx bx-user-circle me-2' style={{'--clr': '#0494f9'}}></i> View Details</Link></li>
                                                </ul>
                                            </div>
                                            <span className="amount fw-normal">( {prescription.patient.gender.GenderDesc}, {prescription.patient.age} Yrs )</span>  
                                        </div>
                                    </div>}

                                    {prescription.required ? <>
                                        {prescription.imgName ? 
                                            <div className='d-flex justify-content-between align-items-center' style={{borderTop: '1px solid #d3d3d3', padding: '1em 0 1em'}}>
                                                <h6 className='mb-0' style={{color: '#005feb'}}>YOUR PRESCRIPTION</h6>
                                                <div className='d-flex flex-column flex-md-row gap-4'>
                                                    <div className='img-preview'>
                                                        <div className="zoom-img">
                                                            <i className='bx bx-search search'></i>
                                                        </div>
                                                        <i className='bx bx-x delete' onClick={() => globalDataAction({ prescription: { required: true, patient: { docName: '', docAddress: '' } } })}></i>
                                                        {
                                                            prescription.extn === '.pdf' ?
                                                                <>
                                                                    <embed src={prescription.src} className="d-none d-lg-block" />
                                                                    <div className="d-flex align-items-center rounded-4 p-3 d-lg-none" style={{height: '7em', background: '#e7e7e7', padding: '1em', border: '1px solid #cdcdcd'}}>No Preview Available</div>
                                                                </>
                                                            :
                                                            <a className="popup-img venobox vbox-item d-flex justify-content-center" href={prescription.src} data-gall="myGallery">
                                                                <img src={prescription.src} alt="Uploaded content"/>
                                                            </a>
                                                        }
                                                    </div>
                                                    <h5 className='mb-0 text-end' style={{fontFamily: 'Lato', fontSize: '1em'}}>{prescription.imgName}</h5>
                                                </div>
                                            </div>
                                            :
                                            <>
                                                <div className='d-flex justify-content-between align-items-center' style={{borderTop: '1px solid #d3d3d3', padding: '1em 0 1em'}}>
                                                    <h6 className='text-danger mb-0'>ADD PRESCRIPTION</h6>
                                                    <h6 className='mb-0' onClick={() => modalAction('PRESCRIPTION_MODAL', true)} style={{color: '#007bff', cursor: 'pointer'}}><i className='bx bx-file' style={{fontSize: '3rem', verticalAlign: 'middle', marginBottom: '0.4rem'}}></i> UPLOAD</h6>
                                                </div>
                                                <div className='d-flex justify-content-between align-items-center' style={{borderTop: '1px solid #d3d3d3', padding: '1em 0 0.1em'}}>
                                                    <h6>Payment Method</h6>
                                                    <h6><i className='bx bxs-credit-card' style={{fontSize: '3rem', verticalAlign: 'middle', color: '#00BCD4', marginBottom: '0.4rem'}}></i> Cash on Delivery</h6>
                                                </div>
                                            </>
                                        }
                                    </> : ''}
                                </div>
                                {b2bMode && <div className="your-order-table table-responsive" style={{borderBottom: '3px solid #00ddd4', marginBottom: '2.5rem'}}>
                                    <table className="table" style={{borderLeft: '1px solid #d5d5d5'}}>
                                        <tfoot>
                                            <tr className="cart-subtotal">
                                                <th>Cart Subtotal</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <th className='text-end' colSpan={22}><span className="amount">{b2bSubtotal}</span></th>
                                            </tr>
                                            <tr className="cart-subtotal">
                                                <th>Distributer Discount</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <th className='text-end' colSpan={22}><span className="amount">- {cartDiscount}</span></th>
                                            </tr>
                                            <tr className="cart-subtotal">
                                                <th>TOTAL GST</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <th className='text-end' colSpan={22}><span className="amount">+ {cartGSTtotal}</span></th>
                                            </tr>
                                            <tr className="order-total">
                                                <th>Order Total</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <th className='text-end' colSpan={22}><strong><span className="amount">₹ {b2bGrandTotal}</span></strong></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>}
                                {/* <div className='coupon-accordion'>
                                    <h3 onClick={() => setCouponTab(!couponTab)}>Have a coupon? <span id="showcoupon">Click here to enter your code</span></h3>
                                    {couponTab && <div id="checkout_coupon" className="coupon-checkout-content">
                                        <div className="coupon-info">
                                            <form action="#">
                                                <p className="checkout-coupon">
                                                    <input placeholder="Coupon code" type="text" onChange={dummyFunction}/>
                                                    <input value="Apply Coupon" type="submit" onChange={dummyFunction}/>
                                                </p>
                                            </form>
                                        </div>
                                    </div>}
                                </div> */}
                                <div className="payment-method">
                                    {/* <h4>Payment Method</h4> */}
                                    <div className="payment-accordion">
                                        {/* <div id="accordion">
                                            <div className="card shadow-none">
                                                <div className="card-header" id="#payment-3">
                                                    <h5 className="panel-title">
                                                        <Link to='#' className="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                            <i className='bx bxs-badge-check' style={{fontSize: '3rem', verticalAlign: 'middle', color: '#00BCD4', marginBottom: '0.4rem'}}></i> Cash on Delivery
                                                        </Link>
                                                    </h5>
                                                </div>
                                                <div id="collapseThree" className="collapse" data-parent="#accordion">
                                                    <div className="card-body">
                                                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="order-button-payment">

                                            {prescription.required ? <>
                                                {!prescription.src && <p className='text-dark mb-2' style={{fontFamily: 'Lato', fontWeight: 600}}><i className='bx bxs-info-square me-2 text-danger' style={{fontSize: '1.5em', verticalAlign: 'sub'}}></i>Please Attach your prescription to place an order.</p>}
                                            </> : ''}

                                            {(() => {
                                                if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
                                                    return (
                                                        <button type='submit' className={`ms-auto ${(isLoggedIn) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button> 
                                                    )
                                                } else if (vType === 'ErpPharma' || vType === 'agro') {
                                                    
                                                    if (compCode === XYZ_ID || !prescription.required) {
                                                        return <button type='submit' className={`ms-auto ${(isLoggedIn && isDeliverable) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button> 
                                                    } else {
                                                        return <button type='submit' className={`ms-auto ${(isLoggedIn && isDeliverable && prescription.src) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button>;
                                                    }
                                                }
                                            })()}

                                            {/* { compCode === TAKE_HOME_ID ?
                                                <button type='submit' className={`ms-auto ${(isLoggedIn && isDeliverable && prescription.src) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button> :    
                                                <button type='submit' className={`ms-auto ${(isLoggedIn && isDeliverable) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button>     
                                            } */}
                                        </div>                                               
                                        {isDeliverable ? '' : <div className='row mt-4'>    
                                            <div className="col-md-12">
                                                <div className="checkout-form-list position-relative">
                                                    <p className='text-danger mb-0 mt-2'>Now we have no service at your PIN code - {userInfo.Pin} We will be available in your area very soon.</p>
                                                </div>
                                            </div>
                                            <div className="cta-no-location your-order-table user-details table-responsive">
                                                <table className="table" style={{fontSize: '1em'}}>
                                                    <thead>
                                                        <tr>
                                                            <th className="cart-product-name"><i className='bx bxs-info-circle' style={{fontSize: '1.85rem', color: 'orange'}}></i> What you can do !</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="cart_item">
                                                            <td className="cart-product-name">Change your address <button onClick={() => {closeModal();modalAction('EDIT_USER_MODAL', true);}} className="controlled-btn ms-auto" type="button" style={{fontSize: '1.3rem'}}>Change Address</button></td>
                                                        </tr>
                                                        <tr className="cart_item">
                                                            <td className="cart-product-name">Change the area <button onClick={() => {closeModal();focusArea(globalDataAction);}} className="controlled-btn ms-auto" type="button" style={{fontSize: '1.3rem'}}>Change Area</button></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <ModalComponent isActive={locationModalActive} className={'location-selection-modal'} child={<LocationModal closeModal={closeModal} userInfo={userInfo}  compCode={compCode} globalData={globalData} globalDataAction={globalDataAction} modalAction={modalAction} setDeliverable={setDeliverable} />} />
        </>
    )
}

const mapStateToCheckout = (state) => {
  return { compCode: state.compCode, cart: state.cart, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, compInfo: state.compInfo, globalData: state.globalData, vType: state.vType };
}

export default connect(mapStateToCheckout, {breadCrumbAction, loginStatusAction, userInfoAction, loaderAction, modalAction, cartAction, myOrdersAction, globalDataAction})(Checkout);


function LocationModal({ closeModal, compCode, userInfo, globalData, setDeliverable, globalDataAction, modalAction }) {

    const locationId = globalData.location.LocationId;
    const [location, setLocation] = useState({ Pin: userInfo.Pin });
    const [locationList, setLocationList] = useState({loading: true, data: '', err: {status: false, msg: ''}});
    
    useEffect(() => {      
        if (!location.Pin.length || location.Pin.length < 6) {
            alert('Your Pin Code is Invalid Please change your Pin Code.');
            closeModal();
            return;
        } else if (!locationId) {
            alert('Please select a location before placing orders.'); 
            closeModal();
            return;
        }
        const getServiceLocations = async () => {
            const res = await getFrom(`${BASE_URL}/api/Location/Get?CID=${compCode}&LocationId=${locationId}&PinCode=${location.Pin}`, {}, setLocationList);            // using useCallback to avoid esling warning about useEffect dependencies.
            if (res) {
                setLocationList(res);   
            }
        }
        setTimeout(() => {
            getServiceLocations();
        }, 1000);

    }, [location.Pin, locationId])

    useEffect(() => {
        if (location.Pin !== userInfo.Pin) setLocation({ Pin: userInfo.Pin });
    }, [userInfo.Pin])

    const renderLocationList = (data) => {
        if (data.loading) {
          return <Spinner min_height='19rem' fSize='1.5rem'/>;
        } else if (data.err.status) {
          return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
        } else if (data.data === 0) {
          setDeliverable(false);
          return <p className='text-danger mb-0 mt-2'>Now we have no service in this PIN - We will be available in your area very soon.</p>;
        } else {
          closeModal();
          setDeliverable(true);
          return;
        }
    }    

    return (
        <form>
            <div className='card'>
                <h5 className="card-header d-flex justify-content-between" style={{padding: '0.7em 1em'}}>Please Select a Service Location <i className='bx bx-x-circle' onClick={closeModal} role='button' style={{fontSize: '1.2em'}}></i></h5>
                <div className='card-body' style={{padding: '1.3em'}}>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="checkout-form-list position-relative">
                                <label>Pincode / Zip <span className="required">*</span></label>
                                <input readOnly type="text" name='Pin' value={location.Pin} onChange={(e) => {handleNumberInputs(e, setLocation);}} autoComplete='off' maxLength='6'/>
                                {renderLocationList(locationList)}
                            </div>
                        </div>
                        <div className="cta-no-location your-order-table user-details table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="cart-product-name"><i className='bx bxs-info-circle' style={{fontSize: '1.85rem', color: 'orange'}}></i> What you can do !</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="cart_item">
                                        <td className="cart-product-name">Change your address <button onClick={() => {closeModal();modalAction('EDIT_USER_MODAL', true);}} className="controlled-btn ms-auto" type="button" style={{fontSize: '1.3rem'}}>Change Address</button></td>
                                    </tr>
                                    <tr className="cart_item">
                                        <td className="cart-product-name">Change the area <button onClick={() => {closeModal();focusArea(globalDataAction);}} className="controlled-btn ms-auto" type="button" style={{fontSize: '1.3rem'}}>Change Area</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}


// LAST BACKUP ---------------------------------

// import React, { useEffect, useState, useMemo, Fragment } from 'react';
// import { ModalComponent, getFrom, handleNumberInputs, updateLocalStorageItems, Spinner, focusArea, createDate, AutoComplete, getBase64String } from './utilities';
// import { breadCrumbAction, loginStatusAction, userInfoAction, loaderAction, modalAction, cartAction, myOrdersAction, globalDataAction } from '../../../actions';
// import { connect } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL, memberLabel, ROYAL_INN_ID, TAKE_HOME_ID, XYZ_ID } from '../../../constants';
// import { WaiterCard } from './cards';
// import Skeleton from 'react-loading-skeleton';
// import { num } from '../default/utilities';

// const Checkout = ({ vType, breadCrumbAction, cart, isLoggedIn, userInfo, compCode, loaderAction, modalAction, cartAction, globalData, globalDataAction, compInfo }) => {

//     const history = useHistory();
//     const locationId = globalData.location.LocationId;
//     const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
//     let b2bMode = globalData.userRegType.CodeValue === 'Retailer';
        
//     useEffect(() => {
//         if (!isLoggedIn) {
//             modalAction('LOGIN_MODAL', true);
//             return;
//         } else {
//             modalAction('LOGIN_MODAL', false);
//             if (isRestaurant) {
//                 setDeliverable(true);
//             } else {
//                 setLocationModalActive(true);
//             }
//         }
//     }, [userInfo.Pin, isLoggedIn, isRestaurant, locationId])

//     useEffect(() => {
//         if (compCode === XYZ_ID || isRestaurant) return;
//         let cartArray = Object.values(cart.pharmacy);                                                               
//         let stockQtyList = cartArray.map(item => item.StockQty);                      
//         if (stockQtyList.includes(0)) {
//             alert('Please Remove or move to wishlist, out of Stock Products in your cart to continue.');
//             history.push('/cartPage');
//         }
//     }, [])

//     // -------------- Prescription start ------------------------------------------------------------------------------------------------
//     const prescription = globalData.prescription;
    
//     useEffect(() => {						
//         window.renderVenoBox();
//     },[prescription.src])
        
//     // -------------- Prescription ends ------------------------------------------------------------------------------------------------
//     useEffect(() => {
//         breadCrumbAction({links: [{name: 'Home', link: '/'}, {name: 'Checkout', link: '/checkout'}], activeLink: '/checkout'});
//     },[breadCrumbAction])  

//     const cartArray = Object.values(cart.pharmacy);                                                                // Convert cart object into list.
//     const cartItemsValueList = cartArray.map(item => item.count * item.SRate);                                     // Array of all item's price * quantity selected.
//     const cartSubtotal = parseFloat(cartItemsValueList.reduce((total, num) => total + num, 0).toFixed(2));         // .toFixed converts it into string so using parsefloat.
//     //   const [couponTab, setCouponTab] = useState(false);


//     // B2B SUMMARY START----------------------------------------------------------------------------------------------------

//     // const cartArrayLength = cartArray.length;                   
  
//     const b2bItemsValueList = cartArray.map(item => item.count * item.PTR);                      
//     const b2bSubtotal = num(b2bItemsValueList.reduce((total, num) => total + num, 0));    
    
//     // const cartItemsMRPValueList = cartArray.map(item => item.count * item.ItemMRP);                      
//     // const cartMRPtotal = num(cartItemsMRPValueList.reduce((total, num) => total + num, 0)); 

//     const cartItemsDiscount = cartArray.map(item => ((item.PTR * item.count) * (item.DiscountPer / 100 )));                      
//     const cartDiscount = num(cartItemsDiscount.reduce((total, num) => total + num, 0)); 

//     const cartItemsGSTValueList = cartArray.map(i => {
//         let taxbleAmt = num((i.count * i.PTR)- ((i.count * i.PTR) * (i.DiscountPer / 100 )));
//         let cgst = num(taxbleAmt * (i.CGSTRATE / 100));
//         let sgst = num(taxbleAmt * (i.SGSTRATE / 100));
//         return num(sgst + cgst);
//     }); 
                   
//     const cartGSTtotal = num(cartItemsGSTValueList.reduce((total, num) => total + num, 0));  
//     const b2bGrandTotal = num(b2bSubtotal - cartDiscount + cartGSTtotal); 

//     // B2B SUMMARY ENDS-----------------------------------------------------------------------------------------------------

//     const [orderData, setOrderData] = useState({
//         PartyCode: '',
//         InsBy: '',              
//         PaymentMethod: 'COD',
//         Amount: '',
//         EncCompanyId: '',
//         SalesDetailsList: [],                               

//         BillingState: userInfo.State,
//         BillingAddress: userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,
//         DeliveryParty: userInfo.PartyCode,
//         DeliveryState: userInfo.State,
//         DeliveryAddress : userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,

//     });
    
//     const [locationModalActive, setLocationModalActive] = useState(false);
//     const [isDeliverable, setDeliverable] = useState(false);
//     const [selectedServiceLocation, setSelectedServiceLocation] = useState({ LocationName: '', Address: '', PIN: '' });

    
//     let orderList = useMemo(() => {
//         let cartList = Object.values(cart.pharmacy);
//         let items = [];

//         if (b2bMode) {
//             items = cartList.map(i => {
//                 let taxbleAmt = num((i.count * i.PTR)- ((i.count * i.PTR) * (i.DiscountPer / 100 )));
//                 let cgst = num(taxbleAmt * (i.CGSTRATE / 100));
//                 let sgst = num(taxbleAmt * (i.SGSTRATE / 100));
//                 let amount = num(taxbleAmt + sgst + cgst);
//                 return {             
//                     Description: i.Description,      
//                     BillQty: i.count,                                                              
//                     ItemId: i.ItemId,                                                              
//                     AutoId: i.AutoId,
//                     Unit: i.Unit,
//                     MRP: i.ItemMRP,
//                     PackSizeId: i.PackSizeId ? i.PackSizeId : 0,

//                     Rate: i.PTR,
//                     Discount: i.DiscountPer,
//                     DiscountText: num((i.count * i.PTR) - taxbleAmt),
//                     TaxableAmount: taxbleAmt,
//                     Amount: amount,
//                     SGST: sgst,
//                     CGST: cgst,

//                     CGSTRATE: i.CGSTRATE,
//                     SGSTRATE: i.SGSTRATE,
//                     IGSTRATE: i.IGSTRATE,
//                     Specification: i.Specification,
//                     LocationId: i.LocationId
//                 }
//             })
//         } else if (isRestaurant) {
//             items = cartList.map(i => {
//                 let taxbleAmt = num((i.count * i.SRate)- ((i.count * i.SRate) * (i.DiscountPer / 100 )));
//                 let cgst = num(taxbleAmt * (i.CGSTRATE / 100));
//                 let sgst = num(taxbleAmt * (i.SGSTRATE / 100));
//                 let amount = num(taxbleAmt + sgst + cgst);
//                 return {             
//                     Description: i.Description,      
//                     BillQty: i.count,                                                              
//                     ItemId: i.ItemId,                                                              
//                     AutoId: i.AutoId,
//                     Unit: i.Unit,
//                     MRP: i.ItemMRP,
//                     PackSizeId: i.PackSizeId ? i.PackSizeId : 0,

//                     // Discount: i.DiscountPer,
//                     // DiscountText: num((i.count * i.SRate) - taxbleAmt),
//                     Rate: i.SRate,
//                     TaxableAmount: taxbleAmt,
//                     Amount: amount,
//                     SGST: sgst,
//                     CGST: cgst,

//                     CGSTRATE: i.CGSTRATE,
//                     SGSTRATE: i.SGSTRATE,
//                     IGSTRATE: i.IGSTRATE,
//                     Specification: i.Specification,
//                     LocationId: i.LocationId
//                 }
//             })
//         } else {
//             items = cartList.map(i => ({             
//                 Description: i.Description,      
//                 BillQty: i.count,                                                              
//                 ItemId: i.ItemId,                                                              
//                 AutoId: i.AutoId,
//                 Unit: i.Unit,
//                 MRP: i.ItemMRP,
//                 PackSizeId: i.PackSizeId ? i.PackSizeId : 0,
//                 MRPOnDisPer: i.DiscountPer,
//                 Rate: num(((i.count * i.SRate) - (((i.count * i.SRate * i.IGSTRATE) / (i.IGSTRATE + 100))))/i.count),
//                 TaxableAmount: num((i.count * i.SRate) - ((i.count * i.SRate * i.IGSTRATE) / (i.IGSTRATE + 100))),
//                 Amount: i.count * i.SRate,
//                 CGSTRATE: i.CGSTRATE,
//                 SGSTRATE: i.SGSTRATE,
//                 IGSTRATE: i.IGSTRATE,
//                 Specification: i.Specification,
//                 LocationId: i.LocationId
//             }))
//         }
//         return items;
//     } ,[cart])   

//     const restaurantTable = globalData.restaurant.table;
    
//     useEffect(() => {
//         async function init() {   
//             if (isLoggedIn) {
//                 let cashPartyName;
//                 let cashPartyMobile; 
//                 let partyCode;
//                 let billingState;
//                 let deliveryState;

//                 if (isRestaurant) {
//                     cashPartyName = '';
//                     cashPartyMobile = '';
//                     partyCode = compInfo.DefaultCashParty;
//                     billingState = compInfo.StateId || userInfo.State;          // Remove userInfo.Satete when compInfo.StateId is available.
//                     deliveryState = compInfo.StateId || userInfo.State;

//                 } else {
//                     cashPartyName = prescription.patient.name || userInfo.Name;
//                     cashPartyMobile = prescription.patient.phone || userInfo.RegMob1;  
//                     partyCode = userInfo.PartyCode;
//                     billingState = userInfo.State;
//                     deliveryState = prescription.patient.state.CodeId || userInfo.State;
//                 }

//                 setOrderData((preValues) => ({
//                     ...preValues,
//                     InsBy: userInfo.UserId,              
//                     PaymentMethod: 'COD',
//                     Amount: b2bMode ? b2bGrandTotal : cartSubtotal,
//                     EncCompanyId: compCode,
//                     SalesDetailsList: orderList, 

//                     BillingState: billingState,
//                     DeliveryState: deliveryState,

//                     BillingAddress: userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,
//                     DeliveryAddress : userInfo.Address + ' ' + userInfo.Address2 + ' ' + userInfo.Pin,
//                     LocationId: locationId,
//                     filesToUpload: prescription,

//                     PartyCode : partyCode,
//                     DeliveryParty: userInfo.selectedMember.PartyCode || userInfo.PartyCode,
//                     ReferenceBy: prescription.patient.docName || '',
//                     DoctorLocation: prescription.patient.docAddress || '',

//                     CashPartyName: cashPartyName,
//                     CashPartyMobile: cashPartyMobile,

//                     // --------- NEW FIELDS FOR RESTAURANT STARTS ---------------------------------------

//                     BillId: restaurantTable?.ProvInvBillid,
//                     BedId: restaurantTable?.BedId,
//                     CollectedById: '',
                    
//                     // --------- NEW FIELDS FOR RESTAURANT ENDS ---------------------------------------

//                     AccPartyMemberMaster: {
//                         Salutation: '',
//                         MemberName : prescription.patient.name || userInfo.Name,
//                         EncCompanyId: compCode,    
//                         RegMob1: userInfo.RegMob1,
//                         Gender: prescription.patient.gender?.CodeId || userInfo.Gender,
//                         GenderDesc: prescription.patient.gender?.GenderDesc || userInfo.GenderDesc,
//                         Address: prescription.patient.address || userInfo.Address,
//                         Age: prescription.patient.age || userInfo.Age,
//                         AgeMonth: '0',
//                         AgeDay: '0',           

//                         State: prescription.patient.state?.CodeId || userInfo.State,
//                         City: prescription.patient.city || userInfo.City,
//                         Pin: prescription.patient.pinCode || userInfo.Pin,
//                         Landmark: '',

//                         ParentUserId: userInfo.UserId,
//                         MemberId: prescription.patient.memberId || userInfo.MemberId,
//                         MemberTypeId : 0,
//                         UserType: userInfo.UserType,
//                         UID: '',
//                         UserId: 0,
                        
//                         DOB: prescription.patient.age ? createDate(0, 0, prescription.patient.age) : new Date(userInfo.DOB).toLocaleDateString('en-TT'),
//                         DOBstr: prescription.patient.age ? createDate(0, 0, prescription.patient.age) : new Date(userInfo.DOB).toLocaleDateString('en-TT'),
//                         IsDOBCalculated: 'N',
//                         Aadhaar: '',
//                         ParentAadhaar1: '',
//                         ParentAadhaar2: '',
//                         RelationShipWithHolder: '',
//                         Mobile: prescription.patient.phone || userInfo.RegMob1,
//                         Country: 1
//                     },

//                     EnclosedDocObj: {
//                         EnclosedDocList: [
//                             {
//                                 EnclosedId: '0',
//                                 AppId: '0',
//                                 EmpId: prescription.patient.memberId || userInfo.MemberId,              // memberid ||  || ||0
//                                 AppType: 'Order',
//                                 EncloserType: '',
//                                 EncloserTypeDesc: '',
//                                 FileName: '',
//                                 FilePath: '',
//                                 Description: 'Prescription',
//                                 EnclosedDate: '',
//                                 EnclosedTime: '',
//                                 EnclosedDocList: '',
//                                 EnclosedDeleteDocList: '',
//                                 Remarks: prescription.imgName || '',            // img nam || name
//                                 FileExtension: prescription.extn,
//                                 filesToUpload: ''
//                             }
//                         ]
//                     }
//                 }))

//             } else {
//                 setOrderData((preValues) => ({
//                     ...preValues,
//                     PartyCode: '0',
//                     InsBy: '0',
//                     BillingState: '',
//                     BillingAddress: '',
//                     DeliveryParty: '',
//                     DeliveryState: '',
//                     DeliveryAddress : '',
//                     filesToUpload: {},
                    
//                     PartyCode : '',
//                     DeliveryParty: '',
//                     ReferenceBy: '',
//                     DoctorLocation: '',
//                 }))
//             }
//         }
//         init();
//     },[isLoggedIn, userInfo, cartSubtotal, compCode, orderList, locationId, prescription.src, restaurantTable?.ProvInvBillid, restaurantTable?.BedId])
    
//     const placeOrder = async () => {
//         if (!isLoggedIn) return alert('please login to place an order.');
//         if (!orderData.LocationId) return alert('Please select a Service Location before making an order.');

//         if (!isRestaurant) {
//             if (!orderList.length) return alert('Add something to your cart before making an order.');
//         }
        
//         let body = { ...orderData };

//         if (compCode === TAKE_HOME_ID) {
//             // if (!orderData.filesToUpload.src) return alert('Please add your prescription to place your order.');
//         } else if (isRestaurant) {
//             delete body.EnclosedDocObj;
//             if (!restaurantTable?.BedId) return alert('Please select a Table to place an order.');
//         }
        

//         if (prescription.src) {
//             let imgString = await getBase64String(orderData.filesToUpload.src);            
//             delete body.filesToUpload;
//             body.EnclosedDocObj.EnclosedDocList[0].filesToUpload = imgString;        
//         } else {
//             delete body.filesToUpload;
//         } 

//         try {
//             loaderAction(true);
//             const res = await axios.post(`${BASE_URL}/api/Pharma/Post`, body);
//             loaderAction(false);
//             if (res.data === 'N' || res.status !== 200) {return alert('Failed to Place Order.');};
//             cartAction('DUMP_CART', {}, 'pharmacy');
//             updateLocalStorageItems();
//             if (isRestaurant) {
//                 history.push(`/posOrderList/${res.data.split(',')[0]}`);
//                 globalDataAction({ restaurant: { table: {} } });
//                 setPreviousOrder({loading: false, data: { SalesObj: { SalesDetails: [] } }, err: {status: false, msg: ''}});
//                 setCustomer({ customerName: '', customerPhone: '' });
//                 setSelectedWaiter({ Name: '', PartyCode: '' });
//             } else {

//                 modalAction('ORDER_SUCCESS_MODAL', true);
//                 globalDataAction({ prescription: { required: prescription.required, patient: {docName: '', docAddress: '' }} });
//             }
//         } catch (err) {
//             console.log(err);
//             return false;
//         }
//     }

//     const closeModal = () => setLocationModalActive(false);

//     useEffect(() => {
//         if (!locationId) return;
//         setSelectedServiceLocation(globalData.location);
//     }, [globalData.location])

// //   ---------------------------------------------------------------------------------------------------------------------------------------

//     const [searchTerm, setSearchTerm] = useState({waiterName: '', filterTerm: 'All', filterId: 0});    
//     const [searchList, setSearchList] = useState({loading: false, data: [], err: {status: false, msg: ''}});
//     const [searchResultsActive, setSearchResultsActive] = useState(false);
//     const [selectedWaiter, setSelectedWaiter] = useState({ Name: '', PartyCode: '' });
//     const [customer, setCustomer] = useState({ customerName: '', customerPhone: '' });

//     const handleSearch = (e) => {
//         const { name, value } = e.target;
//         setSearchTerm(pre => ({...pre, [name]: value}));
//         if (value === '') setSelectedWaiter({ Name: '', PartyCode: '' }); 
//     }    

//     useEffect(() => {
//     if (!isRestaurant) return;
//     const getSearchResult = async (companyCode, key) => {                      
//         if (!companyCode) return alert('no companyCode received');                  
//         const res = await getFrom(`${BASE_URL}/Api/Values/Get?CID=${companyCode}&type=CollectedBy&prefixText=${key}&Specialist=0`, {}, setSearchList);
//         if (res) {                                                                    
//             setSearchList(res);
//         } else {
//             console.log('No data received');
//         }
//     }  
//     const timer = setTimeout(() => {
//         if (searchTerm.waiterName.length < 1) return;
//         getSearchResult(compCode, searchTerm.waiterName);  
//     }, 500);
//     return () => clearTimeout(timer);
//     }, [searchTerm.waiterName, compCode, locationId])

//     const handleSelect = (i) => {
//         setSelectedWaiter(i);
//         setSearchTerm(pre => ({ ...pre, waiterName: i.Name}));
//         setSearchResultsActive(false);
//     }

//     // const selectMember = () => {
//     //     if (!isLoggedIn) return modalAction('LOGIN_MODAL', true);
//     //     modalAction('MEMBER_SELECT_MODAL', true);
//     // }  

//     const [previousOrder, setPreviousOrder] = useState({loading: true, data: { SalesObj: { SalesDetails: [] } }, err: {status: false, msg: ''}});
//     const [viewItems, setViewItems] = useState(true);
//     const [note, setNote] = useState({id: '', text: ''});

//     let previousOrderItems = useMemo(() => previousOrder.data.SalesObj.SalesDetails.map(i => ({ 
//         Description: i.Description,      
//         BillQty: i.BillQty,                                                              
//         ItemId: i.ItemId,                                                              
//         Unit: i.Unit,
//         AutoId: i.AutoId,
//         MRP: i.ItemMRP,
//         MRPOnDisPer: '',
//         // Rate: num(((i.Amount) - (((i.Amount * i.IGSTRATE) / (i.IGSTRATE + 100))))/i.BillQty),
//         Rate: i.Rate,
//         PackSizeId: i.PackSizeId ? i.PackSizeId : 0,
//         Amount: num(i.Amount),
//         // SRate: num(i.Amount / i.BillQty),
//         TaxableAmount: i.TaxableAmount,
//         CGSTRATE: i.CGSTRATE,
//         SGSTRATE: i.SGSTRATE,
//         IGSTRATE: i.IGSTRATE,

//         SGST: i.SGST,
//         CGST: i.CGST,

//         Specification: i.Specification,                                                    // rerender when note.id changes due edits in specification.
//     })),[previousOrder.data.SalesObj.SalesDetails, restaurantTable?.BedId, note.id])       // previousOrder depends on table Id. 

//     const previousValueList = previousOrderItems.map(item => parseFloat(item.Amount));
//     const previousTotal = parseFloat(previousValueList.reduce((total, num) => total + num, 0).toFixed(2)); 

//     useEffect(() => {
//         if (!isRestaurant) return;
//         const getPreviousOrder = async (CID, LOCID, BillId, TableId) => {
//             if (CID, LOCID, BillId, TableId) {
//                 const res = await getFrom(`${BASE_URL}/api/Pharma/GetKOTDetails?CID=${CID}&LOCID=${LOCID}&BillId=${BillId}&TableId=${TableId}`, {}, setPreviousOrder);
//                 if (res) {              
//                     setPreviousOrder(res);                       
//                 }
//             }
//         }  
//         getPreviousOrder(compCode, locationId, restaurantTable.ProvInvBillid, restaurantTable.BedId)
//     }, [compCode, locationId, restaurantTable?.ProvInvBillid, restaurantTable?.BedId])

//     useEffect(() => { 
//         if (!isRestaurant) return;
//         setOrderData(pre => ({
//             ...pre,
//             PartyCode: compInfo.DefaultCashParty,
//             CollectedById: selectedWaiter.PartyCode,
//             CashPartyName: customer.customerName,
//             CashPartyMobile: customer.customerPhone,
//             VchNo: previousOrder.data.SalesObj.VchNo, 
//             SalesDetailsList: [ ...orderList,  ...previousOrderItems ],
//             Amount: cartSubtotal + previousTotal
//         }))
//     }, [selectedWaiter.PartyCode, customer.customerName, customer.customerPhone, previousOrderItems, previousTotal, orderList, cartSubtotal, restaurantTable?.BedId])      // depends on table Id.

//     useEffect(() => {
//         if (!isRestaurant) return;
//         if (restaurantTable?.ProvInvBillid) {
//             if (previousOrder.data.SalesObj.BillId === undefined) return;            // intially it is undefined.         
//             setCustomer({ customerName: previousOrder.data.SalesObj.CashPartyName, customerPhone: previousOrder.data.SalesObj.CashPartyMobile });
//             setSelectedWaiter({ PartyCode: previousOrder.data.SalesObj.CollectedById, Name: previousOrder.data.SalesObj.CollectedBy });
//             setSearchTerm(pre => ({ ...pre, waiterName: previousOrder.data.SalesObj.CollectedBy || '' }));
//         } else {
//             setCustomer({ customerName: '', customerPhone: '' });
//             // if (compCode === ROYAL_INN_ID) {
//             //     setSelectedWaiter({ PartyCode: userInfo.PartyCode, Name: userInfo.Name });    
//             //     setSearchTerm(pre => ({ ...pre, waiterName: userInfo.Name }));
//             // } else {
//                 setSelectedWaiter({ PartyCode: '', Name: '' });
//                 setSearchTerm(pre => ({ ...pre, waiterName: '' }));
//             // }
//         }
//     }, [previousOrder.data.SalesObj.BillId, restaurantTable?.ProvInvBillid, restaurantTable?.BedId])

//     const submitNote = (item, type, modifyIndex) => {
//         if (type === 'previous order') {
//             setPreviousOrder(pre => {
//                 let list = [ ...pre.data.SalesObj.SalesDetails ];   
//                 if (modifyIndex !== undefined) {
//                     list[modifyIndex].Specification = '';               // Clear Specification. can't use note.id because state update is delayed which gives note.id = '' when this function is called.
//                 } else {
//                     list[note.id].Specification = note.text;
//                 }
//                 let newState = {...pre, data: { SalesObj: { ...pre.data.SalesObj, SalesDetails: list } }};               
//                 return newState;
//             });
//         } else {
//             cartAction('ADD_ITEM', {...item, Specification: note.text}, 'pharmacy');
//         }
//         setNote({id: '', text: ''});
//     }

//     return (                                                                                                      
//         <>
//             <div className={`checkout-area ${b2bMode || 'pt-2 pt-lg-3'} pb-30 epharma-global`}>
//                 <div className="container">
//                     <div className={`row mt-0 ${b2bMode ? 'gy-4' : ' mt-lg-3'}`}>
//                         <div className={`${b2bMode || 'col-lg-5'} col-12`}>
//                             {!isLoggedIn && <h3>Please <span className='text-decoration-underline text-primary' role='button' onClick={() => modalAction('LOGIN_MODAL', true)}>Login</span> to place an order.</h3>}
//                             {isLoggedIn && <div className={`${b2bMode && 'd-flex flex-wrap gap-md-4 flex-column flex-lg-row'}`}>
//                                 {(() => {
//                                     if (isRestaurant) {
//                                         return (
//                                             <>                                        
//                                                 <div className={`shipping-details pt-3 p-lg-0`}>
//                                                     <div className='d-flex justify-content-between align-items-center mb-3 mb-lg-4'>
//                                                         <h5 className='mb-0' style={{fontSize: '1.9rem'}}>Billing Details</h5>
//                                                         {/* <h5 className="mb-0 align-items-center lh-0" style={{fontSize: '1em', gap: '0.3em', color: '#ef008d', display: isLoggedIn ? 'flex' : 'none'}}><i className='bx bxs-user' style={{fontSize: '1em', color: '#ef008d'}}></i> {userInfo.selectedMember.MemberName} <i style={{verticalAlign: 'sub', color: '#f17e1d'}} role='button' className='ms-1 bx bx-caret-down' onClick={selectMember}></i></h5> */}
//                                                         {restaurantTable?.ProvInvBillid ? <h5 className="mb-0 align-items-center lh-0" style={{fontSize: '1em', gap: '0.3em', color: '#ef008d', display: isLoggedIn ? 'flex' : 'none'}}>{previousOrder.data.SalesObj.VchNo} <i style={{verticalAlign: 'sub'}} role='button' className={`ms-1 bx bx-${viewItems ? 'minus' : 'plus'}-circle rounded-circle`} onClick={() => setViewItems(!viewItems)}></i></h5> : ''}
//                                                     </div>
//                                                     <div className="your-order-table user-details table-responsive overflow-visible">
//                                                         <table className="table">
//                                                             <thead>
//                                                                 <tr>
//                                                                     <th className="cart-product-name text-nowrap"><span onClick={() => {history.push(`/posOrderList/${previousOrder.data.SalesObj.BillId}`)}}>T</span>able : &nbsp;&nbsp;&nbsp;</th>
//                                                                     <th className="cart-product-total" style={{width: '73%'}}>
//                                                                         {restaurantTable?.BedId ? 
//                                                                             <span style={{color: '#005ee9'}} role='button' onClick={() => modalAction('TABLE_SELECTION_MODAL', true)}>{restaurantTable?.BedDesc}, &nbsp; {restaurantTable?.BedGroupDesc} <i style={{verticalAlign: 'sub', color: '#f17e1d'}} className='bx bx-caret-down'></i></span>
//                                                                             : 
//                                                                             <span style={{color: '#005ee9'}} role='button' onClick={() => modalAction('TABLE_SELECTION_MODAL', true)}>Select Table <i style={{verticalAlign: 'sub', color: '#f17e1d'}} className='bx bx-caret-down'></i></span>
//                                                                         }
//                                                                     </th> 
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 {/* {restaurantTable?.ProvInvBillid ? <tr className="cart_item">
//                                                                     <td className="cart-product-name text-nowrap">
//                                                                         <strong className="product-quantity">Order ID : </strong>
//                                                                     </td>
//                                                                     <td className="cart-product-total">
//                                                                         <div className='d-flex justify-content-between py-0 py-lg-1'>
//                                                                             <span className="amount fw-bold mt-1">{previousOrder.data.SalesObj.VchNo}</span>
//                                                                             <h6 className='mb-0 fw-bold' style={{color: '#007bff', cursor: 'pointer', borderBottom: '2px solid #007fff', fontSize: '0.9em'}} onClick={() => setViewItems(!viewItems)}>
//                                                                                 <i className={`bx bx-${viewItems ? 'minus' : 'plus'}-circle rounded-circle`} style={{color: '#007bff', fontSize: '1.9rem', verticalAlign: 'middle'}}></i>&nbsp;View Items
//                                                                             </h6>
//                                                                         </div>
//                                                                     </td>
//                                                                 </tr> : ''} */}
//                                                                 <tr className="cart_item">
//                                                                     <td className="cart-product-name text-nowrap">Select Waiter <strong className="product-quantity"> : </strong></td>
//                                                                     <td className="cart-product-total">
//                                                                         <form>
//                                                                             <div className="input-group flex-nowrap position-relative">
//                                                                                 <input className="form-control fw-bold"  onChange={handleSearch} onClick={() => setSearchResultsActive(true)} value={searchTerm.waiterName} name="waiterName" type="text" placeholder="Search Waiter" />
//                                                                                 <span className="input-group-text">Search</span>
//                                                                                 {searchResultsActive && <AutoComplete name='search-results' list={searchList.data} isLoading={searchList.loading} setActive={setSearchResultsActive} styles={{fontSize: '0.9em'}} children={<WaiterCard handleSelect={handleSelect} />} keyName={'PartyCode'} />}
//                                                                             </div>
//                                                                         </form>
//                                                                     </td>
//                                                                 </tr>
//                                                                 <tr className="cart_item">
//                                                                     <td className="cart-product-name text-nowrap">{memberLabel} Name <strong className="product-quantity"> : </strong>
//                                                                     </td>
//                                                                     <td className="cart-product-total">
//                                                                         <div className="input-group flex-nowrap">
//                                                                             <input className="form-control" name='customerName' value={customer.customerName} onChange={(e) => setCustomer(pre => ({...pre, [e.target.name]: e.target.value}))} type="text" placeholder="Enter Name" />
//                                                                         </div>  
//                                                                     </td>
//                                                                 </tr>
//                                                                 <tr className="cart_item">
//                                                                     <td className="cart-product-name text-nowrap"> Phone Number <strong className="product-quantity"> : </strong></td>
//                                                                     <td className="cart-product-total">
//                                                                         <div className="input-group flex-nowrap">
//                                                                             <input className="form-control" name='customerPhone' value={customer.customerPhone} maxLength={10} onChange={(e) => setCustomer(pre => ({...pre, [e.target.name]: e.target.value}))} type="text" placeholder="Enter Number" />
//                                                                         </div>
//                                                                     </td>
//                                                                 </tr>
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 </div>
//                                             </>
//                                         )
//                                     } else {
//                                         return (
//                                             <div className={`shipping-details pt-3 p-lg-0 ${b2bMode && 'flex-1'}`}>
//                                                 <h3 className='mb-4'>Shipping Details</h3>
//                                                 <div className="your-order-table user-details table-responsive">
//                                                     <table className="table">
//                                                         <thead>
//                                                             <tr>
//                                                                 <th className="cart-product-name">Bill To : &nbsp;&nbsp;&nbsp;</th>
//                                                                 <th className="cart-product-total" style={{width: '73%'}}>{userInfo.Name}</th> 
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                             {/* <tr className="cart_item">
//                                                                 <td className="cart-product-name fw-bold text-dark">{memberLabel} <strong className="product-quantity"> : </strong></td>
//                                                                 <td className="cart-product-total">
//                                                                     <div className='d-flex justify-content-between align-items-start gap-3'>
//                                                                         <div>
//                                                                             <span className="amount fw-bold text-dark d-block mb-2">{userInfo.selectedMember.MemberName}</span>
//                                                                             <span className="amount">( {userInfo.selectedMember.GenderDesc}, {userInfo.selectedMember.Age} Yrs )</span>
//                                                                         </div>
//                                                                         <h6 onClick={() => modalAction('MEMBER_MODAL', true, {editId: userInfo.selectedMember.MemberId})} className='mb-0 fw-bold' style={{color: '#007bff', cursor: 'pointer', borderBottom: '2px solid #007fff', fontSize: '1em'}}>
//                                                                             Details&nbsp;<i className='bx bx-caret-down' style={{color: '#007bff', fontSize: '1.9rem', verticalAlign: 'middle'}}></i>
//                                                                         </h6>
//                                                                     </div>
//                                                                 </td>   
//                                                             </tr> */}
//                                                             <tr className="cart_item">
//                                                                 <td className="cart-product-name"> Phone <strong className="product-quantity"> : </strong></td>
//                                                                 <td className="cart-product-total"><span className="amount">{userInfo.RegMob1}</span></td>
//                                                             </tr>
//                                                             <tr className="cart_item">
//                                                                 <td className="cart-product-name"> Address <strong className="product-quantity"> : </strong></td>
//                                                                 <td className="cart-product-total"><span className="amount">{userInfo.Address2}, {userInfo.Address}, {userInfo.City}, {userInfo.StateName}</span></td>
//                                                             </tr>
//                                                             <tr className="cart_item">
//                                                                 <td className="cart-product-name"> Pin Code <strong className="product-quantity"> : </strong></td>
//                                                                 <td className="cart-product-total">
//                                                                     <span className="amount">{userInfo.Pin}</span>
//                                                                     {/* {!isDeliverable && <p className='text-danger mb-0' role='button'>We do not deliver to this address. <span className='text-primary text-decoration-underline' onClick={() => setLocationModalActive(true)}>Change Delivery Address</span></p>} */}
//                                                                 </td>
//                                                             </tr>
//                                                             <tr className="cart_item">
//                                                                 <td className="cart-product-name"> E-mail <strong className="product-quantity"> : </strong></td>
//                                                                 <td className="cart-product-total"><span className="amount">{userInfo.Email}</span></td>
//                                                             </tr>
//                                                             <tr className="cart_item">
//                                                                 <td className="cart-product-total" colSpan={2}>
//                                                                     <Link to='#' onClick={() => {modalAction('EDIT_USER_MODAL', true)}} className='add_an_item_btn ms-auto'>EDIT</Link>
//                                                                 </td>                          
//                                                             </tr>
//                                                         </tbody>
//                                                     </table>
//                                                 </div>
//                                             </div>
//                                         )
//                                     }
//                                 })()}
//                                 {selectedServiceLocation.PIN && <div className={`row mb-4 ${b2bMode && 'flex-1'}`}>
//                                     <div className="col-md-12">
//                                         <h6 className='my-4'>Selected Service Location</h6>
//                                         <div className="card-1 location-card bg-light" style={{fontSize: '1.2em'}}>
//                                             <div style={{display: 'flex', gap: '1em'}}>
//                                                 <i className='bx bxs-shopping-bag' style={{fontSize: '3.5em', color: 'var(--clr-1)'}}></i>
//                                                 <div>
//                                                     <h5 style={{color: 'var(--clr-1)'}}>{selectedServiceLocation.LocationName}</h5>
//                                                     <h6>{selectedServiceLocation.Address}</h6>
//                                                     <p>{selectedServiceLocation.PIN}</p>
//                                                 </div>
//                                             </div>
//                                             {/* <i className='bx bx-check-circle' style={{fontSize: '2em', color: 'var(--bg-1)'}}></i> */}
//                                             {/* <button className="controlled-btn ms-auto" type="button" onClick={() => setLocationModalActive(true)}>CHANGE</button>    */}
//                                         </div>
//                                     </div>
//                                 </div>}
//                             </div>}
//                         </div>
//                         <div className={`${b2bMode || 'col-lg-7'} col-12`}>
//                             <style>
//                                 {  
//                                     b2bMode && `.your-order {
//                                         padding: 1em;
//                                     }
//                                     .your-order-table table th, .your-order-table table td {
//                                         padding: 0.45em 6px;
//                                     }
//                                     .your-order .your-order-table table th {
//                                         border-right: 1px solid #d5d5d5;
//                                         font-weight: 500;
//                                         font-size: 1.1em;
//                                         font-family: 'Poppins' !important;
//                                         padding: 0.45em 0.8em;
//                                     }
//                                     .your-order .your-order-table table td {
//                                         font-size: 1.2em;
//                                     }
//                                 `}
//                             </style>
//                             {isLoggedIn && <div className="your-order">
//                                 <h3 className={`${b2bMode && 'mb-2'}`}>Your order</h3>
//                                 <div className="your-order-table table-responsive" style={{borderBottom: '3px solid #00ddd4', marginBottom: b2bMode || '2.5rem'}}>
                                        
//                                     <table className="table">
//                                         <thead>
//                                             {
//                                                 b2bMode ? 
//                                                 <tr className='checkout-table-header row-style'>
//                                                     <th className='cart-product-name'>Description</th>
//                                                     <th className='cart-product-name'>Pack</th>
//                                                     {/* <th className='cart-product-name'>EXP Date</th> */}
//                                                     {/* <th className='cart-product-name'>Remarks</th> */}
//                                                     <th className='cart-product-name text-center'>BillQty</th>
//                                                     {/* <th className='cart-product-name'>Free Qty</th> */}
//                                                     {/* <th className='cart-product-name'>Q. UOM</th> */}
//                                                     <th className='cart-product-name text-end'>MRP</th>
//                                                     <th className='cart-product-name text-end'>PTR</th>
//                                                     <th className='cart-product-name text-end'>Discount</th>
//                                                     <th className='cart-product-name text-end'>Taxable Amt</th>
//                                                     {/* <th className='cart-product-name'>Dis(%)</th> */}
//                                                     {/* <th className='cart-product-name'>Dis. Amt.</th> */}
//                                                     {/* <th className='cart-product-name'>Sch Dis(%)</th> */}
//                                                     {/* <th className='cart-product-name'>Sch Dis</th> */}
//                                                     <th className='cart-product-name text-end'>CGST %</th>
//                                                     <th className='cart-product-name text-end'>CGST</th>
//                                                     <th className='cart-product-name text-end'>SGST %</th>
//                                                     <th className='cart-product-name text-end'>SGST</th>
//                                                     <th className='cart-product-name text-end'>Amount</th>
//                                                     {/* <th className='cart-product-name'>Profit</th> */}
//                                                     {/* <th className='cart-product-name'>Loss</th> */}
//                                                     <th className='cart-product-name text-center'>Action</th>
//                                                 </tr> : 
//                                                 <tr className='checkout-table-header'>
//                                                     <th className="cart-product-name w-50">{isRestaurant ? 'NEW ORDER' : 'Product'}</th>
//                                                     <th className="cart-product-name text-center">QTY</th>  
//                                                     <th className="cart-product-name text-end">{isRestaurant ? 'RATE' : 'MRP'}</th>
//                                                     {isRestaurant || <th className="cart-product-name text-end">Discount</th>}
//                                                     <th className="cart-product-total text-end">Total</th>
//                                                 </tr>
//                                             }
//                                         </thead>
//                                         <tbody>
//                                             {cartArray.length ? '' : <tr className="cart_item bg-white">
//                                                 {/* <td className="cart-product-name" colSpan={isRestaurant ? 4 : 5}><strong className="product-quantity">NO ITEM IS ADDED.</strong></td> */}
//                                                 <td className="cart-product-name" colSpan={26}><strong className="product-quantity">NO ITEM IS ADDED.</strong></td>
//                                             </tr>}

//                                             {
//                                                 b2bMode ? 
//                                                 cartArray.map((item, index) => {
//                                                     const activeItem = item.ItemPackSizeList.find(x => x.CodeId === item.PackSizeId);
//                                                     const activePackSize = activeItem ? activeItem.Description : 'N/A';

//                                                     let taxbleAmt = (item.count * item.PTR)- ((item.count * item.PTR) * (item.DiscountPer / 100 ));
//                                                     let cgst = taxbleAmt * (item.CGSTRATE / 100);
//                                                     let sgst = taxbleAmt * (item.SGSTRATE / 100);
//                                                     let amount = taxbleAmt + sgst + cgst;

//                                                     return (
//                                                         <Fragment key={item.LocationItemId}>
//                                                             <tr className="cart_item bg-white">
//                                                                 <td className="cart-product-name text-nowrap">{item.Description}</td>
//                                                                 <td className="cart-product-name text-nowrap">{activePackSize}</td>
//                                                                 {/* <td className="cart-product-name"></td> */}
//                                                                 {/* <td className="cart-product-name"></td> */}
//                                                                 <td className="cart_item bg-white">
//                                                                     <div className='d-flex justify-content-between align-items-center' style={{color: '#898989'}}>
//                                                                         <i className='bx bx-minus-circle' onClick={() => {if (item.count !== 1) cartAction('ADD_ITEM', {...item, count: item.count - 1}, 'pharmacy')}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i>
//                                                                             <span className='text-dark mx-1'>{item.count}</span>
//                                                                         <i className='bx bx-plus-circle' onClick={() => cartAction('ADD_ITEM', {...item, count: item.count + 1}, 'pharmacy')} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> 
//                                                                     </div>
//                                                                 </td>
//                                                                 {/* <td className="cart-product-name"></td> */}
//                                                                 {/* <td className="cart-product-name"></td> */}
//                                                                 <td className="cart-product-name text-end text-end text-nowrap"><strong className="product-quantity">{item.ItemMRP}</strong></td>
//                                                                 <td className="cart-product-total text-end text-end text-nowrap">{item.PTR}</td>
//                                                                 <td className="cart-product-name text-end text-end"><strong className="product-quantity">{item.DiscountPer} %</strong></td>
//                                                                 {/* <td className="cart-product-name"></td>
//                                                                 <td className="cart-product-name"></td>
//                                                                 <td className="cart-product-name"></td>
//                                                                 <td className="cart-product-name"></td> */}

//                                                                 <td className="cart-product-name text-end">{num(taxbleAmt)}</td>
//                                                                 {/* <td className="cart-product-name text-end">{((item.count * item.PTR) - ((item.count * item.PTR * item.IGSTRATE) / (item.IGSTRATE + 100))).toFixed(2)}</td> */}
//                                                                 <td className="cart-product-name text-end">{item.CGSTRATE}</td>
//                                                                 <td className="cart-product-name text-end">{num(cgst)}</td>
//                                                                 <td className="cart-product-name text-end">{item.SGSTRATE}</td>
//                                                                 <td className="cart-product-name text-end">{num(sgst)}</td>
//                                                                 <td className="cart-product-name text-end">{num(amount)}</td>
//                                                                 {/* <td className="cart-product-name"></td>
//                                                                 <td className="cart-product-name"></td> */}
//                                                                 <td className="cart-product-total text-center"><span className="amount" onClick={() => cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy')}> <i className='bx bx-x-circle ms-md-2 text-danger circle-rounded' role='button' style={{fontSize: '1.3em', verticalAlign: 'sub'}}></i></span></td>
//                                                             </tr>
//                                                         </Fragment>
//                                                     )
//                                                 })
//                                                 :
//                                                 cartArray.map((item) => (
//                                                     <Fragment key={item.LocationItemId}>
//                                                         <tr className="cart_item bg-white">
//                                                             <td className="cart-product-name">
//                                                                 {isRestaurant && <><i onClick={() => setNote({id: item.LocationItemId, text: item.Specification})} className='bx bx-edit align-middle me-md-2' style={{color: '#008503', fontSize: '1.2em'}} role='button'></i>&nbsp;</>}
//                                                                 {item.Description}
//                                                             </td>
//                                                             <td className="cart_item bg-white">
//                                                                 <div className='d-flex justify-content-between align-items-center' style={{color: '#898989'}}>
//                                                                     <i className='bx bx-minus-circle' onClick={() => {if (item.count !== 1) cartAction('ADD_ITEM', {...item, count: item.count - 1}, 'pharmacy')}} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i>
//                                                                         <span className='text-dark mx-1'>{item.count}</span>
//                                                                     <i className='bx bx-plus-circle' onClick={() => cartAction('ADD_ITEM', {...item, count: item.count + 1}, 'pharmacy')} style={{fontSize: '1.2em', verticalAlign: 'middle'}}></i> 
//                                                                 </div>
//                                                             </td>
//                                                             {isRestaurant ? 
//                                                                 <td className="cart-product-name text-end text-nowrap"><strong className="product-quantity">{item.SRate}</strong></td>
//                                                             : 
//                                                                 <>
//                                                                     <td className="cart-product-name text-end text-nowrap"><strong className="product-quantity">{item.ItemMRP}</strong></td>
//                                                                     <td className="cart-product-name text-end"><strong className="product-quantity"> {item.DiscountPer}%</strong></td>
//                                                                 </>
//                                                             }
//                                                             <td className="cart-product-total text-end text-nowrap"><span className="amount" onClick={() => cartAction('REMOVE_ITEM', item.LocationItemId, 'pharmacy')}>₹ {num(item.SRate * item.count)} <i className='bx bx-x-circle ms-md-2 text-danger circle-rounded' role='button' style={{fontSize: '1.3em', verticalAlign: 'sub'}}></i></span></td>
//                                                         </tr>
//                                                         {isRestaurant && item.Specification ? <tr>
//                                                             <td className="cart_item p-2" colSpan={4} style={{background: 'aliceblue'}}>
//                                                                 <i className='bx bx-subdirectory-right me-2' style={{transform: 'scale(1.6)'}}></i> {item.Specification} <i className='bx bx-message-square-x ms-2' onClick={() => cartAction('ADD_ITEM', {...item, Specification: ''}, 'pharmacy')} role='button' style={{transform: 'scale(1.2)'}}></i>
//                                                             </td>
//                                                         </tr> : ''}
//                                                         {isRestaurant && (note.id === item.LocationItemId) ? 
//                                                         <>
//                                                             <tr>
//                                                                 <td className="cart-product-total" colSpan={4}>
//                                                                     <form className="input-group flex-nowrap position-relative" onSubmit={() => submitNote(item)}>
//                                                                         <input className="form-control fw-bold" onChange={(e) => setNote(pre => ({...pre, text: e.target.value}))} value={note.text} name="Note" type="text" placeholder="Write Notes" />
//                                                                         <button type='submit' className="input-group-text">Add Note</button>
//                                                                     </form>
//                                                                 </td>
//                                                             </tr>
//                                                         </> : ''}
//                                                     </Fragment>
//                                                 ))
//                                             }                                 

//                                         {isRestaurant && <tr className="cart_item bg-white" style={{borderTop: '2px solid #c1c1c1'}}>
//                                                 <th className="py-3">Current Total</th>
//                                                 <th className="py-3"></th>
//                                                 {isRestaurant || <th className="py-3"></th>}
//                                                 <th className="py-3"></th>
//                                                 <th className="py-3 text-end">₹ {cartSubtotal}</th>
//                                             </tr>}
//                                         </tbody>
//                                         {(() => {
//                                             if (isRestaurant || b2bMode) {
//                                                 return; 
//                                             } else {
//                                                 return (
//                                                     <tfoot>
//                                                         <tr className="cart-subtotal">
//                                                             <th>Cart Subtotal</th>
//                                                             <td></td>
//                                                             <td></td>
//                                                             <td></td>
//                                                             <th className='text-end' colSpan={22}><span className="amount">₹ {cartSubtotal}</span></th>
//                                                         </tr>
//                                                         <tr className="cart-subtotal">
//                                                             <th>Service Charge</th>
//                                                             <td></td>
//                                                             <td></td>
//                                                             <td></td>
//                                                             <th className='text-end' colSpan={22}><span className="amount">₹ 00</span></th>
//                                                         </tr>
//                                                         <tr className="order-total">
//                                                             <th>Order Total</th>
//                                                             <td></td>
//                                                             <td></td>
//                                                             <td></td>
//                                                             <th className='text-end' colSpan={22}><strong><span className="amount">₹ {cartSubtotal}</span></strong></th>
//                                                         </tr>
//                                                     </tfoot>
//                                                 )
//                                             }
//                                         })()}
//                                     </table>

//                                     {restaurantTable?.ProvInvBillid ? <table className="table mt-4 mb-0" style={{display: viewItems ? 'table' : 'none', transition: '0.4s linear', borderTop: '3px solid rgb(0, 221, 212)'}}>
//                                         <thead>
//                                             <tr>
//                                                 <th className="cart-product-name">Previously Ordered</th>
//                                                 <th className="cart-product-name">QTY</th>                                            
//                                                 <th className="cart-product-name text-end">RATE</th>
//                                                 <th className="cart-product-total text-end">Total</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {   previousOrder.loading ? 
//                                                 <tr className="cart_item bg-white">
//                                                     <td className="cart-product-name" colSpan={4}>
//                                                         <Skeleton count={6}/>                                      
//                                                     </td>
//                                                 </tr> :
//                                                 previousOrderItems.map((item, index) => (
//                                                 <Fragment key={index}>
//                                                     <tr className="cart_item bg-white">
//                                                         <td className="cart-product-name"> 
//                                                             <i onClick={() => setNote({id: index, text: item.Specification})} className='bx bx-edit align-middle me-md-2' style={{color: '#008503', fontSize: '1.2em'}} role='button'></i>&nbsp;
//                                                             {item.Description}
//                                                         </td>
//                                                         <td className="cart-product-name"><strong className="product-quantity">{item.BillQty}</strong></td>
//                                                         <td className="cart-product-name text-end text-nowrap"><strong className="product-quantity">{item.Rate}</strong></td>
//                                                         <td className="cart-product-total text-end text-nowrap">₹ {item.Amount}<span className="amount"> </span></td>
//                                                     </tr>
//                                                     {item.Specification ? <tr>
//                                                         <td className="cart_item p-2" colSpan={4} style={{background: 'aliceblue'}}>
//                                                             <i className='bx bx-subdirectory-right me-2' style={{transform: 'scale(1.6)'}}></i> {item.Specification} <i className='bx bx-message-square-x ms-2' onClick={() => {setNote({id: index, text: ''}); submitNote(item, 'previous order', index)}} role='button' style={{transform: 'scale(1.2)'}}></i>
//                                                         </td>
//                                                     </tr> : ''}
//                                                     {note.id === index ? <tr>
//                                                         <td className="cart-product-total" colSpan={4}>
//                                                             <form className="input-group flex-nowrap position-relative" onSubmit={() => submitNote(item, 'previous order')}>
//                                                                 <input className="form-control fw-bold" onChange={(e) => setNote(pre => ({...pre, text: e.target.value}))} value={note.text} name="Note" type="text" placeholder="Write Notes" />
//                                                                 <button type='submit' className="input-group-text" id="basic-addon2" >Add Note</button>
//                                                             </form>
//                                                         </td>
//                                                     </tr>: ''}
//                                                 </Fragment>
//                                             ))}
//                                             <tr className="cart_item bg-white" style={{borderTop: '2px solid #c1c1c1'}}>
//                                                 <th className="py-3">Previous Total</th>
//                                                 <th className="py-3"></th>
//                                                 <th className="py-3"></th>
//                                                 <th className="py-3 text-end">₹ {previousOrder.data.SalesObj.Amount}</th>
//                                             </tr>
//                                             <tr className="order-total">
//                                                 <th>Order Total</th>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <th className='text-end'><strong><span className="amount">₹ {cartSubtotal + previousTotal}</span></strong></th>
//                                             </tr>
//                                         </tbody>
//                                     </table> : ''}

//                                     {prescription.patient.name && <div className='d-flex justify-content-between align-items-start' style={{borderTop: '1px solid #d3d3d3', padding: '1em 0'}}>
//                                         <h6 style={{marginTop: 3}}>Patient Name</h6>
//                                         <div className='d-flex flex-column align-items-end'>

//                                             <div className='hover-dropdown'>
//                                                 <h6 className='mb-0 d-flex align-items-center gap-2 mb-1' style={{fontWeight: 500}}>
//                                                     <i className='bx bx-check-double' style={{fontSize: '1.7em', verticalAlign: 'middle', color: 'var(--clr-9)'}}></i> 
//                                                     <span>
//                                                         {prescription.patient.name} &nbsp;&nbsp;
//                                                         <i className='bx bxs-down-arrow' style={{color: '#007bff', fontSize: '1.9rem', verticalAlign: 'middle'}}></i>
//                                                     </span>
//                                                 </h6>
//                                                 <ul className="dropdown-menu" style={{fontSize: '1.05em'}}>
//                                                     <li><Link onClick={() => modalAction('PRESCRIPTION_MODAL', true)} className="dropdown-item py-3" to="#"><i className='bx bx-user-circle me-2' style={{'--clr': '#0494f9'}}></i> View Details</Link></li>
//                                                 </ul>
//                                             </div>
//                                             <span className="amount fw-normal">( {prescription.patient.gender.GenderDesc}, {prescription.patient.age} Yrs )</span>  
//                                         </div>
//                                     </div>}

//                                     {prescription.required ? <>
//                                         {prescription.imgName ? 
//                                             <div className='d-flex justify-content-between align-items-center' style={{borderTop: '1px solid #d3d3d3', padding: '1em 0 1em'}}>
//                                                 <h6 className='mb-0' style={{color: '#005feb'}}>YOUR PRESCRIPTION</h6>
//                                                 <div className='d-flex flex-column flex-md-row gap-4'>
//                                                     <div className='img-preview'>
//                                                         <div className="zoom-img">
//                                                             <i className='bx bx-search search'></i>
//                                                         </div>
//                                                         <i className='bx bx-x delete' onClick={() => globalDataAction({ prescription: { required: true, patient: { docName: '', docAddress: '' } } })}></i>
//                                                         {
//                                                             prescription.extn === '.pdf' ?
//                                                                 <>
//                                                                     <embed src={prescription.src} className="d-none d-lg-block" />
//                                                                     <div className="d-flex align-items-center rounded-4 p-3 d-lg-none" style={{height: '7em', background: '#e7e7e7', padding: '1em', border: '1px solid #cdcdcd'}}>No Preview Available</div>
//                                                                 </>
//                                                             :
//                                                             <a className="popup-img venobox vbox-item d-flex justify-content-center" href={prescription.src} data-gall="myGallery">
//                                                                 <img src={prescription.src} alt="Uploaded content"/>
//                                                             </a>
//                                                         }
//                                                     </div>
//                                                     <h5 className='mb-0 text-end' style={{fontFamily: 'Lato', fontSize: '1em'}}>{prescription.imgName}</h5>
//                                                 </div>
//                                             </div>
//                                             :
//                                             <>
//                                                 <div className='d-flex justify-content-between align-items-center' style={{borderTop: '1px solid #d3d3d3', padding: '1em 0 1em'}}>
//                                                     <h6 className='text-danger mb-0'>ADD PRESCRIPTION</h6>
//                                                     <h6 className='mb-0' onClick={() => modalAction('PRESCRIPTION_MODAL', true)} style={{color: '#007bff', cursor: 'pointer'}}><i className='bx bx-file' style={{fontSize: '3rem', verticalAlign: 'middle', marginBottom: '0.4rem'}}></i> UPLOAD</h6>
//                                                 </div>
//                                                 <div className='d-flex justify-content-between align-items-center' style={{borderTop: '1px solid #d3d3d3', padding: '1em 0 0.1em'}}>
//                                                     <h6>Payment Method</h6>
//                                                     <h6><i className='bx bxs-credit-card' style={{fontSize: '3rem', verticalAlign: 'middle', color: '#00BCD4', marginBottom: '0.4rem'}}></i> Cash on Delivery</h6>
//                                                 </div>
//                                             </>
//                                         }
//                                     </> : ''}
//                                 </div>
//                                 {b2bMode && <div className="your-order-table table-responsive" style={{borderBottom: '3px solid #00ddd4', marginBottom: '2.5rem'}}>
//                                     <table className="table" style={{borderLeft: '1px solid #d5d5d5'}}>
//                                         <tfoot>
//                                             <tr className="cart-subtotal">
//                                                 <th>Cart Subtotal</th>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <th className='text-end' colSpan={22}><span className="amount">{b2bSubtotal}</span></th>
//                                             </tr>
//                                             <tr className="cart-subtotal">
//                                                 <th>Distributer Discount</th>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <th className='text-end' colSpan={22}><span className="amount">- {cartDiscount}</span></th>
//                                             </tr>
//                                             <tr className="cart-subtotal">
//                                                 <th>TOTAL GST</th>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <th className='text-end' colSpan={22}><span className="amount">+ {cartGSTtotal}</span></th>
//                                             </tr>
//                                             <tr className="order-total">
//                                                 <th>Order Total</th>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <th className='text-end' colSpan={22}><strong><span className="amount">₹ {b2bGrandTotal}</span></strong></th>
//                                             </tr>
//                                         </tfoot>
//                                     </table>
//                                 </div>}
//                                 {/* <div className='coupon-accordion'>
//                                     <h3 onClick={() => setCouponTab(!couponTab)}>Have a coupon? <span id="showcoupon">Click here to enter your code</span></h3>
//                                     {couponTab && <div id="checkout_coupon" className="coupon-checkout-content">
//                                         <div className="coupon-info">
//                                             <form action="#">
//                                                 <p className="checkout-coupon">
//                                                     <input placeholder="Coupon code" type="text" onChange={dummyFunction}/>
//                                                     <input value="Apply Coupon" type="submit" onChange={dummyFunction}/>
//                                                 </p>
//                                             </form>
//                                         </div>
//                                     </div>}
//                                 </div> */}
//                                 <div className="payment-method">
//                                     {/* <h4>Payment Method</h4> */}
//                                     <div className="payment-accordion">
//                                         {/* <div id="accordion">
//                                             <div className="card shadow-none">
//                                                 <div className="card-header" id="#payment-3">
//                                                     <h5 className="panel-title">
//                                                         <Link to='#' className="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
//                                                             <i className='bx bxs-badge-check' style={{fontSize: '3rem', verticalAlign: 'middle', color: '#00BCD4', marginBottom: '0.4rem'}}></i> Cash on Delivery
//                                                         </Link>
//                                                     </h5>
//                                                 </div>
//                                                 <div id="collapseThree" className="collapse" data-parent="#accordion">
//                                                     <div className="card-body">
//                                                         <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div> */}

//                                         <div className="order-button-payment">

//                                             {prescription.required ? <>
//                                                 {!prescription.src && <p className='text-dark mb-2' style={{fontFamily: 'Lato', fontWeight: 600}}><i className='bx bxs-info-square me-2 text-danger' style={{fontSize: '1.5em', verticalAlign: 'sub'}}></i>Please Attach your prescription to place an order.</p>}
//                                             </> : ''}

//                                             {(() => {
//                                                 if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
//                                                     return (
//                                                         <button type='submit' className={`ms-auto ${(isLoggedIn) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button> 
//                                                     )
//                                                 } else if (vType === 'ErpPharma' || vType === 'agro') {
                                                    
//                                                     if (compCode === XYZ_ID || !prescription.required) {
//                                                         return <button type='submit' className={`ms-auto ${(isLoggedIn && isDeliverable) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button> 
//                                                     } else {
//                                                         return <button type='submit' className={`ms-auto ${(isLoggedIn && isDeliverable && prescription.src) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button>;
//                                                     }
//                                                 }
//                                             })()}

//                                             {/* { compCode === TAKE_HOME_ID ?
//                                                 <button type='submit' className={`ms-auto ${(isLoggedIn && isDeliverable && prescription.src) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button> :    
//                                                 <button type='submit' className={`ms-auto ${(isLoggedIn && isDeliverable) ? '' : 'pe-none opacity-50 bg-secondary'}`} onClick={placeOrder}>Place Order</button>     
//                                             } */}
//                                         </div>                                               
//                                         {isDeliverable ? '' : <div className='row mt-4'>    
//                                             <div className="col-md-12">
//                                                 <div className="checkout-form-list position-relative">
//                                                     <p className='text-danger mb-0 mt-2'>Now we have no service at your PIN code - {userInfo.Pin} We will be available in your area very soon.</p>
//                                                 </div>
//                                             </div>
//                                             <div className="cta-no-location your-order-table user-details table-responsive">
//                                                 <table className="table" style={{fontSize: '1em'}}>
//                                                     <thead>
//                                                         <tr>
//                                                             <th className="cart-product-name"><i className='bx bxs-info-circle' style={{fontSize: '1.85rem', color: 'orange'}}></i> What you can do !</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         <tr className="cart_item">
//                                                             <td className="cart-product-name">Change your address <button onClick={() => {closeModal();modalAction('EDIT_USER_MODAL', true);}} className="controlled-btn ms-auto" type="button" style={{fontSize: '1.3rem'}}>Change Address</button></td>
//                                                         </tr>
//                                                         <tr className="cart_item">
//                                                             <td className="cart-product-name">Change the area <button onClick={() => {closeModal();focusArea(globalDataAction);}} className="controlled-btn ms-auto" type="button" style={{fontSize: '1.3rem'}}>Change Area</button></td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         </div>}
//                                     </div>
//                                 </div>
//                             </div>}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ModalComponent isActive={locationModalActive} className={'location-selection-modal'} child={<LocationModal closeModal={closeModal} userInfo={userInfo}  compCode={compCode} globalData={globalData} globalDataAction={globalDataAction} modalAction={modalAction} setDeliverable={setDeliverable} />} />
//         </>
//     )
// }

// const mapStateToCheckout = (state) => {
//   return { compCode: state.compCode, cart: state.cart, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, compInfo: state.compInfo, globalData: state.globalData, vType: state.vType };
// }

// export default connect(mapStateToCheckout, {breadCrumbAction, loginStatusAction, userInfoAction, loaderAction, modalAction, cartAction, myOrdersAction, globalDataAction})(Checkout);


// function LocationModal({ closeModal, compCode, userInfo, globalData, setDeliverable, globalDataAction, modalAction }) {

//     const locationId = globalData.location.LocationId;
//     const [location, setLocation] = useState({ Pin: userInfo.Pin });
//     const [locationList, setLocationList] = useState({loading: true, data: '', err: {status: false, msg: ''}});
    
//     useEffect(() => {      
//         if (!location.Pin.length || location.Pin.length < 6) {
//             alert('Your Pin Code is Invalid Please change your Pin Code.');
//             closeModal();
//             return;
//         } else if (!locationId) {
//             alert('Please select a location before placing orders.'); 
//             closeModal();
//             return;
//         }
//         const getServiceLocations = async () => {
//             const res = await getFrom(`${BASE_URL}/api/Location/Get?CID=${compCode}&LocationId=${locationId}&PinCode=${location.Pin}`, {}, setLocationList);            // using useCallback to avoid esling warning about useEffect dependencies.
//             if (res) {
//                 setLocationList(res);   
//             }
//         }
//         setTimeout(() => {
//             getServiceLocations();
//         }, 1000);

//     }, [location.Pin, locationId])

//     useEffect(() => {
//         if (location.Pin !== userInfo.Pin) setLocation({ Pin: userInfo.Pin });
//     }, [userInfo.Pin])

//     const renderLocationList = (data) => {
//         if (data.loading) {
//           return <Spinner min_height='19rem' fSize='1.5rem'/>;
//         } else if (data.err.status) {
//           return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
//         } else if (data.data === 0) {
//           setDeliverable(false);
//           return <p className='text-danger mb-0 mt-2'>Now we have no service in this PIN - We will be available in your area very soon.</p>;
//         } else {
//           closeModal();
//           setDeliverable(true);
//           return;
//         }
//     }    

//     return (
//         <form>
//             <div className='card'>
//                 <h5 className="card-header d-flex justify-content-between" style={{padding: '0.7em 1em'}}>Please Select a Service Location <i className='bx bx-x-circle' onClick={closeModal} role='button' style={{fontSize: '1.2em'}}></i></h5>
//                 <div className='card-body' style={{padding: '1.3em'}}>
//                     <div className='row'>
//                         <div className="col-md-12">
//                             <div className="checkout-form-list position-relative">
//                                 <label>Pincode / Zip <span className="required">*</span></label>
//                                 <input readOnly type="text" name='Pin' value={location.Pin} onChange={(e) => {handleNumberInputs(e, setLocation);}} autoComplete='off' maxLength='6'/>
//                                 {renderLocationList(locationList)}
//                             </div>
//                         </div>
//                         <div className="cta-no-location your-order-table user-details table-responsive">
//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th className="cart-product-name"><i className='bx bxs-info-circle' style={{fontSize: '1.85rem', color: 'orange'}}></i> What you can do !</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr className="cart_item">
//                                         <td className="cart-product-name">Change your address <button onClick={() => {closeModal();modalAction('EDIT_USER_MODAL', true);}} className="controlled-btn ms-auto" type="button" style={{fontSize: '1.3rem'}}>Change Address</button></td>
//                                     </tr>
//                                     <tr className="cart_item">
//                                         <td className="cart-product-name">Change the area <button onClick={() => {closeModal();focusArea(globalDataAction);}} className="controlled-btn ms-auto" type="button" style={{fontSize: '1.3rem'}}>Change Area</button></td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     )
// }