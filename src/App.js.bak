import React, { Component, Suspense, lazy } from 'react';
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom'; 
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authAction';
import {listHome} from './actions/homeAction';
import {loadCart} from './actions/cartAction';
import {loadWishlist} from './actions/wishlistAction';
import PrivateRoute from './components/common/PrivateRoute'
import {Provider} from 'react-redux';
import store from './store';
import Spinner from './components/common/Spinner';
import {lang}  from './actions/language';
import './App.css';
import ScrollToTop from './utils/ScrollToTop';
import SupportPage from './components/layouts/SupportPage';
import Acoustic101 from './components/layouts/Acoustic101';
import Faq from './components/layouts/Faq';
import WhyOvertone from './components/layouts/WhyOvertone';
// import Register from './components/auth/Register';
// import Forgot from './components/auth/Forgot';
// import Account from './components/account/Account';

//Landing page
const Landing = React.lazy(() => import('./components/layouts/Landing'));

//Product Page
const Product = React.lazy(() => import('./components/shop/Product'));

const PreProduct = React.lazy(() => import('./components/shop/PreProduct'));


const ProductDetail = React.lazy(() => import('./components/shop/ProductDetail'));

const Login = React.lazy(() => import('./components/auth/Login'));

const Cart = React.lazy(() => import('./components/cart/Cart'));

const Checkout = React.lazy(() => import('./components/checkout/Checkout'));

const Register = React.lazy(() => import('./components/auth/Register'));

const Forgot = React.lazy(() => import('./components/auth/Forgot'));

const Account = React.lazy(() => import('./components/account/Account'));

const Order = React.lazy(() => import('./components/account/Order'));

const ViewOrder = React.lazy(() => import('./components/account/ViewOrder'));

const PreProductAcquestics = React.lazy(() => import('./components/shop/Acquestics/PreProduct'));


const ProductAcquestics = React.lazy(() => import('./components/shop/Acquestics/Product'));


const OrderConfirmation= React.lazy(() => import('./components/checkout/OrderConfirmation'));

const CaseStudyDetail= React.lazy(() => import('./components/layouts/CaseStudyDetail'));









//Check for Token
if(localStorage.jwtToken){
  //Set Auth Token header Auth
  setAuthToken(localStorage.jwtToken);
  //Decode Token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //Logout user
    store.dispatch(logoutUser());
   //ToDO : clear current profile
    //Redirect to Login page
    window.location.href = '/login';
  }

}


store.dispatch(listHome());

if(localStorage.cart){
		var initalCart=JSON.parse(localStorage.cart);
		store.dispatch(loadCart(initalCart));

}

if(localStorage.wishlist){
  var initalWishlist=JSON.parse(localStorage.wishlist);
  store.dispatch(loadWishlist(initalWishlist));

}

class App extends Component {

render() {
    return (
      <Provider store={store}>
        <Suspense fallback={<Spinner />}>
        <Router 
            exact 
            path="/"
            // forceRefresh={true}
        >
        <div> 
        <ScrollToTop>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/shop" component={Product}/>
          <Route exact path="/productdetail" component={ProductDetail}/>
          <Route exact  path="/login" component={Login}/> 
          <Route exact  path="/register" component={Register}/> 
          <Route exact  path="/forgot" component={Forgot}/> 
          <Route exact  path="/preshop" component={PreProduct}/> 
          <Route exact  path="/acquesticspreshop" component={PreProductAcquestics}/> 
          <Route exact  path="/acquesticshop" component={ProductAcquestics}/> 
          <Route exact  path="/support" component={SupportPage}/>
          <Route exact  path="/acoustic101" component={Acoustic101}/> 
          <Route exact  path="/faq" component={Faq}/> 
          <Route exact  path="/blogdetail" component={CaseStudyDetail}/> 
          <Route exact  path="/whyovertone" component={WhyOvertone}/> 








          
          <Switch>
            <Route exact path="/cart" component={Cart}/> 
            {/* <Route exact path='/cart/:id' component={TempCart} /> */}
            <PrivateRoute exact path="/checkout" component={Checkout}/> 
            <PrivateRoute  path="/account" component={Account}/>
            <PrivateRoute  path="/order" component={Order}/> 
            <PrivateRoute  path="/vieworder" component={ViewOrder}/> 
            <PrivateRoute exact  path="/orderconfirmation" component={OrderConfirmation}/> 

          </Switch>
        </ScrollToTop>
        </div>
      </Router>
      </Suspense>
      </Provider>
    );
  }
}



export default App;
