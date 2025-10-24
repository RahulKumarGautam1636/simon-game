import { combineReducers  } from 'redux';
import _ from 'lodash';
import qs from 'query-string';
import { initAppState } from './appState'
import { BCROY_ID, TAKEHOME_AGRO } from '../constants';

const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true, decode: false });
let LID = queryString.LID ? queryString.LID : 0;
let compCode = queryString.CID ? queryString.CID : 
process.env.
// REACT_APP_DEFAULT_COMPCODE
REACT_APP_TAKE_HOME_COMPCODE 
// BCROY_ID 
// REACT_APP_TAKEHOME_AGRO 
// REACT_APP_TAKE_HOME_COMPCODE 
// REACT_APP_BSN_COMPCODE 
// REACT_APP_SC_BAGCHI 
// TAKEHOME_GARMENTS 
// REACT_APP_BCF_COMPCODE 
// REACT_APP_AM_NURSING_HOME_COMPCODE  
// TAKEHOME_GARMENTS 
// TAKEHOME_AGRO 
// REACT_APP_CITIZEN_COMPCODE  
// REACT_APP_RAJE_RESTAURANT_COMPCODE  
// REACT_APP_BNH_COMPCODE 
// REACT_APP_MEDICO_HEALTH_COMPCODE  
// REACT_APP_E_PHARMA_COMPCODE     

// take note to differentiate the data that needs to reset on logout before implementing it in redux.

const compCodeReducer = (state = compCode, action) => {             // REACT_APP_MEDICO_HEALTH_COMPCODE // REACT_APP_CITIZEN_COMPCODE
  if (action.type === 'PARTY_CODE') {
    return action.value;
  }
  return state;
}

const vTypeReducer = (state='', action) => {
  if (action.type === 'VERTICAL_TYPE') {
    return action.value;
  }
  return state;
}

const { isLoggedIn, userInfo, isMobile, isToastActive, isLoading, cart, wishlist, siteData, modals, bookingInfo, isHeaderActive, breadCrumbData, quickviewItem, filterData } = initAppState;

const loginStatusReducer = (state=isLoggedIn, action) => {                  
  if (action.type === 'LOGIN') {
    return action.value;
  }
  return state;
}

const loaderReducer = (state=isLoading, action) => {                        
  if (action.type === 'LOADING') {
    return action.value;
  }
  return state;
}
                                                                        // primitive types are not passed as reference hence we can simply use it as params without worries of mutating the original appState object.
const userInfoReducer = (state={...userInfo}, action) => {              // taking object params as value otherwise it can mutate the original userInfo field in the appState object.          
  if (action.type === 'USER_INFO') {                                    // *** OldState === newState turns out to be true which causes components to not rerender on change of deep nested properties 
    let newState = Object.assign(state, action.payload);                // or on change of properties that are without any key on them (eg. list of objects without keys).
    return {...newState};                                               // {...newState} or _.deepClone(newState) will clone the given object/state and reproduce a new object/state where           
  } else if (action.type === 'RESET_USER') {  // NOT USED               // oldState !== {...newState} or _.deepClone(newState) which forces every connected component to re-render with new state.
    return { ...userInfo, ...state.selectedCompany, ...state.companyList };   // reset everything except these fields.
  }                                                                            
  return state; 
  
}

const init_compInfo = {COMPNAME: '', EncCompanyId: compCode, LogoUrl: ''}; 
const companyInfoReducer = (state={...init_compInfo}, action) => {              
  if (action.type === 'COMPANY_INFO') {
    return action.payload;
  }
  return state;
}

const bookingDataReducer = (state={...bookingInfo}, action) => {
  if (action.type === 'BOOKING_DATA') {                                 // *** OldState === newState turns out to be true which causes components to not rerender on change of deep nested properties    
    let newState = Object.assign(state, action.payload);                // or on change of properties that are without any key on them (eg. list of objects without keys).
    return {...newState};                                               // {...newState} or _.deepClone(newState) will clone the given object/state and reproduce a new object/state where           
  }                                                                     // oldState !== {...newState} or _.deepClone(newState) which forces every connected component to re-render with new state.          
  return state;  
}

