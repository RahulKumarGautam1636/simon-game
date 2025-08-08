import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { MODULES, getTotalCartItems, makeAppointment } from './utilities';

const BottomNav = ({ compCode, isLoggedIn, cart, userInfo }) => {
  // const history = useHistory();
  const cartLenght = getTotalCartItems(cart);
  
  return (
    // <div className='bottomNav d-sm-none'>
    //   <ul className='icons'>
    //     <li onClick={() => makeAppointment(isLoggedIn, loginModalAction, true, uType.PATIENT.level, history)}>
    //       <Link to="">CONSULT DOCTOR</Link>
    //     </li>
    //     <li style={{background: '#11b9c3', display: compCode !== 'FFCeIi27FQMTNGpatwiktw==' ? 'none' : 'grid'}}>
    //       <Link to="/pharmacy">PHARMACY</Link>
    //     </li>
    //     <li style={{display: compCode !== 'FFCeIi27FQMTNGpatwiktw==' ? 'none' : 'grid'}}>
    //       <Link to="/labTests">LAB TESTS</Link>
    //     </li>
    //   </ul>
    // </div>

    <div className="bottomNav d-md-none default-global">
      <ul className="icons d-flex justify-content-center align-items-center ps-0">
        {MODULES[compCode]?.includes('OPD') || <li>    
          <Link to="/specialists"><i className="icofont-stethoscope-alt fw-bold"></i>OPD</Link>  
        </li>}
        {/* {MODULES[compCode]?.includes('PHARMACY') || <li> 
            <Link to="/pharmacy"><i className="icofont-capsule fw-bold"></i>pharmacy</Link> 
        </li>} */}
        {MODULES[compCode]?.includes('LAB_TEST') || <li> 
          <Link to="/labTests"><i className="icofont-test-tube-alt fw-bold"></i>lab</Link>
        </li>}
        {isLoggedIn && <li>
          <Link to="/dashboard"><i className="icofont-chart-pie fw-bold"></i>Manage</Link> 
        </li>}
        {isLoggedIn && <li>
          <Link to={`/profile/${userInfo.PartyCode}`}><i className="icofont-people"></i>Members</Link> 
        </li>}
        {(MODULES[compCode]?.includes('PHARMACY') && MODULES[compCode]?.includes('LAB_TEST')) || <li>
          <Link to="/cartPage"><i className="icofont-cart fw-bold">
            {cartLenght > 0 && <span id="cart-badge" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.4rem', fontFamily: 'Jost', display: 'block'}}>{cartLenght}</span>}  
          </i>cart</Link>
        </li>}
      </ul>
    </div>
  )
}

const mapStateToPropsTwo = (state) => {
  return { compCode: state.compCode, isLoggedIn: state.isLoggedIn, cart: state.cart, userInfo: state.userInfo };
}

export default connect(mapStateToPropsTwo, {})(BottomNav);
