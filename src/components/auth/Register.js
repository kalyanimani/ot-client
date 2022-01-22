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
class Register extends Component {
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
            passwordLogin:""

        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onSubmitLogin=this.onSubmitLogin.bind(this);

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

      onSubmitLogin(e){
        e.preventDefault();
        this.setState({errors:{}})
        const userData ={
            emailLogin:this.state.emailLogin,
            passwordLogin:this.state.passwordLogin,
        }
        this.props.loginUser(userData);
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
                 <section id="hero-register" className="form_login"  style={{backgroundImage:`url(assets/img/hero-bg.jpg)`}}>
        <div id="register">
          <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
              <div className="col-md-12">
                <div id="login-column">
                  <div id="login-box" className="col-md-12">
                    <h2>Register</h2>
                    <form className="kt-form"   onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="username" className="text-info">Username</label>
                      <input value={this.state.name} name="name" type="text" onChange={this.onChange} placeholder="Name" className="form-control" />
                    </div>
                    <small className="text-danger">{errors.name}</small>
                    <div className="form-group">
                      <label htmlFor="username" className="text-info">Email Address</label>
                      <input className="form-control" value={this.state.email} name="email" type="text" onChange={this.onChange} placeholder="Email"  autoComplete="off" />                      
                    </div>
                    <small className="text-danger">{errors.email}</small>
                    <div className="form-group">
                      <label htmlFor="username" className="text-info">Mobile Number</label>
                      <input className="form-control" value={this.state.mobile} name="mobile" type="text" onChange={this.onChange} placeholder="Mobile"  autoComplete="off" />
                    </div>
                    <small className="text-danger">{errors.mobile}</small>

                    <div className="form-group">
                      <label htmlFor="username" className="text-info">Password</label>
                      <input className="form-control" value={this.state.password} name="password" type="password" onChange={this.onChange} placeholder="Password"  autoComplete="off" />
                    </div>   
                    <small className="text-danger">{errors.password}</small>
                    <div className="form-group">
                      <label htmlFor="username" className="text-info">Confirm Password</label>
                      <input className="form-control" value={this.state.password2} name="password2" type="password" onChange={this.onChange} placeholder="Confirm Password"  autoComplete="off" />
                    </div> 
                    <small className="text-danger">{errors.password2}</small>
                      
                      <div className="form-group">
                        <div id="register-link" className="text-right">
                        <Link to="/login" className="text-info1">Already Have an Account ?</Link>
                        </div> 
                      </div>
                      <div className="sign-in">
                      <input type="submit" name="Login" className="btn btn-info btn-md" defaultValue="sign in" />
                      </div>
                      {/* <div className="line" />
                      <ul className="links">
                        <li>
                          <div className="facebook">
                            <a href="#" className="fa fa-facebook"><img src="assets/img/facebook.png" /></a>
                          </div>
                        </li>
                        <li>
                          <div className="twitter">
                            <div className="twitter"> <a href="#" className="fa fa-twitter"><img src="assets/img/twitter.png" /></a></div>
                          </div>
                        </li>
                      </ul> */}
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

Register.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
Register.defaultpropTypes={
      slider:[]
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home
})
  
export default connect(mapStateToProps,{registerUser,loginUser})(withRouter(Register));