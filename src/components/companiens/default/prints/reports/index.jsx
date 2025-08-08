import { modalAction } from "../../../../../actions";
import { NotFound } from "../../utilities";
import { connect } from "react-redux";
import Investigation from "./Investigation";
import qs from 'query-string';
import { useLocation } from "react-router-dom";


const Reports = ({ userInfo, isLoggedIn, modalAction, compCode }) => {

    const location = useLocation();
    const { type, id } = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 

    // if (!isLoggedIn) {
    //    modalAction('LOGIN_MODAL', true, {mode: uType.PATIENT.level});
    //    return;
    // };
    return navigateToReport(type, id, compCode);

}

const mapStateToReport = (state) => {
    return { userInfo: state.userInfo, isLoggedIn: state.isLoggedIn, compCode: state.compCode }
}

export default connect(mapStateToReport, {modalAction})(Reports);


const navigateToReport = (type, id, compCode) => {

  switch(type) {
    case 'INVESTIGATION':
      return <Investigation id={id} compCode={compCode} type={type} />;          
    default:                              
      return <NotFound />;
  }
}









// if (Model.Journal.Sales.Gender != null && Model.Journal.Sales.Gender != "") {
//     if (Model.Journal.Sales.Age > 10)
//     {
//         if (Model.Journal.Sales.Gender.ToUpper() == "MALE")
//         {
//             lRange = Pobj.Male_LwrPange;
//             URange = Pobj.Male_UprRange;
//         }
//         else if (Model.Journal.Sales.Gender.ToUpper() == "FEMALE")
//         {
//             lRange = Pobj.Female_LwrRange;
//             URange = Pobj.Female_UprRange;
//         }
//     }
//     else
//     {
//         lRange = Pobj.Child_LwrRange;
//         URange = Pobj.Child_UprRange;
//     }
// }
// let value = Pobj.Result;
// let result;
// let IsString = "Y";
// if (decimal.TryParse(value, out result)) {
//     IsString = "N";
// }
// if (IsString != "Y") {

//     if (Convert.ToDouble(string.IsNullOrEmpty(Pobj.Result) ? "0" : Pobj.Result) >= lRange && Convert.ToDouble(string.IsNullOrEmpty(Pobj.Result) ? "0" : Pobj.Result) <= URange)
//     {
//         fontw = "normal";
//     }
//     else if (lRange == 0 && URange == 0)
//     {
//         fontw = "normal";
//     }
//     else if (Pobj.TestStandard == null || Pobj.TestStandard.Trim() == "")
//     {
//         fontw = "normal";
//     }
//     else
//     {
//         fontw = "bold";
//     }
// } else {
//     fontw = "normal";
// }
