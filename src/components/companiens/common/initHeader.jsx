import axios from "axios";
import { connect, useSelector } from "react-redux";
import { userInfoAction, compInfoAction, loaderAction, globalDataAction, siteDataAction, filterAction, modalAction, vTypeAction, loginStatusAction, cartAction } from "../../../actions";
import { useEffect } from "react";
import { UseFavicon, useDocumentTitle, ScrollUpIcon, useFetch, getTotalCartItems } from "../default/utilities";
import { getCategoryRequiredFieldsOnly, getRequiredFieldsOnly, rentCategories } from "../ePharma/utilities";
import { agro, BASE_URL, initSiteData, rent, TAKEHOME_AGRO } from "../../../constants";
import { rentSaleProducts } from "../ePharma/rentSale/takehome-database";
import { agroCategories } from "../ePharma/agro/data";

const InitHeader = ({ vType, vTypeAction, compCode, userInfo, loaderAction, userInfoAction, compInfoAction, compInfo, globalDataAction, siteDataAction, filterAction, globalData, modalAction, isLoggedIn, loginStatusAction, cart, cartAction }) => {

    // const siteData = useSelector(i => i.siteData);

    let locationId = globalData.location.LocationId;
    useEffect(() => {
        if (!isLoggedIn) return;
        if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
            modalAction('TABLE_SELECTION_MODAL', true)
        }
    }, [isLoggedIn, vType, modalAction])
    
    useEffect(() => {
        getCompanyDetails(compCode);
    }, [compCode, locationId])

    useEffect(() => {
        let controller1 = new AbortController();
        const getCompanyList = async (companyCode, userId, signal) => {                  
            if (!companyCode) return console.log('no companyCode received');               
            const res = await axios.get(`${BASE_URL}/api/CompMast/Get?CID=${companyCode}&UID=${userId}`, { params: {}, signal: signal });
            if (res) {  
                let parentCompany = res.data.find(i => i.EncCompanyId === compCode);                                                                                                          
                userInfoAction({companyList: res.data, selectedCompany: parentCompany });              
            } else {
                alert('Something went wrong.');
            }
        }
        getCompanyList(compCode, userInfo.UserId, controller1.signal);
        return () => controller1.abort();
    }, [compCode, userInfo.UserId])

    useEffect(() => {
        const getMembersList = async (companyCode, userId, memberId) => {
            if (!userId) return;
            try {      
                loaderAction(true);
                const res = await axios.get(`${BASE_URL}/api/member/Get?UserId=${userId}&CID=${companyCode}`, {});
                if (res.data) {
                    const parentMember = res.data.AccPartyMemberMasterList.find(i => i.MemberId === memberId);
                    if (parentMember) {
                        userInfoAction({MembersList: res.data, selectedMember: parentMember});
                    } else {
                        userInfoAction({MembersList: res.data});
                        console.log('No parent member found');
                    }
                }
            } catch (error) {
                alert('Something went wrong please Refresh or try after some time.');
            }
            loaderAction(false);
        }
        getMembersList(compCode, userInfo.UserId, userInfo.MemberId);
    },[loaderAction, compCode, userInfo.UserId, userInfo.MemberId, userInfoAction])

    const getCompanyDetails = async (companyCode) => {
        try {      
            loaderAction(true);
            const res = await axios.get(`${BASE_URL}/api/CompMast/GetCompDetails?CID=${companyCode}&LOCID=${locationId}`, {});
            if (res.data.COMPNAME && res.data.EncCompanyId) {
                compInfoAction(res.data);
                if (rent) {
                    vTypeAction('rent');
                    globalDataAction({ location: {required: false, LocationId: 1293} });
                    loaderAction(false);
                    return;
                } 
                // else if (garments) {
                //     vTypeAction('garments');
                //     globalDataAction({ location: {required: false, LocationId: 1293} });
                //     loaderAction(false);
                //     return;
                // } 
                else if (res.data.VerticleType === 'RESTAURANT' || res.data.VerticleType === 'HOTEL' || res.data.VerticleType === 'RESORT') {
                    globalDataAction({ location: {required: false, LocationId: res.data.LocationId} });
                } else if (res.data.VerticleType === 'ErpPharma' || res.data.VerticleType === 'ErpManufacturing') {
                    // if (garments) {
                    //     vTypeAction('garments');                // temporary use of agro. LOC set from elsewhere.
                    // } else 
                    if (compCode === TAKEHOME_AGRO) {
                        vTypeAction('agro');                    
                    } else {
                        vTypeAction(res.data.VerticleType);          
                    }
                    loaderAction(false);
                    return;
                } 
                vTypeAction(res.data.VerticleType);             
                loaderAction(false);
                if (!locationId) {                                   
                    // localStorage.setItem(`userLocation_${companyCode}`, JSON.stringify({ LocationId: res.data.LocationId }));   
                    globalDataAction({ location: { LocationId: res.data.LocationId} });
                }
            } else {
                alert('Invalid Company ! Please try later.');
            }
        } catch (error) {
            alert('Something went wrong please Refresh or try after some time.');
            console.log('No company received. 49');
        }
        loaderAction(false);
    }

    useDocumentTitle(compInfo.COMPNAME);

    useEffect(() => {
        let controller = new AbortController();
        if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing' || vType === 'ErpHospital') {
            const getCategories = async (signal) => {         
                siteDataAction({ catLoading: true, productLoading: true });
                const res = await axios.get(`${BASE_URL}/api/Pharma/GetCatSubCat?CID=${compCode}&LOCID=${locationId}`, { signal: signal });
                if (res.status === 200) {
                    const categories = getCategoryRequiredFieldsOnly(res.data.LinkCategoryList);
                    // if (vType === 'agro') {
                    //     siteDataAction({ ...res.data, LinkCategoryList: agroCategories, isLoading: false });
                    //     return;
                    // }
                    siteDataAction({ LinkCategoryList: categories, catLoading: false, LinkSubCategoryList: res.data.LinkSubCategoryList }); 
                    const medicineSubLinks = res.data.LinkSubCategoryList.filter(i => i.Parent === 8756);                   // where parent category is 'Medicine'.
                    filterAction('categories', medicineSubLinks);    
                }
            }
            getCategories(controller.signal)
        } else if (vType === 'rent') {
            siteDataAction({isLoading: false, itemMasterCollection: rentSaleProducts, LinkCategoryList: rentCategories, LinkSubCategoryList: [], ItemBrandList: []}); 
            return;
        } 
        // else if (vType === 'ErpManufacturing') {
        //     siteDataAction({isLoading: false, itemMasterCollection: rentSaleProducts, LinkCategoryList: rentCategories, LinkSubCategoryList: [], ItemBrandList: []}); 
        //     return;
        // }
        return () => controller.abort();
    },[compCode, filterAction, siteDataAction, locationId, vType])

    useEffect(() => {
        let controller = new AbortController();
        if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing' || vType === 'ErpHospital') {
            const getProducts = async (signal) => {                 
                const res2 = await axios.get(`${BASE_URL}/api/Pharma/GetCatItemsWithBrand?CID=${compCode}&LOCID=${locationId}`, { signal: signal });
                if (res2.status === 200) {
                    const products = getRequiredFieldsOnly(res2.data.itemMasterCollection, locationId);
                    // if (vType === 'agro') {
                    //     siteDataAction({ ...res2.data, itemMasterCollection: products });
                    //     return;
                    // }
                    siteDataAction({ itemMasterCollection: products, ItemBrandList: res2.data.ItemBrandList, productLoading: false, isLoading: false }); 
                }
            }
            getProducts(controller.signal);
        } else if (vType === 'rent') {
            siteDataAction({isLoading: false, itemMasterCollection: rentSaleProducts, LinkCategoryList: rentCategories, LinkSubCategoryList: [], ItemBrandList: []}); 
            return;
        } 
        // else if (vType === 'ErpManufacturing') {
        //     siteDataAction({isLoading: false, itemMasterCollection: rentSaleProducts, LinkCategoryList: rentCategories, LinkSubCategoryList: [], ItemBrandList: []}); 
        //     return;
        // }
        return () => controller.abort();
    },[compCode, filterAction, siteDataAction, locationId, vType])


    useEffect(() => {
       if ((vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') || globalData.userRegType.CodeValue === 'Retailer' || vType === 'rent' || vType === 'agro' || vType === 'ErpManufacturing') {
            globalDataAction({prescription: { required: false, patient: { docName: '', docAddress: '' }}});
        } else {
            globalDataAction({prescription: { required: true, patient: { docName: '', docAddress: '' }}});
       }
    },[vType, globalData.userRegType.CodeValue, globalDataAction])

    const compBusinessTypes = useFetch(`${BASE_URL}/api/Values/GetMstAllMaster?CID=${compInfo.CompanyId}&type=BUSINESSTYPE&P1=0`, compInfo.CompanyId)[0];

    // useEffect(() => {
    //    if (vType === 'ErpPharma') {
    //         if (isLoggedIn) {
    //             // if (!userInfo.BusinessType) {
    //             //     setTimeout(() => {
    //             //         userInfoAction({ ...initAppState.userInfo })
    //             //         loginStatusAction(false);
    //             //         alert('This User id is invalid, Please do a New Registration.');
    //             //         return;
    //             //     }, 2000);
    //             // } else {
    //                 let userBusinessType = compBusinessTypes.find(i => i.CodeValue === userInfo.BusinessType);
    //                 if (!userBusinessType || userBusinessType.CodeValue === 'B2C') return;
    //                 globalDataAction({ businessType: { Description: userBusinessType.Description, CodeId: userBusinessType.CodeId, CodeValue: userBusinessType.CodeValue }, location: {LocationId: 0} });
    //             // }
    //         } else {
    //             let b2cBusinessType = compBusinessTypes.find(i => i.CodeValue === 'B2C');
    //             if (!b2cBusinessType) return;
    //             globalDataAction({ businessType: { Description: b2cBusinessType?.Description, CodeId: b2cBusinessType?.CodeId, CodeValue: b2cBusinessType?.CodeValue }, location: {LocationId: 0} });
    //         }
    //         localStorage.removeItem(`userLocation_${compCode}`);
    //     }
    // },[isLoggedIn, compBusinessTypes, userInfo.BusinessType, vType])

    useEffect(() => {
        if (!isLoggedIn) return;
        if (vType === 'ErpPharma') {
            if (userInfo.BusinessType === 'B2B') globalDataAction({ userRegType: { CodeId: 43194, Description: 'Retailer', CodeValue: 'Retailer', for: 'B2B / Retailer' } })
        }
    },[isLoggedIn, userInfo.BusinessType, vType])

    useEffect(() => {
        if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing') {        
            let userBusinessType;
            if (globalData.userRegType.CodeValue === 'Retailer') {
                userBusinessType = compBusinessTypes.find(i => i.CodeValue === 'B2B');
            } else {
                userBusinessType = compBusinessTypes.find(i => i.CodeValue === 'B2C');
            }
            if (!userBusinessType) return;
            globalDataAction({ businessType: { Description: userBusinessType.Description, CodeId: userBusinessType.CodeId, CodeValue: userBusinessType.CodeValue }, location: {LocationId: 0} });
        }
        // localStorage.removeItem(`userLocation_${compCode}`);
    },[compBusinessTypes, globalData.userRegType.CodeValue, vType])


    useEffect(() => {   
        let cartItems = getTotalCartItems(cart, 'labTests');
        if (cartItems) {
            alert(`Changing Hospital will remove the Lab Tests from your cart.`)
        }
        cartAction('DUMP_CART', {}, 'labTests');
    },[userInfo.selectedCompany.LocationId, cartAction])

    return (
        <>
            <UseFavicon LogoUrl={compInfo.LogoUrl} />
            <ScrollUpIcon compCode={compCode} vTypeAction={vTypeAction} vType={vType} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {  compCode: state.compCode, compInfo: state.compInfo, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, globalData: state.globalData, cart: state.cart };
}
  
