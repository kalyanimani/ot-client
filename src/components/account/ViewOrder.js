import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Spinner from '../common/Spinner';
import {lang} from '../../actions/language';
import {IMAGE_URL,API_URL} from '../../actions/constant';
import Axios from 'axios';
import swal from 'sweetalert2';
var dateFormat = require("dateformat");
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
const queryString = require('query-string');
class ViewOrder extends Component {
  constructor(props){
    super(props)
    this.state={
        name:"",
        email:"",
        mobile:"",
        password:"",
        password2:"",
        orderList:[],
        orderLoading:false,
        orderData:{},
        orderID:""
    }
    this.onChange=this.onChange.bind(this);
   
}
componentDidMount () {
    const orderData=JSON.parse(localStorage.getItem('vieworder'))
    console.log("orderData",orderData)

    this.setState({
        orderData:orderData,
        orderID:orderData._id
    },()=>{
        this.getOrderMeta();
    })
           
}
onChange(e){

    this.setState({[e.target.name]:e.target.value})
}      

getOrderMeta(){
    console.log("his.state.orderID",this.state.orderID)
    this.setState({
        orderLoading:true
    })
    Axios.post(API_URL+'/api/order/getordermeta',{orderID:this.state.orderID})
    .then(result=>{
            this.setState({
            
                orderList:result.data,
                orderLoading:false
            })
    })
    .catch(err=>{
        this.setState({
            orderList:[],
            orderLoading:false
        })
    })
}
      render() {
        const {listhome,homeloading}=this.props.home;

        const {orderList,orderLoading,orderData} = this.state;
         
        var shippingAddress=orderData.shippingAddress?JSON.parse(orderData.shippingAddress) :{}
        
        var OrderContent
        if(orderLoading){
            OrderContent=(<tr><td colSpan={5} class="text-center">Loading</td></tr>) 
        }else{
            if(orderList.length>0){
                OrderContent=orderList.map(result=>{

                  
                    return      <section id="marzen" className="tab-panel tab_cnt">
                    <div className="cart_det pb-30">
                      <div className="row prd_det list_bg">
                        <div className="col-lg-4">
                          <div className="product_det_img">
                            <img src="assets/img/insta-1.jpg" />
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="cart_cnd product_list_column">
                            <h6>
                              {result.product.name}
                            </h6>
                            <div className="order_det_list">
                              <ul>
                                <li>Quantity <span className="or_hed">{result.quantity}</span></li>
                                <li>TOTAL<span className="or_hed">{parseInt(result.quantity) * parseInt(result.price)}</span></li> 
                               
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div></section>
                })
            }else{
                OrderContent=(<tr><td colSpan={5} class="text-center">No Orders Found</td></tr>) 
            }
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
 <div className="single_order_details">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="main_ordr_hed">Order Details</h2>
            </div>
            <div className="col-lg-12">
              <div className="detai_inner">
                <div className="row">
                  <div className="col-lg-12">
                  {OrderContent}
                  </div></div></div></div></div></div>
                
                  <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="main_ordr_hed">Order Details</h2>
            </div>
            <div className="col-lg-12">
              <div className="detai_inner">
                <div className="row">
                  <div className="col-lg-12">
                  <section id="marzen" className="tab-panel tab_cnt">
                    <div className="cart_det pb-30">
                      <div className="row prd_det list_bg">
                        
                        <div className="col-lg-8">
                          <div className="cart_cnd product_list_column">
                            
                            <div className="order_det_list">
                              <ul>
                                <li>ORDER PLACED <span className="or_hed">{orderData.date ? dateFormat(orderData.date, "fullDate"):null}</span></li>
                                <li>TOTAL<span className="or_hed">{listhome.setting.currency} {orderData.finalAmount}</span></li> 
                                <li>Shipping Address <span className="or_hed">{shippingAddress.address}
                                       
                                </span></li>
                                <li>Shipping State <span className="or_hed">{shippingAddress.state}
                                       
                                       </span></li>

                                       <li>Shipping Zip <span className="or_hed">{shippingAddress.zip}
                                       
                                       </span></li>

                                       <li>Shipping Country <span className="or_hed">{shippingAddress.country}
                                       
                                       </span></li>
                                <li>Shipping Mobile number <span className="or_hed">{shippingAddress.phone}
                                       
                                       </span></li>
                                       <li>Shipping email <span className="or_hed">{shippingAddress.email}
                                       
                                       </span></li>
                                       <li>Shipping Name <span className="or_hed">{shippingAddress.firstName} {shippingAddress.lastName}
                                       
                                       </span></li>
                                <li>ORDER NO<span className="or_hed">#{orderData.orderNo}</span></li> 
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div></section>
                  </div></div></div></div></div></div>
   
                  </div>
   
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

ViewOrder.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
ViewOrder.defaultpropTypes={
    slider:[]
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  home:state.home
})

export default connect(mapStateToProps,{})(withRouter(ViewOrder));