import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { modalAction } from '../../../actions';

const BottomNav = ({ modals, modalAction, isLoggedIn, cart, vType }) => {
  // const history = useHistory();

  const cartLenght = Object.values(cart.pharmacy).length;
  const isRestaurant = (vType === 'RESTAURANT' || vType === 'HOTEL' || vType === 'RESORT');
  
  return (
    <div className="bottomNav d-md-none">
      <ul className="icons d-flex justify-content-evenly align-items-center ps-0" style={{listStyle: 'none'}}>
        <li>
          <Link to="/"><i className='bx bx-home'></i>home</Link>
        </li>
        <li>
          { isLoggedIn ?
            <Link to="#" onClick={() => modalAction('USER_INFO_MODAL', !modals.USER_INFO_MODAL.state)}><i className='bx bxs-user-account'></i>account</Link> :
            <Link to="#" onClick={() => modalAction('LOGIN_MODAL', !modals.LOGIN_MODAL.state)}><i className='bx bxs-user-account'></i>account</Link> 
          }
        </li>
        <li>
          <span onClick={() => modalAction('CATEGORY_MODAL', !modals.CATEGORY_MODAL.state)}><i className='bx bx-category'></i>categories</span>
          {/* <a href="https://takehome.live/others/"><i className='bx bx-category'></i>categories</a> */}
        </li>
        {(() => {
          if (isRestaurant || vType === 'rent') {
            return;
          } else {
            return (
              <>
                <li>
                  {isLoggedIn ? 
                  <Link to="/myOrders"><i className='bx bx-package'></i>orders</Link> : 
                  <Link to='#' onClick={() => modalAction('LOGIN_MODAL', !modals.LOGIN_MODAL.state)}><i className='bx bx-package'></i>orders</Link>}
                </li>
                <li>
                  <Link to={`/cartPage`}><i className='bx bx-cart-alt position-relative'>
                    {cartLenght > 0 && <span id="cart-badge" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '1rem', fontFamily: 'Jost', display: 'block'}}>{cartLenght}</span>}  
                  </i>cart</Link>
                </li>
              </>
            )
          }
        })()}

        {/* {isRestaurant || <>
          <li>
            {isLoggedIn ? 
            <Link to="/myOrders"><i className='bx bx-package'></i>orders</Link> : 
            <Link to='#' onClick={() => modalAction('LOGIN_MODAL', !modals.LOGIN_MODAL.state)}><i className='bx bx-package'></i>orders</Link>}
          </li>
          <li>
            <Link to="/cartPage"><i className='bx bx-cart-alt position-relative'>
              {cartLenght > 0 && <span id="cart-badge" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '1rem', fontFamily: 'Jost', display: 'block'}}>{cartLenght}</span>}  
            </i>cart</Link>
          </li>
        </>} */}
      </ul>
    </div>
  )
}

const mapStateToPropsTwo = (state) => {
  return { modals: state.modals, isLoggedIn: state.isLoggedIn, cart: state.cart };
}

export default connect(mapStateToPropsTwo, {modalAction})(BottomNav);