const siteDataReducer = (state=siteData, action) => {
  if (action.type === 'SITE_DATA') {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
}

const cartReducer = (state={...cart}, action) => {                        
  let { type, payload, productType } = action;  
  if (type==='ADD_ITEM') {
    return {...state, [productType]: {...state[productType], [payload.LocationItemId]: payload }};
  } else if (type==='REMOVE_ITEM') {
    return {...state, [productType]: _.omit(state[productType], payload) };                                                        
  } else if (type==='DUMP_CART') {
    return {...state, [productType]: {}};
  } else if (type==='EMPTY_CART') {
    return { pharmacy: {}, labTests: {} };
  }
  return state;
}

const wishlistReducer = (state={...wishlist}, action) => {                           
  let { type, payload, productType } = action;
  if (type==='ADD_WISH_ITEM') {
    return {...state, [productType]: {...state[productType], [payload.LocationItemId]: payload }};
  } else if (type==='REMOVE_WISH_ITEM') {
    return {...state, [productType]: _.omit(state[productType], payload) };                         
  } else if (type==='DUMP_WISHLIST') {
    return {...state, [type]: {}};
  } else if (type==='EMPTY_WISHLIST') {
    return { pharmacy: {}, labTests: {} };
  }
  return state;
}

const toastReducer = (state=isToastActive, action) => {     
  if (action.type === 'SHOW_TOAST') {
    return action.payload;
  }
  return state;
}

const modalReducer = (state={...modals}, action) => {  
  if (action.type === 'MODAL') {
    return {...state, [action.payload.name]: {state: action.payload.status, data: action.payload.data}};
  }    
  return state;  
}

const IsMobileReducer = (state=isMobile, action) => {                 
  if (action.type === 'IS_MOBILE') {
    return action.value;
  }
  return state;
}

const isHeaderActiveReducer = (state=isHeaderActive, action) => {                       // To imitate pages without header/footer.
  if (action.type === 'HEADER_ACTIVE') {
    return action.value;
  }
  return state;
}

const getUserLocation = () => {
  if (LID) return { LocationId: LID };
  // const userLocation = JSON.parse(localStorage.getItem(`userLocation_${compCode}`));              
  // if (userLocation && userLocation.LocationId) {
  //   return userLocation;
  // } else {
    return { required: true, LocationId: 0 };
  // }
}

const globalData = {
  focusArea: '0',
  location: getUserLocation(),
  scrollPos: { home: '', filterPage: '' },
  prescription: { required: true, patient: { docName: '', docAddress: '' } },
  restaurant: { table: {  } },
  businessType: { Description: '', CodeValue: '', CodeId: '' },
  userRegType:
                { CodeId: 43198, Description: 'Customer', CodeValue: 'Customer', for: 'B2C / Patient' }
                // { CodeId: 43194, Description: 'Retailer', CodeValue: 'Retailer', for: 'B2B / Retailer' }
                // { CodeId: 43195, Description: 'Strategic Partner', CodeValue: 'SP', for: 'Doctor' }
                // { CodeId: 43196, Description: 'Master Partner', CodeValue: 'MP', for: 'Referrer' }
                // { CodeId: 43197, Description: 'Associate Partner', CodeValue: 'AP', for: 'Provider' }
                // { CodeId: 43352, Description: 'Market By', CodeValue: 'MarketBy', for: 'Marketing Executive' }
};
const globalDataReducer = (state={...globalData}, action) => {  
  if (action.type === 'OTHER_DATA') {
    let payload = action.payload;
    if (Object.keys(payload).includes('location')) {
      if (payload.location.required === undefined) payload.location.required = true
    }          
    let newState = Object.assign(state, payload);                
    return {...newState};                                               
  }                                                                    
  return state;                                                                                                                                                                  
}


// TAKEHOME -------------------------------------------------------------------------------------

const filterReducer = (state={...filterData}, action) => {             // Added only to pass categories in select element used in header search input.
  if (action.type === 'FILTER') {
    return {...state, [action.payload.name]: action.payload.value};
  }
  return state;
}

const breadCrumbReducer = (state=breadCrumbData, action) => {
  if (action.type === 'BREADCRUMB_DATA') {
    return action.payload;
  }
  return state;
}

const quickviewItemReducer = (state=quickviewItem, action) => {      
  if (action.type === 'QUICKVIEW_ITEM') {
    return action.payload;
  }
  return state;
}

// const logoutReducer = (state, action) => {      
//   if (action.type === 'LOGOUT') {
//     return { ...state, logoutObject };
//   }
//   return state;
// }


export default combineReducers({
  compCode: compCodeReducer,
  isLoggedIn: loginStatusReducer,
  userInfo: userInfoReducer,
  isMobile: IsMobileReducer,
  compInfo: companyInfoReducer,
  isToastActive: toastReducer,
  isLoading: loaderReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  siteData: siteDataReducer,
  modals: modalReducer,
  bookingInfo: bookingDataReducer,
  isHeaderActive: isHeaderActiveReducer,
  globalData: globalDataReducer,
  vType: vTypeReducer,

  breadCrumbData: breadCrumbReducer,            // TAKEHOME
  quickviewItem: quickviewItemReducer,
  filterData: filterReducer,
})


// export function combineReducersWithRoot(rootReducer, reducers) {
//   return (state, action) => {
//     let newState = {...rootReducer(state, action)};          // Ensure the root state object is a new object; otherwise React may not re-render.
//     Object.keys(reducers).forEach(domain => {
//       let obj = state ? state[domain] : undefined;
//       newState[domain] = reducers[domain](obj, action);
//     });
//     return newState;
//   };
// }


// function rootReducer(state = {loading: false, loaded: false}, action) {
//   switch(action.type) {
//     case STARTED_LOADING:
//       return {...state, loading: true, loaded: false};
//     case FINISHED_LOADING:
//       return {...state, loading: false, loaded: true};
//     default:
//       return state;
//   }
// }

// function dataReducer(state = {filter: '', arr: []}, action) {
//   switch (action.type) {
//     case SET_FILTER:
//       return {...state, filter: action.value};
//     case SET_DATA:
//       return {...state, arr: action.arr};
//     default:
//       return state;
//   }
// }

// export default combineReducersWithRoot(rootReducer, {data: dataReducer});
