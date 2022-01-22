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
class Account extends Component {
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


onUpdatePassword(){
  if(this.state.password==="" || this.state.password2===""){
    Toast.fire({
      type: 'error',
      title: 'Fill All the Fields',
    })
  }


console.log("sadsasadasd")
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
                    return  <tr>
                            <td>#{result.orderNo}</td>
                            <td><span className="price" /> {listhome.setting.currency} {result.finalAmount}</td>
                            <td>{result.finalAmount}</td>
                            <td className="text-danger">{localStorage.lang==='en' ?result.status.StatusName:result.status.StatusNameAr}</td>
                            <td><a href="javascript:void(0);" onClick={()=>this.onClickViewOrder(result)}>View Order</a> </td>
                        </tr>
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
                  <section id="hero_details" className="form_login">
        <div id="user-details">
          <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
              <div className="col-md-12">
                <div className="container-detaile">
               
                <form className="kt-form"  onSubmit={this.onProfileSubmit}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <section>
                            <label htmlFor="fileToUpload">
                              <i className="fa fa-camera" />
                              <input 
                              type="file" 
                              id="fileToUpload" 
                              style={{visibility: 'hidden'}} 
                              accept=".png,.jpg,jpeg,.PNG,.JPEG" 
                              name="fileToUpload"  
                              onChange={this.uploadImage} 
                              />
                              
                            </label>
                           
                            { !this.state.photoUrl || this.state.photoUrl ==="" ?<img className="img-circle" src="https://i.ibb.co/yNGW4gg/avatar.png" /> : <img className="img-circle" src={`${IMAGE_URL}${this.state.photoUrl}`} />}
                          </section>
                          <h1>{this.state.name}</h1>
                        </td>
                        <td>
                         
                        </td>
                        <td>
                        <div className="row">
                            <div className="signup-form user_detail_form">
                            <h2 class="text-white">Update Profile</h2>
                            
                                <div className="form-group">
                                  <label htmlFor="username" className="text-info">Username</label>
                                  <input pattern="[a-zA-Z]+" title="Username Must be an Alphabet" value={this.state.name} className="form-control" required name="name" type="text" onChange={this.onChange} placeholder="Name"  maxlength = "30" autoComplete="off" />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="username" className="text-info">Email Address</label>
                                  <input value={this.state.email} className="form-control" required disabled={true} name="email" type="text" onChange={this.onChange} placeholder="Email"  autoComplete="off" />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="username" className="text-info">Mobile</label>
                                  <input pattern="[0-9]+" title="Mobile Must be an Digits" value={this.state.mobile} className="form-control" required name="mobile" type="text" onChange={this.onChange} placeholder="Mobile"  maxlength = "20" autoComplete="off" />
                                </div>
                                <div className="form-group aln-sgn-up">
                                  <button type="submit" className="btn-info btn btn-primary btn-lg user_profile_btn">SUBMIT</button>
                                </div>
                            </div>
                            <div className="signup-form user_detail_form">
                              <h2 class="text-white">Change Password</h2>
                              <form className="kt-form"  >
                                  <div className="form-group">
                                    <label htmlFor="username" className="text-info">Password</label>
                                    <input type="password" class="form-control" placeholder="Password" required  name="password" value={this.state.password} onChange={this.onChange}/>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="username" className="text-info">Confirm Password</label>
                                    <input type="password" class="form-control" placeholder="Confirm Password" required name="password2" value={this.state.password2} onChange={this.onChange}/>
                                  </div>
                                 
                                  <div className="form-group aln-sgn-up">
                                    <button type="button"  onClick={()=>this.onUpdatePassword()}  className="btn-info btn btn-primary btn-lg user_profile_btn">SUBMIT</button>
                                  </div>
                              </form>
                              </div>
                        </div>
                        </td>
                      </tr>
                      
                    </tbody>
                    </table>
                    </form>
                   
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

Account.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
Account.defaultpropTypes={
    slider:[]
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  home:state.home
})

export default connect(mapStateToProps,{})(withRouter(Account));