export default connect(mapStateToProps, {vTypeAction, userInfoAction, compInfoAction, loaderAction, globalDataAction, filterAction, siteDataAction, modalAction, loginStatusAction, cartAction})(InitHeader);




// import axios from "axios";
// import { connect } from "react-redux";
// import { userInfoAction, compInfoAction, loaderAction, globalDataAction, siteDataAction, filterAction, modalAction, vTypeAction, loginStatusAction, cartAction } from "../../../actions";
// import { useEffect } from "react";
// import { UseFavicon, useDocumentTitle, ScrollUpIcon, useFetch, getTotalCartItems } from "../default/utilities";
// import { getCategoryRequiredFieldsOnly, getRequiredFieldsOnly, rentCategories } from "../ePharma/utilities";
// import { agro, BASE_URL, initSiteData, rent, TAKEHOME_AGRO } from "../../../constants";
// import { rentSaleProducts } from "../ePharma/rentSale/takehome-database";
// import { agroCategories } from "../ePharma/agro/data";

// const InitHeader = ({ vType, vTypeAction, compCode, userInfo, loaderAction, userInfoAction, compInfoAction, compInfo, globalDataAction, siteDataAction, filterAction, globalData, modalAction, isLoggedIn, loginStatusAction, cart, cartAction }) => {

