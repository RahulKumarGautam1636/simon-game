export const defaultId = process.env.REACT_APP_DEFAULT_COMPCODE;
export const zero = process.env.REACT_APP_ZERO_COMPCODE;                // encoded string version of 0.
// export const defaultId = 'UOWERJLJFOAISJ';
export const ePharmaId = process.env.REACT_APP_E_PHARMA_COMPCODE;
export const amNursingId = process.env.REACT_APP_AM_NURSING_HOME_COMPCODE;
export const blessId = process.env.REACT_APP_BLESS_HOSPITAL_COMPCODE;
export const sumaangId = process.env.REACT_APP_SUMAANG_COMPCODE;
export const bhsId = 'process.env.REACT_APP_DEFAULT_COMPCODE';
export const BSN_ID = process.env.REACT_APP_BSN_COMPCODE;
export const ASTHA_ID = process.env.REACT_APP_ASTHA_SEVA_SADAN_COMPCODE;                                       
export const TAKE_HOME_ID = process.env.REACT_APP_TAKE_HOME_COMPCODE;    
export const XYZ_ID = process.env.REACT_APP_XYZ_COMPCODE; 
export const HAYATT_ID = process.env.REACT_APP_HAYATT_COMPCODE;    
export const MEDICO_HEALTH_ID = process.env.REACT_APP_MEDICO_HEALTH_COMPCODE;    
export const RAJE_RESTAURANT_ID = process.env.REACT_APP_RAJE_RESTAURANT_COMPCODE;    
export const BNH_ID = process.env.REACT_APP_BNH_COMPCODE;    
export const ATINDRA_ID = process.env.REACT_APP_ATINDRA_COMPCODE;    
export const CITIZEN_ID = process.env.REACT_APP_CITIZEN_COMPCODE;    
export const ROYAL_INN_ID = process.env.REACT_APP_ROYAAL_INN_COMPCODE;    

export const PARK_HOTEL = process.env.REACT_APP_PARK_HOTEL;                 // TEST RESTAURANT COMPANY.
export const PILLS_CURES = process.env.REACT_APP_PILLS_CURES;
export const TAKEHOME_AGRO = process.env.REACT_APP_TAKEHOME_AGRO;
export const TAKEHOME_GARMENTS = process.env.REACT_APP_TAKEHOME_GARMENTS;
export const TAKEHOME_ELECTRONICS = process.env.REACT_APP_TAKEHOME_ELECTRONICS; 
export const TAKEHOME_SURGICAL = 'aS8HN5gcPcKUC8hc/JCvBA=='; 
export const HEXAGON_ID = process.env.REACT_APP_HEXAGON_COMPCODE;
export const BCROY_ID = 'ji4C/%2BQbn%2BBofLeoFG9clw==';
export const RCC_ID = 'WUnfjiDjOBWdyQyZ9zb02w==';


export const SC_BAGCHI = process.env.SC_BAGCHI; 

export const initSiteData = {isLoading: true, catLoading: true, productLoading: true, itemMasterCollection: [], ItemBrandList: [], LinkCategoryList: [], LinkSubCategoryList: []};

export const currentVersion = 'UNSSEEESSSS';

export const testMode = false;

export const rent = false; 

export const agro = false;

export const takehomeMain = false;

export const memberLabel = 'Member';

// Job / Manpower website template - https://www.spruko.com/demo/rejoin/Rejoin/html/index.html

export const BASE_URL = testMode ? process.env.REACT_APP_TEST_BASE_URL : process.env.REACT_APP_BASE_URL
export const SRC_URL = 'https://erp.gsterpsoft.com';

// export const BASE_URL = process.env.REACT_APP_GSTERPSOFT_URL;
// export const SRC_URL = 'https://gsterpsoft.com';

export const existingLogos = ['598','608','612','635','636','637','639','620', '659', '680', '796'];
                          
export const initReg = {  
  Name: '',        
  EncCompanyId: '',
  PartyCode: 0,
  PartyId: 0,
  UserId: 0,
  RegMob1: '',
  Email: '', 
  Address: '',
  UserPassword: '',
  UserType: '',
  Address2: '',
  City: '',
  State: 3,
  StateName: 'West Bengal',
  Pin: '',        
  DOB: '',
  DOBstr: '',
  Age: '',
  AgeMonth: '',
  AgeDay: '',
  IsDOBCalculated: 'N',
  GenderDesc: 'Male',
  Gender: 104,
  Country: 1,
  MemberId: '',

  Aadhaar: "",
  Salutation: "",
  Qualification: "",
  SpecialistId: 0,
  AnniversaryDate: "",
  AnniversaryDatestr: "",
  compName: "",
  compAddress: "",
  compState: "",
  compPin: "",
  compPhone1: "",
  compPhone2: "",
  compMail: "",

  BusinessType: '',
  ContactPerson: '',  // for Business type.
  RegMob2: '',               
  GstIn: '',
  LicenceNo: '',
  DL_Number2: '',
  TradeLicense: '',

  UserRegTypeId: '',
  UserLevelSeq: ''
}

