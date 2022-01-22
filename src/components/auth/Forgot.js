import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Spinner from '../common/Spinner';
import {lang} from '../../actions/language';
import { registerUser,loginUser } from '../../actions/authAction';
import { API_URL } from '../../actions/constant';
import swal from 'sweetalert2';
import axios from 'axios';
const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

const queryString = require('query-string');
class Forgot extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            email:"",
            mobile:"",
            password:"",
            password2:"",
            errors:{},
            emailLogin:"",
            passwordLogin:"",
            message:""

        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onSubmitForgot=this.onSubmitForgot.bind(this);

    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            const parsed = queryString.parse(this.props.location.search);
            if(parsed.redirect){
                this.props.history.push(`/${parsed.redirect}`)
            }else{
                this.props.history.push(`/`)
            }
         
        }
    }
    onChange(e){

        this.setState({[e.target.name]:e.target.value})
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            const parsed = queryString.parse(this.props.location.search);
            if(parsed.redirect){
                this.props.history.push(`/${parsed.redirect}`)
            }else{
                this.props.history.push(`/`)
            }
         
        }
      
        if(nextProps.errors){
          this.setState({errors:nextProps.errors});
        }
      }
      
      onSubmit(e){
        e.preventDefault();
        this.setState({errors:{}})
        const userData ={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            password:this.state.password,
            password2:this.state.password2,
        }
        this.props.registerUser(userData);
      }

      onSubmitForgot(e){
        e.preventDefault();
        this.setState({errors:{},message:""})
        const userData ={
            emailLogin:this.state.emailLogin,
            //passwordLogin:this.state.passwordLogin,
        }
        axios.post(`${API_URL}/api/user/forgot`,userData)
        .then(result=>{
            this.setState({
              message:"Temporary Password Sent to your Registed Email"
            })
            // Toast.fire({
            //   type: 'success',
            //   title: 'Temperor',
              
            // })
        })
        .catch(err=>{
          this.setState({
            errors:err.response.data
          })
        })
        // this.props.loginUser(userData);
      }
      render() {
        const {errors} =this.state;
        const {listhome,homeloading}=this.props.home;
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
                 <section id="hero" className="form_login">
        <div id="login">
          <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
              <div className="col-md-12">
                <div id="login-column">
                  <div id="login-box" className="col-md-12">
                    <h2>Password assistance</h2>
                    <small class="text-dark">Enter the email address  associated with your Overtone account.</small>
                    <form  id="login-form" className="form" className="kt-form"  onSubmit={this.onSubmitForgot}>
                    <div className="form-group">
                     <label htmlFor="username" className="text-info">Email </label>
                     <input type="text" value={this.state.emailLogin} name="emailLogin" type="text" onChange={this.onChange} id="username" className="form-control" />
                   </div>
                   <small className="text-success">{this.state.message}</small>

                   <small className="text-danger">{errors.emailLogin}</small>
                      
                      <div className="sign-in">
                      <input type="submit" name="Login" className="btn btn-info btn-md" defaultValue="sign in" />
                      </div>
                      
                    </form>
                  </div>
                </div></div>
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

Forgot.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
Forgot.defaultpropTypes={
      slider:[]
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home
})
  
export default connect(mapStateToProps,{registerUser,loginUser})(withRouter(Forgot));