//     let locationId = globalData.location.LocationId;
//     useEffect(() => {
//         if (!isLoggedIn) return;
//         if (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') {
//             modalAction('TABLE_SELECTION_MODAL', true)
//         }
//     }, [isLoggedIn, vType, modalAction])
    
//     useEffect(() => {
//         getCompanyDetails(compCode);
//     }, [compCode, locationId])

//     useEffect(() => {
//         let controller1 = new AbortController();
//         const getCompanyList = async (companyCode, userId, signal) => {                  
//             if (!companyCode) return console.log('no companyCode received');               
//             const res = await axios.get(`${BASE_URL}/api/CompMast/Get?CID=${companyCode}&UID=${userId}`, { params: {}, signal: signal });
//             if (res) {  
//                 let parentCompany = res.data.find(i => i.EncCompanyId === compCode);                                                                                                          
//                 userInfoAction({companyList: res.data, selectedCompany: parentCompany });              
//             } else {
//                 alert('Something went wrong.');
//             }
//         }
//         getCompanyList(compCode, userInfo.UserId, controller1.signal);
//         return () => controller1.abort();
//     }, [compCode, userInfo.UserId])

//     useEffect(() => {
//         const getMembersList = async (companyCode, userId, memberId) => {
//             if (!userId) return;
//             try {      
//                 loaderAction(true);
//                 const res = await axios.get(`${BASE_URL}/api/member/Get?UserId=${userId}&CID=${companyCode}`, {});
//                 if (res.data) {
//                     const parentMember = res.data.AccPartyMemberMasterList.find(i => i.MemberId === memberId);
//                     if (parentMember) {
//                         userInfoAction({MembersList: res.data, selectedMember: parentMember});
//                     } else {
//                         userInfoAction({MembersList: res.data});
//                         console.log('No parent member found');
//                     }
//                 }
//             } catch (error) {
//                 alert('Something went wrong please Refresh or try after some time.');
//             }
//             loaderAction(false);
//         }
//         getMembersList(compCode, userInfo.UserId, userInfo.MemberId);
//     },[loaderAction, compCode, userInfo.UserId, userInfo.MemberId, userInfoAction])

