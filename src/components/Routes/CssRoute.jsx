import { connect } from "react-redux";
import { BNH_ID, BSN_ID, RAJE_RESTAURANT_ID, SRC_URL, TAKEHOME_ELECTRONICS, TAKE_HOME_ID, XYZ_ID, bhsId, defaultId, ePharmaId, takehomeMain } from "../../constants";
import { useState } from "react";
import { wait } from '../../components/companiens/default/utilities';

const CssRoute = ({ compCode, vType, compInfo }) => {

    const [cover, setCover] = useState(true);

    (async () => {
        if (compCode === BSN_ID || compCode === bhsId || compCode === BNH_ID) {
            await import('../CSS/bsn/styles.css');
            await import('../CSS/bsn/responsive.css');
            if (compCode === bhsId) {
                await import('../CSS/bhs.css');
                await import('../CSS/bsn/bhsModifier.css');
            }
        } else {
            await import('../CSS/ePharma/ePharma.css');
            await import('../CSS/ePharma/ePharma-responsive.css');
        } 

        if (compCode === ePharmaId) {
            await import('../CSS/ePharma/ePharma-modify.css');
        } else if (compCode === TAKE_HOME_ID || compCode === XYZ_ID || vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT' || vType === 'agro' || vType === 'ErpManufacturing') {
            await import('../CSS/takeHome/takeHome.css');
            if (takehomeMain) return import('../CSS/takeHome/takehome_main.css');
            if (vType === 'rent') {
                await import('../CSS/takeHome/version-1.css');
            } else if (vType === 'agro') {
                await import('../CSS/takeHome/version-2.css');
            } else if (vType === 'ErpManufacturing') {
                if (compCode === TAKEHOME_ELECTRONICS) return await import('../CSS/takeHome/version-4.css');
                await import('../CSS/takeHome/version-3.css');
            }
        } else {

        }
        await wait(800);
        setCover(false);
    })();

    return;

    // if (cover) {
    //     return (
    //         <div className="d-flex justify-content-center align-items-center default-global" style={{position: 'fixed', inset: 0, zIndex: 111111, background: 'white'}}>  
    //             <div className="d-flex flex-column gap-4 align-items-center">
    //                 {(() => {
    //                     if (compCode === TAKE_HOME_ID) {
    //                         return <img src="/img/logo/takeHome.png" alt="" style={{width: 'clamp(19em, 28vw, 30rem)'}} />;
    //                     } else if (compCode === ePharmaId) {
    //                         return <img src="/img/logo/epharma.png" alt="" style={{width: 'clamp(16em, 21vw, 22rem)'}} className="mb-4" />;
    //                     } else if (compCode === XYZ_ID) {
    //                         return <img src="/img/logo/XYZ-LOGO.png" alt="" style={{width: 'clamp(19rem, 18vw, 19rem)', marginBottom: '2rem'}} />;
    //                     } else if (compCode === BSN_ID) {
    //                         return <img src="./assets/img/bankura seva logo.webp" alt="" style={{width: 'clamp(9rem, 15vw, 13rem)'}} />;
    //                     } else if (compCode === defaultId) {
    //                         return <img src="/img/gbooks-round-logo.png" alt="" style={{width: 'clamp(9rem, 15vw, 13rem)'}} className="mb-4"/>;
    //                     } else if (compCode === RAJE_RESTAURANT_ID) {
    //                         return <img src={`${SRC_URL}/Content/CompanyLogo/827.jpeg`} alt="" style={{width: 'clamp(9rem, 15vw, 13rem)'}} className="mb-4"/>;
    //                     } else {
    //                         return <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="" style={{width: 'clamp(19em, 28vw, 30rem)'}} className="mb-4"/>;
    //                     }          
    //                 })()}
    //                 <div className="text-center w-100" style={{minWidth: '25vw'}}>
    //                     <h3>Loading...</h3>
    //                     <div className="progress mt-4">
    //                         <div className="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
}

const mapStateToCssRoute = (state) => {
    return { compCode: state.compCode, compInfo: state.compInfo, vType: state.vType };
}
  
export default connect(mapStateToCssRoute, {})(CssRoute);


export const ScreenSplash = ({ compCode, compInfo }) => {
    return (
        <div className="d-flex justify-content-center align-items-center default-global" style={{position: 'fixed', inset: 0, zIndex: 111111, background: 'white'}}>  
            <div className="d-flex flex-column gap-4 align-items-center">
                {(() => {
                    if (compCode === TAKE_HOME_ID) {
                        return <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="" style={{width: 'clamp(19em, 28vw, 30rem)'}} />;
                    } else if (compCode === ePharmaId) {
                        return <img src="/img/logo/epharma.png" alt="" style={{width: 'clamp(16em, 21vw, 22rem)'}} className="mb-4" />;
                    } else if (compCode === XYZ_ID) {
                        return <img src="/img/logo/XYZ-LOGO.png" alt="" style={{width: 'clamp(19rem, 18vw, 19rem)', marginBottom: '2rem'}} />;
                    } else if (compCode === BSN_ID) {
                        return <img src="./assets/img/bankura seva logo.webp" alt="" style={{width: 'clamp(9rem, 15vw, 13rem)'}} />;
                    } else if (compCode === defaultId) {
                        return <img src="/img/gbooks-round-logo.png" alt="" style={{width: 'clamp(9rem, 15vw, 13rem)'}} className="mb-4"/>;
                    } else if (compCode === RAJE_RESTAURANT_ID) {
                        return <img src={`${SRC_URL}/Content/CompanyLogo/827.jpeg`} alt="" style={{width: 'clamp(9rem, 15vw, 13rem)'}} className="mb-4"/>;
                    } else {
                        return <img src={`${SRC_URL}/Content/CompanyLogo/${compInfo.LogoUrl}`} alt="" style={{width: 'clamp(19em, 28vw, 30rem)'}} className="mb-4"/>;
                    }          
                })()}
                <div className="text-center w-100" style={{minWidth: '25vw'}}>
                    <h3>Loading...</h3>
                    <div className="progress mt-4">
                        <div className="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
