import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Spinner from '../common/Spinner';
import {lang} from '../../actions/language';
import swal from 'sweetalert2';
import Axios from 'axios';
import {IMAGE_URL,API_URL,} from '../../actions/constant';
import {addToCart,getCart,removeFromCart,loadCart} from '../../actions/cartAction';
import Suggest from '../shop/Suggest';
import Currency from '../common/Currency';
const queryString = require('query-string');
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });


class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
          shippingAmount:0,
          shipmentID:"",
          couponID:"",
          couponValue:0,
          couponCode:"",
          couponType:"",
          viewCheckoutPage:false,
          orderType:"Normal",
          billingAddress:{},
          shippingAddress:{},
          paymentMethod:'COD',
          open:false,
          productData:{},
          isLoading:false
        }
        this.onValidateCoupon=this.onValidateCoupon.bind(this);
       
        this.onChange=this.onChange.bind(this);
  
      }
      componentDidMount(){
     
        const {isAuthenticated}=this.props.auth;
        if(!isAuthenticated){
          this.props.history.push("/login?redirect=cart")
        }
        if(localStorage.billingAddress){
          this.setState({
            billingAddress:JSON.parse(localStorage.billingAddress)
          })
        }
        if(localStorage.shippingAddress){
          this.setState({
            shippingAddress:JSON.parse(localStorage.shippingAddress)
          })
        }
      }
      decreaseQuantity = (productData) => {
          if(productData.quantity <= 1) {
              return;
          } else {
              var tempQty=productData.quantity - 1;
              productData.quantity=tempQty
              this.addToCart(productData)
          }
      }
      increaseQuantitiy =async (productData) => {
          var tempQty=productData.quantity - 1 + 2;
          productData.quantity=tempQty;
          this.addToCart(productData);        
      }
      componentWillReceiveProps(nextProps){
        if(nextProps.cart !== this.props.cart){
          localStorage.setItem("cart",JSON.stringify(nextProps.cart))
        }
      }

    removeItem(item) {
        this.props.removeFromCart(item);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    addToCart(product) {
        // var currentPrice=0;
        // if(product.discountType==="amount"){
        //   currentPrice=parseInt(product.price)-parseInt(product.discountPrice)
        // }else if(product.discountType==="percent"){
        //   currentPrice=Math.round(product.price - (product.price/parseInt(product.discountPrice))).toFixed(2)
        // }
        const cartItem = {
          "id": product.id,
          "image": product.image,
          "name": product.name,
          "categoryID": product.categoryID,
          "quantity": product.quantity,
          "price": product.price,
          "selectedAttribute": product.selectedAttribute
      }
            this.props.addToCart(cartItem);
           
        }
  
        onValidateCoupon(e){
          e.preventDefault();
          Axios.post(API_URL+'/api/coupon/validate',{couponCode:this.state.couponCode})
          .then(result=>{
            console.log("result",result.data)
            var tempData=result.data;
            this.setState({
              couponID:tempData._id,
              couponValue:tempData.value,
              couponType:tempData.type
            })
            Toast.fire({
              type: 'success',
              title: 'Coupon Applied Successfully',
            })
  
          })
          .catch(err=>{
            var errorData=err.response.data;
            Toast.fire({
              type: 'error',
              title:errorData.error,
              
            })
          })
        }

        increaseQuantitiy =async (productData) => {
         
            var tempQty=productData.quantity - 1 + 2;
    
          //  var productDetail= await Axios.post(API_URL+'/api/product/maxstock',{productID:productData.id,selectedSize:productData.selectedSize,selectedColor:productData.selectedColor})
          //  if(parseInt(productDetail.data.selectedStock) > parseInt(tempQty)){
              productData.quantity=tempQty
              this.addToCart(productData)
            // }else{
            //   Toast.fire({
            //     type: 'error',
            //     title: 'Maximum Quantity Reached',
            //     position:'top-right'
            //   })
            // }
           
        }
        decreaseQuantity = (productData) => {
          if(productData.quantity <= 1) {
              return;
          } else {
              var tempQty=productData.quantity - 1;
              productData.quantity=tempQty
              this.addToCart(productData)
          }
      }
    render() {
        const {listhome,homeloading}=this.props.home;
        const {cart}=this.props;
        const {billingAddress,shippingAddress} =this.state;
        var totalCost = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
        var cartContent;
        var productList;
        if(cart.length>0){
            productList=cart.map(result=>{
                return <li>{result.name} <span className="pat_lst_hyg">{result.quantity} * {listhome && listhome.setting.currency} {result.price}</span></li>
            })
            
            cartContent=cart.map(result=>{
                return <div className="row prd_det">
                <div className="col-lg-4">
                  <div className="cart_img">
                    <img src={`${IMAGE_URL}${result.image}`} />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="cart_cnd">
                    <h6>{result.name}</h6>
                    <div className="cart_det_list">
                      <ul>
                        {result.selectedAttribute.map(res=>{
                          return  <li>{res.key} - {res.value} {parseFloat(res.price) > 0 && `[+ $ ${res.price}]` } </li>
                        })}
                  
                      </ul>
                      <Link to={`/productdetail?productID=${result.id}&edit=true`}  className="edit_btn">edit</Link>
                      
                    </div>
                  </div>
                  <div className="cart_itemcount">
                    <ul>
                      <li onClick={()=>this.decreaseQuantity(result)}><i className="fa fa-minus" aria-hidden="true" /></li>
                      <li><input value={result.quantity} type="number" id="quantity" name="quantity" min={1} /> </li>
                      <li onClick={()=>this.increaseQuantitiy(result)}><i className="fa fa-plus" aria-hidden="true" /></li>
                      <li className="cart_itemcount_total"><Currency/> {parseFloat(result.quantity) * parseFloat(result.price)}</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="cart_remove_btn">
                    <Link to="#" onClick={(e) =>{
                      e.preventDefault();
                      this.removeItem(result)
                    }}>Remove</Link>
                  </div>
                </div>
              </div>
            })
        }else{
            productList=(<li>No Products Added in Cart</li>)
            cartContent=(<h3 className="text-center text-dark">No Products Added in Cart</h3>)
              
           
        }
        return (
            <div>
                 {!homeloading  ?<React.Fragment>
                <Header 
                    category={listhome.category} 
                    subcategory={listhome.subcategory}
                    subcategoryChild={listhome.subcategoryChild}
                    logoUrl={listhome.setting.logoUrl}
                    headerClass={"fixed-top1"}
                />
                <main id="market">
                <section className="cart-itm">
        <div className="container_def">
          <div className="row">
            <div className="col-lg-8">
              <div className="tabset">
                {/* Tab 1 */}
                <input type="radio" name="tabset" id="tab1" aria-controls="marzen" defaultChecked />
                <label htmlFor="tab1 " className="aftr_stl active"><i className="fa fa-shopping-bag" aria-hidden="true" /></label>
                {/* Tab 2 */}
                <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
                <label htmlFor="tab2 " className="aftr_stl"><i className="fa fa-ship" aria-hidden="true" /></label>
                {/* Tab 3 */}
                <input type="radio" name="tabset" id="tab3" aria-controls="dunkles" />
                <label htmlFor="tab3 "><i className="fa fa-credit-card" aria-hidden="true" /></label>
                <Link className="bg_shp_btn" to="/">Go back to shopping</Link>
                <div className="tab-panels">
                  <section id="marzen" className="tab-panel tab_cnt">
                    <div className="cart_det">
                      <h2>Cart {cart.length>0 && (cart.length) }</h2>
                      
                      {cartContent}
                    </div>
                  </section>
                  
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart_det_pag row">
                <div className="col-lg-12">
                  <div className="pat_method">
                    <ul>
                      <li><img src="assets/img/payment/1.png" /></li>
                      <li><img src="assets/img/payment/2.png" /></li>
                      <li><img src="assets/img/payment/3.png" /></li>
                    </ul>
                  </div>
                  <div className="pat_lst">
                    <ul>
                      {productList}
                      
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="total_pay">
                    <p>Shipping options will be updated during checkout.</p>
                    <div className="row">
                      <div className="col-lg-6 col-sm-6 col-xl-6 col-md-6 phn_res">
                        <h2>Total</h2>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-xl-6 col-md-6 lft_al phn_res">
                        <h2>{listhome && listhome.setting.currency} {totalCost}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                {cart.length >0 && <div className="col-lg-12">
                  <Link to="/checkout" className="process_pay_btn">Proceed to Shipping</Link>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
     <Suggest/>
                </main>
                <Footer 
                  footerText={listhome.setting.footerText} 
                  contactText={listhome.setting.contactText} 
                  applicationName={listhome.setting.applicationName}
                  applicationEmail={listhome.setting.applicationEmail}
                  contactNo={listhome.setting.contactNo}
                  socialLinksList={JSON.parse(listhome.setting.socialLinksList)}
                  footer1={listhome.footer1}
                  footer2={listhome.footer2}
                />
                </React.Fragment>
                : <Spinner/>}
            </div>
        )
    }
}
Cart.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home,
    cart:state.cart,
})
  
export default connect(mapStateToProps,{addToCart,getCart,removeFromCart,loadCart})(withRouter(Cart));
