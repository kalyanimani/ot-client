import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Spinner from '../common/Spinner';
import {lang} from '../../actions/language';
import { registerUser,loginUser } from '../../actions/authAction';
import GoogleLogin from 'react-google-login';
const queryString = require('query-string');
class LoginModal extends Component {
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
      responseGoogle = (response) => {
        var responseData=response.profileObj;
        // console.log(response);
        // console.log("test",responseData.profileObj);
        this.setState({errors:{}})
        const userData ={
            name:responseData.name,
            email:response.email,
            mobile:"-",
            password:response.googleId,
            password2:response.googleId,
        }
        this.props.loginUserFacebook(userData);

      }
      render() {
        const {errors} =this.state;
        const {listhome,homeloading}=this.props.home;
        return (
          <div id="myModal1" className="modal-div btn-s d-block">
          {/* Modal content */}
          <div className="top-al">
            <div className="login-modal">
              <div id="login-column">
                <div id="login-box" className="col-md-12">
                <form  id="login-form" className="form" className="kt-form"  onSubmit={this.onSubmitLogin}>
                    <div className="form-group">
                     <label htmlFor="username" className="text-info">Username/Email</label>
                     <input type="text" value={this.state.emailLogin} name="emailLogin" type="text" onChange={this.onChange} id="username" className="form-control" />
                    
                   </div>
                   <small className="text-danger">{errors.emailLogin}</small>
                   <div className="form-group">
                     <label htmlFor="password" className="text-info">Password</label>
                     <input type="text" value={this.state.passwordLogin} name="passwordLogin" type="password" onChange={this.onChange} id="password" className="form-control" />
                   </div>
                   <small className="text-danger">{errors.passwordLogin}</small>
                    <div className="forgot">
                      <div id="register-link" className="text-right1"> <Link to="/forgot" className="text-info">Forgot password?</Link> </div>
                    </div>
                    <div className="form-group">
                      <div id="register-link" className="text-right"> <Link to="/register" className="text-info1">Sign Up</Link> </div>
                    </div>
                    <div className="sign-in">
                    <input type="submit" name="Login" className="btn btn-info btn-md" defaultValue="sign in" />
                    </div>
                  </form>
                </div>
                <div className="line" />
                <ul className="links">
                <GoogleLogin
    clientId="558716834377-aike24rbgheecjpvi5gjkqo89n7d099f.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
  ><span> Login with Google</span></GoogleLogin>
                  {/* <li>
                    <div className="facebook"> <a href="#" className="fa fa-facebook"><img src="assets/img/facebook.png" /></a> </div>
                  </li>
                  <li>
                    <div className="twitter">
                      <div className="twitter"> <a href="#" className="fa fa-twitter"><img src="assets/img/twitter.png" /></a></div>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
        )
     }
}

LoginModal.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
LoginModal.defaultpropTypes={
      slider:[]
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home
})
  
export default connect(mapStateToProps,{registerUser,loginUser})(withRouter(LoginModal));