export const initMember = {
  Salutation: '',
  MemberName : '',
  EncCompanyId: '',    
  RegMob1: '',
  Gender: '',
  GenderDesc: '',
  Address: '',
  Age: '0',
  AgeMonth: '0',
  AgeDay: '0',           
  State: '3',
  City: '',
  Pin: '',
  Landmark: '',
  ParentUserId: 0,
  MemberId: 0,
  MemberTypeId : 0,
  UserType: '',
  UID: '',
  UserId: '',
  DOB: '',
  DOBstr: '',
  IsDOBCalculated: 'N',
  Aadhaar: '',
  ParentAadhaar1: '',
  ParentAadhaar2: '',
  RelationShipWithHolder: '',
  Mobile: '',
  Country: 1,
  Mobile2: '',
  GstIn: '',
  LicenceNo: '',
  ContactPerson: '',
  BusinessType: '',
  // UserRegTypeId: ''
  PartyId: '',
  LinkAutoId: 0,          // when doctor add member of other user.
}




// TAX CALCULATIONS -----------------------------------------------------------------------------------------------------------------------------------------------

//   let invoice_1 = [
//     {id: 1, name: 'TENOHEP', qty: 2, rate: 880.51, discount: 45.00,  gst: 12.0, amount: 968.56},
//     {id: 2, name: 'NITROCONTIN', qty: 10, rate: 266.43, discount: 10.00,  gst: 12.0, amount: 2397.87},
//     {id: 3, name: 'STATOR F', qty: 10, rate: 234.78, discount: 11.00,  gst: 12.0, amount: 2089.54},
//     {id: 4, name: 'STEMETIL MD', qty: 6, rate: 123.35, discount: 11.00,  gst: 12.0, amount: 658.69},
//     {id: 5, name: 'JANUMET 50/1000', qty: 3, rate: 542.94, discount: 10.00,  gst: 12.0, amount: 1465.94},
//     {id: 6, name: 'ISTAMET 50/500MG TAB', qty: 3, rate: 244.29, discount: 10.00,  gst: 12.0, amount: 659.58},
//     {id: 7, name: 'ISTAMET 50/1000MG TAB', qty: 3, rate: 247.14, discount: 10.00,  gst: 12.0, amount: 667.28},
//     {id: 8, name: 'ROCALTROL 0.25MG CAPS.', qty: 9, rate: 223.18, discount: 14.00,  gst: 12.0, amount: 1727.41},
//     {id: 9, name: 'ROCALTROL 0.25MG CAPS', qty: 1, rate: 223.18, discount: 14.00,  gst: 12.0, amount: 191.93}
//   ]

//   let invoice_2 = [
//     { name: 'GLYCOMET', qty: 4, rate: 127.5, discount: 6, gst: 12, amount: 536.93},
//     { name: 'JANUVIA', qty: 3, rate: 210.71, discount: 6, gst: 12, amount: 665.5},
//     { name: 'TRILOPACE', qty: 5, rate: 120.68, discount: 6, gst: 12, amount: 635.26}
//   ]

//   const getPrice = (mrp, discount, count, gst) => {
//     let dicountPerItem = mrp * (discount/100);
//     let rate = mrp - dicountPerItem
//     let tax = rate * (gst/100)
//     let total = count * (rate + tax);
//     let result = { rate: rate, gstPerItem: tax, gst: tax*count, totalDiscount: dicountPerItem*count, total: total }
//     return result
//   }
//   const calculate = (arr) => {
//     let res = arr.map(i => {
//       let { rate, gst, total, totalDiscount } = getPrice(i.rate, i.discount, i.qty, i.gst);
//       return { rate, gst, total, totalDiscount }
//     })
//     console.log(res);
//     let total = res.reduce((total, i) => total + i.total, 0).toFixed(2); 
//     let GST = res.reduce((total, i) => total + i.gst, 0).toFixed(2);
//     let taxable = total - GST;
//     let totalDiscount = res.reduce((total, i) => total + i.totalDiscount, 0).toFixed(2);
  
//     console.log('taxable :' + taxable)
//     console.log('Total Discount :' + totalDiscount)
//     console.log('SGST :' + GST/2)
//     console.log('GST : ' + GST)
//     console.log('total : ' + total)
//   }

//   calculate(invoice_1);
//   calculate(invoice_2);

  









