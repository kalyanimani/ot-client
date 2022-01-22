import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Spinner from '../common/Spinner';
import {lang} from '../../actions/language';
import { registerUser,loginUser } from '../../actions/authAction';
const queryString = require('query-string');
class OrderConfirmation extends Component {
    constructor(props){
        super(props)
        this.state={
            orderInfo:{},
            cartDisplay:[],
            shippingAddress:{},
            paymentMethod:""
        }
        

    }
    componentDidMount(){
        if(localStorage.cartDisplay){
            this.setState({
                cartDisplay:JSON.parse(localStorage.cartDisplay)
            })
          }
          if(localStorage.orderInfo){
            this.setState({
                orderInfo:JSON.parse(localStorage.orderInfo)
            })
          }
          if(localStorage.shippingAddress){
            this.setState({
              shippingAddress:JSON.parse(localStorage.shippingAddress)
            })
          }
          if(localStorage.paymentMethod){
            this.setState({
                paymentMethod:localStorage.paymentMethod
            })
          }
    }
  
      render() {
        const {errors} =this.state;
        const {listhome,homeloading}=this.props.home;
        const {cartDisplay,orderInfo,shippingAddress}=this.state;
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
                 <section id="hero" className="cart-itm confirmation_sec">
                 <div className="container_def">
        <div className="row">
          <div className="col-lg-8">
            <div className="confirmation_img">
              <img src />
              <div className="confirmation_img_con">
                <h1>THANK YOU FOR SHOPPING WITH OVERTONE</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="cart_det_pag row cart_shi_column pb-50">
              <div className="col-lg-12"> 
                <div className="pat_method hd_stle">
                  <h2>Confirmation {orderInfo.orderNo}</h2>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="total_prz_lst">
                      <ul>
                        {cartDisplay.map(result=>{
                          var sku;
                          if(result.name.includes('Overtone Acoustic Panel'))
                           sku = result.selectedAttribute.reduce((acc, curr) => `OAP-${acc}${curr.value}-`, "")
                          else
                           sku = result.selectedAttribute.reduce((acc, curr) => `ART-${acc}${curr.value}-`, "")
                        return <li>
                          <div class="row">
                              <div className="col-md-8">
                                {result.name}
                                <br/>SKU: <small>{sku.replace(/-\s*$/, "")}</small>
                              </div>
                              <div className="col-md-4">
                              <span className="total_lef_txt">{result.quantity} * {listhome && listhome.setting.currency} {result.price}</span>
                              </div>
                          </div> 
                           <br/>
                         
                        </li>
                        })}
                        
                      </ul>
                    </div>
                    <div className="total_prz_lst cen_bor">
                      <ul>
                        <li>Shipping<span className="total_lef_txt">{listhome && listhome.setting.currency} {orderInfo.shippingAmount}</span></li>
          
                        <li>Total<span className="total_lef_txt">{listhome && listhome.setting.currency} {orderInfo.finalAmount &&orderInfo.finalAmount.toFixed(2)}</span></li>
                      </ul>
                    </div>
                    <div className="total_prz_lst">
                      <ul>
                        <li>Contact<span className="total_lef_txt">{shippingAddress.email} </span></li>
                        <li>Ship to<span className="total_lef_txt">{shippingAddress.address} - {shippingAddress.region},{shippingAddress.state},{shippingAddress.country}</span></li>
                        <li>Payment<span className="total_lef_txt">{this.state.paymentMethod}</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="shi_det_con">
                      <small class="text-dark">TYPICAL SHIPPING LEAD TIME: 3 WEEKS</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
              
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

OrderConfirmation.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
OrderConfirmation.defaultpropTypes={
      slider:[]
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home
})
  
export default connect(mapStateToProps,{registerUser,loginUser})(withRouter(OrderConfirmation));