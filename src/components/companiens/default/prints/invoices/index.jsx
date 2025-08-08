import { connect } from "react-redux";
import InvoiceDefault from "./default";
import qs from 'query-string';
import { useLocation } from "react-router-dom";


const Invoices = ({ match }) => {

    const location = useLocation();
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true, decode: true }); 

    const type = queryString.type;        
    const id = match.params.id;        

    if (!id) return;
    return navigateToPrint(id, type);

}

const mapStateToDashboard = (state) => {
    return { userInfo: state.userInfo, isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateToDashboard, {})(Invoices);





const navigateToPrint = (id, type) => {
    // switch(type) {
    //   case '':
    //     return;
    //   default:                                        
        return <InvoiceDefault id={id} type={type} />;
    // }
}