//     const getCompanyDetails = async (companyCode) => {
//         try {      
//             loaderAction(true);
//             const res = await axios.get(`${BASE_URL}/api/CompMast/GetCompDetails?CID=${companyCode}&LOCID=${locationId}`, {});
//             if (res.data.COMPNAME && res.data.EncCompanyId) {
//                 compInfoAction(res.data);
//                 if (rent) {
//                     vTypeAction('rent');
//                     globalDataAction({ location: {required: false, LocationId: 1293} });
//                     loaderAction(false);
//                     return;
//                 } 
//                 // else if (garments) {
//                 //     vTypeAction('garments');
//                 //     globalDataAction({ location: {required: false, LocationId: 1293} });
//                 //     loaderAction(false);
//                 //     return;
//                 // } 
//                 else if (res.data.VerticleType === 'RESTAURANT' || res.data.VerticleType === 'HOTEL' || res.data.VerticleType === 'RESORT') {
//                     globalDataAction({ location: {required: false, LocationId: res.data.LocationId} });
//                 } else if (res.data.VerticleType === 'ErpPharma' || res.data.VerticleType === 'ErpManufacturing') {
//                     // if (garments) {
//                     //     vTypeAction('garments');                // temporary use of agro. LOC set from elsewhere.
//                     // } else 
//                     if (compCode === TAKEHOME_AGRO) {
//                         vTypeAction('agro');                    
//                     } else {
//                         vTypeAction(res.data.VerticleType);          
//                     }
//                     loaderAction(false);
//                     return;
//                 } 
//                 vTypeAction(res.data.VerticleType);             
//                 loaderAction(false);
//                 if (!locationId) {                                   
//                     // localStorage.setItem(`userLocation_${companyCode}`, JSON.stringify({ LocationId: res.data.LocationId }));   
//                     globalDataAction({ location: { LocationId: res.data.LocationId} });
//                 }
//             } else {
//                 alert('Invalid Company ! Please try later.');
//             }
//         } catch (error) {
//             alert('Something went wrong please Refresh or try after some time.');
//             console.log('No company received. 49');
//         }
//         loaderAction(false);
//     }

