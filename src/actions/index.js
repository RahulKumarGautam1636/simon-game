export const compCodeAction = (code) => {
  return {
    type: "PARTY_CODE",
    value: code
  }
}

export const compInfoAction = (item) => {
  return {
    type: 'COMPANY_INFO',
    payload: item
  }
}

export const vTypeAction = (type) => {
  return {
    type: "VERTICAL_TYPE",
    value: type
  }
}

export const modalAction = (modalName, status, modalData='') => {
  return {
    type: 'MODAL',
    payload: { name: modalName, status: status, data: modalData }
  }
}

export const loginStatusAction = (status) => {
  return {
    type: "LOGIN",
    value: status
  }
}

export const bookingModalAction = (modalStatus) => {
  return {
    type: "BOOKING_MODAL",
    value: modalStatus
  }
}

export const loaderAction = (status) => {
  return {
    type: 'LOADING',
    value: status
  }
}

export const userInfoAction = (item) => {
  return {
    type: 'USER_INFO',
    payload: item
  }
}

export const resetUserAction = () => {
  return { type: 'RESET_USER' }
}

export const bookingInfoAction = (item) => {
  return {
    type: 'BOOKING_DATA',
    payload: item
  }
}

export const siteDataAction = (data) => {
  return {
    type: 'SITE_DATA',
    payload: data
  }
}

export const cartAction = (task, item, productType) => {
  return {
    type: task,
    payload: item,
    productType: productType
  }
}

export const wishlistAction = (task, item, productType) => {
  return {
    type: task,
    payload: item,
    productType: productType
  }
}

export const toastAction = (status, item) => {
  return {
    type: 'SHOW_TOAST',
    payload: { status: status, item: item }
  }
}

export const schedulerAction = (item) => {
  return {
    type: 'SCHEDULE_DATA',
    payload: item
  }
}

export const isMobileAction = (status) => {
  return {
    type: 'IS_MOBILE',
    value: status
  }
}

export const headerAction = (status) => {
  return {
    type: 'HEADER_ACTIVE',
    value: status
  }
}

export const globalDataAction = (item={}) => {
  return {
    type: 'OTHER_DATA',
    payload: item
  }
}


// TAKEHOME ----------------------------------------------------------------------------------------------------

export const quickviewItemAction = (item) => {      //
  return {
    type: 'QUICKVIEW_ITEM',
    payload: item
  }
}

export const addToCartAction = (item) => {      
  return {
    type: 'ADD_CART_ITEM',
    payload: item
  }
}

export const removeFromCartAction = (id) => {     //
  return {
    type: 'REMOVE_CART_ITEM',
    payload: id
  }
}

export const myOrdersAction = (task, item) => {     //
  return {
    type: task,
    payload: item
  }
}

export const addToWishlistAction = (item) => {    //
  return {
    type: 'ADD_WISHLIST_ITEM',
    payload: item
  }
}

export const removeFromWishlistAction = (id) => {     //
  return {
    type: 'REMOVE_WISHLIST_ITEM',
    payload: id
  }
}

export const dumpCartAction = () => {         //
  return {
    type: 'DUMP_CART',
  }
}

// export const siteDataAction = (task, item) => {     //
//   return {
//     type: task,
//     payload: item
//   }
// }

export const dumpWishlistAction = (id) => {         //
  return {
    type: 'DUMP_WISHLIST',
    payload: id
  }
}

export const dumpPharmacyCartAction = () => {       //
  return {
    type: 'DUMP_ALL_PHARMACY_CART_ITEMS',
  }
}

// export const toastAction = (status, item, msg) => {     //
//   return {
//     type: 'SHOW_TOAST',
//     payload: {
//       status: status,
//       item: item,
//       msg: msg
//     }
//   }
// }

export const filterAction = (name, item) => {     //
  return {
    type: 'FILTER',
    payload: { name: name, value: item }
  }
}

export const breadCrumbAction = (item) => {
  return {
    type: 'BREADCRUMB_DATA',
    payload: item
  }
}