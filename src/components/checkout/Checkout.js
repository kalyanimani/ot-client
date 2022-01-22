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
import {listShipping} from '../../actions/shippingAction';
import StripeCheckout from 'react-stripe-checkout';
import Suggest from '../shop/Suggest';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PaypalExpressBtn from 'react-paypal-express-checkout';
const queryString = require('query-string');
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });


class Checkout extends Component {
    constructor(props){
        super(props);
        this.state={
          shippingAmount:0,
          shipmentID:"",
          couponID:"",
          couponValue:0,
          couponCode:"",
          couponType:"",
          viewPaymentPage:false,
          orderType:"Normal",
          shippingName:"",
          billingAddress:{},
          shippingAddress:{},
          paymentMethod:'STRIPE',
          open:false,
          productData:{},
          isLoading:false,
          shippingContentData:[],
          sameas:false,
          suggestedProduct:[],
          shipLoading:false
        }
        this.onValidateCoupon=this.onValidateCoupon.bind(this);
        this.onSubmitShipping =this.onSubmitShipping.bind(this);
        this.onChange=this.onChange.bind(this);
        this.StripeCheckout = React.createRef();
  
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
        this.props.listShipping();
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
            "image": product.photoUrl1,
            "name": product.name,
            "quantity": product.quantity,
            "categoryID": product.categoryID,
            "price":product.price,
            "selectedColor":product.selectedColor,
            "selectedSize":product.selectedSize,
            "orderType":product.orderType,
            "giftRapping":product.giftRapping,
            
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

        onClickShippingDaata(shipment,amt,name,totalAmount){
          console.log("emeter ",amt.orderNo);
        
          var weight1 = {
            value: 3,
            units: 'ounces',
           
            
         }
          let theArray =[];
  
          // eslint-disable-next-line no-lone-blocks
          {this.props.cart.map(function(_cartItem, _index){
            var sku 
            if(_cartItem.name.includes('Overtone Acoustic Panel'))
            sku = _cartItem.selectedAttribute.reduce((acc, curr) => `OAP-${acc}${curr.value}-`, "")
           else
            sku = _cartItem.selectedAttribute.reduce((acc, curr) => `ART-${acc}${curr.value}-`, "")
           
            console.log("sku ",sku);
            var cartmodel = {
              lineItemKey: _cartItem.id,
              sku: sku,
              name: _cartItem.name,
              weight:weight1,
              quantity: _cartItem.quantity,
              unitPrice:_cartItem.price
            
              
  
             
              
           }
           theArray.push(cartmodel);
          })}
          
  
          let newDate = new Date()
  
  
          var billingaddress = {
            name: this.state.billingAddress.firstName,
             company: this.state.billingAddress.firstName,
             street1: this.state.billingAddress.address,
             street2: null,
              street3: null,
              city: this.state.billingAddress.region,
             state: this.state.billingAddress.state,
             postalCode:this.state.billingAddress.zip,
             country: 'US',
             phone: this.state.billingAddress.phone,
                 residential: null,
                 addressVerified: null
             }
             
             var shipTo = {
             name: this.state.shippingAddress.firstName,
             company: this.state.shippingAddress.firstName,
             street1: this.state.shippingAddress.address,
             street2: null,
              street3: null,
              city: this.state.billingAddress.region,
             state: this.state.shippingAddress.state,
             postalCode:this.state.shippingAddress.zip,
             country: 'US',
             phone: this.state.shippingAddress.phone,
                 residential: false,
                 addressVerified: 'Address validated successfully'
             }
                var orderShipped = {
                      orderNumber:  amt.orderNo,
                      orderKey:  this.state.paymentID,
                      orderDate: newDate,
                      createDate: newDate,
                      modifyDate: newDate,
                      paymentDate: newDate,
                      shipByDate:newDate,
                      orderStatus: "awaiting_shipment",
                      customerId: null,
                      customerUsername: this.state.shippingAddress.email,
                      customerEmail:this.state.shippingAddress.email,
                      billTo:billingaddress,
                      shipTo:shipTo,
                      amountPaid:totalAmount,
                      shippingAmount:this.state.shippingAmount,
                      customerNotes: 'Please ship as soon as possible!',
                      internalNotes: 'Customer called and would like to upgrade shipping',
                      paymentMethod: this.state.paymentMethod,
                      requestedShippingService: "Priority Mail",
                      carrierCode: 'ups',
                      serviceCode: 'ups_next_day_air_early_am',
                      orderTotal:totalAmount,
                      packageCode: 'package',
                      confirmation: 'delivery',
                      items:theArray
             }
  
                var shipstationAPI = require('node-shipstation');
                var shipstation = new shipstationAPI(
                  'ab82e2145d6141c7ac9a9aba4cb22086',
                  'a2dc0e31344c4282932ea27e5253bd19');    
                const myObjStr = JSON.stringify(orderShipped);
    
              shipstation.addOrder(orderShipped, function(err, res, body){
                if(err) throw err;
                          console.log('Got order');
                          console.log(body);
                        });
                  
                      
              }

      handleChange(value) {
        
        console.log("data called",value)
    }

            onClickShippingGet(shipment,amt,name){

       this.setState({
        shipLoading:true
       })
              var shipstationAPI = require('node-shipstation');
              var shipstation = new shipstationAPI(
                'ab82e2145d6141c7ac9a9aba4cb22086',
                'a2dc0e31344c4282932ea27e5253bd19');

                  // var weight1 = {
                  //   value: 3,
                  //   units: 'ounces',
                  //   street1: '1600 PENNSYLVANIA AVE NW'
                  // }
                  // var orderShipped = {
                  //   carrierCode: 'ups',
                  //   serviceCode: null,
                  //   packageCode: null,
                  //   fromPostalCode: '78703',
                  //   toState: 'DC',
                  //   toCountry: 'US',
                  //   toPostalCode:shipment,
                  //   toCity: 'Washington',
                  //   weight: weight1
                  // }
                  var weight1 = {
                    value: 3,
                    units: 'ounces'
                  }
                  var orderShipped = {
                    carrierCode: 'ups',
                   
                    fromPostalCode: '32804',
                  
                    toCountry: 'US',
                    toPostalCode:shipment,
                   
                    weight: weight1
                  }
                  console.log(orderShipped);
                  const myObjStr = JSON.stringify(orderShipped);
                  console.log(myObjStr);
                  var self=this;
                  shipstation.getShippingRates(orderShipped, function(err, res, body){
                  if(err) throw err;

                  self.setState({
                    shippingContentData:body,
                    shipLoading:false
                  })
                });
              this.setState({
                    shipmentID:shipment,
                    shippingAmount:parseFloat(amt),
                    shippingName:name
                  })

        
  }

      onClickShipping(shipment,amt,name){
          console.log("data called")
          this.setState({
            shipmentID:shipment,
            shippingAmount:parseFloat(amt),
            shippingName:name
          })
      }

      onSubmitShipping(e){
        e.preventDefault();
        if(this.state.shipmentID===""){
          Toast.fire({
            type: 'error',
            title: 'Select Shipment',
            position:"bottom"
          })
          return
        }
        this.setState({viewPaymentPage:true})

      }

      onChangeAddress(e,type){
                var temp=this.state.billingAddress;
                var value=e.target.value
                var name=e.target.name
        
                if(type==='shipping'){
                  temp=this.state.shippingAddress;
                }
                temp[name]=value;
                if(type==='shipping'){
                  if(name==='zip')
                  {
                     if(value.length===5)
                     {
                       this.onClickShippingGet(value,1,2)
                      console.log("trigger data called",name)
                     }
                  }
                  this.setState({
                    shippingAddress:temp
                  })
                }  else if(type==='billing'){
                  this.setState({
                    billingAddress:temp
                  })
                }
                
      }
      
      onOrderSubmit(couponAmount,totalAmount,finalAmount,giftAmount){
     
        var weight1 = {
          value: 3,
          units: 'ounces',
         
          
       }
        let theArray =[];

        // eslint-disable-next-line no-lone-blocks
        {this.props.cart.map(function(_cartItem, _index){
        
          var cartmodel = {
            lineItemKey: _cartItem.id,
            sku: _cartItem.id,
            name: _cartItem.name,
            weight:weight1,
            quantity: _cartItem.quantity,
            unitPrice:_cartItem.price
          
            

           
            
         }
         theArray.push(cartmodel);
        })}
        

        let newDate = new Date()


        var billingaddress = {
          name: this.state.shippingAddress.firstName,
           company: this.state.shippingAddress.firstName,
           street1: this.state.shippingAddress.address,
           street2: null,
            street3: null,
            city: 'WASHINGTON',
           state: this.state.shippingAddress.state,
           postalCode:this.state.shippingAddress.zip,
           country: 'US',
           phone: this.state.shippingAddress.phone,
               residential: null,
               addressVerified: null
           }
           
           var shipTo = {
           name: this.state.shippingAddress.firstName,
           company: this.state.shippingAddress.firstName,
           street1: this.state.shippingAddress.address,
           street2: null,
            street3: null,
            city:'Santa Ana',
           state: this.state.shippingAddress.state,
           postalCode:this.state.shippingAddress.zip,
           country: 'US',
           phone: this.state.shippingAddress.phone,
               residential: false,
               addressVerified: 'Address validated successfully'
           }
                 var orderShipped = {
           
           orderNumber:  this.state.paymentID,
           orderKey:  this.state.paymentID,
           orderDate: newDate,
           createDate: newDate,
           modifyDate: newDate,
           paymentDate: newDate,
           shipByDate:newDate,
           orderStatus: "awaiting_shipment",
           customerId: null,
           customerUsername: this.state.shippingAddress.email,
           customerEmail:this.state.shippingAddress.email,
           billTo:billingaddress,
           shipTo:shipTo,
           amountPaid:totalAmount,
           shippingAmount:this.state.shippingAmount,
           customerNotes: 'Please ship as soon as possible!',
           internalNotes: 'Customer called and would like to upgrade shipping',
           paymentMethod: this.state.paymentMethod,
           requestedShippingService: "Priority Mail",
           carrierCode: 'ups',
           serviceCode: 'ups_next_day_air_early_am',
           orderTotal:totalAmount,
   packageCode: 'package',
   confirmation: 'delivery',
   items:theArray
   
           }


        const {cart}=this.props;
        const {billingAddress}=this.state;
        const {user}=this.props.auth;
        const {listshipping,shippingloading}=this.props.shipping;

        localStorage.setItem("billingAddress",JSON.stringify(this.state.billingAddress));
        localStorage.setItem("shippingAddress",JSON.stringify(this.state.shippingAddress));
        const data={
          orderType:this.state.orderType,
          //shippingID:this.state.shipmentID,
          shippingID:listshipping[0]._id,
          shippingAmount:this.state.shippingAmount,
          couponCode:this.state.couponCode,
          couponAmount:couponAmount,
          giftAmount:giftAmount,
          totalAmount:totalAmount,
          finalAmount:finalAmount,
          cart:cart,
          shippingAddress:this.state.shippingAddress,
          billingAddress:this.state.billingAddress,
          paymentMethod:this.state.paymentMethod,
          paymentID:this.state.paymentID
        }
      
  
          Axios.post(API_URL+`/api/order/`,data)
          .then(result=>{
              console.log("result Order",cart)
              console.log("result Order",result.data)

              localStorage.removeItem("cart")
              localStorage.setItem("cartDisplay",JSON.stringify(cart))
              localStorage.setItem("orderInfo",JSON.stringify(result.data))
              localStorage.setItem("paymentMethod",this.state.paymentMethod)
              this.onClickShippingDaata(orderShipped,result.data,this.state,totalAmount)
              
              this.props.loadCart([]);
              Toast.fire({
                type: 'success',
                title: 'Order Placed Successfully',
              }).then(result=>{

                this.props.history.push('/orderconfirmation')
               
              })
          })
          .catch(err=>{
            console.log("err Order",err)
          })
       
      }

      onToken = (amount, description,couponAmount,totalAmount,finalAmount,giftAmount) => (token) => {
      

        Axios.post(API_URL+'/api/order/stripe-checkout',{
          description,
          source: token.id,
          currency: "USD",
          amount: amount
        })
        .then(result=>{
          var temp=result.data;
          this.setState({
            paymentID:temp.id,
            paymentMethod:"STRIPE"
          },()=>{
            this.onOrderSubmit(couponAmount,totalAmount,finalAmount,giftAmount)
          })

        })
        .catch(err=>{
            Toast.fire({
              type: 'error',
              title: 'Error Occured Try Again!!',
            })
        })
        

      }

      select(value,name,type) {
        var temp=this.state.billingAddress;
       // var value=e.target.value
        // var name=e.target.name

        if(type==='shipping'){
          temp=this.state.shippingAddress;
        }
        temp[name]=value;
        if(type==='shipping'){
          this.setState({
            shippingAddress:temp
          })
        }else{
          this.setState({
            billingAddress:temp
          })
        }
      }

      //Paypal Response
      onSuccess = (payment,couponAmount,totalCost,finalCost,giftcost) => {
                  console.log("The payment was succeeded!", payment);
                  this.setState({
                    paymentID:payment.paymentID,
                    paymentMethod:"PAYPAL"
                  },()=>{
                    this.onOrderSubmit(couponAmount,totalCost,finalCost,giftcost)
                  })
            // this.onOrderSubmit(couponAmount,totalAmount,finalAmount,giftAmount)

      }

      onCancel = (data) => {
              console.log('The payment was cancelled!', data);
      }

      onError = (err) => {      
              console.log("Error!", err);
      }

      sameasBilling(event){
        const target = event.target;
        if(target.checked){
          var temp=this.state.billingAddress;
          this.setState({
            shippingAddress:temp,
            sameas:target.checked
          },()=>{
            var zipCodeTemp=this.state.shippingAddress.zip; 
            if(zipCodeTemp.length===5)
            {
              this.onClickShippingGet(zipCodeTemp,1,2)
              console.log("trigger data called Same as")
            }
                  
          })
        }else{
          this.setState({
            shippingAddress:{},
            sameas:target.checked
          })
        }
      }
    
      
    render() {
    
        const {listhome,homeloading}=this.props.home;
        const {cart}=this.props;
        const {user} = this.props.auth;
        const {billingAddress,shippingAddress} =this.state;

        var couponAmount=0;
        var cartCost = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
        var totalCost = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)+this.state.shippingAmount
        var finalCost=parseFloat(totalCost) -parseInt(couponAmount)

        var giftcost=0;
        var cartContent;

        const client = {
          sandbox:    'ATbee3pCiRxTWxEBa-18lzzBx-9G_bWX9N6RzVhbJdq2DQs-07r_DQc_egYPea2w8gSGcWVp9L2ev3WP',
          production: 'YOUR-PRODUCTION-APP-ID',
      }
      console.log(cart);
        if(cart.length>0){
            cartContent=cart.map(result=>{
              var sku;
              if(result.name.includes('Overtone Acoustic Panel'))
               sku = result.selectedAttribute.reduce((acc, curr) => `OAP-${acc}${curr.value}-`, "")
              else
               sku = result.selectedAttribute.reduce((acc, curr) => `ART-${acc}${curr.value}-`, "")
                return <div className="col-lg-12">
                <div className="total_pay shi_con">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="shi_img">
                      <img src={`${IMAGE_URL}${result.image}`} />
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <div className="row">
                        <div className="col-lg-12 hy_hed">
                          <p>{result.name}</p>
                        </div>
                        <div className="col-lg-6 lft_al">
                        </div>
                        <div className="col-lg-6 lft_al">
                          <h2>{listhome && listhome.setting.currency} {result.price}</h2>
                        </div>
                        <div className="col-lg-6 lft_al">
                          <p>Quantity:<span className="hy_tx">{result.quantity}</span></p>
                        </div>
                        
                        <div className="col-lg-6 lft_al">
                      
                          <p>Sku:<span className="hy_tx">{sku.replace(/-\s*$/, "")}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            })
        }else{
            cartContent=(<h3 className="text-center text-dark">No Products Added in Cart</h3>)
        }

        //GET SHIPPING DETAILS
        const {listshipping,shippingloading}=this.props.shipping;
        var shippingContent;
        // if(listshipping && listshipping.length>0){
        //   shippingContent= listshipping.map(result=>{
        //     var bgColor;
        //     if(this.state.shipmentID === result._id)
        //         bgColor="#ff0084"
        //         return  <div className="col-lg-4" onClick={()=>this.onClickShipping(result._id,result.amount,result.shippingName)}>
        //         <div className="free_ship_card" style={{backgroundColor:bgColor}}>
                 
        //           <div className="free_ship_hd">
        //             <h2>{result.shippingName}</h2>
        //           </div>
        //           <div className="free_ship_amt">
        //             <h2 className="flot_lf">{listhome && listhome.setting.currency} {result.amount}</h2>
        //           </div>
        //           <p>
        //           {result.shippingDesc}
        //           </p>
        //         </div>
        //       </div>
        //   })
        // }
          if(this.state.shippingContentData && this.state.shippingContentData.length>0){
          shippingContent= this.state.shippingContentData.map((result,index)=>{
            var bgColor;
            if(this.state.shipmentID === index)
                bgColor="#ff0084"
                return  <div className="col-lg-4 mt-2" onClick={()=>this.onClickShipping(index,result.shipmentCost,result.serviceName)}>
                <div className="free_ship_card" style={{backgroundColor:bgColor}}>
                 
                  <div className="free_ship_hd">
                    <h2>{result.serviceName}</h2>
                  </div>
                  <div className="free_ship_amt">
                    <h2 className="flot_lf">{listhome && listhome.setting.currency} {result.shipmentCost}</h2>
                  </div>
                  <p>
                  {result.shippingDesc}
                  </p>
                </div>
              </div>
          })
        }

        const shippingPage=(<React.Fragment>
          {/* Tab 1 */}
          <input type="radio" name="tabset" id="tab1" aria-controls="marzen" defaultChecked />
                <label htmlFor="tab1 " className="aftr_stl "><i className="fa fa-shopping-bag" aria-hidden="true" /></label>
                {/* Tab 2 */}
                <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
                <label htmlFor="tab2 " className="aftr_stl active"><i className="fa fa-ship" aria-hidden="true" /></label>
                {/* Tab 3 */}
                <input type="radio" name="tabset" id="tab3" aria-controls="dunkles" />
                <label htmlFor="tab3 "><i className="fa fa-credit-card" aria-hidden="true" /></label>
                <Link className="bg_shp_btn" to="/cart">Go back to shopping</Link>
                <div className="tab-panels">
        <section id="marzen" className="tab-panel tab_cnt">
        <form onSubmit={this.onSubmitShipping}>
          <div className="cart_det">
          
            <div className="prd_det">
        
            <h2>Billing Info</h2>
            <div className="row form-group">
                <div className="col-lg-6">
                  <input  
                    type="text"
                    id="inputCity" 
                    required 
                    className="form-control" 
                    placeholder="First Name *"  
                    name="firstName" 
                    onChange={(e)=>this.onChangeAddress(e,"billing")} 
                    value={billingAddress.firstName} 
                    maxlength={15}
                    pattern="[a-zA-Z]+" 
                    title="First Name Must be an Alphabet"
                   

                   />
                </div>
                <div className="col-lg-6">
                  <input  
                    type="text"
                    id="inputCity" 
                    required 
                    className="form-control" 
                    placeholder="Last Name *"  
                    name="lastName" 
                    onChange={(e)=>this.onChangeAddress(e,"billing")} 
                    value={billingAddress.lastName}
                    maxlength={15}
                    pattern="[a-zA-Z]+" 
                    title="last Name Must be an Alphabet"
                   />
                 
                </div>
                <div className="col-lg-6">
                  <input  
                    type="number"
                    id="inputCity" 
                    required 
                    className="form-control" 
                    placeholder="Phone *"  
                    name="phone" 
                    onChange={(e)=>this.onChangeAddress(e,"billing")} 
                    value={billingAddress.phone} 
                    maxlength={20}
                    pattern="[0-9]+" 
                    title="Phone Number Must be an Integer"
                   />
                  
                </div>
                <div className="col-lg-6">
                  <input  
                      type="mail"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="Email *"  
                      name="email" 
                      onChange={(e)=>this.onChangeAddress(e,"billing")} 
                      value={billingAddress.email} 
                     
                    />
                </div>
                <div className="col-lg-6">
                    {/* <input  
                      type="text"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="State"  
                      name="state" 
                      onChange={(e)=>this.onChangeAddress(e,"billing")} 
                      value={billingAddress.state} 
                    /> */}
                   <CountryDropdown
                      value={billingAddress.country}
                      whitelist={"US"}
                      classes="form-control border-select mb-4"
                      onChange={(val) => this.select(val,"country","billing")}
                       />
                </div>
                <div className="col-lg-6">
                    {/* <input  
                      type="text"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="Country"  
                      name="country" 
                      onChange={(e)=>this.onChangeAddress(e,"billing")} 
                      value={billingAddress.country} 
                    /> */}

                    <RegionDropdown
                      country={billingAddress.country}
                      value={billingAddress.state}
                      classes="form-control border-select mb-4"
                      onChange={(val) => this.select(val,"state","billing")} />
                  
                </div>
                <div className="col-lg-6">
                    <input  
                      type="text"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="Address *"  
                      name="address" 
                      onChange={(e)=>this.onChangeAddress(e,"billing")} 
                      value={billingAddress.address} 
                    />
                </div>
                <div className="col-lg-3">
                    <input  
                      type="text"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="Region *"  
                      name="region" 
                      onChange={(e)=>this.onChangeAddress(e,"billing")} 
                      value={billingAddress.region} 
                    />
                </div>
                <div className="col-lg-3">
                    <input  
                      type="text"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="Zipcode *"  
                      maxlength={5}
                      name="zip" 
                      onChange={(e)=>this.onChangeAddress(e,"billing")} 
                      value={billingAddress.zip} 
                      pattern="[0-9]+" 
                      title="Zipcode Must be an Number"
                    />
                </div>
                <div className="form-check">
                  <input
                      name="sameas"  
                      type="checkbox"
                      checked={this.state.sameas}
                      onChange={(e)=>this.sameasBilling(e)} 
                      className="form-check-input"
                  />
                 
                  <label className="form-check-label text-dark" htmlFor="exampleCheck1">Same as Billing Address</label>
                </div>
                
              </div>
            <h2>Shipping Info</h2>
              
              <div className="row form-group">
                <div className="col-lg-6">
                  <input  
                    type="text"
                    id="inputCity" 
                    required 
                    className="form-control" 
                    placeholder="First Name *"  
                    name="firstName" 
                    onChange={(e)=>this.onChangeAddress(e,"shipping")} 
                    value={shippingAddress.firstName ? shippingAddress.firstName  :""} 
                    maxlength={15}
                    pattern="[a-zA-Z]+" 
                    title="First Name Must be an Alphabet"

                   />
                </div>
                <div className="col-lg-6">
                  <input  
                    type="text"
                    id="inputCity" 
                    required 
                    className="form-control" 
                    placeholder="Last Name *"  
                    name="lastName" 
                    onChange={(e)=>this.onChangeAddress(e,"shipping")} 
                    value={shippingAddress.lastName ? shippingAddress.lastName  :""} 
                    maxlength={15}
                    pattern="[a-zA-Z]+" 
                    title="Last Name Must be an Alphabet"
                   />
                 
                </div>
                <div className="col-lg-6">
                  <input  
                    type="number"
                    id="inputCity" 
                    required 
                    className="form-control" 
                    placeholder="Phone *"  
                    name="phone" 
                    onChange={(e)=>this.onChangeAddress(e,"shipping")} 
                    value={shippingAddress.phone ? shippingAddress.phone  :""} 
                    maxlength={20}
                    pattern="[0-9]+" 
                    title="Phone Number Must be an Integer"
                   />
                  
                </div>
                <div className="col-lg-6">
                  <input  
                      type="mail"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="Email *"  
                      name="email" 
                      onChange={(e)=>this.onChangeAddress(e,"shipping")} 
                      value={shippingAddress.email ? shippingAddress.email  :""} 
                    />
                </div>
                <div className="col-lg-6">
                    {/* <input  
                      type="text"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="State"  
                      name="state" 
                      onChange={(e)=>this.onChangeAddress(e,"shipping")} 
                      value={shippingAddress.state} 
                    /> */}
                   <CountryDropdown
                      value={shippingAddress.country}
                      whitelist={"US"}
                      classes="form-control border-select mb-4"
                      onChange={(val) => this.select(val,"country","shipping")}
                       />
                </div>
                <div className="col-lg-6">
                    {/* <input  
                      type="text"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="Country"  
                      name="country" 
                      onChange={(e)=>this.onChangeAddress(e,"shipping")} 
                      value={shippingAddress.country} 
                    /> */}

                    <RegionDropdown
                      country={shippingAddress.country}
                      value={shippingAddress.state}
                      classes="form-control border-select mb-4"
                      onChange={(val) => this.select(val,"state","shipping")} />
                  
                </div>
                <div className="col-lg-6">
                    <input  
                      type="text"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="Address *"  
                      name="address" 
                      onChange={(e)=>this.onChangeAddress(e,"shipping")} 
                      value={shippingAddress.address? shippingAddress.address  :""} 
                    />
                </div>
                <div className="col-lg-3">
                    <input  
                      type="text"
                      id="region" 
                      required 
                      className="form-control" 
                      placeholder="Region *"  
                      name="region" 
                      onChange={(e)=>this.onChangeAddress(e,"shipping")} 
                      value={shippingAddress.region? shippingAddress.region  :""} 

                    />
                </div>
                <div className="col-lg-3">
                    <input  
                      type="text"
                      id="inputCity" 
                      required 
                      className="form-control" 
                      placeholder="Zipcode *"  
                      maxlength={5}
                      name="zip" 
                      onChange={(e)=>this.onChangeAddress(e,"shipping")} 
                      value={shippingAddress.zip ? shippingAddress.zip  :""} 
                      pattern="[0-9]+" 
                      title="Zipcode Must be an Number"
                    />
                  
                </div>

                  {this.state.shipLoading ? <h2>Getting Shipping Details....</h2> :shippingContent}
                
              </div>
              <div className="col-lg-12">
                  {this.state.shippingContentData && this.state.shippingContentData.length>0 && cart.length>0 &&<button type="submit" className="btn btn-link process_pay_btn flot_lf">Go to Payment</button>}
                  {/* <Link to="#" onClick={(e)=>{
                    e.preventDefault();
                    this.setState({viewPaymentPage:true})
                  }} className="process_pay_btn flot_lf">Go to Payment</Link> */}
                </div>
             
            </div>
          </div>
          </form>
        </section>
      </div>
        </React.Fragment>
        )

const paymentPage=( <React.Fragment>
  {/* Tab 1 */}
  <input type="radio" name="tabset" id="tab1" aria-controls="marzen" defaultChecked />
        <label htmlFor="tab1 " className="aftr_stl "><i className="fa fa-shopping-bag" aria-hidden="true" /></label>
        {/* Tab 2 */}
        <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
        <label htmlFor="tab2 " className="aftr_stl "><i className="fa fa-ship" aria-hidden="true" /></label>
        {/* Tab 3 */}
        <input type="radio" name="tabset" id="tab3" aria-controls="dunkles" />
        <label htmlFor="tab3 " className="active"><i className="fa fa-credit-card" aria-hidden="true" /></label>
        <Link className="bg_shp_btn"  to="#" onClick={(e)=>{
                    e.preventDefault();
                    this.setState({viewPaymentPage:false})
                  }}>Go back to shopping</Link>
        <div className="tab-panels">
<section id="marzen" className="tab-panel tab_cnt">
  <div className="cart_det ">
  <Link to="#" className="edit_btn lft_al" onClick={(e)=>{
                    e.preventDefault();
                    this.setState({viewPaymentPage:false})
                  }} >Change</Link>
  
    <div className="prd_det mr-0">
      <div className="row form-group ">
        <div className="col-lg-12">
          <div className="pur_det_list">
            <ul>
              <li>Contact<span className="pur_det_hd"> {shippingAddress.firstName} {shippingAddress.lastName}</span></li>
              <li className="brdr">Bill to<span className="pur_det_hd"> {billingAddress.address} -{billingAddress.region},{billingAddress.state}, {billingAddress.country}</span></li>
              <li className="brdr">Ship to<span className="pur_det_hd"> {shippingAddress.address} - {shippingAddress.region},{shippingAddress.state},{shippingAddress.country}</span></li>
              <li>Method<span className="pur_det_hd">{listhome && listhome.setting.currency} {this.state.shippingAmount} ({this.state.shippingName})</span></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-12">
          <h2 className="sub_hd">Pay Now</h2>
        </div>
        <div className="col-lg-12">
        <div className="pay_typ">
          <ul>
            <li>
            <StripeCheckout
  name={lang.appName} // the pop-in header title
  description={lang.paymentDesc} // the pop-in header subtitle
 // image="http://52.3.248.198:5000/static/1622456701logo.png" // the pop-in header image (default none)
  ComponentClass="div"
  panelLabel="Pay Money" // prepended to the amount in the bottom pay button
  amount={parseInt(finalCost) * 100} // cents
  currency="USD"
  stripeKey="..."
  locale="en"
  email={user.email}
  token={this.onToken(parseInt(finalCost) * 100, lang.paymentDesc,couponAmount,totalCost,finalCost,giftcost)}
  stripeKey="pk_test_51ILJeWFFlK0Wy0K7lsXawb9bRiEonOi94U8IHfk51exf8h00wuUP873jgZFNzYIjKQgydmZR2OMsXTa5sAVmGd2900VQihKgHV"
  // Note: Enabling either address option will give the user the ability to
  // fill out both. Addresses are sent as a second parameter in the token callback.
  shippingAddress={false}
                    billingAddress={false}
  // Note: enabling both zipCode checks and billing or shipping address will
  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
  zipCode={false}
  allowRememberMe // "Remember Me" option (default true)
  // token={this.onToken} // submit callback
  // opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
  // closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
  // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
  // you are using multiple stripe keys
  reconfigureOnUpdate={false}
  // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
  // useful if you're using React-Tap-Event-Plugin
 
  >
  <button className="btn fourth"><img src="assets/img/payment/14.png" /></button>
</StripeCheckout>
              
            </li>
            <li>
            <PaypalExpressBtn 
            env={"sandbox"} 
            client={client} 
            currency={"USD"} 
            total={parseFloat(finalCost)} 
            onError={(paymentRes)=>this.onError(paymentRes)} 
            onSuccess={(paymentRes)=>this.onSuccess(paymentRes,couponAmount,totalCost,finalCost,giftcost)} 
            onCancel={(paymentRes)=>this.onCancel(paymentRes)} />
             {/* // <button className="btn fourth"><img src="assets/img/payment/12.png" /></button> */}
            </li>
            <li>
              <button className="btn fourth"><img src="assets/img/payment/13.png" /></button>
            </li>
          </ul>
         
        </div>
      </div>
      </div>
    </div>
  </div>
</section>

</div>
</React.Fragment>)
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
                
                {!this.state.viewPaymentPage ? shippingPage : paymentPage}
              </div>
            </div>
            <div className="col-lg-4">
            <div className="cart_det_pag row cart_shi_column">
        <div className="col-lg-12">
          <div className="pat_method hd_stle">
            <h2>Shopping Cart</h2>
            <Link to="/cart" className="edit_btn">edit</Link>
          </div>
            {cartContent}
          <div className="col-lg-12">
            <div className="total_pay shi_total1">
              <div className="row">
                <div className="col-lg-6">
                  <h2>Shipping Cost:</h2>
                </div>
                <div className="col-lg-6 lft_al">
                  <h2>{listhome && listhome.setting.currency} {this.state.shippingAmount}</h2>
                </div>
              </div>
            </div>
            <div className="total_pay shi_total1">
              <div className="row">
                <div className="col-lg-6">
                  <h2>Sub Total</h2>
                </div>
                <div className="col-lg-6 lft_al">
                  <h2>{listhome && listhome.setting.currency} {cartCost}</h2>
                </div>
              </div>
            </div>
            <div className="total_pay shi_total">
              <div className="row">
                <div className="col-lg-6">
                  <h2>Card Total</h2>
                </div>
                <div className="col-lg-6 lft_al">
                  <h2>{listhome && listhome.setting.currency} {totalCost.toFixed(2)}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
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
Checkout.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    listShipping:PropTypes.func.isRequired
}

  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home,
    cart:state.cart,
    shipping:state.shipping,
})
  
export default connect(mapStateToProps,{addToCart,getCart,removeFromCart,loadCart,listShipping})(withRouter(Checkout));