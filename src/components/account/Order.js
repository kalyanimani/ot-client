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
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
const queryString = require('query-string');
class Order extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            email:"",
            mobile:"",
            password:"",
            uploadStatus:'',
            photoUrl:'',
            password2:"",
            orderList:[],
            orderLoading:false

        }
        this.onChange=this.onChange.bind(this);
        this.onProfileSubmit=this.onProfileSubmit.bind(this);
        this.onUpdatePassword=this.onUpdatePassword.bind(this);

        this.uploadImage=this.uploadImage.bind(this);

    }
    componentDidMount () {
      this.getProfile();
      this.getOrder();
}
onChange(e){

this.setState({[e.target.name]:e.target.value})
}    

onChangeFile(event) {
event.stopPropagation();
event.preventDefault();
var file = event.target.files[0];
console.log(file);
this.setState({file}); /// if you want to upload latter
}

onProfileSubmit(e){
e.preventDefault();
const data={
  name:this.state.name,
  email:this.state.email,
  mobile:this.state.mobile,
  photo:this.state.photoUrl
}
Axios.post(API_URL+'/api/user/updateProfile',data)
.then(result=>{
  Toast.fire({
      type: 'success',
      title: 'Profile Updated Successfully',
    })
})
}


onUpdatePassword(e){
e.preventDefault();
const data={
  password:this.state.password,
  password2:this.state.password2, 
}
Axios.post(API_URL+'/api/user/update',data)
.then(result=>{
  Toast.fire({
      type: 'success',
      title: 'Password Updated Successfully',
    })
})
}
getProfile(){
Axios.get(API_URL+'/api/user/getuser')
.then(result=>{
  console.log("data",result.data)
  var tempData=result.data;
  this.setState({
      name:tempData.name,
      email:tempData.email,
      mobile:tempData.mobile,
      photoUrl:tempData.photo,
  })
})
}
getOrder(){
this.setState({
  orderLoading:true
})
Axios.get(API_URL+'/api/order/getorder')
.then(result=>{
  console.log("data",result.data)
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
onClickViewOrder(data){
localStorage.setItem("vieworder",JSON.stringify(data))

this.props.history.push('/vieworder')
}
//for upload image
uploadImage(e){
var self=this;
const data = new FormData();
data.append('file', e.target.files[0]);
data.append('filename',e.target.files[0].name);
Axios.post(API_URL+'/upload', data)
.then(function (response) {
self.setState({
  photoUrl:response.data.file,
  uploadStatus:'Uploaded SuccessFully'
})
self.onProfileSubmit(e);
})
.catch(function (error) {
console.log(error);
});
}
      render() {
        const {errors} =this.state;
        const {listhome,homeloading}=this.props.home;

        const {orderList,orderLoading} = this.state;
        var OrderContent
        if(orderLoading){
            OrderContent=(<tr><td colSpan={5} class="text-center">Loading</td></tr>) 
        }else{
            if(orderList.length>0){
                OrderContent=orderList.map(result=>{
                    return   <div className="row prd_det list_bg">
                   
                    <div className="col-lg-6">
                      <div className="cart_cnd product_list_column">
                        <h6>#{result.orderNo}</h6>
                        <div className="order_det_list">
                          <ul>
                            <li>TOTAL <span className="or_hed">{listhome.setting.currency} {result.finalAmount}</span></li>
                            <li>PAYMENT <span className="or_hed">{listhome.setting.currency} {result.finalAmount}</span></li> 
                            <li>STATUS <span className="or_hed">{localStorage.lang==='en' ?result.status.StatusName:result.status.StatusNameAr}</span></li>
                            {/* <li>ORDER<span className="or_hed">#{result.orderNo}</span></li>  */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="reorder_btn">
                        <ul>
                          <li><a 
                          onClick={()=>this.onClickViewOrder(result)}
                          className="process_pay_btn ">View</a></li>
                          {/* <li><a href="#" className="process_pay_btn ">Track</a></li> */}
                        </ul>            
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="reorder_btn">
                      <li><a href="#" className="process_pay_btn ">Track</a></li>
                      </div>
                    </div>
                  </div>
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
                 <section className="order_det_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="main_ordr_hed">Order Details</h2>
            </div>
            <div className="col-lg-12">
              <section id="marzen" className="tab-panel tab_cnt">
                <div className="cart_det pb-30">
                 {OrderContent}
                </div>
              </section>
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

Order.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
Order.defaultpropTypes={
    slider:[]
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  home:state.home
})

export default connect(mapStateToProps,{})(withRouter(Order));