//     useDocumentTitle(compInfo.COMPNAME);

//     useEffect(() => {
//         let controller = new AbortController();
//         if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing') {
//             const getProducts = async (signal) => {         
//                 siteDataAction({...initSiteData});          
//                 const res = await axios.get(`${BASE_URL}/api/Pharma/Get?CID=${compCode}&LOCID=${locationId}`, { signal: signal });
//                 if (res.status === 200) {
//                     const products = getRequiredFieldsOnly(res.data.itemMasterCollection, locationId);
//                     const categories = getCategoryRequiredFieldsOnly(res.data.LinkCategoryList);
//                     // if (vType === 'agro') {
//                     //     siteDataAction({ ...res.data, itemMasterCollection: products, LinkCategoryList: agroCategories, isLoading: false });
//                     //     return;
//                     // }
//                     siteDataAction({ ...res.data, itemMasterCollection: products, LinkCategoryList: categories, isLoading: false }); 
//                     // siteDataAction({ isLoading: false, itemMasterCollection: products, LinkCategoryList: res.data.LinkCategoryList, ItemBrandList: res.data.ItemBrandList, LinkSubCategoryList: [] }); 
//                     const medicineSubLinks = res.data.LinkSubCategoryList.filter(i => i.Parent === 8756);                   // where parent category is 'Medicine'.
//                     filterAction('categories', medicineSubLinks);    
//                 }
//             }
//             getProducts(controller.signal);
//         } else if (vType === 'rent') {
//             siteDataAction({isLoading: false, itemMasterCollection: rentSaleProducts, LinkCategoryList: rentCategories, LinkSubCategoryList: [], ItemBrandList: []}); 
//             return;
//         } 
//         // else if (vType === 'ErpManufacturing') {
//         //     siteDataAction({isLoading: false, itemMasterCollection: rentSaleProducts, LinkCategoryList: rentCategories, LinkSubCategoryList: [], ItemBrandList: []}); 
//         //     return;
//         // }
//         return () => controller.abort();
//     },[compCode, filterAction, siteDataAction, locationId, vType])


//     useEffect(() => {
//        if ((vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT') || globalData.userRegType.CodeValue === 'Retailer' || vType === 'rent' || vType === 'agro' || vType === 'ErpManufacturing') {
//             globalDataAction({prescription: { required: false, patient: { docName: '', docAddress: '' }}});
//         } else {
//             globalDataAction({prescription: { required: true, patient: { docName: '', docAddress: '' }}});
//        }
//     },[vType, globalData.userRegType.CodeValue, globalDataAction])

