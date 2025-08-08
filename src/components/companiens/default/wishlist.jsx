import { connect } from 'react-redux';
import { modalAction } from '../../../actions';
import { getFormattedDate, BreadCrumb } from './utilities';
import { Link } from 'react-router-dom';
import { ConnectedWishlistCard } from './cards';


const CartPage = ({ wishlist }) => {

  const breadCrumbData = {
    links: [{name: 'Home', link: '/'}, {name: 'Wishlist', link: '/wishlist'}],
    activeLink: '/wishlist'
  }

  const pharmacy = Object.values(wishlist.pharmacy);                                                               
  const pharmacyCartLength = pharmacy.length;
  let pharmacyItemsValue = pharmacy.map(i => i.SRate * i.Qty);
  let pharmacyCartTotal = pharmacyCartLength !== 0 ? pharmacyItemsValue.reduce((total, item) => total+item).toFixed(2) : '00';

  const labTests = Object.values(wishlist.labTests);                                                               
  const labTestsCartLength = labTests.length;
  let labTestsItemsValue = labTests.map(i => i.SRate * i.Qty);
  let labTestsCartTotal = labTestsCartLength !== 0 ? labTestsItemsValue.reduce((total, item) => total+item).toFixed(2) : '00';   

  return (
    <div id="cartPage">
      <BreadCrumb data={breadCrumbData}/>
      {(!pharmacyCartLength && !labTestsCartLength) ? <EmptyCart /> : ''}
      <div className="cartPageSection container-fluid content px-3 px-lg-5">    
        {pharmacyCartLength ? <div className="row gy-3">
          <div className="col col-12 col-lg-8">
            <div className="card border-0 w-100 h-100" style={{minHeight: '17.7rem'}}>
              <h3 className="card-header border-info bg-transparent">PHARMACY <span style={{fontSize: '0.7rem'}}>({pharmacyCartLength} Products)</span></h3>             
              <div className="card-body">
                <div className="cart-list-wrapper">
                  {pharmacy.map(i => <ConnectedWishlistCard item={i} key={i.LocationItemId} productType={'pharmacy'}/>)}
                </div>
              </div>
              <div className="card-footer border-info bg-transparent">Date: {getFormattedDate()}</div>
            </div>
          </div>
          <div className="col col-12 col-lg-4">
            <div className="card border-0 w-100 order-summary h-100" style={{minHeight: '17.7rem'}}>
              <h3 className="card-header border-info bg-transparent">Order Summary</h3>
              <div className="card-body">
                <div className='product-list'>
                  <ul>
                    {pharmacy.map(i => <li key={i.LocationItemId}><div>{i.Description}<i className='bx bx-x'></i>{i.Qty}</div> ₹ {(i.Qty*i.SRate).toFixed(2)}</li>)}
                  </ul>
                </div>
                <div className="checkout-details">
                  <div>
                    <h4 className="card-title">Cart Subtotal</h4>
                    <h5 className="card-text">₹ {pharmacyCartTotal}</h5>
                  </div>
                </div>
                <div className="btn-box mt-3" style={{fontSize: '1.7em'}}>
                    <Link to={'/cartPage'} className="btn btn-main add-wishlist-btn">CART</Link>
                    <Link to={'/checkout'} className="btn btn-main">CHECKOUT</Link>
                </div>
              </div>
              <div className="card-footer border-info bg-transparent">Created DD-MM-YYYY</div>
            </div>
          </div>
        </div> : ''}

        {labTestsCartLength ? <div className="row gy-3 mt-3">
          <div className="col col-12 col-lg-8">
            <div className="card border-0 w-100 h-100" style={{minHeight: '17.7rem'}}>
              <h3 className="card-header border-info bg-transparent">LAB TESTS <span style={{fontSize: '0.7rem'}}>({labTestsCartLength} Tests)</span></h3>             
              <div className="card-body">
                <div className="cart-list-wrapper">
                  {labTests.map(i => <ConnectedWishlistCard item={i} key={i.LocationItemId} productType={'labTests'}/>)}
                </div>
              </div>
              <div className="card-footer border-info bg-transparent">Date: {getFormattedDate()}</div>
            </div>
          </div>
          <div className="col col-12 col-lg-4">
            <div className="card border-0 w-100 order-summary h-100" style={{minHeight: '17.7rem'}}>
              <h3 className="card-header border-info bg-transparent">Order Summary</h3>
              <div className="card-body">
                <div className='product-list'>
                  <ul>
                    {labTests.map(i => <li key={i.LocationItemId}><div>{i.Description}<i className='bx bx-x'></i>{i.Qty}</div> ₹ {(i.Qty*i.SRate).toFixed(2)}</li>)}
                  </ul>
                </div>
                <div className="checkout-details">
                  <div>
                    <h4 className="card-title">Cart Subtotal</h4>
                    <h5 className="card-text">₹ {labTestsCartTotal}</h5>
                  </div>
                </div>
                <div className="btn-box mt-3" style={{fontSize: '1.7em'}}>
                    <Link to={'/cartPage'} style={{flex: 1}} className="btn btn-main add-wishlist-btn">CART</Link>
                </div>
              </div>
              <div className="card-footer border-info bg-transparent">Created DD-MM-YYYY</div>
            </div>
          </div>
        </div> : ''}
      </div>
      <div className="section-header text-center">
          <h2 style={{"borderBottom": "2px solid gray", "textTransform": "uppercase", "display": "inline", "letterSpacing": "3px"}}>Related Products</h2>
      </div>
    </div>
  )
}

const mapStateToPropsTwo = (state) => {
  return { wishlist: state.wishlist };
}

export default connect(mapStateToPropsTwo, {})(CartPage);


const EmptyCart = () => (
    <div className="container-fluid content emptyCart">
    <div className="row mx-md-4">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
          <h5 className="mb-0">Wishlist</h5>
          </div>
          <div className="card-body cart">
            <div className="col-sm-12 empty-cart-cls text-center">
              <img src="/img/emptyCart.png" width="130" height="130" className="img-fluid mb-4 mr-3" alt="empty_cart" style={{transform: 'translateX(-11px)'}}/>
              <h3><strong>Your Wishlist is Empty</strong></h3>
              <h4>Add something to make me happy :)</h4>
              <div className='d-flex gap-3 justify-content-center'>
                <Link to={'/cartPage'} className="btn btn-primary mt-3 py-2 checkout-btn" style={{flex: 1, maxWidth: '18rem', fontSize: '1.3em'}}>VISIT CART</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
