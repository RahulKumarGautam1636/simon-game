import Container from 'react-bootstrap/Container';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import { debounce } from 'lodash';
import { BASE_URL } from '../../../../constants';
import { addToCart, AutoComplete, computeWithPackSize, EmptyCart, getFallbackImg, getFrom, getRequiredFieldsOnly, noticeToast, Spinner } from '../utilities';
import { AddToCartBtn } from '../cards';
import { connect, useSelector } from 'react-redux';
import { cartAction, globalDataAction, modalAction, wishlistAction } from '../../../../actions';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { num } from '../../default/utilities';
import { LocationCard } from '../modals/locationsModal';
import { filterUnique } from '../../../utils/utils';


const Home = ({ cart, cartAction, globalData, compCode }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [eventKey, setEventKey] = useState("0");
    const cartArray = Object.values(cart.pharmacy);
    const uniqueLocations = filterUnique(cartArray, 'LocationId');
    const cartArrayLength = cartArray.length;                   
  
    const cartItemsValueList = cartArray.map(item => item.count * item.PTR);                      
    const cartSubtotal = num(cartItemsValueList.reduce((total, num) => total + num, 0));    
    
    const cartItemsMRPValueList = cartArray.map(item => item.count * item.ItemMRP);                      
    const cartMRPtotal = num(cartItemsMRPValueList.reduce((total, num) => total + num, 0)); 

    const cartItemsDiscount = cartArray.map(item => ((item.PTR * item.count) * (item.DiscountPer / 100 )));                      
    const cartDiscount = num(cartItemsDiscount.reduce((total, num) => total + num, 0)); 

    const cartItemsGSTValueList = cartArray.map(i => {
        let taxbleAmt = num((i.count * i.PTR)- ((i.count * i.PTR) * (i.DiscountPer / 100 )));
        let cgst = num(taxbleAmt * (i.CGSTRATE / 100));
        let sgst = num(taxbleAmt * (i.SGSTRATE / 100));
        return num(sgst + cgst);
    }); 
                   
    const cartGSTtotal = num(cartItemsGSTValueList.reduce((total, num) => total + num, 0));  
    const grandTotal = num(cartSubtotal - cartDiscount + cartGSTtotal);  

 // Keep a reference to the cancel token
 const cancelTokenSourceRef = useRef(null);

    const searchFunc = async (text) => {
     
        // Cancel the previous request if it exists
        if (cancelTokenSourceRef.current) {
            cancelTokenSourceRef.current.cancel();
        }
        // Create a new cancel token
        cancelTokenSourceRef.current = axios.CancelToken.source();
        
        if(!text.trim()){
            setOrders([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        try{
            const url = `${BASE_URL}/api/item/Get?CID=${compCode}&SearchStr=${text}&LOCID=${globalData.location.LocationId}`          
            const res = await axios.get(url,{ cancelToken: cancelTokenSourceRef.current.token });
            if(Array.isArray(res?.data?.itemMasterCollection) && text){
                setOrders(getRequiredFieldsOnly(res.data.itemMasterCollection));
            }
            setLoading(false);
        }
        catch(error){
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        searchFunc('tab');
    },[globalData.location.LocationId])

    const debouncedSearch = debounce(searchFunc, 1000);

    return (
        <div style={{ minHeight: "100vh", padding: "10px" }}>
            <Container style={{ maxWidth: "100%" }} className='px-0 px-md-5 b2b-home'>
                <div className='d-flex flex-column flex-lg-row gap-md-4'>
                    <div className="flex-1" >
                        <div>
                            {/* <select className="form-select" aria-label="Default select example" style={{width: 'fit-content', backgroundColor: '#ededed'}}>
                                <option selected="">Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select> */}
                            <div className='position-relative'>
                                <input className='form-control inputHome' placeholder='SEARCH FOR PRODUCTS...' onChange={(e) => { setEventKey("0"); debouncedSearch(e.target.value) }} />
                                <i className="fas fa-search absolute top-1/2 left-[1.3em] text-[1.4em] text-gray-400" style={{transform: 'translate(-50%, -44%)'}}></i>
                            </div>
                            <div className='d-md-flex d-lg-flex justify-content-between d-none'>
                                <div className='topProduct' style={{marginBottom:"4px"}}>Top Products for you</div>
                            </div>
                            <div className='my-2'>  
                                <Accordion activeKey={eventKey}>
                                    <Accordion.Item eventKey="0" className='overflow-hidden product-search-accord'>
                                        <Accordion.Header onClick={() => { setEventKey((prev) => prev === "0" ? null : "0") }} className="d-block d-md-none d-lg-none">Top Products for you</Accordion.Header>
                                        <Accordion.Body style={{ padding: "0" }}>
                                            {loading ? <div className='w-100'><Skeleton count={20} /></div> :
                                                orders.length ?
                                                    <div style={{ maxHeight: "90vh", overflow: "auto", fontSize: '1.2em', background: '#ebebeb' }}>{
                                                        orders.map(el => (
                                                            <ConnectedProductCard3 key={el.LocationItemId} data={el} />
                                                        ))
                                                    }</div> : <div className='text-center mt-2 fs-3'>No Product Found</div>}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    <div className='text-nowrap overflow-hidden' style={{ minWidth: '35rem', border: '1px solid #d5d5d5', borderRadius: 5 }}>
                        <div className='gap-3 d-flex align-items-center' style={{ backgroundColor: "#efefef", padding: '0.3em 0.5em', borderBottom: '1px solid #d5d5d5' }}>
                            <i className='bx bx-cart-alt fs-2'></i>
                            <span>{cartArrayLength} Items</span>
                            <span className='ms-auto fw-medium'>Total PTR:</span>
                            <div className='placeOrder text-nowrap px-3'> ₹ {cartSubtotal}</div>
                            <i className='bx bx-trash text-danger pointer fs-2 ms-1' onClick={() => cartAction('EMPTY_CART')}></i>
                        </div>
                        {!cartArrayLength ? <EmptyCart label={'Your Cart is Empty'} classes={'mb-0'} styles={{fontSize: '0.8em'}} /> : 
                        <>

                            {
                                uniqueLocations.map(i => (
                                    <>  
                                        <label className='d-flex justify-content-between cursor-pointer px-3 py-3 bg-sky-500 text-white items-center border-b border-gray-300' htmlFor={`target-${i.LocationId}`}>
                                            <h4 className='text-white !text-[1em] mb-0'>Distributer</h4>
                                            <h4 className='text-white !text-[1em] mb-0'>{i.LocationName} <i class="fas fa-chevron-down ms-2"></i></h4>
                                        </label>
                                        <input type="checkbox" className='loc-dropdown d-none' id={`target-${i.LocationId}`} />
                                        <div>
                                            {(() => {
                                                let cartItems = cartArray.filter(x => x.LocationId === i.LocationId)
                                                return cartItems.map(i => {
                                                    const activeItem = i.ItemPackSizeList.find(x => x.CodeId === i.PackSizeId);
                                                    const activePackSize = activeItem ? activeItem.Description : 'N/A';
                                                    const totalMRP = num(i.ItemMRP * i.count)
                                                    const totalPTR = num(i.PTR * i.count)
                                                    // const totalMargin = (parseFloat(totalMRP) - parseFloat(totalPTR)).toFixed(2)
                                                    const itemDiscount = num((i.PTR * i.count) * (i.DiscountPer / 100 ))
                                                    return (
                                                        <div className='cartItemHome pb-3' key={i.LocationItemId}>
                                                            <div className='fw-bold fs-5 d-flex gap-4 justify-content-between text-normal'>
                                                                {i.Description}
                                                                <p className="packSize m-0 py-1" style={{fontSize: '0.9em'}}><span className="current" role="button">{activePackSize}</span></p>
                                                            </div>
                                                            {/* <div style={{ color: "gray", margin: '-4px 0px 2px' }}>
                                                                {i.LocationName}
                                                            </div> */}
                                                            <div className='d-flex align-items-center justify-content-between'>
                                                                <div>GST: <span className='fw-medium'>{i.IGSTRATE}%</span></div>                           
                                                                <div>Discount: <span className='fw-medium'>{i.DiscountPer}%</span></div>                           
                                                                <div>MRP: <span className='fw-medium'>₹ {i.ItemMRP}</span></div>                           
                                                            </div>
                                                            <div className='pt-2 d-flex justify-content-between align-items-center' >
                                                                <div className="input-group flex-nowrap labeled-input" style={{fontSize: '0.75em'}}>
                                                                    <span className="input-group-text text flex-column pe-all" style={{padding: '0.2em 0.7em', color: '#636363', fontSize: '1.2em'}}>
                                                                        <i className='bx bxs-up-arrow' onClick={() => cartAction('ADD_ITEM', {...i, count: i.count+1}, 'pharmacy')}></i>
                                                                        <i className='bx bxs-down-arrow' onClick={() => {if (i.count !== 1) cartAction('ADD_ITEM', {...i, count: i.count-1}, 'pharmacy')}}></i>
                                                                    </span>
                                                                    <input className="form-control text-center" name="query" value={i.count} readOnly type="text"/>
                                                                    <span className="input-group-text">
                                                                        <i onClick={() => cartAction('REMOVE_ITEM', i.LocationItemId, 'pharmacy')} className='bx bx-trash text-danger text-end d-block fs-2 pointer'></i>
                                                                    </span>
                                                                </div>
                                                                <div className='fw-medium' style={{ color: "#0d6efd" }}> 
                                                                    PTR: ₹ {i.PTR}
                                                                </div>
                                                            </div>
                                                            <div className='d-flex align-items-center justify-content-between' style={{ fontSize: '0.98em', background: '#e6f0ff', border: '1px solid #b3cbf0', borderRadius: '5px', padding: '0.25em 0.6em 0.2em' }}>
                                                                <div>Total MRP<span className='fw-medium d-block mt-1'>₹ {totalMRP}</span></div>                           
                                                                <div>Total PTR<span className='fw-medium d-block mt-1'>₹ {totalPTR}</span></div>                           
                                                                <div className='text-end'>Total Discount<span className='fw-medium d-block mt-1'>₹ {itemDiscount}</span></div>                           
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            })()}
                                        </div>
                                    </>
                                ))
                            }


                            {/* <div className='m-2 border p-2 d-flex rounded cursor-pointer'>
                                <div className='bg-success px-1 text-white rounded'>%</div>
                                <div className='ms-1' >View coupons and offer</div>
                                <div className='d-flex justify-content-end align-items-center flex-grow-1' ><i className='bx bx-right-arrow-alt'></i></div>
                            </div> */}
                            <div className='d-flex flex-column' style={{ backgroundColor: "#efefef", padding: "5px", gap: '3px' }}>
                                <div className='d-flex justify-content-between'>
                                    <div className='fs-13px'>Total MRP</div>
                                    <div className='fs-13px'>{cartMRPtotal}</div>
                                </div>
                                <div className='d-flex justify-content-between' style={{ color: "#0d6efd" }}>
                                    <div className='fs-13px'>Total PTR</div>
                                    <div className='fs-13px'>{cartSubtotal}</div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='fs-13px'>Distributer Discount</div>
                                    <div style={{ fontSize: "13px" }}>- {cartDiscount}</div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='fs-13px'>Total GST</div>
                                    <div className='fs-13px'>+ {cartGSTtotal}</div>
                                </div>
                                <div className='d-flex justify-content-between fw-bold'>
                                    <div className='fs-13px'>Order value*</div>
                                    <div className='fs-13px'>₹ {grandTotal}</div>
                                </div>
                                <div className="order-button-payment">
                                    <Link to='/checkout' className={`w-100 mt-2 d-grid ${!cartArrayLength ? 'pe-none opacity-50' : ''}`} style={{placeItems: 'center'}}>CHECKOUT</Link>
                                </div>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps1 = (state) => {return {cart: state.cart, globalData: state.globalData, compCode: state.compCode}}
  
export const ConnectedB2BHome = connect(mapStateToProps1, {cartAction})(Home);



export const ProductCard3 = ({ data, globalData, vType, cartAction, isLoggedIn, globalDataAction, cart, className, styles, modalAction, compare=true, detailed, popupViewStyles={} }) => {
    
    const [activePackSize, setPackSize] = useState('');
    const existInCart = Object.values(cart.pharmacy).find(i => i.LocationItemId === data.LocationItemId);
    const isAdded = existInCart?.LocationItemId;
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const packSizeList = data.ItemPackSizeList;
        if (packSizeList && packSizeList?.length) {
            const firstSizeId = packSizeList[0];
            setPackSize(firstSizeId);
        } else {
            setPackSize('');
        }
    }, [data])

    useEffect(() => {
        if (detailed) setPinCodeDropdown(true);
    }, [detailed])

    const packSize = () => {      
        return computeWithPackSize(data, activePackSize, vType);
    }

    const handlePackSize = (i) => {
		if (i.CodeId === packSize().PackSizeId) return;
		setPackSize(i);
        if (isAdded) return cartAction('REMOVE_ITEM', data.LocationItemId, 'pharmacy');
        // if (isAddedToWishlist) wishlistAction('REMOVE_WISH_ITEM', data.LocationItemId, 'pharmacy');
	}
    
    const packSizeList = data.ItemPackSizeList?.map(i => <span className={i.CodeId === packSize().PackSizeId ? 'current' : ''} key={i.CodeId} onClick={() => handlePackSize(i)} role='button'>{i.Description}</span>);
    

    const handleAdd = () => {
        if (!counter || isNaN(counter) || counter < 1) return alert('Invalid Quantity.'); 
        addToCart(globalDataAction, globalData, isAdded, data, cartAction, packSize, () => {}, parseInt(counter));
    }

    const handleCounter = (e) => {
        let value = e.target.value;
        if (!value || isNaN(value)) return;
        setCounter(parseInt(value))
    }

    const cartItemsGSTValueList = (arr) => arr.map(i => {
        let taxbleAmt = num((i.count * i.PTR)- ((i.count * i.PTR) * (i.DiscountPer / 100 )));
        let cgst = num(taxbleAmt * (i.CGSTRATE / 100));
        let sgst = num(taxbleAmt * (i.SGSTRATE / 100));
        return num(sgst + cgst);
    }); 

    const DetailedView = () => {
        const totalMRP = (packSize().ItemMRP * counter).toFixed(2)
        const totalPTR = (packSize().PTR * counter).toFixed(2)
        // const totalMargin = (parseFloat(totalMRP) - parseFloat(totalPTR)).toFixed(2)
        const totalDiscount = ((packSize().PTR * counter) * (packSize().DiscountPer / 100 )).toFixed(2)

        let item = {...packSize(), CGSTRATE: data.CGSTRATE, SGSTRATE: data.SGSTRATE, count: counter}
        const gstList = cartItemsGSTValueList([item]);
        const itemGSTtotal = num(gstList.reduce((total, num) => total + num, 0));
        const orderTotal = num(totalPTR - totalDiscount + itemGSTtotal);
        
        return (
            <div className='detailed-view'>
                <hr className='my-3' style={{borderTop: '1px solid'}}/>

                <div className='d-flex'>
                    <div className='flex-grow-1'>
                        <h5>GST : {data.IGSTRATE}%</h5>
                    </div>
                    <div className='flex-grow-1 text-end'>
                        <h5>Discount : {packSize().DiscountPer}%</h5>
                    </div>
                </div>
                <div className='border d-flex justify-content-between align-items-center rounded mt-2' style={{background: '#f5f5f5', padding: '0.18em 0.5em 0.3em'}}>
                    <i className='bx bxs-cart-alt' style={{fontSize: '2.2em', color: '#d63384'}}></i>
                    <div className='text-end'>
                        <p className='mb-1 fw-medium'>Total MRP</p>
                        <h5 className='fw-bold mb-0'>{totalMRP}</h5>
                    </div>
                    {/* <Badge bg="success mx-5 fw-normal" style={{ fontSize: "0.8em", fontFamily: 'Jost' }}>Margin: ₹ {totalMargin}</Badge> */}
                    <div className='text-end'>
                        <p className='mb-1 fw-medium'>Total PTR</p>
                        <h5 className='fw-bold mb-0'>{totalPTR}</h5>
                    </div>

                    {/* <div className='text-center'>
                        <p className='mb-1 fw-medium'>Total Discount</p>
                        <h5 className='fw-bold'>₹ {totalDiscount}</h5>
                    </div> */}
                </div>
                <div className='d-flex flex-column mt-3'>
                    <div className='text-end'>
                        <h5><span className='text-dark'>Discount :</span>&nbsp;&nbsp;&nbsp; - {totalDiscount}</h5>
                    </div>
                    <div className='text-end'>
                        <h5><span className='text-dark'>GST :</span>&nbsp;&nbsp;&nbsp; + {itemGSTtotal}</h5>
                    </div>
                    <hr style={{borderTop: '1px solid', margin: '0.2em 0 0.6em'}}/>
                    <div className='text-end'>
                        <h5 className='mb-0'><span className='text-dark'>Order Total :</span>&nbsp;&nbsp;&nbsp;₹ {orderTotal}</h5>
                    </div>
                </div>
            </div>
        )
    }

    const pinCodeRef = useRef();
    const [pinCodeDropdown, setPinCodeDropdown] = useState(false);

    useEffect(() => {
    const onBodyClick = (event) => {     
        if (detailed) return;                                                                                           
        if (pinCodeRef.current && pinCodeRef.current.contains(event.target)) return;                                               
        setPinCodeDropdown(false);  
    }                                                                                                                  
    document.body.addEventListener('click', onBodyClick, { capture: true });                                             
        return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                           
    }, [])
    return (
        <div className={`card-1 rounded-0 flex-column flex-md-row align-items-stretch align-items-md-center ${className}`} style={{borderBottom: '1px solid #d1d1d1', maxWidth: '65rem', ...styles}}>
            {detailed || <div>
                <div className='position-relative'>
                    <img src={data.ItemImageURL ? data.ItemImageURL : getFallbackImg()} alt="Product" style={{height: '6em', width: '6em'}}/>
                    {compare && <i onClick={() => modalAction('COMPARE_PRODUCT_MODAL', true, {itemId: data.ItemId})} className={`${globalData.location.LocationId && isLoggedIn ? '' : 'd-none'} bx bx-transfer-alt position-absolute top-0 end-0 text-white rounded-circle pointer`} style={{fontSize: '1em', padding: '0.1em', background: '#2196F3'}}></i>}
                </div>
                <div onClick={() => setPinCodeDropdown(!pinCodeDropdown)} className='pointer'>
                    <h5>{data.Description}</h5> 
                    {packSizeList?.length ? <p className='packSize mt-3' style={{ margin: '0.8em 0 1em' }}>{packSizeList}</p> : ''}
                    <h6 className='text-normal' style={{fontSize: '0.75em'}}>{globalData.location.LocationName}</h6>
                    {globalData.location.LocationId && !packSize().StockQty ? <p className='stock-label mt-0'><i className='bx bxs-message-x text-danger'></i> Out of Stock</p> : ''}
                </div>
            </div>}
            {globalData.location.LocationId && isLoggedIn ? 
            <div className={detailed ? 'w-100' : `overlay ms-md-auto ${pinCodeDropdown ? 'detach' : '' }`}>
                <div className='d-flex flex-column gap-0 gap-md-1 w-100' ref={pinCodeRef} style={pinCodeDropdown ? popupViewStyles : {}}>
                    {pinCodeDropdown && 
                        <div className='d-flex gap-4 mb-2'>  
                            <img src={data.ItemImageURL ? data.ItemImageURL : getFallbackImg()} alt="Product" style={{height: '4.5em', width: '4.5em'}}/>
                            <div>
                                <h5>{data.Description}</h5>
                                {packSizeList?.length ? <p className='packSize' style={{marginBottom: '0.8em'}}>{packSizeList}</p> : ''}
                                <h6 className='text-normal' style={{fontSize: '0.75em', margin: '1em 0 0em'}}><i className="fas fa-map-marker me-1" style={{color: '#f7511d'}}></i> {data.LocationName}</h6>
                            </div>
                        </div>
                    }
                    {data.Category !== 24856 ? 
                        <div className='d-flex gap-2' style={{fontSize: '0.75em', whiteSpace: 'normal'}}>
                            <div className='d-flex flex-column flex-1'>
                                <div className='w-100'>
                                    <div className="cart-plus-minus w-100">
                                        <input onChange={handleCounter} className="cart-plus-minus-box" value={counter} type="text" />
                                        <div className="dec qtybutton" onClick={() => { if (counter !== 1) setCounter(counter - 1) }}><i className="fa fa-angle-down"></i></div>
                                        <div className="inc qtybutton" onClick={() => setCounter(counter + 1)}><i className="fa fa-angle-up"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <AddToCartBtn classes="btn btn-primary w-100 hover-shine position-relative overflow-hidden" styles={{ padding: '0.72em 1.1em', fontSize: '1.11em' }} useAuth={true} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} inCart={existInCart} isAdded={isAdded} />
                            </div>
                        </div>  
                    :
                        <button onClick={() => noticeToast({title: 'Over Counter Sales only..', msg: 'As Government Norms this Product is not to be sold Online - Contact with Service Provider for buying this product.'}, { position: "top-center", autoClose: 5000 })} type="button" className="btn btn-primary">For sale over counter only</button>
                    }
                    <div className='d-flex justify-content-between' style={{margin: '0.2em 0 0'}}>
                        <p><span style={{ color: "#0d6efd" }}>Stock {packSize().StockQty}</span> | Min Qty 1 </p>
                        <p style={{ color: "gray" }}>No schemes</p>
                    </div>
                    <p className='text-normal'>
                        <span style={{ color: "#0d6efd" }}>PTR ₹ {packSize().PTR}</span> | MRP: ₹ {packSize().ItemMRP} | <span style={{ color: "green" }}>{packSize().DiscountPer}% off</span>
                    </p>
                    {pinCodeDropdown && <DetailedView />}
                </div>
            </div> : ''}
        </div>
    )
}

const mapStateToProps2 = (state) => {
    return { globalData: state.globalData, vType: state.vType, cart: state.cart, isLoggedIn: state.isLoggedIn };
}
  
export const ConnectedProductCard3 = connect(mapStateToProps2, { cartAction, wishlistAction, globalDataAction, modalAction })(ProductCard3);


export const OrderCard3 = ({ data, className, styles }) => {

    return (
         <div className={`card-1 order-card-1 justify-content-start gap-4 ${className}`} styles={{...styles}}>
            <img src={data.ItemImageURL || getFallbackImg()} style={{height: '5.6em', width: '5.6em'}} alt="headphone" />
            <Link to={`#`}>
                <h5 className='mb-3'>{data.Description}</h5>
                <p className="packSize"><span className="" role="button">{data.PackSizeId ? data.PackSizeDesc : 'No pack size'}</span></p>
                <div className='d-flex flex-lg-row justify-content-between gap-4 ga-sm-5 mt-4' style={{fontSize: '1.05em'}}>
                    <div className='d-flex flex-column gap-1'>
                        <h6>MRP: &nbsp;{(data.ItemMRP).toFixed(2)}</h6>
                        <h6>PTR: &nbsp;{(data.Rate)}</h6>
                        <h6>QTY: &nbsp; {data.BillQty}</h6>
                    </div>  

                    <div className='d-flex flex-column gap-1'>
                        <h6>Discount: &nbsp;-{(data.DiscountText).toFixed(2)}</h6>
                        <h6>GST: &nbsp;+{data.CGST + data.SGST}</h6>
                        <h6 style={{color: '#2563eb'}}>Total: &nbsp;₹ {(data.Amount).toFixed(2)}</h6>
                    </div>
                </div>
            </Link>
        </div>
    )
}


export const CompareProducts = ({ handleClose, compCode, itemId }) => {

    const [distributers, setDistributers] = useState({loading: true, data: {itemMasterCollection: []}, err: {status: false, msg: ''}});
    const businessTypeId = useSelector(i => i.globalData.businessType).CodeId;

    // let items = [
    //     {
    //         "PTR": 89.3,
    //         "AutoId": 0,
    //         "Category": 23500,
    //         "CategoryName": "Eye Drop & LiqGel",
    //         "CompanyId": 752,
    //         "Description": "OsmoTear Eye Drop 10 ml",
    //         "Discount": 18,
    //         "DiscountPer": 0,
    //         "ItemId": 565380,
    //         "ItemMRP": 125,
    //         "PackSizeId": 0,
    //         "ItemPackSizeList": [
    //             {
    //                 "CodeId": 9257,
    //                 "Description": "10 ml",
    //                 "SRate": 102.5,
    //                 "MRP": 125,
    //                 "MRPDisPer": 18,
    //                 "PTR": 89.3,
    //                 "StockQty": 9,
    //             }
    //         ],
    //         "SRate": 125,
    //         "StockQty": 9,
    //         "GroupName": "Eye Drop & LiqGel",
    //         "Parent": 500288,
    //         "ParentDesc": "Med-MTI",
    //         "Technicalname": "Sodium Carboxymethylcellulose IP 0.5% w/v+Stabilized Oxychloro Complex 0.005% w/v",
    //         "sv_CostId": 23500,
    //         "itemmstr": "Stock",
    //         "LocationId": 0,
    //         "ManufacturBY": "White & Trust Pharmaceuticals (India) Pvt. Ltd.",
    //         "Unit": 0,
    //         "UnitName": "",
    //         "IsVisible": "Y",
    //         "ItemCode": "Med2014",
    //         "ItemImageURL": "https://admin.takehome.live/Content/ImageMaster/565380_1.jpg",
    //         "CGST": 0,
    //         "SGST": 0,
    //         "IGST": 0,
    //         "CGSTRATE": 6,
    //         "SGSTRATE": 6,
    //         "IGSTRATE": 12,
    //         "Specification": "",
    //         "LocationName": "Healthbuddy Kalyani Pharmacy"
    //     },
    //     {
    //         "PTR": 88.5,
    //         "AutoId": 0,
    //         "Category": 23500,
    //         "CategoryName": "Eye Drop & LiqGel",
    //         "CompanyId": 752,
    //         "Description": "OsmoTear Eye Drop 10 ml",
    //         "Discount": 15,
    //         "DiscountPer": 0,
    //         "ItemId": 56538230,
    //         "ItemMRP": 135,
    //         "PackSizeId": 0,
    //         "ItemPackSizeList": [
    //             {
    //                 "CodeId": 9257,
    //                 "Description": "10 ml",
    //                 "SRate": 102.5,
    //                 "MRP": 130,
    //                 "MRPDisPer": 15,
    //                 "PTR": 82.8,
    //                 "StockQty": 46,
    //             }
    //         ],
    //         "SRate": 125,
    //         "StockQty": 9,
    //         "GroupName": "Eye Drop & LiqGel",
    //         "Parent": 500288,
    //         "ParentDesc": "Med-MTI",
    //         "Technicalname": "Sodium Carboxymethylcellulose IP 0.5% w/v+Stabilized Oxychloro Complex 0.005% w/v",
    //         "sv_CostId": 23500,
    //         "itemmstr": "Stock",
    //         "LocationId": 0,
    //         "ManufacturBY": "White & Trust Pharmaceuticals (India) Pvt. Ltd.",
    //         "Unit": 0,
    //         "UnitName": "",
    //         "IsVisible": "Y",
    //         "ItemCode": "Med2014",
    //         "ItemImageURL": "https://admin.takehome.live/Content/ImageMaster/565380_1.jpg",
    //         "CGST": 0,
    //         "SGST": 0,
    //         "IGST": 0,
    //         "CGSTRATE": 6,
    //         "SGSTRATE": 6,
    //         "IGSTRATE": 12,
    //         "Specification": "",
    //         "LocationName": "Aarush Tirupati Enterprise"
    //     },
    // ]    

    useEffect(() => {
        const getServiceLocations = async (compId, itemId, bTypeId) => {
            if (!compId || !itemId || !bTypeId) return;
            const res = await getFrom(`${BASE_URL}/api/Item/GetItemsFromOtherLocation/?CID=${compId}&ItemId=${itemId}&BusinessTypeId=${bTypeId}`, {}, setDistributers);            // using useCallback to avoid esling warning about useEffect dependencies.
            if (res) {              
                // setDistributers(res);  
                const products = getRequiredFieldsOnly(res.data.itemMasterCollection);
                setDistributers(({ ...res, data: {itemMasterCollection: products}}));    
            }
        }
        getServiceLocations(compCode, itemId, businessTypeId);
        // setTimeout(() => {
        //     setDistributers({loading: false, data: {products: items}, err: {status: false, msg: ''}});       
        // }, 1000);
    }, [compCode, itemId, businessTypeId])

    const renderDistributers = (data) => {
        if (data.loading) {
            return <Spinner min_height='19rem' fSize='1.5rem'/>;
        } else if (data.err.status) {
            return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
        } else if (data.data.itemMasterCollection.length === 0) {
            return <h4 className='text-danger mb-0 mt-2 !p-4'>This feature will be available very soon</h4>;
        } else {
            return <AutoComplete customClass='position-relative compare-autoComplete' list={distributers.data.itemMasterCollection} children={<ConnectedProductCard3 detailed={true} compare={false} />} keyName={'LocationItemId'} itemName='Distributers for the selected Product.' closeIcon={false}/>
            // return (
            //     <div>
            //         {data.data.products.map(i => )}
            //         <div className='d-flex flex-column gap-0 gap-md-1 w-100'>
            //             <h5>{data.Description}</h5>
            //             {packSizeList?.length ? <p className='packSize' style={{marginBottom: '0.8em'}}>{packSizeList}</p> : ''}
            //             {data.Category !== 24856 ? 
            //                 <div className='d-flex gap-2' style={{fontSize: '0.75em', whiteSpace: 'normal'}}>
            //                     <div className='d-flex flex-column flex-1'>
            //                         <div className='w-100'>
            //                             <div className="cart-plus-minus w-100">
            //                                 <input onChange={handleCounter} className="cart-plus-minus-box" value={counter} type="text" />
            //                                 <div className="dec qtybutton" onClick={() => { if (counter !== 1) setCounter(counter - 1) }}><i className="fa fa-angle-down"></i></div>
            //                                 <div className="inc qtybutton" onClick={() => setCounter(counter + 1)}><i className="fa fa-angle-up"></i></div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                     <div className='flex-1'>
            //                         <AddToCartBtn classes="btn btn-primary w-100" styles={{ padding: '0.72em 1.1em', fontSize: '1.11em' }} useAuth={true} locationId={globalData.location.LocationId} qty={packSize().StockQty} addCart={handleAdd} inCart={existInCart} isAdded={isAdded} />
            //                     </div>
            //                 </div>  
            //             :
            //                 <button onClick={() => noticeToast({title: 'Over Counter Sales only..', msg: 'As Government Norms this Product is not to be sold Online - Contact with Service Provider for buying this product.'}, { position: "top-center", autoClose: 5000 })} type="button" className="btn btn-primary">For sale over counter only</button>
            //             }
            //             <div className='d-flex justify-content-between' style={{margin: '0.2em 0 0'}}>
            //                 <p><span style={{ color: "#0d6efd" }}>Stock {packSize().StockQty}</span> | Min Qty 1 </p>
            //                 <p style={{ color: "gray" }}>No schemes</p>
            //             </div>
            //             <p className='text-normal'>
            //                 <span style={{ color: "#0d6efd" }}>PTR ₹ {packSize().PTR}</span> | MRP: ₹ {packSize().ItemMRP} | <span style={{ color: "green" }}>{packSize().DiscountPer}% off</span>
            //             </p>
            //             {pinCodeDropdown && <DetailedView />}
            //         </div>
            //     </div>
            // )
        }
    }  

    return (
        <div>
            <style>{`
                .compare-autoComplete ul {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1em;
                    // display: grid;
                    // grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                }
                .compare-autoComplete ul li {
                    width: 100%;
                    max-width: 325px;
                }
                .autoComplete-list {
                    max-height: unset;
                }
                @media only screen and (max-width: 768px) {
                    .compare-autoComplete ul {
                        flex-direction: column;
                    }
                    .compare-autoComplete ul li {
                        max-width: unset;
                    }
                }
            `}</style>
            <div className='card'>
                <h5 className="card-header d-flex justify-content-between mb-0" style={{padding: '0.7em 1em'}}>Compare Products <i className='bx bx-x-circle' onClick={() => handleClose('COMPARE_PRODUCT_MODAL', false)} role='button' style={{fontSize: '1.2em'}}></i></h5>
                <div className='card-body p-0'>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="position-relative">
                                {renderDistributers(distributers)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}