//     const compBusinessTypes = useFetch(`${BASE_URL}/api/Values/GetMstAllMaster?CID=${compInfo.CompanyId}&type=BUSINESSTYPE&P1=0`, compInfo.CompanyId)[0];

//     // useEffect(() => {
//     //    if (vType === 'ErpPharma') {
//     //         if (isLoggedIn) {
//     //             // if (!userInfo.BusinessType) {
//     //             //     setTimeout(() => {
//     //             //         userInfoAction({ ...initAppState.userInfo })
//     //             //         loginStatusAction(false);
//     //             //         alert('This User id is invalid, Please do a New Registration.');
//     //             //         return;
//     //             //     }, 2000);
//     //             // } else {
//     //                 let userBusinessType = compBusinessTypes.find(i => i.CodeValue === userInfo.BusinessType);
//     //                 if (!userBusinessType || userBusinessType.CodeValue === 'B2C') return;
//     //                 globalDataAction({ businessType: { Description: userBusinessType.Description, CodeId: userBusinessType.CodeId, CodeValue: userBusinessType.CodeValue }, location: {LocationId: 0} });
//     //             // }
//     //         } else {
//     //             let b2cBusinessType = compBusinessTypes.find(i => i.CodeValue === 'B2C');
//     //             if (!b2cBusinessType) return;
//     //             globalDataAction({ businessType: { Description: b2cBusinessType?.Description, CodeId: b2cBusinessType?.CodeId, CodeValue: b2cBusinessType?.CodeValue }, location: {LocationId: 0} });
//     //         }
//     //         localStorage.removeItem(`userLocation_${compCode}`);
//     //     }
//     // },[isLoggedIn, compBusinessTypes, userInfo.BusinessType, vType])

//     useEffect(() => {
//         if (!isLoggedIn) return;
//         if (vType === 'ErpPharma') {
//             if (userInfo.BusinessType === 'B2B') globalDataAction({ userRegType: { CodeId: 43194, Description: 'Retailer', CodeValue: 'Retailer', for: 'B2B / Retailer' } })
//         }
//     },[isLoggedIn, userInfo.BusinessType, vType])

//     useEffect(() => {
//         if (vType === 'ErpPharma' || vType === 'agro' || vType === 'ErpManufacturing') {        
//             let userBusinessType;
//             if (globalData.userRegType.CodeValue === 'Retailer') {
//                 userBusinessType = compBusinessTypes.find(i => i.CodeValue === 'B2B');
//             } else {
//                 userBusinessType = compBusinessTypes.find(i => i.CodeValue === 'B2C');
//             }
//             if (!userBusinessType) return;
//             globalDataAction({ businessType: { Description: userBusinessType.Description, CodeId: userBusinessType.CodeId, CodeValue: userBusinessType.CodeValue }, location: {LocationId: 0} });
//         }
//         // localStorage.removeItem(`userLocation_${compCode}`);
//     },[compBusinessTypes, globalData.userRegType.CodeValue, vType])


//     useEffect(() => {   
//         let cartItems = getTotalCartItems(cart, 'labTests');
//         if (cartItems) {
//             alert(`Changing Hospital will remove the Lab Tests from your cart.`)
//         }
//         cartAction('DUMP_CART', {}, 'labTests');
//     },[userInfo.selectedCompany.LocationId, cartAction])

//     return (
//         <>
//             <UseFavicon LogoUrl={compInfo.LogoUrl} />
//             <ScrollUpIcon compCode={compCode} vTypeAction={vTypeAction} vType={vType} />
//         </>
//     )
// }

// const mapStateToProps = (state) => {
//     return {  compCode: state.compCode, compInfo: state.compInfo, isLoggedIn: state.isLoggedIn, userInfo: state.userInfo, globalData: state.globalData, cart: state.cart };
// }
  
// export default connect(mapStateToProps, {vTypeAction, userInfoAction, compInfoAction, loaderAction, globalDataAction, filterAction, siteDataAction, modalAction, loginStatusAction, cartAction})(InitHeader);
