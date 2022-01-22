import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import appendScript from '../../utils/appendScript'
import removeScript from '../../utils/removeScript'
import OwlCarousel from 'react-owl-carousel2';
import $ from 'jquery';
import {lang} from '../../actions/language'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { IMAGE_URL } from '../../actions/constant';
import LoginModal from '../auth/LoginModal';
import Currency from '../common/Currency';
import {logoutUser} from '../../actions/authAction';


class Header extends Component {
  constructor(props){
    super(props)
    this.state={
        search:"",
        showMenu:false,
        showCart:false,
        showLogin:false,
        subCategoryList:[],
        subCategoryChildList:[],
        subCategoryID:"",

    }
    // this.wrapperRef = React.createRef();
    // this.handleClickOutside = this.handleClickOutside.bind(this);
}

componentWillReceiveProps(nextProps){
  if(nextProps.auth.isAuthenticated){
    this.setState({
                  showMenu:false,
                  showCart:false,
                  showLogin:false,
                })
  }
}


// componentDidMount() {
//   document.addEventListener('mousedown', this.handleClickOutside);
// }

// componentWillUnmount() {
//   document.removeEventListener('mousedown', this.handleClickOutside);
// }
  /**
     * Alert if clicked on outside of element
     */
// handleClickOutside(event) {
//       if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
//           this.setState({
//             showMenu:false,
//             showCart:false,
//             showLogin:false,
//           })
//   }
// }


handleClickCategory = (e,categoryID,sliderStyle) => {
  e.preventDefault();
  const {subcategory,subcategoryChild}=this.props;
  
  var subcategoryFilter=subcategory.filter(x=>x.categoryID === categoryID)
  if(subcategoryFilter.length===0)
        return;
  //GETTING SUBCATEGORY LIST
  var subcatgoryRender=subcategoryFilter.map(res=>{
            return <Link to="#" onClick={(e)=>this.handleClickCategoryChild(e,res._id,sliderStyle,categoryID)}>{res.subCategoryName}</Link>
  })
  //GETTING SUBCATEGORY CHILD LIST
  var subCategoryID=subcategoryFilter[0]._id;
  var subcategoryChildFilter=subcategoryChild.filter(x=>x.subcategoryID === subCategoryID)
  
  var subcatgorychildRender=subcategoryChildFilter.map(res=>{
    return  <Link to={`/preshop?subcategoryChildID=${res._id}&categoryID=${categoryID}&slider=${sliderStyle}`}>
                <img src={`${IMAGE_URL}${res.photoUrl}`} style={{width:195,height:126}} /> 
                {res.subCategoryChildName}
            </Link>
  })

  this.setState({
    showMenu:!this.state.showMenu,
    subCategoryList:subcatgoryRender,
    subCategoryChildList:subcatgorychildRender
  })
};

handleClickCategoryChild = (e,subCategoryID,sliderStyle,categoryID) => {
  e.preventDefault();
  const {subcategoryChild}=this.props;
  var subcategoryChildFilter=subcategoryChild.filter(x=>x.subcategoryID === subCategoryID)
  var subcatgorychildRender=subcategoryChildFilter.map(res=>{
    return  <Link to={`/preshop?subcategoryChildID=${res._id}&categoryID=${categoryID}&slider=${sliderStyle}`}>
                <img src={`${IMAGE_URL}${res.photoUrl}`} style={{width:195,height:126}} /> 
                {res.subCategoryChildName}
            </Link>
  })
  this.setState({
    subCategoryChildList:subcatgorychildRender
  })

};

onLogout(e){
  e.preventDefault();
this.props.logoutUser()
}


render() {

      const {category,logoUrl,headerClass}=this.props;
      const {cart}=this.props;

      var totalCost = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
      const {subCategoryList,subCategoryChildList} =this.state;
      const {isAuthenticated}=this.props.auth;

      var categoryRender=category.map(result=>{
        if(result.dropdown ==='Yes'){
          return <li className="mega-menu active"><Link to="#" onClick={(e)=>this.handleClickCategory(e,result._id,result.sliderStyle)}>{result.categoryName}</Link>
        </li>
        }else{
              return  <li><Link to={`/shop?categoryID=${result._id}&slider=${result.sliderStyle}`}>{result.categoryName}</Link></li>
        } 
      })
      
        return (
          <React.Fragment>
         
          <header ref={this.wrapperRef} id="header" className={`${this.props.headerClass}`}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 d-flex align-items-center justify-content-between">
              <h1 className="logo"><Link to="/"><img src={`${IMAGE_URL}${logoUrl}`} /></Link></h1>
              <nav className="nav-menu d-none d-lg-block">
                <ul>
                    {categoryRender}
                  <li><Link to="/support">SUPPORT</Link></li>
                </ul>
              </nav>
              {/* <div class="cart_column">
                <a href="#" data-modal="myModal1" class="get-started-btn scrollto popUpBtn">SIGN IN</a>
              <a data-modal="myModal2" href="#" class="cart scrollto popUpBtn"><i class="fas fa-shopping-cart"></i></a>
              </div> */}
              {/* .nav-menu */}
              {isAuthenticated && <div class="get-started-btn scrollto">
  <button class="btn btna-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Account
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <Link class="dropdown-item" to="/account">Profile</Link>
    <Link class="dropdown-item" to="/order">Orders</Link>
    <Link class="dropdown-item" to="javascript:void(0);" onClick={(e)=>this.onLogout(e)}>Logout</Link>
  </div>
</div>}
              <div className="btn-s">
              {!isAuthenticated && 
              //<Link to="/login" className="get-started-btn scrollto">SIGN IN</Link>
              <Link to="#" 
                  onClick={(e)=>{
                    e.preventDefault();
                   this.setState({
                     showLogin:true,
                     showCart:false
                   })
                  }} 
                className="get-started-btn scrollto"
              > SIGN IN </Link>
              }

              
              {/* <Link to="/cart" className="cart scrollto"><i className="fas fa-shopping-cart" /></Link>  */}
              <Link to="#" 
                  onClick={(e)=>{
                    e.preventDefault();
                   this.setState({
                     showLogin:false,
                     showCart:true
                   })
                  }}  className="cart scrollto"><i className="fas fa-shopping-cart" /></Link> 
              
              </div>
            </div>
          </div>
        </div>
        {this.state.showMenu &&<div className="sub-menu-block">
        <div class="row">
          <div class="col-md-2 col-lg-2 col-sm-2">
              <div className="sub-menu-lists">
                {subCategoryList}
              </div>
          </div>
          <div class="col-md-10 col-lg-10 col-sm-10">
            <ul class="sub-menu-img">
              {subCategoryChildList}
         </ul>
         </div>
        </div>
      </div>}
      
       
      </header>
      {/* The Modal1 */}
      {this.state.showLogin && <LoginModal/>}
         {/* The Modal2 */}
         {this.state.showCart && <div id="myModal2" className="modal-div btn-s d-block">
          {/* Modal content */}
          <div className="top-al-cart">
            <img className="cart-up-arw" src="assets/img/icon/up.png" alt="img" />
            <div className="cart-modal">
              <div className="clearfix">
                <ul className="firstli">
                  {cart .length >0 ? cart.map(result=>{ 
                    return  <li><img src={`${IMAGE_URL}${result.image}`} />
                    <div className="ti-pr">
                      <h4>{result.name}</h4>
                      <h5><Currency/> {result.price * result.quantity}</h5>
                    </div>
                  </li>
                  }) : <h4>No Products Added</h4>}
                 
                 
                </ul>
                <div className="line" />
                {/* total */}
                <ul className="total">
                  <li>
                    <h5>Total</h5>
                  </li>
                  <li>
                    <h3><Currency/> {totalCost}</h3>
                  </li>
                  {totalCost >0 && <li><Link to="/cart">VIEW CART</Link></li>}
                </ul>
              </div>
            </div>
          </div>
        </div>}
          </React.Fragment>
           )}
}
Header.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
  logoutUser:PropTypes.func.isRequired,
}
Header.defaultProps={
    currency:'$',
    category:[],
    logoUrl:'',
    subcategory:[],
    headerClass:"fixed-top1"
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cart:state.cart,
  wishlist:state.wishlist,
})

export default connect(mapStateToProps,{logoutUser})(withRouter(Header));
