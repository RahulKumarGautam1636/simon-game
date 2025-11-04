import { useEffect, useState } from "react";
import { AutoComplete, Spinner, getFrom, handleNumberInputs } from "../utilities";
import { modalAction, loaderAction, userInfoAction, globalDataAction, cartAction, wishlistAction } from "../../../../actions";
import { connect } from "react-redux";
import { getConfirmation, getTotalCartItems } from "../../default/utilities";
import { BASE_URL } from "../../../../constants";

function LocationModal({ compCode, userInfo, modalAction, modals, globalDataAction, globalData, cart, cartAction, wishlistAction }) {

    // const [location, setLocation] = useState({ Pin: '' });
    // const [listActive, setListActive] = useState(true);
    const [locationList, setLocationList] = useState({loading: true, data: {LocationMasterList: []}, err: {status: false, msg: ''}});
    const area = modals.LOCATION_MODAL.data;
    const businessTypeId = globalData.businessType?.CodeId;
    // const handleAddressFormSubmit = (e) => {
    //     e.preventDefault();
    //     if (!orderData.LocationId) return alert('Please select a Location to proceed with the order.');
    //     closeModal();
    // }
    
    const handleSelect = (i) => {
        // if (i.LocationId === globalData.location.LocationId) return alert('This is Location is already selected. Select a different Location.');
        let cartItems = getTotalCartItems(cart);
        if (cartItems) {
            if (getConfirmation(`Changing Location will remove the Products in your cart and wishlist.`) === false) return; 
        }
        cartAction('EMPTY_CART', {}, '');
        wishlistAction('EMPTY_WISHLIST', {}, '');
        let item = { Address: i.Address, StateDesc: i.StateDesc, StateCode: i.StateCode, PIN: i.PIN, Area: i.Area, LocationId: i.LocationId, LocationName: i.LocationName };
        globalDataAction({ location: item });
        modalAction('LOCATION_MODAL', false);
        // localStorage.setItem(`userLocation_${compCode}`, JSON.stringify(item));
    }
    
    // useEffect(() => {
    //     if (location.Pin.length < 6) return; 
    //     const getServiceLocations = async () => {
    //         // const res = await getFrom(`${BASE_URL}/api/Location/Get?CID=${compCode}&PinCode=${location.Pin}`, {}, setLocationList);            // using useCallback to avoid esling warning about useEffect dependencies.
    //         if (res) {              // ${BASE_URL}/api/Location/Get?CID=yFObpUjTIGhK9%2B4bFmadRg==&Area=Naihati&SearchStr=
    //             setLocationList(res);   
    //         }
    //     }
    //     getServiceLocations();
    // }, [location.Pin])

    useEffect(() => {
        const getServiceLocations = async () => {                                                         // &BusinessTypeId=${businessTypeId}
            const res = await getFrom(`${BASE_URL}/api/Location/Get?CID=${compCode}&Area=${area}&SearchStr=`, {}, setLocationList);            // using useCallback to avoid esling warning about useEffect dependencies.
            if (res) {              
                setLocationList(res);   
            }
        }
        getServiceLocations();
    }, [])

    // useEffect(() => {
    //     setLocation({ Pin: userInfo.Pin })
    // }, [])

    // useEffect(() => {

    //     const checkDeliverable = async () => {
    //       if (location.Pin.length < 6) return;
    //       try {
    //           loaderAction(true);
    //           const res = await axios.get(`${BASE_URL}/api/Location/Get?CID=${compCode}&PinCode=${location.Pin}`);
    //           loaderAction(false);
    //           if (res.data.LocationMasterList.length) {
    //             setDeliverable(true);
    //           } else {
    //             setDeliverable(false);
    //           }
    //       } catch (err) {
    //           alert(err)
    //       }
    //     }
      
    //     checkDeliverable();
    // }, [location.Pin])

    // let activeState = statesList.filter(i => i.CodeId === location.State)[0]?.Description;

    // const PinCodeCard = ({ data, handleActive }) => <div onClick={() => {setOrderData(pre => ({...pre, LocationId: data.LocationId}));handleActive(false)}}>{data.LocationName}</div>

    const renderLocationList = (data) => {
        if (data.loading) {
          return <Spinner min_height='19rem' fSize='1.5rem'/>;
        } else if (data.err.status) {
          return <div className='text-center my-5'><h2 className="text-danger mark">An error occured, please try again later. Error code: <span className='text-dark'>{data.err.msg}</span></h2></div>;
        } else if (data.data.LocationMasterList.length === 0) {
          return <p className='text-danger mb-0 mt-2'>Now we have no service in this PIN - We will be available in your area very soon.</p>;
        } else {
          return <AutoComplete name='location-list' customClass='location-list' list={locationList.data.LocationMasterList} children={<LocationCard handleSelect={handleSelect} selectedLocation={globalData.location.LocationId} />} keyName={'LocationId'} itemName='Location(s) in the selected area.' closeIcon={false}/>
        }
    }    

    return (
        <form>
            <div className='card mb-0'>
                <h5 className="card-header d-flex justify-content-between mb-0" style={{padding: '0.7em 1em'}}>Locations in {area} area <i className='bx bx-x-circle' onClick={() => modalAction('LOCATION_MODAL', false)} role='button' style={{fontSize: '1.2em'}}></i></h5>
                <div className='card-body p-0'>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="checkout-form-list position-relative">
                                {/* <label>Pincode / Zip <span className="required">*</span></label>
                                <input readOnly type="text" name='Pin' value={location.Pin} onChange={(e) => {handleNumberInputs(e, setLocation);}} autoComplete='off' maxLength='6'/> */}
                                {renderLocationList(locationList)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

const mapStateToCheckout = (state) => {
    return { compCode: state.compCode, userInfo: state.userInfo, modals: state.modals, globalData: state.globalData, cart: state.cart };
}
  
export default connect(mapStateToCheckout, {userInfoAction, loaderAction, modalAction, globalDataAction, cartAction, wishlistAction})(LocationModal);


export const LocationCard = ({ data, handleSelect, selectedLocation }) => {
    return (
        <div className="card-1 location-card">
            <div style={{display: 'flex', gap: '0.5em'}}>
                <i className='bx bxs-shopping-bag' style={{fontSize: '3.5em', color: 'var(--clr-1)'}}></i>
                <div>
                    <h5 style={{color: 'var(--clr-1)'}}>{data.LocationName}</h5>
                    <h6>{data.Address}</h6>
                    <p>{data.PIN}</p>
                </div>
            </div>
            {data.LocationStatus === 1 ? 
            <button className={`controlled-btn ms-auto ${data.LocationId === selectedLocation ? 'opacity-75 pe-none' : ''}`} type="button" onClick={() => handleSelect(data)}>{data.LocationId === selectedLocation ? '✔ SELECTED' : 'SELECT'}</button> : 
            <span className="controlled-btn ms-auto text-muted" style={{background: '#e7e7e7', cursor: 'no-drop'}}>OPENING SOON</span>}
        </div>
    )
}
